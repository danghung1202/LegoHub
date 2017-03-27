import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SetActions } from '../actions';
import { Set, SetImage, Review, Instruction } from '../../models';

export interface SetDetailState {
    set: Set,
    additionalImages: SetImage[],
    intructions: Instruction[],
    reviews: Review[],
    parts: any;
    alternateBuilds: any;
    loading: any
};

const initialState: SetDetailState = {
    set: null,
    additionalImages: [],
    intructions: [],
    reviews: [],
    parts: [],
    alternateBuilds: [],
    loading: {
        set: false,
        instruction: false,
        review: false,
        part: false,
        alternateBuild: false
    }
};

export function reducer(state = initialState, action: Action): SetDetailState {
    switch (action.type) {
        case SetActions.GET_SET: {

            return Object.assign({}, state, {
                set: null,
                additionalImages: [],
                intructions: [],
                reviews: [],
                parts: [],
                alternateBuilds: [],
                loading: {
                    set: true,
                    instruction: false,
                    review: false,
                    part: false,
                    alternateBuild: false
                }
            });
        }

        case SetActions.GET_SET_SUCCESS: {
            let result = action.payload;
            state.loading.set = false;
            return Object.assign({}, state, { set: result.set, additionalImages: result.additionalImages, intructions: result.intructions });
        }

        case SetActions.GET_REVIEWS: {
            state.loading.review = true;
            return Object.assign({}, state);
        }

        case SetActions.GET_REVIEWS_SUCCESS: {
            let reviews = action.payload;
            var loading = Object.assign({}, state.loading, { review: false });
            return Object.assign({}, state, { reviews: reviews, loading: loading });
        }

        case SetActions.GET_INSTRUCTIONS: {
            var loading = Object.assign({}, state.loading, { instruction: true });
            return Object.assign({}, state, { loading: loading });
        }

        case SetActions.GET_INSTRUCTIONS_SUCCESS: {
            let instructions = action.payload;
            state.loading.instruction = false;
            return Object.assign({}, state, { instructions: instructions });
        }

        case SetActions.GET_PARTS: {
            var loading = Object.assign({}, state.loading, { part: true });
            return Object.assign({}, state, { loading: loading });
        }

        case SetActions.GET_PARTS_SUCCESS: {
            let parts = action.payload;
            var loading = Object.assign({}, state.loading, { part: false });
            return Object.assign({}, state, { parts: parts, loading: loading });
        }

        case SetActions.GET_ALTERNATE_BUILDS: {
            var loading = Object.assign({}, state.loading, { alternateBuild: true });
            return Object.assign({}, state, { loading: loading });
        }

        case SetActions.GET_ALTERNATE_BUILDS_SUCCESS: {
            let alternateBuilds = action.payload;
            var loading = Object.assign({}, state.loading, { alternateBuild: false });
            return Object.assign({}, state, { alternateBuilds: alternateBuilds, loading: loading });
        }

        default: {
            return state;
        }
    }
}