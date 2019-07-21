import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { CategoryResponse } from '../categories.service';

@Component({
  selector: 'app-child-categories',
  templateUrl: './child-categories.page.html',
  styleUrls: ['./child-categories.page.scss'],
})
export class ChildCategoriesPage implements OnInit {
  childCategories: CategoryResponse[] = [];
  parentCategory: CategoryResponse = { father: null, id: null , name: null };

  constructor(private activatedRoute: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('categoryID'))  {
            return;
        }
        const categoryID = paramMap.get('categoryID');
        this.categoriesService.getCategoryInfo(categoryID).subscribe( (res: CategoryResponse) => {
          this.parentCategory = res;
          console.log(res);
        });

        this.categoriesService.getChildCategories(categoryID).subscribe( (res: CategoryResponse[]) => {
          this.childCategories = res;
          console.log(res);
        });
      });
  }

}
