import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogAddAvailabilityCalendarComponent } from '../dialog-add-availability-calendar/dialog-add-availability-calendar.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-availability-calendar',
  templateUrl: './dialog-availability-calendar.component.html',
  styleUrls: ['./dialog-availability-calendar.component.css']
})
export class DialogAvailabilityCalendarComponent implements OnInit {
  dataGet:any = {};
  ca_day:any[]=[];
  ca_hours:any[] = [
    { hora:9 },
    { hora:10 },
    { hora:11 },
    { hora:12 },
    { hora:13 },
    { hora:14 },
    { hora:15 },
    { hora:16 },
    { hora:17 },
    { hora:18 },
    { hora:19 },
    { hora:20 }
  ];
  user:any;
  dia_no_laborable:any[]=[];
  dia_laborable:any[]=[];
  _data:any = {};

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  loader:LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  //********************************************//
  ngOnInit(): void {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this._services.service_general_get('Calendar/GetAvailability/'+this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.dataGet = data.result;
        for (let i = 0; i < this.dataGet.length; i++) {
          let start = this.dataGet[i].hourStart.split(':');
          let end = this.dataGet[i].hourEnd.split(':');
          this.dataGet[i].hourEnd = Number(end[0]);
          this.dataGet[i].hourStart = Number(start[0]);
          console.log(this.dataGet[i]);
        }
        console.log(this.dataGet);
        this.getDiasNoLaborables();
        this.getDiasLaborables();
        this.loader.hideLoader();
       }
    }));
    this.catalogos();
  }
  //********************************************//
  getDiasNoLaborables(){
    let dias_no_laborables = this.dataGet.filter(E => {
      if(E.available == false || E.available == null){
         if(E.day == 1){
           E.dia = 'Monday'
         }
         if(E.day == 2){
          E.dia = 'Tuesday'
        }
        if(E.day == 3){
          E.dia = 'Wednesday'
        }
        if(E.day == 4){
          E.dia = 'Thursday'
        }
        if(E.day == 5){
          E.dia = 'Friday'
        }
        if(E.day == 6){
          E.dia = 'Saturday'
        }
        if(E.day == 7){
          E.dia = 'Sunday'
        }
         return true;
      }
    });
    this.dia_no_laborable = dias_no_laborables;
    console.log(dias_no_laborables);
  }
  //********************************************//
  getDiasLaborables(){
    let dias_laborables = this.dataGet.filter(E => {
      if(E.available == true){
         if(E.day == 1){
           E.dia = 'Monday'
         }
         if(E.day == 2){
          E.dia = 'Tuesday'
        }
        if(E.day == 3){
          E.dia = 'Wednesday'
        }
        if(E.day == 4){
          E.dia = 'Thursday'
        }
        if(E.day == 5){
          E.dia = 'Friday'
        }
        if(E.day == 6){
          E.dia = 'Saturday'
        }
        if(E.day == 7){
          E.dia = 'Sunday'
        }
         return true;
      }
    });
    this.dia_laborable = dias_laborables;
    console.log(dias_laborables);
  }
  //********************************************//
  async catalogos(){
    this.ca_day = await this._services.getCatalogueFrom('GetDay');
  }
  //********************************************//
  view(dia, dia_Catalogo, hora_inicio, hora_fin, hora_catalogo){
    if(dia == dia_Catalogo){
      if((hora_inicio <= hora_catalogo && hora_fin >= hora_catalogo)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  //********************************************//
  //FUNCION PARA ELIMINAR AVAILABILITY//
  remove(data){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this item?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete_with_url('Calendar/DeleteAvailability/'+data.id+'?user='+this.user.id).subscribe((data => {
          if (data.success) {
             console.log(data);
             const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "item deleted"
              },
              width: "350px"
            });
            this.ngOnInit();
         }
        }));
      }
    });
  }
  //********************************************//
  asignaHorario(data, data_dia, i, j){
    console.log(data);
    console.log(data_dia);
    console.log(i);
    console.log(j);
  }
  //********************************************//
  addHours(data){
    const dialogRef = this._dialog.open(DialogAddAvailabilityCalendarComponent, {
      data: data,
      width: "70%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  //********************************************//
  saveNotAvailable(){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Save information",
        body: "Are you sure to save this day as unavailable?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      let data_to_send = {
        "id": 0,
        "day": this._data.notAvailable,
        "consultantContactsConsultant": this.user.id,
        "hourStart": '9:00',
        "hourEnd": '20:00',
        "available": false,
        "createdBy" : this.user.id,
        "createdDate": new Date(),
        "updatedBy": this.user.id,
        "dataupdatedDate": new Date(),
      }

      if (result) {
        this._services.service_general_post_with_url("Calendar/AddAvailability", data_to_send).subscribe((data => {
          if (data.success) {
             console.log(data);
             const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "item deleted"
              },
              width: "350px"
            });
            this.ngOnInit();
         }
        }));
      }
    });
  }
}
