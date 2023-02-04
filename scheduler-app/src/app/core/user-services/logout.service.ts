import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private logoutUrl = `${BASE_URL}/users/logout`;

  constructor(private http: HttpClient) {}

  logout$(): Observable<{ message: string }> {
    return this.http
      .get<{ message: string }>(this.logoutUrl, {
        withCredentials: true,
      })
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
