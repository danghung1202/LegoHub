import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { AppState, YoutubeActions } from '../../state-management';
import { CriteriaType } from '../../constant';

@Component({
    selector: 'video-featured',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './video-featured.component.html',
    styles: [`
        md-spinner {
            display:none;
            height:30px;
            width:30px;
            margin: auto;
        }

        md-spinner.show {
            display: block;
        }
        
    `]
})
export class VideoFeaturedComponent { 
    @Input() videos: YoutubeVideoResponse[];
    @Input() channels: YoutubeChannelResponse[];
    @Input() loading: boolean;

}
