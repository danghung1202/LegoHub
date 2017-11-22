import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetListActions } from '../actions';
import { Set } from '../../models';

export interface SetListState {
    sortCriterias: any,
    sets: Set[];
    loading: boolean;
    showMore?: boolean;
};

const initialState: SetListState = {
    sortCriterias: [],
    sets: [],
    loading: false,
    showMore: false
};

export function reducer(state = initialState, action: Action): SetListState {
    switch (action.type) {
        case SetListActions.LOAD_SETS: {
            return {
                sortCriterias: state.sortCriterias,
                sets: [],
                loading: true,
                showMore: false
            };
        }
        case SetListActions.LOAD_SETS_SUCCESS: {
            const sets = action.payload;

            return {
                sortCriterias: state.sortCriterias,
                sets: sets,
                loading: false,
                showMore: sets.length >= 20
            };
        }

        case SetListActions.LOAD_MORE_SETS: {
            return Object.assign({}, state, {
                loading: true,
                showMore: false
            });
            
        }
        case SetListActions.LOAD_MORE_SETS_SUCCESS: {
            const sets = action.payload;
            return {
                sortCriterias: state.sortCriterias,
                sets: [...state.sets, ...sets],
                loading: false,
                showMore: sets.length >= 20
            };
        }

        case SetListActions.LOAD_SORT_CRITERIAS: {
            return Object.assign({}, state, {
                sortCriterias: [],
            });
        }

        case SetListActions.LOAD_SORT_CRITERIAS_SUCCESS: {
            const criterias = action.payload;

            return Object.assign({}, state, {
                sortCriterias: criterias,
            });
        }

        default: {
            return state;
        }
    }
}