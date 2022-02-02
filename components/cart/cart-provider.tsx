import { useAuth } from 'components/auth/auth-provider';
import { getUser, User } from 'lib/auth';
import {
  CartItem,
  clearCart,
  getEmptyCart,
  removeCartItem,
  setCartItem,
} from 'lib/cart';
import { Cart, CartProductVariant, getCart } from 'lib/cart';
import {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import useSWR, { useSWRConfig, unstable_serialize } from 'swr';

interface State {
  cart: Cart;
  itemsIndex: Record<string, CartItem>;
}

async function getState(user?: User): Promise<State> {
  const cart = await getCart(user);
  return {
    cart,
    itemsIndex: cart.items.reduce((index, item) => {
      index[item.variant.id] = item;
      return index;
    }, {} as Record<string, CartItem>),
  };
}

const CartContext = createContext<State | undefined>(undefined);

export interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const user = useAuth();
  const { data } = useSWR([user, 'cart'], getState);
  const { cache } = useSWRConfig();
  useEffect(() => {
    const key = [user, 'cart'];
    return () => cache.delete(unstable_serialize(key));
  }, [user, cache]);
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
      const key = [user, 'cart'];
      const state = cache.get(unstable_serialize(key)) as State | undefined;
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
      mutate(key, nextState, false);
      await setCartItem(nextItem, user);
      mutate(key);
    },
    [cache, mutate]
  );
  const remove = useCallback(
    async (variantId: number, quantity: number = 1) => {
      const user = getUser();
      const key = [user, 'cart'];
      const state = cache.get(unstable_serialize(key)) as State | undefined;
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
      mutate(key, nextState, false);
      if (nextQuantity > 0) await setCartItem(nextItemsIndex[variantId], user);
      else await removeCartItem(variantId, user);
      mutate(key);
    },
    [cache, mutate]
  );
  const clear = useCallback(async () => {
    const user = getUser();
    const key = [user, 'cart'];
    const state = cache.get(unstable_serialize(key)) as State | undefined;
    if (!state) return;
    const nextState: State = {
      cart: getEmptyCart(),
      itemsIndex: {},
    };
    mutate(key, nextState, false);
    await clearCart(user);
    mutate(key);
  }, [cache, mutate]);
  return { add, remove, clear };
};

export default CartProvider;
