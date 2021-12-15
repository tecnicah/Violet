import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-document-request',
  templateUrl: './dialog-document-request.component.html',
  styleUrls: ['./dialog-document-request.component.css']
})
export class DialogDocumentRequestComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  dependent = [];
  ngOnInit(): void {
    console.log("data recibida: ", this.data);
    this.getCatalogos();
    this._services.service_general_get('ServiceRecord/GetApplicant/'+this.data.sr).subscribe(async data => {
      if (data.success) {
        console.log('DATA CONSULTA: ',data);
        this.dependent = data.applicant.value;
       }
    });
  }

  ca_country = [];
  ca_document = [];
  async getCatalogos(){
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
  }

  getDocumentType(id){
    for (let i = 0; i < this.ca_document.length; i++) {
      if(this.ca_document[i].id == id){
        return this.ca_document[i].documentType;
      }
    }
  }

  getNameCountry(id){
    for (let i = 0; i < this.ca_country.length; i++) {
      if(this.ca_country[i].id == id){
        return this.ca_country[i].name;
      }
    }
  }

  getNameDependent(id){
    for (let i = 0; i < this.dependent.length; i++) {
      if(this.dependent[i].dependentId == id){
        return this.dependent[i].name;
      }
    }
  }

  viewDocument(){
     console.log(this._services.url_images + this.data.fileRequestt);
     window.open(this._services.url_images + this.data.fileRequest)
  }

  save(){
    this.dialogRef.close();
  }
}
