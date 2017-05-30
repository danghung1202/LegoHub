import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
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
import { AppRoutingModule } from './app.routing';
import { PipeModule } from './pipes';
import {
    HomeModule,
    PinFeedModule,
    SetListModule,
    SettingModule,
    SetDetailModule,
    VideoModule,
    SearchModule,
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
        JsonpModule,
        MaterialModule,
        MasonryModule,
        StoreModule.provideStore(state.reducer),
        ...AppEffectModules,
        HomeModule,
        PinFeedModule,
        SetListModule,
        SetDetailModule,
        SettingModule,
        VideoModule,
        SearchModule,
        AppRoutingModule,
        PipeModule.forRoot()
    ],
    declarations: [
        AppComponent,
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
