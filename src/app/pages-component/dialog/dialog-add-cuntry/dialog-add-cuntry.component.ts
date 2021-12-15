import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsLeadClientComponent } from '../dialog-documents-lead-client/dialog-documents-lead-client.component';

@Component({
  selector: 'app-dialog-add-cuntry',
  templateUrl: './dialog-add-cuntry.component.html',
  styleUrls: ['./dialog-add-cuntry.component.scss']
})
export class DialogAddCuntryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddCuntryComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }

  caCounty: any[] = [];
  dataScopeDocument: any[] = [];
  documentsColum: string[] = ['Document', 'Uploaded', 'Status', 'Privacy'];
  ca_document: any[] = [];
  caStatus = [];
  caPrivacy = [];
  dataScopeDescription = [];
  GetService: any[] = [];

  // filtros
  public filerCountry: any = { name: '' };


  ngOnInit(): void {
    console.log('data que recibe country', this.data );
    if(this.data.documentLocationCountries){}else{
      this.data.documentLocationCountries = [];
    }
    // si es un registro nuevo poner scope descripcion por default en 0
    // if ((this.data.action == 0 || this.data.action == 'new' )&& this.data.id == 0) {
    //   this.data.standarScopeDocuments = 0;
    // }
    this.consultaPermisos();
    this.catalogos();
    this.getStandarDocuments();
  }

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

  async catalogos(){
    // this.caCounty = await this._services.getCatalogueFrom('GetCountry');
    // Catalogue/Country-Service-Location/1587
    this._services.service_general_get(`Catalogue/Country-Service-Location/${this.data.idServiceLocation}`).subscribe((data => {
      if (data.result) {
        this.caCounty = data.result;
        console.log('caCounty sin duplicidad', this.caCounty);
      }
    }));

    console.log('valor check', this.data.standarScopeDocuments);
    this.caStatus = await this._services.getCatalogueFrom('GetDocumentStatus');
    this.caPrivacy = await this._services.getCatalogueFrom('GetPrivacy');

    this._services.service_general_get(`Catalogue/GetDocumentType/${this.data.serviceLine}`).subscribe((data => {
      console.log(data);
      if(data.success){
        this.ca_document = data.result;
      }
    }))
    this._services.service_general_get(`AdminCenter/Services/ClientPartner/${this.data.serviceLine}`).subscribe((data => {
      if (data.result) {
        this.GetService = data.result;
        console.log('service', this.GetService);
      }
    }));
  }
  getDocument(id) {
    for (let i = 0; i < this.ca_document.length; i++) {
      if (this.ca_document[i].id == id) {
        return this.ca_document[i].documentType;
      }
    }
  }
  getStatus(id){
    for(let i = 0; i < this.caStatus.length; i++){
       if(this.caStatus[i].id == id){
         return this.caStatus[i].status;
       }
    }
  }
  getPrivacy(id){
    for(let i = 0; i < this.caPrivacy.length; i++){
       if(this.caPrivacy[i].id == id){
         return this.caPrivacy[i].privacy;
       }
    }
  }


  DialogDocumentsLeadClientComponent(data){
    if(data == null){
      data = {id: 0};
    }

    data.status = true;
    const dialogRef = this._dialog.open(DialogDocumentsLeadClientComponent, {
      data: data, width: '90%'
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result.success) {
       result.id = 0
       result.idServiceLocationCountry = this.data.id;
       result.updateDate = new Date();
       console.log(result);
       this.data.documentLocationCountries.push(result);
     }

  });
  }
  // si standar esta en true trae los documentos standares que solicita premier para el servicio correspondiente
  getStandarDocuments() {
    this.dataScopeDocument = [];
    this.dataScopeDescription = [];

    if(this.data.standarScopeDocuments == 1) {
      console.log('muestra los documentos y scope descriptionde admin center modo lectura');
      console.log('id service', this.data.idService);
      console.log('id Country', this.data.idCountry);

      // si es multicheck
      if (this.data.idService.length > 0) {
        // nota para poder consultar los documentos se necesita el id del servicio y no el service1 que es asi como se guarda el service location
        let getIdService: any[]= [];
        let serviceId = this.data.idService;
          for (let s = 0; s < serviceId.length; s++) {
            const serv = serviceId[s];
            for (let d = 0; d < this.GetService.length; d++) {
              const dataServicios = this.GetService[d];
              if (serv == dataServicios.service1) {
                getIdService.push(dataServicios.id);
              }
            }
          }
        console.log('id servicios para docuemntos', getIdService);
        // en el siguiente for ya tendremos los id de los servicios, ahora ya podemos consultar el servicio de scope documents

        for (let i = 0; i < getIdService.length; i++) {
          const service = getIdService[i];
          for (let c = 0; c < this.data.idCountry.length; c++) {
            const country = this.data.idCountry[c];
            this._services.service_general_get(`AdminCenter/GetScopeDocument/${service}/${country}`).subscribe((resp => {
              if (resp.success) {
                console.log('consulta de documents scope multicheck: ', resp);
                 // get de commentarios
                 if (resp.result != null) {
                   this.dataScopeDescription.push(resp.result.scopeDescription);
                   // get de documentos
                   if (resp.result.documentServiceCountries.length != 0) {
                      this.dataScopeDocument.push(resp.result.documentServiceCountries[0]);
                  }
                }


              }
            }));
          }
          console.log('document multicheck', this.dataScopeDocument);
        }

      }
      else {
        // servicio get que trae la inf
      this._services.service_general_get(`AdminCenter/GetScopeDocument/${this.data.idService}/${this.data.idCountry}`).subscribe((resp => {
        if (resp.success) {
          console.log('consulta de documents scope: ', resp);
          this.dataScopeDocument = resp.result;
        }
      }));
      }
    }

  }
  active_description: boolean = false;
  active_country: boolean = false;
  validarForm() {
    if (this.data.idCountry == undefined ||
      this.data.idService == null) {
      this.active_country = true;
    }
    if (this.data.standarScopeDocuments == 1) {
      this.data.scopeDescription = '';
    }
    if (this.data.scopeDescription == undefined || this.data.scopeDescription =='') {
      this.active_description = true;
    }
    if((this.data.scopeDescription != undefined || this.data.scopeDescription.length == 0 ) && (this.data.idCountry != undefined)){
      this.save();
    }

   }



  save() {
    this.data.success = true;
    this.dialogRef.close(this.data);
  }
}
