import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetActions } from '../actions';
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
        case SetActions.LOAD_SETS: {
            return {
                sortCriterias: state.sortCriterias,
                sets: [],
                loading: true,
                showMore: false
            };
        }
        case SetActions.LOAD_SETS_SUCCESS: {
            const sets = action.payload;

            return {
                sortCriterias: state.sortCriterias,
                sets: sets,
                loading: false,
                showMore: sets.length >= 20
            };
        }

        case SetActions.LOAD_MORE_SETS: {
            return {
                sortCriterias: state.sortCriterias,
                sets: state.sets,
                loading: true,
                showMore: false
            };
        }
        case SetActions.LOAD_MORE_SETS_SUCCESS: {
            const sets = action.payload;
            return {
                    sortCriterias: state.sortCriterias,
                    sets: [...state.sets, ...sets],
                    loading: false,
                    showMore: sets.length >= 20
                };
        }

        case SetActions.LOAD_SORT_CRITERIAS: {
            return {
                sortCriterias: [],
                sets: state.sets,
                loading: state.loading,
                showMore: state.showMore
            };
        }

        case SetActions.LOAD_SORT_CRITERIAS_SUCCESS: {
            const criterias = action.payload;
            return {
                sortCriterias: criterias,
                sets: state.sets,
                loading: state.loading,
                showMore: state.showMore
            };
        }

        default: {
            return state;
        }
    }
}