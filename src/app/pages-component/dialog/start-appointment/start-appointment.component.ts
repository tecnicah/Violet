import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-start-appointment',
  templateUrl: './start-appointment.component.html',
  styleUrls: ['./start-appointment.component.css']
})
export class StartAppointmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StartAppointmentComponent>,
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog,
) {}

ngOnInit() {}

public confirmAction( action:number ):void {

this.dialogRef.close(true);        

}

/* Utilities *******************/
public hideModal():void {

    this.dialogRef.close();

}

}