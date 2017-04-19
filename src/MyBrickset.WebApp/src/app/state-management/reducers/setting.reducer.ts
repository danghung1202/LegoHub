import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SettingActions } from '../actions';

export interface SettingState 
{
    categories: any;
    youtubeSettings: any;
    loading: boolean;
    saving: boolean;
};

const initialState: SettingState = {
    categories: [],
    youtubeSettings: null,
    loading: false,
    saving: false
};

export function reducer(state = initialState, action: Action): SettingState {
    switch (action.type) {
        case SettingActions.LOAD_CATEGORIES: {
            return Object.assign({}, state, {categories: [], loading: true});
        }

        case SettingActions.LOAD_CATEGORIES_SUCCESS: {
            let categories = action.payload;
            return Object.assign({}, state, {categories: categories, loading: false});
        }

        case SettingActions.SAVE_CATEGORY_IMAGES: {
            return Object.assign({}, state, {saving: true});
        }

        case SettingActions.SAVE_CATEGORY_IMAGES_SUCCESS: {
            return Object.assign({}, state, {saving: false});
        }

        case SettingActions.SAVE_YOUTUBE_SETTINGS: {
            return Object.assign({}, state, {saving: true});
        }

        case SettingActions.SAVE_YOUTUBE_SETTINGS_SUCCESS: {
            return Object.assign({}, state, {saving: false});
        }
        
        default: {
            return state;
        }
    }
}