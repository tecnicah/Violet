import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { MatDialog } from '@angular/material/dialog';
import { FullComponent } from '../../layouts/full/full.component';
import { Router, Resolve } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('DataFollow') DataFollow: MatPaginator;
  date_ = new Date();
  user: any;
  data_model: any = {};
  filteruno: boolean = false;
  public range = new FormGroup({
    dateRange1: new FormControl(),
    dateRange2: new FormControl()
  });
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public full: FullComponent, public _router:Router,){}

  public filterNotification: any = { type: '' };
  public filterServiceRecord: any = { numberServiceRecord: '' };


  //*************************************************************//
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("USER LOGUEADO: ", this.user);
    this.data_model.archive = false;
    this.get_catalogos();
    this.get_Notification();
  }
  goBack() {
    window.history.back();
  }
  //*************************************************************//
  ca_notificationType = [];
  ca_SR = [];
  async get_catalogos() {
    this._services.service_general_get('Catalogue/GetNotificationSystemType').subscribe((dataN => {
      if (dataN.success) {
        this.ca_notificationType = dataN.result;
        console.log('CATALOG NOTIFICATION TYPE: ', this.ca_notificationType);
      }
    }));
    // this.ca_notificationType = await this._services.getCatalogueFrom('Catalogue/GetNotificationSystemType');

    this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SR: ', data);
        this.ca_SR = data.result;
      }
    }));
  }
  //*************************************************************//
  //CONSULTA DE INFORMACION DE LAS NOTIFICACIONES//
  ca_notification : any = {};
  get_Notification() {
    this._services.service_general_get('Notification/GetNotificationCenter/' + this.user.id).subscribe((data => { //this.area_orientation.workOrderServicesId
      if (data.success) {
        console.log('DATA CONSULTA NOTIFICACIONES: ', data);
        //this.ca_notification = data.result.value;
        this.ca_notification = new MatTableDataSource(data.result.value);
        this.ca_notification.paginator = this.DataFollow;
        this.ca_notification.sort = this.sort;
        console.log(this.ca_notification);
      }
    }));
  }
  //*************************************************************//
  //FILTRO DE BUSQUEDA MANUAL//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ca_notification.filter = filterValue.trim().toLowerCase();
  }
  //*************************************************************//
  //FILTRO FECHA//
  public filteringServiceRecordTable(): void {
    let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.dateRange1 != null) this.data_model.dateRange1 = this.filterDate(this.range.value.dateRange1);
    if (this.range.value.dateRange2 != null) this.data_model.dateRange2 = this.filterDate(this.range.value.dateRange2);
    for (let item in this.data_model) {
      if (this.data_model[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_model[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if (this.range.value.dateRange1 != null && this.range.value.dateRange2 != null) {
      this.getServiceRecordTableData(params);
    }
  }
  //*************************************************************//
  public filterDate(date_in: any): string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }
  //*************************************************************//
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.data_model) {
      if (this.data_model[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_model[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getServiceRecordTableData(params);
  }
  //*************************************************************//
  public getServiceRecordTableData(params: string = ''): void {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    this._services.service_general_get('Notification/GetNotificationCenter/' + this.user.id + params_in).subscribe((data: any) => {
      if (data.success) {
        console.log("ESTAS SON LAS NOTIFICACIONES FILTRADAS:  ", data.result.value);
        this.ca_notification = new MatTableDataSource(data.result.value);
        this.ca_notification.paginator = this.DataFollow;
        this.ca_notification.sort = this.sort;
        this.__loader__.hideLoader();
      }
    });
  }
  //*************************************************************//
  //LIMPIEZA DE FILTROS//
  public cleanFilter(): void {
    this.filterNotification = { type: '' };
    this.filterServiceRecord = { numberServiceRecord: '' };
    this.range.reset({
      dateRange1: '',
      dateRange2: ''
    });
    this.data_model = {};
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
  //*************************************************************//
  archive(item,data){
    console.log(data);
    debugger
    if(data.checked){
      this._services.service_general_put('Notification/PutArchive/' + item.id +"/"+ data.checked,'').subscribe((data: any) => {
        if (data.success) {
          console.log("NOTIFICACION ARCHIVADA:  ", data);
          /*
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Notification Archived."
            },
            width: "350px"
          });
          */
          this.cleanFilter()
          this.get_Notification();
        }
      });
    }else{
      this._services.service_general_put('Notification/PutArchive/' + item.id +"/"+ data.checked,'').subscribe((data: any) => {
        if (data.success) {
          console.log("NOTIFICACION ARCHIVADA:  ", data);
          /*
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Notification Archived."
            },
            width: "350px"
          });
          */
          this.cleanFilter();
          this.get_Notification();
        }
      });
    }
  }
  //*************************************************************//
  marcarLeida(data){
    console.log(data);
    if(data.view == false){
      this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + true, '').subscribe((data => {
        if (data.success) {
          this.full.get_Notification();
          this.ngOnInit();
        }
      }));
    }else if(data.view == true){
      this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + false, '').subscribe((data => {
        if (data.success) {
          this.full.get_Notification();
          this.ngOnInit();
        }
      }));
    }
  }
  //***************************************************//
  //ACEPTAMOS NOTIFICACION//
  accept(data_, status){
    console.log(status);
     this._services.service_general_putnoapi(status,'').subscribe((data => {
       if(data.success){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Notification was accepted."
          },
          width: "350px"
        });
        this.archive(data_,{checked: true});
        this.marcarLeida(data_);
       }
     }))
  }
  //DECLINAMOS NOTIFICACION//
  decline(data_, status){
    console.log(status);
    this._services.service_general_putnoapi(status,'').subscribe((data => {
      console.log(data);
      //this.archive(data_,{checked: true});
      //this.marcarLeida(data_);
      if(data.success){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Notification was declined."
          },
          width: "350px"
        });
        this.archive(data_,{checked: true});
        this.marcarLeida(data_);
       }
    }))
  }
  // acceder a perfil
  profilePage(idUser: number, role: number){
    // let user = JSON.parse(localStorage.getItem('userData'));
    console.log('id user', idUser);
    console.log('role', role);

    // role id 19 es igual a "Super Admin"
    // if(role == 1 || role == 19){
    if(role != 2 && role != 3){
      this._router.navigateByUrl('profilemanager/'+idUser);
    }else if(role == 2){
      this._router.navigateByUrl('profilecoordinator/'+idUser);
    }else if(role == 3){
      this._router.navigateByUrl('profileconsultant/'+idUser);
    }
  }

}
