import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Theme} from '../models';

@Injectable()
export class ThemeService {
    constructor (private http: Http) {}

    private url:string = 'api/brickset/';

    getThemes(): Observable<Theme[]> {
        return this.http.get(this.url + 'getthemes')
        .map(res => res.json());
    }
}