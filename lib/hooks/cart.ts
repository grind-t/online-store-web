import { getUser } from 'lib/auth';
import {
  LineItemFull,
  clearCart,
  getEmptyCart,
  removeCartItem,
  setCartItem,
} from 'lib/cart';
import { Cart, getCart } from 'lib/cart';
import { ProductVariantFull } from 'lib/products';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface State {
  cart: Cart;
  itemsIndex: Record<string, LineItemFull>;
}

async function getState(): Promise<State> {
  const user = getUser();
  const cart = await getCart(user);
  return {
    cart,
    itemsIndex: cart.items.reduce((index, item) => {
      index[item.variant.id] = item;
      return index;
    }, {} as Record<string, LineItemFull>),
  };
}

export const cartKey = 'cart';

export function useCartQuery() {
  const { data } = useSWR(cartKey, getState);
  return data?.cart;
}

export function useCartItemQuery(variantId: number) {
  const { data } = useSWR(cartKey, getState);
  return data?.itemsIndex[variantId];
}

export const useCartMutation = () => {
  const { cache, mutate } = useSWRConfig();
  const add = useCallback(
    async (variant: ProductVariantFull, quantity: number = 1) => {
      const user = getUser();
      const state = cache.get(cartKey) as State | undefined;
      if (!state) return;
      const item = state.itemsIndex[variant.id];
      const nextItem: LineItemFull = item
        ? { ...item, quantity: item.quantity + quantity }
        : { variantId: variant.id, quantity, variant };
      const nextItemsIndex: Record<string, LineItemFull> = {
        ...state.itemsIndex,
        [variant.id]: nextItem,
      };
      const nextState: State = {
        cart: { ...state.cart, items: Object.values(nextItemsIndex) },
        itemsIndex: nextItemsIndex,
      };
      mutate(cartKey, nextState, false);
      await setCartItem(nextItem, user);
      mutate(cartKey);
    },
    [cache, mutate]
  );
  const remove = useCallback(
    async (variantId: number, quantity: number = 1) => {
      const user = getUser();
      const state = cache.get(cartKey) as State | undefined;
      if (!state) return;
      const item = state.itemsIndex[variantId];
      if (!item) return;
      const nextQuantity = item.quantity - quantity;
      let nextItemsIndex: Record<string, LineItemFull>;
      if (nextQuantity > 0) {
        nextItemsIndex = {
          ...state.itemsIndex,
          [variantId]: { ...item, quantity: nextQuantity },
        };
      } else {
        const { [variantId]: omit, ...rest } = state.itemsIndex;
        nextItemsIndex = rest;
      }
      const nextState: State = {
        cart: { ...state.cart, items: Object.values(nextItemsIndex) },
        itemsIndex: nextItemsIndex,
      };
      mutate(cartKey, nextState, false);
      if (nextQuantity > 0) await setCartItem(nextItemsIndex[variantId], user);
      else await removeCartItem(variantId, user);
      mutate(cartKey);
    },
    [cache, mutate]
  );
  const clear = useCallback(async () => {
    const user = getUser();
    const state = cache.get(cartKey) as State | undefined;
    if (!state) return;
    const nextState: State = {
      cart: getEmptyCart(),
      itemsIndex: {},
    };
    mutate(cartKey, nextState, false);
    await clearCart(user);
    mutate(cartKey);
  }, [cache, mutate]);
  return { add, remove, clear };
};
