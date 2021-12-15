import { Component, OnInit, Inject} from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';

@Component({
  selector: 'app-dialog-local-documentation',
  templateUrl: './dialog-local-documentation.component.html',
  styleUrls: ['./dialog-local-documentation.component.css']
})
export class DialogLocalDocumentationComponent implements OnInit {


  
  show : boolean = false;
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
  workOrderServicesId:any;
  deliverTo:any;
  name:any;
  DocumentType: any;
  DocumentData: any;
  document: any[] = [];
  comment_DM: any[] = [];
  reminder_DM: any[] = [];
  id_reminder: any;
  data_card_id:any = []
  displayedColumnsPayment: string[] = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date', 'Status', 'action'];
  //displayedColumns: string[] = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date','Status', 'action'];


  user: any;

  constructor( public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("este es el data =====>", this.data);

    this.getcatalogos();
  }
  //***********************************************************************************************************************//
  //**OBTENEMOS INFORMACION DE LOS CATALOGOS**//
  async getcatalogos() {
    this.__loader__.showLoader();
    await this._services.service_general_get("ImmigrationServices/GetLocalDocumentationById?id=" + this.data.id_server/*service[0].id*/).subscribe(async (data_) => {
      console.log("GET PRINCIPAL: ", data_);
      if (data_.success) {
        this.DocumentData = data_.result;
        this.get_City(this.DocumentData);
        this.get_supplierPartner();
        await this._services.service_general_get("ImmigrationServices/GetLocalOrDocumentation?applicantId=" + this.data.deliveredToId + '&category=' + this.data.categoryId + '&service_order_id=' + Number(this.data.workOrderId) + '&type_service=' + Number(this.data.home_host)).subscribe((data => {
        //await this._services.service_general_get("ImmigrationServices/GetLocalOrDocumentation?applicantId=" + 183 + '&category=' + 5 + '&service_order_id=' + 258 + '&type_service=' + 1).subscribe((data => {
          if (data.success) {
            console.log(data);
            this.information_Document_Management = data.result.value.standalone;
            if(this.information_Document_Management.length == 0){
              this.information_Document_Management = data.result.value.bundle ;
            }
            this.comment_DM = this.information_Document_Management[0].commentLocalDocumentations;
            this.reminder_DM = this.information_Document_Management[0].reminderLocalDocumentations;
            this.id_reminder = this.information_Document_Management[0].localDocumentation[0].id;
            this.deliverTo = this.information_Document_Management[0].localDocumentation[0].relationship;
            this.workOrderServicesId = this.information_Document_Management[0].localDocumentation[0].workOrderServicesId;
            this.name = this.information_Document_Management[0].localDocumentation[0].applicantName;
            this.DocumentData.reminderLocalDocumentations = this.reminder_DM;
            for (let i = 0; i < this.information_Document_Management.length; i++) {
              let information_card = this.information_Document_Management[i].localDocumentation;
              console.log("INFORMATION CARD: ", information_card);
              for (let j = 0; j < information_card.length; j++) {
                this.data_card_id.push(this.information_Document_Management[i].localDocumentation[j].id);
              }
            }
            if (this.DocumentData.commentLocalDocumentations.length == 0 && this.comment_DM.length == 0) {
              this.addReply();
            }
            this.__loader__.hideLoader();
          }

          this.get_payment();

          this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((data => {
            console.log(data);
            if (data.success) {
              this.ca_applicant = data.applicant.value;
              console.log(this.ca_applicant);
            }
          }));

        }));
      }
    })

    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=6").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))

    this.ca_requestType   = await this._services.getCatalogueFrom('GetRequestType');
    //this.ca_estatus = await this._services.getCatalogueFrom("GetStatus");
    this.ca_country = await this._services.getCatalogueFrom("GetCountry");
    //this.ca_document_type = await this._services.getCatalogueFrom("GetDocumentType");
    this._services.service_general_get("Catalogue/GetDocumentType/2").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_document_type = data.result;
      }
    }))
    //this.ca_suplier = await this._services.getCatalogueFrom("GetSupplier");
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
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.workOrderServicesId).subscribe((data => {
      if (data.success) {
        this.table_payments = data.result.value;
        console.log(data);
        this.show = true;
      }
    }))
  }
  //***********************************************************************************************************************//
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(data) {
    console.log(this.data.workOrderServicesId);
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
      this.get_payment();
    });
  }


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
  //***********************************************************************************************************************//  
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    console.log(this.user);
    this.DocumentData.commentLocalDocumentations.push({
        "id": 0,
        "localDocumentationId": this.DocumentData.id,
        "reply": null,
        "userId": this.user.id,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updateBy": this.user.id,
        "updatedDate": new Date(),
        "user": this.user
      })

      if(this.DocumentData.commentLocalDocumentations.length == 1){
        this.cr = "Comment";
      }else{
        this.cr = "Reply";
      }
  }
  //***********************************************************************************************************************//  
  //**METHODS REMINDER (NEW)**//
  addReminder() {
    this.DocumentData.reminderLocalDocumentations.push({
      "id": 0,
      "localDocumentationId": 0,
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
          this.DocumentData.reminderLocalDocumentations.splice(i, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteReminderLD?id=" + id).subscribe((data => {
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
        result.localDocumentationId = this.information_Document_Management[k].localDocumentation[i].id;
        console.log("result: ", result);
        this.information_Document_Management[k].localDocumentation[i].documentLocalDocumentations.push(result);
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
          console.log(this.information_Document_Management[i].localDocumentation[k].documentLocalDocumentations);
          this.information_Document_Management[i].localDocumentation[k].documentLocalDocumentations.splice(j, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteDocumentLD?id=" + id).subscribe((data => {
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
    let data_to_send = [];
    let aux_reminder = [];
    console.log("INFO GENERAL: ", this.DocumentData)
    //console.log("GUARDAR: ", this.information_Document_Management);
    ///this.DocumentData.forEach(E => {
    let aux_data = this.DocumentData;
    console.log(this.data_card_id);
    var a = [];
    for(let i = 0; i < this.data_card_id.length; i++){
      for (let j = 0; j <  aux_data.reminderLocalDocumentations.length; j++) {
        aux_data.reminderLocalDocumentations[j].localDocumentationId = this.data_card_id[i];
        if( aux_data.reminderLocalDocumentations[j].id === 0){
          a.push({
            "id":  0,
            "localDocumentationId": this.data_card_id[i],
            "reminderDate":  aux_data.reminderLocalDocumentations[j].reminderDate,
            "reminderComments": aux_data.reminderLocalDocumentations[j].reminderComments,
            "createdBy": this.user.id,
            "createdDate": new Date()
          })
        }else{
          a.push({
            "id":  aux_data.reminderLocalDocumentations[j].id,
            "localDocumentationId": this.data_card_id[0],
            "reminderDate":  aux_data.reminderLocalDocumentations[j].reminderDate,
            "reminderComments": aux_data.reminderLocalDocumentations[j].reminderComments,
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
      let information_card = this.information_Document_Management[i].localDocumentation;
      console.log("INFORMATION CARD: ", information_card);
      for (let j = 0; j < information_card.length; j++) {
        this.information_Document_Management[i].localDocumentation[j].commentLocalDocumentations = this.DocumentData.commentLocalDocumentations;
        this.information_Document_Management[i].localDocumentation[j].reminderLocalDocumentations = aux_reminder[i];
        this.information_Document_Management[i].localDocumentation[j].authoDate = this.DocumentData.authoDate;
        this.information_Document_Management[i].localDocumentation[j].authoAcceptanceDate = this.DocumentData.authoAcceptanceDate;
        //this.information_Document_Management[i].localDocumentation[j].applicantId = this.DocumentData.applicantId;
        this.information_Document_Management[i].localDocumentation[j].name = this.name;
        this.information_Document_Management[i].localDocumentation[j].hostCountryId = this.data.country_city.city_id;
        this.information_Document_Management[i].localDocumentation[j].hostCityId = this.data.country_city.country_id;
        this.information_Document_Management[i].localDocumentation[j].updateBy = this.user.id;
        this.information_Document_Management[i].localDocumentation[j].createdBy = this.user.id;
        this.information_Document_Management[i].localDocumentation[j].createdDate = this.DocumentData.createdDate;
        this.information_Document_Management[i].localDocumentation[j].updatedDate = new Date();
        this.information_Document_Management[i].localDocumentation[j].city = this.information_Document_Management[i].localDocumentation[j].hostCityId;
        this.information_Document_Management[i].localDocumentation[j].country = this.information_Document_Management[i].localDocumentation[j].hostCountryId;
        this.information_Document_Management[i].localDocumentation[j].comment = "";
        data_to_send.push(this.information_Document_Management[i].localDocumentation[j]);
      }
    }

    for (let i = 0; i < data_to_send.length; i++) {
      let doc = data_to_send[i].documentLocalDocumentations;
      for (let j = 0; j < doc.length; j++) {
        if (doc[j].id != 0) {
          data_to_send[i].documentLocalDocumentations.splice(j, 1);
        }
      }
    }

    for (let i = 0; i < data_to_send.length; i++) {
      let comment = data_to_send[i].commentLocalDocumentations;
      data_to_send[i].commentLocalDocumentations = [];
      for (let j = 0; j < comment.length; j++) {
        if(comment[j].reply != null && comment[j].reply != undefined && comment[j].reply.trim() != ''){
          comment[j].user.profileUsers = [];
          data_to_send[i].commentLocalDocumentations.push(comment[j]);
        }
      }
    }

    console.log(data_to_send);


    this._services.service_general_put("ImmigrationServices/PutLocalDocumentation", data_to_send).subscribe((data => {
      console.log("guardar db: ", data);
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        this.dialogRef.close();
        this.ngOnInit();
      }
    }))
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
}
