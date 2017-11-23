import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from "@angular/common";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, SetImage,Review, Instruction, Theme, Subtheme, Year } from '../../models';

import { AppState, SetListActions, SetActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <set-detail 
            [set]="set | async"
            [additionalImages]="additionalImages | async"
            [intructions]="intructions | async"
            [reviews]="reviews | async"
            [parts]="parts | async"
            [alternateBuilds]="alternateBuilds | async"
            (goBack)="goBack()"
            (getPartsOfSet)="getParts($event)"
            (getAltBuildsOfSet)="getBuilds($event)"
            >
        </set-detail>
    `
})
export class SetDetailContainer {
    idSub: Subscription;
    set: Observable<Set>;
    additionalImages: Observable<SetImage[]>;
    intructions: Observable<Instruction[]>;
    reviews: Observable<Review[]>;
    parts: Observable<any>;
    alternateBuilds: Observable<any>;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private setActions: SetActions) {

        this.set = this.store.select(x => x.set).select(x => x.set);
        this.additionalImages = this.store.select(x => x.set).select(x => x.additionalImages);
        this.intructions = this.store.select(x => x.set).select(x => x.intructions);
        this.reviews = this.store.select(x => x.set).select(x => x.reviews);
        this.parts = this.store.select(x => x.set).select(x => x.parts);
        this.alternateBuilds = this.store.select(x => x.set).select(x => x.alternateBuilds);
    }

    ngOnInit() {
        this.idSub = this.route
            .params
            .subscribe(params => {
                let setId = params['id'] || '';
                this.store.dispatch(this.setActions.getSet(setId));
            });
    }

    getParts(setNumber) {
        this.store.dispatch(this.setActions.getParts(setNumber));
    }

    getBuilds(setNumber) {
        this.store.dispatch(this.setActions.getAlternateBuilds(setNumber));
    }

    goBack() {
        this.location.back();
    }

    ngOnDestroy() {
        this.idSub.unsubscribe();
    }

}