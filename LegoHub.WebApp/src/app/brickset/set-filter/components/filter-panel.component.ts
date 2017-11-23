import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Criteria } from '../../models';
import { CriteriaType } from '../../constant';

import { AppState, SetListActions, FilterActions } from '../../state-management';


@Component({
    selector: 'filter-panel',
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
    @Input() selectedThemes: Criteria[];
    @Input() selectedSubthemes: Criteria[];
    @Input() selectedYears: Criteria[];

    @Output() applyFilterEvent = new EventEmitter();
    @Output() clearFilterEvent = new EventEmitter();
    @Output() goToCriteriasEvent = new EventEmitter();
    @Output() removeCriteriaEvent = new EventEmitter();
    @Output() goBackEvent = new EventEmitter();

    goBack() {
        this.goBackEvent.emit();
    }

    applyFilter() {
        let queryParams: any = {};
        if (this.selectedThemes) queryParams["themes"] = this.selectedThemes.map(x=>x.value).join(',');
        if (this.selectedSubthemes) queryParams["subthemes"] = this.selectedSubthemes.map(x=>x.value).join(',');
        if (this.selectedYears) queryParams["years"] = this.selectedYears.map(x=>x.value).join(',');

        this.applyFilterEvent.emit(queryParams);
    }

    clearFilter() {
        this.clearFilterEvent.emit();
    }

    goToCriterias(criteriaType) {
        this.goToCriteriasEvent.emit(criteriaType);
    }

    removeCriteria(event) {
        this.removeCriteriaEvent.emit(event);
    }
}