import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-addpayment',
  templateUrl: './dialog-addpayment.component.html',
  styleUrls: ['./dialog-addpayment.component.css']
})
export class DialogAddpaymentComponent implements OnInit {
  
  user:any;

  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }
  //********************************************************//
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }
  //********************************************************//
  save(){
    this.data.createdBy =  this.user.id,
    this.data.createdDate = new Date(),
    this.data.updateBy = this.user.id;
    this.data.updatedDate = new Date(),
    this.dialogRef.close(this.data);
  }

}
