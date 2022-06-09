import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import {
  addUser,
  selectUser,
  updateUser,
} from '../../store/actions/users.action';
import {
  selectedUserIdSelector,
  selectedUserSelector,
  userRolesSelector,
} from '../../store/selectors';
import { UserRequiredProps } from '../../types/user-required-props.interface';
import { UserRoleInterface } from '../../types/user-role.interface';
import { UserModelInterface } from '../../types/user.interface';

@Component({
  selector: 'my-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  user$: Observable<UserModelInterface | null>;
  userId!: number;
  roles$: Observable<UserRoleInterface[]>;
  userForm: FormGroup;

  constructor(private store: Store, private userSVC: UsersService) {
    this.user$ = store.pipe(select(selectedUserSelector));
    this.roles$ = store.pipe(select(userRolesSelector));
    store
      .select(selectedUserIdSelector)
      .subscribe((value) => (this.userId = value));
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      roleIds: new FormControl([]),
    });
    this.user$.subscribe((data) =>
      this.userForm.setValue({
        name: data ? data.name : '',
        email: data ? data.email : '',
        roleIds: data ? data.roleIds : [],
      })
    );
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
        this.store.dispatch(updateUser({ user: updatedUser }));
      } else {
        const newUser: UserModelInterface = {
          id: 0,
          name: user.name,
          email: user.email,
          roleIds: user.roleIds,
        };
        this.store.dispatch(addUser({ user: newUser }));
      }
    }
    this.reset();
    return;
  }

  reset(): void {
    this.store.dispatch(selectUser({ id: -1 }));
    this.userForm.setValue({
      name: '',
      email: '',
      roleIds: [],
    });
  }
}
