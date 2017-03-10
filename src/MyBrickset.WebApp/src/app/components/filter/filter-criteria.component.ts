import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, NavigationState, SetActions, FilterActions } from '../../state-management';
import { CriteriaType } from '../../data';

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
export class FilterCriteriaComponent {
    subParams: Subscription;

    criteriaName: string;
    selectedCount: number;

    criterias: Observable<any>;
    testThemes: Observable<Theme[]>;
    loading: Observable<boolean>;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private filterActions: FilterActions) {
        this.loading = this.store.select(s => s.filter).select(s => s.loading);
        this.store.select(s => s.filter).select(s => s.themes).do(themes=> console.log(themes)).subscribe();
    }

    ngOnInit() {
        this.subParams = this.route
            .params
            .subscribe(params => {
                let criteria = params['id'] || '';
                switch (criteria) {
                    case "theme": {
                        this.store.dispatch(this.filterActions.loadThemes());

                        this.criteriaName = CriteriaType.Theme;
                        this.criterias = this.store.select(s => s.filter).select(s => s.themes.map(item => ({ isSelected: item.isSelected, value: item.theme })))
                            .do(themes => {this.selectedCount = themes.filter(x => x.isSelected).length;})
                        break;
                        
                    }
                    case "subtheme": {
                        this.criteriaName = CriteriaType.Subtheme;
                        this.criterias = this.store.select(s => s.filter).select(s => s.subthemes.map(item => ({ isSelected: item.isSelected, value: item.subtheme })))
                            .do(subthemes => this.selectedCount = subthemes.filter(x => x.isSelected).length)
                        break;
                    }
                    case "year": {
                        this.criteriaName = CriteriaType.Years;
                        this.criterias = this.store.select(s => s.filter).select(s => s.years.map(item => ({ isSelected: item.isSelected, value: item.year })))
                            .do(years => this.selectedCount = years.filter(x => x.isSelected).length)
                        break;
                    }
                }

            });
    }

    goBack() {
        this.location.back();
    }

    selectCriteria(criteria) {
        criteria.isSelected = !criteria.isSelected;
        this.store.dispatch(this.filterActions.setCriteriaSelected(criteria.value, this.criteriaName));
        if (criteria.isSelected) {
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