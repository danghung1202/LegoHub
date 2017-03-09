import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, NavigationState, SetActions, FilterActions } from '../../state-management';

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
        .selected {
            background-color: #eee;
        }
        
    `]
})
export class FilterCriteriaComponent {
    subParams: Subscription;

    criteriaName: string;
    selectedCount: number;

    criterias: Observable<any>;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private filterActions: FilterActions) {
    }

    ngOnInit() {
        this.subParams = this.route
            .params
            .subscribe(params => {
                let criteria = params['id'] || '';
                if (criteria == "theme") {

                    this.criteriaName = "Themes";
                    this.store.dispatch(this.filterActions.loadThemes());
                    this.criterias = this.store.select(s => s.filter).select(s => s.themes)
                        .map(themes => {
                            this.selectedCount = themes.filter(x=>x.isSelected).length;
                            return themes.map(x => {
                                return { isSelected: x.isSelected, value: x.theme }
                            })
                        });

                }
            });
    }

    goBack() {
        this.location.back();
    }

    selectCriteria(criteria) {
        criteria.isSelected = !criteria.isSelected;
        this.store.dispatch(this.filterActions.setCriteriaSelected(criteria.value, this.criteriaName));
        if(criteria.isSelected) {
            this.selectedCount += 1; 
        } else {
            this.selectedCount -= 1;
        }
    }

    clearCriterias() {
        this.store.dispatch(this.filterActions.clearCriteriaSelected(this.criteriaName));
    }

    applyCriterias() {
        this.store.dispatch(this.filterActions.applyCriteriasSelected(this.criteriaName));
        this.location.back();
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }
}