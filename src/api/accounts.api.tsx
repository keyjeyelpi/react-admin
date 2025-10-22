import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './base-query.api';
import { store } from '../store';
import type { iAPIResponse } from '../interfaces/api.interface';
import { setAccountTypes } from '../store/slices/users.slice';
import type { iAccountType } from '../interfaces/users.interface';

const AccountsAPI = createApi({
  reducerPath: 'accountsAPI',
  baseQuery: customBaseQuery,
  tagTypes: ['Accounts'],
  endpoints: (builder) => ({
    fetchAccounts: builder.query<any, void>({
      query: () => ({
        url: '/account',
      }),
      transformResponse: (response: iAPIResponse<iAccountType[]>) => {
        const { dispatch } = store;

        dispatch(setAccountTypes(response.data));

        return response.data;
      },
    }),
  }),
});

export default AccountsAPI;
export const { useFetchAccountsQuery, useLazyFetchAccountsQuery } = AccountsAPI;
