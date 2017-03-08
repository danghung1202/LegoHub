import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, NavigationState, SetActions, ThemeActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./filter-criteria.component.html'),
    styles: [`
        .modal-content{
            height:100%;
            z-index:3
        }
        md-list{
            height: calc(100% - 64px);
            overflow: auto;
        }
        
    `]
})
export class FilterCriteriaComponent {
    subParams: Subscription;
    criterias: Observable<any>;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private themeActions: ThemeActions) {
    }

    ngOnInit() {
        this.subParams = this.route
            .params
            .subscribe(params => {
                let criteria = params['id'] || '';
                if (criteria == "theme") {
                    this.store.dispatch(this.themeActions.loadThemes());
                    this.criterias = this.store.select(s => s.filter).select(s => s.themes)
                        .map(themes => {
                            return themes.map(x => {
                                return { isSelected: x.isSelected, lable: x.theme }
                            })
                        })
                }
                console.log(`${criteria}`);
            });
    }

    goBack() {
        this.location.back();
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }
}