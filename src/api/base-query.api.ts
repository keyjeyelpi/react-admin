import {
  fetchBaseQuery,
  type FetchBaseQueryError,
  type BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import type { IFRootState } from '../store';
import { removeCurrentUser } from '../store/slices/users.slice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  mode: 'cors',
  timeout: import.meta.env.VITE_TIMEOUT || 30000,
  prepareHeaders: (headers, { getState }) => {
    const {
      users: { currentUser },
    } = getState() as IFRootState;

    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    headers.set(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept, Authorization, X-Request-With',
    );

    if (currentUser?.token) {
      headers.set('Authorization', `Bearer ${currentUser.token}`);
    }

    return headers;
  },
});

const customBaseQuery: BaseQueryFn<any, any, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const err = result.error as FetchBaseQueryError & {
      data?: { error?: string; message?: string };
    };

    if (
      (err.status === 401 && err.data?.error === 'TokenExpired') ||
      (err.status === 403 && err.data?.error === 'InvalidToken')
    ) {
      api.dispatch(removeCurrentUser());
    }
  }

  return result;
};

export default customBaseQuery;
