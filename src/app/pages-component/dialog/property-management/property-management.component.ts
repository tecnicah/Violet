import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { Console } from 'console';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';




@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.css']
})
export class PropertyManagementComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  show: boolean = false;
  catalog_status: any[] = [];
  catalog_currency: any[] = [];
  catalog_library: any[] = [];
  catalog_severity: any[] = [];
  payments_table_fields: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
  switchVacant: boolean = false;
  switchRented: boolean = false;


  loader: LoaderComponent = new LoaderComponent();
  user: any;
  idPropertyManagement;
  document: any[] = [];
  documentReportIssue: any[] = [];
  public documentType: any = [];
  public country_catalogue: any = [];
  payments: any[] = [];
  calculo: any = {};
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  public today_date: Date = new Date();
  catalog_status_report: any[] = [];
  catalog_bill: any[] = [];
  newPhotoInspection: any[] = [];
  newPhotoBill: any[] = [];
  newPhotoMail: any[] = [];
  newPhotoIssue: any[] = [];
  serviceScope : any[] = [];


  // temporalDocument:   any = {};
  ngOnInit(): void {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("Data que recibe el modal:", this.data);
    this.idPropertyManagement = this.data.data.service[0].id;
    console.log('id', this.data.data.service[0].id);
    this.dataPropertyManag();

  }
  public user_data: any = JSON.parse(localStorage.getItem('userData'));
  public propertyManagement: propertyManagementModel = new propertyManagementModel();
  public image_path:string = this._services.url_images;

   // get service scope
   getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.propertyManagement.workOrderServices}&client=${this.data.data.partnerId }`).subscribe(resp => {
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
  dataPropertyManag() {
    this.getCatalog();
    this._services.service_general_get(`RelocationServices/GetPropertyManagementById?id=${this.idPropertyManagement}`).subscribe(resp => {
      if (resp.success) {
        this.loader.hideLoader();
        this.propertyManagement = resp.result
        console.log('Data property Management', this.propertyManagement);
        this.get_payment();
        this.getServiceScope();

      }
    }, (error: any) => {
      console.log('error getpropertyManagement', error);
    });
  }

  public ca_privacy = [];
  async getCatalog() {
    this.show = true;
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=25").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.catalog_status = data.result;
      }
    }));
    this.catalog_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.catalog_library = await this._services.getCatalogueFrom('GetLibrary');
    this.catalog_severity = await this._services.getCatalogueFrom('GetSeverity');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    //this.documentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
      if (data.success) {
        this.documentType = data.result;
        console.log(this.documentType);
      }
    }))
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.catalog_status_report = await this._services.getCatalogueFrom('GetStatusReportIssue');
    this.catalog_bill = await this._services.getCatalogueFrom('GetBillType');
  }
  changeSwitch() {
    if (this.switchRented == true) {
      this.switchVacant = false;
    }
    if (this.switchVacant == true) {
      this.switchRented = false;
    }
  }

  // documentos
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
        // result.proper = this.propertyManagement.id;
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
          this._services.service_general_delete("RelocationServices/DeleteDocumentPropertyManagement?id=" + id).subscribe((data => {
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
  // ver documentos
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
  // payment
  //++++++++ consulta payment
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(data) {
    console.log('workOrderServicesId', this.propertyManagement.workOrderServices);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.propertyManagement.workOrderServices,
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
  // get payment
  get_payment() {
    console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.propertyManagement.workOrderServices).subscribe((data => {
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
  // add photos inspection
  addPhotosInspection(event) {
    console.log(event);
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        this.newPhotoInspection.push({
          'id': 0,
          'propertyManagement': this.propertyManagement.id,
          'photo': encoded,
          'photoExtension':  ext[1],
          'namePhoto': file.name,
          'createdBy': this.user_data.id,
          'createdDate': new Date(),
          'updateBy': this.user_data.id,
          'updatedDate': new Date(),
        });
    };
  }
  // add photos bill
  addPhotosBill(event) {
    console.log(event);
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        this.newPhotoBill.push({
          'id': 0,
          'propertyManagement': this.propertyManagement.id,
          'photo': encoded,
          'photoExtension':  ext[1],
          'namePhoto': file.name,
          'createdBy': this.user_data.id,
          'createdDate': new Date(),
          'updateBy': this.user_data.id,
          'updatedDate': new Date(),
        });
    };
  }
  // add photos mail
  addPhotosMail(event) {
    console.log(event);
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        this.newPhotoMail.push({
          'id': 0,
          'propertyManagement': this.propertyManagement.id,
          'photo': encoded,
          'photoExtension':  ext[1],
          'namePhoto': file.name,
          'createdBy': this.user_data.id,
          'createdDate': new Date(),
          'updateBy': this.user_data.id,
          'updatedDate': new Date(),
        });
    };
  }
  // add photos inspection
  addPhotosIssue(event) {
    console.log(event);
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        this.newPhotoIssue.push({
          'id': 0,
          'propertyManagement': this.propertyManagement.id,
          'photo': encoded,
          'photoExtension':  ext[1],
          'namePhoto': file.name,
          'createdBy': this.user_data.id,
          'createdDate': new Date(),
          'updateBy': this.user_data.id,
          'updatedDate': new Date(),
        });
    };
  }
  deleteImgInspection(data, type) {
    // type es dependiendo del nodo de la foto
    console.log('borrar foto', data);
    if (data.id == 0) {
      this.newPhotoInspection.splice(data.id, 1)
    }
    else if (data.id != 0) {
      // DeletePhotoPropertyManagement?id=5&type=1
      this._services.service_general_delete(`RelocationServices/DeletePhotoPropertyManagement?id=${data.id}&type=${type}`).subscribe(resp => {
        if (resp.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Delete Photo"
            },
            width: "350px"
          });
          this.dialogRef.close();
          this.ngOnInit();

        }
      });
    }
  }

  // fin add photos
  public comment_string:SingleComment = new SingleComment();
  // comment
  public addNewComment():void {
    const new_comment: commentPropertyManagementsModel = new commentPropertyManagementsModel();
    new_comment.id = 0;
    new_comment.propertyManagement = this.propertyManagement.id;
    new_comment.comment = '';
    new_comment.createdBy = this.user_data.id;
    new_comment.createdDate = this.today_date;
    new_comment.updatedBy = this.user_data.id;
    new_comment.updatedDate = this.today_date;
    new_comment.createdByNavigation = this.user_data;
    this.propertyManagement.commentPropertyManagements.push( new_comment );
    this.comment_string.comment = '';
  }
  // remminder
  public deleteReminderSelected( reminder:reminderPropertyManagementsModel, index:number ):void {
    if( reminder.id == 0 ) {
      this.propertyManagement.reminderPropertyManagements.splice(index, 1)
    } else {
      this.loader.showLoader();
      this._services.service_general_delete(`RelocationServices/DeleteReminderPropertyManagement?id=${ reminder.id }`)
      .subscribe( (response:any) => {
        console.log('Res ==> ', response);
        if( response.success ) {
          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Reminder Deleted",
              body: "Reminder has been deleted successfully."
            }
          });
          this.dataPropertyManag();
        }
      }, (error:any) => {
        console.error('Error (DeleteReminderPropertyManagement) => ', error);
      });
    }
  }
  public addNewReminder():void {
    const reminder_model:reminderPropertyManagementsModel = new reminderPropertyManagementsModel();

    reminder_model.createdBy = this.user_data.id;
    reminder_model.createdDate = new Date();
    reminder_model.propertyManagement = this.propertyManagement.id;

    this.propertyManagement.reminderPropertyManagements.push( reminder_model );

  }

  addVisitReport() {
    const new_reportVisit: visitReportPropertyManagementsModel = new visitReportPropertyManagementsModel();
    new_reportVisit.id = 0;
    new_reportVisit.propertyManagement = this.propertyManagement.id;
    new_reportVisit.visitReport = '';
    new_reportVisit.createdBy = this.user_data.id;
    new_reportVisit.createdDate = this.today_date;
    new_reportVisit.updateBy = this.user_data.id;
    new_reportVisit.updatedDate = this.today_date;
    this.propertyManagement.visitReportPropertyManagements.push(new_reportVisit);
  }

  // add document report an issue
  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }
              let ext = droppedFile.relativePath.split(".");
              this.documentReportIssue.push({
                'id': 0,
                'propertyManagement': this.propertyManagement.id,
                'filePath': encoded,
                'fileExtension': ext[ext.length - 1],
                'nameFile': droppedFile.relativePath,
                'createdBy': this.user.id,
                'createdDate': new Date(),
                'updateBy': this.user.id,
                'updatedDate': new Date(),
              });
            };
          });
          console.log('documentos en report', this.documentReportIssue);

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public fileOver(event) {
    console.log(event);
  }
  public fileLeave(event) {
    console.log(event);
  }


  save(){
    console.log("Informacion a guardar:  ",this.propertyManagement);
    // this.propertyManagement.updateBy = this.user.id;
    this.propertyManagement.documentPropertyManagements = this.document;
    this.propertyManagement.documentReportIssuePropertyManagements = this.documentReportIssue;
    this.propertyManagement.photoInspectionPropertyManagements = this.newPhotoInspection;
    this.propertyManagement.photoBillPropertyManagements = this.newPhotoBill;
    this.propertyManagement.photoMailPropertyManagements = this.newPhotoMail;
    this.propertyManagement.photoReportIssuePropertyManagements = this.newPhotoIssue;

    for (let com = 0; com < this.propertyManagement.commentPropertyManagements.length; com++) {
      const element = this.propertyManagement.commentPropertyManagements[com];
      if (element.id == 0) {
        delete element.createdByNavigation;
      }
    }
     // si el estatus cambia a complete la fecha se guarda
     if (this.propertyManagement.statusId == 4 || this.propertyManagement.statusId == 5) {
      this.propertyManagement.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.propertyManagement.serviceCompletionDate = '';
    }
    console.log(JSON.stringify(this.propertyManagement),this.propertyManagement);



    this._services.service_general_put("RelocationServices/PutPropertyManagement", this.propertyManagement).subscribe((data => {
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
class propertyManagementModel {
  id: number = 0;
  workOrderServices: number = 0;
  coordination: boolean = true;
  authoDate: Date;
  authoAcceptanceDate: Date;
  serviceCompletionDate: string;
  statusId: number = 0;
  propertAddress: string = "";
  library: number = 0;
  vacant: boolean = true;
  rented: boolean = true;
  marketing: string = "";
  links: string = "";
  upcommingVisit: Date;
  countVisit: number = 0;
  offerReceived: string = "";
  submit: string = "";
  offerApprovedTenantSelected: number = 0;
  leaseNegotiation: string = "";
  sendDraft: string = "";
  comments: string = "";
  signatureCoordination: string = "";
  libraryPaymentCoordination: number = 0;
  tenancySupport: string = "";
  commentsQuestion: string = "";
  lastPropertyInspection: Date;
  report: string = "";
  nextPropertyInspection: Date;
  itemOngoingMaintanance: number = 0;
  providerVisit: number = 0;
  providerPayment: number = 0;
  billType: number = 0;
  commentBill: string = "";
  providerPaymentBill: number = 0;
  commentMail: string = "";
  severity: number = 0;
  descriptionReportIssue: string = "";
  statusReportIssue: number = 0;
  quoteApproval: Date;
  commentPropertyManagements: commentPropertyManagementsModel[] = [];
  documentPropertyManagements: documentPropertyManagementsModel[] = [];
  documentReportIssuePropertyManagements: documentReportIssuePropertyManagementsModel[] = [];
  photoBillPropertyManagements: photoBillPropertyManagementsModel[] = [];
  photoInspectionPropertyManagements: photoInspectionPropertyManagementsModel[] = [];
  photoMailPropertyManagements: photoMailPropertyManagementsModel[] = [];
  photoPropertyManagements: photoPropertyManagementsModel[] = [];
  photoReportIssuePropertyManagements: photoReportIssuePropertyManagementsModel[] = [];
  reminderPropertyManagements: reminderPropertyManagementsModel[] = [];
  visitReportPropertyManagements: visitReportPropertyManagementsModel[] = [];
}
class commentPropertyManagementsModel{
  id: number = 0;
  propertyManagement: number = 0;
  comment: string = "";
  createdBy: number = 0;
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
class userTypeModel{
  id: number = 0;
  type: string = "";
}
class documentPropertyManagementsModel {
  id: number = 0;
  propertyManagement: number = 0;
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
class documentReportIssuePropertyManagementsModel {
  id: number = 0;
  propertyManagement: number = 0;
  filePath: string = "";
  fileExtension: string = "";
  nameFile: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class photoBillPropertyManagementsModel {
  id:number = 0;
  propertyManagement:number = 0;
  photo: string = "";
  photoExtension: string = "";
  namePhoto: string = "";
  createdBy:number = 0;
  createdDate:Date;
  updateBy:number = 0;
  updatedDate:Date;
}
class photoInspectionPropertyManagementsModel {
  id: number = 0;
  propertyManagement: number = 0;
  photo: string = "";
  photoExtension: string = "";
  namePhoto: string = "";
  createdBy: number = 0;
  createdDate:Date;
  updateBy: number = 0;
  updatedDate:Date;
}
class photoMailPropertyManagementsModel {
  id:number = 0;
  propertyManagement:number = 0;
  photo:string = "";
  photoExtension:string = "";
  namePhoto:string = "";
  createdBy:number = 0;
  createdDate: Date;
  updateBy:number = 0;
  updatedDate: Date;
}
class photoPropertyManagementsModel {
  id: number = 0;
  propertyManagement: number = 0;
  photo: string = "";
  photoExtension: string = "";
  namePhoto: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class photoReportIssuePropertyManagementsModel {
  id:number = 0;
  propertyManagement:number = 0;
  photo: string ="";
  photoExtension: string ="";
  namePhoto: string ="";
  createdBy:number = 0;
  createdDate: Date;
  updateBy:number = 0;
  updatedDate: Date;
}
class reminderPropertyManagementsModel {
  id: number = 0;
  propertyManagement: number = 0;
  reminderDate: Date;
  reminderComments: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class visitReportPropertyManagementsModel {
  id: number = 0;
  propertyManagement: number = 0;
  visitReport: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class SingleComment {
  comment:string = '';
}
