import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'b-layout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./layout.component.html'),
    styles: [`
       md-nav-list {
           padding-top: 0px;
       }

       md-nav-list:last-child {
           margin-bottom: 64px;
       }
    `]
})
export class LayoutComponent { 
    @Input() themes;
    @Input() years;
    thisYear: number = (new Date()).getFullYear();
}