import { Component, OnInit, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadosBusquedaService } from './resultados-busqueda.service';
import { ItemResponse } from './resultados-busqueda.service';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  @ViewChild('map') mapElement: ElementRef;
  latitude: number;
  longitude: number;
  map: google.maps.Map;
  placesService: google.maps.places.PlacesService;
  query = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  puntero: google.maps.LatLng;
  markers: google.maps.Marker [] = [];
  customMarkers: google.maps.Marker [] = [];

  respuestasCompraCerca: ItemResponse[] ;
  cityCircle: google.maps.Circle;
  private unsubscribe$: Subject<any> = new Subject<any>();


  constructor(private resultadosBusquedaService: ResultadosBusquedaService) {
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.initMap();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
      this.puntero =  new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: pos,
        zoom: 15
        });
      const icono = {
        url: 'assets/icon/posicion_actual.svg',
        scaledSize: new google.maps.Size(30, 30)
       };

      const userMarker = new google.maps.Marker({
          position: this.puntero,
          map: this.map,
          icon: icono
       });

      this.cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: '#0066ff',
        fillOpacity: 0.35,
        map: this.map,
        center: pos,
        radius: 3000
       });

  });
 }


  enableMap() {
    console.log('enable map');
  }

  limpiarMapa() {
    for (let i = 0 ; i < this.markers.length; i++) {

      this.markers[i].setMap(null);
      this.markers[i] = null;
    }
    for (let i = 0 ; i < this.customMarkers.length; i++) {

      this.customMarkers[i].setMap(null);
      this.customMarkers[i] = null;
    }
    this.markers = [];
    this.customMarkers = [];
  }

  getLocations() {
   // this.resultadosBusquedaService.getLocations().subscribe(data => this.customMarkers = data);
       this.resultadosBusquedaService.getLocations().pipe(
         takeUntil(this.unsubscribe$)
       )
       .subscribe(data => this.respuestasCompraCerca = data);

  }

  searchText(textoLupa) {
    this.limpiarMapa();
    const valor = textoLupa;
    this.places = [];
    const request = {
      location: this.puntero,
      radius: 5,
      query: textoLupa.target.value
      };

    const service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.getLocations();
            for (const item of this.respuestasCompraCerca) {
              const coordenadasCustom = new google.maps.LatLng(item.lat, item.lng);
              if (this.cityCircle.getBounds().contains(coordenadasCustom)
              && google.maps.geometry.spherical.computeDistanceBetween(this.cityCircle.getCenter(), coordenadasCustom)
                <= this.cityCircle.getRadius()) {
                  const marker = new google.maps.Marker({
                    position: coordenadasCustom,
                    map: this.map
                    });
                  this.customMarkers.push(marker);

                }
            }
            for (const result of results) {
                const place = result;
                //
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                const coordenadas = new google.maps.LatLng(lat, lng);
                if (this.cityCircle.getBounds().contains(coordenadas)
                  && google.maps.geometry.spherical.computeDistanceBetween(this.cityCircle.getCenter(), coordenadas)
                    <= this.cityCircle.getRadius()) {
                      const marker = new google.maps.Marker({
                      position: place.geometry.location,
                      map: this.map
                      });
                      this.markers.push(marker);
                }
            }
      }
    }
    );

    /*
    this.placesService.getDetails({placeId: place.place_id}, (details) => {

            location.name = details.name;
            location.lat = details.geometry.location.lat();
            location.lng = details.geometry.location.lng();
            this.saveDisabled = false;

            this.maps.map.setCenter({lat: location.lat, lng: location.lng}); 

            this.location = location;

        });

    });*/

}
/*
searchPlace(){

  this.saveDisabled = true;

  if(this.query.length > 0 && !this.searchDisabled) {

      let config = {
          types: ['geocode'],
          input: this.query
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

          if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

              this.places = [];

              predictions.forEach((prediction) => {
                  this.places.push(prediction);
              });
          }

      });

  } else {
      this.places = [];
  }

}
*/



}
