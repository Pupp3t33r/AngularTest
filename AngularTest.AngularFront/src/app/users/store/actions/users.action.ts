import { createAction, props } from '@ngrx/store';
import { UserModelInterface } from '../../types/user.interface';
import { ActionTypes } from '../actionTypes';

export const loadUsersAction = createAction(ActionTypes.LOAD);

export const loadUsersActionSuccess = createAction(
  ActionTypes.LOAD_SUCCESS,
  props<{ users: UserModelInterface[] }>()
);

export const loadUsersActionFailure = createAction(ActionTypes.LOAD_ERROR);

export const selectUser = createAction(
  ActionTypes.SELECT_USER,
  props<{ id: number }>()
);

export const deleteUser = createAction(
  ActionTypes.DELETE_USER,
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  ActionTypes.DELETE_USER_SUCCESS,
  props<{ id: number }>()
);

export const deleteUsersActionFailure = createAction(
  ActionTypes.DELETE_USER_ERROR
);

export const updateUser = createAction(
  ActionTypes.UPDATE_USER,
  props<{ user: UserModelInterface }>()
);

export const updateUserSuccess = createAction(
  ActionTypes.UPDATE_USER_SUCCESS,
  props<{ user: UserModelInterface }>()
);

export const updateUsersActionFailure = createAction(
  ActionTypes.UPDATE_USER_ERROR
);

export const addUser = createAction(
  ActionTypes.ADD_USER,
  props<{ user: UserModelInterface }>()
);

export const addUserSuccess = createAction(
  ActionTypes.ADD_USER_SUCCESS,
  props<{ user: UserModelInterface }>()
);

export const addUsersActionFailure = createAction(ActionTypes.ADD_USER_ERROR);
