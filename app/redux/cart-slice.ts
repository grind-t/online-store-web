import { AppState, AppThunk } from './store';
import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { Cart, handleLineItemChange, LineItem } from 'lib/cart';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {} as Cart,
  reducers: {
    cartChanged: (state, action: PayloadAction<Cart>) => action.payload,
  },
});

function lineItemChanged(id: string, item: LineItem): AppThunk {
  return (dispatch, getState) => {
    const user = getState().user;
    handleLineItemChange(id, item, user);
  };
}

function selectCart(state: AppState): Cart {
  return state.cart;
}

function selectLineItem(id: string): Selector<AppState, LineItem> {
  return (state: AppState) => state.cart[id];
}

export default cartSlice.reducer;
export const { cartChanged } = cartSlice.actions;
export { lineItemChanged };
export { selectCart, selectLineItem };
