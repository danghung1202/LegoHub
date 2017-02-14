import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '@angular/material';

import reducer from './reducers';
import {ThemeActions} from './actions';
import {ThemeService} from './services';
import {ThemeEffects} from './effects';

import { AppComponent } from './app.component';
import { TdSearchBoxComponent } from './search/search-box/search-box.component';
import { TdSearchInputComponent } from './search/search-input/search-input.component';
import { FilterButton, FilterPanel } from './filter/filter-button.component';
import 'hammerjs';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        StoreModule.provideStore(reducer),
        EffectsModule.run(ThemeEffects)
    ],
    entryComponents: [FilterPanel],
    declarations: [
        AppComponent,
        TdSearchBoxComponent,
        TdSearchInputComponent,
        FilterButton,
        FilterPanel
    ],
    providers: [ThemeActions, ThemeService],
    bootstrap: [AppComponent]
})
export class AppModule { }
