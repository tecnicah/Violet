import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-visa-category',
  templateUrl: './dialog-catalog-visa-category.component.html',
  styleUrls: ['./dialog-catalog-visa-category.component.css']
})
export class DialogCatalogVisaCategoryComponent implements OnInit {

  public __loader__: LoaderComponent = new LoaderComponent();
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogVisaCategoryComponent>) { }

  active_visa: boolean = false;
  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
     if (this.data.id != 0) {
      this._services.service_general_get(`AdminCenter/GetVisaCategoryById?key=${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          console.log('respuesta de actualizacion', r);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  validForm() {
    if(this.data.visaCategory == undefined){
      this.active_visa = true;
    }
    if((this.data.visaCategory != undefined || this.data.visaCategory != '' )){
      this.save();
    }
  }
  save() {
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("AdminCenter/AddVisaCategory", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdateVisaCatogory', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }

}
