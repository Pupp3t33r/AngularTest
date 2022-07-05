import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Roles } from '../../store/roles/roles.actions';
import { RolesState } from '../../store/roles/roles.state';
import { Users } from '../../store/users/users.actions';
import { UsersState } from '../../store/users/users.state';
import { UserRoleInterface } from '../../types/user-role.interface';
import { UserModelInterface } from '../../types/user.interface';

@Component({
  selector: 'my-user-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  @Select(UsersState.isLoading) isLoading$!: Observable<boolean>;
  @Select(UsersState.users) users$!: Observable<UserModelInterface[]>;
  @Select(RolesState.roles) roles$!: Observable<UserRoleInterface[]>;
  roles!: UserRoleInterface[];
  userRolesMap: Map<number, string> = new Map();

  constructor(private store: Store) {
    this.refreshUserRolesMap();
  }

  ngOnInit(): void {
    this.store.dispatch(new Users.LoadUsers());
    this.store.dispatch(new Roles.LoadRoles());
  }

  refreshUserRolesMap() {
    this.roles$.subscribe((data) => {
      this.roles = data;

      for (let i = 0; i < data.length; i++) {
        this.userRolesMap.set(this.roles[i].id, this.roles[i].roleName);
      }
    });
  }

  selectUser(id: number) {
    this.store.dispatch(new Users.SelectUser({ id: id }));
  }

  deleteUser(id: number) {
    this.store.dispatch(new Users.DeleteUser({ id: id }));
  }
}
