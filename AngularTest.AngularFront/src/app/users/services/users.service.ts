import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModelInterface } from '../types/user.interface';
import { environment } from 'src/environments/environment';
import { UserRoleInterface } from '../types/user-role.interface';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<UserModelInterface[]> {
    const url = environment.apiUrl + '/users';
    return this.http.get<UserModelInterface[]>(url);
  }

  addUser(user: UserModelInterface): Observable<UserModelInterface> {
    const url = environment.apiUrl + '/users';
    return this.http.post<UserModelInterface>(url, user);
  }

  updateUser(user: UserModelInterface): Observable<any> {
    const url = environment.apiUrl + '/users';
    return this.http.put(url, user);
  }

  deleteUser(id: number): Observable<number> {
    const url = environment.apiUrl + `/users/${id}`;
    return this.http.delete<number>(url);
  }

  getAllRoles(): Observable<UserRoleInterface[]> {
    const url = environment.apiUrl + '/roles';
    return this.http.get<UserRoleInterface[]>(url);
  }
}
