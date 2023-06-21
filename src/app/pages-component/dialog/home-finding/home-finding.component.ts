import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { DialogHousingSpecificationsComponent } from '../dialog-housing-specifications/dialog-housing-specifications.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogLeaseSummaryComponent } from '../dialog-lease-summary/dialog-lease-summary.component';
import { DialogInspectionrepairsComponent } from '../dialog-inspectionrepairs/dialog-inspectionrepairs.component';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';
import { DialogPropertyExpensesComponent } from '../dialog-property-expenses/dialog-property-expenses.component';
import { DialoglLandlordBankDetailComponent } from '../dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { DialogPaymentTypeComponent } from '../dialog-payment-type/dialog-payment-type.component';
import { DialogCostSavingsComponent } from '../dialog-cost-savings/dialog-cost-savings.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { json } from '@angular-devkit/core';
import { stringify } from 'querystring';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAttendeesComponent } from '../dialog-attendees/dialog-attendees.component';
import { DialogKeyComponent } from '../dialog-key/dialog-key.component';
import { DialogInventoryComponent } from '../dialog-inventory/dialog-inventory.component';
import { DialogAttendeesInspecComponent } from '../dialog-attendees-inspec/dialog-attendees-inspec.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-home-finding',
  templateUrl: './home-finding.component.html',
  styleUrls: ['./home-finding.component.scss']
})
export class HomeFindingComponent implements OnInit {

  @ViewChild('sortrole') sortrole: MatSort;
  calculo: any = {};




  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  show: boolean = false;
  user: any = {};
  //*******************************************************//
  //***********************VARIABLES***********************//
  table_payments: any;
  ca_estatus: any[] = [];
  ca_currency: any[] = [];
  ca_requestType: any[] = [];
  ca_dependent: any[] = [];
  home_finding: any = {};
  temporalDocument: any[] = [];
  temporalDocumentHF: any[] = [];
  ca_accounttype: any[] = [];
  ca_leaseTemplate: any[] = [];
  ca_creditCard: any[] = [];
  nacionality: any[] = [];
  ca_document: any[] = [];
  cr: string = "Reply";
  url_api = `${environment.URL_EXPORT}`;
  ca_security = [];
  ca_initial = [];
  ca_ongoing = []; 
  ca_realtor_com = [];


  _deliveredTo = "Assignee Name";
  _city_name = "City Name"
  _country_name = "Country Name"
  SupplierCompany = [];

  loader: LoaderComponent = new LoaderComponent();
  //TABLE EXTENSION//
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //RESQUEST PAYMENT//
  dataSourcePay: any[] = [];
  displayedColumnsPay: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  //TABLE HOUSING//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Send', 'Property Type', 'Address', 'Neighborhood', 'Price', 'Currency', 'Housing Status', 'Actions'];
  displayedColumnsBanking: string[] = ['Account Type', 'Account Holders Type', 'Bank Name', 'Account Number', 'International Codes', 'Actions'];
  //displayedColumnsHousing: string[] = ['Property Type', 'Address', 'Neighborhood', 'Price', 'Currency', 'Housing Status', 'Actions'];
  displayedColumnsHousingExport: string[] = ['NoProperty', 'Property Type', 'Neighborhood', 'Address', 'NoBedroom', 'NoBathroom', 'ParkingSpaces', 'Size', 'ListRent', 'Currency', 'Status', 'Comments'];
  //*******************************************************//
  serviceScope = { "documentcountries": "", "scopeDescription": "" };
  public leaseGuarentee = [
    {
      value: 1,
      name: 'None'
    },
    {
      value: 2,
      name: 'Company Guarantor'
    },
    {
      value: 3,
      name: 'Advance Rent'
    },
    {
      value: 4,
      name: 'Advance Deposit'
    },
    {
      value: 5,
      name: 'Property'
    },
    {
      value: 6,
      name: 'Insurance Bond'
    }
  ];

  today_: Date = new Date();
  hl_to_send = [];
  ca_lease_signa = [{ id: 1, value: "Assignee" }, { id: 2, value: "Client" }, { id: 3, value: "Assigne and Client" }];

  ngOnInit(): void {
    this.loader.showLoader();
    console.log("HOME FINDING DETAIL FROM SR: =====================================", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("USUARIO  ==========================", this.user)
    this.home_finding = {};
    this.get_catalogos();
  }

  //////////////////////manage estatus 

  disabled_by_permissions: boolean = false;
  hide_by_permissions: boolean = false;
  hide_complete: boolean = false;
  show_completed: boolean = false;
  show_progress: boolean = false;
  wo_: boolean = false;
  sr_: boolean = false;
  ca_property = [];
  
  setup_permissions_settings() {
    //////debugger;
    if (!this.data.data.numberWorkOrder) {
      this.wo_ = this.data.workOrderId;
    }
    else {
      this.wo_ = this.data.data.numberWorkOrder
    }

    if (!this.data.data.number_server) {
      this.sr_ = this.data.data.serviceNumber
    }
    else {
      this.sr_ = this.data.data.number_server
    }

    if (this.user.role.id == 3) {
      this.disabled_by_permissions = true
    }
    else {
      this.hide_by_permissions = true;
    }
    if (this.home_finding.statusId != 39 && this.home_finding.statusId != 2) { //active , in progress
      this.hide_complete = true;
    }
    else {
      if (this.home_finding.statusId == 39) {
        this.show_progress = true;
      }
      else {
        this.show_completed = true;
      }
    }
  }

  change_button() {
    //////debugger;
    if (this.show_completed) {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Are you sure the service is complete?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        // //console.log(result);
        if (result) {
          this.home_finding.statusId = 37; //penidng to completion 
          this.save();
        }
      });
    }

    if (this.show_progress) {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Do you want start the service?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        // //console.log(result);
        if (result) {
          this.home_finding.statusId = 2; //penidng to completion 
          this.save();
        }
      });
    }
  }

  //////////////////////manage estatus 

  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.home_finding.workOrderServicesId}&client=${this.data.data.partnerId}`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ================================', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  public __serverPath__: string = this._services.url_images;
  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }
  

  ca_privacy = [];

  //BRING DATA CATALOGUES//
  async get_catalogos() {
    //debugger;
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');

    this._deliveredTo = this.data.data.deliveredTo;
    this._city_name = this.data.data.location;
    this._country_name = this.data.data.country;
    console.log("this._deliveredTo =================", this._deliveredTo)
   // this.fill_payments_due();
    this.today_.setDate(this.today_.getDate() + 1);
  //  this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=21").subscribe((data => {
      if (data.success) { this.ca_estatus = data.result; }
    }));
  //  this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.ca_leaseTemplate = await this._services.getCatalogueFrom('GetLeaseTemplate');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_creditCard.sort((a, b) => (a.id < b.id ? -1 : 1));
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    this._services.service_general_get("Catalogue/GetDocumentType/26").subscribe((data => {
      if (data.success) { this.ca_document = data.result; }
    }))
 //   this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    let duration = await this._services.getCatalogueFrom('GetDuration');
 //   this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
 //   this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');

    ///////////// Catalogos de pagos 
    this.ca_security = await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetSecurityDeposit');
    this.ca_initial = this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetInitialRentPayment');
    this.ca_ongoing = this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetOngoingRentPayment');
    this.ca_realtor_com = this.ca_security;//await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetRealtorCommission'); 

 //   this.ca_recurrence = duration.filter(function (E) { if (E.recurrence != null) { return true; } });
  //  this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_creditCard.forEach(E => { E.checked = false; });
  //  this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus'); //= await this._services.getCatalogueFrom('GetPaymentType');
  //  this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');

  //  this.get_items_section(0);
    // this.get_attendees_list_all();

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r => {
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r => {
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    })

    this._services.service_general_get('RelocationServices/GetHomeFindingById?id=' + this.data.data.service[0].id).subscribe(data => {
      if (data.success) {
        console.log('DATA GetHomeFindingById ===========================: ', data, "id :", this.data.data.service[0].id);
        this.temporalDocument =
          this.home_finding = data.result;
        this.payment_rocess.securityDepositId = this.home_finding.securityDepositId;
        this.payment_rocess.initialRentPaymentId = this.home_finding.initialRentPaymentId;
        this.payment_rocess.ongoingRentPaymentId = this.home_finding.ongoingRentPaymentId;
        this.payment_rocess.realtorCommissionId = this.home_finding.realtorCommissionId;

        this.get_text_status();

        this.show = true;
        this.dataSource = this.home_finding.extensionHomeFindings;
       // this.get_dependent();
      //  this.get_contarct_type();
        this.getServiceScope();
        if (this.home_finding.commentHomeFindings.length == 0) {
          this.addReply();
        }
        this.getDataHousingList();
       // this.supplierPartner_repairs();
        //this.get_payment();
        //   this.loader.hideLoader();
        this.setup_permissions_settings();
      }
    });

    ////////////////////////////////////////// CATALOGOS I&R ////////////////////////////////////////////////

    // this.ca_currency=await this._services.getCatalogueFrom('GetCurrency');
    // this.ca_repair=await this._services.getCatalogueFrom('GetRepairType');
    // this.ca_propertySection=await this._services.getCatalogueFrom('GetPropertySection');
    // this.ca_statuspropertySection=await this._services.getCatalogueFrom('GetStatusPropertySection');
    // this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    // this.ca_resppayrep = await this._services.getCatalogueFrom('GetPaymentRepairResponsability');

   /*  this._services.service_general_post_with_url('HousingList/GetPaymentRepairResponsability', 1).subscribe(r => {

      this.ca_resppayrep = r.hl;
      // console.log("pagoooooooooooooooooooooooooooos", this.ca_resppayrep)
    }) */

    // Move In 

    //this.ca_status_report = await this._services.getCatalogueFrom('get_status_report');

    /* this._services.service_general_get('PropertyReport/get_status_report').subscribe(r => {
      if (r.success) {
        console.log("this.ca_status_report ", r);
        this.ca_status_report  = r.result;
      }
    }) */

  }
  //*****************************************************************************************************//
  //DEPENDENT//
/*   get_dependent() {
    this._services.service_general_get('Catalogue/GetLeaseSignators?sr=0').subscribe(data => {
      if (data.success) {
        console.log('DATA GetLeaseSignators ==================================: ', data);
        this.ca_dependent = data.result;
      }
    });
  } */

  contract_Type: any[] = [];

 /*  get_contarct_type() {
    this._services.service_general_get('AdminCenter/ContractType/All').subscribe(resp => {
      if (resp.success) {
        console.log('get contract ===========================================', resp);
        this.contract_Type = resp.result;
      }
    });
  } */

  //*****************************************************************************************************//
  //DATA TABLE HOUSING//
  getDataHousingList() {
    ////debugger;
    this.loader.showLoader();
    // ////debugger;
    ////console.log("this.data.data.workOrderId ========" , this.data.data.workOrderId)
    //this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe((data_housing) => { //this.area_orientation.workOrderServicesId
    // this._services.service_general_get(`HousingList/GetSegmentedHousing?wo_id=${this.data.data.workOrderId}&id_service_detail=${this.home_finding.id}&shared=${1}`).subscribe(data_housing => {
    this._services.service_general_get(`HousingList/GetHomeFindingHousingList?id_service_detail=${this.home_finding.id}`).subscribe((data_housing => {
      //debugger;
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST ===========================: ', data_housing);
        if (data_housing.custom) {
          if (data_housing.custom.value)
            this.dataSourceHousing = data_housing.custom.value;
        }


        let _dataSourceHousing = this.dataSourceHousing;

        let phl = _dataSourceHousing.filter(function (E) {
          if (E.status_id == 7) {
            return true;
          }
        })

        if (phl.length > 0) {
          this.permanent_homet(phl[0].id);
         // this.get_attendees_list_all(phl[0].id);
        }
        else {
          this.permanentHome = null;
          this.loader.hideLoader();
        }
        this.dataFinal();
      }
      else {
        this.loader.hideLoader();
      }
    }), (err) => {
      this.loader.hideLoader();
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Error",
          body: "An error has occurred."
        },
        width: "350px"
      });
      console.log("error en GetHomeFindingHousingList : ", err);
    });
  }

  //*****************************************************************************************************//
  //**PERMANENT HOME**//
  permanentHome: any;
  data_home = [];

  permanent_homet(id_ph) {
    if (id_ph > 0) {
      this.loader.showLoader();
      this.GetOnlyPropertyDetails(id_ph);
      //this.get_attendees_list_all(id_ph);
    }
  }

  GetOnlyPropertyDetails(id_ph) {


    this._services.service_general_get("HousingList/GetOnlyPropertyDetails?key=" + id_ph + "&servide_detail_id=" + this.home_finding.id).subscribe((data => {
      this.permanentHome = data.result.value;
      console.log('DETALLES DE LA CASA PERMANENTE : ', this.permanentHome);
this.GetLeaseInspectionsVersions(id_ph);
      this.GetOnlyPropertyLSF(id_ph);

      // this.llenarJSON();
      //  this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }


  GetLeaseInspectionsVersions(id_ph){

debugger
  this._services.service_general_get("HousingList/GetLeaseInspectionsVersions?id_service_detail=" + this.home_finding.id + "&id_catCategoryId=" + 21 + "&housing_list_id=" + id_ph).subscribe((data => {
    console.log('response GetLeaseInspectionsVersions : ', data);
  }), (err) => {
    this.loader.hideLoader();
    console.log("error al guardar los contract details: ", err);
  })
}

  permanentHome_LSF;
  GetOnlyPropertyLSF(id_ph) {

    // this.loader.showLoader();
    console.log("HousingList/GetOnlyPropertyLSF?key=" + id_ph + "&servide_detail_id=" + this.home_finding.id);
    this._services.service_general_get("HousingList/GetOnlyPropertyLSF?key=" + id_ph + "&servide_detail_id=" + this.home_finding.id).subscribe((data => {
      this.permanentHome_LSF = data.result.value;
      console.log('ONLY LEASE SUMARY FORM : ', this.permanentHome_LSF);
      this.GetOnlyPropertyInspRep(id_ph);
      //this.llenarJSON();
      // this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  permanentHome_IR;
  GetOnlyPropertyInspRep(id_ph) {

    // this.loader.showLoader();
    this._services.service_general_get("HousingList/GetOnlyPropertyInspRep?key=" + id_ph + "&servide_detail_id=" + this.home_finding.id).subscribe((data => {
      this.permanentHome_IR = data.result.value;
      console.log('ONLY LEASE INSPECTION & REPAIRS : ', this.permanentHome_IR);
      //this.llenarJSON();
      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("ERROR -------------- ONLY LEASE INSPECTION & REPAIRS: ", err);
    })
  }

  //*****************************************************************************************************//
  //**CONSULTA PAYMENT**//
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.home_finding.workOrderServicesId).subscribe((data => {
      if (data.success) {
        ////console.log(data.result);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.table_payments = data.result.value.payments;
        ////console.log(this.table_payments);
      }
      ////console.log(this.table_payments);
    }))
  }
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment() {
    let data = {
      serviceRecord: this.data.data.serviceRecordId,
      sr: this.data.data.serviceRecordId,
      workOrderServices: this.home_finding.workOrderServicesId,
      workOrder: this.data.data.workOrderId,
      service: this.data.data.id_server,
      id: 0,
      type: 2,
      supplierType: 3
    }
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.get_payment();
    });
  }
  //**EDIT REQUEST PAYMENT**//
  editPayment(data) {
    data.type = 2;
    data.supplierType = 3;
    data.id = data.requestPaymentId;
    data.serviceRecord = this.data.data.serviceRecordId;
    data.sr = this.data.data.serviceRecordId;
    data.service = this.data.data.id_server;
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.get_payment();
    });
  }

  //DELETE PAYMENT CONCEPT//
  deletePaymentConcept(data) {
    const dialogRef = this._dialog.open(DialogDeletepaymentconceptComponent, {
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);

      if (result.success) {
        this._services.service_general_delete("RequestPayment/DeletePaymentConcept/" + data.id + "/" + result.type).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: data.message
              },
              width: "350px"
            });
            //this.get_payment();
          }
        }))
      }
    })
  }
  //*****************************************************************************************************//
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    ////console.log(this.user);
    this.home_finding.commentHomeFindings.push({
      "id": 0,
      "homeFindingId": this.home_finding.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.home_finding.commentHomeFindings.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }
  //*****************************************************************************************************//
  addDocument() {
    this.data.typeDocument = 26;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
      if (result.success) {
        ////debugger;
        result.homeFindingId = this.home_finding.id;
        this.temporalDocumentHF.push(result);
      }
    });
  }
  //*****************************************************************************************************//
  //**DELETE DOCUMENTO FROM DATABASE**//
  deleteDocument_DB(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
      if (result) {
        this._services.service_general_delete("RelocationServices/DeleteDocumentHF?id=" + id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: data.result
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }))
      }
    });
  }
  //**DELETE DOCUMENT FROM VAR TEMPORALS**//
  deleteDocument_LOCAL(position) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
      if (result) {
        this.temporalDocumentHF.splice(position, 1);
      }
    })
  }
  //*****************************************************************************************************//
  //**METHODS REMINDER (NEW)**//
  addReminder() {
    this.home_finding.reminderHomeFindings.push({
      "id": 0,
      "homeFindingId": this.home_finding.id,
      "reminderDate": new Date(),
      "reminderComments": " ",
      "createdBy": this.user.id,
      "createdDate": new Date()
    })
  }
  //**DELETE REMINDER**//
  removeReminder(i, id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Reminder?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
      if (result) {
        if (id == 0) {
          this.home_finding.reminderHomeFindings.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteReminderHF?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Reminder deleted"
                },
                width: "350px"
              });
              this.ngOnInit();
            }
          }))
        }
      }
    })
  }
  //******************************************************************************************************//
  //HOUSING//
  HousingSpecs() {

    let data_ = {
      numberWorkOrder: this.data.data.numberWorkOrder,
      serviceID: this.data.data.number_server,
      serviceName: this.data.data.service_name,
      sr: this.data.sr,
      service: this.data.data.serviceTypeId,
      type_housing: 2,
      home_finding_id: this.home_finding.id,
      workOrderServicesId: this.home_finding.workOrderServicesId
    }
    const dialogRef = this._dialog.open(DialogHousingSpecificationsComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
      if (result) {
      }
    })
  }

  

  //NEW RECORD//
  HomeDetailsnew() {
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.home_finding.workOrderServicesId,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName: this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId: this.data.data.serviceTypeId,
        sr: this.data.sr,
        supplierType: 3,
        no_permanent: false
        , idServiceDetail: this.home_finding.id
        , shared: 1,
        cat_service_id: 26, // Cat_Service es home finding
        catCategoryId: 21 // Cat_Category es home finding
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousingList();
      
    })
  }
  //EDIT HOUSING//
  editHousing(data) {
    /*
    data.sr = this.data.sr;
    data.numberWorkOrder = this.data.data.numberWorkOrder;
    data.serviceID =  this.data.data.number_server;
    data.serviceName = this.data.data.service_name;
    */
    data.supplierType = 3
    data.workOrderServicesId = this.home_finding.workOrderServicesId,
      data.sr = this.data.sr;
    data.numberWorkOrder = this.data.data.numberWorkOrder;
    data.serviceID = this.data.data.number_server;
    data.serviceName = this.data.data.service_name;
    data.idServiceDetail = this.home_finding.id;
    data.shared = 1;
    data.cat_service_id = 26;
    ////console.log("Editar Housing: ", data);
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousingList();
    })
  }

  validatedeleteHousing(_data_) {
    ////debugger;
    if (_data_.wassended || _data_.status != 'Pending') {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Not Allowed",
          body: "The property has already been sent, it cannot be deleted."
        },
        width: "350px"
      });
    }
    else {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Are you sure to delete the property?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.save();
          this.delete_housing(_data_);
        }
      });
    }
  }

  delete_housing(_data_) {
    this.loader.showLoader();
    debugger
    this._services.service_general_put("HousingList/LogicDeleteHousing", _data_.id).subscribe((data => {
      console.log("guardar db: ", data);

      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        this.loader.hideLoader();
        this.getDataHousingList();
        // this.dialogRef.close();
        // this.ngOnInit();
      }
    }), (err) => {
      this.loader.hideLoader();
      this.getDataHousingList();
      console.log("error: ", err);
    })
  }

  //******************************************************************************************************//
  //DATA FINAL//
  dataFinal() {

  }
  //******************************************************************************************************//
  //DOCUMENT TYPE//
  getDocument(id) {
    for (let i = 0; i < this.ca_document.length; i++) {
      if (this.ca_document[i].id == id) {
        return this.ca_document[i].documentType;
      }
    }
  }
  //NACIONALITY//
  getNacionality(id) {
    for (let i = 0; i < this.nacionality.length; i++) {
      if (this.nacionality[i].id == id) {
        return this.nacionality[i].name;
      }
    }
  }
  //INCLUDED//
  getIncluded(data) {
    if (data == false) {
      return 'NO';
    } else if (data == true) {
      return 'SI';
    }
  }


 
  //FUNCION PARA VER DOCUMENTO//

  public showDocumentDialogDetails(document: any, service_line: number = undefined): void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        sl: 1,
        name_section: "only_one_service"
      }
    });

  }
  //******************************************************************************************************//
  //SELECT CARD//
  select_card(data, event) {
    ////console.log(data);
    ////console.log(event);
  }
  //******************************************************************************************************//

  async validate_status_complete(obj_detail) {
    if (obj_detail.statusId == 4 || obj_detail.statusId == 5) {
      obj_detail.serviceCompletionDate = new Date().toISOString();

      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "The status is complete, this will set the end of service date to today. are you sure?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        // //console.log(result);
        if (result) {
          this.save()
        }
        else {
          return false
        }
      });

    }
    else {
      obj_detail.serviceCompletionDate = '';
      this.save();
      return true;
    }

  }

  async save() {
    // //debugger;
    //     var continuar = await this.validate_status_complete(this.home_finding);
    //     if(!continuar)
    //     {
    //       return
    //     }
    //debugger;

    this.loader.showLoader();
    this.home_finding.updateBy = this.user.id;
    this.home_finding.updatedDate = new Date();
    this.home_finding.createdBy = this.user.id;
    this.home_finding.createdDate = new Date();
    this.home_finding.documentHomeFindings = this.temporalDocumentHF;



    let data_comment_aux = this.home_finding.commentHomeFindings;
    this.home_finding.commentHomeFindings = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.home_finding.commentHomeFindings.push(data_comment_aux[i]);
      }
    }
    // si el estatus cambia a complete la fecha se guarda
    if (this.home_finding.statusId == 4 || this.home_finding.statusId == 5) {
      this.home_finding.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.home_finding.serviceCompletionDate = '';
    }

    ////console.log("GUARDAR: ", this.home_finding);
    this.temporalDocument = [];

    this.home_finding.documentHomeFindings = this.temporalDocumentHF;
    this.home_finding.userId = this.user.id;
    this.home_finding.number_server = this.data.data.number_server;
    debugger
    console.log(stringify(this.home_finding))
    this._services.service_general_put("RelocationServices/PutHomeFinding", this.home_finding).subscribe(data => {
      this.loader.hideLoader();
      if (data.success) {
        ////console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close();
        this.temporalDocument = [];
        this.ngOnInit();
      }
      else {
        console.log("ha ocurrido un error al guardar ne le servicio RelocationServices/PutHomeFinding", this.data)
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "An error has occurred."
          },
          width: "350px"
        });
      }
    }, (error) => {
      this.loader.hideLoader();
      console.error('error interno en el servicio RelocationServices/PutHomeFinding: ', error);
      const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Error",
          body: "An error has occurred."
        },
        width: "350px"
      });
    })


  }

  //PRIVACY//
   getPrivacyName(id) {
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if (this.ca_privacy[i].id == id) {
        return this.ca_privacy[i].privacy;
        // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
      }
    }
  } 

  //***********************************************************************************************************//
  




  change_status_detail() {
    //////debugger;
    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 21,
        type: "home_findig"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////debugger;
      // //console.log(result);
      if (result.success) {
        this.home_finding.statusId = result.id; //penidng to completion 
        this.get_text_status();
      }
      else {
        //nada 
      }
    });


  }

  //***********************************************************************************************************//
  

  payment_rocess = { "securityDepositId": null, "initialRentPaymentId": null, "ongoingRentPaymentId": null, "realtorCommissionId": null }


  _texto_status = "";

  get_text_status() {
    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.home_finding.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  }


  set_houses_to_send(id, set) {

    if (set) {
      this.hl_to_send.push(id);
    }
    else {
      this.hl_to_send = this.hl_to_send.filter(function (E) {
        if (E != id) {
          return true;
        }
      });
    }

  }

  onChangeDemo(ob: MatCheckboxChange, element) {
    element.wassended = ob.checked;
    console.log("checked: " + ob.checked, " id housing: ", element.id);
    this.set_houses_to_send(element.id, ob.checked)
  }

  sent_houses_list() {

    console.log("casas a enviar: ", this.hl_to_send);

    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Confirmation",
        body: "This action will change the status of the properties to 'Sent' and send an email notifying the assignee."
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      // //console.log(result);
      if (result) {
        //this.getDataHousingList();
        this.call_service_send_propertys();
      }
    });
  }


  call_service_send_propertys() {
    this.loader.showLoader();
    let list_obj = { list: this.hl_to_send, id_sr: this.data.data.serviceRecordId }

    console.log("DATA A enviar la servicio : ", list_obj);
    this._services.service_general_post_with_url("HousingList/SendPropertys", list_obj).subscribe((data => {
      this.loader.hideLoader();

      console.log("resultado de SendPropertys: ", data, data.result.value);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Properties Sent"
        },
        width: "350px"
      });


    }), (err) => {
      this.loader.hideLoader();
      console.log("Error en SendPropertys: ", err);
    })
  }

  getProperty_(id) {
    for (let i = 0; i < this.ca_property.length; i++) {
      if (this.ca_property[i].id == id) {
        return this.ca_property[i].propertyType;
      }
    }
  }

}