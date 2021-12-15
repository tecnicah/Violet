import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-add-table-full-sistem-contact',
  templateUrl: './dialog-add-table-full-sistem-contact.component.html',
  styleUrls: ['./dialog-add-table-full-sistem-contact.component.css']
})
export class DialogAddTableFullSistemContactComponent implements OnInit {

  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddTableFullSistemContactComponent>) { }

  ngOnInit(): void {
  }

  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    // let back = [];
    // back.push({
    //   "id": 0,
    //   "name": this.data.name,
    //   "createdBy": userData.id,
    //   "createdDate": new Date(),
    //   "updatedBy": userData.id,
    //   "updatedDate": new Date()
    // })
    // if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url('Report/AddTable', {
        "id": 0,
        "name": this.data.name,
        "createdBy": userData.id,
        "createdDate": new Date(),
        "updatedBy": userData.id,
        "updatedDate": new Date()
      }).subscribe(r => {
        console.log('respuesta de creacion de tabla', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(r);
      })
    // }
  }

}
