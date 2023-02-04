import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../../login/login.model';
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath;

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginUrl = `${BASE_PATH}/users/login`;

  constructor(private http: HttpClient) {}

  login$(login: Login): Observable<{ email: string }> {
    return this.http
      .post<Login>(this.loginUrl, login, { withCredentials: true })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
}
