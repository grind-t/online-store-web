import cartReducer, { cartChanged } from './cart-slice';
import productsReducer from './products-slice';
import userReducer, { userChanged } from './user-slice';
import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { isClient } from 'app/env';
import { Unsubscribe } from 'app/firebase/auth';
import { Cart, onCartChange } from 'lib/cart';
import { onUserChange, User } from 'lib/user';

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

let unsubscribeUser: Unsubscribe;
let unsubscribeCart: Unsubscribe;

if (isClient && !unsubscribeUser) {
  const handleCartChange = (cart: Cart) => store.dispatch(cartChanged(cart));
  const handleUserChange = (user: User) => {
    store.dispatch(userChanged(user));
    if (unsubscribeCart) unsubscribeCart();
    unsubscribeCart = onCartChange(user, handleCartChange);
  };
  unsubscribeUser = onUserChange(handleUserChange);
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
