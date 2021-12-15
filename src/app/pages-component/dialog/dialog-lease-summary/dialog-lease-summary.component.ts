import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogPropertyExpensesComponent } from '../dialog-property-expenses/dialog-property-expenses.component';
import { DialogPaymentTypeComponent } from '../dialog-payment-type/dialog-payment-type.component';
import { DialogCostSavingsComponent } from '../dialog-cost-savings/dialog-cost-savings.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-lease-summary',
  templateUrl: './dialog-lease-summary.component.html',
  styleUrls: ['./dialog-lease-summary.component.css']
})
export class DialogLeaseSummaryComponent implements OnInit {

  //VARIABLES PARA CONTRAER TARJETAS//
  mostrarTarjeta : any = {
    contractDetails: false,
    paymenType: false,
    costSaving: false,
    renewalDetails: false,
    departureDetails: false,
    landLord: false
  };
  user:any;

  //VARIABLES PRINCIPALES DEL JSON//
  costSavingHomes = [];
  paymentHousings = [];
  data_land:any = {
    creditCardLandLordDetails:[]
  };
  //CONTRACT DETAILS//
  data_contracts:any = {
    propertyExpenses: []
  };
  //RENEWAL DETAILS//
  data_renewal:any ={}
  //DEPARTURE DETAILS//
  data_departure:any = {}


  loader:LoaderComponent = new LoaderComponent();

  constructor(public _services : ServiceGeneralService, public _dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { }

  //****************************************************************************//
  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL LEASE: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
     this.llenarJSON();
     this.catalogos();
  }
  //****************************************************************************//
  llenarJSON(){
    if(this.data.costSavingHomes){
      this.costSavingHomes = this.data.costSavingHomes;
    }
    if(this.data.paymentHousings){
      this.paymentHousings = this.data.paymentHousings;
    }
    if(this.data.contractDetail){
      this.data_contracts = this.data.contractDetail;
    }
    if(this.data.renewalDetailHome){
      this.data_renewal = this.data.renewalDetailHome;
    }
    if(this.data.departureDetailsHome){
      this.data_departure = this.data.departureDetailsHome;
    }
    if(this.data.landlordDetailsHome){
      this.data_land = this.data.landlordDetailsHome;
    }
  }
  //****************************************************************************//
  ca_creditCard = [];
  ca_currency = [];
  ca_recurrence = [];
  ca_dependent = [];
  ca_accountType = [];
  ca_payment_Type = [];
  ca_responsible = [];
  async catalogos(){
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');

    this.ca_creditCard.forEach(E => {
      E.checked = false;
    });

    if(this.data_land.creditCardLandLordDetails){
     this.ca_creditCard.forEach(E => {
     for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
         if(this.data_land.creditCardLandLordDetails[i].creditCard == E.id){
           E.checked = true;
         }
       }
     })
   }


    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_recurrence = duration.filter(function(E){
      if(E.recurrence != null){
         return true;
      }
    });

    
    this._services.service_general_get('Catalogue/GetDependents?sr=' + this.data.sr).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_dependent = data.result;
      }
    });
    

  }
  //****************************************************************************//
  //AGREGAR NUEVO COST SAVING//
  addCostSavings(){
    console.log("entra a abrir modal cost saving");
    this.data.operacion = 'insertar';
    const dialog = this._dialog.open(DialogCostSavingsComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result=>{
      if(result.success){
       console.log(result);
       result.id = 0;
       //result.housingList = 0;
       result.createdBy = this.user.id;
       result.createdDate = new Date();
       this.costSavingHomes.push(result);
       console.log(this.costSavingHomes);
      }
    });
  }
  //EDITAR COST SAVINGS//
  editCostSavings(data, i){
    console.log("entra a abrir modal cost saving");
    this.data.operacion = 'edicion';
    this.data.i = i;
    const dialog = this._dialog.open(DialogCostSavingsComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result=>{
      if(result.success){
        result.updateBy = this.user.id;
        result.updatedDate = new Date();
       console.log(result);
       this.costSavingHomes[i] = result;
      }
    });
  }
  //****************************************************************************//
  //METODOS DE CONTRACT DETAILS//
  save_BD(){
    if(this.data.nuevo){
      this.guarda_nuevo_parametro();
      return true;
    }else{
      this.updateContractDetail();
    }
    console.log(this.data_contracts);
  }
  //INSERCCION CONSTRACT DETAILS//
  addExpense(){
    console.log("entra a abrir modal property expenses para inserccion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: { id : 0},
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result=>{
      if(result.success){
        result.id = 0;
        result.contractDetail = this.data_contracts.id
        if(this.data_contracts.id == undefined){
          result.contractDetail = 0;
        }
        if(this.data.id != 0){
          result.contractDetail = this.data.id;
        }
       this.data_contracts.propertyExpenses.push(result);
       console.log(this.data_contracts);
      }
    });
  }
  //EDICION DE CONTRACT DETAILS//
  editExpense(data_, i){
    console.log("entra a abrir modal property expenses para edicion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result=>{
      if(result.success){
       this.data_contracts.propertyExpenses[i] = result;
      }
    });
  }
  //GUARDAR CONTRACT DETAILS (EDICION)//
  updateContractDetail(){
    this.loader.showLoader();
    this.data_contracts.createdBy = this.user.id;
    this.data_contracts.createdDate = new Date();
    console.log("DATA A GUARDAR RENEWAL: ", this.data_contracts);
    this._services.service_general_put("HousingList/PutContractDetail", this.data_contracts).subscribe((data => {
      if(data.success){
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
    }),(err)=>{
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }
  //****************************************************************************//
  //METODOS DE RENEWAL//
  saveRenewal(){
    if(this.data.nuevo){
      this.guarda_nuevo_parametro();
      return true;
    }else{
       this.updateRenewalDetail();
    }
  }
  updateRenewalDetail(){
    this.loader.showLoader();
    this.data_renewal.createdBy = this.user.id;
    this.data_renewal.createdDate = new Date();
    this.data_renewal.updateBy = this.user.id;
    this.data_renewal.updatedDate = new Date();
    console.log("DATA A GUARDAR RENEWAL (ACTUALIZACION): ", this.data_renewal);
    this._services.service_general_put("HousingList/PutRenewalDetail", this.data_renewal).subscribe((data => {
      if(data.success){
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
    }),(err)=>{
      this.loader.hideLoader();
      console.log("error al guardar renewal: ", err);
    })
  }
  //****************************************************************************//
  //METODOS DEPARTURE//
  saveDeparture(){
    if(this.data.nuevo){
      this.guarda_nuevo_parametro();
      return true;
    }else{
       this. updateDepartureDetail();
    }
  }

  updateDepartureDetail(){
    this.loader.showLoader();
    this.data_departure.createdBy = this.user.id;
    this.data_departure.createdDate = new Date();
    this.data_departure.updateBy = this.user.id;
    this.data_departure.updatedDate = new Date();
    console.log("DATA A GUARDAR departure (ACTUALIZACION): ", this.data_departure);
    this._services.service_general_put("HousingList/PutDepartureDetails", this.data_departure).subscribe((data => {
      if(data.success){
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
    }),(err)=>{
      this.loader.hideLoader();
      console.log("error al guardar departure details: ", err);
    })
  }
  //****************************************************************************//
  //METODOS DE LANDLORD DETAIL//
  saveLandLord(){
    if(this.data.nuevo){
      this.guarda_nuevo_parametro();
      return true;
    }else{
       this.updateLandLordDetail();
    }
  }
  //LLENADO DE NODO CREDITCARD//
  guarda_card(data, card){
    console.log(data);
    console.log(card);
    if(data.checked){
       this.data_land.creditCardLandLordDetails.push({
          landLord: 0,
          creditCard: card.id
       });
    }else{
      for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
        if(this.data_land.creditCardLandLordDetails[i].creditCard == card.id){
          this.data_land.creditCardLandLordDetails.splice(i,1);
        }
      }
    }
  }
  //METODO DE ACTUALIZAR LANDLORD//
  updateLandLordDetail(){
    this.loader.showLoader();
    this.data_land.createdBy = this.user.id;
    this.data_land.createdDate = new Date();
    this.data_land.updateBy = this.user.id;
    this.data_land.updatedDate = new Date();
    console.log("DATA A GUARDAR LAND LORD (ACTUALIZACION): ", this.data_land);
    this._services.service_general_put("HousingList/PutLandlordDetailsHome", this.data_land).subscribe((data => {
      if(data.success){
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
    }),(err)=>{
      this.loader.hideLoader();
      console.log("error al guardar departure details: ", err);
    })
  }
  //****************************************************************************//
  //METODOS PAYMENT TYPE//
  //INSERCCION//
  addPaymentType(){
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'insertar';
    const dialog = this._dialog.open(DialogPaymentTypeComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result=>{
      console.log("elemento guardado de payment: ", result);
      if(result.success){
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
  //EDICION//
  editPaymentType(element, i){
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'edicion';
    this.data.i = i;
    const dialog = this._dialog.open(DialogPaymentTypeComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result=>{
      console.log("elemento guardado de payment: ", result);
      if(result.success){
        result.updateBy = this.user.id;
        result.updatedDate = new Date();
       console.log(result);
       this.paymentHousings[i] = result;
      }
    });
  }
  //****************************************************************************//
  data_final : any = {};
  guarda_nuevo_parametro(){
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

  close(){
    this.guarda_nuevo_parametro();
    //if(this.data.nuevo){
      this.dialogRef.close(this.data_final);
    //}else{
    //  this.dialogRef.close();
    //}
  }
  //****************************************************************************//
  getRecurrence(id){
    for (let i = 0; i < this.ca_recurrence.length; i++) {
      if(this.ca_recurrence[i].id == id){
         return this.ca_recurrence[i].recurrence;
      }
    }
  }
  //****************************************************************************//
  getCurrency(id){
    for (let i = 0; i < this.ca_currency.length; i++) {
      if(this.ca_currency[i].id == id){
         return this.ca_currency[i].currency;
      }
    }
  }
  //****************************************************************************//
  getPayment(id){
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if(this.ca_payment_Type[i].id == id){
         return this.ca_payment_Type[i].paymentType;
      }
    }
  }
  //****************************************************************************//
  getResponsable(id){
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if(this.ca_responsible[i].id == id){
         return this.ca_responsible[i].responsable;
      }
    }
  }
}
