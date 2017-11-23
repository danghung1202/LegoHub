import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

import { Set, SetImage, Instruction, Review } from '../../models';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'set-detail',
    templateUrl: './set-detail.component.html',
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

        .part-list {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
        }

        .part-detail {
            width:100px;
            border-bottom: 2px solid #ccc;
        }

        .part-detail img{
            width:85px;
        }

        .moc-list {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
        }

        .moc-detail {
            width:350px;
        }
    `]

})
export class SetDetailComponent {
    @Input() set: any;
    @Input() additionalImages: SetImage[];
    @Input() intructions: Instruction[];
    @Input() reviews: Review[];
    @Input() parts: any = null;
    @Input() alternateBuilds: any;

    @Output() goBack = new EventEmitter();
    @Output() getPartsOfSet = new EventEmitter<string>();
    @Output() getAltBuildsOfSet = new EventEmitter<string>();

    tabSelectChange(event) {
        if(event.tab.textLabel.startsWith('PARTS') && this.parts && this.parts.length == 0){
            this.getPartsOfSet.emit(this.set.number);
        } else if(event.tab.textLabel.startsWith('ALT BUILDS') && this.alternateBuilds && this.alternateBuilds.length == 0){
            this.getAltBuildsOfSet.emit(this.set.number);
        }
    }
}