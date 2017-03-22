import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SetListComponent } from './set-list.component';
import { FilterPanelComponent, FilterCriteriaComponent, ViewFilterCriteriaComponent } from '../filter';

import { SetCardComponent } from './set-card.component';
import { SetListRoutingModule } from './set-list-routing.module';
import { PipeModule } from '../../pipes';
import { MasonryModule } from 'angular2-masonry';
import { SearchInputComponent } from '../shared/search-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        MasonryModule,
        SetListRoutingModule,
        PipeModule.forRoot()
    ],
    declarations: [
        FilterPanelComponent,
        FilterCriteriaComponent,
        SearchInputComponent,
        ViewFilterCriteriaComponent,
        SetListComponent,
        SetCardComponent,
    ]
})
export class SetListModule { }