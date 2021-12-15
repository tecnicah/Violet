import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-supplier-type',
  templateUrl: './dialog-catalog-supplier-type.component.html',
  styleUrls: ['./dialog-catalog-supplier-type.component.css']
})
export class DialogCatalogSupplierTypeComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogSupplierTypeComponent>) { }

  active_supplier:boolean = false;

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
     this._services.service_general_get(`AdminCenter/GetSupplierTypeById?key=${this.data.id}`).subscribe( r => {
       if (r.success) {
         this.data = r.result;
         console.log('respuesta de actualizacion', r);
         this.__loader__.hideLoader();
       }
     });
   }
  }
  validForm() {
    if(this.data.supplierType == undefined){
      this.active_supplier = true;
    }
    if((this.data.supplierType != undefined || this.data.supplierType != '' )){
      this.save();
    }
  }
  save() {
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("AdminCenter/AddSupplierType", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdateSupplierType', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }

}
