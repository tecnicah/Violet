import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { LoaderComponent } from 'app/shared/loader';


@Component({
  selector: 'app-dialogl-landlord-bank-detail',
  templateUrl: './dialogl-landlord-bank-detail.component.html',
  styleUrls: ['./dialogl-landlord-bank-detail.component.css']
})
export class DialoglLandlordBankDetailComponent implements OnInit {

  data_land: any = { creditCardLandLordDetails: [] };
  ca_clabetype = [{ clave: "SWIFT" }, { clave: "BIC" }, { clave: "IBAN" }, { clave: "ACCOUNT NUMBER" }, { clave: "OTHER" }];
  ca_accountType = [];
  ca_creditCard = [];
  ca_currency = [];

  loader: LoaderComponent = new LoaderComponent();
  user: any;

  constructor(public _services: ServiceGeneralService, public dialogRef: MatDialogRef<any>, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data_: any) { }

  ngOnInit(): void {
    console.log("Data recibida modal add/edit Bank ========================", this.data_)
    this.user = JSON.parse(localStorage.getItem('userData'));

    if (this.data_land) {
      if (this.data_land.creditCardLandLordDetails) {

        this.ca_creditCard.forEach(E => {
          for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
            if (this.data_land.creditCardLandLordDetails[i].creditCard == E.id) {
              E.checked = true;
            }
          }
        })

      }
    }

    
    if (this.data_.operacion == 'insertar') {

      this.data_land.id = this.data_.id;
      this.data_land.idServiceDetail = this.data_.idServiceDetail
      this.data_land.headerId = this.data_.headerId
    }
    else {
      this.data_land = this.data_;
    }

    this.catalogs();
  }

  async catalogs(){
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_creditCard.sort((a, b) => (a.id < b.id ? -1 : 1));
  }

  save_data() {

    if (this.data_.operacion == 'insertar') {
      this.insertLandLordDetail();
    }
    else {
      this.updateLandLordDetail();
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
    this._services.service_general_put("HousingList/PutLandlordDetailsHome", this.data_land).subscribe((data => {
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
        this.dialogRef.close(this.data_land);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar departure details: ", err);
    })
  }

  insertLandLordDetail() {
    this.loader.showLoader();
    this.data_land.createdBy = this.user.id;
    this.data_land.createdDate = new Date();
    this.data_land.updateBy = this.user.id;
    this.data_land.updatedDate = new Date();
    console.log("DATA A GUARDAR LAND LORD (INSERT): ", this.data_land);
    this._services.service_general_post_with_url("HousingList/PostLandlordDetailsHome", this.data_land).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
        console.log("Lista de detalles bancarios================================== :", data.hl.value);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Saved Data"
          },
          width: "350px"
        });
        debugger;
        //this.data_land.idLandlord = data.result.value.idLandlord;
       // this.data_land.success = true;
       data.hl.value.success = true;
        this.dialogRef.close(data.hl.value);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("Error al actualizar: ", err);
    })
  }

}
