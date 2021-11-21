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
import { Entities, Entity } from 'lib/entities';
import { atom, selector, selectorFamily } from 'recoil';
import { productQuery } from 'state/products';

export const cartState = atom<Cart>({
  key: 'cart',
  default: getEmptyCart(),
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      if (!isClient) return;
      onSet((cart) => {
        const user = getAppAuth().currentUser;
        if (!user) setLocalCart(cart);
        else setCart(cart).catch(console.error);
      });
      return onAuthStateChanged(getAppAuth(), (user) => {
        if (!user) setSelf(getLocalCart());
        else
          getCart()
            .then((cart) => {
              const localCart = getLocalCart();
              cart = cart ? mergeCarts(localCart, cart) : localCart;
              setSelf(cart);
              setCart(cart).then(clearLocalCart).catch(console.error);
            })
            .catch(console.error);
      });
    },
  ],
});

export const cartProductsQuery = selector<Entities<Product>>({
  key: 'cartProducts',
  get: ({ get }) => {
    const cart = get(cartState);
    const products: Entities<Product> = {};
    for (const item of Object.values(cart.items)) {
      const productId = item.productId;
      products[productId] = get(productQuery(productId)) as Product;
    }
    return products;
  },
});

export const totalCartItemsState = selector<number>({
  key: 'totalCartItems',
  get: ({ get }) => getTotalCartItems(get(cartState)),
});

export const totalCartPriceState = selector<Dinero<number>>({
  key: 'totalCartPrice',
  get: ({ get }) => getTotalCartPrice(get(cartState), get(cartProductsQuery)),
});

export const cartItemState = selectorFamily<CartItem, string>({
  key: 'cartItem',
  get:
    (id: string) =>
    ({ get }) =>
      get(cartState).items[id],
  set:
    (id: string) =>
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
