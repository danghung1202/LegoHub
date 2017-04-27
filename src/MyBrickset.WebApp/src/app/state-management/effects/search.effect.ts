import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { SearchActions } from '../actions';
import { YoutubeService, BricksetService, RebrickableService } from '../../services';
import { AppState } from '../reducers';
import { Set } from '../../models';

@Injectable()
export class SearchEffects {
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private searchActions: SearchActions,
        private youtube: YoutubeService,
        private brickset: BricksetService,
        private rebrickable: RebrickableService
    ) { }

    @Effect() getFeatureVideos$ = this.action$
        .ofType(SearchActions.GET_SUGGESTION_QUERY)
        .map(action => action.payload)
        .switchMap(query => {
            return forkJoin([
                this.youtube.suggestVideos(query),
                this.brickset.suggestSets(query)])
                .map(results => ({
                    videos: results[0],
                    sets: results[1]
                }))
                .map(results => this.searchActions.getSuggestionQuerySuccess(results.videos.concat(results.sets)))
                .catch(() => of(this.searchActions.getSuggestionQuerySuccess([])));
        });


}