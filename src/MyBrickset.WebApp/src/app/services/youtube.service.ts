import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { sortCriterias } from '../constant';
import { AppService } from './app.service';
import { AppConfig } from './app.config';
import { YoutubeApiService } from './youtube-api.service';
import { GAuth2 } from './gauth.service';

class Url {
    static Channels = 'https://www.googleapis.com/youtube/v3/channels';
    static Playlists = 'https://www.googleapis.com/youtube/v3/playlists';
    static Search = 'https://www.googleapis.com/youtube/v3/search';
    static Videos = 'https://www.googleapis.com/youtube/v3/videos';
}

class YoutubeResourceType {
    static Channel = 'channel';
    static Playlist = 'playlist';
    static Video = 'video';
}

@Injectable()
export class YoutubeService extends AppService {
    constructor(private youtubeApi: YoutubeApiService, http: Http, config: AppConfig, store: Store<AppState>, errorActions: ErrorActions) {
        super(http, config, store, errorActions);
    }

    getFeaturedChannelsAndVideos(): Observable<YoutubeResponseWrapper> {
        return Observable.forkJoin([
            this.getChannelsByIds(this.config.youtubeConfig.channels.map(c => c.id).join(',')),
            this.getVideosByQuery(this.config.youtubeConfig.keyword)])
            .map(results => <YoutubeResponseWrapper>{
                channels: results[0],
                videos: results[1]
            })
    }

    getChannelsByIds(channelIds: string): Observable<YoutubeChannelResponse[]> {
        let channelParams: YoutubeChannelsRequestParameter = {
            id: channelIds
        }
        let result = this.youtubeApi.channels_List(channelParams);
        return result.map(youtubeInfo => youtubeInfo.items.map(item => {
            let channels: YoutubeChannelResponse = {
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails["medium"].url,
            }
            return channels;
        }));
    }

    getChannelsByQuery(query: string): Observable<YoutubeChannelResponse[]> {
        let channelParams: YoutubeSearchRequestParameter = {
            q: query,
            type: YoutubeResourceType.Channel
        }
        let result = this.youtubeApi.search(channelParams);

        return result.map(youtubeInfo => youtubeInfo.items.map(item => {
            let channels: YoutubeChannelResponse = {
                id: item.id.channelId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails["medium"].url,
            }
            return channels;
        }));
    }

    getVideosByQuery(query: string): Observable<YoutubeVideoResponse[]> {
        let channelParams: YoutubeSearchRequestParameter = {
            q: query,
            type: YoutubeResourceType.Video
        }
        let result = this.youtubeApi.search(channelParams);

        return result.map(youtubeInfo => youtubeInfo.items.map(item => {
            let channels: YoutubeVideoResponse = {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails["medium"].url,
            }
            return channels;
        }));
    }

    getVideosByChannelId(channelId: string): Observable<YoutubeVideoResponse[]> {
        let channelParams: YoutubeSearchRequestParameter = {
            channelId: channelId,
            type: YoutubeResourceType.Video
        }
        let result = this.youtubeApi.search(channelParams);

        return result.map(youtubeInfo => youtubeInfo.items.map(item => {
            let channels: YoutubeVideoResponse = {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails["medium"].url,
            }
            return channels;
        }));
    }

}