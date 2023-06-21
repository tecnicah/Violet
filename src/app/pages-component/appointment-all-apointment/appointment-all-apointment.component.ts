import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ServiceGeneralService } from '../../service/service-general/service-general.service';
import { DialogAddAppointmentComponent } from '../dialog/dialog-add-appointment/dialog-add-appointment.component';

@Component({
  selector: 'app-appointment-all-apointment',
  templateUrl: './appointment-all-apointment.component.html',
  styleUrls: ['./appointment-all-apointment.component.css']
})
export class AppointmentAllApointmentComponent implements OnInit {

  public appointment_table: string[] = ['Date', 'Supplier', 'Service', 'Start Time', 'Location', 'Status', 'Documents', 'View'];
  public appointment: any;
  @ViewChild('Appointment') Appointment: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public SO_ID: number = 0;
  public USERDATA: any;
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));

  constructor(
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    public _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SO_ID = this._routerParams.snapshot.params.id;
    this.USERDATA = JSON.parse(localStorage.getItem('userData'));
    this.getAppointment();
  }

   //CONSULTAR APPOINTMENT//
   public addApointmentConsult(data, i, isVisible): void {
    if (i == 0) {
      i = i + 1;
    } else {
      i = i + 1;
    }
    //console.log("Data del appointment a ver:  ", isVisible);
    const dialogRef = this._dialog.open(DialogAddAppointmentComponent, {
      width: '60%',
      data: {
        sr: this.SO_ID,
        appointmentId: data.id,
        supplier: data.supplier,
        workOrderId: data.workOrderId,
        index: i,
        isVisible: isVisible,
        status: data.status,
        ended: data.ended,
        start:data.start,
        report:data.report
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
      this.getAppointment();
    });
  }

  getAppointment(){
    this._services.service_general_get('Appointment/GetAllAppointment?id=' + this.SO_ID)
      .subscribe((response: any) => {
        if (response.success) {
          //console.log("APPOINT: ", response);
          this.appointment = new MatTableDataSource(response.result.value);
          this.appointment.paginator = this.Appointment;
          this.appointment.sort = this.sort;
        }
      });
  }

  goBack() {
    window.history.back();
  }

}
