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

  activeGoogleCommerce: google.maps.places.PlaceResult;
  extraGoogleCommerce: google.maps.places.PlaceResult ;
  activeCompraCercaCommerce: ItemResponse;


  photoUrls: string[] = [];

  constructor(private http: HttpClient) {
  }
  /*async*/ setActiveGoogleCommerce(commerce: google.maps.places.PlaceResult) {
    this.activeCompraCercaCommerce = null;
    this.photoUrls = null;
    this.photoUrls = [];
    this.activeGoogleCommerce = commerce;
    /*
    const request = {
      placeId: commerce.place_id,
      fields: ['photo', 'formatted_phone_number', 'international_phone_number', 'opening_hours', 'website']
    };
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    await this.callGoogleDetails(service, request);*/
  }
 /*private callGoogleDetails(service: any, request: any) {
    service.getDetails(request, (place, status)  => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.extraGoogleCommerce = place;
        if (place.photos != null) {
            for (const photo of  place.photos) {
              this.photoUrls.push(photo.getUrl({maxWidth: null, maxHeight: null}));
            }
        }
      }
    });
 }*/
  private callGoogleDetails(service: any, request: any) {
  //  return new Promise((resolve, reject) => {
    service.getDetails(request, (place, status)  => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.extraGoogleCommerce = place;
        if (place.photos != null) {
            for (const photo of  place.photos) {
              this.photoUrls.push(photo.getUrl({maxWidth: null, maxHeight: null}));
            }
        }
      }
    });
 // });
}


  getActiveGoogleCommerce() {
    return this.activeGoogleCommerce;
  }
  setActiveCompraCercaCommerce(commerce: ItemResponse) {
    this.activeGoogleCommerce = null;
    this.activeCompraCercaCommerce = commerce;
  }
  getActiveCompraCercaCommerce() {
    return this.activeGoogleCommerce;
  }
  getLocations(textSearch: string): Observable<ItemResponse[]> {
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
