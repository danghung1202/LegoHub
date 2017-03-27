import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ErrorActions {
    static SHOW_ERROR = '[Error] Show error';
    showError(error: string): Action {
        return {
            type: ErrorActions.SHOW_ERROR,
            payload: error
        };
    }
    static HIDE_ERROR = '[Error] Hide error';
    hideError(): Action {
        return {
            type: ErrorActions.HIDE_ERROR
        };
    }
}