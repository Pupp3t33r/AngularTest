import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { catchError, map, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { UserTableStateInterface } from '../../types/user-table-state.interface';
import { UserModelInterface } from '../../types/user.interface';
import { Users } from './users.actions';

@State<UserTableStateInterface>({
  name: 'users',
  defaults: {
    isLoading: false,
    selectedUserId: -1,
    userList: [],
  },
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) {}

  @Action(Users.LoadUsers)
  fetchUsers(ctx: StateContext<UserTableStateInterface>) {
    return this.usersService.getAll().pipe(
      map((users: UserModelInterface[]) => {
        return ctx.dispatch(new Users.LoadUsersSuccess({ users: users }));
      }),

      catchError((error) => {
        return of(ctx.dispatch(new Users.LoadUsersFailure({ error: error })));
      })
    );
  }

  @Action(Users.LoadUsersSuccess)
  fetchUsersSuccess(
    ctx: StateContext<UserTableStateInterface>,
    action: Users.LoadUsersSuccess
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, userList: action.payload.users });
  }

  @Action(Users.SelectUser)
  selectUser(
    ctx: StateContext<UserTableStateInterface>,
    action: Users.SelectUser
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, selectedUserId: action.payload.id });
  }

  @Action(Users.AddUser)
  addUser(ctx: StateContext<UserTableStateInterface>, action: Users.AddUser) {
    return this.usersService.addUser(action.payload.user).pipe(
      map((user: UserModelInterface) => {
        return ctx.dispatch(new Users.AddUserSuccess({ user: user }));
      }),
      catchError((error) => {
        return of(ctx.dispatch(new Users.AddUserFailure({ error: error })));
      })
    );
  }

  @Action(Users.AddUserSuccess)
  addUserSuccess(
    ctx: StateContext<UserTableStateInterface>,
    action: Users.AddUserSuccess
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      userList: [...state.userList, action.payload.user],
    });
  }

  @Action(Users.DeleteUser)
  deleteUser(
    ctx: StateContext<UserTableStateInterface>,
    action: Users.DeleteUser
  ) {
    return this.usersService.deleteUser(action.payload.id).pipe(
      map((id: number) => {
        return ctx.dispatch(new Users.DeleteUserSuccess({ id: id }));
      }),

      catchError((error) => {
        return of(ctx.dispatch(new Users.DeleteUserFailure({ error: error })));
      })
    );
  }

  @Action(Users.DeleteUserSuccess)
  deleteUserSuccess(
    ctx: StateContext<UserTableStateInterface>,
    action: Users.DeleteUserSuccess
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      userList: state.userList.filter(
        (value) => value.id !== action.payload.id
      ),
    });
  }

  @Action(Users.UpdateUser)
  updateUser(
    ctx: StateContext<UserTableStateInterface>,
    action: Users.UpdateUser
  ) {
    return this.usersService.updateUser(action.payload.user).pipe(
      map((updatedUser) => {
        return ctx.dispatch(new Users.UpdateUserSuccess({ user: updatedUser }));
      }),

      catchError((error) => {
        return of(ctx.dispatch(new Users.UpdateUserFailure({ error: error })));
      })
    );
  }

  @Action(Users.UpdateUserSuccess)
  updateUserSuccess(
    ctx: StateContext<UserTableStateInterface>,
    action: Users.UpdateUserSuccess
  ) {
    const state = ctx.getState();
    const updatedUserIndex = state.userList.findIndex(
      (value) => value.id === action.payload.user.id
    );
    const newList = state.userList.map((value, index) =>
      index === updatedUserIndex ? action.payload.user : value
    );
    ctx.setState({ ...state, userList: newList });
  }

  @Selector()
  static usersState(state: UserTableStateInterface) {
    return state;
  }

  @Selector()
  static isLoading(state: UserTableStateInterface) {
    return state.isLoading;
  }

  @Selector()
  static users(state: UserTableStateInterface) {
    return state.userList;
  }

  @Selector()
  static selectedUserId(state: UserTableStateInterface) {
    return state.selectedUserId;
  }

  @Selector()
  static selectedUser() {
    return createSelector([UsersState], (state: UserTableStateInterface) => {
      return (
        state.userList.find((user) => user.id === state.selectedUserId) || null
      );
    });
  }
}
