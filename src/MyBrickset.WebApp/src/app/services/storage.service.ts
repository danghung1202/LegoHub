import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { sortCriterias } from '../constant';
import { AppService } from './app.service';

class Url {
    static SaveCategorySettings = 'api/storage/save-categories';
    static GetThemesWithImage = 'api/storage/load-categories';
    static SaveYoutubeSettings = 'api/storage/save-youtube-settings';
}

@Injectable()
export class StorageService extends AppService {

    constructor(http: Http, store: Store<AppState>, errorActions: ErrorActions) {
        super(http, store, errorActions);
    }


    saveCategorySettings(categorySettings): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const params = new URLSearchParams();
        params.set('jsonContent', categorySettings);
        return this.http.post(Url.SaveCategorySettings, null, {
            //headers: headers,
            search: params
        })
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    saveYoutubeSettings(youtubeSettings): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const params = new URLSearchParams();
        params.set('jsonContent', youtubeSettings);
        return this.http.post(Url.SaveYoutubeSettings, null, {
            //headers: headers,
            search: params
        })
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }
}