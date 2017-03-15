import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, SetDetailComponent, SearchComponent, LoginComponent, PageNotFoundComponent } from './components';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, },
  { path: 'set/:id', component: SetDetailComponent },
  { path: 'search', component: SearchComponent, outlet: 'popup' },
  { path: 'login', component: LoginComponent, outlet: 'popup' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }