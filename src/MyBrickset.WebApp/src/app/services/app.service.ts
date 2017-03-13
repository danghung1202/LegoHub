import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { sortCriterias } from '../data';

class Url {
    static GetThemes = 'api/brickset/themes';
    static GetThemesInThisYear = 'api/brickset/theme-nav';
    static GetSubthemesWithYears = 'api/brickset/subthemes';
    static GetSets = 'api/brickset/sets';
}

@Injectable()
export class AppService {
    _themes: any = null;
    constructor(private http: Http, private store: Store<AppState>, private errorActions: ErrorActions) { }

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
        return this.http.get(Url.GetThemesInThisYear)
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    getSets(themes?: string, subthemes?: string, years?: string, query?: string, page?: string, order?: string, show?: string): Observable<Set[]> {
        let params: URLSearchParams = new URLSearchParams();
        if (themes && themes != ' ') params.set('themes', themes);
        if (subthemes && subthemes != ' ') params.set('subthemes', subthemes);
        if (years && years != ' ') params.set('years', years);
        if (query && query != ' ') params.set('q', query);
        if (page && page != ' ') params.set('page', page);
        if (order && order != ' ') params.set('order', order);
        if (show && show != ' ') params.set('show', show);

        return this.http.get(Url.GetSets, { search: params })
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    getSortCriterias(): Observable<any> {
        return Observable.of(sortCriterias);
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status == 0) {
                errMsg = "The server is offline";
            } else {
                errMsg = `${error.status}${error.statusText ? ' - ' + error.statusText : ''}`;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.store.dispatch(this.errorActions.showError(errMsg));
        return Observable.throw(errMsg);
    }
}