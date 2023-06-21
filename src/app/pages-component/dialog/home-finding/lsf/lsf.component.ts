import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsComponent } from '../../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../../general-message/general-message.component';
import { DialogHomeDetailsComponent } from '../../dialog-home-details/dialog-home-details.component';
import { DialogHousingSpecificationsComponent } from '../../dialog-housing-specifications/dialog-housing-specifications.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogPaymentConceptComponent } from '../../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogLeaseSummaryComponent } from '../../dialog-lease-summary/dialog-lease-summary.component';
import { DialogInspectionrepairsComponent } from '../../dialog-inspectionrepairs/dialog-inspectionrepairs.component';
import { DialogStatusDetailComponent } from '../../dialog-status-detail/dialog-status-detail.component';
import { DialogPropertyExpensesComponent } from '../../dialog-property-expenses/dialog-property-expenses.component';
import { DialoglLandlordBankDetailComponent } from '../../dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { DialogPaymentTypeComponent } from '../../dialog-payment-type/dialog-payment-type.component';
import { DialogCostSavingsComponent } from '../../dialog-cost-savings/dialog-cost-savings.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { json } from '@angular-devkit/core';
import { stringify } from 'querystring';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAttendeesComponent } from '../../dialog-attendees/dialog-attendees.component';
import { DialogKeyComponent } from '../../dialog-key/dialog-key.component';
import { DialogInventoryComponent } from '../../dialog-inventory/dialog-inventory.component';
import { DialogAttendeesInspecComponent } from '../../dialog-attendees-inspec/dialog-attendees-inspec.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-lsf',
  templateUrl: './lsf.component.html',
  styleUrls: ['./lsf.component.css']
})
export class LsfComponent implements OnInit {

  @Input() _hf_id: number;
  @Input() _ph_id: number;
  @Input() _workOrderServicesId: number;
  @Input() _type_housing: number;
  @Input() _deliveredTo: string;
  @Input() _city_name: string;
  @Input() _country_name: string;
  @Input() _catCategoryId: number;

  @ViewChild('sortrole') sortrole: MatSort;


  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  versions_lsf = [];
  lsf_service_detail_id;
  ///////////////////////////////////////////////// VAIABLES //////////////////////
  loader: LoaderComponent = new LoaderComponent();
  permanentHome;
  home_finding: any = {};
  payment_rocess = { "securityDepositId": null, "initialRentPaymentId": null, "ongoingRentPaymentId": null, "realtorCommissionId": null }

  hf_id;
  ph_id;
  workOrderServicesId;
  type_housing;
  url_api = `${environment.URL_EXPORT}`;
  show_hide_all_ = false;
  ca_currency: any[] = [];
  ca_propertySection = [];
  permanentHome_LSF;

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
  user: any = {};

  housing_specs: any = {
    "relHousingAmenities": [],
    "typeService": null,
    "workOrderServices": null,
    "desiredCommuteTime": null,
    "intendedStartDate": new Date(),
    "parkingSpace": 0,
    "areaInterest": "",
    "contractTypeId": null,
    "propertyTypeId": null,
    "bedroom": 0,
    "bathroom": 0,
    "budget": 0,
    "currencyId": null,
    "size": "0",
    "metricId": null,
    "additionalComments": ""
  };


  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userData'));
    this.ph_id = this._ph_id;
    this.hf_id = this._hf_id;
    this.workOrderServicesId = this._workOrderServicesId;
    this.type_housing = this._type_housing;
    
    this.get_catalogs();
    
    //this.GetOnlyPropertyDetails(1);
  }

  ngOnChanges() {
    this.ngOnInit();
  }


  /////////////////Property Detail 


  async get_catalogs() {

    //contract details 
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.fill_payments_due();

    //Paymentsa 
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus'); //= await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_recurrence = duration.filter(function (E) { if (E.recurrence != null) { return true; } });
  

    this.ca_security = await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetSecurityDeposit');
    this.ca_initial = this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetInitialRentPayment');
    this.ca_ongoing = this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetOngoingRentPayment');
    this.ca_realtor_com = this.ca_security;//await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetRealtorCommission'); 

    //LandLord 
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');

    //versions 
    this.get_lsf_versions();

  }


  GetHomeFindingById(hf_id) {

    this._services.service_general_get('RelocationServices/GetHomeFindingById?id=' + hf_id).subscribe(data => {
      if (data.success) {
        console.log('DATA GetHomeFindingById ===========================: ', data, "id :", hf_id);
        this.home_finding = data.result;
        this.payment_rocess.securityDepositId = this.home_finding.securityDepositId;
        this.payment_rocess.initialRentPaymentId = this.home_finding.initialRentPaymentId;
        this.payment_rocess.ongoingRentPaymentId = this.home_finding.ongoingRentPaymentId;
        this.payment_rocess.realtorCommissionId = this.home_finding.realtorCommissionId;
        this.GetOnlyPropertyDetails(this.ph_id);
        this.get_housing_specs();
      }
      else {
        alert('error al cargar los datos de la propiedad en componente LSF id: ' + hf_id)
      }
    });
  }


  get_lsf_versions(){
    console.log(this.hf_id+"&id_catCategoryId="+this._catCategoryId+"&housing_list_id="+this.ph_id);
    this._services.service_general_get('HousingList/GetLeaseInspectionsVersions?id_service_detail=' + this.hf_id+"&id_catCategoryId="+this._catCategoryId+"&housing_list_id="+this.ph_id).subscribe(data => {
      if (data.success) {
        console.log('DATA GetLeaseInspectionsVersions ===========================: ', data); 
        this.versions_lsf = data.result.lease_versions;
        if(!this.lsf_service_detail_id){
          this.lsf_service_detail_id = this.hf_id;
        }

        console.log('DATA GetLeaseInspectionsVersions ===========================: ', this.versions_lsf); 
        this.GetHomeFindingById(this.hf_id);
      }
      else {
        alert('error las versiones')
      }
    });
  }

  refresh_component(){
    alert("change in this.lsf_service_detail_id : " + this.lsf_service_detail_id)
  }
  


  GetOnlyPropertyDetails(id_ph) {

    this._services.service_general_get("HousingList/GetOnlyPropertyDetails?key=" + id_ph + "&servide_detail_id=" + this.home_finding.id).subscribe((data => {
      this.permanentHome = data.result.value;
      console.log('DETALLES DE LA CASA PERMANENTE : ', this.permanentHome);
      this.GetOnlyPropertyLSF(id_ph);

      // this.llenarJSON();
      //  this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }



  GetOnlyPropertyLSF(id_ph) {
    //debugger;
    this._services.service_general_get("HousingList/GetOnlyPropertyLSF?key=" + id_ph + "&servide_detail_id=" + this.lsf_service_detail_id).subscribe((data => {
      this.permanentHome_LSF = data.result.value;
      console.log('ONLY LEASE SUMARY FORM : ', this.permanentHome_LSF);
      this.llenarJSON();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  get_housing_specs() {

    this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord/' + Number(this.workOrderServicesId) + '/' + this.type_housing).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
        console.log('DATA GetHousingSpecitifcationByServiceRecord: ', data);
        if (data.result != null) {

          this.housing_specs = data.result;
          if (!this.housing_specs.propertyTypeId) {
            this.housing_specs.propertyTypeId = 0;
          }
        }

        this.loader.hideLoader();
      }
    }), (err) => {
      console.log("Error al consultar housing specifications ", err);
    });
  }



  ////////////////////////FROM HOME FINDING 

  lease() {
    var url_lsf = this.url_api + "printlsf/" + this.permanentHome.id + "/" + this.home_finding.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/26";
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


  deleteExpense(expense) {
    //////debugger;;
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

  sortTable(table, columna) {
    ////////debugger;;
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
          ////////debugger;;
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

  sort_property_exp() {
    // ////debugger;;
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
  lapsos_dias = [{ id: 10 }, { id: 15 }, { id: 30 }, { id: 45 }, { id: 60 }, { id: 90 }, { id: 120 }]
  data_land_list = [];
  dataData_land_list = new MatTableDataSource(null);
  groupIrhistoric = [];
  ca_resppayrep = [];
  move_out_visible = false;
  ca_status_report = [];

  llenarJSON() {
    ////debugger;;

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



    ////////////////////////////////////// INSPECTIONS & REPAIRS //////////////////////////////////
    ////debugger;;
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

  }

  data_inspection;
  data_repairs = [];
  data_home = [];


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

  //Currency//
  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  };

  save_BD() {
    this.updateContractDetail();
    console.log(this.data_contracts);
  }

  updateContractDetail() {
    //////debugger;;
    this.loader.showLoader();
    this.data_contracts.createdBy = this.user.id;
    this.data_contracts.createdDate = new Date();
    //this.data_contracts.paymentsDue = 1 ;
    console.log("DATA A GUARDAR PutContractDetail: ", this.data_contracts);
    this._services.service_general_put("HousingList/PutContractDetail", this.data_contracts).subscribe((data => {
      //////debugger;;
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

  addExpense() {
    //////debugger;;
    console.log("entra a abrir modal property expenses para inserccion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: {
        id: 0
        , contractDetail: this.data_contracts.idContract
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      ////debugger;;
      if (result.success) {
        this.data_contracts.propertyExpenses = result;
        this.sort_property_exp();
      }
    });
  }

  editExpense(data_, i) {
    console.log("entra a abrir modal property expenses para edicion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      if (result.success) {
        this.data_contracts.propertyExpenses = result;
      }
      this.sort_property_exp();
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
    ////////debugger;;
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
    //////debugger;;
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

  ca_payment_Type = [];
  ca_responsible = [];
  ca_recurrence = [];

  ca_property = [];
  ca_privacy = [];
  ca_security = [];
  ca_initial = [];
  ca_ongoing = [];
  ca_realtor_com = [];

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
    //////debugger;;
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
  };

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
      ////debugger;;
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
    //////debugger;;
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
    ////debugger;;
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
      ////debugger;
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

  showlandsection() {
    this.mostrarTarjeta.landLord = !this.mostrarTarjeta.landLord;
    this.dataData_land_list = new MatTableDataSource(this.data_land_list);
    this.dataData_land_list.sort = this.sortrole;
  }

  ca_accountType = [];
  ca_creditCard: any[] = [];

  exp_land() {
    ////debugger;;
    // window.open("printld/" + this.permanentHome.id + "/" + this.home_finding.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/26" , '_blank');

    var url_lsf = this.url_api + "printld/" + this.permanentHome.id + "/" + this.home_finding.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/26";
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

  today_: Date = new Date();
  hl_to_send = [];
  ca_lease_signa = [{ id: 1, value: "Assignee" }, { id: 2, value: "Client" }, { id: 3, value: "Assigne and Client" }];


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
}
