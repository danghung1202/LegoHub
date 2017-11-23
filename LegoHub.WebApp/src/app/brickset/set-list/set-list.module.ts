import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { SetListContainer } from './set-list.container';
import { SetListComponent } from './components/set-list.component';
import { SetCardComponent } from './components/set-card.component';

import { SetListActions } from './ngrx/actions'
import { SetListEffects } from './ngrx/effects';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EffectsModule.run(SetListEffects),
    ],
    declarations: [
        SetListContainer,
        SetListComponent,
        SetCardComponent
    ],
    providers: [
        { provide: SetListActions, useClass: SetListActions }
    ]
})
export class SetListModule { }