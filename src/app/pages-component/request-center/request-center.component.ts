import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogRequestedInvoiceComponent } from '../dialog/dialog-requested-invoice/dialog-requested-invoice.component';
import { DialogRequestPaymentNewComponent } from '../dialog/dialog-request-payment-new/dialog-request-payment-new.component';

@Component({
  selector: 'app-request-center',
  templateUrl: './request-center.component.html',
  styleUrls: ['./request-center.component.css']
})
export class RequestCenterComponent implements OnInit {

  filteruno: boolean = false;
  dataSource: any;
  displayedColumns: string[] = ['Service Record', 'Service Line', 'Request Date', 'Request Type', 'Description', 'Amount', 'Currency', 'Due Date', 'Country', 'Status', 'Accion'];
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator, {static: true}) DataFollow: MatPaginator;
  @ViewChild(MatPaginator, {static:true})DataFollow: MatPaginator;
  // @ViewChild('paginatorElement', { read: ElementRef }) paginatorHtmlElement: ElementRef;

  public __loader__: LoaderComponent = new LoaderComponent();
  public range = new FormGroup({
    rangeDate1: new FormControl(),
    rangeDate2: new FormControl()
  });
  data: any = {};
  user: any;
  constructor(public _services: ServiceGeneralService, public router: Router, public _dialog: MatDialog) { }

  public filterRequested: any = { requestType: '' };
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
    this._services.service_general_get('RequestInvoice/GetRequestCenter').subscribe((data => {
      if (data.success) {
        console.log(data.result.value);
        this.dataSource = new MatTableDataSource(data.result.value);
        this.dataSource.paginator = this.DataFollow;
        this.dataSource.sort = this.sort;
        this.__loader__.hideLoader();
      }
    }));
    this.catalogos();
    this.consultaPermisos();
  }
  getPageSizeOptions() {
    if (this.dataSource.paginator?.length > this.maxall) {
      return [10, 20, this.dataSource.paginator?.length];
    }
    else {
      return [10, 20];
    }
  }
  //******************************************************************************//
  public permission_read: boolean = false;
  public permission_write: boolean = false;
  public permission_delete: boolean = false;
  public permission_edit: boolean = false;
  consultaPermisos() {
    console.log("CONSULTA PARA PERMISOS DE USUARIO");
    let url = localStorage.getItem('url_permisos');
    this._services.service_general_get('Role/' + url).subscribe(data => {
      if (data.success) {
        console.log("Permisos: ", data.result.value)
        this.permission_read = data.result.value[0].reading;
        this.permission_write = data.result.value[0].writing;
        this.permission_edit = data.result.value[0].editing;
        this.permission_delete = data.result.value[0].deleting;
      }
    })
  }
  //************************************************************************************//
  //CONSULTA DE CATALOGOS//
  ca_invoice = [];
  ca_serviceLine = [];
  ca_partner = [];
  ca_status = [];
  ca_country = [];
  async catalogos() {
    this.ca_invoice = await this._services.getCatalogueFrom('GetRequestType');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_partner = await this._services.getCatalogueFrom('GetPartner');
    this.ca_status = await this._services.getCatalogueFrom('GetStatusInvoice');
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
  }
  //*************************************************************************************//
  ca_cliente = [];
  getCliente() {
    this._services.service_general_get('Catalogue/GetClient/' + this.data.partner).subscribe(async data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_cliente = data.result.value;
      }
    });
  }
  //*************************************************************************************//
  ca_coordinator = [];
  getCoordinator() {
    this._services.service_general_get('Catalogue/GetCoordinator/' + this.data.client + "?servileLine=" + this.data.serviceLine).subscribe(async data => {
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
        service_record_params_selected += `${item}=${this.data[item]}&`;
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
    const params_in: string = params == '' ? '' : `?${params}`;
    console.log(params_in);
    this._services.service_general_get('RequestInvoice/GetInvoiceList/' + this.user.id + params_in).subscribe((data: any) => {
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
        service_record_params_selected += `${item}=${this.data[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if (this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null) {
      this.consultaInformacionPorFiltro(params);
    }
  }
  //*************************************************************************************//
  public filterDate(date_in: any): string {
    return `${date_in.getFullYear()}/${date_in.getMonth() + 1}/${date_in.getDate()}`;
  }
  //*************************************************************************************//
  //ENTRA A LIMPIAR FILTROS DE BUSQUEDA//
  public cleanFilter(): void {
    this.filterRequested = { requestType: '' };
    this.filterPartner = { coordinator: '' };
    this.filterClient = { name: '' };
    this.filterCountry = { name: '' };
    this.filterStatus = { status: '' };

    this.range.reset({rangeDate1: '', rangeDate2: ''});
    this.data = {};
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
  //*************************************************************************************//
  //DATA A IMPRIMIR DE MODAL//
  data_registro: any = {};
  sr(element) {
    this.data_registro.assinee = element.asignee;
    this.data_registro.partner = element.partner;
    this.data_registro.client = element.client;
    this.data_registro.coordinator = element.coordinator;
  }
  //*************************************************************************************//
  //FUNCION PARA LA EDICION DEL REGISTRO//
  editarInvoice(element) {
    console.log("DATA A EDITAR: ", element);
    if (element.request_id == 1) {
      this.thirdPartyInvoice(element);
    }
    if (element.request_id == 2) {
      this.requestPayment(element);
    }

  }
  //*************************************************************************************//
  //FUNCION PARA LA EDICION DEL REGISTRO (THIRD PARTY INVOICE) REQUEST PAYMENT//
  thirdPartyInvoice(element) {
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      width: "95%",
      data: { id: element.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  //*************************************************************************************//
  //FUNCION PARA LA EDICION DEL REGISTRO (THIRD PARTY INVOICE)//
  requestPayment(element) {
    const dialogRef = this._dialog.open(DialogRequestedInvoiceComponent, {
      width: "95%",
      data: { id: element.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
