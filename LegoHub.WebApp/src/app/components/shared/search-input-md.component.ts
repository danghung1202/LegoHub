import {
    Component, ViewChild, OnInit, Input, Output, EventEmitter,
    trigger, state, style, transition, animate
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'search-input-md',
    templateUrl: './search-input-md.component.html',
    styles: [`
        .search-row{
            display:flex;
            margin: 0 16px;
        }

        .search-row md-input-container {
            width: 100%;
        }
    `]
})
export class SearchInputMdComponent {

    value: string;
    @Input('placeholder') placeholder: string;
}