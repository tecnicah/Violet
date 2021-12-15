import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-edit-filters-operational-reports',
  templateUrl: './dialog-edit-filters-operational-reports.component.html',
  styleUrls: ['./dialog-edit-filters-operational-reports.component.css']
})
export class DialogEditFiltersOperationalReportsComponent implements OnInit {

  constructor(public _service : ServiceGeneralService,
    public dialogRef: MatDialogRef < DialogEditFiltersOperationalReportsComponent > , 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  report: any = {};
  ca_report: any[] = [];
  status: any[] = [];
  ca_invoice: any[] = [];

  userData: any = {};

  filtersT: any[] = [];
  
  ngOnInit(): void {
    this.getCatalogs();
    console.log(this.data);
    this._service.service_general_get('Catalogue/GetFilterReport/1').subscribe(r=>{
      if(r.success){
        this.filtersT = r.result;
    if(this.data != undefined){
      if(this.data.filter.length >0){
        this.report = this.data.filter[0];
        if(this.report.filter1 > 6){
          for (let i = 0; i < this.filtersT.length; i++) {
            const element = this.filtersT[i];
            for (let j = 0; j < this.data.filter.length; j++) {
              const elementdos = this.data.filter[j];
              if(elementdos.filter1 == element.id){
                this.filtersT[i].filter1 = true;
                this.filtersT[i].value = elementdos.value
                this.filtersT[i].firstDate = elementdos.firstDate;
                this.filtersT[i].secondDate = elementdos.secondDate;
              }
            }
          }
          this.report.filter1 = 4;
          console.log(this.report, this.filtersT);
        }
      }
    }
  }
})
    
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  getCatalogs(){
    this._service.service_general_get('Catalogue/GetCatReport').subscribe(r=>{
      if(r.success){
        this.ca_report = r.result;
      }
    })
    this._service.service_general_get("Catalogue/GetStatus").subscribe(r=>{
      if(r.success){
        this.status = r.result;
      }
    })

    this._service.service_general_get('Catalogue/GetStatusInvoice').subscribe(r=>{
      if(r.success){
        this.ca_invoice = r.result
      }
    })
  }


  save(){

    let datas = [];
    this.report.success = true;
    this.report.createdBy= this.userData.id;
    this.report.createdDate= new Date();
    this.report.updatedBy= this.userData.id;
    this.report.updatedDate= new Date();
    this.report.id = 0;
    console.log(this.filtersT); 

  for (let i = 0; i < this.filtersT.length; i++) {
    const element = this.filtersT[i];
    if(element.filter1){
      element.filter1 = element.id;
      element.createdBy= this.userData.id;
      element.createdDate= new Date();
      element.updatedBy= this.userData.id;
      element.updatedDate= new Date();
      element.id = 0;
      datas.push(element);
    }
  }

  if(datas.length > 0){
  }else{
    datas.push(this.report);
  }
  this.dialogRef.close(datas);
   
  }
}
