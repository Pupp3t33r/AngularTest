import { Action, createReducer, on } from '@ngrx/store';
import { UserRolesStateInterface } from '../../types/user-roles-state.interface';
import { loadRolesActionSuccess } from '../actions/roles.action';

const InitialState: UserRolesStateInterface = {
  roles: [],
};

const userRolesReducer = createReducer(
  InitialState,
  on(loadRolesActionSuccess, (state, action) => ({
    ...state,
    roles: action.roles,
  }))
);

export function rolesReducers(state: UserRolesStateInterface, action: Action) {
  return userRolesReducer(state, action);
}
