import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Criteria } from '../../models';


@Component({
    selector: 'criteria',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './criteria.component.html',
    styles: [`
        .filter-title{
            flex-grow: 1;
            text-align: center;
            margin-right: 24px;
        }

        .filter-row:hover {
            background-color: #AED581;
        }

        .filter-row{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0 8px 0 16px;
            height:47px;
            border-bottom: solid 1px #ccc;
            cursor: pointer;
        }

        .criteria-row{
            border-bottom: solid 1px #ccc;
            padding: 5px 16px;
        }
    `]
})
export class CriteriaComponent {

    private _criterias: Criteria[];
    hasCriteria: boolean;

    @Input()
    set criterias(criterias: Criteria[]) {
        this.hasCriteria = criterias ? criterias.length > 0 : false;
        this._criterias = criterias;
    }
    get criterias(): Criteria[] {
        return this._criterias;
    }

    @Input() criteriaType: string;

    @Output() goToCriterias = new EventEmitter<string>();
    @Output() removeCriteria = new EventEmitter<any>();

    trackByValue(index, item: Criteria) {
        return item ? item.value : undefined
    }

    removeSelectedCriteria(selectedCriteria: Criteria) {
        this.removeCriteria.emit({ criteria: selectedCriteria, type: this.criteriaType });
    }

    goToCriteriaList() {
        this.goToCriterias.emit(this.criteriaType);
    }
}