import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRolesStateInterface } from '../types/user-roles-state.interface';
import { UserTableStateInterface } from '../types/user-table-state.interface';
import { UserModelInterface } from '../types/user.interface';

export const usersFeatureSelector =
  createFeatureSelector<UserTableStateInterface>('users');

export const isLoadingSelector = createSelector(
  usersFeatureSelector,
  (users: UserTableStateInterface) => users.isLoading
);

export const selectedUserIdSelector = createSelector(
  usersFeatureSelector,
  (users: UserTableStateInterface) => users.selectedUserId
);

export const usersListSelector = createSelector(
  usersFeatureSelector,
  (users: UserTableStateInterface) => users.userList
);

export const selectedUserSelector = createSelector(
  selectedUserIdSelector,
  usersListSelector,
  (id, users) => {
    return users.find((user) => user.id === id) || null;
  }
);

export const rolesFeatureSelector =
  createFeatureSelector<UserRolesStateInterface>('roles');

export const userRolesSelector = createSelector(
  rolesFeatureSelector,
  (roles: UserRolesStateInterface) => roles.roles
);
