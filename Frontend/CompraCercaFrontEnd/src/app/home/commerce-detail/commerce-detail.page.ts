import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadosBusquedaService, ItemResponse } from '../resultados-busqueda.service';
import { CommerceDetailInfo } from './commerce-detail-resolver.service';




@Component({
  selector: 'app-commerce-detail',
  templateUrl: './commerce-detail.page.html',
  styleUrls: ['./commerce-detail.page.scss'],
})

export class CommerceDetailPage implements OnInit {
  data: any;
  activeCommerceExtraInfo: CommerceDetailInfo = { lat: null, lng: null , image: null,
                                                  name: null, adress: null, website: null, phoneNumber: null,
                                                  postalCode: null, googleImagesUrl: []
                                                };
  activeGoogleCommerce: google.maps.places.PlaceResult;


  placesPhotos: google.maps.places.PlacePhoto[] = [];
  photoUrls: string[] = [];
  slideOpts = {
    initialSlide: 2
  };


  constructor(private route: ActivatedRoute, private router: Router, private resultadosBusquedaService: ResultadosBusquedaService ) {


  }
  ngOnInit() {
    this.activeGoogleCommerce = this.resultadosBusquedaService.activeGoogleCommerce;
    this.activeCommerceExtraInfo = this.route.snapshot.data['commerce'];
    console.log(this.activeCommerceExtraInfo);
  }



}
