import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-education-level',
  templateUrl: './dialog-catalog-education-level.component.html',
  styleUrls: ['./dialog-catalog-education-level.component.css']
})
export class DialogCatalogEducationLevelComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogEducationLevelComponent>) { }

  active_education:boolean = false;

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
     if (this.data.id != 0) {
      this._services.service_general_get(`AdminCenter/GetEducationLevelById?key=${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          console.log('respuesta de actualizacion', r);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  validForm() {
    if(this.data.highestLevelEducation == undefined){
      this.active_education = true;
    }
    if((this.data.highestLevelEducation != undefined || this.data.highestLevelEducation != '' )){
      this.save();
    }
  }
  save() {
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("AdminCenter/AddEducationLevel", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdateEducationLevel', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }

}
