import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SetListComponent } from './set-list.component';
import { FilterPanelComponent, FilterCriteriaComponent } from '../filter';

import { SetListRoutingModule } from './set-list-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule.forRoot(),
        SetListRoutingModule
    ],
    declarations: [
        FilterPanelComponent,
        FilterCriteriaComponent,
        SetListComponent
    ]
})
export class SetListModule { }