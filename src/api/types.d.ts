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
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  user: IUser;
  token: string;
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
