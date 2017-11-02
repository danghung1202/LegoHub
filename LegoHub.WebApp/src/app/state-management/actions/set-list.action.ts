import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class SetListActions {
    static LOAD_SETS = '[Set] Load Sets';
    loadSets(themes?: string, subthemes?: string, years?: string): Action {
        return {
            type: SetListActions.LOAD_SETS,
            payload: { themes: themes, subthemes: subthemes, years: years }
        };
    }

    static LOAD_SETS_SUCCESS = '[Set] Load Sets Success';
    loadSetsSuccess(sets): Action {
        return {
            type: SetListActions.LOAD_SETS_SUCCESS,
            payload: sets
        };
    }

    static LOAD_MORE_SETS = '[Set] Load More Sets';
    loadMoreSets(themes?: string, subthemes?: string, years?: string, query?: string, page?: string, order?: string, show?: string): Action {
        return {
            type: SetListActions.LOAD_MORE_SETS,
            payload: { themes: themes, subthemes: subthemes, years: years, query: query, page: page, order: order, show: show }
        };
    }

    static LOAD_MORE_SETS_SUCCESS = '[Set] Load More Sets Success';
    loadMoreSetsSuccess(sets): Action {
        return {
            type: SetListActions.LOAD_MORE_SETS_SUCCESS,
            payload: sets
        };
    }

    static LOAD_SORT_CRITERIAS = '[Set] Load Sort Criterias';
    loadSortCriterias(): Action {
        return {
            type: SetListActions.LOAD_SORT_CRITERIAS
        };
    }

    static LOAD_SORT_CRITERIAS_SUCCESS = '[Set] Load Sort Criterias Success';
    loadSortCriteriasSuccess(criterias): Action {
        return {
            type: SetListActions.LOAD_SORT_CRITERIAS_SUCCESS,
            payload: criterias
        };
    }
}