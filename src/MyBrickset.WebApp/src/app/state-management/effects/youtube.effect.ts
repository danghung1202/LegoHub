import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { Store } from '@ngrx/store';

import { YoutubeActions } from '../actions';
import { YoutubeService } from '../../services';
import { CriteriaType } from '../../constant';
import { AppState } from '../reducers';

@Injectable()
export class YoutubeEffects {
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private youtubeActions: YoutubeActions,
        private svc: YoutubeService
    ) {}

    @Effect() getFeatureVideos$ = this.action$
        .ofType(YoutubeActions.GET_FEATURED_VIDEOS)
        .switchMap(() => {
            return this.svc.getFeaturedChannelsAndVideos()
                .map((results:YoutubeResponseWrapper) => this.youtubeActions.getFeaturedVideosSuccess(results))
                .catch(() => of(this.youtubeActions.getFeaturedVideosSuccess(<YoutubeResponseWrapper>{channels:[], videos: []})));
        });

    
}