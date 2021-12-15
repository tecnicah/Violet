import { DialogGeneralMessageComponent } from 'app/pages-component/dialog/general-message/general-message.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsLeadClientComponent } from '../dialog-documents-lead-client/dialog-documents-lead-client.component';
import { DialogDocumentsAdminCenterServicesComponent } from '../dialog-documents-admin-center-services/dialog-documents-admin-center-services.component';


@Component({
  selector: 'app-scopeservicesall',
  templateUrl: './scopeservicesall.component.html',
  styleUrls: ['./scopeservicesall.component.css']
})
export class ScopeservicesallComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ScopeservicesallComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }


  public dataScopeDocument: any[] = [];
  public documentsColum: string[] = ['Document', 'Uploaded', 'Status', 'Privacy'];
  public ca_document: any[] = [];
  public caStatus = [];
  public caPrivacy = [];
  public dataScopeDescription = [];
  public GetService: any[] = [];
  public getDataCountryScopeDoc: any[] = [];
  public tempScopeDescription : string = "";
  // public tempScopeDocument: documentLocationCountriesModel = new documentLocationCountriesModel;
  public tempScopeDocument: any[] = [];

  public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;



  ngOnInit(): void {
    console.log('data que recibe apply all scope', this.data );
    this.consultaPermisos();
    this.catalogo();
    this.getCountryApplyScope();
  }


  public caDocumentStatus = [];
  async catalogo(){
    this.caDocumentStatus = await this._services.getCatalogueFrom('GetDocumentStatus');
    this.caPrivacy = await this._services.getCatalogueFrom('GetPrivacy');
  }
  //**************** P E R M I S O S *************************//
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


  //**************** C O U N T R Y  S C O P E ****************//
  //trae los countries que tienen scope documents local para aplicar scope doc.
  getCountryApplyScope(){
    this._services.service_general_get(`Catalogue/Country-Service-Location/All/${this.data.id}`).subscribe((data => {
      if (data.result) {
        this.getDataCountryScopeDoc = data.result.value;
        console.log('getDataCountryScopeDoc', this.getDataCountryScopeDoc);
        this.serviceLocationCountry();
      }
    }));
  }


  //**************** Q U I T A R  C O U N T R Y ****************//
  // Extrae de la data solo los paises que se les aplicara scope
  serviceLocationCountry(){
    let tempServiceLocation: any;
    let countryPush = [];
    tempServiceLocation = this.data;
    tempServiceLocation.serviceCountries.forEach(countryData => {
          countryPush.push(countryData.namec);
    });
    this.data.serviceLocationCountries = [];
    this.data.serviceLocationCountries = tempServiceLocation.serviceCountries;
    this.getDataCountryScopeDoc = countryPush;
    console.log('country scope', this.data);
  }

  //**************** A D D   D O C U M E N T S ****************//
  DialogDocumentsLeadClientComponent(data){
    if(data == null){
      data = {id: 0};
    }

    data.status = true;
    const dialogRef = this._dialog.open(DialogDocumentsAdminCenterServicesComponent, {
      data: data, width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if(result.success){
          result.id = 0;
          result.serviceCountry = this.data.id;
          result.updatedBy= userData.id;
          result.updatedDate= new Date();
          result.documentType = result.idDocumentType;
          result.filePath = result.fileRequest;
          console.log(result);
          this.tempScopeDocument.push(result);
          //this.data.documentServiceCountries.push(result);
        }
        /*
        result.id = 0
        result.idServiceLocationCountry = this.data.id;
        result.updateDate = new Date();
        console.log(result);
        this.tempScopeDocument.push(result);
        */
      }
    });
  }


  //**************** V A L I D A R   D A T A ****************//
  active_description: boolean = false;
  active_document: boolean = false;
  validarForm(){
    if (this.tempScopeDescription == undefined || this.tempScopeDescription =='') {
      this.active_description = true;
    }
    else{
      this.active_description = false;
    }
    /*
    if((this.tempScopeDocument == undefined || this.tempScopeDocument.length == 0 )){
      this.active_document = true;
    }
    else{
      this.active_document = false;
    }
    */
    if(this.active_description != true && this.active_document != true){
      this.save();
    }
    else{
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: 'Atention',
          body: 'Add Scope Description and Documents'
        }
    });
    }
  }

  //**************** U P D A T E   M O D E L ****************//
  // cambiaremos los scope por los nuevos recordemos que ya solo traermos los service location countries que tienen scope local y no del admin
  save(){
    this.data.serviceLocationCountries.forEach(CountryScope => {
      CountryScope.scopeDescription = this.tempScopeDescription;
      CountryScope.documentServiceCountries = this.tempScopeDocument;
    });
    console.log('new data scopeAll', this.data);
    this.data.success = true;
    this.dialogRef.close(this.data);
  }



  statusName(id){
    for (let i = 0; i < this.caDocumentStatus.length; i++) {
      const element = this.caDocumentStatus[i];
      if(id == element.id){
        return element.status;
      }
    }
  }

  privacyName(id){
    for (let i = 0; i < this.caPrivacy.length; i++) {
      const element = this.caPrivacy[i];
      if(id == element.id){
        return element.privacy;
      }
    }
  }


}
class documentLocationCountriesModel{
  id: number = 0;
  documentType: string = "";
  idServiceLocationCountry: number = 0;
  idDocumentType: number = 0;
  uploadDate: Date;
  status: number = 0;
  privacy: number = 0;
  fileName: string = "";
  fileRequest: string = "";
  fileExtension: string = "";
  statusName: string = "";
}

