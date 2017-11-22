import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, SetListActions, FilterActions, NavigationActions, ProgressBarActions } from '../../state-management';

@Component({
    selector: 'set-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './set-list.component.html',
    styles: [`
        masonry {
            margin: 0 -0.6rem;
        }

        md-spinner {
            display:none;
            height:30px;
            width:30px;
            margin: auto;
        }

        md-spinner.show {
            display: block;
        }

        .tag-container{
            margin: 15px 0;
        }

        .button-row{
            display:flex;
            justify-content: flex-end;
        }

        #loadMoreBtn {
            display: none;
        }

        #loadMoreBtn.show {
            display: block;
        }
    `]
})
export class SetListComponent implements OnInit {
    selectedThemes: Theme[];
    selectedSubthemes: Subtheme[];
    selectedYears: Year[];
    pageNumber: number = 1;

    private _queryParams: any = {
        themes: '',
        subthemes: '',
        years: ''
    };

    @Input() sets: Set[];
    @Input() loading: boolean;
    @Input() showMore: boolean;
    @Input()
    set queryParams(newParams) {
        let themes = newParams['themes'] || '';
        let subthemes = newParams['subthemes'] || '';
        let years = newParams['years'] || '';

        this.selectedThemes = themes.split(',').filter(item => item.trim() != '').map((theme) => ({ theme: theme, isSelected: true }));
        this.selectedSubthemes = subthemes.split(',').filter(item => item.trim() != '').map(subtheme => ({ subtheme: subtheme, isSelected: true }));
        this.selectedYears = years.split(',').filter(item => item.trim() != '').map(year => ({ year: year, isSelected: true }));

        this.pageNumber = 1;
        this._queryParams = newParams;
        this.store.dispatch(this.setActions.loadSets(themes, subthemes, years));
    }
    get queryParams() {
        return this._queryParams;
    }

    @Output() openFilterPanelEvent = new EventEmitter();
    @Output() openSortPanelEvent = new EventEmitter();
    @Output() loadMoreEvent = new EventEmitter();

    constructor(
        private store: Store<AppState>,
        private setActions: SetListActions,
        private progressActions: ProgressBarActions,
        private filterActions: FilterActions,
        private navigationActions: NavigationActions) {
    }

    openFilterPanel() {
        this.openFilterPanelEvent.emit();
    }

    openSortPanel() {
        this.openSortPanelEvent.emit();
    }
    
    trackBySetID(index, item: Set) {
        return item ? item.setID : undefined;
    }

    loadMore() {
        let themes = this.queryParams['themes'];
        let subthemes = this.queryParams['subthemes'];
        let years = this.queryParams['years'];
        this.pageNumber = this.pageNumber + 1;
        this.loadMoreEvent.emit({themes, subthemes, years, pageNumber: this.pageNumber});
    }
}