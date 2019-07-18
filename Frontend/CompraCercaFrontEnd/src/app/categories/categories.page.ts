import { Component, OnInit, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { CategoriesService } from './categories.service';
import { CategoryResponse } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {


  fatherCategories: CategoryResponse[] =  [];
  categoryImage: string ;

  constructor(private categoriesService: CategoriesService) {
      this.categoryImage = 'assets/assets.png';

   }
  ngOnInit() {
    this.categoriesService.getFatherCategories().subscribe( (res: CategoryResponse[]) => {
      this.fatherCategories = res;
      console.log(res);
    });
  }


}
