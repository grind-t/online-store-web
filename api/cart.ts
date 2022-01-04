import { supabase } from 'app/supabase-client';
import { ID, Entities } from 'lib/entities';
import { Nullish, Modify } from 'lib/utils';

export interface CartItem {
  productId: ID;
  variantId: ID;
  quantity: number;
}

export interface Cart {
  items: Entities<CartItem>;
}

type ApiCart = Modify<Cart, { items: CartItem[] }>;

function cartFromApi(cart: ApiCart): Cart {
  return {
    ...cart,
    items: cart.items.reduce((items, item) => {
      items[`${item.productId}_${item.variantId}`] = item;
      return items;
    }, {} as Entities<CartItem>),
  };
}

function cartToApi(cart: Cart): ApiCart {
  return { ...cart, items: Object.values(cart.items) };
}

export async function getCart(): Promise<Cart | Nullish> {
  const { data, error } = await supabase.rpc('get_cart').single();
  if (error) throw new Error(error.message);
  return data && cartFromApi(data);
}

export async function setCart(cart: Cart): Promise<Cart | Nullish> {
  const { data, error } = await supabase
    .rpc('set_cart', { cart: cartToApi(cart) })
    .single();
  if (error) throw new Error(error.message);
  return data;
}
