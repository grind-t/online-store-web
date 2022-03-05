import { Dinero, dinero, add, multiply } from 'dinero.js';
import { LineItem, lineItemQuery } from 'lib/cart';
import { zeroDinero, defaultCurrency } from 'lib/money';
import { supabase } from 'lib/supabase';

export interface Recipient {
  name: string;
  email: string;
  contact: string;
}

export interface OrderEntity {
  id: number;
  userId: string;
  recipientName: string;
  recipientEmail: string;
  recipientContact: string;
  paymentId?: string;
}

export interface OrderItem extends LineItem {
  order: OrderEntity;
}

export interface Order extends OrderEntity {
  items: LineItem[];
}

export const orderTable = 'orders';
export const orderItemTable = 'order_items';

export const orderEntityQuery = `
  id,
  userId:user_id,
  recipientName:recipient_name,
  recipientEmail:recipient_email,
  recipientContact:recipient_contact,
  paymentId:payment_id
`;

export const orderQuery = `
  ${orderEntityQuery},
  items:${orderItemTable}(${lineItemQuery})
`;

export const orderItemQuery = `
  ${lineItemQuery},
  order:${orderTable}(${orderEntityQuery})
`;

export async function getOrderItems(): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from<OrderItem>(orderItemTable)
    .select(orderItemQuery);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function placeOrder(recipient: Recipient) {
  const { error } = await supabase.rpc('place_order', {
    recipient_input: recipient,
  });
  if (error) throw new Error(error.message);
}

export function getItemCount(items: LineItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getTotalPrice(items: LineItem[]): Dinero<number> {
  return items.reduce((total, item) => {
    const variantPrice = dinero({
      amount: item.variant.price,
      currency: defaultCurrency,
    });
    const itemPrice = multiply(variantPrice, item.quantity);
    return add(total, itemPrice);
  }, zeroDinero);
}
