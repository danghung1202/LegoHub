
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoListComponent } from './video-list.component';
import { VideoFeaturedContainer } from './video-featured.container';
import { AppResolver } from '../../app.resolver';

const videoRoutes: Routes = [
    {
        path: 'videos',
        component: VideoListComponent,
        resolve: { config: AppResolver },
        
    },
    {
        path: 'featured-videos',
        component: VideoFeaturedContainer,
        resolve: { config: AppResolver },
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(videoRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class VideoRoutingModule { }