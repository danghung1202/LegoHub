import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { SetActions } from '../actions';
import { AppService } from '../../services';

@Injectable()
export class SetEffects {
    constructor(
        private action$: Actions,
        private setActions: SetActions,
        private svc: AppService,
    ) { }

    @Effect() getSets$ = this.action$
        .ofType(SetActions.LOAD_SETS)
        .map(action => action.payload)
        .switchMap(params => {
            return this.svc.getSets(params.themes, params.subthemes, params.years)
            .map(sets => this.setActions.loadSetsSuccess(sets))
            .catch(() => of(this.setActions.loadSetsSuccess([])));
        });
}