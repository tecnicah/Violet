import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-partner-status',
  templateUrl: './dialog-catalog-partner-status.component.html',
  styleUrls: ['./dialog-catalog-partner-status.component.css']
})
export class DialogCatalogPartnerStatusComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogPartnerStatusComponent>) { }

  active_partner:boolean = false;
  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
     if (this.data.id != 0) {
      this._services.service_general_get(`AdminCenter/GetPartnerStatusById?key=${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          console.log('respuesta de actualizacion', r);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  validForm() {
    if(this.data.status == undefined){
      this.active_partner = true;
    }
    if((this.data.status != undefined || this.data.status != '' )){
      this.save();
    }
  }
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updateBy = userData.id;
    this.data.updatedDate = new Date();
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      this._services.service_general_post_with_url("AdminCenter/AddPartnerStatus", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdatePartnerStatus', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }


}
