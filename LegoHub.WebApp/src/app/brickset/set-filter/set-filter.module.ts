import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { FilterPanelContainer } from './filter-panel.container';
import { FilterPanelComponent } from './components/filter-panel.component';
import { CriteriaListContainer } from './criteria-list.container';
import { CriteriaListComponent } from './components/criteria-list.component';
import { CriteriaComponent } from './components/criteria.component';

import { FilterActions } from './ngrx/actions'
import { FilterEffects } from './ngrx/effects';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EffectsModule.run(FilterEffects),
    ],
    declarations: [
        FilterPanelContainer,
        FilterPanelComponent,
        CriteriaListContainer,
        CriteriaListComponent,
        CriteriaComponent
    ],
    providers: [
        { provide: FilterActions, useClass: FilterActions }
    ]
})
export class SetFilterModule { }