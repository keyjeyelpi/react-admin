import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  iAccountType,
  iUserWithAccountType,
  iUsersState,
} from '../../interfaces/users.interface';

const initialState: iUsersState = {
  list: [],
};

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
    removeCurrentUser: (state) => {
      state.currentUser = undefined;
    },
    setCurrentUser: (state, action: PayloadAction<{ id: string; token: string }>) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<iUserWithAccountType[]>) => {
      state.list = action.payload;
    },
    setAccountTypes: (state, action: PayloadAction<iAccountType[]>) => {
      state.account_types = action.payload;
    },
  },
});

export default UsersSlice.reducer;
export const {
  deleteUser,
  removeCurrentUser,
  setCurrentUser,
  setUsers,
  setAccountTypes,
} = UsersSlice.actions;
