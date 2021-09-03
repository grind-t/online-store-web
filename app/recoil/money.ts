import { cartState } from './cart';
import { productsState } from './products';
import { Dinero } from '@dinero.js/core';
import { getCartPrice } from 'lib/money';
import { selector } from 'recoil';

export const totalCartPriceState = selector<Dinero<number>>({
  key: 'totalCartPrice',
  get: ({ get }) => {
    const cart = get(cartState);
    const products = get(productsState);
    return getCartPrice(cart, products);
  },
});
