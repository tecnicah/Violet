import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-addchild',
  templateUrl: './dialog-addchild.component.html',
  styleUrls: ['./dialog-addchild.component.css']
})
export class DialogAddchildComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("DATA: ",this.data); 
  }
  //***********************************************************//
  save(){
    this.data.success = true;
    this.dialogRef.close(this.data);
  }
  //***********************************************************//
}
