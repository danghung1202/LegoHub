import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Set } from '../../models';

@Component({
    selector: 'pin-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './pin-card.component.html',
    styles: [`
        .card-label {
            text-transform: uppercase;
            margin-right: 5px;
        }

        md-card {
            background-color: #F9FBE7;
        }

    `]
})
export class PinCardComponent {
    @Input() pin: Pin;
}