import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialoglLandlordBankDetailComponent } from '../dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { BankingDetailsComponent } from './banking-details/banking-details.component';
import { DocumentComponent } from './document/document.component';
import { Officy } from 'app/interfaces/modelOfficy.interface';

@Component({
  selector: 'app-dialog-catalog-offices',
  templateUrl: './dialog-catalog-offices.component.html',
  styleUrls: ['./dialog-catalog-offices.component.css']
})
export class DialogCatalogOfficesComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogOfficesComponent>) { }

  // variables
  office: any = {};
  country;
  dataCountry: any[] = [];
  dataCurrency: any[] = [];
  dataCity: any[] = [];
  listOfficy: Officy;

  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  public typePrefix = {
    countriesName: ''
  }
  public prefix;
  public prefixCatalog;

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.getSelectOption()
    this.getCatalogos();
    this.get_catalogos();
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    // comprobar si es creacion o actualizacion de office
    if (this.data.id != 0) {
      this._services.service_general_get(`Catalog/GetOffice/${this.data.id}`).subscribe(r => {
        if (r.success) {
          this.data = r.result;
          // separar prefix de phone number
          // si el valor de mobilephone no es mayor a 10 caracteres entonces no tiene prefijo y toma el valor actual desde la bd asi vienen con prefijo  93+6567567567 o sin 6567567567
          if (this.data.phone != '' && this.data.phone != null) {
            let search = '+';
            // obtener la posicion de +
            let posicion = this.data.phone.indexOf(search);
            // obtener el valor de prefix
            this.prefix = this.data.phone.substr(0, posicion);
            // obtener valor phone
            this.data.phone = this.data.phone.substr(posicion + 1);
          }

          const image = new Image();
          image.src = this._services.url_images + this.data.image;
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
          console.log(this.data);

        }
      });
    } else {
      this.__loader__.hideLoader();
    }
  }
  ca_accountType = [];
  ca_statusDoc = [];
  ca_privacy = [];
  async getSelectOption() {
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_statusDoc = await this._services.getCatalogueFrom('GetDocumentStatus');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');

  }
  async get_catalogos() {
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
  }
  getDocumentStatus(status) {
    for (let i = 0; i < this.ca_statusDoc.length; i++) {
      const element = this.ca_statusDoc[i];
      if (element.id == status) {
        return element.status
      }
    }
  }
  getNamePrivacy(privacity) {
    for (let i = 0; i < this.ca_privacy.length; i++) {
      const element = this.ca_privacy[i];
      if (element.id == privacity) {
        return element.privacy
      }
    }
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
  public removeErrorLabel(input_value: any, object_data: any): void {
    if (input_value == "" || input_value == null) {
      object_data.handler[object_data.field] = true;
    } else {
      object_data.handler[object_data.field] = false;
    }
  }
  public nso_ainfo_fields: any = {
    no_email: false,
    no_emai_val: false,
    no_operations_val: false,
    no_finance_val: false,
    no_other_val: false,
  }
  public validEmailAssignee(email: string): void {
    if (email != '') {
      !this.validateEmail(email) ? this.nso_ainfo_fields.no_emai_val = true : this.nso_ainfo_fields.no_emai_val = false;
      if (this.nso_ainfo_fields.no_emai_val) {
        this.nso_ainfo_fields.no_email = false
      }
    } else {
      this.nso_ainfo_fields.no_email = true
      this.nso_ainfo_fields.no_emai_val = false
    }
  }
  public validEmailOperations(email: string): void {
    if (email != '') {
      !this.validateEmail(email) ? this.nso_ainfo_fields.no_operations_val = true : this.nso_ainfo_fields.no_operations_val = false;
    } else {
      this.nso_ainfo_fields.no_operations_val = false;
    }
  }
  public validEmailFinance(email: string): void {
    if (email != '') {
      !this.validateEmail(email) ? this.nso_ainfo_fields.no_finance_val = true : this.nso_ainfo_fields.no_finance_val = false;
    } else {
      this.nso_ainfo_fields.no_finance_val = false;
    }
  }
  public validEmailOther(email: string): void {
    if (email != '') {
      !this.validateEmail(email) ? this.nso_ainfo_fields.no_other_val = true : this.nso_ainfo_fields.no_other_val = false;
    } else {
      this.nso_ainfo_fields.no_other_val = false;
    }
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
          if (!response.success) {
            this.showGeneralMessageDialog(
              'Email already exists',
              'The email already exists, please choose another email.'
            );
            this.data.email = '';
          }
        }, (error: any) => {
          console.error('Error (User/VeryfyEmail) => ', error);

        });
    }
  }
  public showGeneralMessageDialog(title: string = '', body: string = ''): void {
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
  active_legalEntity: boolean = false
  //Inicio agregar Banking Details List
  addBank(id) {
    console.log("entra a abrir modal bank para inserccion");
    this.data.officeBankingDetailLists = this.data.officeBankingDetailLists || [];
    let data_b = { operacion: "", id: 0, idCatOffice: 0, officeBankingDetailLists: [] };
    data_b.operacion = 'insertar'
    data_b.id = id
    data_b.idCatOffice = this.data.idCatOffice ?? 0;
    data_b.officeBankingDetailLists = this.data.officeBankingDetailLists ?? []

    const dialog = this._dialog.open(BankingDetailsComponent, {
      data: data_b,
      width: "95%"
    });
    dialog.afterClosed().subscribe(result => {
      if (result == undefined || result == true) return;
      console.log(result);
      if (this.data.id == 0) {
        this.data.officeBankingDetailLists.push(result);
      } else {
        this.ngOnInit()
      }
      console.log(this.data);
    })

  }
  //Fin agregar Banking Details List
  //Inicio editar Banking Details List
  editBank(list) {
    console.log("entra a abrir modal bank para edicion");
    this.data.officeBankingDetailLists = this.data.officeBankingDetailLists || [];
    let data_b = { operacion: "", id: 0, idCatOffice: 0, officeBankingDetailLists: [] };
    data_b.operacion = 'editar'
    data_b.id = list.id
    data_b.idCatOffice = list.idCatOffice
    data_b.officeBankingDetailLists = list
    const dialog = this._dialog.open(BankingDetailsComponent, {
      data: data_b,
      width: "95%"
    });
    dialog.afterClosed().subscribe(result => {
      if (result == undefined || result == true) return;
      console.log(this.data);

    })
  }
  //Fin editar Banking Details List
  //Inicio delete Banking Details List
  deletebank(list) {
    if (list.id == 0) {
      const index = this.data.officeBankingDetailLists.findIndex((item) => JSON.stringify(item) === JSON.stringify(list));
      if (index !== -1) {
        this.data.officeBankingDetailLists.splice(index, 1);
      }
      this.viewMensajeComponente('delete', 'Banking Details List was deleted successfully')
    } else {
      this._services.service_general_delete(`Catalog/DeleteOfficeBankingDetailList?id=${list.id}`).subscribe(eliminar => {
        this.viewMensajeComponente('delete', 'Banking Details List was deleted successfully')
        console.log(eliminar);
        this.ngOnInit()
      })
    }
    console.log("Después de eliminar:", this.data.officeBankingDetailLists);
  }
  //Fin delete Banking Details List
  //Inicio agregar Document
  addDocument(id) {
    this.data.documentOffices = this.data.documentOffices || [];
    let data_b = { operacion: "", id: 0, idCatOffice: 0, documentOffices: [] };
    data_b.operacion = 'insertar'
    data_b.id = id
    data_b.idCatOffice = this.data.idCatOffice ?? 0;
    data_b.documentOffices = this.data.documentOffices ?? [];

    const dialog = this._dialog.open(DocumentComponent, {
      data: data_b,
      width: "95%"
    });
    dialog.afterClosed().subscribe(result => {
      if (result == undefined || result == true) return;
      console.log(result);
      if (this.data.id == 0) {
        this.data.documentOffices.push(result);
      } else {
        this.ngOnInit()
      }
      console.log(this.data);
    })

  }
  //Fin agregar Document

  //inicio view Document
  viewDocument(id, image, extencion) {
    if (id != 0) {
      const url_images = this._services.url_images + '' + image
      window.open(url_images)
    } else {
      let base64String = image;

      this.downloadPdf(base64String, "archivo", extencion);
    }
  }
  downloadPdf(base64String, fileName, ext) {
    const source = 'data:application/' + ext + ';base64,' + base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = fileName + '.' + ext;
    link.click();
  }
  //Fin view Document

  //Inicio delete Document
  deleteDocument(document) {
    console.log(document);
    if (document.id == 0) {
      const index = this.data.documentOffices.findIndex((item) => JSON.stringify(item) === JSON.stringify(document));
      if (index !== -1) {
        this.data.documentOffices.splice(index, 1);
      }
      this.viewMensajeComponente('delete', 'it was deleted correctly')
    } else {
      this._services.service_general_delete(`Catalog/DeleteDocumentOffice?id=${document.id}`).subscribe(eliminar => {
        this.viewMensajeComponente('delete', 'it was deleted correctly')
        console.log(eliminar);
        this.ngOnInit()
      })
    }

    console.log("Después de eliminar:", this.data.documentOffices);

  }
  //Fin delete Document

  valida_form() {
    if (this.data.email == undefined || this.data.email == null || this.data.email == '') {
      this.nso_ainfo_fields.no_email = true
      console.log('1');
    } else {
      this.nso_ainfo_fields.no_email = false
      console.log('2');
    }
    if (this.nso_ainfo_fields.no_emai_val == true) {
      this.nso_ainfo_fields.no_email = false
      console.log('3');
    }
    const dataForm = ['legalEntity','office', 'country', 'city', 'address', 'zip', 'phone', 'email'];
    let validacion_Correc = false;
    for (const property of dataForm) {
      if (this.data[property] === undefined || this.data[property] === '') {
        this[`active_${property}`] = true;
        validacion_Correc = true
      } else {
        this[`active_${property}`] = false;
      }
    }
    console.log(this.nso_ainfo_fields);


    if (!validacion_Correc && !this.nso_ainfo_fields.no_emai_val
      && !this.nso_ainfo_fields.no_operations_val &&
      !this.nso_ainfo_fields.no_finance_val &&
      !this.nso_ainfo_fields.no_other_val && this.nso_ainfo_fields.no_email == false
    ) {
      console.log('guardando');
      this.save();
    }

  }

  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy = userData.id;
    this.data.updatedDate = new Date();
    // concatenar prefix de telefono
    if (this.data.phone != '' && this.prefix) {
      this.data.phone = `${this.prefix}+${this.data.phone}`
    }
    console.log('numero con prefix', this.data.phone);
    if (!this.data.image) this.data.image = '';
    if (!this.data.imageExtension) this.data.imageExtension = '';

    console.log("DATA A GUARDAR: ", this.data);
    this.__loader__.showLoader();
    this.data.createdBy = userData.id;
    this.data.createdDate = new Date();
    this.data.operationsEmail = this.data.operationsEmail ?? ''; //
    this.data.financeEmail = this.data.financeEmail ?? ''; //
    this.data.other = this.data.other ?? ''; //

    this.data.legalEntity = this.data.legalEntity ?? '';
    this.data.taxId = this.data.taxId ?? '';
    this.data.documentOffices = this.data.documentOffices ?? [];
    this.data.officeBankingDetailLists = this.data.officeBankingDetailLists ?? [];

    console.log(this.data);
    console.log(this.data.officeBankingDetailLists);
    console.log(this.data.documentOffices);
    if (this.data.id == 0) {
      this._services.service_general_post_with_url("Catalog/AddOffice", this.data).subscribe(r => {
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    } else {
      this.__loader__.showLoader();
      this._services.service_general_put('Catalog/UpdateOffice', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })
    }

  }
  //FUNCION PARA EDICION DE FOTOGRAFIA//
  img(event) {
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
      document.getElementById('lead_client_avatar').setAttribute('src', '' + reader.result);
    };
  }
  viewMensajeComponente(header: string, msg: string) {
    window.scrollTo(0, 0);
    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: header,
        body: msg
      },
      width: "350px"
    });
  }
}
