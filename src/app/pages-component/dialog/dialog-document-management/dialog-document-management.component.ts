import { Component, OnInit, Inject} from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';

@Component({
  selector: 'app-dialog-document-management',
  templateUrl: './dialog-document-management.component.html',
  styleUrls: ['./dialog-document-management.component.css']
})
export class DialogDocumentManagementComponent implements OnInit {

  payments: any[] = [];
  show:boolean = false;
  calculo : any = {};
  public __loader__: LoaderComponent = new LoaderComponent();
  //**************CATALOGOS****************//
  ca_estatus: any;
  ca_country: any;
  ca_city: any;
  ca_payment: any;
  ca_applicant: any;
  ca_suplier: any;
  ca_document_type: any;
  ca_requestType:any;
  table_payments: any;
  information_Document_Management: any;
  cr: string = 'Reply';
  //****************************************//
  DocumentType: any;
  DocumentData: any;
  document: any[] = [];
  comment_DM: any[] = [];
  reminder_DM: any[] = [];
  id_reminder: any;
  data_card_id:any = []
  deliverTo:any;
  name:any;
  workOrderServicesId:any;
  displayedColumns: string[] =  ['Payment','Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence','action'];
  //displayedColumns: string[] = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date','Status', 'action'];


  user: any;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("este es el data =====>", this.data);
    this.getcatalogos();
  }
  //***********************************************************************************************************************//
  //**OBTENEMOS INFORMACION DE LOS CATALOGOS**//
  async getcatalogos() {
    await this._services.service_general_get("ImmigrationServices/GetDocumentManagementById?id=" + this.data.id_server).subscribe(async (data_) => {
      console.log("GET PRINCIPAL: ", data_);
      if (data_.success) {
        this.DocumentData = data_.result;
        this.get_City(this.DocumentData);
        this.get_supplierPartner();
        this.show = true;
        this.__loader__.hideLoader();
        await this._services.service_general_get("ImmigrationServices/GetLocalOrDocumentation?applicantId=" + this.data.deliveredToId + '&category=' + this.data.categoryId + '&service_order_id=' + Number(this.data.workOrderId) + '&type_service=' + Number(this.data.home_host)).subscribe((data => {
          if (data.success) {
            console.log(data);
            this.information_Document_Management = data.result.value.standalone;
            if(this.information_Document_Management.length == 0){
              this.information_Document_Management = data.result.value.bundle ;
            }
            this.comment_DM = this.information_Document_Management[0].commentDocumentManagements;
            this.reminder_DM = this.information_Document_Management[0].reminderDocumentManagements;
            this.id_reminder = this.information_Document_Management[0].documentManagement[0].id;
            this.deliverTo = this.information_Document_Management[0].documentManagement[0].relationship;
            this.name = this.information_Document_Management[0].documentManagement[0].applicantName;
            this.workOrderServicesId = this.information_Document_Management[0].documentManagement[0].workOrderServicesId;
            this.DocumentData.reminderDocumentManagements = this.reminder_DM;
            for (let i = 0; i < this.information_Document_Management.length; i++) {
              let information_card = this.information_Document_Management[i].documentManagement;
              console.log("INFORMATION CARD: ", information_card);
              for (let j = 0; j < information_card.length; j++) {
                this.data_card_id.push(this.information_Document_Management[i].documentManagement[j].id);
              }
            }
            if (this.DocumentData.commentDocumentManagements.length == 0 && this.comment_DM.length == 0) {
              this.addReply();
            }
          }

          this.get_payment();

          this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((data => {
            console.log(data);
            if (data.success) {
              this.ca_applicant = data.applicant.value;
              console.log(this.ca_applicant);
            }
          }))


        }));
      }
    })

    this.ca_requestType   = await this._services.getCatalogueFrom('GetRequestType');
    //this.ca_estatus = await this._services.getCatalogueFrom("GetStatus");
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=5").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this._services.service_general_get("Catalogue/GetDocumentType/2").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_document_type = data.result;
      }
    }))
    this.ca_country = await this._services.getCatalogueFrom("GetCountry");
    //this.ca_document_type = await this._services.getCatalogueFrom("GetDocumentType");
    //his.ca_suplier = await this._services.getCatalogueFrom("GetSupplier");
  }
  //***********************************************************************************************************************//
  //**CONSULTA SUPPLIER PARTNER**//
  get_supplierPartner(){
    this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=3").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_suplier = data.result.value;
      }
    }))
  }
  //***********************************************************************************************************************//
  //**CONSULTA CITY**//
  get_City(data) {
    this._services.service_general_get("Catalogue/GetState?country=" + data.hostCountryId).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    }))
  }
  //**CONSULTA PAYMENT**//
  get_payment(){
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.DocumentData.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        console.log(this.payments);
      }
      console.log(this.payments);
    }))
  }
  //***********************************************************************************************************************//
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  requestPayment(data) {
    if(data == null){
      data = {
        serviceRecord: this.data.serviceRecordId,
        sr: this.data.serviceRecordId,
        workOrderServices: this.DocumentData.workOrderServicesId,
        workOrder: this.data.workOrderId,
        service: this.data.id_server,
        id: 0,
        type: 1,
        supplierType: 3
      }
    }else{
      data.type = 1;
      data.supplierType = 3;
      data.id = data.requestPaymentId;
      data.serviceRecord = this.data.serviceRecordId;
      data.sr = this.data.serviceRecordId;
      data.service = this.data.id_server;
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
  //DELETE REQUEST PAYMENT//
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
  //***********************************************************************************************************************//
  //**EDIT PAYMENT**//
  editPayment(data) {
    const dialogRef = this._dialog.open(DialogRequestPaymentComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_payment();
    });
  }
  //***********************************************************************************************************************//
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    console.log(this.user);
    this.DocumentData.commentDocumentManagements.push({
        "id": 0,
        "documentManagementId": this.DocumentData.id,
        "reply": null,
        "userId": this.user.id,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updateBy": this.user.id,
        "updatedDate": new Date(),
        "user": this.user
      })

      if(this.DocumentData.commentDocumentManagements.length == 1){
        this.cr = "Comment";
      }else{
        this.cr = "Reply";
      }

  }
  //***********************************************************************************************************************//
  //**METHODS REMINDER (NEW)**//
  addReminder() {
    this.DocumentData.reminderDocumentManagements.push({
      "id": 0,
      "documentManagementId": 0,
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
          this.DocumentData.reminderDocumentManagements.splice(i, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteReminderDM?id=" + id).subscribe((data => {
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
  //**END METHODS REMINDER**//
  //***********************************************************************************************************************//
  //**METHODS DOCUMENT (NEW)**//
  public showDocumentDialogDetails( document:any, service_line:number = undefined ):void {



    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        name_section: "only_one_service"
      }
    });

  }
  AddDocument(k, i) {
    this.data.typeDocument = 2;
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "95%",
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.documentManagementId = this.information_Document_Management[k].documentManagement[i].id;
        console.log("result: ", result);
        this.information_Document_Management[k].documentManagement[i].documentDocumentManagements.push(result);
        console.log("Documentos: ", this.information_Document_Management);
      }
    });
  }
  //**DELETE DOCUMENT**//
  removeDocument(i, k, j, id) {
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
          console.log(this.information_Document_Management[i].documentManagement[k].documentDocumentManagements);
          this.information_Document_Management[i].documentManagement[k].documentDocumentManagements.splice(j, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteDocumentDM?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Document deleted"
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
  //**END METHODS DOCUMENTS**//
  //***********************************************************************************************************************//
  //**SAVE DATA**//
  save_data() {
    this.__loader__.showLoader();
    let data_to_send = [];
    let aux_reminder = [];
    console.log("INFO GENERAL: ", this.DocumentData)

    //console.log("GUARDAR: ", this.information_Document_Management);
    ///this.DocumentData.forEach(E => {
    let aux_data = this.DocumentData;
    console.log(this.data_card_id);
    var a = [];
    for(let i = 0; i < this.data_card_id.length; i++){
      for (let j = 0; j <  aux_data.reminderDocumentManagements.length; j++) {
        aux_data.reminderDocumentManagements[j].documentManagementId = this.data_card_id[i];
        if( aux_data.reminderDocumentManagements[j].id === 0){
          a.push({
            "id":  0,
            "documentManagementId": this.data_card_id[i],
            "reminderDate":  aux_data.reminderDocumentManagements[j].reminderDate,
            "reminderComments": aux_data.reminderDocumentManagements[j].reminderComments,
            "createdBy": this.user.id,
            "createdDate": new Date()
          })
        }else{
          a.push({
            "id":  aux_data.reminderDocumentManagements[j].id,
            "documentManagementId": this.data_card_id[0],
            "reminderDate":  aux_data.reminderDocumentManagements[j].reminderDate,
            "reminderComments": aux_data.reminderDocumentManagements[j].reminderComments,
            "createdBy": this.user.id,
            "createdDate": new Date()
          })
       }
      }
      aux_reminder.push(a);
      a = [];
    }

    console.log(aux_reminder);
    for (let i = 0; i < this.information_Document_Management.length; i++) {
      let information_card = this.information_Document_Management[i].documentManagement;
      console.log("INFORMATION CARD: ", information_card);
      for (let j = 0; j < information_card.length; j++) {
        this.information_Document_Management[i].documentManagement[j].commentDocumentManagements = this.DocumentData.commentDocumentManagements;
        this.information_Document_Management[i].documentManagement[j].reminderDocumentManagements = aux_reminder[i];
        this.information_Document_Management[i].documentManagement[j].authoDate = this.DocumentData.authoDate;
        this.information_Document_Management[i].documentManagement[j].authoAcceptanceDate = this.DocumentData.authoAcceptanceDate;
        //this.information_Document_Management[i].documentManagement[j].applicantId = this.DocumentData.applicantId;
        this.information_Document_Management[i].documentManagement[j].name = this.name;
        this.information_Document_Management[i].documentManagement[j].hostCountryId = this.DocumentData.hostCountryId;
        this.information_Document_Management[i].documentManagement[j].hostCityId = this.DocumentData.hostCityId;
        this.information_Document_Management[i].documentManagement[j].updateBy = this.user.id;
        this.information_Document_Management[i].documentManagement[j].createdBy = this.user.id;
        this.information_Document_Management[i].documentManagement[j].createdDate = this.DocumentData.createdDate;
        this.information_Document_Management[i].documentManagement[j].updatedDate = new Date();
        this.information_Document_Management[i].documentManagement[j].city = this.information_Document_Management[i].documentManagement[j].hostCityId;
        this.information_Document_Management[i].documentManagement[j].country = this.information_Document_Management[i].documentManagement[j].hostCountryId;
        this.information_Document_Management[i].documentManagement[j].comment = "";
        data_to_send.push(this.information_Document_Management[i].documentManagement[j]);
      }
    }

    for (let i = 0; i < data_to_send.length; i++) {
      let doc = data_to_send[i].documentDocumentManagements;
      for (let j = 0; j < doc.length; j++) {
        if (doc[j].id != 0) {
          data_to_send[i].documentDocumentManagements.splice(j, 1);
        }
      }
    }

    for (let i = 0; i < data_to_send.length; i++) {
      let comment = data_to_send[i].commentDocumentManagements;
      data_to_send[i].commentDocumentManagements = [];
      for (let j = 0; j < comment.length; j++) {
        if(comment[j].reply != null && comment[j].reply != undefined && comment[j].reply.trim() != ''){
          comment[j].user.profileUsers = [];
          data_to_send[i].commentDocumentManagements.push(comment[j]);
        }
      }
    }

    console.log(data_to_send);
    console.log(JSON.stringify(data_to_send));


    this._services.service_general_put("ImmigrationServices/PutDocumentManagement", data_to_send).subscribe((data => {
      console.log("guardar db: ", data);
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        this.__loader__.hideLoader();
        this.ngOnInit();
      }
    }),(err)=>{
      console.log("Error al guardar data: ", err);
      this.__loader__.hideLoader();
    })

  }
  //***********************************************************************************************************************//
  //GET DOCUMENT TYPE NAME//
  getDocumentTypeName(id){
    for(let i = 0; i < this.ca_document_type.length; i++){
      if(this.ca_document_type[i].id == id){
         return this.ca_document_type[i].documentType;
      }
    }
   }
  //***********************************************************************************************************************//
  //GET COUNTRY ORIGIN NAME//
   getCountryOriginName(id){
     for(let i = 0; i < this.ca_country.length; i++){
       if(this.ca_country[i].id == id){
          return this.ca_country[i].name;
       }
     }
   }
  //***********************************************************************************************************************//
}
