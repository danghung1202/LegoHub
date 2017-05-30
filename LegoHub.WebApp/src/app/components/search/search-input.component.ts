import { Component, Input, Output, ElementRef, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Key } from '../../constant';


@Component({
    selector: 'search-input',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <md-input-container>
        <input mdInput type="search" #searchInput class="form-control" [placeholder]="placeholder" [ngModel]="inputValue" (ngModelChange)="valueChange($event)"/>
    </md-input-container>
    `
})
export class SearchInputComponent {
    private subscriptions: Subscription[];

    @ViewChild('searchInput') searchInput;
    @Input() placeholder: string;
    @Input() delay: number = 300;
    @Output() value = new EventEmitter<string>();
    @Output() onUpDown = new EventEmitter<number>();
    @Output() onEnter = new EventEmitter<string>();

    public inputValue: string;

    valueChange(newValue) {
        this.inputValue = newValue;
        if(newValue == '') {
            this.value.emit(newValue);
        }
    }

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        const onkeyDownObs = this.onKeyDownStream();
        this.subscriptions = [
            this.onKeyArrowUpDownSubscription(onkeyDownObs),
            this.onEnterSubscription(onkeyDownObs),
            this.onKeyUpSubscription()
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private onKeyArrowUpDownSubscription(elementObs: Observable<{}>) {
        return elementObs
            .filter((e: KeyboardEvent) => e.keyCode === Key.ArrowDown || e.keyCode === Key.ArrowUp)
            .map((e: KeyboardEvent) => e.keyCode)
            .subscribe((keyCode: number) => {
                this.onUpDown.emit(keyCode);
            });
    }

    private onEnterSubscription(elementObs: Observable<{}>) {
        return elementObs
            .filter((e: KeyboardEvent) => e.keyCode === Key.Enter)
            .map((e: KeyboardEvent) => e.keyCode)
            .subscribe(() => {
                this.onEnter.emit(this.inputValue);
            });
    }

    private onKeyDownStream() {
        return Observable.fromEvent(this.searchInput.nativeElement, 'keydown').share();
    }

    private onKeyUpSubscription() {
        return Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
            .filter((e: KeyboardEvent) => this.validateKeyCode(e))
            .map(() => this.inputValue.trim())
            .debounceTime(this.delay)
            .distinctUntilChanged()
            .filter(input=> input != '')
            .subscribe(input => this.value.emit(input));
    }

    private validateKeyCode(event: KeyboardEvent) {
        return event.keyCode !== Key.Tab
            && event.keyCode !== Key.Shift
            && event.keyCode !== Key.ArrowLeft
            && event.keyCode !== Key.ArrowUp
            && event.keyCode !== Key.ArrowRight
            && event.keyCode !== Key.ArrowDown;
    }


}