import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RolesState } from '../../store/roles/roles.state';
import { Users } from '../../store/users/users.actions';
import { UsersState } from '../../store/users/users.state';
import { UserRequiredProps } from '../../types/user-required-props.interface';
import { UserRoleInterface } from '../../types/user-role.interface';
import { UserModelInterface } from '../../types/user.interface';

@Component({
  selector: 'my-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Select(UsersState.selectedUser)
  user$!: Observable<UserModelInterface | null>;

  @Select(UsersState.selectedUserId) userId$!: Observable<number>;
  userId: number;
  @Select(RolesState.roles) roles$!: Observable<UserRoleInterface[]>;

  userForm: FormGroup;

  constructor(private store: Store) {
    this.userId = -1;
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      roleIds: new FormControl([]),
    });
    this.user$.subscribe((data) => {
      this.userForm.setValue({
        name: data ? data.name : '',
        email: data ? data.email : '',
        roleIds: data ? data.roleIds : [],
      });
      this.userId = data ? data.id : -1;
    });
  }

  submit(user: UserRequiredProps): void {
    console.log(user);
    if (this.userForm.valid) {
      if (this.userId > -1) {
        const updatedUser: UserModelInterface = {
          id: this.userId,
          name: user.name,
          email: user.email,
          roleIds: user.roleIds,
        };
        this.store.dispatch(new Users.UpdateUser({ user: updatedUser }));
      } else {
        const newUser: UserModelInterface = {
          id: 0,
          name: user.name,
          email: user.email,
          roleIds: user.roleIds,
        };
        this.store.dispatch(new Users.AddUser({ user: newUser }));
      }
    }
    this.reset();
    return;
  }

  reset(): void {
    this.store.dispatch(new Users.SelectUser({ id: -1 }));
    this.userForm.setValue({
      name: '',
      email: '',
      roleIds: [],
    });
  }
}
