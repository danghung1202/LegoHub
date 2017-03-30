
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { CategoryListComponent } from './category-list.component';
import { VideosComponent } from '../video/video.component';


const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: CategoryListComponent,
            },
            {
                path: 'themes',
                component: CategoryListComponent,
            },
            {
                path: 'videos',
                component: VideosComponent,
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }