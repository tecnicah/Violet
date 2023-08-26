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
  valid_accountCategory: boolean = false;
  data_land: any = {
    id: 0,
    idCatOffice: 0,
    accountNameBeneficiary: "",
    taxId: "",
    accountNumberBeneficiary: null,
    idCurrency: null,
    idAccountType: null,
    bankNameBeneficiary: "",
    bankAddressBeneficiary: "",
    bankBranch: "",
    bankPhone: "",
    clabe: null,
    iban: null,
    swiftBeneficiary: null,
    w8W9: false,
    adiitionalInstruccion: "",
    wireFeeApprox: null,
    internationalPaymentAcceptance: false,
    bankNameIntermediary: "",
    bankAddressIntermediary: "",
    swiftIntermediary: "",
    accountNumberIntermediary: "",
    accountNameIntermediary: "",
    createdBy: 0,
    createdDate: new Date(),
    updatedBy: 0,
    updatedDate: new Date(),
    relBankingDetailTypeOfficeBankingDetails: [] = []
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
    this.viewOperacion();
    console.log(this.accountCategory);

    this.cargarMatOption()
  }
  accountCategory: number[] = []

  async viewOperacion() {
    switch (this.data_.operacion) {
      case 'insertar':
        if (this.data_.id != 0) {
          this.data_land.idCatOffice = this.data_.id
        }
        break;
      case 'editar':
        this.data_land = this.data_.officeBankingDetailLists
        let hola = this.data_land.relBankingDetailTypeOfficeBankingDetails.map(ele => {
          return ele.idCatBankingDetailType
        })
        this.accountCategory = hola
    }
    console.log('officeBankingDetailLists', this.data_land);

  }
  ca_accountCat: any

  async cargarMatOption() {
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this._services.getService('GetBankingDetailType').subscribe(ele => {
      this.ca_accountCat = ele.result.value
    })
    this.__loader__.hideLoader();

  }
  selectAccountCategory() {
    if (this.accountCategory == undefined || this.accountCategory.length <= 0) {
      this.valid_accountCategory = true
    } else {
      this.valid_accountCategory = false
    }
  }
  save_data() {
    if (this.data_.operacion == 'insertar') {
      this.insertDetail()
    } else {
      this.updateDetail()
    }
  }
  insertDetail() {

    const { accountNameBeneficiary, taxId, accountNumberBeneficiary, idCurrency,
      idAccountType, bankNameBeneficiary, bankAddressBeneficiary, bankBranch,
      bankPhone, clabe, iban, swiftBeneficiary, w8W9, adiitionalInstruccion,
      wireFeeApprox, internationalPaymentAcceptance, bankNameIntermediary,
      bankAddressIntermediary, swiftIntermediary, accountNumberIntermediary,
      accountNameIntermediary } = this.data_land
    this.data_land = {
      id: 0, idCatOffice: this.data_.id, accountNameBeneficiary: accountNameBeneficiary ?? '', taxId: taxId ?? '',
      accountNumberBeneficiary: accountNumberBeneficiary ?? null, idCurrency: idCurrency ?? null,
      idAccountType: idAccountType ?? null, bankNameBeneficiary: bankNameBeneficiary ?? '',
      bankAddressBeneficiary: bankAddressBeneficiary ?? '', bankBranch: bankBranch ?? '',
      bankPhone: bankPhone ?? '', clabe: clabe ?? null, iban: iban ?? null, swiftBeneficiary: swiftBeneficiary ?? null,
      w8W9: w8W9 ?? false, adiitionalInstruccion: adiitionalInstruccion ?? '', wireFeeApprox: wireFeeApprox ?? null,
      internationalPaymentAcceptance: internationalPaymentAcceptance ?? false, bankNameIntermediary: bankNameIntermediary ?? '',
      bankAddressIntermediary: bankAddressIntermediary ?? '', swiftIntermediary: swiftIntermediary ?? '',
      accountNumberIntermediary: accountNumberIntermediary ?? '', accountNameIntermediary: accountNameIntermediary ?? '',
      createdBy: this.user.id,
      createdDate: new Date(), updatedBy: this.user.id, updatedDate: new Date()
    }
    console.log("DATA A GUARDAR (INSERT): ", this.data_land);
    console.log(this.accountCategory);
    if (this.accountCategory == undefined || this.accountCategory.length <= 0) {
      this.valid_accountCategory = true
    } else {
      this.valid_accountCategory = false
      if (this.data_.id != 0) {
        this.data_land.relBankingDetailTypeOfficeBankingDetails = []
        this.accountCategory.forEach(ele => {
          this.data_land.relBankingDetailTypeOfficeBankingDetails.push({
            id: 0,
            idCatBankingDetailType: ele,
            idOfficeBankingDetailList: 0
          })
        })
        console.log("data general : ", this.data_land);
        console.log("data de account:", this.accountCategory);
        this._services.service_general_post_with_url("Catalog/AddOfficeBankingDetailList", this.data_land).subscribe(documentOffices => {
          console.log(documentOffices);
          this.viewMensajeComponente('save', 'Banking Details List was saved correctly')
          this.dialogRef.close(this.data_land);
        })
      } else {
        this.data_land.relBankingDetailTypeOfficeBankingDetails = []
        this.accountCategory.forEach(ele => {
          this.data_land.relBankingDetailTypeOfficeBankingDetails.push({
            id: 0,
            idCatBankingDetailType: ele,
            idOfficeBankingDetailList: 0
          })
        })
        console.log("data general : ", this.data_land);
        console.log("data de account:", this.accountCategory);
        this.viewMensajeComponente('save', 'Banking Details List was saved correctly')
        this.dialogRef.close(this.data_land);
      }
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
    if (this.accountCategory == undefined || this.accountCategory.length <= 0) {
      this.valid_accountCategory = true
    } else {
      this.valid_accountCategory = false
      if (this.data_.id != 0) {
        this.data_land.relBankingDetailTypeOfficeBankingDetails = []
        this.accountCategory.forEach(ele => {
          this.data_land.relBankingDetailTypeOfficeBankingDetails.push({
            id: 0,
            idCatBankingDetailType: ele,
            idOfficeBankingDetailList: this.data_land.id
          })
        })
        console.log("data general : ", JSON.stringify(this.data_land));
        console.log("data de account:", this.accountCategory);
        this._services.service_general_put("Catalog/EditOfficeBankingDetailList", this.data_land).subscribe(documentOffices => {
          console.log(documentOffices);
          this.viewMensajeComponente('edit', 'Banking Details List was edited correctly')
          this.dialogRef.close(this.data_land);
        })
      } else {
        this.data_land.relBankingDetailTypeOfficeBankingDetails = []
        this.accountCategory.forEach(ele => {
          this.data_land.relBankingDetailTypeOfficeBankingDetails.push({
            id: 0,
            idCatBankingDetailType: ele,
            idOfficeBankingDetailList: 0
          })
        })
        console.log("data general : ", this.data_land);
        console.log("data de account:", this.accountCategory);
        this.viewMensajeComponente('edit', 'Banking Details List was edited correctly')
        this.dialogRef.close(this.data_land);
      }
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
