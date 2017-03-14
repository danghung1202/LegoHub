import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetActions, FilterActions } from '../actions';
import { Theme, Subtheme, Year } from '../../models';
import { CriteriaType } from '../../data'

export interface FilterState {
    themes: Theme[];
    subthemes: Subtheme[];
    years: Year[];

    selectedThemes: Theme[];
    selectedSubthems: Subtheme[];
    selectedYear: Year[];

    loading: boolean;
    mustToReloadSubthemes?: boolean;
};

const initialState: FilterState = {
    themes: [],
    subthemes: [],
    years: [],

    selectedThemes: [],
    selectedSubthems: [],
    selectedYear: [],

    loading: false,
    mustToReloadSubthemes: false
};

export function reducer(state = initialState, action: Action): FilterState {
    switch (action.type) {

        case FilterActions.LOAD_THEMES: {
            return Object.assign({}, state, { loading: true });
        }

        case FilterActions.LOAD_THEMES_SUCCESS: {
            const themes = action.payload;
            var newThemes = themes.map(element => {
                if (state.selectedThemes.findIndex(x => x.theme == element.theme) >= 0) {
                    element.isSelected = true;
                } else {
                    element.isSelected = false;
                }

                return element;
            });

            return Object.assign({}, state, { themes: newThemes, loading: false });
        }

        case FilterActions.SET_CRITERIA_SELECTED: {
            const criteria = action.payload;
            switch (criteria.type) {
                case CriteriaType.Theme: {
                    var index = state.themes.findIndex(x => x.theme == criteria.value)

                    if (index >= 0) {
                        var theme = state.themes[index];
                        theme.isSelected = !theme.isSelected;
                    }
                    break;
                }
                case CriteriaType.Subtheme: {
                    var index = state.subthemes.findIndex(x => x.subtheme == criteria.value)

                    if (index >= 0) {
                        var subtheme = state.subthemes[index];
                        subtheme.isSelected = !subtheme.isSelected;
                    }
                    break;
                }
                case CriteriaType.Years: {
                    var index = state.years.findIndex(x => x.year == criteria.value)

                    if (index >= 0) {
                        var year = state.years[index];
                        year.isSelected = !year.isSelected;
                    }
                    break;
                }
            }

            return state;
        }

        case FilterActions.CLEAR_CRITERIA_SELECTED: {
            const criteriaType = action.payload;

            switch (criteriaType) {
                case CriteriaType.Theme: {
                    state.themes.forEach((theme, index) => {
                        theme.isSelected = false
                    });
                    break;
                }
                case CriteriaType.Subtheme: {
                    state.subthemes.forEach(subtheme => {
                        subtheme.isSelected = false
                    });
                    break;
                }
                case CriteriaType.Years: {
                    state.years.forEach(year => {
                        year.isSelected = false
                    });
                    break;
                }
            }
            return Object.assign({}, state);
        }

        case FilterActions.APPLY_CRITERIAS_SELECTED: {
            const criteriaType = action.payload;
            switch (criteriaType) {
                case CriteriaType.Theme: {
                    state.selectedThemes = state.themes.filter(item => item.isSelected).sort();
                    state.subthemes = [];
                    state.selectedSubthems = [];
                    state.years = [];
                    state.selectedYear = [];

                    if (state.selectedThemes.length > 0)
                        state.loading = true;
                    break;
                }
                case CriteriaType.Subtheme: {
                    state.selectedSubthems = state.subthemes.filter(item => item.isSelected)
                    break;
                }
                case CriteriaType.Years: {
                    state.selectedYear = state.years.filter(item => item.isSelected)
                    break;
                }
            }

            return Object.assign({}, state);
        }

        case FilterActions.LOAD_SUBTHEMES_WITH_YEARS: {
            const params = action.payload;

            let selectedThemes: Theme[] = [];
            if (params.themes) {
                selectedThemes = params.themes.split(',').filter(item => item.trim() != '').map((theme) => ({ theme: theme }));
                var oldSelectedThemesStr = state.selectedThemes.map(x=>x.theme).sort().join(',');
                state.mustToReloadSubthemes = state.loading =  oldSelectedThemesStr !== params.themes;
            }

            let selectedSubthemes: Subtheme[] = [];
            if (params.subthemes) {
                selectedSubthemes = params.subthemes.split(',').filter(item => item.trim() != '').map((subtheme) => ({ subtheme: subtheme }));
            }

            let selectedYears: Year[] = [];
            if (params.years) {
                selectedYears = params.years.split(',').filter(item => item.trim() != '').map((year) => ({ year: year }));
            }

            return Object.assign({}, state, {
                selectedThemes: selectedThemes,
                selectedSubthems: selectedSubthemes,
                selectedYear: selectedYears,
            });
        }

        case FilterActions.LOAD_SUBTHEMES_WITH_YEARS_SUCCESS: {
            const result = action.payload;

            state.selectedSubthems = state.selectedSubthems.filter(x => {
                var index = result.subthemes.findIndex(y => y.subtheme == x.subtheme);
                if (index >= 0) result.subthemes[index].isSelected = true;
                return index >= 0;
            })
            state.selectedYear = state.selectedYear.filter(x => {
                var index = result.years.findIndex(y => y.year == x.year);
                if (index >= 0) result.years[index].isSelected = true;
                return index >= 0;
            })
            return Object.assign({}, state, {
                subthemes: result.subthemes,
                years: result.years,

                loading: false,
            });
        }

        case FilterActions.RESET_FILTER: {

            if (!state.loading) {
                const criteriaType = action.payload;
                switch (criteriaType) {
                    case CriteriaType.Subtheme: {
                        state.subthemes.forEach(element => {
                            if (state.selectedSubthems.findIndex(x => x.subtheme == element.subtheme) >= 0) {
                                element.isSelected = true;
                            } else {
                                element.isSelected = false;
                            }
                        });
                        break;
                    }
                    case CriteriaType.Years: {
                        state.years.forEach(element => {
                            if (state.selectedYear.findIndex(x => x.year == element.year) >= 0) {
                                element.isSelected = true;
                            } else {
                                element.isSelected = false;
                            }
                        });
                        break;
                    }
                }

                return Object.assign({}, state);
            }

            return state;
        }

        default: {
            return state;
        }
    }
}