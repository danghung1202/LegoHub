import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { sortCriterias } from '../constant';

class Url {
    static GetThemes = 'api/brickset/themes';
    static GetThemesInThisYear = 'api/brickset/theme-nav';
    static GetSubthemesWithYears = 'api/brickset/subthemes';
    static GetSets = 'api/brickset/sets';
    static GetSetDetails = 'api/brickset/set';
    static SaveThemesWithImage = 'api/storage/save-categories';
    static GetThemesWithImage = 'api/storage/load-categories';
}

@Injectable()
export class AppService {
    _themes: any = null;
    _themesThisYear: any = null;
    constructor(private http: Http, private store: Store<AppState>, private errorActions: ErrorActions) { }

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

    updateThemesWithTeaserImage(themesWithImages): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const params = new URLSearchParams();
        params.set('jsonContent', themesWithImages);
        return this.http.post(Url.SaveThemesWithImage, null, {
            //headers: headers,
            search: params
        })
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    getSets(themes?: string, subthemes?: string, years?: string, query?: string, page?: string, order?: string, show?: string): Observable<Set[]> {
        let params: URLSearchParams = new URLSearchParams();
        if (themes) params.set('themes', themes);
        if (subthemes) params.set('subthemes', subthemes);
        if (years) params.set('years', years);
        if (query) params.set('q', query);
        if (page) params.set('page', page);
        if (order) params.set('order', order);
        if (show) params.set('show', show);

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

    getPartsOfSet(setNumber: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'key dgMeiknO47' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`https://rebrickable.com/api/v3/lego/sets/${setNumber}-1/parts/?key=dgMeiknO47`)
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

    getAlternateBuildsOfSet(setNumber: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'key dgMeiknO47' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`https://rebrickable.com/api/v3/lego/sets/${setNumber}-1/alternates/?key=dgMeiknO47`)
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