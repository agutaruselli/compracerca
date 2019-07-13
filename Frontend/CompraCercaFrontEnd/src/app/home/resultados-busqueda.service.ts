import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  BASE_URL  = 'https://unidosmexico85.firebaseio.com';
  LOCATIONS_URL = '/locations.json';

  constructor(private http: HttpClient) {

  }

  getLocations(): Observable<ItemResponse[]> {
      return this.http.get<ItemResponse[]>(this.BASE_URL + this.LOCATIONS_URL);
  }
}
