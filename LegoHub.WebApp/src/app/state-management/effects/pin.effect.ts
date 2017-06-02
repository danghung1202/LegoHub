import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { Store } from '@ngrx/store';

import { PinActions, ProgressBarActions } from '../actions';
import { PinterestService } from '../../services';
import { CriteriaType } from '../../constant';
import { AppState } from '../reducers';

@Injectable()
export class PinEffects {
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private pinActions: PinActions,
        private progressActions: ProgressBarActions,
        private svc: PinterestService
    ) { }

    @Effect() getPinList$ = this.action$
        .ofType(PinActions.GET_PINS)
        .map(action => action.payload)
        .switchMap(pageNumber => {
            return this.svc.getPins(pageNumber)
                .map((results: Pin[]) => {

                    this.store.dispatch(this.progressActions.showProgressBar(results.length));
                    if(pageNumber) {
                        return this.pinActions.getMorePinListSuccess(results);
                    }
                    return this.pinActions.getPinListSuccess(results)
                })
                .catch(() => of(this.pinActions.getPinListSuccess([])));
        });

}