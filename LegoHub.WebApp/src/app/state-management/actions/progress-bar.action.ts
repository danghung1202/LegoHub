import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ProgressBarActions {
    static  SHOW_PROGRESS_BAR= 'SHOW_PROGRESS_BAR';
    showProgressBar(maxValue: number): Action {
        return {
            type: ProgressBarActions.SHOW_PROGRESS_BAR,
            payload: maxValue
        };
    }

    static ADD_PROGRESS_VALUE = 'ADD_PROGRESS_VALUE';
    addProgressValue(value: number): Action {
        return {
            type: ProgressBarActions.ADD_PROGRESS_VALUE,
            payload: value
        };
    }
}