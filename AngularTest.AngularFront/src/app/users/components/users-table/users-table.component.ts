import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { loadRolesAction } from '../../store/actions/roles.action';
import {
  deleteUser,
  loadUsersAction,
  selectUser,
} from '../../store/actions/users.action';
import {
  isLoadingSelector,
  userRolesSelector,
  usersListSelector,
} from '../../store/selectors';
import { UserRoleInterface } from '../../types/user-role.interface';
import { UserModelInterface } from '../../types/user.interface';

@Component({
  selector: 'my-user-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  isLoading$: Observable<boolean>;
  users$: Observable<UserModelInterface[]>;
  roles$: Observable<UserRoleInterface[]>;
  roles!: UserRoleInterface[];
  userRolesMap: Map<number, string> = new Map();

  constructor(private store: Store, private svc: UsersService) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.users$ = this.store.pipe(select(usersListSelector));
    this.roles$ = this.store.pipe(select(userRolesSelector));
    this.refreshUserRolesMap();
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsersAction());
    this.store.dispatch(loadRolesAction());
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
    this.store.dispatch(selectUser({ id }));
  }

  deleteUser(id: number) {
    this.store.dispatch(deleteUser({ id }));
  }
}
