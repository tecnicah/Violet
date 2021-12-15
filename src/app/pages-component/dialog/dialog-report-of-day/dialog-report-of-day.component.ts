import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-report-of-day',
  templateUrl: './dialog-report-of-day.component.html',
  styleUrls: ['./dialog-report-of-day.component.css']
})
export class DialogReportOfDayComponent implements OnInit {

  service_name:any;
  service_id:any;

  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);

    if(this.data.services.length > 1){
      this.data.services.forEach(element => {
         this.service_name = element+', ';
       });
    }

    if(this.data.services.length > 1){
      this.data.serviceIds.forEach(element => {
         this.service_id = element+', ';
       });
    }

    if(this.data.services.length == 1){
      this.data.services.forEach(element => {
         this.service_name = element;
       });
    }

    if(this.data.services.length == 1){
      this.data.serviceIds.forEach(element => {
         this.service_id = element;
       });
    }

    console.log(this.service_name);
    console.log(this.service_id);
  }
}
