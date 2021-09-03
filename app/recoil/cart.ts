import { isClient } from 'app/env';
import { getAppAuth, onAuthStateChanged } from 'app/firebase/auth';
import { Cart, getAppCart, getEmptyCart, LineItem, setAppCart } from 'lib/cart';
import { atom, selector, selectorFamily } from 'recoil';

export const cartState = atom<Cart>({
  key: 'cart',
  default: null,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      if (!isClient) return;
      onAuthStateChanged(getAppAuth(), () =>
        getAppCart().then(setSelf).catch(console.error)
      );
      onSet((newValue) => setAppCart(newValue).catch(console.error));
    },
  ],
});

export const totalCartItemsState = selector<number>({
  key: 'totalCartItems',
  get: ({ get }) => {
    const cart = get(cartState);
    if (!cart) return 0;
    return Object.values(cart.items).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  },
});

export const lineItemState = selectorFamily<LineItem, string>({
  key: 'lineItem',
  get:
    (id: string) =>
    ({ get }) =>
      get(cartState)?.items[id],
  set:
    (id: string) =>
    ({ set }, newValue) =>
      set(cartState, (prev) => ({
        ...prev,
        items: {
          ...prev?.items,
          [id]: newValue as LineItem,
        },
      })),
});
