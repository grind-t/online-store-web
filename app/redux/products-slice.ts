import { AppState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsWithVariants } from 'lib/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: {} as ProductsWithVariants,
  reducers: {
    productsUpdated: (state, action: PayloadAction<ProductsWithVariants>) => {
      for (const [id, product] of Object.entries(action.payload)) {
        state[id] = product;
      }
    },
  },
});

function selectProducts(state: AppState): ProductsWithVariants {
  return state.products;
}

export default productsSlice.reducer;
export const { productsUpdated } = productsSlice.actions;
export { selectProducts };
