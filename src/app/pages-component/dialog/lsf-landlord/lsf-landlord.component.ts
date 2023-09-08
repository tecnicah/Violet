import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialoglLandlordBankDetailComponent } from '../dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { environment } from '../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-lsf-landlord',
  templateUrl: './lsf-landlord.component.html',
  styleUrls: ['./lsf-landlord.component.css']
})
export class LsfLandlordComponent implements OnInit {

  url_api = `${environment.URL_EXPORT}`;
  loader: LoaderComponent = new LoaderComponent();
  RentCostSavings = 0;
  ca_lease_signa = [{ id: 1, value: "Assignee" }, { id: 2, value: "Client" }, { id: 3, value: "Assigne and Client" }];
  @ViewChild('sortrole') sortrole: MatSort;
  ca_currency: any[] = [];
  data_group_paymnets: any = { paymentHousings: [] };
  recurrence_static = [{ id: "Monthly" }, { id: "Bimonthly" }, { id: "Quarterly" }, { id: "Annually" }, { id: "Biannually" }];
  payments_due = [];
  payments_not_due = [];
  user: any = {};
  versions_lsf = [];
  edicion = false;
  ca_accountType = [];
  ca_creditCard = [];
  data_land: any = {
    creditCardLandLordDetails: []
  };
  data_land_list = [];
  dataData_land_list = new MatTableDataSource(null);

  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// VARIABLES


  constructor( public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }

  ngOnInit(): void {
   this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATA RECIBIDA lsf-contract: ", this.data);
    this.edicion = this.data.edicion;
    this.catalogos();
  }

  async catalogos() {
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
      //LandLord
      this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
      this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.GetLSFBySection(this.data.ph_id, this.data.servide_detail_id, 6, this.data.cat_category_id);

  }

  GetLSFBySection(key, servide_detail_id, section, cat_category_id) {
    this.loader.showLoader();
    this._services.service_general_get("HousingList/GetLSFBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section+ "&cat_category_id=" + cat_category_id).subscribe((cd => {
      console.log('landlord FORMGetLSFBySection : ', cd);
      this.data_land = cd.result.value.landlordHeaderDetailsHomes[0];
      this.data_land_list = this.data_land.landlordDetailsHomes;
      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  };

  exp_land() {

    var url_lsf = this.url_api + "printld/" + this.data.ph_id + "/" + this.data.servide_detail_id + "/" + "this._deliveredTo" + "/" + "this._city_name" + "/" + "this._country_name" + "/26";
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
  };

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
  };

  addBank() {

    console.log("entra a abrir modal bank para inserccion");
    let data_b = { operacion: "", id: 0, idServiceDetail: 0, headerId: 0 };

    data_b.operacion = 'insertar';
    data_b.id = this.data_land.housingListId;
    data_b.idServiceDetail = this.data_land.idServiceDetail
    data_b.headerId = this.data_land.id

    console.log(data_b);
    const dialog = this._dialog.open(DialoglLandlordBankDetailComponent, {

      data: data_b,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {

      if (result.success) {
        this.data_land_list = result;
        this.dataData_land_list = new MatTableDataSource(this.data_land_list);
        this.dataData_land_list.sort = this.sortrole;
      }

    });
  };

  editBank(data_) {
    debugger;
    console.log("entra a abrir modal landlorddetail para edicion");
    data_.operacion == 'editar'
    const dialog = this._dialog.open(DialoglLandlordBankDetailComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      if (result.success) {

        data_ = result;
      }
    });
  }

  deletebank(_data_) {

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

    var i_e = this.data_land_list.indexOf(_data_);
    var removed = this.data_land_list.splice(i_e, 1);
  }

}
