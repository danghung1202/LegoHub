import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';

import { PinFeedRoutingModule } from './pin-feed.routing';
import { PinListComponent } from './pin-list.component';
import { PinFeaturedContainer } from './pin-featured.container';
import { PinCardComponent } from './pin-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        MasonryModule,
        PinFeedRoutingModule
    ],
    declarations: [
        PinListComponent,
        PinFeaturedContainer,
        PinCardComponent
    ]
})
export class PinFeedModule { }