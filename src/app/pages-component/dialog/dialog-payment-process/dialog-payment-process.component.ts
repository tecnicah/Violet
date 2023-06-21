import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-payment-process',
  templateUrl: './dialog-payment-process.component.html',
  styleUrls: ['./dialog-payment-process.component.css']
})
export class DialogPaymentProcessComponent implements OnInit {
  school_search: any = {};
  ca_payment_process = [];
  ca_document: any;
  public __loader__: LoaderComponent = new LoaderComponent();
  
  constructor(public _services: ServiceGeneralService, public dialogRef: MatDialogRef<any>, public _dialog:MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit(): Promise<void> {
    console.log(this.data);
    this.school_search = this.data;
    this.school_search.updateBy = this.data.userId;
    this.school_search.updatedDate = new Date();
    this.school_search.createdBy = this.data.userId;
    this.school_search.createdDate = new Date();

    this.ca_payment_process = await this._services.getCatalogueFrom('CatPaymentProcess');
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
      if (data.success) {
        this.ca_document = data.result;
        //  //console.log(this.ca_document);
      }
    }))
  }

  save_data(){
    this.__loader__.showLoader();
    this._services.service_general_put("RelocationServices/PutSchoolingSearch", this.school_search).subscribe((data => {
      if (data.success) {
        //    //console.log(data);
        this.__loader__.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close();
      }
    }))
  }
}
