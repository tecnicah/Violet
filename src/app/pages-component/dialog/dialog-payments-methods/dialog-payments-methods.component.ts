import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { ModalBankingDetailsComponent } from './modal-banking-details/modal-banking-details.component';

@Component({
  selector: 'app-dialog-payments-methods',
  templateUrl: './dialog-payments-methods.component.html',
  styleUrls: ['./dialog-payments-methods.component.css']
})
export class DialogPaymentsMethodsComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  dataPaymentMethods: any = {};
  wosId: any
  listBankingDetails: any = [];
  @ViewChild('relatedPaginator') relatedPaginator: MatPaginator;
  payment: string[] = ['banck', 'acount', 'name', 'view'];

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    console.log("DATA RECIBIDA:", this.data)
    this.wosId = this.data.wosId
    this.paymentMethodsList()


  }
  paymentMethodsList() {
    const urlPaymentsMethods = 'RelocationServices/GetPaymentMethodGeneralByWosId?wos_id=' + this.wosId
    this._services.service_general_get(urlPaymentsMethods).subscribe(responsePaymentsMethods => {
      console.log('responsePaymentsMethods', responsePaymentsMethods);

      if (responsePaymentsMethods.success) {
        this.dataPaymentMethods = responsePaymentsMethods.res_ ?? {}
        console.log(this.dataPaymentMethods);
        this.getListBankingDetails({ checked: this.dataPaymentMethods.wireTransfer } as MatSlideToggleChange);
        if (!this.dataPaymentMethods.wireTransfer) this.__loader__.hideLoader();
      }
    })

  }
  getListBankingDetails(event: MatSlideToggleChange) {
    console.log('this.dataPaymentMethods.wireTransfer', this.dataPaymentMethods.wireTransfer);
    console.log(event.checked);
    if (event.checked && this.dataPaymentMethods.wireTransfer) {
      const urlBankingDetails = 'RelocationServices/GetBankingDetailByWosIdList?wos_id=' + this.wosId
      this._services.service_general_get(urlBankingDetails).subscribe(responseBankingDetails => {
        console.log('responseBankingDetails', responseBankingDetails);
        if (responseBankingDetails.success) {
          let datosTablaPayment = responseBankingDetails.res_ ?? []
          this.listBankingDetails = new MatTableDataSource(datosTablaPayment)
          console.log(datosTablaPayment);
          console.log(this.listBankingDetails);
          this.listBankingDetails.paginator = this.relatedPaginator;
          this.listBankingDetails.paginator.length = datosTablaPayment.length
          console.log('table Paymnet', this.listBankingDetails);

          this.__loader__.hideLoader()
        }
      })
    }
  }
  savePaymentMethods() {
    this.__loader__.showLoader()
    const data = {
      "payToOrderOf": this.dataPaymentMethods.payToOrderOf,
      "id": this.dataPaymentMethods.id <= 0 ? 0 : this.dataPaymentMethods.id,
      "fiscalInvoice": this.dataPaymentMethods.fiscalInvoice,
      "wireTransfer": this.dataPaymentMethods.wireTransfer,
      "checks": this.dataPaymentMethods.checks,
      "cash": this.dataPaymentMethods.cash,
      "wosId": this.wosId,
      "creditCard": this.dataPaymentMethods.creditCard,
    }
    const urlPaymentsMethods = 'RelocationServices/AddEditPaymentMethodGeneral'
    this._services.service_general_post_with_url(urlPaymentsMethods, data).subscribe(responsePaymentMethod => {
      console.log('responsePaymentMethod', responsePaymentMethod);
      if (responsePaymentMethod.success) {
        const message = this.dataPaymentMethods.id <= 0 ? "Saved successfully" : "Updated successfully";
        this.viewMensajeComponente('Banking Details', message)
        this.__loader__.hideLoader()
      }
      this.__loader__.hideLoader()

    })
  }
  dialogBackDetails(idPaymentMethod, itemPaymentMethod) {
    const dialogRef = this._dialog.open(ModalBankingDetailsComponent, {
      data: {
        idPaymentMethod: idPaymentMethod,
        itemPaymentMethod: itemPaymentMethod,
        id: this.dataPaymentMethods.id,
      },
      width:'70%'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true || result == undefined) return;
      this.ngOnInit()
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
}
