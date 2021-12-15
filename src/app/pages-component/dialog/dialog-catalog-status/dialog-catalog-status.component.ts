import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-status',
  templateUrl: './dialog-catalog-status.component.html',
  styleUrls: ['./dialog-catalog-status.component.css']
})
export class DialogCatalogStatusComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogStatusComponent>) { }

  active_status:boolean = false;

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
     if (this.data.id != 0) {
      // no hay servicio
    }
  }
  validForm() {
    if(this.data.status == undefined){
      this.active_status = true;
    }
    if((this.data.status != undefined || this.data.status != '' )){
      this.save();
    }
  }
  save() {
    if (this.data.id == 0) {
      // this.__loader__.showLoader();
      // this._services.service_general_post_with_url("AdminCenter/AddSex", this.data).subscribe(r => {
      //   console.log(r);
      //   this.__loader__.hideLoader();
      //   this.dialogRef.close(1);
      // })
    }
    else {
      // this.__loader__.showLoader();
      // this._services.service_general_put('AdminCenter/UpdateSex', this.data).subscribe(r => {
      //   console.log('respuesta de update', r);
      //   this.__loader__.hideLoader();
      //   this.dialogRef.close(2);
      // })

    }
  }

}
