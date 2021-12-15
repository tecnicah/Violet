import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-activity-log',
  templateUrl: './dialog-activity-log.component.html',
  styleUrls: ['./dialog-activity-log.component.css']
})
export class DialogActivityLogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogActivityLogComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
  }


  save(){
    this.data.success = true;
    this.dialogRef.close(this.data);
  }
}
