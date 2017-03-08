import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetActions, ThemeActions } from '../actions';
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
                selectedThemes = filter.themes.split(',').filter(item => item.trim() != '').map(function (theme) {
                        return { theme: theme }
                });
            }

            let selectedYears: Year[] = [];
            if (filter.years) {
                selectedYears = filter.years.split(',').filter(item => item.trim() != '').map(function (year) {
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

        case ThemeActions.LOAD_THEMES: {

            return {
                themes: state.themes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: true
            };
        }
        case ThemeActions.LOAD_THEMES_SUCCESS: {
            const themes = action.payload;
            themes.forEach(element => {
                if(state.selectedThemes.findIndex(x=>x.theme == element.theme) != -1){
                    element.isSelected = true;
                }
            });
            return {
                themes: themes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: false
            };
        }

        default: {
            return state;
        }
    }
}