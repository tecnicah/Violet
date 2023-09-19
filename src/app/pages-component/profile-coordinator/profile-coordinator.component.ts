import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogAddVahicleConsultantComponent } from '../dialog/dialog-add-vahicle-consultant/dialog-add-vahicle-consultant.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEmergencyContactComponent } from '../dialog/dialog-emergency-contact/dialog-emergency-contact.component';
import { DialogProfileDocumentComponent } from '../dialog/dialog-profile-document/dialog-profile-document.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { DialogAddOfficeComponent } from '../dialog/dialog-add-office/dialog-add-office.component';
import { DialogAddCountryComponent } from '../dialog/dialog-add-country/dialog-add-country.component';
import { DialogAddOperationLeaderComponent } from '../dialog/dialog-add-operation-leader/dialog-add-operation-leader.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { identifierName } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogWireTransferProfileComponent } from '../dialog/dialog-wire-transfer-profile/dialog-wire-transfer-profile.component';



@Component({
  selector: 'app-profile-coordinator',
  templateUrl: './profile-coordinator.component.html',
  styleUrls: ['./profile-coordinator.component.scss']
})
export class ProfileCoordinatorComponent implements OnInit {
  ca_assignedTeam = [];
  ca_cliente = [];
  temporalDocument: any[] = [];
  show: boolean = false;
  user: any;
  loader: LoaderComponent = new LoaderComponent();
  // data_coordinator: any = {};
  id: number;
  validaciones: any = {
    name: false,
    serviceLine: false,
    address: false
  };

  constructor(public router: Router, public _services: ServiceGeneralService, public _routerParams: ActivatedRoute, public _dialog: MatDialog, private _permissions: NgxPermissionsService) { }

  public typePrefix = {
    countriesName: ''
  }
  public typePrefixPersonal = {
    countriesName: ''
  }
  public prefixPersonal;

  public prefix;
  public prefixCatalog;
  public data_coordinator: dataCoordinatorModel = new dataCoordinatorModel();
  public dataPaymentInformation: paymentInformationProfilesModel = new paymentInformationProfilesModel();


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

    this.initPageSettings()
    this.getCatalogues();
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.id = this._routerParams.snapshot.params.id;
    console.log(this.id);
    console.log('data user', this.user);
    this._services.service_general_get('Profile/GetProfile/' + this.id).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.data_coordinator = data.result;
        this.clickWireTransfer()
        this.verificaNodos();
        // revisa si es consultor y tiene permisos en secciones
        this.consultantPermisos();
        // separar prefix de phone number
        // si el valor de mobilephone no es mayor a 10 caracteres entonces no tiene prefijo y toma el valor actual desde la bd asi vienen con prefijo  93+6567567567 o sin 6567567567
        if (this.data_coordinator.phoneNumber != '' && this.data_coordinator.phoneNumber != null) {
          let search = '+';
          // obtener la posicion de +
          let posicion = this.data_coordinator.phoneNumber.indexOf(search);
          // obtener el valor de prefix
          this.prefix = this.data_coordinator.phoneNumber.substr(0, posicion);
          // obtener valor phone
          this.data_coordinator.phoneNumber = this.data_coordinator.phoneNumber.substr(posicion + 1);
        }
        if (this.data_coordinator.personalInformation.personalPhone != '' && this.data_coordinator.personalInformation.personalPhone != null) {
          let search = '+';
          // obtener la posicion de +
          let posicion = this.data_coordinator.personalInformation.personalPhone.indexOf(search);
          // obtener el valor de prefix
          this.prefixPersonal = this.data_coordinator.personalInformation.personalPhone.substr(0, posicion);
          // obtener valor phone
          this.data_coordinator.personalInformation.personalPhone = this.data_coordinator.personalInformation.personalPhone.substr(posicion + 1);
        }
        this._services.service_general_get('Profile/GetClients?user=' + this.data_coordinator.userId).subscribe((data => {
          if (data.success) {
            console.log(data.result.value)
            this.ca_cliente = data.result.value;
          }
        }))
        this.getCity();
        this.getCity_();
        this.loader.hideLoader();
        if (this.data_coordinator.photo != null && this.data_coordinator.photo != '') {
          document.getElementById('lead_client_avatar').setAttribute('src', this._services.url_images + this.data_coordinator.photo);
        }
        let language_additional;
        this.data_coordinator.additional = [];
        if (this.data_coordinator.languagesConsultantContactsConsultants.length > 0) {
          language_additional = this.data_coordinator.languagesConsultantContactsConsultants;
          for (let j = 0; j < language_additional.length; j++) {
            this.data_coordinator.additional.push(language_additional[j].language);
          }
        }


        if (this.data_coordinator.personalInformation.paymentInformationProfiles.length == 0) {
          this.data_coordinator.personalInformation.paymentInformationProfiles.push(this.dataPaymentInformation);
          // this.data_coordinator.personalInformation.paymentInformationProfiles.push({
          //  "wireTransfer": null,
          //  "fiscalInvoice": null,
          //  "accountType": null,
          //  "accountHoldersName": "",
          //  "bankName": "",
          //  "accountNumber": null,
          //  "routingNumber": null,
          //  "swiftBicCode": "",
          //  "currency": null,
          //  "clabe": null,
          //  "wireFeeApprox": null,
          //  "bankAddress": "",
          //  "internationalPaymentAcceptance": null,
          //  "createdBy": this.user.id,
          //  "createdDate": new Date(),
          //  "updatedBy": this.user.id,
          //  "updatedDate": new Date()
          // });
        } else {
          if (this.data_coordinator.personalInformation.paymentInformationProfiles[0].wireTransfer ||
            this.data_coordinator.personalInformation.paymentInformationProfiles[0].fiscalInvoice) {
            this.data_coordinator.togglePayment = true;
            this.show = true;
          }
        }
      }
      this.catalogos();
    }))

    this._services.service_general_get('Profile/GetAssignedTeam').subscribe((data => {
      if (data.success) {
        this.ca_assignedTeam = data.result.value;
      }
    }))

  }
  goBack() {
    window.history.back();
  }

  // delete supplier
  deleteProfile() {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Profile?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Profile/${this.data_coordinator.id}`).subscribe((data) => {
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Profile`
              },
              width: "350px"
            });
            this.router.navigateByUrl('/supplierPartners');
          }
        }, (error) => {
          console.error('error con el delete', error);
          const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The profile is in use.`
            },
            width: "350px"
          });
        })
      }
    });
  }

  async getCatalogues() {
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
  }
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));

  public initPageSettings(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    const user_rol: string[] = [this.__userlog__.role.role];
    this._permissions.loadPermissions(user_rol);
  }

  // verificar si el user logeado es consultor para ocultar informacion personal
  public permisosConsultant: boolean = false;
  consultantPermisos() {
    if (this.user.role.id == 3) {
      // this.id es el id logeado
      if (this.user.id != this.data_coordinator.userId) {

        this.permisosConsultant = true;
      } else {
        this.permisosConsultant = false;
      }
    }
    else {
      this.permisosConsultant = false;
    }
  }
  //*********************************************************************************//
  //FUNCION PARA CREAR NODOS QUE NO EXISTAN//
  public personalInformation: personalInformationModel = new personalInformationModel();

  verificaNodos() {
    if (!this.data_coordinator.personalInformation || this.data_coordinator.personalInformation == null) {
      this.data_coordinator.personalInformation = this.personalInformation;
    }
  }
  // verificaNodos(){
  //   if(!this.data_coordinator.personalInformation){
  //      this.data_coordinator.personalInformation = {};
  //      if(!this.data_coordinator.personalInformation.paymentInformationProfiles){
  //           this.data_coordinator.personalInformation.paymentInformationProfiles = [];
  //      }
  //    }

  //    if(!this.data_coordinator.personalInformation.emergencyContacts){
  //     this.data_coordinator.personalInformation.emergencyContacts = [];
  //    }

  //    if(!this.data_coordinator.personalInformation.compesationBenefits){
  //      this.data_coordinator.personalInformation.compesationBenefits = [];
  //    }
  // }
  //*********************************************************************************//
  //CONSULTA DE CATALOGOS DE INFORMACION//
  ca_creditCard = [];
  ca_accountType = [];
  ca_currency = [];
  ca_office = [];
  ca_title = [];
  ca_country = [];
  ca_languages = [];
  ca_benefit = []
  ca_duration = [];
  supplier_catalogue = [];
  ca_privacy = [];
  ca_documentType = [];
  ca_documentStatus = [];
  ca_vehicle = [];
  async catalogos() {
    this.loader.showLoader()
    this.ca_countryPersonelInfo = await this._services.getCatalogueFrom('Generic/Countries');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_office = await this._services.getCatalogueFrom('GetOffice');
    this.ca_title = await this._services.getCatalogueFrom('GetTitle');
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_languages = await this._services.getCatalogueFrom('GetLanguages');
    this.ca_languages = await this._services.getCatalogueFrom('GetLanguages');
    this.ca_benefit = await this._services.getCatalogueFrom('GetBenefit');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
    this.ca_documentStatus = await this._services.getCatalogueFrom('GetDocumentStatus');
    this.ca_vehicle = await this._services.getCatalogueFrom('GetVehicleType');

    this.ca_duration = duration.filter(function (E) {
      if (E.recurrence != null) {
        return true;
      }
    })

    this._services.service_general_get('Catalogue/GetDocumentType/3').subscribe((data => {
      if (data.success) {
        this.ca_documentType = data.result;
      }
    }))
    this.clickWireTransfer()
    this.loader.hideLoader()

  }
  //*********************************************************************************//
  //CONSULTA CIUDAD//
  ca_city = [];
  getCity() {
    this._services.service_general_get('Catalogue/GetState?country=' + this.data_coordinator.country).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    }))
  }
  ca_countryPersonelInfo: Array<any> = [];

  //CONSULTA CIUDAD//
  public filterCity: any = { city: '' };
  public filterCountry2: any = { name: '' };
  public filterCity2: any = { name: '' };
  public filterCountry: any = { name: '' };
  activeCountry: boolean = false;
  activeCity: boolean = false;
  ca_city_ = [];
  getCity_() {
    this._services.service_general_get('CountryAdminCenter/GetCityByCountryId?countryId=' + this.data_coordinator.personalInformation.country).subscribe((data => {
      if (data.success) {
        this.ca_city_ = data.result;
      }
    }))
  }

  //*********************************************************************************//
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
      this.data_coordinator.photo = encoded;
      this.data_coordinator.photoExtension = ext[1];
      document.getElementById('lead_client_avatar').setAttribute('src', '' + reader.result);
    };
  }
  //*********************************************************************************//
  //FUNCION PARA AGREGAR  NUEVO VEHICULO//
  addVehicle() {
    const dialogRef = this._dialog.open(DialogAddVahicleConsultantComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_coordinator.vehicleConsultants.push(result);
      }
    });
  }
  //FUNCION PARA EDICION DE VEHICULO//
  editVehicle(data, i) {
    const dialogRef = this._dialog.open(DialogAddVahicleConsultantComponent, {
      width: "90%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_coordinator.vehicleConsultants[i] = result;
      }
    });
  }
  //*********************************************************************************//
  //AGREGAR NUEVO CONTACTO DE EMERGENCIA//
  addContact() {
    const dialogRef = this._dialog.open(DialogEmergencyContactComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_coordinator.personalInformation.emergencyContacts.push(result);
      }
    });
  }
  //*********************************************************************************//
  //EDITAR CONTACTO DE EMERGENCIA//
  editContact(data, i) {
    const dialogRef = this._dialog.open(DialogEmergencyContactComponent, {
      width: "90%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_coordinator.personalInformation.emergencyContacts[i] = result;
      }
    });
  }
  //*********************************************************************************//
  //FUNCION PARA AGREGAR NUEVO BENEFIT//
  addBenefit() {
    this.data_coordinator.personalInformation.compesationBenefits.push({
      "id": 0,
      "profile": 0,
      "placeWork": 0,
      "baseCompesation": null,
      "currency": 0,
      "taxes": null,
      "benefit": 0,
      "ammount": null,
      "frequency": 0
    });
  }
  //*********************************************************************************//
  //FUNCION PARA NUEVO DOCUMENTO//
  addDocument() {
    const dialogRef = this._dialog.open(DialogProfileDocumentComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.temporalDocument.push(result);
      }
    });
  }
  //ELIMINAR DOCUMENTO//
  deleteDocument(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.temporalDocument.splice(i, 1);
      }
    })
  }
  //*********************************************************************************//
  //FUNCION PARA PAYMENT INFORMATION//
  paymentInformation(event) {
    //  console.log(event);
    if (event.checked) {
      this.show = true;
      this.clickWireTransfer()
    } else {
      this.show = false;
    }
  }
  clickWireTransfer() {
    this.loader.showLoader()

    console.log(this.data_coordinator);

    let wireTrans = this.data_coordinator.personalInformation.paymentInformationProfiles[0]

    if (wireTrans.wireTransferProfiles.length >= 1) {
      wireTrans.wire = true
    } else {
      wireTrans.wire = false
    }

    this.ca_creditCard?.forEach(datacart => {
      const matchingProfile = wireTrans.creditCardPaymentInformationProfiles.find(
        profile => profile.creditCard === datacart.id
      );
      datacart.isChecked = !!matchingProfile;

    })

    this.loader.hideLoader()

    console.log("ca_creditCard x2", this.ca_creditCard);
  }
  pushData(data, event, j) {
    console.log(data);

    let creditCardPaymentInformationProfiles = this.data_coordinator.personalInformation.paymentInformationProfiles[0].creditCardPaymentInformationProfiles
    if (event.checked) {
      creditCardPaymentInformationProfiles.push({
        "paymentInformationService": 0,
        "creditCard": data.id,
      });
    }
    else {

      for (let index = 0; index < creditCardPaymentInformationProfiles.length; index++) {
        const element = creditCardPaymentInformationProfiles[index];
        if (element.creditCard == data.id) {
          creditCardPaymentInformationProfiles.splice(index, 1);
        }
      }
    }
    console.log("push y eliminar:", this.data_coordinator.personalInformation.paymentInformationProfiles[0].creditCardPaymentInformationProfiles);
    console.log(j);
  }
  addPaymentInformation() {
    const dialogRef = this._dialog.open(DialogWireTransferProfileComponent, {
      width: "90%"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log(result);
        this.data_coordinator.personalInformation.paymentInformationProfiles[0].wireTransferProfiles.push(result)
      }
    })
  }
  editWireTransfer(wire, k) {
    console.log(wire);
    console.log(k);
    const dialogRef = this._dialog.open(DialogWireTransferProfileComponent, {
      width: "90%",
      data: wire
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.data_coordinator.personalInformation.paymentInformationProfiles[0].wireTransferProfiles[k] = result
        console.log(this.data_coordinator.personalInformation.paymentInformationProfiles[0].wireTransferProfiles);

      }
    })
  }
  deleteWireTransfer(wire, k) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete the Wire Transfer"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(wire);
        if (wire.id && wire.id != 0) {
          this._services.service_general_put('Profile/DeleteWireTransferProfile', wire.id).subscribe((data) => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: `Success Wiretransfer deleted`
                },
                width: "350px"
              });
            }
            this.data_coordinator.personalInformation.paymentInformationProfiles[0].wireTransferProfiles.splice(k, 1);
          }, (error) => {
            console.error('error con el delete', error);
          })
        } else {
          this.data_coordinator.personalInformation.paymentInformationProfiles[0].wireTransferProfiles.splice(k, 1);

        }
      }
    })
  }
  //********************************************************************************//
  //FUNCION PARA CONSULTAR EL NOMBRE DE LA OFICINA//
  getNameOffice(id) {
    for (let i = 0; i < this.ca_office.length; i++) {
      if (this.ca_office[i].id == id) {
        return this.ca_office[i].office;
      }
    }
  }
  //FUNCION PARA CONSULTA DE IMAGEN DE LA OFICINA//
  getPhotoOffice(id) {
    for (let i = 0; i < this.ca_office.length; i++) {
      if (this.ca_office[i].id == id) {
        return this.ca_office[i].image;
      }
    }
  }
  //FUNCION PARA ELIMINAR OFICINA//
  deleteOffice(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Office?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_coordinator.offices.splice(i, 1);
      }
    })
  }
  //FUNCION PARA AGREGAR NUEVA OFICINA//
  addOffice() {
    const dialogRef = this._dialog.open(DialogAddOfficeComponent, {
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        result.consultant = this.data_coordinator.id
        this.data_coordinator.offices.push(result);
      }
    })
  }
  //********************************************************************************//
  //FUNCIONES PARA COUNTRY AGREGAR Y ELIMINAR//
  addCountry() {
    const dialogRef = this._dialog.open(DialogAddCountryComponent, {
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        result.consultant = this.data_coordinator.id
        this.data_coordinator.countryServices.push(result);
      }
    })
  }
  //FUNCION PARA ELIMINAR COUNTRY//
  deleteCountry(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Country?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_coordinator.countryServices.splice(i, 1);
      }
    })
  }
  //********************************************************************************//
  //FUNCION PARA AGREGAR NUEVO OPERATION LEADER//
  addOperationLeader() {
    const dialogRef = this._dialog.open(DialogAddOperationLeaderComponent, {
      data: this.data_coordinator.country,
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.createdBy = this.data_coordinator.id
        this.data_coordinator.operationLeaderCreatedByNavigations.push(result);
      }
    })
  }
  //FUNCION PARA ELIMINAR OPERATION LEADER//
  deleteOperationLeader(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Operation Leader?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_coordinator.operationLeaderCreatedByNavigations.splice(i, 1);
      }
    })
  }
  //********************************************************************************//
  //FUNCION PARA CONSULTAR NOMBRE DEL COUNTRY//
  getNameCountry(id) {
    for (let i = 0; i < this.ca_country.length; i++) {
      if (this.ca_country[i].id == id) {
        return this.ca_country[i].name;
      }
    }
  }
  //FUNCION PARA CONSULTA DE IMAGEN DEL COUNTRY//
  getImageCountry(id) {
    for (let i = 0; i < this.ca_country.length; i++) {
      if (this.ca_country[i].id == id) {
        return this.ca_country[i].flag;
      }
    }
  }
  //FUNCIONA PARA TRAER NOMBRE DE PRIVACIDAD//
  getNamePrivacy(id) {
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if (this.ca_privacy[i].id == id) {
        return this.ca_privacy[i].privacy;
      }
    }
  }
  //FUNCION PARA CONSULTAR NOMBRE DEL DOCUMEN TYPE//
  getNameDocument(id) {
    // let document;
    // this._services.service_general_get(`Catalogue/GetDocumentType/${id}`).subscribe((data => {
    //   if (data.success) {
    //      document = data.result;
    //       return document.documentType;
    //   }
    // }))
    for (let i = 0; i < this.ca_documentType.length; i++) {
      if (this.ca_documentType[i].id == id) {
        return this.ca_documentType[i].documentType;
      }
    }
  }
  //FUNCION PARA STATUS DEL DOCUMENTO//
  getDocumentStatus(id) {
    for (let i = 0; i < this.ca_documentStatus.length; i++) {
      if (this.ca_documentStatus[i].id == id) {
        return this.ca_documentStatus[i].status;
      }
    }
  }
  //GET DATA TEAM NAME//
  getDataTeam(id) {
    for (let i = 0; i < this.ca_assignedTeam.length; i++) {
      if (this.ca_assignedTeam[i].id == id) {
        return this.ca_assignedTeam[i].name
      }
    }
  }
  //FUNCION PARA CONSULTA DE ROL//
  getDataTeamTile(id) {
    for (let i = 0; i < this.ca_assignedTeam.length; i++) {
      if (this.ca_assignedTeam[i].id == id) {
        return this.ca_assignedTeam[i].title
      }
    }
  }
  //FUNCION PARA CONSULTA DE FOTOGRAFIA//
  getDataTeamPhoto(id) {
    for (let i = 0; i < this.ca_assignedTeam.length; i++) {
      if (this.ca_assignedTeam[i].id == id) {
        return this.ca_assignedTeam[i].photo
      }
    }
  }
  //NOMBRE DEL TIPO DE VIHICULO//
  getVehicle(id) {
    for (let i = 0; i < this.ca_vehicle.length; i++) {
      if (this.ca_vehicle[i].id == id) {
        return this.ca_vehicle[i].type
      }
    }
  }
  //********************************************************************************//
  //FUNCION PARA GUARDAR LA INFORMACION//
  save() {
    this.data_coordinator.user = null;
    this.loader.showLoader();
    if (this.data_coordinator.additional.length > 0) {
      this.data_coordinator.languagesConsultantContactsConsultants = [];
      let languages = this.data_coordinator.additional;
      if (languages.length > 0) {
        for (let j = 0; j < languages.length; j++) {
          this.data_coordinator.languagesConsultantContactsConsultants.push({
            "consultantContactsService": this.data_coordinator.id,
            "language": languages[j]
          })
        }
      }
    }

    this.data_coordinator.documentConsultantContactsConsultants = [];
    this.data_coordinator.documentConsultantContactsConsultants = this.temporalDocument;

    if (this.data_coordinator.photo == null) {
      this.data_coordinator.photo = '';
      this.data_coordinator.photoExtension = null;
    }
    // concatenar prefix de telefono
    if (this.data_coordinator.phoneNumber != '' && this.prefix) {
      this.data_coordinator.phoneNumber = `${this.prefix}+${this.data_coordinator.phoneNumber}`
    }
    // concatenar prefix de telefono
    if (this.data_coordinator.personalInformation.personalPhone != '' && this.prefixPersonal) {
      this.data_coordinator.personalInformation.personalPhone = `${this.prefixPersonal}+${this.data_coordinator.personalInformation.personalPhone}`
    }
    console.log('numero con prefix personal', this.data_coordinator.personalInformation.personalPhone);

    console.log('numero con prefix', this.data_coordinator.phoneNumber);
    console.log("data a guardar: ", this.data_coordinator);

    if (this.data_coordinator.name != "") {
      if (this.data_coordinator.immigration || this.data_coordinator.relocation) {
        if (this.data_coordinator.personalInformation.currentAddress) {
          this._services.service_general_put("Profile/UpdateProfile", this.data_coordinator).subscribe((data => {
            if (data.success) {
              console.log(data);
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Update Data"
                },
                width: "350px"
              });
              this.loader.hideLoader();
              this.temporalDocument = [];
              this.ngOnInit();
            }
          }), (err) => {
            console.log("error: ", err);
            this.loader.hideLoader()
          })
        }
        else {
          this.validaciones.address = true;
          document.getElementById("address").focus();
          this.loader.hideLoader()
        }
      }
      else {
        this.validaciones.serviceLine = true;
        window.scrollTo(0, 0);
        this.loader.hideLoader();
      }
    }
    else {
      this.validaciones.name = true;
      document.getElementById("name").focus();
      this.loader.hideLoader();
    }
  }

  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

}
class dataCoordinatorModel {
  id: number = 0;
  areasCoverage: null;
  photo: string = "";
  photoExtension: null;
  supplierType: null;
  supplierPartner: null;
  amountPerHour: null;
  currency: null;
  creditTerms: null;
  taxesPercentage: null;
  togglePayment: boolean = false; //adicional
  vip: null;
  responsablePremierOffice: number = 0;
  immigration: boolean = true;
  relocation: boolean = true;
  name: string = "";
  lastName: string = "";
  motherLastName: string = "";
  title: number = 0;
  phoneNumber: string = "";
  email: string = "";
  city: number = 0;
  country: number = 0;
  comments: null;
  professionalBiography: null;
  userId: number = 0;
  createdBy: null;
  createdDate: Date;
  updatedBy: number = 0;
  updatedDate: Date;
  areasCoverageNavigation: null;
  cityNavigation: null;
  supplierTypeNavigation: null;
  user: UserModel[] = [];
  personalInformation: personalInformationModel;
  offices: officesModel[] = [];
  operationLeaderCreatedByNavigations: operationLeaderCreatedByNavigationsModel[] = [];
  countryServices: countryServicesModel[] = [];
  documentConsultantContactsConsultants: documentConsultantContactsConsultantsModel[] = [];
  languagesConsultantContactsConsultants: languagesConsultantContactsConsultantsModel[] = [];
  vehicleConsultants: vehicleConsultantsModel[] = [];
  // auxiliar
  additional: additionalModel[] = [];

}
class operationLeaderCreatedByNavigationsModel {
  createdBy: number = 0;
  consultant: number = 0;
}

class UserModel {
  email: string = "";
  password: string = "";
  name: string = "";
  lastName: string = "";
  motherLastName: string = "";
  mobilePhone: string = "";
  roleId: number = 0;
  userTypeId: number = 0;
  serviceLineId: number = 0;
  avatar: string = "";
  reset: boolean = true;
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class personalInformationModel {
  id: number = 0;
  country: number = 0;
  city: number = 0;
  hobbiesPassions: string = "";
  currentAddress: string = "";
  zipCode: number = 0;
  dateBirth: Date;
  nationality: string = "";
  personalEmail: string = "";
  personalPhone: string = "";
  allergies: string = "";
  school: string = "";
  major: string = "";
  graduation: Date;
  totalCompesation: number = 0;
  rhComments: string = "";
  generalComments: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updatedBy: number = 0;
  updatedDate: Date;
  compesationBenefits: compesationBenefitsModel[] = [];
  documentProfiles: documentProfilesModel[] = [];
  emergencyContacts: emergencyContactsModel[] = [];
  paymentInformationProfiles: paymentInformationProfilesModel[] = [];
}
class officesModel {
  consultant: number = 0;
  office1: number = 0;
  office1Navigation: office1NavigationModel[] = [];
}

class office1NavigationModel {
  id: number = 0;
  office: string = "";
  image: string = "";
  imageExtension: string = "";
  country: number = 0;
  city: number = 0;
  address: string = "";
  zip: string = "";
  phone: string = "";
  email: string = "";
  currency: number = 0;
  createdBy: number = 0;
  createdDate: Date;
  updatedBy: number = 0;
  updatedDate: Date;
}
class countryServicesModel {
  consultant: number = 0;
  country: number = 0;
}
class documentConsultantContactsConsultantsModel {
  id: number = 0;
  consultantContactsService: number = 0;
  fileName: string = "";
  filePath: string = "";
  fileExtension: string = "";
  documentType: number = 0;
  expirationDate: Date;
  location: string = "";
  privacy: number = 0;
  status: number = 0;
  createdBy: number = 0;
  createdDate: Date;
  updatedBy: number = 0;
  updatedDate: Date;
}
class languagesConsultantContactsConsultantsModel {
  consultantContactsService: number = 0;
  language: any = [];
}

class compesationBenefitsModel {
  id: number = 0;
  profile: number = 0;
  placeWork: number = 0;
  baseCompesation: number = 0;
  currency: number = 0;
  taxes: number = 0;
  benefit: number = 0;
  ammount: number = 0;
  frequency: number = 0;
}
class documentProfilesModel {
  id: number = 0;
  profile: number = 0;
  fileRequest: string = "";
  fileExtension: string = "";
  documentType: number = 0;
  uploadedDate: Date;
  expirationDate: Date;
  location: string = "";
  status: number = 0;
  privacy: true
}
class emergencyContactsModel {
  id: number = 0;
  profile: number = 0;
  contactName: string = "";
  relationship: number = 0;
  phoneNumber: string = "";
  homeNumber: string = "";
  location: string = "";
}
class vehicleConsultantsModel {
  id: number = 0;
  consultantContactsConsultant: number = 0;
  vehicleType: number = 0;
  vehicleMake: string = "";
  vehicleModel: string = "";
  year: number = 0;
  plateNumber: string = "";
  color: string = "";
  capacity: number = 0;
  numberDoor: number = 0;
  airConditioner: boolean = true;
  createdBy: number = 0;
  createdDate: Date;
  updatedBy: number = 0;
  updatedDate: Date;
}
class paymentInformationProfilesModel {
  id: number = 0;
  profile: number = 0;
  wireTransfer: boolean = true;
  fiscalInvoice: boolean = true;
  accountType: number = 0;
  accountHoldersName: string = "";
  bankName: string = "";
  accountNumber: number = 0;
  routingNumber: number = 0;
  swiftBicCode: string = "";
  currency: number = 0;
  clabe: number = 0;
  wireFeeApprox: number = 0;
  bankAddress: string = "";
  internationalPaymentAcceptance: boolean = true;
  createdBy: number = 0;
  createdDate: Date;
  updatedBy: number = 0;
  updatedDate: Date;
  wire: boolean = false;
  wireTransferProfiles
  creditCardPaymentInformationProfiles = []
}

// adicional para gregar lenguajes
class additionalModel {
  consultantContactsService: number = 0;
  language: number = 0;
}
