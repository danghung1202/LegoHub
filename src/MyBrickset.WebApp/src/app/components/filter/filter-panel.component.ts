import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, NavigationState, SetActions } from '../../state-management';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./filter-panel.component.html'),
    styles: [`
        .modal-content{
            height:100%;
            z-index:2;
        }

        .mini-button {
            padding: 0;
            flex-shrink: 0;
            line-height: 0px;
            width: 24px;
            height: 24px;
        }

        md-chip {
            padding: 3px 5px 3px 8px !important;
        }

        .filter-title{
            flex-grow: 1;
            text-align: center;
            margin-right: 24px;
        }

        .filter-row{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0 8px 0 16px;
            height:42px;
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
    selectedThemes: Observable<Theme[]>;
    selectedSubthemes: Observable<Subtheme[]>;
    selectedYears: Observable<Year[]>;

    subParams: Subscription;
    params: any;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private setActions: SetActions) {

        this.selectedThemes = this.store.select(s => s.filter).select(s => s.selectedThemes);
        this.selectedSubthemes = this.store.select(s => s.filter).select(s => s.selectedSubthems);
        this.selectedYears = this.store.select(s => s.filter).select(s => s.selectedYear);
    }

    ngOnInit() {
        this.subParams = Observable.combineLatest(this.selectedThemes, this.selectedSubthemes, this.selectedYears,
            (themes, subthemes, years) => ({ themes: themes.map(x=>x.theme).join(','), subthemes: subthemes.map(x=>x.subtheme).join(','), years: years.map(x=>x.year).join(',') }))
            .subscribe(result => {
                    if(result.themes == '') result.themes = ' ';
                    if(result.subthemes == '') result.subthemes = ' ';
                    if(result.years == '') result.years = ' ';

                    this.params = result;
                });
    }

    goBack() {
        this.location.back();
    }

    applyFilter() {

        this.router.navigate(['/sets', this.params["years"], this.params["themes"], this.params["subthemes"]])
    }

    clearFilter() {

    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }
}