import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-school-details',
  templateUrl: './dialog-school-details.component.html',
  styleUrls: ['./dialog-school-details.component.css']
})
export class DialogSchoolDetailsComponent implements OnInit {
  user:any;
  SchoolDetails:any={};
  //CATALOGOS//
  ca_status = [];
  ca_country= [];
  ca_city= [];
  ca_grade= [];
  ca_languages= [];
  ca_currency= [];
  ca_dependent= [];

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  
  //**********************************************************//
   ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.get_catalogos();
    console.log("DATA SCHOOL DATAILS: ", this.data);
    if(this.data.id != 0){
      this._services.service_general_get("SchoolsList/GetSchool?key="+this.data.id).subscribe((data => {
        console.log(data);
        if(data.success){
          this.SchoolDetails = data.result;
        }
      }))    
    }
  }
  //**********************************************************//
  async get_catalogos(){
    this.ca_status   = await this._services.getCatalogueFrom('GetSchoolStatus');
    this.ca_country = await this._services.getCatalogueFrom("GetCountry");
    this.ca_grade = await this._services.getCatalogueFrom("GetGradeSchooling");
    this.ca_languages = await this._services.getCatalogueFrom("GetLanguages");
    this.ca_currency = await this._services.getCatalogueFrom("GetCurrency");
    

    await this._services.service_general_get("ServiceRecord/GetApplicant/"+Number(this.data.sr)).subscribe((data => {
      console.log(data);
      if(data.success){
        this.ca_dependent = data.applicant.value;
      }
    }))    
  }
  //**********************************************************//
  //**CONSULTA CITY**//
  get_City(data) {
    console.log(data);
    this._services.service_general_get("Catalogue/GetState?country=" + data).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
        console.log(this.ca_city);
      }
    }))
  }
  //**********************************************************//
  save_new_register(){
   this.SchoolDetails.id = 0;
   this.SchoolDetails.workOrder = this.data.workOrderId;
   this.SchoolDetails.service = this.data.service;
   this.SchoolDetails.serviceType = this.data.serviceTypeId;
   this.SchoolDetails.schoolNo = 0;
   this.SchoolDetails.createdBy = this.user.id;
   this.SchoolDetails.createdDate = new Date();
   this.SchoolDetails.updateBy = this.user.id;
   this.SchoolDetails.updatedDate = new Date();
   console.log(this.SchoolDetails);
  
   this._services.service_general_post_with_url("SchoolsList/PostSchools", this.SchoolDetails).subscribe((data => {
    console.log("guardar db: ", data);
    if (data.success) {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Information saved"
        },
        width: "350px"
      });
      this.ngOnInit();
    }
  }))
  }
  //**********************************************************//
  save_edit_register(){
    this._services.service_general_put("SchoolsList/PutSchools", this.SchoolDetails).subscribe((data => {
      console.log("guardar db: ", data);
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        this.ngOnInit();
      }
    }))
  }
  //**********************************************************//
  //**CGET NAME COUNTRY**//
  getNameCountry(id) {
    for(let i = 0; i < this.ca_country.length; i++){
      if(this.ca_country[i].id == id){
         return this.ca_country[i].name;
      }
    }
  }
  //**GET GRADE**//
  getGrade(id){
    //console.log(id);
    for(let i = 0; i < this.ca_grade.length; i++){
      if(this.ca_grade[i].id == id){
         return this.ca_grade[i].grade;
      }
    }
  }
  //GET LANGUAGE//
  getLanguage(id){
    //console.log(id);
    for(let i = 0; i < this.ca_languages.length; i++){
      if(this.ca_languages[i].id == id){
         return this.ca_languages[i].name;
      }
    }
  }
  //GET CURRENCY//
  getCurrency(id){
    //console.log(id);
    for(let i = 0; i < this.ca_currency.length; i++){
      if(this.ca_currency[i].id == id){
         return this.ca_currency[i].currency;
      }
    }
  }
}
