import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class YoutubeActions {
    static LOAD_CATEGORIES = '[Category] Load Categories';
    loadCategories(): Action {
        return {
            type: YoutubeActions.LOAD_CATEGORIES,
        };
    }

    static LOAD_CATEGORIES_SUCCESS = '[Category] Load Categories Success';
    loadCategoriesSuccess(categories): Action {
        return {
            type: YoutubeActions.LOAD_CATEGORIES_SUCCESS,
            payload: categories
        };
    }

    

}