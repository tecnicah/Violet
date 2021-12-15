import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
@Component({
  selector: 'app-dialog-add-visit',
  templateUrl: './dialog-add-visit.component.html',
  styleUrls: ['./dialog-add-visit.component.css']
})
export class DialogAddVisitComponent implements OnInit {

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddVisitComponent>) { }

  public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
    }
  }
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy = userData.id;
    this.data.updatedDate = new Date();
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      this.data.action = 'new';
      this.__loader__.hideLoader();
      this.dialogRef.close(this.data);
    }
    else if (this.data.id != 0) {
      this.__loader__.showLoader();
      this.data.action = 'update';
      this.__loader__.hideLoader();
      this.dialogRef.close(this.data);
    }
    else {
      this.dialogRef.close();
    }

  }

}
