import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, NavigationState, SetListActions, FilterActions, NavigationActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./set-list.component.html'),
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
    subParams: Subscription;

    sets: Observable<Set[]>;
    
    loading: Observable<boolean>;
    showMore: Observable<boolean>;

    selectedThemes: Theme[];
    selectedSubthemes: Subtheme[];
    selectedYears: Year[];

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
        private setActions: SetListActions,
        private filterActions: FilterActions,
        private navigationActions: NavigationActions) {

        this.sets = this.store.select(s => s.sets).select(s => s.sets);
        this.loading = this.store.select(s => s.sets).select(s => s.loading);
        this.showMore = this.store.select(s => s.sets).select(s => s.showMore);
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

    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }

    openFilterPanel() {
        let navigationExtras: NavigationExtras = {
            relativeTo: this.route,
            preserveQueryParams: true
        };

        //this.router.navigate([{ outlets: { child: "filter" }}], navigationExtras);
        this.router.navigate(["filter"], navigationExtras);
    }

    openSortPanel(){
        this.store.dispatch(this.navigationActions.toggleSortSidenav(true));
    }

    trackBySetID(index, item: Set) {
        return item ? item.setID : undefined;
    }

    loadMore() {
        let themes = this.params['themes'];
        let subthemes = this.params['subthemes'];
        let years = this.params['years'];
        this.pageNumber = this.pageNumber + 1;
        this.store.dispatch(this.setActions.loadMoreSets(themes, subthemes, years, '', this.pageNumber.toString()));
    }
}