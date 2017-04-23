import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppState, SettingActions } from './state-management';

import { AppConfig, AppService } from './services';

@Injectable()
export class AppResolver implements Resolve<any> {

    constructor(private appService: AppService, private store: Store<AppState>, private action: SettingActions, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppConfig> {
        return this.appService.getConfigs().map(configs => {
            if(!configs.isResolved){
                this.store.dispatch(this.action.loadAllSettingsSuccess(configs))
            }
            return configs;
        });
    }
}