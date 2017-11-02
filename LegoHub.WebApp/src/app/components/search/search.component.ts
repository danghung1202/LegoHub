import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { Set, Criteria } from '../../models';
import { CriteriaType } from '../../constant';

import { SearchService } from './search.service';
import { AppState, SearchActions } from '../../state-management';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './search.component.html',
    providers: [SearchService]
})
export class SearchComponent {

    suggestionQueries: Observable<string[]>;
    loading: Observable<boolean>;

    constructor(
        private store: Store<AppState>,
        private searchActions: SearchActions,
        private searchService: SearchService) {
        this.suggestionQueries = this.store.select(s => s.search.suggestQueries);
        this.loading = this.store.select(s => s.search.loading);

    }
    ngOnInit() {

    }
    ngOnDestroy() {

    }
    onSearch(query: string) {
        this.store.dispatch(this.searchActions.getSuggestionQuery(query));
    }
    onUpDownHandler(keycode: number) {
        this.searchService.onKeyDown(keycode);
    }
    onEnterHandler(query: string) {
        console.log(query);
    }


}