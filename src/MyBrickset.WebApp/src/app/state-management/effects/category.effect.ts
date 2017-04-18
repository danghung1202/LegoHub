import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { Store } from '@ngrx/store';

import { CategoryActions } from '../actions';
import { BricksetService } from '../../services';
import { CriteriaType } from '../../constant';
import { AppState } from '../reducers';

@Injectable()
export class CategoryEffects {
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private categoryActions: CategoryActions,
        private svc: BricksetService,
    ) {

    }

    @Effect() loadCategories$ = this.action$
        .ofType(CategoryActions.LOAD_CATEGORIES)
        .switchMap(() => {
            return this.svc.getThemesWithTeaserImage()
                .map(results => this.categoryActions.loadCategoriesSuccess(results))
                .catch(() => of(this.categoryActions.loadCategoriesSuccess([])));
        });

    @Effect() saveCategories$ = this.action$
        .ofType(CategoryActions.SAVE_CATEGORY_IMAGES)
        .map(action => action.payload)
        .switchMap(payload => {
            return this.svc.updateThemesWithTeaserImage(payload)
                .map(results => this.categoryActions.saveCategoryImagesSuccess())
                .catch(() => of(this.categoryActions.saveCategoryImagesSuccess()));
        });
}