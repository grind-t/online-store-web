import { LineItem, lineItemQuery } from 'lib/cart';
import { supabase } from 'lib/supabase';

export interface OrderEntity {
  id: number;
  userId: string;
  email: string;
  paymentId?: string;
}

export interface Order extends OrderEntity {
  items: LineItem[];
}

export interface OrderItem extends LineItem {
  order: OrderEntity;
}

export const orderTable = 'orders';
export const orderItemTable = 'order_items';

export const orderEntityQuery = `
  id,
  userId:user_id,
  email,
  paymentId:payment_id
`;

export const orderQuery = `
  ${orderEntityQuery},
  items:${orderItemTable}(${lineItemQuery})
`;

export const orderItemQuery = `
  order:${orderTable}(${orderEntityQuery}),
  ${lineItemQuery}
`;

export async function getAllOrderItems(): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from<OrderItem>(orderItemTable)
    .select(orderItemQuery);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function placeOrder(email: string) {
  const { error } = await supabase.rpc('place_order', {
    order_input: { email },
  });
  if (error) throw new Error(error.message);
}

export { getItemCount, getTotalPrice } from 'lib/cart';
