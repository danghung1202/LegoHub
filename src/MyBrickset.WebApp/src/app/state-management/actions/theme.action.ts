import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Theme} from '../../models';

@Injectable()
export class ThemeActions {
    static LOAD_THEMES = '[Theme] Load All Themes';
    loadThemes(): Action {
        return {
            type: ThemeActions.LOAD_THEMES
        };
    }

    static LOAD_THEMES_SUCCESS = '[Theme] Load All Themes Success';
    loadThemesSuccess(themes): Action {
        return {
            type: ThemeActions.LOAD_THEMES_SUCCESS,
            payload: themes
        };
    }

    static LOAD_THEMES_THIS_YEAR = '[Theme] Load Themes In This Year';
    loadThemesInThisYear(): Action {
        return {
            type: ThemeActions.LOAD_THEMES_THIS_YEAR
        };
    }

    static LOAD_THEMES_THIS_YEAR_SUCCESS = '[Theme] Load Themes In This Year Success';
    loadThemesInThisYearSuccess(themes): Action {
        return {
            type: ThemeActions.LOAD_THEMES_THIS_YEAR_SUCCESS,
            payload: themes
        };
    }
}