import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { AppState, NavigationState } from './state-management';
import { StoreSelect } from './state-management';
import { ThemeActions } from './state-management';

@Component({
    //moduleId: module.id,
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')]
})

export class AppComponent implements OnInit {
    //navigationState: Observable<any>;
    themesNav: Observable<any>;
    yearsNav: Observable<any>;

    showSidenav: boolean;

    constructor(
        private store: Store<AppState>,
        private themeActions: ThemeActions
    ) {
        //this.themesNav = this.store.select(StoreSelect.NAVIGATION).select('themeNav');
        this.themesNav = this.store.select(s=>s.navigation).select(s=>s.themeNav);
        // this.store.select(StoreSelect.NAVIGATION).subscribe((data: NavigationState) => {
        //     if (data != undefined) {
        //         this.themesNav = Observable.of(data.themeNav);
        //         this.yearsNav = Observable.of(data.yearNav);
        //     }
        // });
    }

    ngOnInit() {
        this.store.dispatch(this.themeActions.loadThemesInThisYear());
    }

    openSidenav() {
        this.showSidenav = true;
    }
}