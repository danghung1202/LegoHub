import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { Store } from '@ngrx/store';

import { FilterActions } from '../actions';
import { AppService } from '../../services';
import { CriteriaType } from '../../data'
import { AppState } from '../reducers';

@Injectable()
export class FilterEffects {
    private selectedThemes: any;
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private filterActions: FilterActions,
        private svc: AppService,
    ) {
        this.store.select(s => s.filter).select(s => s.selectedThemes)
            .do(x => {
                this.selectedThemes = x.map(i => i.theme).join(',');
                console.log(this.selectedThemes);
            }).subscribe();
    }

    @Effect() loadThemes$ = this.action$
        .ofType(FilterActions.LOAD_THEMES)
        .switchMap(() => {
            return this.svc.getThemes()
                .map(themes => this.filterActions.loadThemesSuccess(themes))
                .catch(() => of(this.filterActions.loadThemesSuccess([])));
        });

    @Effect() loadThemesInThisYear$ = this.action$
        .ofType(FilterActions.LOAD_THEMES_THIS_YEAR)
        .switchMap(() => {
            return this.svc.getThemesInThisYear()
                .map(themes => this.filterActions.loadThemesInThisYearSuccess(themes))
                .catch(() => of(this.filterActions.loadThemesInThisYearSuccess([])));
        });

    @Effect() loadSubthemesAndYears$ = this.action$
        .ofType(FilterActions.APPLY_CRITERIAS_SELECTED)
        .map(action => action.payload)
        .switchMap(criteriaType => {
            if (criteriaType == CriteriaType.Theme) {
                return this.svc.getSubthemesWithYears(this.selectedThemes)
                    .map(result => this.filterActions.loadSubthemesWithYearsSuccess(result))
                    .catch(() => of(this.filterActions.loadSubthemesWithYearsSuccess({ years: [], subthemes: [] })));
            }
            return empty();
        });

    @Effect() setFilter$ = this.action$
        .ofType(FilterActions.SET_FILTER)
        .switchMap(() => {
            return this.svc.getSubthemesWithYears(this.selectedThemes)
                .map(result => this.filterActions.loadSubthemesWithYearsSuccess(result))
                .catch(() => of(this.filterActions.loadSubthemesWithYearsSuccess({ years: [], subthemes: [] })));
        });
}