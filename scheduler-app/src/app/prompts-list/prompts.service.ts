import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prompt } from './prompt.model';
const BASE_URL = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class PromptsService {
  constructor(private http: HttpClient) {}

  getPrompts() {
    return this.http
      .get<Prompt>(`${BASE_URL}/prompts`)
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
