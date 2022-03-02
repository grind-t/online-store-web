import { Order, orderTable, orderQuery } from 'lib/orders';
import { ProblemDetails } from 'lib/problem-details';
import { admin } from 'lib/server/supabase';

export const orderIdProblem = new ProblemDetails({
  status: 400,
  detail: 'Invalid order id',
});

export async function getOrder(id: number): Promise<Order> {
  const { data, status, error } = await admin
    .from<Order>(orderTable)
    .select(orderQuery)
    .match({ id })
    .maybeSingle();
  if (error) {
    throw new ProblemDetails({ status, detail: error.message });
  }
  if (!data) {
    throw orderIdProblem;
  }
  return data;
}

export async function updateOrder(order: any): Promise<void> {
  const { status, error } = await admin
    .from(orderTable)
    .update(order)
    .match({ id: order.id });
  if (error) {
    throw new ProblemDetails({ status, detail: error.message });
  }
}
