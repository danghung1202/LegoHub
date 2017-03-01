//import {createSelector } from 'reselect';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store';

import * as fromNavigation from './navigation.reducer';
import * as fromFilter from './filter.reducer';

export type NavigationState = fromNavigation.NavigationState;
export type FilterState = fromFilter.FilterState;

export interface AppState {
    navigation: fromNavigation.NavigationState;
    filter: fromFilter.FilterState;
};

export class StoreSelect {
    static NAVIGATION = 'navigation';
    static FILTER = 'filter';
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
    navigation: fromNavigation.reducer,
    filter: fromFilter.reducer
};

const developmentReducer: ActionReducer<AppState> = compose(combineReducers)(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}

export default compose(combineReducers)(reducers);
