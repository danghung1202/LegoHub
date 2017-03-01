import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { AppState, NavigationState } from '../../state-management';

@Component({
    template: require('./set-list.component.html'),
})
export class SetListComponent implements OnInit {
    subParams: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

    ngOnInit() {
        this.subParams = this.route
            .queryParams
            .subscribe(params => {
                console.log(params['themes'] + "/" + params['years']);
            });
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }
}