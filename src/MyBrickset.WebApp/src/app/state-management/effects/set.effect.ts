import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { SetActions } from '../actions';
import { AppService } from '../../services';

@Injectable()
export class SetEffects {
    constructor(
        private update$: Actions,
        private setActions: SetActions,
        private svc: AppService,
    ) { }

    @Effect() getSets$ = this.update$
        .ofType(SetActions.LOAD_SETS)
        .map(action => action.payload)
        .switchMap(params => this.svc.getSets(params.themes, params.subthemes, params.years))
        .map(sets => this.setActions.loadSetsSuccess(sets));
}