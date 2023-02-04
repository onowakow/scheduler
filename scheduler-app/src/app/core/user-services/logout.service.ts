import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private http: HttpClient) {}

  logout$ = this.http
    .get<{ message: string }>(`${BASE_URL}/users/logout`, {
      withCredentials: true,
    })
    .pipe(
      tap(() => {
        this._refreshNeeded$.next(0);
      })
    );

  private _refreshNeeded$ = new BehaviorSubject(0);

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
}
