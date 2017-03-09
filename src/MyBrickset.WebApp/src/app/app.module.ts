import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import * as state from './state-management';

import { AppService } from './services';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';
import { HomeComponent, SetListModule, SetDetailComponent, SearchComponent, LoginComponent, LayoutComponent, ModalComponent, ErrorDialogComponent, PageNotFoundComponent } from './components';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        StoreModule.provideStore(state.reducer),
        EffectsModule.run(state.FilterEffects),
        EffectsModule.run(state.SetEffects),
        SetListModule,
        AppRoutingModule
    ],
    //entryComponents: [FilterPanel],
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        SetDetailComponent,
        PageNotFoundComponent,
        LayoutComponent,
        ModalComponent,
        ErrorDialogComponent,
        LoginComponent
    ],
    providers: [state.FilterActions, state.SetActions, state.ErrorActions, AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
