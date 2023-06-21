import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogPropertyExpensesComponent } from '../dialog-property-expenses/dialog-property-expenses.component';
import { DialoglLandlordBankDetailComponent } from '../dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { DialogPaymentTypeComponent } from '../dialog-payment-type/dialog-payment-type.component';
import { DialogCostSavingsComponent } from '../dialog-cost-savings/dialog-cost-savings.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { TagListComponent } from '@progress/kendo-angular-dropdowns';


@Component({
  selector: 'app-dialog-lease-summary',
  templateUrl: './dialog-lease-summary.component.html',
  styleUrls: ['./dialog-lease-summary.component.css']
})
export class DialogLeaseSummaryComponent implements OnInit {

  //**********************************VARIABLES ******************************************//

  mostrarTarjeta: any = {
    contractDetails: false,
    paymenType: false,
    costSaving: false,
    renewalDetails: false,
    departureDetails: false,
    landLord: false
  };
  user: any;
  payments_due = [];
  costSavingHomes = [];
  paymentHousings = [];
  data_land: any = { creditCardLandLordDetails: [] };
  data_land_historic = [];
  data_contracts: any = { propertyExpenses: [] };
  data_group_saving: any = { costSavingHomes: [] };
  data_group_paymnets: any = { paymentHousings: [] };
  data_renewal: any = {}
  data_departure: any = {}
  recurrence_static = [{ id: "Monthly" }, { id: "Bimonthly" }, { id: "Quarterly" }, { id: "Annually" }, { id: "Biannually" }];
  RentCostSavings = 0;
  data_contracts_historic = [];
  data_renewal_historic = [];
  data_departure_historic = [];
  data_landlord_historic = [];
  data_cost_saving_historic = [];
  data_paym_saving_historic = [];
  ca_clabetype = [{ clave: "SWIFT" }, { clave: "BIC" }, { clave: "IBAN" }, { clave: "ACCOUNT NUMBER" }, { clave: "OTHER" }];
  ca_creditCard = [];
  ca_currency = [];
  ca_recurrence = [];
  ca_dependent = [];
  ca_accountType = [];
  ca_payment_Type = [];
  ca_responsible = [];
  payments_not_due = [];
  ca_security = [];
  data_final: any = {};
  hf_detail = { securityDepositId: null, initialRentPaymentId: null, ongoingRentPaymentId: null, realtorCommissionId: null };
  payment = { amount: 0, currency: null, description: "", comment: "", paymentType: null, responsible: null };
  show_hide_all_ = false;
  paymnet_ = null;
  permanentHome = null;
  lapsos_dias = [{ id: "10" }, { id: "15" }, { id: "30" }, { id: "45" }, { id: "60" }, { id: "90" }, { id: "120" }]
  data_land_list = [];
  loader: LoaderComponent = new LoaderComponent();
  tenant_name="";
  caPropertyTypeHousing: any[] = [];
  propertyType = null;
  address = "";
  zip ="";
  city ="";
  country ="";
  //**********************************VARIABLES ******************************************//

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL LEASE ================================: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
  }

  async catalogos() {
    this.fill_payments_due();
    this.show_hide_all(true);
    //this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    //this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
   // this.ca_creditCard.sort((a, b) => (a.id < b.id ? -1 : 1));
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    this.ca_security = await this._services.getCatalogueFrom('GetSecurityDeposit');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.caPropertyTypeHousing = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.ca_recurrence = duration.filter(function (E) {
      if (E.recurrence != null) {
        return true;
      }
    });

    this._services.service_general_get('Catalogue/GetDependents?sr=' + this.data.sr).subscribe(data => {
      if (data.success) {
        //console.log('DATA CONSULTA: ', data);
        this.ca_dependent = data.result;
      }
    });

    this.ca_creditCard.forEach(E => {
      E.checked = false;
    });

    this.get_lease_sf()
    
   // this.get_home_finding(); //Carga valores iniciales
  }

  get_lease_sf() {
    this.loader.showLoader();

    this._services.service_general_get("HousingList/GetHistoricHousingByService?key=" + this.data.id + "&servide_detail_id=" + this.data.idServiceDetail_current).subscribe((response => {
      debugger;
      // this.calc_RentCostSavings();
      this.permanentHome = response.result.value;
      console.log('esta es la casa permanente despues de insertarcargada desde el lease sumary: ', response.result.value);
      this.llenarJSON();
      this.loader.hideLoader();
    }));

    
  }

  llenarJSON() {
    debugger;

    let _iddetail = this.data.idServiceDetail_current

    if (this.permanentHome.groupCostSavings.length > 0) {
      this.data_group_saving = this.permanentHome.groupCostSavings[0];
      this.costSavingHomes = this.data_group_saving.costSavingHomes;
    }

    if (this.permanentHome.groupHistoricCostSavings.length > 0) {
      this.data_cost_saving_historic = this.permanentHome.groupHistoricCostSavings;
    }

    if (this.permanentHome.groupPaymnetsHousings.length > 0) {
      this.data_group_paymnets = this.permanentHome.groupPaymnetsHousings[0];
      this.paymentHousings = this.data_group_paymnets.paymentHousings;
    }
    if (this.permanentHome.groupHistoricPaymnetsHousings.length > 0) {
      this.data_paym_saving_historic = this.permanentHome.groupHistoricPaymnetsHousings;
    }

    if (this.permanentHome.contractDetails.length > 0) {
      this.data_contracts = this.permanentHome.contractDetails[0];
    }

    if (this.permanentHome.contractHistoricDetails.length > 0) {
      this.data_contracts_historic = this.permanentHome.contractHistoricDetails;
    }

    if (this.permanentHome.renewalDetailHomes.length > 0) {
      this.data_renewal = this.permanentHome.renewalDetailHomes[0];
    }

    if (this.permanentHome.renewalHistoricDetailHomes.length > 0) {
      this.data_renewal_historic = this.permanentHome.renewalHistoricDetailHomes;
    }

    if (this.permanentHome.departureDetailsHomes.length > 0) {
      this.data_departure = this.permanentHome.departureDetailsHomes[0];
    }

    if (this.permanentHome.departureHistoricDetailsHomes.length > 0) {
      this.data_departure_historic = this.permanentHome.departureHistoricDetailsHomes;
    }


    if (this.permanentHome.landlordHeaderDetailsHomes.length > 0) {
      this.data_land = this.permanentHome.landlordHeaderDetailsHomes[0];
      this.data_land_list = this.data_land.landlordDetailsHomes;

    }

    if (this.permanentHome.landlor_HistoricHeaderDetailsHomes.length > 0) {
      this.data_landlord_historic = this.permanentHome.landlor_HistoricHeaderDetailsHomes;
    }

    this.set_contract_details();
    this.sort_property_exp();
    // this.set_payments();
  }

  set_contract_details() {
    //debugger;
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

  calc_RentCostSavings() {

    this.data_contracts.rentcostsaving = 0;
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
    this.data_contracts.rentcostsaving = _res;
  }

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
        result.id = 0;
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


  save_BD() {
    if (this.data.nuevo) {
      this.guarda_nuevo_parametro();
      return true;
    } else {
      this.updateContractDetail();
    }
    console.log(this.data_contracts);
  }

  addExpense() {
    debugger;
    console.log("entra a abrir modal property expenses para inserccion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: { id: 0 },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
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
    });
  }

  updateContractDetail() {
    // //debugger;
    this.loader.showLoader();
    this.data_contracts.createdBy = this.user.id;
    this.data_contracts.createdDate = new Date();
    //this.data_contracts.paymentsDue = 1 ;
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

  saveRenewal() {
    //  //debugger;
    if (this.data.id == 0) {
      this.guarda_nuevo_parametro();
      return true;
    } else {
      this.updateRenewalDetail();
    }
  }

  updateRenewalDetail() {
    this.loader.showLoader();
    this.data_renewal.createdBy = this.user.id;
    this.data_renewal.createdDate = new Date();
    this.data_renewal.updateBy = this.user.id;
    this.data_renewal.updatedDate = new Date();
    //this.data_renewal.id = this.data.id;
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
    if (this.data.nuevo) {
      this.guarda_nuevo_parametro();
      return true;
    } else {
      this.updateDepartureDetail();
    }
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

  saveLandLord() {
    if (this.data.nuevo) {
      this.guarda_nuevo_parametro();
      return true;
    } else {
      this.updateLandLordDetail();
    }
  }

  guarda_card(data, card) {
    console.log(data);
    console.log(card);
    if (data.checked) {
      this.data_land.creditCardLandLordDetails.push({
        landLord: 0,
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
      console.log("elemento guardado de payment: ", result);
      if (result.success) {
        console.log(result);
        result.id = 0;
        //result.housingList = 0;
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        this.paymentHousings.push(result);
        console.log(this.paymentHousings);
      }
    });
  }

  editPaymentType(element, i) {
    //debugger;
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'edicion';
    this.data.payment_rocess = this.data.payment_rocess;
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

  guarda_nuevo_parametro() {
    const dialog = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Success",
        body: "Saved Data"
      },
      width: "350px"
    });
    this.loader.showLoader();
    this.data_final = {
      "contractDetails": this.data_contracts,
      "renewalDetail": this.data_renewal,
      "departureDetails": this.data_departure,
      "landLord": this.data_land,
      "costSavings": this.costSavingHomes,
      "paymentType": this.paymentHousings
    }
    this.loader.hideLoader();
  }

  close() {
    this.guarda_nuevo_parametro();
    //if(this.data.nuevo){
    this.dialogRef.close(this.data_final);
    //}else{
    //  this.dialogRef.close();
    //}
  }

  getRecurrence(id) {
    for (let i = 0; i < this.ca_recurrence.length; i++) {
      if (this.ca_recurrence[i].id == id) {
        return this.ca_recurrence[i].recurrence;
      }
    }
  }

  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }

  getPayment(id) {
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if (this.ca_payment_Type[i].id == id) {
        return this.ca_payment_Type[i].type;
      }
    }
  }

  getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
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
  };

  sortTable(table, columna) {
    //debugger;
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
          //debugger;
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
  
  addBank() {

    console.log("entra a abrir modal bank para inserccion");
    let data_b = {operacion:"", id:0, idServiceDetail: 0, headerId:0} ;
    
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
        this.get_lease_sf();
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

}
