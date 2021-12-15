import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-base-prueba',
  templateUrl: './dialog-base-prueba.component.html',
  styleUrls: ['./dialog-base-prueba.component.css']
})
export class DialogBasePruebaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBasePruebaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log("Here ===> ", this.data)
  }

}
