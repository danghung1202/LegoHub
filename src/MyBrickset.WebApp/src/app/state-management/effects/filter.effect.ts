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
    private mustToReloadSubthemes: boolean;
    
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private filterActions: FilterActions,
        private svc: AppService,
    ) {
        this.store.select(s => s.filter)
            .subscribe(x => {
                this.selectedThemes = x.selectedThemes.map(i => i.theme).join(',');
                this.mustToReloadSubthemes = x.mustToReloadSubthemes;
                console.log(this.selectedThemes);
            });
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

    @Effect() applyCriteriasSelected$ = this.action$
        .ofType(FilterActions.APPLY_CRITERIAS_SELECTED)
        .map(action => action.payload)
        .switchMap(criteriaType => {
            if (criteriaType == CriteriaType.Theme && this.selectedThemes && this.selectedThemes.trim()) {
                return this.svc.getSubthemesWithYears(this.selectedThemes)
                    .map(result => this.filterActions.loadSubthemesWithYearsSuccess(result))
                    .catch(() => of(this.filterActions.loadSubthemesWithYearsSuccess({ years: [], subthemes: [] })));
            }
            return empty();
        });

    @Effect() loadSubthemesWithYears$ = this.action$
        .ofType(FilterActions.LOAD_SUBTHEMES_WITH_YEARS)
        .map(action => action.payload)
        .switchMap((payload) => {

            if (this.selectedThemes && this.selectedThemes.trim() && this.mustToReloadSubthemes) {
                return this.svc.getSubthemesWithYears(this.selectedThemes)
                    .map(result => this.filterActions.loadSubthemesWithYearsSuccess(result))
                    .catch(() => of(this.filterActions.loadSubthemesWithYearsSuccess({ years: [], subthemes: [] })));
            }
            return empty();
        });
}