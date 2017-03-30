import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CategoryActions } from '../actions';

export interface CategoryState 
{
    categories: any;
    loading: boolean;
    saving: boolean;
};

const initialState: CategoryState = {
    categories: [],
    loading: false,
    saving: false
};

export function reducer(state = initialState, action: Action): CategoryState {
    switch (action.type) {
        case CategoryActions.LOAD_CATEGORIES: {
            return Object.assign({}, state, {categories: [], loading: true});
        }

        case CategoryActions.LOAD_CATEGORIES_SUCCESS: {
            let categories = action.payload;
            return Object.assign({}, state, {categories: categories, loading: false});
        }

        case CategoryActions.SAVE_CATEGORY_IMAGES: {
            return Object.assign({}, state, {saving: true});
        }

        case CategoryActions.SAVE_CATEGORY_IMAGES_SUCCESS: {
            return Object.assign({}, state, {saving: false});
        }
        
        default: {
            return state;
        }
    }
}