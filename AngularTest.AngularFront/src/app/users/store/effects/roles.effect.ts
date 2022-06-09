import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import {
  loadRolesAction,
  loadRolesActionSuccess,
  loadRolesActionFailure,
} from '../actions/roles.action';

@Injectable()
export class LoadRolesEffect {
  constructor(private actions$: Actions, private userSvc: UsersService) {}

  loadRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRolesAction),
      switchMap(() => {
        return this.userSvc.getAllRoles().pipe(
          map((roles) => {
            return loadRolesActionSuccess({ roles });
          }),

          catchError(() => {
            return of(loadRolesActionFailure());
          })
        );
      })
    );
  });
}
