import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  IUser,
  IUserCreateRequest,
  IUserUpdateRequest,
  IUserLoginRequest,
  IUserLoginResponse,
  IUsersResponse,
  IUserQueryParams,
} from './types';
import baseQueryWithReauth from './base.api';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Users'],
  endpoints: (builder) => ({
    // Get all users with pagination
    getUsers: builder.query<IUsersResponse, IUserQueryParams | void>({
      query: (params) => ({
        url: '/users',
        params: params ?? {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),

    // Get user by ID
    getUserById: builder.query<IUser, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    // Get current user profile
    getCurrentUser: builder.query<IUser, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),

    // Create new user
    createUser: builder.mutation<IUser, IUserCreateRequest>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    // Update user
    updateUser: builder.mutation<IUser, IUserUpdateRequest>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        { type: 'Users', id: 'LIST' },
      ],
    }),

    // Delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'User', id },
        { type: 'Users', id: 'LIST' },
      ],
    }),

    // User login
    login: builder.mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store the token for subsequent API calls
          localStorage.setItem('token', data.token);
        } catch {
          // Login failed, no token to store
        }
      },
    }),

    // User logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // Remove the token on logout
          localStorage.removeItem('token');
        } catch {
          // Still remove token even if logout request fails
          localStorage.removeItem('token');
        }
      },
    }),

    // User registration
    register: builder.mutation<IUser, IUserCreateRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetCurrentUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  // Lazy queries
  useLazyGetUsersQuery,
  useLazyGetUserByIdQuery,
  useLazyGetCurrentUserQuery,
} = userApi;
