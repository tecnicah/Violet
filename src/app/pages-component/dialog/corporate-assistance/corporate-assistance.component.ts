import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';


@Component({
  selector: 'corporate-assistance-dialog',
  templateUrl: './corporate-assistance.component.html',
  styleUrls: ['./corpotate-assistance.component.scss']
})
export class DialogCortporateAssistance implements OnInit {

  show:boolean = false;
  //displayedColumnsPayment: string[] = ['Invoice No.', 'Description', 'Invoice Date', 'Due Date', 'Amount', 'Status', 'action'];
  //displayedColumnsPayment: string[] = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date','Status', 'action'];
  displayedColumnsPayment: string[] = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date', 'Status', 'action'];
  //**********CATALOGOS********//
  ca_estatus = [];
  ca_country = [];
  ca_city = [];
  ca_type_service = [];
  ca_applicant = [];
  ca_type_services = [];
  ca_suplier: any;
  ca_document_type: any;
  ca_requestType:any;
  cr: string = 'Reply';
  //***************************//
  table_payments:any;
  document:any[] = [];
  data_general:any;
  user:any;
  name:any;
  deliverTo: any;
  serviceScope : any[] = [];
  yesterday_today = new Date();


  loader:LoaderComponent = new LoaderComponent();
  //
  constructor(public dialogRef: MatDialogRef<DialogCortporateAssistance>,public _services: ServiceGeneralService,public _routerParams: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any, public _dialog: MatDialog) { }

  async ngOnInit() {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    await this.get_catalogos();
    console.log("=====>", this.data)
    console.log('sr', this.data.app_id)
  }
  //***********************************************************************************************************************//
  //**OBTENEMOS INFORMACION DE LOS CATALOGOS**//this.data.app_id
  async get_catalogos() {
    await this._services.service_general_get("ImmigrationServices/GetCorporateAssistanceById?id="+this.data.sr_id).subscribe(async (data) => {
      //console.log(data);
      if (data.success) {
        this.data_general = data.result;
        this.get_City(this.data_general);
        this.get_payment();
        this.getServiceScope();
        console.log(this.data_general);
        if(this.data_general.commentCorporateAssistances.length == 0){
          this.addReply();
        }
      }

      await this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.app_id).subscribe((data => {
        //console.log(data);
        if (data.success) {
          this.ca_applicant = data.applicant.value;
        }
      }))

    })
    this.ca_requestType   = await this._services.getCatalogueFrom('GetRequestType');
    //this.ca_estatus = await this._services.getCatalogueFrom("GetStatus");
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=7").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.ca_country = await this._services.getCatalogueFrom("GetCountry");
    //this.ca_document_type = await this._services.getCatalogueFrom("GetDocumentType");

    this._services.service_general_get("Catalogue/GetDocumentType/2").subscribe((data => {
      console.log(data);
      if(data.success){
        this.ca_document_type = data.result;
      }
    }))

    this.ca_suplier = await this._services.getCatalogueFrom("GetSupplier");
    this.ca_type_services = await this._services.getCatalogueFrom("GetTypeService");
    this.loader.hideLoader();
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
   // get service scope
   getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.data_general.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
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

  //**CONSULTA PAYMENT**//
  get_payment() {
      this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.data_general.workOrderServicesId).subscribe((data => {
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
    console.log(this.data_general,this.data);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.data_general.workOrderServicesId,
        workOrder: this.data.data.workOrderId,
        service: this.data.data.id_server,
        id: 0,
        type: 1,
        supplierType: 3
      }
    }else{
      data.type = 1;
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
  //**EDIT PAYMENT**//
  editPayment(data){
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
    this.data_general.commentCorporateAssistances.push({
      "id": 0,
      "corporateAssistanceId": this.data.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if(this.data_general.commentCorporateAssistances.length == 1){
      this.cr = "Comment";
    }else{
      this.cr = "Reply";
    }
  }
  //***********************************************************************************************************************//
  //**METHODS REMINDER (NEW)**//
  addReminder(){
    this.data_general.remiderCorporateAssistances.push({
      "id": 0,
      "corporateAssistanceId": this.data_general.id,
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
          this.data_general.remiderCorporateAssistances.splice(i, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteReminderCA?id=" + id).subscribe((data => {
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
        sr_id: this.data.app_id,
        document: document,
        name_section: "only_one_service"
      }
    });

  }

  AddDocument(){
    this.data.sr = this.data.app_id;
    this.data.typeDocument = 2;
    console.log(this.data);
    debugger
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "95%",
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        result.corporateAssistanceId = this.data_general.id;
         this.document.push(result);
         console.log(this.document);
      }
    });
  }
  //**DELETE DOCUMENT**//
  removeDocument(i, id) {
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
          this.document.splice(i, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteDocumentCA?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "information deleted"
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
  save_data(){
    console.log("Informacion a guardar:  ",this.data_general);
    this.data_general.updateBy = this.user.id;
    this.data_general.documentCorporateAssistances = this.document;
    this.data_general.updateDate = new Date();

    let data_comment_aux = this.data_general.commentCorporateAssistances;
    this.data_general.commentCorporateAssistances = [];
    for(let i = 0; i < data_comment_aux.length; i++){
      if(data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != ''){
        this.data_general.commentCorporateAssistances.push(data_comment_aux[i]);
      }
    }

    if(this.data_general.statusId == 4 || this.data_general.statusId == 5){
      this.data_general.serviceCompletionDate = new Date().toISOString();
    }

    this._services.service_general_put("ImmigrationServices/PutCorporateAssistance", this.data_general).subscribe((data => {
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        this.dialogRef.close();
        this.document = [];
        this.ngOnInit();
      }
    }))
  }
  //***********************************************************************************************************************//
  //GET DOCUMENT TYPE NAME//
  getDocumentTypeName(id) {
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
