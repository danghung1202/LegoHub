import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions, SettingActions } from '../state-management';

import { sortCriterias } from '../constant';
import { AppService } from './app.service';
import { AppConfig } from './app.config';

class Url {
    static UserBoards = 'http://pinterestapi.co.uk/';
    static FetchBoards = 'api/storage/fetch-boards';
}

@Injectable()
export class PinterestService extends AppService {

    constructor(private jsonp: Jsonp, http: Http, config: AppConfig, store: Store<AppState>, errorActions: ErrorActions, private settingActions: SettingActions) {
        super(http, config, store, errorActions);
    }

    getBoardsOfUser(username: string): Observable<any> {
        if (username && username != '') {
            // return this.http.get(`${Url.UserBoards}${username}/boards`, options)
            //     .map(response => response.json())
            //     .map(results => results.map(item => ({ Username: username, boards: item.body })))
            //     .catch(error => {
            //         return this.handleError(error);
            //     });
            return this.http.get(`${Url.FetchBoards}?username=${username}`)
                .map(response => response.json())
                .map(results => ({ Username: username, boards: results.boards }))
                .catch(error => {
                    return this.handleError(error);
                });
        }

        return Observable.of([]);
    }

    fetchAllBoardFromAllUserSequence(token: string, usernames: string[]): Observable<any> {
        let count: number = 0;
        return Observable.from(usernames)
            .concatMap(username => this.getBoardsOfUser(username))
            .do(response => {
                count = count + 1;
                console.log(count / usernames.length * 100)
                console.log(response);
            })
            .map(response => [response])
            .combineAll()
            .map(lastestResult=> ({token: token, users: lastestResult}))
    }

}