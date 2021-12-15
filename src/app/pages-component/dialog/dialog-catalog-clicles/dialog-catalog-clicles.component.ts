import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';


@Component({
  selector: 'app-dialog-catalog-clicles',
  templateUrl: './dialog-catalog-clicles.component.html',
  styleUrls: ['./dialog-catalog-clicles.component.css']
})
export class DialogCatalogCliclesComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogCliclesComponent>) { }
  // variables
  // cicle: any = {};

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    // comprobar si es creacion o actualizacion de currencies
    if (this.data.id != 0) {
      this._services.service_general_get(`Catalog/GetLifeCircle/${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          console.log('respuesta de actualizacion', r);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  // validar formulario
  active_lifeCircle1:boolean = false;


  validForm() {
    if(this.data.lifeCircle1 == undefined){
      this.active_lifeCircle1 = true;
    }
    if((this.data.lifeCircle1 != undefined || this.data.lifeCircle1 == '' )){
      this.save();
    }
  }
   // guardar Cicle
  save() {
    console.log(this.data, 'data cicle inputs')
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("Catalog/AddLifeCircle", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    } else {
      this.__loader__.showLoader();
      this._services.service_general_put('Catalog/UpdateLifeCircle', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })
    }
  }

}


