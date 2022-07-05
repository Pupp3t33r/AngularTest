import { UserModelInterface } from './user.interface';

export interface UserTableStateInterface {
  userList: UserModelInterface[];
  isLoading: boolean;
  selectedUserId: number;
}
