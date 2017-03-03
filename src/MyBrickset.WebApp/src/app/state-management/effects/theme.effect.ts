import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { ThemeActions } from '../actions';
import { AppService } from '../../services';

@Injectable()
export class ThemeEffects {
    constructor(
        private action$: Actions,
        private themeActions: ThemeActions,
        private svc: AppService,
    ) { }

    @Effect() loadThemes$ = this.action$
        .ofType(ThemeActions.LOAD_THEMES)
        .switchMap(() => {
            return this.svc.getThemes()
            .map(themes => this.themeActions.loadThemesSuccess(themes))
            .catch(() => of(this.themeActions.loadThemesSuccess([])));
        });

    @Effect() loadThemesInThisYear$ = this.action$
        .ofType(ThemeActions.LOAD_THEMES_THIS_YEAR)
        .switchMap(() => {
            return this.svc.getThemesInThisYear()
            .map(themes => this.themeActions.loadThemesInThisYearSuccess(themes))
            .catch(() => of(this.themeActions.loadThemesInThisYearSuccess([])));
        });

}