
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PinListComponent } from './pin-list.component';
import { PinFeaturedContainer } from './pin-featured.container';
import { AppResolver } from '../../app.resolver';

const pinRoutes: Routes = [
    {
        path: 'pins',
        component: PinListComponent,
        resolve: { config: AppResolver }
    },
    {
        path: 'featured-pins',
        component: PinFeaturedContainer,
        resolve: { config: AppResolver }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(pinRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PinFeedRoutingModule { }