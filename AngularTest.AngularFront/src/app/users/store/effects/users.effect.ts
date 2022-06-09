import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import {
  addUser,
  addUsersActionFailure,
  addUserSuccess,
  deleteUser,
  deleteUsersActionFailure,
  deleteUserSuccess,
  loadUsersAction,
  loadUsersActionFailure,
  loadUsersActionSuccess,
  updateUser,
  updateUsersActionFailure,
  updateUserSuccess,
} from '../actions/users.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userSvc: UsersService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsersAction),
      exhaustMap(() => {
        return this.userSvc.getAll().pipe(
          map((users) => {
            return loadUsersActionSuccess({ users });
          }),

          catchError(() => {
            return of(loadUsersActionFailure());
          })
        );
      })
    );
  });

  // AddUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addUser),
  //     exhaustMap((param) =>
  //       this.userSvc.addUser(param.user).pipe(
  //         map((newId) => {
  //           let newUser = param.user;
  //           newUser.id = newId;
  //           console.log(newUser);
  //           return addUserSuccess({ user: newUser });
  //         })
  //       )
  //     )
  //   )
  // );

  AddUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addUser),
      exhaustMap((param) => {
        return this.userSvc.addUser(param.user).pipe(
          map((newUser) => {
            return addUserSuccess({ user: newUser });
          }),

          catchError(() => {
            return of(addUsersActionFailure());
          })
        );
      })
    );
  });

  UpdateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      exhaustMap((param) => {
        return this.userSvc.updateUser(param.user).pipe(
          map(() => {
            return updateUserSuccess({ user: param.user });
          }),

          catchError(() => {
            return of(updateUsersActionFailure());
          })
        );
      })
    );
  });

  DeleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUser),
      exhaustMap((param) => {
        return this.userSvc.deleteUser(param.id).pipe(
          map((id) => {
            return deleteUserSuccess({ id });
          }),

          catchError(() => {
            return of(deleteUsersActionFailure());
          })
        );
      })
    );
  });
}
