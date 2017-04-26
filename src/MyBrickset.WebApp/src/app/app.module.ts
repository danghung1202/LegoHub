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
import { STATE_ACTIONS } from './state-management/actions';
import { AppEffectModules } from './state-management/effects';

import { APP_SERVICES, GlobalErrorHandler } from './services';

import { AppComponent } from './app.component';
import { AppResolver } from './app.resolver';
import { AppRoutingModule } from './app.router';
import { PipeModule } from './pipes';
import {
    HomeModule,
    SetListModule,
    SettingModule,
    SetDetailModule,
    VideoModule,
    SearchComponent,
    LoginComponent,
    LayoutComponent,
    ToolbarComponent,
    ModalComponent,
    ErrorDialogComponent,
    PageNotFoundComponent
} from './components';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        MasonryModule,
        StoreModule.provideStore(state.reducer),
        ...AppEffectModules,
        HomeModule,
        SetListModule,
        SetDetailModule,
        SettingModule,
        VideoModule,
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
    ],
    providers: [
        ...APP_SERVICES,
        ...STATE_ACTIONS,
        AppResolver,
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
