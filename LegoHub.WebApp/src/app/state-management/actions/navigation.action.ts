import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class NavigationActions {
    static LOAD_THEMES_THIS_YEAR = '[Navigation] Load Themes In This Year';
    loadThemesInThisYear(): Action {
        return {
            type: NavigationActions.LOAD_THEMES_THIS_YEAR
        };
    }

    static LOAD_THEMES_THIS_YEAR_SUCCESS = '[Navigation] Load Themes In This Year Success';
    loadThemesInThisYearSuccess(themes): Action {
        return {
            type: NavigationActions.LOAD_THEMES_THIS_YEAR_SUCCESS,
            payload: themes
        };
    }

    static TOGGLE_SORT_SIDENAV = '[Navigation] Toggle Sort Sidenav';
    toggleSortSidenav(isOpen:boolean): Action {
        return {
            type: NavigationActions.TOGGLE_SORT_SIDENAV,
            payload: isOpen
        };
    }
}