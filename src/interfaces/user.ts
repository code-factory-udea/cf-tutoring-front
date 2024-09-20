export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
  role: string;
  name: string;
}

export interface UpdateUserRole {
  username: string;
  idRole: number;
}

export interface Role{
  id: number;
  role: string;
}
