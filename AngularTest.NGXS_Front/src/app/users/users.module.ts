import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersViewComponent } from './components/users-view/users-view.component';
import { UsersService } from './services/users.service';
import { RolesState } from './store/roles/roles.state';
import { UsersState } from './store/users/users.state';

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
    NgxsModule.forFeature([UsersState, RolesState]),
  ],
  declarations: [UsersTableComponent, UserDetailsComponent, UsersViewComponent],
  providers: [UsersService],
})
export class UsersModule {}
