import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

import { SignupCredentials } from '../shared/interfaces';
import { SignupResponse } from '../shared/interfaces';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signedin$ = new BehaviorSubject(false);

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
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }
}
