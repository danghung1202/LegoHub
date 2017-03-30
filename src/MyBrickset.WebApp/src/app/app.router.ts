import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewSetComponent, SearchComponent, LoginComponent, PageNotFoundComponent, SettingComponent } from './components';

const appRoutes: Routes = [
  { path: '', redirectTo: '/themes', pathMatch: 'full' },
  { path: 'set/:id', component: ViewSetComponent },
  { path: 'search', component: SearchComponent, outlet: 'popup' },
  { path: 'login', component: LoginComponent, outlet: 'popup' },
  { path: 'setting', component: SettingComponent },
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