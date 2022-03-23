import { Dinero, dinero, add, multiply } from 'dinero.js';
import { LineItemFull, lineItemFullQuery } from 'lib/cart';
import { zeroDinero, defaultCurrency } from 'lib/money';
import { supabase } from 'lib/supabase';

export interface Recipient {
  name: string;
  email: string;
  contact: string;
}

export interface Order {
  id: number;
  userId: string;
  recipientName: string;
  recipientEmail: string;
  recipientContact: string;
  paymentId?: string;
}

export interface OrderItemFull extends LineItemFull {
  order: Order;
}

export interface OrderFull extends Order {
  items: LineItemFull[];
}

export const orderTable = 'orders';
export const orderItemTable = 'order_items';

export const orderQuery = `
  id,
  userId:user_id,
  recipientName:recipient_name,
  recipientEmail:recipient_email,
  recipientContact:recipient_contact,
  paymentId:payment_id
`;

export const orderItemFullQuery = `
  ${lineItemFullQuery},
  order:${orderTable}(${orderQuery})
`;

export const orderFullQuery = `
  ${orderQuery},
  items:${orderItemTable}(${lineItemFullQuery})
`;

export async function getOrderItems(): Promise<OrderItemFull[]> {
  const { data, error } = await supabase
    .from<OrderItemFull>(orderItemTable)
    .select(orderItemFullQuery);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function placeOrder(recipient: Recipient) {
  const { error } = await supabase.rpc('place_order', {
    recipient_input: recipient,
  });
  if (error) throw new Error(error.message);
}

export function getItemCount(items: LineItemFull[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getTotalPrice(items: LineItemFull[]): Dinero<number> {
  return items.reduce((total, item) => {
    const variantPrice = dinero({
      amount: item.variant.price,
      currency: defaultCurrency,
    });
    const itemPrice = multiply(variantPrice, item.quantity);
    return add(total, itemPrice);
  }, zeroDinero);
}
