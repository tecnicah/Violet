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

  accountCategory: any[] = [];
  data:any = {};
  ca_countType:any[]=[];
  ca_currency:any[]=[];

  constructor(public _services: ServiceGeneralService,  public _dialog:MatDialog,public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public datas: any) { }

  async ngOnInit() {
    console.log("INFORMACION DE RECEPCION: ", this.datas);
    if(this.datas != null){
      this.data = this.datas;
    }
    this.ca_countType    = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_currency   = await this._services.getCatalogueFrom('GetCurrency');
    this.getSelectOption();
  }

  save(){
    this.data.accountNumber = Number(this.data.accountNumber);
    this.data.routingNumber = Number(this.data.routingNumber);
    this.data.wireFeeApprox = Number(this.data.wireFeeApprox);
    
    this.data.success = true;
    console.log("esta es la data que se enviara: ", this.data);
    this.dialogRef.close(this.data);
  }

  valid_accountCategory: boolean = false;  
  changeAccountCategory() {
    this.valid_accountCategory = false
    console.log(this.accountCategory);
    console.log('crear');
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

  public contador = 0;
  public activeaccountNameBeneficiary : boolean = false;
  public activeAccountHolders : boolean = false;
  public activeBankName : boolean = false;
  public activeAccountNumber : boolean = false;
  public activeRoutingNumber : boolean = false;
  public activeSwift : boolean = false;
  public activeCurrency : boolean = false;
  public activeWireFee : boolean  = false;
  public activeBankAdress : boolean  = false;
  public activeInternational : boolean  = false;
  public activeComments : boolean  = false;
  validForm(){
    this.contador = 0;
     if(this.data.accountNameBeneficiary == '' || this.data.accountNameBeneficiary == null || this.data.accountNameBeneficiary == undefined){
       this.activeaccountNameBeneficiary = true;
       this.contador++;
     }
    //  if(this.data.accountHoldersName == '' || this.data.accountHoldersName == null || this.data.accountHoldersName == undefined){
    //    this.activeAccountHolders = true;
    //    this.contador++;
    // }
    // if(this.data.bankName == '' || this.data.bankName == null || this.data.bankName == undefined){
    //    this.activeBankName = true;
    //    this.contador++;
    // }
    // if(this.data.accountNumber == '' || this.data.accountNumber == null || this.data.accountNumber == undefined){
    //    this.activeAccountNumber = true;
    //    this.contador++;
    // }
    // if(this.data.routingNumber == '' || this.data.routingNumber == null || this.data.routingNumber == undefined){
    //    this.activeRoutingNumber = true;
    //    this.contador++;
    // }
    // if(this.data.swiftBicCode == '' || this.data.swiftBicCode == null || this.data.swiftBicCode == undefined){
    //    this.activeSwift = true;
    //    this.contador++;
    // }
    // if(this.data.currency == '' && this.data.currency == null && this.data.currency == undefined){
    //   this.activeCurrency = true;
    //   this.contador++;
    // }
    // if(this.data.wireFeeApprox == '' || this.data.wireFeeApprox == null || this.data.wireFeeApprox == undefined){
    //   this.activeWireFee = true;
    //   this.contador++;
    // }
    // if(this.data.bankAddress == '' || this.data.bankAddress == null || this.data.bankAddress == undefined){
    //   this.activeBankAdress = true;
    //   this.contador++;
    // }
    // if(this.data.internationalPaymentAcceptance == '' || this.data.internationalPaymentAcceptance == null || this.data.internationalPaymentAcceptance == undefined){
    //   this.activeInternational = true;
    //   this.contador++;
    // }
    // if(this.data.comments == '' || this.data.comments == null || this.data.comments == undefined){
    //   this.activeComments = true;
    //   this.contador++;
    // }
    if(this.contador == 0){
      this.save();
    }else{
      let msg = '';
          msg = "It is necessary to fill all information requested";
     
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: msg
        },
        width: "350px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })
    } 
  }
}
