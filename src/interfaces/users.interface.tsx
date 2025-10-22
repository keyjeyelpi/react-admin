export interface iUsersState {
  list: iUserWithAccountType[];
  account_types?: iAccountType[];
  currentUser?: iCurrentUser;
}

export interface iUser {
  id?: string;
  user_id: string;
  firstname: string;
  lastname: string;
  email: string;
  contactnumber: string;
  country: string;
  username: string;
  photo?: string;
}

export interface iUserWithAccountType extends iUser {
  account_type: Omit<iAccountType, 'id' & 'account_id'>;
}

export interface iCurrentUser {
  id: string;
  token: string;
}

export interface iAccountType {
  id: string;
  account_id: string;
  title: string;
  is_editable: boolean;
  is_deletable: boolean;
  is_selectable: boolean;
  allowed_to_edit: boolean;
}
