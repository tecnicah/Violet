import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogAddCountrySeccionCountryComponent } from '../dialog-add-country-seccion-country/dialog-add-country-seccion-country.component';
import { DialogApplyAllScopeComponent } from '../dialog-apply-all-scope/dialog-apply-all-scope.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { ScopeservicesallComponent } from '../scopeservicesall/scopeservicesall.component';

export interface service {
  id: number,
  service1: number,
  serviceLine: number,
  createdBy: number,
  createdDate: Date,
  updatedBy: number,
  updatedDate: Date,
  serviceCountries: serviceCountries[]
}

export interface serviceCountries {
  id: number,
  service: number,
  country: number,
  scopeDescription: string,
  scopeTitle: string,
  scopeDocuments: boolean,
  createdBy: number,
  createdDate: Date,
  updatedBy: number,
  updatedDate: Date,
  documentServiceCountries: documentServiceCountries[]
}

export interface serviceCountriesData {
 
  service: number,
  country: number,
  createdBy: number,
  createdDate: Date,
  documentServiceCountries: documentServiceCountries[]
}

export interface documentServiceCountries {
  id: number,
  serviceCountry: number,
  filePath: string,
  fileExtension: string,
  documentType: number,
  status: number,
  privacy: number,
  createdBy: number,
  createdDate: Date,
  updatedBy: number,
  updatedDate: Date,
}

@Component({
  selector: 'app-dialog-add-service-admin-center',
  templateUrl: './dialog-add-service-admin-center.component.html',
  styleUrls: ['./dialog-add-service-admin-center.component.scss']
})
export class DialogAddServiceAdminCenterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddServiceAdminCenterComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog, private fb: FormBuilder) { }

    serviceData: service[] = [];
    serviceCountryData: serviceCountriesData[] = [];
    GetService: any[] = [];
    GetServiceLine: any[] = [];
    GetCountry: any[] = [];
    cuatro: string[] = ['uno', 'dos', 'tres', 'cuatro'];
    serviceCountries:any;
    caCounty: any[] = [];

    public loader: LoaderComponent = new LoaderComponent();
    @ViewChild('allSelected') private allSelected: MatOption;
    searchUserForm: FormGroup;

  ngOnInit(): void {
    debugger;
    this.catalogos();
    this.searchUserForm = this.fb.group({
      userType: new FormControl('')
    });
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
          //this.searchUserForm.controls.userType.setValue(this.data.service1);
          //this.searchUserForm.controls['userType'].setValue(r.result.service1);


        }
      })
    }


  }

  toggleAllSelection() {
    debugger;
    if(!this.data.country){
      this.data.country = [];
    }
    if (this.allSelected.selected) {
      this.searchUserForm.controls.userType
        .patchValue([...this.GetService.map(item => item.id),0]);
    } else {
      this.searchUserForm.controls.userType.patchValue([]);
    }
    console.log(this.searchUserForm);
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
    this.data.serviceLine = 2;
    console.log(this.data.serviceLine);
    if (this.data.serviceLine == 1) {
      this._services.service_general_get(`Catalogue/GetServiceByServiceLine?idServiceLine=${this.data.serviceLine}`).subscribe(r=>{
        if(r.success){
          this.GetService = r.result.value;
          this.data.serviceImm?.forEach(element => {
            this.GetService?.forEach((service, index) => {
                //console.log(element.service,'==',service.service);
                if(element.service.toLowerCase() == service.service.toLowerCase()){
                  console.log(element.service,'==',service.service);
                  this.GetService.splice(index, 1);
                }
            });
           
          });
        }
      })
    } else {
      this._services.service_general_get(`Catalogue/GetServiceByServiceLine?idServiceLine=${this.data.serviceLine}`).subscribe(r=>{
        if(r.success){
          this.GetService = r.result.value;
          this.data.serviceRelo?.forEach(element => {
            this.GetService?.forEach((service, index) => {
                if(element.service.toLowerCase() == service.service.toLowerCase()){
                  console.log(element.service,'==',service.service);
                  this.GetService.splice(index, 1);
                }
            });
          });
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
        debugger;
        this.caCounty= r.result;
        for (let i = 0; i < this.data.serviceCountries[0].countries?.length; i++) {
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
    if (i== 'new') {
      data = {id : 0, action: "new",  serviceCountries:  this.serviceCountries?.data};
    }
    // opcion cuando es un servicio ya creado y se le quiere agregar un pais nuevo ya no hay multicheck
    if (i == 'edit') {
      data = {id : 0, action: "edit",  serviceCountries:  this.serviceCountries?.data};
    }
    if (i == 'tabla') {
      data = {id : 0, action: "tabla",  serviceCountries:  this.serviceCountries?.data};
    }
    // opcion cuando es un servicio ya creado y se le quiere agregar un pais nuevo ya no hay multicheck
    // else if (this.data.id != 0 && data == null) {
    //   data = {id : 0, action: 0, serviceCountries:  this.serviceCountries?.data};
    // }
    // //opcion cuando editas un country
    // else {
    //   data.action = i;
    // }
    const dialogRef = this._dialog.open(DialogAddCountrySeccionCountryComponent, {
      data: data,
      width: '90%'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result.success) {
      debugger;
      let user = JSON.parse(localStorage.getItem('userData'));
      let _country = result.country; 
      result.updatedBy = user.id;
      result.updatedDate= new Date();
      //  si es un create el campo country se va en 0 ya que
        if(result.action == "new") {
          result.countries = result.country;
          _country.forEach(element => {
            console.log(element);
            this.serviceCountryData.push({
              country: element,
              service: this.data.id,
              createdBy: user.id,
              createdDate: new Date(),
              documentServiceCountries: result.documentServiceCountries
            });
            // result.country = element;
            // result.service = this.data.id;
            // result.createdBy= user.id;
            // result.createdDate= new Date();
            this.data.serviceCountries.push(result);
          });
          
          this.getCountryNoSave();
        }
      // si es un update de un service y se agrega un nuevo country
        else if (result.action == 0 && result.id == 0) {
          // push a la data
          result.countries = result.country;
          _country.forEach(element => {
            this.serviceCountryData.push({
              country: element,
              service: this.data.id,
              createdBy: user.id,
              createdDate: new Date(),
              documentServiceCountries: result.documentServiceCountries
            });
            // result.country = element;
            // result.service = this.data.id;
            // result.createdBy= user.id;
            // result.createdDate= new Date();
            this.data.serviceCountries.push(result);
          });
          this.addCountryUpdate();
        }
        else {
//           result.countries = [];
//           result.serviceCountryLeaders = [];
//           if (result.documentServiceCountries.length == 0) {
//             result.documentServiceCountries = [];
//           }
//           // this.data.serviceCountries.push(result); serviceCountries
// debugger;
//           this.data.serviceCountries[result.action] = result;
//           setTimeout(() => {
//             this.getCountry();  
//           }, 200);
          
        }
        // result.countries = [];
        // result.serviceCountryLeaders = [];
        //   if (result.documentServiceCountries?.length == 0) {
        //     result.documentServiceCountries = [];
        //   }
        //this.data.serviceCountries = this.serviceCountryData;
        //this.data.serviceCountries[result.action] = result;
        this.getCountry();
       //console.log(this.data.serviceCountries);

     }

  });

  }
  valid_service: boolean = false;
  valid_serviceLine: boolean = false;
  valid_country: boolean = false;


  // serviceCountries
  validar(){

      if (!this.searchUserForm.controls.userType.value && !this.data.service1) {
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
    debugger;
    if (this.data.id == 0) {
      console.log('multicheckdata.service1', this.data.service1);
      // this.data.services recibe el arreglo de el multicheck se service
      this.data.services = this.searchUserForm.controls.userType.value;
      // y this.data.service1 se va en 0 ya que este campo solo se usa cuando se actualiza
      //this.data.service1 = 0;
      this.data.services.forEach(element => {
        this.serviceData.push({
          id: this.data.id,
          service1: element,
          serviceLine: this.data.serviceLine,
          createdBy: userData.id,
          createdDate: new Date(),
          updatedBy: userData.id,
          updatedDate: new Date(),
          serviceCountries: this.data.serviceCountries
        });
      });
      this.loader.showLoader();
      console.log(JSON.stringify(this.serviceData),this.serviceData);
      this._services.service_general_post_with_url('AdminCenter/AddService',this.serviceData).subscribe(r =>{
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
