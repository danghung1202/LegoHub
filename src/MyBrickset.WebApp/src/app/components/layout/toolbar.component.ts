import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GAuth2 } from '../../services';

@Component({
    selector: 'b-toolbar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './toolbar.component.html',
    styles: [`
     
    `]
})
export class ToolbarComponent {
    @Output("openSidenav") openMainSidenav = new EventEmitter();

    constructor(
        private authorization: GAuth2
    ) { }

    openSidenav() {
        this.openMainSidenav.emit();
    }
    
    signInUser() {
        this.authorization.signIn();
    }
}