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
    templateUrl: './filter-panel.component.html',
    styles: [`
        .modal-content{
            height:100%;
            z-index:2;
            max-width:500px;
            right:0;
        }

        .filter-content{
            display:block;
            width:100%;
            height: calc(100% - 64px);
            overflow: auto;
        }

        .filter-button-container{
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .filter-button{
            flex-grow: 1;
        }

    `]
})
export class FilterPanelComponent {
    selectedThemes: Observable<Criteria[]>;
    selectedSubthemes: Observable<Criteria[]>;
    selectedYears: Observable<Criteria[]>;

    subParams: Subscription;
    subSelectedFilter: Subscription;
    params: any;

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
        this.subSelectedFilter = Observable.combineLatest(this.selectedThemes, this.selectedSubthemes, this.selectedYears,
            (themes, subthemes, years) =>
                ({
                    themes: themes.map(x => x.value).join(','),
                    subthemes: subthemes.map(x => x.value).join(','),
                    years: years.map(x => x.value).join(',')
                }))
            .subscribe(result => {
                this.params = result;
            });

        this.subParams = this.route
            .queryParams
            .subscribe(params => {
                this.params = params;
                let themes = params['themes'] || '';
                let subthemes = params['subthemes'] || '';
                let years = params['years'] || '';

                this.store.dispatch(this.filterActions.loadSubthemesWithYears(themes, subthemes, years));
            });
    }

    goBack() {
        this.location.back();
    }

    applyFilter() {

        let queryParams: any = {};
        if (this.params.themes) queryParams["themes"] = this.params.themes;
        if (this.params.subthemes) queryParams["subthemes"] = this.params.subthemes;
        if (this.params.years) queryParams["years"] = this.params.years;

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
        this.subSelectedFilter.unsubscribe();
    }
}