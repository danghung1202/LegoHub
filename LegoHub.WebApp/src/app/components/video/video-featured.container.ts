import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { AppState, YoutubeActions } from '../../state-management';
import { CriteriaType } from '../../constant';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
       <video-featured
            [videos]='videos | async'
            [channels]='channels | async'
            [loading]='loading | async'>
       </video-featured>
    `
})
export class VideoFeaturedContainer { 
    videos: Observable<YoutubeVideoResponse[]>;
    channels: Observable<YoutubeChannelResponse[]>;
    loading: Observable<boolean>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private youtubeActions: YoutubeActions) {
        this.videos = this.store.select(s => s.youtube.videos);
        this.channels = this.store.select(s=>s.youtube.channels);
        this.loading = this.store.select(s=>s.youtube.loading);
    }

    ngOnInit() {
        this.store.dispatch(this.youtubeActions.getFeaturedVideos());
    }
}
