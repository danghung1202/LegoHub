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

    goBack() {
        this.location.back();
    }

    applyFilter() {
    }

    clearFilter() {
    }
}