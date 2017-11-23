import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

import { SetListActions, SetActions, ProgressBarActions } from '../actions';
import { BricksetService, RebrickableService } from '../../services';

@Injectable()
export class SetListEffects {
    constructor(
        private store: Store<AppState>,
        private action$: Actions,
        private setListActions: SetListActions,
        private setActions: SetActions,
        private progressActions: ProgressBarActions,
        private svcBrickset: BricksetService,
        private svcRebrickable: RebrickableService,
    ) { }

    @Effect() getSets$ = this.action$
        .ofType(SetListActions.LOAD_SETS)
        .map(action => action.payload)
        .switchMap(params => {
            return this.svcBrickset.getSets(params.themes, params.subthemes, params.years)
                .map(sets => {
                    this.store.dispatch(this.progressActions.showProgressBar(sets.length));
                    return this.setListActions.loadSetsSuccess(sets)
                })
                .catch(() => of(this.setListActions.loadSetsSuccess([])));
        });

    @Effect() getSortCriterias$ = this.action$
        .ofType(SetListActions.LOAD_SORT_CRITERIAS)
        .switchMap(() => {
            return this.svcBrickset.getSortCriterias()
                .map(criterias => this.setListActions.loadSortCriteriasSuccess(criterias))
                .catch(() => of(this.setListActions.loadSortCriteriasSuccess([])));
        });


    @Effect() getMoreSets$ = this.action$
        .ofType(SetListActions.LOAD_MORE_SETS)
        .map(action => action.payload)
        .switchMap(params => {
            return this.svcBrickset.getSets(params.themes, params.subthemes, params.years, params.query, params.page, params.order, params.show)
                .map(sets => {
                    this.store.dispatch(this.progressActions.showProgressBar(sets.length));
                    return this.setListActions.loadMoreSetsSuccess(sets)
                })
                .catch(() => of(this.setListActions.loadMoreSetsSuccess([])));
        });
}