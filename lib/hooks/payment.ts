import { getPayment } from 'lib/payment';
import useSWR from 'swr';

export function usePayment(id?: string) {
  const { data, error } = useSWR(id ? [id, 'payment'] : null, getPayment);
  console.log(error);
  return data;
}
