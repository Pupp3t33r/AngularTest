import { UserRolesStateInterface } from 'src/app/users/types/user-roles-state.interface';
import { UserTableStateInterface } from 'src/app/users/types/user-table-state.interface';

export interface AppStateInterface {
  users: UserTableStateInterface;
  roles: UserRolesStateInterface;
}
