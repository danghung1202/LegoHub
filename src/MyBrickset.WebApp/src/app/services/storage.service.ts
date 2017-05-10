import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { sortCriterias } from '../constant';
import { AppService } from './app.service';
import { AppConfig } from './app.config';

class Url {
    static SaveCategorySettings = 'api/storage/save-categories';
    static GetThemesWithImage = 'api/storage/load-categories';
    static SaveYoutubeSettings = 'api/storage/save-youtube-settings';
    static SavePinterestSettings = 'api/storage/save-pinterest-settings';
}

@Injectable()
export class StorageService extends AppService {

    constructor(http: Http, config: AppConfig, store: Store<AppState>, errorActions: ErrorActions) {
        super(http, config, store, errorActions);
    }

    private createHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    saveCategorySettings(categorySettings): Observable<any> {
        
        let body = JSON.stringify({ "jsonContent": categorySettings });
        return this.http.post(Url.SaveCategorySettings, body, {
            headers: this.createHeaders()
        })
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    saveYoutubeSettings(youtubeSettings): Observable<any> {
       
        let body = JSON.stringify({ "jsonContent": youtubeSettings });
        return this.http.post(Url.SaveYoutubeSettings, body, {
           headers: this.createHeaders()
        })
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    savePinterestSettings(pinterestSettings): Observable<any> {

        let body = JSON.stringify({ "jsonContent": pinterestSettings });
        return this.http.post(Url.SavePinterestSettings, body, {
            headers: this.createHeaders()
        })
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }
}