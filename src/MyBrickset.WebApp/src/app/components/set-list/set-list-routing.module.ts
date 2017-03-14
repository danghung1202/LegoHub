
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetListComponent } from './set-list.component';
import { FilterPanelComponent, FilterCriteriaComponent } from '../filter';

const setListRoutes: Routes = [
    {
        path: 'sets',
        component: SetListComponent,
        children: [
            {
                path: 'filter',
                component: FilterPanelComponent,
                //outlet: 'child',
                children: [
                    {
                        path: ':id',
                        component: FilterCriteriaComponent
                    }
                ]
            }
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