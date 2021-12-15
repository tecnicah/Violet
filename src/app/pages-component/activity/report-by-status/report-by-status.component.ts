import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogExportComponent } from 'app/pages-component/dialog/dialog-export/dialog-export.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { PdfMakeWrapper, Table, Cell, Columns, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

@Component({
  selector: 'app-report-by-status',
  templateUrl: './report-by-status.component.html',
  styleUrls: ['./report-by-status.component.scss']
})
export class ReportByStatusComponent implements OnInit {

  constructor(public rutaActiva: ActivatedRoute,
              public _services: ServiceGeneralService,
              public dialog: MatDialog) { }

              
  @ViewChild('iisort') iisort: MatSort;
  @ViewChild('pag') pag: MatPaginator;
  filterData: any = {
    country: null,
    city: null,
    serviceLine: null,
    serviceRecord: null,
    partner: null,
    client: null,
    supplierPartner: null,
    range1: null,
    range2: null,
    serviceCategory: null,
  }
  dataR:any = {};
  ca_country: any[] = [];
  ca_city: any[] = [];
  ca_SL: any[] = [];
  ca_SR: any[] = [];
  ca_service: any[] = [];
  ca_P: any[] = [];
  ca_SP: any[] = [];
  ca_client: any[] = [];
  userData: any = {};
  ca_status: any[] = [];
  filterdos: boolean = false;

  datasource: any;

  displayedColumns: string[] = ['numberServiceRecord', 
                                'vip', 
                                'serviceLine',
                                'status',
                                'initialAutho',
                                'country',
                                'city',
                                'partner',
                                'client',
                                'assigneeName',
                                'services',
                                'coordinator',
                                'supplierPartner']

  public range = new FormGroup({
    range1: new FormControl(),
    range2: new FormControl()
  });

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getData();
    this.catalogos();
  }

  getData(){
    this._services.service_general_get('Activity/GetServiceRecordByStatus/'+this.rutaActiva.snapshot.params.idStatus).subscribe(r=>{
        if(r.success &&  r.result.value.services.length > 0){
          this.dataR.number = r.result.value.services.length;
          console.log(this.dataR);
          this.datasource = new MatTableDataSource(r.result.value.services);
        setTimeout(() => {
          this.datasource.paginator = this.pag;
          this.datasource.sort = this.iisort;
          console.log(this.datasource);
        }, 10);
        
        }else{
          this.dataR = {};
          console.log(this.dataR);
          this.datasource = new MatTableDataSource(r.result.value.services);
        setTimeout(() => {
          this.datasource.paginator = this.pag;
          this.datasource.sort = this.iisort;
          console.log(this.datasource);
        }, 10);
        }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
}

  async catalogos(){
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_SL = await this._services.getCatalogueFrom('GetServiceLine');  
    this.ca_SL = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_status = await this._services.getCatalogueFrom('GetStatus');
    this.ca_service = await this._services.getCatalogueFrom('GetCataegory');
    this.ca_P = await this._services.getCatalogueFrom('GetPartner');
    this._services.service_general_get('Catalogue/GetCompany').subscribe(r=>{
      if(r.success){
        console.log(r);
        this.ca_SP = r.result.value;
      }
    })

  }

  getClient(id){
    this._services.service_general_get("Catalogue/GetClient/"+id).subscribe((data =>{
      if(data.success){
          console.log("select cliente: ", data.result);
          this.ca_client = data.result;
      }
  }));
  }

  getCity(id){
    console.log(id);
    this._services.service_general_get('Catalogue/GetState?country='+id).subscribe(r=>{
      if(r.success){
        this.ca_city = r.result
      }
    })
  }

  clearFilterParner(){
    this.filterData ={
        country: null,
        city: null,
        serviceLine: null,
        serviceRecord: null,
        partner: null,
        client: null,
        supplierPartner: null,
        range1: null,
        range2: null,
        serviceCategory: null,
    };
    this.filterdos = true;
        setTimeout(() => {
        this.filterdos = false;
    }, 2000);
    this.getData();
  }


  showExportDialog(){
    const dialogRef = this.dialog.open(DialogExportComponent, {
        data: this.datasource.filteredData,
        width: "40%"
    });
  
    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result === 1){
            document.getElementById("excel").click();
        }
  
        if(result === 2){
            let tabla = [['Service Record', 
            'Vip', 
            'Service Line',
            'Status',
            'Autho Date',
            'Country',
            'City',
            'Partner',
            'Client',
            'Assignee Name',
            'Services',
            'Coordinator',
            'Supplier Partner']]
            for (let i = 0; i < this.datasource.filteredData.length; i++) {
                const element = this.datasource.filteredData[i];
                tabla.push([
                    element.numberServiceRecord,
                    element.vip, element.serviceLine,element.status, this.formatDate(element.initialAutho),
                    element.country, element.city, element.partner, element.client, element.assigneeName,
                    element.services.length, element.coordinator.length, element.supplierPartner
                ])
            }
            console.log(tabla);
              // Set the fonts to use
            PdfMakeWrapper.setFonts(pdfFonts);
  
            const pdf = new PdfMakeWrapper();
  
            pdf.pageMargins([30,30,30,30]);
            pdf.pageOrientation('landscape');
            pdf.defaultStyle({
                fontSize: 9,
                alignment: 'center'
            });
            pdf.add(new Table(tabla).layout('lightHorizontalLines').end);
            pdf.create().download(this.rutaActiva.snapshot.params.statusName+'_Report.pdf');

        }
    });
  }
  
  formatDate(fecha){
    let date = new Date(fecha);
    let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let montstring = "";
  switch (month) {
  case 1:
    montstring = "Ene"
    break;
  case 2:
    montstring = "Feb"
    break;
  case 3:
    montstring = "Mar"
    break;
  case 4:
    montstring = "Abr"
    break;
  case 5:
    montstring = "May"
    break;
  case 6:
    montstring = "Jun"
    break;
  case 7:
    montstring = "Jul"
    break;
  case 8:
    montstring = "Ago"
    break;
  case 9:
    montstring = "Sep"
    break;
  case 10:
    montstring = "Oct"
    break;
  case 11:
    montstring = "Nov"
    break;
  case 12:
    montstring = "Dic"
    break;
  default:
    break;
  }
  return day+" "+montstring+" "+year;
  }

  //*************************************************//
  //BUSQUEDA DE INFORMACION A TRAVES DE CATALOGOS//
  data_directory:any = {};
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.data_directory) {
      if (this.data_directory[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_directory[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.consultaInformacionPorFiltro(params);
  }
  //*************************************************//
  //CONSULTA INFORMACION POR FILTRO//
  public consultaInformacionPorFiltro(params: string = ''): void {
    const params_in: string = params == '' ? '' : `?${ params }`;
    console.log(params_in);
    this._services.service_general_get('Activity/GetServiceRecordByStatus/'+this.rutaActiva.snapshot.params.idStatus + params_in).subscribe((r: any) => {
      if(r.success &&  r.result.value.services.length > 0){
        this.dataR.number = r.result.value.services.length;
        console.log(this.dataR);
        this.datasource = new MatTableDataSource(r.result.value.services);
      setTimeout(() => {
        this.datasource.paginator = this.pag;
        this.datasource.sort = this.iisort;
        console.log(this.datasource);
      }, 10);
      
      }else{
        this.dataR = {};
        console.log(this.dataR);
        this.datasource = new MatTableDataSource(r.result.value.services);
      setTimeout(() => {
        this.datasource.paginator = this.pag;
        this.datasource.sort = this.iisort;
        console.log(this.datasource);
      }, 10);
      }
    });
  }
  //*************************************************//


  public service_record_params_selected: string = '';
  public filteringServiceRecordTable(): void {

    this.service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.range1 != '' && this.range.value.range1 != null) this.data_directory.startDate = this.filterDate(this.range.value.range1);
    if (this.range.value.range2 != '' && this.range.value.range2 != null) this.data_directory.endDate = this.filterDate(this.range.value.range1);
    debugger
    for (let item in this.data_directory) {

      if (this.data_directory[item] != '') {

        this.service_record_params_selected += `${ item }=${ this.data_directory[item] }&`;
        params = this.service_record_params_selected.substring(0, this.service_record_params_selected.length - 1);

      }

    }

    this.consultaInformacionPorFiltro(params);

  }

  public filterDate(date_in: any): string {

    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;

  }

}

