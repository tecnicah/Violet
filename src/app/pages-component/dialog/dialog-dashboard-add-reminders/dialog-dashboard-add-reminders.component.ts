import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-dashboard-add-reminders',
  templateUrl: './dialog-dashboard-add-reminders.component.html',
  styleUrls: ['./dialog-dashboard-add-reminders.component.css']
})
export class DialogDashboardAddRemindersComponent implements OnInit {
  date = new Date;
  serviceLine:any[]=[];
  ca_service_record:any[]=[];
  wo:any[]=[];
  servicios:any;
  city_select:any;
  user:any;
  data_reminder:any = {};
  data_info: any = {};
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public dialog: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("data recibida: ", this.data);
    this._services.service_general_get('Catalogue/GetServiceRecord/'+this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.ca_service_record = data.result;
      }
    }));


    this.get_catalogos();
  }
  //****************************************************//
  async get_catalogos(){
    let city = [];
    let city_final = [];
    this.serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    let country = await this._services.getCatalogueFrom('GetCountry');
    for (let i = 0; i < country.length; i++) {
      this._services.service_general_get('Catalogue/GetState?country=' + country[i].id).subscribe((data => {
        if (data.success) {
            city = data.result;
            for (let j = 0; j < city.length; j++) {
              city_final.push(city[j]);
            }
        }
      }))
    }
    console.log("CIUDADES DINALES: ", city_final);
    this.city_select = city_final;
    this.__loader__.hideLoader();
  }
  //****************************************************//
  getWO(){
    this.__loader__.showLoader();
    this._services.service_general_get('Catalogue/GetWorkOrderByServiceLine?sr=' + this.data_reminder.sr +  '&sl=' + this.data_reminder.sl).subscribe((data: any) => {
      if (data.success) {
        console.log("ESTOS SON LAS WO:  ", data.result);
        this.wo = data.result;
        this.__loader__.hideLoader();
      }
    });
  }
  //*****************************************************//
  getService(){
    this.__loader__.showLoader();
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data_reminder.wo).subscribe((data: any) => {
      if (data.success) {
        console.log("ESTOS SON LOS SERVICIOS:  ", data.result);
        this.servicios = data.result.value;
        this.__loader__.hideLoader();
      }
    });
  }
  //*****************************************************//
  getDataService(){
    for (let i = 0; i < this.servicios.length; i++) {
      if(this.servicios[i].id == this.data_reminder.service){
        this.data_info = this.servicios[i];
        return true;
      }
    }
    console.log("DATA A IMPRIMIR EN VISTA: ", this.data_info);
  }
  //*****************************************************//
  save(){
    this.data_reminder.category =  this.data_info.category; 
    this.data_reminder.service =  this.data_info.serviceID[0].id; 
    this.data_reminder.user = this.user.id;
    console.log(this.data_reminder);
    this._services.service_general_post_with_url("MyDashboard/AddReminder", this.data_reminder).subscribe((data => {
      if(data.success){
        console.log(data);
         const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Save Data"
              },
              width: "350px"
            });
            this.dialog.close();
      }
    }))
  }
}
