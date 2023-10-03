import { async } from '@angular/core/testing';
import { Component, ViewChild, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LoaderComponent } from '../../../app/shared/loader';
import { CustomPaginator } from '../../../app/shared/customPaginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogSearchProfileComponent } from '../dialog/search-profile/search-profile.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { DialogRequestInformation } from '../dialog/edit-service-records/request-information.component';
import { DialogEditServices } from '../dialog/edit-service-records/edit-services.component';
import { DialogEscalateComponent } from '../dialog/edit-service-records/escalate.component';
import { ServiceGeneralService } from '../../service/service-general/service-general.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EntryVisaComponent } from '../dialog/entry-visa/entry-visa.component';
import { DialogInvoiceEditComponent } from '../dialog/edit-service-records/invoice-edit-so.component';
import { DialogAddAppointmentComponent } from '../dialog/dialog-add-appointment/dialog-add-appointment.component';
import { DialogWorkPermitComponent } from '../dialog/dialog-work-permit/dialog-work-permit.component';
import { DialogResidencyPermitComponent } from '../dialog/dialog-residency-permit/dialog-residency-permit.component';
import { DialogVisaDeregistrationComponent } from '../dialog/dialog-visa-deregistration/dialog-visa-deregistration.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogDocumentManagementComponent } from '../dialog/dialog-document-management/dialog-document-management.component';
import { NotificationDialog } from '../dialog/notification/notification.component';
import { DialogRenewal } from '../dialog/renewal/renewal.component';
import { DialogAddCall } from '../dialog/dialog-add-call/addCall.component';
import { DialogAssignTask } from '../dialog/dialog-assign-task/assignTask.component';
import { DialogCortporateAssistance } from '../dialog/corporate-assistance/corporate-assistance.component';
import { DialogLegalReviewConsultation } from '../dialog/legal-review-consultation/legal-review-consultation.component';
import { DialogLocalDocumentationComponent } from '../dialog/dialog-local-documentation/dialog-local-documentation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { PreDecisionOrientationComponent } from '../dialog/pre-decision-orientation/pre-decision-orientation.component';
import { AreaOrientationComponent } from '../dialog/area-orientation/area-orientation.component';
import { SettlingInComponent } from '../dialog/settling-in/settling-in.component';
import { SchoolSearchComponent } from '../dialog/school-search/school-search.component';
import { DialogDepartureComponent } from '../dialog/dialog-departure/dialog-departure.component';
import { SinglePageAssigneeFamilyInfo } from '../../layouts/single-pages/assignee-and-family-info.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MessageDto, ChatConversation, newChat, ChatDocument } from '../../model/chat/MessageDto';
import { MatTab } from '@angular/material/tabs';
import { DialogEditTask } from '../dialog/dialog-edit-task/editTask.component';
import { AsignarserviciosComponent  } from '../dialog/asignarservicios/asignarservicios.component';

import { DialogViewEscalation } from '../dialog/dialog-view-escalation/viewEscalation.component';
import { DialogTemporaryHousingComponent } from '../dialog/dialog-temporary-housing/dialog-temporary-housing.component';
import { DialogAirportTransportationComponent } from '../dialog/dialog-airport-transportation/dialog-airport-transportation.component';
import { DialogCompleteComponent } from '../dialog/dialog-complete/dialog-complete.component';
import { DialogRentalFurnitureComponent } from '../dialog/dialog-rental-furniture/dialog-rental-furniture.component';
import { DialogTransportationComponent } from '../dialog/dialog-transportation/dialog-transportation.component';
import { DialogReportDayComponent } from '../dialog/dialog-report-day/dialog-report-day.component';
import { DialogExportComponent } from '../dialog/dialog-export/dialog-export.component';
import { DialogRequestAdditionalTimeComponent } from '../dialog/dialog-request-additional-time/dialog-request-additional-time.component';
import { DialogSliderComponent } from '../dialog/dialog-slider/dialog-slider.component';
import { PdfMakeWrapper, Table, Cell, Columns, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { DialogCommentHistoryComponent } from '../dialog/dialog-comment-history/dialog-comment-history.component';
import { SessionSettings } from 'app/shared/sessionSettings';
import { DialogDocumentsComponent } from '../dialog/dialog-documents/dialog-documents.component';
import { DialogDocumentsView } from '../dialog/dialog-documents-view/dialog-documents-view.component';
import { DialogLibraryDocuments } from '../dialog/dialog-library-documents/dialog-library-documents.component';
import { DialogEditCallComponent } from '../dialog/dialog-edit-call/dialog-edit-call.component';
import { DialogRequestPaymentNewComponent } from '../dialog/dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogHousingSpecificationsComponent } from '../dialog/dialog-housing-specifications/dialog-housing-specifications.component';
import { DialogRequestInvoiceComponent } from '../dialog/dialog-request-invoice/dialog-request-invoice.component';
import { LegalRenewalComponent } from '../dialog/legal-renewal/legal-renewal.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { HomeSaleComponent } from './../dialog/home-sale/home-sale.component';
import { HomePurchaseComponent } from './../dialog/home-purchase/home-purchase.component';
import { OtherComponent } from './../dialog/other/other.component';
import { PropertyManagementComponent } from './../dialog/property-management/property-management.component';
import { TenancyManagementComponent } from './../dialog/tenancy-management/tenancy-management.component';
import { DialogBundleComponent } from '../dialog/dialog-bundle/dialog-bundle.component';
import { DialogInHoldComponent } from '../dialog/dialog-in-hold/dialog-in-hold.component';
import { MatTableDataSource } from '@angular/material/table';
import { OtherImmigrationComponent } from '../dialog/other-immigration/other-immigration.component';
import { DialogAssignTaskEDRComponent } from '../dialog/dialog-assign-task-edr/dialog-assign-task-edr.component';
import { FullComponent } from 'app/layouts/full/full.component';
import { DialogCropImageComponent } from '../dialog/dialog-crop-image/dialog-crop-image.component';
import { MatOption } from '@angular/material/core';


const msg = (user, contact, message) => ({
  user,
  contact,
  message,
  timestamp: Date.now()
})

@Component({
  selector: 'edit-service-record-component',
  templateUrl: './editServiceRecord.component.html',
  styleUrls: ['./editServiceRecord.component.scss']
}) export class EditServiceRecordComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sortable: MatSort;
  @ViewChild('firstTableSort') firstTableSort: MatSort;
  public dataSourceR: MatTableDataSource<any>;

  /* 1.  paginador */
  @ViewChild(MatPaginator) paginators_: MatPaginator;
  @ViewChild(MatPaginator) _paginators_: MatPaginator;
  @ViewChild('paginatorElement', { read: ElementRef }) paginatorHtmlElement: ElementRef;
  @ViewChild('SupplierPartnersRecord') SupplierPartnersRecord: MatPaginator;


  @ViewChild('ActivityReports') ActivityReports: MatPaginator;

  @ViewChild('Appointment') Appointment: MatPaginator;
  @ViewChild('_ActionItem_') _ActionItem_: MatPaginator;
  @ViewChild('call') call: MatPaginator;
  @ViewChild('callrelo') callrelo: MatPaginator;
  @ViewChild('CommentHistory') CommentHistory: MatPaginator;

  @ViewChild('third') third: MatPaginator;
  @ViewChild('supplier_') supplier_: MatPaginator;

  // paginador de mapas
  @ViewChild(MatPaginator) pagMaps: MatPaginator;

  // paginadores y sort de action item immi
  @ViewChild('immiActionItemsort') immiActionItemsort: MatSort;
  @ViewChild('immiActionItempag') immiActionItempag: MatPaginator;

  // paginadores y sort de action item relo
  @ViewChild('reloActionItemsort') reloActionItemsort: MatSort;
  @ViewChild(MatPaginator, {static: true}) reloActionItempag: MatPaginator;
  @ViewChild('immiCallssort') immiCallssort: MatSort;
  @ViewChild(MatPaginator, {static: true}) immiCallsmpag: MatPaginator;

  // paginadores y sort de calls  relo
  @ViewChild('reloCAllssort') reloCAllssort: MatSort;
  @ViewChild(MatPaginator, {static: true}) reloCallspag: MatPaginator;

  // paginadores y sort de action item
  @ViewChild('taskRelpag') taskRelpag: MatPaginator;
  @ViewChild('tasRel') tasRel: MatSort;

  @ViewChild('taskImmpag') taskImmpag: MatPaginator;
  @ViewChild('tasImm') tasImm: MatSort;

  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('thisSelected') private thisSelected: MatOption;

  public can_edit_exp_t = false;

  public show_imm_prof: boolean = false;
  public image_path: string = this._services.url_images;
  public __loader__: LoaderComponent = new LoaderComponent();
  public session_aut: SessionSettings = new SessionSettings(this._router);
  public SO_ID: number = 0;
  public SRDATA: any = undefined;
  public USERDATA: any;
  public dataSource;
  public reportServices: any[] = [];
  public Host_Home_country: any = {};
  public datasupplier_partners;
  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  public displayedColumns: string[] = ['service_record', 'vip', 'status', 'autho_date', 'country', 'city', 'partner', 'client', 'assigne_name', 'services', 'coordinator', 'supplier'];
  public immigration_services_table: string[] = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5', 'campo_6', 'campo_7', 'campo_8'];
  public example_table_data = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' }
  ];

  public loaderr:boolean =false;
  public immigration_supplier_partners_table: string[] = ['campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5', 'campo_6', 'campo_7'];
  public example_table_data_supplier_partners = [
    { status: 1, id: 1, type: "lorem", company: "lorem", supplier: "lorem", accepted_date: "05/03/2019", assigned_date: "05/03/2019" },
    { status: 2, id: 2, type: "lorem", company: "lorem", supplier: "lorem", accepted_date: "05/03/2019", assigned_date: "05/03/2019" },
    { status: 3, id: 4, type: "lorem", company: "lorem", supplier: "lorem", accepted_date: "05/03/2019", assigned_date: "05/03/2019" },
  ];
  public home_country_table_immi: string[] = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Delivered To', 'Autho Date', 'Projected Fee', 'action'];
  public home_country_table_immi_: string[] = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Delivered To', 'Autho Date', 'action'];
  //public home_country_table_immi: string[] = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Delivered To', 'Autho Date', 'Accepted Date', 'Projected Fee', 'action'];
  public home_country_table_rel: string[] = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Autho Time', 'Time Remaining', 'Autho Date', 'Projected Fee', 'action'];
  public home_country_table_rel_: string[] = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Autho Time', 'Time Remaining', 'Autho Date', 'action'];
  //public home_country_table_rel: string[] = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Autho Time', 'Time Remaining', 'Autho Date', 'Accepted Date', 'Projected Fee', 'action'];
  public home_country_table: string[] = ['Status', 'Work Order', 'Category', 'Service ID', 'Service', 'Location', 'Program', 'Autho Time', 'Time Remaining', 'Autho Date', 'Accepted Date', 'Projected Fee', 'action'];
  public home_contry;

  public host_country_table: string[] = ['Status', 'Service Order ID', 'Service', 'Service No.', 'Location', 'Service Charge', 'Delivered To', 'Autho Date', 'Accepted Date', 'fee', 'action'];
  public host_contry;

  public appointment_table: string[] = ['Date', 'Supplier', 'Service', 'Start Time', 'Location', 'Status', 'Documents', 'View'];
  public appointment: any;

  public edit_sr_model: NewServiceRecordData = new NewServiceRecordData();

  SupplierForm: FormGroup;
  public relocation_supplier_form: FormGroup;

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;


  public addSuplier: boolean = false;

  public dataCSuplier: any[];
  public dataCSuplier_type: any[];
  public dataCSuplier_company: any[];

  public TempDataSuplier: any = {};
  public suplierData: any[];
  public assigned_services: any[];

  public supplier_detail: any[];

  public CaBreed: any[] = [];

  public today_date: Date = new Date();

  filteruno: boolean = false;
  filterdos: boolean = false;
  typeFilter = {
    supplierType: ''
  }
  typeSupplier = {
    supplier: ''
  }

  typeLine = {
    serviceLine: ''
  }

  typeProgram = {
    service: ''
  }
  typePrefix = {
    countriesName: ''
  }
  // filtros
  public filterPartner0: any = { coordinator: '' };
  public filterClient0: any = { name: '' };
  public filterPolicy0: any = { policyType: '' };
  public filterHomeCountry0: any = { name: '' };
  public filterHostCountry0: any = { name: '' };
  // filtros de assignee
  public filterNationality0: any = { nationality1: '' };
  public filterPolicy: any = { policyType: '' };
  public filterHomeCountry1: any = { name: '' };
  public filterHomeCity1: any = { name: '' };
  public filterLanguages1: any = { name: '' };
  public filterHostCountry1: any = { name: '' };
  public filterHostCity1: any = { city: '' };
  // filtros dependents
  public filterLanguagesRe2: any = { name: '' };
  public filterNationalityRe2: any = { nationality1: '' };
  public filterGrade2: any = { grade: '' };
  // filtros pets
  public filterPet3: any = { petType: '' };
  public filterSize3: any = { size: '' };
  // filtros immi
  public filterImiAutori: any = { name: '' };
  public filterImiCoordina: any = { coordinatorType: '' };
  public filterImiCoordina2: any = { coordinator: '' };
  public filterStatusImiService: any = { status: '' };
  public filterServiceImmiServ: any = { category: '' };
  public filterStatusHostCount: any = { status: '' };
  public filterServiceHomeCountry: any = { category: '' };
  // filtros relo
  public filterStatusReloService: any = { status: '' };
  public filterServiceReloServ: any = { category: '' };
  public filterStatusHomeCount: any = { status: '' };
  public filterServiceHostCount: any = { category: '' };

  public toppings = new FormControl();
  public toppings_ = new FormControl();
  public fecha_minima = new Date();
  public maskPhone = new FormGroup({
    mobile: new FormControl(''),
    work: new FormControl('')
  });

  public immigration_coordinator_table: string[] = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4'];
  //*******************************************************************************************************************************************************************//
  //SUPPLIER PARTNER//
  public example = [
    { uno: 1, dos: 'Hydrogen', tres: 1.0079, cuatro: 'H', cinco: 'Ellen D', seis: '12 Sep 2020', siete: '40 Oct 2022', ocho: '$34,000', nueve: '5%', diez: '6%' },
  ];
  dataIS: any = {
  };
  dataSourceIS: any;
  displayedColumnsSI: string[] = ['Invoice No.', 'Premier Invoice Date', 'Service Line', 'Work Order', 'Due Date', 'Invoiced Fee', 'Status'];
  displayedColumnsSI_: string[] = ['Invoice No.', 'Premier Invoice Date', 'Service Line', 'Work Order', 'Due Date', 'Status'];
  @ViewChild('supplierSI_') supplierSI_: MatPaginator;


  dataSourceSP: any;
  displayedColumnsSP: string[] = ['Invoice No.', 'Supplier Invoice Date', 'Service Line', 'Work Order', 'Consultant', 'Due Date', 'Invoiced Fee', 'Status'];
  displayedColumnsSP_: string[] = ['Invoice No.', 'Supplier Invoice Date', 'Service Line', 'Work Order', 'Consultant', 'Due Date', 'Status'];
  //Third Party Invoices//
  dataSourceTHIRD: any;
  displayedColumnsTHIRD: string[] = ['Sub Total', 'Management Fee', 'Wire Fee', 'Advance Fee', 'Total', 'Funding Request Date', 'Recurrent', 'Status', 'Country'];
  //TABLE REPORT
  dataSourceReport: any;
  //dataSourceR: any;
  displayedColumnsReport: string[] = ['Date', 'Service Line', 'Work Order', 'Services', 'type', 'Report By', 'Time Used', 'Actions'];

  //TABLE REPORT
  dataSourceRecord: any;
  displayedColumnsRecord: string[] = ['Supplier Type', 'Supplier Company', 'Supplier', 'Assigned Date', 'Assigned Services', 'Status'];
  serviceLine: any;
  program: any;
  complianceLevel: any;
  initialReport: any;
  finalReport: any;
  totalTime: any;
  timeRemaning: any;

  service: any[] = [];
  programR: any[] = [];

  SupplierType: any[] = [];
  Supplier: any;

  HousingSpecification: any = {};
  caAmenity: any[] = [];
  caNumbers: any[] = [];
  caMetric: any[] = [];
  caSize: any[] = [];
  caCurrency: any[] = [];
  caPropertyTypeHousing: any[] = [];
  caContractType: any[] = [];
  _serviciosByConsultantImm: any[] = [];
  _serviciosByConsultantRelo: any[] = [];

  ST: any;
  SU: any;

  homeCountry:string = "";
  homeCity:string = "";

  supplier_table: any;
  displayedColumnsS: string[] = ['Service', 'ServiceID', 'AcceptanceRejectedDate', 'Accepted'];
  public ca_countryServiceRecord = [];

  check = 'assets/table-icons/check.png';
  uncheck = 'assets/table-icons/uncheck.png';
  //*******************************************************************************************************************************************************************//
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));

  constructor(
    public _router: Router,
    public _dialog: MatDialog,
    public _routerParams: ActivatedRoute,
    public _services: ServiceGeneralService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _permissions: NgxPermissionsService,
    private changeDetectorRefs: ChangeDetectorRef,
    public fullC: FullComponent
  ) { }

  public prefix;
  public prefixWork;


  public prefixCatalog;
  profileCunsultant = false;
  ngOnInit() {
    setTimeout(() => {
      this.loaderr=true;
    }, 5000);
    if(this._routerParams.snapshot.params?.tipo == 1){
      let a = document.getElementById("tabActiviy");
      a.click();
      this.get_catalogos();
      this.getReport();
      this.getSupplier();
    }

    if (this.__userlog__.role.id == 3) {
      this.profileCunsultant = true;
    }

    if(this.__userlog__.role.id == 19 || this.__userlog__.role.id == 1){
      this.can_edit_exp_t = true;
    }
    else{
      this.can_edit_exp_t = false;
    }


    const user_rol: string[] = [this.__userlog__.role.id];
    this._permissions.loadPermissions(user_rol);
    this.consultaPermisos();
    this.get_Notification();

    this.SupplierForm = this.formBuilder.group({
      Supplier_Type: [null, [Validators.required]],
      //Supplier_Company: [null, Validators.required],
      Supplier: [null, Validators.required],
     // Assigned_Date: [null, Validators.required]
    });

    this.relocation_supplier_form = this.formBuilder.group({
      Supplier_Type: [null, [Validators.required]],
      //Supplier_Company: [null, Validators.required],
      Supplier: [null, Validators.required],
      Assigned_Date: [null, Validators.required]
    });

    if (this.isUserActive()) {

      this.movePageTo();
      this.getCatalogues();
      this.getSuplier();
      this.initPageSettings();
      this.getDataSuplier();
      this.getAppointment();
      this.getRelocationServices();
      this.getRelocationSuppliers();
      this.DetectaServiceLine();
      this.DetectaExperienceTeam();

      this.dataSource = new MatTableDataSource(this.example_table_data);
      this.dataSource.paginator = this.CommentHistory;

      this.datasupplier_partners = new MatTableDataSource(this.example_table_data_supplier_partners);
      this.datasupplier_partners.paginator = this._paginators_;

      this.coordinators.push(this.coordinator);

      this.immgration_education.push(new EducationalBackgrounds());
      this.immgration_languages.push(new LenguageProficiencies());
      this.immgration_dependent.push(new DependentImmigrationInfos());

      // this._services.retrieveMappedObject().subscribe((receivedObj: any) => { this.initChatBehavior() });

    } else {

      this._router.navigateByUrl('');

    }

    this.get_catalogos();


  }


  ca_notification = [];
  show_buttom:boolean = false;
  SR_Notification : any;
  get_Notification() {
    //this.get_NotificationView();
    let notificaciones = [];
    this._services.service_general_get('Notification/GetNotificationCenter/' + this.__userlog__.id).subscribe((data => { //this.area_orientation.workOrderServicesId
      if (data.success) {
        //console.log('DATA CONSULTA NOTIFICACIONES:', data);
        notificaciones = data.result.value.sort(function (a, b) {
          return b.createdDate.localeCompare(a.createdDate);
        });

        let uux_notificaciones = []
        for (let i = 0; i < notificaciones.length; i++) {
          if ((notificaciones[i].archive == false && notificaciones[i].view == false)) {
            uux_notificaciones.push(notificaciones[i])
          }
        }

        this.ca_notification = uux_notificaciones;
        //console.log("NOTIFICACIONES: ", this.ca_notification);

        this.ca_notification.forEach(E => {
          if(E.notificationType == 1 || E.notificationType == 2){
             if(E.serviceRecordId == this.SO_ID){
              this.show_buttom = true;
              this.SR_Notification = E;
              return;
             }
          }
        });
      }
    }));
  }

  //ACEPTAMOS NOTIFICACION//
  async accept() {
    let data_ = this.SR_Notification;
    this._services.service_general_putnoapi(data_.actionCall.accept, '').subscribe((async resp => {
      if (resp.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Service Record was accepted."
          },
          width: "350px"
        });
	    	let event = true;
        this.show_buttom = false;
        await this.archivar(data_, event);
      }
    }))
  }
  //DECLINAMOS NOTIFICACION//
  async decline() {
    let data_ = this.SR_Notification;
    this._services.service_general_putnoapi(data_.actionCall.rejected, '').subscribe((async data => {
      //console.log(data);
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Service Record was declined."
          },
          width: "350px"
        });
	     	let event = true;
        this.show_buttom = false;
        await this.archivar(data_, event);
      }
    }))
  }

  archivar(data, event) {
    //console.log(data);
      this._services.service_general_put('Notification/PutArchive/' + data.id + '/' + true, '').subscribe((_data_ => {
        if (_data_.success) {
			    //console.log("Archivada : ", _data_);
          this.show_buttom = false;
          this.marcarLeida(data)
        }
      }));
  }

  marcarLeida(data) {
    //console.log(data);
      let viewt = true;
      this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + viewt, '').subscribe((data => {
        if (data.success) {
			    //console.log("leida : ", data);
          this.fullC.get_Notification();
          this.initPageSettings();
          this.show_buttom = false;
          //this.ngOnInit();
        }
      }));
  }

  getCountryServiceRecord() {

    this._services.service_general_get(`ServiceRecord/Countries/${this.edit_sr_model.id}`).subscribe((data => {
      if (data.success) {
        this.ca_countryServiceRecord = data.result.value;
        //console.log('this.countryServiceRecord', this.ca_countryServiceRecord)
      }
    }))
  }






  //*****************************************************************//
  public permission_read: boolean = false;
  public permission_write: boolean = false;
  public permission_delete: boolean = false;
  public permission_edit: boolean = false;

  consultaPermisos() {
    //console.log("CONSULTA PARA PERMISOS DE USUARIO");
    let url = localStorage.getItem('url_permisos');
    console.log("Permisos URL ===================================================: ", url)
    this._services.service_general_get('Role/' + url).subscribe(data => {
      if (data.success) {
        this.permission_read = data.result.value[0].reading;
        this.permission_write = data.result.value[0].writing;
        this.permission_edit = data.result.value[0].editing;
        this.permission_delete = data.result.value[0].deleting;
      }
    })
  }
  //*****************************************************************//
  //INFO SUPPLIER PARTNER//
  public email_premier: any;
  public mobile_number: any;
  public phone_number: any;
  public supplier_since: any;
  public photo_supplier: any;
  getInfoSupplierPartner() {

    let info_supplier = [];
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnersBySR/' + this.SO_ID).subscribe((data => {
      if (data.success) {
        info_supplier = data.result.value;
        for (let i = 0; i < info_supplier.length; i++) {
          for (let j = 0; j < this.edit_sr_model.immigrationSupplierPartners.length; j++) {
            if (info_supplier[i].id == this.edit_sr_model.immigrationSupplierPartners[j].supplierId) {
              this.photo_supplier = info_supplier[i].photo;
              this.phone_number = info_supplier[i].phone;
            }
          }
        }
      }
    }))
  }
  // refresca los mattable
  refresh(){
    this.changeDetectorRefs.detectChanges();
  }
  //COMMENTS HISTORY//
  getCommentsHistory() {

    this._services.service_general_post_with_url(`ServiceOrder/GetCommentsHostory/${this.SO_ID}`, '').subscribe((data => {
      let datos = data.result.value;
      let name;
      let reply;
      datos.forEach(E => {
        if (E.nameAndReply.length > 0) {
          E.name = E.nameAndReply[0].name;
          E.reply = E.nameAndReply[0].reply;
        }
      });

      this.dataSource = new MatTableDataSource(datos);
      this.dataSource.paginator = this.CommentHistory;
      this.dataSource.sort = this.sortable;

    }))

  }

  viewHistory(data) {
    const dialogRef = this._dialog.open(DialogCommentHistoryComponent, {
      data: data,
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  //*******************//
  /* 2. Functions */
  public wos_imm_ = 0;
  public wos_relo_ = 0;
  public no_main_photo: boolean = false;
  public current_email: string = '';
  public hold_imm_coor_data: immigrationCoodinators[] = [new immigrationCoodinators()];
  public hold_rel_coor_data: relocationCoordinators[] = [new relocationCoordinators()];
  public initPageSettings(): void {

    this.SO_ID = this._routerParams.snapshot.params.id;

    this.__loader__.showLoader();

    this._services.service_general_get(`ServiceRecord/GetServiceRecordById?id=${this.SO_ID}&user=${this.USERDATA.id}`)
      .subscribe((response: any) => {

        if (response.success) {
          console.log("DataServiceRecordById",response);
          console.log("SRDATA", response.result);
          this.SRDATA = response.result;

          this._services.service_general_get("ServiceRecord/GetHomeCountryById?id="+response.result.assigneeInformations[0].homeCountryId).subscribe(result => {
            this.homeCountry = result;
          });

          this._services.service_general_get("ServiceRecord/GetHomeCityById?id="+response.result.assigneeInformations[0].homeCityId).subscribe(result => {
            this.homeCity = result;
          });

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

          if(this.SRDATA.relocationSupplierPartners.lengt > 0 && this.SRDATA.immigrationSupplierPartners.lengt == 0){
            this.data_directory.serviceLine = 2;
          }
          this.edit_sr_model = this.SRDATA;


          ////////////////mostrr tabs de RELO e IMM
          if(this.edit_sr_model.workOrders.length == 0){
            this.wos_imm_ = 0;
            this.wos_relo_ = 0;
          }
          else{
            for (let i = 0; i < this.edit_sr_model.workOrders.length; i++) {
              const element = this.edit_sr_model.workOrders[i];
              if(element.serviceLineId == 1 )
              {
                this.wos_imm_ = this.wos_imm_ + 1;
              }
              if(element.serviceLineId == 2 )
              {
                this.wos_relo_ = this.wos_relo_ + 1;
              }
            }
          }



          //this.city_home_catalogue  = this._services.getCatalogueFrom('CitiesById', response.result.assigneeInformations[0].homeCityId);

          //console.log('data sr', this.edit_sr_model);
          // separar prefix de phone number
          // si el valor de mobilephone no es mayor a 10 caracteres entonces no tiene prefijo y toma el valor actual desde la bd asi vienen con prefijo  93+6567567567 o sin 6567567567
          if (this.edit_sr_model.assigneeInformations[0].mobilePhone != '' && this.edit_sr_model.assigneeInformations[0].mobilePhone != null)
          {
            let search = '+';
            // obtener la posicion de +
            let posicion = this.edit_sr_model.assigneeInformations[0].mobilePhone.indexOf(search);
            // obtener el valor de prefix
            this.prefix = this.edit_sr_model.assigneeInformations[0].mobilePhone.substr(0, posicion);
            // obtener valor phone
            this.edit_sr_model.assigneeInformations[0].mobilePhone = this.edit_sr_model.assigneeInformations[0].mobilePhone.substr(posicion + 1);

          }
          // sacar prefix de work phone
          if (this.edit_sr_model.assigneeInformations[0].workPhone != '' && this.edit_sr_model.assigneeInformations[0].workPhone != null)
          {
            let search = '+';
            // obtener la posicion de +
            let posicion = this.edit_sr_model.assigneeInformations[0].workPhone.indexOf(search);
            // obtener el valor de prefix
            this.prefixWork = this.edit_sr_model.assigneeInformations[0].workPhone.substr(0, posicion);
            // obtener valor phone
            this.edit_sr_model.assigneeInformations[0].workPhone = this.edit_sr_model.assigneeInformations[0].workPhone.substr(posicion + 1);

          }


          this.getClient();
          this.athorizedBy();
          this.getCoordinatorImmigration();
          this.getCoordinatorRelocation();
          for (let i = 0; i < this.edit_sr_model.assigneeInformations[0].petsNavigation.length; i++) {
            this.GetBreed(this.edit_sr_model.assigneeInformations[0].petsNavigation[i].petTypeId, i)
          }
          //this.GetBreed();
          this.edit_sr_model.assigneeInformations[0].sexId =
            this.edit_sr_model.assigneeInformations[0].sexId.toString();

          this.current_email = this.edit_sr_model.assigneeInformations[0].email;

          let photo_assing: string = this.edit_sr_model.assigneeInformations[0].photo;

          //console.log(photo_assing);
          if (photo_assing == undefined || photo_assing == null || photo_assing == '') {

            this.no_main_photo = true;

          } else {

            if (this.edit_sr_model.assigneeInformations[0].photo.indexOf(this.image_path) <= -1) {

              this.edit_sr_model.assigneeInformations[0].photo = this.edit_sr_model.assigneeInformations[0].photo;

            }

          }

          if (this.edit_sr_model.immigrationCoodinators.length != 0) {

            this.hold_imm_coor_data = this.edit_sr_model.immigrationCoodinators;

          }

          if (this.edit_sr_model.relocationCoordinators.length != 0) {

            this.hold_rel_coor_data = this.edit_sr_model.relocationCoordinators;

          }

          this.setDependentsConfiguration();
          this.setPetsConfiguration();

          this.isFollowing(this.edit_sr_model.follows);

          this.getImmigrationDataStatus(this.edit_sr_model.id);

          this.__loader__.hideLoader();

          this.initNationalitySelector();
          this.initLanguageSelector();
          this.DetectaServiceLine();
          this.DetectaExperienceTeam();
          this.show_ass_depd_errors = false;
          this.show_pets_erros = false;

          //console.log('[CP353] Data edit_sr_model  => ', this.edit_sr_model);
          localStorage.setItem('partnerID', JSON.stringify(this.edit_sr_model.partnerId));
          this.getCountryServiceRecord();
        } else {

          this._router.navigateByUrl('serviceRecord');

        }

      }, (error: any) => {

        console.error('Error (GetServiceRecordById) => ', error);

        this.__loader__.hideLoader();

      });

  }

  partnerChange() {
    localStorage.setItem('partnerID', JSON.stringify(this.edit_sr_model.partnerId));
  }

  goBack() {
    window.history.back();
  }

  public show_language_dropdown: boolean = false;
  public showLanguagesDropdow(): void {

    !this.show_language_dropdown ?
      this.show_language_dropdown = true :
      this.show_language_dropdown = false;

  }

  public user_nationalities: any[] = undefined;
  public initNationalitySelector(): void {
    const nationality_selected: any[] = this.edit_sr_model.assigneeInformations[0].nationalityAssigneeInformations;

    let nationality_pre_selected: number[] = [];

    nationality_selected.forEach((nationality: any) => {

      nationality_pre_selected.push(nationality.nationalityId);

    });

    this.edit_sr_model.assigneeInformations[0].nationalityAssigneeInformations = [];
    this.edit_sr_model.assigneeInformations[0].nationalityAssigneeInformations = nationality_pre_selected;

  }

  public user_languages: any[] = undefined;
  public initLanguageSelector(): void {

    const languages_selected: any[] = this.edit_sr_model.assigneeInformations[0].languagesSpokens;

    let languages_pre_selected: number[] = [];

    languages_selected.forEach((language: any) => {

      languages_pre_selected.push(language.languages);

    });

    this.edit_sr_model.assigneeInformations[0].languagesSpokens = [];
    this.edit_sr_model.assigneeInformations[0].languagesSpokens = languages_pre_selected;
  }

  public languages_selected: string = '';
  public selectingLanguages(language_in: any): void {

    if (language_in.active) language_in.active = false;
    else language_in.active = true

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

  public setDependentsConfiguration(): void {

    const dependents_in: DependentInformationsModel[] = this.edit_sr_model.assigneeInformations[0].dependentInformations;

    if (dependents_in.length == 0) {



    } else {

      this.toggleDependentsSection();
      this.assign_dependents = dependents_in;

      this.assign_dependents.forEach((dependent: DependentInformationsModel) => {

        if (dependent.photo.indexOf(this.image_path) <= -1) {

          dependent.photo = this.image_path + dependent.photo;

        }

        if (dependent.languageDependentInformations.length != 0) {

          let hold_lan_id: number[] = [];

          dependent.languageDependentInformations.forEach((language: LanguagesSpokensModelDependent) => {

            hold_lan_id.push(language.language);

          });

          dependent.languageDependentInformations = [];
          dependent.languageDependentInformations = hold_lan_id;

        }

      });

    }

  }

  public setPetsConfiguration(): void {

    const pets_in: PetsNavigationModel[] = this.edit_sr_model.assigneeInformations[0].petsNavigation;

    if (pets_in.length == 0) {



    } else {

      this.togglePetsSection();
      this.pets = pets_in;

      this.pets.forEach((pet: PetsNavigationModel) => {

        if (pet.photo != undefined || pet.photo != null) {

          if (pet.photo.indexOf(this.image_path) <= -1) {

            pet.photo = this.image_path + pet.photo;

          }

        }

      });

    }

  }

  public isUserActive(): boolean {

    let result: boolean = false;
    const user_in = localStorage.getItem('userData');

    if (user_in != undefined) {

      this.USERDATA = JSON.parse(user_in);
      //console.log(this.USERDATA);
      result = true;

    } else {

      result = false;

    }

    return result;

  }

  _immObject: any[] = [];

  tosslePerOne(thisSelected, id, idsuplier, service, index){

    if (!thisSelected.selected) {
      this._immObject.splice(index ,1);
    }
   if(thisSelected._selected){
    this._immObject.push({
      "immigrationSupplierPartnerId": idsuplier,
      "serviceOrderServicesId": id,
      "service": service
    });
   }

 }

  toggleAllSelection() {
     if (this.allSelected.selected) {
       this.toppings
         .patchValue([...this._serviciosByConsultantImm.map(item => item.id), 0]);

         this.toppings.value.forEach((element,index) => {
           if(element == this._serviciosByConsultantImm[index]?.id)
           {
            this._immObject.push({
              "immigrationSupplierPartnerId": element.idsuplier,
              "serviceOrderServicesId": element.id,
              "service": element.service
            });
           }
         });
     } else {
       this.toppings.patchValue([]);
       this._immObject = [];
     }
   }

  public getDataSuplier() {
    this._services.service_general_get('Immigration/GetSupplierPartnerImmigration?serviceRecord=' + this.SO_ID)
      .subscribe((response: any) => {
        this.__loader__.hideLoader();
        if (response.success) {
          if(response.result.value[0]?.unionAll != undefined){
            this.suplierData = response.result.value;
            this._serviciosByConsultantImm = response.result.value[0]?.unionAll;
          }
          else
          {
            this.suplierData = [];
            this._serviciosByConsultantImm = response.result.value;
          }

        }
      }, (err) => {
        console.log("Error a consultar los supplier asignados a la SR: ", err);
      })
  }

  tosslePerOneRelo(thisSelected, id, idsuplier, service, index){

    if (!thisSelected.selected) {
      this._immObject.splice(index ,1);
    }
   if(thisSelected._selected){
    this._immObject.push({
      "immigrationSupplierPartnerId": idsuplier,
      "serviceOrderServicesId": id,
      "service": service
    });
   }

 }

  toggleAllSelectionRelo() {
     if (this.allSelected.selected) {
       this.toppings
         .patchValue([...this._serviciosByConsultantRelo.map(item => item.id), 0]);

         this.toppings.value.forEach((element,index) => {
           if(element == this._serviciosByConsultantRelo[index]?.id)
           {
            this._immObject.push({
              "immigrationSupplierPartnerId": element.idsuplier,
              "serviceOrderServicesId": element.id,
              "service": element.service
            });
           }
         });
     } else {
       this.toppings.patchValue([]);
       this._immObject = [];
     }
   }

  public relocation_suppliers: any[] = [];
  public getRelocationSuppliers(): void {
    //
    let _country = '';
    if(this.relocation_supplier_data.supplierTypeId != undefined){
      _country = '&countryId='+ this.relocation_supplier_data.supplierTypeId;
    }
    console.log("this.supplierTypeId",this.relocation_supplier_data.supplierTypeId);
    this._services.service_general_get(`Relocation/GetSupplierPartnerRelocation?serviceRecord=${this.SO_ID}`+ _country)
      .subscribe((response: any) => {
        console.log("consultores-->>>",response);
        this.__loader__.hideLoader();
        if (response.success) {

          if(response.result.value[0]?.unionAll != undefined){
            this.relocation_suppliers = response.result.value;
            this._serviciosByConsultantRelo = response.result.value[0]?.unionAll;
          }
          else
          {
            this.relocation_suppliers = [];
            this._serviciosByConsultantRelo = response.result.value;
          }

        }

      });

  }

  services_appointment:any;

  public getAppointment() {

    this._services.service_general_get('Appointment/GetAppointmentByServiceRecordId?id=' + this.SO_ID)
      .subscribe((response: any) => {
        if (response.success) {
          this.appointment = new MatTableDataSource(response.result.value);
          this.appointment.paginator = this.Appointment;
          this.appointment.sort = this.sort;
        }
      })
  }

  public view_upplier_detail(data) {
    this.supplier_detail = data;
  }

  public goToProfile(id) {
    this._router.navigateByUrl('profileconsultant/' + id);
  }

  public getSuplier() {
    this._services.service_general_get("Catalogue/GetSupplier").subscribe((data => {
      if (data.success) {
        this.dataCSuplier = data.result;
      }
    }))

    this._services.service_general_get("Catalogue/GetSupplierTypeCatalogue?id=2&id=5").subscribe((data => {
      if (data.success) {
        this.dataCSuplier_type = data.result;
      }
    }))

  }

  public getCompany(id, type) {
    let country = 0;
    let city = 0;
    if (id == 1) {
      country = this.edit_sr_model.assigneeInformations[0].homeCountryId;
      city = this.edit_sr_model.assigneeInformations[0].homeCityId;
    } else {
      country = this.edit_sr_model.assigneeInformations[0].hostCountry;
      city = this.edit_sr_model.assigneeInformations[0].hostCityId;
    }

    const extra_data = `?country=${country}&city=${city}&serviceLine=${type}`;
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerConsultant' + extra_data).subscribe((data => {
      if (data.success) {
        this.dataCSuplier_company = data.result.value;
      }
    }));
  }

  type_company :any;
  type_companyId :any;
  public company_(){
    let ca = JSON.parse(localStorage.getItem("catalogo"));
    for(let i = 0; i < ca.length; i++){
       if(ca[i].id == this.TempDataSuplier.supplierId){
           this.type_company = ca[i].company;
           this.type_companyId = ca[i].companyId
       }
    }
  }

  type_company_relocation :any;
  type_companyId_relocation :any;
  public company_Relocation(){
    this.getRelocationSuppliers();
    let ca = JSON.parse(localStorage.getItem("catalogorel"));
    for(let i = 0; i < ca.length; i++){
       if(ca[i].id == this.relocation_supplier_data.supplierId){
           this.type_company_relocation = ca[i].company;
           this.type_companyId_relocation = ca[i].companyId
       }
    }
  }

  public async __supplier__(country, city, serviceLine): Promise<any> {
    const extra_data = `?country=${country}&city=${city}&serviceLine=${serviceLine}`;
    this._services.service_general_get('SupplierPartnerProfile/GetConsultantContactsConsultants' + extra_data).subscribe((data => {
      if (data.success) {
        localStorage.setItem("catalogo", JSON.stringify(data.result.value));
        let datas = data.result.value;
        for (let i = 0; i < this.suplierData.length; i++) {
          const element = this.suplierData[i].supplier_Detail[0];
          for (let j = 0; j < datas.length; j++) {
            const sup = datas[j];
            if(sup.id == element.id){
              datas.splice(j, 1);
            }
          }
        }
        this.dataCSuplier = datas;
      }
    }));
  }

  ////
  dataCSuplierRel: any[] = [];
  public async __supplier__r(country, city, serviceLine): Promise<any> {
    const extra_data = `?country=${country}&city=${city}&serviceLine=${serviceLine}`;
    this._services.service_general_get('SupplierPartnerProfile/GetConsultantContactsConsultants' + extra_data).subscribe((data => {
      if (data.success) {
        localStorage.setItem("catalogorel", JSON.stringify(data.result.value));
        let datas = data.result.value;
        for (let i = 0; i < this.relocation_suppliers.length; i++) {
          const element = this.relocation_suppliers[i].supplier_Detail[0];
          for (let j = 0; j < datas.length; j++) {
            const sup = datas[j];
            if(sup.id == element.id){
              datas.splice(j, 1);
            }
          }
        }
        this.dataCSuplierRel = datas;
      }
    }));
  }




  public saveSuplier() {
    this.__loader__.showLoader();
    this.TempDataSuplier.assignedDate = new Date();
    this.TempDataSuplier.supplierCompanyId = this.type_companyId;

    if (!this.SupplierForm.valid) {
      this.__loader__.hideLoader();
      return;
    }

    this.TempDataSuplier.id = 0;
    this.TempDataSuplier.updateBy = this.USERDATA.id;
    this.TempDataSuplier.serviceRecordId = this.edit_sr_model.id;
    this.TempDataSuplier.statusId = null;
    this.TempDataSuplier.createdBy = this.USERDATA.id;
    this.TempDataSuplier.createdDate = new Date();
    this.TempDataSuplier.updatedDate = new Date();

    this._services.service_general_post_with_url("Immigration/CreateSupplierPartnerImmigration", this.TempDataSuplier).subscribe(data => {
      if (data.success) {
        this.TempDataSuplier.service.forEach(element => {
          let event = {
            checked: true
          }
          this.addordeleteservices(event, element, data.result.id, element)
        });

        this.TempDataSuplier = {};
        this.addSuplier = false;
        this.type_company = null;
           this.type_companyId = null;
        this.getDataSuplier();
        this.__loader__.hideLoader();
      }
    })

  }

  getNameCountry(id) {
    for (let i = 0; i < this.country_catalogue.length; i++) {
      if (this.country_catalogue[i].id == id) {
        return this.country_catalogue[i].name;
      }
    }
  }

  getNameCityHost(id){
    for (let i = 0; i < this.city_host_catalogue.length; i++) {
      const element = this.city_host_catalogue[i];
      if(element.id == id){
        return element.city;
      }
    }
  }

  getNameOffice(id) {
    for (let i = 0; i < this.office_catalogues.length; i++) {
      if (this.office_catalogues[i].id == id) {
        return this.office_catalogues[i].office;
      }
    }
  }

  getNamePartner(id) {
    for (let i = 0; i < this.parther_catalogue.length; i++) {
      if (this.parther_catalogue[i].id == id) {
        return this.parther_catalogue[i].coordinator;
      }
    }
  }

  getNameClient(id) {
    for (let i = 0; i < this.client_catalogue.length; i++) {
      if (this.client_catalogue[i].id == id) {
        return this.client_catalogue[i].name;
      }
    }
  }
  getPolicyType(id) {
    for (let i = 0; i < this.policytype_catalogue.length; i++) {
      if (this.policytype_catalogue[i].id == id) {
        return this.policytype_catalogue[i].policyType;
      }
    }
  }
  getHomeCountry(id) {
    for (let i = 0; i < this.country_catalogue.length; i++) {
      if (this.country_catalogue[i].id == id) {
        return this.country_catalogue[i].name;
      }
    }
  }


  deleteAppointment(i, data){
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Delete confirmation",
          body: "Are you sure to cancel this appointment?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        this.__loader__.showLoader();
        if (result) {
          this._services.service_general_delete("Appointment?key=" + data.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Appointment canceled successful'
                },
                width: "350px"
              });
              this.__loader__.hideLoader();
              this.ngOnInit();
            }
          }))
        }
      });
    }


  public relocation_supplier_data: any = {};
  public postRelocationSupplier(): void {
    this.__loader__.showLoader();
    this.relocation_supplier_data.assignedDate = new Date();
    this.relocation_supplier_data.supplierCompanyId = this.type_companyId_relocation;
      if (this.relocation_supplier_data.supplierId === undefined ||
        this.relocation_supplier_data.supplierId === null) {
      return;
    }

    this.relocation_supplier_data.id = 0;
    this.relocation_supplier_data.updateBy = this.USERDATA.id;
    this.relocation_supplier_data.statusId = null;
    this.relocation_supplier_data.serviceRecordId = this.edit_sr_model.id;
    this.relocation_supplier_data.createdBy = this.USERDATA.id;
    this.relocation_supplier_data.createdDate = new Date();
    this.relocation_supplier_data.updatedDate = new Date();
    this._services.service_general_post_with_url(`Relocation/CreateSupplierPartner`, this.relocation_supplier_data)
      .subscribe((response: any) => {

        if (response.success) {

          this.relocation_supplier_data.service.forEach(element => {
            let event = {
              checked: true
            }
            this.addordeleteservicesRelocation(event, element, response.result.id, element);
          });

          this.relocation_supplier_data = {};
          this.type_company_relocation = null;
           this.type_companyId_relocation = null;
          this.showRelocationSupForm();
          this.getRelocationSuppliers();

        }

      });

  }

  public relocation_home_services: any[] = [];
  public relocation_host_services: any[] = [];
  public getRelocationServices(): void {
    this.__loader__.showLoader()
    this._services.service_general_get(`ServiceRecord/GetServices/${this.SO_ID}?type=2`+"&userId="+this.USERDATA.id)
      .subscribe((response: any) => {

        if (response.success) {
          this.homeRel = response.map.value.home.length;
          this.hostRel = response.map.value.host.length;
          this.relocation_home_services = response.map.value.home;
          this.relocation_host_services = response.map.value.host
          this.__loader__.hideLoader()
        }

      }, (error: any) => {

        console.error('[CP455] ServiceRecord/GetServices ==> ', error);

      });

  }

  public showaddSuplier() {
    this.addSuplier = true;
    this.getDataSuplier();
  }

  public parther_catalogue: any = [];
  public client_catalogue: any = [];
  public policytype_catalogue: any = [];
  public country_catalogue: any = [];
  public country_catalogue_home: any = [];
  public nationality_catalogue: any = [];
  public autoriza_catalogue: any = [];
  public marital_catalogue: any = [];
  public assigment_catalogue: any = [];
  public city_host_catalogue: any = [];
  public city_home_catalogue: any = [];
  public documenttype_catalogue: any = [];
  public relationship_catalogue: any = [];
  public languages_catalogue: any = [];
  public pettype_catalogue: any = [];
  public weightmeasure_catalogue: any = [];
  public petsize_catalogue: any = [];
  public coordinatortype_catalogue: any = [];
  public coordinator_catalogue: any = [];
  public visacategory_catalogue: any = [];
  public proficiency_catalogue: any = [];
  public hightschool_catalogue: any = [];
  public assduration_catalogue: any = [];
  public schoolgrades_catalogue: any[] = [];
  public gender_catalogue: any[] = [];
  public office_catalogues: any[] = [];
  public sp_catalog: any[] = [];
  public ca_serviceLine = [];
  public ca_status = [];
  public async getCatalogues(): Promise<void> {
    this.__loader__.showLoader();
    this.ca_status = await this._services.getCatalogueFrom('GetStatusInvoice');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.sp_catalog = await this._services.getCatalogueFrom('GetSupplierPartnerType');
    this.parther_catalogue = await this._services.getCatalogueFrom('GetPartner');
    this.policytype_catalogue = await this._services.getCatalogueFrom('GetPolicyType');
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.country_catalogue_home = await this._services.getCatalogueFrom('GetCountry');
    this.nationality_catalogue = await this._services.getCatalogueFrom('Nationalities');
    this.marital_catalogue = await this._services.getCatalogueFrom('GetMaritalStatus');
    this.assigment_catalogue = await this._services.getCatalogueFrom('GetAssignedService');
    this.relationship_catalogue = await this._services.getCatalogueFrom('GetRelationship');
    this.pettype_catalogue = await this._services.getCatalogueFrom('GetPetType');
    this.languages_catalogue = await this._services.getCatalogueFrom('GetLanguages');
    this.weightmeasure_catalogue = await this._services.getCatalogueFrom('GetWeightMeasure');
    this.petsize_catalogue = await this._services.getCatalogueFrom('GetSize');
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
    this.coordinatortype_catalogue = await this._services.getCatalogueFrom('GetCoordinatorType');
    this.visacategory_catalogue = await this._services.getCatalogueFrom('GetVisaCategory');
    this.proficiency_catalogue = await this._services.getCatalogueFrom('GetProficiency');
    this.hightschool_catalogue = await this._services.getCatalogueFrom('GetHighestLevelEducation');
    this.assduration_catalogue = await this._services.getCatalogueFrom('GetDurationForServiceRecord');
    this.schoolgrades_catalogue = await this._services.getCatalogueFrom('GetGradeSchooling');
    this.gender_catalogue = await this._services.getCatalogueFrom('GetSex');
    this.office_catalogues = await this._services.getCatalogueFrom('GetOffice');

    const host_country: number = this.edit_sr_model.assigneeInformations[0].hostCountry,
      home_country: number = this.edit_sr_model.assigneeInformations[0].homeCountryId;


    this.Host_Home_country = {
      host_country: this.edit_sr_model.assigneeInformations[0].hostCountry,
      home_country: this.edit_sr_model.assigneeInformations[0].homeCountryId,
    }
    this.city_host_catalogue = await this._services.getCatalogueFrom('GetState', `?country=${host_country}`);
    this.city_home_catalogue = await this._services.getCatalogueFrom('Generic/CitiesById/', this.edit_sr_model.assigneeInformations[0]?.homeCityId?.toString());

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

    this.__loader__.hideLoader();
  }

  athorizedBy() {
    this._services.service_general_get("Catalogue/GetAuthorizedBy/" + this.edit_sr_model.partnerId + "/" + this.edit_sr_model.assigneeInformations[0].homeCountryId + "/" + this.edit_sr_model.assigneeInformations[0].homeCityId).subscribe((data => {
      if (data.success) {
        this.autoriza_catalogue = data.result.value;
      }
    }));
  }

  getClient() {
    this._services.service_general_get("Catalogue/GetClient/" + this.edit_sr_model.partnerId).subscribe((data => {
      if (data.success) {
        this.client_catalogue = data.result.value;
      }
    }));
  }
  coordinator_catalogue_aux = [];
  getCoordinatorImmigration() {
    this._services.service_general_get("Catalogue/GetCoordinator/" + this.edit_sr_model.partnerId + "?servileLine=" + 1).subscribe((data => {
      if (data.success) {
        let aux = data.result.value;
        localStorage.setItem("coordinator_catalogue",JSON.stringify(data.result.value));
        for (let i = 0; i <  aux.length; i++) {
          const element =  aux[i];
          for (let j = 0; j < this.edit_sr_model.immigrationCoodinators.length; j++) {
            const elementdos = this.edit_sr_model.immigrationCoodinators[j];
            if(element.id == elementdos.coordinatorId){
              aux.splice(i,1);
            }
          }
        }
        this.coordinator_catalogue = aux;
      }
    }));
  }

  coordinator_catalogue_rel = [];
  coordinator_catalogue_rel_aux = [];
  getCoordinatorRelocation() {
    this._services.service_general_get("Catalogue/GetCoordinator/" + this.edit_sr_model.partnerId + "?servileLine=" + 2).subscribe((data => {
      if (data.success) {
        let aux = data.result.value;
        localStorage.setItem("coordinator_catalogue_rel",JSON.stringify(data.result.value));
        for (let i = 0; i <  aux.length; i++) {
          const element =  aux[i];
          for (let j = 0; j < this.edit_sr_model.relocationCoordinators.length; j++) {
            const elementdos = this.edit_sr_model.relocationCoordinators[j];
            if(element.id == elementdos.coordinatorId){
              aux.splice(i,1);
            }
          }
        }
        this.coordinator_catalogue_rel = aux;
      }
    }));
  }


  getNameCoordinatorRelocation(id) {
    this.coordinator_catalogue_rel_aux = JSON.parse(localStorage.getItem("coordinator_catalogue_rel"));
    for (let i = 0; i < this.coordinator_catalogue_rel_aux.length; i++) {
      if (this.coordinator_catalogue_rel_aux[i].id == id) {
        return this.coordinator_catalogue_rel_aux[i].coordinator;
      }
    }

    return '';

  }

  homeSelected: number = 0;
  getcityhome(id) {
    this.__loader__.showLoader();
    this._services.service_general_get("CountryAdminCenter/GetCityByCountryId?countryId=" + id).subscribe((data => {
      if (data.success) {
        this.city_home_catalogue = data.result;
        this.__loader__.hideLoader();
      }
    }))

    if(this.homeSelected != 0){
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Change confirmation",
          body: "If you change this option, partner providers will be eliminated. Do you want to continue?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cleanSup();
        }else{
          this.edit_sr_model.assigneeInformations[0].homeCountryId = this.homeSelected;
        }
      });
    }else{
      this.homeSelected = this.edit_sr_model.assigneeInformations[0].homeCountryId;
    }
  }

  getcityhome1(id) {
  //  this.__loader__.showLoader();
    this._services.service_general_get("CountryAdminCenter/GetCityByCountryId?countryId=" + id).subscribe((data => {
      if (data.success) {
        this.city_home_catalogue = data.result;
      }
    }))


  }

  getcityhost(id) {
    this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe((data => {
      if (data.success) {
        this.city_host_catalogue = data.result;
      }
    }))
  }

  data_coordinator:any;
  view_upplier_coordinador(id){
    this.coordinator_catalogue_aux = JSON.parse(localStorage.getItem("coordinator_catalogue"));
    for (let i = 0; i < this.coordinator_catalogue_aux.length; i++) {
      if(this.coordinator_catalogue_aux[i].id == id){
         this.data_coordinator = this.coordinator_catalogue_aux[i];
      }
    }
  }

  view_upplier_coordinador_relocation(id){
    this.coordinator_catalogue_rel_aux = JSON.parse(localStorage.getItem("coordinator_catalogue_rel"));
    for (let i = 0; i < this.coordinator_catalogue_rel_aux.length; i++) {
      if(this.coordinator_catalogue_rel_aux[i].id == id){
         this.data_coordinator = this.coordinator_catalogue_rel_aux[i];
      }
    }
  }

  public showDialogEditServices(): void {

    const currents_so: any = this.edit_sr_model.serviceOrders;
    const dialogRef = this._dialog.open(DialogEditServices, {
      data: {
        so: currents_so,
        id: this.edit_sr_model.id,
        user_id: this.USERDATA.id,
        partner: this.edit_sr_model.partnerId,
        client: this.edit_sr_model.clientId,
        home_contry: this.edit_sr_model.assigneeInformations[0].homeCountryId,
        home_city: this.edit_sr_model.assigneeInformations[0].homeCityId,
        host_country: this.edit_sr_model.assigneeInformations[0].hostCountry,
        host_city: this.edit_sr_model.assigneeInformations[0].hostCityId
      }, width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.setAssingDepenAndPets();

    });

  }

  public showDialogentryVisa(data, home_host): void {
    data.partnerId = this.edit_sr_model.partnerId;
    data.numberServiceRecord = this.edit_sr_model.numberServiceRecord;
    data.sr = this.SO_ID;
    data.data = data;
    if (home_host == 2) {
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

    data.home_host = home_host;
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
        const dialogRef = this._dialog.open(dialog, {
          data: data,
          width: "95%"
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getRelocationImmigrationServices_("imm");
        });

      }
    }

    if (data.dialog_type == 28) {
      if (data.service != 0) {
        const dialogRef = this._dialog.open(dialog, {
          data: data,
          width: "95%"
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getRelocationImmigrationServices_("imm");
        });

      }
    }
  }

  animateToTop() {
    var scrollToTop = window.setInterval(function () {
      var pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 10);
  }

  doSomethingOnScroll(e) {
  }

  public addordeleteservices(event, id, id_siplier, service) {
    let datos = [{
      "immigrationSupplierPartnerId": id_siplier,
      "serviceOrderServicesId": id,
      "service": service
    }]

    if (event.checked) {

      this._services.service_general_post_with_url("Immigration/AddAssignedImmigration", datos).subscribe((data => {
        if (data.success) {
          document.getElementById('active-tab').click();
          this.ngOnInit();
          document.getElementById('services_supplier').scrollIntoView();
        }
      }))
    } else {
      this._services.service_general_delete_with_url("Immigration/DeleteAssignedImmigration?id=" + id).subscribe((data => {
        document.getElementById('active-tab').click();
        this.ngOnInit();
        document.getElementById('services_supplier').scrollIntoView();
      }))
    }
  }


  public showEscalateDialog(): void {

    const dialogRef = this._dialog.open(DialogEscalateComponent, {
      data: {
        id_sr: this.edit_sr_model.id,
        id_user: this.USERDATA.id,
        user_log_name: `${this.USERDATA.name} ${this.USERDATA.lastName}`,
        wos: this.SRDATA.workOrders
      }, width: "100%"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  open_standalone_modal(type, id) {
    type.partnerId = this.edit_sr_model.partnerId;
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
       // moda = HomeFindingComponent;
          //this._router.navigate(['homefindingfull/' + type.service[0].id ], { queryParams: { 'param1': 123, 'param2': 321 } });
          this._router.navigate(['homefindingfull/' + type.service[0].id ]);
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
        this.showDialogRelocation(type, id);
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

    if (type.dialog_type != 17  && type.dialog_type != 21  ) {
      type.home_host = id;
      const dialogRef = this._dialog.open(moda, {
        data: {
          sr: this.SO_ID,
          data: type,
        },
        maxWidth: '95vw',
        maxHeight: '90vh',
        height: '90%',
        width: '95%',
      });

      dialogRef.afterClosed().subscribe((so_added: any) => {
        this.ngOnInit();
        this.getRelocationServices();
      });
    }
  }

  getRelocationImmigrationServices_(which_tab) {
    this.__loader__.showLoader();
    var tipo = 0;
    if (which_tab == "imm") {
      tipo = 1;
    } else if (which_tab == "rel") {
      tipo = 2;
    }
    if (tipo > 0) {
      this._services.service_general_get("ServiceRecord/GetServices/" + this.SO_ID + "?type=" + tipo+"&userId="+this.USERDATA.id).subscribe((data => {
      this.__loader__.hideLoader();

        if (data.success) {
          this.home_contry.data = data.map.value.home;
          this.host_contry.data = data.map.value.host;
        }
      }))
    }
  }

  public GetBreed(id, i) {
    this._services.service_general_get("Catalogue/GetBreed?id=" + id).subscribe((data => {
      if (data.success) {
        this.CaBreed[i] = data.result;
      }
    }))
  }

  public deleteImmigrationsServices(id, type) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this service?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._services.service_general_delete_with_url("ImmigrationServices/DeleteAllServiceById?id=" + id + "&type=" + type).subscribe((data => {
          if (data.success) {
            const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Service removed"
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }))
      }
    });
  }

  public deleteRelocationService(id, type): void {

    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this service?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._services.service_general_delete_with_url("ImmigrationServices/DeleteAllServiceById?id=" + id + "&type=" + type).subscribe((data => {
          if (data.success) {
            const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Service removed"
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }))
      }
    });

  }

  public assign_dependents: DependentInformationsModel[] = [];
  public addDepartament(): void {
    this.assign_dependents.push({
      id: 0,
      sex: undefined,
      relationshipId: '0',
      name: '',
      birth: '',
      age: '',
      nationalityId: '',
      aditionalComments: '',
      assigneeInformationId: this.edit_sr_model.assigneeInformations[0].id,
      language: '',
      photo: '',
      PhotoExtension: '',
      email: '',
      phone: '',
      ifOther: '',
      currentGrade: '',
      languageDependentInformations: []
    })
    //console.log(this.assign_dependents);
  }

  public removeDepartament(index: number): void {

    this.assign_dependents.splice(index, 1);

  }

  public pets: PetsNavigationModel[] = [];
  public addPet(): void {

    //this.edit_sr_model.assigneeInformations[0].petsNavigation.push(new PetsNavigationModel());
    this.pets.push(new PetsNavigationModel());

  }

  public removePet(index: number): void {

    this.pets.splice(index, 1);

  }

  public coordinators: Coordinator[] = [];
  public coordinator: Coordinator = new Coordinator();
  public addCoordinators(): void {

    this.coordinators.push(this.coordinator);

  }

  public removeCoordinator(index: number): void {

    this.coordinators.splice(index, 1);

  }

  public immgration_education: EducationalBackgrounds[] = [];
  public addEducationGroup(): void {

    this.immgration_education.push(new EducationalBackgrounds());

  }

  public removeEducationGroup(index): void {

    this.immgration_education.splice(index, 1);

  }

  public immgration_languages: LenguageProficiencies[] = [];
  public addLanguage(): void {

    this.immgration_languages.push(new LenguageProficiencies());

  }

  public removeLanguage(index): void {

    this.immgration_languages.splice(index, 1);

  }

  public immgration_dependent: DependentImmigrationInfos[] = [];
  public addDependent(): void {

    this.immgration_dependent.push(new DependentImmigrationInfos());

  }

  public removeDependent(index: number): void {

    this.immgration_dependent.splice(index, 1);

  }

  public requestInformationButton(): void {

    const dialogRef = this._dialog.open(DialogRequestInformation, {
      data: {
        sr_id: this.edit_sr_model.id,
        immi: this.wos_imm_,
        relo: this.wos_relo_
      }, width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  public followButton(): void {

    const params: any = {
      id: 0,
      serviceRecordId: this.edit_sr_model.id,
      userId: this.USERDATA.id
    },
      root = this;

    if (this.edit_sr_model.follows.length == 0) {

      followRequest();

    } else {

      const followers: any = this.edit_sr_model.follows;

      followers.forEach((follower: any) => {

        if (follower.userId == this.USERDATA.id) {

          unFollowRequest(follower.id);

        } else {

          followRequest();

        }

      });

    }

    function followRequest(): void {
      ////////
      root._services.service_general_post_with_url('Follow/CreateFollow', params)
        .subscribe((response: any) => {

          if (response.success) {

            root.showGeneralMessageDialog(
              'Follow Service Record',
              'By following a service record, it will be available on your profile dashboard.'
            );

            root.initPageSettings();

          }

        }, (error: any) => {

          console.error('Error (followButton) => ', error);

        });

    }

    function unFollowRequest(id_follow: number): void {

      root._services.service_general_delete(`Follow/DeleteFollow?id=${id_follow}`)
        .subscribe((response: any) => {

          root.showGeneralMessageDialog(
            'Unfollow Service Record',
            'When you stop following a Service Record, it will no longer be available on your profile dashboard.'
          );

          root.initPageSettings();

        }, (error: any) => {

          console.error('Error (DeleteFollow) => ', error);

        });

    }

  }

  public follow_status_button: string = 'Follow';
  public isFollowing(follows_field: any): void {

    if (follows_field.length == 0) this.follow_status_button = 'Follow';
    else {

      follows_field.forEach((follow: any) => {

        follow.userId == this.USERDATA.id ?
          this.follow_status_button = 'Unfollow' :
          this.follow_status_button = 'Follow';

      });

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


  public immgration_profile: ImmigrationProfileModel = new ImmigrationProfileModel();
  public show_ass_depd_errors: boolean = false;
  public show_pets_erros: boolean = false;
  public updateServiceRecordData(): void {


    // concatenar prefix de telefono
    if ( this.edit_sr_model.assigneeInformations[0].mobilePhone != '' &&this.prefix) {
      this.edit_sr_model.assigneeInformations[0].mobilePhone = `${this.prefix}+${this.edit_sr_model.assigneeInformations[0].mobilePhone}`
    }
    //console.log('numero con prefix', this.edit_sr_model.assigneeInformations[0].mobilePhone);
    // concatenar prefix de work phone
    if ( this.edit_sr_model.assigneeInformations[0].workPhone != '' && this.prefixWork) {
      this.edit_sr_model.assigneeInformations[0].workPhone = `${this.prefixWork}+${this.edit_sr_model.assigneeInformations[0].workPhone}`
    }
    //console.log('numero con prefix work phone', this.edit_sr_model.assigneeInformations[0].workPhone);

    this.show_ass_depd_errors = true;

    this.show_pets_erros = true;

    const validations: any = {
      general_form: this.fieldsMustBeFill(),
      assing_form: this.assigneeFormValidation(),
      // assign_depen: this.validatingDependents(),
      // assing_pets: this.validatingPets()
    }

    this.allValidationsIn(validations);
    this.edit_sr_model.updateBy = this.USERDATA.id;
    this.edit_sr_model.updatedDate = new Date();

    let date_in:any;

    this.edit_sr_model.assigneeInformations[0].dependentInformations.forEach((E:any) => {
      if(E.id==0){

        date_in = E.birth;
        const date_init = new Date(date_in.getFullYear(), date_in.getMonth(), date_in.getDate()),
          date_today = new Date();

        let diff = (date_init.getTime() - date_today.getTime()) / 1000;
        diff /= (60 * 60 * 24);

        E.age =  Math.abs(Math.round(diff / 365.25));
      }else{

        date_in = new Date(E.birth);
        const date_init = new Date(date_in.getFullYear(), date_in.getMonth(), date_in.getDate()),
          date_today = new Date();

        let diff = (date_init.getTime() - date_today.getTime()) / 1000;
        diff /= (60 * 60 * 24);

        E.age =  Math.abs(Math.round(diff / 365.25));
      }
    });

    if (
      validations.general_form &&
      validations.assing_form) {

      this.setAssingDepenAndPets();

      this.getNationalityData();
      this.getLanguagesData();
      this.getLanguagesDependentsData();

      this.validateCoordinators();

      this.__loader__.showLoader();

      this._services.service_general_put('ServiceRecord/Update', this.edit_sr_model)
        .subscribe((response: any) => {

          console.log('[CP1081] Response Updated => ', response);

          if (this.show_imm_prof) {

            this.initImmigrationProcess();

          }

          if (response.success && !this.show_imm_prof) {

            this.__loader__.hideLoader();
            const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: 'Service record edited',
                body: 'The service record has been successfully edited.'
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              this.__loader__.hideLoader();
            });

          } else {

            this.__loader__.hideLoader();

          }
          this.new_coordinator = [];
          this.initPageSettings();

        }, (error: any) => {

          console.error('Error (ServiceRecord/Update) => ', error);
          this.__loader__.hideLoader();

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
            this.assign_dependents[index].email = ""

          }

        }, (error: any) => {

          console.error('Error (User/VeryfyEmail) => ', error);

        });

    }

  }

  public setAssingDepenAndPets(): void {

    if (this.show_dependent_section) {

      this.edit_sr_model.assigneeInformations[0].dependentInformations = this.assign_dependents;
      this.toggleDependentsSection();

    } else {

      this.edit_sr_model.assigneeInformations[0].dependentInformations = [];

    }

    if (this.show_pets_section) {

      for (let i = 0; i < this.pets.length; i++) {
        this.pets[i].assigneeInformationId = this.edit_sr_model.assigneeInformations[0].id;
      }
      this.edit_sr_model.assigneeInformations[0].petsNavigation = this.pets;
      this.togglePetsSection();

    } else {

      this.edit_sr_model.assigneeInformations[0].petsNavigation = [];

    }

  }

  public allValidationsIn(validation: any): void {

    if (validation.immigration_forms == false) {
      this._snackBar.open('Immigration Information incomplete', 'Close', {
        duration: 6000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['my-snack-bar']
      });
    }

    if (validation.dap_forms == false) {
      this._snackBar.open('Dependents or Pets Information incomplete', 'Close', {
        duration: 6000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['my-snack-bar']
      });
    }

    if (validation.assing_form == false) {
      this._snackBar.open('Assignee Information incomplete', 'Close', {
        duration: 6000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['my-snack-bar']
      });
    }

    if (validation.general_form == false) {
      this._snackBar.open('Partner / Client Information incomplete', 'Close', {
        duration: 6000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['my-snack-bar']
      });
    }

  }

  public validateCoordinators(): void {

    if(this.hold_imm_coor_data.length > 0){
      if (this.hold_imm_coor_data[0].coordinatorId != 0 && this.hold_imm_coor_data[0].coordinatorTypeId != 0) {
        this.edit_sr_model.immigrationCoodinators = this.hold_imm_coor_data;
     }
    }

    if(this.hold_rel_coor_data.length > 0){
      if (this.hold_rel_coor_data[0].coordinatorId != 0 && this.hold_rel_coor_data[0].coordinatorTypeId != 0) {
        this.edit_sr_model.relocationCoordinators = this.hold_rel_coor_data;
      }
    }

  }

  public validatingDependents(): boolean {

    let result: boolean = true;

    const dependents: any = this.edit_sr_model.assigneeInformations[0].dependentInformations;

    this.getAssingDependentsAge(dependents);

    dependents.forEach((dependent: any) => {

      if (dependent.relationshipId == "0") result = false;

      switch (dependent.relationship) {

        case '1':
          if (dependent.name == "") result = false;
          if (dependent.birth == "") result = false;
          if (dependent.languageDependentInformations.length == 0) result = false;
          if (dependent.nationalityId == "") result = false;
          if (dependent.email == "") result = false;
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

    });


    return result;

  }

  public getAssingDependentsAge(dependents_in: DependentInformationsModel[]): void {

    dependents_in.forEach((dependent: DependentInformationsModel, index: number) => {

      const dependent_age_container: any = document.getElementById(`dependent_${index}`);

      if (dependent_age_container != undefined || dependent_age_container != null) {

        dependent.age = dependent_age_container.value;

      }

    });

  }

  public validatingPets(): boolean {

    let result: boolean = true;

    const pets: PetsNavigationModel[] = this.edit_sr_model.assigneeInformations[0].petsNavigation;

    this.getPetsAges(pets);

    pets.forEach((pet: any) => {

      //console.log('Pet ===> ', pet);

      if (pet.age == undefined) result = false;
      if (pet.name == undefined) result = false;
      //if (pet.breedId == '') result = false;
      if (pet.petTypeId == undefined) result = false;
      if (pet.weight == undefined) result = false;

    });

    return result;

  }

  public getPetsAges(pets_in: PetsNavigationModel[]): void {

    pets_in.forEach((pet: PetsNavigationModel, index: number) => {

      const pet_age_container: any = document.getElementById(`pet_${index}`);

      if (pet_age_container != undefined || pet_age_container != null) {

        pet.age = pet_age_container.value;

      }

    });

  }

  public show_immigration_errors: boolean = false;
  public initImmigrationProcess(): void {
      ////////
      ////console.log(this.immgration_profile.highestLevelEducationalId);
      this.immgration_profile.educationalBackgrounds = this.immgration_education;
      this.immgration_profile.lenguageProficiencies = this.immgration_languages;
      this.immgration_profile.dependentImmigrationInfos = this.immgration_dependent;
      if(this.immgration_profile.highestLevelEducationalId == 0)
      {
        this.immgration_profile.highestLevelEducationalId = 1;
      }

      //console.log('[CP1105] Imm beofre send any mode =>', this.immgration_profile);

      if (this.is_creating_immigration) {

        this.requestNewImmigrationProfile(this.edit_sr_model.id);

      } else {

        this.editImmigrationProfile(this.edit_sr_model.id);

      }

    // const main_validations: any = {
    //   val_global: this.immFormGlobal(),
    //   val_coordinator: this.immigrationFormComplete(),
    //   val_passport: this.immPassportValidator(),
    //   val_previescoun: this.immPreviusCountryValidator(),
    //   val_assInfo: this.immAssInformationValidator(),
    //   val_languages: this.immLanguagesValidator(),
    //   val_dependents: this.immDependentsValidator()
    // }


    // if (main_validations.val_dependents == false) {
    //   this._snackBar.open('Immigrations Profile Dependents Immigration Information incomplete', 'Close', {
    //     duration: 6000,
    //     horizontalPosition: "end",
    //     verticalPosition: "top",
    //     panelClass: ['my-snack-bar']
    //   });
    // }

    // if (main_validations.val_assInfo == false) {
    //   this._snackBar.open('Immigrations Profile Assignment Information incomplete', 'Close', {
    //     duration: 6000,
    //     horizontalPosition: "end",
    //     verticalPosition: "top",
    //     panelClass: ['my-snack-bar']
    //   });
    // }

    // if (main_validations.val_languages == false) {
    //   this._snackBar.open('Immigrations Profile Language Proficiency Information incomplete', 'Close', {
    //     duration: 6000,
    //     horizontalPosition: "end",
    //     verticalPosition: "top",
    //     panelClass: ['my-snack-bar']
    //   });
    // }

    // if (main_validations.val_previescoun == false) {
    //   this._snackBar.open('Immigrations Profile Previous Host Country Information incomplete', 'Close', {
    //     duration: 6000,
    //     horizontalPosition: "end",
    //     verticalPosition: "top",
    //     panelClass: ['my-snack-bar']
    //   });
    // }

    // if (main_validations.val_passport == false) {
    //   this._snackBar.open('Immigrations Profile Passport Information incomplete', 'Close', {
    //     duration: 6000,
    //     horizontalPosition: "end",
    //     verticalPosition: "top",
    //     panelClass: ['my-snack-bar']
    //   });
    // }

    // this.show_immigration_errors = true;

    // ////////
    // if (
    //   main_validations.val_coordinator &&
    //   main_validations.val_passport &&
    //   main_validations.val_previescoun &&
    //   main_validations.val_assInfo &&
    //   main_validations.val_languages &&
    //   main_validations.val_global) {



    // }

  }

  public imm_global_form: any = {
    no_leve: false
  }
  public immFormGlobal(): boolean {

    let result: boolean = true;

    const global_form: ImmigrationProfileModel = this.immgration_profile;

    global_form.highestLevelEducationalId == 0 ?
      this.imm_global_form.no_leve = true : this.imm_global_form.no_leve = false;

    for (let field in this.imm_global_form) {

      if (this.imm_global_form[field]) result = false;

    }

    return result;

  }

  // public requestImmigrationProfile(): void {

  //   !this.show_imm_prof ?
  //     this.show_imm_prof = true :
  //     this.show_imm_prof = false;

  // }

  public form_imm_cord: any = {
    no_coor: false,
    no_ctyp: false,
    no_dat0: false,
    no_dat1: false
  }
  public immigrationFormComplete(): boolean {

    let result: boolean = true;
////////
    const imm_coor_prof: any = this.edit_sr_model.immigrationCoodinators[0];

    imm_coor_prof.coordinatorTypeId == 0 || imm_coor_prof.coordinatorTypeId == null ?
      this.form_imm_cord.no_ctyp = true : this.form_imm_cord.no_ctyp = false;

    imm_coor_prof.coordinatorId == 0 || imm_coor_prof.coordinatorId == null ?
      this.form_imm_cord.no_coor = true : this.form_imm_cord.no_coor = false;

    imm_coor_prof.assigned == '' || imm_coor_prof.assigned == null ?
      this.form_imm_cord.no_dat0 = true : this.form_imm_cord.no_dat0 = false;

    //imm_coor_prof.accepted == '' || imm_coor_prof.accepted == null ?
      //this.form_imm_cord.no_dat1 = true : this.form_imm_cord.no_dat1 = false;

    for (let field in this.form_imm_cord) {

      if (this.form_imm_cord[field]) result = false;

    }

    return result;

  }

  public passport_form_val: any = {
    no_numb: false,
    no_dat0: false,
    no_dat1: false,
    no_auto: false,
    no_plac: false,
    no_addr: false
  }
  public immPassportValidator(): boolean {

    let result: boolean = true;

    const passport_form: PassportInformation = this.immgration_profile.passportInformation;

    passport_form.number == '' ?
      this.passport_form_val.no_numb = true : this.passport_form_val.no_numb = false;

    passport_form.issue == '' ?
      this.passport_form_val.no_dat0 = true : this.passport_form_val.no_dat0 = false;

    passport_form.expiration == '' ?
      this.passport_form_val.no_dat1 = true : this.passport_form_val.no_dat1 = false;

    passport_form.issuingAuthority == '' ?
      this.passport_form_val.no_auto = true : this.passport_form_val.no_auto = false;

    passport_form.placeIssue == '' ?
      this.passport_form_val.no_plac = true : this.passport_form_val.no_plac = false;

    passport_form.currentAddress == '' ?
      this.passport_form_val.no_addr = true : this.passport_form_val.no_addr = false;

    for (let field in this.passport_form_val) {

      if (this.passport_form_val[field]) result = false;

    }

    return result;

  }

  public previoush_form_val: any = {
    no_visa: false,
    no_dat0: false,
    no_dat1: false,
    no_auto: false,
    no_city: false,
    no_vcat: false,
  }
  public immPreviusCountryValidator(): boolean {

    let result: boolean = true;

    const previoush_form: PreviousHostCountry = this.immgration_profile.previousHostCountry;

    previoush_form.visaNumber == '' ?
      this.previoush_form_val.no_visa = true : this.previoush_form_val.no_visa = false;

    previoush_form.issue == '' ?
      this.previoush_form_val.no_dat0 = true : this.previoush_form_val.no_dat0 = false;

    previoush_form.expiration == '' ?
      this.previoush_form_val.no_dat1 = true : this.previoush_form_val.no_dat1 = false;

    previoush_form.issuingAuthority == '' ?
      this.previoush_form_val.no_auto = true : this.previoush_form_val.no_auto = false;

    previoush_form.placeIssue == '' ?
      this.previoush_form_val.no_city = true : this.previoush_form_val.no_city = false;

    previoush_form.visaCategoryId == '' ?
      this.previoush_form_val.no_vcat = true : this.previoush_form_val.no_vcat = false;

    for (let field in this.previoush_form_val) {

      if (this.previoush_form_val[field]) result = false;

    }

    return result;

  }

  public assign_form_validator: any = {
    no_name: false,
    no_cjob: false,
    no_eda0: false,
    no_eda1: false,
    no_hmai: false,
    no_hmai_val: false
  }
  public immAssInformationValidator(): boolean {

    let result: boolean = true;

    const assign_form: AssigmentInformation = this.immgration_profile.assigmentInformation;

    assign_form.legalNameHomeCountry == '' ?
      this.assign_form_validator.no_name = true : this.assign_form_validator.no_name = false;

    assign_form.currentJobPositionTitle == '' ?
      this.assign_form_validator.no_cjob = true : this.assign_form_validator.no_cjob = false;

    assign_form.employmentFrom == '' ?
      this.assign_form_validator.no_eda0 = true : this.assign_form_validator.no_eda0 = false;

    assign_form.employmentTo == '' ?
      this.assign_form_validator.no_eda1 = true : this.assign_form_validator.no_eda1 = false;

    assign_form.hiringManagerEmail == '' ?
      this.assign_form_validator.no_hmai = true : this.assign_form_validator.no_hmai = false;

    !this.validateEmail(assign_form.hiringManagerEmail) ?
      this.assign_form_validator.no_hmai_val = true : this.assign_form_validator.no_hmai_val = false;

    for (let field in this.assign_form_validator) {

      if (this.assign_form_validator[field]) result = false;

    }

    return result;

  }

  public immLanguagesValidator(): boolean {

    let result: boolean = true;

    this.immgration_languages.forEach((language: LenguageProficiencies) => {

      if (language.languageId == '') result = false;
      if (language.proficiencyId == '') result = false;
      language.immigrationProfileId = this.immgration_profile.id;

    });

    return result;

  }

  public immDependentsValidator(): boolean {

    let result: boolean = true;

    this.immgration_dependent.forEach((dependent: DependentImmigrationInfos) => {

      if (dependent.relationshipId == '') result = false;
      if (dependent.name == '') result = false;
      if (dependent.passportNumber == '') result = false;
      if (dependent.issue == '') result = false;
      if (dependent.expiration == '') result = false;
      if (dependent.issuingAuthority == '') result = false;
      if (dependent.placeIssue == '') result = false;
      if (dependent.entryDateHostCountry == '') result = false;
      dependent.immigrationProfileId = this.immgration_profile.id;

    });

    return result;

  }

  public is_creating_immigration: boolean = null;
  public getImmigrationDataStatus(id_sr: number): void {

    this._services.service_general_get(`ImmigrationProfile/GetImmigrationProfile?sr=${id_sr}`)
      .subscribe((response: any) => {

        //console.log('Res GetImmigrationProfile (1405) => ', response);

        if (response.success) {

          if (response.result.value == null) {

            this.is_creating_immigration = true;

          } else {

            this.is_creating_immigration = false;
            this.show_imm_prof = true;
            this.immgration_profile = response.result.value;

            if (this.immgration_profile.passportInformation == null) {

              this.immgration_profile.passportInformation = new PassportInformation();

            }

            if (this.immgration_profile.previousHostCountry == null) {

              this.immgration_profile.previousHostCountry = new PreviousHostCountry();

            }

            if (this.immgration_profile.passportInformation.expiration != '' ||
              this.immgration_profile.passportInformation.expiration != null) {

              this.isPassportExpiring(this.immgration_profile.passportInformation.expiration);

            }

            this.immgration_dependent = this.immgration_profile.dependentImmigrationInfos;
            this.immgration_education = this.immgration_profile.educationalBackgrounds;
            this.immgration_languages = this.immgration_profile.lenguageProficiencies;

          }

        }

      }, (error: any) => {

        console.error('Error (GetImmigrationProfile) => ', error);

      });

  }

  //NUEVO APPOINTMENT//
  public addApointment(id): void {
    //console.log("Entra a agregar a appointment");
    this.DetectaExperienceTeam();
    console.log(this.Team_ImmigrationCoordinators);
    console.log(this.Team_ImmigrationSupplier);
    console.log(this.Team_RelocationCoordinators);
    console.log(this.Team_RelocationSupplier);
    if( (this.Team_ImmigrationCoordinators > 0 && this.Team_ImmigrationSupplier > 0) || (this.Team_RelocationCoordinators > 0 && this.Team_RelocationSupplier > 0) ){
      const dialogRef = this._dialog.open(DialogAddAppointmentComponent, {
        width: '70%',
        data: {
          sr: this.SO_ID,
          appointmentId: id,
          id: 0
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        //this.animal = result;
        this.getAppointment();
      });
    }else{
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: 'Appointment',
          body: 'To add an appointment it is necessary to complete the experience team of the Service Record.'
        }
      });
    }
  }
  //CONSULTAR APPOINTMENT//
  public addApointmentConsult(data, i, isVisible): void {
    if (i == 0) {
      i = i + 1;
    } else {
      i = i + 1;
    }
    //console.log("Data del appointment a ver:  ", isVisible);
    const dialogRef = this._dialog.open(DialogAddAppointmentComponent, {
      width: '70%',
      data: {
        sr: this.SO_ID,
        appointmentId: data.id,
        supplier: data.supplier,
        workOrderId: data.workOrderId,
        index: i,
        isVisible: isVisible,
        status: data.status,
        commentCancel: data.commentCancel,
        ended: data.ended,
        start:data.start,
        report:data.report
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
      this.getAppointment();
    });
  }

  public requestNewImmigrationProfile(id: number): void {

    this.immgration_profile.serviceRecordId = id;

    //this.getImmigrationCardsData();

    this._services.service_general_post_with_url('ImmigrationProfile/CreateImmigrationProfile', this.immgration_profile)
      .subscribe((response: any) => {

        //console.log('[CP1535] Update New Res (CreateImmigrationProfile) ==> ', response);

        if (response.success) {

          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'Service record ',
              body: 'Immigration Profile has been created.'
            }
          });

        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error (CreateImmigrationProfile) => ', error);
        this.__loader__.hideLoader();

      });

  }

  public editImmigrationProfile(id: number): void {

    this.immgration_profile.serviceRecordId = id;

    this.show_imm_prof = true;

    //this.getImmigrationCardsData();

    this._services.service_general_put(`ImmigrationProfile/UpdateImmigrationProfileProvisional`, this.immgration_profile)
      .subscribe((response: any) => {

        //console.log('[CP1570] Update IP (UpdateImmigrationProfileProvisional) ==> ', response);

        if (response.success) {

          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'Service record edited',
              body: 'The service record has been successfully edited.'
            }
          });

        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error (UpdateImmigrationProfile) => ', error);
        this.__loader__.hideLoader();

      });

  }

  public passport_expiring: boolean = false;
  public isPassportExpiring(date_in: any): void {

    const date_seleted: Date = new Date(date_in);

    let difference: any = (date_seleted.getTime() - this.today_date.getTime()) / 1000;
    difference /= (60 * 60 * 24 * 7 * 4);

    let months_between: number = Math.abs(Math.round(difference));

    months_between <= 6 ? this.passport_expiring = true : this.passport_expiring = false;

  }

  public mf_validator: any = {
    no_name: false,
    no_fnum: false
  }
  public fieldsMustBeFill(): boolean {

    let result: boolean = true;

    this.edit_sr_model.assigneeInformations[0].assigneeName == '' ?
      this.mf_validator.no_name = true : this.mf_validator.no_name = false;

    this.edit_sr_model.clientFileNumber == '' ?
      this.mf_validator.no_fnum = true : this.mf_validator.no_fnum = false;

    for (let field in this.mf_validator) {

      if (this.mf_validator[field]) result = false;

    }

    return result;

  }

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

  ///home country

  public nso_ainfo_fields: any = {
    no_phot: false,
    no_name: false,
    no_emai: false,
    no_emai_val: false,
  }

  public home_city_client_able: boolean = false;
  public home_city_host_able: boolean = false;
  //public city_host_catalogue: any = [];
  public city_catalogue: any = [];
  public async ableInputsFromAssignmentSection(id_country: string, section: string): Promise < void > {

    const extra_param: string = `?state=${ id_country }`;

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


  /// nuevo home city

  homeCitySelect: number = 0;
  cleanSup(){

  }

  Homecitychange(){
    if(this.homeCitySelect != 0){
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Change confirmation",
          body: "If you change this option, partner providers will be eliminated. Do you want to continue?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        //console.log(result);
        if (result) {
          this.cleanSup();
        }else{
          this.edit_sr_model.assigneeInformations[0].homeCityId = this.homeCitySelect;
        }
      });
    }else{
      this.homeCitySelect = this.edit_sr_model.assigneeInformations[0].homeCityId;
    }
  }



  public assigneeFormValidation(): boolean {

    let result: boolean = true;

    const item_selected: any = this.edit_sr_model.assigneeInformations[0];

    getImageAssign();

    item_selected.assigneeName == '' ?
      this.fass_validator.no_name = true : this.fass_validator.no_name = false;

    item_selected.homeCountryId == null ?
      this.nso_ainfo_fields.no_home = true :
      this.nso_ainfo_fields.no_home = false;

    this.fass_validator.no_home = this.nso_ainfo_fields.no_home;


    //city home

    item_selected.homeCityId == null ?
      this.nso_ainfo_fields.no_city = true :
      this.nso_ainfo_fields.no_city = false;
      this.fass_validator.no_city = this.nso_ainfo_fields.no_city;

    item_selected.email == '' ?
      this.fass_validator.no_emai = true : this.fass_validator.no_emai = false;

    !this.validateEmail(item_selected.email) ?
      this.fass_validator.no_emai_val = true : this.fass_validator.no_emai_val = false;

    item_selected.mobilePhone == '' ?
      this.fass_validator.no_mpho = true : this.fass_validator.no_mpho = false;

    item_selected.workPhone == '' ?
      this.fass_validator.no_wpho = true : this.fass_validator.no_wpho = false;

    item_selected.workPhone == '' ?
      this.fass_validator.no_wpho = true : this.fass_validator.no_wpho = false;

    item_selected.assignmentDuration == "" ?
      this.fass_validator.no_adur = true : this.fass_validator.no_adur = false;

    item_selected.assignmentDurationTime == '0' || item_selected.assignmentDurationTime == '' ?
      this.fass_validator.no_atim = true : this.fass_validator.no_atim = false;


    for (let field in this.fass_validator) {

      if (this.fass_validator[field]) result = false;

    }

    function getImageAssign(): boolean {

      const id_photo_container: any = document.getElementById('ass_prof_photo'),
        photo_src: string = id_photo_container.src,
        photo_input: any = document.getElementById('ass_prof_photo_input');

      let split_photo_value: string = '';

      let result: boolean = true;

      if (photo_input != null) {

        split_photo_value = photo_input.value.split('.')[1];

        item_selected.PhotoExtension = split_photo_value;
        item_selected.Photo = photo_src.split(',')[1];

      } else {

        result = false;

      }

      return result;

    }

    return result;

  }

  public getNationalityData(): void {
////
    let nationality_selected: any[] = this.edit_sr_model.assigneeInformations[0].nationalityAssigneeInformations,
      hold_nationality: NationalitiesModel[] = [];

      nationality_selected.forEach((nationality: any) => {

      const nationality_selected: NationalitiesModel = new NationalitiesModel();

      nationality_selected.assigneeInformationId = this.edit_sr_model.assigneeInformations[0].id;
      nationality_selected.nationalityId = nationality;

      hold_nationality.push(nationality_selected);

    });

    this.edit_sr_model.assigneeInformations[0].nationalityAssigneeInformations = [];
    this.edit_sr_model.assigneeInformations[0].nationalityAssigneeInformations = hold_nationality;

  }

  public getLanguagesData(): void {

    let languages_selected: any[] = this.edit_sr_model.assigneeInformations[0].languagesSpokens,
      hold_language: LanguagesSpokensModel[] = [];

    languages_selected.forEach((language: any) => {

      const language_selected: LanguagesSpokensModel = new LanguagesSpokensModel();

      language_selected.assignneInformation = this.edit_sr_model.assigneeInformations[0].id;
      language_selected.languages = language;

      hold_language.push(language_selected);

    });

    this.edit_sr_model.assigneeInformations[0].languagesSpokens = [];
    this.edit_sr_model.assigneeInformations[0].languagesSpokens = hold_language;

  }

  public getLanguagesDependentsData(): void {

    const dependents: any[] = this.assign_dependents;

    if (dependents.length != 0) {

      let language_holder: any[] = [];

      dependents.forEach((dependent: any) => {

        if (dependent.languageDependentInformations.length != 0) {

          const languages: any[] = dependent.languageDependentInformations;

          languages.forEach((language: any) => {

            const new_language: LanguagesSpokensModelDependent = new LanguagesSpokensModelDependent;

            new_language.dependent = dependent.id;
            new_language.language = language;

            language_holder.push(new_language);

          });

          dependent.languageDependentInformations = language_holder;
          language_holder = [];

        }

      });

    }

  }
  //****************************************************************************//
  public showInvoiceDialog(): void {
    //DialogInvoiceEditComponent
    const dialogRef = this._dialog.open(DialogRequestInvoiceComponent, {
      data: {
        sr_id: this.SO_ID
      }, width: "30%"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
    });

  }
  //*****************************************************************************///

  public showDialogById(dialog_id: number, obj_props: any = null): void {
    obj_props.partnerId = this.edit_sr_model.partnerId;
    //console.log('Data Service sent ====> ', obj_props);
    //console.log('Id Service ===> ', dialog_id);
    switch (dialog_id) {

      case 7:
        const corporate_dialog = this._dialog.open(DialogCortporateAssistance, {
          data: {
            //sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_id: obj_props.service[0].id,
            data: obj_props
          }, width: "100%"
        });

        corporate_dialog.afterClosed().subscribe((so_added: any) => {
          this.getRelocationImmigrationServices_('imm');
          this.ngOnInit();
        });
        break;

      case 8:
        const renewal_dialog = this._dialog.open(DialogRenewal, {
          data: {
            sr: this.SO_ID,
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            //sr_hcity: this.Host_Home_country.host_city_name, hostCity_name,
            sr_hcity: this.Host_Home_country.hostCity_name,
            data: obj_props
          }, width: "100%"
        });

        renewal_dialog.afterClosed().subscribe((so_added: any) => {
          this.getRelocationImmigrationServices_('imm');
          this.ngOnInit();
        });
        break;

      case 9:
        const notificacion_dialog = this._dialog.open(NotificationDialog, {
          data: {
            sr: this.SO_ID,
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            //sr_hcity: this.Host_Home_country.host_city_name,
            sr_hcity: this.Host_Home_country.hostCity_name,
            data: obj_props
          }, width: "100%"
        });
        notificacion_dialog.afterClosed().subscribe((so_added: any) => {
          this.getRelocationImmigrationServices_('imm');
          this.ngOnInit();
        });
        break;

      case 10:
        const legal_dialog = this._dialog.open(DialogLegalReviewConsultation, {
          data: {
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name,
            data: obj_props
          }, width: "100%"
        });

        legal_dialog.afterClosed().subscribe((so_added: any) => {
          this.getRelocationImmigrationServices_('imm');
          this.ngOnInit();
        });
        break;

    }

  }

  public showDialogRelocation(service_in: any, id): void {
    service_in.home_host = id;
    service_in.partnerId = this.edit_sr_model.partnerId;

    //console.log('Service selected in ESR ======> ', service_in);

    switch (service_in.categoryId) {

      case 16:
        const departure_dialog = this._dialog.open(DialogDepartureComponent, {
          data: {
            sr_id: service_in.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name
          }, width: "100%"
        });

        departure_dialog.afterClosed().subscribe((so_added: any) => {
          this.getRelocationServices();
          this.ngOnInit();
        });
        break;

      case 17:
        const legal_dialog = this._dialog.open(DialogTemporaryHousingComponent, {
          data: {
            sr: this.SO_ID,
            sr_id: service_in.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name,
            data: service_in
          }, width: "100%"
        });
        legal_dialog.afterClosed().subscribe((so_added: any) => {
          this.getRelocationServices();
          this.ngOnInit();
        });
        break;

    }

  }

  /* 3. Utilities */

  public show_pets_section: boolean = false;
  public togglePetsSection(): void {

    !this.show_pets_section ?
      this.show_pets_section = true :
      this.show_pets_section = false;

    if (this.pets.length == 0) {
      //this.pets.push(new PetsNavigationModel());
    }
  }

  public show_dependent_section: boolean = false;
  public toggleDependentsSection(e?:any): void {
    //console.log(e)
    !this.show_dependent_section ?
      this.show_dependent_section = true :
      this.show_dependent_section = false;
    //console.log(this.show_dependent_section);
    if (this.assign_dependents.length == 0) {
      //this.assign_dependents.push(new DependentInformationsModel());
    }


  }

  service_line_asignada : any;
  // es una bandera para saber si es consultor de immio relo y activar las pestañas en comunicacion correspondientes a sus permisos
  //
  typeUser : number;
  isRel:boolean = false;
  isImmi:boolean = false;
  homeImm:any;
  hostImm:any;
  homeRel:any;
  hostRel:any;
  public async showTabSelected(which_tab: string, event_data: any) {
//////
    //console.log('Tab selected ===> ', which_tab);
    //comprobar si es un consultat y solo podra abrir imi o relo dependiendo su perfil
    // immi
    if (which_tab == 'imm' && this.__userlog__.role.id == 3 ) {
      if (this.__userlog__.profileUsers[0].supplierType == 3) {
        //console.log('consultant con permisos de immi');
      }
      else{
        return
      }
    }
    // relo
    if (which_tab == 'rel' && this.__userlog__.role.id == 3) {
      this.getRelocationServices();
      if ( this.__userlog__.profileUsers[0].supplierType == 1) {
        this.getRelocationServices();
        //console.log('consultant con permisos relocation');
      }
      else {
        return
      }
    }

    // si la sr no tiene wo en relo o immi no abrir
    // immi
    if (which_tab == 'imm') {
      let immi = 0

      if(this.edit_sr_model.workOrders.length == 0){
        immi = 0;
      }
      else{
        for (let i = 0; i < this.edit_sr_model.workOrders.length; i++) {
          const element = this.edit_sr_model.workOrders[i];
          if(element.serviceLineId == 1 )
          {
            immi = immi + 1;
            //console.log('si hay wo immi');
          }
        }
      }
      // aqui validamos si hay wo immi si el contador es 0 salir y no mostrar pestaña
      if(immi == 0 ){
        // mensaje general cuando no hay wo immi
        let msg = '';
        let title = '';
        if(this.USERDATA.role.id == 19 || this.USERDATA.role.id == 1){
            title = 'There are no Work Orders';
            msg = 'Go to the services button to create a work order';
        }else{
            title = 'No Work Order';
            msg = 'No Work Order of type Immigration';
        }
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: title,
            body: msg
          },
          width: '400px'
        });
        return
      }
    }
    // relo
    if (which_tab == 'rel') {
      let relo = 0

      if(this.edit_sr_model.workOrders.length == 0){
        relo = 0;
      }
      else{
        for (let i = 0; i < this.edit_sr_model.workOrders.length; i++) {
          const element = this.edit_sr_model.workOrders[i];
          if(element.serviceLineId == 2 )
          {
            relo = relo + 1;
            //console.log('si hay wo relo');
          }
        }
      }
      // aqui validamos si hay wo relo si el contador es 0 salir y no mostrar pestaña
      if(relo == 0 ){
        let msg = '';
        let title = '';
        if(this.USERDATA.role.id == 19 || this.USERDATA.role.id == 1){
            title = 'There are no Work Orders';
            msg = 'Go to the services button to create a work order';
        }else{
            title = 'No Work Order';
            msg = 'No Work Order of type Immigration';
        }
        // mensaje general cuando no hay wo relo
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: title,
            body: msg
          },
          width: '400px'
        });
        return
      }
    }




    if (which_tab == 'rep') {
      this.get_catalogos();
      this._getReport_("");
      this.getSupplier();
    }

    if (which_tab == 'com') {

      // immi 1
      if (this.__userlog__.profileUsers[0].immigration) {
        this.calls_serviceline = 1;
        //console.log('cummunication sl de consultor immi');
        this.typeUser= 1;
        this.isImmi = true;
      }
      // relo 2
      else if (this.__userlog__.profileUsers[0].relocation) {
        //console.log('cummunication sl de consultor relo');
        this.calls_serviceline = 2;
        this.typeUser = 2;
        this.isRel = true;
      }
      else{
        this.typeUser = 3;
        this.calls_serviceline = 1;
        this.isImmi = true;
      }

      //await this.getCommentsHistory();
      await this.initChatBehavior(this.calls_serviceline);
      await this.getAppointment();
      //this.getEmail();

    }

    if (which_tab == 'fin') {
      this.get_request();
      this.get_requestSupplier();
      this.getInvoicesService();
      //this.dataSourceSP = this.example;
    }


    var tipo = 0;
    if (which_tab == "imm") {
      tipo = 1;
    } else if (which_tab == "rel") {
      tipo = 2;
    }
    if (tipo > 0) {
      this._services.service_general_get("ServiceRecord/GetServices/" + this.SO_ID + "?type=" + tipo+"&userId="+this.USERDATA.id).subscribe((data => {
        // //console.log("Entra a consultar las WO: ", data);
        if (data.success) {
          //////
          //console.log('data WO', data);
          // si no hay work order no acceder a la pestaña immi o relo
            this.homeImm =  data.map.value.home.length;
            this.hostImm =  data.map.value.host.length;
            this.home_contry = new MatTableDataSource(data.map.value.home);
            //this.home_contry.paginator = this.paginator;
            //console.log('Valie ===> ', data.map.value.home);
            this.host_contry = new MatTableDataSource(data.map.value.host);
            //this.host_contry.paginator = this.paginator;


          this.host_contry = new MatTableDataSource(data.map.value.host);
          //this.host_contry.paginator = this.paginator;
          this.getAppointment();
        }
      }))

    }
    if (which_tab == 'imm' || which_tab == 'rel') {
      this.dataCSuplier = [];
      this.type_company_relocation = '';
      this.type_company = '';
      const tab_selected: number = which_tab == 'imm' ? 1 : 2;
      this. service_line_asignada = tab_selected;
      this.initFilterImmRelTableSettings(tab_selected);
      if (tab_selected == 2) this.initTableHousingSpecs();
    }

    if (which_tab == 'lib') {

      this.initLibraryBehavior();

    }



    const tab_selected: any = document.getElementById(`tab_${which_tab}`),
      tab_parent: any = tab_selected.parentElement.children,
      event: any = event_data.target,
      tabs_container: any = document.getElementById('tabs');

    for (let index = 0; index < tab_parent.length; index += 1) {

      tab_parent[index].classList.add('display-none');
      tabs_container.children[index].classList.remove('page__section-tab--active');
      tabs_container.children[index].id = "0";

    }

    tab_selected.classList.remove('display-none');
    event.classList.add('page__section-tab--active');
    event.id = "active-tab";

  }


  public get_request() {
    this.__loader__.showLoader();
    this._services.service_general_get('RequestPayment/GetFinance?sr=' + this.SO_ID).subscribe((response: any) => {
      //console.log(response);
      if (response.success) {
        this.dataSourceTHIRD = new MatTableDataSource(response.result.value);
        this.dataSourceTHIRD.paginator = this.third;
        //this.dataSourceTHIRD.sort = this.sort;
      }
      this.__loader__.hideLoader();
    }, (error: any) => {
      console.error('Error (RequestPayment) => ', error);
      this.__loader__.hideLoader();
    });
  }

  public get_requestSupplier() {
    this.__loader__.showLoader();
    this._services.service_general_get('RequestInvoice/GetSupplierPartnerInvoices/' + this.SO_ID).subscribe((response: any) => {
      //console.log(response);
      if (response.success) {
        this.dataSourceSP = new MatTableDataSource(response.result.value);
        this.dataSourceSP.paginator = this.supplier_;
        //this.dataSourceSP.sort = this.sort;
      }
      this.__loader__.hideLoader();
    }, (error: any) => {
      console.error('Error (RequestPayment) => ', error);
      this.__loader__.hideLoader();
    });
  }

  getInvoicesService() {
    this.__loader__.showLoader();
    this._services.service_general_get('Invoice/Finance/ServiceInvoices/' + this.SO_ID).subscribe((response: any) => {
      //console.log(response);
      if (response.success) {
        this.dataSourceIS = new MatTableDataSource(response.result.value);
        this.dataSourceIS.paginator = this.supplierSI_;
        //this.dataSourceIS.sort = this.sort;
      }
      this.__loader__.hideLoader();
    }, (error: any) => {
      console.error('Error (RequestPayment) => ', error);
      this.__loader__.hideLoader();
    });
  }

  searchData() {
    //console.log('ENTRA A SEARCH DATA');
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.dataIS) {
      if (this.dataIS[item] != '') {
        service_record_params_selected += `${item}=${this.dataIS[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    //console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.consultaInformacionPorFiltro(params);
  }

  consultaInformacionPorFiltro(params: string = '') {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `?${params}`;
    //console.log(params_in);
    this._services.service_general_get('Invoice/Finance/ServiceInvoices/' + this.SO_ID + params_in).subscribe((response: any) => {
      //console.log(response);
      if (response.success) {
        this.dataSourceIS = new MatTableDataSource(response.result.value);
        this.dataSourceIS.paginator = this.supplierSI_;
        //this.dataSourceIS.sort = this.sort;
      }
      this.__loader__.hideLoader();
    }, (error: any) => {
      console.error('Error (RequestPayment) => ', error);
      this.__loader__.hideLoader();
    });
  }


  public table_housing_cols: string[] = ['c_1', 'c_2', 'c_3', 'c_4', 'c_5', 'c_6', 'c_7', 'c_8', 'c_9'];
  public table_housing_data: any = [{ one: 'one' }];
  public initTableHousingSpecs(): void {

    this.__loader__.showLoader();

    this._services.service_general_get(`HousingSpecification/GetHousingSpecification/${this.edit_sr_model.id}`)
      .subscribe((response: any) => {

        if (response.success) {

          this.table_housing_data = new MatTableDataSource(response.result.value);
          this.table_housing_data.paginator = this.paginators_;
          //this.table_housing_data.sort = this.sort;

        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error (GetHousingSpecification) => ', error);

        this.__loader__.hideLoader();

      });

  }

  public showHSDialogFromHSTable(item_selected: any): void {

    //console.log('Mostrar el dialog con el elemento');
    //console.log('seleccionado => ', item_selected);
    let sr = item_selected.numberServiceRecord.split('-');
    //console.log(sr);
    let data_ = {
      numberWorkOrder: item_selected.numberWorkOrder,
      serviceID: item_selected.numberServiceRecord,
      serviceName: item_selected.service,
      sr: Number(sr[1]),
      //service: this.data.data.serviceTypeId,
      type_housing: item_selected.typeService,
      workOrderServicesId: item_selected.workOrderServices
    }
    const dialogRef = this._dialog.open(DialogHousingSpecificationsComponent, {
      data: data_,
      width: "100%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
      }
    })

  }

  public show_second_prfield: boolean = false;
  public canIShowImmProSecondPayRoll(): void {

    !this.show_second_prfield ?
      this.show_second_prfield = true :
      this.show_second_prfield = false;

  }

  public initLibraryBehavior(): any {

    this.requestLibraryData();

  }

  public library_ass_data: any[] = [];
  public library_imre_data: any[] = [];
  public library_ass_no_data: boolean = false;
  // TODO: SEGUNDO METODO
  public requestLibraryData(section: number = 0): void {

    this.requestLibraryCatalogues();
    const id_selected: number = this.edit_sr_model.id;
    switch (section) {
      case 0:
        // /api/ImmigrationProfile/GetAssigneFamilyById
        // ImmigrationProfile/GetAssigneFamily?sr=
        this._services.service_general_get(`ImmigrationProfile/GetAssigneFamily?sr=${id_selected}`)
          .subscribe((response: any) => {
            //console.log('Library Res => ', response);
            if (response.success) {
              this.library_ass_data = response.result.value;
              //console.log('library_ass_data Succ ==> ', this.library_ass_data.length);
              if (this.library_ass_data.length == 0) this.library_ass_no_data = true;
            }
          }, (error: any) => {
            console.error('Error (ImmigrationProfile/GetAssigneFamilyById) => ', error);
          });
        break;

      case 1:
      case 2:
        const line_selected: number = section == 1 ? 1 : 2,
          params: string = `?service_record_id=${this.edit_sr_model.id}&service_line=${line_selected}`;
        this.library_filter = new LibraryFilter();
        this.__loader__.showLoader();
        this._services.service_general_get(`ImmigrationProfile/GetHistoryImmigrationLibrary${params}`)
          .subscribe((response: any) => {
            //console.log('Res new => ', response);
            if (response.success) {
              this.library_imre_data = response.result.value;
              //console.log('this.library_imre_data ===> ', this.library_imre_data);
            }
            this.__loader__.hideLoader();
          }, (error: any) => {
            console.error('Error (ImmigrationProfile/GetHistoryImmigrationLibrary) => ', error);
            this.__loader__.hideLoader();
          });
        break;
    }
  }

  public status_catalogue: any[] = [];
  public async requestLibraryCatalogues(): Promise<void> {

    this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');

  }

  public library_filter: LibraryFilter = new LibraryFilter();
  public filteringLibraryData(): void {
  }

  public addNewDocumentToLibrary(): void {

    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "100%",
      data: {
        sr: this.edit_sr_model.id,
        spc: 'esr_lib',
        typeDocument: 3
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log('respuesta de documentos', result);

      const new_document: LibraryDocumentModel = new LibraryDocumentModel();

      new_document.fileName = result.fileName;
      new_document.fileRequest = result.fileRequest;
      new_document.fileExtension = result.fileExtension;
      new_document.documentType = result.documentType;
      new_document.relationship = result.relationship;
      new_document.issueDate = result.issueDate;
      new_document.expirationDate = result.expirationDate;
      new_document.issuingAuthority = result.issuingAuthority;
      new_document.countryOrigin = result.countryOrigin;
      new_document.comment = result.comment;
      new_document.dependentInformation = result.relationship;
      new_document.createdBy = result.createdBy;
      new_document.createdDate = result.createdDate;
      new_document.updateBy = result.updatedBy;
      new_document.updatedDate = result.updatedDate;
      //new_document.relationship = result.library_data.id;


      if (
        new_document.fileName != '' &&
        new_document.fileExtension != '' &&
        new_document.fileRequest != '' &&
        new_document.relationship != 0
      ) {

        this.__loader__.showLoader();

        this._services.service_general_post_with_url(`ImmigrationProfile/CreateDocumentDependent`, new_document)
          .subscribe((response: any) => {

            if (response.success) {

              this.requestLibraryData();

              this.showGeneralMessageDialog(
                'Document Uploaded',
                'Document has been successfully uploaded.'
              );

            }

            this.__loader__.hideLoader();

          }, (error: any) => {

            console.error('Error (ImmigrationProfile/CreateDocumentDependent) => ', error);

            this.__loader__.hideLoader();

          });

      }

    })

  }

  public showDocumentDialogDetails(document: any, service_line: number = undefined): void {

    let section_to: string = 'library';

    if (service_line != undefined) {

      document.service_line = service_line;
      section_to = 'lib_im_re'

    }

    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "100%",
      data: {
        sr_id: this.edit_sr_model.id,
        sr: this.edit_sr_model.id,
        document: document,
        name_section: section_to
      }
    });

  }

  public deleteDocumentLibrary(document_in: any, document_section: number = 0): void {

    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      width: "420px",
      data: {
        header: 'Delete document',
        body: `Are you sure to delete this document(${document_in.documentType})?`
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {

        this.__loader__.showLoader();

        this._services.service_general_get(`ImmigrationProfile/DeleteDocumentDependent?id=${document_in.id}`)
          .subscribe((response: any) => {

            if (response.success) {

              this.requestLibraryData();

            }

            this.__loader__.hideLoader();

          }, (error: any) => {

            this.__loader__.hideLoader();

            console.error('Error (ImmigrationProfile/DeleteDocumentDependent) => ', error);

          });

      }

    });

  }

  public libraryShowAllDocuments(service_line: number): void {

    const dialogRef = this._dialog.open(DialogLibraryDocuments, {
      width: "95%",
      data: {
        service_line: service_line,
        sr_id: this.edit_sr_model.id
      }
    });

  }

  public libClickImmTab(): void {

    this.autoClickTab('[auto-click="main_imm_tab"]');

  }

  /* Section: Library =====================================================================> Ends */
  secImm: boolean = false;
  secRel: boolean = false;
  // TODO: evento al dar click en los tabs
  public showTabSelectedLibrary(section: string, event_data: any): void {
    //console.log(`section ${section} event data ${event_data}`);
    //comprobar si es un consultat y solo podra abrir imi o relo dependiendo su perfil
    // immi
    if (section == 'imm' && this.__userlog__.role.id == 3) {
      if (this.__userlog__.profileUsers[0].supplierType == 3) {
        //console.log('consultant con permisos');
      }
      else{
        section = '';
        event_data = null;
        return
      }
    }
    // relo
    if (section == 'rel' && this.__userlog__.role.id == 3 ) {
      if (this.__userlog__.profileUsers[0].supplierType == 1) {
        //console.log('consultant con permisos');
      }
      else {
        section = '';
        event_data = null;
        return
      }
    }

    const section_to_show: any = document.getElementById(`library_${section}`),
    library_tabs_containers: any = document.getElementsByClassName('library-tab-content'),
    library_tab_buttons: any = document.getElementsByClassName('page__section-tab--lib');

    for (let item = 0; item < library_tabs_containers.length; item += 1) {
      library_tabs_containers[item].classList.add('display-none');
      library_tab_buttons[item].classList.remove('page__section-tab--active');
    }
    event_data.classList.add('page__section-tab--active');
    section_to_show.classList.remove('display-none');

  }

  amenitie($event, id) {
    if ($event.checked) {
      this.HousingSpecification.relHousingAmenities.push({
        housingSpecificationId: 0,
        amenitieId: id
      })
    } else {
      for (let i = 0; i < this.HousingSpecification.relHousingAmenities.length; i++) {
        if (this.HousingSpecification.relHousingAmenities[i].amenitieId = id) {
          this.HousingSpecification.relHousingAmenities.splice(i, 1);
        }

      }
    }
  }
  //****************************************************************//
  public data_directory:any = {
    serviceLine: null,
    initialReportDate: null,
    finalReportDate: null
  };
  searchDataReport() {
    let service_record_params_selected: string = '';;
    let params = '';

    //console.log(this.data_directory.initialReportDate);
    if(this.data_directory.serviceLine != null){
      params += '&serviceLine='+ this.data_directory.serviceLine;
    }
    if(this.data_directory.initialReportDate != null){
      //console.log("No entres");
      params += '&initialReportDate='+ this.filterDate(this.data_directory.initialReportDate);
    }
    if(this.data_directory.finalReportDate != null){
      params += '&finalReportDate='+ this.filterDate(this.data_directory.finalReportDate);
    }

    this._getReport_(params);
  }

  public filterDate(date_in: any): string {

    return `${date_in.getFullYear()}/${date_in.getMonth() + 1}/${date_in.getDate()}`;

  }

  padToTwoDigits(num) {
    return num.toString().padStart(2, '0')
  }
  
  convertMsToHHMMSS(ms){
    let seconds = Math.floor(ms / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
  
    seconds = seconds % 60
    minutes = minutes % 60
    // hours = hours % 24
  
    seconds = this.padToTwoDigits(seconds)
    minutes = this.padToTwoDigits(minutes)
    hours = this.padToTwoDigits(hours)
  
    return `${hours}:${minutes}:${seconds}`
  }


  _getReport_(params) {
    //console.log("SO ID: ", this.SO_ID);
    this.__loader__.showLoader();
    const create_date_one:Date = new Date();
    this._services.service_general_get('ReportDay/GetActivityReports?sr=' + Number(this.SO_ID) + '&' + params).subscribe((data => {
      //this._services.service_general_get('ReportDay/GetActivityReports?sr='+Number(this.SO_ID)).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: REPORTES ', data.view.value);

        data.view.value.forEach((element, index) => {
          let _diff = this.convertMsToHHMMSS(element.totalTime);
          data.view.value[index].totalTime = _diff.split(':')[0] + ":" + _diff.split(':')[1];

          element.services.forEach(service => {
            if(service.bundle && service.standAlone){
              data.view.value[index].type = "Stand Alone / Bundled";  
            }
            if(service.bundle){
              data.view.value[index].type = "Bundled";  
            }
            if(service.standAlone){
              data.view.value[index].type = "Stand Alone";  
            }
          });
        });

       
        this.dataSourceReport = new MatTableDataSource(data.view.value);
        console.log("this.dataSourceReport",this.dataSourceReport);
        this.dataSourceReport.paginator = this.ActivityReports;
        //this.dataSourceReport.sort = this.sort;
        this.__loader__.hideLoader();
      }
    }));
  }

  getReport() {
    this.data_directory = {};
    let params = '';
    this.SO_ID= this._routerParams.snapshot.params.id;
    //console.log("SO ID: ", this.SO_ID);
    this.__loader__.showLoader();
    this._services.service_general_get('ReportDay/GetActivityReports?sr=' + Number(this.SO_ID)).subscribe((data => {
      //this._services.service_general_get('ReportDay/GetActivityReports?sr='+Number(this.SO_ID)).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: REPORTES ', data.view.value);
        this.data_directory.serviceLine = 2
        // this._getReport_(params += '&serviceLine=2')
        //this.searchDataReport();
        this.dataSourceReport = new MatTableDataSource(data.view.value);
        //console.log(this.dataSourceReport);
        this.dataSourceReport.paginator = this.ActivityReports;
        this.dataSourceReport.sort = this.sort;
        this.__loader__.hideLoader();
      }
    }));
  }

  downloadActivityReportXls(){
    this._services.service_general_get('ReportDay/createExcelReportDay?id=' + this.SO_ID)
    .subscribe((data => {
      if (data.success) {
        const linkSource =
        'data:application/octet-stream;base64,' + data.message;
        const downloadLink = document.createElement('a');
        const fileName = 'reports_list.xlsx';

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    }));
  }

  GetServicesByReport(element){
    //console.log(element);
    this.reportServices = element.services;
  }

  getSupplier() {
    let data;
    this._services.service_general_get('PropertyReport/GetSupplierPartner/'+this.SO_ID+'?supplier_type=' + this.ST + '&supplier=' + this.SU).subscribe((dat: any) => {
      if (dat.success) {
        //console.log('DATA CONSULTA: SUPPLIER', dat.result.value);
        data = dat.result.value;
        this.dataSourceR = new MatTableDataSource(data);
        this.dataSourceR.paginator = this.SupplierPartnersRecord;
        this.dataSourceR.sort = this.firstTableSort;
        //console.log(this.dataSourceR);

      }
    });
  }

  cleanFilter() {
    this.ST = 0;
    this.SU = 0;
    this._services.service_general_get('PropertyReport/GetSupplierPartner').subscribe((dat => {
      if (dat.success) {
        //console.log('DATA CONSULTA: SUPPLIER', dat);
        this.dataSourceR = new MatTableDataSource(dat.result.value);
        this.dataSourceR.paginator = this.SupplierPartnersRecord;
        this.dataSourceR.sort = this.firstTableSort;
        //console.log(this.dataSourceR);
      }
    }));
  }

  async get_catalogos() {
    this.service = await this._services.getCatalogueFrom('GetServiceLine');
    this.SupplierType = await this._services.getCatalogueFrom('GetSupplierType');
    this.Supplier = await this._services.getCatalogueFrom('GetSupplier');
    this.caAmenity = await this._services.getCatalogueFrom('GetAmenity');
    this.caContractType = await this._services.getCatalogueFrom('GetContractType');
    this.caPropertyTypeHousing = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.caCurrency = await this._services.getCatalogueFrom('GetCurrency');
    this.caSize = await this._services.getCatalogueFrom('GetSize');
    this.caMetric = await this._services.getCatalogueFrom('GetMetric');
    this.line_service = await this._services.getCatalogueFrom('GetTypeService');

    for (let i = 0; i < 11; i++) {
      this.caNumbers.push(i);
    }

  }


  detailsReport(element) {
    console.log("hhhhh-->",element);
    const dialogRef = this._dialog.open(DialogReportDayComponent, {
      data: {
        sr: this.SO_ID,
        id: element.id,
        services: element.services,
        serviceLine: element.serviceLine,
      }, width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == undefined){
        this._getReport_("");
        this.getSupplier();
      }     
    })
  }

  showExportDialog() {
    const dialogRef = this._dialog.open(DialogExportComponent, {
      data: "",
      width: "40%"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        document.getElementById("excel").click();
      }
      if (result === 2) {
        let tabla = [['Date', 'Service Line', 'Work Order', 'Program', 'Services', 'Report By', 'Time Used']]
        for (let i = 0; i < this.dataSourceReport.filteredData.length; i++) {
          const element = this.dataSourceReport.filteredData[i];
          tabla.push([
            this.formatDate(element.creationDate), element.serviceLine,
            element.numberWorkOrder, '', element.services,
            element.reprortedBy, element.totalTime
          ])
        }
        //console.log(tabla);
        // Set the fonts to use
        PdfMakeWrapper.setFonts(pdfFonts);

        const pdf = new PdfMakeWrapper();

        pdf.pageMargins([30, 30, 30, 30]);
        pdf.pageOrientation('portrait');
        pdf.defaultStyle({
          fontSize: 10,
          alignment: 'center'
        });
        pdf.add(new Table(tabla).layout('lightHorizontalLines').end);

        pdf.create().download('Activity Reports.pdf');
      }
    });
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


  public table_supplier(data) {
    this.supplier_table = data;
  }
  //****************************************************************//
  public line_status: any = [];
  public line_category: any = [];
  public line_service: any = [];
  public line_deliver: any = [];
  public fixed_params: string = '';
  public async initFilterImmRelTableSettings(tab_selected: number): Promise<void> {

    this.fixed_params = `ServiceRecord/GetServices/${this.SO_ID}?type=${tab_selected}`;

    this.line_status = await this._services.getCatalogueFrom('GetStatus');
    this.line_category = await this._services.getCatalogueFrom(`GetCataegoryByServiceLineId/?serviceLineId=${tab_selected}`);
    this.line_service = await this._services.getCatalogueFrom('GetTypeService');
    this._services.service_general_get(`ServiceRecord/GetApplicant/${this.edit_sr_model.id}`)
      .subscribe((response: any) => {

        if (response.success) {

          this.line_deliver = response.applicant.value;

        }

      }, (error: any) => {

        console.error('Error (GetApplicant) => ', error);

      });

  }

  public dinamic_params_homm: FilterImmRelFields = new FilterImmRelFields();
  public dinamic_params_host: FilterImmRelFields = new FilterImmRelFields();
  public findingImmRelTables(kind_section: number, tab_section: number = 1): void {

    const params_to_send: FilterImmRelFields = kind_section == 1 ?
      this.dinamic_params_homm : this.dinamic_params_host;

    let params: any = '';

    for (let field in params_to_send) {

      if (params_to_send[field] != '') {

        params += `&${field}=${params_to_send[field]}`

      }

    }

    this.updateTableRelImmByRequest(this.fixed_params + params, kind_section, tab_section);

  }

  public updateTableRelImmByRequest(params: string, section_in: number, tab_selected: number): void {

    this._services.service_general_get(params)
      .subscribe((response: any) => {

        if (tab_selected == 1) {

          if (section_in == 1) {

            this.home_contry = new MatTableDataSource(response.map.value.home);
            this.home_contry.paginator = this.paginators_;

          } else if (section_in == 2) {

            this.host_contry = new MatTableDataSource(response.map.value.host);
            this.host_contry.paginator = this.paginators_;

          }

        } else if (tab_selected == 2) {

          if (section_in == 1) {

            this.relocation_home_services = response.map.value.home;

          } else if (section_in == 2) {

            this.relocation_host_services = response.map.value.host;

          }

        }

      }, (error: any) => {

        console.error('Error (updateTableRelImmByRequest) => ', error);

      });

  }

  crearfilter(section) {

    if (section == 1) {
      this.dinamic_params_homm.program = null;
      this.dinamic_params_homm.serviceType = null;
      this.dinamic_params_homm.status = null;
      this.dinamic_params_homm.deliverTo = null;
      this.filteruno = true;
      setTimeout(() => {
        this.filteruno = false;
      }, 2000);
      this.findingImmRelTables(section);
    } else if (section == 2) {
      this.dinamic_params_host.program = null;
      this.dinamic_params_host.serviceType = null;
      this.dinamic_params_host.status = null;
      this.dinamic_params_host.deliverTo = null;
      this.filterdos = true;
      setTimeout(() => {
        this.filterdos = false;
      }, 2000);
      this.findingImmRelTables(section);
    } else if (section == 3) {
      this.dinamic_params_homm.program = null;
      this.dinamic_params_homm.serviceType = null;
      this.dinamic_params_homm.status = null;
      this.dinamic_params_homm.deliverTo = null;
      this.filteruno = true;
      setTimeout(() => {
        this.filteruno = false;
      }, 2000);
      this.findingImmRelTables(1, 2);
    } else if (section == 4) {
      this.dinamic_params_host.program = null;
      this.dinamic_params_host.serviceType = null;
      this.dinamic_params_host.status = null;
      this.dinamic_params_host.deliverTo = null;
      this.filterdos = true;
      setTimeout(() => {
        this.filterdos = false;
      }, 2000);
      this.findingImmRelTables(2, 2);
    }


  }

  public goToPage(the_page: string = ''): void {

    this._router.navigateByUrl(the_page + this.SO_ID);

  }

  public movePageTo(): void {

    window.scrollTo(0, 0);

  }

  public dateWorker(date: string): string {

    let result: string = '';

    if (date != null) {

      const date_to_work: string = date,
        date_remove_time: string = date_to_work.split('T')[0];

      result = date_remove_time;

    } else {

      result = 'No Date';

    }

    return result;

  }

  public editing_info: boolean = false;
  public editInfoToggleInputs(): void {

    !this.editing_info ?
      this.editing_info = true :
      this.editing_info = false;

  }

  public removeErrorLabel(input_value: any, object_data: any): void {

    if (input_value == "" || input_value == null) {

      object_data.handler[object_data.field] = true;

    } else {

      object_data.handler[object_data.field] = false;

    }

  }

  public calculateHowOld(): void {

    const my_bd: any = this.edit_sr_model.assigneeInformations[0].birth;

    if (my_bd != null || my_bd != '') {

      const date_init = new Date(my_bd.getFullYear(), my_bd.getMonth(), my_bd.getDate()),
        date_today = new Date();

      let diff = (date_init.getTime() - date_today.getTime()) / 1000;
      diff /= (60 * 60 * 24);

      this.edit_sr_model.assigneeInformations[0].age = Math.abs(Math.round(diff / 365.25));

    } else {

      this.edit_sr_model.assigneeInformations[0].age = null;

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

          //console.log('Res => ', response);

          if (this.current_email != response.result) {

            if (!response.success) {

              this.showGeneralMessageDialog(
                'Email already exists',
                'The email already exists, perhaps it has been used in any Service Record.'
              );

              this.edit_sr_model.assigneeInformations[0].email = '';

            }

          }

        }, (error: any) => {

          console.error('Error (User/VeryfyEmail) => ', error);

        });

    }

  }

  public calculateHowOldDina(to_who: string, value_input: any, native_input: boolean = true): void {

    value_input = value_input.target.value;

    const field_age_group: any = document.getElementById(to_who);

    if (value_input != null) {
      field_age_group.value = getYears(value_input);
    }else{
       field_age_group.value = null;
    }

    function getYears(date_in: any): number {

      const date_init = new Date(date_in.getFullYear(), date_in.getMonth(), date_in.getDate()),
        date_today = new Date();

      let diff = (date_init.getTime() - date_today.getTime()) / 1000;
      diff /= (60 * 60 * 24);

      return Math.abs(Math.round(diff / 365.25));

    }

  }

  public calculateHowOldDinaPets(to_who: string, value_input: any, native_input: boolean = true, i): void {
    value_input = value_input.target.value;
    const field_age_group: any = document.getElementById(to_who);
    if (value_input != null) {
      field_age_group.value = getYears(value_input);
      let edad = field_age_group.value;
      this.pets[i].age = edad;
    }else{
       field_age_group.value = null;
    }
    function getYears(date_in: any): number {
      const date_init = new Date(date_in.getFullYear(), date_in.getMonth(), date_in.getDate()),
        date_today = new Date();
      let diff = (date_init.getTime() - date_today.getTime()) / 1000;
      diff /= (60 * 60 * 24);
      return Math.abs(Math.round(diff / 365.25));
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
            switch (section) {

              case 'dependent':
                root.assign_dependents[dependent_index].photo = base64.split(',')[1];
                root.assign_dependents[dependent_index].PhotoExtension = 'png';
                break;

              case 'pet':
                root.pets[dependent_index].photo = base64.split(',')[1];
                root.pets[dependent_index].PhotoExtension = 'png'
                break;

              case 'profile':
                root.edit_sr_model.assigneeInformations[0].photo = base64.split(',')[1];
                root.edit_sr_model.assigneeInformations[0].PhotoExtension = 'png';
                break;

            }

            setTimeout(() => field_photo.setAttribute('src', base64), 333);
        }
    });

  }


  public removeErrorDinamic(input_value: any, id_label: string): void {

    const get_input_label: any = document.getElementById(id_label);

    if (input_value == '' || input_value == null || input_value == undefined) {

      get_input_label.classList.remove('display-none');

    } else {

      get_input_label.classList.add('display-none');

    }

  }

  public validEmailHiringManager(email: string): void {

    !this.validateEmail(email) ?
      this.assign_form_validator.no_hmai_val = true :
      this.assign_form_validator.no_hmai_val = false;

  }

  public validEmailAssignee(email: string): void {

    !this.validateEmail(email) ?
      this.fass_validator.no_emai_val = true :
      this.fass_validator.no_emai_val = false;

  }

  public show_relocation_form: boolean = false;
  public showRelocationSupForm(): void {

    !this.show_relocation_form ?
      this.show_relocation_form = true :
      this.show_relocation_form = false;

  }

  public showChatSelected(tab: string, event_data: any): void {
    //comprobar si es un consultat y solo podra abrir imi o relo dependiendo su perfil
    // immi
    if (tab == 'chat_imm' && this.__userlog__.role.id == 3) {
      if (this.__userlog__.profileUsers[0].supplierType == 3) {
        //console.log('consultant con permisos chat');
        tab = 'chat_imm';
      }
      else{
        tab = '';
        event_data = null;
        return
      }
    }
    // relo
    if (tab == 'chat_rel' && this.__userlog__.role.id == 3 ) {
      if (this.__userlog__.profileUsers[0].supplierType == 1) {
        //console.log('consultant con permisos chat');
        tab = 'chat_rel';
      }
      else {
        tab = '';
        event_data = null;
        return
      }
    }

    //console.log('chat select', tab);

    const chat_window: any = document.getElementsByClassName('chat_window'),
      chat_selected: any = document.getElementById(tab),
      chat_tab: any = document.getElementsByClassName('chat-tab');

    for (let window = chat_window.length; window--;) {

      chat_window[window].classList.add('display-none');
      chat_tab[window].classList.remove('page__section-tab--active');

    }

    chat_selected.classList.remove('display-none');
    event_data.classList.add('page__section-tab--active');

  }

  public showCallsTabSelected(tab: string, event_data: any): void {
    //console.log('show tab call', tab );
    //console.log('show tab event', event_data);


     //comprobar si es un consultat y solo podra abrir imi o relo dependiendo su perfil
    // immi
    if (tab == 'calls_imm' && this.__userlog__.role.id == 3) {
      if (this.__userlog__.profileUsers[0].supplierType == 3) {

      }
      else{
        tab = '';
        event_data = null;
        return
      }
    }
    // relo
    if (tab == 'calls_rel' && this.__userlog__.role.id == 3 ) {
      if (this.__userlog__.profileUsers[0].supplierType == 1) {

      }
      else {
        tab = '';
        event_data = null;
        return
      }
    }


    const call_window: any = document.getElementsByClassName('call_window'),
      call_selected: any = document.getElementById(tab),
      call_tab: any = document.getElementsByClassName('call-tab');

    for (let window = call_window.length; window--;) {

      call_window[window].classList.add('display-none');
      call_tab[window].classList.remove('page__section-tab--active');

    }

    //call_selected.classList.remove('display-none');
    //if(this.contCalls != 1){
      call_selected.classList.remove('display-none');
      event_data.classList.add('page__section-tab--active');


    //}

  }

  public showEmailsTabSelected(tab: string, event_data: any): void {

    const call_window: any = document.getElementsByClassName('email_window'),
      call_selected: any = document.getElementById(tab),
      call_tab: any = document.getElementsByClassName('email-tab');

    for (let window = call_window.length; window--;) {

      call_window[window].classList.add('display-none');
      call_tab[window].classList.remove('page__section-tab--active');

    }

    call_selected.classList.remove('display-none');
    event_data.classList.add('page__section-tab--active');

  }

  public showMapsTabSelected(tab: string, event_data: any): void {

    const element_window: any = document.getElementsByClassName('map_window'),
      element_selected: any = document.getElementById(tab),
      element_tab: any = document.getElementsByClassName('map-tab');

    for (let window = element_window.length; window--;) {

      element_window[window].classList.add('display-none');
      element_tab[window].classList.remove('page__section-tab--active');

    }

    element_selected.classList.remove('display-none');
    event_data.classList.add('page__section-tab--active');

  }

  public showTaskTabSelected(tab: string, event_data: any): void {
    //console.log('tab select action item', tab, event_data);

    //comprobar si es un consultat y solo podra abrir imi o relo dependiendo su perfil
    // immi
    if (tab == 'task_imm' && this.__userlog__.role.id == 3) {
      if (this.__userlog__.profileUsers[0].supplierType == 3) {

      }
      else{
        tab = '';
        event_data = null;
        return
      }
    }
    // relo
    if (tab == 'task_rel' && this.__userlog__.role.id == 3 ) {
      if (this.__userlog__.profileUsers[0].supplierType == 1) {

      }
      else {
        tab = '';
        event_data = null;
        return
      }
    }

    const element_window: any = document.getElementsByClassName('task_window'),
      element_selected: any = document.getElementById(tab),
      element_tab: any = document.getElementsByClassName('task-tab');

    for (let window = element_window.length; window--;) {

      element_window[window].classList.add('display-none');
      element_tab[window].classList.remove('page__section-tab--active');

    }

    element_selected.classList.remove('display-none');
    event_data.classList.add('page__section-tab--active');

  }

  public showEscalationsTabSelected(tab: string, event_data: any): void {

    const element_window: any = document.getElementsByClassName('escalation_window'),
      element_selected: any = document.getElementById(tab),
      element_tab: any = document.getElementsByClassName('escalation-tab');

    for (let window = element_window.length; window--;) {

      element_window[window].classList.add('display-none');
      element_tab[window].classList.remove('page__section-tab--active');

    }

    element_selected.classList.remove('display-none');
    event_data.classList.add('page__section-tab--active');

  }

  public show_file_section: boolean = false;
  public toggleFileTextChat(): void {

    !this.show_file_section ?
      this.show_file_section = true :
      this.show_file_section = false;

  }

  public chat_conversations: any[] = [];
  public first_conversation: boolean = false;
  public serviceline_conversation: number = 1;
  public initChatBehavior(type: number = 1): void {
    this.__loader__.showLoader();
     //comprobar si es un consultat y solo podra abrir imi o relo dependiendo su perfil
    // immi
    if (type == 1 && this.__userlog__.role.id == 3 ) {
      if (this.__userlog__.profileUsers[0].supplierType == 3) {
        //console.log('consultant con permisos');
        type = 1;
      }
      else{
        return
      }
    }
    // relo
    if (type == 2 && this.__userlog__.role.id == 3) {
      if ( this.__userlog__.profileUsers[0].supplierType == 1) {
        //console.log('consultant con permisos');
        type = 2;
      }
      else {
        return
      }
    }

    this.serviceline_conversation = type;

    const so_and_type: string = `?Service_record_id=${this.SO_ID}&type=${this.serviceline_conversation}`;

    this._services.service_general_get(`ChatImmigrationRelocation/GetConversation${so_and_type}`)
      .subscribe((response: any) => {

        if (response.success) {

          const chats_in: any = response.result.value;

          this.chat_conversations = chats_in;

          if (chats_in.length == 0) {

            this.first_conversation = true;

          } else {

            this.first_conversation = false;

          }

          this.chatWindowPosition();
          this.chat_model.comment = '';
          this.chat_model.chatDocumentImmigrationRelocations = [];
          //console.log('[CP2294] Chats in res ===> ', response);

        }

      }, (error: any) => {

        console.error('ChatImmigrationRelocation/GetConversation => ', error);

      });
      this.__loader__.hideLoader();
  }

  public chat_model: ChatConversation = new ChatConversation();
  public continueChatConversation(): void {

    this.__loader__.showLoader();
    this.chat_model.dateComment = new Date();
    this.chat_model.userId = this.USERDATA.id;
    this.chat_model.chatCoversationId = this.chat_conversations[0]?.conversationId;

    const chat_data: ChatConversation[] = [this.chat_model];

    if (this.chat_model.comment.length != 0) {

      //console.log('[CP2338] Continu Chat send ===> ', chat_data);
      //console.log('[CP2338] Continu Chat send ===> ', JSON.stringify(chat_data));
      this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateComment', chat_data)
        .subscribe((response: any) => {

          //console.log('Res (ChatImmigrationRelocation/CreateComment) => ', response);

          if (response.success) {
            this.__loader__.hideLoader();
            this.chat_model.comment = '';
            this.chat_model.chatDocumentImmigrationRelocations = [];
            this.initChatBehavior(this.serviceline_conversation);

          }

        }, (error: any) => {
          this.__loader__.hideLoader();
          console.error('Error (ChatImmigrationRelocation/CreateComment) ==> ', error);

        });

    }

  }

  public new_chat: newChat = new newChat();
  public newChatConversation(): void {

    this.chat_model.dateComment = new Date();
    this.chat_model.userId = this.USERDATA.id;

    this.new_chat.createdDate = new Date();
    this.new_chat.createdBy = this.USERDATA.id;
    this.new_chat.serviceLineId = this.serviceline_conversation;
    this.new_chat.serviceRecordId = this.edit_sr_model.id;
    this.new_chat.chatImmigrationRelocations[0] = this.chat_model;

    const chat_data: newChat[] = [this.new_chat];

    if (this.chat_model.comment.length != 0) {

      this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateConversation', chat_data)
        .subscribe((response: any) => {

          if (response.success) {

            this.chat_model.comment = '';
            this.initChatBehavior(this.serviceline_conversation);

          }

        }, (error: any) => {

          console.log('Error (ChatImmigrationRelocation/CreateConversation) => ', error);

        });

    }

  }

  public getChatDateFormat(date_in: string): string {

    let result: string = '';

    const date_split: string[] = date_in.split('T'),
      hour_split: string[] = date_split[1].split(':');

    result = `${date_split[0]} ${hour_split[0]}:${hour_split[1]}`;

    return result;

  }

  public chatImageSrcStyle(src_path: string): string {

    let result: string = '';

    const kind_of_file: string = src_path.split('.')[1];

    switch (kind_of_file) {

      case 'gif':
      case 'jpg':
      case 'png':
      case 'svg':
      case 'jpeg':
        result = this.image_path + src_path;
        break;

      default:
        result = 'https://cdn.onlinewebfonts.com/svg/img_560325.png';
        break;

    }

    return result;

  }

  public chatWindowPosition(): void {

    const chat_window: any = document.getElementsByClassName('chat__chat');

    setTimeout(() => {

      this.serviceline_conversation == 1 ?
        chat_window[0].scrollTo(0, chat_window[0].scrollHeight) :
        chat_window[1].scrollTo(0, chat_window[1].scrollHeight);

    }, 200);

  }

  public openCountryDialog(): void {

    const add_call_dialog = this._dialog.open(DialogSliderComponent, {
      data: {
        id_so: this.edit_sr_model.id
      },
      width: "95%"
    });

  }

  public calls_colums: string[] = ['cam_0', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_7'];
  calls_columsedit: string[] = ['cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9', 'cam_10'];

  public calls_in_list_imm: any;
  public calls_in_list_rel: any;
  public calls_serviceline: number = 1;
  public contCalls = 0;

  public initCallsBehavior(calls_sl: number): void {
    //console.log('Tab selected en calls ===> ', calls_sl);
    let event;
    let tab;

    // llamar a para pintar tab showCallsTabSelected
    if( calls_sl == 1){
      this.contCalls = this.contCalls + 1;
      event = '<div _ngcontent-kqj-c705 class="page__section-tab call-tab"> Immigration </div>';
      tab = 'calls_imm';
    } else if(calls_sl == 2 ){
      this.contCalls = this.contCalls + 1;
      event = '<div _ngcontent-kqj-c705 class="page__section-tab call-tab page__section-tab--active"> Relocation </div>';
      tab = 'calls_rel';

    }

    if (calls_sl == 1 && this.__userlog__.role.id == 3 ) {
      if (this.__userlog__.profileUsers[0].supplierType == 3) {
        //console.log('consultant con permisos');
        calls_sl = 1;
        document.getElementById('immiCall1').click();
      }
      else{
        return
      }
    }
    // relo 2
    if (calls_sl == 2 && this.__userlog__.role.id == 3) {
      if ( this.__userlog__.profileUsers[0].supplierType == 1) {
        //console.log('consultant con permisos');
        calls_sl = 2;
       document.getElementById('relCall1').click();
      }
      else {
        return
      }
    }


    this.calls_serviceline = calls_sl;

    const params: string = `?Service_record_id=${this.edit_sr_model.id}&service_line_id=${this.calls_serviceline}`;

    this._services.service_general_get(`Call/GetCallByServiceRecord${params}`)
      .subscribe((response: any) => {

        //console.log('The calls ==> ', response, 'Call/GetCallByServiceRecord' + params);

        if (response.success) {

          switch (calls_sl) {

            case 2:
              this.calls_in_list_rel = new MatTableDataSource(response.result);
              this.calls_in_list_rel.paginator = this.callrelo;
              break;



            case 1:
              this.calls_in_list_imm = new MatTableDataSource(response.result);
              this.calls_in_list_imm.paginator = this.call;
              break;

          }
 // si el usuario es consultant y es la primera ves que se entra a communication
          if(this.contCalls == 1 && this.__userlog__.role.id == 3 ){
            this.showCallsTabSelected(tab, event);
          }
        }


      }, (error: any) => {

        console.error();

      });

  }


  public emails_table_cols: string[] = ['cam_0', 'cam_3'];
  public emails_imm_list: any[] = [];
  public emails_rel_list: any[] = [];
  public initEmailsBehavior(service_line: number = 1): void {

    const params: string = `?service_line_id=${service_line}&service_record_id=${this.edit_sr_model.id}`;

    this._services.service_general_get(`EmailSend/GetEmail${params}`)
      .subscribe((response: any) => {

        if (response.success) {

          //console.log('Aqui =======> ', response);

          switch (service_line) {

            case 1:
              this.emails_rel_list = response.result.value;
              break;

            case 2:
              this.emails_imm_list = response.result.value;
              break;

          }

        }

      }, (error: any) => {

        console.log('Error (EmailSend/GetEmail) => ', error);

      });

  }

  public sent_this_email: EmailSend = new EmailSend();
  public sendCommEmail(service_line: number, mail_data: any): void {

    const params: string = `?email=${this.USERDATA.email}&username=${this.USERDATA.name}${this.USERDATA.lastName}`;

    this.sent_this_email.serviceLineId = service_line;
    this.sent_this_email.serviceRecordId = this.edit_sr_model.id;
    this.sent_this_email.emailId = mail_data.id;
    this.sent_this_email.completed = mail_data.completed;

    this.__loader__.showLoader();

    this._services.service_general_post_with_url(`EmailSend/EmailSend${params}`, this.sent_this_email)
      .subscribe((response: any) => {

        if (response.success) {

          this.initEmailsBehavior();
          this.__loader__.hideLoader();
          this.showGeneralMessageDialog('Email Sent', 'Email has been sent successfully.');

        }

      }, (error: any) => {

        console.log('Error (EmailSend/EmailSend) => ', error);

      });

  }

  public task_table_cols: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9'];
  public task_rel_table: any = [];
  public task_imm_table: any = [];
  public initTasksBehavior(service_line: number = 1): void {

    //comprobar si es un consultat y solo podra abrir imi o relo dependiendo su perfil
    // immi 1
    if (service_line == 1 && this.__userlog__.role.id == 3 ) {
      if (this.__userlog__.profileUsers[0].supplierType == 3) {
        //console.log('consultant con permisos');
        service_line = 1;
        document.getElementById('immiconsultor1').click();
      }
      else{
        return
      }
    }
    // relo 2
    if (service_line == 2 && this.__userlog__.role.id == 3) {
      if ( this.__userlog__.profileUsers[0].supplierType == 1) {
        //console.log('consultant con permisos');
        document.getElementById('reliconsultor1').click();
        service_line = 2;
      }
      else {
        return
      }
    }


    const params: string = `?service_record_id=${this.edit_sr_model.id}&service_line_id=${service_line}`;

          switch (service_line) {

            case 2:

              this._services.service_general_get(`Task/GetAllTask${params}`).subscribe((response: any) => {
              //console.log('Res ===> ', response);

               if (response.success) {
                this.task_rel_table = new MatTableDataSource(response.result.value);
                this.task_rel_table.paginator = this.taskRelpag;
                this.task_rel_table.sort = this.tasRel;
                //console.log('this.task_rel_table ==> ', this.task_rel_table);
               }
              },(err)=>{
                //console.log(err)
              })

              break;

            case 1:
              this._services.service_general_get(`Task/GetAllTask${params}`).subscribe((response: any) => {
                //console.log('Res ===> ', response);

                 if (response.success) {
                   this.task_imm_table = new MatTableDataSource(response.result.value);
                    this.task_imm_table.paginator = this.taskImmpag;
                    this.task_imm_table.sort = this.tasImm;
                    //console.log('this.task_imm_table ==> ', this.task_imm_table);
                 }
               },(err)=>{
                //console.log(err)
              })
              break;

          }
  }


  public cofb_table_paginator: CustomPaginator = new CustomPaginator(this._services);
  public feedback_items: any[] = [];
  public initAssFeedbackBehavior(): void {

    this.feedbackPaginator();

  }

  public feedbackPaginator(): void {

    this.cofb_table_paginator.initNewPaginator('feedback-paginator', 'AssigneeFeedback/GetAssigneeFeedback');

    setTimeout(() => {

      this.feedback_items = this.cofb_table_paginator.paginatorRequest().result.value;

    }, 777);

  }

  public getFeedbackstarts(how_many: number): number[] {

    let total: number[] = [];

    for (let x = 0; x < how_many; x += 1) {

      total.push(x);

    }

    return total;

  }

  public getFeedbackstartsGrays(how_many: number): number[] {

    let total: number[] = [],
      how_many_grays: number = 5 - how_many;

    for (let x = 0; x < how_many_grays; x += 1) {

      total.push(x);

    }

    return total;

  }

  public mapit_sl_id: number = 2;
  public initMapitBehavior(): void {

    this.requestMapitsData(this.mapit_sl_id);

  }

  public mapit_data_gotted: any[] = [];
  public mapit_table_data: any = undefined;
  public requestMapitsData(service_line: number): void {

    this.mapit_sl_id = service_line;

    this._services.service_general_get(
      `MapIt/GetMapIt?ServiceLineId=${this.mapit_sl_id}&service_record_id=${this.edit_sr_model.id}`)
      .subscribe((response: any) => {

        if (response.success) {

          this.mapit_data_gotted = response.result.value;
          this.mapit_table_data = new MatTableDataSource(this.mapit_data_gotted);
          this.mapit_table_data.paginator = this.pagMaps;

        }

      }, (error: any) => {

        console.error('Error (GetMapItById) => ', error);

      });

  }

  public esca_table_cols: any = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9'];
  public initEscalationBehavoir(): void {

    this.requestEscalations(this.escalation_line);

  }

  public escalation_data: any[] = [];
  public escalation_table_data: any = undefined;
  public escalation_line: number = 2;
  @ViewChild(MatPaginator) _escalation_: MatPaginator;
  public requestEscalations(service_line: number): void {

    //console.log('URL paps ==========> ', `Scalate/GetEscalationCommunication?ServiceLineId=${service_line}`);

    this._services.service_general_get(`Scalate/GetEscalationCommunication?ServiceLineId=${service_line}&sr=${this.edit_sr_model.id}`)
      .subscribe((response: any) => {

        if (response.success) {

          this.escalation_data = response.result.value;
          this.escalation_table_data = new MatTableDataSource(this.escalation_data);
          this.escalation_table_data.paginator = this._escalation_;
          //console.log('Scalate/GetEscalationCommunication ==> ', response);

        }

      }, (error: any) => {

        console.error('Error (Scalate/GetEscalationCommunication) => ', error);

      });

  }

  public communicationAddCall(data_serviceLine): void {

    //console.log('More data ==> ', this.edit_sr_model);

    const add_call_dialog = this._dialog.open(DialogAddCall, {
      data: {
        id_so: this.edit_sr_model.id,
        serviceLineId: data_serviceLine
      },
      width: "95%"
    });

    add_call_dialog.afterClosed().subscribe(result => {

      this.initCallsBehavior(this.calls_serviceline);

    });

  }

  editCall(data): void {

    //console.log('More data ==> ', this.edit_sr_model);

    const add_call_dialog = this._dialog.open(DialogEditCallComponent, {
      data: data,
      width: "95%"
    });

    add_call_dialog.afterClosed().subscribe(result => {

      this.initCallsBehavior(this.calls_serviceline);

    });

  }

  public communicationAddMapit(map_in: any = null): void {

  }

  public communicationAddTask(service_line: number): void {

    const assing_task_dialog = this._dialog.open(DialogAssignTask, {
      data: {
        id_so: this.edit_sr_model.id,
        service_line: service_line
      },
      width: "95%"
    });

    assing_task_dialog.afterClosed().subscribe(result => {

      this.initTasksBehavior(service_line);

    });

  }

  public communicationViewEscalation(escalation: any): void {
    ////////
    const add_call_dialog = this._dialog.open(DialogViewEscalation, {
      data: {
        id_so: this.edit_sr_model.id,
        escalation: escalation
      },
      width: "95%"
    });

    add_call_dialog.afterClosed().subscribe(result => {

    });

  }

  public getSelectedTaskData(id_element: any, sl: number): void {

    const params: string = `?id=${id_element}`;

    this.__loader__.showLoader();

    this._services.service_general_get(`Task/GetTaskById${params}`)
      .subscribe((response: any) => {

        this.__loader__.hideLoader();

        if (response.success) {

          const assing_task_dialog = this._dialog.open(DialogEditTask, {
            data: {
              id: id_element,
              id_so: this.edit_sr_model.id,
              task_data: response,
              url_request: `Task/GetTaskById${params}`
            },
            width: "95%"
          });

          assing_task_dialog.afterClosed().subscribe(result => {

            this.initTasksBehavior(sl);

          });

        }

      }, (error: any) => {

        this.__loader__.hideLoader();

        console.error('Error (Task/GetTaskById) => ', error);

      });

  }

  /* Reports Section: Functions and variables */

  public reports_table: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5'];
  public hs_reports_table: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9'];
  public supp_part_table: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
  public comhis_part_table: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];

  /* Reports Section: Functions and variables */

  public downloadDocumentSelected(file: string): void {

    window.open(`${this.image_path}${file}`, '_blank');

  }

  public splitTimeInDate(date_in: string): string {

    return date_in.split('T')[0];

  }

  public autoClickTab(section_name: string): void {

    const selector_to_click: any = document.querySelector(section_name);

    selector_to_click.click();

  }

  /* New Challenger has enter the ring * */
  public files: NgxFileDropEntry[] = [];
  public chat_document: ChatDocument = new ChatDocument();
  public dropped(files: NgxFileDropEntry[]) {

    this.files = files;
    const root: any = this;
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

              const base64_gotted: any = reader.result;

              this.chat_document.fileExtension = file.name.split('.')[1];
              this.chat_document.filePath = base64_gotted.split(',')[1];
              this.chat_model.chatDocumentImmigrationRelocations.push(this.chat_document);
              this.chat_model.comment = file.name;

              if (this.serviceline_conversation == 1) {

                this.continueChatConversation();

              } else {

                this.newChatConversation();

              }

              this.toggleFileTextChat();

            };
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        ////console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    ////console.log(event);
  }

  public fileLeave(event) {
    ////console.log(event);
  }

  complete() {
    const dialogRef = this._dialog.open(DialogCompleteComponent, {
      data: {
        sr: this.SO_ID,
        id: this.edit_sr_model.id,
        user_id: this.USERDATA.id,
        status: this.edit_sr_model
      }, width: "45%"
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  addActivityReport() {
    const dialogRef = this._dialog.open(DialogReportDayComponent, {
      data: {
        sr: this.SO_ID,
        id: 0
      }, width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined){
        this._getReport_("");
        this.getSupplier();
      }    
    })
  }


  addRequestAddicionalTime() {
    const dialogRef = this._dialog.open(DialogRequestAdditionalTimeComponent, {
      data: {
        sr: this.SO_ID,
        id: 0
      }, width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getReport();
    })
  }

  public getMaxDateTo(years_ago: number = 18): Date {

    const today: Date = new Date(),
      today_year: number = today.getFullYear(),
      today_month: number = today.getMonth(),
      today_day: number = today.getDate(),
      new_min_date: Date = new Date(today_year - years_ago, today_month, today_day);

    return new_min_date;

  }

  /* Test Stuff ==================================================> */
  public accepDeclineImmigrationCoordinator(status: boolean = true): void {

    const coordinator: any = this.edit_sr_model.immigrationCoodinators[0];

    this._services.service_general_put(
      `ServiceRecord/AcceptImmigrationCoordinator/${coordinator.id}/${status}`, {})
      .subscribe((response: any) => {

        //console.log('Res ====> ', response);

        let text: string = '';

        status ? text = 'Coordinator has been accepted' : text = 'Coordinator has been decline';

        this.showGeneralMessageDialog('Coordinator', text);

      }, (error: any) => {

        console.error('Error => ', error);

      });

  }

  public acceptDeclineImmSupplier(element: any, status: boolean = true): void {

    //console.log('Eleme Imm => ', element);

    this._services.service_general_put(
      `ServiceRecord/AcceptImmigrationSupplierPartner/${element.id}/${status}`+ '?sr='+this.SO_ID, {})
      .subscribe((response: any) => {

        //console.log('Res ===> ', response);

        let text: string = '';

        status ? text = 'Supplier has been accepted' : text = 'Supplier has been decline';

        this.showGeneralMessageDialog('Supplier', text);

      }, (error: any) => {

        console.error('Error => ', error);

      });

  }

  public accepDeclineRelCoordinator(status: boolean = true): void {

    const coordinator: any = this.edit_sr_model.relocationCoordinators[0];

    //console.log('Rel => ', coordinator);
    //console.log('Status => ', status);

    this._services.service_general_put(
      `ServiceRecord/AcceptRelocationCoordinator/${coordinator.id}/${status}`, {})
      .subscribe((response: any) => {

        //console.log('Res => ', response);

        let text: string = '';

        status ? text = 'Coordinator has been accepted' : text = 'Coordinator has been decline';

        this.showGeneralMessageDialog('Coordinator', text);

      }, (error: any) => {

        console.error('Error => ', error);

      });

  }

  public acceptDeclineRelSupplier(element: any, status: boolean = true): void {

    //console.log('Eleme Rel => ', element);

    this._services.service_general_put(
      `ServiceRecord/AcceptRelocationSupplierPartner/${element.id}/${status}`+ '?sr='+this.SO_ID, {})
      .subscribe((response: any) => {

        //console.log('Res ===> ', response);

        let text: string = '';

        status ? text = 'Supplier has been accepted' : text = 'Supplier has been decline';

        this.showGeneralMessageDialog('Supplier', text);

      }, (error: any) => {

        console.error('Error => ', error);

      });

  }


  openRequestPayment() {
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: { sr: this.SO_ID, id: 0 },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_request();
    })
  }

  openRequestPaymentedit(element) {
    //console.log(element);
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: { sr: this.SO_ID, id: element.id },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_request();
    })
  }

  public new_coordinator = [];
  addCoordinador() {
    this.new_coordinator.push({
      "id": 0,
      "coordinatorTypeId": 0,
      "coordinatorId": 0,
      "assigned": new Date(),
      "accepted": null,
      "serviceRecordId": Number(this.SO_ID),
      "statusId": 0,
      "createdBy": this.USERDATA.id,
      "createdDate": new Date(),
      "updateBy": this.USERDATA.id,
      "updatedDate": new Date()
    });
    //console.log("Data nuevo coordinador: ", this.new_coordinator);
  }

  addToEditModel() {
    if (this.new_coordinator.length > 0) {
      for (let i = 0; i < this.new_coordinator.length; i++) {
        this.edit_sr_model.immigrationCoodinators.push(this.new_coordinator[i]);
        this.updateServiceRecordData();
      }
      this.new_coordinator = [];
    }
  }

  addToEditModelRel() {
    if (this.new_coordinator.length > 0) {
      for (let i = 0; i < this.new_coordinator.length; i++) {
        this.edit_sr_model.relocationCoordinators.push(this.new_coordinator[i]);
        this.updateServiceRecordData();
      }
      this.new_coordinator = [];
    }
  }

  deleteCoordinador(i) {
    this.new_coordinator.splice(i, 1);
  }


  getNameCoordinator(id) {
  ////console.log(id);
    this.coordinator_catalogue_aux = JSON.parse(localStorage.getItem("coordinator_catalogue"));
    ////console.log(this.coordinator_catalogue_aux);
    for (let i = 0; i < this.coordinator_catalogue_aux.length; i++) {
      if (this.coordinator_catalogue_aux[i].id == id) {
        return this.coordinator_catalogue_aux[i].coordinator;
      }
    }
    return '';
  }

  getTypeCoordinator(id) {
    for (let i = 0; i < this.coordinatortype_catalogue.length; i++) {
      if (this.coordinatortype_catalogue[i].id == id) {
        return this.coordinatortype_catalogue[i].coordinatorType;
      }
    }

    return '';
  }


  public email_services: any;
  public email_relocation = [{
    email: 'Send invite to app and credentials',

  }];
  public email_immigration = [];
  getEmail() {
    // this.email_relocation = [{
    //   email: 'Send invite to app and credentials',

    // }];
    // this._services.service_general_get('Email/ServiceRecord?user=' + this.USERDATA.id + '&sr=' + this.SO_ID).subscribe((response: any) => {
    //   if (response.success) {
    //     this.email_services = response.result.value;
    //     this.email_relocation = [{
    //       email: 'Send invite to app and credentials',

    //     }];//this.email_services.relocation;
    //     this.email_immigration = this.email_services.immigration;
    //     //console.log(this.email_services);
    //   }
    // })
  }

  postEmail(serviceLine, data) {

    // if (data.nickName == "Send App Access") {
    //   this.sendAccess();
    //   return true;
    // }
    // let json = {
    //   "id": 0,
    //   "serviceRecordId": this.SO_ID,
    //   "serviceLine": serviceLine,
    //   "emailId": data.email.id,
    //   "date": new Date(),
    //   "completed": true,
    //   "createdBy": this.USERDATA.id,
    //   "creationDate": new Date(),
    //   "updatedBy": this.USERDATA.id,
    //   "updatedDate": new Date(),
    // }

    // //console.log(json);
    // //console.log(JSON.stringify(json));
    // this._services.service_general_post_with_url('Email/SendEmail', json).subscribe((response: any) => {
    //   if (response.success) {
    //     //console.log(response);
    //     const dialog = this._dialog.open(DialogGeneralMessageComponent, {
    //       data: {
    //         header: "Success",
    //         body: "Email was send"
    //       },
    //       width: "350px"
    //     });
    //   }
    // })
    this.sendAccess();
  }

  sendAccess() {
    //console.log('ENVIO DE CREDENCIALES')
    //Email/SendAppAccess?user=' + this.USERDATA.id//
    this.__loader__.showLoader();
    this._services.service_general_put('Email/SendAppAccess?sr=' + this.SO_ID + '&userId='+this.USERDATA.id, '').subscribe((response: any) => {
      if (response.success) {
        ////console.log(response);
        this.__loader__.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "This action will create the group chat and send an invitation email to the Assignee to access your app"
          },
          width: "450px"
        });
      }
      else
      {
        this.__loader__.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Email not sent, try later"
          },
          width: "350px"
        });
      }
    })
  }

  viewReportHistory() {
    this._router.navigate(['/viewAllReport/' + this.SO_ID]);
  }

  open_bundeld_modal(data, home_host, country) {
    //console.log("Entra a abrir modal de detalle del servicio");
    data.partnerId = this.edit_sr_model.partnerId;
    data.numberServiceRecord = this.edit_sr_model.numberServiceRecord;
    data.sr = this.SO_ID;

    if (home_host == 2) { // host city
      data.country_city = {
        home_contry_name: this.Host_Home_country.host_country_name,
        country_id: this.Host_Home_country.host_country,
        home_city_name: this.Host_Home_country.hostCity_name,
        city_id: this.Host_Home_country.hostCity_Id,
      }
    } else { // home city
      data.country_city = {
        home_contry_name: this.Host_Home_country.home_country_name,
        country_id: this.Host_Home_country.home_country,
        home_city_name: this.Host_Home_country.homeCity_name,
        city_id: this.Host_Home_country.homeCity_Id,
      }
    }

    data.home_host = country;
    data.sr = this.SO_ID;
    data.program = data.serviceType;
    data.wo = data.workOrderId
    const dialogRef = this._dialog.open(DialogBundleComponent, {
      width: "95%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  public SR_Immigration:any;
  public SR_Relocation:any;
  DetectaServiceLine(){
    this.SR_Immigration = this.edit_sr_model.immigrationCoodinators.length;
    this.SR_Relocation = this.edit_sr_model.relocationCoordinators.length;
    //////
  }

  public Team_ImmigrationCoordinators:any;
  public Team_ImmigrationSupplier:any;
  public Team_RelocationCoordinators:any;
  public Team_RelocationSupplier:any;
  DetectaExperienceTeam(){
    this.Team_ImmigrationCoordinators = this.edit_sr_model.immigrationCoodinators.length;
    this.Team_RelocationCoordinators  = this.edit_sr_model.relocationCoordinators.length;
    this.Team_ImmigrationSupplier  = this.suplierData == null ? 0 : this.suplierData.length;
    this.Team_RelocationSupplier  = this.relocation_suppliers == null ? 0 : this.relocation_suppliers.length;
    //console.log("Detecta Experience Team")
  }

  active() {
    //console.log("Boton Active");
    this._services.service_general_put('ServiceRecord/Activate/' + Number(this.SO_ID), '').subscribe((data => {
        if (data.success) {
          //console.log("CAMBIO DE STATUS A ACTIVE: ", data);
          this.ngOnInit();
        }
    }))
  }

  InHold() {
    //console.log("Boton in hold");
    let sl = 1;
    let immigration = this.edit_sr_model.immigrationCoodinators.length;
    let relocation = this.edit_sr_model.relocationCoordinators.length;

    if (immigration >= 1 && relocation >= 1) {
      //console.log("ABRE MODAL PARA ELEGIR LA SERVICE LINE A CERRAR");
      const dialogRef = this._dialog.open(DialogInHoldComponent, {
        width: "50%"
      });

      dialogRef.afterClosed().subscribe(result => {
        //console.log("dialog in hold ", result)
        if (result.success) {

          if(Number(result.serviceLineID) == 3){
            this._services.service_general_put('ServiceRecord/OnHold/' + Number(this.SO_ID) + '/' + 1, '').subscribe((data => {
              if (data.success) {
                //console.log("CAMBIO DE STATUS A IN HOLD: ", data);
                this.ngOnInit();
              }
            }));
            this._services.service_general_put('ServiceRecord/OnHold/' + Number(this.SO_ID) + '/' + 2, '').subscribe((data => {
              if (data.success) {
                //console.log("CAMBIO DE STATUS A IN HOLD: ", data);
                this.ngOnInit();
              }
            }));
          }else{
            this._services.service_general_put('ServiceRecord/OnHold/' + Number(this.SO_ID) + '/' + Number(result.serviceLineID), '').subscribe((data => {
              if (data.success) {
                //console.log("CAMBIO DE STATUS A IN HOLD: ", data);
                this.ngOnInit();
              }
            }));
          }
        }
      })
    }
    if (immigration >= 1 && relocation == 0) {
      sl = 1;
      this._services.service_general_put('ServiceRecord/OnHold/' + Number(this.SO_ID) + '/' + Number(sl), '').subscribe((data => {
        if (data.success) {
          //console.log("CAMBIO DE STATUS A IN HOLD: ", data);
          this.ngOnInit();
        }
      }))
    }
    if (immigration == 0 && relocation >= 1) {
      sl = 2;
      this._services.service_general_put('ServiceRecord/OnHold/' + Number(this.SO_ID) + '/' + Number(sl), '').subscribe((data => {
        if (data.success) {
          //console.log("CAMBIO DE STATUS A IN HOLD: ", data);
          this.ngOnInit();
        }
      }))
    }
  }

  ngOnDestroy() {
    //console.log("Entra a eliminar serviceline");
    localStorage.removeItem('serviceLine');
  }

  deleteCoordinator(data, sl, k) {
    ////
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this coordinator?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      ////
      if (result) {
        if (sl == 1) {
          //console.log("IMMIGRATION");
          if (data.id == 0) {
            this.edit_sr_model.immigrationCoodinators.splice(k, 1);
          } else {
            this._services.service_general_delete("ServiceRecord/Coordinator/" + data.id + "/" + sl).subscribe((data => {
              if (data.success) {
                //this.updateServiceRecordData();
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "The coordinator was deleted"
                  },
                  width: "350px"
                });
                this.edit_sr_model.immigrationCoodinators.splice(k, 1);
                this.initPageSettings();
              }
            }))
          }
        }

        if (sl == 2) {
          //console.log("RELCATION");
          if (data.id == 0) {
            this.edit_sr_model.relocationCoordinators.splice(k, 1);
          } else {
            this._services.service_general_delete("ServiceRecord/Coordinator/" + data.id + "/" + sl).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "The coordinator was deleted"
                  },
                  width: "350px"
                });
                this.edit_sr_model.relocationCoordinators.splice(k, 1);
                this.initPageSettings();
              }
            }))
          }
        }
      }
    })
  }

  deleteSupplier(data, sl) {
    ////////
    if(data.total > 0){
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "The supplier cannot be deleted because it has assigned services"
        },
        width: "350px"
      });
    }
    else{
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Delete confirmation",
          body: "Are you sure to delete this Supplier Partner?"
        },
        width: "350px"
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log(result);
        if (result) {
          if (sl == 1) {
            //console.log("IMMIGRATION");
            this._services.service_general_delete("ServiceRecord/Supplier/" + data.id + "/" + sl).subscribe(data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "The Supplier Partner was deleted"
                  },
                  width: "350px"
                });
                this.ngOnInit();
                //this.getDataSuplier();
              }
            }, err => {
                // Entra aquí si el servicio entrega un código http de error EJ: 404,
                //500
                //console.log(err.error.message)
                if(err.error.message == "Operation was not successfully."){
                  const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                    data: {
                      header: "Warning",
                      body: "The supplier cannot be deleted because it has assigned services"
                    },
                    width: "350px"
                  });
                }
            });
          }

          if (sl == 2) {
            //console.log("RELCATION");
            this._services.service_general_delete("ServiceRecord/Supplier/" + data.id + "/" + sl).subscribe(data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "The Supplier Partner was deleted"
                  },
                  width: "350px"
                });
                this.ngOnInit();
                //this.getRelocationSuppliers();
              }
            }, err => {
              // Entra aquí si el servicio entrega un código http de error EJ: 404,
              //500
              //console.log(err.error.message)
              if(err.error.message == "Operation was not successfully."){
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Warning",
                    body: "The supplier cannot be deleted because it has assigned services"
                  },
                  width: "350px"
                });
              }
          });
          }
        }
      })
    }

  }


  assignTask(id){
    let value_service_line = this.service_line_asignada;
    const dialogRef = this._dialog.open(DialogAssignTaskEDRComponent, {
      data: { serviceRecordId: this.SO_ID, id: 0 , service_line: value_service_line, to:id},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_request();
    })
  }

  serviceAppointment: any[] =[]
  getserviciosAppoitment(element){
    this.serviceAppointment = element.servicio;
  }

  SR_WO :any;
  consulta(element){
    //console.log(element);
      let WO = [];
      this.SR_WO = [];
      this._services.service_general_get('ServiceRecord/GetServices/'+this.SO_ID+'?type=1').subscribe((response: any) => {
          response.map.value.home.forEach(E => {
              WO.push(E);
          });
          response.map.value.host.forEach(E => {
              WO.push(E);
          });
          this._services.service_general_get('ServiceRecord/GetServices/'+this.SO_ID+'?type=2').subscribe((response: any) => {
              response.map.value.home.forEach(E => {
                  WO.push(E);
              });
              response.map.value.host.forEach(E => {
                  WO.push(E);
              });



              for (let i = 0; i < element.servicio.length; i++) {
                 for (let j = 0; j < WO.length; j++) {
                   if(element.servicio[i].id ==  WO[j].id_server){
                      this.SR_WO.push(WO[j])
                   }
                 }
              }

              //console.log("ESTAS SON LAS WO", this.SR_WO);

          })
      })
  }


  validaNumericos(event){
    //console.log("valid");
    if(event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' ||
       event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
       event.key == 'Backspace' ){
       return true;
    }

     return false;
  }

  set_variables_start(){

  }

  downloadXls() {

    this._services.service_general_get('Appointment/GetAppointmentsExcel?id=' + this.SO_ID)
    .subscribe((data => {
      if (data.success) {
        const linkSource =
        'data:application/octet-stream;base64,' + data.message;
        const downloadLink = document.createElement('a');
        const fileName = 'appointment_list.xlsx';

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    }));
  }

  /////////////////////////////////// ajustes asignacion sept 2022  ///////////////////////////////////

  public viewassigned_services(data) {

    console.log("data servicios de relocation =====================================", data);
    this.assigned_services = data.unionAll;
    for (let i = 0; i < this.assigned_services.length; i++) {
      this.assigned_services[i].idsuplier = data.id;
    }
    this.cambio_asignacion_servicios(data, this.assigned_services);
  }

  cambio_asignacion_servicios(data, assigned_services) {

    const dialogRef = this._dialog.open(AsignarserviciosComponent, {
      data: {
        header: "Supplier: " +  data.supplier,
        body: "Assign the services and confirm.",
        rol: 1,//this.user.role.id,
        category: 18, //departurre
        type: "area_prientation",
        assigned_services: assigned_services,
        srid: this.SO_ID,
        idsupplier: data.id
      },
      width: "550px"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////
      this.__loader__.showLoader();
      this.relocation_suppliers = null;
      this.getRelocationSuppliers();
      document.getElementById('services_supplier_relocation').scrollIntoView();

      document.getElementById('services_supplier_relocation').scrollIntoView();
      if (result.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Assignments were edited successfully."
          },
          width: "350px"
        });
      }
      else {
      }
    });
  };

  public addordeleteservicesRelocation(event, id, id_siplier, service) {
    ////
    let datos = [{
      "relocationSupplierPartnerId": id_siplier,
      "serviceOrderServicesId": id,
      "service": service
    }]

    if (event.checked) {

      this._services.service_general_post_with_url("Relocation/AddAssignedRelocation", datos).subscribe((data => {
        if (data.success) {
          this.ngOnInit();
          document.getElementById('services_supplier_relocation').scrollIntoView();
        }
      }))
    } else {
      this._services.service_general_delete_with_url("Immigration/DeleteAssignedImmigration?id=" + id).subscribe((data => {
        this.ngOnInit();
        document.getElementById('services_supplier_relocation').scrollIntoView();
      }))
    }
  }

}

class Departament {
  relationship: string = '';
  name: string = '';
  final_date: string = '';
  age: string = '';
  language: string = '';
  nationality: string = '';
  aditionalComments: string = '';
}

class Pet {
  photo: string = '';
  pet_type: string = '';
  pet_name: string = '';
  breed: string = '';
  age: string = '';
  size: string = '';
  peso: string = '';
  //color:string = '';
}

class Coordinator {
  supplier_type: string = '';
  supplier_comp: string = '';
  supplier: string = '';
  date: string = '';
  services: string = '';
}

class FilterData {
  status: string = '';
  partner: string = '';
  client: string = '';
  country: string = '';
  city: string = '';
  vip: string = '';
  supplier: string = '';
}

class NewServiceRecordData {
  id: number = 0;
  office: string = '';
  initialAutho: string = '';
  numberServiceRecord: string = '';
  inithialAuthoAcceptance: string = '';
  partnerId: number = null;
  clientId: number = null;
  clientFileNumber: string = '';
  copyOnEmail: boolean = false;
  spoc: boolean = false;
  vip: boolean = false;
  confidentialMove: boolean = false;
  specialIntructions: string = '';
  assigneeInformationId: number = 0;
  assigneeInformations: AssigneeInformationModel[] = [new AssigneeInformationModel()];
  immigrationCoodinators: any = [new immigrationCoodinators()];
  immigrationSupplierPartners: any = [];
  relocationCoordinators: any = [new relocationCoordinators()];
  relocationSupplierPartners: any = [];
  serviceOrders: any = [];
  follows: any = [];
  aqui_campo: ImmigrationProfileModel[] = [];
  authorizedByImmigration: string = '';
  authorizedByRelocation: string = '';
  copyOnEmailImmigration: boolean = false;
  copyOnEmailRelocation: boolean = false;
  spocImmigration: boolean = false;
  spocRelocation: boolean = false;
  statusId: number = 0;
  status: any;
  urgent: boolean = false;
  updatedDate:any;
  updateBy:any;
  createdBy:any;
  createdDate:any;
  workOrders: any;
}

class AssigneeInformationModel {
  id: number = 0;
  assigneeName: string = '';
  assigneeNameId: number = 0;
  sexId: string = "1";
  birth: string = '';
  age: number = null;
  nationalityId: number = null;
  maritalStatusId: number = null;
  mobilePhone: string = '';
  workPhone: string = '';
  policyTypeId: number = null;
  assignmentDuration: string = '';
  assignmentDurationTime: string = '0';
  initialArrival: string = '';
  finalMove: string = '';
  homeCountryId: number = null;
  homeCityId: number = null;
  cityHomeName: string = '';
  currentPosition: string = '';
  hostCountry: number = null;
  hostCityId: number = null;
  newPosition: string = '';
  dependentInformation: boolean = null;
  pets: boolean = null;
  email: string = '';
  photo: string = '';
  photoExtension: string = 'jpg';
  dependentInformations: any = [];
  petsNavigation: any = [];
  languagesSpokens: any[] = [];
  nationalityAssigneeInformations: any[] = [];
}

class LanguagesSpokensModel {
  assignneInformation: number = 0;
  languages: string = '';
}

class NationalitiesModel {
  assigneeInformationId: number = 0;
  nationalityId: number = 0;
}

class DependentInformationsModel {
  id: number = 0;
  sex: any = undefined;
  relationshipId: string = '0';
  name: string = '';
  birth: string = '';
  age: string = '';
  nationalityId: string = '';
  aditionalComments: string = '';
  assigneeInformationId: number = 0;
  language: string = '';
  photo: string = '';
  PhotoExtension: string = '';
  email: string = '';
  phone: string = '';
  ifOther: string = '';
  currentGrade: string = '';
  languageDependentInformations: any[] = []
}

class LanguagesSpokensModelDependent {
  dependent: number = 0;
  language: number = 0;
}

class PetsNavigationModel {
  id: number = 0;
  petTypeId: string = '';
  birthDate: Date = null;
  name: string = '';
  breedId: string = '';
  age: string = '';
  sizeId: string = '';
  weight: string = '';
  weightMeasuresId: string = '';
  assigneeInformationId: number = 0;
  photo: string = '';
  PhotoExtension: string = '';
  color:string = '';
}

class immigrationCoodinators {
  id: number = 0;
  coordinatorTypeId: number = 0;
  coordinatorId: number = 0;
  assigned: string = '';
  accepted: string = '';
  serviceRecordId: number = 0;
  statusId: number = 2;
}

class immigrationSupplierPartners {
  id: number = 0;
  supplierTypeId: number = 0;
  supplierCompanyId: number = 0;
  assignedDate: string = '';
  assignedServicesId: number = 0;
  serviceRecordId: number = 0;
  supplierId: number = 0;
}

class relocationCoordinators {
  id: number = 0;
  coordinatorTypeId: number = 0;
  coordinatorId: number = 0;
  assigned: string = '';
  accepted: string = '';
  serviceRecordId: number = 0;
  statusId: number = 2;
}


class relocationSupplierPartners {
  id: number = 0;
  supplierTypeId: number = 0;
  supplierCompanyId: number = 0;
  assignedDate: string = '';
  assignedServicesId: number = 0;
  serviceRecordId: number = 0;
  supplierId: number = 0;
}


class EducationData {
  institution: string = '';
  field_study: string = '';
  start_date: string = '';
  end_date: string = '';
  degree: string = '';
  licenses: string = '';
  id: number = 0;
}

class LanguageData {
  language: string = '';
  proficiency: string = '';
  comments: string = '';
  id: number = 0;
}

class DependentData {
  relationship: string = '';
  name: string = '';
  passport_number: string = '';
  date_issue: string = '';
  date_expi: string = '';
  issue_autho: string = '';
  place_of_issue: string = '';
  host_arraive: string = '';
  points: string = '';
  id: number = 0;
}

class ImmigrationProfileModel {
  id: number = 0;
  serviceRecordId: number = 0;
  passportInformationId: number = 0;
  previousHostCountryId: number = 0;
  assigmentInformationId: number = 0;
  highestLevelEducationalId: number = 0;
  passportInformation: PassportInformation = new PassportInformation();
  previousHostCountry: PreviousHostCountry = new PreviousHostCountry();
  educationalBackgrounds: EducationalBackgrounds[] = [];
  lenguageProficiencies: LenguageProficiencies[] = [];
  assigmentInformation: AssigmentInformation = new AssigmentInformation();
  dependentImmigrationInfos: DependentImmigrationInfos[] = [];
}

class PassportInformation {
  id: number = 0;
  number: string = '';
  issue: string = '';
  expiration: string = '';
  issuingAuthority: string = '';
  placeIssue: string = '';
  currentAddress: string = '';
  specificAttentionPoints: string = '';
}

class PreviousHostCountry {
  priorHostCountryVisaIssued: boolean = false;
  id: number = 0;
  visaNumber: string = '';
  issue: string = '';
  expiration: string = '';
  issuingAuthority: string = '';
  placeIssue: string = '';
  visaCategoryId: string = '';
  idAssignedNumber: string = '';
  positionEmployer: string = '';
  positionResponsabilities: string = '';
}

class EducationalBackgrounds {
  id: number = 0;
  immigrationProfileId: number = 0;
  institution: string = '';
  fieldStudy: string = '';
  startDate: string = '';
  endDate: string = '';
  degree: string = '';
  listProfessionalLicenses: string = '';
}

class LenguageProficiencies {
  id: number = 0;
  languageId: string = '';
  proficiencyId: string = '';
  comments: string = '';
  immigrationProfileId: number = 0;
}

class AssigmentInformation {
  id: number = 0;
  legalNameHomeCountry: string = '';
  locationHome: string = '';
  currentJobPositionTitle: string = '';
  employmentFrom: string = '';
  employmentTo: string = '';
  legalNameHostCountry: string = '';
  locationHost: string = '';
  newJobPositionTitle: string = '';
  newJobResponsibilitie: string = '';
  estimatedStartDate: string = '';
  lenghtAssigment: string = '';
  currentGrossSalary: string = '';
  newGrossSalary: string = '';
  payrollLocation: string = '';
  splitPayrollApplicable: boolean = false;
  payrollLocationSecond: string = '';
  hiringManager: string = '';
  hiringManagerPhone: string = '';
  hiringManagerEmail: string = '';
  legalRepresentative: string = '';
  specificAtention: string = '';
  documentType: string = '';
  documentTypeExtension: string = '';
  licenseDriver: string = '';
  licenseDriverExtension: string = '';
  currencyCurrentGrossSalary: string = '';
  currencyNewGrossSalary: string = '';
}

class DependentImmigrationInfos {
  id: number = 0;
  relationshipId: string = '';
  name: string = '';
  passportNumber: string = '';
  issue: string = '';
  expiration: string = '';
  issuingAuthority: string = '';
  placeIssue: string = '';
  entryDateHostCountry: string = '';
  specificAttentionPoints: string = '';
  immigrationProfileId: number = 0;
  documentType: string = '';
  documentTypeExtension: string = '';
  licenceDriver: string = '';
  licenseDriverExtension: string = '';
  documentDependentImmigrationInfos: any = [];
}

class EmailSend {
  id: number = 0;
  serviceLineId: number = 0;
  serviceRecordId: number = 0;
  emailId: number = 0;
  date: Date = new Date();
  completed: boolean = false;
}

class FilterImmRelFields {
  status: string = '';
  deliverTo: string = '';
  serviceType: string = '';
  program: string = '';
}

class LibraryDocumentModel {
  id: number = 0;
  fileName: string = '';
  fileRequest: string = '';
  fileExtension: string = '';
  documentType: number = 0;
  relationship: number = 0;
  issueDate: string = '';
  expirationDate: string = '';
  issuingAuthority: string = '';
  countryOrigin: number = 0;
  comment: string = '';
  dependentInformation: number = 0;
  createdBy: number = 0;
  createdDate: string = '';
  updateBy: number = 0;
  updatedDate: string = '';
}

class LibraryFilter {
  rangeDate1: string = '';
  rangeDate2: string = '';
  status: string = '';
}


