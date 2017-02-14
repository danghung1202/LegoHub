import {createSelector } from 'reselect';
import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
//import {storeLogger} from 'ngrx-store-logger';
import {combineReducers} from '@ngrx/store';

import * as fromThemes from './themes';

export type ThemesState = fromThemes.ThemesState;

export interface AppState {
    themes: fromThemes.ThemesState;
};

//uncomment the storeLogger import and this line
//and comment out the other export default line to turn on
//the store logger to see the actions as they flow through the store
//turned this off by default as i found the logger kinda noisy

//export default compose(storeLogger(), combineReducers)({
export default compose(combineReducers)({
   themes: fromThemes.reducer
});

const getThemesState = (state: AppState) => state.themes;
export const getThemes = createSelector(getThemesState, fromThemes.geThemes);
export const getLoading = createSelector(getThemesState, fromThemes.getLoading);