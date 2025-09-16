export interface iUserState {
  id?: string;
  profile?: iUserProfile;
}

interface iUserProfile {
  name: {
    first: string;
    last: string;
    middle?: string;
  };
  birthdate: string;
  number?: string;
  email?: string;
  avatar?: string;
}
