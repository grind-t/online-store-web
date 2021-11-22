import { Dinero } from '@dinero.js/core';
import { Cart, CartItem, getCart, setCart } from 'api/cart';
import { Product } from 'api/products';
import { isClient } from 'app/env';
import { getAppAuth, onAuthStateChanged } from 'app/firebase/auth';
import {
  getLocalCart,
  setLocalCart,
  clearLocalCart,
  mergeCarts,
  getEmptyCart,
  getTotalCartItems,
  getTotalCartPrice,
} from 'lib/cart';
import { Entities, ID } from 'lib/entities';
import { atom, selector, selectorFamily } from 'recoil';
import { productQuery } from 'state/products';

interface LoadableCart {
  cart: Cart;
  isLoading: boolean;
}

const loadableCartState = atom<LoadableCart>({
  key: 'loadableCart',
  default: { cart: getEmptyCart(), isLoading: true },
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      if (!isClient) return;
      onSet((state) => {
        const user = getAppAuth().currentUser;
        if (!user) setLocalCart(state.cart);
        else setCart(state.cart).catch(console.error);
      });
      return onAuthStateChanged(getAppAuth(), (user) => {
        if (!user) setSelf({ cart: getLocalCart(), isLoading: false });
        else
          getCart()
            .then((cart) => {
              const localCart = getLocalCart();
              cart = cart ? mergeCarts(localCart, cart) : localCart;
              setSelf({ cart, isLoading: false });
              setCart(cart).then(clearLocalCart).catch(console.error);
            })
            .catch(console.error);
      });
    },
  ],
});

export const cartState = selector<Cart>({
  key: 'cart',
  get: ({ get }) => get(loadableCartState).cart,
  set: ({ set }, newValue) =>
    set(loadableCartState, (prev) => ({ ...prev, cart: newValue as Cart })),
});

export const cartLoadingState = selector<boolean>({
  key: 'cartLoading',
  get: ({ get }) => get(loadableCartState).isLoading,
});

export const cartProductsQuery = selector<Entities<Product>>({
  key: 'cartProducts',
  get: ({ get }) => {
    const cart = get(cartState);
    const products: Entities<Product> = {};
    for (const item of Object.values(cart.items)) {
      const productId = item.productId;
      const product = get(productQuery(productId));
      if (product) products[productId] = product;
    }
    return products;
  },
});

export const totalCartItemsState = selector<number>({
  key: 'totalCartItems',
  get: ({ get }) => getTotalCartItems(get(cartState)),
});

export const totalCartPriceQuery = selector<Dinero<number>>({
  key: 'totalCartPrice',
  get: ({ get }) => getTotalCartPrice(get(cartState), get(cartProductsQuery)),
});

export const cartItemState = selectorFamily<CartItem, ID>({
  key: 'cartItem',
  get:
    (id) =>
    ({ get }) =>
      get(cartState).items[id],
  set:
    (id) =>
    ({ set }, newValue) => {
      const item = newValue as CartItem;
      set(cartState, (prev) => {
        let items: Entities<CartItem>;
        if (item.quantity > 0) items = { ...prev.items, [id]: item };
        else {
          const { [id]: omit, ...rest } = prev.items;
          items = rest;
        }
        return {
          ...prev,
          items,
        };
      });
    },
});
