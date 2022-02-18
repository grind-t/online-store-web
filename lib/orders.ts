import { productTable, productVariantTable } from 'lib/products';
import { supabase } from 'lib/supabase';

export interface OrderProduct {
  name: string;
}

export interface OrderProductVariant {
  id: number;
  product: OrderProduct;
  characteristics: Record<string, string>;
}

export interface Order {
  id: number;
  paymentId?: number;
}

export interface OrderItem {
  order: Order;
  variant: OrderProductVariant;
}

export const orderTable = 'orders';
export const orderItemTable = 'order_items';

const orderProductQuery = `
  name
`;

const orderProductVariantQuery = `
  id,
  product:${productTable}(${orderProductQuery}),
  characteristics
`;

const orderQuery = `
  id,
  paymentId:payment_id
`;

const orderItemQuery = `
  order:${orderTable}(${orderQuery}),
  variant:${productVariantTable}(${orderProductVariantQuery})
`;

export async function getAllOrderItems(): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from<OrderItem>(orderItemTable)
    .select(orderItemQuery);
  if (error) throw new Error(error.message);
  return data || [];
}
