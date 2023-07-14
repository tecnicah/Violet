import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';


@Component({
  selector: 'app-dialog-contacts',
  templateUrl: './dialog-contacts.component.html',
  styleUrls: ['./dialog-contacts.component.css']
})
export class DialogContactsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogContactsComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }
  caTypeOffice: any[] = [];
  caCity: any[] = [];
  // filtros
  // filtros
  public filterCountry: any = { name: '' };
  public filterState: any = { name: '' };
  public filterCity: any = { name: '' };
  public prefix;
  typePrefix = {
    countriesName: '',
  }
  prefixCatalog;

  public current_email: string = ''
  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public fass_validator: any = {
    no_name: false,
    no_bdat: false,
    no_emai: false,
    no_emai_val: false,
    no_mpho: false,
    no_wpho: false,
    no_idat: false,
    no_fdat: false,
    no_cpos: false,
    no_npos: false,
    no_adur: false,
    no_atim: false
  }

  validaNumericos(event) {
    console.log("valid");
    if (event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' ||
      event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
      event.key == 'Backspace') {
      return true;
    }

    return false;
  }

  ngOnInit(): void {
    this.consultaPermisos();
    this.typePrefix.countriesName = '';
    console.log('data modal', this.data);
    this._services.service_general_get_noapi("GetOfficeContactById?id=" + this.data.id).subscribe((data => {
      if (data.success) {

        this.data = data.result;
        this.getState(this.data.idCountry);
        this.getcity();
        console.log('data', this.data);
        this.catalogos();
        // separar prefix de phone number
        // si el valor de mobilephone no es mayor a 10 caracteres entonces no tiene prefijo y toma el valor actual desde la bd asi vienen con prefijo  93+6567567567 o sin 6567567567
        if (this.data.phoneNumber != '' && this.data.phoneNumber != null) {
          let search = '+';
          // obtener la posicion de +
          let posicion = this.data.phoneNumber.indexOf(search);
          // obtener el valor de prefix
          this.prefix = this.data.phoneNumber.substr(0, posicion);
          // obtener valor phone
          this.data.phoneNumber = this.data.phoneNumber.substr(posicion + 1);
        }
      }
    }));
  }

  //*********************************************//
  public permission_read: boolean = false;
  public permission_write: boolean = false;
  public permission_delete: boolean = false;
  public permission_edit: boolean = false;
  consultaPermisos() {
    console.log("CONSULTA PARA PERMISOS DE USUARIO");
    let url = localStorage.getItem('url_permisos');
    this._services.service_general_get('Role/' + url).subscribe(data => {
      if (data.success) {
        console.log("Permisos: ", data.result.value)
        this.permission_read = data.result.value[0].reading;
        this.permission_write = data.result.value[0].writing;
        this.permission_edit = data.result.value[0].editing;
        this.permission_delete = data.result.value[0].deleting;
      }
    })
  }
  //*********************************************//
  // filtro de city dependiendo el country que se agrego en office
  getcity() {
    // this.caCity = [];
    this._services.service_general_get("Catalogue/Generic/Cities/" + this.data.idState).subscribe((data => {
      if (data.success) {
        this.caCity = data.result;
        console.log('city', this.caCity);
      }
    }))
    // this._services.service_general_get("Catalogue/GetState?country=" + this.data.idCountry).subscribe((data => {
    //   if (data.success) {
    //     this.caCity = data.result;
    //   }
    // }))
  }
  // GetOfficeContactType
  // GetContactType

  caCountry: Array<any> = [];
  ca_state: Array<any> = [];
  async catalogos() {

    this._services.service_general_get('Catalogue/Generic/Countries').subscribe(r => {
      if (r.success) {
        this.caCountry = r.result;
      }
    })

    this._services.service_general_get("AdminCenter/GetContactType").subscribe((data => {
      if (data.success) {
        this.caTypeOffice = data.result;
        console.log('ContactType', this.caTypeOffice);
      }
    }));

    // this.caTypeOffice = await this._services.getCatalogueFrom('GetOfficeContactType');
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
    console.log('catalog prefix', this.prefixCatalog);

    // PhoneCode
    // this.caCity = await this._services.getCatalogueFrom('GetCity');
  }
  getState(data) {
    this._services.service_general_get("Catalogue/Generic/States/" + data).subscribe((data => {
      if (data.success) {
        this.ca_state = data.result;
        console.warn(this.ca_state)
      }
    }))
  }

  countryname() {
    for (let i = 0; i < this.caCountry.length; i++) {
      const element = this.caCountry[i];
      if (this.data.idCountry == element.id) {
        this.data.country = element.name;
      }
    }
  }

  public showGeneralMessageDialog(title: string = "No title", body: string = "No content"): void {

    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: title,
        body: body
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  public removeErrorLabel(input_value: any, object_data: any): void {
    if (input_value == "" || input_value == null) {
      object_data.handler[object_data.field] = true;
    } else {
      object_data.handler[object_data.field] = false;
    }
  }
  public validEmailAssignee(email: string): void {

    !this.validateEmail(email) ?
      this.fass_validator.no_emai_val = true :
      this.fass_validator.no_emai_val = false;

  }
  public validateEmail(email_in: string): boolean {

    let result: boolean = true;

    const validating_email = this.emailPattern.test(email_in);

    if (!validating_email) result = false;

    return result;

  }

  public validateEmailServerAvailability(mail: string): void {
    if (mail != '') {
      this._services.service_general_get(`User/VeryfyEmail?email=${mail}`)
        .subscribe((response: any) => {
          console.log('Res => ', response);
          if (this.current_email != response.result) {
            if (!response.success) {
              this.showGeneralMessageDialog(
                'Email already exists',
                'The email already exists, perhaps it has been used in any Service Record.'
              );
              this.data.email = '';
            }
          }
        }, (error: any) => {
          console.error('Error (User/VeryfyEmail) => ', error);
        });
    }

  }

  // validaciones
  active_contactType: boolean = false;
  active_contactName: boolean = false;
  active_title: boolean = false;
  active_state: boolean = false;
  active_country: boolean = false;
  active_city: boolean = false;
  active_phone: boolean = false;

  valida_form() {
    if (this.data.idContactType == undefined) {
      this.active_contactType = true;
    }
    if (this.data.contactName == undefined || this.data.contactName.length == 0) {
      this.active_contactName = true;
    }

    if (this.data.tittle == undefined || this.data.tittle.length == 0) {
      this.active_title = true;
    }

    if (this.data.idCity == undefined) {
      this.active_city = true;
    }
    if (this.data.idCity == undefined) {
      this.active_city = true;
    }
    if (this.data.email == undefined || this.data.email.length == 0) {
      this.fass_validator.no_emai = true
    }
    if (this.data.phoneNumber == undefined || this.data.phoneNumber.length == 0) {
      this.active_phone = true
    }
    if ((this.data.idContactType != undefined) && (this.data.contactName.length != 0) && (this.data.tittle.length != 0) && (this.data.idCity != undefined) && (this.data.email.length != 0 && !this.fass_validator.no_emai_val) && (this.data.phoneNumber != undefined)) {
      this.save();
    }
  }


  save() {

    // extraer el nombre de city ya que al crear una oficina en un NP&C no se obtiene el nombre y hay que mandarlo para que se pinte
    if (this.data.action == "new") {
      this.caCity.forEach(city => {
        if (city.id == this.data.idCity) {
          this.data.city = city.name;
        }
      });
    }
    // concatenar prefix de telefono
    if (this.data.phoneNumber != '' && this.prefix) {
      this.data.phoneNumber = `${this.prefix}+${this.data.phoneNumber}`
    }
    console.log('numero con prefix', this.data.phoneNumber);


    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
