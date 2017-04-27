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
    static GetThemes = 'api/brickset/themes';
    static GetThemesInThisYear = 'api/brickset/theme-nav';
    static GetSubthemesWithYears = 'api/brickset/subthemes';
    static GetSets = 'api/brickset/sets';
    static GetSetDetails = 'api/brickset/set';
    static GetThemesWithImage = 'api/storage/load-categories';
}

@Injectable()
export class BricksetService extends AppService {
    private _themes: any = null;
    private _themesThisYear: any = null;

    constructor(http: Http, config: AppConfig, store: Store<AppState>, errorActions: ErrorActions) {
        super(http, config, store, errorActions);
    }

    //using cache in Observable
    getThemes(): Observable<Theme[]> {
        if (!this._themes) {
            this._themes = this.http.get(Url.GetThemes)
                .map(res => res.json())
                .publishReplay(1)
                .refCount()
                .catch(error => {
                    return this.handleError(error);
                });
        }
        return this._themes;
    }

    getSubthemesWithYears(themes): Observable<any> {
        return this.http.get(`${Url.GetSubthemesWithYears}?themes=${themes}`)
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    getThemesInThisYear(): Observable<Theme[]> {
        if (!this._themesThisYear) {
            this._themesThisYear = this.http.get(Url.GetThemesInThisYear)
                .map(res => res.json())
                .publishReplay(1)
                .refCount()
                .catch(error => {
                    return this.handleError(error);
                });
        }
        return this._themesThisYear;
    }

    getThemesWithTeaserImage(): Observable<any> {
        return Observable.forkJoin([
            this.getThemesInThisYear(),
            this.http.get(Url.GetThemesWithImage).map(res => res.json())])
            .map(results => {
                let themes = results[0];
                let images = results[1];

                return themes.map(theme => ({ theme: theme.theme, image: images[theme.theme] }))
            })
            .catch(error => {
                return this.handleError(error);
            });
    }

    suggestSets(query: string): Observable<string[]> {
        if (query && query != '') {
            return this.getSets(null, null, null, query, null, null, '10').map(sets=>sets.map(set=>set.name));
        }
        return Observable.of([]);
    }

    getSets(themes?: string, subthemes?: string, years?: string, query?: string, page?: string, order?: string, size?: string): Observable<Set[]> {
        let params: URLSearchParams = new URLSearchParams();
        if (themes) params.set('themes', themes);
        if (subthemes) params.set('subthemes', subthemes);
        if (years) params.set('years', years);
        if (query) params.set('q', query);
        if (page) params.set('page', page);
        if (order) params.set('order', order);
        if (size) params.set('size', size);

        return this.http.get(Url.GetSets, { search: params })
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    getSetDetails(setId: string): Observable<any> {
        return this.http.get(`${Url.GetSetDetails}?setId=${setId}`)
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    getSortCriterias(): Observable<any> {
        return Observable.of(sortCriterias);
    }
}