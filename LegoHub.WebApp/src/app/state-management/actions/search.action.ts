import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class SearchActions {
    static GET_SUGGESTION_QUERY = 'GET_SUGGESTION_QUERY';
    getSuggestionQuery(query:string): Action {
        return {
            type: SearchActions.GET_SUGGESTION_QUERY,
            payload: query
        };
    }

    static GET_SUGGESTION_QUERY_SUCCESS = 'GET_SUGGESTION_QUERY_SUCCESS';
    getSuggestionQuerySuccess(results): Action {
        return {
            type: SearchActions.GET_SUGGESTION_QUERY_SUCCESS,
            payload: results
        };
    }
}