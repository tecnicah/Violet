import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
    selector: 'escalation-levels-dialog',
    templateUrl: './escalationLevel.component.html',
    styleUrls: []
})
export class DialogEscalationLevels implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogEscalationLevels>,
        public _services: ServiceGeneralService,
        public _routerParams: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _dialog: MatDialog
    ) {}

    ngOnInit() {}

    public hideModal(): void {

        this.dialogRef.close();

    }

}