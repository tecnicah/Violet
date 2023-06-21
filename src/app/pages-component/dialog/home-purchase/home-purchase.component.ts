import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogHousingSpecificationsComponent } from '../dialog-housing-specifications/dialog-housing-specifications.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';




@Component({
  selector: 'app-home-purchase',
  templateUrl: './home-purchase.component.html',
  styleUrls: ['./home-purchase.component.css']
})
export class HomePurchaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  loader: LoaderComponent = new LoaderComponent();
  show: boolean = false;
  user: any;
  idHomePurchase;
  catalog_status: any[] = [];
  catalog_realtor: any[] = [];
  catalog_currency: any[] = [];
  displayedColumnsHousing: string[] = ['Supplier Partner', 'Supplier', 'Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Status', 'Actions'];
  payments_table_fields: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
  catalog_statusPurchase: any[] = [];
  public services_catalogue: any = [];
  caPropertyComission: any[] = [];
  caComissionCurrency: any[] = [];
  document: any[] = [];
  public documentType: any = [];
  public country_catalogue: any = [];
  payments: any[] = [];
  calculo: any = {};
  displayedColumnsPayment: string[] = ['Payment','Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence','action'];
  public image_path:string = this._services.url_images;
  public user_data:any = JSON.parse(localStorage.getItem('userData'));
  public today_date: Date = new Date();
  public dataDeliver;
  serviceScope = null;


  ngOnInit(): void {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("Data que recibe el modal:", this.data);
    this.idHomePurchase = this.data.data.service[0].id;
    console.log('id', this.data.data.service[0].id);
    this.dataHomePurchase();
    
  }

   // get service scope
   getServiceScope() {
     debugger;
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.homePurchase.workOrderServices}&client=${this.data.data.partnerId }`).subscribe(resp => {
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
  public homePurchase: HomePurchaseModel = new HomePurchaseModel();

  dataHomePurchase() {
    this.getCatalog();
    this._services.service_general_get(`RelocationServices/GetHomePurchaseById?id=${this.idHomePurchase}`).subscribe(resp => {
      if (resp.success) {
        this.homePurchase = resp.result
        console.log('home sale', this.homePurchase);
        this.getdeliver();
        this.get_payment();
        this.getDataHousing();
        this.getRealtor();
        this.setup_permissions_settings();
        this.getServiceScope();
      }
      this.loader.hideLoader();
    }, (error: any) => {
      console.log('error GetHomePurchaseById', error);
      this.loader.hideLoader();
    });
  }
  getdeliver() {
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.homePurchase.workOrderServices).subscribe((data => {
      console.log(data);
      if (data.success) {
        this.dataDeliver = data.result.value;
      }
    }));
    // GetDeliverTo?wos=2041
  }


  //////////////////////manage estatus 

  disabled_by_permissions: boolean = false;
  hide_by_permissions: boolean = false;
  hide_complete: boolean = false;
  show_completed: boolean = false;
  show_progress: boolean = false;
  wo_: boolean = false;
  sr_: boolean = false;

  setup_permissions_settings() {
    debugger;
    if (!this.data.data.numberWorkOrder) {
      this.wo_ = this.data.workOrderId;
    }
    else {
      this.wo_ = this.data.data.numberWorkOrder
    }

    if (!this.data.data.number_server) {
      this.sr_ = this.data.data.serviceNumber
    }
    else {
      this.sr_ = this.data.data.number_server
    }

    if (this.user.role.id == 3) {
      this.disabled_by_permissions = true
    }
    else {
      this.hide_by_permissions = true;
    }
    if (this.homePurchase.statusId != 39 && this.homePurchase.statusId != 2) { //active , in progress
      this.hide_complete = true;
    }
    else {
      if (this.homePurchase.statusId == 39) {
        this.show_progress = true;
      }
      else {
        this.show_completed = true;
      }
    }
  }

  change_button() {
    debugger;
    if (this.show_completed) {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Are you sure the service is complete?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if (result) {
          this.homePurchase.statusId = 37; //penidng to completion 
          this.save();
        }
      });
    }

    if (this.show_progress) {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Do you want start the service?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if (result) {
          this.homePurchase.statusId = 2; //penidng to completion 
          this.save();
        }
      });
    }
  }

  //////////////////////manage estatus 

  public ca_privacy = [];
  async getCatalog() {
    this.show = true;
    //this.catalog_status = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=24").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.catalog_status = data.result;
      }
    }));
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.catalog_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.catalog_statusPurchase = await this._services.getCatalogueFrom('GetStatusHomePurchase');
    this.caPropertyComission = await this._services.getCatalogueFrom('GetStatusReportIssue');
    this.caComissionCurrency = await this._services.getCatalogueFrom('GetSeverity');
    //this.documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.documentType = data.result;
      }
    }))

  }

  // seccion housing list
  HousingSpecs(){
    const dialogRef = this._dialog.open(DialogHousingSpecificationsComponent, {
      data: this.homePurchase,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
      }
    })
  }
  HomeDetailsnew() {
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.homePurchase.workOrderServices,
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
  // get housing
  //DATA TABLE HOUSING//
  dataSourceHousing:any[] = [];
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key='+Number(this.data.data.workOrderId)).subscribe((data_housing => {
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ',data_housing);
        this.dataSourceHousing = data_housing.message;
      }
    }));
  }
  //EDIT HOUSING//
  editHousing(data) {

    data.supplierType = 3
    data.workOrderServicesId = this.homePurchase.workOrderServices,
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
  // documents
  AddDocument(){
    this.data.typeDocument = 1;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        result.homePurchase = this.homePurchase.id;
         this.document.push(result);
         console.log(this.document);
      }
    });
  }
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
      console.log(result);
      if (result) {
        if (id == 0) {
          this.document.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteDocumentHomePurchase?id=" + id).subscribe((data => {
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
  getCountryOriginName(id){
    for(let i = 0; i < this.country_catalogue.length; i++){
      if(this.country_catalogue[i].id == id){
         return this.country_catalogue[i].name;
      }
    }
  }
  getDocumentTypeName(id) {
    for(let i = 0; i < this.documentType.length; i++){
      if(this.documentType[i].id == id){
         return this.documentType[i].documentType;
      }
    }
  }
  // get payment
  //++++++++ consulta payment
  get_payment() {
    console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServices=" + this.homePurchase.workOrderServices).subscribe((data => {
      if (data.success) {
        console.log('datos de tabla request', data);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        // console.log('datos de la tabla' + data.result.value.payments);
      }
      console.log('2° datos de la tabla', this.payments);
    }))
  }
  // add payment
  addPayment(data) {
    console.log('workOrderServicesId', this.homePurchase.workOrderServices);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.homePurchase.workOrderServices,
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
  // delete
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
  // get realtor
  getRealtor() {
    if (this.homePurchase.supplierPartnerId == 0 ) {

    }
    else {
      console.log('supplier', this.homePurchase.supplierPartnerId);
      this._services.service_general_get(`SupplierPartnerProfile/GetConsultantContactsService?supplierPartner=${this.homePurchase.supplierPartnerId}&supplierType=33`).subscribe(resp => {
        if (resp.success) {
          this.catalog_realtor = resp.result.value;
        }
      });
    }

  }

  public comment_string:SingleComment = new SingleComment();
  public addNewComment():void {
    const new_comment: commentHomePurchasesModel = new commentHomePurchasesModel();

    new_comment.id = 0;
    new_comment.homePurchase = this.homePurchase.id;
    new_comment.comment = '';
    new_comment.createdBy = this.user_data.id;
    new_comment.createdDate = this.today_date;
    new_comment.updatedBy = this.user_data.id;
    new_comment.updatedDate = this.today_date;
    new_comment.createdByNavigation = this.user_data;

    this.homePurchase.commentHomePurchases.push( new_comment );

    this.comment_string.comment = '';
  }

  // reminder
  public deleteReminderSelected( reminder:reminderHomePurchasesModel, index:number ):void {

    if( reminder.id == 0 ) {
      this.homePurchase.reminderHomePurchases.splice(index, 1)
    } else {
      this.loader.showLoader();
      this._services.service_general_delete(`RelocationServices/DeleteReminderHomePurchase?id=${ reminder.id }`)
          .subscribe( (response:any) => {
            console.log('Res ==> ', response);
            if( response.success ) {
              const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Reminder Deleted",
                  body: "Reminder has been deleted successfully."
                }
              });
              this.dataHomePurchase();
            }
          }, (error:any) => {
            console.error('Error (DeleteReminder) => ', error);
          });
    }
  }
  // reminder add
  public addNewReminder():void {
    const reminder_model:reminderHomePurchasesModel = new reminderHomePurchasesModel();

    reminder_model.createdBy = this.user_data.id;
    reminder_model.createdDate = new Date();
    reminder_model.homePurchase = this.homePurchase.id;

    this.homePurchase.reminderHomePurchases.push( reminder_model );

  }
  save() {
    this.loader.showLoader();
    this.homePurchase.updatedBy = this.user_data.id;
    this.homePurchase.updatedDate = new Date();
    console.log("Informacion a guardar:  ",this.homePurchase);
    // this.homePurchase.updateBy = this.user.id;
    this.homePurchase.documentHomePurchases = this.document;
    // this.homePurchase.updatedDate = new Date();
    for (let com = 0; com < this.homePurchase.commentHomePurchases.length; com++) {
      const element = this.homePurchase.commentHomePurchases[com];
      if (element.id == 0) {
        delete element.createdByNavigation;
      }
    }
    this._services.service_general_put("RelocationServices/PutHomePurchase", this.homePurchase).subscribe((data => {
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
class HomePurchaseModel {
  id: number = 0;
  workOrderServices: number = 0;
  coordination: Boolean = true;
  authoDate:Date;
  authoAcceptanceDate:Date;
  deliverTo: number = 0;
  statusId: number = 0;
  serviceCompletionDate:Date;
  purchaseDesiredPrice: number = 0;
  currencyPurchaseDesiredPriceId: number = 0;
  purchaseFinalPrice: number = 0;
  currencyPurchaseFinalPriceId: number = 0;
  purchaseStatusId: number = 0;
  comment: string = "";
  relatedSupplier: Boolean = true;
  supplierPartnerId: number = 0; // se quito
  agency: string = "";
  contactName: string = "";
  contactEmail: string = "";
  contactPhoneNo: string = "";
  propertyCommission:number = 0;
  commissionAmount:number = 0;
  currencyCommissionId:number = 0;
  createdBy:number = 0;
  createdDate:Date;
  updatedBy:number = 0;
  updatedDate:Date;
  commentHomePurchases: commentHomePurchasesModel[] = [];
  documentHomePurchases: documentHomePurchasesModel[] = [];
  reminderHomePurchases: reminderHomePurchasesModel[] = [];
}
class commentHomePurchasesModel {
  id: number = 0;
  homePurchase: number = 0;
  comment: string = "";
  createdBy: number = 0;
  createdDate:Date;
  updatedBy: number = 0;
  updatedDate: Date;
  createdByNavigation: createdByNavigationModel[] = [];
}
class createdByNavigationModel {
  id: number = 0;
  email: string = "";
  name: string = "";
  lastName: string = "";
  motherLastName: string = "";
  mobilePhone: string = "";
  avatar: string = "";
  reset: boolean = true;
  token: string = "";
  status: boolean = true;
  clientName: string = "";
  userType: userTypeModel[] = [];
}

class userTypeModel {
  id: number = 0;
  type: string = "";
}
class documentHomePurchasesModel {
  id: number = 0;
  homePurchase: number = 0;
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
class reminderHomePurchasesModel {
  id: number = 0;
  homePurchase: number = 0;
  reminderDate:Date;
  reminderComments: string = "";
  createdBy: number = 0;
  createdDate:Date;
}
class SingleComment {
  comment:string = '';
}
