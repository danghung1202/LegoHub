import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'youtube-setting',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './youtube-setting.component.html',
})
export class YoutubeSettingComponent {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    @Output() onSaveYoutubeSettings = new EventEmitter();

    ngOnInit() {
        this.form = this.formBuilder.group({
            APIKey: ['', [Validators.required]],
            Keyword: [''],
            Channels: this.formBuilder.array([])
        });

        this.addChannel();
    }

    addChannel() {
        const control = <FormArray>this.form.controls['Channels'];
        const channelCtrl = this.formBuilder.group({
            Name: ['']
        });;

        control.push(channelCtrl);
    }

    removeChannel(index: number) {
        const control = <FormArray>this.form.controls['Channels'];
        control.removeAt(index);
    }

    onSubmit() {
        console.log(this.form.value);
        this.onSaveYoutubeSettings.emit(JSON.stringify(this.form.value));
    }


}