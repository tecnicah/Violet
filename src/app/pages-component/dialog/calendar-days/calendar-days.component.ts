import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['./calendar-days.component.css']
})
export class CalendarDaysComponent implements OnInit {

  user: any;
  ca_day: any[] = [];
  ca_hours: any[] = [{
      hora: '9:00',
      numero: 9,
      mostrar: 1,
      horaEnd: '9:00',
      mostrarEnd: 1
    },
    {
      hora: '10:00',
      numero: 10,
      mostrar: 1,
      horaEnd: '10:00',
      mostrarEnd: 1
    },
    {
      hora: '11:00',
      numero: 11,
      mostrar: 1,
      horaEnd: '11:00',
      mostrarEnd: 1
    },
    {
      hora: '12:00',
      numero: 12,
      mostrar: 1,
      horaEnd: '12:00',
      mostrarEnd: 1
    },
    {
      hora: '13:00',
      numero: 13,
      mostrar: 1,
      horaEnd: '13:00',
      mostrarEnd: 1
    },
    {
      hora: '14:00',
      numero: 14,
      mostrar: 1,
      horaEnd: '14:00',
      mostrarEnd: 1
    },
    {
      hora: '15:00',
      numero: 15,
      mostrar: 1,
      horaEnd: '15:00',
      mostrarEnd: 1
    },
    {
      hora: '16:00',
      numero: 16,
      mostrar: 1,
      horaEnd: '16:00',
      mostrarEnd: 1
    },
    {
      hora: '17:00',
      numero: 17,
      mostrar: 1,
      horaEnd: '17:00',
      mostrarEnd: 1
    },
    {
      hora: '18:00',
      numero: 18,
      mostrar: 1,
      horaEnd: '18:00',
      mostrarEnd: 1
    },
    {
      hora: '19:00',
      numero: 19,
      mostrar: 1,
      horaEnd: '19:00',
      mostrarEnd: 1
    },
    {
      hora: '20:00',
      numero: 20,
      mostrar: 1,
      horaEnd: '20:00',
      mostrarEnd: 1
    }
  ];

  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  public multipleDay = [];
  public IDReg: string = 'id';
  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('data recibida: ', this.data);
    let aux = [];
    if (this.data.operacion == "edicion") {
      let id = this.data.id;
      for (let i = 0; i < this.data.horaNoDisponible.length; i++) {
        if (this.data.horaNoDisponible[i].id == id) {
          this.data.horaNoDisponible.splice(i, 1);
        }
      }
      console.log('EDICION: ', this.data);
      console.log(aux);
      let horas_quitar = this.data.horaNoDisponible;

      for (let i = 0; i < horas_quitar.length; i++) {
        for (let j = 0; j < this.ca_hours.length; j++) {
          if (this.ca_hours[j].numero >= Number(horas_quitar[i].hora_inicio) && this.ca_hours[j].numero < Number(horas_quitar[i].hora_final)) {
            this.ca_hours[j].mostrar = 0;
          }
          if (this.ca_hours[j].numero > Number(horas_quitar[i].hora_inicio) && this.ca_hours[j].numero <= Number(horas_quitar[i].hora_final)) {
            this.ca_hours[j].mostrarEnd = 0;
          }
        }
      }
      console.log(this.ca_hours);

    }

    if (this.data.operacion == "inserccion") {
      let horas_quitar = this.data.horaNoDisponible;
      for (let i = 0; i < horas_quitar.length; i++) {
        for (let j = 0; j < this.ca_hours.length; j++) {
          if (this.ca_hours[j].numero >= Number(horas_quitar[i].hora_inicio) && this.ca_hours[j].numero < Number(horas_quitar[i].hora_final)) {
            this.ca_hours[j].mostrar = 0;
          }
          if (this.ca_hours[j].numero > Number(horas_quitar[i].hora_inicio) && this.ca_hours[j].numero <= Number(horas_quitar[i].hora_final)) {
            this.ca_hours[j].mostrarEnd = 0;
          }
        }
      }
      console.log(this.ca_hours);
    }

    if (this.data.dayEdit) {
      this.data.dayEdit.forEach(E => {
        this.multipleDay.push(E);
      });
    } else {
      this.data.day.forEach(E => {
        this.multipleDay.push(E);
      });
    }
    this.catalogos();
  }

  async catalogos() {

    this.ca_day = await this._services.getCatalogueFrom('GetDay');
    console.log(this.ca_day);
  }

  public new_hour: any = [];
  addHour() {
    this.new_hour.push({
      "hourStart": '',
      "hourEnd": '',
      "available": ''
    })
  }

  save() {
    let data_to_send = {
      "id": this.data.id,
      "day": this.data.day,
      "consultantContactsConsultant": this.user.id,
      "hourStart": this.data.hourStart,
      "hourEnd": this.data.hourEnd,
      "available": this.data.available,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "date": this.data.date
    }
    console.log("save data: ", data_to_send);
    data_to_send.date = this.data.date;
    this._services.service_general_post_with_url("Calendar/UpdateAvailability", data_to_send).subscribe((data => {
      if (data.success) {
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

  public dataSuccess = 0;

  postNewAvailability() {
    // ya que al crear un availability es multiple se guarda en multipleDay
    console.log('multiple days', this.multipleDay);
    let data_to_send = [];
    this.multipleDay.forEach(muldays => {
      for (let i = 0; i < this.new_hour.length; i++) {
        if (this.new_hour[i].hourStart != '' && this.new_hour[i].hourStart != null && this.new_hour[i].hourStart != undefined && this.new_hour[i].hourEnd != '' && this.new_hour[i].hourEnd != null && this.new_hour[i].hourEnd != undefined) {
          data_to_send.push({
            "id": this.data.id,
            "day": muldays,
            "consultantContactsConsultant": this.user.id,
            "hourStart": this.new_hour[i].hourStart,
            "hourEnd": this.new_hour[i].hourEnd,
            "available": this.new_hour[i].available,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date(),
            "date": ''
          })
        }
      }
    });
    console.log(data_to_send);
    let i = 0;

    console.log(this.data.daysSelected);
    this.data.daysSelected.forEach(E => {
      for (let i = 0; i < data_to_send.length; i++) {
        if (data_to_send[i].day == E.day) {
          data_to_send[i].date = E.date;
        }
      }
    });

    console.log(data_to_send);

    data_to_send.forEach(E => {
      this._services.service_general_post_with_url("Calendar/AddAvailability", E).subscribe((data => {
        if (data.success) {
          console.log(data);
          this.dataSuccess = this.dataSuccess + 1;
          if (this.dataSuccess == this.multipleDay.length) {
            this.succesMesage();
          }
        }
      }), (err) => {
        console.log('error', err);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error creating availability"
          },
          width: "350px"
        });
        this.dialogRef.close();
        return;
      })
    });

  }

  succesMesage() {
    if (this.dataSuccess != 0) {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Data saved"
        },
        width: "350px"
      });
      this.dialogRef.close();
    }
  }
}
