import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../environments/environment';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { DialogAddpaymentComponent } from '../dialog-addpayment/dialog-addpayment.component';
import { DialogCostSavingsComponent } from '../dialog-cost-savings/dialog-cost-savings.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogAttendeesComponent } from '../dialog-attendees/dialog-attendees.component';
import { DialogKeyComponent } from '../dialog-key/dialog-key.component';
import { DialogInventoryComponent } from '../dialog-inventory/dialog-inventory.component';
import { DialogAttendeesInspecComponent } from '../dialog-attendees-inspec/dialog-attendees-inspec.component';
import { DialogLeaseSummaryComponent } from '../dialog-lease-summary/dialog-lease-summary.component';
import { DialogInspectionrepairsComponent } from '../dialog-inspectionrepairs/dialog-inspectionrepairs.component';
import { DialogPropertyExpensesComponent } from '../dialog-property-expenses/dialog-property-expenses.component';
import { DialoglLandlordBankDetailComponent } from '../dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { DialogPaymentTypeComponent } from '../dialog-payment-type/dialog-payment-type.component';



@Component({
  selector: 'app-legal-renewal',
  templateUrl: './legal-renewal.component.html',
  styleUrls: ['./legal-renewal.component.scss']
})
export class LegalRenewalComponent implements OnInit {

  @ViewChild('sortrole') sortrole: MatSort;
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
  // departure: any = {}; //era public
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

  async get_catalogos() {

    this._deliveredTo = this.data.data.deliveredTo;
    this._city_name = this.data.data.location;
    this._country_name = this.data.data.country;
    this.get_items_section(0);
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
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_creditCard.sort((a, b) => (a.id < b.id ? -1 : 1));
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    //this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentType');
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
          // this.addReply();
        }
        console.log("GetLeaseRenewalById ==================", this.settlingin);
        this.loader.hideLoader();
       // this.get_payment();
        //this.getDataDependent();
        this.get_dependent();
        this.getDataHousing(); // est atrae la lista de casas y despues la casa permanente
        // debugger;
        this.getServiceScope();
        this.setup_permissions_settings();
        this.get_text_status();
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
    // debugger;
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
      //debugger;
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


  //DATA TABLE HOUSING//
  getDataHousing() {
    // this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe((data_housing) => { //this.area_orientation.workOrderServicesId
    //this._services.service_general_get(`HousingList/GetPermanentHousing?wo_id=${this.data.data.workOrderId}&id_service_detail=${this.settlingin.id}&shared=${1}`).subscribe(data_housing => {
    this._services.service_general_get(`HousingList/GetPermanentHousingList?id_sr=${this.data.sr}`).subscribe(data_housing => {
      if (data_housing.success) {
        debugger;

        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        //       this.dataSourceHousing = data_housing.message;
        //       this.permanent_homet(this.dataSourceHousing);

        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        this.permanent_homet(this.settlingin.property);
        //this.dataFinal();
      }
    });
  }

  permanent_homet_old(id_ph) {
    if (id_ph > 0) {
      this.loader.showLoader();
      debugger;
      this._services.service_general_get("HousingList/GetHistoricHousingByService?key=" + id_ph + "&servide_detail_id=" + this.settlingin.id).subscribe((data => {
        this.permanentHome = data.result.value;
        console.log('esta es la casa permanente: ', this.permanentHome);
        // this.data_contracts = this.permanentHome.contractDetails[0];
        this.llenarJSON();
        // this.calc_RentCostSavings();
        this.loader.hideLoader();
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al guardar los contract details: ", err);
      })
    }
  };

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
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.settlingin.workOrderServicesId).subscribe((data => {
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

  //**METHODS COMMENTS (NEW)**//
  addReply() {
    ////console.log(this.user);
    this.settlingin.commentDepartures.push({
      "id": 0,
      "departureId": this.settlingin.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.settlingin.commentDepartures.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }

  getDataHousing_after_add(id_property) {
    this._services.service_general_get(`HousingList/GetPermanentHousing?wo_id=${this.data.data.workOrderId}&id_service_detail=${this.settlingin.id}&shared=${1}`).subscribe(data_housing => {
      if (data_housing.success) {
        //     debugger;
        console.log('DATA CONSULTA HOUSING LIST after add: ', data_housing);
        this.dataSourceHousing = data_housing.message;

      }
    });
    if ((this.settlingin.property != id_property) && (id_property != undefined) && (id_property != true) && (id_property != null) && (id_property != 0)) {
      this.settlingin.property = id_property;
      this.permanent_homet(this.settlingin.property);
    }
  }

  //METODO PARA AGREGAR HOUSING//
  HomeDetailsnew() {
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
        cat_service_id: 19
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing_after_add(result);
      // this.getDataHousing();
    })
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

  //METODOS PARA REMINDER//
  addRemminder() {
    if (this.settlingin.reminderLeaseRenewals) { } else {
      this.settlingin.reminderLeaseRenewals = [];
    }
    this.settlingin.reminderLeaseRenewals.push({
      "id": 0,
      "leaseRenewal": this.settlingin.id,
      "reminderDate": new Date(),
      "reminderComments": " ",
      "createdBy": this.user.id,
      "createdDate": new Date()
    })
  }

  //METODO PARA AGREGAR DOCUMENTOS//
  addDocument() {
    this.data.typeDocument = 22;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.leaseRenewal = this.settlingin.id;
        this.temporalDocument.push(result);
      }
    });
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

  calc_RentCostSavings() {

  }

  permanent_homet(id_ph) {
    if (id_ph > 0) {
      this.loader.showLoader();
      this.GetOnlyPropertyDetails(id_ph);
      this.get_attendees_list_all(id_ph);
    }
  }

  GetOnlyPropertyDetails(id_ph) {


    this._services.service_general_get("HousingList/GetOnlyPropertyDetails?key=" + id_ph + "&servide_detail_id=" + this.settlingin.id).subscribe((data => {
      this.permanentHome = data.result.value;
      console.log('DETALLES DE LA CASA PERMANENTE : ', this.permanentHome);
      this.GetOnlyPropertyLSF(id_ph);

      // this.llenarJSON();
      // this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  permanentHome_LSF;
  GetOnlyPropertyLSF(id_ph) {

    //this.loader.showLoader();
    this._services.service_general_get("HousingList/GetOnlyPropertyLSF?key=" + id_ph + "&servide_detail_id=" + this.settlingin.id+ "&type=" + 27).subscribe((data => { // se ponde el id de lease renewal en la tabla de Cat_Service
      this.permanentHome_LSF = data.result.value;
      console.log('ONLY LEASE SUMARY FORM : ', this.permanentHome_LSF);
      this.GetOnlyPropertyInspRep(id_ph);
      //this.llenarJSON();
      // this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  permanentHome_IR;
  GetOnlyPropertyInspRep(id_ph) {

    // this.loader.showLoader();
    this._services.service_general_get("HousingList/GetOnlyPropertyInspRep?key=" + id_ph + "&servide_detail_id=" + this.settlingin.id+ "&type=" + "27" ).subscribe((data => {
      this.permanentHome_IR = data.result.value;
      console.log('ONLY LEASE INSPECTION & REPAIRS : ', this.permanentHome_IR);
      this.llenarJSON();
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
  data_departure_historic = [];
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
  data_departure: any = {}
  propertyReportsHistoric_movin = [];
  propertyReportsHistoric_movout = [];

  llenarJSON() {
    debugger;

    //////////////////////////// SET PERMANENT HOME /////////////////////////////////////////

    this.permanentHome.contractDetails = this.permanentHome_LSF.contractDetails;
    this.permanentHome.contractHistoricDetails = this.permanentHome_LSF.contractHistoricDetails;
    this.permanentHome.groupPaymnetsHousings = this.permanentHome_LSF.groupPaymnetsHousings;
    this.permanentHome.groupHistoricPaymnetsHousings = this.permanentHome_LSF.groupHistoricPaymnetsHousings;
    this.permanentHome.groupCostSavings = this.permanentHome_LSF.groupCostSavings;
    this.permanentHome.groupHistoricCostSavings = this.permanentHome_LSF.groupHistoricCostSavings;
    this.permanentHome.renewalDetailHomes = this.permanentHome_LSF.renewalDetailHomes;
    this.permanentHome.renewalHistoricDetailHomes = this.permanentHome_LSF.renewalHistoricDetailHomes;
    this.permanentHome.departureDetailsHomes = this.permanentHome_LSF.departureDetailsHomes;
    this.permanentHome.departureHistoricDetailsHomes = this.permanentHome_LSF.departureHistoricDetailsHomes;
    this.permanentHome.landlordHeaderDetailsHomes = this.permanentHome_LSF.landlordHeaderDetailsHomes;
    this.permanentHome.landlor_HistoricHeaderDetailsHomes = this.permanentHome_LSF.landlor_HistoricHeaderDetailsHomes;


    this.permanentHome.propertyReports = this.permanentHome_IR.propertyReports;
    this.permanentHome.groupIr = this.permanentHome_IR.groupIr;
    this.permanentHome.groupIrhistoric = this.permanentHome_IR.groupIrhistoric;

    //////////////////////////// END SET PERMANENT HOME /////////////////////////////////////

    let _iddetail = this.data.idServiceDetail_current

    if (this.permanentHome.contractDetails) {
      this.data_contracts = this.permanentHome.contractDetails[0];
    }

    if (this.permanentHome.contractHistoricDetails) {
      this.data_contracts_historic = this.permanentHome.contractHistoricDetails;
    }

    if (this.permanentHome.groupPaymnetsHousings) {
      this.data_group_paymnets = this.permanentHome.groupPaymnetsHousings[0];
      this.paymentHousings = this.data_group_paymnets.paymentHousings;
    }
    if (this.permanentHome.groupHistoricPaymnetsHousings) {
      this.data_paym_saving_historic = this.permanentHome.groupHistoricPaymnetsHousings;
    }

    if (this.permanentHome.groupCostSavings) {
      this.data_group_saving = this.permanentHome.groupCostSavings[0];
      this.costSavingHomes = this.data_group_saving.costSavingHomes;
    }

    if (this.permanentHome.groupHistoricCostSavings) {
      this.data_cost_saving_historic = this.permanentHome.groupHistoricCostSavings;
    }

    if (this.permanentHome.renewalDetailHomes) {
      this.data_renewal = this.permanentHome.renewalDetailHomes[0];
    }

    if (this.permanentHome.renewalHistoricDetailHomes) {
      this.data_renewal_historic = this.permanentHome.renewalHistoricDetailHomes;
    }

    if (this.permanentHome.departureDetailsHomes) {
      this.data_departure = this.permanentHome.departureDetailsHomes[0];
    }

    if (this.permanentHome.departureHistoricDetailsHomes) {
      this.data_departure_historic = this.permanentHome.departureHistoricDetailsHomes;
    }


    if (this.permanentHome.landlordHeaderDetailsHomes) {
      this.data_land = this.permanentHome.landlordHeaderDetailsHomes[0];

      this.data_land_list = this.data_land.landlordDetailsHomes;
      this.dataData_land_list = new MatTableDataSource(this.data_land_list);
      this.dataData_land_list.sort = this.sortrole;

    }

    if (this.permanentHome.landlor_HistoricHeaderDetailsHomes) {
      this.data_landlord_historic = this.permanentHome.landlor_HistoricHeaderDetailsHomes;
    }

    //this.set_payments();
    //this.set_contract_details();

    this.sort_property_exp();

    if (this.data_land.creditCardLandLordDetails) {
      this.ca_creditCard.forEach(E => {
        for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
          if (this.data_land.creditCardLandLordDetails[i].creditCard == E.id) {
            E.checked = true;
          }
        }
      })
    }

    ////////////////////////////////////// INSPECTIONS & REPAIRS //////////////////////////////////
    debugger;
    if (this.permanentHome.propertyReports) {
      for (let i = 0; i < this.permanentHome.propertyReports.length; i++) {
        if (this.permanentHome.propertyReports[i].propertyInspection == 1) {
          this.data_move_in = this.permanentHome.propertyReports[i];
        }

        if (this.permanentHome.propertyReports[i].propertyInspection == 2) {
          this.data_move_out = this.permanentHome.propertyReports[i];
        }
      }

      console.log("move inn: ============================", this.data_move_in);
      console.log("move out: ============================", this.data_move_out);
    }

    let h_movin = this.permanentHome_IR.propertyReportsHistoric.filter(function (E) { if (E.propertyInspection == 1) { return true; } });
    let h_movout = this.permanentHome_IR.propertyReportsHistoric.filter(function (E) { if (E.propertyInspection == 2) { return true; } });

    if (h_movin.length > 0)
      this.propertyReportsHistoric_movin = h_movin;
    if (h_movout.length > 0)
      this.propertyReportsHistoric_movout = h_movout;

    console.log("propertyReportsHistoric_movin:", this.propertyReportsHistoric_movin, "propertyReportsHistoric_movout: ", this.propertyReportsHistoric_movout)

    debugger;
    if (this.permanentHome.groupIr[0].repairs) {
      this.data_repairs = this.permanentHome.groupIr[0].repairs;
      //this.data_final.repairs = this.data_repairs;
    }

    if (this.permanentHome.groupIr[0].inspections) {
      this.data_inspection = this.permanentHome.groupIr[0].inspections;
      //  this.data_final.inspection = this.data_inspection;
    }

    if (this.permanentHome.groupIrhistoric) {
      this.groupIrhistoric = this.permanentHome.groupIrhistoric;
      //  this.data_final.inspection = this.data_inspection;
    }

    console.log("data_repairs: ============================", this.data_repairs);
    console.log("data_inspection: ============================", this.data_inspection);
    console.log("groupIrhistoric: ============================", this.groupIrhistoric);
    //this.move_out_visible = false; // home finding 

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
    // debugger;
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
    //debugger;
    this.loader.showLoader();
    this.data_contracts.createdBy = this.user.id;
    this.data_contracts.createdDate = new Date();
    //this.data_contracts.paymentsDue = 1 ;
    console.log("DATA A GUARDAR PutContractDetail: ", this.data_contracts);
    this._services.service_general_put("HousingList/PutContractDetail", this.data_contracts).subscribe((data => {
      //debugger;
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

  sortTable(table, columna) {
    ////debugger;
    var table, rows, switching, i, x, y, shouldSwitch, x_html, y_html;
    table = document.getElementById(table);
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[columna];
        y = rows[i + 1].getElementsByTagName("TD")[columna];
        // Check if the two rows should switch place:
        x_html = x.innerHTML.toLowerCase();
        y_html = y.innerHTML.toLowerCase();

        if (x_html.indexOf("$") >= 0) {
          ////debugger;
          x_html = x_html.substring(1, x_html.length - 1).replace(/,/g, "");;
          y_html = y_html.substring(1, y_html.length - 1).replace(/,/g, "");;
          //!isNaN(val)
          x_html = Number(x_html);
          y_html = Number(y_html);
        }

        if (x_html > y_html) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  editExpense(data_, i) {
    console.log("entra a abrir modal property expenses para edicion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      if (result.success) {
        this.data_contracts.propertyExpenses[i] = result;
      }
      this.sort_property_exp();
    });
  }

  deleteExpense(expense) {
    //debugger;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/DeleteExpense", expense.id).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("HousingList/DeleteExpense ==============================", response_bd);
        this.data_contracts.propertyExpenses = response_bd.result.value;
        //this.dataData_land_list = new  MatTableDataSource(this.data_land_list);
        //this.dataData_land_list.sort = this.sortrole;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Deleted Data"
          },
          width: "350px"
        });

      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  }


  addExpense() {
    //debugger;
    console.log("entra a abrir modal property expenses para inserccion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: {
        id: 0
        , contractDetail: this.data_contracts.idContract
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      debugger;
      if (result.success) {
        this.data_contracts.propertyExpenses = result;
        this.sort_property_exp();
      }
    });
  }

  addPaymentType() {
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'insertar';
    this.data.payment_rocess = this.data.payment_rocess;
    this.data.groupPaymentsHousingId = this.data_group_paymnets.id;
    const dialog = this._dialog.open(DialogPaymentTypeComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("elemento recibido de  pop up payment: ", result);
      if (result.success) {
        console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        this.paymentHousings.push(result);
        console.log(this.paymentHousings);
      }
    });
  }

  editPaymentType(element, i) {
    ////debugger;
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'edicion';
    this.data.payment_rocess = this.payment_rocess;
    this.data.i = i;
    this.data.element = element;
    const dialog = this._dialog.open(DialogPaymentTypeComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("elemento guardado de payment: ", result);
      if (result.success) {
        result.updateBy = this.user.id;
        result.updatedDate = new Date();
        console.log(result);
        this.paymentHousings[i] = result;
      }
    });
  }


  deletePayment(payment) {
    //debugger;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/DeletePaymnetType", payment.id).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("HousingList/DeletePaymnetType ==============================", response_bd);
        this.paymentHousings = response_bd.result.value;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Deleted Data"
          },
          width: "350px"
        });

      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  }

  addCostSavings() {
    console.log("entra a abrir modal cost saving");
    this.data.operacion = 'insertar';
    this.data.groupCostSavingId = this.data_group_saving.id;
    //this.data.id_service_detail = this.data;
    const dialog = this._dialog.open(DialogCostSavingsComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      if (result.success) {
        console.log(result);
        // result.id = 0;
        //result.housingList = 0;
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        this.costSavingHomes.push(result);
        console.log(this.costSavingHomes);
      }
      this.sort_property_exp();
    });
  }

  editCostSavings(data, i) {
    console.log("entra a abrir modal cost saving");
    this.data.operacion = 'edicion';
    this.data.i = i;
    this.data.element = data;
    const dialog = this._dialog.open(DialogCostSavingsComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      if (result.success) {
        result.updateBy = this.user.id;
        result.updatedDate = new Date();
        console.log(result);
        this.costSavingHomes[i] = result;
      }
      this.sort_property_exp()
    });
  };


  deleteCostSavings(cost) {
    //debugger;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/deleteCostSavings", cost.id).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("HousingList/DeletePaymnetType ==============================", response_bd);
        this.costSavingHomes = response_bd.result.value;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Deleted Data"
          },
          width: "350px"
        });

      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  }

  saveRenewal() {
    this.updateRenewalDetail();
  }

  saveDeparture() {
    this.updateDepartureDetail();
  }

  updateDepartureDetail() {
    this.loader.showLoader();
    this.data_departure.createdBy = this.user.id;
    this.data_departure.createdDate = new Date();
    this.data_departure.updateBy = this.user.id;
    this.data_departure.updatedDate = new Date();
    console.log("DATA A GUARDAR departure (ACTUALIZACION): ", this.data_departure);
    this._services.service_general_put("HousingList/PutDepartureDetails", this.data_departure).subscribe((data => {
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
      console.log("error al guardar departure details: ", err);
    })
  }

  guarda_card(data, card) {
    // console.log(data);
    // console.log(card);
    if (data.checked) {
      this.data_land.creditCardLandLordDetails.push({
        landLord: this.data_land.id,
        creditCard: card.id
      });
    } else {
      for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
        if (this.data_land.creditCardLandLordDetails[i].creditCard == card.id) {
          this.data_land.creditCardLandLordDetails.splice(i, 1);
        }
      }
    }
  }

  addBank() {

    console.log("entra a abrir modal bank para inserccion");
    let data_b = { operacion: "", id: 0, idServiceDetail: 0, headerId: 0 };

    data_b.operacion = 'insertar';
    data_b.id = this.data_land.housingListId;
    data_b.idServiceDetail = this.data_land.idServiceDetail
    data_b.headerId = this.data_land.id

    const dialog = this._dialog.open(DialoglLandlordBankDetailComponent, {

      data: data_b,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      debugger;
      if (result.success) {
        // this.data_land_list.push(result);
        // this.get_lease_sf();

        //   result.id = 0;
        //   result.contractDetail = this.data_contracts.id
        //   if (this.data_contracts.id == undefined) {
        //     result.contractDetail = 0;
        //   }
        //   if (this.data.id != 0) {
        //     result.contractDetail = this.data.id;
        //   }
        this.data_land_list = result;
        this.dataData_land_list = new MatTableDataSource(this.data_land_list);
        this.dataData_land_list.sort = this.sortrole;
        //   console.log(this.data_contracts);

      }

    });
  }

  editBank(data_) {
    console.log("entra a abrir modal landlorddetail para edicion");
    data_.operacion == 'editar'
    const dialog = this._dialog.open(DialoglLandlordBankDetailComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      if (result.success) {
        // this.data_land_list[i] = result;
        data_ = result;
      }
    });
  }

  deletebank(_data_) {
    //debugger;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/DeleteBankingDetails", _data_.idLandlord).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("responde_bd ==============================", response_bd);
        this.data_land_list = response_bd.result.value;
        this.dataData_land_list = new MatTableDataSource(this.data_land_list);
        this.dataData_land_list.sort = this.sortrole;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Deleted Data"
          },
          width: "350px"
        });

      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });


  }

  do_delete_banking(_data_) {
    // alert("banking deleted!");
    debugger;
    var i_e = this.data_land_list.indexOf(_data_);
    var removed = this.data_land_list.splice(i_e, 1);
  }

  saveLandLord() {

    this.updateLandLordDetail();

  }

  updateLandLordDetail() {

    this.loader.showLoader();
    this.data_land.createdBy = this.user.id;
    this.data_land.createdDate = new Date();
    this.data_land.updateBy = this.user.id;
    this.data_land.updatedDate = new Date();


    console.log("DATA A GUARDAR LAND LORD (ACTUALIZACION): ", this.data_land);
    // this._services.service_general_put("HousingList/PutLandlordDetailsHome", this.data_land).subscribe((data => {
    this._services.service_general_put("HousingList/LandlordHeaderDetailsHome", this.data_land).subscribe((data => {
      debugger
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
      console.log("error al guardar departure details: ", err);
    })
  }
  ////////////////////

  updateRenewalDetail() {
    this.loader.showLoader();
    this.data_renewal.createdBy = this.user.id;
    this.data_renewal.createdDate = new Date();
    this.data_renewal.updateBy = this.user.id;
    this.data_renewal.updatedDate = new Date();
    console.log("DATA A GUARDAR RENEWAL (ACTUALIZACION): ", this.data_renewal);
    this._services.service_general_put("HousingList/PutRenewalDetail", this.data_renewal).subscribe((data => {
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
      console.log("error al guardar renewal: ", err);
    })
  }

  ////////////////////////////////////////////// INSPECTIONS & REPAIRS //////////////////////////////////

  //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
  addMoveIn() {
    this.data_move_in.propertyReportSections.push({
      "id": 0,
      "propertyReport": this.data_move_in.id,
      "propertySection": 0,
      "status": 0,
      "needRepair": false,
      "reportDate": null,
      "reportDetails": null,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "photosPropertyReportSections": [],
      "sectionInventories": []
    })
  }

  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deleteMoveIn(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Move In?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_in.propertyReportSections.splice(i, 1);
      }
    })
  }

  attendees_list_all = [];


  //***********************************************************************//
  //***********************************************************************//
  //FUNCION PARA MOVE OUT//
  //************************************************//
  //FUNCION PARA AGREGAR INVENTORY DENTRO DE MOVE IN//
  addInventoriModalOut(r) {
    console.log("entra a abrir modal inventory move out");

    const dialog = this._dialog.open(DialogInventoryComponent, {
      data: {
        id: 0, operacion: 'insertar'
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);
      result.propertyReportSectionId = this.data_move_out.propertyReportSections[r].id;
      this.data_move_out.propertyReportSections[r].sectionInventories.push(result);

    })
  }
  //************************************************//
  //FUNCION PARA EDITAR INVENTORY DENTRO DE MOVE IN//
  editSectionInventoryOut(data_inv, pos, r) {
    console.log("entra a abrir modal inventory EDICION move out");

    const dialog = this._dialog.open(DialogInventoryComponent, {
      data: data_inv,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_move_out.propertyReportSections[r].sectionInventories[pos] = result;
      }
    })
  }
  //************************************************//
  //FUNCION PARA ABRIR MODAL DE CARGA DE FOTOS//
  addFotosMoveOut(o) {
    document.getElementById('doc' + o).click();
  }
  //************************************************//
  //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
  addMoveOut() {
    this.data_move_out.propertyReportSections.push({
      "id": 0,
      "propertyReport": this.data_move_out.id,
      "propertySection": 0,
      "status": 0,
      "needRepair": false,
      "reportDate": null,
      "reportDetails": null,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "photosPropertyReportSections": [],
      "sectionInventories": []
    })
  }
  //************************************************//
  //FUNCION AGREGAR KEY INVENTORY DENTRO DE MOVE IN//
  addKeyInventoryOut() {
    console.log("entra a abrir modal inventory move out");

    const dialog = this._dialog.open(DialogKeyComponent, {
      data: {
        id: 0, operacion: 'insertar', propertyReport: this.data_move_out.id
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        result.propertyReport = this.data_move_out.id;
        this.data_move_out.keyInventories.push(result);
      }
    })
  }
  //************************************************//
  //FUNCION EDITAR KEY INVENTORY  DENTRO DE MOVE IN//
  editKeyInventoryOut(data_inv, pos) {
    console.log("entra a abrir modal key inventory EDICION");

    const dialog = this._dialog.open(DialogKeyComponent, {
      data: data_inv,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        this.data_move_out.keyInventories[pos] = result;
      }
    })
  }
  //************************************************//
  //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
  addAttendeesOut() {
    console.log("entra a abrir modal attendees move out");

    const dialog = this._dialog.open(DialogAttendeesComponent, {
      data: {
        id: 0,
        sr: this.data.sr,
        operacion: 'insertar',
        housingListId: this.data_land.housingListId,
        idServiceDetail: this.data_land.idServiceDetail
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        result.propertyReport = this.data_move_in.id;
        this.data_move_out.attendees.push(result);
      }
    })
  }
  //************************************************//
  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttendOut(data_inv, pos) {
    console.log("entra a abrir modal attend move out EDICION");

    let data_ = {
      data: data_inv,
      sr: this.data.sr,
      housingListId: this.data_land.housingListId,
      idServiceDetail: this.data_land.idServiceDetail
    }

    const dialog = this._dialog.open(DialogAttendeesComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_move_out.attendees[pos] = result;
      }
    })
  }
  //************************************************//
  //CARGA DE FOTOS DE MOVE OUT//
  public droppedFotosOut(files: NgxFileDropEntry[], r) {
    this.files = files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = droppedFile.relativePath.split(".");


              this.data_move_out.propertyReportSections[r].photosPropertyReportSections.push({
                "id": 0,
                "propertyReportId": this.data_move_out.propertyReportSections[r].id,
                "base64": imageUrl,
                "photo": encoded,
                "photoExtension": ext[ext.length - 1],
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "updatedBy": this.user.id,
                "updatedDate": new Date(),
              })
            };
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  data_final: any = {};

  ///////////////////// PHOTOS INSPECT 

  lease() {
    debugger;
    // window.open("printlsf/" + this.permanentHome.id + "/" + this.settlingin.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/" + this.cat_serv, '_blank');

    var url_lsf = this.url_api + "printlsf/" + this.permanentHome.id + "/" + this.settlingin.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/" + this.cat_serv;
    this.loader.showLoader();
    this._services.service_general_get('Appointment/GetPDF?xURL=' + url_lsf + "&miliseconds=20000")
      .subscribe((data => {
        this.loader.hideLoader();
        if (data.success) {
          const linkSource =
            'data:application/octet-stream;base64,' + data.message;
          const downloadLink = document.createElement('a');
          const fileName = 'lSF.pdf';

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      }));
  }

  exp_land() {
    debugger;
    //window.open("printld/" + this.permanentHome.id + "/" + this.settlingin.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/" + this.cat_serv, '_blank');

    var url_lsf = this.url_api + "printld/" + this.permanentHome.id + "/" + this.settlingin.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/" + this.cat_serv;
    this.loader.showLoader();
    this._services.service_general_get('Appointment/GetPDF?xURL=' + url_lsf + "&miliseconds=20000")
      .subscribe((data => {
        this.loader.hideLoader();
        if (data.success) {
          const linkSource =
            'data:application/octet-stream;base64,' + data.message;
          const downloadLink = document.createElement('a');
          const fileName = 'LandLord.pdf';

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      }));
  }

  inspection() {
    debugger;
     window.open("printir/" + this.permanentHome.id + "/" + this.settlingin.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/" + this.cat_serv, '_blank');

    var url_lsf = this.url_api + "printir/" + this.permanentHome.id + "/" + this.settlingin.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/" + this.cat_serv;
    this.loader.showLoader();
    this._services.service_general_get('Appointment/GetPDF?xURL=' + url_lsf + "&miliseconds=20000")
      .subscribe((data => {
        this.loader.hideLoader();
        if (data.success) {
          const linkSource =
            'data:application/octet-stream;base64,' + data.message;
          const downloadLink = document.createElement('a');
          const fileName = 'i_and_r.pdf';
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      }));

  }



  call_service_send_propertys() {
    this.loader.showLoader();
    let list_obj = { list: this.hl_to_send, id_sr: this.data.data.serviceRecordId }

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

  ////////////////////////////////////////////// INSPECTIONS & REPAIRS //////////////////////////////////

  //GUARDAR TARJETA ITERABLE DE MOVE OUT//
  save_PropertyReport(propertyInspection) {
    //debugger;
    this.loader.showLoader();
    var _pr;
    if (propertyInspection == 1) {
      //ACTUALIZACION DEL REGISTROS//
      this.data_move_in.propertyInspection = 1; //move in
      this.data_move_in.createdBy = this.user.id;
      this.data_move_in.createdDate = new Date();
      this.data_move_in.updatedBy = this.user.id;
      this.data_move_in.updatedDate = new Date();
      _pr = this.data_move_in;
    }
    else {
      this.data_move_out.propertyInspection = 2; //move out
      this.data_move_out.createdBy = this.user.id;
      this.data_move_out.createdDate = new Date();
      this.data_move_out.updatedBy = this.user.id;
      this.data_move_out.updatedDate = new Date();
      _pr = this.data_move_out;
    }


    //  this.data_move_in.idServiceDetail = this.data.idServiceDetail_current;
    console.log("ENTRA A GUARDAR O ACTUALIZAR INFORMACION PROPERTY REPORT: ", _pr);

    console.log("data_move_in", this.data_move_in);
    this._services.service_general_put("PropertyReport/PutPropertyReport", _pr).subscribe((respondepr => {
      //debugger;
      this.loader.hideLoader();
      if (respondepr.success) {
        console.log(respondepr);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated Data"
          },
          width: "350px"
        });

      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }))
  }

  //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
  addMoveInOut(data_move_id, propertyInspection) {
    debugger;
    var section = {
      "id": 0,
      "propertyReport": data_move_id,//this.data_move_in.id,
      "propertySection": null,
      "status": null,
      "needRepair": false,
      "reportDate": null,
      "reportDetails": null,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "photosPropertyReportSections": [],
      "sectionInventories": [],
      "propertyInspection": propertyInspection
    }

    this.loader.showLoader();
    this._services.service_general_put("HousingList/AddPropertyReportSection", section).subscribe((response_bd => {
      this.loader.hideLoader();
      debugger;
      if (response_bd.success) {
        console.log("HousingList/AddPropertyReportSection ==============================", response_bd);
        if (propertyInspection == 1)
          this.data_move_in.propertyReportSections = response_bd.result.value;
        else
          this.data_move_out.propertyReportSections = response_bd.result.value;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Deleted Data"
          },
          width: "350px"
        });

      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  }

  //************************************************//
  //FUNCION PARA ELIMINAR REPAIR//
  deleteRepair(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this repair?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_repairs.splice(i, 1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE IN//
  deletePhoto(r, p) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this photo?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_in.propertyReportSections[r].photosPropertyReportSections.splice(p, 1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deletePhotoOut(o, p) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this photo?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_out.propertyReportSections[o].photosPropertyReportSections.splice(p, 1);
      }
    })
  }

  deletePhoto_ins(r, p) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this photo?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_inspection[r].photosInspecs.splice(p, 1);
      }
    })
  }

  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deleteMoveInOut(property_rs, i, propertyInspection) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Move In?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.deletePropertyReport(property_rs, i, propertyInspection)
      }
    })
  }

  deletePropertyReport(property_rs, i, propertyInspection) {
    debugger;
    if (property_rs.id > 0) {
      this.loader.showLoader();
      this._services.service_general_put("HousingList/deletePropertyReportSection", property_rs.id).subscribe((response_bd => {
        this.loader.hideLoader();
        debugger;
        if (response_bd.success) {
          console.log("HousingList/deletePropertyReportSection ==============================", response_bd);
          if (propertyInspection == 1)
            this.data_move_in.propertyReportSections = response_bd.result.value;
          else
            this.data_move_out.propertyReportSections = response_bd.result.value;

          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Deleted Data"
            },
            width: "350px"
          });

        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al eliminar la cuenat de banco: ", err);
      });
    }
    else {
      if (propertyInspection == 1)
        this.data_move_in.propertyReportSections.splice(i, 1);
      else
        this.data_move_out.propertyReportSections.splice(i, 1);
    }
  }

  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deleteMoveOut(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Move Out?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_out.propertyReportSections.splice(i, 1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA AGREGAR INVENTORY DENTRO DE MOVE IN//
  addInventoriModal(r, section, propertyInspection, report) {

    if (section > 0) {
      console.log("entra a abrir modal inventori");

      const dialog = this._dialog.open(DialogInventoryComponent, {
        data: {
          id: 0,
          operacion: 'insertar',
          propertyReportSectionId: report.id,
          section: section,
        },
        width: "95%"
      });

      dialog.beforeClosed().subscribe(result => {
        debugger;
        console.log("resultado inventario por seccion =================================", result);
        debugger;
        if (result.success == true) {
          if (propertyInspection == 1) {
            // result.propertyReportSectionId = this.data_move_in.propertyReportSections[r].id;
            this.data_move_in.propertyReportSections[r].sectionInventories = result;
          }
          else {
            result.propertyReportSectionId = this.data_move_out.propertyReportSections[r].id;
            this.data_move_out.propertyReportSections[r].sectionInventories = result;
          }
        }


      })
    }
    else {

      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Data Required",
          body: "Select a Section Please"
        },
        width: "350px"
      });
    }
  };

  //FUNCION PARA EDITAR INVENTORY DENTRO DE MOVE IN//
  editSectionInventory(data_inv, pos, r, section, propertyInspection) {
    console.log("entra a abrir modal inventori EDICION");
    data_inv.section = section;
    const dialog = this._dialog.open(DialogInventoryComponent, {
      data: data_inv,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        if (propertyInspection == 1)
          this.data_move_in.propertyReportSections[r].sectionInventories[pos] = result;
        else
          this.data_move_out.propertyReportSections[r].sectionInventories[pos] = result;
      }
    })
  }


  ////delete deleteSectionInventory

  deleteSectionInventory(key, sectionInventories, propertyInspection) {
    debugger;
    if (key.id > 0) {
      //
      this.loader.showLoader();
      this._services.service_general_put("HousingList/deleteSectionInventory", key.id).subscribe((response_bd => {
        this.loader.hideLoader();
        debugger;
        if (response_bd.success) {
          console.log("HousingList/deleteSectionInventory ==============================", response_bd);
          sectionInventories = response_bd.result.value;

          var i_e = sectionInventories.indexOf(key);
          var removed = sectionInventories.splice(i_e, 1);

          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Deleted Data"
            },
            width: "350px"
          });

        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al eliminar la cuenat de banco: ", err);
      });
    }
    else {
      debugger;
      var i_e = sectionInventories.indexOf(key);
      var removed = sectionInventories.splice(i_e, 1);

    }
  }

  //************************************************//
  //FUNCION AGREGAR KEY INVENTORY DENTRO DE MOVE IN//
  addKeyInventory(propertyInspection) {
    console.log("entra a abrir modal inventori");

    var data_move_id;
    if (propertyInspection == 1)
      data_move_id = this.data_move_in.id
    else
      data_move_id = this.data_move_out.id

    const dialog = this._dialog.open(DialogKeyComponent, {
      data: {
        id: 0, operacion: 'insertar', propertyReport: data_move_id
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        result.propertyReport = data_move_id;
        if (propertyInspection == 1)
          this.data_move_in.keyInventories.push(result);
        else
          this.data_move_out.keyInventories.push(result);
      }
    })
  }
  //************************************************//
  //FUNCION EDITAR KEY INVENTORY  DENTRO DE MOVE IN//
  editKeyInventory(data_inv, pos, propertyInspection) {
    console.log("entra a abrir modal key inventory EDICION");

    const dialog = this._dialog.open(DialogKeyComponent, {
      data: data_inv,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        if (propertyInspection == 1)
          this.data_move_in.keyInventories[pos] = result;
        else
          this.data_move_out.keyInventories[pos] = result;
      }
    })
  }

  deletKeyInventory(key, propertyInspection) {
    debugger;
    if (key.id > 0) {
      //
      this.loader.showLoader();
      this._services.service_general_put("HousingList/deletKeyInventory", key.id).subscribe((response_bd => {
        this.loader.hideLoader();
        debugger;
        if (response_bd.success) {
          console.log("HousingList/deletKeyInventory ==============================", response_bd);
          if (propertyInspection == 1)
            this.data_move_in.keyInventories = response_bd.result.value;
          else
            this.data_move_out.keyInventories = response_bd.result.value;

          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Deleted Data"
            },
            width: "350px"
          });

        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al eliminar la cuenat de banco: ", err);
      });
    }
    else {
      debugger;
      if (propertyInspection == 1) {
        var i_e = this.data_move_in.keyInventories.indexOf(key);
        var removed = this.data_move_in.keyInventories.splice(i_e, 1);
      }
      else {
        var i_e = this.data_move_out.keyInventories.indexOf(key);
        var removed = this.data_move_out.keyInventories.splice(i_e, 1);
      }

    }
  }


  //************************************************//
  //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
  addAttendees(propertyInspection) {
    console.log("entra a abrir modal attendees");


    var move_section;
    if (propertyInspection == 1)
      move_section = this.data_move_in.id
    else
      move_section = this.data_move_out.id

    const dialog = this._dialog.open(DialogAttendeesComponent, {
      data: {
        id: 0,
        sr: this.data.sr,
        operacion: 'insertar',
        propertyReport: move_section,
        housingListId: this.data_land.housingListId,
        idServiceDetail: this.data_land.idServiceDetail
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      debugger;
      console.log(result);

      if (result.success) {
        if (propertyInspection == 1) {
          result.propertyReport = this.data_move_out.id;
          this.data_move_in.attendees.push(result);
        }
        else {
          result.propertyReport = this.data_move_out.id;
          this.data_move_out.attendees.push(result);
        }

      }
    })
  }


  //************************************************//
  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttend(data_inv, pos, propertyInspection) {
    console.log("entra a abrir modal attend EDICION");
    let data_ = {
      data: data_inv,
      sr: this.data.sr,
      housingListId: this.data_land.housingListId,
      idServiceDetail: this.data_land.idServiceDetail
    }

    const dialog = this._dialog.open(DialogAttendeesComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        if (propertyInspection == 1)
          this.data_move_in.attendees[pos] = result;
        else
          this.data_move_out.attendees[pos] = result;
      }
    })
  }

  deleteAttend(key, propertyInspection) {
    debugger
    if (key.id > 0) {
      //
      this.loader.showLoader();
      this._services.service_general_put("HousingList/deleteAttend", key.id).subscribe((response_bd => {
        this.loader.hideLoader();
        debugger;
        if (response_bd.success) {
          console.log("HousingList/deleteAttend ==============================", response_bd);
          if (propertyInspection == 1)
            this.data_move_in.attendees = response_bd.result.value;
          else
            this.data_move_out.attendees = response_bd.result.value;

          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Deleted Data "
            },
            width: "350px"
          });

        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al eliminar la cuenat de banco: ", err);
      });
    }
    else {
      debugger;
      if (propertyInspection == 1) {
        var i_e = this.data_move_in.attendees.indexOf(key);
        var removed = this.data_move_in.attendees.splice(i_e, 1);
      }
      else {
        var i_e = this.data_move_out.attendees.indexOf(key);
        var removed = this.data_move_out.attendees.splice(i_e, 1);
      }


    }

  }

  get_attendiees_vales(att) {
    let d_ = { name: "", email: "", title: "" }

    if (att != null && att != "" && att != undefined) {
      var att_ = this.attendees_list_all.filter(function (E) { if (E.id_Catalog == att) { return true; } });
      if (att_.length > 0) {
        d_.name = att_[0].name;
        d_.email = att_[0].email;
        d_.title = att_[0].title;
      }
    }


    return d_.title

  }

  get_attendees_list_all(housingListId) {
    //  this.loader.showLoader();
    let req_ = {
      idservicedetail: this.settlingin.id,
      propertyid: housingListId,
      srid: this.data.sr,
    }

    this._services.service_general_post_with_url('HousingList/GetAttendeesTitles', req_).subscribe(r => {
      //  this.loader.hideLoader();
      if (r.success) {
        console.log("HousingList/GetAttendeesTitles", r);
        this.attendees_list_all = r.result.value;
      }
    })
  }

  //************************************************//
  //FUNCION PARA ABRIR MODAL DE CARGA DE FOTOS//
  addFotosMove(r) {
    debugger;
    document.getElementById('doc' + r).click();
  }

  addFotosMove_o(r) {
    debugger;
    document.getElementById('doc_o' + r).click();
  }
  //************************************************//
  //CARGA DE FOTOS DE MOVE OUT//
  public droppedFotos(files: NgxFileDropEntry[], r, propertyInspection) {
    debugger;
    this.files = files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log("droppedFile.relativePath: ", droppedFile.relativePath);
          console.log("file: ", file, "this.files: ", this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }
              debugger;

              let ext = droppedFile.relativePath.split(".");
              let _pRid = 0;
              if (propertyInspection == 1)
                _pRid = this.data_move_in.propertyReportSections[r].id;
              else
                _pRid = this.data_move_out.propertyReportSections[r].id;

              var _photosPRS_ = {
                "id": 0,
                "propertyReportId": _pRid,
                "base64": imageUrl,
                "photo": encoded,
                "photoExtension": ext[ext.length - 1],
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "updatedBy": this.user.id,
                "updatedDate": new Date(),
              };

              if (propertyInspection == 1) {
                this.data_move_in.propertyReportSections[r].photosPropertyReportSections.push(_photosPRS_);
              } else {
                this.data_move_out.propertyReportSections[r].photosPropertyReportSections.push(_photosPRS_);
              }

            };
          });
        });
      }

      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  //***************** *******************************//
  //CARGA DE DOCUMENTOS PARA SECCION REPAIRS MOVE IN//
  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[], i) {
    debugger;
    this.files = files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);

            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = droppedFile.relativePath.split(".");

              this.data_repairs[i].documentRepairs.push({
                "id": 0,
                "fileRequest": encoded,
                "fileExtension": ext[ext.length - 1],
                "fileName": droppedFile.relativePath,
                "repairId": 0,
                "createdBy": this.user.id,
                "createdDate": new Date(),
              }

              )
            }

              ;
          }

          );


        }

        );
      }

      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  get_name_section(id) {
    //debugger;
    var result = [];
    var result = this.ca_propertySection.filter(function (E) { if (E.id == id) { return true; } });
    // console.log(result);
    return result[0].propertySection

  }

  //==================================== INSPECS ///////////////////////////////////////////////////////////////////
  //==================================== INSPECS 17 -09 - 2022 /////////////////////////////////////////////////////
  //==================================== INSPECS ///////////////////////////////////////////////////////////////////

  // data_inspection=[];
  //AGREGAR NUEVO INSPECTION//
  addInspectionDate(inspectType) {

    var _obj_add_inspection = {
      id: 0,
      inspectType: inspectType,
      housingList: this.permanentHome.id,
      initialInspectionDate: new Date(),
      finalInspectionDate: null,
      createdBy: this.user.id,
      createdDate: new Date(),
      updateBy: this.user.id,
      updatedDate: new Date(),
      propertySection: null,
      attendeeInspecs: [],
      photosInspecs: [],
      idServiceDetail: this.settlingin.idid,//.data.idServiceDetail_current.
      groupIrId: this.permanentHome.groupIr[0].id
    };

    this.insert_ispection(_obj_add_inspection)

  }
  //DELETE INSPECTION//
  deleteInspection(k) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this inspection?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_inspection.splice(k, 1);
      }
    })

  }
  //************************************************//
  // data_repairs=[];
  //REPAIRS//
  addRepairs() {

    var obj_repair = {
      id: 0,
      housingList: this.permanentHome.id,
      repairType: null,
      supplierPartner: null,
      repairStartDate: null,
      repairEndDate: null,
      totalDays: 0,
      totalCostRepair: 0,
      currency: null,
      comments: null,
      createdBy: this.user.id,
      createdDate: new Date(),
      updateBy: this.user.id,
      updatedDate: new Date(),
      documentRepairs: [],
      idServiceDetail: this.settlingin.idid,//this.data.idServiceDetail_current
      groupIrId: this.permanentHome.groupIr[0].id,
      paymentResponsibility: null
    }

    this.insert_repair(obj_repair);
  }

  pasar_Informacion() {
    this.data_final = {
      "inspection": this.data_inspection,
      "repairs": this.data_repairs,
      "propertyReportSections": this.data_move_in,
      "propertyReportSectionsOut": this.data_move_out
    }
  }
  //************************************************//
  close_Modal() {
    this.pasar_Informacion();
    this.dialogRef.close(this.data_final);
  }
  //************************************************//
  public fileOver(event) {
    debugger;
    console.log(event);
  }
  //************************************************//
  public fileLeave(event) {
    debugger;
    console.log(event);
  }
  //FUNCION PARA AGREGAR MAS DOCUMENTOS//
  addDocument_1(i) {
    document.getElementById('doc' + i).click();
  }

  //************************************************//
  //FUNCION PARA GUARDAR INSPECIONS AND REPAIRS//
  guardar_inspectionAndRepairs() {
    this.loader.showLoader();
    console.log("DATA A GUARDAR RERPAIS: ", this.data_repairs);

    for (let i = 0; i < this.data_repairs.length; i++) {
      if (this.data_repairs[i].id != 0) {
        this._services.service_general_put("HousingList/PutRepair", this.data_repairs[i]).subscribe((data => {
          if (data.success) {
            console.log(data);
            this.loader.hideLoader();
          }
        }

        ), (err) => {
          this.loader.hideLoader();
          console.log("error al guardar los repairs: ", err);
        }

        )
      }

      else {
        this._services.service_general_post_with_url("HousingList/PostRepair", this.data_repairs[i]).subscribe((data => {
          if (data.success) {
            console.log(data);
            this.loader.hideLoader();
          }
        }

        ), (err) => {
          this.loader.hideLoader();
          console.log("error al guardar los repairs: ", err);
        }

        )
      }
    }

    for (let i = 0; i < this.data_inspection.length; i++) {
      if (this.data_inspection[i].id != 0) {
        this._services.service_general_put("HousingList/PutInspection", this.data_inspection[i]).subscribe((data => {
          if (data.success) {
            console.log("HousingList/PutInspection - Request: ", this.data_inspection[i], " response: ", data);
            this.loader.hideLoader();
          }
        }

        ), (err) => {
          this.loader.hideLoader();
          console.log("error al guardar los repairs: ", err);
        }

        )
      }

      else {
        //debugger;
        this._services.service_general_post_with_url("HousingList/PostInspection", this.data_inspection[i]).subscribe((data => {
          //debugger;
          if (data.success) {
            console.log("HousingList/PostRepair - Request: ", this.data_inspection[i], " response: ", data);
            this.data_inspection[i] = data.result;
            this.loader.hideLoader();
          }
        }

        ), (err) => {
          this.loader.hideLoader();
          console.log("error al guardar los repairs: ", err);
        }

        )
      }
    }

    const dialog = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Success",
        body: "Saved Data"
      }

      ,
      width: "350px"
    }

    );
  }

  all_items = [];
  get_items_section(section) {
    this.loader.showLoader();

    this._services.service_general_post_with_url('HousingList/GetItemsSectionInventory', section).subscribe(r => {
      this.loader.hideLoader();
      if (r.success) {
        console.log("HousingList/GetItemsSectionInventory", r);
        this.all_items = r.result.value;
      }
    })
  }

  get_names_items(id) {
    // debugger;
    var name = "";
    if (id > 0) {
      var att_ = this.all_items.filter(function (E) { if (E.id == id) { return true; } });
      name = att_[0].item;
    }

    return name;
  }
  //FUNCION EDITAR ATTENDEES DENTRO DE INSPEC//
  addAttendeesInspec(item) {
    console.log("entra a abrir modal attendees Inspec");

    const dialog = this._dialog.open(DialogAttendeesInspecComponent, {
      data: {
        id: 0,
        sr: this.data.sr,
        operacion: 'insertar',
        inspection: item.id
        , housingListId: this.data_land.housingListId,
        idServiceDetail: this.data_land.idServiceDetail
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      debugger;
      console.log("info recibidia del po pup attendis inspection: ", result);

      if (result.success) {
        // result.propertyReport = this.data_move_in.id;
        item.attendeeInspecs.push(result);
        console.log("Data data_inspection despues del push: ", this.data_inspection)
      }
    })
  }

  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttendInspec(data_inv, pos,) {
    console.log("entra a abrir modal attend EDICION");
    let data_ = {
      data: data_inv,
      sr: this.data.sr,
      housingListId: this.data_land.housingListId,
      idServiceDetail: this.data_land.idServiceDetail
    }

    const dialog = this._dialog.open(DialogAttendeesInspecComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_move_in.attendees[pos] = result;
      }
    })
  }

  ///////////////////// PHOTOS INSPECT 

  addFotosMoveInspec(r) {
    debugger;
    document.getElementById('doc_i' + r).click();
  }

  //========== CARGA DE FOTOS INSPEC//
  public droppedFotosInspec(files: NgxFileDropEntry[], r, item) {
    debugger;
    this.files = files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log("droppedFile.relativePath: ", droppedFile.relativePath);
          console.log("file: ", file, "this.files: ", this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = droppedFile.relativePath.split(".");
              debugger;
              item.photosInspecs.push({
                "id": 0,
                "Inspection": item.id,
                "base64": imageUrl,
                "photo": encoded,
                "photoExtension": ext[ext.length - 1],
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "updatedBy": this.user.id,
                "updatedDate": new Date(),
              })
            };
          });
        });
      }

      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  showlandsection() {
    this.mostrarTarjeta.landLord = !this.mostrarTarjeta.landLord;
    this.dataData_land_list = new MatTableDataSource(this.data_land_list);
    this.dataData_land_list.sort = this.sortrole;
  }

  supplierPartner_repairs() {
    console.log(" datos a enviar SupplierCompany_repairs ============", this.settlingin.idworkOrderServicesId, this.data)
    this._services.service_general_get("SupplierPartnerProfile/GetServProvByServiceTypeCountry?workOrderService=" + this.settlingin.idworkOrderServicesId + "&type=25000").subscribe((data => {
      // this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER PARTNER: ', data.result.value);
        this.SupplierCompany_repairs = data.result.value;
        // this.getInfo();
      }
    }), (err) => {
      console.log("no se realizo la consulta por falta de parametro");
    });
  }

  public openRepairsFileOnWindow(url_in: string): void {
    debugger;
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

  //*****************************************************************************************************//


  insert_ispection(obj_inspect) {
    this._services.service_general_post_with_url("HousingList/PostInspection", obj_inspect).subscribe((data => {
      debugger;
      if (data.success) {
        console.log("HousingList/PostInspection - Request: ", data);
        this.data_inspection = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Add Inspection"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  update_ispection(obj_inspect) {
    debugger;
    this._services.service_general_put("HousingList/PutInspection", obj_inspect).subscribe((data => {
      debugger;
      if (data.success) {
        console.log("HousingList/PutInspection: ", data);
        this.data_inspection = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Updated Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  delete_inspection(obj_inspect) {
    this._services.service_general_put("HousingList/DeleteInspection", obj_inspect.id).subscribe((data => {
      debugger;
      if (data.success) {
        console.log("HousingList/DeleteInspection: ", data);
        this.data_inspection = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Delet Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  insert_repair(obj_repair) {

    this._services.service_general_post_with_url("HousingList/PostRepair", obj_repair).subscribe((data => {
      debugger;
      if (data.success) {
        console.log("HousingList/PostRepair - Request: ", data);
        this.data_repairs = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Add Inspection"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    });



  }

  update_repair(obj_repair) {
    debugger;
    this._services.service_general_put("HousingList/PutRepair", obj_repair).subscribe((data => {
      debugger;
      if (data.success) {
        console.log("HousingList/PutRepair: ", data);
        this.data_repairs = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Updated Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  delete_obj_repair(obj_repair) {
    this._services.service_general_put("HousingList/DeleteRepair", obj_repair.id).subscribe((data => {
      debugger;
      if (data.success) {
        console.log("HousingList/DeleteRepair: ", data);
        this.data_repairs = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Delet Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  delete_obj_document_repair(obj_repair, repair) {
    this._services.service_general_put("HousingList/DeleteDocumentRepair", obj_repair.id).subscribe((data => {
      debugger;
      if (data.success) {
        console.log("HousingList/DeleteDocumentRepair: ", data);
        repair.documentRepairs = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Delet Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }


  //*****************************************************************************************************//
  //**DELETE DOCUMENTO FROM DATABASE**//
  deleteDocument_DB_inspec(i, j, doc, item) {
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
        if (doc.id > 0) {
          this.delete_obj_document_repair(doc, item);
        }
        else {
          this.data_repairs[i].documentRepairs.splice(j, 1);
        }


      }
    })
  }


}
