import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Login } from '../../login/login.model';
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath;

@Injectable()
export class LoginService {
  private loginUrl = `${BASE_PATH}/users/login`;

  constructor(private http: HttpClient) {}

  attemptLogin(login: Login): Observable<{ email: string }> {
    return this.http
      .post<Login>(this.loginUrl, login, { withCredentials: true })
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
