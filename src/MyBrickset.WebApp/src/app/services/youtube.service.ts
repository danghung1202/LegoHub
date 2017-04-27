import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
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
    static SuggestionSearch = 'http://suggestqueries.google.com/complete/search';
}

class YoutubeResourceType {
    static Channel = 'channel';
    static Playlist = 'playlist';
    static Video = 'video';
}

@Injectable()
export class YoutubeService extends AppService {
    constructor(private youtubeApi: YoutubeApiService, private jsonp: Jsonp, http: Http, config: AppConfig, store: Store<AppState>, errorActions: ErrorActions) {
        super(http, config, store, errorActions);
    }

    suggestVideos(query: string): Observable<string[]> {
        if (query && query != '') {
            let searchConfig: URLSearchParams = new URLSearchParams();
            let searchParams = {
                hl: 'en',
                ds: 'yt',
                xhr: 't',
                client: 'youtube',
                q: query,
                callback: 'JSONP_CALLBACK'
            };
            Object.keys(searchParams).forEach(param => searchConfig.set(param, searchParams[param]));
            let options: RequestOptionsArgs = {
                search: searchConfig
            };
            return this.jsonp.get(Url.SuggestionSearch, options)
                .map(response => response.json()[1])
                .map(results => results.map(result => result[0]))
                .catch(error => {
                    return this.handleError(error);
                });;
        }

        return Observable.of([]);
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
            id: channelIds,
            part: 'id,snippet,contentDetails'
        }
        let result = this.youtubeApi.channels_List(channelParams);
        return result.map(youtubeInfo => youtubeInfo.items.map(item => {
            let channels: YoutubeChannelResponse = {
                id: item.id,
                uploadsId: item.contentDetails.relatedPlaylists.uploads,
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

    getVideosByPlaylistId(playlistId: string): Observable<YoutubeVideoResponse[]> {
        let channelParams: YoutubePlaylistItemsListParameter = {
            playlistId: playlistId,
        }
        let result = this.youtubeApi.playlistItems_List(channelParams);

        return result.map(youtubeInfo => youtubeInfo.items.map(item => {
            let channels: YoutubeVideoResponse = {
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails["medium"].url,
            }
            return channels;
        }));
    }

}