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
    static GetBoardsBasedKeyword = 'api/storage/get-boards';
    static GetPinsOfBoard = 'https://api.pinterest.com/v1/boards'
}

@Injectable()
export class PinterestService extends AppService {

    constructor(private jsonp: Jsonp, http: Http, config: AppConfig, store: Store<AppState>, errorActions: ErrorActions, private settingActions: SettingActions) {
        super(http, config, store, errorActions);
    }

    private _defaultUrlParams: PinterestRequestParameter = {
        fields: 'id,original_link,note,metadata,image',
        limit: 20,
        callback: 'JSONP_CALLBACK'
    };

    getBoardsOfUser(username: string): Observable<any> {
        if (username && username != '') {
            return this.http.get(`${Url.FetchBoards}?username=${username}`)
                .map(response => response.json())
                .map(results => ({ Username: username, boards: results.boards }))
                .catch(error => {
                    return this.handleError(error);
                });
        }

        return Observable.of([]);
    }



    getBoardsBasedRandomKeyword(): Observable<PinterestBoard[]> {
        let keywords = this.config.pinterestConfig.keywords.filter(key => this.config.pinterestBoardDict[key] == null);
        if (keywords.length > 0) {
            let selectedKeyword = keywords[Math.floor(Math.random() * keywords.length)];
            return this.getBoardsBasedKeyword(selectedKeyword).map(boards => {
                this.config.pinterestBoardDict[selectedKeyword] = boards;
                boards.forEach(board => {
                    if (this.config.pinterestBoads.findIndex(b => board.href == b.href) == -1) {
                        this.config.pinterestBoads.push(board);
                    }
                })
                return boards;
            })
        }

        return Observable.of([]);
    }

    getBoardsBasedKeyword(keyword: string): Observable<PinterestBoard[]> {
        if (keyword && keyword != '') {
            return this.http.get(`${Url.GetBoardsBasedKeyword}?keyword=${keyword}`)
                .map(response => response.json())
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
            .map(lastestResult => ({ token: token, users: lastestResult }))
    }

    getPins(pageNumber?: number): Observable<Pin[]> {
        if (!pageNumber) {
            this.config.pinterestBoads.forEach(board => {
                board.cursor = null;
            })
        }
        let availableBoards = this.config.pinterestBoads.filter(x => x.cursor != '');
        if (availableBoards.length > 0) {

            let board = availableBoards[Math.floor(Math.random() * availableBoards.length)];
            let params = Object.assign({}, this._defaultUrlParams, <PinterestRequestParameter>{ access_token: this.config.pinterestConfig.token });
            if (board.cursor) {
                params.cursor = board.cursor;
            }

            return this.jsonp.get(`${Url.GetPinsOfBoard}${board.href}pins/`, { search: this.createUrlSearchParams(params) })
                .map(res => res.json())
                .map((response: PinterestPinsListResponse) => {

                    board.cursor = response.page.cursor ? response.page.cursor : '';

                    let index = this.config.pinterestBoads.findIndex(b => board.id == b.id);
                    if (index >= 0) this.config.pinterestBoads[index] = board;
                    return response.data;
                })
                .catch(error => {
                    return this.handleError(error);
                });
        }

        return Observable.of([]);
    }

    private createUrlSearchParams(options): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        Object.keys(options).forEach(param => params.set(param, options[param]));
        return params;
    }

}