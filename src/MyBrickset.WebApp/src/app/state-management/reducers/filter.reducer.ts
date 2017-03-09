import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetActions, FilterActions } from '../actions';
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

        case FilterActions.LOAD_THEMES: {

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

        case FilterActions.LOAD_THEMES_SUCCESS: {
            const themes = action.payload;
            var newThemes = themes.map(element => {
                if (state.selectedThemes.findIndex(x => x.theme == element.theme) != -1) {
                    element.isSelected = true;
                } else {
                    element.isSelected = false;
                }

                return element;
            });

            return {
                themes: newThemes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: false
            };
        }

        case FilterActions.SET_CRITERIA_SELECTED: {
            const criteria = action.payload;
            if (criteria.type == "Themes") {
                var index = state.themes.findIndex(x => x.theme == criteria.value)

                if (index >= 0) {
                    var theme = state.themes[index];
                    theme.isSelected = !theme.isSelected;
                    // state.themes = [
                    //     ...state.themes.slice(0, index),
                    //    {
                    //        theme: theme.theme,
                    //        isSelected: theme.isSelected
                    //    },
                    //     ...state.themes.slice(index + 1),
                    // ];
                }
            }


            return state;
        }

        case FilterActions.CLEAR_CRITERIA_SELECTED: {
            const criteriaType = action.payload;
            if (criteriaType == "Themes") {
                state.themes = state.themes.map(theme => {
                    theme.isSelected = false
                    return theme;
                })
            }

            return {
                themes: state.themes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: false
            };
        }

        case FilterActions.APPLY_CRITERIAS_SELECTED: {
            const criteriaType = action.payload;
            if (criteriaType == "Themes") {
                state.selectedThemes = state.themes.filter(item => item.isSelected)
            } else if (criteriaType == "Subthemes") {
                state.selectedSubthems = state.subthemes.filter(item => item.isSelected)
            } else if (criteriaType == "Years") {
                state.selectedYear = state.years.filter(item => item.isSelected)
            }

            return {
                themes: state.themes,
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