import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogAddpaymentComponent } from '../dialog-addpayment/dialog-addpayment.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { FormControl } from '@angular/forms';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';

@Component({
  selector: 'app-dialog-airport-transportation',
  templateUrl: './dialog-airport-transportation.component.html',
  styleUrls: ['./dialog-airport-transportation.component.scss']
})
export class DialogAirportTransportationComponent implements OnInit {
  //VARIABLES//
  location: string = "location";
  country_text: string = "country_name";
  info: any[] = [];
  toppings = new FormControl();
  temporalDocument: any[] = [];
  transportation: any;
  table_payments: any;
  user: any;
  supplier_get: any[] = [];
  //CATALOGOS//
  ca_estatus: any[] = [];
  ca_requestType: any[] = [];
  ca_duracion: any[] = [];
  caNumbers: any[] = [];
  Numbers: any[] = [];
  caNumbersMin: any[] = [];
  ca_transportType: any[] = [];
  ca_supplier: any[] = [];
  family: any[] = [];
  nacionality: any;
  ca_statustp: any[] = [];
  ca_document: any;
  payments: any[] = [];
  calculo: any = {};
  today: Date = new Date();
  //TABLE EXTENSION//
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //TABLE PAYMENTS//
  dataSourceP: any[] = [];
  displayedColumnsP: string[] = ['Payment Type', 'Assign To', 'Concept', 'Acciones'];
  //TABLE REQUEST PAYMENT//
  dataSourcePayment: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action']; showPanelSchooling: boolean = false;
  cr: string = "Reply";
  loader: LoaderComponent = new LoaderComponent();
  show: boolean = false;
  serviceScope = null;


  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  async ngOnInit() {
    //debugger;
    this.loader.showLoader();
    //console.log("DATA DE LA TABLA: ", this.data);
    this.location = this.data.data.location;
    this.country_text = this.data.data.country;
    this.user = JSON.parse(localStorage.getItem('userData'));
    for (let i = 1; i < 24; i++) {
      this.Numbers.push(i)
    }
    for (let i = 1; i < 24; i++) {
      this.caNumbers.push(i + ' hr')
    }
    for (let i = 1; i < 60; i++) {
      this.caNumbersMin.push(i + ' min');
    }
    this.get_catalogos();

  }

//////////////////////manage estatus 

disabled_by_permissions: boolean = false;
hide_by_permissions: boolean = false;
hide_complete: boolean = false;
show_completed: boolean = false;
show_progress: boolean = false;
wo_ : boolean = false;
sr_: boolean = false;

setup_permissions_settings(){
  //debugger;
  if (!this.data.data.numberWorkOrder){
     this.wo_ = this.data.workOrderId;
  }
  else{
    this.wo_ = this.data.data.numberWorkOrder
  }

  if(!this.data.data.number_server){
    this.sr_ = this.data.data.serviceNumber
  }
  else{
    this.sr_ = this.data.data.number_server
  }

  if(this.user.role.id == 3){
     this.disabled_by_permissions = true 
  }
  else{
    this.hide_by_permissions = true;
  }
  if(this.transportation.statusId != 39 && this.transportation.statusId != 2 ){ //active , in progress
    this.hide_complete= true;
  }
  else{
    if(this.transportation.statusId == 39){
      this.show_progress = true;
    }
    else{
      this.show_completed = true;
    }
  }
}

AddTransportService(){
  console.log(this.transportation);
  this.transportation.airportTransportPickup.push({
    "id": 0,
    "transportationId": 0,
    "tpAuthoDate": new Date,
    "tpAuthoAcceptanceDate": new Date,
    "tpAtatusId": 39,
    "tpTransportType": 0,
    "tpServiceDate": "",
    "tpTimeServicesHour": 0,
    "tpTimeServicesMinute": 0,
    "tpServiceCompletionDate": "",
    "tpProjectFee": "",
    "tpPickUpLocation": "",
    "tpDropOffLocation": "",
    "tpPet": false,
    "tpSupplierPartner": "",
    "tpDriverName": "",
    "tpDriverContact": "",
    "tpVehicle": "",
    "tpPlateNumber": "",
    "tpVehicleColor": ""
  });
}

change_button(){
  //debugger;
  if(this.show_completed){
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
        this.transportation.statusId = 37; //penidng to completion 
        this.save();
       }
     });
  }

  if(this.show_progress){
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
        this.transportation.statusId = 2; //penidng to completion 
        this.save();
       }
     });
  }
}

//////////////////////manage estatus

  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.transportation.workOrderServicesId}&client=${this.data.data.partnerId}`).subscribe(resp => {
      //debugger;
      if (resp.success) {
        //console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  public __serverPath__: string = this._services.url_images;
  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

  //**********************************************************************************//
  //CATALOGOS//
  ca_privacy = [];
  async get_catalogos() {
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=19").subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }));
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    this.ca_statustp = await this._services.getCatalogueFrom('GetCatStatusTransportPickup');
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.ca_document = data.result;
      }
    }))
    this.ca_duracion = await this._services.getCatalogueFrom('GetDuration');
    this.ca_transportType = await this._services.getCatalogueFrom('GetTransportType');
    this.ca_supplier = await this._services.getCatalogueFrom('GetSupplier');

    //this._services.service_general_get('RelocationServices/GetTransportationById?applicatId='+this.data.data.deliveredToId+'&service_order_id='+this.data.data.workOrderId+'&type_service='+this.data.data.home_host).subscribe((data => {
    this._services.service_general_get('RelocationServices/GetSingleAirportTransportationServicesById?service_id=' + this.data.data.service[0].id).subscribe(data => {
      debugger;
      if (data.success) {
        
        console.log("Transport", data.result);
        if (data.result.value.length > 0) {
          this.transportation = data.result.value[0];
          this.setup_permissions_settings();
          this.getServiceScope();
          this.get_text_status();
          for (let i = 0; i < this.transportation.airportTransportPickup.length; i++) {
            this.transportation.airportTransportPickup[i].family = [];
            if (this.transportation.airportTransportPickup[i]?.familyMemberTransportServices?.length > 0) {
              for (let j = 0; j < this.transportation.airportTransportPickup[i].familyMemberTransportServices.length; j++) {
                debugger;
                this.transportation.airportTransportPickup[i].family.push(this.transportation.airportTransportPickup[i].familyMemberTransportServices[j].familyMember);
              }
            }
          }
          console.log('DATA CONSULTA FINAL: ', this.transportation);
          this.dataSourceP = this.transportation.paymentAirportTransportationServices;
          this.get_payment();
          if (this.transportation.commentAirportTransportationServices.length == 0) {
            this.addReply();
          }

          this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(this.data.sr)).subscribe((data_ => {
            if (data_.success) {
              this.family = data_.result;
            }
          }))
          this.get_SupplierType();

          this.show = true;

        }
        else {
          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "An error has occurred",
              body: "The service is empty. contact support"
            },
            width: "350px"
          });
          this.dialogRef.close();
        }
        
      }
      this.loader.hideLoader();

    }, error => {
       console.error('[CP455] ServiceRecord/GetServices ==> ', error);
       this.loader.hideLoader();

       const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
         data: {
           header: "An error has occurred",
           body: "The service could not be oppened. contact support"
         },
         width: "350px"
       });
       this.dialogRef.close();
    });
  }


  //********************************************************************** ***********//
  //CONSULTA DEL SUPPLIER//
  get_SupplierType() {
    //debugger;
    this._services.service_general_get("SupplierPartnerProfile/GetServiceProviderByServiceId?workOrderService=" + this.transportation.workOrderServicesId).subscribe(r => {
      //this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=' + this.transportation.transportService[0].workOrderServicesId+'&supplierType='+10+'&serviceLine=2').subscribe(r => {
      if (r.success) {
        this.supplier_get = r.result.value;
        //console.log("Supplier de transportes ==============", this.supplier_get);
        this.getInfo();
      }
    })
  }

  _texto_status = "";

  get_text_status() {
    debugger;
    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.transportation.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  }

  change_status_detail(){
    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 19,
        type: "home_findig"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      //debugger;
      // //console.log(result);
      if (result.success) {
        this.transportation.statusId = result.id; //penidng to completion 
        this.get_text_status();
      }
      else {
        //nada 
      }
    });
  }
  //CONSULTA DE INFORMACION PARA MODAL//
  getInfo() {
    for (let i = 0; i < this.supplier_get.length; i++) {
      if (this.supplier_get[i].id == this.transportation.supplierPartner) {
        this.info = this.supplier_get[i];
        //console.log(this.info);
      }
    }
  }
  //**********************************************************************************//
  //ADD PAYMENT TYPE (TABLE)//
  addPaymentType() {
    const dialogRef = this._dialog.open(DialogAddpaymentComponent, {
      data: { id: 0 },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      result.transportationId = this.transportation.id;
      this.transportation.paymentAirportTransportationServices.push(result);
      //console.log("cierre del dialog addPaymentType: ", this.transportation.paymentTransportations);

    });
  }
  //EDIT PAYMENT//
  editPaymentType(data, pos) {
    const dialogRef = this._dialog.open(DialogAddpaymentComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.transportation.paymentAirportTransportationServices[pos] = result;
      //console.log("cierre del dialog EDIT PaymentType: ", this.transportation.paymentTransportations);
    });
  }
  //**********************************************************************************//
  //**METHODS ADD DOCUMENT**//
  addDocument() {
    this.data.typeDocument = 1;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result.success) {
        result.transportationId = this.transportation.id;
        this.temporalDocument.push(result);
      }
    });
  }
  //**********************************************************************************//
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
      //console.log(result);
      if (result) {
        this._services.service_general_delete("RelocationServices/DeleteDocumentATS?id=" + id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: 'Document deleted successul'
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }))
      }
    });
  }
  //**********************************************************************************//
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
      //console.log(result);
      if (result) {
        this.temporalDocument.splice(position, 1);
      }
    })
  }
  //**********************************************************************************//
  //**CONSULTA PAYMENT**//
  get_payment() {
    //console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.transportation.workOrderServicesId).subscribe((data => {
      if (data.success) {
        //console.log('datos de tabla request', data);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        // //console.log('datos de la tabla' + data.result.value.payments);
      }
      //console.log('2° datos de la tabla' + this.payments);
    }))
  }

  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(data) {
    //console.log('workOrderServicesId', this.transportation.transportService[0].workOrderServicesId);
    if (data == null) {
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.transportation.workOrderServicesId,
        workOrder: this.data.data.workOrderId,
        service: this.data.data.id_server,
        id: 0,
        type: 2,
        supplierType: 3
      }
    } else {
      data.type = 2;
      data.supplierType = 3;
      data.id = data.requestPaymentId;
      data.serviceRecord = this.data.data.serviceRecordId;
      data.sr = this.data.data.serviceRecordId;
      data.service = this.data.data.id_server;
    }
    //console.log("Data al abrir modal de payment concept: ", data);
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
      //console.log(result);

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
            this.get_payment();;
          }
        }))
      }
    })
  }


  //*********************************************************************************//
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    this.transportation.commentAirportTransportationServices.push({
      "id": 0,
      "transportationId": this.transportation.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })
    if (this.transportation.commentAirportTransportationServices.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }
  //***********************************************************************************//
  //**METHODS REMINDER (NEW)**//
  addReminder() {
    this.transportation.reminderAirportTransportationServices.push({
      "id": 0,
      "transportationId": this.transportation.id,
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
      //console.log(result);
      if (result) {
        if (id == 0) {
          this.transportation.reminderAirportTransportationServices.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteReminderATS?id=" + id).subscribe((data => {
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
  //***********************************************************************************//
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
  //**********************************************************************************//
  save() {
    this.loader.showLoader();
    this.transportation.documentAirportTransportationServices = this.temporalDocument;
    
    //console.log("SAVE INFORMATION: ", this.transportation);

    this.transportation.serviceCompletionDate = this.transportation.statusId == "4"
      ? this.transportation.serviceCompletionDate.length > 0 ? this.transportation.serviceCompletionDate : Date.now().toString()
      : "";

    this.loader.showLoader();
    debugger;
    this.transportation.statusId = 39;
    
    console.log(JSON.stringify(this.transportation));

     for (var i = 0; i < this.transportation.airportTransportPickup.length; i++) {
      this.transportation.airportTransportPickup[i].familyMemberTransportServices = [];
        let _family = this.transportation.airportTransportPickup[i]?.family.length == undefined ? 0 : this.transportation.airportTransportPickup[i].family.length; 
            for(var j = 0; j < _family; j++){
              
              this.transportation.airportTransportPickup[i].familyMemberTransportServices.push({
                "transportService": this.transportation.airportTransportPickup[i].id,
                "familyMember": this.transportation.airportTransportPickup[i].family[j]
              });
            }
      }
    debugger;
    this._services.service_general_put("RelocationServices/PutAirportTransportationServices", this.transportation).subscribe((data => {
      if (data.success) {
        //console.log(data);
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
      this.loader.hideLoader();
    }))
   // this.loader.hideLoader();
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

class ScopeDocuments {
  idCountry: number = 0;
  idService: number = 0;
  scopeDescription: string = '';
  documentcountries: any[];
}
class documentcountries {
  documentType: string = "";
  fileName: string = "";
  fileRequest: string = "";
  privacy: string = "";
  status: string = "";

}
