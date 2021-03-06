declare var imagesLoaded: any;

import { Component, Input, AfterViewInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';


import { Set } from '../../models';
import { AppState, ProgressBarActions } from '../../state-management';

@Component({
    selector: 'set-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './set-card.component.html',
    styles: [`
        .card-label {
            text-transform: uppercase;
            margin-right: 5px;
        }

        md-card {
            background-color: #F9FBE7;
        }

        md-icon {
            font-size: 16px;
            height: 16px;
            width: 16px;
        }

        md-chip-list {
            margin-bottom: 3px;
            display: flex;
        }

        md-chip-list md-chip {
            background-color: #CDDC39;
            margin-bottom: 2px;
            padding: 5px 8px 5px 8px !important;
        }
        
    `]
})
export class SetCardComponent {
    @Input() set: any;
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

    onAlways() {
        this.store.dispatch(this.progressActions.addProgressValue(1))
    }
}