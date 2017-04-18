import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { sortCriterias } from '../constant';
import { AppService } from './app.service';

import { REBRICKABLE_API_KEY } from './constants';

class Url {
    static Sets = 'https://rebrickable.com/api/v3/lego/sets/';
}

@Injectable()
export class RebrickableService extends AppService {

    constructor(http: Http, store: Store<AppState>, errorActions: ErrorActions) {
        super(http, store, errorActions);
    }

    private createHeaders(): Headers {
        let headers: Headers = new Headers();
        headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
        headers.append('Authorization', `key ${REBRICKABLE_API_KEY}`);
        return headers;
    }

    getPartsOfSet(setNumber: string): Observable<any> {
        return this.http.get(`${Url.Sets}${setNumber}-1/parts/?key=${REBRICKABLE_API_KEY}`, { headers: this.createHeaders() })
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
        return this.http.get(`${Url.Sets}${setNumber}-1/alternates/?key=${REBRICKABLE_API_KEY}`, { headers: this.createHeaders() })
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