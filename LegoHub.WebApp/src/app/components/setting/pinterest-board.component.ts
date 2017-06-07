import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StorageService } from '../../services';
import { FileUploadComponent } from '../shared/file-upload.component';

@Component({
    selector: 'pinterest-board-upload',
    template: `
        <md-card>
            <md-card-title md-subheader>Configure Pinterest Boards</md-card-title>
            <file-upload [uploadFieldName]="'files'" (uploadFiles)="uploadFiles($event)"></file-upload>
        </md-card>
    `,
})
export class PinterestBoardUploadComponent {

    @ViewChild(FileUploadComponent)
    private fileUploadComponent: FileUploadComponent;

    constructor(private storageSvc: StorageService) { }

    uploadFiles(formData: FormData) {

        this.storageSvc.savePinterestBoardSettings(formData)
            .delay(1500) // DEV ONLY: delay 1.5s to see the changes
            .subscribe(result => {
                this.fileUploadComponent.uploadSuccess(result);
            }, err => {
                this.fileUploadComponent.uploadFailed(err);
            })
    }
}