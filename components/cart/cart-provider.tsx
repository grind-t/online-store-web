import { useUpdateEffect } from '@react-hookz/web';
import { useAuth } from 'components/auth/auth-provider';
import { getUser } from 'lib/auth';
import {
  CartItem,
  clearCart,
  getEmptyCart,
  removeCartItem,
  setCartItem,
} from 'lib/cart';
import { Cart, CartProductVariant, getCart } from 'lib/cart';
import { createContext, ReactNode, useContext, useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface State {
  cart: Cart;
  itemsIndex: Record<string, CartItem>;
}

async function getState(): Promise<State> {
  const user = getUser();
  const cart = await getCart(user);
  return {
    cart,
    itemsIndex: cart.items.reduce((index, item) => {
      index[item.variant.id] = item;
      return index;
    }, {} as Record<string, CartItem>),
  };
}

const cartKey = 'cart';
const CartContext = createContext<State | undefined>(undefined);

export interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const user = useAuth();
  const { data, mutate } = useSWR(cartKey, getState);
  useUpdateEffect(() => {
    mutate();
  }, [user, mutate]);
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export const useCartQuery = () => useContext(CartContext)?.cart;

export const useCartItemQuery = (variantId: number) =>
  useContext(CartContext)?.itemsIndex[variantId];

export const useCartMutation = () => {
  const { cache, mutate } = useSWRConfig();
  const add = useCallback(
    async (variant: CartProductVariant, quantity: number = 1) => {
      const user = getUser();
      const state = cache.get(cartKey) as State | undefined;
      if (!state) return;
      const item = state.itemsIndex[variant.id];
      const nextItem: CartItem = item
        ? { ...item, quantity: item.quantity + quantity }
        : { variant, quantity };
      const nextItemsIndex: Record<string, CartItem> = {
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
      let nextItemsIndex: Record<string, CartItem>;
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

export default CartProvider;
