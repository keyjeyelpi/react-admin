import { setLogout } from '@/store/slices/user.slice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    // Get token from localStorage or your preferred storage
    const token = localStorage.getItem('token');

    if (token) headers.set('Authorization', `Bearer ${token}`);

    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired or invalid - clear it and optionally redirect to login
    localStorage.removeItem('token');
    // Optionally dispatch a logout action to clear user state
    api.dispatch(setLogout());
    // Optionally redirect to login page

    // window.location.href = '/login';
  }

  return result;
};

export default baseQueryWithReauth;
