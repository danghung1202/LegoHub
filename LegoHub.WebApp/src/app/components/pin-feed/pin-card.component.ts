declare var imagesLoaded: any;

import { Component, Input, AfterViewInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';


import { Set } from '../../models';
import { AppState, ProgressBarActions } from '../../state-management';

@Component({
    selector: 'pin-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './pin-card.component.html',
    styles: [`
        .card-label {
            text-transform: uppercase;
            margin-right: 5px;
        }

        md-card {
            background-color: #F9FBE7;
        }

    `]
})
export class PinCardComponent implements AfterViewInit {
    @Input() pin: Pin;
    constructor(
        private _element: ElementRef,
        private store: Store<AppState>,
        private progressActions: ProgressBarActions) { }

    ngAfterViewInit() {
        // viewChild is set after the view has been initialized
        var imgLoad = imagesLoaded(this._element.nativeElement, (instance: any) => {
            this.onAlways();
        });
    }

    onProgress(imgLoad, image) {
        console.log("PinCardComponent: onProgress")
    }

    onAlways() {
        this.store.dispatch(this.progressActions.addProgressValue(1))
    }
}