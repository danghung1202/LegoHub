import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { sortCriterias } from '../constant';
import { AppService } from './app.service';
import { AppConfig } from './app.config';
import { GAuth2 } from './gauth.service';

class Url {
    static Channels = 'https://www.googleapis.com/youtube/v3/channels';
    static Playlists = 'https://www.googleapis.com/youtube/v3/playlists';
    static PlaylistItems = 'https://www.googleapis.com/youtube/v3/playlistItems';
    static Search = 'https://www.googleapis.com/youtube/v3/search';
    static Videos = 'https://www.googleapis.com/youtube/v3/videos';
}

@Injectable()
export class YoutubeApiService extends AppService {
    constructor(private gauth: GAuth2, http: Http, config: AppConfig, store: Store<AppState>, errorActions: ErrorActions) {
        super(http, config, store, errorActions);
    }

    private _defaultUrlParams = {
        part: 'snippet,id',
        maxResults: '10'
    };

    private createHeaders(isAuth: boolean): Headers {
        let headers: Headers = new Headers();
        let accessToken = this.gauth.accessToken;
        if (accessToken && isAuth)
            headers.append('Authorization', `Bearer ${accessToken}`);
        return headers;
    }

    private createUrlSearchParams(options): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        Object.keys(options).forEach(param => params.set(param, options[param]));
        return params;
    }

    private createRequestOptionsArgs(options): RequestOptionsArgs {
        let params = Object.assign({}, this._defaultUrlParams, options, { key: this.config.youtubeConfig.apiKey });

        let requestOptions: RequestOptionsArgs = {
            search: this.createUrlSearchParams(params),
            headers: this.createHeaders(false)
        };

        return requestOptions;
    }

    channels_List(params: YoutubeChannelsRequestParameter): Observable<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeChannelResource>> {
        return this.http.get(`${Url.Channels}`, this.createRequestOptionsArgs(params))
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    search(params: YoutubeSearchRequestParameter): Observable<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>> {
        return this.http.get(`${Url.Search}`, this.createRequestOptionsArgs(params))
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    videos_List(params: YoutubeVideosListParameter): Observable<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeVideoResource>> {
        return this.http.get(`${Url.Videos}`, this.createRequestOptionsArgs(params))
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    playlists_List(params: YoutubePlaylistsListParameter): Observable<GoogleApiYouTubePaginationInfo<GoogleApiYouTubePlaylistResource>> {
        return this.http.get(`${Url.Playlists}`, this.createRequestOptionsArgs(params))
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    playlistItems_List(params: YoutubePlaylistItemsListParameter): Observable<GoogleApiYouTubePaginationInfo<GoogleApiYouTubePlaylistItemResource>> {
        return this.http.get(`${Url.PlaylistItems}`, this.createRequestOptionsArgs(params))
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

}