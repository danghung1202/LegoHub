import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { Store } from '@ngrx/store';

import { SettingActions } from '../actions';
import { StorageService, BricksetService } from '../../services';
import { CriteriaType } from '../../constant';
import { AppState } from '../reducers';

@Injectable()
export class SettingEffects {
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private settingActions: SettingActions,
        private svcStorage: StorageService,
        private svcBrickset: BricksetService,
    ) {

    }

    @Effect() loadCategories$ = this.action$
        .ofType(SettingActions.LOAD_CATEGORIES)
        .switchMap(() => {
            return this.svcBrickset.getThemesWithTeaserImage()
                .map(results => this.settingActions.loadCategoriesSuccess(results))
                .catch(() => of(this.settingActions.loadCategoriesSuccess([])));
        });

    @Effect() saveCategories$ = this.action$
        .ofType(SettingActions.SAVE_CATEGORY_IMAGES)
        .map(action => action.payload)
        .switchMap(payload => {
            return this.svcStorage.saveCategorySettings(payload)
                .map(results => this.settingActions.saveCategoryImagesSuccess())
                .catch(() => of(this.settingActions.saveCategoryImagesSuccess()));
        });

    @Effect() saveYoutubeSetting$ = this.action$
        .ofType(SettingActions.SAVE_YOUTUBE_SETTINGS)
        .map(action => action.payload)
        .switchMap(payload => {
            return this.svcStorage.saveYoutubeSettings(payload)
                .map(results => this.settingActions.saveYoutubeSettingsSuccess())
                .catch(() => of(this.settingActions.saveYoutubeSettingsSuccess()));
        });
}