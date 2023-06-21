import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { DialogHousingSpecificationsComponent } from '../dialog-housing-specifications/dialog-housing-specifications.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogLeaseSummaryComponent } from '../dialog-lease-summary/dialog-lease-summary.component';
import { DialogInspectionrepairsComponent } from '../dialog-inspectionrepairs/dialog-inspectionrepairs.component';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';
import { DialogPropertyExpensesComponent } from '../dialog-property-expenses/dialog-property-expenses.component';
import { DialoglLandlordBankDetailComponent } from '../dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { DialogPaymentTypeComponent } from '../dialog-payment-type/dialog-payment-type.component';
import { DialogCostSavingsComponent } from '../dialog-cost-savings/dialog-cost-savings.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { json } from '@angular-devkit/core';
import { stringify } from 'querystring';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAttendeesComponent } from '../dialog-attendees/dialog-attendees.component';
import { DialogKeyComponent } from '../dialog-key/dialog-key.component';
import { DialogInventoryComponent } from '../dialog-inventory/dialog-inventory.component';
import { DialogAttendeesInspecComponent } from '../dialog-attendees-inspec/dialog-attendees-inspec.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-lsf',
  templateUrl: './print-lsf.component.html',
  styleUrls: ['./print-lsf.component.css']
})
export class PrintLsfComponent implements OnInit {

  calculo: any = {};
  mostrarTarjeta: any = {
    contractDetails: false,
    paymenType: false,
    costSaving: false,
    renewalDetails: false,
    departureDetails: false,
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
  data_departure: any = {}
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

  //*****************************************************************************************************//
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
  ca_initial = [];
  ca_ongoing = [];
  ca_realtor_com = [];

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams:ActivatedRoute) { }

  data : any = {};
  show: boolean = false;
  user: any = {};
  //*******************************************************//
  //***********************VARIABLES***********************//
  table_payments: any;
  ca_estatus: any[] = [];
  ca_currency: any[] = [];
  ca_requestType: any[] = [];
  ca_dependent: any[] = [];
  home_finding: any = {};
  temporalDocument: any[] = [];
  temporalDocumentHF: any[] = [];
  ca_accounttype: any[] = [];
  ca_leaseTemplate: any[] = [];
  ca_creditCard: any[] = [];
  nacionality: any[] = [];
  ca_document: any[] = [];
  cr: string = "Reply";
  loader: LoaderComponent = new LoaderComponent();
  //TABLE EXTENSION//
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  //RESQUEST PAYMENT//
  dataSourcePay: any[] = [];
  displayedColumnsPay: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  //TABLE HOUSING//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Send', 'Property Type', 'Address', 'Neighborhood', 'Price', 'Currency', 'Housing Status', 'Actions'];
  //displayedColumnsHousing: string[] = ['Property Type', 'Address', 'Neighborhood', 'Price', 'Currency', 'Housing Status', 'Actions'];
  displayedColumnsHousingExport: string[] = ['NoProperty', 'Property Type', 'Neighborhood', 'Address', 'NoBedroom', 'NoBathroom', 'ParkingSpaces', 'Size', 'ListRent', 'Currency', 'Status', 'Comments'];
  //*******************************************************//
  serviceScope = { "documentcountries": "", "scopeDescription": "" };
  public leaseGuarentee = [
    {
      value: 1,
      name: 'None'
    },
    {
      value: 2,
      name: 'Company Guarantor'
    },
    {
      value: 3,
      name: 'Advance Rent'
    },
    {
      value: 4,
      name: 'Advance Deposit'
    },
    {
      value: 5,
      name: 'Property'
    },
    {
      value: 6,
      name: 'Insurance Bond'
    }
  ];


  payment_rocess = { "securityDepositId": null, "initialRentPaymentId": null, "ongoingRentPaymentId": null, "realtorCommissionId": null }


  _texto_status = "";


  today_: Date = new Date();
  hl_to_send = [];
  ca_lease_signa = [{ id: 1, value: "Assignee" }, { id: 2, value: "Client" }, { id: 3, value: "Assigne and Client" }];

  _ph_id = 0; 
  service_detail_id = 0;
  tenant_name = "Assigne N.";
  city_name= "City N."
  country_name= "Country N."
  type_srv = 0;
  move_out_visible = true;

  ngOnInit(): void {
    this.show_hide_all(true);
    this.data.idServiceDetail_current = this.home_finding.id;
    this.data.sr = 
    this._routerParams.params.subscribe(params => {
      this._ph_id = parseInt(params['id']);
      this.service_detail_id = parseInt(params['service_detail_id']);
      this.tenant_name = params['tenant'];
      this.city_name = params['city'];
      this.country_name = params['country'];
      this.type_srv = + params['type'];
    });
    if(this.type_srv == 26)
    {
      this.move_out_visible = false;
    }

  //  console.log("desde la urlo=====================================================================",this._ph_id, this.service_detail_id);
    this.loader.showLoader();
   // console.log("HOME FINDING DETAIL FROM SR: =====================================", this.data);
   // this.user = JSON.parse(localStorage.getItem('userData'));
   // console.log("USUARIO  ==========================", this.user)
    this.home_finding = {};
    this.get_catalogos();
  }

  caPropertyTypeHousing = [];
  async get_catalogos() {

    this.fill_payments_due();
    this.today_.setDate(this.today_.getDate() + 1);
    this.caPropertyTypeHousing = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=21").subscribe((data => {
      if (data.success) { this.ca_estatus = data.result; }
    }));
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.ca_leaseTemplate = await this._services.getCatalogueFrom('GetLeaseTemplate');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_creditCard.sort((a, b) => (a.id < b.id ? -1 : 1));
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    this._services.service_general_get("Catalogue/GetDocumentType/"+this.type_srv).subscribe((data => {
      if (data.success) { this.ca_document = data.result; }
    }))
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');

    ///////////// Catalogos de pagos 
    this.ca_security = await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetSecurityDeposit');
    this.ca_initial = this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetInitialRentPayment');
    this.ca_ongoing = this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetOngoingRentPayment');
    this.ca_realtor_com = this.ca_security;//await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetRealtorCommission'); 

    this.ca_recurrence = duration.filter(function (E) { if (E.recurrence != null) { return true; } });
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_creditCard.forEach(E => { E.checked = false; });
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus'); //= await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');

    this.get_items_section(0);
    // this.get_attendees_list_all();

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

    this.permanent_homet(this._ph_id);

  }
  //*****************************************************************************************************//
  //DEPENDENT//
  get_dependent() {
    this._services.service_general_get('Catalogue/GetLeaseSignators?sr=0').subscribe(data => {
      if (data.success) {
        console.log('DATA GetLeaseSignators ==================================: ', data);
        this.ca_dependent = data.result;
      }
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

  contract_Type: any[] = [];

  get_contarct_type() {
    this._services.service_general_get('AdminCenter/ContractType/All').subscribe(resp => {
      if (resp.success) {
        console.log('get contract ===========================================', resp);
        this.contract_Type = resp.result;
      }
    });
  }


  permanent_homet(id_ph) {
    this.loader.showLoader();
   // this._services.service_general_get("HousingList/GetLSFPropertyPrint?key=" + id_ph + "&servide_detail_id=" + this.service_detail_id).subscribe((data => {
    this._services.service_general_get("HousingList/GetLSFPropertyPrint?key=" + id_ph + "&servide_detail_id=" + this.service_detail_id + "&type="+this.type_srv).subscribe((data => {
      this.permanentHome = data.result.value;
      console.log('esta es la casa permanente desde el print LSF: ', this.permanentHome);
      // this.data_contracts = this.permanentHome.contractDetails[0];
      
      this.llenarJSON();
      this.calc_RentCostSavings();
      this.loader.hideLoader();
    }))
  }
  
  RentCostSavings = 0;
  
  calc_RentCostSavings() {

    this.RentCostSavings = 0;
    let _res = 0;
    let current_p = this.data_contracts.finalRentPrice;
    let invalid_ = false;
    if ((current_p == 0) || (isNaN(current_p)) || (current_p == null) || (current_p == undefined))
      invalid_ = true
    if (((this.data_contracts.listRentPrice - current_p) < 0) || invalid_) {
      _res = 0;
    }
    else {
      _res = this.data_contracts.listRentPrice - this.data_contracts.finalRentPrice;
      _res = _res * -1;
    }
    this.RentCostSavings = _res;

  }

  show_hide_all_ = false;
  show_hide_all(option) {
    this.show_hide_all_ = option;
    this.mostrarTarjeta.contractDetails = option;
    this.mostrarTarjeta.paymenType = option;
    this.mostrarTarjeta.costSaving = option;
    this.mostrarTarjeta.renewalDetails = option;
    this.mostrarTarjeta.departureDetails = option;
    this.mostrarTarjeta.landLord = option;
    this.mostrarTarjeta.move_in = option;
    this.mostrarTarjeta.repairs = option;
    this.mostrarTarjeta.move_out = option;
  }



  get_text_status() {
    for (var v = 0; v < this.ca_estatus.length; v++) {
      if (this.ca_estatus[v].id == this.home_finding.statusId) {
        this._texto_status = this.ca_estatus[v].status;
      }
    }
  }

  ///////////////////////V//////////////// VARIABLES /////////////////////////////////////////////

  permanentHome: any;
  data_inspection = [];
  data_repairs = [];
  data_home = [];

  //////////////////////////////////// FUNCIONES Y VARIABLES  NUEVO LSF //////////////////////////////////

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

  llenarJSON() {
    //debugger;
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

    }

    if (this.permanentHome.landlor_HistoricHeaderDetailsHomes) {
      this.data_landlord_historic = this.permanentHome.landlor_HistoricHeaderDetailsHomes;
    }
    // this.set_payments();
    this.set_contract_details();
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

    if (this.permanentHome.propertyReports) {
      for (let i = 0; i < this.permanentHome.propertyReports.length; i++) {
        if (this.permanentHome.propertyReports[i].propertyInspection == 1) {
          this.data_move_in = this.permanentHome.propertyReports[i];
        }

        if (this.permanentHome.propertyReports[i].propertyInspection == 2) {
          this.data_move_out = this.permanentHome.propertyReports[i];
        }
      }

      ////console.log(this.data_move_in);
    }

    if (this.permanentHome.repairs) {
      this.data_repairs = this.permanentHome.repairs;
      //this.data_final.repairs = this.data_repairs;
    }

    debugger; 
    if (this.permanentHome.inspections) {
      this.data_inspection = this.permanentHome.inspections;
      //  this.data_final.inspection = this.data_inspection;
    }

    // this.loader.hideLoader(); // 

  }

  /////////////////////////////FUNCIONES //////////////////////////////////////////////////////////////////////////////////////////////////////////


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

  set_contract_details() {
    ////debugger;
    if (this.data_contracts.listRentPrice > 0) { }
    else {
      if (this.permanentHome.price > 0) {
        this.data_contracts.listRentPrice = this.permanentHome.price; //setea el precio desde el detalle de la propiedad
      }
    }

    if (this.data_contracts.currency > 0) { }
    else {
      if (this.permanentHome.currency > 0) {
        this.data_contracts.currency = this.permanentHome.currency; //setea el currency desde el detalle de la propiedad
      }
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

  addExpense() {
    //debugger;
    console.log("entra a abrir modal property expenses para inserccion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: { id: 0 },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      this.sort_property_exp();
      if (result.success) {
        result.id = 0;
        result.contractDetail = this.data_contracts.id
        if (this.data_contracts.id == undefined) {
          result.contractDetail = 0;
        }
        if (this.data.id != 0) {
          result.contractDetail = this.data.id;
        }
        this.data_contracts.propertyExpenses.push(result);
        console.log(this.data_contracts);
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

  saveRenewal() {
    this.updateRenewalDetail();
  }

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
      //debugger;
      if (result.success) {
        this.data_land_list.push(result);
        // this.get_lease_sf();

        //   result.id = 0;
        //   result.contractDetail = this.data_contracts.id
        //   if (this.data_contracts.id == undefined) {
        //     result.contractDetail = 0;
        //   }
        //   if (this.data.id != 0) {
        //     result.contractDetail = this.data.id;
        //   }
        //   this.data_contracts.propertyExpenses.push(result);
        //   console.log(this.data_contracts);

      }

    });
  }

  editBank(data_, i) {
    console.log("entra a abrir modal landlorddetail para edicion");
    data_.operacion == 'editar'
    const dialog = this._dialog.open(DialoglLandlordBankDetailComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      if (result.success) {
        this.data_land_list[i] = result;

      }
    });
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

  get_lease_sf() {
    //debugger;
    this.permanent_homet(this.permanentHome.id)
  }

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
  save_PropertyReport() {
    //debugger;
    this.loader.showLoader();


    //ACTUALIZACION DEL REGISTROS//
    this.data_move_in.propertyInspection = 1; //move in 
    this.data_move_in.createdBy = this.user.id;
    this.data_move_in.createdDate = new Date();
    this.data_move_in.updatedBy = this.user.id;
    this.data_move_in.updatedDate = new Date();
    //  this.data_move_in.idServiceDetail = this.data.idServiceDetail_current;
    console.log("ENTRA A GUARDAR O ACTUALIZAR INFORMACION MOVE IN: ", this.data_move_in);

    console.log("data_move_in", this.data_move_in);
    this._services.service_general_put("PropertyReport/PutPropertyReport", this.data_move_in).subscribe((data => {
      //debugger;
      this.loader.hideLoader();
      if (data.success) {
        console.log(data);
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
  addInventoriModal(r, section) {
    if (section > 0) {
      console.log("entra a abrir modal inventori");

      const dialog = this._dialog.open(DialogInventoryComponent, {
        data: {
          id: 0, operacion: 'insertar',
          section: section
        },
        width: "95%"
      });

      dialog.beforeClosed().subscribe(result => {
        console.log(result);
        result.propertyReportSectionId = this.data_move_in.propertyReportSections[r].id;
        this.data_move_in.propertyReportSections[r].sectionInventories.push(result);

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
  }
  //************************************************//
  //FUNCION PARA EDITAR INVENTORY DENTRO DE MOVE IN//
  editSectionInventory(data_inv, pos, r, section) {
    console.log("entra a abrir modal inventori EDICION");
    data_inv.section = section;
    const dialog = this._dialog.open(DialogInventoryComponent, {
      data: data_inv,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        this.data_move_in.propertyReportSections[r].sectionInventories[pos] = result;
      }
    })
  }
  //************************************************//
  //FUNCION AGREGAR KEY INVENTORY DENTRO DE MOVE IN//
  addKeyInventory() {
    console.log("entra a abrir modal inventori");

    const dialog = this._dialog.open(DialogKeyComponent, {
      data: {
        id: 0, operacion: 'insertar', propertyReport: this.data_move_in.id
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        result.propertyReport = this.data_move_in.id;
        this.data_move_in.keyInventories.push(result);
      }
    })
  }
  //************************************************//
  //FUNCION EDITAR KEY INVENTORY  DENTRO DE MOVE IN//
  editKeyInventory(data_inv, pos) {
    console.log("entra a abrir modal key inventory EDICION");

    const dialog = this._dialog.open(DialogKeyComponent, {
      data: data_inv,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        this.data_move_in.keyInventories[pos] = result;
      }
    })
  }
  //************************************************//
  //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
  addAttendees() {
    console.log("entra a abrir modal attendees");

    const dialog = this._dialog.open(DialogAttendeesComponent, {
      data: {
        id: 0,
        sr: this.data.sr,
        operacion: 'insertar',
        propertyReport: this.data_move_in.id,
        housingListId: this.data_land.housingListId,
        idServiceDetail: this.data_land.idServiceDetail
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        result.propertyReport = this.data_move_in.id;
        this.data_move_in.attendees.push(result);
      }
    })
  }
  //************************************************//
  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttend(data_inv, pos) {
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
        this.data_move_in.attendees[pos] = result;
      }
    })
  }

  attendees_list_all = [];

  get_attendiees_vales(att) {
    let d_ = { name: "", email: "", title: "" }

    if( att != null && att != ""  && att != undefined){
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
      idservicedetail: this.home_finding.id,
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
  //************************************************//
  //CARGA DE FOTOS DE MOVE OUT//
  public droppedFotos(files: NgxFileDropEntry[], r) {
    debugger;
    this.files = files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log("droppedFile.relativePath: ",droppedFile.relativePath);
          console.log("file: ", file,"this.files: ", this.files);

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

              this.data_move_in.propertyReportSections[r].photosPropertyReportSections.push({
                "id": 0,
                "propertyReportId": this.data_move_in.propertyReportSections[r].id,
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
  //************************************************//
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
  //************************************************//

  get_name_section(id) {
    //debugger;
    var result = [];
    var result = this.ca_propertySection.filter(function (E) { if (E.id == id) { return true; } });
    // console.log(result);
    return result[0].propertySection

  }

  //==================================== INSPECS 

  // data_inspection=[];
  //AGREGAR NUEVO INSPECTION//
  addInspectionDate() {
    this.data_inspection.push({
      id: 0,
      inspectType: 1,
      housingList: this.permanentHome.id,
      initialInspectionDate: new Date(),
      finalInspectionDate: null,
      createdBy: this.user.id,
      createdDate: new Date(),
      updateBy: this.user.id,
      updatedDate: new Date(),
      propertySection: null,
      attendeeInspecs: [],
      photosInspec: [],
      idServiceDetail: this.home_finding.id//.data.idServiceDetail_current.
    })
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
    this.data_repairs.push({
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
      idServiceDetail: this.home_finding.id//this.data.idServiceDetail_current
    }

    )
  }
  //************************************************//
  //FUNCION PARA GUARDAR INSPECIONS AND REPAIRS//
  guardar_inspectionAndRepairs() {
    debugger;
     if (this.data.status_ == 'nuevo') {
       this.loader.showLoader();
       this.pasar_Informacion();
       const dialog = this._dialog.open(DialogGeneralMessageComponent, {
         data: {
           header: "Success",
           body: "Save Data"
         },
         width: "350px"
       });
       this.loader.hideLoader();
     }
     else {
      this.updateInspection();
    }
  }

  data_final: any = {};

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
   // this.dialogRef.close(this.data_final);
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
  //FUNCION PARA ACTUALIAZAR LA SECCION REPAIRS//
  updateInspection() {
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
    if(id > 0){
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
        ,housingListId: this.data_land.housingListId,
        idServiceDetail: this.data_land.idServiceDetail
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("info recibidia del po pup attendis inspection: ", result);

      if (result.success) {
       // result.propertyReport = this.data_move_in.id;
        item.attendeeInspecs.push(result);
        console.log("Data data_inspection despues del push: ",this.data_inspection )
      }
    })
  }

  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttendInspec(data_inv, pos) {
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
    document.getElementById('doc' + r).click();
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
        console.log("droppedFile.relativePath: ",droppedFile.relativePath);
        console.log("file: ", file,"this.files: ", this.files);

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


//INCLUDED//
getIncluded(data) {
  if (data == false) {
    return 'NO';
  } else if (data == true) {
    return 'SI';
  }
}
//Currency//
getCurrency(id) {
  for (let i = 0; i < this.ca_currency.length; i++) {
    if (this.ca_currency[i].id == id) {
      return this.ca_currency[i].currency;
    }
  }
}
//Payment//
getPayment(id) {
  for (let i = 0; i < this.ca_payment_Type.length; i++) {
    if (this.ca_payment_Type[i].id == id) {
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
//Recurrencia//
getRecurrence(id) {
  for (let i = 0; i < this.ca_recurrence.length; i++) {
    if (this.ca_recurrence[i].id == id) {
      return this.ca_recurrence[i].recurrence;
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


}
