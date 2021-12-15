import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  filteruno: boolean = false;
  dataSource:any;
  displayedColumns: string[] = ['Status', 'Service Line', 'Service Record', 'Request Date', 'Invoice Type','Amount', 'Due Date', 'Country', 'Client', 'Accion'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('DataFollow') DataFollow: MatPaginator;
  public __loader__: LoaderComponent = new LoaderComponent();
  public range = new FormGroup({
    rangeDate1: new FormControl(),
    rangeDate2: new FormControl()
  });
  user:any;
  data:any = {};

  constructor(public _services: ServiceGeneralService, public router:Router) { }

  //************************************************************************************//
  //CONSULTA DE INFORMACION PARA LA TABLA//
  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    this._services.service_general_get('RequestInvoice/GetInvoiceList/'+this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data.result.value);
        this.dataSource = new MatTableDataSource(data.result.value);
        this.dataSource.paginator = this.DataFollow;
        this.dataSource.sort = this.sort;
        this.__loader__.hideLoader();
      }
      }));
      this.catalogos();
  }
  //************************************************************************************//
  //CONSULTA DE CATALOGOS//
  ca_invoice = [];
  ca_serviceLine = [];
  ca_partner = [];
  ca_status = [];
  ca_country = [];
  async catalogos(){
    this.ca_invoice = await this._services.getCatalogueFrom('GetInvoiceType');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_partner = await this._services.getCatalogueFrom('GetPartner');
    this.ca_status = await this._services.getCatalogueFrom('GetStatusInvoice');
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
  }
  //*************************************************************************************//
  ca_cliente = [];
  getCliente(){
    this._services.service_general_get('Catalogue/GetClient/'+this.data.partner).subscribe(async data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_cliente = data.result.value;
      }
    });
  }
  //*************************************************************************************//
  ca_coordinator = [];
  getCoordinator(){
    this._services.service_general_get('Catalogue/GetCoordinator/'+this.data.client+"?servileLine="+this.data.serviceLine).subscribe(async data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_coordinator = data.result.value;
      }
    });
  }
  //*************************************************************************************//
  //BUSQUEDA DE INFORMACION A TRAVES DE CAMPO ABIERTO//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //*************************************************************************************//
  //BUSQUEDA DE INFORMACION A TRAVES DE CATALOGOS//
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.data) {
      if (this.data[item] != '') {
        service_record_params_selected += `${ item }=${ this.data[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.consultaInformacionPorFiltro(params);
  }
  //*************************************************************************************//
  //CONSULTA INFORMACION POR FILTRO//
  public consultaInformacionPorFiltro(params: string = ''): void {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    console.log(params_in);
    this._services.service_general_get('RequestInvoice/GetInvoiceList/'+this.user.id + params_in).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.result.value;
        console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
        this.dataSource = new MatTableDataSource(data.result.value);
        this.dataSource.paginator = this.DataFollow;
        this.dataSource.sort = this.sort;
        this.__loader__.hideLoader();
      }
    });
  }
  //*************************************************************************************//  
  //FILTRO FECHA//
  public filteringServiceRecordTable(): void {
  let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.rangeDate1 != null) this.data.renge1 = this.filterDate(this.range.value.rangeDate1);
    if (this.range.value.rangeDate2 != null) this.data.range2 = this.filterDate(this.range.value.rangeDate2);
    for (let item in this.data) {
      if (this.data[item] != '') {
        service_record_params_selected += `${ item }=${ this.data[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if(this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null){  
      this.consultaInformacionPorFiltro(params);
    }
  }
  //*************************************************************************************//
  public filterDate(date_in: any): string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }
  //*************************************************************************************//
  //ENTRA A LIMPIAR FILTROS DE BUSQUEDA//
   public cleanFilter():void {
     this.data = { };
     this.filteruno = true;
     setTimeout(() => {
       this.filteruno = false;
     }, 2000);
    this.ngOnInit();
  }
  //*************************************************************************************//
  data_registro:any = {};
  sr(element){
    this.data_registro.assinee = element.asignee;
    this.data_registro.partner = element.partner;
    this.data_registro.client = element.client;
    this.data_registro.coordinator = element.coordinator;
  }
  //*************************************************************************************//
  //FUNCION PARA LA EDICION DEL REGISTRO//
  editarInvoice(element){
    console.log("DATA A EDITAR: ",element);
      localStorage.setItem('idInvoice', element.id);
      this.router.navigateByUrl('requestInvoice');
  }
}
