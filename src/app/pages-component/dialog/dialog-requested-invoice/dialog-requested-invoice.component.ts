import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogRequestedInvoicesDocumentComponent } from '../dialog-requested-invoices-document/dialog-requested-invoices-document.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-dialog-requested-invoice',
  templateUrl: './dialog-requested-invoice.component.html',
  styleUrls: ['./dialog-requested-invoice.component.css']
})
export class DialogRequestedInvoiceComponent implements OnInit {

  show: boolean = false;
  today = new Date();
  temporalDocument = [];
  user: any;
  data_registro: any = {};
  data_put: any = {
    commentInvoices: [],
    documentInvoices: [],
    additionalExpenses: [],
    serviceInvoices: []
  };
  invoiceDetail: boolean = false;
  additionalDetail: boolean = false;
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(private _permissions: NgxPermissionsService, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  //**************************************************************************************************//
  //REALIZAMOS CONSULTA DEL REGISTRO A ACTUALIZAR//
  type_user: any;
  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    const user_rol: string[] = [this.__userlog__.role.role];
    this.type_user = user_rol;
    this._permissions.loadPermissions(user_rol);
    this.getCatalogos();
    this.consultaPermisos();
    console.log(this.data);
    this._services.service_general_get('Invoice/GetInvoiceById?key=' + this.data.id).subscribe((data => {
      if (data.success) {
        console.log(data.result.value);
        this.data_registro = data.result.value;
        if (this.data_registro.requestInvoice.services.length > 0) {
          this.invoiceDetail = true;
        }
        if (this.data_registro.requestInvoice.additionalExpense.length > 0) {
          this.additionalDetail = true;
        }
        this.show = true;
        this.__loader__.hideLoader();
      }
    }));
  }
  //**************************************************************************************************//
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
  //**************************************************************************************************//
  //REALIZAMOS CONSULTA DE LOS CATALOGOS//
  ca_paymentMetohod = [];
  ca_status = [];
  ca_document = [];
  async getCatalogos() {
    this.ca_paymentMetohod = await this._services.getCatalogueFrom('GetPaymentMethod');
    this.ca_status = await this._services.getCatalogueFrom('GetStatusInvoice');
    this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
  }
  //**************************************************************************************************//
  //REALIZAMOS CONSULTA DE NOMBRE DE DOCUMENTO//
  getDocument(id) {
    for (let index = 0; index < this.ca_document.length; index++) {
      if (this.ca_document[index].id = id) {
        return this.ca_document[index].documentType;
      }
    }
  }
  //**************************************************************************************************//
  //REALIZAMOS LA INSERCCION DE NUEVAS REPLICAS O COMENTARIO INICIAL//
  addReply() {
    this.data_put.commentInvoices.push({
      "id": 0,
      "invoice": this.data_registro.requestInvoice.id,
      "comment": '',
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })
  }
  //**************************************************************************************************//
  //REALIZAMOS LA INSERCCION DE NUEVOS DOCUMENTOS PARA FINANCE O CONSULTANT//
  addDocument(type) {
    const dialogRef = this._dialog.open(DialogRequestedInvoicesDocumentComponent, {
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.type = type;
        result.invoice = this.data_registro.requestInvoice.id;
        this.temporalDocument.push(result);
        console.log(this.temporalDocument);
      }
    });
  }
  //**************************************************************************************************//
  //ELIMINAR DOCUMENTO//
  deleteDocument(i) {
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
  //**************************************************************************************************//
  //VISUALIZAR DOCUMENTO//
  showDocumentDialogDetails(item) {
    console.log(item);
    const server_url: string = this._services.url_images + item.documet;
    window.open(server_url);
  }
  //**************************************************************************************************//
  //VALIDACIONES//
  active_payment: boolean = false;
  active_invoice: boolean = false;
  active_method: boolean = false;
  valida_campos() {
    console.log(this.type_user);
    let contador = 0;
    let respaldo_documentos = [];
    respaldo_documentos = this.temporalDocument;
    if (this.data_registro.requestInvoice.document.length > 0) {
      this.temporalDocument = []; 
      this.temporalDocument = this.data_registro.requestInvoice.document; 
    }

    if (this.type_user[0] == "Finance") {
      if (this.data_registro.requestInvoice.paymentNumber == undefined || this.data_registro.requestInvoice.paymentNumber.length == 0) {
        this.active_payment = true;
      }


      for (let i = 0; i < this.temporalDocument.length; i++) {
        if (this.temporalDocument[i].type == 2) {
          contador++;
        }
      }

      if (contador == 0) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Attention",
            body: "Add Document"
          },
          width: "350px"
        });
      }

      if (contador > 0 && this.data_registro.requestInvoice.paymentNumber != undefined && this.data_registro.requestInvoice.paymentNumber.length > 0) {
        this.temporalDocument = respaldo_documentos;
        this.save();
      }
    } else if (this.type_user[0] == "Supplier") {

      for (let i = 0; i < this.temporalDocument.length; i++) {
        if (this.temporalDocument[i].type == 1) {
          contador++;
        }
      }

      if (contador == 0) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Attention",
            body: "Add Document"
          },
          width: "350px"
        });
      }

      if (this.data_registro.requestInvoice.invoiceObjectGeneral.methodPayment == undefined) {
        this.active_method = true;
      }

      if (this.data_registro.requestInvoice.invoiceObjectGeneral.inoviceNo == undefined || this.data_registro.requestInvoice.invoiceObjectGeneral.inoviceNo.length == 0) {
        this.active_invoice = true;
      }
      if (contador > 0 && this.data_registro.requestInvoice.paymentNumber != undefined && this.data_registro.requestInvoice.invoiceObjectGeneral.methodPayment != undefined) {
        this.temporalDocument = respaldo_documentos;
        this.save();
      }
    }
  }
  //**************************************************************************************************//
  //REALIZAMOS OPERACION PUT//
  save() {
    this.__loader__.showLoader();
    this.data_put.serviceInvoices = [];
    this.data_put.documentInvoices = this.temporalDocument;
    this.data_put.id = this.data_registro.requestInvoice.invoiceObjectGeneral.id;
    this.data_put.serviceRecord = this.data_registro.requestInvoice.invoiceObjectGeneral.serviceRecord;
    this.data_put.invoiceType = this.data_registro.requestInvoice.invoiceObjectGeneral.invoiceType;
    this.data_put.consultant = this.data_registro.requestInvoice.invoiceObjectGeneral.consultant;
    this.data_put.comments = this.data_registro.requestInvoice.comments;
    this.data_put.inoviceNo = this.data_registro.requestInvoice.invoiceObjectGeneral.inoviceNo;
    this.data_put.paymentNumber = this.data_registro.requestInvoice.paymentNumber;
    this.data_put.methodPayment = this.data_registro.requestInvoice.invoiceObjectGeneral.methodPayment;
    this.data_put.paymentId = this.data_registro.requestInvoice.invoiceObjectGeneral.paymentId;
    this.data_put.createdBy = this.user.id;
    this.data_put.createdDate = new Date();
    this.data_put.updatedBy = this.user.id;
    this.data_put.updatedDate = new Date();
    this.data_put.serviceInvoices.push({
      "id": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].id,
      "invoice": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].invoice,
      "workOrder": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].workOrder,
      "service": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].service,
      "serviceLine": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].serviceLine,
      "typeService": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].typeService,
      "status": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].status,
      "toInvoice": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].toInvoice,
      "hourInvoice": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].hourInvoice,
      "amountToInvoice": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].amountToInvoice,
      "createdBy": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].createdBy,
      "createdDate": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].createdDate,
      "updatedBy": this.user.id,
      "updatedDate": new Date()
    })


    let data_comment_aux = this.data_put.commentInvoices;
    this.data_put.commentInvoices = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        data_comment_aux[i].user.profileUsers = [];
        this.data_put.commentInvoices.push(data_comment_aux[i]);
      }
    }

    console.log(this.data_registro);
    console.log(this.data_put);
    console.log(JSON.stringify(this.data_put));
    this._services.service_general_put("Invoice", this.data_put).subscribe((data => {
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close();
        this.__loader__.hideLoader();
      }
    }), (err) => {
      this.__loader__.hideLoader();
      console.log("error: ", err);
    })
  }

}
