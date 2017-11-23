import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';

import { SetDetailContainer } from './set-detail.container';
import { SetDetailComponent } from './components/set-detail.component';
import { PipeModule } from '../../pipes';
import { SetEffects } from './ngrx/effects'
import { SetActions } from './ngrx/actions';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule.forRoot(),
        PipeModule.forRoot(),
        EffectsModule.run(SetEffects),
    ],
    declarations: [
        SetDetailContainer,
        SetDetailComponent,
    ],
    providers: [
        { provide: SetActions, useClass: SetActions }
    ]
})
export class SetDetailModule { }