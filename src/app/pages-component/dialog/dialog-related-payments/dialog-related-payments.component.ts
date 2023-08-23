import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-related-payments',
  templateUrl: './dialog-related-payments.component.html',
  styleUrls: ['./dialog-related-payments.component.css']
})
export class DialogRelatedPaymentsComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  paymentRentalFurniture: any = {};

  ca_responsible: any;
  ca_currency: any;

  valid_descripcion: boolean = false;
  valid_responsible: boolean = false;
  valid_amount: boolean = false;
  valid_currency: boolean = false;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }
  ngOnInit(): void {
    console.log("DATA RECIBIDA:", this.data)
    this.paymentRentalFurniture = this.data.param == '' ? {
      id: 0,
      description: '',
      responsible: null,
      amount: null,
      currency: null

    } : this.data.param
    this.ListMatSelect()
  }
  async ListMatSelect() {
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    console.log('ca_responsible', this.ca_responsible);
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    console.log('ca_currency', this.ca_currency);
  }
  saveRelatedPayments() {
    const validations = [
      { field: 'description', valid: this.paymentRentalFurniture.description === '', flag: 'valid_descripcion' },
      { field: 'responsible', valid: this.paymentRentalFurniture.responsible === null, flag: 'valid_responsible' },
      { field: 'amount', valid: this.paymentRentalFurniture.amount === null, flag: 'valid_amount' },
      { field: 'currency', valid: this.paymentRentalFurniture.currency === null, flag: 'valid_currency' }
    ];

    validations.forEach(validation => {
      if (validation.valid) {
        this[validation.flag] = true;
      }
    });

    const isValid = validations.every(validation => !validation.valid);
    if (isValid) {
      this.__loader__.showLoader()
      if (this.paymentRentalFurniture.id > 0) {
        console.log('puedes actualizar');
        this.updaterRelatedFornitura();
      } else {
        console.log('puede crea');
        this.saveRelatedFornitura();
      }
    }
  }
  updaterRelatedFornitura(){
    console.log('this.paymentRentalFurniture', this.paymentRentalFurniture);
    const urlSavePaymentRentalFurniture = 'HousingList/PutPaymentRental';
    this._services.service_general_put(urlSavePaymentRentalFurniture, this.paymentRentalFurniture).subscribe((responseSavePaymentRentalFurniture) => {
      console.log('responseSavePaymentRentalFurniture', responseSavePaymentRentalFurniture);
      if(responseSavePaymentRentalFurniture.success){
        this.viewMensajeComponente('Payment Type','Updated successfully')
        this.__loader__.hideLoader()
        this.closeModal(responseSavePaymentRentalFurniture);
      }
    })
  }
  saveRelatedFornitura(){
    const newData ={
      id: this.paymentRentalFurniture.id,
      idRentalFurniture:  this.data.idRelated,
      responsible: this.paymentRentalFurniture.responsible,
      description: this.paymentRentalFurniture.description,
      currency: this.paymentRentalFurniture.currency,
      amount: this.paymentRentalFurniture.amount,
    }
    console.log('this.paymentRentalFurniture', newData);
    const urlSavePaymentRentalFurniture = 'HousingList/PostPaymentRental';
    this._services.service_general_post_with_url(urlSavePaymentRentalFurniture, newData).subscribe((responseSavePaymentRentalFurniture) => {
      console.log('responseSavePaymentRentalFurniture', responseSavePaymentRentalFurniture);
      if(responseSavePaymentRentalFurniture.success){
        this.viewMensajeComponente('Payment Type','Saved successfully')
        this.__loader__.hideLoader()
        this.closeModal(responseSavePaymentRentalFurniture);
      }
    })
  }
  viewMensajeComponente(header: string, msg: string) {
    window.scrollTo(0, 0);
    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: header,
        body: msg
      },
      width: "350px"
    });
  }
  closeModal(data) {
    this.dialogRef.close(data)
  }
}
