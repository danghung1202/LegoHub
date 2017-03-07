import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import sortCriterias from '../data/sort-criterias';

class Url {
    static GetThemes = 'api/brickset/themes';
    static GetThemesInThisYear = 'api/brickset/theme-nav';
    static GetSubthemes = 'api/brickset/subthemes';
    static GetSets = 'api/brickset/sets';
    static GetSortCriterias = '../data/sort-criterias.json';
}

@Injectable()
export class AppService {
    constructor(private http: Http, private store: Store<AppState>, private errorActions: ErrorActions) { }
    
    getThemes(): Observable<Theme[]> {
        return this.http.get(Url.GetThemes)
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

    getSets(themes?: string, subthemes?: string, years?: string): Observable<Set[]> {
        return this.http.get(`${Url.GetSets}?themes=${themes}&subthemes=${subthemes}&years=${years}`)
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    getSortCriterias(): Observable<any> {
        // return this.http.get(Url.GetSortCriterias)
        //     .map(res => res.json())
        //     .catch(error => {
        //         return this.handleError(error);
        //     });
        return Observable.of(sortCriterias);
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            //const body = error.json() || '';
            //const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''}`; //${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.store.dispatch(this.errorActions.showError(errMsg));
        return Observable.throw(errMsg);
    }
}