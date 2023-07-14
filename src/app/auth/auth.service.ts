import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

import { SignupCredentials } from '../shared/interfaces';
import { SigninCredentials } from '../shared/interfaces';
import { SignupResponse } from '../shared/interfaces';
import { environment } from '../../environment';
import { SigninResponse } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signedin$ = new BehaviorSubject<boolean | null>(null);
  username = '';

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(
      `${environment.rootUrl}/auth/username`,
      { username: username }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${environment.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SigninResponse>(`${environment.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(`${environment.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(`${environment.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
