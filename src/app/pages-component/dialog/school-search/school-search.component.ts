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
import { DialogPaymentSchoolingComponent } from '../dialog-payment-schooling/dialog-payment-schooling.component';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';
import { DialogAddPaymenentInformationComponent } from '../dialog-add-paymenent-information/dialog-add-paymenent-information.component';
import { DialogPaymentProcessComponent } from '../dialog-payment-process/dialog-payment-process.component';
interface Datos {
  workOrderServicesId: number;
  partner_id: number;
}
@Component({
  selector: 'app-school-search',
  templateUrl: './school-search.component.html',
  styleUrls: ['./school-search.component.scss']
})
export class SchoolSearchComponent implements OnInit {
  //****************************************************//
  //VARIABLES//
  today: Date = new Date();
  vista: boolean = false;
  ca_requestType: any[] = [];
  ca_estatus: any;
  ca_document: any;
  school_search: any = {};
  table_payments: any;
  calculo: any = {};
  user: any = {};
  temporalDocument: any[] = [];
  dependent: any;
  relation_ship: any;
  //languages:any;
  nacionality: any;
  grade: any;
  payments: any[] = [];
  ca_status_school: any;
  //TABLE SCHOOL INFORMATION//
  dataSourceSchool: any[] = [];
  displayedColumnsSchool: string[] = ['Send', 'School No.', 'School Name', 'Dependent', 'Schooling Status', 'Actions'];
  displayedColumnsSchoolExport: string[] = ['schoolNo', 'schoolName', 'visitDate', 'grade', 'admision', 'child', 'address', 'status'];
  //TABLE REQUEST PAYMENT//
  dataSourcePayment: any[] = [];
  //EXTENSION//
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  displayedColumnsPayment: string[] = ['Payment', 'Responsible', 'Amount', 'Currency', "Recurrence", 'Detail', 'action'];
  serviceScope = {
    scopeDescription: ""
  };
  child = [];
  sl_to_send: any[] =[];
  //LOADER//
  public __loader__: LoaderComponent = new LoaderComponent();
  cr: string = "Reply";

  datos:Datos = {
    workOrderServicesId: 0,
    partner_id: 0
  };

  isVisible : boolean =false;


  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {
    console.log('dataaaa',this.data);


   }

  //***************************************************************************//
  ngOnInit(): void {

    this.__loader__.showLoader();
    console.log("DATA DE LA TABLA: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.get_catalogos();
    // this.load_service();
    // console.log(this.child);
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
    ////
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
    if (this.school_search.statusId != 39 && this.school_search.statusId != 2) { //active , in progress
      this.hide_complete = true;
    }
    else {
      if (this.school_search.statusId == 39) {
        this.show_progress = true;
      }
      else {
        this.show_completed = true;
      }
    }
  }

  change_button() {
    ////
    if (this.show_completed) {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Are you sure the service is complete?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        // //console.log(result);
        if (result) {
          this.school_search.statusId = 37; //penidng to completion 
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
        // //console.log(result);
        if (result) {
          this.school_search.statusId = 2; //penidng to completion 
          this.save();
        }
      });
    }
  }

  _texto_status = "";

  get_text_status() {
    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.school_search.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  }

  change_status_detail(){
    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 20,
        type: "school_search",
        data: this.ca_estatus,
        type_id: 20,
        srId: this.data.sr,
        wos_id: this.school_search.workOrderServicesId
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      //
      // //console.log(result);
      if (result.success) {
        this.school_search.statusId = result.id; //penidng to completion 
        if (this.school_search.statusId == 4 || this.school_search.statusId == 5) {
          this.school_search.serviceCompletionDate = new Date().toISOString();
        }
        else {
          this.school_search.serviceCompletionDate = '';
        }
    
        //
        console.log("SAVE INFORMATION: ",this.school_search);
          
        this._services.service_general_put("RelocationServices/PutSchoolingSearch", this.school_search).subscribe((data => {
          if (data.success) {
            //    //console.log(data);
            this.__loader__.hideLoader();
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Update Data"
              },
              width: "350px"
            });
          }
        }))
        this.get_text_status();
      }
      else {
        //nada 
      }
    });

  }

  ppfselect()
  {
    const dialogRef = this._dialog.open(DialogPaymentProcessComponent, {
      data: this.school_search,
      width: "85%"
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  setSchool(event, obj, index){
    console.log(event);
    console.log(this.sl_to_send);
    if(event){
      
      this.sl_to_send.push(obj.id);
    }
    else
    {
      debugger;
      this.sl_to_send.forEach((element, index) => {
        if(element == obj.id){
          this.sl_to_send.splice(index, 1)
        }
      }); 
    }

    console.log(this.sl_to_send);
  }

  //Delete Schools
  deleteSchoollist(element) {

    if (element.status != 'Pending') {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Not Allowed",
          body: "The school has already been sent, it cannot be deleted."
        },
        width: "350px"
      });
    }
    else {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Are you sure to delete the property?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._services.service_general_post_with_url(`SchoolsList/DeleteSchools?key=`+ element.id, element.id).subscribe((data) =>{
            console.log('respuesta de eliminacion', data);
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: `Deleted School`
                },
                width: "350px"
              });
              this.getDataSchool();
            }
          }, (error) => {
              
          })
        }
      });
    }
  }

  //////////////////////manage estatus 

  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.school_search.workOrderServicesId}&client=${this.data.data.partnerId}`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService==============================: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  public __serverPath__: string = this._services.url_images;
  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }
  //***************************************************************************//
  //CONSULTA CATALOGOS//
  ca_privacy = [];
  ca_responsible = [];
  ca_currency = [];
  ca_payment_process = [];

  async get_catalogos() {
    this.__loader__.showLoader();
    // this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment')
    //
    // this.ca_payment_process = await this._services.getCatalogueFrom('CatPaymentProcess');
    // //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    // this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
    //   if (data.success) {
    //     this.ca_document = data.result;
    //     //  //console.log(this.ca_document);
    //   }
    // }))
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this.get_status_byUser();

    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.relation_ship = await this._services.getCatalogueFrom('GetRelationship');
    // this.languages = await this._services.getCatalogueFrom('GetLanguages');
    this.nacionality = await this._services.getCatalogueFrom('Nationalities');
    this.grade = await this._services.getCatalogueFrom('GetGradeSchooling');
//
    let _schoolingInformations: any[] = [];
    this._services.service_general_get('RelocationServices/GetSchoolingSearchById?id=' + this.data.data.service[0].id).subscribe((data => {
      console.log('id', data);

 
      if (data.success) {

        this.school_search = data.result;

        console.log("data.result", data.result);

        this.datos.workOrderServicesId = this.school_search.workOrderServicesId;
        this.datos.partner_id =  this.data.data.partnerId;
        this.isVisible =true;
    
        this._services.service_general_get("ServiceRecord/GetChildrenBySrId/" + Number(this.data.data.serviceRecordId)).subscribe(res => {
      
          this.__loader__.hideLoader();
          if (res.success) {
            console.log("CHILD", res.applicant.value)
            this.school_search.schoolingInformations = [];
              res.applicant.value.forEach((element, index) => {
                console.log("Element", element);
                this.school_search.schoolingInformations.push({
                  id: element.id,
                  active: true,
                  relationshipId: element.dependentId,
                  age: element.age,
                  birth: element.birth,
                  photo: element.photo.toString().includes("http") ? element.photo : element.photo != "" ? this._services.url_images + element.photo : "",
                  comments: element.aditionalComments,
                  name: element.name,
                  nationalityName: element.nationality,
                  nationality: element.nationalityId,
                  currentGrade: element.currentGrade,
                  grade: element.grade,
                  sex: element.sex,
                  schoolsLists: element.schoolsLists,
                  languageDependentInformations: element.languageDependentInformations, 
                  schoolSelected: element.schoolSelected,
                  paymentSchoolingInformations: element.paymentSchoolingInformations
                });
              });
          }
        }, error => {
    
        });

        console.log("this.school_search.schoolingInformations", this.school_search.schoolingInformations);
        // this.paymentSchooling = this.school_search.paymentSchoolings;
        // this.delete_no_permanent();
        this.setup_permissions_settings();
        this.get_text_status();
        this.vista = true;
        //
        //console.log('DATA CONSULTA SCHOOL SEARCH_2: ', data);
        this.dataSourcePayment = this.school_search.schoolingInformations;
        // this.dataSource = this.school_search.extensionSchoolingSearches;
        // if (this.school_search.commentSchoolingSearches.length == 0) {
        //   this.addReply();
        // }
        // //console.log('data school', this.school_search);
        //this.get_payment();
        this.getDataSchool();
        //this.getServiceScope();
        // this.get_child();
        // this.GetSchoolinginformation();
        this.__loader__.hideLoader();

        
      }
      else {
        this.__loader__.hideLoader();
      }
    }));

  }

  get_status_byUser() {
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=15").subscribe((data => {
      // this._services.service_general_get("Catalogue/GetStatusSerByuser?category=15").subscribe((data => {
      //  //console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }));
  }

  downloadXls() {

    this._services.service_general_get('SchoolsList/GetAllSchoolExcel?wo_id=' + this.data.data.workOrderId)
    .subscribe((data => { 
      if (data.success) {
        const linkSource =
        'data:application/octet-stream;base64,' + data.message;
        const downloadLink = document.createElement('a');
        const fileName = 'appointment_list.xlsx';
    
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    }));
  }

  delete_no_permanent() {
    ////////
    if (this.school_search.schoolingInformations.length > 0) {
      for (var k = 0; k < this.school_search.schoolingInformations.length; k++) {
        var s_l = this.school_search.schoolingInformations[k].schoolsLists;
        if (s_l.length > 0) {
          s_l = s_l.filter(f => f.schoolingStatus == 7);
          this.school_search.schoolingInformations[k].schoolsLists = this.school_search.schoolingInformations[k].schoolsLists.filter(f => f.schoolingStatus == 7);
        }

      }
    }
    console.log("schoolingInformations", this.school_search.schoolingInformations);
  }

  //****************************************************************************//
  //METODOS PAYMENT TYPE//
  //INSERCCION//
  addPaymentType() {
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'insertar';
    this.data.id = 0;
    this.data.schoolingSearchId = this.school_search.id;
    const dialog = this._dialog.open(DialogPaymentSchoolingComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("elemento guardado de payment: ", result);
      this.ngOnInit();
      //  if(result.success){
      //    console.log(result);
      //    result.id = 0;
      //    //result.housingList = 0;
      //    result.createdBy = this.user.id;
      //    result.createdDate = new Date();
      //    this.paymentSchooling.push(result);
      //    console.log("Psgos actualziados after popup =======================",this.paymentSchooling);
      //   }
    });
  }
  //EDICION//
  paymentSchooling = [];
  editPaymentType(element, i) {
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'edicion';
    this.data.i = i;
    this.data.pago = element;
    const dialog = this._dialog.open(DialogPaymentSchoolingComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("elemento guardado de payment: ", result);
      this.ngOnInit();
      //   if(result.success){
      //     result.updateBy = this.user.id;
      //     result.updatedDate = new Date();
      //    console.log(result);
      //    this.paymentSchooling[i] = result;
      //   }
    });
  }

  //Responsable//
  getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
  }

  //CURRENCY//
  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }

  async get_child() {
    this.__loader__.showLoader();
    //Number(this.data.data.serviceRecordId)
    await this._services.service_general_get("ServiceRecord/GetChildrenBySrId/" + Number(this.data.data.serviceRecordId)).subscribe(data => {
      // //console.log("GetChildrenBySrId==============",data);
      this.__loader__.hideLoader();
      if (data.success) {
        console.log("CHILD", data)
        // this.datos.partner_id = 
        //  //console.log("antes ==============",this.child)
        if (data.applicant.value != undefined) {
          this.child = data.applicant.value;
        }

        // //console.log("GetChildrenBySrId==============",this.child);
      }
    }, error => {

      console.error('[CP455] ServiceRecord/GetServices ==> ', error);
      // //console.log("Error GetChildrenBySrId============= =",error);
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "An error has occurred",
          body: "The service could not be oppened. contact support"
        },
        width: "350px"
      });
    });
  }

  Schooling_info = [];

  async GetSchoolinginformation() {

    await this._services.service_general_get('RelocationServices/GetSchoolinginformation?id=' + this.data.data.service[0].id).subscribe(data => {
      // //console.log("GetChildrenBySrId==============",data);

      if (data.success) {
        //  //console.log("antes ==============",this.child)
        // if(data.applicant.value != undefined){
        //   this.child = data.applicant.value;
        // }

        // //console.log("GetChildrenBySrId==============",this.child);
      }
    }, error => {

      console.error('RelocationServices/GetSchoolinginformation ==> ', error);
      // //console.log("Error GetChildrenBySrId============= =",error);
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "An error has occurred",
          body: "The service could not be oppened. contact support"
        },
        width: "350px"
      });
    });
  }

  //**********************************************************************************//
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(id) {
    
    const dialogRef = this._dialog.open(DialogAddPaymenentInformationComponent, {
      data: id,
      width: "85%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  //**EDIT REQUEST PAYMENT**//
  editPayment(data) {
    const dialogRef = this._dialog.open(DialogAddPaymenentInformationComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.get_payment();
    });
  }

  deletePayment(element) {
    debugger
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Confirmation",
        body: "Are you sure to delete the payment?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        this._services.service_general_post_with_url(`PaymentSchooling/DeletePaymenteSchools?key=`+ element.id, element.id).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Payment`
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }, (error) => {
            
        })
      }
    });
  }

  //**CONSULTA PAYMENT**//
  get_payment() {
    // //console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.school_search.workOrderServicesId).subscribe((data => {
      if (data.success) {
        //   //console.log('datos de tabla request', data);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        // //console.log('datos de la tabla' + data.result.value.payments);
      }
      //  //console.log('2° datos de la tabla' + this.payments);
    }))
  }
  deletePaymentConcept(data) {
    const dialogRef = this._dialog.open(DialogDeletepaymentconceptComponent, {
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      // //console.log(result);

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
            //this.get_payment();;
          }
        }))
      }
    })
  }

  //**********************************************************************************//
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    // //console.log(this.user);
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
    this.data.typeDocument = 20;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      //  //console.log(result);
      if (result.success) {
        result.schoolingSearchId = this.school_search.id;
        this.temporalDocument.push(result);
      }
    });
  }

  sent_schooling_list() {
    //
    this.__loader__.showLoader();
    let list_obj = { list: this.sl_to_send, id_sr: this.data.data.serviceRecordId, sender: this.user.id }

    console.log("DATA A enviar la servicio : ", list_obj);
    this._services.service_general_post_with_url("SchoolsList/SendSchoolList", list_obj).subscribe((data => {
      this.__loader__.hideLoader();
      //
      //console.log("resultado de SendPropertys: ", data, data.result.value);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "This action will change the status of the schools to 'Sent' and send an email notifying the assignee"
        },
        width: "350px"
      });
      this.getDataSchool();

    }), (err) => {
      this.__loader__.hideLoader();
      console.log("Error en SendPropertys: ", err);
    })
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
      // //console.log(result);
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
      //  //console.log(result);
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
      //  //console.log(result);
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
    //
    //this._services.service_general_get('SchoolsList/GetAllSchool?sr=' + Number(this.data.sr)).subscribe((data_schooling_list => { //this.area_orientation.workOrderServicesId
    this._services.service_general_get('SchoolsList/GetAllSchoolByWoId?wo_id=' + this.data.data.workOrderId + "&school_search_id="+this.school_search.id).subscribe((data_schooling_list => {
      //  //console.log('DATA CONSULTA SCHOOLING LIST: ', data_schooling_list);
      if (data_schooling_list.success) {
        console.log('DATA CONSULTA SCHOOLING LIST: ',data_schooling_list);
        this.dataSourceSchool = [];
        data_schooling_list.message.forEach(element => {
          this.dataSourceSchool.push({
            additionalComments: element.additionalComments,
            address: element.address,
            admision: element.admision,
            currency: element.currency,
            dependent: element.dependent,
            grade: element.grade,
            id: element.id,
            name: element.name,
            perMonth: element.perMonth,
            relAppointmentSchoolingLists: element.relAppointmentSchoolingLists,
            schoolName: element.schoolName,
            schoolNo: element.schoolNo,
            schoolingSearchId: element.schoolingSearchId,
            schoolingStatus: element.schoolingStatus,
            sendSchool: element.sendSchool,
            sendSchoolActive: element.sendSchool,
            status: element.status,
            supplierId: element.supplierId,
            visitDate: element.visitDate,
            visitDateTime: element.visitDateTime
          });
        });
        console.log('DATA CONSULTA SCHOOLING LIST: ',this.dataSourceSchool);
        
        //BRING DATA TABLE PAYMENTS/
        this.getDependent();
        //this.get_payment();
      }
    }));
  }
  //AGREGAR ESCUELA//
  addSchool() {
    //
    let data_ = {
      id: 0,
      schooling_search_id: this.school_search.id,
      workOrderId: this.data.data.workOrderId, //this.area_orientation.workOrderServicesId,
      service: this.data.data.serviceRecordId,
      serviceTypeId: this.data.data.serviceTypeId,
      sr: this.data.sr, 
      workOrderServicesId: this.school_search.workOrderServicesId,
      wo_: this.wo_,
      sr_: this.sr_
    }
    const dialogRef = this._dialog.open(DialogSchoolDetailsComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataSchool();
      //this.load_service();
    })
  }
  
  //EDITAR ESCUELA//
  editSchool(data_) {
    console.log("Editar escuela: ", data_);
    // data_.sr = this.data.sr;
    data_.wo_= this.wo_;
    data_.sr_= this.sr_;
    data_.sr= this.data.sr;
    data_.workOrderServicesId= this.school_search.workOrderServicesId;
    const dialogRef = this._dialog.open(DialogSchoolDetailsComponent, {
      data: data_,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataSchool();
    })
  }

  /// REFRESCAR SERVICO 

  load_service() {
    this.__loader__.showLoader();
    let _schoolingInformations: any[] = [];
    this._services.service_general_get('RelocationServices/GetSchoolingSearchById?id=' + this.data.data.service[0].id).subscribe((data => {
      //  //console.log('id', this.data.data.service[0].id);
      this.__loader__.hideLoader();
      if (data.success) {
        
        //   //console.log('DATA CONSULTA SCHOOL SEARCH: ', data);
        this.school_search = data.result;
        
        this.school_search.schoolingInformations.forEach(element => {
          
          _schoolingInformations.push({
            id: element.id,
            active: element.active,
            relationshipId: element.relationshipId,
            age: element.relationship.age,
            birth: element.relationship.birth,
            photo: element.relationship.photo.toString().includes("http") ? element.relationship.photo :  element.relationship.photo != "" ? this._services.url_images + element.relationship.photo : "",
            comments: element.relationship.aditionalComments,
            name: element.relationship.name,
            nationalityName: this.getNacionality(element.relationship.nationalityId),
            nationality: element.relationship.nationalityId,
            currentGrade: element.relationship.currentGrade,
            grade: this.getGrade(element.relationship.currentGrade),
            sex: element.relationship.sex,
            languageDependentInformations: element.relationship.languageDependentInformations,
            schoolsLists: element.relationship.schoolsLists,
            paymentSchoolingInformations: element.paymentSchoolingInformations
          });
        });

        this.school_search.schoolingInformations = _schoolingInformations;
        this.vista = true;
        //this.dataSourceSchool = this.school_search.schoolingInformations;
        this.dataSource = this.school_search.extensionSchoolingSearches;
        // if (this.school_search.commentSchoolingSearches.length == 0) {
        //   this.addReply();
        // }
        //    //console.log('data school', this.school_search);
        //this.get_payment();
        this.getDataSchool();
        //this.getServiceScope();
        this.get_child();
        // this.GetSchoolinginformation();
      }
    }));
  }

  //**********************************************************************************//
  getDependent() {
    //
    this.school_search.schoolingInformations.forEach(E => {
      for (let i = 0; i < this.dataSourceSchool.length; i++) {
        if (E.name == this.dataSourceSchool[i].name && this.dataSourceSchool[i].status == 'Permente School') {
          this._services.service_general_get("SchoolsList/GetSchool?key=" + this.dataSourceSchool[i].id).subscribe((data => {
            //    //console.log(data);
            if (data.success) {
              E.school = data.result;
            }
          }))
        }
      }
    });

    //  //console.log("OBJETO FINALLLLLLL: ", this.school_search);

    //  //console.log("data.relationship.schoolsLists", this.school_search.schoolingInformations[0].relationship.schoolsLists )
    //  //console.log("data.relationship.schoolsLists.lenght", this.school_search.schoolingInformations[0].relationship.schoolsLists.lenght )
  }
  //**********************************************************************************//
  //RELATION SHIP//
  getNameRelationShip(id) {
    for (let i = 0; i < this.relation_ship.length; i++) {
      if (this.relation_ship[i].id == id) {
        return this.relation_ship[i].relationship;
      }
    }
  }
  //LANGUAGES//
  getLanguages(l) {
    /////
    var lenguajes = "";
    if (l != null) {

      for (let i = 0; i < l.length; i++) {
        //for(let j = 0; j < l[i].languageSpokenNavigation.length; j++){
        lenguajes += l[i].languageNavigation?.name + ", "
        //}

      }
      
      return lenguajes.substring(0, lenguajes.length - 2);;
    }
    else {
      return "--";
    }
  }
  //NACIONALITY//
  getNacionality(id) {
    for (let i = 0; i < this.nacionality.length; i++) {
      if (this.nacionality[i].id == id) {
        return this.nacionality[i].nationality1;
      }
    }
  }
  //GRADE//
  getGrade(id) {
    for (let i = 0; i < this.grade.length; i++) {
      if (this.grade[i].id == id) {
        return this.grade[i].grade;
      }
    }
  }
  //DOCUMENT TYPE//
  getDocument(id) {
    for (let i = 0; i < this.ca_document.length; i++) {
      if (this.ca_document[i].id == id) {
        return this.ca_document[i].documentType;
      }
    }
  }
  //**********************************************************************************//
  //ELIMINAR HIJO//
  deleteChild(pos, data) {
    console.log(pos);
    this.school_search.schoolingInformations[pos].active = false;
    // console.log(this.data.data.service[0].id);
    console.log(data);
    this._services.service_general_post_with_url("RelocationServices/DeleteSchoolingSearch", data.id).subscribe((data => {
      if (data.success) {
        //    //console.log(data);
        this.__loader__.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
      }
    }));
    this.ngOnInit();
    console.log(this.school_search.schoolingInformations);
    
  }

  //AGREGAR HIJO//
  addChild() {
    console.log(this.data.data.service[0].id);
    console.log(this.data);
    this._services.service_general_get("ServiceRecord/GetChildrenBySchoolInformation/" + Number(this.data.data.serviceRecordId) + '?schoolingSearchId='+this.data.data.service[0].id).subscribe(res => {
      
      this.__loader__.hideLoader();
      if (res.success) {
        console.log( res.applicant.value);
          if(res.applicant.value != undefined){
            if(res.applicant.value.length > 0){
              let _schoolingInformations: any[] = [];
              res.applicant.value.forEach(element => {
                console.log("Element", element);
                _schoolingInformations.push({
                  id: element.id,
                  active: true,
                  relationshipId: element.dependentId,
                  age: element.age,
                  birth: element.birth,
                  photo: element.photo.toString().includes("http") ? element.photo : element.photo != "" ? this._services.url_images + element.photo : "",
                  comments: element.aditionalComments,
                  name: element.name,
                  nationalityName: element.nationality,
                  nationality: element.nationalityId,
                  currentGrade: element.currentGrade,
                  grade: element.grade,
                  sex: element.sex,
                  schoolsLists: element.schoolsLists,
                  languageDependentInformations: element.languageDependentInformations 
                });
              });
              const dialogRef = this._dialog.open(DialogAddchildComponent, {
                width: "350px",
                //  data: {"schooling": this.school_search.schoolingInformations
                //        ,"children": this.child}
                data: _schoolingInformations
        
              });
        
              dialogRef.afterClosed().subscribe(result => {
                
                
                this.school_search.schoolingInformations = result;
  
                console.log(this.school_search.schoolingInformations);
                let _schoolingInformations: any[] = [];
  

                this.school_search.schoolingInformations.forEach(element => {
                  if(element.active){
                    _schoolingInformations.push({
                      id: 0,
                      schoolingSearchId: this.data.data.service[0].id,
                      relationshipId: element.relationshipId,
                      avatar: element.photo,
                      name: element.name,
                      sex: element.sex, 
                      birth: element.birth,
                      age: element.age,
                      nationality: element.nationality, 
                      currentGrade: element.currentGrade,
                      comments: element.comments,
                      active: true 
                    });
                  }  
                });
                  
                console.log(JSON.stringify(_schoolingInformations));
  
                this._services.service_general_post_with_url("RelocationServices/AddSchoolingSearch", _schoolingInformations).subscribe((data => {
                  if (data.success) {
                    //    //console.log(data);
                    this.__loader__.hideLoader();
                    const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                      data: {
                        header: "Success",
                        body: "Update Data"
                      },
                      width: "350px"
                    });
                  }
                }))
                this.ngOnInit();
                //   //console.log("NUEVOS HIJOS: ",this.school_search);
              });
            }
            else
            {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Attention",
                  body: "There are no more children to add to the service"
                },
                width: "350px"
              });
            }
          }
          else{
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Attention",
                body: "There are no more children to add to the service"
              },
              width: "350px"
            })
          }
        }
        
    });

    console.log(this.school_search.schoolingInformations);
    
    // if (this.child.length > 0) {
    //   let _schoolingInformations: any[] = [];
    //   this.child.forEach(element => {
    //     _schoolingInformations.push({
    //       id: element.id,
    //       active: element.active,
    //       relationshipId: element.dependentId,
    //       age: element.age,
    //       birth: element.birth,
    //       photo: element.photo.toString().includes("http") ? element.photo : element.photo != "" ? this._services.url_images + element.photo : "",
    //       comments: element.aditionalComments,
    //       name: element.name,
    //       nationalityName: element.nationality,
    //       nationality: element.nationalityId,
    //       currentGrade: element.currentGrade,
    //       grade: element.grade,
    //       sex: element.sex,
    //       schoolsLists: element.schoolsLists,
    //       languageDependentInformations: element.languageDependentInformations 
    //     });
    //   });
    //   const dialogRef = this._dialog.open(DialogAddchildComponent, {
    //     width: "350px",
    //     //  data: {"schooling": this.school_search.schoolingInformations
    //     //        ,"children": this.child}
    //     data: _schoolingInformations

    //   });

    //   dialogRef.afterClosed().subscribe(result => {
        
    //     this.school_search.schoolingInformations = result;
    //     this.child = result;
    //     //   //console.log("NUEVOS HIJOS: ",this.school_search);
    //   });
    // } else {
    //   const dialog = this._dialog.open(DialogGeneralMessageComponent, {
    //     data: {
    //       header: "Attention",
    //       body: "There are no more children to add to the service"
    //     },
    //     width: "350px"
    //   });
    // }
    
  }


  //**********************************************************************************//
  save() {
    
    this.__loader__.showLoader();
    this.school_search.documentSchoolingSearches = this.temporalDocument;
    this.school_search.updateBy = this.user.id;
    this.school_search.updatedDate = new Date();
    this.school_search.createdBy = this.user.id;
    this.school_search.createdDate = new Date();

    let data_comment_aux = this.school_search.commentSchoolingSearches;
    this.school_search.commentSchoolingSearches = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.school_search.commentSchoolingSearches.push(data_comment_aux[i]);
      }
    }
    //
    // si el estatus cambia a complete la fecha se guarda
    console.log(this.school_search.schoolingInformations.length)
    //let _LanguangeSpokenSchoolingInformation: any[] = [];
    for(var i = 0; i < this.school_search.schoolingInformations.length; i++){
      
      this.school_search.schoolingInformations[i].nationality = this.school_search.schoolingInformations[i].nationalityId;
      // this.school_search.schoolingInformations[i].relationshipId = this.school_search.schoolingInformations[i].nationalityId; 
      this.school_search.schoolingInformations[i].schoolingSearchId = this.school_search.id;
      // for(var j = 0; j < this.school_search.schoolingInformations[i].languageDependentInformations.length; j++){
      //   //  
      //   _LanguangeSpokenSchoolingInformation.push({
      //     "schoolingInformation": 0,
      //     "languageSpoken": this.school_search.schoolingInformations[i].languageDependentInformations[j].language
      //   });
      //   console.log(this.school_search.schoolingInformations[i].languageDependentInformations[j].name)
      // }

      // this.school_search.schoolingInformations[i].languangeSpokenSchoolingInformation = _LanguangeSpokenSchoolingInformation;
    }


    if (this.school_search.statusId == 4 || this.school_search.statusId == 5) {
      this.school_search.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.school_search.serviceCompletionDate = '';
    }

    //
    console.log("SAVE INFORMATION: ",this.school_search);
    this.temporalDocument = [];
    
    this._services.service_general_put("RelocationServices/PutSchoolingSearch", this.school_search).subscribe((data => {
      if (data.success) {
        //    //console.log(data);
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

  public showDocumentDialogDetails(document: any, service_line: number = undefined): void {
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
