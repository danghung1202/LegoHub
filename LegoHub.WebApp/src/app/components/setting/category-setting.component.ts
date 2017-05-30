import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'category-setting',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './category-setting.component.html',
})
export class CategorySettingComponent {
    form: FormGroup;

    private _categories: Array<any>;

    @Input()
    set categories(categories: Array<any>) {
        if (categories && categories.length > 0) {
            let group: any = {};
            categories.forEach(cat => {
                group[cat.theme] = new FormControl(cat.image || '');
            });

            this.form = new FormGroup(group);
        }
        this._categories = categories;
    }
    get categories(): Array<any> {
        return this._categories;
    }

    @Output() onSaveCategories = new EventEmitter();

    onSubmit() {
        let payLoad = JSON.stringify(this.form.value);
        this.onSaveCategories.emit(payLoad);
    }
}