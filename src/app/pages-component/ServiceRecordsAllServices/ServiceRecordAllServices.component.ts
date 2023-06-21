import { Component, ViewChild, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../app/shared/loader';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { DialogExportAllServicesComponent } from '../dialog/edit-service-records/export-all-services.component'
import { ServiceGeneralService } from '../../service/service-general/service-general.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogExportComponent } from '../dialog/dialog-export/dialog-export.component';
import { MatSort } from '@angular/material/sort';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

@Component({
  selector: 'service-record-all-services',
  templateUrl: './ServiceRecordAllServices.component.html',
  styleUrls: ['../EditServiceRecord/editServiceRecord.component.scss']
})

export class ServiceRecordAllServicesComponent implements OnInit {

  public loader: LoaderComponent = new LoaderComponent();
  public service_type_catalog: any = [];
  public status_catalog: any = [];
  public date_range: any;
  public tab: any;
  public _imm: boolean = false;
  public _relo: boolean = false;
  Immigration: any;
  Relocation: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('DataFollow') DataFollow: MatPaginator;
  @ViewChild('DataFollowS') DataFollowS: MatPaginator;

  data_all: any = {};

  constructor(
    public _dialog: MatDialog,
    public _router: Router,
    public _services: ServiceGeneralService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public _routerParams: ActivatedRoute
  ) { }

  public filteruno: boolean = false;
  public table_columns_imm: string[] = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_5', 'campo_6', 'campo_7', 'campo_8', 'campo_9', 'campo_10', 'campo_11', 'campo_12'];
  public table_columns_relo: string[] = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_5', 'campo_6', 'campo_7', 'campo_8', 'campo_9', 'campo_10', 'campo_11', 'campo_12'];
  public data_services_imm: any = [];
  public data_services_relo: any = [];
  public filter_data: any = {};
  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  public numSR:any;
  //************************************************************************//
  async ngOnInit() {
    console.log("Entra a Immigration");
    console.log(this.__userlog__);
    this.numSR = this._routerParams.snapshot.params.id;
    this.loader.showLoader();
    this.service_type_catalog = await this._services.getCatalogueFrom('GetTypeService');
    this.status_catalog = await this._services.getCatalogueFrom('GetStatusWorkOrder');

    // setTimeout(() => {
    //   this.getDataImmigration();
    // }, 500);

    this.getDataRelocation();
    
    this.loader.hideLoader();
  }
  //************************************************************************//
  getDataRelocation() {
    console.log("Entra a Relocation");
    this.loader.showLoader();
     this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=2' + '&serviceRecordId='+this.numSR)
      .subscribe((response: any) => {
        console.log("Relo",response.result.value.length);
        if (response.success) {
          this._relo == response.result.value.length > 0 ? true : false;
          this.data_services_relo = new MatTableDataSource(response.result.value);
          this.data_services_relo.paginator = this.DataFollowS;
          this.data_services_relo.sort = this.sort;
        }
      });
    this.loader.hideLoader();
  }

  getDataImmigration(){
  this.loader.showLoader();
   this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=1' + '&serviceRecordId='+this.numSR)
      .subscribe((response: any) => {

        console.log("Imm",response.result.value.length);
        if (response.success) {
          this._imm == response.result.value.length > 0 ? true : false;
          this.data_services_imm = new MatTableDataSource(response.result.value);
          this.data_services_imm.paginator = this.DataFollow;
          this.data_services_imm.sort = this.sort;
        }
        this.loader.hideLoader();
      });
      this.loader.hideLoader();
 }
  //************************************************************************//
  //FUNCION PARA TABS//
  public service_line_ = 1;
  Line(param) {
    console.log(param);
    this.cleanFilter();
    if (param.index == 0) {
      this.getDataImmigration();
      this.service_line_ = 1;
    } else {
      this.getDataRelocation();
      this.service_line_ = 2;
    }
  }
  goBack() {
    window.history.back();
  }
  //************************************************************************//
  //BUSQUEDA DE INFORMACION A TRAVES DE CAMPO ABIERTO (IMMIGRATION Y RELOCATION)//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_services_relo.filter = filterValue.trim().toLowerCase();
  }
  //************************************************************************//
  //FUNCION PARA BUSQUEDA DE INFORMACION POR FILTROS//
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.filter_data) {
      if (this.filter_data[item] != '') {
        service_record_params_selected += `${item}=${this.filter_data[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    // console.log("PARAMETROS DE BUSQUEDA: ", params);
    debugger;
    if(this.service_line_ == 1){
      this.getServiceRecordTableData(params);
    }else{
      this.getServiceRecordTableDataRelocation(params);
    }
  }
  //************************************************************************//
  //CONSULTA INFORMACION POR FILTRO IMMIGRATION//
  public getServiceRecordTableData(params: string = ''): void {
    this.loader.showLoader();
    const params_in: string = params == '' ? '' : `&${params}`;
    this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=1' + '&serviceRecordId='+this.numSR + params_in).subscribe((data: any) => {
      if (data.success) {
        console.log("FILTROS DE IMMIGRATION: ", data);
        this.data_services_imm = new MatTableDataSource(data.result.value);
        this.data_services_imm.paginator = this.DataFollow;
        this.data_services_imm.sort = this.sort;
        this.loader.hideLoader();
      }
    });
  }
  //************************************************************************//
  //CONSULTA INFORMACION POR FILTRO (RELOCATION)//
  public getServiceRecordTableDataRelocation(params: string = ''): void {
    this.loader.showLoader();
    const params_in: string = params == '' ? '' : `&${params}`;
    this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=2' + '&serviceRecordId='+this.numSR + params_in).subscribe((data: any) => {
      if (data.success) {
        console.log("FILTROS DE IMMIGRATION: ", data);
        this.data_services_relo = new MatTableDataSource(data.result.value);
        this.data_services_relo.paginator = this.DataFollowS;
        this.data_services_relo.sort = this.sort;
        this.loader.hideLoader();
      }
    });
  }
  //************************************************************************//
  //CONSULTA DE INFORMACION POR FILTRO//
  public service_record_params_selected: string = '';
  public filteringServiceRecordTable(): void {
    this.service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.start != '' && this.range.value.start != null) this.filter_data.date_in = this.filterDate(this.range.value.start);
    if (this.range.value.end != '' && this.range.value.end != null) this.filter_data.date_last = this.filterDate(this.range.value.end);

    for (let item in this.filter_data) {
      if (this.filter_data[item] != '') {

        this.service_record_params_selected += `${item}=${this.filter_data[item]}&`;
        params = this.service_record_params_selected.substring(0, this.service_record_params_selected.length - 1);
      }
    }
    console.log(params);
    if(this.service_line_ == 1){
      this.getServiceRecordTableData(params);
    }else{
      this.getServiceRecordTableDataRelocation(params);
    }
  }
  //************************************************************************//
  //FUNCION PARA FORMATO DE FECHA//
  public filterDate(date_in: any): string {
    return `${date_in.getFullYear()}/${date_in.getMonth() + 1}/${date_in.getDate()}`;
  }
  //************************************************************************//
  //FUNCION PARA EXPORTAR PDF O EXCEL//
  showExportDialog() {
  }
  // showExportDialog() {
  //   const dialogRef = this.dialog.open(DialogExportComponent, {
  //     data: "",
  //     width: "40%"
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       document.getElementById("excel").click();
  //     }

  //     if (result === 2) {
  //       let tabla = [['Work Order', 'Service', 'Service ID', 'Program','Category', 'Location', 'Delivered To', 'Autho Date', 'Completion Date', 'Status', 'Coordinator', 'Supplier Partner', 'Service Fee']];
  //       for (let i = 0; i < this.data_services.filteredData.length; i++) {
  //         const element = this.data_services.filteredData[i];
  //         tabla.push([
  //           element.service,
  //           element.service,
  //           element.serviceNumber,
  //           element.program,
  //           element.category,
  //           element.location,
  //           element.deliveredTo,
  //           element.autho,
  //           element.autho,
  //           element.status,
  //           element.coordinator,
  //           element.supplier,
  //           element.projectedFee,
  //         ])
  //       }
  //       console.log(tabla);
  //       // Set the fonts to use
  //       PdfMakeWrapper.setFonts(pdfFonts);

  //       const pdf = new PdfMakeWrapper();

  //       pdf.pageMargins([30, 30, 30, 30]);
  //       pdf.pageOrientation('landscape');
  //       pdf.defaultStyle({
  //         fontSize: 8,
  //         alignment: 'center'
  //       });
  //       pdf.add(new Table(tabla).layout('lightHorizontalLines').end);

  //       pdf.create().download('All services.pdf');
  //     }
  //   });
  // }
  //************************************************************************//
  //FUNCION PARA LIMPIAR FILTROS//
  public cleanFilter(): void {
    this.range.reset();
    this.filter_data = {

    };
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    if(this.service_line_ == 1){
      this.getDataImmigration();
    }else{
      this.getDataRelocation();
    }
  }

}
