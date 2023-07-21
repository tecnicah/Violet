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


  //-----------------------------------------------------------------------


  public loader: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('data user', this.user);
    console.log("data que recibe modal: ", this.data);

    this.get_catalogos();
  }

  ////////////////////////////////////////////////////////////////////// NUEVAS FUNCIONES NO LS NI IR ///////////////////////////////////////////

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

  datos:Datos = {
    workOrderServicesId: 0,
    partner_id: 0
  };

  async get_catalogos() {

    this._deliveredTo = this.data.data.deliveredTo;
    this._city_name = this.data.data.location;
    this._country_name = this.data.data.country;

    this.cat_serv = 27;
    /////EXTRAS ARRIBA //////////////////////////

    this.fill_payments_due();
    this.today_.setDate(this.today_.getDate() + 1);
    this.loader.showLoader();
    this.ca_security = await this._services.getCatalogueFrom('GetSecurityDeposit');
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection'); //
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_supplier = await this._services.getCatalogueFrom('GetSupplier');
    this.ca_asistance = await this._services.getCatalogueFrom('GetAssistanceWith');
   
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');

    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=16").subscribe((data => {
      ////console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }));

    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      ////console.log(data);
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

    this.ca_creditCard.forEach(E => {
      E.checked = false;
    });

    this.ca_recurrence = duration.filter(function (E) {
      if (E.recurrence != null) {
        return true;
      }
    });

    this._services.service_general_get('RelocationServices/GetLeaseRenewalById?id=' + this.data.data.service[0].id).subscribe((data => {
      if (data.success) {
        this.settlingin = data.result;
        if (this.settlingin.commentLeaseRenewals.length == 0) {

        }
        console.log("GetLeaseRenewalById ==================", this.settlingin);
        this.loader.hideLoader();
        this.get_dependent();
        this.getDataHousing(); // est atrae la lista de casas y despues la casa permanente
        // debugger;
        this.getServiceScope();
        this.setup_permissions_settings();
        this.get_text_status();
        this.GetBasicServiceData();
      }
      this.loader.hideLoader();
    }))

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r => {
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r => {
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    })


    //---------------------------------------------------------------------------------------------------------------------

  }

  _texto_status = "";

  get_text_status() {

    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.settlingin.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  };

  change_status_detail() {
    ////debugger;
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


  //DATA TABLE HOUSING//
  getDataHousing() {
  this._services.service_general_get(`HousingList/GetPermanentHousingList?id_sr=${this.data.sr}`).subscribe(data_housing => {
      if (data_housing.success) {
        debugger;

        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);


        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        this.permanent_homet(this.settlingin.property);
        //this.dataFinal();
      }
    });
  }

  //DEPENDENT//
  get_dependent() {
    this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(this.data.sr)).subscribe(data => {
      if (data.success) {
        ////console.log('DATA CONSULTA: ', data);
        this.ca_dependent = data.result;
      }
    });
  }

  //**CONSULTA PAYMENT**//
  get_payment() {
    ////console.log('Extracion de datos');
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.settlingin.workOrderServices).subscribe((data => {
      if (data.success) {
        ////console.log('datos de tabla request', data);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        // ////console.log('datos de la tabla' + data.result.value.payments);
      }
      ////console.log('2° datos de la tabla' + this.payments);
    }))
  };

  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.settlingin.workOrderServices}&client=${this.data.data.partnerId}`).subscribe(resp => {
      if (resp.success) {
        debugger;
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }

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
    debugger;
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
  //**************************************************************//
  //Currency//
  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }
  //**************************************************************//
  //Recurrencia//
  getRecurrence(id) {
    for (let i = 0; i < this.ca_recurrence.length; i++) {
      if (this.ca_recurrence[i].id == id) {
        return this.ca_recurrence[i].recurrence;
      }
    }
  }
  //**************************************************************//
  //Payment//
  getPayment(id) {
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if (this.ca_payment_Type[i].id == id) {
        return this.ca_payment_Type[i].paymentType;
      }
    }
  }
  //**************************************************************//
  //Responsable//
  getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
  }
  //**************************************************************//
  //DEPENDENT//
  getDependent(id) {
    for (let i = 0; i < this.ca_dependent.length; i++) {
      if (this.ca_dependent[i].id == id) {
        return this.ca_dependent[i].name;
      }
    }
  }
  //**************************************************************//
  //ACCOUNT//
  getAccount(id) {
    for (let i = 0; i < this.ca_accountType.length; i++) {
      if (this.ca_accountType[i].id == id) {
        return this.ca_accountType[i].accountType;
      }
    }
  }
  //**************************************************************//
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
  //Repair//
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
      this.GetOnlyPropertyLSF(id_ph);
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  permanentHome_LSF;
  GetOnlyPropertyLSF(id_ph) {
    this._services.service_general_get("HousingList/GetOnlyPropertyLSF?key=" + id_ph + "&servide_detail_id=" + this.settlingin.id+ "&type=" + 27).subscribe((data => { // se ponde el id de lease renewal en la tabla de Cat_Service
      this.permanentHome_LSF = data.result.value;
      console.log('ONLY LEASE SUMARY FORM : ', this.permanentHome_LSF);
      this.GetOnlyPropertyInspRep(id_ph);
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  permanentHome_IR;
  GetOnlyPropertyInspRep(id_ph) {
    
    this._services.service_general_get("HousingList/GetOnlyPropertyInspRep?key=" + id_ph + "&servide_detail_id=" + this.settlingin.id+ "&type=" + "27" ).subscribe((data => {
      this.permanentHome_IR = data.result.value;
      console.log('ONLY LEASE INSPECTION & REPAIRS : ', this.permanentHome_IR);
      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }



  payments_due = [];
  payments_not_due = [];
  data_land_historic = [];
  data_group_saving: any = { costSavingHomes: [] };
  data_group_paymnets: any = { paymentHousings: [] };
  recurrence_static = [{ id: "Monthly" }, { id: "Bimonthly" }, { id: "Quarterly" }, { id: "Annually" }, { id: "Biannually" }];
  data_contracts_historic = [];
  data_renewal_historic = [];
  data_settlingin_historic = [];
  data_landlord_historic = [];
  data_cost_saving_historic = [];
  data_paym_saving_historic = [];
  lapsos_dias = [{ id: "10" }, { id: "15" }, { id: "30" }, { id: "45" }, { id: "60" }, { id: "90" }, { id: "120" }]
  data_land_list = [];
  payment_rocess = { "securityDepositId": null, "initialRentPaymentId": null, "ongoingRentPaymentId": null, "realtorCommissionId": null }
  dataData_land_list = new MatTableDataSource(null);
  groupIrhistoric = [];
  ca_resppayrep = [];
  move_out_visible = true;
  _deliveredTo = "Assignee Name";
  _city_name = "City Name"
  _country_name = "Country Name"
  url_api = `${environment.URL_EXPORT}`;
  SupplierCompany_repairs = [];
  hl_to_send = [];
  propertyReportsHistoric_movin = [];
  propertyReportsHistoric_movout = [];


  ////////////////////////////////////////////////////////// FIN NUEVAS FUNCIONES NO LS NI IR ///////////////////////////////////////////

  //////////////////////manage estatus 

  disabled_by_permissions: boolean = false;
  hide_by_permissions: boolean = false;
  hide_complete: boolean = false;
  show_completed: boolean = false;
  show_progress: boolean = false;
  wo_: boolean = false;
  sr_: boolean = false;

  fill_payments_due() {

    for (var h = 0; h < 31; h++) {
      var v = h + 1;
      var ese = v.toString();
      var obj_ = { id: ese }
      var obj_n = v;
      this.payments_due[h] = obj_;
      this.payments_not_due[h] = obj_n;
    }

  }

  sort_property_exp() {
   
    if (this.data_contracts.propertyExpenses) {
      this.data_contracts.propertyExpenses.sort(function (a, b) {
        if (a.included > b.included) {
          return -1;
        }
        if (a.included < b.included) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
    }
  }

  save_BD() {
    this.updateContractDetail();
    console.log(this.data_contracts);
  }

  updateContractDetail() {
    this.loader.showLoader();
    this.data_contracts.createdBy = this.user.id;
    this.data_contracts.createdDate = new Date();
    console.log("DATA A GUARDAR PutContractDetail: ", this.data_contracts);
    this._services.service_general_put("HousingList/PutContractDetail", this.data_contracts).subscribe((data => {
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
      console.log("error al guardar los contract details: ", err);
    })
  }


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

isVisible = false;

GetBasicServiceData() {
  this.loader.showLoader();
  debugger;
  this._services.service_general_get(`ServiceRecord/GetBasicServiceDataByWosId?wos_id=${this.settlingin.workOrderServices}`).subscribe(resp => {
    this.loader.hideLoader();
    debugger;
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
      options: { movein: true, moveout: true , ir: true }
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

 //NEW RECORD//
 HomeDetailsnew() {

  this.permanentHome.id = null;
  this.permanent_homet(this.settlingin.propertyId); // esto para borrar los datos de la casa que pudo haber estado seleccioanda 

  const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
    data: {
      id: 0,
      nuevo: true,
      workOrder: this.data.data.workOrderId,
      workOrderServicesId: this.settlingin.workOrderServices,
      numberWorkOrder: this.data.data.numberWorkOrder,
      serviceID: this.data.data.number_server,
      serviceName: this.data.data.service_name,
      service: this.data.data.serviceRecordId,
      serviceTypeId: this.data.data.serviceTypeId,
      sr: this.data.sr,
      supplierType: 3,
      no_permanent: false
      , idServiceDetail: this.settlingin.id
      , shared: 1,
      cat_service_id: 21
    },
    width: "95%"
  });

  dialogRef.afterClosed().subscribe(result => {
  });
}


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

  })
}

  
}




