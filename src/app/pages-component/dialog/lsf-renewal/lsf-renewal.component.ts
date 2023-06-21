import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';


@Component({
  selector: 'app-lsf-renewal',
  templateUrl: './lsf-renewal.component.html',
  styleUrls: ['./lsf-renewal.component.css']
})
export class LsfRenewalComponent implements OnInit {

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
  data_contracts: any = {};
  data_renewal: any = {};

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

    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_security = await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetSecurityDeposit');
    this.ca_initial = await this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetInitialRentPayment');
    this.ca_ongoing = await this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetOngoingRentPayment');
    this.ca_realtor_com = await this.ca_security;//await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetRealtorCommission'); 


  this.GetLSFBySection(this.data.ph_id, this.data.servide_detail_id, 5, this.data.cat_category_id);

}

GetLSFBySection(key, servide_detail_id, section, cat_category_id) {
  this.loader.showLoader();
  this._services.service_general_get("HousingList/GetLSFBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section+ "&cat_category_id=" + cat_category_id).subscribe((cd => {
    this.loader.hideLoader();
    console.log('Renewal  FORMGetLSFBySection : ', cd);
    this.data_renewal = cd.result.value.renewalDetailHomes[0];
   
   
  }), (err) => {
    this.loader.hideLoader();
    console.log("error al guardar los contract details: ", err);
  })
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
  });
}

}
