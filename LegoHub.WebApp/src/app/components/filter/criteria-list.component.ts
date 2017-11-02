import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Criteria } from '../../models';


@Component({
    selector: 'criteria-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './criteria-list.component.html',
    styles: [`
        .modal-content{
            height:100%;
            z-index:3;
            max-width:500px;
            right:0;
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

        search-input {
            display:none;
        }

        search-input.show, md-spinner.show {
            display:block;
        }
    `]
})
export class CriteriaListComponent {
    selectedCount: number;

    private _criterias: Criteria[];

    @Input()
    set criterias(criterias: Criteria[]) {
        this.selectedCount = criterias ? criterias.filter(x => x.isSelected).length : 0;
        this._criterias = criterias;
    }
    get criterias(): Criteria[] {
        return this._criterias;
    }

    @Input() criteriaName: string;
    @Input() loading: boolean;

    @Output() goBack = new EventEmitter();
    @Output() applyClick = new EventEmitter<Criteria[]>();

    // ngOnChanges(changes: SimpleChanges) {
    //     var criterias = changes["criterias"].currentValue;
    //     this.selectedCount =criterias ? criterias.filter(x=>x.isSelected).length : 0;
    // }

    selectCriteria(criteria) {
        criteria.isSelected = !criteria.isSelected;
        if (criteria.isSelected) {
            this.selectedCount += 1;
        } else {
            this.selectedCount -= 1;
        }
    }

    clearCriterias() {
        this.criterias.forEach(criteria => { criteria.isSelected = false; })
        this.selectedCount = 0;
    }

    trackByValue(index, item) {
        return item ? item.value : undefined;
    }

    applyCriterias() {
        this.applyClick.emit(this.criterias.filter(x => x.isSelected));
    }
}