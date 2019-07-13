import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';






@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, GoogleMapComponent
  ]
})
export class HomePageModule {}
