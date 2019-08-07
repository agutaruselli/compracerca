import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadosBusquedaService, ItemResponse } from '../resultados-busqueda.service';


@Component({
  selector: 'app-commerce-detail',
  templateUrl: './commerce-detail.page.html',
  styleUrls: ['./commerce-detail.page.scss'],
})

export class CommerceDetailPage implements OnInit {
  data: any;
  activeCommerce: ItemResponse = { lat: null, lng: null , image: null, name: null, adress: null };
  placeSelected: google.maps.places.PlaceResult;
  placesPhotos: google.maps.places.PlacePhoto[];
  photoUrls: string[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private resultadosBusquedaService: ResultadosBusquedaService ) {
    /*this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        const placeId = this.data.id;
        if (this.data.fromGoogle) {
           
        } else {

        }
      }
    });*/

  }
  ionViewDidLoad() {

  }
  ngOnInit() {
    if (this.resultadosBusquedaService.getActiveGoogleCommerce != null) {
        this.placeSelected = this.resultadosBusquedaService.getActiveGoogleCommerce();
        this.activeCommerce.name = this.placeSelected.name;
        this.placesPhotos = this.placeSelected.photos;
        //this.photoUrls.push(this.placesPhotos[0].getUrl({maxWidth: 100, maxHeight: 100}));
        
        const request = {
          placeId: this.placeSelected.place_id,
          fields: ['photo']
        };
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, (place, status)  => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.placesPhotos = place.photos;
            for (const photo of this.placesPhotos) {
              this.photoUrls.push(photo.getUrl({maxWidth: null, maxHeight: null}));
            }
            console.log(place);
          }
        });
  
    if (this.resultadosBusquedaService.getActiveCompraCercaCommerce != null) {

    }
  }

}
}
