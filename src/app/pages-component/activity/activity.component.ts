import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor(public _service: ServiceGeneralService) { }

  @ViewChild('immisort') immisort: MatSort;
  // @ViewChild(MatSort, {static: true}) immisort: MatSort;

  @ViewChild(MatPaginator, {static: true})immipag: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;

  public filterStatus: any = { actionType: '' };
  public filterOffice: any = { office: '' };
  public filterSupplierPartner: any = { comercialName: '' };
  public filterCountry: any = { name: '' };
  public filterCity: any = { city: '' };

  ca_SL: any[] = [];
  ca_status: any[] = [];
  ca_office: any[] = [];
  ca_country: any[] = [];
  ca_city: any[] = [];
  datasource:any = [];
  datasourcedos: any = [];
  ca_SP: any[] = [];
  activities: any = {};
  filteruno: boolean = false;
  filterdos: boolean = false;

  activitieFilter: any = {
    office: null,
    status: null,
    serviceLine: null,
    range1: null,
    range2: null
  };

  PartnerFilters: any ={
    country:null,
    city:null,
    serviceLine:null,
    range1:null,
    range2: null
  };

  displayedColumns: string[] = ['Country', 'City', 'Supplier Partner', 'Immigration', 'Relocation', 'Total'];
  maxall: number = 20;



  ngOnInit(): void {
    this.catalogos();
    this.getActivities();
    this.getPartner();
  }
  getPageSizeOptions() {
    if (this.datasource.paginator?.length > this.maxall) {
      return [10, 20, this.datasource.paginator?.length];
    }
    else {
      return [10, 20];
    }

  }
  //////////////////////////////////////////////////////////////
  ///activities
  getActivities(){
    this._service.service_general_get(`Activity/GetActivity?office=${this.activitieFilter.office}&status=${this.activitieFilter.status}&serviceLine=${this.activitieFilter.serviceLine}&range1=${this.activitieFilter.range1tobk}&range2=${this.activitieFilter.range2tobk}`).subscribe(r=>{
      if(r.success){
        this.activities = r.result.value;
        console.log(this.activities);
      }
    })
  }

  public filteringServiceRecordTable(): void {
      let params: string = '';
      if (this.activitieFilter.range1 != null) this.activitieFilter.range1tobk = this.filterDate(this.activitieFilter.range1);
      if (this.activitieFilter.range2 != null) this.activitieFilter.range2tobk = this.filterDate(this.activitieFilter.range2);
      if (this.PartnerFilters.range1 != null) this.PartnerFilters.range1tobk = this.filterDate(this.PartnerFilters.range1);
      if (this.PartnerFilters.range1 != null) this.PartnerFilters.range2tobk = this.filterDate(this.PartnerFilters.range2);

      if(this.activitieFilter.range1 != null && this.activitieFilter.range2 != null){
        this.getActivities();
      }

      if(this.PartnerFilters.range1 != null && this.PartnerFilters.range2 != null){
        this.getPartner();
      }
  }

  //*******************************************//
public filterDate(date_in: any): string {
  return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
}
  //////////////////////////////////////////////////////////////
  //activities clear filters
  cleanFilter() {
    this.filterStatus = { status: '' };
    this.filterOffice = { office: '' };
    this.filterSupplierPartner = { comercialName: '' };
    this.filterCountry = { name: '' };
    this.filterCity = { city: '' };

    this.activitieFilter = {
      office: null,
      status: null,
      serviceLine: null,
      range1: null,
      range2: null,
      range1tobk: null,
      range2tobk: null
    }
    this.filteruno = true;
        setTimeout(() => {
        this.filteruno = false;
    }, 2000);
    this.getActivities();
  }

  /////////////////////////////////////////////////////////////
  //partnerts Active
  getPartner(){
    this._service.service_general_get(`Activity/GetSupplierPartnersActive?country=${this.PartnerFilters.country}&supplierPartner=${this.PartnerFilters.supplierPartner}&city=${this.PartnerFilters.city}&serviceLine=${this.PartnerFilters.serviceLine}&range1=${this.PartnerFilters.range1tobk}&range2=${this.PartnerFilters.range2tobk}`).subscribe(r=>{
      console.log(r);
      if(r.success){
        this.datasource = new MatTableDataSource(r.result.value);
        setTimeout(() => {
          this.datasource.paginator = this.immipag;
          this.datasource.sort = this.immisort;
        }, 10000);
      }
    })
  }

  clearFilterParner() {
    this.filterSupplierPartner = { comercialName: '' };
    this.filterCountry = { name: '' };
    this.filterCity = { city: '' };
    this.PartnerFilters ={
      country:null,
      city:null,
      supplierPartner:null,
      serviceLine:null,
      range1:null,
      range2: null,
      range1tobk: null,
      range2tobk: null
    };
    this.filterdos = true;
        setTimeout(() => {
        this.filterdos = false;
    }, 2000);
    this.getPartner();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
}

  async catalogos(){

    this.ca_SL = await this._service.getCatalogueFrom('GetServiceLine');
    this.ca_status = await this._service.getCatalogueFrom('GetActionType');
    this.ca_office = await this._service.getCatalogueFrom('GetOffice');
    this.ca_country = await this._service.getCatalogueFrom('GetCountry');

    this._service.service_general_get('Catalogue/GetCompany').subscribe(r=>{
      if(r.success){
        console.log(r);
        this.ca_SP = r.result.value;
      }
    })
  }

  getCity(id){
    console.log(id);
    this._service.service_general_get('Catalogue/GetState?country='+id).subscribe(r=>{
      if(r.success){
        this.ca_city = r.result
      }
    })
  }

}
