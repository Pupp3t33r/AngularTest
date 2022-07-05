import { UserRoleInterface } from '../../types/user-role.interface';
import { ActionTypes } from '../actionTypes';

export namespace Roles {
  export class LoadRoles {
    static readonly type = ActionTypes.ROLES_LOAD;
  }

  export class LoadRolesSuccess {
    static readonly type = ActionTypes.ROLES_LOAD_SUCCESS;
    constructor(public payload: { roles: UserRoleInterface[] }) {}
  }

  export class LoadRolesFailure {
    static readonly type = ActionTypes.ROLES_LOAD_ERROR;
    constructor(public payload: { error: any }) {}
  }
}
