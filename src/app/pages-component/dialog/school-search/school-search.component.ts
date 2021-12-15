import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogSchoolDetailsComponent } from '../dialog-school-details/dialog-school-details.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';

import { DialogAddchildComponent } from '../dialog-addchild/dialog-addchild.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';

@Component({
  selector: 'app-school-search',
  templateUrl: './school-search.component.html',
  styleUrls: ['./school-search.component.scss']
})
export class SchoolSearchComponent implements OnInit {
  //****************************************************//
  //VARIABLES//
  vista: boolean = false;
  ca_requestType: any[] = [];
  ca_estatus: any;
  ca_document:any;
  school_search: any = {};
  table_payments: any;
  calculo : any = {};
  user: any = {};
  temporalDocument: any[] = [];
  dependent:any;
  relation_ship:any;
  languages:any;
  nacionality:any;
  grade: any;
  payments: any[] = [];
  ca_status_school:any;
  //TABLE SCHOOL INFORMATION//
  dataSourceSchool: any[] = [];
  displayedColumnsSchool: string[] = ['School No.', 'School Name', 'Dependent', '$ Per Month', 'Currency', 'Schooling Status', 'Actions'];
  //TABLE REQUEST PAYMENT//
  dataSourcePayment: any[] = [];
  //EXTENSION//
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  serviceScope : any[] = [];

  //LOADER//
  public __loader__: LoaderComponent = new LoaderComponent();
  cr: string = "Reply";

  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  //***************************************************************************//
  ngOnInit(): void {
    this.__loader__.showLoader();
    console.log("DATA DE LA TABLA: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.get_catalogos();

  }
    // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.school_search.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
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
  //***************************************************************************//
  //CONSULTA CATALOGOS//
  ca_privacy = [];
  async get_catalogos() {
    this.__loader__.showLoader();
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
      if (data.success) {
        this.ca_document = data.result;
        console.log(this.ca_document);
      }
    }))
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=15").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }));
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.relation_ship = await this._services.getCatalogueFrom('GetRelationship');
    this.languages = await this._services.getCatalogueFrom('GetLanguages');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    this.grade = await this._services.getCatalogueFrom('GetGradeSchooling');

    this._services.service_general_get('RelocationServices/GetSchoolingSearchById?id=' + this.data.data.service[0].id).subscribe((data => {
      console.log('id', this.data.data.service[0].id);
      if (data.success) {
        console.log('DATA CONSULTA SCHOOL SEARCH: ', data);
        this.school_search = data.result;
        this.vista = true;
        //this.dataSourceSchool = this.school_search.schoolingInformations;
        this.dataSource = this.school_search.extensionSchoolingSearches;
        if (this.school_search.commentSchoolingSearches.length == 0) {
          this.addReply();
        }
        console.log('data school', this.school_search);
        this.get_payment();
        this.getDataSchool();
        this.getServiceScope();

      }
    }));
    this.__loader__.hideLoader();
  }
  //**********************************************************************************//
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(data) {
    console.log('workOrderServicesId', this.school_search.workOrderServicesId);
    if(data == null){
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.school_search.workOrderServicesId,
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
  //**EDIT REQUEST PAYMENT**//
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
  //**CONSULTA PAYMENT**//
  get_payment() {
    console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.school_search.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log('datos de tabla request', data);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        // console.log('datos de la tabla' + data.result.value.payments);
      }
      console.log('2° datos de la tabla' + this.payments);
    }))
  }
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

  //**********************************************************************************//
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    console.log(this.user);
    this.school_search.commentSchoolingSearches.push({
      "id": 0,
      "schoolingSearchId": this.school_search.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.school_search.commentSchoolingSearches.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }


  //**********************************************************************************//
  //**METHODS ADD DOCUMENT**//
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
        result.schoolingSearchId = this.school_search.id;
        this.temporalDocument.push(result);
      }
    });
  }
  //**********************************************************************************//
  //**DELETE DOCUMENTO FROM DATABASE**//
  deleteDocument_DB(id) {
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
        this._services.service_general_delete("RelocationServices/DeleteDocumentSS?id=" + id).subscribe((data => {
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
  //**********************************************************************************//
  //**DELETE DOCUMENT FROM VAR TEMPORALS**//
  deleteDocument_LOCAL(position) {
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
        this.temporalDocument.splice(position, 1);
      }
    })
  }
  //**********************************************************************************//
  //**METHODS REMINDER (NEW)**//
  addReminder() {
    this.school_search.reminderSchoolingSearches.push({
      "id": 0,
      "schoolingSearchId": this.school_search.id,
      "reminderDate": null,
      "reminderComments": null,
      "createdBy": this.user.id,
      "createdDate": new Date()
    })
  }
  //**DELETE REMINDER**//
  removeReminder(i, id) {
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
          this.school_search.reminderSchoolingSearches.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteReminderSS?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Reminder deleted"
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
  //**********************************************************************************//
  getDataSchool() {
    //BRING DATA TABLE SCHOOLING LIST//
    this._services.service_general_get('SchoolsList/GetAllSchool?sr=' + Number(this.data.sr)).subscribe((data_schooling_list => { //this.area_orientation.workOrderServicesId
      console.log('DATA CONSULTA SCHOOLING LIST: ', data_schooling_list);
      if (data_schooling_list.success) {
        //console.log('DATA CONSULTA SCHOOLING LIST: ',data_schooling_list);
        this.dataSourceSchool = data_schooling_list.message;
        //BRING DATA TABLE PAYMENTS/
        this.getDependent();
        this.get_payment();
      }
    }));
  }
  //AGREGAR ESCUELA//
  addSchool() {
    let data_ = {
      id: 0,
      workOrderId: this.data.data.workOrderId, //this.area_orientation.workOrderServicesId,
      service: this.data.data.serviceRecordId,
      serviceTypeId: this.data.data.serviceTypeId,
      sr: this.data.sr
    }
    const dialogRef = this._dialog.open(DialogSchoolDetailsComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataSchool();
    })
  }
  //EDITAR ESCUELA//
  editSchool(data_:any, tipo?:any) {
    if(tipo == 1){
      data_ = {
        id: data_,
        sr: Number(this.data.sr)
      }
    }else{
      data_.sr = Number(this.data.sr);
    }
    console.log("Editar escuela: ", data_);

    const dialogRef = this._dialog.open(DialogSchoolDetailsComponent, {
      data: data_,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataSchool();
    })
  }
  //**********************************************************************************//
  getDependent(){
    this.school_search.schoolingInformations.forEach(E => {
      for (let i = 0; i < this.dataSourceSchool.length; i++) {
        if(E.name == this.dataSourceSchool[i].name && this.dataSourceSchool[i].status == 'Permente School'){
          this._services.service_general_get("SchoolsList/GetSchool?key="+this.dataSourceSchool[i].id).subscribe((data => {
            console.log(data);
            if(data.success){
              E.school = data.result;
            }
          }))
        }
      }
    });

    console.log("OBJETO FINALLLLLLL: ", this.school_search);
  }
  //**********************************************************************************//
  //RELATION SHIP//
  getNameRelationShip(id){
    for(let i = 0; i < this.relation_ship.length; i++){
      if(this.relation_ship[i].id == id){
         return this.relation_ship[i].relationship;
      }
    }
  }
  //LANGUAGES//
  getLanguages(id) {

    if (id != null) {

      for (let i = 0; i < this.languages.length; i++) {
        if (this.languages[i].id == id.id) {
          return this.languages[i].name;
        }
      }
    }
    else {
      return "--";
    }
  }
  //NACIONALITY//
  getNacionality(id) {
    if (id != null && id.id != undefined) {
      for (let i = 0; i < this.nacionality.length; i++) {
        if (this.nacionality[i].id == id.id) {
          return this.nacionality[i].name;
        }
      }
    } else {
      for (let i = 0; i < this.nacionality.length; i++) {
        if (this.nacionality[i].id == id) {
          return this.nacionality[i].name;
        }
      }
    }
  }
  //GRADE//
  getGrade(id){
    for(let i = 0; i < this.grade.length; i++){
      if(this.grade[i].id == id){
         return this.grade[i].grade;
      }
    }
  }
  //DOCUMENT TYPE//
  getDocument(id){
    for(let i = 0; i < this.ca_document.length; i++){
      if(this.ca_document[i].id == id){
         return this.ca_document[i].documentType;
      }
    }
  }
  //**********************************************************************************//
  //ELIMINAR HIJO//
  deleteChild(pos){
    this.school_search.schoolingInformations[pos].active = false;
  }
  //AGREGAR HIJO//
  addChild(){
    if(this.school_search.schoolingInformations.length > 0){
       const dialogRef = this._dialog.open(DialogAddchildComponent, {
         width: "350px",
         data: this.school_search.schoolingInformations
       });

       dialogRef.afterClosed().subscribe(result => {
         this.school_search.schoolingInformations = result;
         console.log("NUEVOS HIJOS: ",this.school_search);
       });
    }else{
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Attention",
          body: "No data child"
        },
        width: "350px"
      });
    }
  }
  //**********************************************************************************//
  save(){
    this.__loader__.showLoader();
    this.school_search.documentSchoolingSearches = this.temporalDocument;
    this.school_search.updateBy = this.user.id;
    this.school_search.updatedDate = new Date();
    this.school_search.createdBy = this.user.id;
    this.school_search.createdDate = new Date();

    let data_comment_aux =  this.school_search.commentSchoolingSearches;
    this.school_search.commentSchoolingSearches = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.school_search.commentSchoolingSearches.push(data_comment_aux[i]);
      }
    }
     // si el estatus cambia a complete la fecha se guarda
     if (this.school_search.statusId == 4 || this.school_search.statusId == 5) {
      this.school_search.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.school_search.serviceCompletionDate = '';
    }

    console.log("SAVE INFORMATION: ",this.school_search);
    this.temporalDocument = [];
    this._services.service_general_put("RelocationServices/PutSchoolingSearch", this.school_search).subscribe((data => {
      if(data.success){
        console.log(data);
        this.__loader__.hideLoader();
         const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Update Data"
              },
              width: "350px"
            });
            this.dialogRef.close();
            this.ngOnInit();
      }
    }))
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
