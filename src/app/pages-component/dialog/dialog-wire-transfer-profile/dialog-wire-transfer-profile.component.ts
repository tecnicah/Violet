import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-wire-transfer-profile',
  templateUrl: './dialog-wire-transfer-profile.component.html',
  styleUrls: ['./dialog-wire-transfer-profile.component.css']
})
export class DialogWireTransferProfileComponent implements OnInit {

  accountCategory: any[] = [];
  data: any = {};
  ca_countType: any[] = [];
  ca_currency: any[] = [];
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public datas: any) { }

  async ngOnInit() {
    console.log("INFORMACION DE RECEPCION: ", this.datas);
    if (this.datas != null) {
      this.data = this.datas;
      console.log(this.data);
      let office = this.data.officeBankingDetailLists[0]
      let resul = office.relBankingDetailTypeOfficeBankingDetails.map(ele => {
        return ele.idCatBankingDetailType
      })
      this.accountCategory = resul
    }
    this.ca_countType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.getSelectOption();

  }

  save() {
    this.data.accountNumber = Number(this.data.accountNumber);
    this.data.routingNumber = Number(this.data.routingNumber);
    this.data.wireFeeApprox = Number(this.data.wireFeeApprox);

    let lista = this.accountCategory.map(select => {
      return {
        id: 0,
        idCatBankingDetailType: select,
        idOfficeBankingDetailList: 0
      }
    })
    console.log(lista);
    this.data.officeBankingDetailLists = [{ relBankingDetailTypeOfficeBankingDetails: lista }]
    console.log(this.data.officeBankingDetailLists);

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


    /* if (variablesAValidar.every(valid => !valid) && !this.valid_accountCategory) {

      // this.save();
    } else {
      console.log('salio');

    } */

  }

}
