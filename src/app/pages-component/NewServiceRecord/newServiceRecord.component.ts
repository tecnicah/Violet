import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { LoaderComponent } from '../../../app/shared/loader';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewServiceOrderDialog } from '../dialog/new-services-record-dialogs/new-service-order.component';
import { Router, Resolve } from '@angular/router';
import { DialogSearchProfileComponent } from '../dialog/search-profile/search-profile.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { DialogNsrTableDetail } from '../dialog/new-services-record-dialogs/nsr-table-detail.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DialogExportComponent } from '../dialog/dialog-export/dialog-export.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { PdfMakeWrapper, Table, Img, Cell, Columns, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { EntryVisaComponent } from '../dialog/entry-visa/entry-visa.component';
import { DialogWorkPermitComponent } from '../dialog/dialog-work-permit/dialog-work-permit.component';
import { DialogVisaDeregistrationComponent } from '../dialog/dialog-visa-deregistration/dialog-visa-deregistration.component';
import { DialogResidencyPermitComponent } from '../dialog/dialog-residency-permit/dialog-residency-permit.component';
import { DialogDocumentManagementComponent } from '../dialog/dialog-document-management/dialog-document-management.component';
import { DialogLocalDocumentationComponent } from '../dialog/dialog-local-documentation/dialog-local-documentation.component';
import { OtherImmigrationComponent } from '../dialog/other-immigration/other-immigration.component';
import { DialogCortporateAssistance } from '../dialog/corporate-assistance/corporate-assistance.component';
import { DialogLegalReviewConsultation } from '../dialog/legal-review-consultation/legal-review-consultation.component';
import { NotificationDialog } from '../dialog/notification/notification.component';
import { DialogRenewal } from '../dialog/renewal/renewal.component';
import { DialogBundleComponent } from '../dialog/dialog-bundle/dialog-bundle.component';
import { TenancyManagementComponent } from '../dialog/tenancy-management/tenancy-management.component';
import { OtherComponent } from '../dialog/other/other.component';
import { PropertyManagementComponent } from '../dialog/property-management/property-management.component';
import { HomePurchaseComponent } from '../dialog/home-purchase/home-purchase.component';
import { HomeSaleComponent } from '../dialog/home-sale/home-sale.component';
import { LegalRenewalComponent } from '../dialog/legal-renewal/legal-renewal.component';
import { DialogAirportTransportationComponent } from '../dialog/dialog-airport-transportation/dialog-airport-transportation.component';
import { DialogTransportationComponent } from '../dialog/dialog-transportation/dialog-transportation.component';
import { DialogRentalFurnitureComponent } from '../dialog/dialog-rental-furniture/dialog-rental-furniture.component';
import { DialogDepartureComponent } from '../dialog/dialog-departure/dialog-departure.component';
import { PreDecisionOrientationComponent } from '../dialog/pre-decision-orientation/pre-decision-orientation.component';
import { AreaOrientationComponent } from '../dialog/area-orientation/area-orientation.component';
import { HomeFindingComponent } from '../dialog/home-finding/home-finding.component';
import { SettlingInComponent } from '../dialog/settling-in/settling-in.component';
import { SchoolSearchComponent } from '../dialog/school-search/school-search.component';
import { DialogTemporaryHousingComponent } from '../dialog/dialog-temporary-housing/dialog-temporary-housing.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogCropImageComponent } from '../dialog/dialog-crop-image/dialog-crop-image.component';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'new-service-record-component',
  templateUrl: './newServiceRecord.component.html',
  styleUrls: ['./newServiceRecord.component.scss']
})

export class NewServiceRecordComponent implements OnInit {

  public hostImm    = [];
  public hostRelo = [];
  public homeImm    = [];
  public homeRelo = [];
  _viewSupplierImm: any[] = [];
  _viewSupplierRelo: any[] = [];
  public _viewCoordinadorImm: string[]= [];
  public _viewCoordinadorRelo: string[]= [];

  homeCountry: string = "";
  services: any = {
    service_name: '',
    numberWorkOrder: '',
    number_server: ''
  };

  services_consult: any = {
    country: '',
    service: this.services = []
  };

  // seccion de searc
  public filterPartner0: any = {
    coordinator: ''
  };
  public filterClient0: any = {
    name: ''
  };
  public filterCountry: any = {
    name: ''
  };
  public filterCity: any = {
    city: ''
  };
  public filterCoordinator: any = {
    coordinator: ''
  };
  public filterSupplierPart: any = {
    name: ''
  };

  minDate: Date = new Date();

  constructor(
    public _router: Router,
    public dialog: MatDialog,
    public _services: ServiceGeneralService,
    private _snackBar: MatSnackBar
  ) { }

  p: any = {
    total: 0,
    pagina: 1
  };
  /* 1. Globals */
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sort') sort: MatSort;
  // @ViewChild(MatSort, {static: false}) sort: MatSort;


  public loader: LoaderComponent = new LoaderComponent();

  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  city_home_catalogue: any[] = [];
  city_home_catalogue_home: any[] = [];
  city_hosts_catalogue: any[] = [];
  // public session_aut:SessionSettings = new SessionSettings( this._router );
  //public displayedColumns: string[] = ['service_record', 'service_line','vip', 'status', 'autho_date', 'country', 'city', 'partner', 'client', 'assigne_name', 'services', 'coordinator', 'supplier'];

  public displayedColumns: string[] = ['service_record', 'service_line', 'vip', 'status', 'autho_date', 'city', 'partner', 'assigne_name', 'services', 'coordinator', 'consultor'];



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild('paginatorElement', {
  //   read: ElementRef
  // }) paginatorHtmlElement: ElementRef;



  public USERDATA: any;
  public dataSource;
  filteruno: boolean = false;
  // search of select option
  public filterOffice: any = {
    office: ''
  };
  public filterPartner: any = {
    coordinator: ''
  };
  public filterClient: any = {
    name: ''
  };
  public filterNationality: any = {
    nationality1: ''
  };
  public filterMarital: any = {
    name: ''
  };
  public filterPolicy: any = {
    policyType: ''
  };
  public filterHomeCountry: any = {
    name: ''
  };
  public filterHomeCity: any = {
    name: ''
  };
  public filterLanguages: any = {
    name: ''
  };
  public filterHostCountry: any = {
    name: ''
  };
  public filterHostCity: any = {
    city: ''
  };
  public filterRelationship: any = {
    relationship: ''
  };
  public filterLanguagesRe: any = {
    name: ''
  };
  public filterNationalityRe: any = {
    nationality1: ''
  };
  public filterGrade: any = {
    grade: ''
  };
  public filterPet: any = {
    petType: ''
  };
  public filterBreed: any = {
    breed: ''
  };
  public filterSize: any = {
    size: ''
  };
  public filterWeight: any = {
    name: ''
  };
  public filterImiAutori: any = {
    name: ''
  };
  public filterImiCoordina: any = {
    coordinatorType: ''
  };
  public filterImiCoordina2: any = {
    coordinator: ''
  };
  public filterImiSupplier: any = {
    type: ''
  };
  public filterImiSupplierCompany: any = {
    comercialName: ''
  };
  public filterImiSupplier2: any = {
    name: ''
  };
  public filterImiAssignedService: any = {
    assignedService: ''
  };
  public filterReloAutori: any = {
    name: ''
  };
  public filterReloCoordina: any = {
    coordinatorType: ''
  };
  public filterReloCoordina2: any = {
    coordinator: ''
  };
  public filterReloSupplier: any = {
    type: ''
  };
  public filterReloSupplierCompany: any = {
    comercialName: ''
  };
  public filterReloSupplier2: any = {
    name: ''
  };
  public filterReloAssignedService: any = {
    assignedService: ''
  };
  public today = new Date();
  typePrefix = {
    countriesName: ''
  }
  public prefix = "";
  public prefixWork = "";

  public prefixCatalog;
  maxall: number = 20;
  url_image: string;

  check = 'assets/table-icons/check.png';
  uncheck = 'assets/table-icons/uncheck.png';
  ngOnInit() {
    this.consultaPermisos();
    this.url_image = environment.images_path;
    if (this.isUserActive()) {
      this.getTodayDay();
      this.getCatalogues();
      this.getServiceRecordTableData();
    } else {
      this._router.navigateByUrl('');
    }
  }

  getPageSizeOptions() {
    if (this.service_records_table_data?.paginator.length > this.maxall) {
      return [10, 20, this.service_records_table_data?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }

  getPageSizeOptionsImmi() {
    if (this.table_imm_sup_par?.paginator.length > this.maxall) {
      return [10, 20, this.table_imm_sup_par?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }
  //*****************************************************************//
  validaNumericos(event) {
    console.log("valid");
    if (event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' ||
      event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
      event.key == 'Backspace') {
      return true;
    }

    return false;
  }

  public info_row: any = {};
  viewData(elementImm, elementRelo) {
    console.log(elementImm.length + elementRelo.length)
    this._viewSupplierImm = [];
    this._viewSupplierRelo = [];
    if(elementImm.length > 0){
        elementImm.forEach(element => {
        this._viewSupplierImm.push(element);
      });
    }
    if(elementRelo.length > 0){
        elementRelo.forEach(element => {
        this._viewSupplierRelo.push(element);
      });
    }
  }

  viewCoordinador(elementImm, elementRelo){
    console.log(elementImm, elementRelo)
    this._viewCoordinadorImm = [];
    this._viewCoordinadorRelo = [];
      if(elementImm.length > 0){
        elementImm.forEach(element => {
        this._viewCoordinadorImm.push(element);
      });
    }
      if(elementRelo.length > 0){
        elementRelo.forEach(element => {
        this._viewCoordinadorRelo.push(element);
      });
    }
  }
  
  public info_country: any = {};
  viewCity(data) {
        this.info_country.hostCountry = data.country;
        this.info_country.hostCity = data.city;
        this.info_country.homeCountry = data.homeCountry;
        this.info_country.homeCity = data.cityHomeName;
  }

  public info_partner: any = {};
  viewPartner(data) {
    ////debugger;
    this.info_partner.partner = data.partner;
    this.info_partner.client = data.client;
    this.info_partner.clientAvatar = data.clientAvatar;
  }
  //*****************************************************************//
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
  //*****************************************************************//
  goBack() {
    window.history.back();
  }


  /* 2. Functionality */

  public caServiceLine: any[] = [];
  public country_catalogue: any = [];
  public country_catalogue_home: any = [];
  public nationality_catalogue: any = [];
  public state_catalogue: any = [];
  public city_catalogue: any = [];
  public status_catalogue: any = [];
  public client_catalogue: any = [];
  public supplier_catalogue: any = [];
  public suppliertype_catalogue: any = [];
  public suppliercompany_catalogue: any = [];
  public parther_catalogue: any = [];
  public authorize_catalogue: any = [];
  public marital_catalogue: any = [];
  public assigment_catalogue: any = [];
  public policytype_catalogue: any = [];
  public relationship_catalogue: any = [];
  public languages_catalogue: any = [];
  public pettype_catalogue: any = [];
  public breed_catalogue: any = [];
  public petsize_catalogue: any = [];
  public weightmeasure_catalogue: any = [];
  public gender_catalogue: any = [];
  public coordinator_catalogue: any = [];
  public coordinatortype_catalogue: any = [];
  public assduration_catalogue: any = [];
  public cacliente: any[] = [];
  public schoolgrades_catalogue: any[] = [];
  public office_catalogues: any[] = [];
  sp_catalog: any[] = [];

  public async getCatalogues(): Promise<void> {
    this.sp_catalog = await this._services.getCatalogueFrom('GetSupplierPartnerType');
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
    console.log("prefixCatalog",this.prefixCatalog);
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.country_catalogue_home = await this._services.getCatalogueFrom('Generic/Countries');
    this.nationality_catalogue = await this._services.getCatalogueFrom('Nationalities');
    this.state_catalogue = await this._services.getCatalogueFrom('GetState');
    this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
    this.suppliertype_catalogue = await this._services.getCatalogueFrom('GetSupplierType');
    this.parther_catalogue = await this._services.getCatalogueFrom('GetPartner');
    this.marital_catalogue = await this._services.getCatalogueFrom('GetMaritalStatus');
    this.assigment_catalogue = await this._services.getCatalogueFrom('GetAssignedService');
    this.assduration_catalogue = await this._services.getCatalogueFrom('GetDurationForServiceRecord');
    this.policytype_catalogue = await this._services.getCatalogueFrom('GetPolicyType');
    this.relationship_catalogue = await this._services.getCatalogueFrom('GetRelationship');
    this.languages_catalogue = await this._services.getCatalogueFrom('GetLanguages');
    this.pettype_catalogue = await this._services.getCatalogueFrom('GetPetType');
    this.petsize_catalogue = await this._services.getCatalogueFrom('GetSize');
    this.weightmeasure_catalogue = await this._services.getCatalogueFrom('GetWeightMeasure');
    this.gender_catalogue = await this._services.getCatalogueFrom('GetSex');
    this.coordinatortype_catalogue = await this._services.getCatalogueFrom('GetCoordinatorType');
    this.caServiceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.schoolgrades_catalogue = await this._services.getCatalogueFrom('GetGradeSchooling');
    this.office_catalogues = await this._services.getCatalogueFrom('GetOffice');

    this._services.service_general_get("Catalogue/GetUserTo?user=" + this.USERDATA.id).subscribe((data => {
      if (data.success) {
        this.cacliente = data.result.value;
      }
    }));

    this._services.service_general_get("Catalog/GetAllUsersNew?role=3").subscribe((data => {
      if (data.success) {
        this.supplier_catalogue = data.result.value;
      }
    }));
  }


  getNameCountry(id) {
    for (let i = 0; i < this.country_catalogue.length; i++) {
      if (this.country_catalogue[i].id == id) {
        return this.country_catalogue[i].name;
      }
    }
  }

  athorizedBy() {
    if (this.new_service_record_data.assigneeInformations[0].homeCountryId == null ||
      this.new_service_record_data.assigneeInformations[0].homeCityId == null ||
      this.new_service_record_data.partnerId == null) {
      return true;
    }
    this._services.service_general_get("Catalogue/GetAuthorizedBy/" + this.new_service_record_data.partnerId + "/" + this.new_service_record_data.assigneeInformations[0].homeCountryId + "/" + this.new_service_record_data.assigneeInformations[0].homeCityId).subscribe((data => {
      if (data.success) {
        console.log("select authorized by: ", data.result.value);
        this.authorize_catalogue = data.result.value;
      }
    }));
  }

  getClient() {
    this._services.service_general_get("Catalogue/GetClient/" + this.filter_data.partner).subscribe((data => {
      if (data.success) {
        console.log("select cliente: ", data.result.value);
        this.client_catalogue = data.result.value;
      }
    }));
  }

  getClientNew() {
    this._services.service_general_get("Catalogue/GetClient/" + this.new_service_record_data.partnerId).subscribe((data => {
      if (data.success) {
        console.log("select cliente: ", data.result.value);
        this.client_catalogue = data.result.value;
      }
    }));
  }

  getCoordinator() {
    if (this.filter_data.serviceLine == "" || this.filter_data.client == "") {
      return true;
    }
    this._services.service_general_get("Catalogue/GetCoordinator/" + this.filter_data.client + "?servileLine=" + this.filter_data.serviceLine).subscribe((data => {
      if (data.success) {
        console.log("select coordinator: ", data.result);
        this.coordinator_catalogue = data.result.value;
      }
    }));
  }
  //getCoordinatorNew
  getCoordinatorImmigration() {
    this._services.service_general_get("Catalogue/GetCoordinator/" + this.new_service_record_data.partnerId + "?servileLine=" + 1).subscribe((data => {
      if (data.success) {
        console.log("select coordinator new SR Immigration: ", data.result);
        this.coordinator_catalogue = data.result.value;
      }
    }));
  }

  coordinator_catalogue_rel = [];
  getCoordinatorRelocation() {
    this._services.service_general_get("Catalogue/GetCoordinator/" + this.new_service_record_data.partnerId + "?servileLine=" + 2).subscribe((data => {
      if (data.success) {
        console.log("select coordinator new SR relocation: ", data.result);
        this.coordinator_catalogue_rel = data.result.value;
      }
    }));
  }

  public manageLoaderMoments(): void {

    setTimeout(() => {

      const validate_items: any = {
        item_a: this.parther_catalogue,
        item_b: this.client_catalogue,
        item_c: this.country_catalogue,
        item_d: this.policytype_catalogue,
        item_e: this.relationship_catalogue,
        item_f: this.pettype_catalogue
      }

      for (let item in validate_items) {

        if (validate_items[item].length == 0) {

          const dialogRef = this.dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'Error connection',
              body: 'Some elements can not be loaded, system will reload or try later.'
            },
            width: '420px'
          });

          dialogRef.afterClosed().subscribe(result => {

            //window.location.reload();

          });

          return;

        }

      }

    }, 777);

  }

  public service_records_table_data: any = undefined;
  public getServiceRecordTableData(params: string = ''): void {
    const params_in: string = params == '' ? '' : `?${params}`;
    this.loader.showLoader();
    this._services.service_general_get('ServiceRecord/GetServiceRecord/' + this.USERDATA.id + "?" + params)
      .subscribe((response: any) => {
        if (response.success) {
          response.map.value.forEach(element => {
            this._services.service_general_get(`ServiceRecord/SetStatusServiceRecord/${element.id}/2`)
            .subscribe((response: any) => {
              if (response.success) {
                element.status = response.result.item2;
                element.statusId = response.result.item1; 
              }

            }, (error: any) => {

              console.error('Error => ', error);

            });
          });
          setTimeout(() => { 
            
            this.p.total = response.map.value.length;
            this.service_records_table_data = new MatTableDataSource(response.map.value);
            this.service_records_table_data.paginator = this.paginator;
            this.service_records_table_data.sort = this.sort;
            this.loader.hideLoader();
          }, 2000);
        }
      }, (error: any) => {
        console.error('Error (GetServiceRecord) => ', error);
        this.showGeneralMessageDialog(
          'Error connection',
          'Some error has happen in your connection, please try again or later. System will reload.');
        setTimeout(() => {
        }, 4477);
        this.loader.hideLoader();
      });
  }

  public filter_data: FilterData = new FilterData();
  public service_record_params_selected: string = '';
  public filteringServiceRecordTable(): void {

    this.service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.start != '' && this.range.value.start != null) this.filter_data.startDate = this.filterDate(this.range.value.start);
    if (this.range.value.end != '' && this.range.value.end != null) this.filter_data.endDate = this.filterDate(this.range.value.end);
    ////debugger
    for (let item in this.filter_data) {

      if (this.filter_data[item] != '') {

        this.service_record_params_selected += `${item}=${this.filter_data[item]}&`;
        params = this.service_record_params_selected.substring(0, this.service_record_params_selected.length - 1);

      }

    }

    this.getServiceRecordTableData(params);

  }

  public cleanFilter(): void {
    this.filterPartner0 = {
      coordinator: ''
    };
    this.filterClient0 = {
      name: ''
    };
    this.filterCountry = {
      name: ''
    };
    this.filterCity = {
      city: ''
    };
    this.filterCoordinator = {
      coordinator: ''
    };
    this.filterSupplierPart = {
      name: ''
    };

    this.range.reset({
      start: '',
      end: ''
    });
    this.filter_data = new FilterData();
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.getServiceRecordTableData();

  }

  getcity(id) {
    this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe((data => {
      if (data.success) {
        this.city_catalogue = data.result;
      }
    }))
  }

  homeSelected: number = 0;
  getcityhome(id) {
    this.loader.showLoader();
    this._services.service_general_get("CountryAdminCenter/GetCityByCountryId?countryId=" + id).subscribe((data => {
      if (data.success) {
        this.city_home_catalogue = data.result;
        this.loader.hideLoader();
      }
    }))
    console.log(this.city_home_catalogue);

    if ((this.hostSelected != 0) && (this.validate_sups())) {
      const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Change confirmation",
          body: "If you change this option, partner providers will be eliminated. Do you want to continue?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.cleanSup();
        } else {
          this.loader.showLoader();
          this.new_service_record_data.assigneeInformations[0].homeCountryId = this.homeSelected;
          this._services.service_general_get("CountryAdminCenter/GetCityByCountryId?countryId=" + this.new_service_record_data.assigneeInformations[0].homeCountryId).subscribe((data => {
            if (data.success) {
              this.city_home_catalogue = data.result;
              this.loader.hideLoader();
            }
          }))
        }
      });
    } else {
      this.homeSelected = this.new_service_record_data.assigneeInformations[0].homeCountryId;
    }
  }

  cleanSup() {
    this.new_service_record_data.relocationSupplierPartners = [];
    this.table_rel_sup_par = null;

    this.new_service_record_data.immigrationSupplierPartners = [];
    this.table_imm_sup_par = null;
    ////debugger;
  }


  public validate_coord(): boolean {

    let exisr_coord: boolean = true;

    const validations: any = {
      imm_form: this.getImmigrationValidation(),
      rel_form: this.getRelocationValidation()
    };

    if (!validations.imm_form && !validations.rel_form) {
      exisr_coord = false;
    }

    return exisr_coord;

  }

  cleanCoord() {
    this.rel_coordinator_model = new relocationCoordinators();

    this.imm_coordinator_model = new immigrationCoodinators();

    // this.rel_coordinator_model.coordinatorTypeId = '';
    // this.rel_coordinator_model.coordinatorId = '';
    // this.rel_coordinator_model.assigned = null;
    // this.rel_coordinator_model.coordinatorId ="0";
    


    // this.imm_coordinator_model.coordinatorTypeId = 0;
    // this.imm_coordinator_model.coordinatorId = 0;
    // this.imm_coordinator_model.assigned = null;
    // this.imm_coordinator_model.accepted = null;

  }

  public _current_partner;
  public _current_client;

  change_partner_client() {
    //alert();
    // console.log("this.validate_coord()", this.validate_coord())
    if (this.validate_coord()) {
      const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Change confirmation",
          body: "If you change this option, coordinators will be eliminated. Do you want to continue?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cleanCoord();
          this._current_partner = this.new_service_record_data.partnerId;
          this._current_client = this.new_service_record_data.clientId
        }
        else {
          this.new_service_record_data.partnerId = this._current_partner;
          this.new_service_record_data.clientId = this._current_client;
        }
      });
    }
    else {
      this._current_partner = this.new_service_record_data.partnerId;
      this._current_client = this.new_service_record_data.clientId
    }
  }

  validate_sups(): boolean {

    var ex_team_is_fill = false;
    //  console.log("host country ===============================TABLAS imm_coordinator_model: "
    //  ,this.imm_coordinator_model ,"rel_coordinator_model: "
    //  ,this.rel_coordinator_model ,"table_rel_sup_par: "
    //  ,this.table_rel_sup_par  ,"table_imm_sup_par: " //  , this.table_imm_sup_par, "imm_sup_model: " //  , this.imm_sup_model , "rel_sup_model"  //  , this.rel_sup_model
    //  ,"this.new_service_record_data.immigrationSupplierPartners: " , this.new_service_record_data.immigrationSupplierPartners
    //  , " this.new_service_record_data.relocationSupplierPartners: " ,  this.new_service_record_data.relocationSupplierPartners)

    if (this.new_service_record_data.immigrationSupplierPartners.length > 0) {
      ex_team_is_fill = true;
    }

    if (this.new_service_record_data.relocationSupplierPartners.length > 0) {
      ex_team_is_fill = true;
    }

    return ex_team_is_fill;
  }

  hostSelected: number = 0;
  getcityhost(id) {

    this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe((data => {
      if (data.success) {
        this.city_hosts_catalogue = data.result;
      }
    }))
    if ((this.hostSelected != 0) && (this.validate_sups())) {
      const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Change confirmation",
          body: "729 If you change this option, partner providers will be eliminated. Do you want to continue?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.cleanSup();
        } else {
          this.new_service_record_data.assigneeInformations[0].hostCountry = this.hostSelected;
        }
      });
    } else {
      this.hostSelected = this.new_service_record_data.assigneeInformations[0].hostCountry;
    }
  }

  hostCitySelect: number = 0;
  Hostcitychange() {
    if ((this.hostSelected != 0) && (this.validate_sups())) {
      const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Change confirmation",
          body: "759 If you change this option, partner providers will be eliminated. Do you want to continue?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.cleanSup();
        } else {
          this.new_service_record_data.assigneeInformations[0].hostCityId = this.hostCitySelect;
        }
      });
    } else {
      this.hostCitySelect = this.new_service_record_data.assigneeInformations[0].hostCityId;
    }
  }

  homeCitySelect: number = 0;
  Homecitychange() {
    if ((this.hostSelected != 0) && (this.validate_sups())) {
      const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Change confirmation",
          body: "783 If you change this option, partner providers will be eliminated. Do you want to continue?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.cleanSup();
        } else {
          this.new_service_record_data.assigneeInformations[0].homeCityId = this.homeCitySelect;
        }
      });
    } else {
      this.homeCitySelect = this.new_service_record_data.assigneeInformations[0].homeCityId;
    }
  }

  public filter_input_city: boolean = false;
  public async filterServiceRecordAble(which_field: string = ''): Promise<void> {

    switch (which_field) {

      case 'city':

        this.filter_data.country != '' ?
          this.filter_input_city = true :
          this.filter_input_city = false;

        const extra_param: string = `?state=${this.filter_data.country}`;

        this.city_catalogue = await this._services.getCatalogueFrom('GetState', extra_param);

        break;

      default:
        console.error('Error en la seleccion de campo');
        break;

    }

  }

  public SO_ID: number = null;
  public isUserActive(): boolean {

    let result: boolean = false;
    const user_in = localStorage.getItem('userData');

    if (user_in != undefined) {

      console.log(this.USERDATA);
      this.USERDATA = JSON.parse(user_in);
      this.SO_ID = this.USERDATA.id;
      console.log(this.USERDATA);
      result = true;

    } else {

      result = false;

    }

    return result;

  }

  public show_language_dropdown: boolean = false;
  public showLanguagesDropdow(): void {

    !this.show_language_dropdown ?
      this.show_language_dropdown = true :
      this.show_language_dropdown = false;

  }

  public user_languages: any[] = undefined;
  public initLanguageSelector(): void {

    this.user_languages = this.languages_catalogue;

    this.user_languages.forEach((language: any) => {

      language.active = false;

    });

  }

  public languages_selected: string = '';
  public selectingLanguages(language_in: any): void {

    !language_in.active ? language_in.active = true : language_in.active = false;

    const languages_in: string[] = [],
      label_length: number = 22;

    this.user_languages.forEach((language: any) => {

      if (language.active) {

        languages_in.push(language.name);

      }

    });

    this.languages_selected = languages_in.join(', ');

    this.languages_selected.length > label_length ?
      this.languages_selected = `${this.languages_selected.substring(0, label_length)}...` :
      this.languages_selected = `${this.languages_selected}.`;

    if (this.languages_selected.length == 1) this.languages_selected = '';

  }

  public assing_dependents: any[] = [];
  public addDepartament(): void {

    this.assing_dependents.push(new DependentInformationsModel());
    console.log(this.assing_dependents);
  }

  public removeDepartament(index: number): void {

    this.assing_dependents.splice(index, 1);

  }

  public assing_pets: PetsNavigationModel[] = [];
  public addPet(): void {

    this.assing_pets.push(new PetsNavigationModel());

  }

  public removePet(index: number): void {

    this.assing_pets.splice(index, 1);

  }

  public new_service_record_data: NewServiceRecordData = new NewServiceRecordData();
  public show_dependent_erros: boolean = false;
  public show_pets_erros: boolean = false;
  public imm_coordinator_model: immigrationCoodinators = new immigrationCoodinators();
  public rel_coordinator_model: relocationCoordinators = new relocationCoordinators();
  public data_sr_guardada: any;

  public addNewServiceRecord(): void {
    //debugger;
    this.imm_sup_model.createdBy = this.USERDATA.id;
    this.rel_sup_form.createdBy = this.USERDATA.id;
    this.show_dependent_erros = true;
    this.show_pets_erros = true;
    this.new_service_record_data.createdBy = this.USERDATA.id;
    const validations: any = {
      general_form: this.fieldsMustBeFill(),
      assing_form: this.assigneeFormValidation(),
      one_coordinator: this.atLeatsOneCoordinator(),
      assing_depen: this.validateDependents(),
      assing_pets: this.validatingPets()
    }

    this.changePageToSection(validations);

    console.log('Obj Validations ====> ', validations);
    console.log('Obj Sent ========> ', this.new_service_record_data);

    if (!validations.assing_depen) {

      let dependenttap = document.getElementById('tab_assign_section');
      dependenttap.click();
      this.scrollPageTo(0, 520);
      this.showDialogMessage('Dependents section must be completed');

    }

    if (this.new_service_record_data.assigneeInformations[0].mobilePhone != undefined &&
      this.new_service_record_data.assigneeInformations[0].mobilePhone != null) {
      if (this.prefix != "") {
        // this.new_service_record_data.assigneeInformations[0].mobilePhone.toString();

        this.new_service_record_data.assigneeInformations[0].mobilePhone = `${this.prefix}+${this.new_service_record_data.assigneeInformations[0].mobilePhone}`;
      }

    }

    if (this.new_service_record_data.assigneeInformations[0].workPhone != undefined &&
      this.new_service_record_data.assigneeInformations[0].workPhone != null) {
      if (this.prefixWork != "") {
        this.new_service_record_data.assigneeInformations[0].workPhone = `${this.prefixWork}+${this.new_service_record_data.assigneeInformations[0].workPhone}`;
      }

    }

    for (let i = 0; i < this.new_service_record_data.assigneeInformations[0].dependentInformations.length; i++) {
      const element = this.new_service_record_data.assigneeInformations[0].dependentInformations[i];
      if (this.new_service_record_data.assigneeInformations[0].dependentInformations[i].phone != null && this.new_service_record_data.assigneeInformations[0].dependentInformations[i].phone != undefined && this.new_service_record_data.assigneeInformations[0].dependentInformations[i].phone != '') {
        this.new_service_record_data.assigneeInformations[0].dependentInformations[i].phone.toString();
      }
    }
    if (
      validations.general_form &&
      validations.assing_form &&
      validations.one_coordinator &&
      validations.assing_depen &&
      validations.assing_pets) {

      this.loader.showLoader();
      this.getLanguagesData();
      this. getNationalityData();
      this.getLanguagesDependentsData();
      this.new_service_record_data.createdDate = new Date();
      if (this.new_service_record_data.immigrationCoodinators.length > 1) {
        this.new_service_record_data.immigrationCoodinators.splice(0, 1);
      }
      if (this.new_service_record_data.relocationCoordinators.length > 1) {
        this.new_service_record_data.relocationCoordinators.splice(0, 1);
      }
      console.log(this.new_service_record_data);
      console.log(JSON.stringify(this.new_service_record_data))
      ////debugger
      this._services.service_general_post_with_url('ServiceRecord/Create', this.new_service_record_data)
        .subscribe((response: any) => {

          this.loader.hideLoader();

          if (response.success) {

            const sr_response_data = response.result;

            this._services.service_general_get(
              `ServiceRecord/GetServiceRecordById?id=${sr_response_data.id}&user=${this.USERDATA.id}`)
              .subscribe((response: any) => {
                this.data_sr_guardada = response.result
                this.showModal(response.result);

              }, (error: any) => {

                console.error('WS Error (GetServiceRecordById) => ', error);

              });

          }

        }, (error: any) => {

          console.error('Error en el WS => ServiceRecord/Create');

          this.loader.hideLoader();

          this.showGeneralMessageDialog(
            'Error connection',
            'Some error has happen in your connection, please try again or later.');

        });

    }

  }

  public one_coordinator_selected: boolean = true;
  public atLeatsOneCoordinator(): boolean {

    let result: boolean = true;

    const validations: any = {
      imm_form: this.getImmigrationValidation(),
      rel_form: this.getRelocationValidation()
    };

    if (!validations.imm_form && !validations.rel_form) {

      this.one_coordinator_selected = false;
      result = false;
      this.showDialogMessage('You must fill at leats one coordinator: Immigration or Relocations');

    } else {

      this.one_coordinator_selected = true;

      if (validations.imm_form) {

        this.new_service_record_data.immigrationCoodinators.push(this.imm_coordinator_model);

      }

      if (validations.rel_form) {

        this.new_service_record_data.relocationCoordinators.push(this.rel_coordinator_model);

      }

    }

    return result;

  }

  public validateDependents(): boolean {

    let result: boolean = true;

    if (this.show_dependent_section) {

      this.new_service_record_data.assigneeInformations[0].dependentInformations = this.assing_dependents;
      this.getDependentAges();

      this.new_service_record_data.assigneeInformations[0].dependentInformations
        .forEach((dependent: any, index: number) => {

          if (dependent.relationshipId == "0") result = false;

          switch (dependent.relationship) {

            case '1':
              if (dependent.name == "") result = false;
              if (dependent.birth == "") result = false;
              if (dependent.languagesId == "") result = false;
              if (dependent.nationalityId == "") result = false;
              if (dependent.email == "") result = false;
              if (!this.validateEmail(dependent.email)) result = false;
              if (dependent.phone == "") result = false;
              break;

            case '2':
              if (dependent.name == "") result = false;
              if (dependent.birth == "") result = false;
              if (dependent.languagesId == "") result = false;
              if (dependent.nationalityId == "") result = false;
              if (dependent.currentGrade == "") result = false;
              break;

            case '3':
              if (dependent.ifOther == "") result = false;
              if (dependent.name == "") result = false;
              if (dependent.birth == "") result = false;
              if (dependent.languagesId == "") result = false;
              if (dependent.nationalityId == "") result = false;
              break;

          }

          console.log('Dep ===> ', dependent);

        });

    } else {

      this.new_service_record_data.assigneeInformations[0].dependentInformations = [];

    }

    return result;

  }

  type_company: any;
  type_companyId: any;

  public company_name(id) {
    this.supplier_catalogue_aux = JSON.parse(localStorage.getItem("catalogo"));
    ////debugger

    for (let i = 0; i < this.supplier_catalogue_aux.length; i++) {
      if (this.supplier_catalogue_aux[i].companyId == id) {
        return this.supplier_catalogue_aux[i].company;
      }
    }
  }

  public sup_name(id) {
    this.supplier_catalogue_aux = JSON.parse(localStorage.getItem("catalogo"));
    ////debugger

    for (let i = 0; i < this.supplier_catalogue_aux.length; i++) {
      if (this.supplier_catalogue_aux[i].id == id) {
        return this.supplier_catalogue_aux[i].name;
      }
    }
  }

  public sup_name_r(id) {
    this.supplier_catalogue_aux = JSON.parse(localStorage.getItem("catalogor"));
    ////debugger

    for (let i = 0; i < this.supplier_catalogue_aux.length; i++) {
      if (this.supplier_catalogue_aux[i].id == id) {
        return this.supplier_catalogue_aux[i].name;
      }
    }
  }

  public company_namer(id) {
    this.supplier_catalogue_aux = JSON.parse(localStorage.getItem("catalogor"));
    ////debugger

    for (let i = 0; i < this.supplier_catalogue_aux.length; i++) {
      if (this.supplier_catalogue_aux[i].companyId == id) {
        return this.supplier_catalogue_aux[i].company;
      }
    }
  }

  public company_() {
    for (let i = 0; i < this.supplier_catalogue.length; i++) {
      if (this.supplier_catalogue[i].id == this.imm_sup_model.supplierId) {
        this.type_company = this.supplier_catalogue[i].company;
        this.type_companyId = this.supplier_catalogue[i].companyId
      }
    }
  }

  type_company_relocation: any;
  type_companyId_relocation: any;
  public company_Relocation() {
    for (let i = 0; i < this.supplier_catalogue.length; i++) {
      if (this.supplier_catalogue[i].id == this.rel_sup_model.supplierId) {
        this.type_company_relocation = this.supplier_catalogue[i].company;
        this.type_companyId_relocation = this.supplier_catalogue[i].companyId
      }
    }
  }


  public getDependentAges(): void {

    this.new_service_record_data.assigneeInformations[0].dependentInformations
      .forEach((dependent: any, index: number) => {

        const age_container: any = document.getElementById(`dependent_age_${index}`);
        dependent.age = age_container.value;

      });

  }

  public validatingPets(): boolean {
    console.log("valida pets");
    let result: boolean = true;

    //const pets:any = this.new_service_record_data.assigneeInformations[0].petsNavigation;

    const pets: any = this.assing_pets;


    pets.forEach((pet: any) => {

      if (pet.age == '') result = false;
      if (pet.name == '') result = false;
      if (pet.breedId == '') result = false;
      if (pet.petTypeId == '') result = false;
      if (pet.weight == '') result = false;

    });

    if (this.show_pets_section) {

      this.new_service_record_data.assigneeInformations[0].petsNavigation = this.assing_pets;
      this.getPetsAges();

    } else {

      this.new_service_record_data.assigneeInformations[0].petsNavigation = [];
      result = true;

    }

    return result;

  }


  searchModal() {
    console.log("Entra a bucar perfil");
    const dialogRef = this.dialog.open(DialogSearchProfileComponent, {
      data: {

      },
      width: "95%"
    });
    dialogRef.afterClosed().subscribe((so_added: any) => {
      // location.reload();
    });
  }

  public getPetsAges(): void {

    this.new_service_record_data.assigneeInformations[0].petsNavigation
      .forEach((pet: any, index: number) => {

        const age_container: any = document.getElementById(`pet_${index}`);
        pet.age = age_container.value;

      });

  }

  public nso_fields: any = {
    no_init: false,
    no_iaut: false,
    no_part: false,
    no_clie: false,
    no_file: false,
    no_auto: false,
    no_offi: false
  }
  public fieldsMustBeFill(): boolean {
//debugger;
    let result: boolean = true;

    this.new_service_record_data.office == '' || this.new_service_record_data.office == null ?
      this.nso_fields.no_offi = true : this.nso_fields.no_offi = false;

    this.new_service_record_data.initialAutho == '' || this.new_service_record_data.initialAutho == null ?
      this.nso_fields.no_init = true : this.nso_fields.no_init = false;

    this.new_service_record_data.inithialAuthoAcceptance == '' || this.new_service_record_data.inithialAuthoAcceptance == null ?
      this.nso_fields.no_iaut = true : this.nso_fields.no_iaut = false;

    this.new_service_record_data.partnerId == null ?
      this.nso_fields.no_part = true : this.nso_fields.no_part = false;

    this.new_service_record_data.clientId == null ?
      this.nso_fields.no_clie = true : this.nso_fields.no_clie = false;

    this.new_service_record_data.clientFileNumber == null ?
      this.nso_fields.no_file = false : this.nso_fields.no_file = false;

    this.new_service_record_data.clientFileNumber == null ?
      this.new_service_record_data.clientFileNumber = 0 :
      this.new_service_record_data.clientFileNumber = this.new_service_record_data.clientFileNumber;

    /*this.new_service_record_data.authorizedBy == null ?
     this.nso_fields.no_auto = true : this.nso_fields.no_auto = false;*/

    for (let field in this.nso_fields) {

      if (this.nso_fields[field]) {

        this.showDialogMessage('All fields must be filled', 3000);
        result = false;

      }

    }

    return result;

  }

  public nso_ainfo_fields: any = {
    no_phot: false,
    no_name: false,
    no_emai: false,
    no_emai_val: false,
    /*
    no_sex: false,
    no_bdat: false,
    no_age: false,
    no_nati: false,
    no_stat: false,
    no_mpho: false,
    no_wpho: false,
    no_poli: false,
    no_adur: false,
    no_atim: false,
    no_idat: false,
    no_fmov: false,
    no_home: false,
    no_city: false,
    no_posi: false,
    no_hhos: false,
    no_chos: false,
    no_npos: false
    */
  }

  public assigneeFormValidation(): boolean {

    const form_data: AssigneeInformationModel = this.new_service_record_data.assigneeInformations[0],
      root: any = this;

    let result: boolean = true;

    !getImageAssign() ?
      this.nso_ainfo_fields.no_phot = true :
      this.nso_ainfo_fields.no_phot = false;

    form_data.assigneeName == '' ?
      this.nso_ainfo_fields.no_name = true :
      this.nso_ainfo_fields.no_name = false;

    form_data.email == "" ?
      this.nso_ainfo_fields.no_emai = true :
      this.nso_ainfo_fields.no_emai = false;

    !this.validateEmail(form_data.email) ?
      this.nso_ainfo_fields.no_emai_val = true :
      this.nso_ainfo_fields.no_emai_val = false;
    form_data.homeCountryId == null ?
      this.nso_ainfo_fields.no_home = true :
      this.nso_ainfo_fields.no_home = false;

    form_data.homeCityId == null ?
      this.nso_ainfo_fields.no_city = true :
      this.nso_ainfo_fields.no_city = false;

    form_data.hostCountry == null ?
      this.nso_ainfo_fields.no_hhos = true :
      this.nso_ainfo_fields.no_hhos = false;

    form_data.hostCityId == null ?
      this.nso_ainfo_fields.no_chos = true :
      this.nso_ainfo_fields.no_chos = false;



    /*
    form_data.sexId == '' ?
        this.nso_ainfo_fields.no_sex = true :
        this.nso_ainfo_fields.no_sex = false;

    form_data.birth == '' ?
        this.nso_ainfo_fields.no_bdat = true :
        this.nso_ainfo_fields.no_bdat = false;

    form_data.age == null ?
        this.nso_ainfo_fields.no_age = true :
        this.nso_ainfo_fields.no_age = false;


    form_data.nationalityId == null ?
        this.nso_ainfo_fields.no_nati = true :
        this.nso_ainfo_fields.no_nati = false;

    form_data.maritalStatusId == null ?
        this.nso_ainfo_fields.no_stat = true :
        this.nso_ainfo_fields.no_stat = false;

    form_data.mobilePhone == "" ?
        this.nso_ainfo_fields.no_mpho = true :
        this.nso_ainfo_fields.no_mpho = false;

    form_data.workPhone == "" ?
        this.nso_ainfo_fields.no_wpho = true :
        this.nso_ainfo_fields.no_wpho = false;

    form_data.policyTypeId == null ?
        this.nso_ainfo_fields.no_poli = true :
        this.nso_ainfo_fields.no_poli = false;

    form_data.assignmentDuration == "" ?
        this.nso_ainfo_fields.no_adur = true :
        this.nso_ainfo_fields.no_adur = false;

    form_data.assignmentDurationTime == '0' || form_data.assignmentDurationTime == '' ?
        this.nso_ainfo_fields.no_atim = true :
        this.nso_ainfo_fields.no_atim = false;

    form_data.initialArrival == "" ?
        this.nso_ainfo_fields.no_idat = true :
        this.nso_ainfo_fields.no_idat = false;

    form_data.homeCountryId == null ?
        this.nso_ainfo_fields.no_home = true :
        this.nso_ainfo_fields.no_home = false;

    form_data.homeCityId == null ?
        this.nso_ainfo_fields.no_city = true :
        this.nso_ainfo_fields.no_city = false;

    form_data.currentPosition == "" ?
        this.nso_ainfo_fields.no_posi = true :
        this.nso_ainfo_fields.no_posi = false;

    form_data.hostCountry == null ?
        this.nso_ainfo_fields.no_hhos = true :
        this.nso_ainfo_fields.no_hhos = false;

    form_data.hostCityId == null ?
        this.nso_ainfo_fields.no_chos = true :
        this.nso_ainfo_fields.no_chos = false;

    form_data.newPosition == "" ?
        this.nso_ainfo_fields.no_npos = true :
        this.nso_ainfo_fields.no_npos = false;*/

    for (let item in this.nso_ainfo_fields) {

      if (this.nso_ainfo_fields[item]) result = false;

    }

    function getImageAssign(): boolean {
      ////debugger;
      const id_photo_container: any = document.getElementById('ass_prof_photo'),
        photo_src: string = id_photo_container.src;
      //photo_input: any = document.getElementById('ass_prof_photo_input');
      //console.log(photo_src);
      //let split_photo_value: string = '';

      let result: boolean = true;

      if (photo_src != null) {

        //split_photo_value = photo_src.value.split('.')[photo_input.value.split('.').length - 1];

        form_data.PhotoExtension = 'png';
        form_data.photo = photo_src.split(',')[1];

        root.no_main_photo = false;

      } else {

        root.no_main_photo = false;
        form_data.PhotoExtension = 'jpg';
        form_data.photo = '';

        result = true;

      }

      return result;

    }

    return result;

  }

  public getLanguagesData(): void {
    console.log(this.new_service_record_data.assigneeInformations[0].languagesSpokens_);
    ////debugger

    let languages_selected = this.new_service_record_data.assigneeInformations[0].languagesSpokens_;
    //let hold_language = [];

    languages_selected.forEach((language: any) => {

      this.new_service_record_data.assigneeInformations[0].languagesSpokens.push({
        assignneInformation: this.new_service_record_data.assigneeInformations[0].id,
        languages: language
      });
    });

    //this.new_service_record_data.assigneeInformations[0].languagesSpokens = [];


  }

  public getNationalityData(): void {
    console.log(this.new_service_record_data.assigneeInformations[0].nationalityId_);
    ////debugger

    let nationality_selected = this.new_service_record_data.assigneeInformations[0].nationalityId_;
    //let hold_language = [];

    nationality_selected.forEach((nationality: any) => {

      this.new_service_record_data.assigneeInformations[0].nationalityAssigneeInformations.push({
        assignneInformation: this.new_service_record_data.assigneeInformations[0].id,
        nationalityId: nationality
      });
    });

    //this.new_service_record_data.assigneeInformations[0].languagesSpokens = [];


  }

  public getLanguagesDependentsData(): void {

    const dependents: any[] = this.assing_dependents;
    if (dependents.length != 0) {
      //let language_holder:any[] = [];
      dependents.forEach((dependent: DependentInformationsModel) => {
        if (dependent.languageDependentInformations_.length != 0) {
          const languages: any[] = dependent.languageDependentInformations_;
          console.log(languages);

          languages.forEach((language_: any) => {
            //const new_language:LanguagesSpokensModelDependent = new LanguagesSpokensModelDependent;
            dependent.languageDependentInformations.push({
              dependent: 0,
              language: language_
            })
            //new_language.language = language.language;
            //language_holder.push( new_language );
          });

          //dependent.languageDependentInformations = language_holder;
          //language_holder = [];
        }
      });
    }

  }

  public validEmailAssignee(email: string): void {

    !this.validateEmail(email) ?
      this.nso_ainfo_fields.no_emai_val = true :
      this.nso_ainfo_fields.no_emai_val = false;

  }

  public validatingDependents(): boolean {

    let result: boolean = true;

    const dependents: any = this.new_service_record_data.assigneeInformations[0].dependentInformations;

    dependents.forEach((dependent: any) => {

      if (dependent.relationshipId == "") result = false;
      if (dependent.name == "") result = false;
      if (dependent.birth == "") result = false;
      if (dependent.age == "") result = false;
      if (dependent.language == "") result = false;
      if (dependent.nationalityId == "") result = false;

    });

    return result;

  }


  public imm_form: any = {
    no_ctyp: false,
    no_coor: false,
    no_assi: false,
    no_acce: false
  }

  public getImmigrationValidation(): boolean {

    let result: boolean = true;

    const imm_prof_data: immigrationCoodinators = this.imm_coordinator_model;

    imm_prof_data.coordinatorTypeId == 0 ?
      this.imm_form.ctype = true : this.imm_form.ctype = false;

    imm_prof_data.coordinatorId == 0 ?
      this.imm_form.no_coor = true : this.imm_form.no_coor = false;

    imm_prof_data.assigned == null ?
      this.imm_coordinator_model.assigned = new Date() : this.imm_form.no_assi = false;

    imm_prof_data.assigned == undefined ?
      this.imm_coordinator_model.assigned = new Date() : this.imm_form.no_assi = false;

    imm_prof_data.accepted == null ?
      this.imm_form.no_acce = false : this.imm_form.no_acce = false;

    for (let field in this.imm_form) {

      if (this.imm_form[field]) result = false;

    }

    return result;

  }

  public getRelocationValidation(): boolean {

    let result: boolean = true;

    const relocation_data: relocationCoordinators = this.rel_coordinator_model;

    if (relocation_data.coordinatorTypeId == '') result = false;
    if (relocation_data.coordinatorId == '') result = false;
    if (relocation_data.assigned == null) result = false;

    return result;

  }

  public home_city_client_able: boolean = false;
  public home_city_host_able: boolean = false;
  public city_host_catalogue: any = [];

  public async ableInputsFromAssignmentSection(id_country: string, section: string): Promise<void> {

    const extra_param: string = `?state=${id_country}`;

    switch (section) {

      case 'client':
        if (!this.home_city_client_able) this.home_city_client_able = true;
        this.city_catalogue = await this._services.getCatalogueFrom('GetCity', extra_param);
        break;

      case 'host':
        if (!this.home_city_host_able) this.home_city_host_able = true;
        this.city_host_catalogue = await this._services.getCatalogueFrom('GetCity', extra_param);
        break;

    }

  }

  public async requestPetBreedCatalogue(id_pet_type: any): Promise<any> {

    const extra_data = `?id=${id_pet_type}`;

    this.breed_catalogue = await this._services.getCatalogueFrom('GetBreed', extra_data);

  }

  public able_sup_com_field: boolean = false;
  public parametros_busqueda: any;

  public async ableSupplierCompImm(id_in: any, type): Promise<any> {
    console.log(id_in);
    let country;
    let city;
    if (type == 1) {
      country = this.new_service_record_data.assigneeInformations[0].homeCountryId;
      city = this.new_service_record_data.assigneeInformations[0].homeCityId;
    } else if (type == 2) {
      country = this.new_service_record_data.assigneeInformations[0].hostCountry;
      city = this.new_service_record_data.assigneeInformations[0].hostCityId;
    }

    const extra_data = `?country=${country}&city=${city}&serviceLine=${type}`;
    this.parametros_busqueda = extra_data;
    console.log('parametros supplier company: ', extra_data);
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerConsultant' + extra_data).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.suppliercompany_catalogue = data.result.value;
        console.log('DATA CONSULTA SUPPLIER COMPANY: ', this.suppliercompany_catalogue);
        this.able_sup_com_field = true;
      }
    }));
  }

  supplier_catalogue_aux: any = [];

  public async __supplier__(country, city, serviceLine): Promise<any> {
    const extra_data = `?country=${country}&city=${city}&serviceLine=${serviceLine}`;
    ////debugger
    console.log('parametros supplier: ', extra_data);
    this._services.service_general_get('SupplierPartnerProfile/GetConsultantContactsConsultants' + extra_data).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        localStorage.setItem("catalogo", JSON.stringify(data.result.value));
        let datas = data.result.value;
        for (let i = 0; i < this.new_service_record_data.immigrationSupplierPartners.length; i++) {
          const element = this.new_service_record_data.immigrationSupplierPartners[i];
          for (let j = 0; j < datas.length; j++) {
            const sup = datas[j];
            if (sup.id == element.supplierId) {
              datas.splice(j, 1);
            }
          }
        }
        this.supplier_catalogue = datas;
        /// aqui va
        console.log('DATA CONSULTA SUPPLIER: ', this.supplier_catalogue, this.new_service_record_data.immigrationSupplierPartners);
      }
    }));
  }

  public async __supplier__r(country, city, serviceLine): Promise<any> {
    const extra_data = `?country=${country}&city=${city}&serviceLine=${serviceLine}`;
    ////debugger
    console.log('parametros supplier: ', extra_data);
    this._services.service_general_get('SupplierPartnerProfile/GetConsultantContactsConsultants' + extra_data).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        localStorage.setItem("catalogor", JSON.stringify(data.result.value));
        let datas = data.result.value;
        for (let i = 0; i < this.new_service_record_data.relocationSupplierPartners.length; i++) {
          const element = this.new_service_record_data.relocationSupplierPartners[i];
          for (let j = 0; j < datas.length; j++) {
            const sup = datas[j];
            if (sup.id == element.supplierId) {
              datas.splice(j, 1);
            }
          }
        }
        this.supplier_catalogue = datas;
        /// aqui va
        console.log('DATA CONSULTA SUPPLIER: ', this.supplier_catalogue, this.new_service_record_data.relocationSupplierPartners);
      }
    }));
  }

  //**contactName**//

  public colums_sup_table: string[] = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5'];

  public initTableImmSupPar(): any {

    const table_in: any = this.new_service_record_data.immigrationSupplierPartners;

    table_in.forEach(async (row: any) => {

      row.supplierTypeIdText = this.getValueFromCatalogue(this.suppliertype_catalogue, row.supplierTypeId, 'supplierType');
      row.supplierIdText = this.sup_name(row.supplierId);
      row.assignedServicesIdText = this.getValueFromCatalogue(this.assigment_catalogue, row.assignedServicesId, 'assignedService');
      //row.supplierCompanyIdText = await this.getValueFromCatalogueAfter({
      //url: 'SupplierPartnerProfile/GetSupplierPartnerConsultant' + this.parametros_busqueda,
      //match: row.supplierCompanyId,
      //field_to_find: 'comercialName',
      //id_index: 'id'
      //});
      row.supplierCompanyIdText = this.company_name(row.supplierCompanyId);
    });
    this.supplier_catalogue = [];
    this.table_imm_sup_par = new MatTableDataSource(table_in);
    this.table_imm_sup_par.paginator = this.paginator;
  }

  public imm_sup_model: immigrationSupplierPartners = new immigrationSupplierPartners();
  public table_imm_sup_par: any = null;
  public addImmigrationSupplier(): void {
    console.log('suplier table', this.imm_sup_model);

    if (this.isImmSupParFill()) {

      //this.imm_sup_model.supplierCompanyId = this.supplier_catalogue[0]?.companyId;
      this.imm_sup_model.supplierCompanyId = this.type_companyId;
      this.new_service_record_data.immigrationSupplierPartners.push(this.imm_sup_model);

      this.cleanImmSup();
      this.showSupplierSection();

      this.initTableImmSupPar();
      this.type_company = "";

      this.able_sup_com_field = false;

    }

  }

  public imm_sup_form: any = {
    no_styp: false,
    no_scom: false,
    no_supp: false,
    no_date: false,
    no_serv: false
  }

  public isImmSupParFill(): boolean {
    this.imm_sup_model.supplierCompanyId = this.supplier_catalogue[0].companyId;
    let result: boolean = true;
    this.imm_sup_model.supplierTypeId == null ?
      this.imm_sup_form.no_styp = true : this.imm_sup_form.no_styp = false;
    //this.imm_sup_model.supplierCompanyId == null ?
    //    this.imm_sup_form.no_scom = true : this.imm_sup_form.no_scom = false;
    this.imm_sup_model.supplierId == null ?
      this.imm_sup_form.no_supp = true : this.imm_sup_form.no_supp = false;
    this.imm_sup_model.assignedDate == null ?
      this.imm_sup_form.no_date = true : this.imm_sup_form.no_date = false;
    // this.imm_sup_model.assignedServicesId == null ?
    //     this.imm_sup_form.no_serv = true : this.imm_sup_form.no_serv = false;
    for (let field in this.imm_sup_form) {
      if (this.imm_sup_form[field]) result = false;
    }
    return result;
  }

  public cleanImmSup(): void {

    this.imm_sup_form.no_styp = false;
    this.imm_sup_form.no_scom = false;
    this.imm_sup_form.no_supp = false;
    this.imm_sup_form.no_date = false;
    this.imm_sup_form.no_serv = false;
    this.imm_sup_model = new immigrationSupplierPartners();

  }

  public deleteImmSupPar(index_row: number): void {

    this.new_service_record_data.immigrationSupplierPartners.splice(index_row, 1);

    this.initTableImmSupPar();

  }

  public rel_sup_model: relocationSupplierPartners = new relocationSupplierPartners();
  public table_rel_sup_par: any = null;

  public addRelocationSupplier(): void {
    console.log('table suplier relocation');
    this.rel_sup_model.supplierCompanyId = this.type_companyId_relocation;
    if (this.isRelSupParFill()) {

      this.new_service_record_data.relocationSupplierPartners.push(this.rel_sup_model);
      this.rel_sup_model = new relocationSupplierPartners();
      ////debugger
      this.cleanRelSup();
      this.showSupplierSection();

      this.initTableRelSupPar();

      this.able_sup_com_field = false;
      this.type_company_relocation = "";
      console.log('service', this.new_service_record_data.relocationSupplierPartners);


    }

  }

  public initTableRelSupPar(): void {
    const table_in: any = this.new_service_record_data.relocationSupplierPartners;
    ////debugger
    table_in.forEach(async (row: any) => {
      row.supplierTypeIdText = this.getValueFromCatalogue(this.suppliertype_catalogue, row.supplierTypeId, 'supplierType');
      row.supplierIdText = this.sup_name_r(row.supplierId);
      row.assignedServicesIdText = this.getValueFromCatalogue(this.assigment_catalogue, row.assignedServicesId, 'assignedService');
      //row.supplierCompanyIdText = await this.getValueFromCatalogueAfter({
      //url: 'SupplierPartnerProfile/GetSupplierPartnerConsultant' + this.parametros_busqueda,
      //match: row.supplierCompanyId,
      //field_to_find: 'comercialName',
      //id_index: 'id'
      //});
      row.supplierCompanyIdText = this.company_namer(row.supplierCompanyId);
    });
    ////debugger
    //this.table_imm_sup_par = new MatTableDataSource(table_in);
    //this.table_imm_sup_par.paginator = this.paginator;

    this.table_rel_sup_par = new MatTableDataSource(table_in);
    this.table_rel_sup_par.paginator = this.paginator;
    ////debugger
  }

  public rel_sup_form: any = {
    no_styp: false,
    no_scom: false,
    no_supp: false,
    no_date: false,
    no_serv: false
  }

  public isRelSupParFill(): boolean {
    let result: boolean = true;
    this.rel_sup_model.supplierCompanyId = this.supplier_catalogue[0].companyId;
    this.rel_sup_model.supplierTypeId == null ?
      this.rel_sup_form.no_styp = true : this.rel_sup_form.no_styp = false;
    //this.rel_sup_model.supplierCompanyId == null ?
    //    this.rel_sup_form.no_scom = true : this.rel_sup_form.no_scom = false;
    this.rel_sup_model.supplierId == null ?
      this.rel_sup_form.no_supp = true : this.rel_sup_form.no_supp = false;
    this.rel_sup_model.assignedDate == null ?
      this.rel_sup_form.no_date = true : this.rel_sup_form.no_date = false;
    // this.rel_sup_model.assignedServicesId == null ?
    //     this.rel_sup_form.no_serv = true : this.rel_sup_form.no_serv = false;
    for (let field in this.rel_sup_form) {
      if (this.rel_sup_form[field]) result = false;
    }
    return result;
  }

  public deleteRelSupPar(index_row: number): void {
    this.new_service_record_data.relocationSupplierPartners.splice(index_row, 1);
    this.initTableRelSupPar();
  }

  public cleanRelSup(): void {
    this.imm_sup_form.no_styp = false;
    this.imm_sup_form.no_scom = false;
    this.imm_sup_form.no_supp = false;
    this.imm_sup_form.no_date = false;
    this.imm_sup_form.no_serv = false;
    this.imm_sup_model = new relocationSupplierPartners();
  }
  /* 3. Utilities */
  public show_listado: boolean = true;

  public toggleSection(): void {
    this.show_listado ?
      this.show_listado = false :
      this.show_listado = true;
    this.new_service_record_data = new NewServiceRecordData;
    this.show_dependent_erros = false;
    this.show_pets_erros = false;
    this.imm_coordinator_model = new immigrationCoodinators();
    this.rel_coordinator_model = new relocationCoordinators();
  }

  public showTabSelected(which_tab: string, event_data: any): void {
    if (which_tab == "imm") {
      this.type_company_relocation = "";
    }
    if (which_tab == "rel") {
      this.type_company = "";
    }
    const tab_selected: any = document.getElementById(`tab_${which_tab}`),
      tab_parent: any = tab_selected.parentElement.children,
      event: any = event_data.target,
      tabs_container: any = document.getElementById('tabs');
    for (let index = 0; index < tab_parent.length; index += 1) {
      tab_parent[index].classList.add('display-none');
      tabs_container.children[index].classList.remove('page__section-tab--active');
    }
    tab_selected.classList.remove('display-none');
    event.classList.add('page__section-tab--active');
    if (this.imm_coordinator_model.assigned == null) {

      this.imm_coordinator_model.assigned = new Date();
    }
    if (this.rel_coordinator_model.assigned == null) {
      this.rel_coordinator_model.assigned = new Date();
    }
  }

  public showModal(sr_data: any = null): void {
    //debugger;
    console.log(sr_data);
    const dialogRef = this.dialog.open(NewServiceOrderDialog, {
      data: {
        id_sr: sr_data.id,
        new_sr_data: sr_data,
        partnerID: sr_data.partnerId,
        clientID: sr_data.clientId,
        new_sr: false,
        close: false,
        isnew: true,
        home_country: sr_data.assigneeInformations[0].homeCountryId,
        home_city: sr_data.assigneeInformations[0].homeCityId,
        host_country: sr_data.assigneeInformations[0].hostCountry,
        host_city: sr_data.assigneeInformations[0].hostCityId
      },
      width: "95%"
    });
    dialogRef.afterClosed().subscribe((so_added: any) => {
      dialogRef.close();
    });
  }

  public showModalSearchProfile(): void {

    const dialogRef = this.dialog.open(DialogSearchProfileComponent, {
      data: {},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  public showGeneralMessageDialog(title: string = '', body: string = ''): void {

    const dialogRef = this.dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: title,
        body: body
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  showExportDialog() {
    const dialogRef = this.dialog.open(DialogExportComponent, {
      data: this.service_records_table_data.filteredData,
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 1) {
        document.getElementById("excel").click();
      }

      if (result === 2) {
        this.generatePDF();
      }
    });
  }

  async generatePDF() {
    const pdf: PdfMakeWrapper = new PdfMakeWrapper();
    PdfMakeWrapper.setFonts(pdfFonts);
    let tabla = [
      ['Service Record', 'Service Line', 'VIP', 'Status', 'Autho Date', 'Country', 'City', 'Partner', 'Client', 'Assignee Name', 'Services', 'Coordinator', 'Supplier Consultant']
    ]
    for (let i = 0; i < this.service_records_table_data.filteredData.length; i++) {
      const element = this.service_records_table_data.filteredData[i];
      if (element.vip == false) {
        element.vip = 'No'
      } else if (element.vip == true) {
        element.vip = 'Yes'
      }
      tabla.push([
        element.serviceRecordNo, element.serviceLineName, element.vip, element.status.status, this.formatDate(element.autho), element.country,
        element.city, element.partner, element.client, element.assigneeName,
        element.serviceLine.length, element.coordinator, element.supplierConsultant
      ])
    }
    console.log(tabla);
    // Set the fonts to use
    pdf.pageMargins([30, 30, 30, 30]);
    pdf.pageOrientation('landscape');
    pdf.styles({
      img: {
        width: 5,
        height: 5,
      }
    });
    pdf.defaultStyle({
      fontSize: 9,
      alignment: 'center',
    });
    pdf.add(new Table(tabla).layout('lightHorizontalLines').end);
    pdf.create().download('Services.pdf');
  }

  public show_dependent_section: boolean = false;

  public toggleDependentsSection(): void {
    !this.show_dependent_section ?
      this.show_dependent_section = true :
      this.show_dependent_section = false;
  }

  formatDate(fecha) {
    let date = new Date(fecha);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let montstring = "";
    switch (month) {
      case 1:
        montstring = "Ene"
        break;
      case 2:
        montstring = "Feb"
        break;
      case 3:
        montstring = "Mar"
        break;
      case 4:
        montstring = "Abr"
        break;
      case 5:
        montstring = "May"
        break;
      case 6:
        montstring = "Jun"
        break;
      case 7:
        montstring = "Jul"
        break;
      case 8:
        montstring = "Ago"
        break;
      case 9:
        montstring = "Sep"
        break;
      case 10:
        montstring = "Oct"
        break;
      case 11:
        montstring = "Nov"
        break;
      case 12:
        montstring = "Dic"
        break;
      default:
        break;
    }
    return day + " " + montstring + " " + year;
  }

  public show_pets_section: boolean = false;

  public togglePetsSection(): void {

    !this.show_pets_section ?
      this.show_pets_section = true :
      this.show_pets_section = false;

  }

  public show_supplier_section: boolean = false;

  public showSupplierSection(): void {

    this.imm_sup_model.assignedDate = new Date();
    this.rel_sup_model.assignedDate = new Date();

    this._services.service_general_get("ServiceRecord/GetHomeCountryById?id="+this.new_service_record_data.assigneeInformations[0].homeCountryId).subscribe(result => {
      this.homeCountry = result;
    });
    
    !this.show_supplier_section ?
      this.show_supplier_section = true :
      this.show_supplier_section = false;

  }

  public navigateTo(where_to: string, data) {
    localStorage.setItem('serviceLine', JSON.stringify(data.serviceLine));
    if (this.permission_read == false) {
      return true;
    }
    this._router.navigateByUrl(where_to);
  }

  public showFieldDetail(event_data: any = null): void {

    const dialogRef = this.dialog.open(DialogNsrTableDetail, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  public no_main_photo: boolean = false;
  public previewSelectedPhoto(event: any, field_to_display: string, fill_model: string = ''): void {

    const dialogRef = this.dialog.open(DialogCropImageComponent, {
      data: { image: "", name: "" },
      width: "70%",
      height: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined) {
        const field_photo: any = document.getElementById(field_to_display),
          //event_data = result,
          photo_index: any = field_to_display.split('_')[3],
          dependents_model: DependentInformationsModel[] = this.assing_dependents,
          pets_model: PetsNavigationModel[] = this.assing_pets,
          root: any = this;
        const base64: any = result;//e.target.result;

        field_photo.setAttribute('src', base64);

        switch (fill_model) {

          case 'dependents':
            dependents_model[photo_index].photo = base64.split(',')[1];
            dependents_model[photo_index].PhotoExtension = 'png'
            break;

          case 'pets':
            pets_model[photo_index].photo = base64.split(',')[1];
            pets_model[photo_index].PhotoExtension = 'png'
            break;

          case 'profile':
            ////debugger;
            root.new_service_record_data.assigneeInformations[0].photo = base64.split(',')[1];
            root.new_service_record_data.assigneeInformations[0].PhotoExtension = 'png'
            root.no_main_photo = false;
            break;

        }

      }
    });
  }

  Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public dateWorker(date_in: string): string {

    const date_actions: any = {
      set_date: function (d) {
        this.date = d
      },
      split_date: function () {
        this.date_split = date_in.split('T')
      },
      get_date: function () {
        return this.date_split[0]
      }
    }

    let work_date = Object.create(date_actions);
    work_date.split_date();


    return work_date.get_date();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service_records_table_data.filter = filterValue.trim().toLowerCase();
  }

  public scrollPageTo(x_position: number = 0, y_position: number = 0): void {

    window.scrollTo(x_position, y_position);

  }

  sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  arrivalDatePlus: Date;

  public removeErrorLabel(input_value: any, object_data: any): void {
    //debugger;
    //console.log(this.new_service_record_data.assigneeInformations[0].initialArrival);
    //this.sumarDias(input_value, 1);
    //this.arrivalDatePlus = input_value.setDate(input_value.getDate() + 1);
    if(input_value != 0){
      if (input_value == "" || input_value == null) {

        object_data.handler[object_data.field] = true;

      } else {

        object_data.handler[object_data.field] = false;

      }
    }
    else
    {
      object_data.handler[object_data.field] = false;
    }
  }

  profilePage(id) {
    let role;
    console.log(id);
    if (id != 0) {
      this._services.service_general_get(`Catalog/GetUser/${id}`).subscribe( r => {
        if (r.success) {
          role = r.result.value.role;
          // role id 19 es igual a "Super Admin"
          // if (role == 1 || role == 4  || role == 11 || role == 13 || role == 14 ||  role == 19  || role == 20 || role == 21 || role == 22 ) {
            if(role != 2 && role != 3){
              if(role != 4)
            this._router.navigateByUrl(`profilemanager/${id}`);
            }else if(role == 2){
              this._router.navigateByUrl(`profilecoordinator/${id}`);
            }else if(role == 3){
              this._router.navigateByUrl(`profileconsultant/${id}`);
            }
        }
      });
    }
  }

  public getTodayDay(): string {

    const date = {
      date: function () {
        return new Date()
      },
      day: function () {
        return this.date().getDate()
      },
      month: function () {
        return this.date().getMonth() + 1
      },
      year: function () {
        return this.date().getFullYear()
      },
      today: function () {
        return `${this.month()}/${this.day()}/${this.year()}`
      }
    }

    return date.today();

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
              'The email already exists, perhaps it has been used in any service record.'
            );

            this.new_service_record_data.assigneeInformations[0].email = '';

          }

        }, (error: any) => {

          console.error('Error (User/VeryfyEmail) => ', error);

        });

    }

  }

  public validateEmailServerAvailabilityDependent(email, index){
    if (email != '') {

      this._services.service_general_get(`ServiceRecord/ValidateEmail?email=${email}`)
        .subscribe((response: any) => {

          //console.log('Res => ', response);

          if (response.result) {

            this.showGeneralMessageDialog(
              'Email already exists',
              'The email already exists, perhaps it has been used in any dependent.'
            );
            this.assing_dependents[index].email = ""

          }

        }, (error: any) => {

          console.error('Error (User/VeryfyEmail) => ', error);

        });

    }

  }

  public calculateHowOld(): void {

    const my_bd: any = this.new_service_record_data.assigneeInformations[0].birth;

    if (my_bd != null || my_bd != '') {

      this.new_service_record_data.assigneeInformations[0].age = calculateAge(my_bd);

    } else {

      this.new_service_record_data.assigneeInformations[0].age = null;

    }

    function calculateAge(birthday) {

      const ageDifMs = Date.now() - birthday.getTime(),
        ageDate = new Date(ageDifMs);

      return Math.abs(ageDate.getUTCFullYear() - 1970);

    }

  }

  public calculateHowOldDina(to_who: string, value_input: any, native_input: boolean = true): void {

    if (!native_input) {

      const field_age_group: any = document.getElementById(to_who);

      if (value_input != null) field_age_group.value = calculateAge(value_input);
      else field_age_group.value = null;

    }

    function calculateAge(birthday) {

      const ageDifMs = Date.now() - birthday.getTime(),
        ageDate = new Date(ageDifMs);

      return Math.abs(ageDate.getUTCFullYear() - 1970);

    }

  }

  public filterDate(date_in: any): string {

    return `${date_in.getFullYear()}/${date_in.getMonth() + 1}/${date_in.getDate()}`;

  }

  public getValueFromCatalogue(catalogue: any, id_to_find: any, field_to_find: string): string {

    let result: string = '';

    catalogue.forEach((item: any) => {

      if (item.id == id_to_find) {

        result = item[field_to_find];

      }

    });

    return result;

  }

  public getValueFromCatalogueAfter(settings: any): string {

    let result: string = '';

    const get_result: any = new Promise((resolve: any) => {

      this._services.service_general_get(settings.url)
        .subscribe((response: any) => {

          if (response.success) {

            response.result.value.forEach((item: any) => {

              if (item[settings.id_index] == settings.match) {

                result = item[settings.field_to_find];

                resolve(result);

              }

            });

          }

        }, (error: any) => {

          console.error('Error (getValueFromCatalogueAfter) ==> ', error);

        });

    })

    return get_result.then((result: string) => {

      return result;

    });

  }

  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  public changePageToSection(sections: any): void {

    const tis_as_button: any = document.getElementById('tab_immigration_section'),
      tas_as_button: any = document.getElementById('tab_assign_section');

    if (!sections.general_form) {

      this.scrollPageTo(0, 0);

      this.showDialogMessage('Partner / Client Information must be completed');

    }

    if (sections.general_form && !sections.assing_form) {

      let dependenttap = document.getElementById('tab_assign_section');
      dependenttap.click();
      this.scrollPageTo(0, 350);

      this.showDialogMessage('Assignee Information must be completed');

    }

    if (this.show_dependent_section) {

      if (this.validateDependents()) {
      } else {
        let dependenttap = document.getElementById('tab_assign_section');
        dependenttap.click();
        this.scrollPageTo(0, 520);
        this.showDialogMessage('Dependents section must be completed');
      }

    }

    if (this.show_pets_section) {

      if (sections.general_form && sections.assing_form &&
        (!sections.assing_pets)) {

        let dependenttap = document.getElementById('tab_assign_section');
        dependenttap.click();
        this.scrollPageTo(0, 420);
        this.showDialogMessage('Pets section must be completed');

      }

    }

    if (
      sections.general_form &&
      sections.assing_form &&
      !sections.immigration_forms) {

      tis_as_button.click();
      this.scrollPageTo(0, 350);

    }

  }

  public showDialogMessage(message: string, time: number = 6222): void {

    this._snackBar.open(message, 'Close', {
      duration: time,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['dialog-mat-custom']
    });

  }

  public getMaxDateTo(years_ago: number = 18): Date {

    const today: Date = new Date(),
      today_year: number = today.getFullYear(),
      today_month: number = today.getMonth(),
      today_day: number = today.getDate(),
      new_min_date: Date = new Date(today_year - years_ago, today_month, today_day);

    return new_min_date;

  }

  goBack_() {
    this.show_listado = true;
    //window.history.back();
  }

  async getServices(element) {
    console.log(element);
    this.hostImm    = [];
    this.hostRelo = [];
    this.homeImm    = [];
    this.homeRelo = [];
////debugger;
    element.standaloneServices.forEach(item => {
      console.log(item.country.toLowerCase());
      if(item.country.toLowerCase() == element.homeCountry.toLowerCase()){
        if(item.serviceLine == 1){
          this.homeImm.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: item.country
          });
        }
        else{
          this.homeRelo.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: item.country
          });
        }
      }
      if(item.country.toLowerCase() == element.country.toLowerCase()){
        if(item.serviceLine == 1){
          this.hostImm.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: item.country
          });
        }
        else{
          this.hostRelo.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: item.country
          });
        }
      }
    });
    element.bundledService.forEach(item => {
      if(item.country.toLowerCase() == element.homeCountry.toLowerCase()){
        if(item.serviceLine == 1){
          this.homeImm.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: item.country
          });
        }
        else{
          this.homeRelo.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: item.country
          });
        }
      }
      if(item.country.toLowerCase() == element.country.toLowerCase()){
        if(item.serviceLine == 1){
          this.hostImm.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: item.country
          });
        }
        else{
          this.hostRelo.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: item.country
          });
        }
      }
    });

    console.log("hostImm:", this.hostImm,"hostRelo:", this.hostRelo,"homeImm:",this.homeImm,"homeRelo:",this.homeRelo);
    // this.services_consult.push({
    //   hostImm: hostImm, 
    //   hostRelo: hostRelo,
    //   homeImm: homeImm,
    //   homeRelo: homeRelo
    // });
    this.services_consult.filter()
    console.log("Entra a consultar las WO immigration: ", this.services_consult);
    
    //await this.initPageSettings(data_.id);
    // this.services_consult = [];
    // this._services.service_general_get("ServiceRecord/GetServices/" + data_.id + "?type=" + data_.serviceline).subscribe((data => {
    //   console.log("Entra a consultar las WO immigration: ", data.map.value);    
    
    //   var host    = []
    //   var hostTemp = []
    //   var home    = []
    //   var homeTemp = []
    //   for(var i=0; i<data.map.value.host.length; i++){
    //     hostTemp = host.filter(resp => resp["country"] == data.map.value.host[i]["country"])
    //       if(hostTemp.length>0){
    //         host[host.indexOf(hostTemp[0])]["service"].push({
    //             service_name: data.map.value.host[i]["service_name"],
    //             numberWorkOrder: data.map.value.host[i]["numberWorkOrder"],
    //             number_server: data.map.value.host[i]["number_server"]
    //           })
    //       }else{
    //         host.push(
    //             {
    //               "country" : data.map.value.host[i]["country"] , 
    //               "service" : [{
    //                 service_name: data.map.value.host[i]["service_name"],
    //                 numberWorkOrder: data.map.value.host[i]["numberWorkOrder"],
    //                 number_server: data.map.value.host[i]["number_server"]
    //               }]
    //             })
    //       }
    //   }
    //   for(var i=0; i<data.map.value.home.length; i++){
    //     homeTemp = home.filter(resp => resp["country"] == data.map.value.home[i]["country"])
    //     if(homeTemp.length>0){
    //       home[home.indexOf(homeTemp[0])]["service"].push({
    //           service_name: data.map.value.home[i]["service_name"],
    //           numberWorkOrder: data.map.value.home[i]["numberWorkOrder"],
    //           number_server: data.map.value.home[i]["number_server"]
    //         })
    //     }else{
    //       home.push(
    //           {
    //             "country" : data.map.value.home[i]["country"] , 
    //             "service" : [{
    //               service_name: data.map.value.home[i]["service_name"],
    //               numberWorkOrder: data.map.value.home[i]["numberWorkOrder"],
    //               number_server: data.map.value.home[i]["number_server"]
    //             }]
    //           })
    //     }
    // }
    
    //   console.log({
    //     home: home,
    //     host: host
    //   })
    
    //   this.services_consult.push({
    //     home: home,
    //     host: host
    //   });
    //   //this.services_consult.filter()
    //   //console.log("Entra a consultar las WO immigration: ", this.services_consult);
    // }));
  }

  public SRDATA: any = undefined;
  public edit_sr_model: any;
  public Host_Home_country: any = {};

  public initPageSettings(id): void {
    this.loader.showLoader();
    this._services.service_general_get(`ServiceRecord/GetServiceRecordById?id=${id}&user=${this.USERDATA.id}`)
      .subscribe(async (response: any) => {
        if (response.success) {
          this.SRDATA = response.result;
          if (this.SRDATA.immigrationCoodinators.length > 0) {
            if (this.SRDATA.immigrationCoodinators[0].accepted == "1900-01-01T00:00:00") {
              this.SRDATA.immigrationCoodinators[0].accepted = null;
            }
          }

          if (this.SRDATA.relocationCoordinators.length > 0) {
            if (this.SRDATA.relocationCoordinators[0].accepted == "1900-01-01T00:00:00") {
              this.SRDATA.relocationCoordinators[0].accepted = null;
            }
          }
          this.edit_sr_model = this.SRDATA;

          const host_country: number = this.edit_sr_model.assigneeInformations[0].hostCountry,
            home_country: number = this.edit_sr_model.assigneeInformations[0].homeCountryId;


          this.Host_Home_country = {
            host_country: this.edit_sr_model.assigneeInformations[0].hostCountry,
            home_country: this.edit_sr_model.assigneeInformations[0].homeCountryId,
          }

          this.city_host_catalogue = await this._services.getCatalogueFrom('GetState', `?country=${host_country}`);
          this.city_home_catalogue = await this._services.getCatalogueFrom('GetState', `?country=${home_country}`);

          for (let i = 0; i < this.country_catalogue.length; i++) {
            const element = this.country_catalogue[i];
            if (element.id == this.Host_Home_country.host_country) {
              this.Host_Home_country.host_country_name = element.name;
            }

            if (element.id == this.Host_Home_country.home_country) {
              this.Host_Home_country.home_country_name = element.name;
            }
          }

          this.city_host_catalogue.forEach((city: any) => {

            if (city.id == this.edit_sr_model.assigneeInformations[0].hostCityId) {

              this.Host_Home_country.host_city_name = city.state;

            }

          });

          this.Host_Home_country.homeCity_Id = this.edit_sr_model.assigneeInformations[0].homeCityId;
          this.Host_Home_country.hostCity_Id = this.edit_sr_model.assigneeInformations[0].hostCityId;

          for (let i = 0; i < this.city_host_catalogue.length; i++) {
            const element = this.city_host_catalogue[i];
            if (element.id == this.Host_Home_country.hostCity_Id) {
              this.Host_Home_country.hostCity_name = element.city;
            }
          }

          for (let i = 0; i < this.city_home_catalogue.length; i++) {
            const element = this.city_home_catalogue[i];
            if (element.id == this.Host_Home_country.homeCity_Id) {
              this.Host_Home_country.homeCity_name = element.city;
            }
          }
          this.loader.hideLoader();
          console.log('[CP353] Data edit_sr_model  => ', this.edit_sr_model);
          localStorage.setItem('partnerID', JSON.stringify(this.edit_sr_model.partnerId));
        }
      }, (error: any) => {
        console.error('Error (GetServiceRecordById) => ', error);
        this.loader.hideLoader();

      });

  }

  public showDialogentryVisa(data): void {
    data.partnerId = this.edit_sr_model.partnerId;
    data.numberServiceRecord = this.edit_sr_model.numberServiceRecord;
    data.sr = this.edit_sr_model.numberServiceRecord;
    data.data = data;
    if (data.homehost == 2) {
      data.country_city = {
        home_contry_name: this.Host_Home_country.host_country_name,
        country_id: this.Host_Home_country.host_country,
        home_city_name: this.Host_Home_country.hostCity_name,
        city_id: this.Host_Home_country.hostCity_Id,
      }
    } else {
      data.country_city = {
        home_contry_name: this.Host_Home_country.home_country_name,
        country_id: this.Host_Home_country.home_country,
        home_city_name: this.Host_Home_country.homeCity_name,
        city_id: this.Host_Home_country.homeCity_Id,
      }
    }

    data.home_host = data.homehost;
    let dialog;

    switch (data.dialog_type) {
      case 1:
        dialog = EntryVisaComponent;
        break;
      case 2:
        dialog = DialogWorkPermitComponent;
        break;
      case 3:
        dialog = DialogVisaDeregistrationComponent;
        break;
      case 4:
        dialog = DialogResidencyPermitComponent;
        break;
      case 5:
        dialog = DialogDocumentManagementComponent
        break;
      case 6:
        dialog = DialogLocalDocumentationComponent
        break;

      case 7:
        this.showDialogById(data.dialog_type, data);
        break;

      case 8:
        this.showDialogById(data.dialog_type, data);
        break;

      case 9:
        this.showDialogById(data.dialog_type, data);
        break;

      case 10:
        this.showDialogById(data.dialog_type, data);
        break;

      case 28:
        dialog = OtherImmigrationComponent
        break;

      default:
        break;
    }

    if (data.dialog_type > 0 && data.dialog_type < 7) {
      if (data.service != 0) {
        const dialogRef = this.dialog.open(dialog, {
          data: data,
          width: "95%"
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.animateToTop();
          this.ngOnInit();
        });

      }
    }

    if (data.dialog_type == 28) {
      if (data.service != 0) {
        const dialogRef = this.dialog.open(dialog, {
          data: data,
          width: "95%"
        });

        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });

      }
    }
  }

  public showDialogById(dialog_id: number, obj_props: any = null): void {
    obj_props.partnerId = this.edit_sr_model.partnerId;
    console.log('Data Service sent ====> ', obj_props);
    console.log('Id Service ===> ', dialog_id);
    switch (dialog_id) {

      case 7:
        const corporate_dialog = this.dialog.open(DialogCortporateAssistance, {
          data: {
            //sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_id: obj_props.service[0].id,
            data: obj_props
          },
          width: "95%"
        });

        corporate_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

      case 8:
        const renewal_dialog = this.dialog.open(DialogRenewal, {
          data: {
            sr: this.edit_sr_model.numberServiceRecord,
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            //sr_hcity: this.Host_Home_country.host_city_name, hostCity_name,
            sr_hcity: this.Host_Home_country.hostCity_name,
            data: obj_props
          },
          width: "95%"
        });

        renewal_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

      case 9:
        const notificacion_dialog = this.dialog.open(NotificationDialog, {
          data: {
            sr: this.edit_sr_model.numberServiceRecord,
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            //sr_hcity: this.Host_Home_country.host_city_name,
            sr_hcity: this.Host_Home_country.hostCity_name,
            data: obj_props
          },
          width: "95%"
        });
        notificacion_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

      case 10:
        const legal_dialog = this.dialog.open(DialogLegalReviewConsultation, {
          data: {
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name,
            data: obj_props
          },
          width: "95%"
        });

        legal_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

    }

  }

  openmodal(data, country) {
    console.log("Entra a abrir modal de detalle del servicio");
    data.partnerId = this.edit_sr_model.partnerId;
    data.numberServiceRecord = this.edit_sr_model.numberServiceRecord;
    data.sr = this.edit_sr_model.numberServiceRecord;

    if (data.homehost == 2) {
      data.country_city = {
        home_contry_name: this.Host_Home_country.host_country_name,
        country_id: this.Host_Home_country.host_country,
        home_city_name: this.Host_Home_country.hostCity_name,
        city_id: this.Host_Home_country.hostCity_Id,
      }
    } else {
      data.country_city = {
        home_contry_name: this.Host_Home_country.home_country_name,
        country_id: this.Host_Home_country.home_country,
        home_city_name: this.Host_Home_country.homeCity_name,
        city_id: this.Host_Home_country.homeCity_Id,
      }
    }

    data.home_host = country;
    data.sr = this.edit_sr_model.numberServiceRecord;
    data.program = data.serviceType;
    data.wo = data.workOrderId
    const dialogRef = this.dialog.open(DialogBundleComponent, {
      width: "95%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  PreDecision(type) {
    type.partnerId = this.edit_sr_model.partnerId;
    console.log(type);
    let moda;

    switch (type.dialog_type) {
      case 10:
        moda = DialogLegalReviewConsultation;
        break;
      case 12:
        moda = PreDecisionOrientationComponent;
        break;
      case 13:
        moda = AreaOrientationComponent;
        break;
      case 21:
        moda = HomeFindingComponent;
        break;
      case 14:
        moda = SettlingInComponent;
        break;
      case 15:
        moda = SchoolSearchComponent;
        break;
      case 16:
        moda = DialogDepartureComponent;
        //this.showDialogRelocation( type );
        break;
      case 18:
        moda = DialogRentalFurnitureComponent;
        break;
      case 19:
        moda = DialogTransportationComponent;
        break;
      case 17:
        this.showDialogRelocation(type, type.homehost);
        break;
      case 20:
        moda = DialogAirportTransportationComponent;
        break;
      case 22:
        moda = LegalRenewalComponent;
        break;
      // home sale
      case 23:
        moda = HomeSaleComponent;
        break;
      // home purchase
      case 24:
        moda = HomePurchaseComponent;
        break;
      // property managment
      case 25:
        moda = PropertyManagementComponent;
        break;
      // other
      case 26:
        moda = OtherComponent;
        break;
      case 27:
        moda = TenancyManagementComponent;
        break;
    }

    if (type.dialog_type != 17) {
      type.home_host = type.homehost;
      const dialogRef = this.dialog.open(moda, {
        data: {
          sr: this.SO_ID,
          data: type
        }, width: "95%"
      });

      dialogRef.afterClosed().subscribe((so_added: any) => {
        //this.animateToTop();
        this.ngOnInit();
      });
    }
  }

  public showDialogRelocation(service_in: any, id): void {
    service_in.home_host = id;
    service_in.partnerId = this.edit_sr_model.partnerId;

    console.log('Service selected in ESR ======> ', service_in);

    switch (service_in.categoryId) {

      case 16:
        const departure_dialog = this.dialog.open(DialogDepartureComponent, {
          data: {
            sr_id: service_in.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name
          }, width: "95%"
        });

        departure_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

      case 17:
        const legal_dialog = this.dialog.open(DialogTemporaryHousingComponent, {
          data: {
            sr: this.SO_ID,
            sr_id: service_in.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name,
            data: service_in
          }, width: "95%"
        });
        legal_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;
    }

  }

}

//Ex: Class and Models

class Coordinator {
  supplier_type: string = '';
  supplier_comp: string = '';
  supplier: string = '';
  date: string = '';
  services: string = '';
}

class FilterData {
  coordinator: string = '';
  partner: string = '';
  client: string = '';
  country: string = '';
  city: string = '';
  vip: string = '';
  supplier: string = '';
  sr: string = '';
  startDate: string = '';
  endDate: string = '';
  serviceLine: string = '';
}

class NewServiceRecordData {
  id: number = 0;
  office: string = '';
  initialAutho: string = '';
  inithialAuthoAcceptance: string = '';
  partnerId: number = null;
  clientId: number = null;
  clientFileNumber: number = null;
  //authorizedBy:boolean = null;
  copyOnEmail: boolean = false;
  spoc: boolean = false;
  vip: boolean = false;
  confidentialMove: boolean = false;
  specialIntructions: string = '';
  assigneeInformationId: number = 0;
  assigneeInformations: AssigneeInformationModel[] = [new AssigneeInformationModel()];
  immigrationCoodinators: immigrationCoodinators[] = [];
  immigrationSupplierPartners: any = [];
  relocationCoordinators: relocationCoordinators[] = [];
  relocationSupplierPartners: any = [];
  authorizedByImmigration: string = '';
  authorizedByRelocation: string = '';
  copyOnEmailImmigration: boolean = false;
  copyOnEmailRelocation: boolean = false;
  spocImmigration: boolean = false;
  spocRelocation: boolean = false;
  createdBy: number = 0;
  createdDate: any;
  urgent: boolean = false
}

class AssigneeInformationModel {
  id: number = 0;
  assigneePhoto: string = '';
  assigneeName: string = '';
  assigneeNameId: number = 0;
  sexId: any = 1;
  birth: string = '';
  age: number = null;
  nationalityId: number = null;
  maritalStatusId: number = null;
  mobilePhone: string;
  workPhone: string;
  policyTypeId: number = null;
  assignmentDuration: string = '';
  assignmentDurationTime: string = '1';
  initialArrival: string = '';
  homeCountryId: number = null;
  homeCityId: number = null;
  currentPosition: string = '';
  hostCountry: number = null;
  photo: string = '';
  PhotoExtension: string = '';
  hostCityId: number = null;
  newPosition: string = '';
  dependentInformation: boolean = null;
  pets: boolean = null;
  email: string = '';
  dependentInformations: any = [];
  petsNavigation: any = [];
  languagesSpokens: any[] = [];
  languagesSpokens_: any = []
  nationalityId_: any = [];
  nationalityAssigneeInformations: any[] = [];
}

class LanguagesSpokensModel {
  assignneInformation: number = 0;
  languages: string = '';
}

class LanguagesSpokensModelDependent {
  dependent: number = 0;
  language: number = 0;
}

class DependentInformationsModel {
  id: number = 0;
  sex: any = 1;
  photo: string = '';
  PhotoExtension: string = 'jpg';
  relationshipId: string = '0';
  name: string = '';
  birth: string = '';
  age: string = '';
  nationalityId: string = '';
  aditionalComments: string = '';
  assigneeInformationId: number = 0;
  languageDependentInformations: any = [];
  languageDependentInformations_: any = [];
  email: string = '';
  phone: number;
  currentGrade: string = '';
  ifOther: string = '';
}

class PetsNavigationModel {
  color: string = '';
  id: number = 0;
  petTypeId: string = '';
  birthDate: Date = null;
  name: string = '';
  breedId: string = '';
  age: string = '';
  sizeId: string = '';
  weight: number;
  PhotoExtension: string = 'jpg';
  weightMeasuresId: string = '';
  assigneeInformationId: number = 0;
  photo: string = '';
}

class immigrationCoodinators {
  id: number = 0;
  coordinatorTypeId: number = 0;
  coordinatorId: number = 0;
  assigned: Date;
  accepted: Date = null;
  serviceRecordId: number = 0;
  statusId: number = 2;
}

class immigrationSupplierPartners {
  id: number = 0;
  supplierTypeId: number = null;
  supplierCompanyId: number = null;
  assignedDate: Date;
  assignedServicesId: number = null;
  serviceRecordId: number = 0;
  supplierId: number = null;
  statusId: number = 2;
  createdBy: number = 0;
}

class relocationCoordinators {
  id: number = 0;
  coordinatorTypeId: string = '';
  coordinatorId: string = '';
  assigned: Date;
  accepted: Date = null;
  serviceRecordId: number = 0;
  statusId: number = 2;
}


class relocationSupplierPartners {
  id: number = 0;
  supplierTypeId: number = null;
  supplierCompanyId: number = null;
  assignedDate: Date;
  assignedServicesId: number = null;
  serviceRecordId: number = 0;
  supplierId: number = null;
  statusId: number = 2;
  createdBy: number = 0;
}
