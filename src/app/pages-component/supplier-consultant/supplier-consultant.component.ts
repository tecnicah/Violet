import { Component, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAdministrativeContactConsultantComponent } from '../dialog/dialog-administrative-contact-consultant/dialog-administrative-contact-consultant.component';
import { DialogConsultantContactConsultantComponent } from '../dialog/dialog-consultant-contact-consultant/dialog-consultant-contact-consultant.component';
import { DialogWireTransferComponent } from '../dialog/dialog-wire-transfer/dialog-wire-transfer.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { DialogDocumentProfileSupplierComponent } from '../dialog/dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { LoaderComponent } from 'app/shared/loader';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';


@Component({
  selector: 'app-supplier-consultant',
  templateUrl: './supplier-consultant.component.html',
  styleUrls: ['./supplier-consultant.component.css']
})
export class SupplierConsultantComponent implements OnInit {

  loader: LoaderComponent = new LoaderComponent();
  data: any = {
    "id": 0,
    "photo": ''
  };
  minDate: Date = new Date();

  paymentSwitch: boolean = false;
  wireTransferSwitch: boolean = false;
  user: any;
  date: any;
  fleetSize: any[] = [];
  ca_methodPayment: any[] = [];
  ca_creditCard: any[] = [];
  ca_serviceLine: any[] = [];
  ca_status: any[] = [];
  ca_country: any[] = [];
  ca_city: any[] = [];
  ca_supplierType: any[] = [];
  ca_areacoverage: any[] = [];
  ca_vehiculo: any[] = [];
  ca_documentType: any[] = [];
  ca_privacy: any[] = [];
  ca_accountType: any[] = [];
  ca_typeSupplier: any[] = [];
  ca_currency: any[] = [];
  ca_contactType: any[] = [];
  ca_language: any[] = [];

  constructor(public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams: ActivatedRoute) {}

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
  // filtros
  public filterCurrency: any = {
    currency: ''
  };
  public filterCountry: any = {
    name: ''
  };
  public filterCity: any = {
    city: ''
  };



  //*************************************************************//
  ngOnInit(): void {
    this.consultaPermisos();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.date = new Date();
    this.catalogos();
    this.verificaNodos();
  }
  caCards: any[] = [];
  //*************************************************************//
  consultaInformacionServicio(id_serivice) {
    if (id_serivice.trim() == '') {
      return true
    }
    this.loader.showLoader();
    this._services.service_general_get('SupplierPartnerProfile/GetConsultant?key=' + id_serivice).subscribe((data => {
      if (data.success) {
        this.data = data.result;
        // revisa si es consultor y tiene permisos en secciones
        this.consultantPermisos();

        if (this.data.areasCoverageConsultants.length > 0) {
          let city_additional;
          for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
            this.data.areasCoverageConsultants[i].additional = [];
            city_additional = this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants;
            for (let j = 0; j < city_additional.length; j++) {
              this.data.areasCoverageConsultants[i].additional.push(city_additional[j].city);
            }
          }
        }

        for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
          const element = this.data.areasCoverageConsultants[i].country;
          this.getCity(element, i);
        }

        console.log("esta es la consulta del servicio: ", this.data);

        for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
          if (this.data.areasCoverageConsultants[i].paymentInformationConsultants.length > 0) {
            this.data.areasCoverageConsultants[i].payment = true;
          }
          if (this.data.areasCoverageConsultants[i].paymentInformationConsultants[0]?.wireTransferConsultants.length > 0) {
            this.data.areasCoverageConsultants[i].wire = true;
          }
        }

        this.ca_creditCard.forEach(E => {
          E.checked = false;
        });
        this.creditCardAux.forEach(E => {
          E.checked = false;
        });
        localStorage.setItem('card', JSON.stringify(this.creditCardAux));
        for (let j = 0; j < this.data.areasCoverageConsultants.length; j++) {
          this.caCards[j] = JSON.parse(localStorage.getItem('card'));
          let payment = this.data.areasCoverageConsultants[j].paymentInformationConsultants;
          for (let k = 0; k < payment.length; k++) {
            let credit_card = payment[k].creditCardPaymentInformationConsultants;
            for (let m = 0; m < credit_card.length; m++) {
              for (let i = 0; i < this.ca_creditCard.length; i++) {
                if (this.ca_creditCard[i].id == credit_card[m].creditCard) {
                  this.caCards[j][i].checked = true;
                }
              }
            }
          }
        }

        this.loader.hideLoader();
      }
    }))
  }
  //*************************************************************//
  reg_id: any;
  ca_taxes = [];
  ca_term = [];
  creditCardAux = [];
  async catalogos() {
    this.creditCardAux = await this._services.getCatalogueFrom('GetCreditCard');
    this._services.service_general_get('Catalogue/GetSupplierType/1').subscribe((data => {
      if (data.success) {
        this.ca_supplierType = data.result;
      }
    }))
    //this.ca_supplierType = await this._services.getCatalogueFrom('GetSupplierType');
    this.ca_typeSupplier = await this._services.getCatalogueFrom('GetSupplierType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_methodPayment = await this._services.getCatalogueFrom('GetPaymentMethod');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_status = await this._services.getCatalogueFrom('GetSupplierPartnerProfileStatus');
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_areacoverage = await this._services.getCatalogueFrom('GetAreaCoverageType');
    this.ca_vehiculo = await this._services.getCatalogueFrom('GetVehicleType');
    //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/3');
    this._services.service_general_get('Catalogue/GetDocumentType/3').subscribe((data => {
      if (data.success) {
        this.ca_documentType = data.result; 
        console.log(this.ca_documentType);
      }
    })) 
    console.log("Document type: ", this.ca_documentType);
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_contactType = await this._services.getCatalogueFrom('GetContactType');
    this.ca_language = await this._services.getCatalogueFrom('GetLanguages');
    this.ca_taxes = await this._services.getCatalogueFrom('GetTaxePercentage');
    this.ca_term = await this._services.getCatalogueFrom('GetCreditTerm');

    let id_serivice = this._routerParams.snapshot.params.id;
    if (id_serivice == "nuevo") {
      this.reg_id = 'nuevo';
      console.log(this.reg_id);
    }


    if (id_serivice != 'nuevo') {
      this.consultaInformacionServicio(id_serivice);
    }
  }
  //*************************************************************//
  verificaNodos() {
    if (!this.data.areasCoverageConsultants) {
      this.data.areasCoverageConsultants = [];
    }
  }
  // verificar si el user logeado es consultor para ocultar informacion personal
  public permisosConsultant: boolean = false;
  consultantPermisos() {
    if (this.user.role.id == 3) {
      this.permisosConsultant = true;
      //  if(this.user.id != this.data.userId){

      //    this.permisosConsultant = true;
      //  }else{
      //    this.permisosConsultant = false;
      //  }
    } else {
      this.permisosConsultant = false;
    }
  }
  //*************************************************************//
  editPhoto() {
    document.getElementById('photoSup').click();
  }
  //*************************************************************//
  push(i, data) {
    if (this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants.length == 0) {
      this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants.push({
        "areasCoverageService": 0,
        "city": data.id
      })
    } else {
      for (let j = 0; j < this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants.length.length; j++) {
        if (this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants[j] == data.id) {
          this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants[j].splice(j, 1)
        } else {
          this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants.push({
            "areasCoverageConsultant": 0,
            "city": data.id
          })
        }
      }
    }
  }
  //*************************************************************//
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = file.type.split("/");

              this.data.photo = encoded;
              this.data.photoExtension = ext[1];
              this.data.b64 = imageUrl;

            };
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  //*************************************************************//
  public fileOver(event) {
    console.log(event);
  }
  //*************************************************************//
  public fileLeave(event) {
    console.log(event);
  }
  //*************************************************************//
  getCity(data, i) {
    console.log("consulta ciudad: ", data);
    this._services.service_general_get('Catalogue/GetState?country=' + data).subscribe((data => {
      if (data.success) {
        this.ca_city[i] = data.result;
      }
    }))
  }
  //*************************************************************//
  getCityName(city, i) {
    if (city != undefined && city != null) {
      for (let j = 0; j < this.ca_city[i].length; j++) {
        const element = this.ca_city[i][j];
        if (element.id == city) {
          return element.city;
        }
      }
    }
  }
  //*************************************************************//
  newContact(type, i) {

    if(this.data.areasCoverageConsultants[i].country ==null ||
      this.data.areasCoverageConsultants[i].country == undefined ||
      this.data.areasCoverageConsultants[i].country == ''
      ){

       const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
         data: {
           header: "Warning",
           body: "To add contacts it is necessary to fill the country of the coverage area"
         },
         width: "350px"
       });
   
       dialogRef.afterClosed().subscribe(result => {
       
       })

       return;

   }

    const dialogRef = this._dialog.open(DialogAdministrativeContactConsultantComponent, {
      width: "90%",
      data: {
        country: this.data.areasCoverageConsultants[i].country
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        result.updatedBy = this.user.id;
        result.updatedDate = new Date();
        result.id = 0;
        result.areasCoverage = this.data.areasCoverageConsultants[i].id;
        this.data.areasCoverageConsultants[i].administrativeContactsConsultants.push(result)
      }
    });
  }
  //*************************************************************//
  addAreaCoverage() {
    this.caCards.push(this.creditCardAux);
    console.log(this.caCards);
    this.data.areasCoverageConsultants.push({
      "id": 0,
      "supplierPartnerProfileService": 0,
      "type": null,
      "country": null,
      "primaryCity": null,
      "currentAddress": null,
      "zipCode": null,
      "administrativeContactsConsultants": [

      ],
      "profileUsers": [

      ],
      "payment": false,
      "wire": false,
      "paymentInformationConsultants": [{
        "id": 0,
        "areasCoverageConsultant": 0,
        "fiscalInvoice": null,
        "creditCard": null,
        "checks": null,
        "payToOrderOf": null,
        "cash": null,
        "comment": null,
        "generalComment": null,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updatedBy": this.user.id,
        "updatedDate": new Date,
        "creditCardPaymentInformationConsultants": [

        ],

        "wireTransferConsultants": [

        ],
      }],

      "documentAreasCoverageConsultants": [

      ],

      "cityAreasCoverageConsultants": [

      ],

      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date()
    });
  }
  //************************************************************//
  nameDocument(id) {
    for (let i = 0; i < this.ca_documentType.length; i++) {
      if (this.ca_documentType[i].id == id) {
        return this.ca_documentType[i].documentType;
      }
    }
  }
  //************************************************************//
  namePrivacy(id) {
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if (this.ca_privacy[i].id == id) {
        return this.ca_privacy[i].privacy;
      }
    }
  }
  //************************************************************//
  nameAccount(id) {
    for (let i = 0; i < this.ca_accountType.length; i++) {
      if (this.ca_accountType[i].id == id) {
        return this.ca_accountType[i].accountType;
      }
    }
  }
  //************************************************************//
  nameLanguage(data) {
    let lenguajes = '';
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.ca_language.length; j++) {
        if (data[i].language == this.ca_language[j].id) {
          lenguajes = lenguajes.concat(this.ca_language[j].name + ' ');
        }
      }
    }
    return lenguajes;
  }
  //*************************************************************//
  editAdmin(i, datos, k) {
    datos.country = this.data.areasCoverageConsultants[i].country
    const dialogRef = this._dialog.open(DialogAdministrativeContactConsultantComponent, {
      width: "90%",
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        result.updatedBy = this.user.id;
        result.updatedDate = new Date();
        this.data.areasCoverageConsultants[i].administrativeContactsConsultants[k] = result;
      }
    });
  }
  //*************************************************************//
  newConsultant(i) {
    console.log("ENTRA A CREAR NUEVA CONSULTANT");
    localStorage.setItem('id_coverture', this.data.areasCoverageConsultants[i].id);
    localStorage.setItem('id_pais', this.data.areasCoverageConsultants[i].country);
    this.router.navigateByUrl('profileconsultant/');
    /*
    const dialogRef = this._dialog.open(DialogConsultantContactConsultantComponent, {
      width: "90%",
      data: {
        country: this.data.areasCoverageConsultants[i].country
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        result.updatedBy = this.user.id;
        result.updatedDate = new Date();
        result.id = 0;
        result.areasCoverage = this.data.areasCoverageConsultants[i].id;
        this.data.areasCoverageConsultants[i].consultantContactsConsultants.push(result)
      }
    });
    */
  }
  //************************************************************//
  editConsultant(i, datos, k) {
    this.router.navigateByUrl('profileconsultant/' + datos.id);
    localStorage.setItem('id_pais', this.data.areasCoverageConsultants[i].country);
    /*
    datos.country = this.data.areasCoverageConsultants[i].country
    const dialogRef = this._dialog.open(DialogConsultantContactConsultantComponent, {
      width: "90%",
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        result.updatedBy = this.user.id;
        result.updatedDate = new Date();
        this.data.areasCoverageConsultants[i].consultantContactsConsultants[k] = result;
      }
   });
   */
  }
  //*************************************************************//
  addWireTransfer(i) {
    const dialogRef = this._dialog.open(DialogWireTransferComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.data.areasCoverageConsultants[i].paymentInformationConsultants[0].wireTransferConsultants.push(result);
      }
    });
  }
  //*************************************************************//
  editWireTransfer(i, wire, k) {
    const dialogRef = this._dialog.open(DialogWireTransferComponent, {
      width: "90%",
      data: wire
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.data.areasCoverageConsultants[i].paymentInformationConsultants[0].wireTransferConsultants[k] = result;
      }
    });
  }
  //*************************************************************//
  addNewDocument(i) {
    if(this.data.areasCoverageConsultants[i].primaryCity ==null ||
      this.data.areasCoverageConsultants[i].primaryCity == undefined ||
      this.data.areasCoverageConsultants[i].primaryCity == ''
      ){

       const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
         data: {
           header: "Warning",
           body: "To add contacts it is necessary to fill the city of the coverage area"
         },
         width: "350px"
       });
   
       dialogRef.afterClosed().subscribe(result => {
       
       })

       return;

    } 
    const dialogRef = this._dialog.open(DialogDocumentProfileSupplierComponent, {
      width: "90%",
      data: {
        city: this.data.areasCoverageConsultants[i].primaryCity
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        result.areaCoverage = 0;
        this.data.areasCoverageConsultants[i].documentAreasCoverageConsultants.push(result);
        console.log(this.data);
      }
    });
  }
  //************************************************************//
  nameSupplier(id) {
    for (let i = 0; i < this.ca_typeSupplier.length; i++) {
      if (this.ca_typeSupplier[i].id == id) {
        return this.ca_typeSupplier[i].supplierType;
      }
    }
  }
  //************************************************************//
  nameCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }
  //************************************************************//
  nameContact(id) {
    for (let i = 0; i < this.ca_contactType.length; i++) {
      if (this.ca_contactType[i].id == id) {
        return this.ca_contactType[i].type;
      }
    }
  }
  //*************************************************************//
  pushData(data, i, event, j) {
    if (event.checked) {
      this.data.areasCoverageConsultants[i].paymentInformationConsultants[0].creditCardPaymentInformationConsultants.push({
        "paymentInformationConsultant": 0,
        "creditCard": data.id,
      });
    } else {
      this.data.areasCoverageConsultants[i].paymentInformationConsultants[0].creditCardPaymentInformationConsultants.splice(j, 1);
    }
  }
  //*************************************************************//
  //VALIDACIONES//
  active_status: boolean = false;
  active_comercialName: boolean = false;
  active_legalName: boolean = false;
  active_since: boolean = false;
  active_type: boolean = false;
  active_serviceLine:boolean = false;
  seccionUno=0;
  valida_form() {
    let contador = 0;
    this.seccionUno = 0;
    if (this.data.status == undefined || this.data.status == '' || this.data.status == null) {
      this.active_status = true;
      contador++;
      this.seccionUno++;
    }
    if(this.data.immigration == undefined && this.data.relocation == undefined ){
      this.active_serviceLine = true;
      this.seccionUno++;
      contador++;
    }
    if (this.data.comercialName == undefined || this.data.comercialName == '' || this.data.comercialName == null) {
      this.active_comercialName = true;
      this.seccionUno++;
      contador++;
    }
    if (this.data.legalName == undefined || this.data.legalName == '' || this.data.legalName == null) {
      this.active_legalName = true;
      this.seccionUno++;
      contador++;
    }
    if (this.data.supplierSince == undefined || this.data.supplierSince == '' || this.data.supplierSince == null) {
      this.active_since = true;
      this.seccionUno++;
      contador++;
    }

    if(this.seccionUno>=1){
      document.getElementById('seccion_uno').scrollIntoView();
      this.showtoast("It is necessary to fill all information requested");
    }

    if (this.data.areasCoverageConsultants.length == 0) {
      this.addAreaCoverage();
    }


    let validacion_area = false;
    for (let index = 0; index < this.data.areasCoverageConsultants.length; index++) {
      validacion_area = false;
      if (this.data.areasCoverageConsultants[index].type == undefined || this.data.areasCoverageConsultants[index].type == null || this.data.areasCoverageConsultants[index].type == '') {
        this.data.areasCoverageConsultants[index].typeValid = true;
        contador++;
        validacion_area = true;
      }
      if (this.data.areasCoverageConsultants[index].country == undefined || this.data.areasCoverageConsultants[index].country == null || this.data.areasCoverageConsultants[index].country == '') {
        this.data.areasCoverageConsultants[index].countryValid = true;
        contador++;
        validacion_area = true;
      }
      if (this.data.areasCoverageConsultants[index].primaryCity == undefined || this.data.areasCoverageConsultants[index].primaryCity == null || this.data.areasCoverageConsultants[index].primaryCity == '') {
        this.data.areasCoverageConsultants[index].cityValid = true;
        contador++;
        validacion_area = true;
      }
      if(validacion_area == true){
        document.getElementById('seccion_dos'+index).scrollIntoView();
        break;
      }
    }


    
      if (contador == 0) {
        console.log("entra a guardar la informacion");
        this.save();
      }else{
        let msg = '';
        if(validacion_area == true){ 
          msg = 'It is necessary to fill all information requested of Area of Coverage';
        }else{
          msg = "It is necessary to fill all information requested";
        }
        this.showtoast(msg);
      }
    console.log(this.data)
  }
  //*************************************************************//
  save() {
    this.loader.showLoader();
    this.data.createdBy = this.user.id;
    this.data.createdDate = new Date();
    this.data.updatedBy = this.user.id;
    this.data.updatedDate = new Date();

    if (this.data.areasCoverageConsultants.length > 0) {
      for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
        if (this.data.areasCoverageConsultants[i].additional) {
          let additionalCity = this.data.areasCoverageConsultants[i].additional;
          if (additionalCity.length > 0) {
            for (let j = 0; j < additionalCity.length; j++) {
              this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants.push({
                "areasCoverageConsultant": this.data.areasCoverageConsultants[i].id,
                "city": additionalCity[j]
              })
            }
          }
        }
      }
    }

    console.log("Esta es la informacion a guardar:  ", this.data);

    if (this.data.id == 0) {

      console.log("ENTRA A POST");
      this._services.service_general_post_with_url('SupplierPartnerProfile/PostConsultant', this.data).subscribe((data => {
        console.log("save supplier: ", data);
        if (data.success) {
          console.log(data);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Save Data"
            },
            width: "350px"
          });
          this.loader.hideLoader();
          this.router.navigateByUrl('/supplierPartners');
        }
      }))
    } else {

      this.verificaDocumentos();

    }
  }

  // delete supplier
  // deleteProfile(){
  //   const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
  //     data: {
  //       header: "Delete confirmation",
  //       body: "Are you sure to delete this Profile?"
  //     },
  //     width: "350px"
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this._services.service_general_delete(`Profile/${this.data.id}`).subscribe((data) =>{
  //         console.log('respuesta de eliminacion', data);
  //         if (data.success) {
  //           const dialog = this._dialog.open(DialogGeneralMessageComponent, {
  //             data: {
  //               header: "Success",
  //               body: `Deleted Profile`
  //             },
  //             width: "350px"
  //           });
  //           this.router.navigateByUrl('/supplierPartners');
  //         }
  //       }, (error) => {
  //           console.error('error con el delete', error);
  //           const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
  //           data: {
  //             header: "Warning",
  //             body: `The profile is in use.`
  //           },
  //           width: "350px"
  //           });
  //       })
  //     }
  //   });
  // }
  //*************************************************************//
  verificaDocumentos() {
    for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
      let documentos = this.data.areasCoverageConsultants[i].administrativeContactsConsultants;
      for (let j = 0; j < documentos.length; j++) {
        let doc = documentos[j].documentAdministrativeContactsConsultants;
        documentos[j].documentAdministrativeContactsConsultants = [];
        for (let k = 0; k < doc.length; k++) {
          if (doc[k].id == 0) {
            this.data.areasCoverageConsultants[i].administrativeContactsConsultants[j].documentAdministrativeContactsConsultants.push(doc[k])
          }
        }
      }
    }


    for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
      let documentos = this.data.areasCoverageConsultants[i].profileUsers;
      for (let j = 0; j < documentos.length; j++) {
        let doc = documentos[j].documentConsultantContactsConsultants;
        documentos[j].documentConsultantContactsConsultants = [];
        for (let k = 0; k < doc.length; k++) {
          if (doc[k].id == 0) {
            this.data.areasCoverageConsultants[i].profileUsers[j].documentConsultantContactsConsultants.push(doc[k])
          }
        }
      }
    }

    for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
      let documentos = this.data.areasCoverageConsultants[i].profileUsers;
      for (let j = 0; j < documentos.length; j++) {
        let docVehicle = documentos[j].vehicleConsultants;
        for (let k = 0; k < docVehicle.length; k++) {
          let doc = docVehicle[k].documentVehicleConsultants;
          docVehicle[k].documentVehicleConsultants = [];
          for (let r = 0; r < doc.length; r++) {
            if (doc[r].id == 0) {
              this.data.areasCoverageConsultants[i].profileUsers[j].vehicleConsultants[k].documentVehicleConsultants.push(doc[r])
            }
          }
        }
      }
    }

    for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
      let documentos = this.data.areasCoverageConsultants[i].profileUsers;
      for (let j = 0; j < documentos.length; j++) {
        let docVehicle = documentos[j].vehicleConsultants;
        for (let k = 0; k < docVehicle.length; k++) {
          let doc = docVehicle[k].photosVehicleConsultants;
          docVehicle[k].photosVehicleConsultants = [];
          for (let r = 0; r < doc.length; r++) {
            if (doc[r].id == 0) {
              this.data.areasCoverageConsultants[i].profileUsers[j].vehicleConsultants[k].photosVehicleConsultants.push(doc[r])
            }
          }
        }
      }
    }

    for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
      let documentos = this.data.areasCoverageConsultants[i].documentAreasCoverageConsultants;
      this.data.areasCoverageConsultants[i].documentAreasCoverageConsultants = [];
      for (let j = 0; j < documentos.length; j++) {
        if (documentos[j].id == 0) {
          this.data.areasCoverageConsultants[i].documentAreasCoverageConsultants.push(documentos[j])
        }
      }
    }

    this.updateData(this.data);
  }
  //*************************************************************//
  updateData(data) {
    this._services.service_general_put('SupplierPartnerProfile/PutConsultant', data).subscribe((data => {
      console.log("save supplier: ", data);
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated Data"
          },
          width: "350px"
        });
        this.loader.hideLoader();
        this.router.navigateByUrl('/supplierPartners');
      }
    }))
  }
  //*************************************************************//
  deleteDocument(i, a) {
    console.log("Entra a eliminar documento: ", i, a);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete the document"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data.areasCoverageConsultants[i].documentAreasCoverageConsultants.splice(a, 1);
      }
    })
  }

  goBack() {
    window.history.back();
  }

  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

  show_card: boolean = false;
  showCard(e) {
    console.log(e)
    if (e.checked) {
      this.show_card = true;
    } else {
      this.show_card = false;
    }
  }

  show_checks: boolean = false;
  showChecks(e) {
    console.log(e)
    if (e.checked) {
      this.show_checks = true;
    } else {
      this.show_checks = false;
    }
  }

  show_cash: boolean = false;
  showCash(e) {
    console.log(e)
    if (e.checked) {
      this.show_cash = true;
    } else {
      this.show_cash = false;
    }
  }

  deleteWireTransfer(i, wire, k) {
    console.log("este es i  ", i);
    console.log("este es wire  ", wire);
    console.log("este es k  ", k);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete the Wire Transfer"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (wire.id && wire.id != 0) {
          this._services.service_general_delete('SupplierPartnerProfile/Delete/Consultant/WireTransfer/'+wire.id).subscribe((data) => {
            console.log('respuesta de eliminacion', data);
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: `Success Wiretransfer deleted`
                },
                width: "350px"
              });
              this.data.areasCoverageConsultants[i].paymentInformationConsultants[0].wireTransferConsultants.splice(k, 1);
            }
          }, (error) => {
            console.error('error con el delete', error);
          })
        } else {
          this.data.areasCoverageConsultants[i].paymentInformationConsultants[0].wireTransferConsultants.splice(k, 1);
        }
      }
    })
  }

  downloadPdf(base64String, fileName,  ext) {
    const source = 'data:application/'+ext+';base64,'+base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = fileName+'.'+ext;
    link.click();
  }
  onClickDownloadPdf(b64, ext){
    let base64String = b64;
  
    this.downloadPdf(base64String,"archivo", ext);
  }

  deleteCovertura(i){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Area of Coverage?"
      },
        width: "350px"
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.data.areasCoverageConsultants.splice(i,1);
        }
      });
  }
  showtoast(msg){
    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Warning",
        body: msg
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
    
    })
}
}
