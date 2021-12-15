import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'nsr-table-detail',
    templateUrl: './nsr-table-detail.component.html',
    styleUrls: []
})
export class DialogNsrTableDetail implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogNsrTableDetail>
    ) {}

    public dataSource;

    ngOnInit() {}

    public hideModal(): void {

        this.dialogRef.close();

    }

}