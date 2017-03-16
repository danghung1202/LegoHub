
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetDetailComponent } from '../set-detail/set-detail.component';
import { SetListComponent } from './set-list.component';
import { FilterPanelComponent, ViewFilterCriteriaComponent } from '../filter';

const setListRoutes: Routes = [
    {
        path: 'sets',
        component: SetListComponent,
        children: [
            {
                path: 'filter',
                component: FilterPanelComponent,
                children: [
                    {
                        path: ':id',
                        component: ViewFilterCriteriaComponent
                    }
                ]
            },
            {
                path: ':id',
                component: SetDetailComponent,
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(setListRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SetListRoutingModule { }