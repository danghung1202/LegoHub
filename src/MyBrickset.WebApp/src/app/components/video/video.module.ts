import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { VideoRoutingModule } from './video-routing.module';
import { VideoFeaturedComponent } from './video-featured.component';
import { VideoFeaturedContainer } from './video-featured.container';
import { VideoListComponent } from './video-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        VideoRoutingModule,
    ],
    declarations: [
        VideoFeaturedComponent,
        VideoFeaturedContainer,
        VideoListComponent
    ]
})
export class VideoModule { }