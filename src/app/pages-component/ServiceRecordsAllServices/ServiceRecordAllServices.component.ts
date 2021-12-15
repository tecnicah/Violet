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
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { MatSort } from '@angular/material/sort';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

@Component({
  selector: 'service-record-all-services',
  templateUrl: './ServiceRecordAllServices.component.html',
  styleUrls: []
})

export class ServiceRecordAllServicesComponent implements OnInit {

  public loader: LoaderComponent = new LoaderComponent();
  public service_type_catalog: any = [];
  public status_catalog: any = [];
  public date_range: any;
  public tab: any;
  Immigration: any;
  Relocation: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('DataFollow') DataFollow: MatPaginator;
  @ViewChild('DataFollowS') DataFollowS: MatPaginator;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'export',
    options: { // html-docx-js document options
      orientation: 'landscape'
    }
  }

  data_all: any = {};

  constructor(
    public _dialog: MatDialog,
    public _router: Router,
    public _services: ServiceGeneralService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public exportAsService: ExportAsService,
    public _routerParams: ActivatedRoute
  ) { }

  public filteruno: boolean = false;
  public table_columns: string[] = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_5', 'campo_6', 'campo_7', 'campo_8', 'campo_9', 'campo_10', 'campo_11', 'campo_12'];
  public data_services: any = [];
  public filter_data: any = {};
  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public numSR:any;
  //************************************************************************//
  async ngOnInit() {
    console.log("Entra a Immigration");
    this.numSR = this._routerParams.snapshot.params.id;
    this.loader.showLoader();
    this.service_type_catalog = await this._services.getCatalogueFrom('GetTypeService');
    this.status_catalog = await this._services.getCatalogueFrom('GetStatusWorkOrder');

    await this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=' + this.service_line_ + '&serviceRecordId='+this.numSR)
      .subscribe((response: any) => {
        console.log(response.result.value);
        if (response.success) {
          this.data_services = new MatTableDataSource(response.result.value);
          this.data_services.paginator = this.DataFollow;
          this.data_services.sort = this.sort;
        }
      });
    this.loader.hideLoader();
  }
  //************************************************************************//
  async getDataRelocation() {
    console.log("Entra a Relocation");
    this.loader.showLoader();
    await this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=' + this.service_line_ + '&serviceRecordId='+this.numSR)
      .subscribe((response: any) => {
        console.log(response.result.value);
        if (response.success) {
          this.data_services = new MatTableDataSource(response.result.value);
          this.data_services.paginator = this.DataFollowS;
          this.data_services.sort = this.sort;
        }
      });
    this.loader.hideLoader();
  }
  //************************************************************************//
  //FUNCION PARA TABS//
  public service_line_ = 1;
  Line(param) {
    console.log(param);
    if (param.index == 0) {
      this.service_line_ = 1;
      this.ngOnInit();
    } else {
      this.service_line_ = 2;
      this.getDataRelocation();
    }
  }
  goBack() {
    window.history.back();
  }
  //************************************************************************//
  //BUSQUEDA DE INFORMACION A TRAVES DE CAMPO ABIERTO (IMMIGRATION Y RELOCATION)//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_services.filter = filterValue.trim().toLowerCase();
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
    console.log("PARAMETROS DE BUSQUEDA: ", params);
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
    this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=' + this.service_line_ + '&serviceRecordId='+this.numSR + params_in).subscribe((data: any) => {
      if (data.success) {
        console.log("FILTROS DE IMMIGRATION: ", data);
        this.data_services = new MatTableDataSource(data.result.value);
        this.data_services.paginator = this.DataFollow;
        this.data_services.sort = this.sort;
        this.loader.hideLoader();
      }
    });
  }
  //************************************************************************//
  //CONSULTA INFORMACION POR FILTRO (RELOCATION)//
  public getServiceRecordTableDataRelocation(params: string = ''): void {
    this.loader.showLoader();
    const params_in: string = params == '' ? '' : `&${params}`;
    this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=' + this.service_line_ + '&serviceRecordId='+this.numSR + params_in).subscribe((data: any) => {
      if (data.success) {
        console.log("FILTROS DE IMMIGRATION: ", data);
        this.data_services = new MatTableDataSource(data.result.value);
        this.data_services.paginator = this.DataFollowS;
        this.data_services.sort = this.sort;
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
    const dialogRef = this.dialog.open(DialogExportComponent, {
      data: "",
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        document.getElementById("excel").click();
      }

      if (result === 2) {
        let tabla = [['Work Order', 'Service', 'Service ID', 'Program','Category', 'Location', 'Delivered To', 'Autho Date', 'Completion Date', 'Status', 'Coordinator', 'Supplier Partner', 'Service Fee']];
        for (let i = 0; i < this.data_services.filteredData.length; i++) {
          const element = this.data_services.filteredData[i];
          tabla.push([
            element.service,
            element.service,
            element.serviceNumber,
            element.program,
            element.category,
            element.location,
            element.deliveredTo,
            element.autho,
            element.autho,
            element.status,
            element.coordinator,
            element.supplier,
            element.projectedFee,
          ])
        }
        console.log(tabla);
        // Set the fonts to use
        PdfMakeWrapper.setFonts(pdfFonts);

        const pdf = new PdfMakeWrapper();

        pdf.pageMargins([30, 30, 30, 30]);
        pdf.pageOrientation('landscape');
        pdf.defaultStyle({
          fontSize: 8,
          alignment: 'center'
        });
        pdf.add(new Table(tabla).layout('lightHorizontalLines').end);

        pdf.create().download('All services.pdf');
      }
    });
  }
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
      this.ngOnInit();
    }else{
      this.getDataRelocation();
    }
  }

}
