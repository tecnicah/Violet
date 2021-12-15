import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-add-availability-calendar',
  templateUrl: './dialog-add-availability-calendar.component.html',
  styleUrls: ['./dialog-add-availability-calendar.component.css']
})
export class DialogAddAvailabilityCalendarComponent implements OnInit {

  user:any;
  ca_day:any[]=[];
  ca_hours:any[] = [
    { hora:'9:00' },
    { hora:'10:00' },
    { hora:'11:00' },
    { hora:'12:00' },
    { hora:'13:00' },
    { hora:'14:00' },
    { hora:'15:00' },
    { hora:'16:00' },
    { hora:'17:00' },
    { hora:'18:00' },
    { hora:'19:00' },
    { hora:'20:00' }
  ];

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('data recibida: ', this.data);
    this.data.available = false;
    this.catalogos();
  }

  async catalogos(){
    this.ca_day = await this._services.getCatalogueFrom('GetDay');
  }

  save(){
    let data_to_send = {
      "id": 0,
      "day": this.data.id,
      "consultantContactsConsultant": this.user.id,
      "hourStart": this.data.hourStart,
      "hourEnd": this.data.hourEnd,
      "available": this.data.available,
      "createdBy" : this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "dataupdatedDate": new Date(),
    }
    console.log("save data: ", data_to_send);

    this._services.service_general_post_with_url("Calendar/AddAvailability", data_to_send).subscribe((data => {
      if(data.success){
        console.log(data);
         const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Data saved"
              },
              width: "350px"
            });
            this.dialogRef.close();
      }
    }))

  }


}
