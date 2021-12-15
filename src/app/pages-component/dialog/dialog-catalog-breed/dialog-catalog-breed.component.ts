import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-breed',
  templateUrl: './dialog-catalog-breed.component.html',
  styleUrls: ['./dialog-catalog-breed.component.css']
})
export class DialogCatalogBreedComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogBreedComponent>) { }

  active_breed:boolean = false;
  active_pet:boolean = false;
  dataPetType;

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
     this._services.service_general_get(`AdminCenter/GetBreedId?key=${this.data.id}`).subscribe( r => {
       if (r.success) {
         this.data = r.result;
         console.log('respuesta de actualizacion', r);
         this.__loader__.hideLoader();
       }
     });
    }
    this.get_catalog();
  }
  get_catalog() {
    this._services.service_general_get('AdminCenter/GetPetType').subscribe(r => {
      if (r.success) {
        this.dataPetType = r.result;
      }
    });
  }
  validForm() {
    if(this.data.breed == undefined && this.data.petTypeId == undefined ){
      this.active_breed = true;
      this.active_pet = true;
    }
    if((this.data.breed != undefined || this.data.breed != '' ) &&  (this.data.petTypeId != undefined || this.data.petTypeId != '' )){
      this.save();
    }
  }
  save() {
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("AdminCenter/AddBreed", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdateBreed', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }


}
