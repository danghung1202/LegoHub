import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { VideosComponent } from '../video/video.component';
import { CategoryListComponent } from './category-list.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PipeModule } from '../../pipes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        HomeRoutingModule,
        PipeModule.forRoot()
    ],
    declarations: [
        VideosComponent,
        CategoryListComponent,
        HomeComponent
    ]
})
export class HomeModule { }