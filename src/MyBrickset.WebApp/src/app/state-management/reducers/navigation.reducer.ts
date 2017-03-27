import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { NavigationActions } from '../actions';
import { Theme, Year } from '../../models';

export interface NavigationState {
    themeNav: Theme[];
    yearNav: Year[];
    openedSortSidenav: boolean;
    loading: boolean;
};

const initialState: NavigationState = {
    themeNav: [],
    yearNav: initYearNavigation(),
    openedSortSidenav: false,
    loading: false
};

function initYearNavigation(): Year[] {
    var today = new Date();
    var year = today.getFullYear();
    return [
        { theme: '', year: year.toString(), setCount: 0 },
        { theme: '', year: (year - 1).toString(), setCount: 0 },
        { theme: '', year: (year - 2).toString(), setCount: 0 }
    ]
}

export function reducer(state = initialState, action: Action): NavigationState {
    switch (action.type) {
        case NavigationActions.LOAD_THEMES_THIS_YEAR: {
            return Object.assign({}, state, {
                loading: true,
            });
        }

        case NavigationActions.LOAD_THEMES_THIS_YEAR_SUCCESS: {
            const themes = action.payload;
            return Object.assign({}, state, {
                themeNav: themes,
                loading: false
            });
        }

        case NavigationActions.TOGGLE_SORT_SIDENAV: {
            return Object.assign({}, state, {
                openedSortSidenav: action.payload,
            });
        }

        default: {
            return state;
        }
    }
}