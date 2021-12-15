import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-titles',
  templateUrl: './dialog-catalog-titles.component.html',
  styleUrls: ['./dialog-catalog-titles.component.css']
})
export class DialogCatalogTitlesComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogTitlesComponent>) { }

  // variables
  // title: any = {};
  dataOffices: any[] = [];

  ngOnInit(): void {
    this.getOffice();
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    // comprobar si es creacion o actualizacion de currencies
    if (this.data.id != 0) {
      this._services.service_general_get(`Catalog/GetTitle/${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          console.log('respuesta de actualizacion', r);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  // traer las officinas
  getOffice() {
    this._services.service_general_get('Catalogue/GetOffice').subscribe(rOffice => {
      console.log('catalogo office', rOffice);
      if (rOffice.success) {
        for (let i = 0; i < rOffice.result.length; i++) {
          const eOffice = rOffice.result[i];
          this.dataOffices.push(eOffice)
        }
      }
    });

  }
  // validar formulario
  active_office:boolean = false;
  active_section: boolean = false;
  active_title:boolean = false;


  validForm() {
    if(this.data.office == undefined){
      this.active_office = true;
    }
    if(this.data.section == undefined){
      this.active_section = true;
    }if(this.data.title == undefined){
      this.active_title = true;
    }
    if((this.data.section != undefined || this.data.section == '' ) && 
       (this.data.title != undefined || this.data.title== '') &&
       (this.data.office != undefined || this.data.office== '')){
      this.save();
    }
  }
  // guardar title
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy = userData.id;
    this.data.updatedDate = new Date();
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      console.log(JSON.stringify(this.data), this.data);
      this._services.service_general_post_with_url("Catalog/AddTitle", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    } else {
      this.__loader__.showLoader();
      this._services.service_general_put('Catalog/UpdateTitle', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })
    }
  }
}

