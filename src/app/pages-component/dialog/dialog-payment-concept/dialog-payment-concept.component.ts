import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogWireTransferComponent } from '../dialog-wire-transfer/dialog-wire-transfer.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogDocumentRequestRecurrentComponent } from '../dialog-document-request-recurrent/dialog-document-request-recurrent.component';
import * as moment from 'moment';
import { LoaderComponent } from 'app/shared/loader';
import { DialogAdditionalExpensesComponent } from '../dialog-additional-expenses/dialog-additional-expenses.component';

@Component({
  selector: 'app-dialog-payment-concept',
  templateUrl: './dialog-payment-concept.component.html',
  styleUrls: ['./dialog-payment-concept.component.scss']
})
export class DialogPaymentConceptComponent implements OnInit {

  info: any = {};
  infomain: any = {};
  table_related: any[] = [];
  user: any;
  paymentM = [];
  wireT = [];
  cr: string = "Comment";
  related_payment = [];
  nextDateReminder:any;

  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
      this._services.service_general_get('RequestPayment/GetPaymentConceptById?paymentConcept=' + this.data.id).subscribe(async data => {
        if (data.success) {
          data.result.requestPayment = this.data.requestPayment;
          data.result.type = this.data.type;
          data.result.supplierType = this.data.supplierType;
          console.log('DATA CONSULTA: ', data.result);
          this.data = data.result;
          await this.catalogos();
          await this._supplier();
          await this.getFee();
          this.__loader__.hideLoader();
          if (this.data.recurrencePaymentConcepts.length > 0) {
            this.data.recurrencia = this.data.recurrencePaymentConcepts[0].periodNavigation.recurrence;
            this.data.endDate = this.data.recurrencePaymentConcepts[0].endDate;
            var fecha1 = moment(this.data.recurrencePaymentConcepts[0].startDate);
            if(this.data.recurrencePaymentConcepts[0].period == 5){
              this.nextDateReminder = new Date(fecha1.add(this.data.recurrencePaymentConcepts[0].repeatEvery, 'month').toString());
            }
            if(this.data.recurrencePaymentConcepts[0].period == 4){
              this.nextDateReminder = new Date(fecha1.add(this.data.recurrencePaymentConcepts[0].repeatEvery, 'week').toString());
            }
            console.log(this.nextDateReminder);
          }
          if (this.data.recurrencePaymentConcepts.length > 0 && this.data.recurrencia == null && this.data.recurrencia == undefined) {
            this.data.recurrencia = this.data.recurrencePaymentConcepts[0].periodNavigation.duration;
          }
          
          this._services.service_general_get('RequestPayment/GetPaymentsRelated?requestPaymentId=' + this.data.requestPayment).subscribe(async data_related => {
            if (data_related.success) {
              this.related_payment = data_related.result.value;
              console.log("related: ", this.related_payment);
            }
          })

          
        }
      });
    } else {
      this.data.endDate = null;
      this.data.recurrencia = 'choice';
      if (!this.data.commentPaymentConcepts) {
        this.data.commentPaymentConcepts = [];
      }
      if (!this.data.recurrencePaymentConcepts) {
        this.data.recurrencePaymentConcepts = [

        ];
      }
      this.__loader__.hideLoader();
      this.catalogos();
      this.getFee();
    }
  }
  //********************************************************************//
  public ca_serviceRecord = [];
  public ca_currency = [];
  public ca_payment = [];
  public ca_account = [];
  public ca_status = [];
  public ca_day = [];
  async catalogos() {
    this.ca_day = await this._services.getCatalogueFrom('GetDay');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_payment = await this._services.getCatalogueFrom('GetPaymentMethod');
    this.ca_account = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_status = await this._services.getCatalogueFrom('GetRequestPaymentStatus');
    this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe(async data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_serviceRecord = data.result;
        await this.get_Work_Order();
        await this.get_Serice_by_WO();
        await this.supplierPartner();
      }
    });
  }
  //********************************************************************//
  ca_fee = [];
  getFee(){
    if(this.data.requestPayment==null && this.data.requestPayment=='' && this.data.requestPayment==undefined){
      return true
    }
    this._services.service_general_get('RequestPayment/GetFees?requestPaymentId=' + this.data.requestPayment).subscribe(async data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_fee = data.result.value;
      }
    });
  }
  //********************************************************************//
  //SET FEE//
  setFee(_data){
    this.data.managementFee = _data.managementFee;
    this.data.currencyManagementFee = _data.currencyManagementFee;
    this.data.wireFee = _data.wireFee;
    this.data.currencyWireFee = _data.currencyWireFee;
    this.data.advenceFee = _data.advenceFee;
    this.data.currencyAdvanceFee = _data.currencyAdvanceFee;
  }
  //********************************************************************//
  public ca_workOrder = [];
  get_Work_Order() {
    this._services.service_general_get('Catalogue/GetworkOrder/' + this.data.serviceRecord).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_workOrder = data.result.value;
      }
    }));
  }
  //********************************************************************//
  public ca_service_by_wo = [];
  get_Serice_by_WO() {
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data.workOrder).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_service_by_wo = data.result.value;
        if (this.data.id != 0) { this.getServiceId() }
      }
    }));
  }
  //********************************************************************//
  getServiceId() {
    console.log(this.data.service);
    console.log(this.ca_service_by_wo);
    for (let i = 0; i < this.ca_service_by_wo.length; i++) {
      if (this.ca_service_by_wo[i].id == this.data.service) {
        this.data.workPayment = this.ca_service_by_wo[i].service;
      }
    }
    this.data.workOrderServices = this.data.workPayment;
  }
  //********************************************************************//
  addWireTransfer() {
    const dialogRef = this._dialog.open(DialogWireTransferComponent, {
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        if (!this.data.wireTransferPaymentConcepts) {
          this.data.wireTransferPaymentConcepts = []
        }
        result.id = 0;
        result.paymentConcept = this.data.id;
        this.data.wireTransferPaymentConcepts.push(result)
        debugger
      }
    })
  }
  //********************************************************************//
  editWireTransfer(data_, i) {
    const dialogRef = this._dialog.open(DialogWireTransferComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data.wireTransferPaymentConcepts[i] = result;
      }
    })
  }
  //********************************************************************//
  public temporalDocument = [];
  addDocument() {
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "95%",
      data: { sr: this.data.serviceRecord }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.paymentConcept = this.data.id;
        this.temporalDocument.push(result);
      }
    });
  }
  //********************************************************************//
  public ca_supplierPartner = [];
  supplierPartner() {
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=" + this.data.workOrderServices + "&supplierType=" + this.data.supplierType + "&serviceLine=" + this.data.type).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER PARTNER: ', data.result.value);
        this.ca_supplierPartner = data.result.value;
        this.getInfo();
      }
    }), (err) => {
      console.log("no se realizo la consulta por falta de parametro");
    });
  }
  //********************************************************************//
  public ca_supplier = [];
  _supplier() {
    this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierPartner=" + this.data.supplierPartner + "&supplierType=" + this.data.supplierType).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER: ', data.result.value);
        this.ca_supplier = data.result.value;
        this.getInfoMain();
        if (this.data.id != 0) { this.getPaymentSupplier(); }
      }
    }), (err) => {
      console.log("No se realizo la consulta por falta de parametros");
    });
  }
  //********************************************************************//
  getPaymentSupplier() {
    this.ca_supplier.forEach(E => {
      if (E.id == this.data.supplier) {
        this.paymentM = E.paymentMethods;
      }
    });
  }
  //********************************************************************//
  addReply() {
    console.log(this.user);
    this.data.commentPaymentConcepts.push({
      "id": 0,
      "paymentConcept": this.data.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.data.commentPaymentConcepts.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }
  //********************************************************************//
  addRecurrencia() {
    if (!this.data.recurrencePaymentConcepts) {
      this.data.recurrencePaymentConcepts = [];
    }
    const dialogRef = this._dialog.open(DialogDocumentRequestRecurrentComponent, {
      width: "35%",
      data: this.data.recurrencePaymentConcepts[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        let fechas = [];
        var fecha1 = moment(result.createdDate);
        if(result.day == undefined){ result.day = 1 }
        if(result.period == 5){ result.type_period = 'month' }
        if(result.period == 4){ result.type_period = 'week' }
        this.data.endDate = result.endDate;
        this.data.recurrencia = result.periodName;
        if(result.day == undefined){ result.day = 1 }
        fechas.push({
          id: 0,
          paymentConcept: this.data.id,
          repeatEvery: result.repeatEvery,
          period: result.period,
          startDate: result.startDate,
          date: result.date,
          day: result.day,
          nextDateReminder: new Date(fecha1.add(result.repeatEvery, result.type_period).toString()),
          endDate: result.endDate,
          periodName: result.periodName,
          success: result.success,
          createdBy: result.createdBy,
          createdDate: result.createdDate,
          updatedBy: result.updatedBy,
          updatedDate: result.updatedDate,
          repeatThe: result.repeatThe,
          repeatThePaymentConcepts: [{ "recurrence": 0, "day": result.day }],
        });
       
        console.log('fechas: ', fechas)
        this.nextDateReminder = fechas[0].nextDateReminder;
        this.data.recurrencePaymentConcepts = fechas;
      }
    });
  }
  //********************************************************************//
  //CONSULTA DE INFORMACION PARA SUPPLIER PARTNER (COMPANY)//
  getInfo() {
    for (let i = 0; i < this.ca_supplierPartner.length; i++) {
      if (this.ca_supplierPartner[i].id == this.data.supplierPartner) {
        this.info = this.ca_supplierPartner[i];
        this.wireT = this.ca_supplierPartner[i].wireTransfer;
        console.log(this.info);
      }
    }
  }
  //********************************************************************//
  //CONSULTA DE INFORMACION PARA SUPPLIER//
  getInfoMain() {
    for (let i = 0; i < this.ca_supplier.length; i++) {
      if (this.ca_supplier[i].id == this.data.supplier) {
        this.infomain = this.ca_supplier[i];
        console.log(this.infomain);
      }
    }
  }
  //********************************************************************//
  get_account(id) {
    for (let i = 0; i < this.ca_account.length; i++) {
      if (this.ca_account[i].id == id) {
        return this.ca_account[i].accountType;
      }
    }
    return id;
  }
  //********************************************************************//
  guardar_informacion() {
    /*
    if(this.data.id == 0 && !this.data.requestPayment){
      this.save();
    }else if(this.data.id != 0 &&  !this.data.requestPayment){
      this.update();
    } else if(this.data.id == 0 && this.data.requestPayment){
      if(!this.data.documentPaymentConcepts){ this.data.documentPaymentConcepts = [] }
      for (let i = 0; i < this.temporalDocument.length; i++) {
        this.data.documentPaymentConcepts.push(this.temporalDocument[i]);
      }
      this.data.success  = true;
      console.log("este es el objeto que se ira a request payment: ", this.data);
      this.__loader__.hideLoader();
      this.dialogRef.close(this.data);
    }else if(this.data.id != 0 && this.data.requestPayment){
      this.data.documentPaymentConcepts.push(this.temporalDocument);
      this.data.success  = true;
      console.log("este es el objeto que se ira a request payment: ", this.data);
      this.__loader__.hideLoader();
      this.dialogRef.close(this.data);
    }
    */
    if (this.data.id == 0) {
      this.save();
    } else if (this.data.id != 0) {
      this.update();
    }
  }
  //********************************************************************//
  save() {
    this.__loader__.showLoader();
    this.data.createdBy = this.user.id;
    this.data.createdDate = new Date();
    this.data.documentPaymentConcepts = this.temporalDocument;
    if (this.wireT.length > 0) {
      for (let i = 0; i < this.wireT.length; i++) {
        if (!this.data.wireTransferServicePaymentConcepts) {
          this.data.wireTransferServicePaymentConcepts = [];
        }
        this.data.wireTransferServicePaymentConcepts.push({
          "paymentConcept": 0,
          "wireTransferService": this.wireT[i].id
        })
      }
    }

    let data_comment_aux = this.data.commentPaymentConcepts;
    this.data.commentPaymentConcepts = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.data.commentPaymentConcepts.push(data_comment_aux[i]);
      }
    }
    console.log("informacion a guardar: ", this.data);

    if (!this.data.new) {
      this._services.service_general_post_with_url("RequestPayment/AddPaymentConceptFromService", [this.data]).subscribe((data => {
        if (data.success) {
          console.log('formulario request payment', data);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Save Data"
            },
            width: "350px"
          });
          this.temporalDocument = [];
          this.__loader__.hideLoader();
          this.dialogRef.close();
        }
      }))
    } else {
      this.data.success = true;
      console.log("este es el objeto que se ira a request payment: ", this.data);
      this.__loader__.hideLoader();
      this.dialogRef.close(this.data);
    }
  }
  //********************************************************************//
  update() {
    this.__loader__.showLoader();
    for (let i = 0; i < this.data.commentPaymentConcepts.length; i++) {
      if (this.data.commentPaymentConcepts[i].user) {
        this.data.commentPaymentConcepts[i].user = [];
      }
    }

    let data_comment_aux = this.data.commentPaymentConcepts;
    this.data.commentPaymentConcepts = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.data.commentPaymentConcepts.push(data_comment_aux[i]);
      }
    }

    this.data.documentPaymentConcepts = [];
    this.data.documentPaymentConcepts = this.temporalDocument;
    this.data.updatedBy = this.user.id;
    this.data.updatedDate = new Date();
    console.log("informacion a guardar: ", this.data);

    this._services.service_general_put("RequestPayment/UpdatePaymentConcept", this.data).subscribe((data => {
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated Data"
          },
          width: "350px"
        });
        this.__loader__.hideLoader();
        this.temporalDocument = [];
        data.result.success = true;
        this.dialogRef.close(data.result);
      }
    }))
  }
  //********************************************************************//
  //FUNCION PARA VER DOCUMENTO//
  showDocumentDialogDetails(item) {
    console.log(item);
    const server_url: string = this._services.url_images + item.fileRequest;
    window.open(server_url);
  }
  //********************************************************************//
  //FUNCION PARA AGREGAR NUEVO CONCEPTO//
  addConcept() {
    const dialogRef = this._dialog.open(DialogAdditionalExpensesComponent, {
      width: "95%",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        if (!this.data.concepts) { this.data.concepts = []; }
        let data_ = {
          "id": 0,
          "payment": this.data.id,
          "concept1": result.concept,
          "amount": result.amount,
          "currency": result.currency,
          "createdDate": new Date(),
          "createdBy": this.user.id,
          "updatedBy": this.user.id,
          "updatedDate": new Date()
        }
        this.data.concepts.push(data_);
      }
    })
  }
  //FUNCION PARA EDITAR EL CONCEPT//
  editConcept(element, i) {
    element.concept = element.concept1
    console.log(element)
    const dialogRef = this._dialog.open(DialogAdditionalExpensesComponent, {
      width: "95%",
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.concept1 = result.concept;
        this.data.concepts[i] = result;
      }
    })
  }
  //FUNCION PARA LA IMAGEN//
  getImage(img){
    if(img != undefined && img != '' &&  img != null){
       return this._services.url_images + img;
    }else{
      return '/assets/images/users/avatar.png';
    }
  }
}


