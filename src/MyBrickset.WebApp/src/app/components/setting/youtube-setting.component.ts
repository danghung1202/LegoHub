import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AppConfig } from '../../services';

@Component({
    selector: 'youtube-setting',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './youtube-setting.component.html',
})
export class YoutubeSettingComponent {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private appCofig: AppConfig) { }

    @Output() onSaveYoutubeSettings = new EventEmitter();

    ngOnInit() {
        this.form = this.formBuilder.group({
            APIKey: [this.appCofig.youtubeConfig.apiKey, [Validators.required]],
            Keyword: [this.appCofig.youtubeConfig.keyword],
            Channels: this.formBuilder.array([])
        });
        if (this.appCofig.youtubeConfig.channels && this.appCofig.youtubeConfig.channels.length > 0) {
            this.initChannels();
        } else {
            this.addChannel();

        }
    }

    private initChannels() {
        const control = <FormArray>this.form.controls['Channels'];
        this.appCofig.youtubeConfig.channels.forEach(channel => {
            let channelCtrl = this.formBuilder.group({
                Name: [channel.name],
                ID: [channel.id]
            });;
            control.push(channelCtrl);
        })
    }

    addChannel() {
        const control = <FormArray>this.form.controls['Channels'];
        const channelCtrl = this.formBuilder.group({
            Name: [''],
            ID: ['']
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