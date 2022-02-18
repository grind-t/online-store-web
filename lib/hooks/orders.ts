import { getAllOrderItems } from 'lib/orders';
import useSWR from 'swr';

export const allOrderItemsKey = 'orders';

export function useAllOrderItems() {
  const { data } = useSWR(allOrderItemsKey, getAllOrderItems);
  return data;
}
