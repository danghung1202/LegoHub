import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class SettingActions {
    static LOAD_CATEGORIES = '[Category] Load Categories';
    loadCategories(): Action {
        return {
            type: SettingActions.LOAD_CATEGORIES,
        };
    }

    static LOAD_CATEGORIES_SUCCESS = '[Category] Load Categories Success';
    loadCategoriesSuccess(categories): Action {
        return {
            type: SettingActions.LOAD_CATEGORIES_SUCCESS,
            payload: categories
        };
    }

    static SAVE_CATEGORY_IMAGES = '[Category] Save category images';
    saveCategoryImages(jsonCategoryImages): Action {
        return {
            type: SettingActions.SAVE_CATEGORY_IMAGES,
            payload: jsonCategoryImages
        };
    }

    static SAVE_CATEGORY_IMAGES_SUCCESS = '[Category] Save category images Success';
    saveCategoryImagesSuccess(): Action {
        return {
            type: SettingActions.SAVE_CATEGORY_IMAGES_SUCCESS,
        };
    }

    static SAVE_YOUTUBE_SETTINGS = '[Youtube] Save Youtube Settings';
    saveYoutubeSettings(jsonYoutubeSetting): Action {
        return {
            type: SettingActions.SAVE_YOUTUBE_SETTINGS,
            payload: jsonYoutubeSetting
        };
    }

    static SAVE_YOUTUBE_SETTINGS_SUCCESS = '[Youtube] Save Youtube Settings Success';
    saveYoutubeSettingsSuccess(): Action {
        return {
            type: SettingActions.SAVE_YOUTUBE_SETTINGS_SUCCESS,
        };
    }

    static LOAD_ALL_SETTINGS_SUCCESS = '[Setting] Load all settings success';
    loadAllSettingsSuccess(appConfig): Action {
        return {
            type: SettingActions.LOAD_ALL_SETTINGS_SUCCESS,
            payload: appConfig
        };
    }



}