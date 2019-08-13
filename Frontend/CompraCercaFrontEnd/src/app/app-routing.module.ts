import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommerceDetailResolverService } from './home/commerce-detail/commerce-detail-resolver.service';

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
  },
  { path: 'commerce-detail/:id', loadChildren: './home/commerce-detail/commerce-detail.module#CommerceDetailPageModule',
    resolve: {
    commerce: CommerceDetailResolverService
  },


  },  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './login/register/register.module#RegisterPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [CommerceDetailResolverService]
})
export class AppRoutingModule {}
