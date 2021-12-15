import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { async } from 'rxjs/internal/scheduler/async';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { LoaderComponent } from 'app/shared/loader';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogHousingSpecificationsComponent } from '../dialog-housing-specifications/dialog-housing-specifications.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { stringify } from '@angular/compiler/src/util';





@Component({
  selector: 'app-dialog-temporary-housing',
  templateUrl: './dialog-temporary-housing.component.html',
  styleUrls: ['./dialog-temporary-housing.component.scss']
})
export class DialogTemporaryHousingComponent implements OnInit {
  // variables
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  calculo: any = {};
  payments: any[] = [];
  document: any[] = [];
  user:any;
  cr: string = "Reply";
  minDate: Date = new Date();
  // housing list
  showPanelHousing:Boolean = false;
  displayedColumnsPayment: string[] = ['Payment','Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence','action'];
  serviceScope : any[] = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}


  public user_data:any = JSON.parse(localStorage.getItem('userData'));
  public image_path:string = this._services.url_images;
  public __loader__:LoaderComponent = new LoaderComponent();
  public today_date:Date = new Date();

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userData"));
  
    this.initPageApp();

  }
  getURLAvatar(url: string, avatar: string) {
    var urlAvatar = url + "" + avatar;
    console.log(urlAvatar);
    return urlAvatar;
  }
  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.housing_model.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
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

  public initPageApp():void {

    this.requestHousingData();
    this.getCatalogos();

  }

  public housing_model:HousingModel = new HousingModel();
  public requestHousingData():void {

    this.__loader__.showLoader();

    this._services.service_general_get(`RelocationServices/GetTemporaryHousingCoordinatonById?id=${ this.data.sr_id }`)
        .subscribe( (response:any) => {

          console.log('Res GetTemporaryHousingCoordinatonById => ', response);

          if( response.success ) {

            this.housing_model = response.result;
            this.addReply();
            this.get_supplierPartner();
            this.housing_model.sr = this.data.app_id;
            if( this.housing_model.bathrooms != null ) this.housing_model.bathrooms = this.housing_model.bathrooms.toString();
            if (this.housing_model.bedrooms != null) this.housing_model.bedrooms = this.housing_model.bedrooms.toString();

            if( this.housing_model.stayExtensionTemporaryHousings.length != 0 ) {
                this.active = true;
              //this.toggleStaySection();

            }

            this.get_payment();
            this.getDataHousing();
            this.getServiceScope();
            this.housing_model.type_housing = 1;
            console.log('this.housing_model ==> ', this.housing_model);

          }

          this.__loader__.hideLoader();

        }, (error:any) => {

          console.error('Error (GetTemporaryHousingCoordinatonById) => ', error);

          this.__loader__.hideLoader();

        });

  }

   //**CONSULTA SUPPLIER PARTNER**//
   get_supplierPartner(){
    this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=5").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.services_catalogue = data.result.value;
        this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=9").subscribe((data => {
          console.log(data);
          if (data.success) {
            let suppliers = data.result.value;
            suppliers.forEach(element => {
              this.services_catalogue.push(element);
            });
          }
        }));
      }
    }));
    
  }
  /*General Stuff*/
  public payments_table_data:any = undefined;
  public payments_table_fields:string[] = ['cam_0','cam_1','cam_2','cam_3','cam_4','cam_5','cam_6','cam_7'];
  public is_any_payment:boolean = false;
  public requestPaymentsData():void {

    this._services.service_general_get(
      `RequestPayment/GetRequestPayments?WorkOrderServicesId=${ this.housing_model.workOrderServicesId }`
      ).subscribe( (response:any) => {

        console.log('Payments data ====> ', response.result);

        if( response.success ) {

          this.payments_table_data = new MatTableDataSource( response.result );

          if( response.result.length != 0 ) this.is_any_payment = true;

        }

      }, (error:any) => {

        console.error('Error (RequestPayment) => ', error);

      });

  }

  public requestPayment( data:any = null ):void {

    if(data == null){

      data = {
         WorkOrderServicesId: this.housing_model.workOrderServicesId,
         id: 0
      }

    }

    const dialogRef = this._dialog.open(DialogRequestPaymentComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {

      this.initPageApp();

    });

  }
  //++++++++ consulta payment
  get_payment() {
    console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.housing_model.workOrderServicesId).subscribe((data => {
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
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(data) {
    console.log('workOrderServicesId', this.housing_model.workOrderServicesId);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.housing_model.workOrderServicesId,
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

  AddDocument(){
    // this.data.sr = this.data.app_id;
    this.data.typeDocument = 1;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        result.temporaryHousingCoordinationId = this.housing_model.id;
         this.document.push(result);
         console.log(this.document);
      }
    });
  }


  public addNewReminder():void {
    const reminder_model:ReminderTemporaryHousingCoordinatonsModel = new ReminderTemporaryHousingCoordinatonsModel();

    reminder_model.createdBy = this.user_data.id;
    reminder_model.createdDate = new Date();
    reminder_model.temporaryHousingCoordinationId = this.housing_model.id;

    this.housing_model.reminderTemporaryHousingCoordinatons.push( reminder_model );

  }
  // DeleteOnline(id) {

  //   const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
  //     data: {
  //       header: "Delete confirmation",
  //       body: "Are you sure to delete this document?"
  //     },
  //     width: "350px"
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this._services.service_general_delete("RelocationServices/DeleteDocumentTHC?id=" + id).subscribe((data => {
  //         if (data.success) {
  //           const dialog = this._dialog.open(DialogGeneralMessageComponent, {
  //             data: {
  //               header: "Success",
  //               body: data.result
  //             },
  //             width: "350px"
  //           });
  //           this.ngOnInit();
  //         }
  //       }))
  //     }

  //   });

  // }
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
          this._services.service_general_delete("RelocationServices/DeleteDocumentTHC?id=" + id).subscribe((data => {
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


  public deleteReminderSelected( reminder:ReminderTemporaryHousingCoordinatonsModel, index:number ):void {

    if( reminder.id == 0 ) {

      this.housing_model.reminderTemporaryHousingCoordinatons.splice(index, 1)

    } else {

      this.__loader__.showLoader();

      this._services.service_general_delete(`RelocationServices/DeleteReminderTHC?id=${ reminder.id }`)
          .subscribe( (response:any) => {

            console.log('Res ==> ', response);

            if( response.success ) {

              const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Reminder Deleted",
                  body: "Reminder has been deleted successfully."
                }
              });

              this.initPageApp();

            }

          }, (error:any) => {

            console.error('Error (DeleteReminderTHC) => ', error);

          });

    }

  }

  public deleteExtension(extention, i){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete extension?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
        if (result) {
          this.housing_model.stayExtensionTemporaryHousings.splice(i, 1);
        }
      })
  }


  public addExtention():void {
    /*
    const new_extention:ExtensionTemporaryHousingCoordinatonsModel = new ExtensionTemporaryHousingCoordinatonsModel();
    new_extention.temporaryHousingCoordinationId = this.housing_model.id;
    new_extention.createdBy = this.user_data.id;
    new_extention.createdDate = new Date();
    new_extention.updateBy = this.user_data.id;
    new_extention.updatedDate = new Date();
    this.housing_model.stayExtensionTemporaryHousings.push( new_extention );
    */
   this.housing_model.stayExtensionTemporaryHousings.push({
    "id": 0,
    "temporaryHousingCoordinationId": this.housing_model.id,
    "initialDate": null,
    "finalDate": null,
    "extraDays": 0,
    "totalDays": 0,
    "comment": "",
    "createdBy": this.user_data.id,
    "createdDate": new Date(),
    "updateBy": this.user_data.id,
    "updatedDate": new Date()
   })
  }

  public comment_string:SingleComment = new SingleComment();
  public addNewComment():void {

    const new_comment:CommentTemporaryHosuingsModel = new CommentTemporaryHosuingsModel();

    new_comment.reply = this.comment_string.comment;
    new_comment.createdBy = this.user_data.id;
    new_comment.createdDate = this.today_date;
    new_comment.temporaryHousingCoordinationId = this.housing_model.id;
    new_comment.userId = this.user_data.id;
    new_comment.user = this.user_data;

    this.housing_model.commentTemporaryHosuings.push( new_comment );

    this.comment_string.comment = '';

  }

  save_data(){
    console.log("Informacion a guardar:  ",this.housing_model);
    this.housing_model.updateBy = this.user.id;
    this.housing_model.documentTemporaryHousingCoordinatons = this.document;
    this.housing_model.updatedDate = new Date();
    debugger;
    this.housing_model.serviceCompletionDate = this.housing_model.statusId == "4"
      ? this.housing_model.serviceCompletionDate != null ? this.housing_model.serviceCompletionDate : new Date()
      : null ;
    let data_comment_aux = this.housing_model.commentTemporaryHosuings;
    this.housing_model.commentTemporaryHosuings = [];
    for(let i = 0; i < data_comment_aux.length; i++){
      if(data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != ''){
        this.housing_model.commentTemporaryHosuings.push(data_comment_aux[i]);
      }
    }

    this._services.service_general_put("RelocationServices/PutTemporaryHousingCoordinaton", this.housing_model).subscribe((data => {
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

  //**********************************************************************************//
  //HOUSINGS//
  dataSourceHousing:any[] = [];
  displayedColumnsHousing: string[] = ['Supplier Partner','Supplier','Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Status', 'Actions'];

  //***********************************************************************************//
  //DATA TABLE HOUSING//
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key='+Number(this.data.data.workOrderId)).subscribe((data_housing => {
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ',data_housing);
        this.dataSourceHousing = data_housing.message;
      }
    }));
  }


  HousingSpecs(){
    debugger;
    const dialogRef = this._dialog.open(DialogHousingSpecificationsComponent, {
      data: this.housing_model,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
      }
    })
  }
  //NEW RECORD//
  HomeDetailsnew() {
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        /*
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName:  this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId : this.data.data.serviceTypeId,
        sr: this.data.sr
        */
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.housing_model.workOrderServicesId,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName:  this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId : this.data.data.serviceTypeId,
        sr: this.data.sr,
        supplierType: 5
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //EDIT HOUSING//
  editHousing(data) {
    /*
    data.sr = this.data.sr;
    data.numberWorkOrder = this.data.data.numberWorkOrder;
    data.serviceID =  this.data.data.number_server;
    data.serviceName = this.data.data.service_name;
    */
    data.supplierType = 3
    data.workOrderServicesId = this.housing_model.workOrderServicesId,
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


  public viewHomeDetails():void {

    const dialogRef = this._dialog.open(DialogHomeDetailsComponent,{
      data: {
        id: 0,
        workOrder: this.data.data.workOrderId,//this.area_orientation.workOrderServicesId,
        service: this.data.data.serviceRecordId,
        serviceTypeId : this.data.data.serviceTypeId,
        sr: this.data.sr
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })

  }
  /******************************************** */

  /* Utilities */
  public status_catalogue:any[] = [];
  public country_catalogue: any = [];
  public currency_catalogue:any = [];
  public duration_catalogue:any = [];
  public services_catalogue:any = [];
  public responsable_catalogue:any = [];
  public reservation_catalogue:any = [];
  public ca_privacy = [];
  public documentType:any = [];
  public async getCatalogos() {

    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    //this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=17").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.status_catalogue = data.result;
      }
    }));
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.currency_catalogue = await this._services.getCatalogueFrom('GetCurrency');
    this.duration_catalogue = await this._services.getCatalogueFrom('GetDuration');
    //this.services_catalogue = await this._services.getCatalogueFrom('GetSupplierBySupplierType?key=1');
    this.responsable_catalogue = await this._services.getCatalogueFrom(`GetDependents?sr=${ this.data.app_id }`);
    this.reservation_catalogue = await this._services.getCatalogueFrom('GetReservationType');
    //this.documentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.documentType = data.result;
      }
    }))
  }

  public getValueFromCatalogue( catalogue:[], id_to_find:any, get_field:string ):string {

    let result:string = '';

    catalogue.forEach( (item:any) => {

      if( item.id == id_to_find || item.dependentId == id_to_find ) {

        result = item[get_field];

      }

    });

    return result;

  }
  // getNameDocument(id_to_find){
  //   return this.getValueFromCatalogue( this.documentType , id_to_find, 'documentType' );
  // }
  //GET DOCUMENT TYPE NAME//
  getDocumentTypeName(id) {
    for(let i = 0; i < this.documentType.length; i++){
      if(this.documentType[i].id == id){
         return this.documentType[i].documentType;
      }
    }
   }


   //**METHODS COMMENTS (NEW)**//
  addReply() {
    console.log(this.user);
    this.housing_model.commentTemporaryHosuings.push({
      "id": 0,
      "temporaryHousingCoordinationId": this.housing_model.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.housing_model.commentTemporaryHosuings.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }


  // public getDocumentCountryOrigin( id_to_find:number ):string {

  //   return this.getValueFromCatalogue( this.country_catalogue , id_to_find, 'name' );

  // }
  //GET COUNTRY ORIGIN NAME//
  getCountryOriginName(id){
    for(let i = 0; i < this.country_catalogue.length; i++){
      if(this.country_catalogue[i].id == id){
         return this.country_catalogue[i].name;
      }
    }
  }

  public getDaysBetweenDatesStaticField( model:any, fields_in:string[] ,field_to_append:any ):void {

    const date_one:Date = new Date( model[fields_in[0]] ),
      date_two:Date = new Date( model[fields_in[1]] ),
      difference_in_time:any = date_two.getTime() - date_one.getTime(),
      difference_in_days:any = difference_in_time / (1000 * 3600 * 24),
      days_container:any = document.getElementById( field_to_append );
      this.housing_model.totalDays = difference_in_days;
      console.log("HOUSING MODAL: ", this.housing_model);
    if(
      !isNaN( difference_in_days ) &&
      model[fields_in[0]] != '' && model[fields_in[0]] != null &&
      model[fields_in[1]] != '' && model[fields_in[1]] != null) {

      days_container.value = difference_in_days;
      this.housing_model.stayExtensionTemporaryHousings[field_to_append].totalDays = difference_in_days;

    }

  }

  public toggle_stay_section:boolean = false;
  public active:boolean = false;
  public toggleStaySection(e):void {
         console.log(e);
         if(e.checked){
          this.active = true;
         }else{
          this.active = false;
         }

  }

  public hideModal(): void {

    this.dialogRef.close();

  }

  public showDocumentDialogDetails( document:any, service_line:number = undefined ):void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
        width: "95%",
        data: {
          sr_id: this.data.sr,
          document: document,
          name_section: "only_one_service",
          sl:1
        }
      });
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


class HousingModel {
  id:number = 0;
  sr:any = undefined;
  coordination:boolean = false;
  serviceOrderServicesId:number = 0;
  authoDate:string = '';
  authoAcceptanceDate:string = '';
  statusId:string = '';
  serviceCompletionDate:Date = null;
  apartment:boolean = false;
  house:boolean = false;
  bedrooms:string = '';
  bathrooms:string = '';
  propertyNo:string = '';
  petFrindly: boolean = false;
  totalAllotedDaysStart = null;
  totalAllotedDaysEnd = null;
  totalTimeAllowed:string = '';
  totalTimeAllowedId:string = '';
  type_housing:number = 1;
  budget:string = '';
  currency:string = '';
  paymentResponsibilty:string = '';
  paymentsDue:number = 0;
  reservationType:string = '';
  supplierPartner:string = '';
  propertyAddress:string = '';
  neighborhood:string = '';
  finalReservationAmount:string = '';
  currencyFinalReservationAmount:string = '';
  checkIn:string = '';
  checkOut:string = '';
  securityDeposit:string = '';
  curencySecurityDeposit:string = '';
  paymentsDate:string = '';
  totalDays:string = '';
  workOrderServicesId:number = 0;
  extension:boolean = false;
  comments:string = '';
  createdBy:number = 0;
  createdDate:Date;
  updateBy:string = '';
  updatedDate:Date;
  clientSecurityInspectionRequired:boolean = false;
  curencySecurityDepositNavigation:CurencySecurityDepositNavigation = undefined;
  currencyFinalReservationAmountNavigation:CurencySecurityDepositNavigation = undefined;
  currencyNavigation:CurencySecurityDepositNavigation = undefined;
  reservationTypeNavigation:ReservationTypeNavigation = undefined;
  status:StatusModel = undefined;
  supplierPartnerNavigation:SupplierPartnerNavigationModel = undefined;
  totalTimeAllowedNavigation:TotalTimeAllowedNavigationModel = undefined;
  documentTemporaryHousingCoordinatons:DocumentTemporaryHousingCoordinatonsModel[] = [];
  extensionTemporaryHousingCoordinatons:any[] = [];
  stayExtensionTemporaryHousings:ExtensionTemporaryHousingCoordinatonsModel[] = [];
  reminderTemporaryHousingCoordinatons:ReminderTemporaryHousingCoordinatonsModel[] = [];
  commentTemporaryHosuings:CommentTemporaryHosuingsModel[] = [];
}

class CommentTemporaryHosuingsModel {
  id:number = 0;
  temporaryHousingCoordinationId:number = 0;
  reply:string = '';
  userId:number = 0;
  createdBy:number = 0;
  createdDate:Date = undefined;
  updateBy:number = 0;
  updatedDate: Date = undefined;
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

class CurencySecurityDepositNavigation {
  id:number = 0;
  currency:string = '';
}

class ReservationTypeNavigation {
  id:number = 0;
  reservationType:string = '';
  createdBy:number = 0;
  createdDate:string = '';
  updateBy:number = 0;
  updatedDate:string = '';
  temporaryHousingCoordinatons:any[] = [];
}

class StatusModel {
  id:number = 0;
  status:string = '';
}

class SupplierPartnerNavigationModel {
  id:number = 0;
  supplier:string = '';
  userId:number = 0;
  supplierType:string = '';
  createdBy:number = 0;
  createdDate:string = '';
  updateBy:number = 0;
  updatedDate:string = '';
}

class TotalTimeAllowedNavigationModel {
  id:number = 0;
  duration:string = '';
  createdBy:number = 0;
  createdDate:string = '';
  updatedBy:number = 0;
  updateDate:string = '';
}

class DocumentTemporaryHousingCoordinatonsModel {


  id:number;
  fileName:string = '';
  fileRequest:string = '';
  fileExtension:string = '';
  documentType:number;
  relationship:number;
  issueDate:Date;
  expirationDate:Date;
  issuingAuthority:string = '';
  countryOrigin:number;
  comment:string = '';
  temporaryHousingCoordinationId:number;
  createdBy:number ;
  createdDate: Date;
  // updatedDate:Date;
  // local:boolean = false;
  countryOriginNavigation:CountryOriginNavigationModel = new CountryOriginNavigationModel();
}

class CountryOriginNavigationModel {
  id:number = 0;
  name:string = '';
  sortname:string = '';
  phonecode:string = '';
}

class ExtensionTemporaryHousingCoordinatonsModel {
  id:number = 0;
  temporaryHousingCoordinationId:number = 0;
  initialDate:string = '';
  finalDate: string = '';
  extraDays: number = 0;
  totalDays: number = 0;
  comment:string = '';
  createdBy:number = 0;
  createdDate:Date = undefined;
  updateBy:number = 0;
  updatedDate:Date = undefined;
}

class ReminderTemporaryHousingCoordinatonsModel {
  id:number = 0;
  temporaryHousingCoordinationId:number = 0;
  reminderDate:string = '';
  reminderComments:string = '';
  createdBy:number = 0;
  createdDate:Date = undefined;
  updateBy:number = 0;
  updatedDate: string = '';
}

class SingleComment {
  comment:string = '';
}
