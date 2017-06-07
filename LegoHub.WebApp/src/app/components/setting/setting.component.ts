import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, SetListActions, SettingActions, NavigationActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="main-content">
            <md-tab-group>
                <md-tab label="Brickset">
                    <div class="setting-component">
                        <category-setting [categories]="categories | async" (onSaveCategories)="onSaveCategories($event)"></category-setting>
                    </div>
                </md-tab>
                <md-tab label="Youtube">
                    <div class="setting-component">
                        <youtube-setting (onSaveYoutubeSettings)="onSaveYoutubeSetting($event)"></youtube-setting>
                    </div>
                </md-tab>
                <md-tab label="Pinterest">
                    <div class="setting-component">
                        <pinterest-setting (onSavePinterestSettings)="onSavePinterestSetting($event)"></pinterest-setting>
                    </div>
                    <div class="setting-component">
                        <pinterest-board-upload></pinterest-board-upload>
                    </div>
                </md-tab>
            </md-tab-group>
        </div>
    `,
    styles: [`
        .setting-component{
            margin-bottom: 8px;
            padding: 3px;
            padding-top:0px;
        }
    `]
})
export class SettingComponent implements OnInit {
    categories: Observable<Array<any>>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private settingActions: SettingActions) {
        this.categories = this.store.select(s => s.setting).select(s => s.categories);
    }

    ngOnInit() {
        this.store.dispatch(this.settingActions.loadCategories());
    }

    onSaveCategories(payLoad) {
        this.store.dispatch(this.settingActions.saveCategoryImages(payLoad));
    }

    onSaveYoutubeSetting(payLoad) {
        this.store.dispatch(this.settingActions.saveYoutubeSettings(payLoad));
    }

    onSavePinterestSetting(payLoad) {
        this.store.dispatch(this.settingActions.savePinterestSettings(payLoad));
    }

}