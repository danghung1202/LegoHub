import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./filter-panel.component.html'),
    styles: [`
        .modal-content{
            right:0;
            width: 300px;
            height:100%;
        }
    `]
})
export class FilterPanelComponent { }