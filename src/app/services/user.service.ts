import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResgisterForm } from '../interfaces/register-form.inferface';
import { loginForm } from '../interfaces/login-form.interface';
import { map, tap, Observable, catchError, of, delay } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserResponse } from '../interfaces/usersLoaded.interface';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get user_id():string {
    return this.user.user_id! || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      },
    }
  }

  get Role(): 'USER_ROLE'| 'ADMIN_ROLE' {
    return this.user.role!
  }

  saveOnStorage(token: string, menu: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('menu', JSON.stringify(menu))
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  tokenValidation(): Observable<boolean> {
    return this.http.get(`${baseUrl}/login/renew`, { headers: {'x-token': this.token} })
      .pipe(
        tap((resp: any) => {
          const { name, email, img, google, role, user_id } = resp.user
          this.user = new User(name, email, '', img, google, role, user_id);
          this.saveOnStorage(resp.token, resp.menu)
        }),
        map(resp => true),
        catchError(error => of(false))
      );
  }


  createANewUser(formData: ResgisterForm) {
    return this.http.post(`${baseUrl}/users`, formData);
  }



  userLogin(formData : loginForm) {
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(
        tap(
          ((resp: any) => {
            this.saveOnStorage(resp.token, resp.menu)
          })
        )
      )
  }


  updateUserProfile( user: User ) {

    return this.http.put(`${ baseUrl }/users/${ user.user_id ||this.user_id}`, user, this.headers);

  }

  loadUsersList(from: number) {
    return this.http.get<UserResponse>(`${baseUrl}/users?pagination=${from}`, this.headers)
      .pipe(
        delay(200),
        map(
          resp => {
            const users = resp.users.map(
              user => new User(user.name, user.email, '', user.img, user.google, user.role, user.user_id)
            );
            return {
              total: resp.total,
              users
            }
       })
    )
  }

  deleteUserConfirmation(user_id: string) {
    return this.http.delete(`${baseUrl}/users/${user_id}`, this.headers)
  }

}
