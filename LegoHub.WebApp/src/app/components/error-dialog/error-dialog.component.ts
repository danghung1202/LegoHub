import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set } from '../../models';

import { AppState, ErrorActions } from '../../state-management';

@Component({
    selector: 'error-dialog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="error-dialog"  [class.show]="visible | async">
            <span class="error-close" (click)="hide()">&times;</span>
            <div class="error-content" [innerHTML]="message | async">
            </div>
        <div>
  `,
    styles: [
        `
        .error-dialog{
            display:none;
            position: fixed;
            bottom: 0;
            left: 50%;
            margin-left: -160px;
            width: 300px;
            z-index: 10000;
            padding: 10px;
            color: #fff;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            background-color: rgba(0,0,0,0.4);
            -webkit-animation-name: slideIn;
            -webkit-animation-duration: 0.4s;
            animation-name: slideIn;
            animation-duration: 0.4s;
        }

        .show {
            display:block;
        }

        .error-content {
            margin-right:20px;
        }

        .error-close {
            color: black;
            float: right;
            font-size: 28px;
            font-weight: bold;
            line-height: 20px;
        }

        .error-close:hover,
        .error-close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
      `
    ]
})
export class ErrorDialogComponent {

    visible: Observable<boolean>;
    message: Observable<string>;
   
    constructor(private store: Store<AppState>, private errorActions: ErrorActions) {
        this.visible = this.store.select(s => s.error).select(s => s.visible);
        this.message = this.store.select(s => s.error).select(s => s.message);
    }

    public hide(): void {
        this.store.dispatch(this.errorActions.hideError());
    }
}