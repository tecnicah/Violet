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
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

interface Datos {
  workOrderServicesId: number;
  partner_id: number;
}

@Component({
  selector: 'app-pre-decision-orientation',
  templateUrl: './pre-decision-orientation.component.html',
  styleUrls: ['./pre-decision-orientation.component.scss']
})
export class PreDecisionOrientationComponent implements OnInit {

  //VISTA//
  show: boolean = false;
  //**********************************************//
  //*****************VARIABLES********************//
  //EXTENSION//
  today: Date = new Date();
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //HOUSING LIST//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Send', 'Property Type', 'Address', 'Neighborhood', 'Price', 'Currency', 'Housing Status', 'Actions'];
  //SCHOOLING LIST//
  dataSourceSchool: any[] = [];
  displayedColumnsSchool: string[] = ['Send', 'School No.', 'School Name', 'Dependent', 'Schooling Status', 'Actions'];
  //PAYMENTS
  dataSourcePayment: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];

  showPanelHousing: Boolean = false;
  showPanelSchooling: Boolean = false;
  hl_to_send = [];
  table_payments: any;
  user: any;
  temporalDocument: any[] = [];
  // request payment
  calculo: any = {};
  payments: any[] = [];
  //CATALOGOS_GET//
  ca_estatus: any[] = [];
  ca_requestType: any[] = [];
  area_orientation: any;
  nacionality: any;
  ca_document: any;
  ca_grade = [];
  isHousing: boolean = false;
  isSchool: boolean = false; 
  cr: string = "Reply";
  loader: LoaderComponent = new LoaderComponent();
  serviceScope = { "documentcountries": "", "scopeDescription":""};
  atributos_generales;
  sl_to_send: any[] =[];
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.show = true;
    ////console.log("DATA DE LA TABLA: ", this.data);
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.get_catalogos();
  }

  _texto_status = "";

  get_text_status() {
    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.area_orientation.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  };

  get_predesicion(){
    this._services.service_general_get('RelocationServices/GetPredecisionOrientationById?id=' + this.data.data.service[0].id).subscribe((data => {
      if (data.success) {
        debugger;
        this.area_orientation = data.result;
        this.isHousing = data.result.housing;
        this.isSchool = data.result.schooling;
        this.GetBasicServiceData();
        this.setup_permissions_settings();
        this.get_text_status();
        console.log('DATA RelocationServices/GetPredecisionOrientationById : ', this.area_orientation);
        setTimeout(() => {
          this._services.service_general_get("RelocationServices/GetChildrenPredecisionBySrId?sr=" + this.atributos_generales.sr_id +"&work_order_service_id="+data.result.workOrderServicesId).subscribe(res => {
      
            if (res.success) {
              console.log("GetChildrenBySchoolingPredecision", res);
              this.area_orientation.schoolings = res.applicant.value;
            }
          }, error => {
      
          });
          // this._services.service_general_get('RelocationServices/GetChildrenBySchoolingPredecision?sr='+ this.atributos_generales.sr_id + '&predecisionId='+ data.result.id)
          // .subscribe(res => {
          //   if (res.success) {
          //     console.log("GetChildrenBySchoolingPredecision", res);
          //     this.area_orientation.schoolings = res.applicant.value;
          //   }
          // });
        }, 300);
       
        // this.showPanelHousing = this.area_orientation.housing;
        // this.showPanelSchooling = this.area_orientation.schooling;

        //DATA TABLE EXTENSION//
        // this.dataSource = this.area_orientation.extensionAreaOrientations;
        this.getDataHousing();
        this.getDataSchool();
        
        this.loader.hideLoader();
        // this.getServiceScope();
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al cargar el predecision========================: ", err);
    });
  }

  change_status_detail() {
    ////debugger;
    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 17, //categori_id pre desicion
        type: "area_prientation",
        type_id: 17,
        srId: this.data.sr,
        wos_id: this.area_orientation.workOrderServicesId,
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      //debugger;
      // //console.log(result);
      this.loader.showLoader();
      if (result.success) {
        this.area_orientation.statusId = result.id; //penidng to completion 
        this.get_text_status();

        this._services.service_general_put("RelocationServices/PutPreDecisionOrientationStatus", this.area_orientation).subscribe((data => {
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
          }
        }));
      }
      else {
        //nada 
      }
    });
  };

    //////////////////////manage estatus 

    disabled_by_permissions: boolean = false;
    hide_by_permissions: boolean = false;
    hide_complete: boolean = false;
    show_completed: boolean = false;
    show_progress: boolean = false;
    wo_ : boolean = false;
    sr_: boolean = false;
  
    setup_permissions_settings(){
      ////debugger;
      if (!this.data.data.numberWorkOrder){
         this.wo_ = this.data.workOrderId;
      }
      else{
        this.wo_ = this.data.data.numberWorkOrder
      }
  
      if(!this.data.data.number_server){
        this.sr_ = this.data.data.serviceNumber
      }
      else{
        this.sr_ = this.data.data.number_server
      }
  
      if(this.user.role.id == 3){
         this.disabled_by_permissions = true 
      }
      else{
        this.hide_by_permissions = true;
      }
      if(this.area_orientation.statusId != 39 && this.area_orientation.statusId != 2 ){ //active , in progress
        this.hide_complete= true;
      }
      else{
        if(this.area_orientation.statusId == 39){
          this.show_progress = true;
        }
        else{
          this.show_completed = true;
        }
      }
    }
  
    change_button(){
      ////debugger;
      if(this.show_completed){
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
  
      if(this.show_progress){
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

   // get service scope
   getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.area_orientation.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
      if (resp.success) {
        ////console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }

  // ver doscumets
  public __serverPath__:string = this._services.url_images;

  public openFileOnWindow( url_in:string ):void {
    const server_url:string = this.__serverPath__ + url_in;
    window.open( server_url );
  }
  //***********************************************************************************//
  //GET DEPENDENT//
  applicant = [];
  get_dependent() {
    this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((data => {
      if (data.success) {
        ////console.log(data.applicant.value);
        this.applicant = data.applicant.value
      }
    }))
  }
  //***********************************************************************************//
  //CONSULTING INFORMATION CATALOGOS//
  ca_privacy = [];
  async get_catalogos() {
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=12").subscribe((data => {
      ////console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/12').subscribe((data => {
      if (data.success) {
        this.ca_document = data.result;
        ////console.log(this.ca_document);
      }
    }))
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.ca_grade = await this._services.getCatalogueFrom('GetGradeSchooling');


    this.get_predesicion();
    // this.get_dependent();
  }
  //***********************************************************************************//
  //DATA TABLE HOUSING//
  
  getDataHousing() {
    //debugger;

    this._services.service_general_get(`HousingList/GetSegmentedHousing?wo_id=${this.data.data.workOrderId}&id_service_detail=${this.data.data.service[0].id}&shared=${0}`).subscribe(data_housing => {
     //debugger;
      if (data_housing.success) {
        this.area_orientation.housing = data_housing.message;
       
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.isHousing = data_housing.message.length > 0 ? true : false;
        
        this.dataSourceHousing = data_housing.message; 
      }
    });
  }


  validatedeleteHousing(_data_) {

    if (_data_.wassended || _data_.status != 'Pending') {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Not Allowed",
          body: "The property has already been sent, it cannot be deleted."
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
          // this.save();
          this.delete_housing(_data_);
        }
      });
    }
  }

  delete_housing(_data_) {
    this.loader.showLoader();

    this._services.service_general_put("HousingList/LogicDeleteHousing", _data_.id).subscribe((data => {
      console.log("guardar db: ", data);

      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        this.loader.hideLoader();
        this.getDataHousing();
        // this.dialogRef.close();
        // this.ngOnInit();
      }
    }), (err) => {
      this.loader.hideLoader();
      this.getDataHousing();
      console.log("error: ", err);
    })
  }

  //***********************************************************************************//

  getDataSchool() {
    debugger;
     this._services.service_general_get('SchoolsList/GetAllSchoolByserviceid?wo_id=' + this.data.data.workOrderId + "&service_id="+this.area_orientation.id).subscribe((data_schooling_list => {
      if (data_schooling_list.success) {
        console.log("data_schooling_list", data_schooling_list);
        this.area_orientation.schooling = data_schooling_list.message; 
     
        this.isSchool = data_schooling_list.message.length > 0 ? true : false;
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
        // this.dataSourceSchool = data_schooling_list.message;
      }
    }));
  }
  //***********************************************************************************//

  /// get info del asignado para traer dependientes 

  dependents: any = [];

  get_assaigne_info() {
    ////debugger;
    this._services.service_general_get("AssigneeInformation/GetAssigneeInfoByWOSId?wos_id=" + this.area_orientation.workOrderServicesId).subscribe((data => {
     ////debugger;
      if (data.success) {
        ////console.log("GetAssigneeInfoByWOSId ====================",data.result);
        this.dependents = data.result.dependentInformations.filter(d => d.relationshipId  == 2);
        ////console.log("this.dependents ====================",this.dependents);
      } 
    }))
  }

  //**CONSULTA PAYMENT**//
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.area_orientation.workOrderServicesId).subscribe((data => {
      if (data.success) {
        ////console.log(data.result);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.table_payments = data.result.value.payments;
        ////console.log(this.table_payments);
      }
      ////console.log(this.table_payments);
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
    this.area_orientation.reminderPredecisionOrientations.push({
      "id": 0,
      "predecisionOrientationId": this.area_orientation.id,
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
      ////console.log(result);
      if (result) {
        if (id == 0) {
          this.area_orientation.predecisionOrientationId.splice(i, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteReminderPDO?id=" + id).subscribe((data => {
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
    ////console.log(this.user);
    this.area_orientation.commentPredecisionOrientations.push({
      "id": 0,
      "predecisionOrientationId": this.area_orientation.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })
    if (this.area_orientation.commentPredecisionOrientations.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }
  public  date = new Date();
  getAge(fecha) {
    let cumpleanos = new Date(fecha);
    let edad =  this.date.getFullYear() - cumpleanos.getFullYear();
    let m =  this.date.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && cumpleanos.getDate() <  this.date.getDate())) {
      edad--;
    }
  return edad;
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
      type_housing: 1,
      //workOrderServicesId: this.data.data.workOrderId
      workOrderServicesId: this.area_orientation.workOrderServicesId
    }
    const dialogRef = this._dialog.open(DialogHousingSpecificationsComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
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
        supplierType: 3,
        no_permanent: true
        ,idServiceDetail: this.data.data.service[0].id
        ,shared: 0,
        cat_service_id: 17,
        catCategoryId: 12
      },
      width: "95%"
    }); 
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //EDIT HOUSING//
  editHousing(data) {
    ////console.log("Editar Housing: ", data);
    data.supplierType = 3
    data.workOrderServicesId = this.area_orientation.workOrderServicesId,
      data.sr = this.data.sr;
    data.numberWorkOrder = this.data.data.numberWorkOrder;
    data.serviceID = this.data.data.number_server;
    data.serviceName = this.data.data.service_name;
    data.idServiceDetail =  this.data.data.service[0].id;
    data.shared = 0;
    data.cat_service_id = 17;
    //data.sr = this.data.sr;
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }

  // editHousing(data){ 
  //   data.supplierType = 3
  //   data.workOrderServicesId = this.home_finding.workOrderServicesId,
  //   data.sr = this.data.sr;
  //   data.numberWorkOrder = this.data.data.numberWorkOrder;
  //   data.serviceID =  this.data.data.number_server;
  //   data.serviceName = this.data.data.service_name;
  //   data.idServiceDetail =  this.home_finding.id;
  //   data.shared = 1;
  //   data.cat_service_id = 26;
  //   ////console.log("Editar Housing: ", data);
  //   const dialogRef = this._dialog.open(DialogHomeDetailsComponent,{
  //     data: data,
  //     width: "95%"
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getDataHousing();
  //   })
  // }
  //**********************************************************************************//
  //AGREGAR ESCUELA//
  addSchool() {
    let data_ = {
      id: 0,
      schooling_search_id: this.area_orientation.id,
      workOrderId: this.data.data.workOrderId, //this.area_orientation.workOrderServicesId,
      service: this.data.data.serviceRecordId,
      serviceTypeId: this.data.data.serviceTypeId,
      sr: this.data.sr, 
      workOrderServicesId: this.area_orientation.workOrderServicesId,
      wo_: this.wo_,
      sr_: this.sr_
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
    console.log("Editar escuela: ", data_);
    // data_.sr = this.data.sr;
    data_.wo_= this.wo_;
    data_.sr_= this.sr_;
    data_.sr= this.data.sr;
    data_.workOrderServicesId= this.area_orientation.workOrderServicesId;
    const dialogRef = this._dialog.open(DialogSchoolDetailsComponent, {
      data: data_,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataSchool();
    })
  }
  //Send School
  setSchool(event, obj, indextable){
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
  }

  sent_schooling_list() {
    //
    this.loader.showLoader
    let list_obj = { list: this.sl_to_send, id_sr: this.data.data.serviceRecordId }

    console.log("DATA A enviar la servicio : ", list_obj);
    this._services.service_general_post_with_url("SchoolsList/SendSchoolList", list_obj).subscribe((data => {
      this.loader.hideLoader();
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
      this.loader.hideLoader();
      console.log("Error en SendPropertys: ", err);
    })
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
          body: "Are you sure to delete the school?"
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

  //**********************************************************************************//
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment(data) {
    ////console.log('workOrderServicesId', this.area_orientation.workOrderServicesId);
    if (data == null) {
      data = {
        serviceRecord: this.data.data.serviceRecordId,
        sr: this.data.data.serviceRecordId,
        workOrderServices: this.area_orientation.workOrderServicesId,
        workOrder: this.data.data.workOrderId,
        service: this.data.data.id_server,
        id: 0,
        type: 2,
        supplierType: 3
      }
    } else {
      data.type = 2;
      data.supplierType = 3;
      data.id = data.requestPaymentId;
      data.serviceRecord = this.data.data.serviceRecordId;
      data.sr = this.data.data.serviceRecordId;
      data.service = this.data.data.id_server;
    }
    ////console.log("Data al abrir modal de payment concept: ", data);
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
  // delete request payment
  deletePaymentConcept(data) {
    const dialogRef = this._dialog.open(DialogDeletepaymentconceptComponent, {
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);

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
  //**METHODS ADD DOCUMENT**//
  addDocument() {
    this.data.typeDocument = 12;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
      if (result.success) {
        result.predecisionOrientationId = this.area_orientation.id;
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
      ////console.log(result);
      if (result) {
        this._services.service_general_delete("RelocationServices/DeleteDocumentPDO?id=" + id).subscribe((data => {
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
      ////console.log(result);
      if (result) {
        this.temporalDocument.splice(position, 1);
      }
    })
  }
  //**********************************************************************************//
  //ELIMINAR HIJO//
  deleteChild(pos, data) {
    console.log(pos);
    // console.log(this.data.data.service[0].id);
    console.log(data);
    debugger;
    this._services.service_general_post_with_url("RelocationServices/DeleteSchoolingPredecision", data.id).subscribe((data => {
      if (data.success) {
        //    //console.log(data);
        this.loader.showLoader;
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Child Remove"
          },
          width: "350px"
        });
      }
    }));
    this.ngOnInit();
    
  }

  //AGREGAR HIJO//
  addChild() {
    this._services.service_general_get('RelocationServices/GetServiceChildToAddByWos_Id?wos_id='+ this.area_orientation.workOrderServicesId + '&sr_id='+ this.atributos_generales.sr_id)
    .subscribe(res => {
      console.log(res);
      this.loader.showLoader
      if (res.success) {
        if(res.child != undefined){
          if(res.child.length > 0){
            let _schoolingInformations: any[] = [];
            res.child.forEach(element => {
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
              
              debugger;
              //this.area_orientation.schooling = result;
              //console.log(this.area_orientation.schoolingInformations);
              let _schoolingInformations: any[] = [];

              console.log(this.area_orientation.workOrderServiceId);
              result.forEach(element => {
                if(element.active){
                  _schoolingInformations.push({
                    id: 0,
                    schoolingSearchId: this.data.data.service[0].id,
                    relationshipId: element.dependentId,
                    avatar: element.photo,
                    name: element.name,
                    sex: element.sex, 
                    birth: element.birth,
                    age: element.age,
                    nationality: element.nationality, 
                    currentGrade: element.currentGrade,
                    comments: element.comments,
                    active: true,
                    workOrderServiceId: this.area_orientation.workOrderServicesId,
                    id_dependent: element.id,
                  });
                }  
              });
                
              console.log(JSON.stringify(_schoolingInformations));
    
                  this._services.service_general_post_with_url("RelocationServices/AddServiceChild", _schoolingInformations).subscribe((data => {
                    if (data.success) {
                      //    //console.log(data);
                      this.loader.hideLoader;
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

  }
  //**********************************************************************************//
  //DOCUMENT TYPE//
  getDocument(id) {
    for (let i = 0; i < this.ca_document.length; i++) {
      if (this.ca_document[i].id == id) {
        return this.ca_document[i].documentType;
      }
    }
  }
  //NACIONALITY//
  getNacionality(id) {
    if(this.nacionality != undefined  && this.nacionality != null){
      for (let i = 0; i < this.nacionality.length; i++) {
        if (this.nacionality[i].id == id) {
          return this.nacionality[i].name;
        }
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
        return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
      }
    }
  }
  //**********************************************************************************//
  //**********************************************************************************//
  save() {
    this.loader.showLoader();
    ////console.log("SAVE INFORMATION: ", this.area_orientation);
    this.area_orientation.documentPredecisionOrientations = this.temporalDocument;
    this.area_orientation.updateBy = this.user.id;
    this.area_orientation.updatedDate = new Date();
    this.area_orientation.createdBy = this.user.id;
    this.area_orientation.createdDate = new Date();
    this.area_orientation.authoDateExtension = new Date();
    this.area_orientation.authoAcceptanceDateExtension = new Date();
    this.area_orientation.housing = this.isHousing;
    this.area_orientation.schooling = this.isSchool;
    ////console.log(this.area_orientation);

    let data_comment_aux = this.area_orientation.commentPredecisionOrientations;
    this.area_orientation.commentPredecisionOrientations = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.area_orientation.commentPredecisionOrientations.push(data_comment_aux[i]);
      }
    }
    // si el estatus cambia a complete la fecha se guarda
    if (this.area_orientation.statusId == 4 || this.area_orientation.statusId == 5) {
      this.area_orientation.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.area_orientation.serviceCompletionDate = '';
    }

    if(this.area_orientation.statusId == 4 || this.area_orientation.statusId == 5){
      this.area_orientation.serviceCompletionDate = new Date().toISOString();
    }
    
    this.area_orientation.schoolings = [];
    debugger;
    this._services.service_general_put("RelocationServices/PutPreDecisionOrientation", this.area_orientation).subscribe(data => {
      if (data.success) {
        ////console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close();
        this.temporalDocument = [];
        this.ngOnInit();
        this.loader.hideLoader();
      }
      else{
        console.error('ERROR PutPreDecisionOrientation ==> ', data);
        this.loader.hideLoader();
  
        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "An error has occurred",
            body: "The service could not be saved. contact support"
          },
          width: "350px"
        });
        this.dialogRef.close();
      }
    }, error => {
      console.error('ERROR PutPreDecisionOrientation ==> ', error);
      this.loader.hideLoader();

      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "An error has occurred",
          body: "The service could not be saved. contact support"
        },
        width: "350px"
      });
      this.dialogRef.close();
   });
   
  }

  public showDocumentDialogDetails(document: any, service_line: number = undefined): void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        name_section: "only_one_service",
        sl : 1
      }
      // aqui se manda sl 1 que en caso de modales de doc es relocation
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

  ////////////////////// nuevas funciones oct 2022 

  set_houses_to_send(id, set) {

    if (set) {
      this.hl_to_send.push(id);
    }
    else {
      this.hl_to_send = this.hl_to_send.filter(function (E) {
        if (E != id) {
          return true;
        }
      });
    }

  }

  onChangeDemo(ob: MatCheckboxChange, element) {
    element.wassended = ob.checked;
    console.log("checked: " + ob.checked, " id housing: ", element.id);
    this.set_houses_to_send(element.id, ob.checked)
  }

  sent_houses_list() {

    console.log("casas a enviar: ", this.hl_to_send);

    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Confirmation",
        body: "This action will change the status of the properties to 'Sent' and send an email notifying the assignee."
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      // //console.log(result);
      if (result) {
        //this.getDataHousingList();
        this.call_service_send_propertys();
      }
    });
  }

  call_service_send_propertys() {
    this.loader.showLoader();
    let list_obj = { list: this.hl_to_send, id_sr: this.data.data.serviceRecordId, sender: this.user.id }

    console.log("DATA A enviar la servicio : ", list_obj);
    this._services.service_general_post_with_url("HousingList/SendPropertys", list_obj).subscribe((data => {
      this.loader.hideLoader();

      console.log("resultado de SendPropertys: ", data, data.result.value);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Properties Sent"
        },
        width: "350px"
      });


    }), (err) => {
      this.loader.hideLoader();
      console.log("Error en SendPropertys: ", err);
    })
  }

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


  ///////////////////////////// JUNIO 2023 




isVisible:boolean =false;

  datos:Datos = {
    workOrderServicesId: 0,
    partner_id: 0
  };


GetBasicServiceData() {
  this.loader.showLoader();
  this._services.service_general_get(`ServiceRecord/GetBasicServiceDataByWosId?wos_id=${this.area_orientation.workOrderServicesId}`).subscribe(resp => {
    this.loader.hideLoader();
    if (resp.success) {
      console.log(' GetBasicServiceData: ================================', resp);
      this.atributos_generales = resp.atributos_generales.value[0];
      this.datos.partner_id =this.atributos_generales.partner_id;
      this.datos.workOrderServicesId = this.atributos_generales.wos_id;
      this.datos.partner_id =  this.atributos_generales.partner_id;
      this.isVisible =true;
      console.log(' GetBasicServiceData: ================================', this.atributos_generales);
    }
  });
};
 
}
 