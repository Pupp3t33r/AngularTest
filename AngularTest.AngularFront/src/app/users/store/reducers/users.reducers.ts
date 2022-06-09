import { Action, createReducer, on } from '@ngrx/store';
import { UserTableStateInterface } from '../../types/user-table-state.interface';
import {
  addUserSuccess,
  deleteUserSuccess,
  loadUsersAction,
  loadUsersActionSuccess,
  selectUser,
  updateUserSuccess,
} from '../actions/users.action';

const InitialState: UserTableStateInterface = {
  userList: [],
  isLoading: false,
  selectedUserId: -1,
};

const usersTableReducer = createReducer(
  InitialState,
  on(loadUsersAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadUsersActionSuccess, (state, action) => ({
    ...state,
    userList: action.users,
    isLoading: false,
  })),
  on(addUserSuccess, (state, { user }) => ({
    ...state,
    userList: [...state.userList, user],
  })),
  on(updateUserSuccess, (state, { user }) => {
    const updatedUserIndex = state.userList.findIndex(
      (value) => value.id === user.id
    );
    const newList = state.userList.map((value, index) =>
      index === updatedUserIndex ? user : value
    );
    return { ...state, userList: newList };
  }),
  on(deleteUserSuccess, (state, { id }) => ({
    ...state,
    userList: state.userList.filter((value) => value.id !== id),
  })),
  on(selectUser, (state, { id }) => ({
    ...state,
    selectedUserId: id,
  }))
);

export function usersReducers(state: UserTableStateInterface, action: Action) {
  return usersTableReducer(state, action);
}
