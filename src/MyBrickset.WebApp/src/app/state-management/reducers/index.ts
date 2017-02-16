//import {createSelector } from 'reselect';
import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
import {combineReducers} from '@ngrx/store';

import themeReducer from './theme.reducer';

//uncomment the storeLogger import and this line
//and comment out the other export default line to turn on
//the store logger to see the actions as they flow through the store
//turned this off by default as i found the logger kinda noisy

//export default compose(storeLogger(), combineReducers)({
export default compose(combineReducers)({
   themes: themeReducer
});

// const getThemesState = (state: AppState) => state.themes;
// export const getThemes = createSelector(getThemesState, fromThemes.geThemes);
// export const getLoading = createSelector(getThemesState, fromThemes.getLoading);