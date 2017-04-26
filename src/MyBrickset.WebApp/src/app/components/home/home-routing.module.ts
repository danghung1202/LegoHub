
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { CategoryListComponent } from './category-list.component';
import { AppResolver } from '../../app.resolver';


const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: { config: AppResolver },
        children: [
            {
                path: '',
                component: CategoryListComponent,
            },
            {
                path: 'themes',
                component: CategoryListComponent,
            }
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