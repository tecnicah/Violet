import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddVahicleConsultantComponent } from '../dialog/dialog-add-vahicle-consultant/dialog-add-vahicle-consultant.component';
import { DialogEmergencyContactComponent } from '../dialog/dialog-emergency-contact/dialog-emergency-contact.component';
import { DialogProfileDocumentComponent } from '../dialog/dialog-profile-document/dialog-profile-document.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from 'app/shared/loader';
import { NgxPermissionsService } from 'ngx-permissions';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-profile-consultant',
  templateUrl: './profile-consultant.component.html',
  styleUrls: ['./profile-consultant.component.scss']
})
export class ProfileConsultantComponent implements OnInit {

  loader:LoaderComponent = new LoaderComponent();
  user:any;
  mostrar:boolean = false;
  show:boolean = false;
  data_consultant : any = {
    additional : [],
    photo: '',
    photoExtension: '',
    personalInformation : {
      compesationBenefits: [],
      documentProfiles: [],
      emergencyContacts: [],
      paymentInformationProfiles:[]
    },
    assignedTeamAssignedByNavigations: [],
    assignedTeamAssignedToNavigations: [],
    offices:[],
    operationLeaderConsultantNavigations:[],
    operationLeaderCreatedByNavigations:[],
    countryServices:[],
    documentConsultantContactsConsultants:[],
    languagesConsultantContactsConsultants:[],
    vehicleConsultants: []
  };
  temporalDocument:any[] =[];
  id_covertura: number = 0;
  id: any;

  typePrefix = {
    countriesName: '',
  }
  typePrefixPersonal = {
    countriesName: '',
  }
  public prefix;
  public prefixPersonal;

  // filtros
  public filterTitle: any = { title: '' };
  public filterCountry: any = { name: '' };
  public filterCity: any = { city: '' };
  public filterCountry2: any = { name: '' };
  public filterCity2: any = { city: '' };







  constructor(private sanitizer:DomSanitizer, public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams: ActivatedRoute, private _permissions: NgxPermissionsService) { }

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

  public id_pais:any = 0;
  public disabled_select:boolean = false;
  
  ngOnInit(): void {
    this.loader.showLoader();
    // limpiar buscadorprefix
    this.typePrefix.countriesName = '';
    this.typePrefixPersonal.countriesName = '';

    this.initPageSettings()
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.id_covertura = Number(localStorage.getItem('id_coverture'));
    this.id_pais = Number(localStorage.getItem('id_pais'));
    this.id = this._routerParams.snapshot.params.id;
    console.log(this.id);
    console.log(this.id_covertura);
    if(this.id_covertura != 0){
      if(this.id_pais != 0){ 
        this.disabled_select = true; 
        this.data_consultant.country = this.id_pais;
        this.getCity();
      }
      this.data_consultant.id = 0;
      this.catalogos();
      this.paymentMethod();
      this.loader.hideLoader();
    } else if(this.id_covertura == 0 && this.id != "New"){
      this._services.service_general_get('Profile/GetProfile/' + Number(this.id)).subscribe((data => {
        if (data.success) {
          console.log(data.result);
          this.data_consultant = data.result;
          if(this.id_pais != 0){
            this.disabled_select = true; 
            this.data_consultant.country = this.id_pais;
            this.getCity();
          }
          // revisa si es consultor y tiene permisos en secciones
          this.consultantPermisos();
          // separar prefix de phone number
          // si el valor de mobilephone no es mayor a 10 caracteres entonces no tiene prefijo y toma el valor actual desde la bd asi vienen con prefijo  93+6567567567 o sin 6567567567
          if (this.data_consultant.phoneNumber != '' && this.data_consultant.phoneNumber != null)
          {
            let search = '+';
            // obtener la posicion de +
            let posicion = this.data_consultant.phoneNumber.indexOf(search);
            // obtener el valor de prefix
            this.prefix = this.data_consultant.phoneNumber.substr(0, posicion);
            // obtener valor phone
            this.data_consultant.phoneNumber = this.data_consultant.phoneNumber.substr(posicion + 1);
          }
          // phone personal
          if (this.data_consultant.personalInformation != null  && this.data_consultant.personalInformation.personalPhone != '' && this.data_consultant.personalInformation.personalPhone != null)
          {
            let search = '+';
            // obtener la posicion de +
            let posicion = this.data_consultant.personalInformation.personalPhone.indexOf(search);
            // obtener el valor de prefix
            this.prefixPersonal = this.data_consultant.personalInformation.personalPhone.substr(0, posicion);
            // obtener valor phone
            this.data_consultant.personalInformation.personalPhone = this.data_consultant.personalInformation.personalPhone.substr(posicion + 1);
          }


          this.getCity();
          if(this.data_consultant.personalInformation != null){
            this.getCity_();
          }
          this.loader.hideLoader();
          if(this.data_consultant.photo != null && this.data_consultant.photo != ""){
            document.getElementById('lead_client_avatar').setAttribute('src',this._services.url_images+this.data_consultant.photo);
          }
          console.log('foto', this.data_consultant.photo);
          let language_additional;
          this.data_consultant.additional = [];
          if(this.data_consultant.languagesConsultantContactsConsultants.length > 0){
            language_additional = this.data_consultant.languagesConsultantContactsConsultants;
            for (let j = 0; j < language_additional.length; j++) {
              this.data_consultant.additional.push(language_additional[j].language);
            }
          }

          this.verificaNodos();

          if(this.data_consultant.personalInformation.paymentInformationProfiles.length == 0){
            this.data_consultant.personalInformation.paymentInformationProfiles.push({
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
          }else{
            if(this.data_consultant.personalInformation.paymentInformationProfiles[0].wireTransfer ||
              this.data_consultant.personalInformation.paymentInformationProfiles[0].fiscalInvoice){
              this.data_consultant.togglePayment = true;
              this.show = true;
            }
          }
        }
        this.catalogos();
      }))
    }else{
      this.data_consultant.id = 0;
      this.catalogos();
      this.paymentMethod();
      this.loader.hideLoader();
    }

  }
  goBack() {
    window.history.back();
  }
  public __userlog__:any = JSON.parse( localStorage.getItem('userData') );
  public initPageSettings():void {
		this.user = JSON.parse(localStorage.getItem('userData'));
		const user_rol:string[] = [this.__userlog__.role.role];
		this._permissions.loadPermissions( user_rol );
	}
  //VERIFICA NODOS//
  verificaNodos(){
    console.log("ENTRA AVERIFICAR NODOS");
    if(this.data_consultant.personalInformation == null){
       this.data_consultant.personalInformation = {};
       if(!this.data_consultant.personalInformation.paymentInformationProfiles){
            this.data_consultant.personalInformation.paymentInformationProfiles = [];
       }
     }

     if(!this.data_consultant.personalInformation.emergencyContacts){
      this.data_consultant.personalInformation.emergencyContacts = [];
     }

     if(!this.data_consultant.personalInformation.compesationBenefits){
       this.data_consultant.personalInformation.compesationBenefits = [];
     }
  }

  //FUNCION PARA HACER PAYMENT INFORMATION//
  paymentMethod(){
    this.data_consultant.personalInformation.paymentInformationProfiles.push({
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
  ca_vehicle = [];
  ca_privacy = [];
  ca_documentType = [];
  ca_documentStatus = [];
  ca_relation = [];
  ca_supplierType = [];
  async catalogos() {
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
    //this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this._services.service_general_get('AdminCenter/GetRelationshipContact').subscribe(resp => {
      if (resp.success) {
        console.log('get emergency contact', resp);
        this.ca_relation = resp.result;
      }
    });
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
    this.ca_vehicle = await this._services.getCatalogueFrom('GetVehicleType');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
    this.ca_documentStatus = await this._services.getCatalogueFrom('GetDocumentStatus');

    this._services.service_general_get('Catalogue/GetSupplierType/3').subscribe((data => {
      if(data.success){
        this.ca_supplierType = data.result;
      }
    }))

    this._services.service_general_get('Catalogue/GetDocumentType/3').subscribe((data => {
      if (data.success) {
          this.ca_documentType = data.result;
      }
    }))

    this.ca_duration = duration.filter(function(E){
       if(E.recurrence != null){
         return true;
       }
    })
  }
  //*********************************************************************************//
  //CONSULTA CIUDAD//
  ca_city = [];
  getCity(){
    this._services.service_general_get('Catalogue/GetState?country=' + this.data_consultant.country).subscribe((data => {
      if (data.success) {
          this.ca_city = data.result;
      }
    }))
  }

  //CONSULTA CIUDAD//
  ca_city_ = [];
  getCity_(){
    this._services.service_general_get('Catalogue/GetState?country=' + this.data_consultant.personalInformation.country).subscribe((data => {
      if (data.success) {
          this.ca_city_ = data.result;
      }
    }))
  }

  // verificar si el user logeado es consultor para ocultar informacion personal
  public permisosConsultant: boolean = false;
  consultantPermisos(){
    if(this.user.role.id == 3){
      // this.id es el id logeado
      if(this.user.id != this.data_consultant.userId){

        this.permisosConsultant = true;
      }else{
        this.permisosConsultant = false;
      }
    }
    else{
      this.permisosConsultant = false;
    }
  }
  //*********************************************************************************//
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
        this.data_consultant.photo = encoded;
        this.data_consultant.photoExtension = ext[1];
        document.getElementById('lead_client_avatar').setAttribute('src',''+reader.result);
    };
  }
  //*********************************************************************************//
  //FUNCION PARA AGREGAR  NUEVO VEHICULO//
  addVehicle(){
    const dialogRef = this._dialog.open(DialogAddVahicleConsultantComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.data_consultant.vehicleConsultants.push(result);
      }
    });
  }
  //FUNCION PARA EDICION DE VEHICULO//
  editVehicle(data, i){
    const dialogRef = this._dialog.open(DialogAddVahicleConsultantComponent, {
      width: "90%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
         this.data_consultant.vehicleConsultants[i] = result;
      }
    });
  }
  //*********************************************************************************//
  //AGREGAR NUEVO CONTACTO DE EMERGENCIA//
  addContact(){
    const dialogRef = this._dialog.open(DialogEmergencyContactComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_consultant.personalInformation.emergencyContacts.push(result);
      }
      else {
        console.log(result);
      }
    });
  }
  //*********************************************************************************//
  //EDITAR CONTACTO DE EMERGENCIA//
  editContact(data,i){
    const dialogRef = this._dialog.open(DialogEmergencyContactComponent, {
      width: "90%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.data_consultant.personalInformation.emergencyContacts[i] = result;
      }
    });
  }
  //*********************************************************************************//
  //FUNCION PARA AGREGAR NUEVO BENEFIT//
  addBenefit(){
    this.data_consultant.personalInformation.compesationBenefits.push({
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
  addDocument(){
    const dialogRef = this._dialog.open(DialogProfileDocumentComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.temporalDocument.push(result);
      }
    });
  }
  //ELIMINAR DOCUMENTO//
  deleteDocument(i){
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
        this.temporalDocument.splice(i,1);
      }
    })
  }
  //*********************************************************************************//
  //FUNCION PARA PAYMENT INFORMATION//
  paymentInformation(event){
    //  console.log(event);
     if(event.checked){
        this.show = true;
     }else{
        this.show = false;
     }
  }
  //NOMBRE DEL TIPO DE VIHICULO//
  getVehicle(id){
    for (let i = 0; i < this.ca_vehicle.length; i++) {
      if(this.ca_vehicle[i].id==id){
       return this.ca_vehicle[i].type
      }
    }
  }
  //FUNCIONA PARA TRAER NOMBRE DE PRIVACIDAD//
  getNamePrivacy(id){
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if(this.ca_privacy[i].id == id){
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
     if(this.ca_documentType[i].id == id){
        return this.ca_documentType[i].documentType;
     }
   }
 }
 //FUNCION PARA STATUS DEL DOCUMENTO//
 getDocumentStatus(id){
   for (let i = 0; i < this.ca_documentStatus.length; i++) {
     if(this.ca_documentStatus[i].id == id){
        return this.ca_documentStatus[i].status;
     }
   }
 }
 
 //********************************************************************************//
 //FUNCION PARA GUARDAR LA INFORMACION//
  save() {
    // concatenar prefix de telefono
    if ( this.data_consultant.phoneNumber != '' &&this.prefix) {
      this.data_consultant.phoneNumber = `${this.prefix}+${this.data_consultant.phoneNumber}`
    }
    console.log('numero con prefix', this.data_consultant.phoneNumber);
    if ( this.data_consultant.personalInformation.personalPhone != '' &&this.prefixPersonal) {
      this.data_consultant.personalInformation.personalPhone = `${this.prefixPersonal}+${this.data_consultant.personalInformation.personalPhone}`
    }
    console.log('numero con prefix', this.data_consultant.personalInformation.personalPhone);
    // guardar data_consultant.immigration o relocation dependiendo el supplier type
    // si suppliertype es = 3 es immi
    if (this.data_consultant.supplierType == 3) {
      this.data_consultant.immigration = true;
      this.data_consultant.relocation = false;
    }

      // supplier type 1 relocation
    else if (this.data_consultant.supplierType == 1) {
      this.data_consultant.immigration = false;
      this.data_consultant.relocation = true;
    }

    if(this.data_consultant.id == 0){
      this.insert_data();
    }else{
      this.update_data();
    }
 }


  // delete supplier
  deleteProfile(){
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
        this._services.service_general_delete(`Profile/${this.data_consultant.id}`).subscribe((data) =>{
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
 //********************************************************************************//
 //FUNCION PARA INSERTAR LA INFORMACION//
 insert_data(){
  this.loader.showLoader();
    if(this.data_consultant.additional.length > 0){
      this.data_consultant.languagesConsultantContactsConsultants = [];
      let languages = this.data_consultant.additional;
          if(languages.length > 0){
             for (let j = 0; j < languages.length; j++) {
              this.data_consultant.languagesConsultantContactsConsultants.push({
                "consultantContactsService": this.data_consultant.id,
                "language": languages[j]
              })
             }
          }
      }
      this.data_consultant.areasCoverage = this.id_covertura;
      if(this.id == 'New'){ this.data_consultant.areasCoverage = null; }
      this.data_consultant.documentConsultantContactsConsultants = [];
      this.data_consultant.documentConsultantContactsConsultants = this.temporalDocument;
      this.data_consultant.role_ID = 3;
      console.log("data a guardar: ", this.data_consultant);
      console.log("data a guardar: ", JSON.stringify(this.data_consultant));
      this.data_consultant.createdBy = this.user.id
      this.data_consultant.createdDate = new Date();
      this._services.service_general_post_with_url("Profile/AddProfile", this.data_consultant).subscribe((data => {
        if(data.success){
          console.log(data);
           const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Saved Data"
                },
                width: "350px"
              });
              this.loader.hideLoader();
              this.temporalDocument = [];
              this.router.navigateByUrl('/supplierPartners');
              //this.ngOnInit();
        }
      }),(err)=>{
        console.log("error: ", err);
      })
 }
 //********************************************************************************//
 //FUNCION PARA EDITAR LA INFORMACION//
  update_data(){
    this.data_consultant.user = null;
    this.loader.showLoader();
    if(this.data_consultant.additional.length > 0){
    //if(this.data_consultant.length > 0){
      this.data_consultant.languagesConsultantContactsConsultants = [];
      // let languages = this.data_consultant.additional;
      let languages = this.data_consultant.additional;
          if(languages.length > 0){
             for (let j = 0; j < languages.length; j++) {
              this.data_consultant.languagesConsultantContactsConsultants.push({
                "consultantContactsService": this.data_consultant.id,
                "language": languages[j]
              })
             }
          }
      }

      this.data_consultant.documentConsultantContactsConsultants = [];
      this.data_consultant.documentConsultantContactsConsultants = this.temporalDocument;
      this.data_consultant.updatedBy = this.user.id
      this.data_consultant.updatedDate = new Date();

      if(this.data_consultant.photo == null){
        this.data_consultant.photo = '';
        this.data_consultant.photoExtension = '';
      }

      console.log("data a guardar: ", this.data_consultant);
      console.log("data a guardar: ", JSON.stringify(this.data_consultant));
      this._services.service_general_put("Profile/UpdateProfile", this.data_consultant).subscribe((data => {
        if(data.success){
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
      }),(err)=>{
        console.log("error: ", err);
      })
  }

  ngOnDestroy(){
    console.log("remove id");
    localStorage.removeItem('id_coverture');
    localStorage.removeItem('id_pais');
  }

  getRelation(id){
    for (let i = 0; i < this.ca_relation.length; i++) {
      if(this.ca_relation[i].id == id){
         return this.ca_relation[i].relationship;
      }
    }
  }

  public __serverPath__:string = this._services.url_images;

  public openFileOnWindow( url_in:string ):void {
    const server_url:string = this.__serverPath__ + url_in;
    window.open( server_url );
  }



  public nso_ainfo_fields: any = {
    no_emai_val: false
  }
  

  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



  public validateEmail() {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(this.data_consultant.email)) {
      this.contador = 0;
    }else{
      this.contador++;
      this.activeEmail = true;
      this.data_consultant.email = '';
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "Wrong email format"
        },
        width: "350px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })
    }
  }

  public validateEmailServerAvailability(): void {
    if (this.data_consultant.email != '' && this.data_consultant.email != undefined && this.data_consultant.email != null) {
      this._services.service_general_get(`User/VeryfyEmail?email=${ this.data_consultant.email }`)
        .subscribe((response: any) => {
          console.log('Res => ', response);
          if (!response.success) {
            this.showGeneralMessageDialog(
              'Email already exists',
              'The email already exists, perhaps it has been used in any consultant.'
            );
            this.data_consultant.email = '';
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

  varFocus(){
     this.activeNumberLongitudPremier = false;
     this.activeNumberPremier = false;
  }
  //***************************************************************//
  //VALIDACIONES//
  activeAddress: boolean = false;
  activeCountry: boolean = false;
  activeCity: boolean = false;
  activeZipCode: boolean = false;
  activeBirth: boolean = false;
  activeNationality: boolean = false;
  activeEmail: boolean = false;
  activePrefix: boolean = false;
  activeNumber: boolean = false;
  contador = 0;
  active_responsablePremierOffice :boolean = false;
  active_name:boolean = false;
  active_title:boolean = false;
  active_email:boolean = false;
  active_country :boolean = false;
  active_city:boolean = false;
  activeNumberLongitud:boolean = false;
  activeNumberPremier:boolean = false;
  activeNumberLongitudPremier:boolean = false;
  activeType:boolean = false;
  activelanguages:boolean = false;
  activePrefixP:boolean = false;
  alergic:boolean = false;
 valida_form(){
   if(this.data_consultant.responsablePremierOffice == undefined || this.data_consultant.responsablePremierOffice == null || this.data_consultant.responsablePremierOffice == ''){
    this.contador++;
     this.active_responsablePremierOffice = true;
   }
   if(this.data_consultant.additional.length == 0){
    this.contador++;
     this.activelanguages = true;
   }
   if(this.data_consultant.supplierType == undefined || this.data_consultant.supplierType == null || this.data_consultant.supplierType == ''){
    this.contador++;
     this.activeType = true;
   }
   if(this.data_consultant.name == undefined || this.data_consultant.name == null || this.data_consultant.name == ''){
    this.contador++;
     this.active_name = true;
   }
   if(this.data_consultant.phoneNumber == undefined || this.data_consultant.phoneNumber == null || this.data_consultant.phoneNumber == ''){
    this.contador++;
     this.activeNumberPremier = true;
   }
   if(this.data_consultant.title == undefined || this.data_consultant.title == null || this.data_consultant.title == ''){
    this.contador++;
    this.active_title = true;
   }
   if(this.data_consultant.email == undefined || this.data_consultant.email == null || this.data_consultant.email == ''){
    this.contador++;
    this.active_email = true;
   }
   if(this.data_consultant.country == undefined || this.data_consultant.country == null || this.data_consultant.country == ''){
    this.contador++;
    this.active_country = true;
   }
   if(this.data_consultant.city == undefined || this.data_consultant.city == '' || this.data_consultant.city == null){
    this.contador++;
    this.active_city = true;
   }
  //PERSONAL INFORMATION//
  if(this.data_consultant.personalInformation.currentAddress == undefined || this.data_consultant.personalInformation.currentAddress == null || this.data_consultant.personalInformation.currentAddress == ''){
    this.activeAddress = true;
    this.contador++;
  }
  if(this.data_consultant.personalInformation.allergies == undefined || this.data_consultant.personalInformation.allergies == null || this.data_consultant.personalInformation.allergies == ''){
    this.alergic = true;
    this.contador++;
  }
  if(this.data_consultant.personalInformation.country == undefined || this.data_consultant.personalInformation.country == null || this.data_consultant.personalInformation.country == ''){
    this.activeCountry = true;
    this.contador++;
  }
  if(this.data_consultant.personalInformation.city == undefined || this.data_consultant.personalInformation.city == null || this.data_consultant.personalInformation.city == ''){
    this.activeCity = true;
    this.contador++;
  }
  if(this.data_consultant.personalInformation.zipCode == undefined || this.data_consultant.personalInformation.zipCode == null || this.data_consultant.personalInformation.zipCode == ''){
    this.activeZipCode = true;
    this.contador++;
  }
  if(this.data_consultant.personalInformation.dateBirth == undefined || this.data_consultant.personalInformation.dateBirth == null || this.data_consultant.personalInformation.dateBirth == ''){
    this.activeBirth = true;
    this.contador++;
  }
  if(this.data_consultant.personalInformation.nationality == undefined || this.data_consultant.personalInformation.nationality == null || this.data_consultant.personalInformation.nationality == ''){
    this.activeNationality = true;
    this.contador++;
  }
  if(this.data_consultant.personalInformation.personalEmail == undefined || this.data_consultant.personalInformation.personalEmail == null || this.data_consultant.personalInformation.personalEmail == ''){
    this.activeEmail = true;
    this.contador++;
  }
  if(this.prefixPersonal == undefined || this.prefixPersonal == null || this.prefixPersonal == ''){
    this.activePrefix = true;
    this.contador++;
  }
  if(this.prefix == undefined || this.prefix == null || this.prefix == ''){
    this.activePrefixP = true;
    this.contador++;
  }
  if(this.data_consultant.personalInformation.personalPhone == undefined || this.data_consultant.personalInformation.personalPhone == null || this.data_consultant.personalInformation.personalPhone == ''){
    this.activeNumber = true;
    this.contador++;
  }
  
  let aux_number = this.data_consultant.personalInformation.personalPhone;
    if(aux_number != undefined){
      let n = aux_number.toString();
      console.log(n);
      if(n.length > 20){
        this.activeNumberLongitud = true;
        this.contador++;
      }
    }
  

    let number_premier_ = this.data_consultant.phoneNumber;
    if(number_premier_ != undefined){
      let n_ = number_premier_.toString();
      console.log(n_);
      if(n_.length > 20){
        this.activeNumberLongitudPremier = true;
        this.contador++;
      }
    }
    

  if(this.contador == 0){
     this.save();
  }else{
    window.scrollTo(0,0);
    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Warning",
        body: "To save it is necessary to save all the requested fields"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
    
    })
    this.contador = 0;
    return;
  }
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

validate(){
  let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(this.data_consultant.personalInformation.personalEmail)) {
      this.contador = 0;
    }else{
      this.contador++;
      this.activeEmail = true;
      this.data_consultant.personalInformation.personalEmail = '';
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "Wrong email format"
        },
        width: "350px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })
    }
  }

  focusVar(){
    this.activeNumber=false;
    this.activeNumberLongitud = false; 
  }

 
}

