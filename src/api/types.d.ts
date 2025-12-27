export type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// User API Types
export interface IUser {
  id: string;
  email: string;
  name: {
    first: string;
    last: string;
    middle?: string;
  };
  birthdate?: string;
  number?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserCreateRequest {
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
    middle?: string;
  };
  birthdate?: string;
  number?: string;
}

export interface IUserUpdateRequest {
  id: string;
  email?: string;
  name?: {
    first?: string;
    last?: string;
    middle?: string;
  };
  birthdate?: string;
  number?: string;
  avatar?: string;
}

export interface IUserLoginRequest {
  username: string;
  password: string;
  signature: string;
}

export interface IUserLoginResponse {
  message: string;
  data: {
    token: string;
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
    settings: {
      id: number;
      userId: number;
      colorPrimary: string;
      colorSecondary: string;
      darkModePreference: 'light' | 'dark' | 'system';
    };
  };
}

export interface IUsersResponse {
  users: IUser[];
  total: number;
  page: number;
  limit: number;
}

export interface IUserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
