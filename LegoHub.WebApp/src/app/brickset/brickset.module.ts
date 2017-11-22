import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SetListComponent } from './set-list.component';
import { FilterPanelComponent, CriteriaComponent, CriteriaListComponent, CriteriaListContainer } from '../filter';

import { SetCardComponent } from './set-card.component';
import { SetListRoutingModule } from './set-list.routing';
import { PipeModule } from '../../pipes';
import { MasonryModule } from 'angular2-masonry';
import { SearchInputMdComponent } from '../shared/search-input-md.component';

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
        CriteriaListComponent,
        CriteriaComponent,
        SearchInputMdComponent,
        CriteriaListContainer,
        SetListComponent,
        SetCardComponent,
    ]
})
export class BricksetModule { }