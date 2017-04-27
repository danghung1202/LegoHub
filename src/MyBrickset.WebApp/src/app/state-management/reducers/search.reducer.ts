import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SearchActions } from '../actions';

export interface SearchState {
    suggestQueries: string[];
    loading: boolean;
};

const initialState: SearchState = {
    suggestQueries: [],
    loading: false
};

export function reducer(state = initialState, action: Action): SearchState {
    switch (action.type) {
        case SearchActions.GET_SUGGESTION_QUERY: {
            return Object.assign({}, state, { suggestQueries: [], loading: true });
        }

        case SearchActions.GET_SUGGESTION_QUERY_SUCCESS: {
            let result = action.payload;
            return Object.assign({}, state, { suggestQueries: result, loading: false });
        }

        default: {
            return state;
        }
    }
}