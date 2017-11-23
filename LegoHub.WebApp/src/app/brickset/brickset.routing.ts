
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetDetailContainer } from './set-detail/set-detail.container';
import { SetListContainer } from './set-list/set-list.container';
import { FilterPanelContainer, CriteriaListContainer } from './set-filter';
import { AppResolver } from '../app.resolver';

const bricksetRoutes: Routes = [
    {
        path: 'sets',
        component: SetListContainer,
        resolve: { config: AppResolver },
        children: [
            {
                path: 'filter',
                component: FilterPanelContainer,
                children: [
                    {
                        path: ':id',
                        component: CriteriaListContainer
                    }
                ]
            },
            {
                path: ':id',
                component: SetDetailContainer,
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(bricksetRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BricksetRoutingModule { }