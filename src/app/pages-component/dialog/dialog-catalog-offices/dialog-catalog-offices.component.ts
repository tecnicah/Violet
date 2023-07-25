import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';



@Component({
  selector: 'app-dialog-catalog-offices',
  templateUrl: './dialog-catalog-offices.component.html',
  styleUrls: ['./dialog-catalog-offices.component.css']
})
export class DialogCatalogOfficesComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor( public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogOfficesComponent>) { }

   // variables
  office: any = {};
  country;
  dataCountry: any[] = [];
  dataCurrency: any[] = [];
  dataCity: any[] = [];
  public emailPattern:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  public typePrefix = {
    countriesName: ''
  }
  public prefix;
  public prefixCatalog;

  ngOnInit(): void {
    this.getCatalogos();
    this.get_catalogos();
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    // comprobar si es creacion o actualizacion de office
    if (this.data.id != 0) {
      this._services.service_general_get(`Catalog/GetOffice/${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
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

          const image = new Image();
          image.src = this._services.url_images+this.data.image;
          image.onload = function () {
            document.getElementById('lead_client_avatar').setAttribute('src', image.src);
            
          };

          image.onerror = function () {
            document.getElementById('lead_client_avatar').setAttribute('src', './../../../assets/avatar.png');
          };


          // document.getElementById('lead_client_avatar').setAttribute('src',this._services.url_images+this.data.image);
          console.log('foto', this.data.image);

          console.log('respuesta de actualizacion', r);
          this.selectCity();

          this.__loader__.hideLoader();
        }
      });
    }
  }
  async get_catalogos() {
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
  }


  getCatalogos() {
    this._services.service_general_get('Catalogue/GetCountry').subscribe(rCountry => {
      console.log('catalogo country', rCountry);
      if (rCountry.success) {
        for (let i = 0; i < rCountry.result.length; i++) {
          const eCountry = rCountry.result[i];
          this.dataCountry.push(eCountry)
        }
      }
    });
    this._services.service_general_get(`Catalog/GetAllCurrency`).subscribe(rcurrency => {
      console.log('catalogo currency', rcurrency);
      if (rcurrency.success) {
        this.dataCurrency = rcurrency.result;
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

  active_office: boolean = false;
  active_country: boolean = false;
  active_city: boolean = false;
  active_address: boolean = false;
  active_zip: boolean = false;
  active_phone: boolean = false;
  active_email: boolean = false;


  valida_form() {
    if(this.data.office == undefined){
      this.active_office = true;
    }if(this.data.country == undefined){
      this.active_country = true;
    }if(this.data.city == undefined){
      this.active_city = true;
    }if(this.data.address == undefined){
      this.active_address = true;
    }if(this.data.zip == undefined){
      this.active_zip = true;
    }if(this.data.phone == undefined){
      this.active_phone = true;
    }if(this.data.email == undefined){
      this.nso_ainfo_fields.no_emai = true;
    }
    if((this.data.office != undefined || this.data.office == '' ) && this.data.country != undefined && this.data.city != undefined && (this.data.address != undefined || this.data.address== '') && (this.data.zip != undefined || this.data.zip== '') && (this.data.phone  != undefined || this.data.phone == '') && (this.data.email != undefined || this.data.email == '')){
      this.save();
    }
  }

  save() {

    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy= userData.id;
    this.data.updatedDate = new Date();
     // concatenar prefix de telefono
     if ( this.data.phone != '' &&this.prefix) {
      this.data.phone = `${this.prefix}+${this.data.phone}`
    }
    console.log('numero con prefix', this.data.phone);
    if(!this.data.image) this.data.image = '';
    if(!this.data.imageExtension) this.data.imageExtension = '';

    //console.log("DATA A GUARDAR: ", this.data);
    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      console.log(JSON.stringify(this.data), this.data);
      this._services.service_general_post_with_url("Catalog/AddOffice", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    } else {
      this.__loader__.showLoader();
      console.log(JSON.stringify(this.data), this.data);
      this._services.service_general_put('Catalog/UpdateOffice', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })
    }
  }
   //FUNCION PARA EDICION DE FOTOGRAFIA//
  img(event){
  console.log(event);
  const file = event.target.files[0];
  const ext = event.target.files[0].type.split('/');
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
              encoded += '='.repeat(4 - (encoded.length % 4));
            }
      this.data.image = encoded;
      this.data.imageExtension = ext[1];
      document.getElementById('lead_client_avatar').setAttribute('src',''+reader.result);
  };
  }
  // "id": 0,
  //   "office": "string",
  //   "image": "string",
  //   "imageExtension": "string",
  //   "country": 0,
  //   "city": 0,
  //   "address": "string",
  //   "zip": "string",
  //   "phone": "string",
  //   "email": "string",
  //   "createdBy": 0,
  //   "createdDate": "2021-01-13T22:50:02.326Z",
  //   "updatedBy": 0,
  //   "updatedDate": "2021-01-13T22:50:02.326Z

}
// /api/Catalogue/GetCountry
// /api/Catalog/AddOffice
