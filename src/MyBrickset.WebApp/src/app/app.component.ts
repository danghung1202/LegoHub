import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, NavigationState } from './state-management';
import { FilterActions } from './state-management';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')]
})

export class AppComponent implements OnInit {
    themes: Observable<any>;
    years: Observable<any>;

    constructor(private store: Store<AppState>, private filterActions: FilterActions) {
        this.themes = this.store.select(s => s.navigation).select(s => s.themeNav);
        this.years = this.store.select(s => s.navigation).select(s => s.yearNav);
    }

    ngOnInit() {
        this.store.dispatch(this.filterActions.loadThemesInThisYear());
    }
}