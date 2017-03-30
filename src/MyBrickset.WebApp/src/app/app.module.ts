import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { HomeModule, SetListModule, SettingComponent, SetDetailModule, SearchComponent, LoginComponent, LayoutComponent, ToolbarComponent, ModalComponent, ErrorDialogComponent, PageNotFoundComponent } from './components';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        MasonryModule,
        StoreModule.provideStore(state.reducer),
        EffectsModule.run(state.FilterEffects),
        EffectsModule.run(state.SetEffects),
        EffectsModule.run(state.CategoryEffects),
        SetListModule,
        HomeModule,
        SetDetailModule,
        AppRoutingModule,
        PipeModule.forRoot()
    ],
    declarations: [
        AppComponent,
        SearchComponent,
        PageNotFoundComponent,
        LayoutComponent,
        ToolbarComponent,
        ModalComponent,
        ErrorDialogComponent,
        LoginComponent,
        SettingComponent
    ],
    providers: [
        AppService,
        LoggerService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        state.FilterActions, state.SetListActions, state.SetActions, state.NavigationActions, state.ErrorActions, state.CategoryActions
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }
