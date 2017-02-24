import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import * as state from './state-management';

import { ThemeService } from './services';

import { AppComponent } from './app.component';
import { TdSearchBoxComponent } from './components/search/search-box/search-box.component';
import { TdSearchInputComponent } from './components/search/search-input/search-input.component';
//import { FilterButton} from './components/filter/filter-button.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        StoreModule.provideStore(state.Reducer),
        EffectsModule.run(state.ThemeEffects)
    ],
    //entryComponents: [FilterPanel],
    declarations: [
        AppComponent,
        TdSearchBoxComponent,
        TdSearchInputComponent,
        //FilterButton,
        //FilterPanel
    ],
    providers: [state.ThemeActions, ThemeService],
    bootstrap: [AppComponent]
})
export class AppModule { }
