import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Theme } from '../models';

class Url {
    static GetThemes = 'api/brickset/themes';
    static GetThemesInThisYear = 'api/brickset/theme-nav';
    static GetSubthemes = 'api/brickset/subthemes';
    static GetSets = 'api/brickset/sets';
}

@Injectable()
export class ThemeService {
    constructor(private http: Http) { }

    getThemes(): Observable<Theme[]> {
        return this.http.get(Url.GetThemes)
            .map(res => res.json());
    }

    getThemesInThisYear(): Observable<Theme[]> {
        return this.http.get(Url.GetThemesInThisYear)
            .map(res => res.json());
    }


}