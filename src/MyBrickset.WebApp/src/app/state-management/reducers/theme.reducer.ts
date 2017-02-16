import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Theme } from '../../models';

import { ThemeActions } from '../actions';
import { ThemeState } from '../states';

const initialState: ThemeState = {
    themes: [],
    loading: false
};

export default function reducer(state = initialState, action: Action): ThemeState {
    switch (action.type) {
        case ThemeActions.LOAD_THEMES: {
            return {
                themes: [],
                loading: true
            };
        }
        case ThemeActions.LOAD_THEMES_SUCCESS: {
            const themes = action.payload;

            return {
                themes: themes,
                loading: false
            }
        }

        default: {
            return state;
        }
    }
}

// export const geThemes = (state: ThemesState) => state.themes;

// export const getLoading = (state: ThemesState) => state.loading;