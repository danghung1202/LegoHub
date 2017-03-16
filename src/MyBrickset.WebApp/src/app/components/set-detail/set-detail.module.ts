import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { ViewSetComponent } from './view-set.component';
import { SetDetailComponent } from './set-detail.component';
import { PipeModule } from '../../pipes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule.forRoot(),
        PipeModule.forRoot()
    ],
    declarations: [
        ViewSetComponent,
        SetDetailComponent,
        //StarPipe
    ]
})
export class SetDetailModule { }