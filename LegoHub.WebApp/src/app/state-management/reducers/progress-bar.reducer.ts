import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProgressBarActions } from '../actions';

export interface ProgressBarState {
    maxValue: number;
    currentValue: number;
    progressValue: number;
    isShow: boolean;
};

const initialState: ProgressBarState = {
    maxValue: 100,
    currentValue: 0,
    progressValue: 0,
    isShow: false
};

export function reducer(state = initialState, action: Action): ProgressBarState {
    switch (action.type) {
        case ProgressBarActions.SHOW_PROGRESS_BAR: {
            let maxValue = action.payload;
            return Object.assign({}, state, {
                maxValue: maxValue,
                currentValue: 0,
                progressValue: 0,
                isShow: maxValue > 0
            });
        }

        case ProgressBarActions.ADD_PROGRESS_VALUE: {
            let value = action.payload;
            return Object.assign({}, state, {
                currentValue: state.currentValue + value,
                progressValue: (state.currentValue + value) / state.maxValue * 100,
                isShow: state.maxValue > state.currentValue + value
            });
        }

        default: {
            return state;
        }
    }
}