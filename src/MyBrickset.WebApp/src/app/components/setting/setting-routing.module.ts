
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingComponent } from './setting.component';
import {SettingGuard} from './setting.guard';


const settingRoutes: Routes = [
    {
        path: 'settings',
        component: SettingComponent,
        canActivate: [SettingGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(settingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SettingRoutingModule { }