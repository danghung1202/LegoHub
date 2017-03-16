import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

import { Set, SetImage, Instruction, Review } from '../../models';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'set-detail',
    template: require('./set-detail.component.html'),
    styles: [`
        .modal-content{
            height:100%;
            z-index:3
        }

        md-tab-group{
            height: calc(100% - 56px);
            overflow: auto;
        }
        
        .selected {
            background-color: #eee;
        }

        md-spinner {
            display:none;
            height:30px;
            width:30px;
            margin: auto;
        }

        md-spinner.show {
            display:block;
        }
    `]

})
export class SetDetailComponent {

    @Input() set: any;
    @Input() additionalImages: SetImage[];
    @Input() intructions: Instruction[];
    @Input() reviews: Review[];
    @Input() parts: any;
    @Input() alternateBuilds: any;

    @Output() goBack = new EventEmitter();

}