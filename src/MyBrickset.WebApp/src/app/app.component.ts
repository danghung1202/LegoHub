import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, NavigationState } from './state-management';
import { FilterActions, SetListActions, NavigationActions } from './state-management';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')]
})

export class AppComponent implements OnInit {
    themes: Observable<any>;
    years: Observable<any>;
    sortCriterias: Observable<any>;
    openedSortSidenav: Observable<boolean>;

    constructor(private store: Store<AppState>, private navActions: NavigationActions, private setsActions: SetListActions) {
        this.themes = this.store.select(s => s.navigation).select(s => s.themeNav);
        this.years = this.store.select(s => s.navigation).select(s => s.yearNav);
        this.sortCriterias = this.store.select(s=>s.sets).select(s=>s.sortCriterias);
        this.openedSortSidenav = this.store.select(s=>s.navigation).select(s=>s.openedSortSidenav);
    }

    ngOnInit() {
        this.store.dispatch(this.setsActions.loadSortCriterias());
        this.store.dispatch(this.navActions.loadThemesInThisYear());
    }

    closeSortSidenav(){
        this.store.dispatch(this.navActions.toggleSortSidenav(false));
    }

    sortByChange(selectedSortValue) {
        console.log(selectedSortValue);
    }
}