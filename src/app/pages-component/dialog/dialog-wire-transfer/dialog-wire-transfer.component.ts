import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-wire-transfer',
  templateUrl: './dialog-wire-transfer.component.html',
  styleUrls: ['./dialog-wire-transfer.component.css']
})
export class DialogWireTransferComponent implements OnInit {
  user: any;

  accountCategory: any[] = [];
  data: any = {};
  ca_countType: any[] = [];
  ca_currency: any[] = [];
  indentificador: string = ''
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public datas: any) { }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("INFORMACION DE RECEPCION: ", this.datas);
    this.indentificador = this.datas.component
    console.log('indentificador: ', this.indentificador);

    this.data = { ...this.datas.data }
    console.log(this.data);
    this.getSelectOption();
    if (this.datas.data != null) {
      this.data = { ...this.datas.data }
      console.log("data", this.data);
      /* let resul = this.data?.relBankingDetailTypeWireTransferPaymentInformationSuppliers?.map(ele => {
        return ele.idCatBankingDetailType
      }) */
      let indentificador = this.ComponentParameter()
      let resul = indentificador?.map(ele => {
        return ele.idCatBankingDetailType
      })
      this.accountCategory = resul
    }
    this.ca_countType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
  }
  ComponentParameter() {
    let param: any
    switch (this.indentificador) {
      case 'supplier-service':
        param = this.data?.relBankingDetailTypeWireTransferServices
        break;
      case 'partner_client':
        param = this.data?.relBankingDetailTypeWireTransferPaymentInformationSuppliers
        break;
      default:
        // param = this.data?.relBankingDetailTypeWireTransferPaymentInformationSuppliers
        break;
    }
    return param
  }
  IdWireTransferPaymentInformationOfficeSupplier: any
  save() {
    console.log(this.data.accountNumber);
    this.data.accountNameBeneficiary = this.data.accountNameBeneficiary
    this.data.accountNameIntermediary = this.data.accountNameIntermediary
    this.data.accountNumberBeneficiary = this.data.accountNumberBeneficiary//number
    this.data.accountNumberIntermediary = this.data.accountNumberIntermediary
    this.data.adiitionalInstruccion = this.data.adiitionalInstruccion
    this.data.bankAddressBeneficiary = this.data.bankAddressBeneficiary
    this.data.bankAddressIntermediary = this.data.bankAddressIntermediary
    this.data.bankBranch = this.data.bankBranch
    this.data.bankNameBeneficiary = this.data.bankNameBeneficiary
    this.data.bankNameIntermediary = this.data.bankNameIntermediary
    this.data.bankPhone = this.data.bankPhone
    this.data.clabe = this.data.clabe//number
    this.data.bankPhone = this.data.bankPhone
    this.data.bankPhone = this.data.bankPhone
    this.data.bankPhone = this.data.bankPhone
    this.data.createdBy = this.user.id
    this.data.createdDate = new Date()
    this.data.iban = this.data.iban //number
    this.data.id = this.data.id == undefined ? 0 : this.data.id
    this.data.idAccountType = this.data.idAccountType //number
    this.data.idCurrency = this.data.idCurrency
    this.data.internationalPaymentAcceptance = this.data.internationalPaymentAcceptance
    this.data.swiftBeneficiary = this.data.swiftBeneficiary
    this.data.swiftIntermediary = this.data.swiftIntermediary
    this.data.taxId = this.data.taxId
    this.data.updatedBy = this.user.id
    this.data.updatedDate = new Date()
    this.data.w8W9 = this.data.w8W9
    //aparte
    this.data.accountNumber = Number(this.data.accountNumber);
    this.data.routingNumber = Number(this.data.routingNumber);
    this.data.wireFeeApprox = Number(this.data.wireFeeApprox);
    //anterior this.data.relBankingDetailTypeWireTransferPaymentInformationSuppliers = []
    let indentificador = this.ComponentParameter()
    indentificador = []

    console.log(this.data);
    let lista: any
    if (this.indentificador == 'supplier-service') {
      lista = this.accountCategory.map(select => {
        return {
          id: 0,
          idCatBankingDetailType: select,
          idWireTransferService: this.datas == null ? 0 : this.data.id
        }
      })
      this.data.relBankingDetailTypeWireTransferServices = lista
    }
    else if (this.indentificador == 'partner_client') {
      lista = this.accountCategory.map(select => {
        return {
          id: 0,
          idCatBankingDetailType: select,
          idWireTransferPaymentInformationOfficeSupplier: this.datas == null ? 0 : this.data.id
        }
      })
      this.data.relBankingDetailTypeWireTransferPaymentInformationSuppliers = lista
    }
    /*anterior let lista = this.accountCategory.map(select => {
      return {
        id: 0,
        idCatBankingDetailType: select,
        IdWireTransferPaymentInformationOfficeSupplier: this.datas == null ? 0 : this.data.id
      }
    }) */

    console.log(lista);

    //anterior this.data.relBankingDetailTypeWireTransferPaymentInformationSuppliers = lista

    console.log(this.data);

    this.data.success = true;
    console.log("esta es la data que se enviara: ", this.data);
    this.dialogRef.close(this.data);
  }

  valid_accountCategory: boolean = false;
  changeAccountCategory() {
    console.log(this.accountCategory);
    console.log('crear');
    if (this.accountCategory == undefined || this.accountCategory.length <= 0) {
      this.valid_accountCategory = true
    } else {
      this.valid_accountCategory = false

    }
  }

  ca_accountType = [];
  ca_accountCat: any
  async getSelectOption() {
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this._services.getService('GetBankingDetailType').subscribe(ele => {
      console.log(ele);
      this.ca_accountCat = ele.result.value
    })

  }
  isValid(value: any): boolean {
    return value === null || value === undefined || value === '';
  }
  valid_accountName: boolean = false;
  valid_taxId: boolean = false;
  valid_accountNumberBeneficiary: boolean = false;
  valid_idCurrency: boolean = false;
  valid_idAccountType: boolean = false;
  valid_bankNameBeneficiary: boolean = false;
  validForm() {
    if (this.accountCategory == undefined || this.accountCategory.length <= 0) {
      this.valid_accountCategory = true
    } else {
      this.valid_accountCategory = false
    }
    const { accountNameBeneficiary, taxId, accountNumberBeneficiary, idCurrency
      , idAccountType, bankNameBeneficiary } = this.data

    if (this.accountCategory.includes(1)) {
      this.valid_accountName = this.isValid(accountNameBeneficiary);
      this.valid_taxId = this.isValid(taxId);
      this.valid_accountNumberBeneficiary = this.isValid(accountNumberBeneficiary);
      this.valid_idCurrency = this.isValid(idCurrency);
      this.valid_idAccountType = this.isValid(idAccountType);
      this.valid_bankNameBeneficiary = this.isValid(bankNameBeneficiary);
      const variablesAValidar = [this.valid_accountName, this.valid_taxId, this.valid_accountNumberBeneficiary,
      this.valid_idCurrency, this.valid_idAccountType, this.valid_bankNameBeneficiary];

      if (variablesAValidar.every(valid => !valid) && !this.valid_accountCategory) {
        console.log('entro');
        this.save();

      } else {
        console.log('salio 1');

      }
    }
    else {
      this.valid_accountName = false
      this.valid_taxId = false
      this.valid_accountNumberBeneficiary = false
      this.valid_idCurrency = false
      this.valid_idAccountType = false
      this.valid_bankNameBeneficiary = false
      if (!this.valid_accountCategory) {
        this.save();
        console.log('inter');
      }

    }
  }
}
