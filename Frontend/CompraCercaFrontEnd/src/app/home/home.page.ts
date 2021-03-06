import { Component, OnInit, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadosBusquedaService } from './resultados-busqueda.service';
import { ItemResponse } from './resultados-busqueda.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories/categories.service';
import { CategoryResponse } from '../categories/categories.service';
import 'C:/Users/thiago/Documents/GitHub/compracerca/Frontend/CompraCercaFrontEnd/markerclusterer.js';
declare var MarkerClusterer: any;


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
  query = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  categorySearch: CategoryResponse = { father: null, id: null , name: null };
  puntero: google.maps.LatLng = new google.maps.LatLng(0, 0) ;
  markers: google.maps.Marker [] = [];
  customMarkers: google.maps.Marker [] = [];
  iconoCustomMarkers = {
    url: 'assets/icon/marcadores_compraCerca.svg',
    scaledSize: new google.maps.Size(30, 30)
   };
   infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
  respuestasCompraCerca: ItemResponse[] =  [];
  cityCircle: google.maps.Circle = new google.maps.Circle({
    center: this.puntero,
    radius: 3000
   });
   markerClusterer: any;
   zindex = 0;
   zoomLevel = 0;
  private unsubscribe$: Subject<any> = new Subject<any>();


  constructor(private resultadosBusquedaService: ResultadosBusquedaService, private activatedRoute: ActivatedRoute, 
              private categoriesService: CategoriesService) {
    this.searchDisabled = true;
    this.saveDisabled = true;
  }
  ngOnInit()  {
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
      this.map.fitBounds(this.cityCircle.getBounds());
      this.zoomLevel = this.map.getZoom();
      console.log(this.zoomLevel);
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('categoryID'))  {
            return;
        }
        const categoryID = paramMap.get('categoryID');
        this.categoriesService.getCategoryInfo(categoryID).subscribe( (res: CategoryResponse) => {
          this.categorySearch = res;
          console.log(res);
          this.searchCategory(this.categorySearch.name);
        });
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

  getLocations(textSearch: string) {

       this.resultadosBusquedaService.getLocations(textSearch).subscribe( (res: ItemResponse[]) => {
        this.respuestasCompraCerca = res;
        console.log(res);
        for (const item of this.respuestasCompraCerca) {
          const coordenadasCustom = new google.maps.LatLng(item.lat, item.lng);
          if (this.cityCircle.getBounds().contains(coordenadasCustom)
          && google.maps.geometry.spherical.computeDistanceBetween(this.cityCircle.getCenter(), coordenadasCustom)
            <= this.cityCircle.getRadius()) {
              const marker = new google.maps.Marker({
                position: coordenadasCustom,
                map: this.map,
                icon: this.iconoCustomMarkers
                });
              this.customMarkers.push(marker);
            }
        }
      });
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
                    /*
                    const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: this.map
                    });
                    this.markers.push(marker);*/
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
addMarker(place: google.maps.places.PlaceResult) {
  const marker = new google.maps.Marker({
    position: place.geometry.location,
    map: this.map,
    label: place.name,
    zIndex: this.zindex
    });
  this.markers.push(marker);
  google.maps.event.addListener(marker, 'click', () => {
    this.infoWindow.setContent('<p>' + place.name + '</p>' +
    '<img src="' + place.icon + '" </img>');
    this.infoWindow.close();
    this.infoWindow.open(this.map, marker);
  });
  this.zindex++;
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
