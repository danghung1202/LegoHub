import { Component,OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from './state-management/states';
import {ThemeActions} from './state-management/actions';

@Component({
    //moduleId: module.id,
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')]
})
 
export class AppComponent implements OnInit { 

    constructor(
        private store: Store<AppState>,
        private themeActions: ThemeActions
    ) {}

    ngOnInit() {
        this.store.dispatch(this.themeActions.loadThemes());
    }
}