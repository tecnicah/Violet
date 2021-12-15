import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogAddCountrySeccionCountryComponent } from '../dialog-add-country-seccion-country/dialog-add-country-seccion-country.component';
import { DialogApplyAllScopeComponent } from '../dialog-apply-all-scope/dialog-apply-all-scope.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { ScopeservicesallComponent } from '../scopeservicesall/scopeservicesall.component';

@Component({
  selector: 'app-dialog-add-service-admin-center',
  templateUrl: './dialog-add-service-admin-center.component.html',
  styleUrls: ['./dialog-add-service-admin-center.component.scss']
})
export class DialogAddServiceAdminCenterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddServiceAdminCenterComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }

    GetService: any[] = [];
    GetServiceLine: any[] = [];
    GetCountry: any[] = [];
    cuatro: string[] = ['uno', 'dos', 'tres', 'cuatro'];
    serviceCountries:any;
    caCounty: any[] = [];

    public loader: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.catalogos();
    console.log(this.data);
    if(this.data.id == 0){
      if(this.data.serviceCountries){}else{
        this.data.serviceCountries = [];
      }
    }else{
      this.loader.showLoader();
      this._services.service_general_get('AdminCenter/GetService/'+this.data.id).subscribe(r => {
        if (r.success){
          this.data = r.result;
          console.log(this.data);
          this.loader.hideLoader();
          this.getCountry();
          this.getService();
        }
      })
    }


  }

  async catalogos(){
    // this.GetService = await this._services.getCatalogueFrom('GetService');
    this.GetServiceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.GetCountry = await this._services.getCatalogueFrom('GetCountry');
    this.getService();
  }

  getCountry() {
    this.serviceCountries = [];
    this._services.service_general_get('Catalogue/GetCountry').subscribe(r=>{
      if(r.success){
        this.caCounty= r.result;
        for (let i = 0; i < this.data.serviceCountries.length; i++) {
          const element = this.data.serviceCountries[i];
          for (let j = 0; j < this.caCounty.length; j++) {
            const elementc = this.caCounty[j];
            if(element.country ==  elementc.id){
              this.data.serviceCountries[i].namec = elementc.name;
            }
          }
        }
        console.log(this.data.serviceCountries);
        this.serviceCountries = new MatTableDataSource(this.data.serviceCountries);
      }
    })
  }

  getService() {
    if (this.data.serviceLine == 0 || this.data.serviceLine == null) {

    } else {
      this._services.service_general_get(`Catalogue/GetServiceByServiceLine?idServiceLine=${this.data.serviceLine}`).subscribe(r=>{
        if(r.success){
          this.GetService= r.result.value;
        }
      })
    }
  }
  // este methodo es para pintar la tabla de countrys cuando aun no estan guardados los datos
  getCountryNoSave() {
    let valorTabla = [];
    this.serviceCountries = [];
    this._services.service_general_get('Catalogue/GetCountry').subscribe(r=>{
      if(r.success){
        this.caCounty= r.result;
        for (let i = 0; i < this.data.serviceCountries[0].countries.length; i++) {
          const element = this.data.serviceCountries[0].countries[i];
          for (let j = 0; j < this.caCounty.length; j++) {
            const elementc = this.caCounty[j];
            if(element ==  elementc.id){
              // this.data.serviceCountries[i].namec = elementc.name;
              valorTabla.push({
                namec: elementc.name,
                scopeDescription: this.data.serviceCountries[0].scopeDescription,
                documentServiceCountries: this.data.serviceCountries[0].documentServiceCountries,
              });
            }
          }
        }
        this.serviceCountries = new MatTableDataSource(valorTabla);
      }
    })
  }
  //
  addCountryUpdate() {
    // metodo que agrega nombre y ciudad a la tabla cuando aun no se guarda los countries que se agregaron
    let valorTabla = [];
    for (let c = 0; c < this.data.serviceCountries.length; c++) {
      const dataTableCountry = this.data.serviceCountries[c];
      for (let j = 0; j < this.GetCountry.length; j++) {
        const elementc = this.GetCountry[j];
        if(dataTableCountry.country ==  elementc.id){
          valorTabla.push({
            namec: elementc.name,
            scopeDescription: dataTableCountry.scopeDescription,
            documentServiceCountries: dataTableCountry.documentServiceCountries,
          });
        }
      }
    }
    this.serviceCountries = new MatTableDataSource(valorTabla);
  }

    //////////////////////////////////////////////////////////////////////////////////////
  //office information
  addCountry(data, i) {
    console.log('data form', data, + 'indice' + i);
    // opcion cuando se crea un servicio nuevo y puede elegir muchos paises
    if (this.data.id == 0 && data == null) {
      data = {id : 0, action: "new"};
    }
    // opcion cuando es un servicio ya creado y se le quiere agregar un pais nuevo ya no hay multicheck
    else if (this.data.id != 0 && data == null) {
      data = {id : 0, action: 0};
    }
    //opcion cuando editas un country
    else {
      data.action = i;
    }
    const dialogRef = this._dialog.open(DialogAddCountrySeccionCountryComponent, {
      data: data,
      width: '90%'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result.success) {
      let user = JSON.parse(localStorage.getItem('userData'));
      result.updatedBy = user.id;
      result.updatedDate= new Date();
      //  si es un create el campo country se va en 0 ya que
        if(result.action == "new") {
          result.countries = result.country;
          result.country = 0;
          result.service = this.data.id;
          result.createdBy= user.id;
          result.createdDate= new Date();
          this.data.serviceCountries.push(result);
          this.getCountryNoSave();
        }
      // si es un update de un service y se agrega un nuevo country
        else if (result.action == 0 && result.id == 0) {
          // push a la data
          result.countries = [];
          result.serviceCountryLeaders = [];
          result.service = this.data.id;
          result.createdBy = user.id;
          result.createdDate= new Date();
          this.data.serviceCountries.push(result);
          this.addCountryUpdate();
        }
        else {
          result.countries = [];
          result.serviceCountryLeaders = [];
          if (result.documentServiceCountries.length == 0) {
            result.documentServiceCountries = [];
          }
          // this.data.serviceCountries.push(result); serviceCountries

          this.data.serviceCountries[result.action] = result;
          this.getCountry();
        }
       console.log(this.data.serviceCountries);

     }

  });

  }
  valid_service: boolean = false;
  valid_serviceLine: boolean = false;
  valid_country: boolean = false;


  // serviceCountries
  validar(){
    if (this.data.service1 == undefined ||
      this.data.service1 == null) {
      this.valid_service = true;
    }
    else {
      this.valid_service = false;
    }
    if (this.data.serviceLine == undefined ||
      this.data.serviceLine == null) {
      this.valid_serviceLine = true;
    }
    else {
      this.valid_serviceLine = false;
    }
    if (this.data.serviceCountries.length == 0 ) {
      this.valid_country = true;
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Country",
          body: "Required a country"
        },
        width: "350px"
      });
      return ;
    }
    else {
      this.valid_country = false;
    }

    if(this.valid_service == false && this.valid_country == false && this.valid_serviceLine == false){
      this.save();
    }

  }

  save(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.serviceCountries.serviceCountryLeaders = [];
    this.data.updatedBy= userData.id;
    this.data.updatedDate= new Date();

    console.log(this.data);
    // debugger
    if (this.data.id == 0) {
      console.log('multicheckdata.service1', this.data.service1);
      // this.data.services recibe el arreglo de el multicheck se service
      this.data.services = this.data.service1;
      // y this.data.service1 se va en 0 ya que este campo solo se usa cuando se actualiza
      this.data.service1 = 0;
      this.loader.showLoader();
      this.data.createdBy= userData.id;
      this.data.createdDate= new Date();
      console.log(JSON.stringify(this.data),this.data);
      this._services.service_general_post_with_url('AdminCenter/AddService',this.data).subscribe(r =>{
        console.log(r);
        this.loader.hideLoader();
        this.dialogRef.close(1);
        }, (err)=>{
          this.loader.hideLoader();
        })
    }
    else {
      this.loader.showLoader();
      console.log(JSON.stringify(this.data),this.data);
      this._services.service_general_put('AdminCenter/UpdateService',this.data).subscribe(r=>{
        console.log(r);
        this.loader.hideLoader();
        this.dialogRef.close(2);
      }, (err)=>{
        this.loader.hideLoader();
      })
    }

  }

  applyScope(){
    console.log('data para aplicar Scope Documents');

    const dialogRef = this._dialog.open(ScopeservicesallComponent, {
      data: this.data,
      width: '90%'
  });
  }

}
