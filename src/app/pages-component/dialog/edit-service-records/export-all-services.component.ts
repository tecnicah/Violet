import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
    selector: 'edit-services-record',
    templateUrl: './export-all-services.component.html'
}) export class DialogExportAllServicesComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogExportAllServicesComponent>
    ) {}

    ngOnInit() {}

    public hideModal(): void {

        this.dialogRef.close();

    }

}