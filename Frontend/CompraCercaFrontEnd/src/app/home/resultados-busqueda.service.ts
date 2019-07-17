import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';


export interface ItemResponse {
  lat: number;
  lng: number;
  image: string;
  name: string;
  adress: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResultadosBusquedaService {

  BASE_URL  = 'http://localhost:3000';
  LOCATIONS_URL = '/posts';

  constructor(private http: HttpClient) {

  }

  getLocations(): Observable<ItemResponse[]> {
      return this.http.get<ItemResponse[]>(this.BASE_URL + this.LOCATIONS_URL).pipe(
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }




}
