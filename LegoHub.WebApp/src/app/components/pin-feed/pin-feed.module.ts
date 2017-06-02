import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';

import { PinFeedRoutingModule } from './pin-feed.routing';
import { PinListComponent } from './pin-list.component';
import { PinViewerComponent } from './pin-viewer.component';
import { PinCardComponent } from './pin-card.component';
import { PipeModule } from '../../pipes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        MasonryModule,
        PinFeedRoutingModule,
        PipeModule.forRoot()
    ],
    declarations: [
        PinListComponent,
        PinViewerComponent,
        PinCardComponent
    ]
})
export class PinFeedModule { }