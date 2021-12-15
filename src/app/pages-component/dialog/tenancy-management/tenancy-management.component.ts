import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogAddEventTenancyComponent } from './../dialog-add-event-tenancy/dialog-add-event-tenancy.component';


@Component({
  selector: 'app-tenancy-management',
  templateUrl: './tenancy-management.component.html',
  styleUrls: ['./tenancy-management.component.css']
})
export class TenancyManagementComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  loader: LoaderComponent = new LoaderComponent();
  user:any;
  show: boolean = false;
  idTenancy;
  document: any[] = [];
  catalog_estatus: any[] = [];
  displayedColumnsReportVisit: string[] = ['ReportDate', 'CloseDate', 'Severity', 'Description', 'Status', 'Photos', 'Actions'];
  payments_table_fields: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
  public image_path:string = this._services.url_images;
  public user_data: any = JSON.parse(localStorage.getItem('userData'));
  public today_date: Date = new Date();
  public country_catalogue: any = [];
  public documentType: any = [];
  calculo: any = {};
  payments: any[] = [];
  newComment: any[] = [];
  statusEvent_catalog;
  severity_catalogue;
  serviceScope : any[] = [];

  // dataComment;


  ngOnInit(): void {
    this.loader.showLoader();
    console.log("Data que recibe el modal:", this.data);
    this.getCatalog();
    this.idTenancy = this.data.data.service[0].id;
    console.log('id', this.data.data.service[0].id);
    this.dataTenancy();

  }
  public tenancyManagement: tenancyManagementModel = new tenancyManagementModel();
  public dataDeliver;

   // get service scope
   getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.tenancyManagement.workOrderServices}&client=${this.data.data.partnerId }`).subscribe(resp => {
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


  dataTenancy() {
    this._services.service_general_get(`RelocationServices/TenancyManagementById?id=${this.idTenancy}`).subscribe(resp => {
      if (resp.success) {
        this.loader.hideLoader();
        this.tenancyManagement = resp.result
        // this.dataComment = resp.result.commentTenancyManagements;
        console.log('tenancy', this.tenancyManagement);
        this.getdeliver();
        this.getServiceScope();
        this.get_payment();
        this.getDataHousing();
        // this.getRealtor();
      }
    }, (error: any) => {
      console.log('error RelocationServices/TenancyManagement', error);
    });
  }
  getdeliver() {
    this._services.service_general_get(`ServiceOrder/GetDeliverTo?wos=${this.tenancyManagement.workOrderServices}`).subscribe((data => {
      console.log(data);
      if (data.success) {
        this.dataDeliver = data.result.value;
      }
    }));
  }

  async getCatalog() {
    this.show = true;
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    //this.documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
    this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
      if (data.success) {
        this.documentType = data.result;
        console.log(this.documentType);
      }
    }));
    this.statusEvent_catalog = await this._services.getCatalogueFrom('GetStatusReportAnEvent');
    this.severity_catalogue = await this._services.getCatalogueFrom('GetSeverity');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=23").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.catalog_estatus = data.result;
      }
    }));
  }
  addEvent(id) {
    console.log('add event');
    const dialogRef = this._dialog.open(DialogAddEventTenancyComponent, {
      width: "95%",
      data: {id: id, tenancyManagementId: this.tenancyManagement.id},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  // property
  public data_propiedad : any;
  dataHousing(item){
     this.data_propiedad = item;
  }

  public dataSourceHousing : any;
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe((data_housing) => {
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        // this.permanent_homet(this.dataSourceHousing);
      }
    });
  }
  HomeDetailsnew() {
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.tenancyManagement.workOrderServices,
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
      // this.dataTenancy();
      this.getDataHousing();

    })
  }
  //METODO PAR EDICION DE HOUSING//
  editHousing() {
    this.data_propiedad.supplierType = 3
    this.data_propiedad.workOrderServices = this.tenancyManagement.workOrderServices,
    this.data_propiedad.sr = this.data.sr;
    this.data_propiedad.numberWorkOrder = this.data.data.numberWorkOrder;
    this.data_propiedad.serviceID = this.data.data.number_server;
    this.data_propiedad.serviceName = this.data.data.service_name;
    console.log("Editar Housing: ", this.data_propiedad);
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: this.data_propiedad,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  // documents
  getCountryOriginName(id){
    for(let i = 0; i < this.country_catalogue.length; i++){
      if(this.country_catalogue[i].id == id){
         return this.country_catalogue[i].name;
      }
    }
  }
  getStatusEvent(id) {
    for(let i = 0; i < this.statusEvent_catalog.length; i++){
      if(this.statusEvent_catalog[i].id == id){
         return this.statusEvent_catalog[i].status;
      }
    }
  }
  getSeverityEvent(id) {
    for(let i = 0; i < this.severity_catalogue.length; i++){
      if(this.severity_catalogue[i].id == id){
         return this.severity_catalogue[i].severity;
      }
    }
  }
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
          // /api/RelocationServices/Document/TenancyManagement
          this._services.service_general_delete("RelocationServices/Document/TenancyManagement?id=" + id).subscribe((data => {
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
  getDocumentTypeName(id) {
    for(let i = 0; i < this.documentType.length; i++){
      if(this.documentType[i].id == id){
         return this.documentType[i].documentType;
      }
    }
  }

  public showDocumentDialogDetails( document:any, service_line:number = undefined ):void {
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
  addDocument() {
    console.log('add document');
    this.data.typeDocument = 1;
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "95%",
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        result.tenancyManagementId = this.tenancyManagement.id;
         this.document.push(result);
         console.log(this.document);
      }
    });
  }

  // payment
  //++++++++ consulta payment
  get_payment() {
    console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.tenancyManagement.workOrderServices).subscribe((data => {
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
  addPayment(data) {
    console.log('add payment');
    console.log('workOrderServicesId', this.tenancyManagement.workOrderServices);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.tenancyManagement.workOrderServices,
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
  editPayment(data) {
    console.log('edit payment');
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
  deletePaymentConcept(data) {
    console.log('delete');
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
  public comment_string:SingleComment = new SingleComment();

  public addNewComment():void {
    const new_comment:commentTenancyManagementsModel = new commentTenancyManagementsModel();
    new_comment.id = 0;
    new_comment.tenancyManagementId = this.tenancyManagement.id;
    new_comment.comment = '';
    new_comment.createdBy = this.user_data.id;
    new_comment.createdDate = this.today_date;
    new_comment.updatedBy = this.user_data.id;
    new_comment.updatedDate = this.today_date;
    new_comment.createdByNavigation = this.user_data;

    this.tenancyManagement.commentTenancyManagements.push( new_comment );

    this.comment_string.comment = '';

  }
  public deleteReminderSelected( reminder:reminderTenancyManagementsModel, index:number ):void {
    if( reminder.id == 0 ) {
      this.tenancyManagement.reminderTenancyManagements.splice(index, 1)
    } else {
      this.loader.showLoader();
      this._services.service_general_delete(`RelocationServices/Reminder/TenancyManagement?id=${ reminder.id }`)
      .subscribe( (response:any) => {
        console.log('Res ==> ', response);
        if( response.success ) {
          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Reminder Deleted",
              body: "Reminder has been deleted successfully."
            }
          });
          this.dataTenancy();
        }
      }, (error:any) => {
        console.error('Error (RelocationServices/Reminder/TenancyManagement) => ', error);
      });
    }
  }
  addNewReminder() {
    const reminder_model:reminderTenancyManagementsModel = new reminderTenancyManagementsModel();

    reminder_model.createdBy = this.user_data.id;
    reminder_model.createdDate = new Date();
    reminder_model.tenancyManagementId = this.tenancyManagement.id;

    this.tenancyManagement.reminderTenancyManagements.push( reminder_model );
  }
  save() {
    console.log('save');
    this.tenancyManagement.updateBy = this.user_data.id;
    this.tenancyManagement.updatedDate = new Date();
    for (let com = 0; com < this.tenancyManagement.commentTenancyManagements.length; com++) {
      const element = this.tenancyManagement.commentTenancyManagements[com];
      if (element.id == 0) {
        delete element.createdByNavigation;
      }
    }
    this.tenancyManagement.documentTenancyManagements = this.document;
    console.log("Informacion a guardar:  ", this.tenancyManagement);
    this._services.service_general_put("RelocationServices/TenancyManagement", this.tenancyManagement).subscribe((data => {
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
}
class tenancyManagementModel {
  id: number = 0;
  workOrderServices: number = 0;
  coordination: boolean = true;
  authoDate: Date;
  authoAcceptanceDate: Date;
  deliverTo: number = 0;
  statusId: number = 0;
  serviceCompletionDate: Date;
  recurrence: Date;
  monthlyFollowUp: Date;
  propertyId: number = 0;
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
  commentTenancyManagements: commentTenancyManagementsModel[] = [];
  documentTenancyManagements: documentTenancyManagementsMoldel[] = [];
  reminderTenancyManagements: reminderTenancyManagementsModel[] = [];
  reportAnEvents: reportAnEventsModel[] = [];
  eventTables: eventTablesModel[] = [];

}
class commentTenancyManagementsModel {
  id: number = 0;
  tenancyManagementId: number = 0;
  comment: string = "";
  createdBy: number = 0;
  createdDate: Date ;
  updatedBy: number = 0;
  updatedDate: Date;
  createdByNavigation: createdByNavigationModel[] = [];
}
class documentTenancyManagementsMoldel {
  id: number = 0;
  tenancyManagementId: number = 0;
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
class reminderTenancyManagementsModel {
  id: number = 0;
  tenancyManagementId: number = 0;
  reminderDate: Date;
  reminderComments: string = "";
  createdBy: number = 0;
  createdDate: Date;
  remi: string = "";
}
class reportAnEventsModel {
  id: number = 0;
  tenancyManagementId: number = 0;
  eventReportDate: Date;
  eventCloseDate: Date;
  severityId: number = 0;
  description: string = "";
  statusId: number = 0;
  quoteApproval: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
  assignedPhotos: assignedPhotosModel[] = [];
  commentReportAnEvents: commentReportAnEventsModel[] = [];
  supplierConsultantPhotos: supplierConsultantPhotosModel[] = [];
}

class eventTablesModel {
  id: number = 0;
  issueReportDate: Date;
  issueCloseDate: Date;
  severity: string = "";
  description: string = "";
  status: string = "";
  photos: number = 0;
  quoteApproval: string = "";}

// clases de repor event
class assignedPhotosModel {
  id: number = 0;
  reportAnEventId: number = 0;
  photoName: string = "";
  photoPath: string = "";
  photoExtension: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class commentReportAnEventsModel {
  id: number = 0;
  reportAnEventId: number = 0;
  comment: string = "";
  createdBy: number = 0;
  createdDate: Date ;
  updatedBy: number = 0;
  updatedDate: Date ;
}

class supplierConsultantPhotosModel {
  id: number = 0;
  reportAnEventId: number = 0;
  photoName: string = "";
  photoPath: string = "";
  photoExtension: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
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
class userTypeModel{
  id: number = 0;
  type: string = "";
}


class SingleComment {
  comment:string = '';
}
