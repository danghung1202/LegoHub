import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Criteria } from '../../models';
import { CriteriaType } from '../../constant';

import { AppState, SetListActions, FilterActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<filter-panel 
                    [selectedThemes]="selectedThemes | async" 
                    [selectedThemes]="selectedThemes | async" 
                    [selectedYears]="selectedYears | async" 
                    (applyFilterEvent)="applyFilter($event)"
                    (clearFilterEvent)="clearFilter()"
                    (goToCriteriasEvent)="goToCriterias($event)"
                    (removeCriteriaEvent)="removeCriteria($event)"
                    (goBackEvent)="goBack()">
                </filter-panel>`
})
export class FilterPanelContainer implements OnInit {
    selectedThemes: Observable<Criteria[]>;
    selectedSubthemes: Observable<Criteria[]>;
    selectedYears: Observable<Criteria[]>;

    subParams: Subscription;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private filterActions: FilterActions) {

        this.selectedThemes = this.store.select(s => s.filter).select(s => s.selectedThemes.map(item => ({ isSelected: item.isSelected, value: item.theme })));
        this.selectedSubthemes = this.store.select(s => s.filter).select(s => s.selectedSubthems.map(item => ({ isSelected: item.isSelected, value: item.subtheme })));
        this.selectedYears = this.store.select(s => s.filter).select(s => s.selectedYears.map(item => ({ isSelected: item.isSelected, value: item.year })));
    }

    ngOnInit() {
        this.subParams = this.route
            .queryParams
            .subscribe(params => {
                let themes = params['themes'] || '';
                let subthemes = params['subthemes'] || '';
                let years = params['years'] || '';

                this.store.dispatch(this.filterActions.loadSubthemesWithYears(themes, subthemes, years));
            });
    }

    goBack() {
        this.location.back();
    }

    applyFilter(queryParams) {
        this.router.navigate(['/sets'], { queryParams: queryParams, replaceUrl: true })
    }

    clearFilter() {
        this.store.dispatch(this.filterActions.removeAllSelectedCriterias());
    }

    goToCriterias(criteriaType) {
        switch (criteriaType) {
            case CriteriaType.Theme: {
                this.router.navigate(['theme'], { relativeTo: this.route, preserveQueryParams: true })
                break;
            }
            case CriteriaType.Subtheme: {
                this.router.navigate(['subtheme'], { relativeTo: this.route, preserveQueryParams: true })
                break;
            }
            case CriteriaType.Years: {
                this.router.navigate(['year'], { relativeTo: this.route, preserveQueryParams: true })
                break;
            }
        }
    }

    removeCriteria(event) {
        this.store.dispatch(this.filterActions.removeSelectedCriteria(event.type, event.criteria));
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }
}