import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetActions } from '../actions';
import { Set} from '../../models';

export interface SetListState 
{
    sets: Set[];
    loading: boolean;
};

const initialState: SetListState = {
    sets: [],
    loading: false
};


export function reducer(state = initialState, action: Action): SetListState {
    switch (action.type) {
        case SetActions.LOAD_SETS: {
            return {
                sets: [],
                loading: true
            };
        }
        case SetActions.LOAD_SETS_SUCCESS: {
            const sets = action.payload;

            return {
                sets: sets,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}