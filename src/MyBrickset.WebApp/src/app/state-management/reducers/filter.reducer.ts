import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetActions } from '../actions';
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
        case SetActions.SET_FILTER: {
            const filter = action.payload;

            let selectedThemes: Theme[] = [];
            if (filter.themes) {
                selectedThemes = filter.themes.split(',').map(function (theme) {
                    return { theme: theme }
                });
            }

            let selectedYears: Year[] = [];
            if (filter.years) {
                selectedYears = filter.years.split(',').map(function (year) {
                    return { year: year }
                });
            }


            return {
                themes: state.themes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: selectedThemes,
                selectedSubthems: [],
                selectedYear: selectedYears,

                loading: false
            };
        }
        default: {
            return state;
        }
    }
}