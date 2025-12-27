import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './base.api';
import type {
  IUser,
  IUserCreateRequest,
  IUserUpdateRequest,
  IUserLoginRequest,
  IUserLoginResponse,
  IUsersResponse,
  IUserQueryParams,
} from './types';
import { DEMO_MODE } from '@/utils/function.util';
import usersData from '@/data/users.data.json';
import CryptoJS from 'crypto-js';

// Demo data
const demoUsers = usersData as Array<{
  id: number;
  userId: string;
  country: string;
  accountTypeId: string;
  lastname: string;
  firstname: string;
  email: string;
  username: string;
  password: string;
  contactnumber: string;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
  accountType: {
    title: string;
    isEditable: boolean;
    isDeletable: boolean;
    allowedToEdit: boolean;
    isSelectable: boolean;
  };
  settings: {
    id: number;
    userId: number;
    colorPrimary: string;
    colorSecondary: string;
    darkModePreference: 'light' | 'dark' | 'system';
  };
}>;

// Helper function to convert demo user to API format
const convertDemoUserToApi = (user: (typeof demoUsers)[0]): IUser => ({
  id: user.userId,
  email: user.email,
  name: {
    first: user.firstname,
    last: user.lastname,
    middle: '', // Demo data doesn't have middle name
  },
  birthdate: undefined, // Demo data doesn't have birthdate
  number: user.contactnumber,
  avatar: user.photo || undefined,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// Helper function to create demo query
const createDemoQuery = <TResult, TArgs = void>(handler: (args: TArgs) => TResult) => ({
  queryFn: (args: TArgs) =>
    new Promise<{ data: TResult }>((resolve) => {
      setTimeout(() => resolve({ data: handler(args) }), 300);
    }),
});

// Helper function to verify password
const verifyPassword = (encryptedPassword: string, plainPassword: string): boolean => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, 'keyjeyelpi').toString(
      CryptoJS.enc.Utf8,
    );
    const decryptedPlain = CryptoJS.AES.decrypt(plainPassword, 'keyjeyelpi').toString(
      CryptoJS.enc.Utf8,
    );
    return decrypted === decryptedPlain;
  } catch {
    return false;
  }
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Users'],
  endpoints: (builder) => ({
    // Get all users with pagination
    getUsers: builder.query<IUsersResponse, IUserQueryParams | void>({
      ...(DEMO_MODE
        ? createDemoQuery<IUsersResponse, IUserQueryParams | void>((params) => {
            const page = params?.page ?? 1;
            const limit = params?.limit ?? 10;
            const start = (page - 1) * limit;
            const end = start + limit;

            let filteredUsers = [...demoUsers];

            if (params?.search) {
              const search = params.search.toLowerCase();
              filteredUsers = filteredUsers.filter(
                (user) =>
                  user.firstname.toLowerCase().includes(search) ||
                  user.lastname.toLowerCase().includes(search) ||
                  user.email.toLowerCase().includes(search) ||
                  user.username.toLowerCase().includes(search),
              );
            }

            if (params?.sortBy) {
              filteredUsers.sort((a, b) => {
                const aValue = String(a[params.sortBy as keyof typeof a] ?? '');
                const bValue = String(b[params.sortBy as keyof typeof b] ?? '');
                return params.sortOrder === 'desc'
                  ? bValue.localeCompare(aValue)
                  : aValue.localeCompare(bValue);
              });
            }

            return {
              users: filteredUsers.slice(start, end).map(convertDemoUserToApi),
              total: filteredUsers.length,
              page,
              limit,
            };
          })
        : {
            query: (params) => ({
              url: '/users',
              params: params ?? {},
            }),
          }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({
                type: 'User' as const,
                id,
              })),
              {
                type: 'Users',
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'Users',
                id: 'LIST',
              },
            ],
    }),
    // Get user by ID
    getUserById: builder.query<IUser, string>({
      ...(DEMO_MODE
        ? createDemoQuery<IUser, string>((id) => {
            const user = demoUsers.find((u) => u.userId === id);
            if (!user) {
              throw new Error('User not found');
            }
            return convertDemoUserToApi(user);
          })
        : {
            query: (id) => `/users/${id}`,
          }),
      providesTags: (_result, _error, id) => [
        {
          type: 'User',
          id,
        },
      ],
    }),
    // Get current user profile
    getCurrentUser: builder.query<IUser, void>({
      ...(DEMO_MODE
        ? createDemoQuery<IUser, void>(() => {
            // Demo mode getCurrentUser logic - return the first admin user
            const adminUser = demoUsers.find((u) => u.accountTypeId === 'ACC-ADMIN');
            if (adminUser) {
              return convertDemoUserToApi(adminUser);
            }
            // Fallback to first user
            return convertDemoUserToApi(demoUsers[0]);
          })
        : {
            query: () => '/users/me',
          }),
      providesTags: ['User'],
    }),
    // Create new user
    createUser: builder.mutation<IUser, IUserCreateRequest>({
      ...(DEMO_MODE
        ? createDemoQuery<IUser, IUserCreateRequest>((data) => {
            const encryptedPassword = CryptoJS.AES.encrypt('Password123', 'keyjeyelpi').toString(); // Default password
            const newUser = {
              id: demoUsers.length + 1,
              userId: `USR-${String(demoUsers.length + 1).padStart(4, '0')}`,
              country: 'US',
              accountTypeId: 'ACC-VIEWER',
              lastname: data.name.last,
              firstname: data.name.first,
              email: data.email,
              username: data.email.split('@')[0],
              password: encryptedPassword,
              contactnumber: data.number || '+1-555-000-0000',
              photo: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              accountType: {
                title: 'Viewer',
                isEditable: false,
                isDeletable: true,
                allowedToEdit: false,
                isSelectable: true,
              },
              settings: {
                id: demoUsers.length + 1,
                userId: demoUsers.length + 1,
                colorPrimary: '#1976d2',
                colorSecondary: '#9c27b0',
                darkModePreference: 'system' as const,
              },
            };

            demoUsers.push(newUser);
            return convertDemoUserToApi(newUser);
          })
        : {
            query: (body) => ({
              url: '/users',
              method: 'POST',
              body,
            }),
          }),
      invalidatesTags: [
        {
          type: 'Users',
          id: 'LIST',
        },
      ],
    }),
    // Update user
    updateUser: builder.mutation<IUser, IUserUpdateRequest>({
      ...(DEMO_MODE
        ? createDemoQuery<IUser, IUserUpdateRequest>(({ id, ...data }) => {
            const userIndex = demoUsers.findIndex((u) => u.userId === id);
            if (userIndex === -1) {
              throw new Error('User not found');
            }

            const updatedUser = {
              ...demoUsers[userIndex],
              ...data,
              updatedAt: new Date().toISOString(),
            };

            demoUsers[userIndex] = updatedUser;
            return convertDemoUserToApi(updatedUser);
          })
        : {
            query: ({ id, ...body }) => ({
              url: `/users/${id}`,
              method: 'PATCH',
              body,
            }),
          }),
      invalidatesTags: (_result, _error, { id }) => [
        {
          type: 'User',
          id,
        },
        {
          type: 'Users',
          id: 'LIST',
        },
      ],
    }),
    // Delete user
    deleteUser: builder.mutation<void, string>({
      ...(DEMO_MODE
        ? createDemoQuery<void, string>((id) => {
            const userIndex = demoUsers.findIndex((u) => u.userId === id);
            if (userIndex === -1) {
              throw new Error('User not found');
            }

            demoUsers.splice(userIndex, 1);
          })
        : {
            query: (id) => ({
              url: `/users/${id}`,
              method: 'DELETE',
            }),
          }),
      invalidatesTags: (_result, _error, id) => [
        {
          type: 'User',
          id,
        },
        {
          type: 'Users',
          id: 'LIST',
        },
      ],
    }),
    // User login
    login: builder.mutation<IUserLoginResponse, IUserLoginRequest>({
      ...(DEMO_MODE
        ? createDemoQuery<IUserLoginResponse, IUserLoginRequest>((credentials) => {
            const user = demoUsers.find(
              (u) => u.username === credentials.username || u.email === credentials.username,
            );

            if (!user || !verifyPassword(user.password, credentials.password)) {
              throw new Error('Invalid credentials');
            }

            const apiUser = convertDemoUserToApi(user);
            const token = 'demo-token-' + Math.random().toString(36).substr(2, 32);
            localStorage.setItem('token', token);
            return { user: apiUser, token };
          })
        : {
            query: (credentials) => ({
              url: '/auth/login',
              method: 'POST',
              body: credentials,
            }),
          }),
      async onQueryStarted(_credentials, { queryFulfilled }) {
        if (!DEMO_MODE) {
          try {
            const { data } = await queryFulfilled;
            // Store the token for subsequent API calls
            localStorage.setItem('token', data.token);
          } catch {
            // Login failed, no token to store
          }
        }
      },
    }),
    // User logout
    logout: builder.mutation<void, void>({
      ...(DEMO_MODE
        ? createDemoQuery<void, void>(() => {
            localStorage.removeItem('token');
          })
        : {
            query: () => ({
              url: '/auth/logout',
              method: 'POST',
            }),
          }),
      async onQueryStarted(_, { queryFulfilled }) {
        if (!DEMO_MODE) {
          try {
            await queryFulfilled;
            // Remove the token on logout
            localStorage.removeItem('token');
          } catch {
            // Still remove token even if logout request fails
            localStorage.removeItem('token');
          }
        }
      },
    }),
    // User registration
    register: builder.mutation<IUser, IUserCreateRequest>({
      ...(DEMO_MODE
        ? createDemoQuery<IUser, IUserCreateRequest>((data) => {
            const encryptedPassword = CryptoJS.AES.encrypt(data.password, 'keyjeyelpi').toString();
            const newUser = {
              id: demoUsers.length + 1,
              userId: `USR-${String(demoUsers.length + 1).padStart(4, '0')}`,
              country: 'PH',
              accountTypeId: 'ACC-ADMIN',
              lastname: data.name.last,
              firstname: data.name.first,
              email: data.email,
              username: data.email.split('@')[0],
              password: encryptedPassword,
              contactnumber: data.number || '+63-917-000-0000',
              photo: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              accountType: {
                title: 'Administrator',
                isEditable: true,
                isDeletable: false,
                allowedToEdit: true,
                isSelectable: true,
              },
              settings: {
                id: demoUsers.length + 1,
                userId: demoUsers.length + 1,
                colorPrimary: '#1976d2',
                colorSecondary: '#9c27b0',
                darkModePreference: 'system' as const,
              },
            };

            demoUsers.push(newUser);
            return convertDemoUserToApi(newUser);
          })
        : {
            query: (body) => ({
              url: '/auth/register',
              method: 'POST',
              body,
            }),
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
