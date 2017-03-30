import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, NavigationState, SetListActions, CategoryActions, NavigationActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./setting.component.html'),
    styles: [`
        
    `]
})
export class SettingComponent implements OnInit {
    categories: Observable<any>;
    subCat: Subscription;
    form: FormGroup;
    payLoad = '';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private categoryActions: CategoryActions) {

        this.categories = this.store.select(s => s.category).select(s => s.categories);
        this.subCat = this.categories.subscribe(categories => {
            let group: any = {};
            categories.forEach(cat => {
                group[cat.theme] = new FormControl(cat.image || '');
            });

            this.form = new FormGroup(group);
        })
    }

    ngOnInit() {
        this.store.dispatch(this.categoryActions.loadCategories());
    }

    ngOnDestroy() {
        this.subCat.unsubscribe();
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
        console.log(this.payLoad);
        this.store.dispatch(this.categoryActions.saveCategoryImages(this.payLoad));
    }
}