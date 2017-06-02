import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class PinActions {
    static GET_PINS = '[Pinterest] Get pin list';
    getPinList(pageNumber?: number): Action {
        return {
            type: PinActions.GET_PINS,
            payload: pageNumber
        };
    }

    static GET_PINS_SUCCESS = '[Pinterest] Get pin list success';
    getPinListSuccess(results): Action {
        return {
            type: PinActions.GET_PINS_SUCCESS,
            payload: results
        };
    }

    static GET_MORE_PINS_SUCCESS = '[Pinterest] Get more pin list success';
    getMorePinListSuccess(results): Action {
        return {
            type: PinActions.GET_MORE_PINS_SUCCESS,
            payload: results
        };
    }

    static GET_PIN_INFO = '[Pinterest] Get pin detail';
    getPinInfo(pinId: string): Action {
        return {
            type: PinActions.GET_PIN_INFO,
            payload: pinId
        };
    }
}