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

export interface Role {
  id: number;
  role: string;
}

export interface UserList {
  totalPages: number;
  userList: User[];
  currentPage: number;
  pageSize: number;
  hasNextPage: true;
}
