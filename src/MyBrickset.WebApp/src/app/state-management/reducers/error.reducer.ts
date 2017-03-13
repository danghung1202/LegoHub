import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ErrorActions } from '../actions';

export interface ErrorState 
{
    message: string;
    visible: boolean;
};

const initialState: ErrorState = {
    message: '',
    visible: false
};

export function reducer(state = initialState, action: Action): ErrorState {
    switch (action.type) {
        case ErrorActions.SHOW_ERROR: {
            let errorMessage = action.payload ;
            return {
                message: state.message + errorMessage + '<br/>',
                visible: true
            };
        }

        case ErrorActions.HIDE_ERROR: {
            return {
                message: '',
                visible: false
            };
        }
        
        default: {
            return state;
        }
    }
}