import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'lib/user';

const userSlice = createSlice({
  name: 'customer',
  initialState: null as User,
  reducers: {
    userChanged: (state, action: PayloadAction<User>) => action.payload,
  },
});

export default userSlice.reducer;
export const { userChanged } = userSlice.actions;
