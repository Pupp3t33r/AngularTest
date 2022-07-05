import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { UserRoleInterface } from '../../types/user-role.interface';
import { UserRolesStateInterface } from '../../types/user-roles-state.interface';
import { Roles } from './roles.actions';

@State<UserRolesStateInterface>({
  name: 'roles',
  defaults: {
    roles: [],
  },
})
@Injectable()
export class RolesState {
  constructor(private usersService: UsersService) {}

  @Action(Roles.LoadRoles)
  fetchRoles(ctx: StateContext<UserRolesStateInterface>) {
    return this.usersService.getAllRoles().pipe(
      map((roles: UserRoleInterface[]) => {
        return ctx.dispatch(new Roles.LoadRolesSuccess({ roles: roles }));
      }),

      catchError((error) => {
        return ctx.dispatch(new Roles.LoadRolesFailure({ error: error }));
      })
    );
  }

  @Action(Roles.LoadRolesSuccess)
  fetchRolesSuccess(
    ctx: StateContext<UserRolesStateInterface>,
    action: Roles.LoadRolesSuccess
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, roles: action.payload.roles });
  }

  @Selector()
  static rolesState(state: UserRolesStateInterface) {
    return state;
  }

  @Selector()
  static roles(state: UserRolesStateInterface) {
    return state.roles;
  }
}
