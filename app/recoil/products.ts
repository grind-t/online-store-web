import { Products } from 'lib/products';
import { atom } from 'recoil';

export const productsState = atom<Products>({
  key: 'products',
  default: null,
});
