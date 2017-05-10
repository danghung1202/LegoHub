import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AppConfig } from '../../services';

@Component({
    selector: 'pinterest-setting',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './pinterest-setting.component.html',
})
export class PinterestSettingComponent {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private appCofig: AppConfig) { }

    @Output() onSavePinterestSettings = new EventEmitter();

    ngOnInit() {
        this.form = this.formBuilder.group({
            Token: [this.appCofig.pinterestConfig.token, [Validators.required]],
            Users: this.formBuilder.array([])
        });
        if (this.appCofig.pinterestConfig.users && this.appCofig.pinterestConfig.users.length > 0) {
            this.initUsers();
        } else {
            this.addUser();

        }
    }

    private initUsers() {
        const control = <FormArray>this.form.controls['Users'];
        this.appCofig.pinterestConfig.users.forEach((user: PinterestUser) => {
            let userCtrl = this.formBuilder.group({
                Username: [user.username]
            });;
            control.push(userCtrl);
        })
    }

    addUser() {
        const control = <FormArray>this.form.controls['Users'];
        const userCtrl = this.formBuilder.group({
            Username: ['']
        });;

        control.push(userCtrl);
    }

    removeUser(index: number) {
        const control = <FormArray>this.form.controls['Users'];
        control.removeAt(index);
    }

    onSubmit() {
        console.log(this.form.value);
        this.onSavePinterestSettings.emit(this.form.value);
    }

    onSubmitAndFetchBoards() {
        console.log(this.form.value);
        this.onSavePinterestSettings.emit(this.form.value);
    }

}