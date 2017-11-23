import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, SetListActions, FilterActions, NavigationActions, ProgressBarActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<set-list 
                    [sets]="sets | async" 
                    [loading]="loading | async" 
                    [showMore]="showMore | async" 
                    [queryParams]="queryParams | async" 
                    (openFilterPanelEvent)="openFilterPanel()"
                    (openSortPanelEvent)="openSortPanel()"
                    (loadMoreEvent)="loadMore($event)">
                </set-list>`
})
export class SetListContainer implements OnInit {
    queryParams: Observable<any>;
    sets: Observable<Set[]>;
    loading: Observable<boolean>;
    showMore: Observable<boolean>;

    constructor(
        public route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private setActions: SetListActions,
        private progressActions: ProgressBarActions,
        private filterActions: FilterActions,
        private navigationActions: NavigationActions) {

        this.sets = this.store.select(s => s.sets).select(s => s.sets);
        this.loading = this.store.select(s => s.sets).select(s => s.loading);
        this.showMore = this.store.select(s => !s.progress.isShow && s.sets.showMore);
        this.queryParams = this.route.queryParams;
    }

    ngOnDestroy() {
        this.store.dispatch(this.progressActions.showProgressBar(0));
    }

    openFilterPanel() {
        let navigationExtras: NavigationExtras = {
            relativeTo: this.route,
            preserveQueryParams: true
        };

        //this.router.navigate([{ outlets: { child: "filter" }}], navigationExtras);
        this.router.navigate(["filter"], navigationExtras);
    }

    openSortPanel() {
        this.store.dispatch(this.navigationActions.toggleSortSidenav(true));
    }

    trackBySetID(index, item: Set) {
        return item ? item.setID : undefined;
    }

    loadMore(param) {
        this.store.dispatch(this.setActions.loadMoreSets(param.themes, param.subthemes, param.years, '', param.pageNumber.toString()));
    }
}