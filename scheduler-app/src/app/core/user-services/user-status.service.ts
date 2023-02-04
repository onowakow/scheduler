import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, of } from 'rxjs';
const BASE_URL = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class UserStatusService {
  getUser$() {
    return this.http
      .get<{ email: string }>(`${BASE_URL}/users/status`, {
        withCredentials: true,
      })
      .pipe(catchError((error) => of(null)));
  }

  constructor(private http: HttpClient) {}
}
