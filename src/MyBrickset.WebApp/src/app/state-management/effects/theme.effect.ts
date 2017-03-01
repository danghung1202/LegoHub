import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { ThemeActions } from '../actions';
import { ThemeService } from '../../services';

@Injectable()
export class ThemeEffects {
    constructor(
        private update$: Actions,
        private themeActions: ThemeActions,
        private svc: ThemeService,
    ) { }

    @Effect() loadThemes$ = this.update$
        .ofType(ThemeActions.LOAD_THEMES)
        .switchMap(() => this.svc.getThemes())
        .map(themes => this.themeActions.loadThemesSuccess(themes));

    @Effect() loadThemesInThisYear$ = this.update$
        .ofType(ThemeActions.LOAD_THEMES_THIS_YEAR)
        .switchMap(() => this.svc.getThemesInThisYear())
        .map(themes => this.themeActions.loadThemesInThisYearSuccess(themes));

}