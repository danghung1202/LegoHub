import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { sortCriterias } from '../constant';

class Url {
    static Login = 'api/account/login';
    static Logout = 'api/account/logout';
}

@Injectable()
export class AppService {
    
    constructor(protected http: Http, private store: Store<AppState>, private errorActions: ErrorActions) { }

    login(id_token, access_token): Observable<any> {
        return this.http.get(`${Url.Login}?idToken=${id_token}&accessToken=${access_token}`)
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    logout(): Observable<any> {
        return this.http.get(`${Url.Logout}`)
            .map(res => res.json())
            .catch(error => {
                return this.handleError(error);
            });
    }

    protected handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status == 0) {
                errMsg = "The server is offline or inaccessible";
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