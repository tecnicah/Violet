import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-history-contract',
  templateUrl: './dialog-confirm-history-contract.component.html',
  styleUrls: ['./dialog-confirm-history-contract.component.css']
})
export class DialogConfirmHistoryContractComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }

}
