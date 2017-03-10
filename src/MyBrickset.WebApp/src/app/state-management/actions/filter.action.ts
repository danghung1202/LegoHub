import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Theme} from '../../models';

@Injectable()
export class FilterActions {
    static LOAD_THEMES = '[Theme] Load All Themes';
    loadThemes(): Action {
        return {
            type: FilterActions.LOAD_THEMES
        };
    }

    static LOAD_THEMES_SUCCESS = '[Theme] Load All Themes Success';
    loadThemesSuccess(themes): Action {
        return {
            type: FilterActions.LOAD_THEMES_SUCCESS,
            payload: themes
        };
    }

    static LOAD_THEMES_THIS_YEAR = '[Theme] Load Themes In This Year';
    loadThemesInThisYear(): Action {
        return {
            type: FilterActions.LOAD_THEMES_THIS_YEAR
        };
    }

    static LOAD_THEMES_THIS_YEAR_SUCCESS = '[Theme] Load Themes In This Year Success';
    loadThemesInThisYearSuccess(themes): Action {
        return {
            type: FilterActions.LOAD_THEMES_THIS_YEAR_SUCCESS,
            payload: themes
        };
    }

    static LOAD_SUBTHEMES_WITH_YEARS_SUCCESS = '[Filter] Load Subthemes With Years Success';
    loadSubthemesWithYearsSuccess(result): Action {
        return {
            type: FilterActions.LOAD_SUBTHEMES_WITH_YEARS_SUCCESS,
            payload: result
        };
    }

    static SET_CRITERIA_SELECTED = '[Filter] Set Criteria Selected';
    setCriteriaSelected(selectedCriteria, criteriaType): Action {
        return {
            type: FilterActions.SET_CRITERIA_SELECTED,
            payload: { value: selectedCriteria, type: criteriaType }
        };
    }

    static APPLY_CRITERIAS_SELECTED = '[Filter] Apply Criterias Selected';
    applyCriteriasSelected(criteriaType): Action {
        return {
            type: FilterActions.APPLY_CRITERIAS_SELECTED,
            payload: criteriaType
        };
    }

    static CLEAR_CRITERIA_SELECTED = '[Filter] Clear Criteria Selected';
    clearCriteriaSelected(criteriaType): Action {
        return {
            type: FilterActions.CLEAR_CRITERIA_SELECTED,
            payload: criteriaType
        };
    }

    static SET_FILTER = '[Filter] Set Filter';
    setFilter(themes?: string, subthemes?: string, years?: string): Action {
        return {
            type: FilterActions.SET_FILTER,
            payload: { themes: themes, subthemes: subthemes, years: years }
        };
    }

    static RESET_FILTER = '[Filter] Reset Filter';
    resetFilter(criteriaType): Action {
        return {
            type: FilterActions.RESET_FILTER,
            payload: criteriaType
        };
    }

}