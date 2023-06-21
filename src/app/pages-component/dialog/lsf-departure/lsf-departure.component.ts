import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component'


@Component({
  selector: 'app-lsf-departure',
  templateUrl: './lsf-departure.component.html',
  styleUrls: ['./lsf-departure.component.css']
})
export class LsfDepartureComponent implements OnInit {

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
  data_departure: any = {}

 //////////////////////////////////////////////

constructor( public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }


ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('userData'));
  console.log("data recibida por payments: ", this.data);
  if(this.data.edicion)
  {
    this.edicion = true;
  }

  this.catalogos();
}

async catalogos() {

   
  this.ca_security = await this._services.getCatalogueFrom('GetResponsablePayment');
  this.GetLSFBySection(this.data.ph_id, this.data.servide_detail_id, 4 , this.data.cat_category_id);

}

GetLSFBySection(key, servide_detail_id, section, cat_category_id) {
  this.loader.showLoader();
  this._services.service_general_get("HousingList/GetLSFBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section + "&cat_category_id=" + cat_category_id).subscribe((cd => {
    this.loader.hideLoader();
    console.log('departureDetailsHomes  FORMGetLSFBySection : ', cd);
    this.data_departure = cd.result.value.departureDetailsHomes[0];
   
   
  }), (err) => {
    this.loader.hideLoader();
    console.log("error al guardar los contract details: ", err);
  })
};

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

}
