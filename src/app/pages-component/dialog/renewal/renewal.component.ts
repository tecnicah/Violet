import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';


@Component({
  selector: 'renewal-dialog',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.scss']
})
export class DialogRenewal implements OnInit {
  cr: string = 'Reply';

  constructor(
    public dialogRef: MatDialogRef<DialogRenewal>,
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog
  ) { }

  yesterday_today = new Date();
  show: boolean = false;
  temporalDocument: any[] = [];
  caDocumentType: any[] = [];
  caCountry: any[] = [];
  cRequestType: any[] = [];
  serviceScope = [];



  ngOnInit() {
    console.log("data modal renewal: ", this.data);
    this.__loader__.showLoader();
    this.initPageSettings()
    this._services.service_general_get("Catalogue/GetRequestType").subscribe(data => {
      if (data.success) {
        this.cRequestType = data.result;
      }
    })
  }
   // get service scope
   getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.renewal_model.workOrderServicesId}&client=${this.data.partnerId }`).subscribe(resp => {
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
  public today_date: Date = new Date();
  public image_path: string = this._services.url_images;
  public user_data: any = JSON.parse(localStorage.getItem('userData'));

  public renewal_model: RenewalModel = new RenewalModel();
  public initPageSettings(): void {

    this.getCatalogues();

    console.log('Modelo =========> ', this.renewal_model);

    this._services.service_general_get(`ImmigrationServices/GetRenewalById?id=${this.data.sr_id}`)
      .subscribe((response: any) => {

        console.log('Response ===> ', response);

        if (response.success) {

          this.renewal_model = response.result;
          this.__loader__.hideLoader();
          this.initDocumentsSettings();
          this.initMainModelSettings();
          this.requestPaymentsData();
          this.getServiceScope();
          console.log('this.legal_model ===> ', this.renewal_model);
          if (this.renewal_model.commentRenewals.length == 0) {
            this.addReply();
          }

        }

      }, (error: any) => {

        console.error('Error (GetLegalReviewById) => ', error);

      });

  }

  public initMainModelSettings(): void {

    const date_accep: string = this.renewal_model.authoAcceptanceDate.split('-')[0];

    if (date_accep == '0001') this.renewal_model.authoAcceptanceDate = '';

  }

  public payments_table_data: any = undefined;
  public payments_table_fields: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
  public is_any_payment: boolean = false;
  public requestPaymentsData(): void {

    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.renewal_model.workOrderServicesId).subscribe((data => {
      if (data.success) {
        this.payments_table_data = data.result.value;
        console.log(data);
        this.show = true;
        if (this.payments_table_data.payments.length != 0) this.is_any_payment = true;

        console.log('Pays ==========> ', this.is_any_payment);


      }
    }))

  }

  public requestPayment(data: any = null): void {

    console.log(this.data.workOrderServicesId);
    if (data == null) {
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.renewal_model.workOrderServicesId,
        workOrder: this.data.data.workOrderId,
        service: this.data.data.id_server,
        id: 0,
        type: 1,
        supplierType: 3
      }
    } else {
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
        this._services.service_general_delete("RequestPayment/DeletePaymentConcept/" + data.id + "/" + result.type).subscribe((data => {
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

  public comment_string: SingleComment = new SingleComment();
  //   public addNewComment():void {

  //       const new_comment:CommentRenewalsModel = new CommentRenewalsModel();

  //       new_comment.reply = this.comment_string.comment;
  //       new_comment.createdBy = this.user_data.id;
  //       new_comment.createdDate = this.today_date;
  //       new_comment.renewalId = this.renewal_model.id;
  //       new_comment.userId = this.user_data.id;
  //       new_comment.user = this.user_data;

  //       this.renewal_model.commentRenewals.push( new_comment );

  //       this.comment_string.comment = '';

  // }
  addReply() {
    console.log(this.user_data);
    this.renewal_model.commentRenewals.push({
      "id": 0,
      "renewalId": this.renewal_model.id,
      "reply": this.comment_string.comment,
      "userId": this.user_data.id,
      "createdBy": this.user_data.id,
      "createdDate": new Date(),
      "updateBy": this.user_data.id,
      "updatedDate": new Date(),
      "user": this.user_data
    })

    if (this.renewal_model.commentRenewals.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }



  public addNewDocument(): void {
    this.renewal_model.typeDocument = 2;
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "95%",
      data: this.renewal_model
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      const document_data: DocumentRenewalsModel = new DocumentRenewalsModel();

      document_data.id = result.id;
      document_data.fileName = result.fileName;
      document_data.fileExtension = result.fileExtension;
      document_data.fileRequest = result.fileRequest;
      document_data.createdBy = result.createdBy;
      document_data.renewalId = this.renewal_model.id;
      document_data.updatedDate = result.updatedDate;
      document_data.issueDate = result.issueDate;
      document_data.expirationDate = result.expirationDate;
      document_data.issuingAuthority = result.issuingAuthority;
      document_data.countryOrigin = result.countryOrigin;
      document_data.local = true;

      this.renewal_model.documentRenewals.push(document_data);

    });

  }

  public initDocumentsSettings(): void {

    this.renewal_model.documentRenewals.forEach((document: DocumentRenewalsModel) => {

      document.local = false;

    });

  }

  public addNewReminder(): void {

    const reminder_model: ReminderRenewalsModel = new ReminderRenewalsModel();

    reminder_model.createdBy = this.user_data.id;
    reminder_model.renewalId = this.renewal_model.id;

    this.renewal_model.reminderRenewals.push(reminder_model);

  }

  public deleteReminderSelected(reminder: ReminderRenewalsModel, index_reminder: number): void {

    if (reminder.id != 0) {

      this.__loader__.showLoader();

      this._services.service_general_delete_with_url(`ImmigrationServices/DeleteReminderR?id=${reminder.id}`)
        .subscribe((response: any) => {

          if (response.success) {

            this.__loader__.hideLoader();

            this.renewal_model.reminderRenewals.splice(index_reminder, 1);

          }

        }, (error: any) => {

          console.error('Error (DeleteReminderN) => ', error);

          this.__loader__.hideLoader();

        });

    } else {

      this.renewal_model.reminderRenewals.splice(index_reminder, 1);

    }

  }

  public showDocumentDialogDetails(document: any, service_line: number = undefined): void {



    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        name_section: "only_one_service"
      }
    });

  }

  public deleteDocumentSelected(document_in: DocumentRenewalsModel): void {

    this.__loader__.showLoader();

    this._services.service_general_delete(`ImmigrationServices/DeleteDocumentR?id=${document_in.id}`)
      .subscribe((response: any) => {

        if (response.success) {

          this.initPageSettings();

        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error (DeleteDocumentLR) => ', error);

        this.__loader__.hideLoader();

      });

  }

  ///Documents catalogos

  documentType(id) {
    for (let i = 0; i < this.caDocumentType.length; i++) {
      if (this.caDocumentType[i].id == id) {
        return this.caDocumentType[i].documentType;
      }
    }
  }

  countryOrigin(id) {
    for (let i = 0; i < this.caCountry.length; i++) {
      if (this.caCountry[i].id == id) {
        return this.caCountry[i].name;
      }
    }
  }

  DeleteOnline(id) {

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
        this._services.service_general_delete("ImmigrationServices/DeleteDocumentR?id=" + id).subscribe((data => {
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

  addDocument() {
    this.data.data.typeDocument = 2;
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "95%",
      data: this.data.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.renewalId = this.renewal_model.id;
        this.temporalDocument.push(result);
      }
    });
  }

  DeleteOnlineof(i) {
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
        this.temporalDocument.splice(i, 1);
      }
    })
  }

  public updateRenwal(): void {

    this.__loader__.showLoader();

    this.renewal_model.documentRenewals = this.temporalDocument;
    if(this.renewal_model.statusId == 4 || this.renewal_model.statusId == 5){
      this.renewal_model.serviceCompletionDate = new Date().toISOString();
    }

    let data_comment_aux = this.renewal_model.commentRenewals;
    this.renewal_model.commentRenewals = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        data_comment_aux[i].user.profileUsers = [];
        this.renewal_model.commentRenewals.push(data_comment_aux[i]);
      }
    }


    this._services.service_general_put('ImmigrationServices/PutRenewal', this.renewal_model)
      .subscribe((response: any) => {

        console.log('Response update ===> ', response);

        if (response.success) {

          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'Renewal updated',
              body: 'The Renewal has been successfully updated.'
            }
          });
          this.dialogRef.close();
          this.temporalDocument = [];
          this.initPageSettings();

        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error (PutRenewal) => ', error);

        this.__loader__.hideLoader();

      });

  }

  public filteringDocuments(): void {

    this.renewal_model.documentRenewals =
      this.renewal_model.documentRenewals.filter((document_in: DocumentRenewalsModel) => {

        if (document_in.local) {

          return document_in;

        }

      });

  }

  /* Utilities */
  public getValueFromCatalogue(catalogue: [], id_to_find: any, get_field: string): string {

    let result: string = '';

    catalogue.forEach((item: any) => {

      if (item.id == id_to_find || item.dependentId == id_to_find) {

        result = item[get_field];

      }

    });

    return result;

  }

  public getDocumentCountryOrigin(id_to_find: number): string {

    return this.getValueFromCatalogue(this.country_catalogue, id_to_find, 'name');

  }

  public readDeliverTo(id_to_find: string): string {

    return this.getValueFromCatalogue(this.applicant_catalogue, id_to_find, 'relationship');

  }

  public hideModal(): void {

    this.dialogRef.close();

  }

  public status_catalogue: any = [];
  public country_catalogue: any = [];
  public applicant_catalogue: any = [];
  public servicetype_catalogue: any = [];
  public async getCatalogues(): Promise<void> {

    //this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=8").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.status_catalogue = data.result;
      }
    }))
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.servicetype_catalogue = await this._services.getCatalogueFrom('GetTypeService');

    this._services.service_general_get(`ServiceRecord/GetApplicant/${this.data.app_id}`)
      .subscribe((response: any) => {

        if (response.success) {

          this.applicant_catalogue = response.applicant.value;

        }

      }, (error: any) => {

        console.log('Error () => ', error);

      });


    this.documentoscatalogos();
  }

  async documentoscatalogos() {
    //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/2').subscribe((data => {
      if (data.success) {
        this.caDocumentType = data.result;
        console.log(this.caDocumentType);
      }
    }))
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    this.cRequestType = await this._services.getCatalogueFrom('GetRequestType');
  }
  public city_catalogue: any = [];
  public async getCataloguesAfter(id_country: number): Promise<any> {

    const params: string = `?country=${id_country}`;

    this.city_catalogue = await this._services.getCatalogueFrom('GetState', params);

  }

}

class RenewalModel {
  id: number = 0;
  authoDate: string = '';
  authoAcceptanceDate: string = '';
  applicantId: string = '';
  applicantName: string = '';
  statusId: number = 0;
  name: string = '';
  workOrderServicesId: number = 0;
  serviceCompletionDate: string = '';
  hostCountryId: number = 0;
  hostCityId: number = 0;
  visaTypeId: number = 0;
  consularServiceId: string = '';
  documentCollectionStartDate: string = '';
  documentCollectionCompletionDate: string = '';
  documentDeliveryDate: string = '';
  applicationSubmissionDate: string = '';
  documentExpirationDate: string = '';
  applicationApprovalDate: string = '';
  appointmentDate: string = '';
  comment: string = '';
  createdBy: number = 0;
  createdDate: string = '';
  updatedBy: number = 0;
  updatedDate: Date = new Date();
  serviceTypeId: string = '';
  relationship: string = '';
  typeDocument:number = 0;
  commentRenewals: CommentRenewalsModel[] = [];
  documentRenewals: DocumentRenewalsModel[] = [];
  reminderRenewals: ReminderRenewalsModel[] = [];
}

class CommentRenewalsModel {
  id: number = 0;
  renewalId: number = 0;
  reply: string = '';
  userId: number = 0;
  createdBy: number = 0;
  createdDate: Date = undefined;
  updateBy: number = 0;
  updatedDate: Date = new Date();
  user: UserModel = new UserModel();
}

class UserModel {
  id: number = 0;
  email: string = '';
  name: string = '';
  lastName: string = '';
  motherLastName: string = '';
  mobilePhone: string = '';
  avatar: string = '';
  token: string = '';
  status: boolean = false;
  profileUsers = []
}

class DocumentRenewalsModel {
  id: number = 0;
  fileName: string = '';
  fileRequest: string = '';
  fileExtension: string = '';
  documentType: string = '';
  relationship: string = '';
  issueDate: string = '';
  expirationDate: string = '';
  issuingAuthority: string = '';
  countryOrigin: number = 0;
  comment: string = '';
  renewalId: number = 0;
  createdDate: string = '';
  createdBy: number = 0;
  updateBy: number = 0;
  updatedDate: string = '';
  local: boolean = true;
}

class ReminderRenewalsModel {
  id: number = 0;
  renewalId: number = 0;
  reminderDate: string = '';
  reminderComments: string = '';
  createdBy: string = '';
  createdDate: string = '';
}

class SingleComment {
  comment: string = '';
}
