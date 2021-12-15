import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'app-suplier-partner',
  templateUrl: './suplier-partner.component.html',
  styleUrls: ['./suplier-partner.component.scss']
})
export class SuplierPartnerComponent implements OnInit {


  constructor(public rutaActiva: ActivatedRoute,
    public _services: ServiceGeneralService,
    public dialog: MatDialog) { }


  @ViewChild('iisort') iisort: MatSort;
  @ViewChild(MatPaginator, {static: true}) pag: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;
filterData: any = {
  country: null,
  partner: null,
  client: null,
  range1: null,
  range2: null,
  status: null,
  serviceLine: null,
  serviceCategory: null,
  city: null,
  consultant: null,
}

ca_country: any[] = [];
ca_city: any[] = [];
ca_SL: any[] = [];
ca_SR: any[] = [];
ca_service: any[] = [];
ca_P: any[] = [];
ca_SP: any[] = [];
ca_client: any[] = [];
userData: any = {};
dataR: any = {};
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
                      'coordinator']
  maxall: number = 20;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getData();
    this.catalogos();
  }
  getPageSizeOptions() {
    if (this.datasource?.paginator.length > this.maxall) {
      return [10, 20, this.datasource?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }

  getData(){
    this._services.service_general_get(`Activity/GetReportByPartner/${this.rutaActiva.snapshot.params.id}
                                        ?country=${this.filterData.country}
                                        &partner=${this.filterData.partner}
                                        &client=${this.filterData.client}
                                        &range1=${this.filterData.range1}
                                        &range2=${this.filterData.range2}
                                        &status=${this.filterData.status}
                                        &serviceLine=${this.filterData.serviceLine}
                                        &serviceCategory=${this.filterData.serviceCategory}
                                        &city=${this.filterData.city}
                                        &consultant=${this.filterData.consultant}`).subscribe(r=>{
      console.log(r);
      if(r.success){
        this.dataR = r.result.value.clientsPartners;
        console.log(this.dataR);
            this.datasource = new MatTableDataSource(r.result.value.serviceRecords);
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
      this.filterData = {
        country: null,
        partner: null,
        client: null,
        range1: null,
        range2: null,
        status: null,
        serviceLine: null,
        serviceCategory: null,
        city: null,
        consultant: null,
      }

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
            'Coordinator',]]
            for (let i = 0; i < this.datasource.filteredData.length; i++) {
                const element = this.datasource.filteredData[i];
                tabla.push([
                    element.numberServiceRecord,
                    element.vip, element.serviceLine,element.status, this.formatDate(element.initialAutho),
                    element.countryHome, element.cityHome, element.partner, element.client, element.assigneeName,
                    element.services.length, element.coordinator.length
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
            pdf.create().download(this.rutaActiva.snapshot.params.name+'_Report.pdf');

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
