import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-payment-type',
  templateUrl: './dialog-payment-type.component.html',
  styleUrls: ['./dialog-payment-type.component.css']
})
export class DialogPaymentTypeComponent implements OnInit {

  data:any={};
  user:any;
  ca_currency = [];
  loader: LoaderComponent = new LoaderComponent();

  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef<any>, public _dialog:MatDialog,  @Inject(MAT_DIALOG_DATA) public data_: any) { }
  //****************************************************************************//
  ngOnInit(): void {
    debugger;

    console.log("Data recibida modal add/edit Paymnets ========================",this.data_)
    this.user = JSON.parse(localStorage.getItem('userData'));
    
    if(this.data_.operacion == 'edicion'){
      this.data = this.data_.element;
      // this.data = this.data_.paymentHousings[this.data_.i];
    }else if(this.data_.operacion == 'insertar'){
      this.data = {};
      this.data.housingList = this.data_.id;
      this.data.groupPaymentsHousingId = this.data_.groupPaymentsHousingId;
    }
    
    this.catalogos();
  }

  validate_payment_process(){
    debugger;
    let value_hf;
    let value_pt;

    if((this.data.paymentType) && (this.data.responsible))
    {
      if(this.data.paymentType == 3){ //securityDepositId
        value_hf = this.data_.payment_rocess.securityDepositId ;
        value_pt = this.data.responsible;
      }
      if(this.data.paymentType == 1){ //initialRentPaymentId
        value_hf = this.data_.payment_rocess.initialRentPaymentId ;
        value_pt = this.data.responsible;
      }
      if(this.data.paymentType == 2){ //initialRentPaymentId
        value_hf = this.data_.payment_rocess.ongoingRentPaymentId ;
        value_pt = this.data.responsible;
      }
      if(this.data.paymentType == 4){ //realtorCommissionId
        value_hf = this.data_.payment_rocess.realtorCommissionId ;
        value_pt = this.data.responsible;
      }

    }
    
      if ((value_hf != value_pt) && (value_hf))
      {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Warning",
            body: "The responsible for payment doesn't coincide with the Client Payment Process. Do you want to continue?"
          },
          width: "350px"
        });

        const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
          data: {
            header: "Warning",
            body: "The responsible for payment doesn't coincide with the Client Payment Process. Do you want to continue?"
          },
          width: "350px"
        });
  
        dialogRef.afterClosed().subscribe(result => {
  
          if (result) {
            
          }
          else {
            
          }
        });

      }
    //payment_rocess = { "securityDepositId": null , "initialRentPaymentId": null , "ongoingRentPaymentId": null , "realtorCommissionId": null }
  }

  _getCurrency_(id){
    for (let i = 0; i < this.ca_currency.length; i++) {
      if(this.ca_currency[i].id == id){
         return this.ca_currency[i].currency;
      }
    }
  }


  //****************************************************************************//
  ca_payment_Type = [];
  ca_responsible = [];
  async catalogos(){
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
  }
  //****************************************************************************//
  save_data() {
    debugger;
    if (this.data_.operacion == 'insertar') {
      this.insert_DB();
    }

    if (this.data_.operacion == 'edicion') {
      this.update_DB();
    }

    // if (this.data_.id == 0) {
    //   this.agregar_objeto();
    // }

  }
  //****************************************************************************//
  //INSERCCION DE REGISTRO//
  insert_DB() {
    this.loader.showLoader();
    this.data.createBy = this.user.id;
    this.data.createDate = new Date();
    this.data.success = true;
    this.data.updateBy = this.user.id;
    this.data.updatedDate = new Date();
    this.data.id = 0;
    this.data.idServiceDetail = this.data_.idServiceDetail_current;
    console.log("DATA A GUARDAR DE COST SAVINGS: ", this.data);
    this._services.service_general_post_with_url("HousingList/PostPayment", this.data).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Saved Data"
          },
          width: "350px"
        });
        debugger;
        this.data.id = data.result.id
        this.dialogRef.close(this.data);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("Error al actualizar: ", err);
    })
  }
  //****************************************************************************//
  //ACTUALIZACION DE REGISTRO//
  update_DB() {
    this.loader.showLoader();
    this.data.success = true;
    this.data.updateBy = this.user.id;
    this.data.updatedDate = new Date();
    console.log("DATA A GUARDAR DE COST SAVINGS: ", this.data);
    this._services.service_general_put("HousingList/PutPayment", this.data).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close(this.data);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("Error al actualizar: ", err);
    })
  }
  //****************************************************************************//
  //AGREGA A OBJETO//
  agregar_objeto() {
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
