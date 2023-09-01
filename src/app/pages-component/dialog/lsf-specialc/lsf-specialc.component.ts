import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component'
import { DialogConsiderationComponent} from '../dialog-consideration/dialog-consideration.component'


@Component({
  selector: 'app-lsf-specialc',
  templateUrl: './lsf-specialc.component.html',
  styleUrls: ['./lsf-specialc.component.css']
})
export class LsfSpecialcComponent implements OnInit {

  lapsos_dias = [{ id: 10 }, { id: 15 }, { id: 30 }, { id: 45 }, { id: 60 }, { id: 90 }, { id: 120 }]

  loader: LoaderComponent = new LoaderComponent();
  ca_security = [];
  ca_initial = [];
  ca_ongoing = [];
  ca_realtor_com 
  user: any = {};
  ca_currency =  [];
  @ViewChild('sortrole') sortrole: MatSort;
  edicion = false; 
  recurrence_static = [{ id: "Monthly" }, { id: "Bimonthly" }, { id: "Quarterly" }, { id: "Annually" }, { id: "Biannually" }];
  data_specialc: any = {}

 //////////////////////////////////////////////

constructor( public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }


ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('userData'));
  console.log("data recibida por payments: ", this.data);
  if(this.data.edicion)
  {
    this.edicion = true;
  }

  this.GetLSFBySection(this.data.ph_id, this.data.servide_detail_id, 7 , this.data.cat_category_id);
}


lsfGroupSpecialConsiderationsId = 0;

GetLSFBySection(key, servide_detail_id, section, cat_category_id) {
  this.loader.showLoader();
  this._services.service_general_get("HousingList/GetLSFBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section + "&cat_category_id=" + cat_category_id).subscribe((cd => {
    this.loader.hideLoader();
    console.log('GetLSFBySection  ============== : ', cd);
    this.data_specialc = cd.result.value.lsfGroupSpecialConsiderations[0].lsfSpecialConsiderations;
    this.lsfGroupSpecialConsiderationsId = cd.result.value.lsfGroupSpecialConsiderations[0].id;
    console.log('data_specialc  ============== : ', this.data_specialc);
   
  }), (err) => {
    this.loader.hideLoader();
    console.log("error al guardar los contract details: ", err);
  })
};


editConsideration(element, i) {
  ////////debugger;;
  console.log("entra a abrir modal payment type");
  this.data.operacion = 'edicion';
  this.data.i = i;
  this.data.element = element;
  const dialog = this._dialog.open(DialogConsiderationComponent, {
    data: this.data,
    width: "90%"
  });

  dialog.beforeClosed().subscribe(result => {
    console.log("elemento guardado de special: ", result);
    if (result.success) {
      result.updateBy = this.user.id;
      result.updatedDate = new Date();
      console.log(result);
      //this.paymentHousings[i] = result;
    }
  });
};

addPaymentType() {
    
  this.data.operacion = 'insertar';
  this.data.lsfGroupSpecialConsiderationsId = this.lsfGroupSpecialConsiderationsId;
  const dialog = this._dialog.open(DialogConsiderationComponent, {
    data: this.data,
    width: "90%"
  });

  dialog.beforeClosed().subscribe(result => {
    console.log("elemento recibido de add consideration: ", result);
    if (result.success) {
      this.ngOnInit();
    }
  });
};

deletePayment(payment) {
debugger;
  this.loader.showLoader();
  this._services.service_general_put("HousingList/DeleteConsideration", payment.id).subscribe((response_bd => {
    this.loader.hideLoader();
    if (response_bd.success) {
      console.log("HousingList/Delete Consideration ==============================", response_bd);
      this.data_specialc = response_bd.result.value;

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
};



}
