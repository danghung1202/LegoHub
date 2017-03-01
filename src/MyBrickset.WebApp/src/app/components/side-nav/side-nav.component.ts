import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'mb-sidenav',
    template: require('./side-nav.component.html'),
})
export class SideNavComponent { 
    @Input() themes;
    @Input() years;
    @Input() open = false;
}