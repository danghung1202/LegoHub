import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, SetListActions, SettingActions, NavigationActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './category-list.component.html',
    styles: [`
        md-card-title {   
            text-align: center;
            font-size: 16px;
        }

        md-card {
            height: calc(100% - 48px);
        }

        md-card:hover, md-card:focus {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 8px 16px 0 rgba(0,0,0,.12);
            cursor: pointer;
        }
        
        .theme-list {
            display: flex;
            flex-flow: row wrap;
        }

        .theme-list > div {
            width:100%;
            height:75vw;
            margin-bottom: 16px;
        }

        .theme-content {
            margin:0 8px;
            height: 100%;
        }
        
        .theme-image {
            background-repeat: no-repeat;
            background-position: center center;
            background-color: #fff;
            background-size: contain;
            height: calc(100% - 28px);
        }

        @media only screen and (min-width: 350px) {
            .theme-list > div {
                height: 60vw;
                width: 50%;
            }

            md-card-title {   
                font-size: 16px;
            }   
        }

        @media only screen and (min-width: 600px) {
            .theme-list > div {
                height: 39.99999996vw;
                width: 33.33333333%;
            }

            md-card-title {   
                font-size: 18px;
            }   
        }

        @media only screen and (min-width: 900px) {
            .theme-list > div {
                height: 30vw;
                width: 25%;
            }

            md-card-title {   
                font-size: 18px;
            }   
        }

        @media only screen and (min-width: 1200px) {
            .theme-list > div {
                height: 20vw;
                width: 20%;
            }

            md-card-title {   
                font-size: 20px;
            } 
        }
    `]
})
export class CategoryListComponent implements OnInit {
    categories: Observable<any>;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private categoryActions: SettingActions) {

        this.categories = this.store.select(s=>s.setting).select(s=>s.categories);
    }

    ngOnInit() {
        this.store.dispatch(this.categoryActions.loadCategories());
    }

    trackByTheme(index, item) {
        return item ? item.theme : undefined
    }
}