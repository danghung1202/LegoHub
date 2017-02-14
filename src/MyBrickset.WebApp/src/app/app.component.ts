import { Component,OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from './reducers';
import {ThemeActions} from './actions';

@Component({
    //moduleId: module.id,
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')]
    //templateUrl: './app.component.html',
    //styleUrls: ['./app.component.css']
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