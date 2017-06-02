import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PinActions } from '../actions';

export interface PinterestState {
    pins: Pin[];
    selectedPin?: Pin;
    loading: boolean;
    showMore?: boolean;
};

const initialState: PinterestState = {
    pins: [],
    selectedPin: null,
    loading: false,
    showMore: false
};

export function reducer(state = initialState, action: Action): PinterestState {
    switch (action.type) {
        case PinActions.GET_PINS: {
            return Object.assign({}, state, {pins: [], loading: true, showMore: false });
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

        case PinActions.GET_PIN_INFO: {
            let pinId = action.payload;
            let selectedPin = state.pins.find(pin => pin.id == pinId);
            return Object.assign({}, state, { selectedPin: selectedPin });
        }

        default: {
            return state;
        }
    }
}