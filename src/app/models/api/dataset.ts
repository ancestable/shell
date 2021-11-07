import { UserRole } from './userRole';

type UserWithRoles = { [userId: string]: UserRole };

export interface DatasetModel {
  _id?: string;
  id?: string;
  users: UserWithRoles;
  name: string;
}
