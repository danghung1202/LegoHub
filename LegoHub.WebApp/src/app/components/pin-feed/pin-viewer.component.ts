import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from "@angular/common";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, SetImage, Review, Instruction, Theme, Subtheme, Year } from '../../models';

import { AppState, SetListActions, PinActions } from '../../state-management';

@Component({
    template: `
       <div class="modal">
            <div class="modal-content right-animation">
                <div class="sidenav-toolbar">
                    <span>{{selectedPin.note}}</span>
                    <span class="spacer"></span>
                    <button md-icon-button type="button" (click)="goBack()">
                        <md-icon>clear</md-icon>
                    </button>
                </div>
                <iframe [src]="selectedPin.original_link | safe" frameborder="0" class="pin-viewer-iframe"></iframe>
            </div>
        </div>
    `,
    styles: [`
        .modal-content{
            height:100%;
            z-index:3
        }

        .pin-viewer-iframe {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            border: none;
        }

     `]
})
export class PinViewerComponent {
    private idSub: Subscription;
    private pinSub: Subscription;
    selectedPin: Pin;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private pinActions: PinActions) {
        this.pinSub = this.store.select(x => x.pinterest).select(x => x.selectedPin).subscribe(pin => {
            this.selectedPin = pin;
        });
    }

    ngOnInit() {
        this.idSub = this.route
            .params
            .subscribe(params => {
                let pinId = params['id'] || '';
                this.store.dispatch(this.pinActions.getPinInfo(pinId));
            });
    }

    goBack() {
        //this.location.back();
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.idSub.unsubscribe();
        this.pinSub.unsubscribe();
    }
}
