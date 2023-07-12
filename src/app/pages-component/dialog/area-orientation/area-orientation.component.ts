import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { LoaderComponent } from 'app/shared/loader';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogSchoolDetailsComponent } from '../dialog-school-details/dialog-school-details.component';
import { DialogHousingSpecificationsComponent } from '../dialog-housing-specifications/dialog-housing-specifications.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { DialogAddchildComponent } from '../dialog-addchild/dialog-addchild.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';

import {WorkPartnerI} from '../../../interfaces/dtoWork.interface';


@Component({
  selector: 'app-area-orientation',
  templateUrl: './area-orientation.component.html',
  styleUrls: ['./area-orientation.component.scss']
})
export class AreaOrientationComponent implements OnInit {
  calculo: any = {};
  show: boolean = false;
  //**********************************************//
  //*****************VARIABLES********************//
  //EXTENSION//
  today: Date = new Date();
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //HOUSING LIST//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Supplier Partner', 'Supplier', 'Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Status', 'Actions'];
  //SCHOOLING LIST//
  dataSourceSchool: any[] = [];
  displayedColumnsSchool: string[] = ['Schooling No.', 'School Name', 'Dependent', 'Per Month', 'Currency', 'Schooling Status', 'Actions'];
  //PAYMENTS
  dataSourcePayment: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];

  showPanelHousing: Boolean = false;
  showPanelSchooling: Boolean = false;
  table_payments: any;
  user: any;
  temporalDocument: any[] = [];
  //CATALOGOS_GET//
  ca_estatus: any[] = [];
  ca_requestType: any[] = [];
  area_orientation: any;
  nacionality: any;
  ca_document: any;
  cr: string = "Reply";
  date = new Date();
  serviceScope = null;

  datos: WorkPartnerI = {
    workOrderServicesId: 0,
    partner_id: 0
  };

  isVisible : boolean =false;

  loader: LoaderComponent = new LoaderComponent();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.show = true;
    this.loader.showLoader();
    //console.log("DATA DE LA TABLA: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.get_catalogos();
    this.get_dependent();

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
    //debugger;
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
    if (this.area_orientation.statusId != 39 && this.area_orientation.statusId != 2) { //active , in progress
      this.hide_complete = true;
    }
    else {
      if (this.area_orientation.statusId == 39) {
        this.show_progress = true;
      }
      else {
        this.show_completed = true;
      }
    }
  }

  change_button() {
    //debugger;
    if (this.show_completed) {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Are you sure the service is complete?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        // ////console.log(result);
        if (result) {
          this.area_orientation.statusId = 37; //penidng to completion 
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
        // ////console.log(result);
        if (result) {
          this.area_orientation.statusId = 2; //penidng to completion 
          this.save();
        }
      });
    }
  }

  //////////////////////manage estatus


  getAge(fecha) {
    let cumpleanos = new Date(fecha);
    let edad = this.date.getFullYear() - cumpleanos.getFullYear();
    let m = this.date.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && cumpleanos.getDate() < this.date.getDate())) {
      edad--;
    }
    return edad;
  }

  // verificar si el user logeado es consultor para ocultar informacion house
  public hiddHousConsultant: boolean = false;
  consultantPermisosHouse() {
    if (this.user.role.id == 3) {
      if (this.area_orientation.housing != true) {
        this.hiddHousConsultant = true;
      } else {
        this.hiddHousConsultant = false;
      }
    }
    else {
      this.hiddHousConsultant = false;
    }
  }
  // verificar si el user logeado es consultor para ocultar informacion personal
  public hiddSchoolConsultant: boolean = false;
  consultantPermisosH() {
    if (this.user.role.id == 3) {
      if (this.area_orientation.schooling != true) {
        this.hiddSchoolConsultant = true;
      } else {
        this.hiddSchoolConsultant = false;
      }
    }
    else {
      this.hiddSchoolConsultant = false;
    }
  }
  //***********************************************************************************//
  //CONSULTING INFORMATION CATALOGOS//
  ca_grade = [];
  ca_privacy = [];
  a_o = {authoDate: "", authoAcceptanceDate:"", serviceCompletionDate : ""}
  async get_catalogos() {
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this.ca_grade = await this._services.getCatalogueFrom('GetGradeSchooling');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get("Catalogue/GetDocumentType/13").subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.ca_document = data.result;
      }
    }))
    ////console.log(this.ca_estatus);
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=13").subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))

    this._services.service_general_get('RelocationServices/GetAreaOrientationById?id=' + this.data.data.service[0].id).subscribe((data => {
      if (data.success) {


        
        this.area_orientation = data.result;
        console.log('DATA CONSULTA GetAreaOrientationById ======================= : ', this.area_orientation);

        this.datos.workOrderServicesId = this.area_orientation.workOrderServicesId;
        this.datos.partner_id = this.data.data.partnerId;
        this.isVisible =true;
       
           this.a_o = this.area_orientation;

        this.setup_permissions_settings();
        if (this.area_orientation.commentAreaOrientations.length == 0) {
          this.addReply();
        }
        if (this.area_orientation.housing == true) {
          this.showPanelHousing = true;
        }

        if (this.area_orientation.schooling == true) {
          this.showPanelSchooling = true;
        }
        //DATA TABLE EXTENSION//
        this.dataSource = this.area_orientation.extensionAreaOrientations;
        this.getDataHousing();
        this.getDataSchool();
        this.getServiceScope();
        // revisa si es consultor y tiene permisos en secciones
        this.consultantPermisosHouse();
        this.consultantPermisosH();
        this.get_text_status();
      }
    }));
    this.loader.hideLoader();
  }
  //***********************************************************************************//
  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.area_orientation.workOrderServicesId}&client=${this.data.data.partnerId}`).subscribe(resp => {
      if (resp.success) {
        //console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  // view document
  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }
  //DATA TABLE HOUSING//
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe((data_housing => {//this.area_orientation.workOrderServicesId
      if (data_housing.success) {
        //console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
      }
    }));
  }
  //***********************************************************************************//
  getDataSchool() {
    //BRING DATA TABLE SCHOOLING LIST//
    // this._services.service_general_get('SchoolsList/GetAllSchool?sr=' + Number(this.data.sr)).subscribe((data_schooling_list => {//this.area_orientation.workOrderServicesId
    this._services.service_general_get('SchoolsList/GetAllSchoolByWoId?wo_id=' + this.data.data.workOrderId).subscribe((data_schooling_list => {
      //console.log('DATA CONSULTA SCHOOLING LIST: ', data_schooling_list);
      if (data_schooling_list.success) {
        ////console.log('DATA CONSULTA SCHOOLING LIST: ',data_schooling_list);
        this.dataSourceSchool = data_schooling_list.message;
        //BRING DATA TABLE PAYMENTS//
        //this.get_payment();
      }
    }));
  }
  //***********************************************************************************//
  //GET DEPENDENT//
  applicant = [];
  get_dependent() {
    this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((data => {
      if (data.success) {
        //console.log("GetApplicant ==================",data.applicant.value);
        this.applicant = data.applicant.value
      }
    }))
  }
  //***********************************************************************************//
  //**CONSULTA PAYMENT**//
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.area_orientation.workOrderServicesId).subscribe((data => {
      if (data.success) {
        //console.log(data.result);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.table_payments = data.result.value.payments;
        //console.log(this.table_payments);
      }
      //console.log(this.table_payments);
    }))
  }
  //***********************************************************************************//
  //FUNCTION FOR SHOW PANEL HOUSING//
  displayPanelHosudig($event) {
    this.area_orientation.housing = $event.checked;
    if (this.area_orientation.housing) {
      this.showPanelHousing = true;
    } else {
      this.showPanelHousing = false;
    }
  }
  //***********************************************************************************//
  //FUNCTION FOR SHOW PANEL HOUSING//
  displayPanelSchooling($event) {
    this.area_orientation.schooling = $event.checked;
    if (this.area_orientation.schooling) {
      this.showPanelSchooling = true;
    } else {
      this.showPanelSchooling = false;
    }
  }
  //***********************************************************************************//
  //**METHODS REMINDER (NEW)**//
  addReminder() {
    this.area_orientation.reminderAreaOrientations.push({
      "id": 0,
      "areaOrientationId": this.area_orientation.id,
      "reminderDate": new Date(),
      "reminderComments": " ",
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
      //console.log(result);
      if (result) {
        if (id == 0) {
          this.area_orientation.reminderAreaOrientations.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteReminderAO?id=" + id).subscribe((data => {
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
  //*********************************************************************************//
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    //console.log(this.user);
    this.area_orientation.commentAreaOrientations.push({
      "id": 0,
      "areaOrientationId": this.area_orientation.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.area_orientation.commentAreaOrientations.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }
  //**********************************************************************************//
  //HOUSINGS//
  HousingSpecs() {
    let data_ = {
      numberWorkOrder: this.data.data.numberWorkOrder,
      serviceID: this.data.data.number_server,
      serviceName: this.data.data.service_name,
      sr: this.data.sr,
      service: this.data.data.serviceTypeId,
      type_housing: 3,
      //workOrderServicesId: this.data.data.workOrderId
      workOrderServicesId: this.area_orientation.workOrderServicesId
    }
    const dialogRef = this._dialog.open(DialogHousingSpecificationsComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
      }
    })
  }
  //NEW RECORD//
  HomeDetailsnew() {
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.area_orientation.workOrderServicesId,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName: this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId: this.data.data.serviceTypeId,
        sr: this.data.sr,
        supplierType: 6,
        no_permanent: true,
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //EDIT HOUSING//
  editHousing(data) {
    data.supplierType = 6
    data.workOrderServicesId = this.area_orientation.workOrderServicesId,
      data.sr = this.data.sr;
    data.numberWorkOrder = this.data.data.numberWorkOrder;
    data.serviceID = this.data.data.number_server;
    data.serviceName = this.data.data.service_name;
    //console.log("Editar Housing: ", data);
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //**********************************************************************************//
  //AGREGAR ESCUELA//
  addSchool() {
    let data_ = {
      id: 0,
      workOrderId: this.data.data.workOrderId,//this.area_orientation.workOrderServicesId,
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
  editSchool(data_) {
    //console.log("Editar escuela: ", data_);
    data_.sr = this.data.sr;
    const dialogRef = this._dialog.open(DialogSchoolDetailsComponent, {
      data: data_,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataSchool();
    })
  }
  //**********************************************************************************//
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment() {
    let data = {
      serviceRecord: this.data.data.serviceRecordId,
      sr: this.data.data.serviceRecordId,
      workOrderServices: this.area_orientation.workOrderServicesId,
      workOrder: this.data.data.workOrderId,
      service: this.data.data.id_server,
      id: 0,
      type: 2,
      supplierType: 3
    }
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.get_payment();
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
      //this.get_payment();
    });
  }

  deletePaymentConcept(data) {
    const dialogRef = this._dialog.open(DialogDeletepaymentconceptComponent, {
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);

      if (result.success) {
        this._services.service_general_delete("RequestPayment/DeletePaymentConcept/" + data.id + "/" + result.type).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: data.message
              },
              width: "350px"
            });
            //this.get_payment();
          }
        }))
      }
    })
  }
  //**********************************************************************************//
  //**METHODS ADD DOCUMENT* DialogDocumentsComponent *//
  addDocument() {
    this.data.typeDocument = 13;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result.success) {
        result.areaOrientationId = this.area_orientation.id;
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
      //console.log(result);
      if (result) {
        this._services.service_general_delete("RelocationServices/DeleteDocumentAO?id=" + id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: 'Document deleted successul'
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
      //console.log(result);
      if (result) {
        this.temporalDocument.splice(position, 1);
      }
    })
  }
  //**********************************************************************************//
  //DOCUMENT TYPE//
  getDocument(id) {
   // console.log("this.ca_document ===================", this.ca_document)
    for (let i = 0; i < this.ca_document.length; i++) {
      if (this.ca_document[i].id == id) {
        return this.ca_document[i].documentType;
      }
    }
  }
  //NACIONALITY//
  getNacionality(id) {
    for (let i = 0; i < this.nacionality.length; i++) {
      if (this.nacionality[i].id == id) {
        return this.nacionality[i].name;
      }
    }
  }
  //GRADE//
  getGrade(id) {
    for (let i = 0; i < this.ca_grade.length; i++) {
      if (this.ca_grade[i].id == id) {
        return this.ca_grade[i].grade;
      }
    }
  }

  //APPLICANT//
  getApplicant(id) {
    for (let i = 0; i < this.applicant.length; i++) {
      if (this.applicant[i].dependentId == id) {
        return this.applicant[i].relationship;
        // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
      }
    }
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
  //**********************************************************************************//
  //ELIMINAR HIJO//
  deleteChild(pos) {
    this.area_orientation.schoolingAreaOrientations[pos].active = false;
  }
  //AGREGAR HIJO//
  addChild() {
    if (this.area_orientation.schoolingAreaOrientations.length > 0) {
      const dialogRef = this._dialog.open(DialogAddchildComponent, {
        width: "350px",
        data: this.area_orientation.schoolingAreaOrientations
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.success) {
          this.area_orientation.schoolingAreaOrientations = result;
          //console.log("NUEVOS HIJOS: ", this.area_orientation);
        }
      });
    } else {
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
  save() {
    this.loader.showLoader();
    //console.log("SAVE INFORMATION: ", this.area_orientation);
    this.area_orientation.documentAreaOrientations = this.temporalDocument;
    this.area_orientation.updateBy = this.user.id;
    this.area_orientation.updatedDate = new Date();
    this.area_orientation.createdBy = this.user.id;
    this.area_orientation.createdDate = new Date();
    this.area_orientation.authoDateExtension = new Date();
    this.area_orientation.authoAcceptanceDateExtension = new Date();


    let data_comment_aux = this.area_orientation.commentAreaOrientations;
    this.area_orientation.commentAreaOrientations = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.area_orientation.commentAreaOrientations.push(data_comment_aux[i]);
      }
    }
    // si el estatus cambia a complete la fecha se guarda
    if (this.area_orientation.statusId == 4 || this.area_orientation.statusId == 5) {
      this.area_orientation.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.area_orientation.serviceCompletionDate = '';
    }

    //console.log(this.area_orientation);
    this._services.service_general_put("RelocationServices/PutAreaOrientation", this.area_orientation).subscribe((data => {
      if (data.success) {
        //console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.loader.hideLoader();
        this.dialogRef.close();
        this.temporalDocument = [];
        this.ngOnInit();
      }
    }))

  }

  public showDocumentDialogDetails(document: any, service_line: number = undefined): void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        name_section: "only_one_service",
        sl: 1
      }
      // aqui se manda sl 1 que en caso de modales de doc es relocation
    });
  }

  /////////////////////////// FUNCIONES SEPTIEMBRE 2022 - ENTREGA 6

  _texto_status = "";

  get_text_status() {
    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.area_orientation.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  };

  change_status_detail() {
    ////debugger;
    console.log("this.area_orientation",this.area_orientation);
    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 18, //departurre
        type: "area_prientation",
        // data: this.area_orientation,
        type_id: 18,
        srId: this.data.sr,
        wos_id: this.area_orientation.workOrderServicesId,
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      //debugger;
      console.log(result);
      this.loader.showLoader();
      if(result != undefined){
        if (result.success) {
          this.area_orientation.statusId = result.id; //penidng to completion 
          this.get_text_status();
          this.loader.hideLoader();
        }
        else {
          this.loader.hideLoader();
        } 
      }
      else
      {
        this.loader.hideLoader();
      }
    });
  };

  marcar_opcion(data, event) {

    if (!event.checked) {
      if (data == 'supermarks') {
        if (this.area_orientation.supermarksdate) {
          console.log('Mostrar popup: ', data, event);
          this.confirm_uncheckif('supermarks');
        }
      }
      if (data == 'shoppingSocialAreas') {
        if (this.area_orientation.shoppingSocialAreasdate) {
          console.log('Mostrar popup: ', data, event);
          this.confirm_uncheckif('shoppingSocialAreas');
        }
      }
      if (data == 'parks') {
        if (this.area_orientation.parksdate) {
          console.log('Mostrar popup: ', data, event);
          this.confirm_uncheckif('parks');
        }
      }
      if (data == 'extracurricularActivities') {
        if (this.area_orientation.extracurricularActivitiesdate) {
          console.log('Mostrar popup: ', data, event);
          this.confirm_uncheckif('extracurricularActivities');
        }
      }
      if (data == 'emergencyHealth') {
        if (this.area_orientation.emergencyHealthdate) {
          console.log('Mostrar popup: ', data, event);
          this.confirm_uncheckif('emergencyHealth');
        }
      }
      if (data == 'other') {
        if (this.area_orientation.otherdate) {
          console.log('Mostrar popup: ', data, event);
          this.confirm_uncheckif('other');
        }
      }
    }

    console.log('data: ', data, event);

  };


  confirm_uncheckif(data) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Confirmation",
        body: "This action will prevent the consultant from developing the service. Are you sure?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        if (data == 'supermarks') {

          this.area_orientation.supermarks = true;

        }
        if (data == 'shoppingSocialAreas') {

          this.area_orientation.shoppingSocialAreas = true;

        }
        if (data == 'parks') {

          this.area_orientation.parks = true;

        }
        if (data == 'extracurricularActivities') {
          this.area_orientation.extracurricularActivities = true;
          console.log('Mostrar popup: ', data, event);

        }
        if (data == 'emergencyHealth') {
          this.area_orientation.emergencyHealth = true;
          console.log('Mostrar popup: ', data, event);

        }
        if (data == 'other') {
          this.area_orientation.other = true;
          console.log('Mostrar popup: ', data, event);

        }
      }
    });
  }

}
