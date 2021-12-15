import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogExportComponent } from 'app/pages-component/dialog/dialog-export/dialog-export.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { PdfMakeWrapper, Table, Cell, Columns, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

@Component({
  selector: 'app-report-country-partner',
  templateUrl: './report-country-partner.component.html',
  styleUrls: ['./report-country-partner.component.scss']
})
export class ReportCountryPartnerComponent implements OnInit {

  constructor(public rutaActiva: ActivatedRoute,
              public _service: ServiceGeneralService,
              public router: Router,
              public dialog: MatDialog) { }

  //@ViewChild('iisort') iisort: MatSort;
  @ViewChild(MatSort, {static: true}) iisort: MatSort;

  @ViewChild(MatPaginator, {static: true}) pag: MatPaginator;

  // @ViewChild('pag') pag: MatPaginator;

  data: any = {};
  ca_P: any[] = [];
  ca_SP: any[] = [];
  ca_client: any[] = [];
  ca_status: any[] = [];
  ca_SL: any[] = [];
  ca_city: any[] =[];
  ca_service: any[] = [];

  filters: any = {
    partner:null,
    client:null,
    supplierPartner:null,
    range1:null,
    range2:null,
    status:null,
    serviceLine:null,
    serviceCategory:null,
    city:null,
  }
  maxall: number = 20;

  filterdos: boolean = false;
  datasource: any;

  displayedColumns: string[] = ['numberServiceRecord',
                                'vip',
                                'serviceLine',
                                'status',
                                'initialAutho',
                                'city',
                                'partner',
                                'client',
                                'assigneeName',
                                'services',
                                'coordinator',
                                'supplierPartner'];

  ngOnInit(): void {
    this.catalogos();
    console.log(this.rutaActiva.snapshot.params.idparner);
    if(this.rutaActiva.snapshot.params.partner == undefined){
      this.getReportCountry();
    }else{
      this.getReportCountryPartner();
      this.getClient(this.rutaActiva.snapshot.params.idparner);
    }
  }
  //*******************************************//
  getPageSizeOptions(): number[] {
    if (this.datasource.paginator.length > this.maxall)
    return [10, 20,  this.datasource.paginator.length ];
    else
     return [10, 20];
  }

  filterDe(){
    if(this.rutaActiva.snapshot.params.partner == undefined){
      this.getReportCountry();
    }else{
      this.getReportCountryPartner();
    }
  }

  getReportCountry(){
    this._service.service_general_get(`Activity/GetReportByCountry/${this.rutaActiva.snapshot.params.idcountry}
                                        ?partner=${this.filters.partner}
                                        &client=${this.filters.client}
                                        &supplierPartner=${this.filters.supplierPartner}
                                        &range1=${this.filters.range1}
                                        &range2=${this.filters.range2}
                                        &status=${this.filters.status}
                                        &serviceLine=${this.filters.serviceLine}
                                        &serviceCategory=${this.filters.serviceCategory}
                                        &city=${this.filters.city}`).subscribe(r=>{
      console.log(r.result.value);
      if(r.success){
        this.data = r.result.value;
        this.datasource = new MatTableDataSource(this.data.serviceRecords);
        setTimeout(() => {
          this.datasource.paginator = this.pag;
          this.datasource.sort = this.iisort;
          console.log(this.datasource);
        }, 10);

      }
    })
  }

  getReportCountryPartner(){
    this._service.service_general_get(`Activity/GetReportByPartner/${this.rutaActiva.snapshot.params.idcountry}/${this.rutaActiva.snapshot.params.idparner}
                                        ?client=${this.filters.client}
                                        &supplierPartner=${this.filters.supplierPartner}
                                        &range1=${this.filters.range1}
                                        &range2=${this.filters.range2}
                                        &status=${this.filters.status}
                                        &serviceLine=${this.filters.serviceLine}
                                        &serviceCategory=${this.filters.serviceCategory}
                                        &city=${this.filters.city}`).subscribe(r=>{
      console.log(r.result.value);
      if(r.success){
        this.data = r.result.value;
        this.datasource = new MatTableDataSource(this.data.serviceRecords);
        setTimeout(() => {
          this.datasource.paginator = this.pag;
          this.datasource.sort = this.iisort;
          console.log(this.datasource);
        }, 10);

      }
    })
  }

  async catalogos(){

    this.ca_SL = await this._service.getCatalogueFrom('GetServiceLine');
    this.ca_status = await this._service.getCatalogueFrom('GetStatus');
    this.ca_service = await this._service.getCatalogueFrom('GetCataegory');
    this.ca_P = await this._service.getCatalogueFrom('GetPartner');
    this._service.service_general_get('Catalogue/GetCompany').subscribe(r=>{
      if(r.success){
        console.log(r);
        this.ca_SP = r.result.value;
      }
    })

    this._service.service_general_get('Catalogue/GetState?country='+this.rutaActiva.snapshot.params.idcountry).subscribe(r=>{
      if(r.success){
        this.ca_city = r.result
      }
    })

  }

  getClient(id){
    this._service.service_general_get("Catalogue/GetClient/"+id).subscribe((data =>{
      if(data.success){
          console.log("select cliente: ", data.result);
          this.ca_client = data.result;
      }
  }));
  }

  clearFilterParner(){
    this.filters ={
      partner:null,
      client:null,
      upplierPartner:null,
      range1:null,
      range2:null,
      status:null,
      serviceLine:null,
      serviceCategory:null,
      city:null,
    };
    this.filterdos = true;
        setTimeout(() => {
        this.filterdos = false;
    }, 2000);
    if(this.rutaActiva.snapshot.params.partner == undefined){
      this.getReportCountry();
    }else{
      this.getReportCountryPartner();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
}

viewParner(name,idTypePartnerClientProfile){
  this.router.navigateByUrl(`reports/${this.rutaActiva.snapshot.params.country}/${this.rutaActiva.snapshot.params.idcountry}/${name}/${idTypePartnerClientProfile}`);
  this.ngOnInit();
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
          let tabla = [['Service Record', 'VIP', 'Service Line', 'Status', 'Autho Date', 'City', 'Partner', 'Client', 'Assignee Name', 'Services', 'Coordinator', 'Supplier Partner']]
          for (let i = 0; i < this.datasource.filteredData.length; i++) {
              const element = this.datasource.filteredData[i];
              tabla.push([
                  element.numberServiceRecord,
                  element.vip, element.serviceLine,element.status, this.formatDate(element.initialAutho),
                  element.city, element.partner, element.client, element.assigneeName,
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
          if(this.rutaActiva.snapshot.params.partner == undefined){
            pdf.create().download(this.rutaActiva.snapshot.params.country+'_Report.pdf');
          }else{
            pdf.create().download(this.rutaActiva.snapshot.params.country+'_'+this.rutaActiva.snapshot.params.partner+'_Report.pdf');
          }
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
}
