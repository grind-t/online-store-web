import { AppState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products } from 'lib/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: {} as Products,
  reducers: {
    productsUpdated: (state, action: PayloadAction<Products>) => {
      const products = action.payload;
      for (const [id, product] of Object.entries(products)) {
        state[id] = product;
      }
    },
  },
});

function selectProducts(state: AppState): Products {
  return state.products;
}

export default productsSlice.reducer;
export const { productsUpdated } = productsSlice.actions;
export { selectProducts };
