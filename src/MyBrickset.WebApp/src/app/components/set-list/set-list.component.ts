import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set } from '../../models';

import { AppState, NavigationState, SetActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./set-list.component.html'),
    styles: [`
        md-card {
            margin-bottom: 15px;
            background-color: #F5F5F5;
        }

        md-spinner {
            display:none;
            height:30px;
            width:30px;
            margin: auto;
        }

        md-spinner.show {
            display:block;
        }
    `]
})
export class SetListComponent implements OnInit {
    subParams: Subscription;
    sets: Observable<Set[]>;
    loading: Observable<boolean>;

    constructor(private route: ActivatedRoute, private router: Router,
        private store: Store<AppState>, private setActions: SetActions) {
        this.sets = this.store.select(s => s.sets).select(s => s.sets);
        this.loading = this.store.select(s => s.sets).select(s => s.loading);
    }

    ngOnInit() {
        this.subParams = this.route
            .queryParams
            .subscribe(params => {
                let themes = params['themes'] || '';
                let subthemes = params['subthemes'] || '';
                let years = params['years'] || '';

                this.store.dispatch(this.setActions.loadSets(themes, subthemes, years))
                console.log(`${themes}/${subthemes}/${years}`);
            });
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }
}