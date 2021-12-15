import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-coordinator-type',
  templateUrl: './dialog-catalog-coordinator-type.component.html',
  styleUrls: ['./dialog-catalog-coordinator-type.component.css']
})
export class DialogCatalogCoordinatorTypeComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogCoordinatorTypeComponent>) { }

  active_coordinator:boolean = false;

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
      this._services.service_general_get(`AdminCenter/GetCoordinatorTypeById?key=${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          console.log('respuesta de actualizacion', r);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  validForm() {
    if(this.data.coordinatorType == undefined){
      this.active_coordinator = true;
    }
    if((this.data.coordinatorType != undefined || this.data.coordinatorType != '' )){
      this.save();
    }
  }
  save() {
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("AdminCenter/AddCoordinatorType", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdateCoordinatorType', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }

}
