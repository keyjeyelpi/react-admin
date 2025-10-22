import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './base-query.api';
import { store } from '../store';
import type { iUserWithAccountType } from '../interfaces/users.interface';
import type { iAPIResponse } from '../interfaces/api.interface';
import { setUsers } from '../store/slices/users.slice';
import type { iCreateUserSchema } from '../schema/users.schema';
import { encrypt } from '../utils/encryption.util';

const UsersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: customBaseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchUsers: builder.query<any, void>({
      query: () => ({
        url: '/user',
      }),
      providesTags: ['Users'],
      transformResponse: (response: iAPIResponse<iUserWithAccountType[]>) => {
        const { dispatch } = store;

        dispatch(setUsers(response.data));

        return response.data;
      },
    }),
    addUserAPI: builder.mutation<any, iCreateUserSchema>({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        body: { ...user, password: encrypt(user.password) },
      }),
      invalidatesTags: ['Users'],
      transformResponse: (response: iAPIResponse<iUserWithAccountType>) => {
        UsersAPI.util.invalidateTags(['Users']);
        return response;
      },
    }),
    deleteUserAPI: builder.mutation<any, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
      transformResponse: (response: iAPIResponse<any>) => {
        return response;
      },
    }),
  }),
});

export default UsersAPI;
export const {
  useFetchUsersQuery,
  useLazyFetchUsersQuery,
  useAddUserAPIMutation,
  useDeleteUserAPIMutation,
} = UsersAPI;
