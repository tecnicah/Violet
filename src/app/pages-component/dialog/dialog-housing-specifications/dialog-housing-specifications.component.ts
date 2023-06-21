import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RelHousingAmenities } from 'app/layouts/single-pages/assignee-and-family-info.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogExporthsComponent } from '../dialog-export-hs/dialog-export-hs.component';

@Component({
  selector: 'app-dialog-housing-specifications',
  templateUrl: './dialog-housing-specifications.component.html',
  styleUrls: ['./dialog-housing-specifications.component.css']
})
export class DialogHousingSpecificationsComponent implements OnInit {

  data_specification: any = {
    relHousingAmenities: []
  };
  // housing_specs:any = {
  //   relHousingAmenities: []
  // };

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


  user;
  caAmenity: any[] = [];
  loader: LoaderComponent = new LoaderComponent();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }


  //******************************************************************************//
  //******************************************************************************//
  async ngOnInit() {
    console.log("DATA HOUSING LISTO ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("USUARIO  ==========================", this.user)
    await this.catalogos();
  }

  //******************************************************************************//
  //******************************************************************************//
  contract_Type = [];
  ca_currency = [];
  ca_metric = [];
  ca_property = [];
  caNumbers: any[] = [];
  isNew: boolean = false;

  async catalogos() {
    this.loader.showLoader();
    let amenitis = await this._services.getCatalogueFrom('GetAmenity');
    amenitis.forEach(E => {
      E.checked = false;
    });
    this.caAmenity = amenitis;

    // this.contract_Type = await this._services.getCatalogueFrom('GetContractType');
    this._services.service_general_get('AdminCenter/ContractType/All').subscribe(resp => {
      if (resp.success) {
        console.log('get contract', resp);
        this.contract_Type = resp.result;
      }
    });
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_metric = await this._services.getCatalogueFrom('GetMetric');

    this._services.service_general_get('AdminCenter/PropertyType/All').subscribe(resp => {
      if (resp.success) {
        console.log('get desired', resp);
        this.ca_property = resp.result;
        var pp = { id: 0, propertyType: "Apartment/House" };
        this.ca_property.push(pp);
      }
    });
    // this.ca_property = await this._services.getCatalogueFrom('AdminCenter/PropertyType/All');
    // GetPropertyTypeHousing

    for (let i = 0; i < 11; i++) {
      this.caNumbers.push(i);
    }
    debugger;
    this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord/' + Number(this.data.workOrderServicesId) + '/' + this.data.type_housing).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
        console.log('DATA GetHousingSpecitifcationByServiceRecord: ', data);
        if (data.result != null) {
          debugger;
          this.isNew = false;
          this.housing_specs = data.result;
          if (!this.housing_specs.propertyTypeId) {
            this.housing_specs.propertyTypeId = 0;
          }

          amenitis.forEach(E => {
            for (let i = 0; i < this.housing_specs.relHousingAmenities.length; i++) {
              if (E.id == this.housing_specs.relHousingAmenities[i].amenitieId) {
                E.checked = true;
              }
            }
          });
          this.caAmenity = amenitis;
          console.log("caAmenity: ", this.caAmenity)
        }
        else {
          this.isNew = true;
        }

        this.loader.hideLoader();
      }
    }), (err) => {
      console.log("Error al consultar housing specifications ", err);
    });

  }
  //******************************************************************************//
  //******************************************************************************//
  addAmenitie(event, data) {
    console.log("Este es el evento: ", event);
    console.log("Esta es la data del amenitie: ", data);
    if (event.checked) {
      this.housing_specs.relHousingAmenities.push({
        housingSpecificationId: 0,
        amenitieId: data.id
      })
    } else {
      for (let i = 0; i < this.housing_specs.relHousingAmenities.length; i++) {
        if (this.housing_specs.relHousingAmenities[i].amenitieId == data.id) {
          this.housing_specs.relHousingAmenities.splice(i, 1);
        }
      }
    }
  }
  //******************************************************************************//
  //******************************************************************************//
  save() {
    this.loader.showLoader();
    this.housing_specs.typeService = this.data.type_housing
    this.housing_specs.workOrderServices = this.data.workOrderServicesId;

    console.log("Esta es la informacion a guardar: ", this.housing_specs);
    console.log(JSON.stringify(this.housing_specs));
    debugger;
    if (this.housing_specs.id) {
      if (this.housing_specs.propertyTypeId == 0) {
        this.housing_specs.propertyTypeId = null;
      }
      this.housing_specs.updatedBy = this.user.id;
      this.housing_specs.sr_id = this.data.sr;
      console.log("Entra a realizar el UPDATE: ", this.housing_specs);
      this._services.service_general_put("HousingSpecification/PutCreateHousingSpecification", this.housing_specs).subscribe((data => {
        this.loader.hideLoader();
        if (data.success) {
          console.log(data);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Saved Data"
            },
            width: "350px"
          });
          this.dialogRef.close();
        }
      }))
    } else {
      console.log("Entra a realizar el POST");
      if (this.isNew) {
        this.housing_specs.relHousingAmenities.forEach((element, index) => {
          this.housing_specs.relHousingAmenities[index].housingSpecificationId = 0
        });
      }
      this._services.service_general_post_with_url("HousingSpecification/AddHousingSpecification", this.housing_specs).subscribe((data => {
        this.loader.hideLoader();
        if (data.success) {
          console.log(data);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Saved Data"
            },
            width: "350px"
          });
          this.dialogRef.close();

        }
      }))
    }

  }

  export_hs() {
    //debugger;
    const dialogRef = this._dialog.open(DialogExporthsComponent, {
      data: {
        header: "Add Housing Specifications",
        body: "",
        sr: this.data.sr,
        housing_specs_id: this.housing_specs.id
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(async result => {
      debugger;
      // //console.log(result);
      this.loader.showLoader();
      let amenitis = await this._services.getCatalogueFrom('GetAmenity');
      amenitis.forEach(E => {
        E.checked = false;
      });
      this.caAmenity = amenitis;

      // this.contract_Type = await this._services.getCatalogueFrom('GetContractType');
      this._services.service_general_get('AdminCenter/ContractType/All').subscribe(resp => {
        if (resp.success) {
          console.log('get contract', resp);
          this.contract_Type = resp.result;
        }
      });
      this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
      this.ca_metric = await this._services.getCatalogueFrom('GetMetric');

      this._services.service_general_get('AdminCenter/PropertyType/All').subscribe(resp => {
        if (resp.success) {
          console.log('get desired', resp);
          this.ca_property = resp.result;
          var pp = { id: 0, propertyType: "Apartment/House" };
          this.ca_property.push(pp);
        }
      });

      for (let i = 0; i < 11; i++) {
        this.caNumbers.push(i);
      }

      this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord/' + Number(result.hs.workOrderServices) + '/' + result.hs.typeService).subscribe((data => {
        this.loader.hideLoader();
        if (data.success) {
          console.log('DATA GetHousingSpecitifcationByServiceRecord: ', data);
          if (data.result != null) {
            debugger;
            this.housing_specs = data.result;
            if (!this.housing_specs.propertyTypeId) {
              this.housing_specs.propertyTypeId = 0;
            }

            amenitis.forEach(E => {
              for (let i = 0; i < this.housing_specs.relHousingAmenities.length; i++) {
                if (E.id == this.housing_specs.relHousingAmenities[i].amenitieId) {
                  E.checked = true;
                }
              }
            });
            this.caAmenity = amenitis;
            console.log("caAmenity: ", this.caAmenity)

            if (this.isNew) {
              this.housing_specs.id = 0;
            }
          }

          this.loader.hideLoader();
        }
      }), (err) => {
        console.log("Error al consultar housing specifications ", err);
      });
    });
  }

}
