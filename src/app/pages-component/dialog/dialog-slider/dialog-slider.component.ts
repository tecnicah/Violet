import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';


@Component({
  selector: 'slider-general-dialog',
  templateUrl: './dialog-slider.component.html',
  styleUrls: []
})
export class DialogSliderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSliderComponent>,
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog
  ) { }

  ngOnInit() { this.initPageSettings() }

  public initPageSettings():void {



  }

  public hideModal(): void {

    this.dialogRef.close();

  }

}

