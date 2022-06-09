import { createAction, props } from '@ngrx/store';
import { UserRoleInterface } from '../../types/user-role.interface';
import { ActionTypes } from '../actionTypes';

export const loadRolesAction = createAction(ActionTypes.ROLES_LOAD);

export const loadRolesActionSuccess = createAction(
  ActionTypes.ROLES_LOAD_SUCCESS,
  props<{ roles: UserRoleInterface[] }>()
);

export const loadRolesActionFailure = createAction(
  ActionTypes.ROLES_LOAD_ERROR
);
