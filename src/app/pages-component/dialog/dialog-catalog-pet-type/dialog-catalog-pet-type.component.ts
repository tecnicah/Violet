import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-pet-type',
  templateUrl: './dialog-catalog-pet-type.component.html',
  styleUrls: ['./dialog-catalog-pet-type.component.css']
})
export class DialogCatalogPetTypeComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogPetTypeComponent>) { }
  petType: any = {};
   // validar formulario
  active_petType:boolean = false;
  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
      this._services.service_general_get(`AdminCenter/GetPetTypeId?key=${this.data.id}`).subscribe(r => {
        if (r.success) {
          this.data = r.result;
          this.__loader__.hideLoader();
        }
      });
    }
  }
  validForm() {
    if(this.data.petType == undefined){
      this.active_petType = true;
    }
    if((this.data.petType != undefined || this.data.petType != '' )){
      this.save();
    }
  }
  save() {
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("AdminCenter/AddPetType", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdatePetType', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }
}
