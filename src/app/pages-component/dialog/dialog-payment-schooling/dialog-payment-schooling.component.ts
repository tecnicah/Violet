import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-payment-schooling',
  templateUrl: './dialog-payment-schooling.component.html',
  styleUrls: ['./dialog-payment-schooling.component.css']
})
export class DialogPaymentSchoolingComponent implements OnInit {

  data:any={};
  user:any;
  ca_currency = [];
  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef<any>, public _dialog:MatDialog,  @Inject(MAT_DIALOG_DATA) public data_: any) { }
  //****************************************************************************//
  ngOnInit(): void {
    debugger;
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("data que recibe el modal: ", this.data_);
    if(this.data_.operacion == 'edicion'){
       this.data = this.data_.pago;
    }else if(this.data_.operacion == 'insertar'){
      this.data = {};

    }
    this.data.housingList = this.data_.id;
    this.catalogos();
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

    if (this.data_.id == 0) {
      this.agregar_objeto();
    }

  }
  //****************************************************************************//
  //INSERCCION DE REGISTRO//
  insert_DB() {
    // this.data.createBy = this.user.id;
    // this.data.createDate = new Date();
    // this.data.success = true;
    // this.data.updateBy = this.user.id;
    // this.data.updatedDate = new Date();
    this.data.id = 0;
    this.data.schoolingSearchId = this.data_.schoolingSearchId;
    console.log("DATA A GUARDAR DE COST SAVINGS: ", this.data);
    this._services.service_general_post_with_url("HousingList/PostPaymentSchooling", this.data).subscribe((data => {
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Saved Data"
          },
          width: "350px"
        });
        this.dialogRef.close(this.data);
      }
    }), (err) => {
      console.log("Error al actualizar: ", err);
    })
  }

  //Responsable//
  getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
  }

  //CURRENCY//
  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }
  //****************************************************************************//
  //ACTUALIZACION DE REGISTRO//
  update_DB() {
    // this.data.success = true;
    // this.data.updateBy = this.user.id;
    // this.data.updatedDate = new Date();
    console.log("DATA A GUARDAR DE COST SAVINGS: ", this.data);
    this._services.service_general_put("HousingList/PutPaymentSchooling", this.data).subscribe((data => {
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
