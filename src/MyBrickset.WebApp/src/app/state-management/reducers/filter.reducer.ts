import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ThemeActions } from '../actions';
import { Theme, Subtheme, Year } from '../../models';

export interface FilterState {
    themes: Theme[];
    subthemes: Subtheme[];
    years: Year[];

    selectedThemes: Theme[];
    selectedSubthems: Subtheme[];
    selectedYear: Year[];

    loading: boolean;
};

const initialState: FilterState = {
    themes: [],
    subthemes: [],
    years: [],

    selectedThemes: [],
    selectedSubthems: [],
    selectedYear: [],

    loading: false
};

export function reducer(state = initialState, action: Action): FilterState {
    switch (action.type) {

        default: {
            return state;
        }
    }
}