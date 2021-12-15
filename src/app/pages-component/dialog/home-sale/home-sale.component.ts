import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogAddVisitComponent } from './../dialog-add-visit/dialog-add-visit.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';

@Component({
  selector: 'app-home-sale',
  templateUrl: './home-sale.component.html',
  styleUrls: ['./home-sale.component.css']
})
export class HomeSaleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  loader: LoaderComponent = new LoaderComponent();
  // home_sale: any;
  user:any;
  public image_path:string = this._services.url_images;
  show: boolean = false;
  idHomeSale;
  calculo: any = {};
  switchProperty = false;
  catalog_estatus: any[] = [];
  catalog_currency: any[] = [];
  catalog_statusSale: any[]=[];
  displayedColumnsHomeSale: string[] = ['Date', 'Comment', 'Actions'];
  payments_table_fields: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
  temporalDocument: any[] = [];
  caDocumentType: any[] = [];
  caCountry: any[] = [];
  caPropertyComission: any[] = [];
  caComissionCurrency: any[] = [];
  document: any[] = [];
  payments: any[] = [];
  public today_date: Date = new Date();
  visit: any[] = [];
  serviceScope : any[] = [];




  ngOnInit(): void {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("Data que recibe el modal:", this.data);
    this.idHomeSale = this.data.data.service[0].id;
    console.log('id', this.data.data.service[0].id);
    this.dataHomeSale();
  }

   // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.homeSale.workOrderServices}&client=${this.data.data.partnerId }`).subscribe(resp => {
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
  public user_data: any = JSON.parse(localStorage.getItem('userData'));
  public homeSale: HomeSaleModel = new HomeSaleModel();
  public dataDeliver;


  dataHomeSale() {
    this.getCatalog();
    this._services.service_general_get(`RelocationServices/GetHomeSaleById?id=${this.idHomeSale}`).subscribe(resp => {
      if (resp.success) {
        this.loader.hideLoader();
        this.homeSale = resp.result
        console.log('home sale', this.homeSale);
        this.visit = this.homeSale.visitHomeSales;
        this.getdeliver();
        this.get_payment();
        this.getDataHousing();
        this.getServiceScope();

      }
    }, (error: any) => {
      console.log('error GetHomeSaleById', error);
    });
  }
  getdeliver() {
    this._services.service_general_get(`ServiceOrder/GetDeliverTo?wos=${this.homeSale.workOrderServices}`).subscribe((data => {
      console.log(data);
      if (data.success) {
        this.dataDeliver = data.result.value;
      }
    }));
  }

  public ca_privacy = [];
  async getCatalog() {
    this.show = true;
    //this.catalog_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=23").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.catalog_estatus = data.result;
      }
    }));

    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.catalog_currency = await this._services.getCatalogueFrom('GetCurrency');
    //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.caDocumentType = data.result;
      }
    }))
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    this.catalog_statusSale = await this._services.getCatalogueFrom('GetStatusHomeSale');
    this.caPropertyComission = await this._services.getCatalogueFrom('GetStatusReportIssue');
    this.caComissionCurrency = await this._services.getCatalogueFrom('GetSeverity');
  }
  // seccion visit
  addVisit(data) {
    console.log(data);
    if (data == null) {
      data = {
        id : 0,
        homeSale : this.homeSale.id,
        date: Date,
        comment : "",
        createdBy : this.user.id,
        createdDate : Date,
        updateBy : this.user.id,
        updatedDate: Date
      }

      console.log('add visit');
    }
    // this.homeSale.visitHomeSales[0].id = 0
    const dialogRef = this._dialog.open( DialogAddVisitComponent, {
      width: "50%",
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      // result.homeSale = this.homeSale.id;
      this.visit.push(result);
      console.log(this.visit);
    })
  }
  editVisit(data) {
    console.log('edit', data);
    // this.homeSale.visitHomeSales[0].id = 0
    const dialogRef = this._dialog.open( DialogAddVisitComponent, {
      width: "50%",
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      // result.homeSale = this.homeSale.id;
      // this.visit.push(result);
      console.log(result);
      this.visit.push(result);
    })

  }

  public initDocumentsSettings(): void {
    this.homeSale.documentHomeSales.forEach((document: DocumentHomeSaleModel) => {
      // document.local = false;
    });

  }
  //CONSULTA LA CASA PERMANENTE//

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
  //**PERMANENT HOME**//
  // permanentHome:any;
  data_inspection=[];
  data_repairs=[];
  data_home = [];


  //**************************************************************//
  //METODO PARA AGREGAR HOUSING//
  HomeDetailsnew() {
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.homeSale.workOrderServices,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName: this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId: this.data.data.serviceTypeId,
        sr: this.data.sr,
        supplierType: 3
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //METODO PAR EDICION DE HOUSING//
  editHousing() {
    this.data_propiedad.supplierType = 3
    this.data_propiedad.workOrderServices = this.homeSale.workOrderServices,
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

  DeleteOnline(i, id) {
    // /api/RelocationServices/DeleteDocumentHomeSale
    console.log('delete');
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
          this._services.service_general_delete("RelocationServices/DeleteDocumentHomeSale?id=" + id).subscribe((data => {
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
  public showDocumentDialogDetails( document:any, service_line:number = undefined ):void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        sl: service_line,
        name_section: "only_one_service"
      }
    });
  }
  //METODO PARA AGREGAR DOCUMENTOS//
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
        body: "Are you sure to delete document?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (id == 0) {
          this.document.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteDocumentHomeSale?id=" + id).subscribe((data => {
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

  // seccion request payment
  //++++++++ consulta payment
  get_payment() {
    console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?workOrderServices=" + this.homeSale.workOrderServices).subscribe((data => {
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
    console.log('workOrderServices', this.homeSale.workOrderServices);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.homeSale.workOrderServices,
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
  // borrar payment
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
  // ********fin request payment

  // inicio comment

  public comment_string: SingleComment = new SingleComment();
  public addNewComment():void {
    const new_comment: CommentHomeSaleModel = new CommentHomeSaleModel();
    new_comment.id = 0;
    new_comment.homeSale = this.homeSale.id;
    new_comment.comment = '';
    new_comment.createdBy = this.user_data.id;
    new_comment.createdDate = this.today_date;
    new_comment.updatedBy = this.user_data.id;
    new_comment.updatedDate = this.today_date;
    new_comment.createdByNavigation = this.user_data;

    this.homeSale.commentHomeSales.push( new_comment );

    this.comment_string.comment = '';

  }
  // remminder
  public deleteReminderSelected( reminder:ReminderHomeSaleModel, index:number ):void {
    if( reminder.id == 0 ) {
      this.homeSale.reminderHomeSales.splice(index, 1)
    } else {
      this.loader.showLoader();
      this._services.service_general_delete(`RelocationServices/DeleteReminderHomeSale?id=${ reminder.id }`)
      .subscribe( (response:any) => {
        console.log('Res ==> ', response);
        if( response.success ) {
          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Reminder Deleted",
              body: "Reminder has been deleted successfully."
            }
          });
          this.dataHomeSale();
        }
      }, (error:any) => {
        console.error('Error (DeleteReminderTHC) => ', error);
      });
    }
  }
  public addNewReminder():void {
    const reminder_model:ReminderHomeSaleModel = new ReminderHomeSaleModel();

    reminder_model.createdBy = this.user_data.id;
    reminder_model.createdDate = new Date();
    reminder_model.homeSale = this.homeSale.id;

    this.homeSale.reminderHomeSales.push( reminder_model );

  }
  save(){
    console.log("Informacion a guardar:  ",this.homeSale);
    this.homeSale.updateBy = this.user.id;
    this.homeSale.documentHomeSales = this.document;
    this.homeSale.updatedDate = new Date();
    this.homeSale.visitHomeSales = this.visit;

    for (let com = 0; com < this.homeSale.commentHomeSales.length; com++) {
      const element = this.homeSale.commentHomeSales[com];
      if (element.id == 0) {
        delete element.createdByNavigation;
      }
    }
    this._services.service_general_put("RelocationServices/PutHomeSale", this.homeSale).subscribe((data => {
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
        this.visit = [];
        this.ngOnInit();
      }
    }))
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
class HomeSaleModel {
  id: number = 0;
  workOrderServices: number = 0;
  coordination:  boolean = true;
  authoDate: Date;
  authoAcceptanceDate: Date;
  deliverTo: number = 0;
  statusId: number = 0;
  serviceCompletionDate: Date;
  listPrice: number = 0;
  currencyListPriceId: number = 0;
  purchaseFinalPrice: number = 0;
  currencyFinalPriceId: number = 0;
  property: true;
  propertyId: number = 0;
  saleStatusId: number = 0;
  comment: string = "";
  agency: string = "";
  contactName: string = "";
  contactEmail: string = "";
  contactPhoneNo: string = "";
  propertyCommission: number = 0;
  commissionAmount: number = 0;
  currencyCommissionId: number = 0;
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
  commentHomeSales: CommentHomeSaleModel[] = [];
  documentHomeSales: DocumentHomeSaleModel[] = [];
  reminderHomeSales: ReminderHomeSaleModel[] = [];
  visitHomeSales: VisitHomeSalesModel[] = [];
}
class CommentHomeSaleModel {
  id:number = 0;
  homeSale:number = 0;
  comment: string = "";
  createdBy:number = 0;
  createdDate: Date;
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
class DocumentHomeSaleModel {
  id:number = 0;
  homeSale:number = 0;
  fileName: string = "";
  fileRequest: string = "";
  fileExtension: string = "";
  documentType:number = 0;
  relationship:number = 0;
  issueDate: Date;
  expirationDate: Date;
  issuingAuthority: string = "";
  countryOrigin:number = 0;
  comment: string = "";
  createdBy:number = 0;
  createdDate: Date;
  updateBy:number = 0;
  updatedDate: Date;
}
class ReminderHomeSaleModel {
  id: number = 0;
  homeSale: number = 0;
  reminderDate: Date;
  reminderComments: string = "";
  createdBy: number = 0;
  createdDate: Date;
}
class VisitHomeSalesModel {
  id: number = 0;
  homeSale: number = 0;
  date: Date;
  comment: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date
}
class SingleComment {
  comment:string = '';
}
