import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Theme, Set } from '../models';

class Url {
    static GetThemes = 'api/brickset/themes';
    static GetThemesInThisYear = 'api/brickset/theme-nav';
    static GetSubthemes = 'api/brickset/subthemes';
    static GetSets = 'api/brickset/sets';
}

@Injectable()
export class AppService {
    constructor(private http: Http) { }

    getThemes(): Observable<Theme[]> {
        return this.http.get(Url.GetThemes)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getThemesInThisYear(): Observable<Theme[]> {
        return this.http.get(Url.GetThemesInThisYear)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getSets(themes?: string, subthemes?: string, years?: string): Observable<Set[]> {
        return this.http.get(`${Url.GetSets}?themes=${themes}&subthemes=${subthemes}&years=${years}`)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}