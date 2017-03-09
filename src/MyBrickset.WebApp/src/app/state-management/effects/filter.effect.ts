import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { FilterActions } from '../actions';
import { AppService } from '../../services';

@Injectable()
export class FilterEffects {
    constructor(
        private action$: Actions,
        private filterActions: FilterActions,
        private svc: AppService,
    ) { }

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
}