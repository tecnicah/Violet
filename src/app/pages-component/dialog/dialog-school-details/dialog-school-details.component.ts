import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-school-details',
  templateUrl: './dialog-school-details.component.html',
  styleUrls: ['./dialog-school-details.component.css']
})
export class DialogSchoolDetailsComponent implements OnInit {

  toppings = new FormControl();
  user: any;
  SchoolDetails: any = {};
  //CATALOGOS//
  child = [];
  ca_status = [];
  ca_country = [];
  ca_city = [];
  ca_grade = [];
  ca_languages = [];
  ca_currency = [];
  ca_dependent = [];
  SupplierCompany = [];

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }
  public __loader__: LoaderComponent = new LoaderComponent();

  //**********************************************************//
  ngOnInit(): void {
    this.SchoolDetails.supplierPartner = null;
   //debugger
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.get_catalogos();
    console.log("DATA SCHOOL DATAILS: ", this.data);
   //debugger
    if (this.data.id != 0) {
      this._services.service_general_get("SupplierPartnerProfile/GetSchoolDetail?id=" + this.data.supplierId).subscribe((data => {    
        if (data.success) {
          console.log("SchoolsList/GetSchool : ", data);
          let suppdet = data.result; 
           this.SchoolDetails.ib= suppdet.ib;
           this.SchoolDetails.uniform=  suppdet.uniform;
            this.SchoolDetails.medicalRecordNeeded = suppdet.medical;
            this.SchoolDetails.transportationOffered = suppdet.transportationOffered;
            this.SchoolDetails.address = suppdet.address;
            this.SchoolDetails.grade = suppdet.grade;
            this.SchoolDetails.languages = suppdet.languages;
            this.SchoolDetails.webSite = suppdet.webSite;
            this.SchoolDetails.schoolingStatus = this.data.schoolingStatus;
            this.SchoolDetails.supplierPartner = this.data.supplierId;
            this.SchoolDetails.additionalComments = this.data.additionalComments;
            this.SchoolDetails.dependent = this.data.dependent;
            this.SchoolDetails.visitDate = this.data.visitDate;
            this.SchoolDetails.visitDateTime = this.data.visitDateTime;
            // if(this.data.visitDate != null){
            //  //debugger
            //   this.SchoolDetails.visitDate = this.data.visitDate;
            //   let d = new Date(this.data.visitDateTime);
            //   var dateString = d.getHours() + ":" + d.getMinutes();
            //   this.SchoolDetails.visitDateTime =  dateString.toString();   
            // }
            
        }
      }));
      this._services.service_general_get("SupplierPartnerProfile/GetSuppPartner_Prof_Servide_Group?workOrderService=" + this.data.workOrderServicesId+'&cat_group_id=2').subscribe((data => {
        // this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
        if (data.success) {
         //debugger
          data.result.value.forEach(element => {
            if(element.comercialName == this.data.schoolName){
              this.SchoolDetails.supplierPartner = element.id;
            }
          });
        }
      }), (err) => {
        console.log("no se realizo la consulta por falta de parametro");
      });
    }
    else {
      this.SchoolDetails.schoolingStatus = 1;
      if (this.SchoolDetails.supplierPartner == null) this.SchoolDetails.supplierPartner = 0;
    }
  }

  sendLink(url){
    console.log(url);
    //window.location.href = url;
    window.open(url)
  }

  supplierPartner() {
    console.log(" datos a enviar GetSupplierPartnerServiceByServices ============", this.data.workOrderServicesId, this.data)
    this._services.service_general_get("SupplierPartnerProfile/GetSuppPartner_Prof_Servide_Group?workOrderService=" + this.data.workOrderServicesId+'&cat_group_id=2').subscribe((data => {
    //this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER PARTNER: ', data.result.value);
        this.SupplierCompany = data.result.value;
      }
    }), (err) => {
      console.log("no se realizo la consulta por falta de parametro");
    });
  }

  _supplier() {
   //debugger
    if (this.SchoolDetails.supplierPartner != null && this.SchoolDetails.supplierPartner != 0) {
      this.data.othersupplier = '';
      // this.loader.showLoader();
      this._services.service_general_get('SupplierPartnerProfile/GetSchoolDetail?id=' + this.SchoolDetails.supplierPartner).subscribe((data => {
        if (data.success) {
          console.log("supplier escuela ========================",data)
          let suppdet = data.result; 
           this.SchoolDetails.ib= suppdet.ib;
           this.SchoolDetails.uniform=  suppdet.uniform;
            this.SchoolDetails.medicalRecordNeeded = suppdet.medical;
            this.SchoolDetails.transportationOffered = suppdet.transportationOffered;
            this.SchoolDetails.address = suppdet.address;
            this.SchoolDetails.grade = suppdet.grade;
            this.SchoolDetails.languages = suppdet.languages;
            this.SchoolDetails.webSite = suppdet.webSite;
        }
      }))
    }
    else {
     
    }
  }


  //**********************************************************//
  async get_catalogos() {
    this.__loader__.showLoader();
    this.ca_status = await this._services.getCatalogueFrom('GetSchoolStatus');
    this.ca_country = await this._services.getCatalogueFrom("GetCountry");
    this.ca_grade = await this._services.getCatalogueFrom("GetGradeSchooling");
    this.ca_languages = await this._services.getCatalogueFrom("GetLanguages");
    this.ca_currency = await this._services.getCatalogueFrom("GetCurrency");


    await this._services.service_general_get("ServiceRecord/GetApplicant/" + Number(this.data.sr)).subscribe((data => {
      if (data.success) {
        console.log("data.applicant.value",data);
        this.ca_dependent = data.applicant.value;
        this.ca_dependent = this.ca_dependent.filter(c => c.relationshipId == 2)
        console.log("this.ca_dependent =============== ", this.ca_dependent)
      }
    }));
    this.__loader__.hideLoader();

    this.supplierPartner();
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
  save_new_register() {
    this.__loader__.showLoader();
   //debugger
    let _dependent = [];
    this.SchoolDetails.schoolName = this.SchoolDetails.supplierPartner.comercialName;
    this.SchoolDetails.supplierPartner = this.SchoolDetails.supplierPartner;
    this.SchoolDetails.schoolingSearchId = this.data.schooling_search_id;
    
    if (this.SchoolDetails.supplierPartner == 0) this.SchoolDetails.supplierPartner = null;
      this.SchoolDetails.id = 0;
      this.SchoolDetails.workOrder = this.data.workOrderId;
      this.SchoolDetails.service = this.data.service;
      this.SchoolDetails.serviceType = this.data.serviceTypeId;
      this.SchoolDetails.schoolNo = 0;
      this.SchoolDetails.createdBy = this.user.id;
      this.SchoolDetails.createdDate = new Date();
      this.SchoolDetails.updateBy = this.user.id;
      this.SchoolDetails.updatedDate = new Date();
      this.SchoolDetails.updatedDate = new Date();
      this.SchoolDetails.sendSchool = false;
      this.SchoolDetails.grade = 1;
      this.SchoolDetails.languages = 1;
      this.SchoolDetails.workOrderServicesId = this.data.workOrderServicesId;
      this.SchoolDetails.supplierId = this.SchoolDetails.supplierPartner; 
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
          this.__loader__.hideLoader();
          this.dialogRef.close();
        }
      }));
  }
  //**********************************************************//
  save_edit_register() {
    this.__loader__.showLoader();
    //if (this.SchoolDetails.supplierPartner == 0) this.SchoolDetails.supplierPartner = null;
    // this._services.service_general_get("SupplierPartnerProfile/GetServiceProviderByServiceId?workOrderService=" + this.data.workOrderServicesId).subscribe((data => {
    //   // this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
    //   if (data.success) {
    //     data.result.value.forEach(element => {
    //       if(element.id == this.SchoolDetails.supplierPartner){
    //         this.SchoolDetails.supplierPartner = element.id;
    //         this.SchoolDetails.schoolName = element.comercialName;
    //       }
    //     });
    //   }
    // }), (err) => {
    //   console.log("no se realizo la consulta por falta de parametro");
    // });
   //debugger
   this.SchoolDetails.schoolName = this.SchoolDetails.supplierPartner.comercialName;
   this.SchoolDetails.supplierPartner = this.SchoolDetails.supplierPartner;
   this.SchoolDetails.schoolingSearchId = this.data.schoolingSearchId;
   
   if (this.SchoolDetails.supplierPartner == 0) this.SchoolDetails.supplierPartner = null;
     this.SchoolDetails.id = this.data.id;
     this.SchoolDetails.workOrder = this.data.workOrderId;
     this.SchoolDetails.service = this.data.sr;
     this.SchoolDetails.serviceType = this.data.serviceTypeId;
     this.SchoolDetails.schoolNo = 0;
     this.SchoolDetails.createdBy = this.user.id;
     this.SchoolDetails.createdDate = new Date();
     this.SchoolDetails.updateBy = this.user.id;
     this.SchoolDetails.updatedDate = new Date();
     this.SchoolDetails.sendSchool = false;
     this.SchoolDetails.grade = 1;
     this.SchoolDetails.languages = 1;
     this.SchoolDetails.workOrderServicesId = this.data.workOrderServicesId;
     this.SchoolDetails.supplierId = this.SchoolDetails.supplierPartner; 
     
    debugger;
    this.SchoolDetails.schoolingSearchId = this.data.schoolingSearchId;
    this.SchoolDetails.id = this.data.id;
    this.SchoolDetails.grade = 1;
    this.SchoolDetails.languages = 1;
    this.SchoolDetails.supplierId = this.SchoolDetails.supplierPartner;
    this.SchoolDetails.workOrderServicesId = this.data.workOrderServicesId;
    this.SchoolDetails.updateBy = this.user.id;
    this.SchoolDetails.updatedDate = new Date();
    this._services.service_general_put("SchoolsList/PutSchools", this.SchoolDetails).subscribe((data => {
      console.log("guardar db: ", data);
      this.__loader__.hideLoader();
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        this.ngOnInit();
        
        this.dialogRef.close();
      }
    }))
  }
  //**********************************************************//
  //**CGET NAME COUNTRY**//
  getNameCountry(id) {
    for (let i = 0; i < this.ca_country.length; i++) {
      if (this.ca_country[i].id == id) {
        return this.ca_country[i].name;
      }
    }
  }
  //**GET GRADE**//
  getGrade(id) {
    //console.log(id);
    for (let i = 0; i < this.ca_grade.length; i++) {
      if (this.ca_grade[i].id == id) {
        return this.ca_grade[i].grade;
      }
    }
  }
  //GET LANGUAGE//
  getLanguage(id) {
    //console.log(id);
    for (let i = 0; i < this.ca_languages.length; i++) {
      if (this.ca_languages[i].id == id) {
        return this.ca_languages[i].name;
      }
    }
  }
  //GET CURRENCY//
  getCurrency(id) {
    //console.log(id);
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }
}
