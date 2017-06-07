import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, Input, EventEmitter } from '@angular/core';
import { StorageService } from '../../services'; // we will create this next!

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styles: [`
        .dropbox {
            outline: 2px dashed grey; /* the dash box */
            outline-offset: -10px;
            background: #DCE775;
            color: dimgray;
            padding: 10px 10px;
            min-height: 200px; /* minimum height */
            position: relative;
            cursor: pointer;
            margin-top:8px;
        }

        .dropbox:hover {
            background: #F0F4C3; /* when mouse over to the drop zone, change color */
        }

        input[type="file"] {
            opacity: 0; /* invisible but it's there! */
            width: 100%;
            height: 200px;
            position: absolute;
            cursor: pointer;
        }

        .dropbox p {
            font-size: 1.2em;
            text-align: center;
            padding: 50px 0;
        }

        .choose-files-list {
            list-style-type: none;
            padding-left: 0;
            margin-bottom: 5px;
        }
  `]
})

export class FileUploadComponent {

    chooseFiles: Array<File>;
    uploadError: any;
    currentStatus: number;

    readonly STATUS_INITIAL = 0;
    readonly STATUS_SAVING = 1;
    readonly STATUS_SUCCESS = 2;
    readonly STATUS_FAILED = 3;

    @Input() uploadFieldName: string;
    @Output() uploadFiles = new EventEmitter<FormData>();

    constructor(private ref: ChangeDetectorRef) {
        this.uploadFieldName = "files";
        this.reset();
    }

    filesChange(fieldName: string, fileList: FileList) {
        if (!fileList.length) return;

        this.currentStatus = this.STATUS_INITIAL;
        Array.from(Array(fileList.length).keys())
            .map(index => {
                var i = this.chooseFiles.findIndex(item => item.name === fileList[index].name);
                if (i == -1) {
                    this.chooseFiles.push(fileList[index])
                } else {
                    this.chooseFiles[i] = fileList[index];
                }
            });
    }

    reset() {
        this.chooseFiles = [];
        this.currentStatus = this.STATUS_INITIAL;
        this.uploadError = null;
    }

    removeFile(index: number) {
        this.chooseFiles.splice(index, 1);
    }

    onUploadFiles() {
        if (!this.chooseFiles || this.chooseFiles.length === 0) return

        let formData = new FormData();
        this.chooseFiles.forEach(item => {
            formData.append(this.uploadFieldName, item, item.name);
        })

        this.currentStatus = this.STATUS_SAVING;
        this.uploadFiles.emit(formData);
    }

    uploadSuccess(result) {
        this.currentStatus = this.STATUS_SUCCESS;
        this.chooseFiles = [];
        this.ref.detectChanges();
    }

    uploadFailed(error) {
        this.uploadError = error;
        this.currentStatus = this.STATUS_FAILED;
        this.ref.detectChanges();
    }
}