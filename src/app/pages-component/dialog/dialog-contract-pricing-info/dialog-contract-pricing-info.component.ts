import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsLeadClientComponent } from '../dialog-documents-lead-client/dialog-documents-lead-client.component';

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
    this.catalogos();
  }

  async catalogos(){
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

  save() {
    let referal = this.getReferralFerr(this.data.idReferralFee);
    this.data['referralFee'] = referal;
    console.log(referal);
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
