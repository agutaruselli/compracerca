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
  activeCommerce: ItemResponse;

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

  ngOnInit() {
    if (this.resultadosBusquedaService.getActiveGoogleCommerce != null) {
        
    } 
    if (this.resultadosBusquedaService.getActiveCompraCercaCommerce != null) {

    }
  }

}
}
