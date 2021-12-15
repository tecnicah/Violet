import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
    selector: 'app-dialog-general-confirmation',
    templateUrl: './dialog-general-confirmation.component.html',
    styleUrls: []
})
export class DialogGeneralConfirmation implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogGeneralConfirmation>,
        public _services: ServiceGeneralService,
        public _routerParams: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _dialog: MatDialog,
    ) {}

    ngOnInit() {}

    public confirmAction( action:number ):void {

    this.dialogRef.close({
        can_delete: action == 1 ? true : false
    });        

    }

    /* Utilities *******************/
    public hideModal():void {

        this.dialogRef.close();
    
    }

}