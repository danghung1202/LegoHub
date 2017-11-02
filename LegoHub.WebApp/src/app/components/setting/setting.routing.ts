
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingComponent } from './setting.component';
import { SettingGuard } from './setting.guard';
import { AppResolver } from '../../app.resolver';

const settingRoutes: Routes = [
    {
        path: 'settings',
        component: SettingComponent,
        resolve: { config: AppResolver },
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