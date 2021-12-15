import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRequestedInvoiceComponent } from '../dialog/dialog-requested-invoice/dialog-requested-invoice.component';

@Component({
  selector: 'app-invoices-supplier',
  templateUrl: './invoices-supplier.component.html',
  styleUrls: ['./invoices-supplier.component.css']
})
export class InvoicesSupplierComponent implements OnInit {

  data:any = {};
  user:any;
  public __loader__: LoaderComponent = new LoaderComponent();
  public range = new FormGroup({
    renge1: new FormControl(),
    range2: new FormControl()
  });
  filteruno: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild('pagFollow') pagFollow: MatPaginator;
  // @ViewChild(MatPaginator, { static: true }) pagFollow: MatPaginator;
  @ViewChild(MatPaginator, {static: true})pagFollow: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;

  displayedColumns: string[] = ['Service Record', 'Service Line', 'Invoice No', 'Invoice Date', 'Invoice Type', 'Supplier Partner', 'Amount', 'Currency', 'Due Date', 'Country','Status','Accion'];
  dataSource:any;

  constructor(public _services: ServiceGeneralService, public router: Router, public _dialog: MatDialog, public _routerParams: ActivatedRoute) { }

  public filterInvoice: any = { type: '' };
  public filterPartner: any = { coordinator: '' };
  public filterClient: any = { name: '' };
  public filterCountry: any = { name: '' };
  public filterStatus: any = { status: '' };
  maxall: number = 20;


  //************************************************************************************//
  //CONSULTA DE INFORMACION PARA LA TABLA//
  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    this._services.service_general_get('Invoice/GetSupplierInvoices').subscribe((data => {
      if (data.success) {
        console.log(data.result.value);
        this.dataSource = new MatTableDataSource(data.result.value);
        this.dataSource.paginator = this.pagFollow;
        this.dataSource.sort = this.sort;
        this.__loader__.hideLoader();
      }
      }));
      this.catalogos();
  }
  getPageSizeOptions() {
    if (this.dataSource.paginator?.length > this.maxall) {
      return [10, 20, this.dataSource.paginator?.length];
    }
    else {
      return [10, 20];
    }
  }


  //************************************************************************************//
  //CONSULTA DE CATALOGOS//
  ca_partner = [];
  ca_status = [];
  ca_serviceLine = [];
  ca_invoiceType = [];
  ca_country = [];
  async catalogos(){
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_invoiceType = await this._services.getCatalogueFrom('GetInvoiceType');
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
    this._services.service_general_get('Invoice/GetSupplierInvoices' + params_in).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.result.value;
        console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
        this.dataSource = new MatTableDataSource(data.result.value);
        this.dataSource.paginator = this.pagFollow;
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
    if (this.range.value.renge1 != null) this.data.renge1 = this.filterDate(this.range.value.renge1);
    if (this.range.value.range2 != null) this.data.range2 = this.filterDate(this.range.value.range2);
    for (let item in this.data) {
      if (this.data[item] != '') {
        service_record_params_selected += `${ item }=${ this.data[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if(this.range.value.renge1 != null && this.range.value.range2 != null){
      this.consultaInformacionPorFiltro(params);
    }
  }
  //*************************************************************************************//
  public filterDate(date_in: any): string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }
  //*************************************************************************************//
  //ENTRA A LIMPIAR FILTROS DE BUSQUEDA//
  public cleanFilter(): void {
    this.filterInvoice = { type: '' };
    this.filterPartner = { coordinator: '' };
    this.filterClient = { name: '' };
    this.filterCountry = { name: '' };
    this.filterStatus = { status: '' };
     this.data = { };
     this.range.reset({renge1: '', range2: ''});
     this.filteruno = true;
     setTimeout(() => {
       this.filteruno = false;
     }, 2000);
    this.ngOnInit();
  }
  //*************************************************************************************//
  //DATA A IMPRIMIR DE MODAL//
  data_registro:any = {};
  sr(element){
    console.log("entra a funcion para obtener los detalle del servicio: ", element);
    this.data_registro.assinee = element.asignee;
    this.data_registro.partner = element.partner;
    this.data_registro.client = element.client;
  }
  //*************************************************************************************//
  //FUNCION PARA LA EDICION DEL REGISTRO//
  editarInvoice(element){
   const dialogRef = this._dialog.open(DialogRequestedInvoiceComponent, {
    width: "95%",
    data: {id: element.id}
   });

   dialogRef.afterClosed().subscribe(result => {
     this.ngOnInit();
  })
  }
}
