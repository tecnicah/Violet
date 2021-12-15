import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { assistance, repairs, inspectionsRepairs, departureAssistanceWiths } from './departure';
import { DialogAddpaymentComponent } from '../dialog-addpayment/dialog-addpayment.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { DialogCostSavingsComponent } from '../dialog-cost-savings/dialog-cost-savings.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';

@Component({
  selector: 'app-dialog-departure',
  templateUrl: './dialog-departure.component.html',
  styleUrls: ['./dialog-departure.component.scss']
})
export class DialogDepartureComponent implements OnInit {

  //**********************************************//
  //*****************VARIABLES********************//
  propertySwitch: false;
  user:any; //era public
  departure: any = {}; //era public
  temporalDocument:any[]=[];
  table_payments: any;
  vista: boolean = false;
  //EXTENSION//
  dataSource:any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //RESQUEST PAYMENT//
  dataSourcePay: any[] = [];
  displayedColumnsPay: string[] = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date', 'Status', 'action'];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  //TABLE HOUSING//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Housing Status', 'Actions'];
  //CATALOGOS_GET//
  ca_estatus:any[]=[];
  ca_requestType:any[]=[];
  area_orientation:any;
  nacionality:any;
  ca_document:any;
  ca_currency:any;
  ca_dependent:any[]=[];
  // ca_property :any[]=[];
  // ca_repair:any[] = [];
  ca_supplier:any[]=[];
  ca_asistance: any[] = [];
  ca_accounttype:any[] = [];
  cr: string = "Reply";
  other: boolean = false;
  payments: any[] = [];
  calculo: any = {};
  ca_creditCard: any[] = [];
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
  serviceScope : any[] = [];



  public __loader__: LoaderComponent= new LoaderComponent();

  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {

  }
  //*****************************************************************************************************//
  ngOnInit() {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("datos de la tabla: ", this.data);
    this.get_catalogos();

  }
   // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.departure.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
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
  // se agrego para credit card
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
  public today = new Date();

  async get_catalogos(){
    this.__loader__.showLoader();
    this.ca_statuspropertySection=await this._services.getCatalogueFrom('GetStatusPropertySection'); //
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=16").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }));
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      console.log(data);
      if(data.success){
        this.ca_document = data.result;
      }
    }))
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_supplier = await this._services.getCatalogueFrom('GetSupplier');
    this.ca_asistance = await this._services.getCatalogueFrom('GetAssistanceWith');
    console.log("ca_assistance: ", this.ca_asistance);
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_recurrence = duration.filter(function(E){
      if(E.recurrence != null){
         return true;
      }
    });
    // credit card se agrego
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');

    // credit card se agrego
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');

    this.ca_creditCard.forEach(E => {
      E.checked = false;
    });
    // fin credit card
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    // se agrego para repair
    this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r=> {
      if(r.success) {
        for (let i=0; i < r.result.length; i++) {
          const element=r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });
    // se agrego para reapair
    this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r=> {
      if(r.success) {
        for (let i=0; i < r.result.length; i++) {
          const element=r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    })

    this._services.service_general_get('RelocationServices/GetDepartureById?id=' + this.data.data.service[0].id).subscribe((data => {
      if (data.success) {
        console.log('id', this.data.data.service[0].id);
        console.log('DATA CONSULTA: ', data);
        this.departure = data.result;
        this.vista = true;
        this.dataSource = this.departure.extensionDepartures;
        if(this.departure.commentDepartures.length == 0){
          this.addReply();
        }

        let data_assistance = [];

        for (let i = 0; i <  this.ca_asistance.length; i++) {
          const element =  this.ca_asistance[i];
          this.ca_asistance[i].id_other = 1;
          if( this.ca_asistance[i].id== 4){
            this.ca_asistance.splice(i,1);
          }
        }

        for (let i = 0; i < this.departure.departureAssistanceWiths.length; i++) {
          const element = this.departure.departureAssistanceWiths[i];
          for (let j = 0; j < this.ca_asistance.length; j++) {
            if(element.completionDate != '' && element.completionDate != undefined && element.completionDate != null && element.assistanceWith == this.ca_asistance[j].id){
              this.ca_asistance[j].check = true;
              this.ca_asistance[j].completionDate = element.completionDate;
              this.ca_asistance[j].other = element.otherSpecify;
              this.ca_asistance[j].departaureId = this.departure.id;
              this.ca_asistance[j].idDB = this.departure.departureAssistanceWiths[i].id;
              this.ca_asistance[j].assistanceWith = this.ca_asistance[j].id;
            }
            /*
            else{
              this.ca_asistance[j].check = false;
            }
            */
          }

          if(this.departure.departureAssistanceWiths[i].assistanceWith == 4 ){
            data_assistance.push({
              "assistance": "Other",
              "completionDate":  element.completionDate,
              "createdBy": null,
              "createdDate": null,
              "id": 4,
              "check": true,
              "other": element.otherSpecify,
              "updateBy": null,
              "updatedDate": null
            })
          }

        }

        for (let i = 0; i < data_assistance.length; i++) {
           this.ca_asistance.push(data_assistance[i]);
        }


        // if(this.departure.departureRepairs.length == 0){
        //   this.addRepair();
        // }
        // if(this.departure.inspectionsRepairs.length == 0){
        //   inspectionsRepairs.departureId = this.departure.id;
        //   inspectionsRepairs.createdBy = this.user.id;
        //   inspectionsRepairs.createdDate = new Date()
        //   this.departure.inspectionsRepairs.push(inspectionsRepairs);
        // }

        this.getDataHousing(); //permanent home
        this.get_dependent();
        this.get_payment();
        this.getServiceScope();

        this.__loader__.hideLoader();
       }
    }));

  }



  //*****************************************************************************************************//
  propertyDetails(data_){
    console.log(data_);
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        workOrderServicesId: this.departure.workOrderServicesId,
        type : 2,
        supplierType : 3,
        id: Number(data_),
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      /*
      console.log(result);
      result.departaureId = this.departure.id;
      result.ongoingPayment = result.paymentResponsibility;
      this.departure.departurePayments.push(result);
      console.log("cierre del dialog addPaymentType: ", this.departure.departurePayments);
      */
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
  //ADD PAYMENT TYPE (TABLE)//
  addPaymentType(){
    const dialogRef = this._dialog.open(DialogAddpaymentComponent, {
      data: { id : 0 },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      result.departaureId = this.departure.id;
      result.ongoingPayment = result.paymentResponsibility;
      this.departure.departurePayments.push(result);
      console.log("cierre del dialog addPaymentType: ", this.departure.departurePayments);
    });
  }
  //EDIT PAYMENT//
  editPaymentType(data, pos){
    const dialogRef = this._dialog.open(DialogAddpaymentComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      result.ongoingPayment = result.paymentResponsibility;
      this.departure.departurePayments[pos] = result;
      console.log("cierre del dialog EDIT PaymentType: ", this.departure.departurePayments);
    });
  }
  //*****************************************************************************************************//
  addAssistance(){
    this.departure.departureAssistanceWiths.push({
        "id": 0,
        "departaureId": this.departure.id,
        "assistanceWith": 0,
        "completionDate": null,
        "otherSpecify": null,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updateBy": this.user.id,
        "updatedDate": new Date(),
      });
  }
  //*****************************************************************************************************//
  addAddInspectionDate(){
    this.departure.inspectionsRepairs.push(
      {
        "id": 0,
        "departureId": this.departure.id,
        "initialInspectionDate": null,
        "finalInspectionDate": null,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updateBy": this.user.id,
        "updatedDate": new Date()
      });
  }
  //DELETE INSPECTION DATE//
  removeinspectionsRepairs(i, id){
    this.departure.inspectionsRepairs.splice(i, 1);
  }
  //*****************************************************************************************************//
  //REPAIRS//
  removeRepairs(i, id){
    this.departure.departureRepairs.splice(i, 1);
  }
  //ADD REPAIRS//
  addRepair(){
    this.departure.departureRepairs.push({
      "id": 0,
      "departaureId": this.departure.id,
      "repairType": 0,
      "supplierPartner": 0,
      "repairStartDate": null,
      "repairEndDate": null,
      "totalDays": 0,
      "comments": null,
      "documentRepairs": []
    })
  }

  //*****************************************************************************************************//
  //**PERMANENT HOME**//
  permanentHome:any;
  data_inspection=[];
  data_repairs=[];
  data_home = [];
  permanent_homet(data){
      console.log("PERMANENT HOME");
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

  //Supplier//
  getProperty_(id){
    for (let i = 0; i < this.ca_property.length; i++) {
      if(this.ca_property[i].id == id){
         return this.ca_property[i].propertyType;
      }
    }
  }

   editHousing(){
     let data:any = {};
     data.id = this.departure.propertyId;
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
   //NEW RECORD//
   HomeDetailsnew(){
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
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
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.departure.workOrderServicesId,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName:  this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId : this.data.data.serviceTypeId,
        sr: this.data.sr,
        supplierType: 3
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //Recurrencia//
  getRecurrence(id){
    for (let i = 0; i < this.ca_recurrence.length; i++) {
      if(this.ca_recurrence[i].id == id){
          return this.ca_recurrence[i].recurrence;
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

  public showDocumentDialogDetails( document:any, service_line:number = undefined ):void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        name_section: "only_one_service",
        sl: 1
      }
    });
  }
  //*****************************************************************************************************//
  //************************************//
  public files: NgxFileDropEntry[] = [];
  //**FUNCIONES DE CARGA DE DOCUMENTO***//
  public dropped(files: NgxFileDropEntry[], i) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = file.type.split("/");

              this.departure.departureRepairs[i].documentRepairs.push({
                    "id": 0,
                    "fileName": droppedFile.relativePath,
                    "fileExtension": ext[1],
                    "fileRequest": encoded,
                    "createdBy": this.user.id,
                    "createdDate": new Date(),
                    "repairId": this.departure.id
              })
            };
          });


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  //**FUNCIONES DE CARGA DE DOCUMENTO***//
  public fileOver(event, i) {
    console.log(event);
  }
  //**FUNCIONES DE CARGA DE DOCUMENTO***//
  public fileLeave(event, i) {
    console.log(event);
  }
  //*****************************************************************************************************//
  //**NEW DOCUMENT**//
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
         result.departaureId = this.departure.id;
         this.temporalDocument.push(result);
      }
    });
  }
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
        this._services.service_general_delete("RelocationServices/DeleteDocumentD?id=" + id).subscribe((data => {
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
  //**CONSULTA PAYMENT**//
  get_payment() {
    console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.departure.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log('datos de tabla request', data);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        // console.log('datos de la tabla' + data.result.value.payments);
      }
      console.log('2° datos de la tabla' + this.payments);
    }))
  }
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(data) {
    console.log('workOrderServicesId', this.departure.workOrderServicesId);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.departure.workOrderServicesId,
        workOrder: this.data.data.workOrderId,
        service: this.data.data.id_server,
        id: 0,
        type: 2,
        supplierType: 3
      }
    }else{
      data.type = 2;
      data.supplierType = 3;
      data.id = data.requestPaymentId;
      data.serviceRecord = this.data.data.serviceRecordId;
      data.sr = this.data.data.serviceRecordId;
      data.service = this.data.data.id_server;
    }
    console.log("Data al abrir modal de payment concept: ", data);
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_payment();;
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

  // delete payment
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
              this.get_payment();;
            }
          }))
      }
    })
  }

  //*****************************************************************************************************//
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    console.log(this.user);
    this.departure.commentDepartures.push({
        "id": 0,
        "departureId": this.departure.id,
        "reply": null,
        "userId": this.user.id,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updateBy": this.user.id,
        "updatedDate": new Date(),
        "user": this.user
      })

      if (this.departure.commentDepartures.length == 1) {
        this.cr = "Comment";
      } else {
        this.cr = "Reply";
      }
  }
  //*****************************************************************************************************//
  //**METHODS REMINDER (NEW)**//
  addReminder() {
    this.departure.reminderDepartures.push({
      "id": 0,
      "departaureId": this.departure.id,
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
          this.departure.reminderDepartures.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteReminderD?id=" + id).subscribe((data => {
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
  //DOCUMENT TYPE//
  getDocument(id){
    for(let i = 0; i < this.ca_document.length; i++){
      if(this.ca_document[i].id == id){
         return this.ca_document[i].documentType;
      }
    }
  }
  //NACIONALITY//
  getNacionality(id) {
    if (id != null) {
      for (let i = 0; i < this.nacionality.length; i++) {
        if (this.nacionality[i].id == id) {
          return this.nacionality[i].name;
        }
      }
    }
    else {
      return "--";
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
  //CURRENCY//
  getCurrency(id){
    for(let i = 0; i < this.ca_currency.length; i++){
      if(this.ca_currency[i].id == id){
         return this.ca_currency[i].currency;
      }
    }
  }
  //*****************************************************************************************************//
  //**SAVE**//
  save(){
    this.__loader__.showLoader();
    this.departure.updateBy = this.user.id;
    this.departure.updatedDate = new Date();
    this.departure.createdBy = this.user.id;
    this.departure.createdDate = new Date();
    this.departure.documentDepartures = this.temporalDocument;
    this.temporalDocument = [];

    for (let i = 0; i < this.ca_asistance.length; i++) {
      const element = this.ca_asistance[i];
      this.ca_asistance[i].assistanceWith = this.ca_asistance[i].id;
      if(this.ca_asistance[i].idDB != undefined){
        this.ca_asistance[i].id = this.ca_asistance[i].idDB;
      }else{
        this.ca_asistance[i].id = 0;
      }
      if(this.ca_asistance[i].check != true){
        this.ca_asistance.splice(i,1);
      }else{
        this.ca_asistance[i].departaureId = this.departure.id;
      }
    }
    this.departure.departureAssistanceWiths = this.ca_asistance;

    let data_comment_aux =  this.departure.commentDepartures;
    this.departure.commentDepartures = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.departure.commentDepartures.push(data_comment_aux[i]);
      }
    }
    // si el estatus cambia a complete la fecha se guarda
    if (this.departure.statusId == 4 || this.departure.statusId == 5) {
      this.departure.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.departure.serviceCompletionDate = '';
    }

    console.log("SAVED DATA: ", this.departure);
    // service_general_post_with_url

    this._services.service_general_put("RelocationServices/PutDeparture", this.departure).subscribe((data => {
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
    this.__loader__.hideLoader();
  }
  //*****************************************************************************************************//
  displayPanelSchooling($event){
    this.departure.propertyDeparture = $event.checked;
  }
  //*****************************************************************************************************//
  //ADD COST SAVINGS (TABLE)//
  addCostSavings(){
    const dialogRef = this._dialog.open(DialogCostSavingsComponent, {
      data: { id : 0 },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      result.departureId = this.departure.id;
      result.createdBy = this.user.id;
      result.createdDate = new Date();
      result.updateBy = this.user.id;
      result.updatedDate = new Date();
      this.departure.departureCostSavings.push(result);
      console.log("COST SAVING:  ",this.departure.costSavingDetails);

    });
  }
  //EDIT COST SAVINGS//
  editCostSavings(data, pos){
    const dialogRef = this._dialog.open(DialogCostSavingsComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.departure.costSavingDetails[pos] = result;
      console.log("cierre del dialog INCLUDED COST SAVINGS EDIT: ", this.departure.costSavingDetails);
    });
  }
  //*****************************************************************************************************//
  addOther(){
    this.ca_asistance.push({
       "assistance": "Other",
       "completionDate": null,
       "createdBy": null,
       "createdDate": null,
       "id": 4,
       "id_other": 0,
       "other": null,
       "updateBy": null,
       "updatedDate": null
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

}

