import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, NavigationState, SetActions, FilterActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./set-list.component.html'),
    styles: [`
        md-card {
            margin-bottom: 15px;
            background-color: #F5F5F5;
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

        #loadMoreBtn {
            display: none;
        }

        #loadMoreBtn.show {
            display: block;
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
    `]
})
export class SetListComponent implements OnInit {
    subParams: Subscription;

    sets: Observable<Set[]>;
    sortCriterias: Observable<any>;
    loading: Observable<boolean>;
    showMore: Observable<boolean>;

    selectedThemes: Theme[];
    selectedSubthemes: Subtheme[];
    selectedYears: Year[];

    selectedCriteria: string;
    params: any = {
        themes: '',
        subthemes: '',
        years: ''
    };

    pageNumber: number = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private setActions: SetActions,
        private filterActions: FilterActions) {

        this.sets = this.store.select(s => s.sets).select(s => s.sets);
        this.sortCriterias = this.store.select(s => s.sets).select(s => s.sortCriterias);
        this.loading = this.store.select(s => s.sets).select(s => s.loading);
        this.showMore =  this.store.select(s => s.sets).select(s => s.showMore);
    }

    ngOnInit() {
        this.subParams = this.route
            .queryParams
            .subscribe(params => {
                this.pageNumber = 1;
                this.params = params;
                let themes = params['themes'] || '';
                let subthemes = params['subthemes'] || '';
                let years = params['years'] || '';

                this.selectedThemes = themes.split(',').filter(item => item.trim() != '').map((theme) => ({ theme: theme, isSelected: true }));

                this.selectedSubthemes = subthemes.split(',').filter(item => item.trim() != '').map(subtheme => ({ subtheme: subtheme, isSelected: true }));

                this.selectedYears = years.split(',').filter(item => item.trim() != '').map(year => ({ year: year, isSelected: true }));

                this.store.dispatch(this.setActions.loadSets(themes, subthemes, years));
            });

        this.store.dispatch(this.setActions.loadSortCriterias());
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }

    sortChange() {
        console.log(this.selectedCriteria);
    }

    openFilter() {
        
        let navigationExtras: NavigationExtras = {
            //queryParams: { themes: themes, subthemes: subthemes, years: years },
            relativeTo: this.route,
            preserveQueryParams: true
        };

        //this.router.navigate([{ outlets: { child: "filter" }}], navigationExtras);
        this.router.navigate(["filter"], navigationExtras);
    }

    loadMore() {
        let themes = this.params['themes'];
        let subthemes = this.params['subthemes'];
        let years = this.params['years'];
        this.pageNumber = this.pageNumber + 1;
        this.store.dispatch(this.setActions.loadMoreSets(themes, subthemes, years,'', this.pageNumber.toString()));
    }
}