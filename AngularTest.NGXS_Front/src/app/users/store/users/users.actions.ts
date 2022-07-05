import { UserModelInterface } from '../../types/user.interface';
import { ActionTypes } from '../actionTypes';

export namespace Users {
  export class LoadUsers {
    static readonly type = ActionTypes.LOAD;
  }

  export class LoadUsersSuccess {
    static readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: { users: UserModelInterface[] }) {}
  }

  export class LoadUsersFailure {
    static readonly type = ActionTypes.LOAD_ERROR;
    constructor(public payload: { error: any }) {}
  }

  export class SelectUser {
    static readonly type = ActionTypes.SELECT_USER;
    constructor(public payload: { id: number }) {}
  }

  export class DeleteUser {
    static readonly type = ActionTypes.DELETE_USER;
    constructor(public payload: { id: number }) {}
  }

  export class DeleteUserSuccess {
    static readonly type = ActionTypes.DELETE_USER_SUCCESS;
    constructor(public payload: { id: number }) {}
  }

  export class DeleteUserFailure {
    static readonly type = ActionTypes.DELETE_USER_ERROR;
    constructor(public payload: { error: any }) {}
  }

  export class UpdateUser {
    static readonly type = ActionTypes.UPDATE_USER;
    constructor(public payload: { user: UserModelInterface }) {}
  }

  export class UpdateUserSuccess {
    static readonly type = ActionTypes.UPDATE_USER_SUCCESS;
    constructor(public payload: { user: UserModelInterface }) {}
  }

  export class UpdateUserFailure {
    static readonly type = ActionTypes.UPDATE_USER_ERROR;
    constructor(public payload: { error: any }) {}
  }

  export class AddUser {
    static readonly type = ActionTypes.ADD_USER;
    constructor(public payload: { user: UserModelInterface }) {}
  }

  export class AddUserSuccess {
    static readonly type = ActionTypes.ADD_USER_SUCCESS;
    constructor(public payload: { user: UserModelInterface }) {}
  }

  export class AddUserFailure {
    static readonly type = ActionTypes.ADD_USER_ERROR;
    constructor(public payload: { error: any }) {}
  }
}
