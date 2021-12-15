import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-deletepaymentconcept',
  templateUrl: './dialog-deletepaymentconcept.component.html',
  styleUrls: ['./dialog-deletepaymentconcept.component.css']
})
export class DialogDeletepaymentconceptComponent implements OnInit {

  data_check = {
    type: false,
    success: false
  }
  constructor(public dialogRef: MatDialogRef < any > ) { }

  ngOnInit(): void {
  }

  save(){
    this.data_check.success = true;
    this.dialogRef.close(this.data_check)
  }

}
