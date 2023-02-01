import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Login } from './login.model';

@Injectable()
export class LoginService {
  login: Login = {
    email: '',
    password: '',
  };

  private loginUrl = 'http://localhost:3000/users/login';

  constructor(private http: HttpClient) {}

  attemptLogin() {
    return this.http
      .post<Login>(this.loginUrl, this.login)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side error
      console.error('An error ocurred:', error.error);
    } else {
      console.error(
        `API returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
