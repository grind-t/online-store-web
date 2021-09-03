import { Product } from 'lib/product';
import { Products } from 'lib/products';
import { atom, selectorFamily } from 'recoil';

export const productsState = atom<Products>({
  key: 'products',
  default: null,
});

export const productState = selectorFamily<Product, string>({
  key: 'product',
  get:
    (id) =>
    ({ get }) =>
      get(productsState)?.[id],
  set:
    (id) =>
    ({ set }, newValue) => {
      set(productsState, (prev) => ({
        ...prev,
        [id]: newValue as Product,
      }));
    },
});
