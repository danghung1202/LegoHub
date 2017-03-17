import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { SetListActions, SetActions } from '../actions';
import { AppService } from '../../services';

@Injectable()
export class SetEffects {
    constructor(
        private action$: Actions,
        private setListActions: SetListActions,
        private setActions: SetActions,
        private svc: AppService,
    ) { }

    @Effect() getSets$ = this.action$
        .ofType(SetListActions.LOAD_SETS)
        .map(action => action.payload)
        .switchMap(params => {
            return this.svc.getSets(params.themes, params.subthemes, params.years)
                .map(sets => this.setListActions.loadSetsSuccess(sets))
                .catch(() => of(this.setListActions.loadSetsSuccess([])));
        });

    @Effect() getSortCriterias$ = this.action$
        .ofType(SetListActions.LOAD_SORT_CRITERIAS)
        .switchMap(() => {
            return this.svc.getSortCriterias()
                .map(criterias => this.setListActions.loadSortCriteriasSuccess(criterias))
                .catch(() => of(this.setListActions.loadSortCriteriasSuccess([])));
        });


    @Effect() getMoreSets$ = this.action$
        .ofType(SetListActions.LOAD_MORE_SETS)
        .map(action => action.payload)
        .switchMap(params => {
            return this.svc.getSets(params.themes, params.subthemes, params.years, params.query, params.page, params.order, params.show)
                .map(sets => this.setListActions.loadMoreSetsSuccess(sets))
                .catch(() => of(this.setListActions.loadMoreSetsSuccess([])));
        });

    @Effect() getDetailSet$ = this.action$
        .ofType(SetActions.GET_SET)
        .map(action => action.payload)
        .switchMap(setId => {
            return this.svc.getSetDetails(setId)
                .map(result => this.setActions.getSetSuccess(result))
                .catch(() => of(this.setActions.getSetSuccess(null)));
        });

    @Effect() getPartsOfSet$ = this.action$
        .ofType(SetActions.GET_PARTS)
        .map(action => action.payload)
        .switchMap(setNumber => {
            return this.svc.getPartsOfSet(setNumber)
                .map(result => this.setActions.getPartsSuccess(result))
                .catch(() => of(this.setActions.getPartsSuccess(null)));
        }); 

        @Effect() getAltBuildssOfSet$ = this.action$
        .ofType(SetActions.GET_ALTERNATE_BUILDS)
        .map(action => action.payload)
        .switchMap(setNumber => {
            return this.svc.getAlternateBuildsOfSet(setNumber)
                .map(result => this.setActions.getAlternateBuildsSuccess(result))
                .catch(() => of(this.setActions.getAlternateBuildsSuccess(null)));
        }); 
}