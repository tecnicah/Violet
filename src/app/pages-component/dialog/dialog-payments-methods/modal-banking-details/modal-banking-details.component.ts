import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../../general-message/general-message.component';

@Component({
  selector: 'app-modal-banking-details',
  templateUrl: './modal-banking-details.component.html',
  styleUrls: ['./modal-banking-details.component.css']
})
export class ModalBankingDetailsComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();
  ca_accountType: any = [];
  ca_currency: any = [];
  paymentMethod: any = {};
  idPaymentMethod: number = 0;
  itemPaymentMethod: any = {};
  id = 0
  valid_bank: boolean = false;
  valid_acountType: boolean = false;
  valid_acountHolder: boolean = false;
  valid_acountNumber: boolean = false;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    console.log("DATA RECIBIDA:", this.data)
    this.itemPaymentMethod = this.data.itemPaymentMethod
    this.idPaymentMethod = this.data.idPaymentMethod
    this.id = this.data.id
    if (this.itemPaymentMethod) {
      this.paymentMethod = this.itemPaymentMethod;
    }
    else {

      this.paymentMethod = {
        accountHoldersName: '',
        accountNumber: '',
        accountType: null,
        bankAddress: '',
        bankName: '',
        clabetype: '',
        comment: '',
        currency: null,
        iban: '',
        id: 0,
        internationalPayment: false,
        paymnetMethodGeneralId: null,
        routingNumber: '',
        swiftBicCode: '',
        wireFree: null
      };
    }
    this.getListMatSelect()
  }
  async getListMatSelect() {
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    console.log('ca_accountType', this.ca_accountType);
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    console.log('ca_currency', this.ca_currency);
    this.__loader__.hideLoader()
  }
  addOrEditBankingDetails() {
    console.log('hola');

    const requiredFields = [
      { field: this.paymentMethod.bankName, valid: 'valid_bank' },
      { field: this.paymentMethod.accountType, valid: 'valid_acountType' },
      { field: this.paymentMethod.accountHoldersName, valid: 'valid_acountHolder' },
      { field: this.paymentMethod.accountNumber, valid: 'valid_acountNumber' },
    ];
    for (const fieldObj of requiredFields) {
      if (fieldObj.field === null || fieldObj.field === undefined || fieldObj.field == "") {
        this[fieldObj.valid] = true;
      } else {
        this[fieldObj.valid] = false;
      }
    }
    const canContinue = requiredFields.every(fieldObj => !this[fieldObj.valid]);
    if (canContinue) {
      this.__loader__.showLoader()
      this.SaveOfUpdate()
      console.log('Se puede continuar');
    }

  }
  SaveOfUpdate() {
    const newData = {
      "id": this.idPaymentMethod <= 0 ? this.idPaymentMethod : this.paymentMethod.id,
      "bankName": this.paymentMethod.bankName,
      "accountType": this.paymentMethod.accountType,
      "accountHoldersName": this.paymentMethod.accountHoldersName,
      "accountNumber": this.paymentMethod.accountNumber,
      "clabetype": this.paymentMethod.clabetype,
      "routingNumber": this.paymentMethod.routingNumber,
      "swiftBicCode": this.paymentMethod.swiftBicCode,
      "currency": this.paymentMethod.currency,
      "wireFree": this.paymentMethod.wireFree,
      "bankAddress": this.paymentMethod.bankAddress,
      "internationalPayment": this.paymentMethod.internationalPayment,
      "comment": this.paymentMethod.comment,
      "paymnetMethodGeneralId": this.id,
      "iban": this.paymentMethod.iban,
    }
    console.log('newData', newData);
    this.paymentMethod = newData;
    this._services.service_general_post_with_url('RelocationServices/AddEditBankingDetail', this.paymentMethod).subscribe(responseAddEditBankingDetail => {
      console.log('responseAddEditBankingDetail', responseAddEditBankingDetail);
      if (responseAddEditBankingDetail.success) {
        let texto = this.idPaymentMethod <= 0 ? 'Saved successfully' : 'Updated successfully'
        this.viewMensajeComponente('Banking Details', texto);
        this.__loader__.hideLoader()
        this.closeModal(responseAddEditBankingDetail.result);
        // this.dataPaymentMethods = responsePaymentMethod.res_ ?? []
      } else {
        this.viewMensajeComponente('Failed', 'please try again later')
      }
    })
  }
  closeModal(data) {
    this.dialogRef.close(data)
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
}
