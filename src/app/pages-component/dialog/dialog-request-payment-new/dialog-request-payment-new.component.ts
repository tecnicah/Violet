import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentRequestComponent } from '../dialog-document-request/dialog-document-request.component';
import { DialogDocumentRequestRecurrentComponent } from '../dialog-document-request-recurrent/dialog-document-request-recurrent.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import * as moment from 'moment';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-dialog-request-payment-new',
  templateUrl: './dialog-request-payment-new.component.html',
  styleUrls: ['./dialog-request-payment-new.component.scss']
})
export class DialogRequestPaymentNewComponent implements OnInit {

  constructor(private _permissions: NgxPermissionsService,public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  public __userlog__:any = JSON.parse( localStorage.getItem('userData') );
  public __loader__: LoaderComponent = new LoaderComponent();
  cr: string = "Comment";
  tabs: string = "req";
  user: any;
  data_: any = {
    status: 1,
    nextReminderDate: '',
    documentRequestPayments: [],
    commentRequestPayments: [],
    recurrenceRequestPayments: [],
    documentsPaymentConcept: [],
    payments: [],
    requestedPayments:{
      payments:[]
    }
  }
  ngOnInit(): void {
    const user_rol:string[] = [this.__userlog__.role.role];
    this._permissions.loadPermissions( user_rol );
    console.log("Data que recibe el modal: ", this.data);
    if (this.data.id != 0) {
      this.__loader__.showLoader();
      this._services.service_general_get('RequestPayment/GetRequestPaymentById?requestPaymentId=' + this.data.id).subscribe(async data => {
        if (data.success) {
          console.log('DATA CONSULTA DE REQUEST PAYMENT: ', data.result.value);
          this.data_ = data.result.value.requestPayment;
          this.data_.nextReminderDate = data.result.value.nextReminderDate;
          this.data_.documentsPaymentConcept = data.result.value.documentsPaymentConcept;
          this.data_.requestedPayments = data.result.value.requestedPayments;
          this.data_.payments = [];
          this.data.requestPayment = this.data_.id;
          console.log(this.data_);
          if(this.data_.recurrenceRequestPayments.length > 0){
            //this.data_.recurrencia = this.data_.recurrencePaymentConcepts[0].periodNavigation.recurrence;
            this.data_.endDate = this.data_.recurrenceRequestPayments[0].endDate;
          }
          this.__loader__.hideLoader();
        }
      });
    }
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.tabs = "req";
    this.__loader__.hideLoader();
    this.getCatalogos();
    this.consultaPermisos();
  }
  //*******************************************************************************************//
  public permission_read: boolean = false;
  public permission_write: boolean = false;
  public permission_delete: boolean = false;
  public permission_edit: boolean = false;
  consultaPermisos() {
    console.log("CONSULTA PARA PERMISOS DE USUARIO");
    let url = localStorage.getItem('url_permisos');
    this._services.service_general_get('Role/' + url).subscribe(data => {
      if (data.success) {
        console.log("Permisos: ", data.result.value)
        this.permission_read = data.result.value[0].reading;
        this.permission_write = data.result.value[0].writing;
        this.permission_edit = data.result.value[0].editing;
        this.permission_delete = data.result.value[0].deleting;
      }
    })
  }
  //**********************************************************************//
  //FUNCION PARA CONSULTA DE INFORMACION//
  ca_status = [];
  ca_document = [];
  ca_country = []
  async getCatalogos() {
    this.ca_status = await this._services.getCatalogueFrom('GetRequestPaymentStatus');
    this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    console.log("estatus: ", this.ca_status);
  }
  //**********************************************************************//
  //FUNCION PARA AGREGAR NUEVO DOCUMENTO//
  getDocument() {
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      data: {
        sr: this.data.sr
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log(result);
        result.requestPaymentId = this.data.id;
        this.data_.documentRequestPayments.push(result);
      }
    })
  }
  //**********************************************************************//
  //FUNCION PARA AGREGAR NUEVO COMENTARIO//
  addComment() {
    this.data_.commentRequestPayments.push({
      "id": 0,
      "requestPaymentId": this.data.id,
      "reply": '',
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.data_.commentRequestPayments.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }
  //**********************************************************************//
  //EDICION DE PAYMENT CONCEPT//
  editConcept(item, i) {
    item.type = 2, //service line
    item.supplierType = 3,
    item.new = true;
    item.operacion = 'edicion';
    item.requestPayment = this.data.requestPayment;
    console.log(item);
    const dialogRef = this._dialog.open(DialogPaymentConceptComponent, {
      data: item,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.data_.payments[i] = result;
      }
    })
  }
  //EDICION DEL CONCEPTO  ONLINE//
  editConceptBD(item, i) {
    item.type = 2, //service line
    item.supplierType = 3,
    item.new = true;
    item.operacion = 'edicion';
    item.serviceRecord = Number(this.data.sr);
    item.requestPayment = this.data.requestPayment;
    console.log(item);
    const dialogRef = this._dialog.open(DialogPaymentConceptComponent, {
      data: item,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.ngOnInit();
        //this.data_.requestedPayments.payments[i] = result;
      }
    })
  }
  //**********************************************************************//
  viewDocumentRequest(item) {
    item.sr = this.data.sr;
    console.log(item);
    const dialogRef = this._dialog.open(DialogDocumentRequestComponent, {
      data: item,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }
  //**********************************************************************//
  //FUNCION PARA AGREGAR LA RECURRENCIA//
  viewRecurrent() {
    localStorage.setItem('month', '5');
    const dialogRef = this._dialog.open(DialogDocumentRequestRecurrentComponent, {
      width: "35%",
      data: this.data_.recurrenceRequestPayments[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("recurrencia: ", result);
      if (result.success) {
        let fechas = [];
        var fecha1 = moment(result.startDate);
        this.data_.endDate = result.endDate;
        this.data_.recurrencia = result.periodName;
        //if(result.day == undefined){ result.day = 1 }
        if(result.period == 5){ result.type_period = 'month' }
        if(result.period == 4){ result.type_period = 'week' }
        fechas.push({
          "id": 0,
          "requestPayment": this.data.id,
          "repeatEvery": result.repeatEvery,
          "period": result.period,
          "startDate": result.startDate,
          "never": result.never,
          "date": result.date,
          "endDate": result.endDate,
          "success": result.success,
          "createdBy": result.createdBy,
          "createdDate": result.createdDate,
          "updatedBy": result.updatedBy,
          "updatedDate": result.updatedDate,
          "nextDateReminder": new Date(fecha1.add(result.repeatEvery, result.type_period).toString()),
        });

        this.data_.nextReminderDate = fechas[0].nextDateReminder;
       
        console.log('fechas: ', fechas)
        this.data_.recurrenceRequestPayments = fechas;
      }
    })
  }
  //**********************************************************************//
  //FUNCION PARA AGREGAR NUEVO CONCEPTO DE PAGO//
  addNewConcept() {
    if(this.data.supplierType == undefined){ this.data.supplierType = 3}
    if(this.data.type == undefined){ this.data.type = 2}
    let data_ = {
      serviceRecord: Number(this.data.sr),
      id: 0,
      type: this.data.type, //service line
      supplierType: this.data.supplierType,
      new: true,
      service: this.data.service,
      workOrder: this.data.workOrder,
      workOrderServices: this.data.workOrderServices,
      requestPayment:this.data.requestPayment
    }

    const dialogRef = this._dialog.open(DialogPaymentConceptComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        result.requestPayment = this.data.id;
        this.data_.payments.push(result);
        console.log(this.data_);
      }
    })
  }
  //**********************************************************************//
  public showTabSelected(which_tab: string, event_data: any): void {

    console.log('Tab selected ===> ', which_tab);

    this.tabs = which_tab;

    if (which_tab == 'req') {

    }

    if (which_tab == 'con') {

    }

    const tab_selected: any = document.getElementById(`tab_${which_tab}`),
      tab_parent: any = tab_selected.parentElement.children,
      event: any = event_data.target,
      tabs_container: any = document.getElementById('tabs');

    for (let index = 0; index < tab_parent.length; index += 1) {

      tab_parent[index].classList.add('display-none');
      tabs_container.children[index].classList.remove('page__section-tab--active');
      tabs_container.children[index].id = "0";

    }

    tab_selected.classList.remove('display-none');
    event.classList.add('page__section-tab--active');
    event.id = "active-tab";

  }
  //**********************************************************************//
  save() {
    if (!this.data.id) {
      this.insertDB();
    } else {
      this.updateBD();
    }
  }
  //**********************************************************************//
  //POST EN BASE DE DATOS
  insertDB() {
    this.__loader__.showLoader();
    this.data_.id = 0;
    this.data_.title = null;
    this.data_.country = null;
    this.data_.city = null;
    this.data_.urgent = null;
    this.data_.createdBy = this.user.id;
    this.data_.createdDate = new Date(),
    this.data_.updatedBy = this.user.id;
    this.data_.updatedDate = new Date();
    this.data_.workOrderServicesId = this.data_.payments[0].workPayment;
    console.log(this.data_);
    console.log(JSON.stringify(this.data_));

    this._services.service_general_post_with_url("RequestPayment/PostRequestPayment", this.data_).subscribe((data => {
      if (data.success) {
        console.log('request payment', data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Save Data"
          },
          width: "350px"
        });
        //this.dialogRef.close();
        this.__loader__.hideLoader();
        this.dialogRef.close();
      }
    }),(err)=>{
      console.log(err);
      this.__loader__.hideLoader();
    })
  }
  //**********************************************************************//
  //UPDATE DATA//
  updateBD() {
    this.__loader__.showLoader();
    this.data_.updatedBy = this.user.id;
    this.data_.updatedDate = new Date();
    this.data_.workOrderServicesId = this.data_.workOrderServicesId;
    let documentos = this.data_.documentRequestPayments;
    this.data_.documentRequestPayments = [];
    documentos.forEach(E => {
      if (E.id == 0) {
        this.data_.documentRequestPayments.push(E);
      }
    });

    let comment;
    for(let i = 0; i < this.data_.payments.length; i++){
      comment = this.data_.payments[i].commentPaymentConcepts;
      for(let j = 0; j < comment.length; j++){
        if(comment[j].user){
          comment[j].user.profileUsers = null;
        }
      }
    }

    console.log(this.data_);
    console.log(JSON.stringify(this.data_));
    this._services.service_general_put("RequestPayment/PutRequestPayment", this.data_).subscribe((data => {
      if (data.success) {
        console.log('request payment', data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated Data"
          },
          width: "350px"
        });
        //this.dialogRef.close();
        this.__loader__.hideLoader();
        this.dialogRef.close();
      }
    }),(err)=>{
      console.log(err);
      this.__loader__.hideLoader()
    })
  }
  //**********************************************************************//
  //CITY ORIGIN//
  getNameCountry(id){
    for (let i = 0; i < this.ca_country.length; i++) {
      if(this.ca_country[i].id == id){
        return this.ca_country[i].name;
      }
    }
  }
  //**********************************************************************//
  //DOCUMENT TYPE//
  getNameDocument(id){
    for (let i = 0; i < this.ca_document.length; i++) {
      if(this.ca_document[i].id == id){
        return this.ca_document[i].documentType;
      }
    }
    return id;
  }
  //**********************************************************************//
  //DELETE PAYMENT CONCEPT (ON DATABASE)//
  deletePaymentConcept(data) {
    console.log(data);
    debugger
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
              this.ngOnInit();
            }
          }))
      }
    })
  }
  //**********************************************************************//
  //DELETE PATMENT CONCEPT (NO DATABASE)//
  deletePaymentConcept_(data, i) {
    console.log(data);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this payment concept"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_.payments.splice(i, 1);
      }
    })
  }
}
