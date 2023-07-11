import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogNewContactComponent } from '../dialog/dialog-new-contact/dialog-new-contact.component';
import { DialogConsultantComponent } from '../dialog/dialog-consultant/dialog-consultant.component';
import { DialogWireTransferComponent } from '../dialog/dialog-wire-transfer/dialog-wire-transfer.component';
import { DialogDocumentProfileSupplierComponent } from '../dialog/dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from 'app/shared/loader';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogCropImageComponent } from '../dialog/dialog-crop-image/dialog-crop-image.component';

@Component({
  selector: 'app-supplier-services',
  templateUrl: './supplier-services.component.html',
  styleUrls: ['./supplier-services.component.css']
})
export class SupplierServicesComponent implements OnInit {
  public modulesQuill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered'}, { list: 'bullet' }]
    ]
  };

  public no_main_photo: boolean = false;
  id_serivice_: any;
  paymentSwitch: false;
  wireTransferSwitch: false;
  loader: LoaderComponent = new LoaderComponent();
  date: any;
  user: any;
  toppings = new FormControl();
  multipleCity = new FormControl();
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
  ca_contactType: any[] = [];
  ca_language: any[] = [];
  data: any = {
    "id": 0,
    "photo": '',
    "taxesPercentage":  1,
    "currency":2,
    "amountPerHour":0,
    "taxeName": " "
  };
  minDate: Date = new Date();
  htmlContent: any;
  schoolgrades_catalogue: any[]= [];
  languages_catalogue: any[] = [];

  constructor(public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams: ActivatedRoute) {}

  //*********************************************//
  public permission_read: boolean = false;
  public permission_write: boolean = false;
  public permission_delete: boolean = false;
  public permission_edit: boolean = false;
  consultaPermisos() {
    //console.log("CONSULTA PARA PERMISOS DE USUARIO");
    let url = localStorage.getItem('url_permisos');
    this._services.service_general_get('Role/' + url).subscribe(data => {
      if (data.success) {
        //console.log("Permisos: ", data.result.value)
        this.permission_read = data.result.value[0].reading;
        this.permission_write = data.result.value[0].writing;
        this.permission_edit = data.result.value[0].editing;
        this.permission_delete = data.result.value[0].deleting;
      }
    })
  }
  // filtros
  public filterSupplier: any = {
    supplierType: ''
  };
  public filterCurrency: any = {
    currency: ''
  };
  public filterCountry: any = {
    name: ''
  };
  public filterCity: any = {
    city: ''
  };

  //*********************************************//
  ngOnInit(): void {
    this.consultaPermisos();
    this.date = new Date();
    for (let i = 1; i <= 10; i++) {
      this.fleetSize.push(i);
    }
    this.user = JSON.parse(localStorage.getItem('userData'));
    /*
    this._services.service_general_get('Catalogue/GetSupplierTypeCatalogue?id=5&id=10&id=6&id=7&id=8&id=13&id=11&id=12').subscribe((data => {
      if (data.success) {
        this.ca_supplierType = data.result;
      }
    }));
    */
    this.catalogos();

    this.verificaNodos();
    
    if (this.data.photo != null && this.data.photo != '') {
      // document.getElementById('lead_client_avatar').setAttribute('src',this._services.url_images+this.data_coordinator.photo);
      const image = new Image();
      image.src = this._services.url_images + this.data.photo;
      image.onload = function () {
        document.getElementById('lead_client_avatar').setAttribute('src', image.src);
      };

      image.onerror = function () {
        document.getElementById('lead_client_avatar').setAttribute('src', './../../../assets/avatar.png');
      };
    }

    this.data.serviceLine = 2;

  }


  onChangedEditor(event: any): void {
    if (event.html) {
        this.htmlContent = event.html;
      }
  }
  
  //*************************************************************//
  verificaNodos() {
    if (!this.data.supplierPartnerDetails) {
      this.data.supplierPartnerDetails = [{
        "id": 0,
        "supplierPartnerProfileService": 0,
        "fleetSize": null,
        "numberDirvers": null,
        "armouredVehicles": false,
        "typeVehicles": null,
        "carSeatRental": null,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updatedBy": this.user.id,
        "updatedDate": new Date(),
        "typeVehiclesSupplierPartnerDetails": []
      }];
    }

    if (!this.data.areasCoverageServices) {
      this.data.areasCoverageServices = [];
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
  caCards: any[] = [];
  consultaInformacionServicio(id_serivice) {
    //console.log(typeof id_serivice);
    //console.log(id_serivice);
    if (id_serivice.trim() == '') {
      return true
    }
    this.loader.showLoader();
    this._services.service_general_get('SupplierPartnerProfile/GetService?key=' + id_serivice).subscribe((data => {
      if (data.success) {
        this.data = data.result;
        console.log("dataaaa",data.result);
        // revisa si es consultor y tiene permisos en secciones

        this.data.supplierPartnerDetails[0].grade = [];
        for (const iterator of data.result.relSupplierPartnerProfileServiceDetailGrades) {
          this.data.supplierPartnerDetails[0].grade.push(
             iterator.gradeId
          );
        }

        this.data.supplierPartnerDetails[0].language = [];
        for (const iterator of data.result.relSupplierPartnerProfileServiceDetailLanguages) {
          this.data.supplierPartnerDetails[0].language.push(
             iterator.languageId
          );
        }

        switch(this.data.supplierType) {
          case 34:
            this.type_document = 27;
            break;
          case 11:
            this.type_document = 28;
            break;
          case 13:
            this.type_document = 28;
            break;
          default:
            // code block
        }
    
        this._services.service_general_get('Catalogue/GetDocumentType/'+ this.type_document).subscribe((data => {
          if (data.success) {
            this.ca_documentType = data.result;
            //console.log(this.ca_documentType);
          }
        }));

        let photo_assing: string = this.data.photo;

          //console.log(photo_assing);
          if (photo_assing == undefined || photo_assing == null || photo_assing == '') {

            this.no_main_photo = true;

          }
          
        this.consultantPermisos();
        this.data.supplierPartnerDetails[0].vehiculo = [];
        if (this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails.length > 0) {
          for (let i = 0; i < this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails.length; i++) {
            this.data.supplierPartnerDetails[0].vehiculo.push(this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails[i].typeVehicles)
          }
        }

        if (this.data.areasCoverageServices.length > 0) {
          let city_additional;
          for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
            this.data.areasCoverageServices[i].additional = [];
            city_additional = this.data.areasCoverageServices[i].cityAreasCoverageServices;
            for (let j = 0; j < city_additional.length; j++) {
              this.data.areasCoverageServices[i].additional.push(city_additional[j].city);
            }
          }
        }

        for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
          const element = this.data.areasCoverageServices[i].country;
          this.getCity(element, i);
        }

        //console.log("esta es la consulta del servicio: ", this.data);
        for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
          if (this.data.areasCoverageServices[i].paymentInformationServices.length > 0) {
            debugger;
            for(let j = 0; j < this.data.areasCoverageServices[i].paymentInformationServices.length; j++)
            {
              if(this.data.areasCoverageServices[i].paymentInformationServices[j].creditCard){
                this.data.areasCoverageServices[i].payment = true;
                break;
              }
              if(this.data.areasCoverageServices[i].paymentInformationServices[j].cash){
                this.data.areasCoverageServices[i].payment = true;
                break;
              }
              if(this.data.areasCoverageServices[i].paymentInformationServices[j].checks){
                this.data.areasCoverageServices[i].payment = true;
                break;
              }
            }
            
          }
          if (this.data.areasCoverageServices[i].paymentInformationServices[0]?.wireTransferServices.length > 0) {
            this.data.areasCoverageServices[i].wire = true;
          }
        }

        this.ca_creditCard.forEach(E => {
          E.checked = false;
        });
        this.creditCardAux.forEach(E => {
          E.checked = false;
        });
        localStorage.setItem('card', JSON.stringify(this.creditCardAux));
        for (let j = 0; j < this.data.areasCoverageServices.length; j++) {
          this.caCards[j] = JSON.parse(localStorage.getItem('card'));
          let payment = this.data.areasCoverageServices[j].paymentInformationServices;
          for (let k = 0; k < payment.length; k++) {
            let credit_card = payment[k].creditCardPaymentInformationServices;
            for (let m = 0; m < credit_card.length; m++) {
              for (let i = 0; i < this.ca_creditCard.length; i++) {
                if (this.ca_creditCard[i].id == credit_card[m].creditCard) {
                  this.caCards[j][i].checked = true;
                }
              }
            }
          }
        }

        //console.log(this.caCards);
        this.loader.hideLoader();
        this.set_display_default_fields();
      }
    }))
  }
  //*************************************************************//
  AuxiliarCards() {
    this.ca_creditCard.forEach(E => {
      E.checked = false;
    });
    return this.ca_creditCard;
  }
  //*************************************************************//
  ca_taxes = [];
  ca_term = [];
  ca_currency = [];
  creditCardAux = [];
  type_document: number = 0;
  async catalogos() {
    this.schoolgrades_catalogue = await this._services.getCatalogueFrom('GetGradeSchooling');
    this.languages_catalogue = await this._services.getCatalogueFrom('GetLanguages');
    this.ca_typeSupplier = await this._services.getCatalogueFrom('GetSupplierType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.creditCardAux = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_methodPayment = await this._services.getCatalogueFrom('GetPaymentMethod');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_status = await this._services.getCatalogueFrom('GetSupplierPartnerProfileStatus');
    this.data.status = 8;
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_areacoverage = await this._services.getCatalogueFrom('GetAreaCoverageType');
    this.ca_vehiculo = await this._services.getCatalogueFrom('GetVehicleType');
    //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType');

    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_contactType = await this._services.getCatalogueFrom('GetContactType');
    this.ca_language = await this._services.getCatalogueFrom('GetLanguages');
    //this.ca_supplierType = await this._services.getCatalogueFrom('GetSupplierType');
    this.ca_taxes = await this._services.getCatalogueFrom('GetTaxePercentage');
    this.ca_term = await this._services.getCatalogueFrom('GetCreditTerm');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');

    this._services.service_general_get('Catalogue/GetSupplierType/2').subscribe((data => {
      if (data.success) {
        this.ca_supplierType = data.result;
      }
    }))

    this.id_serivice_ = this._routerParams.snapshot.params.id;
    if (this.id_serivice_ != 'nuevo') {
      this.consultaInformacionServicio(this.id_serivice_);
    }

  }

  display_default_fields:boolean = true;

  set_display_default_fields(){
    switch(this.data.supplierType) {
      case 34:
        this.type_document = 27;
        break;
      case 11:
        this.type_document = 28;
        break;
      case 13:
        this.type_document = 28;
        break;
      default:
        // code block
    }

    this._services.service_general_get('Catalogue/GetDocumentType/'+ this.type_document).subscribe((data => {
      if (data.success) {
        this.ca_documentType = data.result;
        //console.log(this.ca_documentType);
      }
    }));

   if(this.data.supplierType == 13 || this.data.supplierType == 11 || this.data.supplierType == 28 || 
    this.data.supplierType == 33 || this.data.supplierType == 27 || this.data.supplierType == 24 || 
    this.data.supplierType == 5 || this.data.supplierType == 9 || this.data.supplierType == 12 || this.data.supplierType == 34){
    this.display_default_fields = false;

   }
   else
   {
     this.display_default_fields = true;
   }

  }

  public previewSelectedPhoto(event: any, field_to_display: string, section: string = ''): void {

    const dialogRef = this._dialog.open(DialogCropImageComponent, {
      data: { image: "", name: "" },
      width: "70%",
      height: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
        if(result != undefined){
          this.no_main_photo = false;

          const field_photo: any = document.getElementById(field_to_display),
            //event_data: any = event.target.files[0],
            dependent_index: string = field_to_display.split('_')[3],
            root: any = this;

            const base64: any = result
            ////console.log(base64.split('.')[1]);
            this.data.photo =  base64.split(',')[1];
            this.data.photoExtension = "png";
          
            // setTimeout(() => field_photo.setAttribute('src', base64), 333);
            document.getElementById('lead_client_avatar').setAttribute('src', '' + base64);
        }
    });

  }

  serviceLineOption(id){
    debugger;
    if(id==1){
      this.data.immigration = true; 
    }
    else{
      this.data.relocation = true;
    }

  }
  
  //*************************************************************//
  newCampus(i) {

    // const dialogRef = this._dialog.open(DialogCampusComponent, {
    //   width: "90%",
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result.success) {
    //     //console.log(result);
    //     result.createdBy = this.user.id;
    //     result.createdDate = new Date();
    //     result.updatedBy = this.user.id;
    //     result.updatedDate = new Date();
    //     result.id = 0;
    //     result.areaCoverageId = this.data.areasCoverageServices[i].id;
    //     this.data.areasCoverageServices[i].campuses.push(result)
    //   }
    // });
  }
  // delete admin contact
  deleteAdminContact(id: number, i, k) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Administrative Contacts?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        if (id != 0) {
          this._services.service_general_delete(`SupplierPartnerProfile/Delete/Service/AdministrativeContact/${id}`).subscribe((data) => {
            //console.log('respuesta de eliminacion', data);
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: `Deleted Administrative contact`
                },
                width: "350px"
              });
              this.ngOnInit();
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
            this.ngOnInit();
          })
        } else {
          this.data.areasCoverageServices[i].administrativeContactsServices.splice(k, 1);
        }
      }
    });
  }
  // delete Consultant Contacts

  deleteConsultantContact(id: number, i, k) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Consultant Contacts?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        if (id != 0) {
          this._services.service_general_delete(`SupplierPartnerProfile/Delete/Service/ConsultantContacts/${id}`).subscribe((data) => {
            //console.log('respuesta de eliminacion', data);
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: `Deleted Consultant contact`
                },
                width: "350px"
              });
              this.ngOnInit();
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
        } else {
          this.data.areasCoverageServices[i].consultantContactsServices.splice(k, 1);
        }
      }
    });
  }
  //************************************************************//
  editCampus(i, datos, k) {
    // const dialogRef = this._dialog.open(DialogCampusComponent, {
    //   width: "90%",
    //   data: datos
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result.success) {
    //     //console.log(result);
    //     result.createdBy = this.user.id;
    //     result.createdDate = new Date();
    //     result.updatedBy = this.user.id;
    //     result.updatedDate = new Date();
    //     this.data.areasCoverageServices[i].campuses[k] = result;
    //   }
    // });
  }
  //*************************************************************//
  newContact(type, i) {
    if (this.data.areasCoverageServices[i].country == null ||
      this.data.areasCoverageServices[i].country == undefined ||
      this.data.areasCoverageServices[i].country == ''
    ) {

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
    const dialogRef = this._dialog.open(DialogNewContactComponent, {
      width: "90%",
      data: {
        country: this.data.areasCoverageServices[i].country,
        supplier_type: this.type_document
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        //console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        result.updatedBy = this.user.id;
        result.updatedDate = new Date();
        result.id = 0;
        result.areasCoverage = this.data.areasCoverageServices[i].id;
        this.data.areasCoverageServices[i].administrativeContactsServices.push(result)
      }
    });
  }
  //*************************************************************//
  newConsultant(i) {
    if ((this.data.areasCoverageServices[i].country == null) || (this.data.immigration == undefined && this.data.relocation == undefined)) {

      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To add contacts it is necessary to fill the service line of cupplier consuntant and the country of the coverage area"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {

      })

      return;

    }
    const dialogRef = this._dialog.open(DialogConsultantComponent, {
      width: "90%",
      data: {
        country: this.data.areasCoverageServices[i].country,
        immi: this.data.immigration,
        rel: this.data.relocation,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        //console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        result.updatedBy = this.user.id;
        result.updatedDate = new Date();
        result.id = 0;
        result.areasCoverage = this.data.areasCoverageServices[i].id;
        this.data.areasCoverageServices[i].consultantContactsServices.push(result)

      }
    });
  }
  //*************************************************************//
  addWireTransfer(i) {
    const dialogRef = this._dialog.open(DialogWireTransferComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.data.areasCoverageServices[i].paymentInformationServices[0].wireTransferServices.push(result);
        //console.log(this.data);
        debugger
      }
    });
  }
  //*************************************************************//
  getCity(data, i) {
    //console.log("consulta ciudad: ", data);
    this._services.service_general_get('Catalogue/GetState?country=' + data).subscribe((data => {
      if (data.success) {
        this.ca_city[i] = data.result;
      }
    }))
  }
  //*************************************************************//
  getCityName(city, i) {
    /*for (let j = 0; j < this.ca_city[i].length; j++) {
      const element = this.ca_city[i][j];
      if(element.id == city){
        return element.city;
      }
    }*/
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
  addAreaCoverage() {
    this.caCards.push(this.creditCardAux);
    //console.log(this.caCards);
    this.data.areasCoverageServices.push({
      "id": 0,
      "supplierPartnerProfileService": 0,
      "type": null,
      "country": null,
      "primaryCity": null,
      "currentAddress": null,
      "zipCode": null,
      "campuses": [],
      "administrativeContactsServices": [

      ],
      "consultantContactsServices": [

      ],
      "payment": false,
      "wire": false,
      "paymentInformationServices": [{
        "id": 0,
        "areasCoverageService": 0,
        "fiscalInvoice": null,
        "creditCard": null,
        "checks": null,
        "payToOrderOf": null,
        "cash": null,
        "comment": '',
        "generalComment": null,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updatedBy": this.user.id,
        "updatedDate": new Date,
        "creditCardPaymentInformationServices": [

        ],

        "wireTransferServices": [

        ],

      }],

      "documentAreasCoverageServices": [

      ],

      "cityAreasCoverageServices": [

      ],

      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date()
    });
  }
  //*************************************************************//
  pushData(data, i, event, j) {
    if (event.checked) {
      this.data.areasCoverageServices[i].paymentInformationServices[0].creditCardPaymentInformationServices.push({
        "paymentInformationService": 0,
        "creditCard": data.id,
      });
    } else {
      this.data.areasCoverageServices[i].paymentInformationServices[0].creditCardPaymentInformationServices.splice(j, 1);
    }
  }
  //*************************************************************//
  addNewDocument(i) {

    if (this.data.areasCoverageServices[i].primaryCity == null ||
      this.data.areasCoverageServices[i].primaryCity == undefined ||
      this.data.areasCoverageServices[i].primaryCity == ''
    ) {

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
        city: this.data.areasCoverageServices[i].primaryCity,
        supplier_type: this.type_document
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.areaCoverage = 0;
        this.data.areasCoverageServices[i].documentAreasCoverageServices.push(result);
        //console.log(this.data);
      }
    });
  }
  //*************************************************************//
  editPhoto() {
    document.getElementById('photoSup').click();
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
          //console.log(droppedFile.relativePath);
          //console.log(file, this.files);

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
        //console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  //*************************************************************//
  public fileOver(event) {
    //console.log(event);
  }
  //*************************************************************//
  public fileLeave(event) {
    //console.log(event);
  }
  //************************************************************//
  editWireTransfer(i, wire, k) {
    const dialogRef = this._dialog.open(DialogWireTransferComponent, {
      width: "90%",
      data: wire
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.data.areasCoverageServices[i].paymentInformationServices[0].wireTransferServices[k] = result;
        //console.log("Edicion de archivo: ", this.data);
      }
    });
  }
  //************************************************************//
  editAdmin(i, datos, k) {
    datos.country = this.data.areasCoverageServices[i].country
    const dialogRef = this._dialog.open(DialogNewContactComponent, {
      width: "90%",
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        //console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        result.updatedBy = this.user.id;
        result.updatedDate = new Date();
        this.data.areasCoverageServices[i].administrativeContactsServices[k] = result;
      }
    });
  }
  //************************************************************//
  editConsultant(i, datos, k) {
    datos.country = this.data.areasCoverageServices[i].country
    const dialogRef = this._dialog.open(DialogConsultantComponent, {
      width: "90%",
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        //console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        result.updatedBy = this.user.id;
        result.updatedDate = new Date();
        this.data.areasCoverageServices[i].consultantContactsServices[k] = result;
      }
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
  nameSupplier(id) {
    for (let i = 0; i < this.ca_typeSupplier.length; i++) {
      if (this.ca_typeSupplier[i].id == id) {
        return this.ca_typeSupplier[i].supplierType;
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
  //************************************************************//
  nameLanguage(data) {
    ////console.log("lenguajes: ", data);
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
  //VALIDACIONES//
  active_status: boolean = false;
  active_serviceLine: boolean = false;
  active_supplierType: boolean = false;
  active_comercialName: boolean = false;
  active_legalName: boolean = false;
  active_since: boolean = false;
  active_type: boolean = false;
  active_grade: boolean = false;
  active_language: boolean = false;
  seccionUno = 0;

  valida_form() {
    let contador = 0;
    this.seccionUno = 0;
    if(this.data.supplierType == 34){
      if (this.data.supplierPartnerDetails[0].grade == undefined || this.data.supplierPartnerDetails[0].grade == '' || this.data.supplierPartnerDetails[0].grade == null) {
        this.active_grade= true;
        this.seccionUno++;
        contador++;
      }

      if (this.data.supplierPartnerDetails[0].language == undefined || this.data.supplierPartnerDetails[0].language == '' || this.data.supplierPartnerDetails[0].language == null) {
        this.active_language= true;
        this.seccionUno++;
        contador++;
      }
    }

    if (this.data.status == undefined || this.data.status == '' || this.data.status == null) {
      this.active_status = true;
      this.seccionUno++;
      contador++;
    }
    debugger;
    this.data.relocation = true;
    if (this.data.immigration == undefined && this.data.relocation == undefined) {
      this.active_serviceLine = true;
      this.seccionUno++;
      contador++;
    }

    if (this.data.supplierType == undefined || this.data.supplierType == '' || this.data.supplierType == null) {
      this.active_supplierType = true;
      this.seccionUno++;
      contador++;
    }

    if (this.data.comercialName == undefined || this.data.comercialName == null || this.data.comercialName == '') {
      this.active_comercialName = true;
      this.seccionUno++;
      contador++;
    }

    if (this.data.legalName == undefined || this.data.legalName.length == '' || this.data.legalName.length == null) {
      this.active_legalName = true;
      this.seccionUno++;
      contador++;
    }

    if (this.data.supplierSince == undefined || this.data.supplierSince == '' || this.data.supplierSince == null) {
      this.active_since = true;
      this.seccionUno++;
      contador++;
    }

    if (this.seccionUno >= 1) {
      document.getElementById('seccion_uno').scrollIntoView();
      this.showtoast("It is necessary to fill all information requested");
      return;
    }

    if (this.data.areasCoverageServices.length == 0) {
      this.addAreaCoverage();
    }

    let validacion_area = false;
    for (let index = 0; index < this.data.areasCoverageServices.length; index++) {
      validacion_area = false;
      // if (this.data.areasCoverageServices[index].type == undefined || this.data.areasCoverageServices[index].type == '' || this.data.areasCoverageServices[index].type == null) {
      //   this.data.areasCoverageServices[index].typeValid = true;
      //   contador++;
      //   validacion_area = true;
      // }
      if (this.data.areasCoverageServices[index].country == undefined || this.data.areasCoverageServices[index].country == '' || this.data.areasCoverageServices[index].country == null) {
        this.data.areasCoverageServices[index].countryValid = true;
        contador++;
        validacion_area = true;
      }
      if (this.data.areasCoverageServices[index].primaryCity == undefined || this.data.areasCoverageServices[index].primaryCity == '' || this.data.areasCoverageServices[index].primaryCity == null) {
        this.data.areasCoverageServices[index].cityValid = true;
        contador++;
        validacion_area = true;
      }

      if (validacion_area == true) {
        document.getElementById('seccion_dos' + index).scrollIntoView();
        break;
      }

    }


    if (contador == 0) {
      //console.log("formulario valido, entra a guardar la informacion");
      this.save();
    } else {
      let msg = '';
      if (validacion_area == true) {
        msg = 'It is necessary to fill all information requested of Area of Coverage';
      } else {
        msg = "It is necessary to fill all information requested";
      }
      this.showtoast(msg);
    }
    //console.log(this.data)
  }
  //************************************************************//

  // this.data.relSupplierPartnerProfileServiceDetailGrades.push({
  //   id: 0,
  //   supplierPartnerProfileServiceId: 0,
  //   gradeId: 1
  // },
  // {
  //   id: 0,
  //   supplierPartnerProfileServiceId: 0,
  //   gradeId: 2
  // });

  // this.data.relSupplierPartnerProfileServiceDetailLanguages.push({
  //   id: 0,
  //   supplierPartnerProfileServiceId: 0,
  //   languageId: 1
  // },
  // {
  //   id: 0,
  //   supplierPartnerProfileServiceId: 0,
  //   languageId: 2
  // });


  changeModelGrade(){
    console.log(this.data.supplierPartnerDetails[0].grade)
    this.data.relSupplierPartnerProfileServiceDetailGrades = [];
    for (const iterator of this.data.supplierPartnerDetails[0].grade) {
      this.data.relSupplierPartnerProfileServiceDetailGrades.push(
        {
          id: 0,
          supplierPartnerProfileServiceId: 0,
          gradeId: parseInt(iterator)
        }
      );
    }
  }

  changeModelLanguage(){
    console.log(this.data.supplierPartnerDetails[0].language)
    this.data.relSupplierPartnerProfileServiceDetailLanguages = [];
    for (const iterator of this.data.supplierPartnerDetails[0].language) {
      this.data.relSupplierPartnerProfileServiceDetailLanguages.push(
        {
          id: 0,
          supplierPartnerProfileServiceId: 0,
          languageId: parseInt(iterator)
        }
      );
    }
  }
  
  save() {
    this.loader.showLoader();
    this.data.createdBy = this.user.id;
    this.data.createdDate = new Date();
    this.data.updatedBy = this.user.id;
    this.data.updatedDate = new Date(); 
    console.log("DATA a guardar: ", this.data);
    //console.log(this.toppings);

    if (this.data.supplierPartnerDetails[0].vehiculo != undefined && this.data.supplierPartnerDetails[0].vehiculo.length > 0) {
      this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails = [];
      for (let i = 0; i < this.data.supplierPartnerDetails[0].vehiculo.length; i++) {
        this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails.push({
          "supplairPartnerDetail": this.data.supplierPartnerDetails[0].id,
          "typeVehicles": this.data.supplierPartnerDetails[0].vehiculo[i]
        })
      }
    }

    if (this.data.areasCoverageServices.length > 0) {
      for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
        if (this.data.areasCoverageServices[i].additional) {
          let additionalCity = this.data.areasCoverageServices[i].additional;

          if (additionalCity.length > 0) {
            for (let j = 0; j < additionalCity.length; j++) {
              this.data.areasCoverageServices[i].cityAreasCoverageServices.push({
                "areasCoverageService": this.data.areasCoverageServices[i].id,
                "city": additionalCity[j]
              })
            }
          }
        }
      }
    }

    //console.log("DATA: ", this.data);
    //console.log(JSON.stringify(this.data));


    if (this.data.id == 0) {
      //console.log("ENTRA A POST");

      console.log("PostService", this.data);
      
      // this.data.relSupplierPartnerProfileServiceDetailGrades = [];
      // this.data.relSupplierPartnerProfileServiceDetailLanguages = [];

      // this.data.relSupplierPartnerProfileServiceDetailGrades.push({
      //   id: 0,
      //   supplierPartnerProfileServiceId: 0,
      //   gradeId: 1
      // },
      // {
      //   id: 0,
      //   supplierPartnerProfileServiceId: 0,
      //   gradeId: 2
      // });

      // this.data.relSupplierPartnerProfileServiceDetailLanguages.push({
      //   id: 0,
      //   supplierPartnerProfileServiceId: 0,
      //   languageId: 1
      // },
      // {
      //   id: 0,
      //   supplierPartnerProfileServiceId: 0,
      //   languageId: 2
      // });

      this.data.supplierPartnerDetails[0].grade = null;
      this.data.supplierPartnerDetails[0].language = null;
      this._services.service_general_post_with_url('SupplierPartnerProfile/PostService', this.data).subscribe(data => {
        //console.log("save supplier: ", data);
        if (data.success) {
          //console.log(data);
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
        else{
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Error",
              body: "Invalid Information, Please contact to support"
            },
            width: "350px"
          });
          this.loader.hideLoader();
        }
      },(err)=>{
        console.log("error en SupplierPartnerProfile/PostService ========", err);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
              body: "Invalid Information, Please contact support"
          },
          width: "350px"
        });
        this.loader.hideLoader();
      });
    } else {
      this.verificab64();
    }
  }
  //************************************************************//
  verificab64() {
    for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
      let documentos = this.data.areasCoverageServices[i].administrativeContactsServices;
      for (let j = 0; j < documentos.length; j++) {
        let doc = documentos[j].documentAdministrativeContactsServices;
        documentos[j].documentAdministrativeContactsServices = [];
        for (let k = 0; k < doc.length; k++) {
          if (doc[k].id == 0) {
            this.data.areasCoverageServices[i].administrativeContactsServices[j].documentAdministrativeContactsServices.push(doc[k])
          }
        }
      }
    }


    for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
      let documentos = this.data.areasCoverageServices[i].consultantContactsServices;
      for (let j = 0; j < documentos.length; j++) {
        let doc = documentos[j].documentConsultantContactsServices;
        documentos[j].documentConsultantContactsServices = [];
        for (let k = 0; k < doc.length; k++) {
          if (doc[k].id == 0) {
            this.data.areasCoverageServices[i].consultantContactsServices[j].documentConsultantContactsServices.push(doc[k])
          }
        }
      }
    }

    for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
      let documentos = this.data.areasCoverageServices[i].consultantContactsServices;
      for (let j = 0; j < documentos.length; j++) {
        let docVehicle = documentos[j].vehicleServices;
        for (let k = 0; k < docVehicle.length; k++) {
          let doc = docVehicle[k].documentVehicleServices;
          docVehicle[k].documentVehicleServices = [];
          for (let r = 0; r < doc.length; r++) {
            if (doc[r].id == 0) {
              this.data.areasCoverageServices[i].consultantContactsServices[j].vehicleServices[k].documentVehicleServices.push(doc[r])
            }
          }
        }
      }
    }

    for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
      let documentos = this.data.areasCoverageServices[i].consultantContactsServices;
      for (let j = 0; j < documentos.length; j++) {
        let docVehicle = documentos[j].vehicleServices;
        for (let k = 0; k < docVehicle.length; k++) {
          let doc = docVehicle[k].photosVehicleServices;
          docVehicle[k].photosVehicleServices = [];
          for (let r = 0; r < doc.length; r++) {
            if (doc[r].id == 0) {
              this.data.areasCoverageServices[i].consultantContactsServices[j].vehicleServices[k].photosVehicleServices.push(doc[r])
            }
          }
        }
      }
    }

    for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
      let documentos = this.data.areasCoverageServices[i].documentAreasCoverageServices;
      this.data.areasCoverageServices[i].documentAreasCoverageServices = [];
      for (let j = 0; j < documentos.length; j++) {
        if (documentos[j].id == 0) {
          this.data.areasCoverageServices[i].documentAreasCoverageServices.push(documentos[j])
        }
      }
    }

    this.updateDate();
  }
  //************************************************************//
  updateDate() {
    this.data.supplierPartnerDetails[0].grade = null;
    this.data.supplierPartnerDetails[0].language = null;
    this._services.service_general_put('SupplierPartnerProfile/PutService', this.data).subscribe((data => {
      //console.log("save supplier: ", data);
      if (data.success) {
        //console.log(data);
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
  //************************************************************//
  deleteDocument(i, a) {
    //console.log("Entra a eliminar documento: ", i, a);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete the document"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        this.data.areasCoverageServices[i].documentAreasCoverageServices.splice(a, 1);
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

  deleteWireTransfer(i, wire, k) {
    //console.log("este es i  ", i);
    //console.log("este es wire  ", wire);
    //console.log("este es k  ", k);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete the Wire Transfer"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        if (wire.id && wire.id != 0) {
          this._services.service_general_delete('SupplierPartnerProfile/Delete/Service/WireTransfer/' + wire.id).subscribe((data) => {
            //console.log('respuesta de eliminacion', data);
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: `Success Wiretransfer deleted`
                },
                width: "350px"
              });
            }
            this.data.areasCoverageServices[i].paymentInformationServices[0].wireTransferServices.splice(k, 1);
          }, (error) => {
            console.error('error con el delete', error);
          })
        } else {
          this.data.areasCoverageServices[i].paymentInformationServices[0].wireTransferServices.splice(k, 1);
        }
      }
    })
  }

  downloadPdf(base64String, fileName, ext) {
    const source = 'data:application/' + ext + ';base64,' + base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = fileName + '.' + ext;
    link.click();
  }
  onClickDownloadPdf(b64, ext) {
    let base64String = b64;

    this.downloadPdf(base64String, "archivo", ext);
  }

  deleteCovertura(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Area of Coverage?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.areasCoverageServices.splice(i, 1);
      }
    });
  }

  showtoast(msg) {
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
