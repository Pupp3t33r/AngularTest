import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersService } from './services/users.service';
import { LoadRolesEffect } from './store/effects/roles.effect';
import { UserEffects } from './store/effects/users.effect';
import { usersReducers } from './store/reducers/users.reducers';
import { rolesReducers } from './store/reducers/roles.reducers';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersViewComponent } from './components/users-view/users-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: 'users',
    component: UsersViewComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('users', usersReducers),
    StoreModule.forFeature('roles', rolesReducers),
    EffectsModule.forFeature([UserEffects, LoadRolesEffect]),
  ],
  declarations: [UsersTableComponent, UserDetailsComponent, UsersViewComponent],
  providers: [UsersService],
})
export class UsersModule {}
