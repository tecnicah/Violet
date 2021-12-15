import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-languages',
  templateUrl: './dialog-catalog-languages.component.html',
  styleUrls: ['./dialog-catalog-languages.component.css']
})
export class DialogCatalogLanguagesComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogLanguagesComponent>) { }

  // variables
  language: any = {};
  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
     // comprobar si es creacion o actualizacion de language
     if (this.data.id != 0) {
      this._services.service_general_get(`Catalog/GetLanguage/${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          console.log('respuesta de actualizacion', r);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  // validar formulario
  active_name:boolean = false;
  active_abbreviation:boolean = false;

  validForm() {
    if(this.data.name == undefined){
      this.active_name = true;
    }if(this.data.abbreviation == undefined){
      this.active_abbreviation = true;
    }
    if((this.data.name != undefined || this.data.name == '' ) && (this.data.abbreviation != undefined || this.data.abbreviation== '')){
      this.save();
    }
  }
  // guardar language
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy = userData.id;
    this.data.updatedDate = new Date();

    // this.language = {
    // "id": 0,
    // "name": this.language.name,
    // "abbreviation": this.language.abbreviation,
    // "status": this.language.status,
    // "createdBy": this.language.createdBy,
    // "createdDate": new Date()
    // // "updatedBy",
    // // "updatedDate"
    // }

    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      console.log(JSON.stringify(this.data), this.data);
      this._services.service_general_post_with_url("Catalog/AddLanguage", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('Catalog/UpdateLanguage', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }
}
