import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  getContinents(): Observable<any> {
    return this.http.get<any>('https://thronesapi.com/api/v2/Continents').pipe(
      catchError(this.handleError),
    );
  }

  getCharacters(): Observable<any> {
    return this.http.get<any>('https://thronesapi.com/api/v2/Characters').pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    const errorMessage = `Error status code: ${error.status} at ${error.url}`;
    return throwError(errorMessage);

  }
}
