import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-add-paymenent-information',
  templateUrl: './dialog-add-paymenent-information.component.html',
  styleUrls: ['./dialog-add-paymenent-information.component.css']
})
export class DialogAddPaymenentInformationComponent implements OnInit {
  school_payment: any = {};
  ca_responsible = [];
  ca_currency = [];
  ca_school_expenses_payment = [];
  ca_recurrence= [];
  //LOADER//
  public __loader__: LoaderComponent = new LoaderComponent();
  constructor(
    public dialogRef: MatDialogRef<DialogAddPaymenentInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data.id != undefined){
      this.school_payment = this.data;
    }
    else
    {
      this.school_payment.schoolingInformationId = this.data;
    }
    this.getCatalogos()
  }

  async getCatalogos(){
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    this.ca_school_expenses_payment = await this._services.getCatalogueFrom('School_Expenses_Payment');
    this.ca_recurrence = await this._services.getCatalogueFrom('GetPaymentRecurrence');
    console.log("this.ca_recurrence", this.ca_recurrence);
  }

  save(){
    this.__loader__.showLoader();
    if(this.data.id != undefined){
      this._services.service_general_put("PaymentSchooling/PutPaymentSchools", this.school_payment).subscribe((data => {
        if (data.success) {
          //    //console.log(data);
          this.__loader__.hideLoader();
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {                                  
              header: "Success",
              body: "Insert Data"
            },
            width: "350px"
          });
          this.dialogRef.close();
        }
      }))
    }
    else
    {
      this._services.service_general_post_with_url("PaymentSchooling/PostPaymentSchool", this.school_payment).subscribe((data => {
        if (data.success) {
          //    //console.log(data);
          this.__loader__.hideLoader();
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Insert Data"
            },
            width: "350px"
          });
          this.dialogRef.close();
        }
      }))
    }
  }
}
