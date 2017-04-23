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

import { REBRICKABLE_API_KEY } from './constants';

class Url {
    static Channels = 'https://www.googleapis.com/youtube/v3/channels';
    static Playlists = 'https://www.googleapis.com/youtube/v3/playlists';
    static Search = 'https://www.googleapis.com/youtube/v3/search';
    static Videos = 'https://www.googleapis.com/youtube/v3/videos';
}

@Injectable()
export class YoutubeService extends AppService {
    constructor(http: Http, config: AppConfig, private gauth: GAuth2, store: Store<AppState>, errorActions: ErrorActions) {
        super(http, config, store, errorActions);
    }

    private createHeaders(): Headers {
        let headers: Headers = new Headers();
        let accessToken = this.gauth.accessToken;
        if (accessToken)
            headers.append('Authorization', `Bearer ${accessToken}`);
        return headers;
    }

    getChannels(channelIds: string): Observable<any> {

        return this.http.get(`${Url.Channels}`, { headers: this.createHeaders() })
            .map(res => {
                var results = res.json().results;
                return results.map(item => ({
                    partId: item.element_id,
                    partNumber: item.part.part_num,
                    name: item.part.name,
                    image: item.part.part_img_url,
                    quantity: item.quantity,
                    numSets: item.num_sets,
                }))
            })
            .catch(error => {
                return this.handleError(error);
            });
    }

    getVideos(): Observable<any> {
        return this.http.get(`${Url.Videos}`, { headers: this.createHeaders() })
            .map(res => {
                var results = res.json().results;
                return results.map(item => ({
                    designerName: item.designer_name,
                    setNum: item.set_num,
                    name: item.name,
                    image: item.moc_img_url,
                    numParts: item.num_parts,
                    year: item.year,
                }))
            })
            .catch(error => {
                return this.handleError(error);
            });
    }
}