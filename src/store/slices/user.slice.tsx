import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import type { iUserState } from '../interfaces/user';

const initialState: iUserState = {};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout: (state) => {
      state.id = undefined;
      state.profile = undefined;
    },
    setUserProfile: (state, action) => {
      state.id = uuid();
      state.profile = action.payload;
    },
    setUserBirthdate: (state, action) => {
      if (state.profile) state.profile.birthdate = action.payload;
    },
    setUserNumber: (state, action) => {
      if (state.profile) state.profile.number = action.payload;
    },
    setUserEmail: (state, action) => {
      if (state.profile) state.profile.email = action.payload;
    },
    setUserAvatar: (state, action) => {
      if (state.profile) state.profile.avatar = action.payload;
    },
  },
});

export default UserSlice.reducer;

export const {
  setLogout,
  setUserProfile,
  setUserBirthdate,
  setUserNumber,
  setUserEmail,
  setUserAvatar,
} = UserSlice.actions;
