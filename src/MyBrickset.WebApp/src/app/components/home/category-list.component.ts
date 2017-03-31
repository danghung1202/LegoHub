import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, NavigationState, SetListActions, CategoryActions, NavigationActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './category-list.component.html',
    styles: [`
        
    `]
})
export class CategoryListComponent implements OnInit {
    categories: Observable<any>;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private categoryActions: CategoryActions) {

        this.categories = this.store.select(s=>s.category).select(s=>s.categories);
    }

    ngOnInit() {
        this.store.dispatch(this.categoryActions.loadCategories());
    }

    trackByTheme(index, item) {
        return item ? item.theme : undefined
    }
}