import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { Officy } from 'app/interfaces/modelOfficy.interface';
import { data } from 'jquery';
import { DialogGeneralMessageComponent } from '../../general-message/general-message.component';


@Component({
  selector: 'app-banking-details',
  templateUrl: './banking-details.component.html',
  styleUrls: ['./banking-details.component.css']
})
export class BankingDetailsComponent implements OnInit {
  ca_accountType: any = [];
  ca_currency: any = [];

  data_land: any = {
    id: 0,
    idCatOffice: 0,
    accountType: null,
    accountHoldersName: '',
    bankName: '',
    accountNumber: null,
    clabe: '',
    routingNumber: '',
    swiftBicCode: '',
    iban: '',
    currency: null,
    wireFeeApprox: null,
    bankAddress: '',
    internationalPaymentAcceptance: false,
    comments: '',
    createdBy: 0,
    createdDate: new Date(),
    updatedBy: 0,
    updatedDate: new Date(),
  };


  __loader__: LoaderComponent = new LoaderComponent();
  user: any;
  constructor(public _services: ServiceGeneralService,
    public dialogRef: MatDialogRef<any>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_: any) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    console.log("Data recibida modal add/edit Bank ========================", this.data_)
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.viewOperacion()
    /*     if (this.data_.operacion != 'insertar') {
          this.data_land = this.data_.officeBankingDetailLists
        }
     */
    this.cargarMatOption()
  }
  async viewOperacion() {
    switch (this.data_.operacion) {
      case 'insertar':
        if (this.data_.id != 0) {
          this.data_land.idCatOffice = this.data_.id
        }
        break;
      case 'editar':
        this.data_land = this.data_.officeBankingDetailLists
    }
    console.log('officeBankingDetailLists', this.data_land);

  }
  async cargarMatOption() {
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.__loader__.hideLoader();

  }
  save_data() {
    if (this.data_.operacion == 'insertar') {
      this.insertDetail()
    } else {
      this.updateDetail()
    }
  }
  insertDetail() {
    const {
      accountType, accountHoldersName, bankName, accountNumber, clabe, routingNumber, swiftBicCode,
      iban, currency, wireFeeApprox, bankAddress, internationalPaymentAcceptance, comments
    } = this.data_land;

    this.data_land = {
      id: 0, idCatOffice: this.data_.id,
      accountType: accountType ?? null, accountHoldersName: accountHoldersName ?? "",
      bankName: bankName ?? "", accountNumber: accountNumber ?? null,
      clabe: clabe ?? "", routingNumber: routingNumber ?? "",
      swiftBicCode: swiftBicCode ?? "", iban: iban ?? "",
      currency: currency ?? null, wireFeeApprox: wireFeeApprox ?? null,
      bankAddress: bankAddress ?? "", internationalPaymentAcceptance: internationalPaymentAcceptance ?? false,
      comments: comments ?? "", createdBy: this.user.id, createdDate: new Date(), updatedBy: this.user.id,
      updatedDate: new Date()
    };
    console.log("DATA A GUARDAR (INSERT): ", this.data_land);
    if (this.data_.id != 0) {
      this._services.service_general_post_with_url("Catalog/AddOfficeBankingDetailList", this.data_land).subscribe(documentOffices => {
        console.log(documentOffices);
        this.viewMensajeComponente('save', 'Banking Details List was saved correctly')
        this.dialogRef.close(this.data_land);
      })
    } else {
      this.viewMensajeComponente('save', 'Banking Details List was saved correctly')
      this.dialogRef.close(this.data_land);
    }
  }
  updateDetail() {
    this.data_land.id = this.data_.id
    this.data_land.idCatOffice = this.data_.idCatOffice
    this.data_land.createdBy = this.user.id;
    this.data_land.createdDate = new Date();
    this.data_land.updatedBy = this.user.id;
    this.data_land.updatedDate = new Date();
    console.log("DATA A GUARDAR LAND LORD (ACTUALIZACION): ", this.data_land);
    if (this.data_.id != 0) {
      this._services.service_general_put("Catalog/EditOfficeBankingDetailList", this.data_land).subscribe(documentOffices => {
        console.log(documentOffices);
        this.viewMensajeComponente('edit', 'Banking Details List was edited correctly')
        this.dialogRef.close(this.data_land);
      })
    } else {
      this.viewMensajeComponente('edit', 'Banking Details List was edited correctly')
      this.dialogRef.close(this.data_land);
    }
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
