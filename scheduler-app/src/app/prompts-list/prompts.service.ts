import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prompt } from './prompt.model';
const BASE_URL = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class PromptsService {
  prompts$ = this.http
    .get<Prompt[]>(`${BASE_URL}/prompts`, {
      withCredentials: true,
    })
    .pipe(
      catchError((error) => {
        return of([]);
      })
    );

  constructor(private http: HttpClient) {}
}
