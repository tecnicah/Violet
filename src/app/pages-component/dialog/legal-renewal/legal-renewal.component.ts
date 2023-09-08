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
  selector: 'app-legal-renewal',
  templateUrl: './legal-renewal.component.html',
  styleUrls: ['./legal-renewal.component.scss']
})
export class LegalRenewalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  today_: Date = new Date();
  calculo: any = {};
  settlingin: any = { documentLeaseRenewals: [], commentLeaseRenewals: [] };
  user: any = {};
  cestatus: any[] = [];
  temporalDocument: any[] = [];
  table_payments: any[] = [];
  caDocumentType: any[] = [];
  caCountry: any[] = [];
  cr: string = "Reply";
  dataSourcePayment: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  cat_serv: any;

  mostrarTarjeta: any = {
    contractDetails: false,
    paymenType: false,
    costSaving: false,
    renewalDetails: false,
    settlinginDetails: false,
    landLord: false,
    repairs: false,
    move_in: false,
    move_out: false
  };
  //VARIABLES PARA LEASER SUMMARY//
  data_contracts: any = {};
  paymentHousings = [];
  costSavingHomes = [];
  data_renewal: any = {}
  data_settlingin: any = {}
  data_land: any = {
    creditCardLandLordDetails: []
  };
  //VARIABLES PARA INSECTIONS & REPAIRS//
  data_move_in: any = {
    propertyReportSections: [],
    keyInventories: [],
    attendees: []
  };
  data_move_out: any = {
    propertyReportSections: [],
    keyInventories: [],
    attendees: []
  };
  serviceScope = null;
  permanentHome: any = { "id": null };
  data_inspection = [];
  data_repairs = [];
  data_home = [];
  public __serverPath__: string = this._services.url_images;


  //-----------------------------------------------------------------------
  propertySwitch: false;
  // settlingin: any = {}; //era public
  vista: boolean = false;
  //EXTENSION//
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //RESQUEST PAYMENT//
  dataSourcePay: any[] = [];
  displayedColumnsPay: string[] = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date', 'Status', 'action'];
  //TABLE HOUSING//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Housing Status', 'Actions'];
  //CATALOGOS_GET//
  ca_estatus: any[] = [];
  ca_requestType: any[] = [];
  area_orientation: any;
  nacionality: any;
  ca_document: any;
  ca_currency: any;
  ca_dependent: any[] = [];
  ca_supplier: any[] = [];
  ca_asistance: any[] = [];
  ca_accounttype: any[] = [];
  other: boolean = false;
  payments: any[] = [];
  ca_creditCard: any[] = [];
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
  _deliveredTo;
  _city_name;
  _country_name;
  //BRING DATA CATALOGUES//

  datos: Datos = {
    workOrderServicesId: 0,
    partner_id: 0
  };

  //-----------------------------------------------------------------------


  public loader: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('data user', this.user);
    console.log("data que recibe modal: ", this.data);

    this.get_catalogos();
  }

  async get_catalogos() {

    this._deliveredTo = this.data.data.deliveredTo;
    this._city_name = this.data.data.location;
    this._country_name = this.data.data.country;

    this.cat_serv = 27;
    /////EXTRAS ARRIBA //////////////////////////

    this.today_.setDate(this.today_.getDate() + 1);
    this.loader.showLoader();

    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=16").subscribe((data => {
      ////console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }));

    this._services.service_general_get('RelocationServices/GetLeaseRenewalById?id=' + this.data.data.service[0].id).subscribe((data => {
      if (data.success) {
        this.settlingin = data.result;
        if (this.settlingin.commentLeaseRenewals.length == 0) {

        }
        console.log("GetLeaseRenewalById ==================", this.settlingin);
        this.loader.hideLoader();
        this.getDataHousing(); // est atrae la lista de casas y despues la casa permanente
        this.getServiceScope();
        this.setup_permissions_settings();
        this.get_text_status();
        this.GetBasicServiceData();
      }
      this.loader.hideLoader();
    }))

    //---------------------------------------------------------------------------------------------------------------------
    this.loader.hideLoader();
  }

  _texto_status = "";

  get_text_status() {

    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.settlingin.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  };

  
  //DATA TABLE HOUSING//
  getDataHousing() {
    this._services.service_general_get(`HousingList/GetPermanentHousingList?id_sr=${this.data.sr}`).subscribe(data_housing => {
      if (data_housing.success) {
        //debugger;

        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        this.permanent_homet(this.settlingin.property);
        //this.dataFinal();
      }
    });
  }

  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.settlingin.workOrderServices}&client=${this.data.data.partnerId}`).subscribe(resp => {
      if (resp.success) {
        //debugger;
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }

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
    if (this.settlingin.statusId != 39 && this.settlingin.statusId != 2) { //active , in progress
      this.hide_complete = true;
    }
    else {
      if (this.settlingin.statusId == 39) {
        this.show_progress = true;
      }
      else {
        this.show_completed = true;
      }
    }
  }

  //**************************************************************//
  //METODO PARA GUARDAR INFORMACION//
  save() {
    this.settlingin.updateBy = this.user.id;
    this.settlingin.updatedDate = new Date();
    this.settlingin.documentLeaseRenewals = this.temporalDocument;
    this.loader.showLoader();

    let data_comment_aux = this.settlingin.commentLeaseRenewals;
    this.settlingin.commentLeaseRenewals = [];

    this.settlingin.serviceCompletionDate = this.settlingin.statusId == "4"
      ? this.settlingin.serviceCompletionDate != null ? this.settlingin.serviceCompletionDate : new Date()
      : "";

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        this.settlingin.commentLeaseRenewals.push(data_comment_aux[i]);
      }
    }


    console.log(this.settlingin);
    //debugger;
    this.temporalDocument = [];
    this._services.service_general_put("RelocationServices/PutLeaseRenewal", this.settlingin).subscribe((data => {
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
        this.ngOnInit();
        this.loader.hideLoader();
      }
    }), (err) => {
      console.log("error: ", err);
      this.loader.hideLoader();
    })
  }

  //**************************************************************//
  getProperty_(id) {
    for (let i = 0; i < this.ca_property.length; i++) {
      if (this.ca_property[i].id == id) {
        return this.ca_property[i].propertyType;
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// NUEVAS FUNCIONES PERMANENT //////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  permanent_homet(id_ph) {
    if (id_ph > 0) {
      this.loader.showLoader();
      this.GetOnlyPropertyDetails(id_ph);
    }
  }

  GetOnlyPropertyDetails(id_ph) {


    this._services.service_general_get("HousingList/GetOnlyPropertyDetails?key=" + id_ph + "&servide_detail_id=" + this.settlingin.id).subscribe((data => {
      this.permanentHome = data.result.value;
      console.log('DETALLES DE LA CASA PERMANENTE : ', this.permanentHome);
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  ////////////////////////////////////////////////////////// FIN NUEVAS FUNCIONES NO LS NI IR ///////////////////////////////////////////

  //////////////////////manage estatus 

  disabled_by_permissions: boolean = false;
  hide_by_permissions: boolean = false;
  hide_complete: boolean = false;
  show_completed: boolean = false;
  show_progress: boolean = false;
  wo_: boolean = false;
  sr_: boolean = false;


  savesettlingin() {
    this.updatesettlinginDetail();
  }

  updatesettlinginDetail() {
    this.loader.showLoader();
    this.data_settlingin.createdBy = this.user.id;
    this.data_settlingin.createdDate = new Date();
    this.data_settlingin.updateBy = this.user.id;
    this.data_settlingin.updatedDate = new Date();
    console.log("DATA A GUARDAR settlingin (ACTUALIZACION): ", this.data_settlingin);
    this._services.service_general_put("HousingList/PutsettlinginDetails", this.data_settlingin).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Saved Data"
          },
          width: "350px"
        });
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar settlingin details: ", err);
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
        servide_detail_id: this.settlingin.id,
        options: { movein: true, moveout: false, ir: true }
        , sr_id: this.atributos_generales.sr_id
        , wos_id: this.settlingin.workOrderServices
      },
      width: "90%",
    });

    dialogRef.afterClosed().subscribe(result => {

//      this.getDataHousing();

      if (result.success) {
        console.log("po pup de HOSUING LIST cerrado succes true")
        this.get_catalogos();
      }
      else {
        console.log("po pup de LSF cerrado succes false")
      }
    });
  };

  atributos_generales;

  isVisible = false;

  GetBasicServiceData() {
    this.loader.showLoader();
    //debugger;
    this._services.service_general_get(`ServiceRecord/GetBasicServiceDataByWosId?wos_id=${this.settlingin.workOrderServices}`).subscribe(resp => {
      this.loader.hideLoader();
      //debugger;
      if (resp.success) {
        console.log(' GetBasicServiceData: ================================', resp);
        this.atributos_generales = resp.atributos_generales.value[0];
        this.datos.partner_id = this.atributos_generales.partner_id;
        this.datos.workOrderServicesId = this.atributos_generales.wos_id;
        this.datos.partner_id = this.atributos_generales.partner_id;
        this.isVisible = true;
        console.log(' GetBasicServiceData: ================================', this.atributos_generales);
      }
    });
  };


  lsfselect() {
    const dialogRef = this._dialog.open(LsfSelectComponent, {
      data: {
        ph_id: this.permanentHome.id,
        servide_detail_id: this.settlingin.id,
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
        servide_detail_id: this.settlingin.id,
        options: { movein: true, moveout: true, ir: true }
        , sr_id: this.atributos_generales.sr_id
        , wos_id: this.settlingin.workOrderServices
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

  editHousing(data) {

    data.supplierType = 3
    data.workOrderServicesId = this.settlingin.workOrderServicesId,
      data.sr = this.atributos_generales.sr_id;
    data.numberWorkOrder = this.atributos_generales.wo_number;
    data.serviceID = this.atributos_generales.service_number;
    data.serviceName = "Lease Renewal";
    data.idServiceDetail = this.settlingin.id;
    data.shared = 1;
    data.cat_service_id = 22;
    data.catCategoryId = 22;
    data.serviceTypeId = 2;
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();

     
    });

    this.loader.hideLoader();
  }


  change_status_detail() {

    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 22,
        type: "lease_renewal",
        cat_category_id: this.atributos_generales.cat_category_id,
        type_id: this.atributos_generales.type_id,
        srId: this.atributos_generales.sr_id,
        wos_id: this.settlingin.workOrderServicesId,
      }
      ,
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {

      // //console.log(result);
      if (result.success) {
        this.settlingin.statusId = result.id; //penidng to completion 
        this.get_text_status();
      }
      else {
        //nada 
      }
    });


  };

 /*  change_status_detail() {
    //////debugger;
    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 22,//lease renewal
        type: "home_findig"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.success) {
        this.settlingin.statusId = result.id; //penidng to completion 
        this.get_text_status();
      }
      else {

      }
    });
  };
 */

}




