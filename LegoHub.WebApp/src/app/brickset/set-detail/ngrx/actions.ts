import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Set } from '../../models';

@Injectable()
export class SetActions {
    static GET_SET = '[Set] Get Set';
    getSet(id: string): Action {
        return {
            type: SetActions.GET_SET,
            payload: id
        };
    }

    static GET_SET_SUCCESS = '[Set] Get Set Success';
    getSetSuccess(set: Set): Action {
        return {
            type: SetActions.GET_SET_SUCCESS,
            payload: set
        };
    }

    static GET_PARTS = '[Set] Get Parts Of Set';
    getParts(setId: string): Action {
        return {
            type: SetActions.GET_PARTS,
            payload: setId
        };
    }

    static GET_PARTS_SUCCESS = '[Set] Get Parts Of Set Success';
    getPartsSuccess(parts: any): Action {
        return {
            type: SetActions.GET_PARTS_SUCCESS,
            payload: parts
        };
    }

    static GET_INSTRUCTIONS = '[Set] Get Instructions Of Set';
    getInstructions(setId: string): Action {
        return {
            type: SetActions.GET_INSTRUCTIONS,
            payload: setId
        };
    }

    static GET_INSTRUCTIONS_SUCCESS = '[Set] Get Instructions Of Set Success';
    getInstructionsSuccess(setId: string): Action {
        return {
            type: SetActions.GET_INSTRUCTIONS_SUCCESS,
            payload: setId
        };
    }

    static GET_REVIEWS = '[Set] Get Reviews Of Set';
    getReviews(setId: string): Action {
        return {
            type: SetActions.GET_REVIEWS,
            payload: setId
        };
    }

    static GET_REVIEWS_SUCCESS = '[Set] Get Reviews Of Set Success';
    getReviewsSuccess(setId: string): Action {
        return {
            type: SetActions.GET_REVIEWS_SUCCESS,
            payload: setId
        };
    }

    static GET_ALTERNATE_BUILDS = '[Set] Get Alternate Builds Of Set';
    getAlternateBuilds(setId: string): Action {
        return {
            type: SetActions.GET_ALTERNATE_BUILDS,
            payload: setId
        };
    }

    static GET_ALTERNATE_BUILDS_SUCCESS = '[Set] Get Alternate Builds Of Set Success';
    getAlternateBuildsSuccess(setId: string): Action {
        return {
            type: SetActions.GET_ALTERNATE_BUILDS_SUCCESS,
            payload: setId
        };
    }
}