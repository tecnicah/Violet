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

@Component({
  selector: 'app-dialog-airport-transportation',
  templateUrl: './dialog-airport-transportation.component.html',
  styleUrls: ['./dialog-airport-transportation.component.scss']
})
export class DialogAirportTransportationComponent implements OnInit {
  //VARIABLES//
  info: any[] = [];
  supplier_get: any[] = [];
  toppings = new FormControl();
  temporalDocument: any[] = [];
  transportation: any;
  user: any;
  vista: boolean = false;
  payments: any[] = [];
  calculo: any = {};
  //CATALOGOS//
  ca_estatus: any[] = [];
  ca_requestType: any[] = [];
  ca_duracion: any[] = [];
  caNumbers: any[] = [];
  caNumbersMin: any[] = [];
  ca_transportType: any[] = [];
  ca_supplier: any[] = [];
  family: any[] = [];
  nacionality: any;
  ca_document: any;

  //TABLE EXTENSION//
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //TABLE PAYMENTS//
  dataSourceP: any[] = [];
  displayedColumnsP: string[] = ['Payment Type', 'Assign To', 'Concept', 'Acciones'];
  //TABLE REQUEST PAYMENT//
  dataSourcePayment: any[] = [];
  cr: string = "Reply";
  loader: LoaderComponent = new LoaderComponent();
  show: boolean = false;
  serviceScope : any[] = [];


  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  async ngOnInit() {
    this.loader.showLoader();
    console.log("DATA DE LA TABLA: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    for (let i = 1; i < 24; i++) {
      this.caNumbers.push(i + ' hr');
    }
    for (let i = 1; i < 60; i++) {
      this.caNumbersMin.push(i + ' min');
    }
    this.get_catalogos();

  }
  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.transportation.transportService[0].workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
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
  //**********************************************************************************//
  //CATALOGOS//
  ca_privacy = [];
  async get_catalogos() {
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=20").subscribe((data => {
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
    this.ca_duracion = await this._services.getCatalogueFrom('GetDuration');
    this.ca_transportType = await this._services.getCatalogueFrom('GetTransportType');
    this.ca_supplier = await this._services.getCatalogueFrom('GetSupplier');

    this._services.service_general_get('RelocationServices/GetAirportTransportationServicesById?applicatId=   ' + this.data.data.deliveredToId + '&service_order_id=' + this.data.data.workOrderId + '&type_service=' + this.data.data.home_host).subscribe((data => {
      if (data.success) {
        this.transportation = data.result.value[0];
        for (let i = 0; i < this.transportation.transportService.length; i++) {
          this.transportation.transportService[i].family = [];
          if (this.transportation.transportService[i].familyMemberTransportServices.length > 0) {
            for (let j = 0; j < this.transportation.transportService[i].familyMemberTransportServices.length; j++) {
              this.transportation.transportService[i].family.push(this.transportation.transportService[i].familyMemberTransportServices[j].familyMember)
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
        this.getServiceScope();
        this.show = true;
        this.loader.hideLoader();
      }
    }));
  }
  //**********************************************************************************//
  //CONSULTA DEL SUPPLIER//
  get_SupplierType() {
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=' + this.transportation.transportService[0].workOrderServicesId + '&supplierType=' + 10 + '&serviceLine=2').subscribe(r => {
      if (r.success) {
        this.supplier_get = r.result.value;
        console.log(this.supplier_get);
        this.getInfo();
      }
    })
  }

  //CONSULTA DE INFORMACION PARA MODAL//
  getInfo() {
    for (let i = 0; i < this.supplier_get.length; i++) {
      if (this.supplier_get[i].id == this.transportation.transportService[0].supplierPartner) {
        this.info = this.supplier_get[i];
        console.log(this.info);
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
      console.log(result);
      result.airportTransportationServicesId = this.transportation.transportService[0].id;
      this.transportation.paymentAirportTransportationServices.push(result);
      console.log("cierre del dialog addPaymentType: ", this.transportation.paymentAirportTransportationServices);
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
      console.log("cierre del dialog EDIT PaymentType: ", this.transportation.paymentAirportTransportationServices);
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
      console.log(result);
      if (result.success) {
        result.airportTransportationServicesId = this.transportation.transportService[0].id;
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
      console.log(result);
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
      console.log(result);
      if (result) {
        this.temporalDocument.splice(position, 1);
      }
    })
  }
  //**********************************************************************************//
  //**CONSULTA PAYMENT**//
  get_payment() {
    console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.transportation.transportService[0].workOrderServicesId).subscribe((data => {
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
    console.log('workOrderServicesId', this.transportation.transportService[0].workOrderServicesId);
    if (data == null) {
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.transportation.transportService[0].workOrderServicesId,
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
    console.log("Data al abrir modal de payment concept: ", data);
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_payment();;
    });
  }
  // edit payment
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
      "airportTransportationServicesId": this.transportation.transportService[0].id,
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
      "airportTransportationServicesId": this.transportation.transportService[0].id,
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
    this.transportation.documentAirportTransportationServices = this.temporalDocument;
    for (let i = 0; i < this.transportation.transportService.length; i++) {
      this.transportation.transportService[i].documentAirportTransportationServices = this.temporalDocument;
      this.transportation.transportService[i].reminderAirportTransportationServices = this.transportation.reminderAirportTransportationServices;

      this.transportation.transportService[i].updateBy = this.user.id;
      this.transportation.transportService[i].updatedDate = new Date();
      this.transportation.transportService[i].createdBy = this.user.id;
      this.transportation.transportService[i].createdDate = new Date();
      this.transportation.transportService[i].authoDateExtension = new Date();
      this.transportation.transportService[i].authoAcceptanceDateExtension = new Date();

      if (this.transportation.transportService[i].family != undefined && this.transportation.transportService[i].family.length > 0) {
        this.transportation.transportService[i].familyMemberTransportServices = [];
        for (let j = 0; j < this.transportation.transportService[i].family.length; j++) {
          this.transportation.transportService[i].familyMemberTransportServices.push({
            "transportService": this.transportation.transportService[i].id,
            "familyMember": this.transportation.transportService[i].family[j]
          })
        }
      }

      let data_comment_aux = this.transportation.commentAirportTransportationServices;
      this.transportation.transportService[i].commentAirportTransportationServices = [];

      for (let k = 0; k < data_comment_aux.length; k++) {
        if (data_comment_aux[k].reply != null && data_comment_aux[k].reply != undefined && data_comment_aux[k].reply.trim() != '') {
          this.transportation.transportService[i].commentAirportTransportationServices.push(data_comment_aux[k]);
        }
      }
    }
    console.log("SAVE INFORMATION: ", this.transportation);

    this.transportation.serviceCompletionDate = this.transportation.statusId == "4"
      ? this.transportation.serviceCompletionDate != null ? this.transportation.serviceCompletionDate : new Date() 
      : "" ;

    this.loader.showLoader();
    this._services.service_general_put("RelocationServices/PutAirportTransportationServices", this.transportation.transportService).subscribe((data => {
      if (data.success) {
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
        this.loader.hideLoader();
        this.ngOnInit();
      }
    }))

  }
  public showDocumentDialogDetails(document: any, service_line: number = undefined): void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        sl: 1,
        document: document,
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
