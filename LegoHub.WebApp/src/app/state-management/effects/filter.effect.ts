import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { Store } from '@ngrx/store';

import { FilterActions, NavigationActions } from '../actions';
import { BricksetService } from '../../services';
import { CriteriaType } from '../../constant';
import { AppState } from '../reducers';

@Injectable()
export class FilterEffects {
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private filterActions: FilterActions,
        private navigationActions: NavigationActions,
        private svc: BricksetService,
    ) { }

    @Effect() loadThemes$ = this.action$
        .ofType(FilterActions.LOAD_THEMES)
        .switchMap(() => {
            return this.svc.getThemes()
                .map(themes => this.filterActions.loadThemesSuccess(themes))
                .catch(() => of(this.filterActions.loadThemesSuccess([])));
        });

    @Effect() loadThemesInThisYear$ = this.action$
        .ofType(NavigationActions.LOAD_THEMES_THIS_YEAR)
        .switchMap(() => {
            return this.svc.getThemesInThisYear()
                .map(themes => this.navigationActions.loadThemesInThisYearSuccess(themes))
                .catch(() => of(this.navigationActions.loadThemesInThisYearSuccess([])));
        });

    @Effect() applyCriteriasSelected$ = this.action$
        .ofType(FilterActions.APPLY_CRITERIAS_SELECTED)
        .map(action => action.payload)
        .withLatestFrom(this.store)
        .map((lastest: any[]) => ({ criteriaType: lastest[0].criteriaType, store: lastest[1] }))
        .switchMap(payload => {
            let selectedThemes = payload.store.filter.selectedThemes.map(i => i.theme).join(',');
            if (payload.criteriaType == CriteriaType.Theme && selectedThemes) {
                return this.svc.getSubthemesWithYears(selectedThemes)
                    .map(result => this.filterActions.loadSubthemesWithYearsSuccess(result))
                    .catch(() => of(this.filterActions.loadSubthemesWithYearsSuccess({ years: [], subthemes: [] })));
            }
            return empty();
        });

    @Effect() removeSelectedCriteria$ = this.action$
        .ofType(FilterActions.REMOVE_SELECTED_CRITERIA)
        .map(action => action.payload)
        .withLatestFrom(this.store)
        .map((lastest: any[]) => ({ criteriaType: lastest[0].criteriaType, store: lastest[1] }))
        .switchMap(payload => {
            let selectedThemes = payload.store.filter.selectedThemes.map(i => i.theme).join(',');
            if (payload.criteriaType == CriteriaType.Theme && selectedThemes) {
                return this.svc.getSubthemesWithYears(selectedThemes)
                    .map(result => this.filterActions.loadSubthemesWithYearsSuccess(result))
                    .catch(() => of(this.filterActions.loadSubthemesWithYearsSuccess({ years: [], subthemes: [] })));
            }
            return empty();
        });

    @Effect() loadSubthemesWithYears$ = this.action$
        .ofType(FilterActions.LOAD_SUBTHEMES_WITH_YEARS)
        .map(action => action.payload)
        .withLatestFrom(this.store)
        .map((lastest: any[]) => lastest[1])
        .switchMap((store: AppState) => {
            let selectedThemes = store.filter.selectedThemes.map(i => i.theme).join(',');
            let mustToReloadSubthemes = store.filter.mustToReloadSubthemes;
            if (selectedThemes && mustToReloadSubthemes) {
                return this.svc.getSubthemesWithYears(selectedThemes)
                    .map(result => this.filterActions.loadSubthemesWithYearsSuccess(result))
                    .catch(() => of(this.filterActions.loadSubthemesWithYearsSuccess({ years: [], subthemes: [] })));
            }
            return empty();
        });
}