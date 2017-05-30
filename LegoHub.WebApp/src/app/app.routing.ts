import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewSetComponent, LoginComponent, PageNotFoundComponent } from './components';

const appRoutes: Routes = [
  { path: '', redirectTo: '/themes', pathMatch: 'full'},
  { path: 'set/:id', component: ViewSetComponent },
  
  { path: 'login', component: LoginComponent, outlet: 'popup' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }