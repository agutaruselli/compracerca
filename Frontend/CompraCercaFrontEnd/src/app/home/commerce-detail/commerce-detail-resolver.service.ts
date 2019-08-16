import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ResultadosBusquedaService, ItemResponse } from '../resultados-busqueda.service';
import { isRegExp } from 'util';


export interface CommerceDetailInfo {
  lat: number;
  lng: number;
  image: string;
  name: string;
  adress: string;
  website: string;
  phoneNumber: string;
  postalCode: string;
  googleImagesUrl: string [];

}

@Injectable({
  providedIn: 'root'
})
export class CommerceDetailResolverService implements Resolve<CommerceDetailInfo> {

  commerceDetailInfo: CommerceDetailInfo = { lat: null, lng: null, image: null, name: null, 
                                             adress: null, website: null, phoneNumber: null, 
                                             postalCode: null, googleImagesUrl: [] };
  commerceDetailResult: google.maps.places.PlaceResult;
  constructor(private activatedRoute: ActivatedRoute, private resultadosBusquedaService: ResultadosBusquedaService) {
      this.commerceDetailInfo.googleImagesUrl = [];
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<CommerceDetailInfo> {
      this.reloadCommerceDetail();
      if (this.resultadosBusquedaService.activeGoogleCommerce == null)  {
          return null;
      } else {
        /*const commerceIDAndType = route.data;
        const splitedData = commerceIDAndType.split(';');
        if (splitedData[1] === 'Google') {*/
          const request = {
            placeId: this.resultadosBusquedaService.activeGoogleCommerce.place_id,
            fields: ['photo', 'formatted_phone_number', 'international_phone_number', 'opening_hours', 'website']
          };
          const service = new google.maps.places.PlacesService(document.createElement('div'));
          await this.callGoogleDetails(service, request);
          if (this.commerceDetailResult != null) {
            this.commerceDetailInfo.phoneNumber = this.commerceDetailResult.formatted_phone_number;
            this.commerceDetailInfo.adress = this.commerceDetailResult.formatted_address;
            this.commerceDetailInfo.website = this.commerceDetailResult.website;
            if (this.commerceDetailResult.photos != null) {
              for(let photo of this.commerceDetailResult.photos) {
                  this.commerceDetailInfo.googleImagesUrl.push(photo.getUrl({maxWidth: 500, maxHeight: 500}));
              }

            }
            const returnGoogle = this.commerceDetailInfo;
            return returnGoogle;
          }
        /*} else {
          if (splitedData[1] === 'CompraCerca') {
            const request = {
              placeId: splitedData[0],
              fields: ['photo', 'formatted_phone_number', 'international_phone_number', 'opening_hours', 'website']
            };
            const service = new google.maps.places.PlacesService(document.createElement('div'));
            return null;
          }
        }*/
      }
    //});
     return null;
  }

  callGoogleDetails(service: google.maps.places.PlacesService, request: any): Promise<void> {
    return new Promise((resolve, reject) => {
      service.getDetails(request, (place, status)  => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.commerceDetailResult = place;
          resolve();
        } else {
          reject(status);
        }
      });
   });
  }

  reloadCommerceDetail() {
    this.commerceDetailInfo = { lat: null, lng: null, image: null, name: null, 
      adress: null, website: null, phoneNumber: null,
      postalCode: null, googleImagesUrl: [] };
  
  }
}
