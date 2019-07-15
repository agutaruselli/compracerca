import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/throw';

export interface ItemResponse {
  lat: number;
  lng: number;
  image: ImageData;
  name: string;
  adress: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResultadosBusquedaService {

  BASE_URL  = 'localhost:3000';
  LOCATIONS_URL = '/posts';

  constructor(private http: HttpClient) {

  }

  getLocations(): Observable<ItemResponse[]> {
      return this.http.get<ItemResponse[]>(this.BASE_URL + this.LOCATIONS_URL);
  }



  
}
