import { Component, OnInit ,Inject} from '@angular/core';
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
@Component({
  selector: 'app-home-finding',
  templateUrl: './home-finding.component.html',
  styleUrls: ['./home-finding.component.scss']
})
export class HomeFindingComponent implements OnInit {


  calculo : any = {};
  mostrarTarjeta : any = {
    contractDetails: false,
    paymenType: false,
    costSaving: false,
    renewalDetails: false,
    departureDetails: false,
    landLord: false,
    repairs: false,
    move_in: false,
    move_out: false
  };
  //VARIABLES PARA LEASER SUMMARY//
  data_contracts:any = {};
  paymentHousings = [];
  costSavingHomes = [];
  data_renewal:any ={}
  data_departure:any = {}
  data_land:any = {
    creditCardLandLordDetails:[]
  };
  //VARIABLES PARA INSECTIONS & REPAIRS//
  data_move_in:any= {
    propertyReportSections: [],
      keyInventories: [],
      attendees: []
  };
  data_move_out:any= {
    propertyReportSections: [],
      keyInventories: [],
      attendees: []
  };


  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  show:boolean = false;
  user: any = {};
  //*******************************************************//
  //***********************VARIABLES***********************//
  table_payments:any;
  ca_estatus: any[] = [];
  ca_currency: any[] = [];
  ca_requestType:any[]=[];
  ca_dependent:any[]=[];
  home_finding: any = {};
  temporalDocument:any[]=[];
  ca_accounttype:any[] = [];
  ca_leaseTemplate:any[] = [];
  ca_creditCard:any[]=[];
  nacionality:any[]=[];
  ca_document:any[]=[];
  cr: string = "Reply";
  loader:LoaderComponent = new LoaderComponent();
  //TABLE EXTENSION//
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //RESQUEST PAYMENT//
  dataSourcePay: any[] = [];
  displayedColumnsPay: string[] =  ['Payment','Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence','action'];
  //TABLE HOUSING//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Housing Status', 'Actions'];
  //*******************************************************//
  serviceScope: any[] = [];
  public leaseGuarentee = [
    {
      value: 1,
      name: 'Yes'
    },
    {
      value: 0,
      name: 'No'
    }
  ];


  ngOnInit(): void {
    this.loader.showLoader();
    console.log("HOME FINDING: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.home_finding = {};
    this.get_catalogos();
  }
   // get service scope
   getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.home_finding.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  public __serverPath__:string = this._services.url_images;
  public openFileOnWindow( url_in:string ):void {
    const server_url:string = this.__serverPath__ + url_in;
    window.open( server_url );
  }
  //*****************************************************************************************************//
  ca_accountType = [];
  ca_payment_Type = [];
  ca_responsible = [];
  ca_recurrence = [];
  ca_statuspropertySection = [];
  ca_propertySection = [];
  ca_relation = [];
  ca_repair = [];
  SupplierCompany = []
  ca_property = [];
  ca_privacy = [];
  //BRING DATA CATALOGUES//
  async get_catalogos() {
    this.ca_statuspropertySection=await this._services.getCatalogueFrom('GetStatusPropertySection');
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=21").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }));
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.ca_leaseTemplate = await this._services.getCatalogueFrom('GetLeaseTemplate');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_document = data.result;
      }
    }))
    this.ca_propertySection=await this._services.getCatalogueFrom('GetPropertySection');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_repair=await this._services.getCatalogueFrom('GetRepairType');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.ca_recurrence = duration.filter(function(E){
      if(E.recurrence != null){
         return true;
      }
    });

    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');

    this.ca_creditCard.forEach(E => {
      E.checked = false;
    });

    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r=> {
      if(r.success) {
        for (let i=0; i < r.result.length; i++) {
          const element=r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r=> {
      if(r.success) {
        for (let i=0; i < r.result.length; i++) {
          const element=r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    })


    this._services.service_general_get('RelocationServices/GetHomeFindingById?id=' + this.data.data.service[0].id).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.home_finding = data.result;
        this.show = true;
        this.dataSource = this.home_finding.extensionHomeFindings;
        this.get_dependent();
        this.getServiceScope();
        if( this.home_finding.commentHomeFindings.length == 0){
          this.addReply();
        }
        this.getDataHousing();
        this.get_payment();
        this.loader.hideLoader();
      }
    });

  }
  //*****************************************************************************************************//
  //DEPENDENT//
  get_dependent(){
    this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(this.data.sr)).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_dependent = data.result;
      }
    });
  }
  //*****************************************************************************************************//
  //DATA TABLE HOUSING//
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe((data_housing) => { //this.area_orientation.workOrderServicesId
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        this.permanent_homet(this.dataSourceHousing);
        this.dataFinal();
      }
    });
  }
  //*****************************************************************************************************//
  //**PERMANENT HOME**//
  permanentHome:any;
  data_inspection=[];
  data_repairs=[];
  data_home = [];
  permanent_homet(data){
      let permanentHome  = data.filter(function(E)  {
          if(E.status == "Permanent Home"){
             return true;
          }
      })
      console.log(permanentHome);
      this.data_home = permanentHome;
      for (let i = 0; i < permanentHome.length; i++) {
        this._services.service_general_get("HousingList/GetHousing?key="+permanentHome[i].id).subscribe((data => {
          this.permanentHome = data.result;
          console.log('esta es la casa permanente: ', this.permanentHome);
          this.data_contracts = this.permanentHome.contractDetail;
          this.paymentHousings = this.permanentHome.paymentHousings;
          this.costSavingHomes = this.permanentHome.costSavingHomes;
          this.data_renewal = this.permanentHome.renewalDetailHome;
          this.data_departure = this.permanentHome.departureDetailsHome;
          this.data_land = this.permanentHome.landlordDetailsHome;

          if(this.data_land.creditCardLandLordDetails){
            this.ca_creditCard.forEach(E => {
            for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
                if(this.data_land.creditCardLandLordDetails[i].creditCard == E.id){
                  E.checked = true;
                }
              }
            })
          }

          if(this.permanentHome.propertyReports) {
            for(let i=0; i < this.permanentHome.propertyReports.length; i++) {
              if(this.permanentHome.propertyReports[i].propertyInspection==1) {
                this.data_move_in=this.permanentHome.propertyReports[i];
              }

              if(this.permanentHome.propertyReports[i].propertyInspection==2) {
                this.data_move_out=this.permanentHome.propertyReports[i];
              }
            }

            console.log(this.data_move_in);
          }

          this.data_inspection = this.permanentHome.inspections;
          this.data_repairs = this.permanentHome.repairs;
        }))
      }
  }
  //*****************************************************************************************************//
  //**CONSULTA PAYMENT**//
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.home_finding.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.table_payments = data.result.value.payments;
        console.log(this.table_payments);
      }
      console.log(this.table_payments);
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
      this.get_payment();
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
      this.get_payment();
    });
  }

  //DELETE PAYMENT CONCEPT//
  deletePaymentConcept(data) {
    const dialogRef = this._dialog.open(DialogDeletepaymentconceptComponent, {
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
          this._services.service_general_delete("RequestPayment/DeletePaymentConcept/"+data.id+"/"+result.type).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: data.message
                },
                width: "350px"
              });
              this.get_payment();
            }
          }))
      }
    })
  }
  //*****************************************************************************************************//
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    console.log(this.user);
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
    this.data.typeDocument = 1;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
         result.homeFindingId = this.home_finding.id;
         this.temporalDocument.push(result);
      }
    });
  }
  //*****************************************************************************************************//
  //**DELETE DOCUMENTO FROM DATABASE**//
  deleteDocument_DB(id){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
  deleteDocument_LOCAL(position){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.temporalDocument.splice(position, 1);
      }
    })
  }
  //*****************************************************************************************************//
  //**METHODS REMINDER (NEW)**//
  addReminder() {
    this.home_finding.reminderHomeFindings.push({
      "id": 0,
      "homeFindingId": this.home_finding.id,
      "reminderDate": null,
      "reminderComments": null,
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
      console.log(result);
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
  HousingSpecs(){
    let data_ = {
      numberWorkOrder: this.data.data.numberWorkOrder,
      serviceID: this.data.data.number_server,
      serviceName:  this.data.data.service_name,
      sr: this.data.sr,
      service: this.data.data.serviceTypeId,
      type_housing: 2,
      workOrderServicesId: this.home_finding.workOrderServicesId
    }
    const dialogRef = this._dialog.open(DialogHousingSpecificationsComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
      }
    })
  }
  //NEW RECORD//
  HomeDetailsnew(){
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.home_finding.workOrderServicesId,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName:  this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId : this.data.data.serviceTypeId,
        sr: this.data.sr,
        supplierType: 3
        /*
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName:  this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId : this.data.data.serviceTypeId,
        sr: this.data.sr
        */
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //EDIT HOUSING//
  editHousing(data){
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
    data.serviceID =  this.data.data.number_server;
    data.serviceName = this.data.data.service_name;
    console.log("Editar Housing: ", data);
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent,{
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //******************************************************************************************************//
  //DATA FINAL//
  dataFinal(){
    /*
    this.home_finding.permanentHomes = [];
    let housing = this.dataSourceHousing.filter(function(E){
      if(E.status == 'Pending'){
        return true;
      }
    })

    housing.forEach(E => {
     this._services.service_general_get("HousingList/GetHousing?key="+E.id).subscribe(async(data) => {
        console.log("LA CASA ES: ",data);
        if(data.success){
          this.home_finding.permanentHomes.push(data.result);
        }
      });
    })
    */
    ///console.log("OBJETO FINALLLLLLL OBJETO FINALLLLLLL: ",this.home_finding);
  }
  //******************************************************************************************************//
  //DOCUMENT TYPE//
  getDocument(id){
    for(let i = 0; i < this.ca_document.length; i++){
      if(this.ca_document[i].id == id){
         return this.ca_document[i].documentType;
      }
    }
  }
  //NACIONALITY//
  getNacionality(id){
    for(let i = 0; i < this.nacionality.length; i++){
      if(this.nacionality[i].id == id){
         return this.nacionality[i].name;
      }
    }
  }
  //INCLUDED//
  getIncluded(data){
    if(data == false){
      return 'NO';
    }else if(data == true){
      return 'SI';
    }
  }
  //Currency//
  getCurrency(id){
    for (let i = 0; i < this.ca_currency.length; i++) {
      if(this.ca_currency[i].id == id){
         return this.ca_currency[i].currency;
      }
    }
  }
  //Payment//
  getPayment(id){
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if(this.ca_payment_Type[i].id == id){
         return this.ca_payment_Type[i].paymentType;
      }
    }
  }
  //Responsable//
  getResponsable(id){
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if(this.ca_responsible[i].id == id){
         return this.ca_responsible[i].responsable;
      }
    }
  }
  //Recurrencia//
  getRecurrence(id){
    for (let i = 0; i < this.ca_recurrence.length; i++) {
      if(this.ca_recurrence[i].id == id){
         return this.ca_recurrence[i].recurrence;
      }
    }
  }
  //DEPENDENT//
  getDependent(id){
    for (let i = 0; i < this.ca_dependent.length; i++) {
      if(this.ca_dependent[i].id == id){
         return this.ca_dependent[i].name;
      }
    }
  }
  //DEPENDENT//
  getAccount(id){
  for (let i = 0; i < this.ca_accountType.length; i++) {
    if(this.ca_accountType[i].id == id){
       return this.ca_accountType[i].accountType;
    }
  }
  }
  //Seccion property//
  getProperty(id){
    for (let i = 0; i < this.ca_propertySection.length; i++) {
      if(this.ca_propertySection[i].id == id){
         return this.ca_propertySection[i].propertySection;
      }
    }
  }
  //Seccion property//
  getCondicion(id){
      for (let i = 0; i < this.ca_statuspropertySection.length; i++) {
        if(this.ca_statuspropertySection[i].id == id){
           return this.ca_statuspropertySection[i].status;
        }
      }
    }
  //RELATION SHIP//
  getReltion(id){
    for (let i = 0; i < this.ca_relation.length; i++) {
      if(this.ca_relation[i].id == id){
         return this.ca_relation[i].relationship;
      }
    }
  }
  //Repair//
  getRepair(id){
    for (let i = 0; i < this.ca_repair.length; i++) {
      if(this.ca_repair[i].id == id){
         return this.ca_repair[i].repairType;
      }
    }
  }
  //Supplier//
  getSupplier(id){
    for (let i = 0; i < this.SupplierCompany.length; i++) {
      if(this.SupplierCompany[i].int == id){
         return this.SupplierCompany[i].supplierCompany;
      }
    }
  }
  //Supplier//
  getProperty_(id){
    for (let i = 0; i < this.ca_property.length; i++) {
      if(this.ca_property[i].id == id){
         return this.ca_property[i].propertyType;
      }
    }
  }
  //FUNCION PARA VER DOCUMENTO//

  public showDocumentDialogDetails( document:any, service_line:number = undefined ):void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        sl:1,
        name_section: "only_one_service"
      }
    });

  }
  //******************************************************************************************************//
  //SELECT CARD//
  select_card(data, event){
    console.log(data);
    console.log(event);
  }
  //******************************************************************************************************//
  save(){
    this.home_finding.updateBy = this.user.id;
    this.home_finding.updatedDate = new Date();
    this.home_finding.createdBy = this.user.id;
    this.home_finding.createdDate = new Date();
    this.home_finding.documentHomeFindings = this.temporalDocument;



    let data_comment_aux =  this.home_finding.commentHomeFindings;
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

    console.log("GUARDAR: ", this.home_finding);
    this.temporalDocument = [];

    this._services.service_general_put("RelocationServices/PutHomeFinding", this.home_finding).subscribe((data => {
      if(data.success){
        console.log(data);
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
    }))
    this.loader.hideLoader();

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

}
