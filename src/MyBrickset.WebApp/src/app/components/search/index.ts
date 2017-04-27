import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SearchRoutingModule } from './search.routing';
import { SearchInputComponent } from './search-input.component';
import { SearchComponent } from './search.component';
import { SuggestionSearchComponent } from './suggestion-search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SearchRoutingModule,
    ],
    declarations: [
        SearchComponent,
        SearchInputComponent,
        SuggestionSearchComponent
    ]
})
export class SearchModule { }