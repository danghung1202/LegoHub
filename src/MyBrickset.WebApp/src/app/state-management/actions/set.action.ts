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
}