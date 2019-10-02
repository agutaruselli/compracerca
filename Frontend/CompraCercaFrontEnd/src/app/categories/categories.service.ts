import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';


export interface CategoryResponse {
  father: number;
  id: number;
  name: string;
}



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  BASE_URL  = 'http://localhost:3000';
  CATEGORIES_URL = '/categories';

  BASE_URL_BACKEND = 'https://localhost:44323/api/category/';
  LOCATIONS_URL_BACKEND = 'categories/';
  LOCATIONS_URL_BACKEND2 = 'categories/';

  LOCATION_ID = 1;

  activeCategory: CategoryResponse;


  constructor(private http: HttpClient) {

  }

  getCategoryInfo(categoryID: string): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.BASE_URL + this.CATEGORIES_URL + '/' +  categoryID).pipe(
      catchError(this.handleError)
    );
  }

  getBackendCategories(): Observable<string> {
    /*const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8/plain');
    headers.set('Accept', 'text/javascript');*/
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    };
    return this.http.get<string>(this.BASE_URL_BACKEND + this.LOCATIONS_URL_BACKEND, requestOptions).pipe(
      catchError(this.handleError)
    );
  }
  /*
  getFatherCategories(): Observable<CategoryResponse[]> {
      return this.http.get<CategoryResponse[]>(this.BASE_URL + this.CATEGORIES_URL).pipe(
        catchError(this.handleError)
      );
  }*/
  /*
  getFatherCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.BASE_URL + this.CATEGORIES_URL).pipe(
      catchError(this.handleError)
    );
  }
*/
  getFatherCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.BASE_URL_BACKEND + this.LOCATIONS_URL_BACKEND).pipe(
      catchError(this.handleError)
    );
  }

  /*
  getChildCategories(categoryID: string): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.BASE_URL + this.CATEGORIES_URL).pipe(
      catchError(this.handleError)
    );

}*/
getChildCategories(categoryID: string): Observable<CategoryResponse[]> {
  return this.http.get<CategoryResponse[]>(this.BASE_URL_BACKEND + this.LOCATIONS_URL_BACKEND2 + categoryID).pipe(
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
