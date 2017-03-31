import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'b-toolbar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './toolbar.component.html',
    styles: [`
     
    `]
})
export class ToolbarComponent { 
    @Output("openSidenav") openMainSidenav = new EventEmitter();
    openSidenav() {
        this.openMainSidenav.emit();
    }
}