import {
    Component, ViewChild, OnInit, Input, Output, EventEmitter,
    trigger, state, style, transition, animate
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'search-input',
    template: require('./search-input.component.html'),
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
export class SearchInputComponent {

    value: string;
    @Input('placeholder') placeholder: string;
}