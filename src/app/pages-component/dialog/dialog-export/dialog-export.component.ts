import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-base-prueba/dialog-base-prueba.component';

@Component({
  selector: 'app-dialog-export',
  templateUrl: './dialog-export.component.html',
  styleUrls: ['./dialog-export.component.css']
})

export class DialogExportComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogExportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  file: any = {
    type: 0
  };

  ngOnInit(): void {
    console.log(this.data);
  }

  export () {
    console.log(this.file);
    if (this.file.type > 0){
        this.dialogRef.close(this.file.type);
    }
  }

}
