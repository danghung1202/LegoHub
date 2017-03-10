import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetActions } from '../actions';
import { Set} from '../../models';

export interface SetListState 
{
    sortCriterias: any,
    sets: Set[];
    loading: boolean;
};

const initialState: SetListState = {
    sortCriterias: [],
    sets: [],
    loading: false
};

export function reducer(state = initialState, action: Action): SetListState {
    switch (action.type) {
        case SetActions.LOAD_SETS: {
            return {
                sortCriterias: state.sortCriterias,
                sets: [],
                loading: true
            };
        }
        case SetActions.LOAD_SETS_SUCCESS: {
            const sets = action.payload;

            return {
                sortCriterias: state.sortCriterias,
                sets: sets,
                loading: false
            };
        }

        case SetActions.LOAD_SORT_CRITERIAS: {
            return {
                sortCriterias: [],
                sets: state.sets,
                loading: state.loading
            };
        }

        case SetActions.LOAD_SORT_CRITERIAS_SUCCESS: {
            const criterias = action.payload;
            return {
                sortCriterias: criterias,
                sets: state.sets,
                loading: state.loading
            };
        }

        default: {
            return state;
        }
    }
}