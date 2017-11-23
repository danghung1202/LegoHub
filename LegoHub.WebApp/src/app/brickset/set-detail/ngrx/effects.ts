import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

import { SetListActions, SetActions, ProgressBarActions } from '../actions';
import { BricksetService, RebrickableService } from '../../services';

@Injectable()
export class SetEffects {
    constructor(
        private store: Store<AppState>,
        private action$: Actions,
        private setListActions: SetListActions,
        private setActions: SetActions,
        private progressActions: ProgressBarActions,
        private svcBrickset: BricksetService,
        private svcRebrickable: RebrickableService,
    ) { }

    @Effect() getDetailSet$ = this.action$
        .ofType(SetActions.GET_SET)
        .map(action => action.payload)
        .switchMap(setId => {
            return this.svcBrickset.getSetDetails(setId)
                .map(result => this.setActions.getSetSuccess(result))
                .catch(() => of(this.setActions.getSetSuccess(null)));
        });

    @Effect() getPartsOfSet$ = this.action$
        .ofType(SetActions.GET_PARTS)
        .map(action => action.payload)
        .switchMap(setNumber => {
            return this.svcRebrickable.getPartsOfSet(setNumber)
                .map(result => this.setActions.getPartsSuccess(result))
                .catch(() => of(this.setActions.getPartsSuccess(null)));
        });

    @Effect() getAltBuildssOfSet$ = this.action$
        .ofType(SetActions.GET_ALTERNATE_BUILDS)
        .map(action => action.payload)
        .switchMap(setNumber => {
            return this.svcRebrickable.getAlternateBuildsOfSet(setNumber)
                .map(result => this.setActions.getAlternateBuildsSuccess(result))
                .catch(() => of(this.setActions.getAlternateBuildsSuccess(null)));
        });
}