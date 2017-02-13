import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { TdSearchBoxComponent } from './search/search-box/search-box.component';
import { TdSearchInputComponent } from './search/search-input/search-input.component';
import 'hammerjs';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        TdSearchBoxComponent,
        TdSearchInputComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
 