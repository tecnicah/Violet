import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-change-status',
  templateUrl: './dialog-change-status.component.html',
  styleUrls: ['./dialog-change-status.component.css']
})
export class DialogChangeStatusComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) {
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    console.log(this.data);
  }

  save(){
    if(this.data.comment != null && this.data.comment != undefined && this.data.comment.trim() != ''){
      this.data.success = true;
      this.dialogRef.close(this.data);
    }else{
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "Comment is required"
        },
        width: "350px"
      });
    }

    
  }

}
