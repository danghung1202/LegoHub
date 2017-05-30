import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Theme, Subtheme, Year } from '../../models';

import { AppState, PinActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './pin-list.component.html',
    styles: [`
        masonry {
            margin: 0 -0.6rem;
        }

        md-spinner {
            display:none;
            height:30px;
            width:30px;
            margin: auto;
        }

        md-spinner.show {
            display: block;
        }

        .tag-container{
            margin: 15px 0;
        }

        .button-row{
            display:flex;
            justify-content: flex-end;
        }

        #loadMoreBtn {
            display: none;
        }

        #loadMoreBtn.show {
            display: block;
        }
    `]
})
export class PinListComponent {
    pins: Observable<Pin[]>;
    loading: Observable<boolean>;
    showMore: Observable<boolean>;

    pageNumber: number = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private pinActions: PinActions) {

        this.pins = this.store.select(s => s.pinterest).select(s => s.pins);
        this.loading = this.store.select(s => s.pinterest).select(s => s.loading);
        this.showMore = this.store.select(s => s.pinterest).select(s => s.showMore);
    }

    ngOnInit() {
        this.store.dispatch(this.pinActions.getPinList());
    }

    loadMore() {
        this.pageNumber = this.pageNumber + 1;
        this.store.dispatch(this.pinActions.getPinList(this.pageNumber));
    }

    layoutComplete(param) {
        //console.log(param);
    }

}
