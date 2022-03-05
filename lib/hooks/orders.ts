import { getOrderItems } from 'lib/orders';
import useSWR from 'swr';

export const orderItemsKey = 'orders';

export function useOrderItems() {
  const { data } = useSWR(orderItemsKey, getOrderItems);
  return data;
}
