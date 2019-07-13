import { Component, OnInit, ViewChild } from '@angular/core';
import {  } from 'google-maps';

declare const google: any;


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  infowindow: google.maps.InfoWindow;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;  
  puntero =  google.maps.LatLng;
  markers:any;
  mapOptions:any;
  isKM:any=500;
  searchTypes:any="";


  constructor() { }

  ngOnInit()  {
    this.initMap();
  }


  initMap() { 
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        }
      this.puntero =  new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: pos,
        zoom: 15
    });
      const contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>' +
    '</div>';

      const infowindow = new google.maps.InfoWindow({
      content: contentString
      });

      const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', () => {
          infowindow.open(this.map, marker);
      });
  });
}

  callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        const place = results[i];
        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map
      });
      }
    }
  }

   createMarker(location) {
    const marker = new google.maps.Marker({
        position: location.geometry.location,
        map: this.map
    });
}
    /*
    this.infowindow = new google.maps.InfoWindow();

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.infowindow.setPosition(pos);
            this.infowindow.setContent('Location found.');
            this.infowindow.open(this.map);
            this.map.setCenter(pos);
            const marker = new google.maps.Marker({position: pos, map: this.map});
            const cityCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0066ff',
              fillOpacity: 0.35,
              map: this.map,
              center: pos,
              radius: 800
            });

          });
     }*/
 
}

