import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, SetListActions, SettingActions, NavigationActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styles: [`
        .sidenav-toolbar {
            background-color: #8bc34a;
            margin-top: -10px;
            min-height: 48px;
        }

        .sidenav-toolbar > span {
            font-size: 18px;
            margin-left: 32px;
            color:whitesmoke;
            cursor: pointer;
            font-weight: 400;
        }

        .main-content {
            height: calc(100% - 68px);
            width: 100% !important;
            max-width: none;
            overflow: auto;
        }

        .sub-content {
            width: 90%;
            margin: 0 auto;
            max-width: 1280px;
        }

        @media only screen and (min-width: 600px) {
            .sub-content  {
                width: 85%;
            }
        }

    `]
})
export class HomeComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private categoryActions: SettingActions) {

        
    }

    ngOnInit() {
        
    }
}