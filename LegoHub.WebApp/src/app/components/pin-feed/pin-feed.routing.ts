
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PinListComponent } from './pin-list.component';
import { PinViewerComponent } from './pin-viewer.component';
import { AppResolver } from '../../app.resolver';

const pinRoutes: Routes = [
    {
        path: 'pins',
        component: PinListComponent,
        resolve: { config: AppResolver },
        children: [
            {
                path: ':id',
                component: PinViewerComponent,
            },
        ]
    }
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