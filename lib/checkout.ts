import { supabase } from 'lib/supabase';

export async function placeOrder(email: string) {
  const { error } = await supabase.rpc('place_order', {
    order_input: { email },
  });
  if (error) throw new Error(error.message);
}
