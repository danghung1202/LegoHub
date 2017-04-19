//import {createSelector } from 'reselect';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store';

import * as fromNavigation from './navigation.reducer';
import * as fromFilter from './filter.reducer';
import * as fromSetList from './set-list.reducer';
import * as fromSetDetail from './set.reducer';
import * as fromError from './error.reducer';
import * as fromSetting from './setting.reducer';

export type NavigationState = fromNavigation.NavigationState;
export type FilterState = fromFilter.FilterState;
export type SetListState = fromSetList.SetListState;


export interface AppState {
    navigation: fromNavigation.NavigationState;
    filter: fromFilter.FilterState;
    sets: fromSetList.SetListState;
    set: fromSetDetail.SetDetailState;
    error: fromError.ErrorState;
    setting: fromSetting.SettingState;
};

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
    navigation: fromNavigation.reducer,
    filter: fromFilter.reducer,
    sets: fromSetList.reducer,
    set: fromSetDetail.reducer,
    error: fromError.reducer,
    setting: fromSetting.reducer
};

const developmentReducer: ActionReducer<AppState> = compose(combineReducers)(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}

export default compose(combineReducers)(reducers);
