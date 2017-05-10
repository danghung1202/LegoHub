import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Theme, Set } from '../models';
import { AppState, ErrorActions } from '../state-management';

import { AppService } from './app.service';

@Injectable()
export class AppConfig {
    private subscription: Subscription;

    public youtubeConfig: YoutubeConfig;
    public rebrickableConfig: any;
    public pinterestConfig: PinterestConfig;
    public isResolved: boolean = false;

    constructor(private http: Http, private store: Store<AppState>) {
        this.subscription = this.store.select(s => s.setting).subscribe(setting => {
            this.youtubeConfig = setting.youtubeConfig;
            this.rebrickableConfig = setting.rebrickableConfig;
            this.pinterestConfig = setting.pinterestConfig;
            this.isResolved = setting.isResolved;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}