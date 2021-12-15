import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';


@Component({
  selector: 'legal-consultation-dialog',
  templateUrl: './legal-review-consultation.component.html',
  styleUrls: ['./legal-review-consultation.component.scss']
})
export class DialogLegalReviewConsultation implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogLegalReviewConsultation>,
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog
  ) {}

  loader:LoaderComponent = new LoaderComponent();
  show:boolean=false;
  cRequestType: any[] = [];
  cr: string = 'Reply';
  document: any[] = [];
  serviceScope : any[] = [];
  yesterday_today = new Date();



  ngOnInit() {
    this.loader.showLoader();
    this.initPageSettings() ;
    this._services.service_general_get("Catalogue/GetRequestType").subscribe(data => {
      if (data.success) {
        this.cRequestType = data.result;
      }
    })

  }
  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.legal_model.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
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


  public __loader__: LoaderComponent = new LoaderComponent();
  public today_date:Date = new Date();
  public image_path:string = this._services.url_images;
  public user_data:any = JSON.parse( localStorage.getItem('userData') );

  public legal_model:LegalReviewModelU = new LegalReviewModelU();
  public initPageSettings():void {

    this.getCatalogues();

    this._services.service_general_get(`ImmigrationServices/GetLegalReviewById?id=${ this.data.data.service[0].id }`)
        .subscribe( (response:any) => {
          console.log('Response ===> ', response);

          if( response.success ) {
            this.legal_model = response.result;
            this.loader.hideLoader();
            this.initDocumentsSettings();
            this.initMainModelSettings();
            this.requestPaymentsData();
            this.getServiceScope();


            console.log('this.legal_model ===> ', this.legal_model);
            if(this.legal_model.commentLegalReviews.length == 0){
              this.addReply();
            }

          }

        }, (error:any) => {

          console.error('Error (GetLegalReviewById) => ', error);

        });

  }

  public initMainModelSettings():void {

    const date_accep:string = this.legal_model.authoAcceptanceDate.split('-')[0];

    if( date_accep == '0001' ) this.legal_model.authoAcceptanceDate = '';

  }

  public initDocumentsSettings():void {

    this.legal_model.documentLegalReviews.forEach( (document:DocumentLegalReviews) => {

      document.local = false;

    });

  }

  public payments_table_data:any = undefined;
  public payments_table_fields:string[] = ['cam_0','cam_1','cam_2','cam_3','cam_4','cam_5','cam_6','cam_7'];
  public is_any_payment:boolean = false;
  public requestPaymentsData():void {

    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.legal_model.workOrderServicesId).subscribe((data => {
      if (data.success) {
        this.payments_table_data = data.result.value;
        console.log(data);
        this.show = true;
        if( this.payments_table_data.payments.length != 0 ) this.is_any_payment = true;

          console.log('Pays ==========> ', this.is_any_payment);


      }
    }))

  }

  public addNewReminder():void {

    const reminder_model:ReminderLegalReviews = new ReminderLegalReviews();

    reminder_model.createdBy = this.user_data.id;
    reminder_model.legalReviewId = this.legal_model.id;

    this.legal_model.reminderLegalReviews.push( reminder_model );

  }

  public updateLegalReview():void {

    this.__loader__.showLoader();

    this.filteringDocuments();

    let data_comment_aux = this.legal_model.commentLegalReviews;
    this.legal_model.commentLegalReviews = [];
    this.legal_model.documentLegalReviews = this.document;
    for(let i = 0; i < data_comment_aux.length; i++){
      if(data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != ''){
        data_comment_aux[i].user.profileUsers = [];
        this.legal_model.commentLegalReviews.push(data_comment_aux[i]);
      }
    }
    if (this.legal_model.statusId == '4' || this.legal_model.statusId == '5') {
      this.legal_model.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.legal_model.serviceCompletionDate = null;
    }

    console.log('Data sent ==> ', this.legal_model);

    this._services.service_general_put('ImmigrationServices/PutLegalReview', this.legal_model)
        .subscribe( (response:any) => {

          if( response.success ) {

            this.initPageSettings();

            const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: 'Success',
                body: 'Legal Review has been uploaded successfully.'
              },
              width: "350px"
            });
            this.dialogRef.close();
            this.document = [];
            this.ngOnInit();

          }

          this.__loader__.hideLoader();

        }, (error:any) => {

          console.error('Error (PutLegalReview) => ', error);

          this.__loader__.hideLoader();

        });

  }

  public filteringDocuments():void {

    this.legal_model.documentLegalReviews =
      this.legal_model.documentLegalReviews.filter( ( document_in:DocumentLegalReviews ) => {

        if( document_in.local ) {

          return document_in;

        }

      });

  }

  public deleteReminderSelected( reminder:ReminderLegalReviews, index_reminder:number ):void {

    if( reminder.id != 0 ) {

      this.__loader__.showLoader();

      this._services.service_general_delete_with_url(`ImmigrationServices/DeleteReminderLR?id=${ reminder.id }`)
          .subscribe( (response:any) => {

            if( response.success ) {

              this.__loader__.hideLoader();

              this.legal_model.reminderLegalReviews.splice( index_reminder, 1);

            }

          }, (error:any) => {

            console.error('Error (DeleteReminderN) => ', error);

            this.__loader__.hideLoader();

          });

    } else {

      this.legal_model.reminderLegalReviews.splice( index_reminder, 1);

    }

  }


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
  getDocumentTypeName(id) {
    for(let i = 0; i < this.caDocumentType.length; i++){
      if(this.caDocumentType[i].id == id){
         return this.caDocumentType[i].documentType;
      }
    }
  }
  getCountryOriginName(id){
    for(let i = 0; i < this.country_catalogue.length; i++){
      if(this.country_catalogue[i].id == id){
         return this.country_catalogue[i].name;
      }
    }
  }


  AddDocument(){
    this.data.sr = this.data.app_id;
    this.data.data.typeDocument = 2;
    this.data.data.sr = this.data.app_id;
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "95%",
      data: this.data.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        result.legalReviewId = this.legal_model.id;
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
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (id == 0) {
          this.document.splice(i, 1);
        } else {
          this._services.service_general_delete(`ImmigrationServices/DeleteDocumentLR?id=${id}`).subscribe((data => {
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


  public status_catalogue:any = [];
  public country_catalogue:any = [];
  public applicant_catalogue:any = [];
  public servicetype_catalogue:any = [];
  caDocumentType: any[] = [];
  public async getCatalogues(): Promise<void> {

    //this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=10").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.status_catalogue = data.result;
      }
    }))
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.servicetype_catalogue = await this._services.getCatalogueFrom('GetTypeService');
    //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get("Catalogue/GetDocumentType/2").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.caDocumentType = data.result;
      }
    }))
    this._services.service_general_get(`ServiceRecord/GetApplicant/${this.data.app_id}`)
      .subscribe((response: any) => {

        if (response.success) {

          this.applicant_catalogue = response.applicant.value;

        }

      }, (error: any) => {

        console.log('Error () => ', error);

      });

  }

  public requestPayment( data:any = null ):void {

    console.log(this.data.workOrderServicesId);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.legal_model.workOrderServicesId,
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
      this.requestPaymentsData();
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
              this.requestPaymentsData();
            }
          }))
      }
    })
  }

  public comment_string:SingleComment = new SingleComment();
  // public addNewComment():void {

  //   const new_comment:CommentLegalReviews = new CommentLegalReviews();

  //   new_comment.reply = this.comment_string.comment;
  //   new_comment.createdBy = this.user_data.id;
  //   new_comment.createdDate = this.today_date;
  //   new_comment.legalReviewId = this.legal_model.id;
  //   new_comment.userId = this.user_data.id;
  //   new_comment.user = this.user_data;

  //   this.legal_model.commentLegalReviews.push( new_comment );

  //   this.comment_string.comment = '';

  // }
  addReply() {
    console.log(this.user_data);
    this.legal_model.commentLegalReviews.push({
      "id": 0,
      "legalReviewId": this.data.id,
      "reply": '',
      "userId": this.user_data.id,
      "createdBy": this.user_data.id,
      "createdDate": new Date(),
      "updateBy": this.user_data.id,
      "updatedDate": new Date(),
      "user": this.user_data
    })

    if(this.legal_model.commentLegalReviews.length == 1){
      this.cr = "Comment";
    }else{
      this.cr = "Reply";
    }
  }

  /* Utilities */
  public getValueFromCatalogue( catalogue:[], id_to_find:any, get_field:string ):string {

    let result:string = '';

    catalogue.forEach( (item:any) => {

      if( item.id == id_to_find || item.dependentId == id_to_find ) {

        result = item[get_field];

      }

    });

    return result;

  }

  public getDocumentCountryOrigin( id_to_find:number ):string {

    return this.getValueFromCatalogue( this.country_catalogue , id_to_find, 'name' );

  }

  documentTypename(id){
    console.log(id, this.caDocumentType);
    for(let i = 0; i < this.caDocumentType.length; i++){
      if(this.caDocumentType[i].id == id){
         return this.caDocumentType[i].documentType;
      }
    }
   }

  public readDeliverTo( id_to_find:string ):string {

    return this.getValueFromCatalogue( this.applicant_catalogue , id_to_find, 'relationship' );

  }

  public hideModal(): void {

    this.dialogRef.close();

  }

}

class LegalReviewModelU {
  id: 0;
  authoDate:string = '';
  authoAcceptanceDate:string = '';
  applicantId:string = '';
  applicantName:string = '';
  statusId:string = '';
  name:string = '';
  workOrderServicesId:number = 0;
  serviceCompletionDate:string = '';
  hostCountryId:string = '';
  billiableHours:string = '';
  comment:string = '';
  createdBy:number = 0;
  createdDate:string = '';
  updatedBy:number = 0;
  updatedDate:string = '';
  commentLegalReviews:CommentLegalReviews[] = [];
  documentLegalReviews:DocumentLegalReviews[] = [];
  reminderLegalReviews:ReminderLegalReviews[] = [];
}

class CommentLegalReviews {
  id:number = 0;
  legalReviewId:number = 0;
  reply:string = '';
  userId:number = 0;
  createdBy:number = 0;
  createdDate:Date = undefined;
  updateBy:number = 0;
  updatedDate:Date = undefined;
  user:UserModel = new UserModel();
}

class UserModel {
  id:number = 0;
  email:string = '';
  name:string = '';
  lastName:string = '';
  motherLastName:string = '';
  mobilePhone:string = '';
  avatar:string = '';
  token:string = '';
  status:boolean = true;
  profileUsers = []
}

class DocumentLegalReviews {
  id:number = 0;
  legalReviewId:number = 0;
  fileName:string = '';
  fileRequest:string = '';
  fileExtension:string = '';
  createdDate:string = '';
  createdBy:number = 0;
  updatedDate:string = '';
  issueDate:string = '';
  expirationDate:string = '';
  issuingAuthority:string = '';
  countryOrigin:string = '';
  local:boolean = true;
  documentType: any;
}

class ReminderLegalReviews {
  id:number = 0;
  legalReviewId:number = 0;
  reminderDate:string = '';
  reminderComments:string = '';
  createdBy:number = 0;
  createdDate:Date = new Date();
}

class SingleComment {
  comment:string = '';
}
