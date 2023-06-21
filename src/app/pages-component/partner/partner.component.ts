import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExportComponent } from '../dialog/dialog-export/dialog-export.component';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ca_companyType: any[] = [];
  caCompanyType: any[] = [];
  caCountry: any[] = [];
  ccity: any[] = [];
  refresh: boolean = false;
  range = new FormGroup({
    rangeDate1: new FormControl(),
    rangeDate2: new FormControl()
  });
  filter: any= {}
  ELEMENT_DATA = [];
  public filterCompany: any = { companyType1: '' };
  public filterCountry: any = { name: '' };
  public filterCity: any = { name: '' };
  public filterStatus: any = { status: '' };


  companyType1
  maxall: number = 20;


  displayedColumns: string[] = ['Company Type', 'Client Type', 'Assignment', 'Status', 'City', 'Contact Name'];

  datasource: any;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;

  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));

  //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;
  public __loader__: LoaderComponent = new LoaderComponent();
	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  //*********************************************//
  ngOnInit(): void {
    this.__loader__.showLoader();
    this.consultaPermisos();
    this._services.service_general_get_noapi('GetClientPartnerProfile?lead_or_client=4').subscribe(r=>{
      if(r.success){
        console.log( r.result.value );
        this.datasource = new MatTableDataSource( r.result.value );
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      }
    })
    this.catalogos();
    this.__loader__.hideLoader();

  }
  getPageSizeOptions() {
    if (this.datasource?.paginator.length > this.maxall) {
      return [10, 20, this.datasource?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }
  caStatus = [];
  async catalogos(){
    this.ca_companyType = await this._services.getCatalogueFrom('GetSupplierType');
    this.caCompanyType = await this._services.getCatalogueFrom('GetCompanyType');
    // this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    this.caStatus = await this._services.getCatalogueFrom('GetStatusClienPartner');
    this._services.service_general_get("Catalogue/Generic/Countries").subscribe((data => {
      if (data.success) {
        this.caCountry = data.result;
      }
    }))

    console.log(this.caStatus);
  }

  getcity(data) {

    this._services.service_general_get("Catalogue/Generic/States/" + data.country).subscribe((data => {
      if (data.success) {
        this.ccity = data.result;
      }
    }))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
}

applyFiltersBK(){
  console.log("entra", this.filter);
  this._services.service_general_get_noapi('GetClientPartnerProfile?lead_or_client=4'+
                                            '&date_range_in='+this.filter.date_range_in+
                                            '&date_range_fi='+this.filter.date_range_fi+
                                            '&type='+this.filter.type+
                                            '&company_type='+this.filter.company_type+
                                            '&country='+this.filter.country+
                                            '&state='+this.filter.city+
                                            '&status='+this.filter.status).subscribe(r=>{
    if(r.success){
      this.datasource = new MatTableDataSource( r.result.value );
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }
  })
}

showExportDialog() {
  const dialogRef = this._dialog.open(DialogExportComponent, {
    data: "",
    width: "40%"
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      document.getElementById("excel").click();
    }
    if (result === 2) {
      let tabla = [['Company Name', 'Company Type', 'Client Type', 'Country','City', 'Date of Contract', 'Status', 'Contact Name', 'Phone', 'E-mail']];
      for (let i = 0; i < this.datasource.filteredData.length; i++) {
        const element = this.datasource.filteredData[i];
        tabla.push([
          element.company,
          element.company_type,
          element.lead_type,
          element.country,
          element.city,
          element.dateFirst,
          element.status,
          element.contactName,
          element.phoneNumber,
          element.email
        ])
      }
      console.log(tabla);
      // Set the fonts to use
      PdfMakeWrapper.setFonts(pdfFonts);

      const pdf = new PdfMakeWrapper();

      pdf.pageMargins([30, 30, 30, 30]);
      pdf.pageOrientation('landscape');
      pdf.defaultStyle({
        fontSize: 10,
        alignment: 'center'
      });
      pdf.add(new Table(tabla).layout('lightHorizontalLines').end);

      pdf.create().download('partner&client.pdf');
    }
  });
}

  clean() {
    this.filterCompany = { companyType1: '' };
    this.filterCountry = { name: '' };
    this.filterCity = { name: '' };
    this.filterStatus = { status: '' };
    this.range.reset({rangeDate1: '', rangeDate2: ''});
    this.filter.type = null;
    this.filter.company_type = null;
    this.filter.country= null;
    this.filter.city = null;
    this.filter.status = null;
    this.refresh = true;
    setTimeout(() => {
      this.refresh = false;
    }, 2000);
    this.ngOnInit();
  }

//FILTRO FECHA//
public filteringServiceRecordTable(): void {
  let service_record_params_selected = '';
  let params: string = '';
    if (this.range.value.rangeDate1 != null) this.filter.date_range_in = this.filterDate(this.range.value.rangeDate1);
    if (this.range.value.rangeDate2 != null) this.filter.date_range_fi = this.filterDate(this.range.value.rangeDate2);
    for (let item in this.filter) {
      if (this.filter[item] != '') {
        service_record_params_selected += `${ item }=${ this.filter[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if(this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null){
      this.applyFiltersBK();
    }
}
//*******************************************//
public filterDate(date_in: any): string {
  return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
}

}
