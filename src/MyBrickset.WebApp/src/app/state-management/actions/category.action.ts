import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class CategoryActions {
    static LOAD_CATEGORIES = '[Category] Load Categories';
    loadCategories(): Action {
        return {
            type: CategoryActions.LOAD_CATEGORIES,
        };
    }

    static LOAD_CATEGORIES_SUCCESS = '[Category] Load Categories Success';
    loadCategoriesSuccess(categories): Action {
        return {
            type: CategoryActions.LOAD_CATEGORIES_SUCCESS,
            payload: categories
        };
    }

    static SAVE_CATEGORY_IMAGES = '[Category] Save category images';
    saveCategoryImages(jsonCategoryImages): Action {
        return {
            type: CategoryActions.SAVE_CATEGORY_IMAGES,
            payload: jsonCategoryImages
        };
    }

    static SAVE_CATEGORY_IMAGES_SUCCESS = '[Category] Save category images Success';
    saveCategoryImagesSuccess(): Action {
        return {
            type: CategoryActions.SAVE_CATEGORY_IMAGES_SUCCESS,
        };
    }

}