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
    isDirty?: boolean;
};

const initialState: FilterState = {
    themes: [],
    subthemes: [],
    years: [],

    selectedThemes: [],
    selectedSubthems: [],
    selectedYear: [],

    loading: false,
    isDirty: false
};

export function reducer(state = initialState, action: Action): FilterState {
    switch (action.type) {
        case FilterActions.SET_FILTER: {
            const filter = action.payload;

            let selectedThemes: Theme[] = [];
            if (filter.themes) {
                selectedThemes = filter.themes.split(',').filter(item => item.trim() != '').map((theme) => ({ theme: theme, isSelected: true }));
            }

            let selectedSubthemes: Subtheme[] = [];
            if (filter.subthemes) {
                selectedSubthemes = filter.subthemes.split(',').filter(item => item.trim() != '').map(function (subtheme) {
                    return { subtheme: subtheme, isSelected: true }
                });
            }

            let selectedYears: Year[] = [];
            if (filter.years) {
                selectedYears = filter.years.split(',').filter(item => item.trim() != '').map(function (year) {
                    return { year: year, isSelected: true }
                });
            }

            return {
                themes: state.themes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: selectedThemes,
                selectedSubthems: selectedSubthemes,
                selectedYear: selectedYears,

                loading: false,
                isDirty: false
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

                loading: true,
                isDirty: state.isDirty
            };
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

            return {
                themes: newThemes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: false,
                isDirty: state.isDirty
            };
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

            return {
                themes: state.themes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: false,
                isDirty: state.isDirty
            };
        }

        case FilterActions.APPLY_CRITERIAS_SELECTED: {
            const criteriaType = action.payload;
            switch (criteriaType) {
                case CriteriaType.Theme: {
                    state.selectedThemes = state.themes.filter(item => item.isSelected);
                    state.subthemes = [];
                    state.years = [];
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

            return {
                themes: state.themes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: state.loading,
                isDirty: true
            };
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

            return {
                themes: state.themes,
                subthemes: result.subthemes,
                years: result.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: false,
                isDirty: false
            };
        }

        case FilterActions.RESET_FILTER: {
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

            return {
                themes: state.themes,
                subthemes: state.subthemes,
                years: state.years,

                selectedThemes: state.selectedThemes,
                selectedSubthems: state.selectedSubthems,
                selectedYear: state.selectedYear,

                loading: false,
                isDirty: false
            };
        }

        default: {
            return state;
        }
    }
}