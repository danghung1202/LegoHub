import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { AppState, FilterActions } from '../../state-management';
import { CriteriaType } from '../../constant';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<filter-criteria 
                    [criterias]="criterias | async" 
                    [loading]="loading | async" 
                    [criteriaName]="criteriaName" 
                    (goBack)="goBack()"
                    (applyClick)="applyCriterias($event)">
                </filter-criteria>`
})
export class ViewFilterCriteriaComponent {
    subParams: Subscription;

    criteriaName: string;
    criterias: Observable<any>;
    loading: Observable<boolean>;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private filterActions: FilterActions) {
        this.loading = this.store.select(s => s.filter).select(s => s.loading);
    }

    ngOnInit() {
        this.subParams = this.route
            .params
            .subscribe(params => {
                let criteria = params['id'] || '';
                switch (criteria) {
                    case "theme": {

                        this.criteriaName = CriteriaType.Theme;
                        this.criterias = this.store.select(s => s.filter).select(s => s.themes.map(item => ({ isSelected: item.isSelected, value: item.theme })));
                        this.store.dispatch(this.filterActions.loadThemes());
                        
                        break;
                    }
                    case "subtheme": {
                        this.criteriaName = CriteriaType.Subtheme;
                        this.criterias = this.store.select(s => s.filter).select(s => s.subthemes.map(item => ({ isSelected: item.isSelected, value: item.subtheme })))
                        break;
                    }
                    case "year": {
                        this.criteriaName = CriteriaType.Years;
                        this.criterias = this.store.select(s => s.filter).select(s => s.years.map(item => ({ isSelected: item.isSelected, value: item.year })))
                        break;
                    }
                }

            });
    }

    goBack() {
        this.location.back();
    }

    applyCriterias(selectedCriterias) {
        this.location.back();
        this.store.dispatch(this.filterActions.applyCriteriasSelected(this.criteriaName, selectedCriterias));
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }
}