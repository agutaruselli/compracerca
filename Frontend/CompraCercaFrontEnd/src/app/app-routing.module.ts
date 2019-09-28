import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommerceDetailResolverService } from './home/commerce-detail/commerce-detail-resolver.service';
import { RouteGuardService } from './login/route-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
    // ,
    // canActivate: [RouteGuardService]
  },
  {
    path: 'home/:categoryID',
    loadChildren: './home/home.module#HomePageModule'
    // ,
    // canActivate: [RouteGuardService]
  },
  {
    path: 'home/:textSearch',
    loadChildren: './home/home.module#HomePageModule'
    // ,
    // canActivate: [RouteGuardService]
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
        // ,
        // canActivate: [RouteGuardService]

        },
        {
        path: ':categoryID',
        loadChildren: './categories/child-categories/child-categories.module#ChildCategoriesPageModule'
        // ,
        // canActivate: [RouteGuardService]
        }
      ]
  },
  { path: 'commerce-detail/:id', loadChildren: './home/commerce-detail/commerce-detail.module#CommerceDetailPageModule'
    // ,
    // canActivate: [RouteGuardService]
    ,

    resolve: {
    commerce: CommerceDetailResolverService
  },


  },
  { path: 'commerce-detail', loadChildren: './home/commerce-detail/commerce-detail.module#CommerceDetailPageModule'
    // ,
    // canActivate: [RouteGuardService]
    ,

    resolve: {
    commerce: CommerceDetailResolverService
  },


  },

  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './login/register/register.module#RegisterPageModule' },
  { path: 'dashboard-cc', loadChildren: './dashboard-cc/dashboard-cc.module#DashboardCCPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [CommerceDetailResolverService]
})
export class AppRoutingModule {}
