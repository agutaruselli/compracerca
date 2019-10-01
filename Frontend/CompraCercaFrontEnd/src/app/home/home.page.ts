import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone   } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResultadosBusquedaService } from './resultados-busqueda.service';
import { ItemResponse } from './resultados-busqueda.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { CategoriesService } from '../categories/categories.service';
import { CategoryResponse } from '../categories/categories.service';
import * as MarkerWithLabel from 'markerwithlabel';
import { MenuController } from '@ionic/angular';


import 'C:/Users/thiago/Documents/GitHub/compracerca/Frontend/CompraCercaFrontEnd/markerclusterer.js';

declare const google: any;
declare var MarkerClusterer: any;

export interface CommerceResult {
  id: string;
  fromGoogle: boolean;
}



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy, OnInit {

  @ViewChild('map') mapElement: ElementRef;
  latitude: number;
  longitude: number;
  map: google.maps.Map;
  placesService: google.maps.places.PlacesService;
  placeSelected: google.maps.places.PlaceResult;
  compraCercaSelected: ItemResponse = { lat: null, lng: null , image: null,
    name: null, adress: null, website: null, phoneNumber: null,
    postalCode: null};
  query = '';
  separatorCharacter = ';';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  categorySearch: CategoryResponse = { father: null, id: null , name: null };
  puntero: google.maps.LatLng = new google.maps.LatLng(0, 0) ;
  markers: google.maps.Marker [] = [];
  markersWithLabel: any [] = [];
  customMarkers: google.maps.Marker [] = [];
  iconoCustomMarkers = {
    url: 'assets/icon/marcadores_compraCerca.svg',
    scaledSize: new google.maps.Size(30, 30)
   };
   iconoRegularMarkers = {
    url: 'assets/icon/marker.svg',
    scaledSize: new google.maps.Size(30, 30),
    labelOrigin: new google.maps.Point(0, -10)
   };
   iconoCompraCerca = {
    url: 'assets/icon/CustomMArkerer3.svg',
    scaledSize: new google.maps.Size(30, 30),
    labelOrigin: new google.maps.Point(0, -10)
  };
   infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
  respuestasCompraCerca: ItemResponse[] =  [];
  cityCircle: google.maps.Circle = new google.maps.Circle({
    center: this.puntero,
    radius: 3000
   });
   markerClusterer: any ;
   zindex = 0;
   zoomLevel = 0;
  private unsubscribe$: Subject<any> = new Subject<any>();


  constructor(private resultadosBusquedaService: ResultadosBusquedaService, private activatedRoute: ActivatedRoute, 
              private categoriesService: CategoriesService, public ngZone: NgZone, private router: Router
              , public menuCtrl: MenuController ) {
    this.searchDisabled = true;
    this.saveDisabled = true;
    (window as any).angularComponent = { GoDetailGoogle: this.GoDetailGoogle, GoDetailCompraCerca: this.GoDetailCompraCerca, zone: ngZone };
   // (window as any).angularComponent = { GoDetailCompraCerca: this.GoDetailCompraCerca, zone: ngZone };

    this.limpiarMapa();
  }

  ngOnInit()  {
    this.menuCtrl.enable(true);
    this.initMap();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  /*
  GoDetailGoogle = (idCommerce: string, isFromGoogle: boolean) => { this.ngZone.run(() => {

    const commerceSelected = {
      id: idCommerce,
      fromGoogle: isFromGoogle
    };
    const navigationExtras: NavigationExtras = {
      state: {
        commerce: commerceSelected
      }
    };
    this.router.navigate(['/categories'], navigationExtras) ;
  });
}*/
GoDetailGoogle = (id: any) => { this.ngZone.run(() => {
  this.resultadosBusquedaService.setActiveGoogleCommerce(this.placeSelected);
  const commerceDetailParameters = this.placeSelected.id + this.separatorCharacter + 'Google';
  this.router.navigate([], {queryParams: {categoryID: null}, queryParamsHandling: 'merge'});
  this.router.navigate(['/commerce-detail', commerceDetailParameters]) ;
});
}

GoDetailCompraCerca = (id: any) => { this.ngZone.run(() => {
  this.resultadosBusquedaService.setActiveCompraCercaCommerce(this.compraCercaSelected);
  this.router.navigate(['/commerce-detail']) ;
});
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
        zoom: 15,
        styles:  [
          {
              'featureType': 'landscape.natural',
              'elementType': 'geometry.fill',
              'stylers': [
                  {
                      'visibility': 'on'
                  },
                  {
                      'color': '#eafafd'
                  }
              ]
          },
          {
              'featureType': 'landscape.natural.landcover',
              'elementType': 'geometry.fill',
              'stylers': [
                  {
                      'color': '#b5fc68'
                  },
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'landscape.natural.terrain',
              'elementType': 'geometry.fill',
              'stylers': [
                  {
                      'color': '#c1ff57'
                  }
              ]
          },
          {
              'featureType': 'poi',
              'elementType': 'geometry.fill',
              'stylers': [
                  {
                      'visibility': 'on'
                  },
                  {
                      'hue': '#1900ff'
                  },
                  {
                      'color': '#c0e8e8'
                  }
              ]
          },
          {
              'featureType': 'poi.attraction',
              'elementType': 'labels',
              'stylers': [
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'poi.business',
              'elementType': 'labels.text',
              'stylers': [
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'poi.business',
              'elementType': 'labels.icon',
              'stylers': [
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'poi.park',
              'elementType': 'geometry.fill',
              'stylers': [
                  {
                      'color': '#d4f77d'
                  }
              ]
          },
          {
              'featureType': 'road',
              'elementType': 'geometry',
              'stylers': [
                  {
                      'lightness': 100
                  },
                  {
                      'visibility': 'simplified'
                  }
              ]
          },
          {
              'featureType': 'road',
              'elementType': 'labels',
              'stylers': [
                  {
                      'visibility': 'off'
                  }
              ]
          },
          {
              'featureType': 'road',
              'elementType': 'labels.text',
              'stylers': [
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'road.highway',
              'elementType': 'labels.text',
              'stylers': [
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'road.highway.controlled_access',
              'elementType': 'labels.text',
              'stylers': [
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'road.arterial',
              'elementType': 'labels.text',
              'stylers': [
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'road.local',
              'elementType': 'labels.text',
              'stylers': [
                  {
                      'visibility': 'on'
                  }
              ]
          },
          {
              'featureType': 'transit.line',
              'elementType': 'geometry',
              'stylers': [
                  {
                      'visibility': 'on'
                  },
                  {
                      'lightness': 700
                  }
              ]
          },
          {
              'featureType': 'water',
              'elementType': 'all',
              'stylers': [
                  {
                      'color': '#7dcdcd'
                  }
              ]
          }
      ]
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
      this.map.fitBounds(this.cityCircle.getBounds());
      this.zoomLevel = this.map.getZoom();
      console.log(this.zoomLevel);
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('categoryID'))  {
            return;
        }
        const categoryID = paramMap.get('categoryID');
        const isnum = /^\d+$/.test(categoryID);
        if (isnum) {
          this.categoriesService.getCategoryInfo(categoryID).subscribe( (res: CategoryResponse) => {
            this.categorySearch = res;
            console.log(res);
            this.searchCategory(this.categorySearch.name);
            });
        } else {
          this.searchTexto(categoryID);
        }
      });
      /*const marker = new MarkerWithLabel({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.puntero,
        icon: this.iconoCustomMarkers,
        labelContent: 'Hey dj toma la disco',
        labelAnchor: new google.maps.Point(18, 12),
        labelClass: 'my-custom-class-for-label', // the CSS class for the label
        labelInBackground: true,
        labelStyle: {opacity: 0.75}
        });*/
  });
 }


  enableMap() {
    console.log('enable map');
  }

  limpiarMapa() {
    if (this.markerClusterer != null) {
      this.markerClusterer.removeMarkers( this.markers );
      this.markerClusterer = null;
    }
    for (let i = 0 ; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
      this.markers[i].unbindAll();
      this.markers[i] = null;
    }
    for (let i = 0 ; i < this.customMarkers.length; i++) {

      this.customMarkers[i].setMap(null);
      this.customMarkers[i] = null;
    }
    this.customMarkers = [];
    this.markers = [];

  }

  getLocations(textSearch: string) {

       this.resultadosBusquedaService.getLocations(textSearch).subscribe( (res: ItemResponse[]) => {
        this.respuestasCompraCerca = res;
        console.log(res);
        for (const item of this.respuestasCompraCerca) {
          const coordenadasCustom = new google.maps.LatLng(item.lat, item.lng);
          if (this.cityCircle.getBounds().contains(coordenadasCustom)
          && google.maps.geometry.spherical.computeDistanceBetween(this.cityCircle.getCenter(), coordenadasCustom)
            <= this.cityCircle.getRadius()) {
              /*const marker = new google.maps.Marker({
                position: coordenadasCustom,
                map: this.map,
                icon: this.iconoCustomMarkers
                });
              this.customMarkers.push(marker); */
              this.addCustomMarker(item);
            }
        }
      });
  }
  searchTexto(texto: string) {
    this.limpiarMapa();
    const valor = texto;
    this.places = [];
    const request = {
      location: this.puntero,
      radius: 5,
      query: texto
      };
    const service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.getLocations(texto);
            for (const result of results) {
                const place = result;
                //
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                const coordenadas = new google.maps.LatLng(lat, lng);
                if (this.cityCircle.getBounds().contains(coordenadas)
                  && google.maps.geometry.spherical.computeDistanceBetween(this.cityCircle.getCenter(), coordenadas)
                    <= this.cityCircle.getRadius()) {
                      this.addMarker(place);
                }
            }
            this.markerClusterer = new MarkerClusterer(this.map, this.markers, {
              imagePath: 'assets/clusterimages/m'
            });
      }
    }
    );
}

  searchText(textoLupa) {
    this.limpiarMapa();
    this.router.navigate(['/home', textoLupa.target.value]) ;
    /*const valor = textoLupa;
    this.places = [];
    const request = {
      location: this.puntero,
      radius: 5,
      query: textoLupa.target.value
      };

    const service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.getLocations(textoLupa.target.value);
            for (const result of results) {
                const place = result;
                //
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                const coordenadas = new google.maps.LatLng(lat, lng);
                if (this.cityCircle.getBounds().contains(coordenadas)
                  && google.maps.geometry.spherical.computeDistanceBetween(this.cityCircle.getCenter(), coordenadas)
                    <= this.cityCircle.getRadius()) {
                      this.addMarker(place);
                }
            }
            this.markerClusterer = new MarkerClusterer(this.map, this.markers, {
              imagePath: 'assets/clusterimages/m'
            });
      }
    }
    );*/
}

searchCategory(categoryName: string) {

  this.limpiarMapa();
  this.places = [];
  const request = {
    location: this.puntero,
    radius: 5,
    query: categoryName
    };
  this.getLocations(categoryName);
  const service = new google.maps.places.PlacesService(this.map);
  service.textSearch(request, (results, status) => {
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (const result of results) {
              const place = result;
              //
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();

              const coordenadas = new google.maps.LatLng(lat, lng);
              if (this.cityCircle.getBounds().contains(coordenadas)
                && google.maps.geometry.spherical.computeDistanceBetween(this.cityCircle.getCenter(), coordenadas)
                  <= this.cityCircle.getRadius()) {
                    this.addMarker(place);
              }
          }
          this.markerClusterer = new MarkerClusterer(this.map, this.markers, {
            imagePath: 'assets/clusterimages/m'
          });
    }
  }
  );
}
addCustomMarker(item: ItemResponse) {
  const coordenadasCustom = new google.maps.LatLng(item.lat, item.lng);
  /*const marker = new google.maps.Marker({
    position: coordenadasCustom,
    map: this.map,
    label: {
      text: item.name,
      color: '#070606',
      fontSize: '14px'
    },
    zIndex: this.zindex,
    icon: this.iconoRegularMarkers,
    fromGoogle: false
    });*/
  const marker = new MarkerWithLabel({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: coordenadasCustom,
      icon: this.iconoCompraCerca,
      labelContent: item.name,
      labelAnchor: new google.maps.Point(60, 57),
      labelClass: 'my-custom-class-for-label', // the CSS class for the label
      labelInBackground: true
      });
  this.markersWithLabel.push(marker);
  this.customMarkers.push(marker);
  google.maps.event.addListener(marker, 'click', () => {
    this.infoWindow.close();

    const content = this.generateInfoWindowCompraCercaContent(item, marker);
    this.infoWindow.setContent(content);
    this.infoWindow.open(this.map, marker);
    this.infoWindow.setOptions({maxWidth: 232} );
    google.maps.event.addListener(this.infoWindow, 'domready', () => {
     /* var clickableItem = document.getElementById('clickableItem');
      clickableItem.addEventListener('click', () => {
        console.log('todos putos');
      });*/
    });
  });
  this.zindex++;
}



addMarker(place: google.maps.places.PlaceResult) {
  const marker = new google.maps.Marker({
    position: place.geometry.location,
    map: this.map,
    label: {
      text: place.name,
      color: '#070606',
      fontSize: '14px'
    },
    zIndex: this.zindex,
    icon: this.iconoRegularMarkers,
    id: place.place_id,
    fromGoogle: true
    });
  /*const marker = new MarkerWithLabel({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      //icon: markerIcon,
      labelContent: place.name,
      labelAnchor: new google.maps.Point(18, 12),
      labelClass: 'my-custom-class-for-label', // the CSS class for the label
      labelInBackground: true
      });
  this.markersWithLabel.push(marker);*/
  this.markers.push(marker);
  google.maps.event.addListener(marker, 'click', () => {
    this.infoWindow.close();

    const content = this.generateInfoWindowContent(place, marker);
    this.infoWindow.setContent(content);
    this.infoWindow.open(this.map, marker);
    this.infoWindow.setOptions({maxWidth: 232} );
    google.maps.event.addListener(this.infoWindow, 'domready', () => {
     /* var clickableItem = document.getElementById('clickableItem');
      clickableItem.addEventListener('click', () => {
        console.log('todos putos');
      });*/
    });
  });
  this.zindex++;
}

generateInfoWindowCompraCercaContent(item: ItemResponse, marker: MarkerWithLabel): string {
  this.compraCercaSelected = item;
  const content = '<div id="iw-container">' + '<div class="iw-title">' + item.name + '</div>'
                + '<div class="iw-subTitle">' + 'Dirección: <br> </div>'
                + '<div class="iw-fieldInfo">' + item.adress + '</div></div>'
                + '<ion-button expand="full" onclick="window.angularComponent.GoDetailCompraCerca(' +
                ')">Ver perfil</ion-button>';
                // '<h2 id="clickableItem"> Click me</h2>';
  return content;
}

generateInfoWindowContent(place: google.maps.places.PlaceResult, marker: google.maps.Marker): string {
  let commerceDirection = place.formatted_address.split(',')[0];
  const startWithLetter = /^[A-Z]/.test(commerceDirection);
  const  hasNumber = /\d/.test(commerceDirection);
  if (!startWithLetter || !hasNumber) {
      commerceDirection = 'No disponible';
  }
  const commerceTitle = place.name;
  this.placeSelected = place;
  const content = '<div id="iw-container">' + '<div class="iw-title">' + commerceTitle + '</div>'
                + '<div class="iw-subTitle">' + 'Dirección: <br> </div>'
                + '<div class="iw-fieldInfo">' + commerceDirection + '</div></div>'
                + '<ion-button expand="full" onclick="window.angularComponent.GoDetailGoogle(' +
                ')">Ver perfil</ion-button>';
                // '<h2 id="clickableItem"> Click me</h2>';
  return content;
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
