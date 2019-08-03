import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'home/:categoryID',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'categories',
      children : [
        {
        path: '',
        loadChildren: './categories/categories.module#CategoriesPageModule'
        },
        {
        path: ':categoryID',
        loadChildren: './categories/child-categories/child-categories.module#ChildCategoriesPageModule'
        }
      ]
  },  { path: 'commerce-detail', loadChildren: './home/commerce-detail/commerce-detail.module#CommerceDetailPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
