import cartReducer, { cartChanged } from './cart-slice';
import productsReducer from './products-slice';
import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { isClient } from 'app/env';
import { getAppAuth, onAuthStateChanged } from 'app/firebase/auth';
import { getAppCart } from 'lib/cart';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

let init: boolean;

if (isClient && !init) {
  onAuthStateChanged(
    getAppAuth(),
    () =>
      getAppCart()
        .then((cart) => store.dispatch(cartChanged(cart)))
        .catch(console.error),
    console.error
  );
  init = true;
}

export default store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
