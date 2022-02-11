export type Role = 'admin' | 'user';

export interface User {
  uid: string;
  displayName: string;
  role?: Role;
  email: string;
}
