import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PinActions } from '../actions';

export interface PinterestState {
    pins: Pin[];
    loading: boolean;
    showMore?: boolean;
};

const initialState: PinterestState = {
    pins: [],
    loading: false,
    showMore: false
};

export function reducer(state = initialState, action: Action): PinterestState {
    switch (action.type) {
        case PinActions.GET_PINS: {
            return Object.assign({}, state, { loading: true, showMore: false });
        }

        case PinActions.GET_PINS_SUCCESS: {
            let result = action.payload;
            return Object.assign({}, state, <PinterestState>{ pins: result, loading: false, showMore: true });
        }

        case PinActions.GET_MORE_PINS_SUCCESS: {
            let result = action.payload;
            return {
                pins: [...state.pins, ...result],
                loading: false,
                showMore: result.length > 0
            };
        }

        default: {
            return state;
        }
    }
}