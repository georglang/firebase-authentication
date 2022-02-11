import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './../models/users';
import { environment } from '../../../../../../../functions/environment';

export type CreateUserRequest = {
  displayName: string;
  password: string;
  email: string;
  role: string;
};
export type UpdateUserRequest = { uid: string } & CreateUserRequest;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl + environment.userApiUrl;

  constructor(private http: HttpClient) {}

  get users$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}`).pipe(
      map((result) => {
        return result.users;
      })
    );
  }

  user$(id: string): Observable<User> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/${id}`).pipe(
      map((result) => {
        return result.user;
      })
    );
  }

  create(user: CreateUserRequest) {
    return this.http.post(`${this.baseUrl}`, user).pipe(map((_) => {}));
  }

  edit(user: UpdateUserRequest) {
    return this.http
      .patch(`${this.baseUrl}/${user.uid}`, user)
      .pipe(map((_) => {}));
  }
}
