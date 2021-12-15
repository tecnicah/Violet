import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'general-message-dialog',
    templateUrl: './general-message.component.html',
    styleUrls: []
})
export class DialogGeneralMessageComponent implements OnInit {

    public header:string;
    public body:string;

    constructor(
        public dialogRef: MatDialogRef<DialogGeneralMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {

        this.header = this.data.header;
        this.body = this.data.body;

    }

}

export interface DialogData {
    header: string;
    body: string;
}