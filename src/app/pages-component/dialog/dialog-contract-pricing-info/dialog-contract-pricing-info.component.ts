import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsLeadClientComponent } from '../dialog-documents-lead-client/dialog-documents-lead-client.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-contract-pricing-info',
  templateUrl: './dialog-contract-pricing-info.component.html',
  styleUrls: ['./dialog-contract-pricing-info.component.scss']
})
export class DialogContractPricingInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogContractPricingInfoComponent>,
              public _services: ServiceGeneralService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public _dialog: MatDialog) { }

  minDate: Date = new Date();
  caCompanyType: any[] = [];
  caResponsiblePremierOffice: any[] = [];
  caLifeCircle: any[] = [];
  caSuccessProbability: any[] = [];
  caReferrelFee: any[] = [];
  caDuration: any[] = [];
  caPrecingSchedule: any[] = [];
  caDocumentType: any[] = [];

     //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;
	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  //*********************************************//
  ngOnInit(): void {
    this.consultaPermisos();
    console.log(this.data);
    if(this.data.documentGeneralContractPricingInfos){}else{
      this.data.documentGeneralContractPricingInfos = [];
    }
    this.data.idReferralFee = 1;
    this.catalogos();
  }

  caServiceLine:Array<any> = [];
  caReferralPaymentType:Array<any> = [];
  caServicePaymentRecurrence:Array<any> = [];
  caThirdPartyPaymentRecurrence:Array<any> = [];
  async catalogos(){
    this._services.service_general_get('Catalogue/GetReferralPaymentType').subscribe((r)=>{
      
      if(r.success){
        this.caReferralPaymentType = r.result.value;
      }
    });
    this._services.service_general_get('Catalogue/GetServiceLine').subscribe((r)=>{
      console.log("Catalogo",r);
      if(r.success){
        this.caServiceLine = r.result;

        if(this.data.relContractPricingInfoServiceLines.length > 0){
          this.data.idServiceLine = [];
          for (const iterator of this.data.relContractPricingInfoServiceLines) {
            this.data.idServiceLine.push(
              iterator.id
            );
          }
        }
      }
    });
    this._services.service_general_get('Catalogue/GetServicePaymentRecurrence').subscribe((r)=>{
      console.warn(r);
      if(r.success){
        this.caServicePaymentRecurrence = r.result.value;
      }
    });
    this._services.service_general_get('Catalogue/GetThirdPartyPaymentRecurrence').subscribe((r)=>{
      console.warn(r);
      if(r.success){
        this.caThirdPartyPaymentRecurrence = r.result.value;
      }
    });
    this.caCompanyType = await this._services.getCatalogueFrom('GetCompanyType');
    this.caResponsiblePremierOffice = await this._services.getCatalogueFrom('GetResponsiblePremierOffice');
    this.caLifeCircle = await this._services.getCatalogueFrom('GetLifeCircle');
    this.caSuccessProbability = await this._services.getCatalogueFrom('GetSuccessProbabilityRepository');
    this.caReferrelFee = await this._services.getCatalogueFrom('GetReferrelFee');
    this.caDuration = await this._services.getCatalogueFrom('GetCatPaymentRecurrence');
    // this.caDuration = await this._services.getCatalogueFrom('GetPaymentRecurrence');
    this.caPrecingSchedule = await this._services.getCatalogueFrom('GetPrecingSchedule');
    this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType/1');
  }

  changeModel()
  {
    console.log(this.data.idServiceLine)
    this.data.relContractPricingInfoServiceLines = [];
    for (const iterator of this.data.idServiceLine) {
      this.data.relContractPricingInfoServiceLines.push(
        {
          "id": 0,
          "idGeneralContractPricingInfo": 0,
          "idServiceLine": iterator
        }
      );
    }
  }

  getDocument(id){
    for (let i = 0; i < this.caDocumentType.length; i++) {
      const element = this.caDocumentType[i];
      if(id == element.id){
        return element.documentType;
      }
    }
  }
  getReferralFerr(id) {
    for (let i = 0; i < this.caReferrelFee.length; i++) {
      if(this.caReferrelFee[i].id == id){
        return this.caReferrelFee[i].referralFee1;
      }
    }
  }

  namepricing(){

    for (let i = 0; i < this.caPrecingSchedule.length; i++) {
      const element = this.caPrecingSchedule[i];
      if(this.data.idPricingSchedule == element.id){
        this.data.pricingSchedule1 = element.pricingSchedule1;
      }
    }
  }

  namepaymentRecurrence(){
    for (let i = 0; i < this.caDuration.length; i++) {
      const element = this.caDuration[i];
      if(this.data.idPaymentRecurrence == element.id){
        this.data.paymentRecurrence1 = element.name;
      }
    }
  }

  DialogDocumentsLeadClientComponent(data){
    if(data == null){
      data = {id: 0};
    }
    const dialogRef = this._dialog.open(DialogDocumentsLeadClientComponent, {
      data: data, width: '90%'
  });

  dialogRef.afterClosed().subscribe(result => {

     if(result.success){
       result.idGeneralContractPricingInfo = this.data.id;
       console.log(result);
       this.data.documentGeneralContractPricingInfos.push(result);
     }

  });
  }

  isValid:boolean = false;
      //*************************************************************//
  //VALIDACIONES//
  active_serviceLine:boolean = false;
  active_contractType:boolean = false;
  active_contractName:boolean = false;
  active_contractEffectiveDate:boolean = false;
  active_contractExpirationDate:boolean = false;
  active_idReferralFee :boolean = false;
  active_idReferralFeeType :boolean = false;
  active_idPricingSchedule :boolean = false;
  active_idPaymentRecurrence :boolean = false;
  active_IdServicePaymentRecurrence :boolean = false;
  active_IdThirdPartyPaymentRecurrence :boolean = false;
  active_description :boolean = false;
  active_referralFee :boolean = false;

  valida_form(){


    if(this.data.idServiceLine == undefined || this.data.idServiceLine.length == 0){
      this.active_serviceLine = true;
    }

    if(this.data.contractName == undefined || this.data.contractName.length == 0){
      this.active_contractName = true;
    }

    if(this.data.contractEffectiveDate == undefined || this.data.contractEffectiveDate.length == 0){
      this.active_contractEffectiveDate = true;
    }

    if(this.data.contractExpirationDate == undefined || this.data.contractExpirationDate.length == 0){
      this.active_contractExpirationDate = true;
    }

    if(this.data.idReferralFee == undefined || this.data.idReferralFee.length == 0){
      this.active_idReferralFee = true;
    }
    
    if(this.data.IdReferralPaymentType == undefined || this.data.IdReferralPaymentType.length == 0){
      this.active_idReferralFeeType = true;
    }

    if(this.data.idPricingSchedule  == undefined || this.data.idPricingSchedule .length == 0){
      this.active_idPricingSchedule = true;
    }


    if(this.data.idPaymentRecurrence == undefined || this.data.idPaymentRecurrence.length == 0){
      this.active_idPaymentRecurrence = true;
    }
    
    if(this.data.IdServicePaymentRecurrence == undefined || this.data.IdServicePaymentRecurrence.length == 0){
      this.active_IdServicePaymentRecurrence = true;
    }
   
    if(this.data.IdThirdPartyPaymentRecurrence == undefined || this.data.IdThirdPartyPaymentRecurrence.length == 0){
      this.active_IdThirdPartyPaymentRecurrence = true;
    }

    if(this.data.description == undefined || this.data.description.length == 0){
      this.active_description = true;
    }

    if(this.data.referralFee == undefined || this.data.referralFee.length == 0){
      this.active_referralFee = true;
    }


    if(this.validationForm())
    {
      
      this.isValid =true;
      // let referal = this.getReferralFerr(this.data.idReferralFee);
      // this.data['referralFee'] = referal;
      //console.log(referal);
      this.data.success = true;
      this.dialogRef.close(this.data);
    }else{
      console.log("Faltan datos");
      this.isValid =false;
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Error",
          body: "It is required to complete the missing information"
        },
        width: "350px"
      });

    }


  }

  validationForm()
  {
    if(this.data.contractEffectiveDate == undefined || this.data.contractEffectiveDate == null){
      return false
    }

    if(this.data.contractExpirationDate == undefined || this.data.contractExpirationDate == null){
      return false
    }

    if(this.data.idReferralFee == undefined || this.data.idReferralFee == null){
      return false
    }

    if(this.data.idPricingSchedule == undefined || this.data.idPricingSchedule == null){
      return false
    }

    if(this.data.idPaymentRecurrence == undefined || this.data.idPaymentRecurrence == null){
      return false
    }
    if(this.data.description == undefined || this.data.description == ''){
      return false
    }

    return true;
  }
  save() {
    console.log('data',this.data);

    this.valida_form();




  }

}
