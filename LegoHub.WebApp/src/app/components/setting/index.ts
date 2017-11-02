import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SettingRoutingModule } from './setting.routing';
import { SettingGuard } from './setting.guard';
import { SettingComponent } from './setting.component';
import { CategorySettingComponent } from './category-setting.component';
import { YoutubeSettingComponent } from './youtube-setting.component';
import { PinterestSettingComponent } from './pinterest-setting.component';
import { PinterestBoardUploadComponent } from './pinterest-board.component';
import { FileUploadComponent } from '../shared/file-upload.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SettingRoutingModule
    ],
    declarations: [
        SettingComponent,
        CategorySettingComponent,
        YoutubeSettingComponent,
        PinterestSettingComponent,
        PinterestBoardUploadComponent,
        FileUploadComponent
    ],
    providers: [SettingGuard]
})
export class SettingModule { }
