import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';


@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})

export class OtherComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  loader: LoaderComponent = new LoaderComponent();
  user: any;
  show: boolean = false;
  idDataOther;
  calculo: any = {};
  catalog_status: any[] = [];
  catalog_currency: any[] = [];
  payments_table_fields: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
  public image_path: string = this._services.url_images;
  document: any[] = [];
  public documentType: any = [];
  public country_catalogue: any = [];
  payments: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  public user_data: any = JSON.parse(localStorage.getItem('userData'));
  public today_date: Date = new Date();
  serviceScope = null;


  ngOnInit(): void {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    //console.log("Data que recibe el modal:", this.data);
    this.idDataOther = this.data.data.service[0].id;
    //console.log('id', this.data.data.service[0].id);
    this.getDataOther();

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
   debugger;
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
   if(this.dataOther.statusId != 39 && this.dataOther.statusId != 2 ){ //active , in progress
     this.hide_complete= true;
   }
   else{
     if(this.dataOther.statusId == 39){
       this.show_progress = true;
     }
     else{
       this.show_completed = true;
     }
   }
 }

 change_button(){
   debugger;
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
         this.dataOther.statusId = 37; //penidng to completion 
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
         this.dataOther.statusId = 2; //penidng to completion 
         this.save();
        }
      });
   }
 }
 
//////////////////////manage estatus 

  public dataOther: dataOtherModel = new dataOtherModel();
  public dataDeliver;
   // get service scope
   getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.dataOther.workOrderServices}&client=${this.data.data.partnerId }`).subscribe(resp => {
      if (resp.success) {
        //console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  public __serverPath__:string = this._services.url_images;
  public openFileOnWindow( url_in:string ):void {
    const server_url:string = this.__serverPath__ + url_in;
    window.open( server_url );
  }


  getDataOther() {
    this.getCatalog();
    this._services.service_general_get(`RelocationServices/GetOtherById?id=${this.idDataOther}`).subscribe(resp => {
      if (resp.success) {
        this.loader.hideLoader();
        this.dataOther = resp.result;
        this.getServiceScope();
        this.getdeliver();
        this.get_payment();
        this.setup_permissions_settings();
        //console.log('home sale', this.dataOther);
      }
    }, (error: any) => {
      //console.log('error GetOther', error);
    });
  }
  getdeliver() {
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.dataOther.workOrderServices).subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.dataDeliver = data.result.value;
      }
    }));
    // GetDeliverTo?wos=2041
  }

  public ca_privacy = [];
  async getCatalog() {
    this.show = true;
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    //this.catalog_status = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=26").subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.catalog_status = data.result;
      }
    }));
    this.catalog_currency = await this._services.getCatalogueFrom('GetCurrency');
    //this.documentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
      if (data.success) {
        this.documentType = data.result;
        //console.log(this.documentType);
      }
    }))
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
  }
  // seccion documentos
  AddDocument(){
    this.data.typeDocument = 1;
    this.data.location = this.data.data.location;
    // this.data.sr = this.data.app_id;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if(result.success){
        result.other = this.dataOther.id;
         this.document.push(result);
         //console.log(this.document);
      }
    });
  }
  //**DELETE DOCUMENT**//
  removeDocument(i, id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Document?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        if (id == 0) {
          this.document.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteDocumentOther?id=" + id).subscribe((data => {
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
  // show document
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
  //GET DOCUMENT TYPE NAME//
  getDocumentTypeName(id) {
    for(let i = 0; i < this.documentType.length; i++){
      if(this.documentType[i].id == id){
          return this.documentType[i].documentType;
      }
    }
  }
  //GET COUNTRY ORIGIN NAME//
  getCountryOriginName(id){
    for(let i = 0; i < this.country_catalogue.length; i++){
      if(this.country_catalogue[i].id == id){
         return this.country_catalogue[i].name;
      }
    }
  }
  // inicio de request payment
  // edit payment
  //++++++++ consulta payment
  get_payment() {
    //console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.dataOther.workOrderServices).subscribe((data => {
      if (data.success) {
        //console.log('datos de tabla request', data);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        // //console.log('datos de la tabla' + data.result.value.payments);
      }
      //console.log('2° datos de la tabla', this.payments);
    }))
  }
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(data) {
    //console.log('workOrderServicesId', this.dataOther.workOrderServices);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.dataOther.workOrderServices,
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
   //console.log("Data al abrir modal de payment concept: ", data);
   const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_payment();;
    });
  }
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
  // commet
  public comment_string:SingleComment = new SingleComment();
  public addNewComment():void {
    const new_comment:commentOthersModel = new commentOthersModel();
    new_comment.id = 0;
    new_comment.other = this.dataOther.id;
    new_comment.comment = this.comment_string.comment;
    new_comment.createdBy = this.user_data.id;
    new_comment.createdDate = this.today_date;
    new_comment.updatedBy = this.user_data.id;
    new_comment.updatedDate = this.today_date;
    new_comment.createdByNavigation = this.user_data;
    this.dataOther.commentOthers.push( new_comment );
    this.comment_string.comment = '';
  }
  // reminder
  public deleteReminderSelected( reminder:reminderOthersModel, index:number ):void {
    if( reminder.id == 0 ) {
      this.dataOther.reminderOthers.splice(index, 1)
    } else {
      this.loader.showLoader();
      this._services.service_general_delete(`RelocationServices/DeleteOther?id=${ reminder.id }`)
      .subscribe( (response:any) => {
        //console.log('Res ==> ', response);
        if( response.success ) {
          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Reminder Deleted",
              body: "Reminder has been deleted successfully."
            }
          });
          this.getDataOther();
        }
      }, (error:any) => {
        console.error('Error (DeleteReminderTHC) => ', error);
      });
    }
  }
  public addNewReminder():void {
    const reminder_model:reminderOthersModel = new reminderOthersModel();

    reminder_model.createdBy = this.user_data.id;
    reminder_model.createdDate = new Date();
    reminder_model.other = this.dataOther.id;

    this.dataOther.reminderOthers.push( reminder_model );

  }

  save(){
    //console.log("Informacion a guardar:  ",this.dataOther);
    this.loader.showLoader();
    this.dataOther.updatedBy = this.user.id;
    this.dataOther.documentOthers = this.document;
    this.dataOther.updatedDate = new Date();
    for (let com = 0; com < this.dataOther.commentOthers.length; com++) {
      const element = this.dataOther.commentOthers[com];
      if (element.id == 0) {
        delete element.createdByNavigation;
      }
    }
    if(this.dataOther.statusId == 4 || this.dataOther.statusId == 5){
      this.dataOther.serviceCompletionDate = new Date();
    }
    else {
      this.dataOther.serviceCompletionDate = null;
    }
    this._services.service_general_put("RelocationServices/PutOther", this.dataOther).subscribe((data => {
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
class dataOtherModel {
  id: number = 0;
  workOrderServices: number = 0;
  coordination: boolean = true;
  authoDate: Date;
  authoAcceptanceDate: Date;
  deliverTo: number = 0;
  statusId: number = 0;
  serviceCompletionDate: Date;
  description: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updatedBy: number = 0;
  updatedDate: Date;
  commentOthers: commentOthersModel[] = [];
  documentOthers: documentOthersModel[] = [];
  reminderOthers: reminderOthersModel[] = [];
}
class commentOthersModel {
  id: number = 0;
  other: number = 0;
  comment: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updatedBy: number = 0;
  updatedDate: Date;
  createdByNavigation: createdByNavigationModel[] = [];
}
class documentOthersModel {
  id: number = 0;
  other: number = 0;
  fileName: string = "";
  fileRequest: string = "";
  fileExtension: string = "";
  documentType: number = 0;
  relationship: number = 0;
  issueDate: Date;
  expirationDate: Date;
  issuingAuthority: string = "";
  countryOrigin: number = 0;
  comment: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class reminderOthersModel {
  id: number = 0;
  other: number = 0;
  reminderDate:Date;
  reminderComments: string = "";
  createdBy: number = 0;
  createdDate:Date;
  updatedBy: number = 0;
  updatedDate:Date;
}
class createdByNavigationModel {
  id: number = 0;
  email:  string = "";
  name:  string = "";
  lastName:  string = "";
  motherLastName:  string = "";
  mobilePhone:  string = "";
  avatar:  string = "";
  reset:  boolean = true;
  token:  string = "";
  status:  boolean = true;
  clientName: string = "";
  userType: userTypeModel[] = [];
}
class userTypeModel {
  id: number = 0;
  type:  string ="";
}
class SingleComment {
  comment:string = '';
}
