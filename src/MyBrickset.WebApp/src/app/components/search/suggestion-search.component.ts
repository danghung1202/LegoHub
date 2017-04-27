import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { SearchService } from './search.service';

@Component({
    selector: 'suggestion-search',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './suggestion-search.component.html',
    styles: [
        `
        md-spinner {
            display:none;
            height:30px;
            width:30px;
            margin: auto;
        }

        md-spinner.show {
            display:block;
        }
        
        `
    ]
})
export class SuggestionSearchComponent {
    @Input() queries: string[];
    @Input() loading: boolean;
    constructor(private searchService: SearchService) {
        this.searchService.onKeyDown$.subscribe(keycode=>{
            this.onKeyDown(keycode);
        });
    }

    onKeyDown(keycode: number) {
        console.log(keycode);
    }

}