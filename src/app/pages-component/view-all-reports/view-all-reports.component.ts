import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoaderComponent } from 'app/shared/loader';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

export interface reportHistory {
  activity: string;
  conclusion: string;
  createdBy: number;
  createdDate: Date;
  creationDate: Date;
  endTime: string;
  id: number;
  reportBy: number;
  nameBy : string;
  reportDate: Date;
  reportNo: number;
  serviceLine: number;
  serviceLineName: string;
  serviceReportDays: serviceReportDays[];
  startTime: string;
  totalTime: string;
  updateBy: number;
  updatedDate: string;
  workOrder: number;
}

export interface serviceReportDays {
  category: number;
  comments: string;
  createdBy: number;
  createdDate: Date;
  id: number;
  reportDayId: number;
  service: number;
  serviceName: string;
  time: string;
  updateBy: number;
  updatedDate: Date;
}

const ELEMENT_DATA: reportHistory[] = [];

@Component({
  selector: 'app-view-all-reports',
  templateUrl: './view-all-reports.component.html',
  styleUrls: ['./view-all-reports.component.css']
})
export class ViewAllReportsComponent implements OnInit {

  public filteruno: boolean = false;
  public range = new FormGroup({
    initialReportDate: new FormControl(),
    finalReportDate: new FormControl()
  });
  public user: any;
  public __loader__: LoaderComponent = new LoaderComponent();
  public search: any = {
    serviceLine: '',
  };

  constructor(
    public _services: ServiceGeneralService, 
    public _router: Router,
    public _routerParams: ActivatedRoute) { }

  //***************************************************************************//
  //CONSULTA DE REPORTES//
  //public all_reports: any;
  all_reports = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('Supplier') Supplier: MatPaginator;
  public sr:any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.__loader__.showLoader();
    let id_sr = this._routerParams.snapshot.params.id;
    this.sr = id_sr;
    this._services.service_general_get('ReportDay/ReportsHistory?sr='+id_sr).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        data.result.forEach(element => {
          ELEMENT_DATA.push({
            activity: element.activity,
            conclusion: element.conclusion,
            createdBy: element.createdBy,
            createdDate: element.createdDate,
            creationDate: element.creationDate,
            endTime: element.endTime,
            id: element.id,
            reportBy: element.reportBy,
            nameBy : element.reportByNavigation?.name,
            reportDate: element.reportDate,
            reportNo: element.reportNo,
            serviceLine: element.serviceLine,
            serviceLineName: element.serviceLineName,
            serviceReportDays: element.serviceReportDays,
            startTime: element.startTime,
            totalTime: element.totalTime,
            updateBy: element.updateBy,
            updatedDate: element.updatedDate,
            workOrder: element.workOrder
          });
        });
        this.all_reports = new MatTableDataSource(ELEMENT_DATA);
        this.all_reports.paginator = this.Supplier;
        this.all_reports.sort = this.sort;
        console.log("all_reports =====================", this.all_reports);
        //this.all_reports = data.result;
        this.__loader__.hideLoader();
      }
    }));
    this.getCatalogos();
  }
  //***************************************************************************//
  //PARA CATLOGOS//
  public caServiceLine = [];
  async getCatalogos() {
    this.caServiceLine = await this._services.getCatalogueFrom('GetServiceLine');

  }
  //***************************************************************************//
  //PARA LIMPIAR FILTROS//
  public cleanFilter(): void {
    this.range.reset({ start: '', end: '' });
    this.search.serviceLine = null;
    this.search = {};
    this.filteruno = true;
    this.ngOnInit();
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
  }
  //***************************************************************************//
  //FILTER DATA BY INPUT//
  applyFilter(event: Event) {
   // debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.all_reports.filter = filterValue.trim().toLowerCase();
   // console.log(this.all_reports.data);
  }
  //***************************************************************************//
  //SEARCH DATA BY FILTER//
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.search) {
      if (this.search[item] != '') {
        service_record_params_selected += `${item}=${this.search[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getServiceRecordTableData(params);
  }
  //***************************************************************************//
  public getServiceRecordTableData(params: string = ''): void {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `&${params}`;
    this._services.service_general_get('ReportDay/ReportsHistory?sr='+ this.sr + params_in).subscribe((data: any) => {
      if (data.success) {
        console.log(data.result);
        this.all_reports = new MatTableDataSource(data.result);
        this.all_reports.paginator = this.Supplier;
        this.all_reports.sort = this.sort;
        this.__loader__.hideLoader();
      }
    },(err)=>{
      console.log(err);
      this.__loader__.hideLoader();
      this.ngOnInit();
    });
  }
  //****************************************************************************//
  //FILTER BY DATE//
  public filteringServiceRecordTable(): void {

    let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.initialReportDate != null) this.search.initialReportDate = this.filterDate(this.range.value.initialReportDate);
    if (this.range.value.finalReportDate != null) this.search.finalReportDate = this.filterDate(this.range.value.finalReportDate);

    for (let item in this.search) {
      if (this.search[item] != '') {
        service_record_params_selected += `${item}=${this.search[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }

    if (this.range.value.initialReportDate != null && this.range.value.finalReportDate != null) {
      this.getServiceRecordTableData(params);
    }
  }
  //******************************************************************************//
  public filterDate(date_in: any): string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }
  //******************************************************************************//
  goBack() {
    //window.history.back();
    this._router.navigateByUrl("/editServiceRecord/"+this._routerParams.snapshot.params.id+"/1");
  }
}
