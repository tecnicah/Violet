import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RelHousingAmenities } from 'app/layouts/single-pages/assignee-and-family-info.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-housing-specifications',
  templateUrl: './dialog-housing-specifications.component.html',
  styleUrls: ['./dialog-housing-specifications.component.css']
})
export class DialogHousingSpecificationsComponent implements OnInit {

  data_specification:any = {
    relHousingAmenities: []
  };
  housing_specs:any = {
    relHousingAmenities: []
  };
  caAmenity: any[] = [];
  loader:LoaderComponent = new LoaderComponent();

  constructor(public dialogRef: MatDialogRef <any> , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }


  //******************************************************************************//
  //******************************************************************************//
  async ngOnInit() {
    console.log("DATA HOUSING LISTO ",this.data);
    //this.loader.showLoader();
    await this.catalogos();
  }
  //******************************************************************************//
  //******************************************************************************//
  contract_Type = [];
  ca_currency = [];
  ca_metric = [];
  ca_property = [];
  caNumbers:any[] = [];
  async catalogos(){
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
      }
    });
    // this.ca_property = await this._services.getCatalogueFrom('AdminCenter/PropertyType/All');
    // GetPropertyTypeHousing

    for (let i = 0; i < 11; i++) {
      this.caNumbers.push(i);
    }


    this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord/'+Number(this.data.workOrderServicesId)+'/'+this.data.type_housing).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: ',data);
        if( data.result == null){
          this.loader.hideLoader();
          this.dialogRef.close();
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: "The house specifications have not been saved"
            },
            width: "350px"
          });
          return true;
        }
        this.housing_specs = data.result;
        amenitis.forEach(E => {
          for (let i = 0; i < this.housing_specs.relHousingAmenities.length; i++) {
              if(E.id == this.housing_specs.relHousingAmenities[i].amenitieId){
                 E.checked = true;
              }
          }
        });
        this.caAmenity = amenitis;
        console.log("amenitis: ",this.caAmenity)
        this.loader.hideLoader();
       }
    }), (err)=> {
      console.log("Error al consultar housing specifications ", err);
    });

  }
  //******************************************************************************//
  //******************************************************************************//
  addAmenitie(event, data){
    console.log("Este es el evento: ", event);
    console.log("Esta es la data del amenitie: ", data);
    if(event.checked){
      this.housing_specs.relHousingAmenities.push({
        housingSpecificationId: 0,
        amenitieId: data.id
      })
    }else{
      for (let i = 0; i < this.housing_specs.relHousingAmenities.length; i++) {
        if(this.housing_specs.relHousingAmenities[i].amenitieId == data.id){
          this.housing_specs.relHousingAmenities.splice(i,1);
        }
      }
    }
  }
  //******************************************************************************//
  //******************************************************************************//
  save(){
    this.housing_specs.typeService = this.data.type_housing
    this.housing_specs.workOrderServices = this.data.workOrderServicesId;
    console.log("Esta es la informacion a guardar: ", this.housing_specs);
    console.log(JSON.stringify(this.housing_specs));
    if(this.housing_specs.id){
      console.log("Entra a realizar el UPDATE");
      this._services.service_general_put("HousingSpecification/PutCreateHousingSpecification", this.housing_specs).subscribe((data => {
        if(data.success){
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
    }else{
      console.log("Entra a realizar el POST");
      this._services.service_general_post_with_url("HousingSpecification/AddHousingSpecification", this.housing_specs).subscribe((data => {
        if(data.success){
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


}
