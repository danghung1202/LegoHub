import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class SetActions {
    static LOAD_SETS = '[Set] Load Sets';
    loadSets(themes?: string, subthemes?: string, years?: string): Action {
        return {
            type: SetActions.LOAD_SETS,
            payload: { themes: themes, subthemes: subthemes, years: years }
        };
    }

    static LOAD_SETS_SUCCESS = '[Set] Load Sets Success';
    loadSetsSuccess(sets): Action {
        return {
            type: SetActions.LOAD_SETS_SUCCESS,
            payload: sets
        };
    }

    static LOAD_SORT_CRITERIAS = '[Set] Load Sort Criterias';
    loadSortCriterias(): Action {
        return {
            type: SetActions.LOAD_SORT_CRITERIAS
        };
    }

    static LOAD_SORT_CRITERIAS_SUCCESS = '[Set] Load Sort Criterias Success';
    loadSortCriteriasSuccess(criterias): Action {
        return {
            type: SetActions.LOAD_SORT_CRITERIAS_SUCCESS,
            payload: criterias
        };
    }

    static SET_FILTER = '[Set] Set filter';
    setFilter(themes?: string, subthemes?: string, years?: string): Action {
        return {
            type: SetActions.SET_FILTER,
            payload: { themes: themes, subthemes: subthemes, years: years }
        };
    }
}