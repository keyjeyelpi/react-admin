import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './base-query.api';
import { store } from '../store';
import { UsersSlice } from '../store/slices/users.slice';
import { encrypt, signature } from '../utils/encryption.util';
import type { iAPIResponse } from '../interfaces/api.interface';

const AuthAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: customBaseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: (credentials) => {
        const encryptedPassword = encrypt(credentials.password);
        const body = {
          username: credentials.username,
          password: encryptedPassword,
        };
        return {
          url: '/auth/login',
          method: 'POST',
          body: {
            ...body,
            signature: signature(body),
          },
        };
      },
      transformResponse: (response: iAPIResponse<{ id: string; token: string }>) => {
        const { dispatch } = store;
        dispatch(
          UsersSlice.actions.setCurrentUser({ id: response.data.id, token: response.data.token }),
        );
      },
      transformErrorResponse: () => {
        const { dispatch } = store;
        dispatch(UsersSlice.actions.removeCurrentUser());
      },
    }),
  }),
});

export default AuthAPI;
export const { useLoginMutation } = AuthAPI;
