import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-referral-fee',
  templateUrl: './dialog-catalog-referral-fee.component.html',
  styleUrls: ['./dialog-catalog-referral-fee.component.css']
})
export class DialogCatalogReferralFeeComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogReferralFeeComponent>) { }

  active_referral:boolean = false;


  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
     this._services.service_general_get(`AdminCenter/ReferralFee/${this.data.id}`).subscribe( r => {
       if (r.success) {
         this.data = r.result;
         console.log('respuesta de actualizacion', r);
         this.__loader__.hideLoader();
       }

     });
   }
  }
  validForm() {
    if(this.data.referralFee1 == undefined){
      this.active_referral = true;
    }
    if((this.data.referralFee1 != undefined || this.data.referralFee1 != '' )){
      this.save();
    }
  }
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    // this.data.updateBy = userData.id;
    // this.data.updatedDate = new Date();

    if (this.data.id == 0) {
      this.__loader__.showLoader();
      // this.data.createdBy = userData.id;
      // this.data.createdDate = new Date();
      this._services.service_general_post_with_url("AdminCenter/Add/ReferralFee", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/Edit/ReferralFee', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }

}
