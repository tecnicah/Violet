import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogAddCountryComponent } from '../dialog/dialog-add-country/dialog-add-country.component';
import { DialogAddOfficeComponent } from '../dialog/dialog-add-office/dialog-add-office.component';
import { DialogProfileDocumentComponent } from '../dialog/dialog-profile-document/dialog-profile-document.component';
import { DialogEmergencyContactComponent } from '../dialog/dialog-emergency-contact/dialog-emergency-contact.component';
import { DialogAddVahicleConsultantComponent } from '../dialog/dialog-add-vahicle-consultant/dialog-add-vahicle-consultant.component';
import { LoaderComponent } from 'app/shared/loader';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddOperationLeaderComponent } from '../dialog/dialog-add-operation-leader/dialog-add-operation-leader.component';
import { DialogAddAssignedTeamComponent } from '../dialog/dialog-add-assigned-team/dialog-add-assigned-team.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogCropImageComponent } from '../dialog/dialog-crop-image/dialog-crop-image.component';


@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit {

  ca_assignedTeam = [];
  ca_countryLeader = [];
  ca_cliente = [];
  temporalDocument: any[] = [];
  show: boolean = false;
  user: any;
  loader: LoaderComponent = new LoaderComponent();
  data_coordinator: any = {
    additional: []
  };
  constructor(public router: Router, public _services: ServiceGeneralService, public _routerParams: ActivatedRoute, public _dialog: MatDialog, private _permissions: NgxPermissionsService) { }
  id;

  validaNumericos(event) {
    console.log("valid");
    if (event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' ||
      event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
      event.key == 'Backspace') {
      return true;
    }

    return false;
  }
  ca_countryPersonelInfo:Array<any> = [];

  //CONSULTA CIUDAD//
  ca_city_ = [];
  getCity_() {
    this._services.service_general_get('CountryAdminCenter/GetCityByCountryId?countryId=' + this.data_coordinator.personalInformation.country).subscribe((data => {
      if (data.success) {
        this.ca_city_ = data.result;
      }
    }))
  }

  public filterCity: any = { city: '' };
  public filterCountry2: any = { name: '' };
  public filterCity2: any = { name: '' };
  public filterCountry: any = { name: '' };
  activeCountry: boolean = false;
  activeCity: boolean = false;
  ngOnInit(): void {
    this.initPageSettings()
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.id = this._routerParams.snapshot.params.id;
    console.log(this.id);
    this._services.service_general_get('Profile/GetProfile/' + this.id).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.data_coordinator = data.result;

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
          // document.getElementById('lead_client_avatar').setAttribute('src',this._services.url_images+this.data_coordinator.photo);
          const image = new Image();
          image.src = this._services.url_images + this.data_coordinator.photo;
          image.onload = function () {
            document.getElementById('lead_client_avatar').setAttribute('src', image.src);
          };

          image.onerror = function () {
            document.getElementById('lead_client_avatar').setAttribute('src', './../../../assets/avatar.png');
          };
        }
        let language_additional;
        this.data_coordinator.additional = [];
        if (this.data_coordinator.languagesConsultantContactsConsultants.length > 0) {
          language_additional = this.data_coordinator.languagesConsultantContactsConsultants;
          for (let j = 0; j < language_additional.length; j++) {
            this.data_coordinator.additional.push(language_additional[j].language);
          }
        }

        this.verificaNodos();

        if (this.data_coordinator.personalInformation.paymentInformationProfiles.length == 0) {
          this.data_coordinator.personalInformation.paymentInformationProfiles.push({
            "wireTransfer": null,
            "fiscalInvoice": null,
            "accountType": null,
            "accountHoldersName": "",
            "bankName": "",
            "accountNumber": null,
            "routingNumber": null,
            "swiftBicCode": "",
            "currency": null,
            "clabe": null,
            "wireFeeApprox": null,
            "bankAddress": "",
            "internationalPaymentAcceptance": null,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date()
          });
        } else {
          if (this.data_coordinator.personalInformation.paymentInformationProfiles[0].wireTransfer ||
            this.data_coordinator.personalInformation.paymentInformationProfiles[0].fiscalInvoice) {
            this.data_coordinator.togglePayment = true;
            this.show = true;
          }
        }
        // revisa si es consultor y tiene permisos en secciones
        this.consultantPermisos();
      }
      this.catalogos();
    }))

    this._services.service_general_get('Profile/GetAssignedTeam').subscribe((data => {
      if (data.success) {
        this.ca_assignedTeam = data.result.value;
      }
    }))


  }
  workingPlaceholder = './../../../assets/avatar.png';
  goBack() {
    window.history.back();
  }
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));

  public initPageSettings(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    const user_rol: string[] = [this.__userlog__.role.role];
    this._permissions.loadPermissions(user_rol);
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
  //*********************************************************************************//
  //FUNCION PARA CREAR NODOS QUE NO EXISTAN//
  verificaNodos() {
    if (!this.data_coordinator.personalInformation) {
      this.data_coordinator.personalInformation = {};
      if (!this.data_coordinator.personalInformation.paymentInformationProfiles) {
        this.data_coordinator.personalInformation.paymentInformationProfiles = [];
      }
    }

    if (!this.data_coordinator.personalInformation.emergencyContacts) {
      this.data_coordinator.personalInformation.emergencyContacts = [];
    }

    if (!this.data_coordinator.personalInformation.compesationBenefits) {
      this.data_coordinator.personalInformation.compesationBenefits = [];
    }
  }
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
  //CONSULTA CIUDAD//
  ca_city = [];
  getCity() {
    this._services.service_general_get('Catalogue/GetState?country=' + this.data_coordinator.country).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    }))
  }
  //*********************************************************************************//
  //FUNCION PARA EDICION DE FOTOGRAFIA//
  img(event) {
    const dialogRef = this._dialog.open(DialogCropImageComponent, {
      data: { image: "", name: "" },
      width: "70%",
      height: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined) {
        //console.log(event);
        const base64: any = result
        this.data_coordinator.photo = base64.split(',')[1];;
        this.data_coordinator.photoExtension = 'png';
        document.getElementById('lead_client_avatar').setAttribute('src', '' + base64);
      };
    });
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
    } else {
      this.show = false;
    }
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
        // console.log('img', this.ca_office[i].image);
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
      if (result.success) {
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
  //********************************************************************************//
  //FUNCION PARA AGREGAR NUEVO OPERATION LEADER//
  addOperationLeader() {
    const dialogRef = this._dialog.open(DialogAddOperationLeaderComponent, {
      data: this.data_coordinator.country,
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
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
  //FUNCION PARA AGREGAR NUEVO OPERATION LEADER//
  addAssignedTeam() {
    const dialogRef = this._dialog.open(DialogAddAssignedTeamComponent, {
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.createdBy = this.data_coordinator.id
        this.data_coordinator.operationLeaderConsultantNavigations.push(result);
      }
    })
  }
  //FUNCION PARA ELIMINAR OPERATION LEADER//
  deleteAssignedTeam(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Member?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_coordinator.operationLeaderConsultantNavigations.splice(i, 1);
      }
    })
  }
  //********************************************************************************//
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
      this.data_coordinator.photoExtension = '';
    }
    console.log("data a guardar: ", this.data_coordinator);

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
      this.loader.hideLoader();
    })
  }

  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }
}
