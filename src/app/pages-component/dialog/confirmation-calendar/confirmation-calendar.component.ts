import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-calendar',
  templateUrl: './confirmation-calendar.component.html',
  styleUrls: ['./confirmation-calendar.component.css']
})
export class ConfirmationCalendarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    console.log("entra a cerrar el modal");
    this.dialogRef.close(false);
  }

}
