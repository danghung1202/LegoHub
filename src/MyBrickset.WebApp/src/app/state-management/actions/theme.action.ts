import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Theme} from '../../models';

@Injectable()
export class ThemeActions {
    static LOAD_THEMES = '[Theme] Load Themes';
    loadThemes(): Action {
        return {
            type: ThemeActions.LOAD_THEMES
        };
    }

    static LOAD_THEMES_SUCCESS = '[Theme] Load Themes Success';
    loadThemesSuccess(themes): Action {
        return {
            type: ThemeActions.LOAD_THEMES_SUCCESS,
            payload: themes
        };
    }
}