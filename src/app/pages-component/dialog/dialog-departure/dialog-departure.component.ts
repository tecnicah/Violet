import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../environments/environment';
import { Item } from 'pdfmake-wrapper';
import { HousinglistComponent } from '../housinglist/housinglist.component'
import { LsfSelectComponent } from '../../dialog/lsf-select/lsf-select.component'
import { IrSelectComponent } from '../../dialog/ir-select/ir-select.component'

interface Datos {
  workOrderServicesId: number;
  partner_id: number;
}

@Component({
  selector: 'app-dialog-departure',
  templateUrl: './dialog-departure.component.html',
  styleUrls: ['./dialog-departure.component.scss']
})
export class DialogDepartureComponent implements OnInit {

  //**********************************************//
  //*****************VARIABLES********************//
  propertySwitch: false;
  user: any; //era public
  departure: any = {}; //era public

  //CATALOGOS_GET//
  ca_estatus: any[] = [];
  ca_document: any;
  ca_currency: any;
  ca_dependent: any[] = [];
  today_: Date = new Date();
  ca_supplier: any[] = [];
  _deliveredTo;
  _city_name;
  _country_name;
  vista = false;
  dataSourceHousing = [];
  temporalDocument = []; 
  _texto_status = "";
  disabled_by_permissions: boolean = false;
  hide_by_permissions: boolean = false;
  hide_complete: boolean = false;
  show_completed: boolean = false;
  show_progress: boolean = false;
  wo_: boolean = false;
  sr_: boolean = false;
    /////////////////////// FUNCiONES BOTONERA //////////////////////
    serviceScope = { "documentcountries": "", "scopeDescription": "" };
    serviceGeneralItems = { "documentsServiceDetails": [], "commentServiceDetails": [], "reminderServiceDetails": [] };
  // se agrego para credit card
  ca_accountType = [];
  ca_payment_Type = [];
  ca_responsible = [];
  ca_recurrence = [];
  ca_statuspropertySection = [];
  ca_propertySection = [];
  ca_relation = [];
  ca_repair = [];
  SupplierCompany = []
  ca_property = [];
  ca_privacy = [];
  ca_security = [];
  public today = new Date();

  ca_initial = [];
  ca_ongoing = [];
  ca_realtor_com = [];
  ca_leaseTemplate: any[] = [];
  //BRING DATA CATALOGUES//
//*****************************************************************************************************//
  //**PERMANENT HOME**//
  permanentHome: any = { "id": null };
  data_inspection = [];
  data_repairs = [];
  data_home = [];
  payments_due = [];
  payments_not_due = [];
  data_land_historic = [];
  data_group_saving: any = { costSavingHomes: [] };
  data_group_paymnets: any = { paymentHousings: [] };
  recurrence_static = [{ id: "Monthly" }, { id: "Bimonthly" }, { id: "Quarterly" }, { id: "Annually" }, { id: "Biannually" }];
  lapsos_dias = [{ id: 10 }, { id: 15 }, { id: 30 }, { id: 45 }, { id: 60 }, { id: 90 }, { id: 120 }]
  data_land_list = [];
  payment_rocess = { "securityDepositId": null, "initialRentPaymentId": null, "ongoingRentPaymentId": null, "realtorCommissionId": null }
  dataData_land_list = new MatTableDataSource(null);
  url_api = `${environment.URL_EXPORT}`;
  ca_asistance: any[] = [];
  isVisible:boolean =false;
  datos:Datos = {
    workOrderServicesId: 0,
    partner_id: 0
  };



  public loader: LoaderComponent = new LoaderComponent();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {

  }
  //*****************************************************************************************************//
  ngOnInit() {
    //this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    //console.log("datos de la tabla: ========================", this.data);
    this.get_catalogos();

  }

  ////////////////////// NUEVAS FUNCIONES NO LS NI IR ///////////////////////////////////////////


  get_text_status() {
    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.departure.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  };

  change_status_detail() {
    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 16, //departurre
        type: "home_findig",
        cat_category_id: this.atributos_generales.cat_category_id,
        type_id: this.atributos_generales.type_id,
        srId: this.atributos_generales.sr_id,
        wos_id: this.departure.workOrderServicesId,
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.success) {
        this.departure.statusId = result.id; //penidng to completion 
        this.get_text_status();
      }
      else {
      }
    });
  };

  ////////////////////// FIN NUEVAS FUNCIONES NO LS NI IR ///////////////////////////////////////////

  setup_permissions_settings() {
    ////debugger;
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
    if (this.departure.statusId != 39 && this.departure.statusId != 2) { //active , in progress
      this.hide_complete = true;
    }
    else {
      if (this.departure.statusId == 39) {
        this.show_progress = true;
      }
      else {
        this.show_completed = true;
      }
    }
  }

  change_button() {
    if (this.show_completed) {
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Are you sure the service is complete?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.departure.statusId = 37; //penidng to completion 
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
          this.departure.statusId = 2; //penidng to completion 
          this.save();
        }
      });
    }
  }

  //////////////////////manage estatus 

  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.departure.workOrderServicesId}&client=${this.data.data.partnerId}`).subscribe(resp => {
      if (resp.success) {
        ////console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }

  public __serverPath__: string = this._services.url_images;
  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }


  //*****************************************************************************************************//

  async get_catalogos() {

    this._deliveredTo = this.data.data.deliveredTo;
    this._city_name = this.data.data.location;
    this._country_name = this.data.data.country;
    /////EXTRAS ARRIBA //////////////////////////

    this.today_.setDate(this.today_.getDate() + 1);
    this.loader.showLoader();
    this.ca_security = await this._services.getCatalogueFrom('GetSecurityDeposit');
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection'); //
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.ca_supplier = await this._services.getCatalogueFrom('GetSupplier');
    this.ca_asistance = await this._services.getCatalogueFrom('GetAssistanceWith');

    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=16").subscribe((data => {
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }));

    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      if (data.success) {
        this.ca_document = data.result;
      }
    }));

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r => {
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });

    this.ca_recurrence = duration.filter(function (E) {
      if (E.recurrence != null) {
        return true;
      }
    });

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r => {
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });


    this._services.service_general_get('RelocationServices/GetDepartureById?id=' + this.data.data.service[0].id).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA GetDepartureById: ', data);
        this.departure = data.result;
        this.vista = true;
        

        this.getDataHousing(); //permanent home
       
        this.getServiceScope();
        this.setup_permissions_settings();
        this.loader.hideLoader();
        this.get_text_status();
        this.GetBasicServiceData();
      }
    }));

  }


  marcar_opcion(data) {

    if (data.check)
      data.check = false;
    else
      data.check = true;

    console.log('data: ', data);

  }

  //*****************************************************************************************************//
  propertyDetails(data_) {
    ////console.log(data_);
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        workOrderServicesId: this.departure.workOrderServicesId,
        type: 2,
        supplierType: 3,
        id: Number(data_),
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      /*
      ////console.log(result);
      result.departaureId = this.departure.id;
      result.ongoingPayment = result.paymentResponsibility;
      this.departure.departurePayments.push(result);
      ////console.log("cierre del dialog addPaymentType: ", this.departure.departurePayments);
      */
    });
  }
  

  //Supplier//
  getProperty_(id) {
    for (let i = 0; i < this.ca_property.length; i++) {
      if (this.ca_property[i].id == id) {
        return this.ca_property[i].propertyType;
      }
    }
  }


  //DATA TABLE HOUSING//
  getDataHousing() {

    this._services.service_general_get(`HousingList/GetPermanentHousingList?id_sr=${this.data.sr}`).subscribe(data_housing => {
      if (data_housing.success) {
        //debugger;
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        this.permanent_homet(this.departure.propertyId);

      }
    });
  }

  //NEW RECORD//
  HomeDetailsnew() {

    this.permanentHome.id = null;
    this.permanent_homet(this.departure.propertyId); // esto para borrar los datos de la casa que pudo haber estado seleccioanda 

    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.departure.workOrderServicesId,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName: this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId: this.data.data.serviceTypeId,
        sr: this.data.sr,
        supplierType: 3,
        no_permanent: false
        , idServiceDetail: this.departure.id
        , shared: 1,
        cat_service_id: 21
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
    });


  }
  //Recurrencia//
  getRecurrence(id) {
    for (let i = 0; i < this.ca_recurrence.length; i++) {
      if (this.ca_recurrence[i].id == id) {
        return this.ca_recurrence[i].recurrence;
      }
    }
  }
  //Payment//
  getPayment(id) {
    // //debugger;
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if (this.ca_payment_Type[i].id == id) {
        // //debugger;
        return this.ca_payment_Type[i].type;
      }
    }
  }
  //Responsable//
  getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
  }
  //DEPENDENT//
  getDependent(id) {
    for (let i = 0; i < this.ca_dependent.length; i++) {
      if (this.ca_dependent[i].id == id) {
        return this.ca_dependent[i].name;
      }
    }
  }
  //DEPENDENT//
  getAccount(id) {
    for (let i = 0; i < this.ca_accountType.length; i++) {
      if (this.ca_accountType[i].id == id) {
        return this.ca_accountType[i].accountType;
      }
    }
  }
  //Seccion property//
  getProperty(id) {
    for (let i = 0; i < this.ca_propertySection.length; i++) {
      if (this.ca_propertySection[i].id == id) {
        return this.ca_propertySection[i].propertySection;
      }
    }
  }
  //Seccion property//
  getCondicion(id) {
    for (let i = 0; i < this.ca_statuspropertySection.length; i++) {
      if (this.ca_statuspropertySection[i].id == id) {
        return this.ca_statuspropertySection[i].status;
      }
    }
  }
  //RELATION SHIP//
  getReltion(id) {
    for (let i = 0; i < this.ca_relation.length; i++) {
      if (this.ca_relation[i].id == id) {
        return this.ca_relation[i].relationship;
      }
    }
  }

  getRepair(id) {
    for (let i = 0; i < this.ca_repair.length; i++) {
      if (this.ca_repair[i].id == id) {
        return this.ca_repair[i].repairType;
      }
    }
  }

  //Supplier//
  getSupplier(id) {
    for (let i = 0; i < this.SupplierCompany.length; i++) {
      if (this.SupplierCompany[i].int == id) {
        return this.SupplierCompany[i].supplierCompany;
      }
    }
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
    });
  }
  //*****************************************************************************************************//
  //************************************//
  public files: NgxFileDropEntry[] = [];
  //**FUNCIONES DE CARGA DE DOCUMENTO***//


  addDocument() {
    this.data.typeDocument = 16; //departure
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
      if (result.success) {
        ////debugger;
        result.departaureId = this.departure.id;
        this.temporalDocument.push(result);
      }
    });
  }

 
  //******************************************************************************************************//
  //DOCUMENT TYPE//
  getDocument(id) {
    for (let i = 0; i < this.ca_document.length; i++) {
      if (this.ca_document[i].id == id) {
        return this.ca_document[i].documentType;
      }
    }
  }

  
  //INCLUDED//
  getIncluded(data) {
    if (data == false) {
      return 'NO';
    } else if (data == true) {
      return 'SI';
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
  //*****************************************************************************************************//
  //**SAVE**//
  save() {
    this.loader.showLoader();
    this.departure.updateBy = this.user.id;
    this.departure.updatedDate = new Date();
    this.departure.createdBy = this.user.id;
    this.departure.createdDate = new Date();
    this.departure.documentDepartures = this.temporalDocument;
    this.temporalDocument = [];

    for (let i = 0; i < this.ca_asistance.length; i++) {
      const element = this.ca_asistance[i];
      this.ca_asistance[i].assistanceWith = this.ca_asistance[i].id;
      if (this.ca_asistance[i].idDB != undefined) {
        this.ca_asistance[i].id = this.ca_asistance[i].idDB;
      } else {
        this.ca_asistance[i].id = 0;
      }
      if (this.ca_asistance[i].check != true) {
        this.ca_asistance.splice(i, 1);
      } else {
        this.ca_asistance[i].departaureId = this.departure.id;
      }
    }
    this.departure.departureAssistanceWiths = this.ca_asistance;

    let data_comment_aux = this.departure.commentDepartures;
    this.departure.commentDepartures = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.departure.commentDepartures.push(data_comment_aux[i]);
      }
    }
    // si el estatus cambia a complete la fecha se guarda
    if (this.departure.statusId == 4 || this.departure.statusId == 5) {
      this.departure.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.departure.serviceCompletionDate = '';
    }

    ////console.log("SAVED DATA: ", this.departure);
    // service_general_post_with_url

    this._services.service_general_put("RelocationServices/PutDeparture", this.departure).subscribe((data => {
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
        this.temporalDocument = [];
        this.ngOnInit();
      }
      this.loader.hideLoader();
    }))

  }
  //*****************************************************************************************************//
  displayPanelSchooling($event) {
    this.departure.propertyDeparture = $event.checked;
  }
  //*****************************************************************************************************//
  addOther() {
    this.ca_asistance.push({
      "assistance": "Other",
      "completionDate": null,
      "createdBy": null,
      "createdDate": null,
      "id": 4,
      "id_other": 0,
      "other": null,
      "updateBy": null,
      "updatedDate": null
    })
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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// NUEVAS FUNCIONES PERMANENT //////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  permanent_homet(id_ph) {
    if (id_ph > 0) {
      //this.loader.showLoader();
      this.GetOnlyPropertyDetails(id_ph);
    }
  }

  GetOnlyPropertyDetails(id_ph) {
    this.loader.showLoader();
    this._services.service_general_get("HousingList/GetOnlyPropertyDetails?key=" + id_ph + "&servide_detail_id=" + this.departure.id).subscribe((data => {
      this.permanentHome = data.result.value;
      console.log('DETALLES DE LA CASA PERMANENTE : ', this.permanentHome);
      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////// JUNIO  2023 ////////////////////////////////////

openhousinglist() {
  const dialogRef = this._dialog.open(HousinglistComponent, {
    data: {
      ph_id: this.permanentHome.id,
      servide_detail_id: this.departure.id,
      options: { movein: true, moveout: false, ir: true }
      , sr_id: this.atributos_generales.sr_id
      , wos_id: this.departure.workOrderServicesId
    },
    width: "90%",
  });

  dialogRef.afterClosed().subscribe(result => {


    this.ngOnInit();
    if (result.success) {
      
      console.log("po pup de HOSUING LIST cerrado succes true")
    }
    else {
      console.log("po pup de LSF cerrado succes false")
    }
  });
};

atributos_generales;

GetBasicServiceData() {
  this.loader.showLoader();
  this._services.service_general_get(`ServiceRecord/GetBasicServiceDataByWosId?wos_id=${this.departure.workOrderServicesId}`).subscribe(resp => {
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


lsfselect() {
  const dialogRef = this._dialog.open(LsfSelectComponent, {
    data: {
      ph_id: this.permanentHome.id,
      servide_detail_id: this.departure.id,
      sr_id: this.atributos_generales.sr_id
      , cat_category_id: this.atributos_generales.cat_category_id
      , type_id: this.atributos_generales.type_id,
    },
    width: "700px",
    // height: "80%"
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result.success) {
      console.log("po pup de LSF cerrado succes true")
    }
    else {
      console.log("po pup de LSF cerrado succes false")
    }
  });
};


irfselect() {
  const dialogRef = this._dialog.open(IrSelectComponent, {
    data: {
      ph_id: this.permanentHome.id,
      servide_detail_id: this.departure.id,
      options: { movein: true, moveout: true , ir: true }
      , sr_id: this.atributos_generales.sr_id
      , wos_id: this.departure.workOrderServicesId
      , cat_category_id: this.atributos_generales.cat_category_id
      , type_id: this.atributos_generales.type_id,
    },
    width: "700px",
    // height: "80%"
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result.success) {
      console.log("po pup de LSF cerrado succes true")
    }
    else {
      console.log("po pup de LSF cerrado succes false")
    }
  });
};
  
}

