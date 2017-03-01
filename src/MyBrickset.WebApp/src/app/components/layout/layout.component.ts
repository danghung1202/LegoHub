import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'b-layout',
    template: require('./layout.component.html'),
})
export class LayoutComponent { 
    @Input() themes;
    @Input() years;
}