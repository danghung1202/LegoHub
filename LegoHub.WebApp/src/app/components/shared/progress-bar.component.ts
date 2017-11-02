import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set } from '../../models';

import { AppState, ErrorActions } from '../../state-management';

@Component({
    selector: 'lh-progress-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="progress-bar-container"  [class.show]="isShow | async">
            <md-progress-bar
                color="accent"
                mode="buffer"
                [value]="value | async"
                [bufferValue]="0">
            </md-progress-bar>
        <div>
  `,
    styles: [
        `
        .progress-bar-container{
            display:none;
            position: fixed;
            left:0;
            right: 0;
            width: 100%;
            height: 5px;
            z-index: 1;
            -webkit-animation-name: slideIn;
            -webkit-animation-duration: 0.4s;
            animation-name: slideIn;
            animation-duration: 0.4s;
        }

        .show {
            display:block;
        }
      `
    ]
})
export class ProgressBarComponent {

    isShow: Observable<boolean>;
    value: Observable<number>;

    constructor(private store: Store<AppState>, private errorActions: ErrorActions) {
        this.isShow = this.store.select(s => s.progress).select(s => s.isShow);
        this.value = this.store.select(s => s.progress).select(s => s.progressValue);
    }

}