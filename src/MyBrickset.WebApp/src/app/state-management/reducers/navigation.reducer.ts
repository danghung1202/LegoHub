import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FilterActions } from '../actions';
import { Theme, Year } from '../../models';

export interface NavigationState {
    themeNav: Theme[];
    yearNav: Year[];
    loading: boolean;
};

const initialState: NavigationState = {
    themeNav: [],
    yearNav: initYearNavigation(),
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
        case FilterActions.LOAD_THEMES_THIS_YEAR: {
            return Object.assign({}, state, {
                loading: true,
            });
        }
        case FilterActions.LOAD_THEMES_THIS_YEAR_SUCCESS: {
            const themes = action.payload;
            return Object.assign({}, state, {
                themeNav: themes,
                loading: false
            });
        }

        default: {
            return state;
        }
    }
}