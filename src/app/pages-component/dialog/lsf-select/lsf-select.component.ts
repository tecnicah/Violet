import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LsfContractComponent } from '../lsf-contract/lsf-contract.component';
import { LsfPaymentsComponent } from '../lsf-payments/lsf-payments.component';
import { LsfCostComponent } from '../lsf-cost/lsf-cost.component';
import { LsfRenewalComponent } from '../lsf-renewal/lsf-renewal.component';
import { LsfDepartureComponent } from '../lsf-departure/lsf-departure.component';
import { LsfLandlordComponent } from '../lsf-landlord/lsf-landlord.component';
import { LsfSpecialcComponent } from '../lsf-specialc/lsf-specialc.component';
import { LoaderComponent } from 'app/shared/loader';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-lsf-select',
  templateUrl: './lsf-select.component.html',
  styleUrls: ['./home-finding-full.component.scss']
})
export class LsfSelectComponent implements OnInit {

  constructor(public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }

  loader: LoaderComponent = new LoaderComponent();
  versions_lsf = [];
  lsf_service_detail_id;
  images_path = `${environment.images_path}`;

  ////////////////////////////

  ngOnInit(): void {
    this.get_lsf_versions();
  }


  export() {

  }

  no() {
    this.data_return.success = false;
    this.dialogRef.close(this.data_return);

  }

  exportLSF() {
    alert('EXporting');
  }

  data_return = {
    id: 0,
    success: false
  }


  get_lsf_versions() {

    this._services.service_general_get('HousingList/GetLeaseInspectionsVersions?id_service_detail=' + this.data.servide_detail_id + "&id_catCategoryId=" + this.data.cat_category_id + "&housing_list_id=" + this.data.ph_id,).subscribe(versiones => {
      if (versiones.success) {

        this.versions_lsf = versiones.result.lease_versions;
        //if(!this.lsf_service_detail_id){
        this.lsf_service_detail_id = this.data.servide_detail_id;
        // }
        this.change_version();
        console.log('DATA GetLeaseInspectionsVersions ===========================: ', this.versions_lsf);

      }
      else {
        alert('error las versiones')
      }
    });
  };

  version_selected_categoryId;

  change_version() {

    var select_ = this.versions_lsf.filter(y => y.idServiceDetail == this.lsf_service_detail_id)
    this.version_selected_categoryId = select_[0].catCategoryId;
    console.log("version seleccionada=====================", select_, this.version_selected_categoryId);
  }

  lscontract() {

    let edicion = false;
    if (this.data.servide_detail_id == this.lsf_service_detail_id) {
      edicion = true;
    }

    const dialogRef = this._dialog.open(LsfContractComponent, {
      data: {
        ph_id: this.data.ph_id,
        servide_detail_id: this.lsf_service_detail_id
        , edicion
        , cat_category_id: this.version_selected_categoryId
      },
      width: "100%",

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.success) {
        console.log("po pup de LSF cerrado succes true")
      }
      else {
        console.log("po pup de LSF cerrado succes false")
      }
    });
  };

  lspayments() {
    let edicion = false;
    if (this.data.servide_detail_id == this.lsf_service_detail_id) {
      edicion = true;
    }
    const dialogRef = this._dialog.open(LsfPaymentsComponent, {
      data: {
        ph_id: this.data.ph_id,
        servide_detail_id: this.lsf_service_detail_id
        , edicion
        , cat_category_id: this.version_selected_categoryId
      },
      width: "100%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log("po pup de LSF cerrado succes true")
      }
      else {
        console.log("po pup de LSF cerrado succes false")
      }
    });
  };


  lscost() {
    let edicion = false;
    if (this.data.servide_detail_id == this.lsf_service_detail_id) {
      edicion = true;
    }
    const dialogRef = this._dialog.open(LsfCostComponent, {
      data: {
        ph_id: this.data.ph_id,
        servide_detail_id: this.lsf_service_detail_id
        , edicion
        , cat_category_id: this.version_selected_categoryId
      },
      width: "100%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log("po pup de LSF cerrado succes true")
      }
      else {
        console.log("po pup de LSF cerrado succes false")
      }
    });
  };


  lsrenewal() {

    let edicion = false;
    if (this.data.servide_detail_id == this.lsf_service_detail_id) {
      edicion = true;
    }
    const dialogRef = this._dialog.open(LsfRenewalComponent, {
      data: {
        ph_id: this.data.ph_id,
        servide_detail_id: this.lsf_service_detail_id
        , edicion
        , cat_category_id: this.version_selected_categoryId
      },
      width: "100%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log("po pup de LSF cerrado succes true")
      }
      else {
        console.log("po pup de LSF cerrado succes false")
      }
    });
  };

  lsdeparture() {

    let edicion = false;
    if (this.data.servide_detail_id == this.lsf_service_detail_id) {
      edicion = true;
    }
    const dialogRef = this._dialog.open(LsfDepartureComponent, {
      data: {
        ph_id: this.data.ph_id,
        servide_detail_id: this.lsf_service_detail_id
        , edicion
        , cat_category_id: this.version_selected_categoryId
      },
      width: "100%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log("po pup de LSF cerrado succes true")
      }
      else {
        console.log("po pup de LSF cerrado succes false")
      }
    });
  };

  lsland() {

    let edicion = false;
    if (this.data.servide_detail_id == this.lsf_service_detail_id) {
      edicion = true;
    }
    const dialogRef = this._dialog.open(LsfLandlordComponent, {
      data: {
        ph_id: this.data.ph_id,
        servide_detail_id: this.lsf_service_detail_id
        , edicion
        , cat_category_id: this.version_selected_categoryId
      },
      width: "100%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log("po pup de LSF cerrado succes true")
      }
      else {
        console.log("po pup de LSF cerrado succes false")
      }
    });
  };


  lsspecial() {

    let edicion = false;
    if (this.data.servide_detail_id == this.lsf_service_detail_id) {
      edicion = true;
    }
    const dialogRef = this._dialog.open(LsfSpecialcComponent, {
      data: {
        ph_id: this.data.ph_id,
        servide_detail_id: this.lsf_service_detail_id
        , edicion
        , cat_category_id: this.version_selected_categoryId
      },
      width: "100%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log("po pup de LSF cerrado succes true")
      }
      else {
        console.log("po pup de LSF cerrado succes false")
      }
    });
  };

  //***********************************************************************************************************//
  lease() {
   // var url_lsf = this.images_path + "printlsf/" + this.data.ph_id + "/" + this.data.servide_detail_id + "/" + "this._deliveredTo" + "/" + "this._city_name" + "/" + "this._country_name" + "/" + this.data.type_id;
  //  console.log("url de impresion LSF : ", url_lsf);
    this.loader.showLoader();

var  _type_export;

    if(this.version_selected_categoryId == 21){  _type_export = 26  }
    else if(this.version_selected_categoryId == 16){ _type_export = 26 }
    else if(this.version_selected_categoryId == 22){ _type_export = 27 }
    else{ _type_export = 26 }

    this._services.service_general_get("HousingList/GetLSFPrint?key=" + this.data.ph_id + "&servide_detail_id=" + this.lsf_service_detail_id+ "&type=" + _type_export)
      .subscribe((data => {
        this.loader.hideLoader();
        if (data.success) {
          console.log("HousingList/GetLSFPrint : ", data.message);
          const linkSource = this.images_path + data.message;
          const downloadLink = document.createElement('a');
          const fileName = 'lSF.pdf';

          downloadLink.href = linkSource;
          downloadLink.target = "_blank"
          downloadLink.download = fileName;
          downloadLink.click();
        }
      }));
  };




}
