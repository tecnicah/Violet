import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from './../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogChangePasswordComponent } from './../dialog-change-password/dialog-change-password.component';
import { ActivatedRoute, Router } from '@angular/router';

import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-dialog-catalog-user',
  templateUrl: './dialog-catalog-user.component.html',
  styleUrls: ['./dialog-catalog-user.component.css']
})
export class DialogCatalogUserComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogUserComponent>, public router: Router, public _routerParams: ActivatedRoute) { }

  // variables
  user:any;
  dataCountry: any[] = [];
  dataCity: any[] = [];
  dataOffice: any[] = [];
  dataTitles: any[] = [];
  dataRoles: any[] = [];
  dataSupplier: any[] = [];
  userSupplier;
  country;
  dataAreaCoverage: any[] = [];
  idAreaCoverage: any[] = [];

  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  typePrefix = {
    countriesName: ''
  }
  public prefix;
  public prefixCatalog;

  validaNumericos(event){
    console.log("valid");
    if(event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || 
       event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
       event.key == 'Backspace' ){
       return true;
    }
  
     return false;
  }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.typePrefix.countriesName = '';
    this.getCatalogos();
    this.get_catalogos();
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    // comprobar si es creacion o actualizacion de currencies
    if (this.data.id != 0) {
      debugger;
      if (this.data.role == 'Supplier') {
        this._services.service_general_get(`Profile/GetProfile/${this.data.id}`).subscribe(supplier => {
          if (supplier.success) {
            this.data = supplier.result;

            this.data.role = 3;
            this.data.supplier = this.data.supplierType;
            this.data.office = this.data.responsablePremierOffice;
            this.data.phone = this.data.phoneNumber;
             // separar prefix de phone number
          // si el valor de mobilephone no es mayor a 10 caracteres entonces no tiene prefijo y toma el valor actual desde la bd asi vienen con prefijo  93+6567567567 o sin 6567567567
          if (this.data.phone != '' && this.data.phone != null)
          {
            let search = '+';
            // obtener la posicion de +
            let posicion = this.data.phone.indexOf(search);
            // obtener el valor de prefix
            this.prefix = this.data.phone.substr(0, posicion);
            // obtener valor phone
            this.data.phone = this.data.phone.substr(posicion + 1);
          }
            this.selectCity();
            this.selectRole(3);
          }
        });
      }
      else {
        this._services.service_general_get(`Catalog/GetUser/${this.data.id}`).subscribe( r => {
          if (r.success) {
            debugger;
            this.data = r.result.value;
            if (this.data.phone != '' && this.data.phone != null)
            {
              let search = '+';
              // obtener la posicion de +
              let posicion = this.data.phone.indexOf(search);
              // obtener el valor de prefix
              this.prefix = this.data.phone.substr(0, posicion);
              // obtener valor phone
              this.data.phone = this.data.phone.substr(posicion + 1);
            }
            this.selectCity();
            //this.data.role = ;

            console.log('respuesta de actualizacion', this.data);
            this.__loader__.hideLoader();
            this._services.service_general_get("Catalogue/GetState?country="+ this.data.country).subscribe(rCity => {
              console.log('catalogo city', rCity);
              if (rCity.success) {
                for (let i = 0; i < rCity.result.length; i++) {
                  const eCity = rCity.result[i];
                  this.dataCity.push(eCity)
                }
              }
            });
          }
        });
      }
    }
  }
  public removeErrorLabel( input_value:any, object_data:any ):void {
    if( input_value == "" || input_value == null ) {
      object_data.handler[object_data.field] = true;
    } else {
      object_data.handler[object_data.field] = false;
    }
  }
  public nso_ainfo_fields:any = {
    no_emai: false,
    no_emai_val: false,
  }
  public validEmailAssignee( email:string ):void {
    !this.validateEmail( email ) ?
      this.nso_ainfo_fields.no_emai_val = true :
      this.nso_ainfo_fields.no_emai_val = false;
  }
  public validateEmail( email_in:string ):boolean {
    let result:boolean = true;
    const validating_email = this.emailPattern.test( email_in );
    if( !validating_email ) result = false;
    return result;
  }
  public validateEmailServerAvailability( mail:string ):void {
    if( mail != '' ) {
      this._services.service_general_get(`User/VeryfyEmail?email=${ mail }`)
      .subscribe( (response:any) => {
        console.log('Res => ', response);
        if( !response.success ) {
          this.showGeneralMessageDialog(
            'Email already exists',
            'The email already exists, please choose another email.'
          );
          this.data.email = '';
          }
      }, (error:any) => {
              console.error('Error (User/VeryfyEmail) => ', error);

      });
    }
  }
  public showGeneralMessageDialog( title:string = '', body:string = '' ):void {

    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
            header: title,
            body: body
        }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  async get_catalogos() {
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
  }
  getCatalogos() {
    // country
    this._services.service_general_get('Catalogue/GetCountry').subscribe(rCountry => {
      console.log('catalogo country', rCountry);
      if (rCountry.success) {
        for (let i = 0; i < rCountry.result.length; i++) {
          const eCountry = rCountry.result[i];
          this.dataCountry.push(eCountry)
        }
      }
    });
    // office
    this._services.service_general_get('Catalog/GetAllOffice').subscribe(rCountry => {
      console.log('catalogo  office', rCountry);
      if (rCountry.success) {
        for (let i = 0; i < rCountry.result.length; i++) {
          const eOffice = rCountry.result[i];
          this.dataOffice.push(eOffice)
        }
      }
    });
    // title
    this._services.service_general_get('Catalog/GetAllTitle').subscribe(rTitle => {
      console.log('catalogo Title', rTitle);
      if (rTitle.success) {
        for (let i = 0; i < rTitle.result.length; i++) {
          const eTitle = rTitle.result[i];
          this.dataTitles.push(eTitle)
        }
      }
    });
    // role
    this._services.service_general_get('Catalog/GetAllRole').subscribe(rRole => {
      console.log('catalogo role', rRole);
      if (rRole.success) {
        this.dataRoles = [];
        for (let i = 0; i < rRole.result.length; i++) {
          const eRole = rRole.result[i];
          if (!(eRole.role == 'Assignee' )) {
            this.dataRoles.push(eRole);
          }
        }
      }
    });
    // supplier
    // Se filtra el supplier por consultant
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartners?supplierCategory=1').subscribe(rSupplier => {
      console.log('catalogo supplier', rSupplier);
      if (rSupplier.success) {
        for (let i = 0; i < rSupplier.result.value.length; i++) {
          const supplier = rSupplier.result.value[i];
          this.dataSupplier.push(supplier)
        }
      }
    });
  }
  selectCity() {
    this.dataCity = [];
    this._services.service_general_get(`Catalogue/GetState?country=${this.data.country}`).subscribe(rCity => {
      console.log('catalogo city', rCity);
      if (rCity.success) {
        for (let i = 0; i < rCity.result.length; i++) {
          const eCity = rCity.result[i];
          this.dataCity.push(eCity)
        }
      }
    });
  }
  getAreaCoverage() {
    if (this.data.role == 3) {
      for (let aC = 0; aC < this.dataAreaCoverage.length; aC++) {
        const areaC = this.dataAreaCoverage[aC];
        if (areaC.country == this.data.country) {
          this.idAreaCoverage.push(areaC.id);
        }
      }
    }
    console.log('id coverage', this.idAreaCoverage);
  }
  // aqui aplica solo si el role es supplier
  selectRole(idSupplier) {
    if (idSupplier == 3) {
      this.dataTitles = [];
      this.dataTitles.push({
        "id": 1,
        "office": "Premier",
        "section": "Human Resources",
        "title": "Consultant"
      });
    }
  }
  selectSupplier(id: number) {
    // this.getCatalogos();
    this.dataCity = [];

    // aqui obtendremos el city del area de covertura
    // SupplierPartnerProfile/GetConsultant?key=25
    let catalogoContry;
    catalogoContry = this.dataCountry;
    this.dataCountry = [];
    let supplierData;
    let tempCountry: any[] = [];
    let hash = {};
    this._services.service_general_get(`SupplierPartnerProfile/GetConsultant?key=${id}`).subscribe(rsupplier => {
      if (rsupplier.success) {
        supplierData = rsupplier.result;
        console.log('catalogo supplierData', supplierData);
        for (let i = 0; i < supplierData.areasCoverageConsultants.length; i++) {
          const element = supplierData.areasCoverageConsultants[i];
          this.dataAreaCoverage.push(element)
        }
        console.log('areaCoverage', this.dataAreaCoverage);
        for (let i = 0; i < this.dataAreaCoverage.length; i++) {
          const elementid = this.dataAreaCoverage[i].country;
          for (let c = 0; c < catalogoContry.length; c++) {
            const catalog = catalogoContry[c];
            if (elementid == catalog.id) {
              tempCountry.push(catalog);
            }
          }
        }
        console.log('temporal country', tempCountry);
        tempCountry = tempCountry.filter(o => hash[o.id] ? false : hash[o.id] = true);
        console.log('quitar duplicidad', tempCountry);
        for (let c = 0; c < tempCountry.length; c++) {
          const element = tempCountry[c];
          this.dataCountry.push(element);
        }

      }
    });

  }
  // variables para validar formulario
  active_name: boolean = false;
  active_country: boolean = false;
  active_city: boolean = false;
  active_office: boolean = false;
  active_title: boolean = false;
  active_role: boolean = false;
  active_phone: boolean = false;
  active_supplier: boolean = false; //caso role es supplier

  changePassword(email: string) {
    console.log('change email', email);
    const dialogRef = this._dialog.open(DialogChangePasswordComponent, {
      data: {email: email},
      width: "50%",
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Change password"
          },
          width: "350px"
        });
        this.getCatalogos();
      }
      else if(result === 2){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "User incorrect"
          },
          width: "350px"
        });
        this.getCatalogos();
      }
      else{
        this.getCatalogos();
      }
    })
  }
  // identifica dependiendo el role id que flujo debe tener para el save
  validRole() {
    debugger;
    switch (this.data.role) {
      case 3: {
        // supplier
        console.log('supplier');
        this.saveSupplier();
        break;
      }
      default:
        console.log('manager, coordinator, finance, human resources y leader');
        // manager, coordinator, finance, human resources y leader
        this.validarForm();
        break;
    }
  }
  validarForm() {
    if(this.data.name == undefined || this.data.name.length == 0){
      this.active_name = true;
    }if(this.data.country == undefined){
      this.active_country = true;
    }if(this.data.city == undefined){
      this.active_city = true;
    }if(this.data.office == undefined){
      this.active_office = true;
    }if(this.data.title == undefined){
      this.active_title = true;
    }if(this.data.role == undefined){
      this.active_role = true;
    }if(this.data.phone == undefined){
      this.active_phone = true;
    }if(this.data.email == undefined || this.data.email == "" || this.data.email == null){
      this.nso_ainfo_fields.no_emai = true;
    }
    console.log(this.data);
    if((this.data.name != undefined && this.data.name != '') && this.data.country != undefined && this.data.city != undefined && this.data.office != undefined && this.data.title != undefined && this.data.role != undefined &&  (this.data.phone != undefined || this.data.phone.length != 0 ) &&  (this.data.email != undefined && this.data.email != "" && this.data.email != null)){
      {
        if (this.data.role != 4)
         this.save();
        else
          this.saveAssigne();
      }
      

      console.log("Entra a guardar  ",this.data);
    }

  }
  saveSupplier() {
    if(this.data.name == undefined || this.data.name.length == 0){
      this.active_name = true;
    }if(this.data.country == undefined){
      this.active_country = true;
    }if(this.data.city == undefined){
      this.active_city = true;
    }if(this.data.office == undefined){
      this.active_office = true;
    }if(this.data.title == undefined){
      this.active_title = true;
    }if(this.data.role == undefined){
      this.active_role = true;
    }if(this.data.phone == undefined){
      this.active_phone = true;
    }if(this.data.email == undefined){
      this.nso_ainfo_fields.no_emai = true;
    }if(this.data.supplier == undefined){
      this.active_supplier = true;
    }
    if((this.data.name != undefined || this.data.name == '') && this.data.country != undefined && this.data.city != undefined && this.data.office != undefined && this.data.title != undefined && this.data.role != undefined &&  (this.data.phone != undefined || this.data.phone.length == 0 ) &&  (this.data.email != undefined || this.data.email == '') && (this.data.supplier != undefined || this.data.supplier == '')){
      this.createUserSupplier();
    }


  }
  saveclient() {
    localStorage.setItem('user', 'userClient');
    localStorage.setItem('name', this.data.name );
    // let url = this.router.navigateByUrl('/partner_client/new');
    let url = this.router.createUrlTree(['/partner_client/new']);
    window.open(url.toString(), '_blank');

    this.dialogRef.close();
  }
  // guardar
  save() {

    // concatenar prefix de telefono
    if ( this.data.phone != '' &&this.prefix) {
      this.data.phone = `${this.prefix}+${this.data.phone}`
    }
    console.log('numero con prefix', this.data.phone);

    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("Catalog/AddUser",
        {
          "id": this.data.id,
          "name": this.data.name,
          "lastName": "",
          "motherLastName": "",
          "country": this.data.country,
          "city": this.data.city,
          "office": this.data.office,
          "title": this.data.title,
          "role": this.data.role,
          "phone": this.data.phone,
          "email": this.data.email,
          "createdDate": new Date()
        }).subscribe(re => {
      console.log('resp crear', re);
      this.__loader__.hideLoader();
      this.dialogRef.close(1);
      }, (error) => {
        this.dialogRef.close(3);
    });
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put("Catalog/UpdateUser", {
        "id": this.data.id,
        "name": this.data.name,
        "lastName": "",
        "motherLastName": "",
        "country": this.data.country,
        "city": this.data.city,
        "office": this.data.office,
        "title": this.data.title,
        "role": this.data.role,
        "phone": this.data.phone,
        "email": this.data.email,
        "createdDate": new Date()
      }).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      });
    }
  }

  saveAssigne() {

    // concatenar prefix de telefono
    if ( this.data.phone != '' &&this.prefix) {
      this.data.phone = `${this.prefix}+${this.data.phone}`
    }
debugger;
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("AssigneeInformation/EditAssigneeInformartionUser", {
        "id": this.data.id,
        "assigneeName": this.data.name,
        "homeCountryId": this.data.country,
        "homeCityId": this.data.city,
        "mobilePhone": this.data.phone,
        "email": this.data.email
      }).subscribe(r => {
        debugger;
        console.log('respuesta de update NUEVO', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      });
    
  }


  createUserSupplier() {
    this.data.id = 0;
    this.data.areasCoverage = this.idAreaCoverage[0];
    this.data.responsablePremierOffice = this.data.office;
    this.data.phoneNumber = this.data.phone;
    this.data.updatedBy = this.user.id;
    this.data.createdBy = this.user.id;
    this.data.createdDate = new Date();
    this.data.updatedDate = new Date();
    this.data.documentConsultantContactsConsultants = [];
    this.data.photo = '';
    this.data.supplierType = this.data.supplier;
    this.data.vehicleConsultants = [];
    this.__loader__.showLoader();
    console.log(JSON.stringify(this.data));
    this._services.service_general_post_with_url("Profile/AddProfile", this.data).subscribe((data => {
      console.log("save user supplier: ", data);
      if (data.success) {
        console.log(data);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      }
    }));
  }

}

