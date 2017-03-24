import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Theme } from '../../models';

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

    

    static LOAD_SUBTHEMES_WITH_YEARS = '[Filter] Load Subthemes With Years';
    loadSubthemesWithYears(themes?: string, subthemes?: string, years?: string): Action {
        return {
            type: FilterActions.LOAD_SUBTHEMES_WITH_YEARS,
            payload: { themes: themes, subthemes: subthemes, years: years }
        };
    }

    static LOAD_SUBTHEMES_WITH_YEARS_SUCCESS = '[Filter] Load Subthemes With Years Success';
    loadSubthemesWithYearsSuccess(result): Action {
        return {
            type: FilterActions.LOAD_SUBTHEMES_WITH_YEARS_SUCCESS,
            payload: result
        };
    }

    static APPLY_CRITERIAS_SELECTED = '[Filter] Apply Criterias Selected';
    applyCriteriasSelected(criteriaType, selectedCriterias): Action {
        return {
            type: FilterActions.APPLY_CRITERIAS_SELECTED,
            payload: {criteriaType: criteriaType, selectedCriterias: selectedCriterias }
        };
    }

    static REMOVE_SELECTED_CRITERIA = '[Filter] Remove Selected Criteria';
    removeSelectedCriteria(criteriaType, criteria): Action {
        return {
            type: FilterActions.REMOVE_SELECTED_CRITERIA,
            payload: {criteriaType: criteriaType, criteria: criteria }
        };
    }

    static REMOVE_ALL_SELECTED_CRITERIAS = '[Filter] Remove All Selected Criterias';
    removeAllSelectedCriterias(): Action {
        return {
            type: FilterActions.REMOVE_ALL_SELECTED_CRITERIAS,
        };
    }

}