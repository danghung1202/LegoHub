
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';

import { PipeModule } from '../../pipes';

import { BricksetRoutingModule } from './brickset.routing';

import { SetDetailModule } from './set-detail/set-detail.module';
import { SetFilterModule } from './set-filter/set-filter.module';
import { SetListModule } from './set-list/set-list.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        MasonryModule,
        BricksetRoutingModule,
        PipeModule.forRoot()
    ],
    declarations: [
        SetListModule,
        SetFilterModule,
        SetDetailModule
    ]
})
export class BricksetModule { }