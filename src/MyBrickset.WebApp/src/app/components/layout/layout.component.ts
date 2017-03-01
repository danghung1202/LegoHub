import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'b-layout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./layout.component.html'),
})
export class LayoutComponent { 
    @Input() themes;
    @Input() years;
    thisYear: number = (new Date()).getFullYear();
}