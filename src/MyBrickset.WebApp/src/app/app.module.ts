import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { MasonryModule } from 'angular2-masonry';

import * as state from './state-management';

import { AppService, LoggerService, GlobalErrorHandler } from './services';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';
import { PipeModule } from './pipes';
import { HomeComponent, SetListModule, SetDetailModule, SearchComponent, LoginComponent, LayoutComponent, ToolbarComponent, ModalComponent, ErrorDialogComponent, PageNotFoundComponent } from './components';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        MasonryModule,
        StoreModule.provideStore(state.reducer),
        EffectsModule.run(state.FilterEffects),
        EffectsModule.run(state.SetEffects),
        SetListModule,
        SetDetailModule,
        AppRoutingModule,
        PipeModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        PageNotFoundComponent,
        LayoutComponent,
        ToolbarComponent,
        ModalComponent,
        ErrorDialogComponent,
        LoginComponent,
    ],
    providers: [
        AppService,
        LoggerService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        state.FilterActions, state.SetListActions, state.SetActions, state.NavigationActions, state.ErrorActions
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }
