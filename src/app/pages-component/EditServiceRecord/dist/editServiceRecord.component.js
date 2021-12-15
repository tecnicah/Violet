"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EditServiceRecordComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("../../../app/shared/loader");
var customPaginator_1 = require("../../../app/shared/customPaginator");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var request_information_component_1 = require("../dialog/edit-service-records/request-information.component");
var edit_services_component_1 = require("../dialog/edit-service-records/edit-services.component");
var escalate_component_1 = require("../dialog/edit-service-records/escalate.component");
var forms_1 = require("@angular/forms");
var entry_visa_component_1 = require("../dialog/entry-visa/entry-visa.component");
var dialog_add_appointment_component_1 = require("../dialog/dialog-add-appointment/dialog-add-appointment.component");
var dialog_work_permit_component_1 = require("../dialog/dialog-work-permit/dialog-work-permit.component");
var dialog_residency_permit_component_1 = require("../dialog/dialog-residency-permit/dialog-residency-permit.component");
var dialog_visa_deregistration_component_1 = require("../dialog/dialog-visa-deregistration/dialog-visa-deregistration.component");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var dialog_document_management_component_1 = require("../dialog/dialog-document-management/dialog-document-management.component");
var notification_component_1 = require("../dialog/notification/notification.component");
var renewal_component_1 = require("../dialog/renewal/renewal.component");
var addCall_component_1 = require("../dialog/dialog-add-call/addCall.component");
var assignTask_component_1 = require("../dialog/dialog-assign-task/assignTask.component");
var corporate_assistance_component_1 = require("../dialog/corporate-assistance/corporate-assistance.component");
var legal_review_consultation_component_1 = require("../dialog/legal-review-consultation/legal-review-consultation.component");
var dialog_local_documentation_component_1 = require("../dialog/dialog-local-documentation/dialog-local-documentation.component");
var sort_1 = require("@angular/material/sort");
var pre_decision_orientation_component_1 = require("../dialog/pre-decision-orientation/pre-decision-orientation.component");
var area_orientation_component_1 = require("../dialog/area-orientation/area-orientation.component");
var home_finding_component_1 = require("../dialog/home-finding/home-finding.component");
var settling_in_component_1 = require("../dialog/settling-in/settling-in.component");
var school_search_component_1 = require("../dialog/school-search/school-search.component");
var dialog_departure_component_1 = require("../dialog/dialog-departure/dialog-departure.component");
var MessageDto_1 = require("../../model/chat/MessageDto");
var editTask_component_1 = require("../dialog/dialog-edit-task/editTask.component");
var mapit_component_1 = require("../dialog/dialog-mapit/mapit.component");
var viewEscalation_component_1 = require("../dialog/dialog-view-escalation/viewEscalation.component");
var dialog_temporary_housing_component_1 = require("../dialog/dialog-temporary-housing/dialog-temporary-housing.component");
var dialog_airport_transportation_component_1 = require("../dialog/dialog-airport-transportation/dialog-airport-transportation.component");
var dialog_complete_component_1 = require("../dialog/dialog-complete/dialog-complete.component");
var dialog_rental_furniture_component_1 = require("../dialog/dialog-rental-furniture/dialog-rental-furniture.component");
var dialog_transportation_component_1 = require("../dialog/dialog-transportation/dialog-transportation.component");
var dialog_report_day_component_1 = require("../dialog/dialog-report-day/dialog-report-day.component");
var dialog_export_component_1 = require("../dialog/dialog-export/dialog-export.component");
var dialog_request_additional_time_component_1 = require("../dialog/dialog-request-additional-time/dialog-request-additional-time.component");
var dialog_slider_component_1 = require("../dialog/dialog-slider/dialog-slider.component");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts"); // fonts provided for pdfmake
var dialog_comment_history_component_1 = require("../dialog/dialog-comment-history/dialog-comment-history.component");
var sessionSettings_1 = require("app/shared/sessionSettings");
var dialog_documents_component_1 = require("../dialog/dialog-documents/dialog-documents.component");
var dialog_documents_view_component_1 = require("../dialog/dialog-documents-view/dialog-documents-view.component");
var dialog_library_documents_component_1 = require("../dialog/dialog-library-documents/dialog-library-documents.component");
var dialog_edit_call_component_1 = require("../dialog/dialog-edit-call/dialog-edit-call.component");
var dialog_request_payment_new_component_1 = require("../dialog/dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_housing_specifications_component_1 = require("../dialog/dialog-housing-specifications/dialog-housing-specifications.component");
var dialog_request_invoice_component_1 = require("../dialog/dialog-request-invoice/dialog-request-invoice.component");
var legal_renewal_component_1 = require("../dialog/legal-renewal/legal-renewal.component");
var home_sale_component_1 = require("./../dialog/home-sale/home-sale.component");
var home_purchase_component_1 = require("./../dialog/home-purchase/home-purchase.component");
var other_component_1 = require("./../dialog/other/other.component");
var property_management_component_1 = require("./../dialog/property-management/property-management.component");
var tenancy_management_component_1 = require("./../dialog/tenancy-management/tenancy-management.component");
var dialog_bundle_component_1 = require("../dialog/dialog-bundle/dialog-bundle.component");
var dialog_in_hold_component_1 = require("../dialog/dialog-in-hold/dialog-in-hold.component");
/*
    1. Globals
    2. Functions
    3. Utilities
*/
var EditServiceRecordComponent = /** @class */ (function () {
    function EditServiceRecordComponent(_router, _dialog, _routerParams, _services, formBuilder, _snackBar, exportAsService, _permissions) {
        this._router = _router;
        this._dialog = _dialog;
        this._routerParams = _routerParams;
        this._services = _services;
        this.formBuilder = formBuilder;
        this._snackBar = _snackBar;
        this.exportAsService = exportAsService;
        this._permissions = _permissions;
        this.image_path = this._services.url_images;
        this.__loader__ = new loader_1.LoaderComponent();
        this.session_aut = new sessionSettings_1.SessionSettings(this._router);
        this.SO_ID = 0;
        this.SRDATA = undefined;
        this.Host_Home_country = {};
        this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.displayedColumns = ['service_record', 'vip', 'status', 'autho_date', 'country', 'city', 'partner', 'client', 'assigne_name', 'services', 'coordinator', 'supplier'];
        this.immigration_services_table = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5', 'campo_6', 'campo_7', 'campo_8'];
        this.example_table_data = [
            { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
            { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' }
        ];
        this.immigration_supplier_partners_table = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5', 'campo_6'];
        this.example_table_data_supplier_partners = [
            { status: 1, id: 1, type: "lorem", company: "lorem", supplier: "lorem", accepted_date: "05/03/2019", assigned_date: "05/03/2019" },
            { status: 2, id: 2, type: "lorem", company: "lorem", supplier: "lorem", accepted_date: "05/03/2019", assigned_date: "05/03/2019" },
            { status: 3, id: 4, type: "lorem", company: "lorem", supplier: "lorem", accepted_date: "05/03/2019", assigned_date: "05/03/2019" },
        ];
        this.home_country_table_immi = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Delivered To', 'Autho Date', 'Projected Fee', 'action'];
        this.home_country_table_immi_ = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Delivered To', 'Autho Date', 'action'];
        //public home_country_table_immi: string[] = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Delivered To', 'Autho Date', 'Accepted Date', 'Projected Fee', 'action'];
        this.home_country_table_rel = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Autho Time', 'Time Remaining', 'Autho Date', 'Projected Fee', 'action'];
        this.home_country_table_rel_ = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Autho Time', 'Time Remaining', 'Autho Date', 'action'];
        //public home_country_table_rel: string[] = ['Status', 'Work Order', 'Service ID', 'Service', 'Location', 'Program', 'Autho Time', 'Time Remaining', 'Autho Date', 'Accepted Date', 'Projected Fee', 'action'];
        this.home_country_table = ['Status', 'Work Order', 'Category', 'Service ID', 'Service', 'Location', 'Program', 'Autho Time', 'Time Remaining', 'Autho Date', 'Accepted Date', 'Projected Fee', 'action'];
        this.host_country_table = ['Status', 'Service Order ID', 'Service', 'Service No.', 'Location', 'Service Charge', 'Delivered To', 'Autho Date', 'Accepted Date', 'fee', 'action'];
        this.appointment_table = ['Date', 'Supplier', 'Service', 'Start Time', 'Location', 'Documents', 'View'];
        this.edit_sr_model = new NewServiceRecordData();
        this.emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        this.addSuplier = false;
        this.TempDataSuplier = {};
        this.CaBreed = [];
        this.today_date = new Date();
        this.filteruno = false;
        this.filterdos = false;
        this.typeFilter = {
            supplierType: ''
        };
        this.typeSupplier = {
            supplier: ''
        };
        this.typeLine = {
            serviceLine: ''
        };
        this.typeProgram = {
            service: ''
        };
        this.toppings = new forms_1.FormControl();
        this.toppings_ = new forms_1.FormControl();
        this.fecha_minima = new Date();
        this.maskPhone = new forms_1.FormGroup({
            mobile: new forms_1.FormControl(''),
            work: new forms_1.FormControl('')
        });
        this.immigration_coordinator_table = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4'];
        //*******************************************************************************************************************************************************************//
        //SUPPLIER PARTNER//
        this.example = [
            { uno: 1, dos: 'Hydrogen', tres: 1.0079, cuatro: 'H', cinco: 'Ellen D', seis: '12 Sep 2020', siete: '40 Oct 2022', ocho: '$34,000', nueve: '5%', diez: '6%' },
        ];
        this.dataIS = {};
        this.displayedColumnsSI = ['Invoice No.', 'Premier Invoice Date', 'Service Line', 'Work Order', 'Due Date', 'Invoiced Fee', 'Status'];
        this.displayedColumnsSP = ['Invoice No.', 'Supplier Invoice Date', 'Service Line', 'Work Order', 'Consultant', 'Due Date', 'Invoiced Fee', 'Status'];
        this.displayedColumnsTHIRD = ['Sub Total', 'Management Fee', 'Wire Fee', 'Advance Fee', 'Total', 'Funding Request Date', 'Recurrent', 'Status', 'Country'];
        //dataSourceR: any;
        this.displayedColumnsReport = ['Date', 'Service Line', 'Work Order', 'Services', 'Report By', 'Time Used', 'Actions'];
        this.displayedColumnsRecord = ['Supplier Type', 'Supplier Company', 'Supplier', 'Assigned Date', 'Assigned Services', 'Status'];
        this.service = [];
        this.programR = [];
        this.SupplierType = [];
        this.HousingSpecification = {};
        this.caAmenity = [];
        this.caNumbers = [];
        this.caMetric = [];
        this.caSize = [];
        this.caCurrency = [];
        this.caPropertyTypeHousing = [];
        this.caContractType = [];
        this.exportAsConfig = {
            type: 'pdf',
            elementIdOrContent: 'exportReport',
            options: { // html-docx-js document options
            }
        };
        this.displayedColumnsS = ['Service', 'ServiceID', 'AcceptanceRejectedDate', 'Accepted'];
        this.ca_countryServiceRecord = [];
        //*******************************************************************************************************************************************************************//
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        this.maxall = 20;
        //*****************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        //*******************//
        /* 2. Functions */
        this.no_main_photo = false;
        this.current_email = '';
        this.hold_imm_coor_data = [new immigrationCoodinators()];
        this.hold_rel_coor_data = [new relocationCoordinators()];
        this.show_language_dropdown = false;
        this.user_languages = undefined;
        this.languages_selected = '';
        this.relocation_suppliers = [];
        this.relocation_supplier_data = {};
        this.relocation_home_services = [];
        this.relocation_host_services = [];
        this.parther_catalogue = [];
        this.client_catalogue = [];
        this.policytype_catalogue = [];
        this.country_catalogue = [];
        this.nationality_catalogue = [];
        this.autoriza_catalogue = [];
        this.marital_catalogue = [];
        this.assigment_catalogue = [];
        this.city_host_catalogue = [];
        this.city_home_catalogue = [];
        this.documenttype_catalogue = [];
        this.relationship_catalogue = [];
        this.languages_catalogue = [];
        this.pettype_catalogue = [];
        this.weightmeasure_catalogue = [];
        this.petsize_catalogue = [];
        this.coordinatortype_catalogue = [];
        this.coordinator_catalogue = [];
        this.visacategory_catalogue = [];
        this.proficiency_catalogue = [];
        this.hightschool_catalogue = [];
        this.assduration_catalogue = [];
        this.schoolgrades_catalogue = [];
        this.gender_catalogue = [];
        this.office_catalogues = [];
        this.sp_catalog = [];
        this.ca_serviceLine = [];
        this.ca_status = [];
        this.coordinator_catalogue_rel = [];
        this.assign_dependents = [];
        this.pets = [];
        this.coordinators = [];
        this.coordinator = new Coordinator();
        this.immgration_education = [];
        this.immgration_languages = [];
        this.immgration_dependent = [];
        this.follow_status_button = 'Follow';
        this.immgration_profile = new ImmigrationProfileModel();
        this.show_ass_depd_errors = false;
        this.show_pets_erros = false;
        this.show_immigration_errors = false;
        this.imm_global_form = {
            no_leve: false
        };
        this.show_imm_prof = false;
        this.form_imm_cord = {
            no_coor: false,
            no_ctyp: false,
            no_dat0: false,
            no_dat1: false
        };
        this.passport_form_val = {
            no_numb: false,
            no_dat0: false,
            no_dat1: false,
            no_auto: false,
            no_plac: false,
            no_addr: false
        };
        this.previoush_form_val = {
            no_visa: false,
            no_dat0: false,
            no_dat1: false,
            no_auto: false,
            no_city: false,
            no_vcat: false
        };
        this.assign_form_validator = {
            no_name: false,
            no_cjob: false,
            no_eda0: false,
            no_eda1: false,
            no_hmai: false,
            no_hmai_val: false
        };
        this.is_creating_immigration = null;
        this.passport_expiring = false;
        /*public getImmigrationCardsData(): void {
      
          const imm_language_card: any = document.getElementsByClassName('imm-language-card'),
            imm_school_card: any = document.getElementsByClassName('imm-school-card'),
            imm_dependent_card: any = document.getElementsByClassName('imm-dependent-card'),
            imm_id: number = this.immgration_profile.id;
      
          this.immgration_profile.lenguageProficiencies = [];
          this.immgration_profile.educationalBackgrounds = [];
          this.immgration_profile.dependentImmigrationInfos = [];
      
          for (let card = 0; card < imm_language_card.length; card += 1) {
      
            const get_card: any = imm_language_card[card],
              get_selects: any = get_card.querySelectorAll('select'),
              get_inpust: any = get_card.querySelectorAll('input'),
              new_language = new LenguageProficiencies();
      
            getValueFromSelects(new_language, get_selects, 'language');
            getValueFromInputs(new_language, get_inpust, 'language');
      
            this.immgration_profile.lenguageProficiencies.push(new_language);
      
          }
      
          for (let card = 0; card < imm_school_card.length; card += 1) {
      
            const get_card: any = imm_school_card[card],
              get_inputs: any = get_card.querySelectorAll('input'),
              new_school: any = new EducationalBackgrounds();
      
            getValueFromInputs(new_school, get_inputs, 'school');
      
            this.immgration_profile.educationalBackgrounds.push(new_school);
      
          }
      
          for (let card = 0; card < imm_dependent_card.length; card += 1) {
      
            const get_card: any = imm_dependent_card[card],
              get_selects: any = get_card.querySelectorAll('select'),
              get_inputs: any = get_card.querySelectorAll('input'),
              new_dependent: any = new DependentImmigrationInfos();
      
            getValueFromInputs(new_dependent, get_inputs, 'dependent');
            getValueFromSelects(new_dependent, get_selects, 'dependent');
      
            this.immgration_profile.dependentImmigrationInfos.push(new_dependent);
      
          }
      
          function getValueFromInputs(object, inputs, section): void {
      
            switch (section) {
      
              case 'language':
                object.comments = inputs[0].value;
                object.id = Number(inputs[1].value);
                object.immigrationProfileId = imm_id;
                break;
      
              case 'school':
                object.institution = inputs[0].value;
                object.fieldStudy = inputs[1].value;
                object.startDate = inputs[2].value;
                object.endDate = inputs[3].value;
                object.degree = inputs[4].value;
                object.listProfessionalLicenses = inputs[5].value;
                object.id = Number(inputs[6].value);
                object.immigrationProfileId = imm_id;
                break;
      
              case 'dependent':
                object.name = inputs[0].value;
                object.passportNumber = inputs[1].value;
                object.issue = inputs[2].value;
                object.expiration = inputs[3].value;
                object.issuingAuthority = inputs[4].value;
                object.placeIssue = inputs[5].value;
                object.entryDateHostCountry = inputs[6].value;
                object.specificAttentionPoints = inputs[7].value;
                object.id = Number(inputs[8].value);
                object.immigrationProfileId = imm_id;
                break;
      
            }
      
          }
      
          function getValueFromSelects(object, selects, section): void {
      
            switch (section) {
      
              case 'language':
                object.languageId = selects[0].value;
                object.proficiencyId = selects[1].value;
                break;
      
              case 'dependent':
                object.relationshipId = selects[0].value;
                break;
      
            }
      
          }
      
        }*/
        this.mf_validator = {
            no_name: false,
            no_fnum: false
        };
        this.fass_validator = {
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
        };
        /* 3. Utilities */
        this.show_pets_section = false;
        this.show_dependent_section = false;
        this.table_housing_cols = ['c_1', 'c_2', 'c_3', 'c_4', 'c_5', 'c_6', 'c_7', 'c_8', 'c_9'];
        this.table_housing_data = [{ one: 'one' }];
        this.show_second_prfield = false;
        this.library_ass_data = [];
        this.library_imre_data = [];
        this.library_ass_no_data = false;
        this.status_catalogue = [];
        this.library_filter = new LibraryFilter();
        //****************************************************************//
        this.line_status = [];
        this.line_category = [];
        this.line_service = [];
        this.line_deliver = [];
        this.fixed_params = '';
        this.dinamic_params_homm = new FilterImmRelFields();
        this.dinamic_params_host = new FilterImmRelFields();
        this.editing_info = false;
        this.show_relocation_form = false;
        this.show_file_section = false;
        this.chat_conversations = [];
        this.first_conversation = false;
        this.serviceline_conversation = 1;
        this.chat_model = new MessageDto_1.ChatConversation();
        this.new_chat = new MessageDto_1.newChat();
        this.calls_colums = ['cam_0', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_7'];
        this.calls_columsedit = ['cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9', 'cam_10'];
        this.calls_in_list_imm = null;
        this.calls_in_list_rel = null;
        this.calls_serviceline = 2;
        this.emails_table_cols = ['cam_0', 'cam_1', 'cam_2', 'cam_3'];
        this.emails_imm_list = [];
        this.emails_rel_list = [];
        this.sent_this_email = new EmailSend();
        this.task_table_cols = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9'];
        this.task_rel_table = [];
        this.task_imm_table = [];
        this.cofb_table_paginator = new customPaginator_1.CustomPaginator(this._services);
        this.feedback_items = [];
        this.mapit_sl_id = 2;
        this.mapit_data_gotted = [];
        this.mapit_table_data = undefined;
        this.esca_table_cols = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9'];
        this.escalation_data = [];
        this.escalation_table_data = undefined;
        this.escalation_line = 2;
        /* Reports Section: Functions and variables */
        this.reports_table = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5'];
        this.hs_reports_table = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9'];
        this.supp_part_table = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.comhis_part_table = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        /* New Challenger has enter the ring * */
        this.files = [];
        this.chat_document = new MessageDto_1.ChatDocument();
        this.new_coordinator = [];
        this.email_relocation = [];
        this.email_immigration = [];
    }
    EditServiceRecordComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("userData ", this.__userlog__);
        var user_rol = [this.__userlog__.role.id];
        this._permissions.loadPermissions(user_rol);
        this.consultaPermisos();
        this.session_aut.canContinueInMySession();
        this.SupplierForm = this.formBuilder.group({
            Supplier_Type: [null, [forms_1.Validators.required]],
            //Supplier_Company: [null, Validators.required],
            Supplier: [null, forms_1.Validators.required],
            Assigned_Date: [null, forms_1.Validators.required]
        });
        this.relocation_supplier_form = this.formBuilder.group({
            Supplier_Type: [null, [forms_1.Validators.required]],
            //Supplier_Company: [null, Validators.required],
            Supplier: [null, forms_1.Validators.required],
            Assigned_Date: [null, forms_1.Validators.required]
        });
        if (this.isUserActive()) {
            this.movePageTo();
            this.getCatalogues();
            this.getSuplier();
            this.initPageSettings();
            this.getDataSuplier();
            this.getAppointment();
            this.getRelocationSuppliers();
            this.getRelocationServices();
            this.dataSource = new table_1.MatTableDataSource(this.example_table_data);
            this.dataSource.paginator = this.paginator;
            this.datasupplier_partners = new table_1.MatTableDataSource(this.example_table_data_supplier_partners);
            this.datasupplier_partners.paginator = this.paginator;
            this.coordinators.push(this.coordinator);
            this.immgration_education.push(new EducationalBackgrounds());
            this.immgration_languages.push(new LenguageProficiencies());
            this.immgration_dependent.push(new DependentImmigrationInfos());
            this._services.retrieveMappedObject().subscribe(function (receivedObj) { _this.initChatBehavior(); });
        }
        else {
            this._router.navigateByUrl('');
        }
        this.get_catalogos();
    };
    EditServiceRecordComponent.prototype.getCountryServiceRecord = function () {
        var _this = this;
        this._services.service_general_get("ServiceRecord/Countries/" + this.edit_sr_model.id).subscribe((function (data) {
            if (data.success) {
                _this.ca_countryServiceRecord = data.result.value;
                console.log('this.countryServiceRecord', _this.ca_countryServiceRecord);
            }
        }));
    };
    // metodo que trae las opciones del paginador appoint
    EditServiceRecordComponent.prototype.getPageSizeOptionsAppoin = function () {
        if (this.appointment.paginator.length > this.maxall) {
            return [10, 20, this.appointment.paginator.length];
        }
        else {
            return [10, 20];
        }
    };
    // metodo que trae las opciones del paginador suplier partener
    EditServiceRecordComponent.prototype.getPageSizeOptionsSupplierPartner = function () {
        if (this.dataSourceR.paginator.length > this.maxall) {
            return [10, 20, this.dataSourceR.paginator.length];
        }
        else {
            return [10, 20];
        }
    };
    // metodo que trae las opciones del paginador  Comments History
    EditServiceRecordComponent.prototype.getPageSizeOptionsCommentHistory = function () {
        if (this.dataSource.paginator.length > this.maxall) {
            return [10, 20, this.dataSource.paginator.length];
        }
        else {
            return [10, 20];
        }
    };
    EditServiceRecordComponent.prototype.consultaPermisos = function () {
        var _this = this;
        console.log("CONSULTA PARA PERMISOS DE USUARIO");
        var url = localStorage.getItem('url_permisos');
        this._services.service_general_get('Role/' + url).subscribe(function (data) {
            if (data.success) {
                console.log("Permisos: ", data.result.value);
                _this.permission_read = data.result.value[0].reading;
                _this.permission_write = data.result.value[0].writing;
                _this.permission_edit = data.result.value[0].editing;
                _this.permission_delete = data.result.value[0].deleting;
            }
        });
    };
    EditServiceRecordComponent.prototype.getInfoSupplierPartner = function () {
        var _this = this;
        var info_supplier = [];
        this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnersBySR/' + this.SO_ID).subscribe((function (data) {
            if (data.success) {
                info_supplier = data.result.value;
                for (var i = 0; i < info_supplier.length; i++) {
                    for (var j = 0; j < _this.edit_sr_model.immigrationSupplierPartners.length; j++) {
                        if (info_supplier[i].id == _this.edit_sr_model.immigrationSupplierPartners[j].supplierId) {
                            _this.photo_supplier = info_supplier[i].photo;
                            _this.phone_number = info_supplier[i].phone;
                        }
                    }
                }
            }
        }));
    };
    //COMMENTS HISTORY//
    EditServiceRecordComponent.prototype.getCommentsHistory = function () {
        var _this = this;
        this._services.service_general_post_with_url("ServiceOrder/GetCommentsHostory/" + this.SO_ID, '').subscribe((function (data) {
            console.log("commentarios historicos: ", data);
            var datos = data.result.value;
            var name;
            var reply;
            console.log(datos);
            datos.forEach(function (E) {
                if (E.nameAndReply.length > 0) {
                    E.name = E.nameAndReply[0].name;
                    E.reply = E.nameAndReply[0].reply;
                }
            });
            _this.dataSource = new table_1.MatTableDataSource(datos);
            _this.dataSource.paginator = _this.CommentHistory;
            _this.dataSource.sort = _this.sortable;
        }));
    };
    EditServiceRecordComponent.prototype.viewHistory = function (data) {
        var dialogRef = this._dialog.open(dialog_comment_history_component_1.DialogCommentHistoryComponent, {
            data: data,
            width: "90%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    EditServiceRecordComponent.prototype.initPageSettings = function () {
        var _this = this;
        this.SO_ID = this._routerParams.snapshot.params.id;
        this.__loader__.showLoader();
        this._services.service_general_get("ServiceRecord/GetServiceRecordById?id=" + this.SO_ID + "&user=" + this.USERDATA.id)
            .subscribe(function (response) {
            if (response.success) {
                _this.SRDATA = response.result;
                if (_this.SRDATA.immigrationCoodinators.length > 0) {
                    if (_this.SRDATA.immigrationCoodinators[0].accepted == "1900-01-01T00:00:00") {
                        _this.SRDATA.immigrationCoodinators[0].accepted = null;
                    }
                }
                if (_this.SRDATA.relocationCoordinators.length > 0) {
                    if (_this.SRDATA.relocationCoordinators[0].accepted == "1900-01-01T00:00:00") {
                        _this.SRDATA.relocationCoordinators[0].accepted = null;
                    }
                }
                _this.edit_sr_model = _this.SRDATA;
                _this.getClient();
                _this.athorizedBy();
                _this.getCoordinatorImmigration();
                _this.getCoordinatorRelocation();
                for (var i = 0; i < _this.edit_sr_model.assigneeInformations[0].petsNavigation.length; i++) {
                    _this.GetBreed(_this.edit_sr_model.assigneeInformations[0].petsNavigation[i].petTypeId, i);
                }
                //this.GetBreed();
                _this.edit_sr_model.assigneeInformations[0].sexId =
                    _this.edit_sr_model.assigneeInformations[0].sexId.toString();
                _this.current_email = _this.edit_sr_model.assigneeInformations[0].email;
                var photo_assing = _this.edit_sr_model.assigneeInformations[0].photo;
                if (photo_assing == undefined || photo_assing == null || photo_assing == '') {
                    _this.no_main_photo = true;
                }
                else {
                    if (_this.edit_sr_model.assigneeInformations[0].photo.indexOf(_this.image_path) <= -1) {
                        _this.edit_sr_model.assigneeInformations[0].photo = _this.edit_sr_model.assigneeInformations[0].photo;
                    }
                }
                if (_this.edit_sr_model.immigrationCoodinators.length != 0) {
                    _this.hold_imm_coor_data = _this.edit_sr_model.immigrationCoodinators;
                }
                if (_this.edit_sr_model.relocationCoordinators.length != 0) {
                    _this.hold_rel_coor_data = _this.edit_sr_model.relocationCoordinators;
                }
                _this.setDependentsConfiguration();
                _this.setPetsConfiguration();
                _this.isFollowing(_this.edit_sr_model.follows);
                _this.getImmigrationDataStatus(_this.edit_sr_model.id);
                _this.__loader__.hideLoader();
                _this.initLanguageSelector();
                _this.show_ass_depd_errors = false;
                _this.show_pets_erros = false;
                console.log('[CP353] Data edit_sr_model  => ', _this.edit_sr_model);
                localStorage.setItem('partnerID', JSON.stringify(_this.edit_sr_model.partnerId));
                _this.getCountryServiceRecord();
            }
            else {
                _this._router.navigateByUrl('serviceRecord');
            }
        }, function (error) {
            console.error('Error (GetServiceRecordById) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    EditServiceRecordComponent.prototype.partnerChange = function () {
        debugger;
        localStorage.setItem('partnerID', JSON.stringify(this.edit_sr_model.partnerId));
    };
    EditServiceRecordComponent.prototype.goBack = function () {
        window.history.back();
    };
    EditServiceRecordComponent.prototype.showLanguagesDropdow = function () {
        !this.show_language_dropdown ?
            this.show_language_dropdown = true :
            this.show_language_dropdown = false;
    };
    EditServiceRecordComponent.prototype.initLanguageSelector = function () {
        var languages_selected = this.edit_sr_model.assigneeInformations[0].languagesSpokens;
        var languages_pre_selected = [];
        languages_selected.forEach(function (language) {
            languages_pre_selected.push(language.languages);
        });
        this.edit_sr_model.assigneeInformations[0].languagesSpokens = [];
        this.edit_sr_model.assigneeInformations[0].languagesSpokens = languages_pre_selected;
        /*
    
        this.user_languages = this.languages_catalogue;
    
        this.user_languages.forEach( (language:any) => {
    
          language.active = false;
    
        });
    
        const hold_language_name:string[] = [];
    
        let label_length:number = 22;
    
        this.user_languages.forEach( (language:any, index:number) => {
    
          for( let language_sel:number = 0; language_sel < languages_selected.length; language_sel += 1 ) {
    
            if( languages_selected[language_sel].languages == language.id ) {
    
              language.active = true;
    
              hold_language_name.push( language.name );
    
            }
    
          }
    
        });
    
        this.languages_selected = hold_language_name.join(', ');
    
        this.languages_selected.length > label_length ?
            this.languages_selected = `${ this.languages_selected.substring(0, label_length) }...` :
            this.languages_selected = `${ this.languages_selected }.`;
    
        if( this.languages_selected.length == 1 ) this.languages_selected = '';*/
    };
    EditServiceRecordComponent.prototype.selectingLanguages = function (language_in) {
        if (language_in.active)
            language_in.active = false;
        else
            language_in.active = true;
        var languages_in = [], label_length = 22;
        this.user_languages.forEach(function (language) {
            if (language.active) {
                languages_in.push(language.name);
            }
        });
        this.languages_selected = languages_in.join(', ');
        this.languages_selected.length > label_length ?
            this.languages_selected = this.languages_selected.substring(0, label_length) + "..." :
            this.languages_selected = this.languages_selected + ".";
        if (this.languages_selected.length == 1)
            this.languages_selected = '';
    };
    EditServiceRecordComponent.prototype.setDependentsConfiguration = function () {
        var _this = this;
        var dependents_in = this.edit_sr_model.assigneeInformations[0].dependentInformations;
        if (dependents_in.length == 0) {
        }
        else {
            this.toggleDependentsSection();
            this.assign_dependents = dependents_in;
            this.assign_dependents.forEach(function (dependent) {
                if (dependent.photo.indexOf(_this.image_path) <= -1) {
                    dependent.photo = _this.image_path + dependent.photo;
                }
                if (dependent.languageDependentInformations.length != 0) {
                    var hold_lan_id_1 = [];
                    dependent.languageDependentInformations.forEach(function (language) {
                        hold_lan_id_1.push(language.language);
                    });
                    dependent.languageDependentInformations = [];
                    dependent.languageDependentInformations = hold_lan_id_1;
                }
            });
        }
    };
    EditServiceRecordComponent.prototype.setPetsConfiguration = function () {
        var _this = this;
        var pets_in = this.edit_sr_model.assigneeInformations[0].petsNavigation;
        if (pets_in.length == 0) {
        }
        else {
            this.togglePetsSection();
            this.pets = pets_in;
            this.pets.forEach(function (pet) {
                if (pet.photo != undefined || pet.photo != null) {
                    if (pet.photo.indexOf(_this.image_path) <= -1) {
                        pet.photo = _this.image_path + pet.photo;
                    }
                }
            });
        }
    };
    EditServiceRecordComponent.prototype.isUserActive = function () {
        var result = false;
        var user_in = localStorage.getItem('userData');
        if (user_in != undefined) {
            this.USERDATA = JSON.parse(user_in);
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
    EditServiceRecordComponent.prototype.getDataSuplier = function () {
        var _this = this;
        console.log("Entra a da supplier partner");
        this._services.service_general_get('Immigration/GetSupplierPartnerImmigration?serviceRecord=' + this.SO_ID)
            .subscribe(function (response) {
            console.log("respuesta del suuplier get: ", response);
            if (response.success) {
                _this.suplierData = response.result.value;
                console.log("Supplier DATA: ", _this.suplierData);
            }
        }, function (err) {
            console.log("Error a consultar los supplier asignados a la SR: ", err);
        });
    };
    EditServiceRecordComponent.prototype.getRelocationSuppliers = function () {
        var _this = this;
        console.log("Entra a consultar los supplier partners");
        this._services.service_general_get("Relocation/GetSupplierPartnerRelocation?serviceRecord=" + this.SO_ID)
            .subscribe(function (response) {
            console.log(response);
            if (response.success) {
                _this.relocation_suppliers = response.result.value;
                console.log(_this.relocation_suppliers);
            }
        });
    };
    EditServiceRecordComponent.prototype.getAppointment = function () {
        var _this = this;
        this._services.service_general_get('Appointment/GetAppointmentByServiceRecordId?id=' + this.SO_ID)
            .subscribe(function (response) {
            if (response.success) {
                console.log("APPOINT: ", response);
                _this.appointment = new table_1.MatTableDataSource(response.result.value);
                _this.appointment.paginator = _this.Appointment;
                _this.appointment.sort = _this.sort;
            }
        });
    };
    EditServiceRecordComponent.prototype.viewassigned_services = function (data) {
        this.assigned_services = data.unionAll;
        for (var i = 0; i < this.assigned_services.length; i++) {
            this.assigned_services[i].idsuplier = data.id;
        }
    };
    EditServiceRecordComponent.prototype.view_upplier_detail = function (data) {
        console.log(data);
        this.supplier_detail = data;
    };
    EditServiceRecordComponent.prototype.goToProfile = function (id) {
        this._router.navigateByUrl('supplierConsultant/' + id);
    };
    EditServiceRecordComponent.prototype.getSuplier = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetSupplier").subscribe((function (data) {
            if (data.success) {
                _this.dataCSuplier = data.result;
            }
        }));
        this._services.service_general_get("Catalogue/GetSupplierTypeCatalogue?id=2&id=5").subscribe((function (data) {
            if (data.success) {
                _this.dataCSuplier_type = data.result;
            }
        }));
    };
    EditServiceRecordComponent.prototype.getCompany = function (id, type) {
        var _this = this;
        /*
        this._services.service_general_get("Catalogue/GetSupplierCompany?id=" + id).subscribe((data => {
          if (data.success) {
            this.dataCSuplier_company = data.result;
          }
        }))
        */
        var country = 0;
        var city = 0;
        if (id == 1) {
            country = this.edit_sr_model.assigneeInformations[0].homeCountryId;
            city = this.edit_sr_model.assigneeInformations[0].homeCityId;
        }
        else {
            country = this.edit_sr_model.assigneeInformations[0].hostCountry;
            city = this.edit_sr_model.assigneeInformations[0].hostCityId;
        }
        var extra_data = "?country=" + country + "&city=" + city + "&serviceLine=" + type;
        console.log('parametros supplier company ESR: ', extra_data);
        this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerConsultant' + extra_data).subscribe((function (data) {
            if (data.success) {
                console.log('DATA CONSULTA: ', data);
                _this.dataCSuplier_company = data.result.value;
                console.log('DATA CONSULTA SUPPLIER COMPANY: ', _this.dataCSuplier_company);
            }
        }));
    };
    EditServiceRecordComponent.prototype.__supplier__ = function (country, city, serviceLine) {
        return __awaiter(this, void 0, Promise, function () {
            var extra_data;
            var _this = this;
            return __generator(this, function (_a) {
                extra_data = "?country=" + country + "&city=" + city + "&serviceLine=" + serviceLine;
                console.log('parametros supplier: ', extra_data);
                this._services.service_general_get('SupplierPartnerProfile/GetConsultantContactsConsultants' + extra_data).subscribe((function (data) {
                    if (data.success) {
                        console.log('DATA CONSULTA: ', data);
                        _this.dataCSuplier = data.result.value;
                        console.log('DATA CONSULTA SUPPLIER: ', _this.dataCSuplier);
                    }
                }));
                return [2 /*return*/];
            });
        });
    };
    EditServiceRecordComponent.prototype.saveSuplier = function () {
        var _this = this;
        this.TempDataSuplier.supplierCompanyId = this.dataCSuplier[0].companyId;
        //this.SupplierForm.get('Supplier_Company').setValue = this.dataCSuplier[0].companyId;
        if (!this.SupplierForm.valid) {
            return;
        }
        this.TempDataSuplier.id = 0;
        this.TempDataSuplier.updateBy = this.USERDATA.id;
        this.TempDataSuplier.serviceRecordId = this.edit_sr_model.id;
        this.TempDataSuplier.createdBy = this.USERDATA.id;
        this.TempDataSuplier.createdDate = new Date();
        this.TempDataSuplier.updatedDate = new Date();
        //debugger
        this._services.service_general_post_with_url("Immigration/CreateSupplierPartnerImmigration", this.TempDataSuplier).subscribe(function (data) {
            if (data.success) {
                console.log(data);
                _this.TempDataSuplier = {};
                _this.addSuplier = false;
                _this.getDataSuplier();
            }
        });
    };
    EditServiceRecordComponent.prototype.getNameCountry = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    EditServiceRecordComponent.prototype.postRelocationSupplier = function () {
        var _this = this;
        console.log("post relocation supplier");
        //this.relocation_supplier_form.get('Supplier_Company').setValue = this.dataCSuplier[0].companyId;
        this.relocation_supplier_data.supplierCompanyId = this.dataCSuplier[0].companyId;
        if (!this.relocation_supplier_form.valid) {
            return;
        }
        this.relocation_supplier_data.id = 0;
        this.relocation_supplier_data.updateBy = 0;
        this.relocation_supplier_data.serviceRecordId = this.edit_sr_model.id;
        this._services.service_general_post_with_url("Relocation/CreateSupplierPartner", this.relocation_supplier_data)
            .subscribe(function (response) {
            if (response.success) {
                _this.relocation_supplier_data = {};
                _this.showRelocationSupForm();
                _this.getRelocationSuppliers();
            }
        });
    };
    EditServiceRecordComponent.prototype.getRelocationServices = function () {
        var _this = this;
        this._services.service_general_get("ServiceRecord/GetServices/" + this.SO_ID + "?type=2")
            .subscribe(function (response) {
            if (response.success) {
                _this.relocation_home_services = response.map.value.home;
                _this.relocation_host_services = response.map.value.host;
            }
        }, function (error) {
            console.error('[CP455] ServiceRecord/GetServices ==> ', error);
        });
    };
    EditServiceRecordComponent.prototype.showaddSuplier = function () {
        this.addSuplier = true;
    };
    EditServiceRecordComponent.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, host_country, home_country, _y, _z, i, element, i, element, i, element;
            var _this = this;
            return __generator(this, function (_0) {
                switch (_0.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusInvoice')];
                    case 1:
                        _a.ca_status = _0.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 2:
                        _b.ca_serviceLine = _0.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierPartnerType')];
                    case 3:
                        _c.sp_catalog = _0.sent();
                        //this.client_catalogue = await this._services.getCatalogueFrom('GetClient');
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPartner')];
                    case 4:
                        //this.client_catalogue = await this._services.getCatalogueFrom('GetClient');
                        _d.parther_catalogue = _0.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPolicyType')];
                    case 5:
                        _e.policytype_catalogue = _0.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 6:
                        _f.country_catalogue = _0.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('Nationalities')];
                    case 7:
                        _g.nationality_catalogue = _0.sent();
                        //this.autoriza_catalogue = await this._services.getCatalogueFrom('GetAuthorizedBy');
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetMaritalStatus')];
                    case 8:
                        //this.autoriza_catalogue = await this._services.getCatalogueFrom('GetAuthorizedBy');
                        _h.marital_catalogue = _0.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetAssignedService')];
                    case 9:
                        _j.assigment_catalogue = _0.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 10:
                        _k.relationship_catalogue = _0.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPetType')];
                    case 11:
                        _l.pettype_catalogue = _0.sent();
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 12:
                        _m.languages_catalogue = _0.sent();
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetWeightMeasure')];
                    case 13:
                        _o.weightmeasure_catalogue = _0.sent();
                        _p = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSize')];
                    case 14:
                        _p.petsize_catalogue = _0.sent();
                        //this.coordinator_catalogue = await this._services.getCatalogueFrom('GetCoordinator');
                        _q = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCoordinatorType')];
                    case 15:
                        //this.coordinator_catalogue = await this._services.getCatalogueFrom('GetCoordinator');
                        _q.coordinatortype_catalogue = _0.sent();
                        _r = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetVisaCategory')];
                    case 16:
                        _r.visacategory_catalogue = _0.sent();
                        _s = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetProficiency')];
                    case 17:
                        _s.proficiency_catalogue = _0.sent();
                        _t = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetHighestLevelEducation')];
                    case 18:
                        _t.hightschool_catalogue = _0.sent();
                        _u = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDurationForServiceRecord')];
                    case 19:
                        _u.assduration_catalogue = _0.sent();
                        _v = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetGradeSchooling')];
                    case 20:
                        _v.schoolgrades_catalogue = _0.sent();
                        _w = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSex')];
                    case 21:
                        _w.gender_catalogue = _0.sent();
                        _x = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetOffice')];
                    case 22:
                        _x.office_catalogues = _0.sent();
                        host_country = this.edit_sr_model.assigneeInformations[0].hostCountry, home_country = this.edit_sr_model.assigneeInformations[0].homeCountryId;
                        this.Host_Home_country = {
                            host_country: this.edit_sr_model.assigneeInformations[0].hostCountry,
                            home_country: this.edit_sr_model.assigneeInformations[0].homeCountryId
                        };
                        _y = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetState', "?country=" + host_country)];
                    case 23:
                        _y.city_host_catalogue = _0.sent();
                        _z = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetState', "?country=" + home_country)];
                    case 24:
                        _z.city_home_catalogue = _0.sent();
                        /*await this.country_catalogue.forEach(element => {
                            if(element.id == this.Host_Home_country.host_country){
                                this.Host_Home_country.host_country_name = element.name;
                            }
                    
                            if(element.id == this.Host_Home_country.home_country){
                                this.Host_Home_country.home_country_name = element.name;
                            }
                        });*/
                        for (i = 0; i < this.country_catalogue.length; i++) {
                            element = this.country_catalogue[i];
                            if (element.id == this.Host_Home_country.host_country) {
                                this.Host_Home_country.host_country_name = element.name;
                            }
                            if (element.id == this.Host_Home_country.home_country) {
                                this.Host_Home_country.home_country_name = element.name;
                            }
                        }
                        this.city_host_catalogue.forEach(function (city) {
                            if (city.id == _this.edit_sr_model.assigneeInformations[0].hostCityId) {
                                _this.Host_Home_country.host_city_name = city.state;
                            }
                        });
                        this.Host_Home_country.homeCity_Id = this.edit_sr_model.assigneeInformations[0].homeCityId;
                        this.Host_Home_country.hostCity_Id = this.edit_sr_model.assigneeInformations[0].hostCityId;
                        for (i = 0; i < this.city_host_catalogue.length; i++) {
                            element = this.city_host_catalogue[i];
                            if (element.id == this.Host_Home_country.hostCity_Id) {
                                this.Host_Home_country.hostCity_name = element.city;
                            }
                        }
                        for (i = 0; i < this.city_home_catalogue.length; i++) {
                            element = this.city_home_catalogue[i];
                            if (element.id == this.Host_Home_country.homeCity_Id) {
                                this.Host_Home_country.homeCity_name = element.city;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditServiceRecordComponent.prototype.athorizedBy = function () {
        var _this = this;
        console.log("Para consultar este catlogo necesitamos el clientID, HOMECUNTRYID,HOMECITYID");
        this._services.service_general_get("Catalogue/GetAuthorizedBy/" + this.edit_sr_model.clientId + "/" + this.edit_sr_model.assigneeInformations[0].homeCountryId + "/" + this.edit_sr_model.assigneeInformations[0].homeCityId).subscribe((function (data) {
            if (data.success) {
                console.log("select authorized by: ", data.result.value);
                _this.autoriza_catalogue = data.result.value;
            }
        }));
    };
    EditServiceRecordComponent.prototype.getClient = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetClient/" + this.edit_sr_model.partnerId).subscribe((function (data) {
            if (data.success) {
                console.log("select cliente: ", data.result.value);
                _this.client_catalogue = data.result.value;
            }
        }));
    };
    EditServiceRecordComponent.prototype.getCoordinatorImmigration = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.edit_sr_model.partnerId + "?servileLine=" + 1).subscribe((function (data) {
            if (data.success) {
                console.log("select coordinator new SR Immigration: ", data.result);
                _this.coordinator_catalogue = data.result.value;
            }
        }));
    };
    EditServiceRecordComponent.prototype.getCoordinatorRelocation = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.edit_sr_model.partnerId + "?servileLine=" + 2).subscribe((function (data) {
            if (data.success) {
                console.log("select coordinator new SR relocation: ", data.result);
                _this.coordinator_catalogue_rel = data.result.value;
            }
        }));
    };
    EditServiceRecordComponent.prototype.getNameCoordinatorRelocation = function (id) {
        for (var i = 0; i < this.coordinator_catalogue_rel.length; i++) {
            if (this.coordinator_catalogue_rel[i].id == id) {
                return this.coordinator_catalogue_rel[i].coordinator;
            }
        }
        return '';
    };
    EditServiceRecordComponent.prototype.getcityhome = function (id) {
        var _this = this;
        console.log(id);
        this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.city_home_catalogue = data.result;
            }
        }));
    };
    EditServiceRecordComponent.prototype.getcityhost = function (id) {
        var _this = this;
        console.log(id);
        this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.city_host_catalogue = data.result;
            }
        }));
    };
    EditServiceRecordComponent.prototype.showDialogEditServices = function () {
        var _this = this;
        var currents_so = this.edit_sr_model.serviceOrders;
        console.log('============================> ', this.edit_sr_model);
        var dialogRef = this._dialog.open(edit_services_component_1.DialogEditServices, {
            data: {
                so: currents_so,
                id: this.edit_sr_model.id,
                user_id: this.USERDATA.id,
                partner: this.edit_sr_model.partnerId
            }, width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var a = document.getElementById("active-tab");
            a.click();
            _this.ngOnInit();
            /*this._services.service_general_get("ServiceRecord/GetServices/" + this.SO_ID + "?type=" + 1).subscribe((data => {
      
              if (data.success) {
                let home = [];
                let host = [];
      
                data.map.value.forEach(element => {
                  for (let index = 0; index < element.home.length; index++) {
                    const data = element.home[index];
                    data.status = element.status;
                    data.authodate = element.authodate;
                    data.serviceOrderId = element.serviceOrderId;
                    home.push(data);
                  }
      
                  for (let index = 0; index < element.host.length; index++) {
                    const data = element.host[index];
                    data.status = element.status;
                    data.authodate = element.authodate;
                    data.serviceOrderId = element.serviceOrderId;
                    host.push(data);
                  }
                });
      
                this.home_contry = new MatTableDataSource(home);
                this.home_contry.paginator = this.paginator;
      
                this.host_contry = new MatTableDataSource(host);
                this.host_contry.paginator = this.paginator;
      
              }
            }))*/
        });
    };
    EditServiceRecordComponent.prototype.showDialogentryVisa = function (data, home_host) {
        var _this = this;
        data.partnerId = this.edit_sr_model.partnerId;
        data.numberServiceRecord = this.edit_sr_model.numberServiceRecord;
        data.sr = this.SO_ID;
        if (home_host == 2) {
            data.country_city = {
                home_contry_name: this.Host_Home_country.host_country_name,
                country_id: this.Host_Home_country.host_country,
                home_city_name: this.Host_Home_country.hostCity_name,
                city_id: this.Host_Home_country.hostCity_Id
            };
        }
        else {
            data.country_city = {
                home_contry_name: this.Host_Home_country.home_country_name,
                country_id: this.Host_Home_country.home_country,
                home_city_name: this.Host_Home_country.homeCity_name,
                city_id: this.Host_Home_country.homeCity_Id
            };
        }
        data.home_host = home_host;
        var dialog;
        switch (data.dialog_type) {
            case 1:
                dialog = entry_visa_component_1.EntryVisaComponent;
                break;
            case 2:
                dialog = dialog_work_permit_component_1.DialogWorkPermitComponent;
                break;
            case 3:
                dialog = dialog_visa_deregistration_component_1.DialogVisaDeregistrationComponent;
                break;
            case 4:
                dialog = dialog_residency_permit_component_1.DialogResidencyPermitComponent;
                break;
            case 5:
                dialog = dialog_document_management_component_1.DialogDocumentManagementComponent;
                break;
            case 6:
                dialog = dialog_local_documentation_component_1.DialogLocalDocumentationComponent;
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
            default:
                break;
        }
        if (data.dialog_type > 0 && data.dialog_type < 7) {
            if (data.service != 0) {
                var dialogRef = this._dialog.open(dialog, {
                    data: data,
                    width: "95%"
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    _this.animateToTop();
                    _this.getRelocationImmigrationServices_("imm");
                });
            }
        }
    };
    EditServiceRecordComponent.prototype.animateToTop = function () {
        // e.preventDefault();
        var scrollToTop = window.setInterval(function () {
            var pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20);
            }
            else {
                window.clearInterval(scrollToTop);
            }
        }, 10);
    };
    EditServiceRecordComponent.prototype.doSomethingOnScroll = function (e) {
        console.log("POSICION DEL SCROLL: ", e);
    };
    EditServiceRecordComponent.prototype.addordeleteservices = function (event, id, id_siplier) {
        var _this = this;
        var datos = [{
                "immigrationSupplierPartnerId": id_siplier,
                "serviceOrderServicesId": id
            }];
        if (event.checked) {
            this._services.service_general_post_with_url("Immigration/AddAssignedImmigration", datos).subscribe((function (data) {
                if (data.success) {
                    document.getElementById('active-tab').click();
                    _this.ngOnInit();
                    document.getElementById('services_supplier').scrollIntoView();
                }
            }));
        }
        else {
            this._services.service_general_delete_with_url("Immigration/DeleteAssignedImmigration?id=" + id).subscribe((function (data) {
                document.getElementById('active-tab').click();
                _this.ngOnInit();
                document.getElementById('services_supplier').scrollIntoView();
            }));
        }
    };
    EditServiceRecordComponent.prototype.addordeleteservicesRelocation = function (event, id, id_siplier) {
        var _this = this;
        var datos = [{
                "relocationSupplierPartnerId": id_siplier,
                "serviceOrderServicesId": id
            }];
        if (event.checked) {
            this._services.service_general_post_with_url("Relocation/AddAssignedRelocation", datos).subscribe((function (data) {
                if (data.success) {
                    _this.ngOnInit();
                    document.getElementById('services_supplier_relocation').scrollIntoView();
                }
            }));
        }
        else {
            this._services.service_general_delete_with_url("Immigration/DeleteAssignedImmigration?id=" + id).subscribe((function (data) {
                _this.ngOnInit();
                document.getElementById('services_supplier_relocation').scrollIntoView();
            }));
        }
    };
    EditServiceRecordComponent.prototype.showEscalateDialog = function () {
        var dialogRef = this._dialog.open(escalate_component_1.DialogEscalateComponent, {
            data: {
                id_sr: this.edit_sr_model.id,
                id_user: this.USERDATA.id,
                user_log_name: this.USERDATA.name + " " + this.USERDATA.lastName,
                wos: this.SRDATA.workOrders
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    EditServiceRecordComponent.prototype.PreDecision = function (type, id) {
        var _this = this;
        type.partnerId = this.edit_sr_model.partnerId;
        console.log(type);
        var moda;
        switch (type.dialog_type) {
            case 10:
                moda = legal_review_consultation_component_1.DialogLegalReviewConsultation;
                break;
            case 12:
                moda = pre_decision_orientation_component_1.PreDecisionOrientationComponent;
                break;
            case 13:
                moda = area_orientation_component_1.AreaOrientationComponent;
                break;
            case 21:
                moda = home_finding_component_1.HomeFindingComponent;
                break;
            case 14:
                moda = settling_in_component_1.SettlingInComponent;
                break;
            case 15:
                moda = school_search_component_1.SchoolSearchComponent;
                break;
            case 16:
                moda = dialog_departure_component_1.DialogDepartureComponent;
                //this.showDialogRelocation( type );
                break;
            case 18:
                moda = dialog_rental_furniture_component_1.DialogRentalFurnitureComponent;
                break;
            case 19:
                moda = dialog_transportation_component_1.DialogTransportationComponent;
                break;
            case 17:
                this.showDialogRelocation(type, id);
                break;
            case 20:
                moda = dialog_airport_transportation_component_1.DialogAirportTransportationComponent;
                break;
            case 22:
                moda = legal_renewal_component_1.LegalRenewalComponent;
                break;
            // home sale
            case 23:
                moda = home_sale_component_1.HomeSaleComponent;
                break;
            // home purchase
            case 24:
                moda = home_purchase_component_1.HomePurchaseComponent;
                break;
            // property managment
            case 25:
                moda = property_management_component_1.PropertyManagementComponent;
                break;
            // other
            case 26:
                moda = other_component_1.OtherComponent;
                break;
            case 27:
                moda = tenancy_management_component_1.TenancyManagementComponent;
                break;
        }
        if (type.dialog_type != 17) {
            type.home_host = id;
            var dialogRef = this._dialog.open(moda, {
                data: {
                    sr: this.SO_ID,
                    data: type
                }, width: "95%"
            });
            dialogRef.afterClosed().subscribe(function (so_added) {
                _this.animateToTop();
                _this.getRelocationServices();
            });
        }
    };
    EditServiceRecordComponent.prototype.getRelocationImmigrationServices_ = function (which_tab) {
        var _this = this;
        console.log(which_tab);
        console.log("ENTRA A ACTUALIZAR");
        var tipo = 0;
        if (which_tab == "imm") {
            tipo = 1;
        }
        else if (which_tab == "rel") {
            tipo = 2;
        }
        if (tipo > 0) {
            this._services.service_general_get("ServiceRecord/GetServices/" + this.SO_ID + "?type=" + tipo).subscribe((function (data) {
                console.log("Entra a consultar las WO: ", data);
                if (data.success) {
                    //this.home_contry = new MatTableDataSource(data.map.value.home);
                    _this.home_contry.data = data.map.value.home;
                    console.log('Valie ===> ', data.map.value.home);
                    //this.host_contry = new MatTableDataSource(data.map.value.host);
                    _this.host_contry.data = data.map.value.host;
                    console.log(_this.host_contry);
                }
            }));
        }
    };
    EditServiceRecordComponent.prototype.GetBreed = function (id, i) {
        var _this = this;
        this._services.service_general_get("Catalogue/GetBreed?id=" + id).subscribe((function (data) {
            if (data.success) {
                _this.CaBreed[i] = data.result;
            }
        }));
    };
    EditServiceRecordComponent.prototype.deleteImmigrationsServices = function (id, type) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this service?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete_with_url("ImmigrationServices/DeleteAllServiceById?id=" + id + "&type=" + type).subscribe((function (data) {
                    if (data.success) {
                        var dialogRef_1 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Service removed"
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                }));
            }
        });
    };
    EditServiceRecordComponent.prototype.deleteRelocationService = function (id, type) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this service?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete_with_url("ImmigrationServices/DeleteAllServiceById?id=" + id + "&type=" + type).subscribe((function (data) {
                    if (data.success) {
                        var dialogRef_2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Service removed"
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                }));
            }
        });
    };
    EditServiceRecordComponent.prototype.addDepartament = function () {
        //this.assign_dependents.push(new DependentInformationsModel());
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
        });
        console.log(this.assign_dependents);
    };
    EditServiceRecordComponent.prototype.removeDepartament = function (index) {
        this.assign_dependents.splice(index, 1);
    };
    EditServiceRecordComponent.prototype.addPet = function () {
        this.pets.push(new PetsNavigationModel());
    };
    EditServiceRecordComponent.prototype.removePet = function (index) {
        this.pets.splice(index, 1);
    };
    EditServiceRecordComponent.prototype.addCoordinators = function () {
        this.coordinators.push(this.coordinator);
    };
    EditServiceRecordComponent.prototype.removeCoordinator = function (index) {
        this.coordinators.splice(index, 1);
    };
    EditServiceRecordComponent.prototype.addEducationGroup = function () {
        this.immgration_education.push(new EducationalBackgrounds());
    };
    EditServiceRecordComponent.prototype.removeEducationGroup = function (index) {
        this.immgration_education.splice(index, 1);
    };
    EditServiceRecordComponent.prototype.addLanguage = function () {
        this.immgration_languages.push(new LenguageProficiencies());
    };
    EditServiceRecordComponent.prototype.removeLanguage = function (index) {
        this.immgration_languages.splice(index, 1);
    };
    EditServiceRecordComponent.prototype.addDependent = function () {
        this.immgration_dependent.push(new DependentImmigrationInfos());
    };
    EditServiceRecordComponent.prototype.removeDependent = function (index) {
        this.immgration_dependent.splice(index, 1);
    };
    EditServiceRecordComponent.prototype.requestInformationButton = function () {
        var dialogRef = this._dialog.open(request_information_component_1.DialogRequestInformation, {
            data: {
                sr_id: this.edit_sr_model.id
            }, width: '95%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    EditServiceRecordComponent.prototype.followButton = function () {
        var _this = this;
        var params = {
            id: 0,
            serviceRecordId: this.edit_sr_model.id,
            userId: this.USERDATA.id
        }, root = this;
        if (this.edit_sr_model.follows.length == 0) {
            followRequest();
        }
        else {
            var followers = this.edit_sr_model.follows;
            followers.forEach(function (follower) {
                if (follower.userId == _this.USERDATA.id) {
                    unFollowRequest(follower.id);
                }
                else {
                    followRequest();
                }
            });
        }
        function followRequest() {
            //debugger
            root._services.service_general_post_with_url('Follow/CreateFollow', params)
                .subscribe(function (response) {
                if (response.success) {
                    root.showGeneralMessageDialog('Follow Service Record', 'By following a service record, it will be available on your profile dashboard.');
                    root.initPageSettings();
                }
            }, function (error) {
                console.error('Error (followButton) => ', error);
            });
        }
        function unFollowRequest(id_follow) {
            root._services.service_general_delete("Follow/DeleteFollow?id=" + id_follow)
                .subscribe(function (response) {
                root.showGeneralMessageDialog('Unfollow Service Record', 'When you stop following a Service Record, it will no longer be available on your profile dashboard.');
                root.initPageSettings();
            }, function (error) {
                console.error('Error (DeleteFollow) => ', error);
            });
        }
    };
    EditServiceRecordComponent.prototype.isFollowing = function (follows_field) {
        var _this = this;
        if (follows_field.length == 0)
            this.follow_status_button = 'Follow';
        else {
            follows_field.forEach(function (follow) {
                follow.userId == _this.USERDATA.id ?
                    _this.follow_status_button = 'Unfollow' :
                    _this.follow_status_button = 'Follow';
            });
        }
    };
    EditServiceRecordComponent.prototype.showGeneralMessageDialog = function (title, body) {
        if (title === void 0) { title = "No title"; }
        if (body === void 0) { body = "No content"; }
        var dialogRef = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: title,
                body: body
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    EditServiceRecordComponent.prototype.updateServiceRecordData = function () {
        /*
        if (this.HousingSpecification.id == 0) {
          this._services.service_general_post_with_url('HousingSpecification/CreateHousingSpecification', this.HousingSpecification).subscribe(r => {
            console.log(r);
          })
        } else {
          this._services.service_general_put('HousingSpecification/PutCreateHousingSpecification', this.HousingSpecification).subscribe(r => {
            console.log(r);
          })
        }*/
        /*
        this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord?sr=' + this.SO_ID).subscribe(r => {
          if (r.success) {
            this.HousingSpecification = r.result;
            console.log(this.HousingSpecification);
            if (this.HousingSpecification != null) {
              for (let i = 0; i < this.caAmenity.length; i++) {
                for (let j = 0; j < this.HousingSpecification.relHousingAmenities.length; j++) {
                  const element = this.HousingSpecification.relHousingAmenities[j];
                  if (element.amenitieId == this.caAmenity[i].id) {
                    this.caAmenity[i].check = true;
                  }
                }
              }
    
              console.log(this.caAmenity);
            } else {
              this.HousingSpecification = {
                "id": 0,
                "serviceRecordId": this.SO_ID,
                "areaInterest": "",
                "propertyTypeId": 0,
                "bedroom": 0,
                "bathroom": 0,
                "sizeId": 0,
                "metricId": 0,
                "desiredCommuteTime": 0,
                "budget": 0,
                "currencyId": 0,
                "contractTypeId": 0,
                "intendedStartDate": "",
                "additionalComments": "",
                "relHousingAmenities": []
              }
            }
          }
        })
        */
        var _this = this;
        this.show_ass_depd_errors = true;
        this.show_pets_erros = true;
        var validations = {
            general_form: this.fieldsMustBeFill(),
            assing_form: this.assigneeFormValidation()
        };
        this.allValidationsIn(validations);
        console.log('SR Updated Sent [CPUpdateSent] Data ==> ', this.edit_sr_model);
        console.log('validations => ', validations);
        // if (
        //   validations.general_form &&
        //   validations.assing_form &&
        //   validations.assign_depen &&
        //   validations.assing_pets)
        if (validations.general_form &&
            validations.assing_form) {
            this.setAssingDepenAndPets();
            this.getLanguagesData();
            this.getLanguagesDependentsData();
            this.validateCoordinators();
            this.__loader__.showLoader();
            this._services.service_general_put('ServiceRecord/Update', this.edit_sr_model)
                .subscribe(function (response) {
                console.log('[CP1081] Response Updated => ', response);
                if (_this.show_imm_prof) {
                    _this.initImmigrationProcess();
                }
                if (response.success && !_this.show_imm_prof) {
                    _this.__loader__.hideLoader();
                    var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: 'Service record edited',
                            body: 'The service record has been successfully edited.'
                        }
                    });
                    dialogRef.afterClosed().subscribe(function (result) {
                        _this.__loader__.hideLoader();
                    });
                }
                else {
                    _this.__loader__.hideLoader();
                }
                _this.new_coordinator = [];
                _this.initPageSettings();
            }, function (error) {
                console.error('Error (ServiceRecord/Update) => ', error);
                _this.__loader__.hideLoader();
            });
        }
    };
    EditServiceRecordComponent.prototype.setAssingDepenAndPets = function () {
        if (this.show_dependent_section) {
            this.edit_sr_model.assigneeInformations[0].dependentInformations = this.assign_dependents;
            this.toggleDependentsSection();
        }
        else {
            this.edit_sr_model.assigneeInformations[0].dependentInformations = [];
        }
        if (this.show_pets_section) {
            this.edit_sr_model.assigneeInformations[0].petsNavigation = this.pets;
            this.togglePetsSection();
        }
        else {
            this.edit_sr_model.assigneeInformations[0].petsNavigation = [];
        }
    };
    EditServiceRecordComponent.prototype.allValidationsIn = function (validation) {
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
    };
    EditServiceRecordComponent.prototype.validateCoordinators = function () {
        if (this.hold_imm_coor_data[0].coordinatorId != 0 &&
            this.hold_imm_coor_data[0].coordinatorTypeId != 0) {
            this.edit_sr_model.immigrationCoodinators = this.hold_imm_coor_data;
        }
        if (this.hold_rel_coor_data[0].coordinatorId != 0 &&
            this.hold_rel_coor_data[0].coordinatorTypeId != 0) {
            this.edit_sr_model.relocationCoordinators = this.hold_rel_coor_data;
        }
    };
    EditServiceRecordComponent.prototype.validatingDependents = function () {
        var result = true;
        var dependents = this.edit_sr_model.assigneeInformations[0].dependentInformations;
        this.getAssingDependentsAge(dependents);
        dependents.forEach(function (dependent) {
            if (dependent.relationshipId == "0")
                result = false;
            switch (dependent.relationship) {
                case '1':
                    if (dependent.name == "")
                        result = false;
                    if (dependent.birth == "")
                        result = false;
                    if (dependent.languageDependentInformations.length == 0)
                        result = false;
                    if (dependent.nationalityId == "")
                        result = false;
                    if (dependent.email == "")
                        result = false;
                    if (dependent.phone == "")
                        result = false;
                    break;
                case '2':
                    if (dependent.name == "")
                        result = false;
                    if (dependent.birth == "")
                        result = false;
                    if (dependent.languagesId == "")
                        result = false;
                    if (dependent.nationalityId == "")
                        result = false;
                    if (dependent.currentGrade == "")
                        result = false;
                    break;
                case '3':
                    if (dependent.ifOther == "")
                        result = false;
                    if (dependent.name == "")
                        result = false;
                    if (dependent.birth == "")
                        result = false;
                    if (dependent.languagesId == "")
                        result = false;
                    if (dependent.nationalityId == "")
                        result = false;
                    break;
            }
        });
        return result;
    };
    EditServiceRecordComponent.prototype.getAssingDependentsAge = function (dependents_in) {
        dependents_in.forEach(function (dependent, index) {
            var dependent_age_container = document.getElementById("dependent_" + index);
            if (dependent_age_container != undefined || dependent_age_container != null) {
                dependent.age = dependent_age_container.value;
            }
        });
    };
    EditServiceRecordComponent.prototype.validatingPets = function () {
        var result = true;
        var pets = this.edit_sr_model.assigneeInformations[0].petsNavigation;
        this.getPetsAges(pets);
        pets.forEach(function (pet) {
            console.log('Pet ===> ', pet);
            if (pet.age == undefined)
                result = false;
            if (pet.name == undefined)
                result = false;
            //if (pet.breedId == '') result = false;
            if (pet.petTypeId == undefined)
                result = false;
            if (pet.weight == undefined)
                result = false;
        });
        return result;
    };
    EditServiceRecordComponent.prototype.getPetsAges = function (pets_in) {
        pets_in.forEach(function (pet, index) {
            var pet_age_container = document.getElementById("pet_" + index);
            if (pet_age_container != undefined || pet_age_container != null) {
                pet.age = pet_age_container.value;
            }
        });
    };
    EditServiceRecordComponent.prototype.initImmigrationProcess = function () {
        var main_validations = {
            val_global: this.immFormGlobal(),
            val_coordinator: this.immigrationFormComplete(),
            val_passport: this.immPassportValidator(),
            val_previescoun: this.immPreviusCountryValidator(),
            val_assInfo: this.immAssInformationValidator(),
            val_languages: this.immLanguagesValidator(),
            val_dependents: this.immDependentsValidator()
        };
        if (main_validations.val_dependents == false) {
            this._snackBar.open('Immigrations Profile Dependents Immigration Information incomplete', 'Close', {
                duration: 6000,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: ['my-snack-bar']
            });
        }
        if (main_validations.val_assInfo == false) {
            this._snackBar.open('Immigrations Profile Assignment Information incomplete', 'Close', {
                duration: 6000,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: ['my-snack-bar']
            });
        }
        if (main_validations.val_languages == false) {
            this._snackBar.open('Immigrations Profile Language Proficiency Information incomplete', 'Close', {
                duration: 6000,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: ['my-snack-bar']
            });
        }
        if (main_validations.val_previescoun == false) {
            this._snackBar.open('Immigrations Profile Previous Host Country Information incomplete', 'Close', {
                duration: 6000,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: ['my-snack-bar']
            });
        }
        if (main_validations.val_passport == false) {
            this._snackBar.open('Immigrations Profile Passport Information incomplete', 'Close', {
                duration: 6000,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: ['my-snack-bar']
            });
        }
        this.show_immigration_errors = true;
        if (main_validations.val_coordinator &&
            main_validations.val_passport &&
            main_validations.val_previescoun &&
            main_validations.val_assInfo &&
            main_validations.val_languages &&
            main_validations.val_global) {
            this.immgration_profile.educationalBackgrounds = this.immgration_education;
            this.immgration_profile.lenguageProficiencies = this.immgration_languages;
            this.immgration_profile.dependentImmigrationInfos = this.immgration_dependent;
            console.log('[CP1105] Imm beofre send any mode =>', this.immgration_profile);
            if (this.is_creating_immigration) {
                this.requestNewImmigrationProfile(this.edit_sr_model.id);
            }
            else {
                this.editImmigrationProfile(this.edit_sr_model.id);
            }
        }
    };
    EditServiceRecordComponent.prototype.immFormGlobal = function () {
        var result = true;
        var global_form = this.immgration_profile;
        global_form.highestLevelEducationalId == 0 ?
            this.imm_global_form.no_leve = true : this.imm_global_form.no_leve = false;
        for (var field in this.imm_global_form) {
            if (this.imm_global_form[field])
                result = false;
        }
        return result;
    };
    EditServiceRecordComponent.prototype.requestImmigrationProfile = function () {
        !this.show_imm_prof ?
            this.show_imm_prof = true :
            this.show_imm_prof = false;
    };
    EditServiceRecordComponent.prototype.immigrationFormComplete = function () {
        var result = true;
        var imm_coor_prof = this.edit_sr_model.immigrationCoodinators[0];
        imm_coor_prof.coordinatorTypeId == 0 || imm_coor_prof.coordinatorTypeId == null ?
            this.form_imm_cord.no_ctyp = true : this.form_imm_cord.no_ctyp = false;
        imm_coor_prof.coordinatorId == 0 || imm_coor_prof.coordinatorId == null ?
            this.form_imm_cord.no_coor = true : this.form_imm_cord.no_coor = false;
        imm_coor_prof.assigned == '' || imm_coor_prof.assigned == null ?
            this.form_imm_cord.no_dat0 = true : this.form_imm_cord.no_dat0 = false;
        imm_coor_prof.accepted == '' || imm_coor_prof.accepted == null ?
            this.form_imm_cord.no_dat1 = true : this.form_imm_cord.no_dat1 = false;
        for (var field in this.form_imm_cord) {
            if (this.form_imm_cord[field])
                result = false;
        }
        return result;
    };
    EditServiceRecordComponent.prototype.immPassportValidator = function () {
        var result = true;
        var passport_form = this.immgration_profile.passportInformation;
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
        for (var field in this.passport_form_val) {
            if (this.passport_form_val[field])
                result = false;
        }
        return result;
    };
    EditServiceRecordComponent.prototype.immPreviusCountryValidator = function () {
        var result = true;
        var previoush_form = this.immgration_profile.previousHostCountry;
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
        for (var field in this.previoush_form_val) {
            if (this.previoush_form_val[field])
                result = false;
        }
        return result;
    };
    EditServiceRecordComponent.prototype.immAssInformationValidator = function () {
        var result = true;
        var assign_form = this.immgration_profile.assigmentInformation;
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
        for (var field in this.assign_form_validator) {
            if (this.assign_form_validator[field])
                result = false;
        }
        return result;
    };
    EditServiceRecordComponent.prototype.immLanguagesValidator = function () {
        var _this = this;
        var result = true;
        this.immgration_languages.forEach(function (language) {
            if (language.languageId == '')
                result = false;
            if (language.proficiencyId == '')
                result = false;
            language.immigrationProfileId = _this.immgration_profile.id;
        });
        return result;
    };
    EditServiceRecordComponent.prototype.immDependentsValidator = function () {
        var _this = this;
        var result = true;
        this.immgration_dependent.forEach(function (dependent) {
            if (dependent.relationshipId == '')
                result = false;
            if (dependent.name == '')
                result = false;
            if (dependent.passportNumber == '')
                result = false;
            if (dependent.issue == '')
                result = false;
            if (dependent.expiration == '')
                result = false;
            if (dependent.issuingAuthority == '')
                result = false;
            if (dependent.placeIssue == '')
                result = false;
            if (dependent.entryDateHostCountry == '')
                result = false;
            dependent.immigrationProfileId = _this.immgration_profile.id;
        });
        return result;
    };
    EditServiceRecordComponent.prototype.getImmigrationDataStatus = function (id_sr) {
        var _this = this;
        this._services.service_general_get("ImmigrationProfile/GetImmigrationProfile?sr=" + id_sr)
            .subscribe(function (response) {
            console.log('Res GetImmigrationProfile (1405) => ', response);
            if (response.success) {
                if (response.result.value == null) {
                    _this.is_creating_immigration = true;
                }
                else {
                    _this.is_creating_immigration = false;
                    _this.show_imm_prof = true;
                    _this.immgration_profile = response.result.value;
                    if (_this.immgration_profile.passportInformation == null) {
                        _this.immgration_profile.passportInformation = new PassportInformation();
                    }
                    if (_this.immgration_profile.previousHostCountry == null) {
                        _this.immgration_profile.previousHostCountry = new PreviousHostCountry();
                    }
                    if (_this.immgration_profile.passportInformation.expiration != '' ||
                        _this.immgration_profile.passportInformation.expiration != null) {
                        _this.isPassportExpiring(_this.immgration_profile.passportInformation.expiration);
                    }
                    _this.immgration_dependent = _this.immgration_profile.dependentImmigrationInfos;
                    _this.immgration_education = _this.immgration_profile.educationalBackgrounds;
                    _this.immgration_languages = _this.immgration_profile.lenguageProficiencies;
                }
            }
        }, function (error) {
            console.error('Error (GetImmigrationProfile) => ', error);
        });
    };
    //NUEVO APPOINTMENT//
    EditServiceRecordComponent.prototype.addApointment = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_appointment_component_1.DialogAddAppointmentComponent, {
            width: '60%',
            data: {
                sr: this.SO_ID,
                appointmentId: id,
                id: 0
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //this.animal = result;
            _this.getAppointment();
        });
    };
    //CONSULTAR APPOINTMENT//
    EditServiceRecordComponent.prototype.addApointmentConsult = function (data, i) {
        var _this = this;
        if (i == 0) {
            i = i + 1;
        }
        else {
            i = i + 1;
        }
        console.log("Data del appointment a ver:  ", data);
        var dialogRef = this._dialog.open(dialog_add_appointment_component_1.DialogAddAppointmentComponent, {
            width: '60%',
            data: {
                sr: this.SO_ID,
                appointmentId: data.id,
                supplier: data.supplier,
                workOrderId: data.workOrderId,
                index: i
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //this.animal = result;
            _this.getAppointment();
        });
    };
    EditServiceRecordComponent.prototype.requestNewImmigrationProfile = function (id) {
        var _this = this;
        this.immgration_profile.serviceRecordId = id;
        //this.getImmigrationCardsData();
        this._services.service_general_post_with_url('ImmigrationProfile/CreateImmigrationProfile', this.immgration_profile)
            .subscribe(function (response) {
            console.log('[CP1535] Update New Res (CreateImmigrationProfile) ==> ', response);
            if (response.success) {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Service record ',
                        body: 'Immigration Profile has been created.'
                    }
                });
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (CreateImmigrationProfile) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    EditServiceRecordComponent.prototype.editImmigrationProfile = function (id) {
        var _this = this;
        this.immgration_profile.serviceRecordId = id;
        this.show_imm_prof = true;
        //this.getImmigrationCardsData();
        this._services.service_general_put("ImmigrationProfile/UpdateImmigrationProfileProvisional", this.immgration_profile)
            .subscribe(function (response) {
            console.log('[CP1570] Update IP (UpdateImmigrationProfileProvisional) ==> ', response);
            if (response.success) {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Service record edited',
                        body: 'The service record has been successfully edited.'
                    }
                });
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (UpdateImmigrationProfile) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    EditServiceRecordComponent.prototype.isPassportExpiring = function (date_in) {
        var date_seleted = new Date(date_in);
        var difference = (date_seleted.getTime() - this.today_date.getTime()) / 1000;
        difference /= (60 * 60 * 24 * 7 * 4);
        var months_between = Math.abs(Math.round(difference));
        months_between <= 6 ? this.passport_expiring = true : this.passport_expiring = false;
    };
    EditServiceRecordComponent.prototype.fieldsMustBeFill = function () {
        var result = true;
        this.edit_sr_model.assigneeInformations[0].assigneeName == '' ?
            this.mf_validator.no_name = true : this.mf_validator.no_name = false;
        this.edit_sr_model.clientFileNumber == '' ?
            this.mf_validator.no_fnum = true : this.mf_validator.no_fnum = false;
        for (var field in this.mf_validator) {
            if (this.mf_validator[field])
                result = false;
        }
        return result;
    };
    EditServiceRecordComponent.prototype.assigneeFormValidation = function () {
        var result = true;
        var item_selected = this.edit_sr_model.assigneeInformations[0];
        getImageAssign();
        item_selected.assigneeName == '' ?
            this.fass_validator.no_name = true : this.fass_validator.no_name = false;
        item_selected.birth == '' || item_selected.birth == null ?
            this.fass_validator.no_bdat = true : this.fass_validator.no_bdat = false;
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
        item_selected.initialArrival == '' || item_selected.initialArrival == null ?
            this.fass_validator.no_idat = true : this.fass_validator.no_idat = false;
        item_selected.finalMove == '' || item_selected.finalMove == null ?
            this.fass_validator.no_fdat = true : this.fass_validator.no_fdat = false;
        item_selected.currentPosition == '' ?
            this.fass_validator.no_cpos = true : this.fass_validator.no_cpos = false;
        item_selected.newPosition == '' ?
            this.fass_validator.no_npos = true : this.fass_validator.no_npos = false;
        item_selected.assignmentDuration == "" ?
            this.fass_validator.no_adur = true : this.fass_validator.no_adur = false;
        item_selected.assignmentDurationTime == '0' || item_selected.assignmentDurationTime == '' ?
            this.fass_validator.no_atim = true : this.fass_validator.no_atim = false;
        for (var field in this.fass_validator) {
            if (this.fass_validator[field])
                result = false;
        }
        function getImageAssign() {
            var id_photo_container = document.getElementById('ass_prof_photo'), photo_src = id_photo_container.src, photo_input = document.getElementById('ass_prof_photo_input');
            var split_photo_value = '';
            var result = true;
            if (photo_input.value != '') {
                split_photo_value = photo_input.value.split('.')[1];
                item_selected.PhotoExtension = split_photo_value;
                item_selected.Photo = photo_src.split(',')[1];
            }
            else {
                result = false;
            }
            return result;
        }
        return result;
    };
    EditServiceRecordComponent.prototype.getLanguagesData = function () {
        var _this = this;
        var languages_selected = this.edit_sr_model.assigneeInformations[0].languagesSpokens, hold_language = [];
        languages_selected.forEach(function (language) {
            var language_selected = new LanguagesSpokensModel();
            language_selected.assignneInformation = _this.edit_sr_model.assigneeInformations[0].id;
            language_selected.languages = language;
            hold_language.push(language_selected);
        });
        this.edit_sr_model.assigneeInformations[0].languagesSpokens = [];
        this.edit_sr_model.assigneeInformations[0].languagesSpokens = hold_language;
    };
    EditServiceRecordComponent.prototype.getLanguagesDependentsData = function () {
        var dependents = this.assign_dependents;
        if (dependents.length != 0) {
            var language_holder_1 = [];
            dependents.forEach(function (dependent) {
                if (dependent.languageDependentInformations.length != 0) {
                    var languages = dependent.languageDependentInformations;
                    languages.forEach(function (language) {
                        var new_language = new LanguagesSpokensModelDependent;
                        new_language.dependent = dependent.id;
                        new_language.language = language;
                        language_holder_1.push(new_language);
                    });
                    dependent.languageDependentInformations = language_holder_1;
                    language_holder_1 = [];
                }
            });
        }
    };
    //****************************************************************************//
    EditServiceRecordComponent.prototype.showInvoiceDialog = function () {
        //DialogInvoiceEditComponent
        var dialogRef = this._dialog.open(dialog_request_invoice_component_1.DialogRequestInvoiceComponent, {
            data: {
                sr_id: this.SO_ID
            }, width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //console.log('The dialog was closed');
        });
    };
    //*****************************************************************************///
    EditServiceRecordComponent.prototype.showDialogById = function (dialog_id, obj_props) {
        var _this = this;
        if (obj_props === void 0) { obj_props = null; }
        obj_props.partnerId = this.edit_sr_model.partnerId;
        console.log('Data Service sent ====> ', obj_props);
        console.log('Id Service ===> ', dialog_id);
        switch (dialog_id) {
            case 7:
                var corporate_dialog = this._dialog.open(corporate_assistance_component_1.DialogCortporateAssistance, {
                    data: {
                        //sr_id: obj_props.service[0].id,
                        app_id: this.edit_sr_model.id,
                        sr_id: obj_props.service[0].id,
                        data: obj_props
                    }, width: "95%"
                });
                corporate_dialog.afterClosed().subscribe(function (so_added) {
                    _this.getRelocationImmigrationServices_('imm');
                });
                break;
            case 8:
                var renewal_dialog = this._dialog.open(renewal_component_1.DialogRenewal, {
                    data: {
                        sr: this.SO_ID,
                        sr_id: obj_props.service[0].id,
                        app_id: this.edit_sr_model.id,
                        sr_hcountry: this.Host_Home_country.host_country_name,
                        //sr_hcity: this.Host_Home_country.host_city_name, hostCity_name,
                        sr_hcity: this.Host_Home_country.hostCity_name,
                        data: obj_props
                    }, width: "95%"
                });
                renewal_dialog.afterClosed().subscribe(function (so_added) {
                    _this.getRelocationImmigrationServices_('imm');
                });
                break;
            case 9:
                var notificacion_dialog = this._dialog.open(notification_component_1.NotificationDialog, {
                    data: {
                        sr: this.SO_ID,
                        sr_id: obj_props.service[0].id,
                        app_id: this.edit_sr_model.id,
                        sr_hcountry: this.Host_Home_country.host_country_name,
                        //sr_hcity: this.Host_Home_country.host_city_name,
                        sr_hcity: this.Host_Home_country.hostCity_name,
                        data: obj_props
                    }, width: "95%"
                });
                notificacion_dialog.afterClosed().subscribe(function (so_added) {
                    _this.getRelocationImmigrationServices_('imm');
                });
                break;
            case 10:
                var legal_dialog = this._dialog.open(legal_review_consultation_component_1.DialogLegalReviewConsultation, {
                    data: {
                        sr_id: obj_props.service[0].id,
                        app_id: this.edit_sr_model.id,
                        sr_hcountry: this.Host_Home_country.host_country_name,
                        sr_hcity: this.Host_Home_country.host_city_name,
                        data: obj_props
                    }, width: "95%"
                });
                legal_dialog.afterClosed().subscribe(function (so_added) {
                    _this.getRelocationImmigrationServices_('imm');
                });
                break;
        }
    };
    EditServiceRecordComponent.prototype.showDialogRelocation = function (service_in, id) {
        var _this = this;
        service_in.home_host = id;
        service_in.partnerId = this.edit_sr_model.partnerId;
        console.log('Service selected in ESR ======> ', service_in);
        switch (service_in.categoryId) {
            case 16:
                var departure_dialog = this._dialog.open(dialog_departure_component_1.DialogDepartureComponent, {
                    data: {
                        sr_id: service_in.service[0].id,
                        app_id: this.edit_sr_model.id,
                        sr_hcountry: this.Host_Home_country.host_country_name,
                        sr_hcity: this.Host_Home_country.host_city_name
                    }, width: "95%"
                });
                departure_dialog.afterClosed().subscribe(function (so_added) {
                    _this.getRelocationServices();
                });
                break;
            case 17:
                var legal_dialog = this._dialog.open(dialog_temporary_housing_component_1.DialogTemporaryHousingComponent, {
                    data: {
                        sr: this.SO_ID,
                        sr_id: service_in.service[0].id,
                        app_id: this.edit_sr_model.id,
                        sr_hcountry: this.Host_Home_country.host_country_name,
                        sr_hcity: this.Host_Home_country.host_city_name,
                        data: service_in
                    }, width: "95%"
                });
                legal_dialog.afterClosed().subscribe(function (so_added) {
                    _this.getRelocationServices();
                });
                break;
            /*
               case 20:
                 const airport_dialog = this._dialog.open(DialogAirportTransportationComponent, {
                   data:
                   width: "95%"
                 });
                 break;
                 */
        }
    };
    EditServiceRecordComponent.prototype.togglePetsSection = function () {
        !this.show_pets_section ?
            this.show_pets_section = true :
            this.show_pets_section = false;
        if (this.pets.length == 0) {
            this.pets.push(new PetsNavigationModel());
        }
    };
    EditServiceRecordComponent.prototype.toggleDependentsSection = function () {
        !this.show_dependent_section ?
            this.show_dependent_section = true :
            this.show_dependent_section = false;
        console.log(this.show_dependent_section);
        if (this.assign_dependents.length == 0) {
            this.assign_dependents.push(new DependentInformationsModel());
        }
    };
    EditServiceRecordComponent.prototype.showTabSelected = function (which_tab, event_data) {
        var _this = this;
        console.log('Tab selected ===> ', which_tab);
        if (which_tab == 'rep') {
            this.get_catalogos();
            this.getReport();
            this.getSupplier();
        }
        if (which_tab == 'com') {
            this.getCommentsHistory();
            this.initChatBehavior();
            this.initCallsBehavior(this.calls_serviceline);
            this.initEmailsBehavior();
            this.initTasksBehavior();
            this.initEscalationBehavoir();
            this.initAssFeedbackBehavior();
            this.initMapitBehavior();
            this.getEmail();
        }
        if (which_tab == 'fin') {
            this.get_request();
            this.get_requestSupplier();
            this.getInvoicesService();
            //this.dataSourceSP = this.example;
        }
        if (which_tab == 'imm' || which_tab == 'rel') {
            var tab_selected_1 = which_tab == 'imm' ? 1 : 2;
            this.initFilterImmRelTableSettings(tab_selected_1);
            if (tab_selected_1 == 2)
                this.initTableHousingSpecs();
        }
        if (which_tab == 'lib') {
            this.initLibraryBehavior();
        }
        var tipo = 0;
        if (which_tab == "imm") {
            tipo = 1;
        }
        else if (which_tab == "rel") {
            tipo = 2;
        }
        if (tipo > 0) {
            this._services.service_general_get("ServiceRecord/GetServices/" + this.SO_ID + "?type=" + tipo).subscribe((function (data) {
                console.log("Entra a consultar las WO: ", data);
                if (data.success) {
                    //let home = [];
                    //let host = [];
                    //data.map.value.forEach(element => {
                    //    for (let index = 0; index < element.home.length; index++) {
                    //        const data = element.home[index];
                    //        data.status = element.status;
                    //        data.authodate = element.authodate;
                    //        data.serviceOrderId = element.serviceOrderId;
                    //        home.push(data);
                    //    }
                    //    for (let index = 0; index < element.host.length; index++) {
                    //        const data = element.host[index];
                    //        data.status = element.status;
                    //        data.authodate = element.authodate;
                    //        data.serviceOrderId = element.serviceOrderId;
                    //        host.push(data);
                    //    }
                    //});
                    _this.home_contry = new table_1.MatTableDataSource(data.map.value.home);
                    //this.home_contry.paginator = this.paginator;
                    console.log('Valie ===> ', data.map.value.home);
                    _this.host_contry = new table_1.MatTableDataSource(data.map.value.host);
                    //this.host_contry.paginator = this.paginator;
                }
            }));
            /*this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord?sr=' + this.SO_ID).subscribe(r => {
              if (r.success) {
                this.HousingSpecification = r.result;
                console.log(this.HousingSpecification);
                if (this.HousingSpecification != null) {
                  for (let i = 0; i < this.caAmenity.length; i++) {
                    for (let j = 0; j < this.HousingSpecification.relHousingAmenities.length; j++) {
                      const element = this.HousingSpecification.relHousingAmenities[j];
                      if (element.amenitieId == this.caAmenity[i].id) {
                        this.caAmenity[i].check = true;
                      }
                    }
                  }
      
                  console.log(this.caAmenity);
                } else {
                  this.HousingSpecification = {
                    "id": 0,
                    "serviceRecordId": this.SO_ID,
                    "areaInterest": "",
                    "propertyTypeId": 0,
                    "bedroom": 0,
                    "bathroom": 0,
                    "sizeId": 0,
                    "metricId": 0,
                    "desiredCommuteTime": 0,
                    "budget": 0,
                    "currencyId": 0,
                    "contractTypeId": 0,
                    "intendedStartDate": "",
                    "additionalComments": "",
                    "relHousingAmenities": []
                  }
                }
              }
            })*/
        }
        var tab_selected = document.getElementById("tab_" + which_tab), tab_parent = tab_selected.parentElement.children, event = event_data.target, tabs_container = document.getElementById('tabs');
        for (var index = 0; index < tab_parent.length; index += 1) {
            tab_parent[index].classList.add('display-none');
            tabs_container.children[index].classList.remove('page__section-tab--active');
            tabs_container.children[index].id = "0";
        }
        tab_selected.classList.remove('display-none');
        event.classList.add('page__section-tab--active');
        event.id = "active-tab";
    };
    EditServiceRecordComponent.prototype.get_request = function () {
        var _this = this;
        this.__loader__.showLoader();
        this._services.service_general_get('RequestPayment/GetFinance?sr=' + this.SO_ID).subscribe(function (response) {
            console.log(response);
            if (response.success) {
                _this.dataSourceTHIRD = new table_1.MatTableDataSource(response.result.value);
                _this.dataSourceTHIRD.paginator = _this.third;
                _this.dataSourceTHIRD.sort = _this.sort;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (RequestPayment) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    EditServiceRecordComponent.prototype.get_requestSupplier = function () {
        var _this = this;
        this.__loader__.showLoader();
        this._services.service_general_get('RequestInvoice/GetSupplierPartnerInvoices/' + this.SO_ID).subscribe(function (response) {
            console.log(response);
            if (response.success) {
                _this.dataSourceSP = new table_1.MatTableDataSource(response.result.value);
                _this.dataSourceSP.paginator = _this.supplier_;
                _this.dataSourceSP.sort = _this.sort;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (RequestPayment) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    EditServiceRecordComponent.prototype.getInvoicesService = function () {
        var _this = this;
        this.__loader__.showLoader();
        this._services.service_general_get('Invoice/Finance/ServiceInvoices/' + this.SO_ID).subscribe(function (response) {
            console.log(response);
            if (response.success) {
                _this.dataSourceIS = new table_1.MatTableDataSource(response.result.value);
                _this.dataSourceIS.paginator = _this.supplierSI_;
                _this.dataSourceIS.sort = _this.sort;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (RequestPayment) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    EditServiceRecordComponent.prototype.searchData = function () {
        console.log('ENTRA A SEARCH DATA');
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.dataIS) {
            if (this.dataIS[item] != '') {
                service_record_params_selected += item + "=" + this.dataIS[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.consultaInformacionPorFiltro(params);
    };
    EditServiceRecordComponent.prototype.consultaInformacionPorFiltro = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        console.log(params_in);
        this._services.service_general_get('Invoice/Finance/ServiceInvoices/' + this.SO_ID + params_in).subscribe(function (response) {
            console.log(response);
            if (response.success) {
                _this.dataSourceIS = new table_1.MatTableDataSource(response.result.value);
                _this.dataSourceIS.paginator = _this.supplierSI_;
                _this.dataSourceIS.sort = _this.sort;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (RequestPayment) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    EditServiceRecordComponent.prototype.initTableHousingSpecs = function () {
        var _this = this;
        this.__loader__.showLoader();
        this._services.service_general_get("HousingSpecification/GetHousingSpecification/" + this.edit_sr_model.id)
            .subscribe(function (response) {
            if (response.success) {
                _this.table_housing_data = new table_1.MatTableDataSource(response.result.value);
                _this.table_housing_data.paginator = _this.paginator;
                _this.table_housing_data.sort = _this.sort;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (GetHousingSpecification) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    EditServiceRecordComponent.prototype.showHSDialogFromHSTable = function (item_selected) {
        console.log('Mostrar el dialog con el elemento');
        console.log('seleccionado => ', item_selected);
        var sr = item_selected.numberServiceRecord.split('-');
        console.log(sr);
        var data_ = {
            numberWorkOrder: item_selected.numberWorkOrder,
            serviceID: item_selected.numberServiceRecord,
            serviceName: item_selected.service,
            sr: Number(sr[1]),
            //service: this.data.data.serviceTypeId,
            type_housing: item_selected.typeService,
            workOrderServicesId: item_selected.workOrderServices
        };
        var dialogRef = this._dialog.open(dialog_housing_specifications_component_1.DialogHousingSpecificationsComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
            }
        });
    };
    EditServiceRecordComponent.prototype.canIShowImmProSecondPayRoll = function () {
        !this.show_second_prfield ?
            this.show_second_prfield = true :
            this.show_second_prfield = false;
    };
    /*
     * Section: Library
     * All specific functions when library tab has been clicked
     * Func initLibraryBehavior: Begin an specific configuration once tab has been clicked
     * Func requestLibraryData: Request Data to WS, each inside tab ask for diferent end point
     * Func addNewDocumentToLibrary: Add new document to library (Open document modal)
     * Func showDocumentDialogDetails: Show details from row selected (Open detail document modal)
     * Func deleteDocumentLibrary: Elimina el documento seleccionado
     * Func libraryShowAllDocuments: Show all documents of the line (Open modal all Docusments)
     * Func libClickImmTab: Give an specific auto click to selected tab
     */
    EditServiceRecordComponent.prototype.initLibraryBehavior = function () {
        this.requestLibraryData();
    };
    // TODO: SEGUNDO METODO
    EditServiceRecordComponent.prototype.requestLibraryData = function (section) {
        var _this = this;
        if (section === void 0) { section = 0; }
        this.requestLibraryCatalogues();
        var id_selected = this.edit_sr_model.id;
        switch (section) {
            case 0:
                // /api/ImmigrationProfile/GetAssigneFamilyById
                // ImmigrationProfile/GetAssigneFamily?sr=
                this._services.service_general_get("ImmigrationProfile/GetAssigneFamily?sr=" + id_selected)
                    .subscribe(function (response) {
                    console.log('Library Res => ', response);
                    if (response.success) {
                        _this.library_ass_data = response.result.value;
                        console.log('library_ass_data Succ ==> ', _this.library_ass_data.length);
                        if (_this.library_ass_data.length == 0)
                            _this.library_ass_no_data = true;
                    }
                }, function (error) {
                    console.error('Error (ImmigrationProfile/GetAssigneFamilyById) => ', error);
                });
                break;
            case 1:
            case 2:
                var line_selected = section == 1 ? 1 : 2, params = "?service_record_id=" + this.edit_sr_model.id + "&service_line=" + line_selected;
                this.library_filter = new LibraryFilter();
                this.__loader__.showLoader();
                this._services.service_general_get("ImmigrationProfile/GetHistoryImmigrationLibrary" + params)
                    .subscribe(function (response) {
                    console.log('Res new => ', response);
                    if (response.success) {
                        _this.library_imre_data = response.result.value;
                        console.log('this.library_imre_data ===> ', _this.library_imre_data);
                    }
                    _this.__loader__.hideLoader();
                }, function (error) {
                    console.error('Error (ImmigrationProfile/GetHistoryImmigrationLibrary) => ', error);
                    _this.__loader__.hideLoader();
                });
                break;
        }
    };
    EditServiceRecordComponent.prototype.requestLibraryCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 1:
                        _a.status_catalogue = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditServiceRecordComponent.prototype.filteringLibraryData = function () {
        console.log('library_filter ==> ', this.library_filter);
        console.log('Termindar la integracion del filtro');
    };
    EditServiceRecordComponent.prototype.addNewDocumentToLibrary = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: {
                sr: this.edit_sr_model.id,
                spc: 'esr_lib'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('respuesta de documentos', result);
            var new_document = new LibraryDocumentModel();
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
            if (new_document.fileName != '' &&
                new_document.fileExtension != '' &&
                new_document.fileRequest != '' &&
                new_document.relationship != 0) {
                _this.__loader__.showLoader();
                _this._services.service_general_post_with_url("ImmigrationProfile/CreateDocumentDependent", new_document)
                    .subscribe(function (response) {
                    if (response.success) {
                        _this.requestLibraryData();
                        _this.showGeneralMessageDialog('Document Uploaded', 'Document has been successfully uploaded.');
                    }
                    _this.__loader__.hideLoader();
                }, function (error) {
                    console.error('Error (ImmigrationProfile/CreateDocumentDependent) => ', error);
                    _this.__loader__.hideLoader();
                });
            }
        });
    };
    EditServiceRecordComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var section_to = 'library';
        if (service_line != undefined) {
            document.service_line = service_line;
            section_to = 'lib_im_re';
        }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.edit_sr_model.id,
                sr: this.edit_sr_model.id,
                document: document,
                name_section: section_to
            }
        });
    };
    EditServiceRecordComponent.prototype.deleteDocumentLibrary = function (document_in, document_section) {
        var _this = this;
        if (document_section === void 0) { document_section = 0; }
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            width: "420px",
            data: {
                header: 'Delete document',
                body: "Are you sure to delete this document(" + document_in.documentType + ")?"
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.__loader__.showLoader();
                _this._services.service_general_get("ImmigrationProfile/DeleteDocumentDependent?id=" + document_in.id)
                    .subscribe(function (response) {
                    if (response.success) {
                        _this.requestLibraryData();
                    }
                    _this.__loader__.hideLoader();
                }, function (error) {
                    _this.__loader__.hideLoader();
                    console.error('Error (ImmigrationProfile/DeleteDocumentDependent) => ', error);
                });
            }
        });
    };
    EditServiceRecordComponent.prototype.libraryShowAllDocuments = function (service_line) {
        var dialogRef = this._dialog.open(dialog_library_documents_component_1.DialogLibraryDocuments, {
            width: "95%",
            data: {
                service_line: service_line,
                sr_id: this.edit_sr_model.id
            }
        });
    };
    EditServiceRecordComponent.prototype.libClickImmTab = function () {
        this.autoClickTab('[auto-click="main_imm_tab"]');
    };
    /* Section: Library =====================================================================> Ends */
    // TODO: evento al dar click en los tabs
    EditServiceRecordComponent.prototype.showTabSelectedLibrary = function (section, event_data) {
        console.log("section " + section + " event data " + event_data);
        var section_to_show = document.getElementById("library_" + section), library_tabs_containers = document.getElementsByClassName('library-tab-content'), library_tab_buttons = document.getElementsByClassName('page__section-tab--lib');
        for (var item = 0; item < library_tabs_containers.length; item += 1) {
            library_tabs_containers[item].classList.add('display-none');
            library_tab_buttons[item].classList.remove('page__section-tab--active');
        }
        event_data.classList.add('page__section-tab--active');
        section_to_show.classList.remove('display-none');
    };
    EditServiceRecordComponent.prototype.amenitie = function ($event, id) {
        if ($event.checked) {
            this.HousingSpecification.relHousingAmenities.push({
                housingSpecificationId: 0,
                amenitieId: id
            });
        }
        else {
            for (var i = 0; i < this.HousingSpecification.relHousingAmenities.length; i++) {
                if (this.HousingSpecification.relHousingAmenities[i].amenitieId = id) {
                    this.HousingSpecification.relHousingAmenities.splice(i, 1);
                }
            }
        }
    };
    //****************************************************************//
    EditServiceRecordComponent.prototype.getReport = function () {
        var _this = this;
        console.log("SO ID: ", this.SO_ID);
        this._services.service_general_get('ReportDay/GetActivityReports?sr=' + Number(this.SO_ID) + '&serviceLine=' + this.serviceLine + '&package=' + this.program + '&initialReportDate=' + this.initialReport + '&finalReportDate=' + this.finalReport + '&totalTimeAuthorized=' + this.totalTime).subscribe((function (data) {
            //this._services.service_general_get('ReportDay/GetActivityReports?sr='+Number(this.SO_ID)).subscribe((data => {
            if (data.success) {
                console.log('DATA CONSULTA: REPORTES ', data);
                _this.dataSourceReport = new table_1.MatTableDataSource(data.view);
                console.log(_this.dataSourceReport);
                _this.dataSourceReport.paginator = _this.ActivityReports;
                _this.dataSourceReport.sort = _this.sort;
            }
        }));
    };
    EditServiceRecordComponent.prototype.getSupplier = function () {
        var _this = this;
        var data;
        this._services.service_general_get('PropertyReport/GetSupplierPartner?supplier_type=' + this.ST + '&supplier=' + this.SU).subscribe(function (dat) {
            if (dat.success) {
                console.log('DATA CONSULTA: SUPPLIER', dat.result.value);
                data = dat.result.value;
                _this.dataSourceR = new table_1.MatTableDataSource(data);
                _this.dataSourceR.paginator = _this.SupplierPartnersRecord;
                _this.dataSourceR.sort = _this.firstTableSort;
                console.log(_this.dataSourceR);
            }
        });
    };
    EditServiceRecordComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.ST = 0;
        this.SU = 0;
        this._services.service_general_get('PropertyReport/GetSupplierPartner').subscribe((function (dat) {
            if (dat.success) {
                console.log('DATA CONSULTA: SUPPLIER', dat);
                _this.dataSourceR = new table_1.MatTableDataSource(dat.result.value);
                _this.dataSourceR.paginator = _this.SupplierPartnersRecord;
                _this.dataSourceR.sort = _this.firstTableSort;
                console.log(_this.dataSourceR);
            }
        }));
    };
    EditServiceRecordComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, i;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        _a.service = _l.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierType')];
                    case 2:
                        _b.SupplierType = _l.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplier')];
                    case 3:
                        _c.Supplier = _l.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetAmenity')];
                    case 4:
                        _d.caAmenity = _l.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetContractType')];
                    case 5:
                        _e.caContractType = _l.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertyTypeHousing')];
                    case 6:
                        _f.caPropertyTypeHousing = _l.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 7:
                        _g.caCurrency = _l.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSize')];
                    case 8:
                        _h.caSize = _l.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetMetric')];
                    case 9:
                        _j.caMetric = _l.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTypeService')];
                    case 10:
                        _k.line_service = _l.sent();
                        for (i = 0; i < 11; i++) {
                            this.caNumbers.push(i);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditServiceRecordComponent.prototype.detailsReport = function (element) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_report_day_component_1.DialogReportDayComponent, {
            data: {
                sr: this.SO_ID,
                id: element.id
            }, width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getReport();
            _this.getSupplier();
        });
    };
    EditServiceRecordComponent.prototype.showExportDialog = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_export_component_1.DialogExportComponent, {
            data: "",
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                document.getElementById("excel").click();
            }
            if (result === 2) {
                var tabla = [['Date', 'Service Line', 'Work Order', 'Program', 'Services', 'Report By', 'Time Used']];
                for (var i = 0; i < _this.dataSourceReport.filteredData.length; i++) {
                    var element = _this.dataSourceReport.filteredData[i];
                    tabla.push([
                        _this.formatDate(element.creationDate), element.serviceLine,
                        element.numberWorkOrder, '', element.services,
                        element.reprortedBy, element.totalTime
                    ]);
                }
                console.log(tabla);
                // Set the fonts to use
                pdfmake_wrapper_1.PdfMakeWrapper.setFonts(vfs_fonts_1["default"]);
                var pdf = new pdfmake_wrapper_1.PdfMakeWrapper();
                pdf.pageMargins([30, 30, 30, 30]);
                pdf.pageOrientation('portrait');
                pdf.defaultStyle({
                    fontSize: 10,
                    alignment: 'center'
                });
                pdf.add(new pdfmake_wrapper_1.Table(tabla).layout('lightHorizontalLines').end);
                pdf.create().download('Activity Reports.pdf');
            }
        });
    };
    EditServiceRecordComponent.prototype.formatDate = function (fecha) {
        var date = new Date(fecha);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var montstring = "";
        switch (month) {
            case 1:
                montstring = "Ene";
                break;
            case 2:
                montstring = "Feb";
                break;
            case 3:
                montstring = "Mar";
                break;
            case 4:
                montstring = "Abr";
                break;
            case 5:
                montstring = "May";
                break;
            case 6:
                montstring = "Jun";
                break;
            case 7:
                montstring = "Jul";
                break;
            case 8:
                montstring = "Ago";
                break;
            case 9:
                montstring = "Sep";
                break;
            case 10:
                montstring = "Oct";
                break;
            case 11:
                montstring = "Nov";
                break;
            case 12:
                montstring = "Dic";
                break;
            default:
                break;
        }
        return day + " " + montstring + " " + year;
    };
    EditServiceRecordComponent.prototype.table_supplier = function (data) {
        this.supplier_table = data;
    };
    EditServiceRecordComponent.prototype.initFilterImmRelTableSettings = function (tab_selected) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.fixed_params = "ServiceRecord/GetServices/" + this.SO_ID + "?type=" + tab_selected;
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 1:
                        _a.line_status = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetCataegoryByServiceLineId/?serviceLineId=" + tab_selected)];
                    case 2:
                        _b.line_category = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTypeService')];
                    case 3:
                        _c.line_service = _d.sent();
                        this._services.service_general_get("ServiceRecord/GetApplicant/" + this.edit_sr_model.id)
                            .subscribe(function (response) {
                            if (response.success) {
                                _this.line_deliver = response.applicant.value;
                            }
                        }, function (error) {
                            console.error('Error (GetApplicant) => ', error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    EditServiceRecordComponent.prototype.findingImmRelTables = function (kind_section, tab_section) {
        if (tab_section === void 0) { tab_section = 1; }
        var params_to_send = kind_section == 1 ?
            this.dinamic_params_homm : this.dinamic_params_host;
        var params = '';
        for (var field in params_to_send) {
            if (params_to_send[field] != '') {
                params += "&" + field + "=" + params_to_send[field];
            }
        }
        this.updateTableRelImmByRequest(this.fixed_params + params, kind_section, tab_section);
    };
    EditServiceRecordComponent.prototype.updateTableRelImmByRequest = function (params, section_in, tab_selected) {
        var _this = this;
        this._services.service_general_get(params)
            .subscribe(function (response) {
            if (tab_selected == 1) {
                if (section_in == 1) {
                    _this.home_contry = new table_1.MatTableDataSource(response.map.value.home);
                    _this.home_contry.paginator = _this.paginator;
                }
                else if (section_in == 2) {
                    _this.host_contry = new table_1.MatTableDataSource(response.map.value.host);
                    _this.host_contry.paginator = _this.paginator;
                }
            }
            else if (tab_selected == 2) {
                if (section_in == 1) {
                    _this.relocation_home_services = response.map.value.home;
                }
                else if (section_in == 2) {
                    _this.relocation_host_services = response.map.value.host;
                }
            }
        }, function (error) {
            console.error('Error (updateTableRelImmByRequest) => ', error);
        });
    };
    EditServiceRecordComponent.prototype.crearfilter = function (section) {
        var _this = this;
        if (section == 1) {
            this.dinamic_params_homm.program = null;
            this.dinamic_params_homm.serviceType = null;
            this.dinamic_params_homm.status = null;
            this.dinamic_params_homm.deliverTo = null;
            this.filteruno = true;
            setTimeout(function () {
                _this.filteruno = false;
            }, 2000);
            this.findingImmRelTables(section);
        }
        else if (section == 2) {
            this.dinamic_params_host.program = null;
            this.dinamic_params_host.serviceType = null;
            this.dinamic_params_host.status = null;
            this.dinamic_params_host.deliverTo = null;
            this.filterdos = true;
            setTimeout(function () {
                _this.filterdos = false;
            }, 2000);
            this.findingImmRelTables(section);
        }
        else if (section == 3) {
            this.dinamic_params_homm.program = null;
            this.dinamic_params_homm.serviceType = null;
            this.dinamic_params_homm.status = null;
            this.dinamic_params_homm.deliverTo = null;
            this.filteruno = true;
            setTimeout(function () {
                _this.filteruno = false;
            }, 2000);
            this.findingImmRelTables(1, 2);
        }
        else if (section == 4) {
            this.dinamic_params_host.program = null;
            this.dinamic_params_host.serviceType = null;
            this.dinamic_params_host.status = null;
            this.dinamic_params_host.deliverTo = null;
            this.filterdos = true;
            setTimeout(function () {
                _this.filterdos = false;
            }, 2000);
            this.findingImmRelTables(2, 2);
        }
    };
    EditServiceRecordComponent.prototype.goToPage = function (the_page) {
        if (the_page === void 0) { the_page = ''; }
        this._router.navigateByUrl(the_page + this.SO_ID);
    };
    EditServiceRecordComponent.prototype.movePageTo = function () {
        window.scrollTo(0, 0);
    };
    EditServiceRecordComponent.prototype.dateWorker = function (date) {
        var result = '';
        if (date != null) {
            var date_to_work = date, date_remove_time = date_to_work.split('T')[0];
            result = date_remove_time;
        }
        else {
            result = 'No Date';
        }
        return result;
    };
    EditServiceRecordComponent.prototype.editInfoToggleInputs = function () {
        !this.editing_info ?
            this.editing_info = true :
            this.editing_info = false;
    };
    EditServiceRecordComponent.prototype.removeErrorLabel = function (input_value, object_data) {
        if (input_value == "" || input_value == null) {
            object_data.handler[object_data.field] = true;
        }
        else {
            object_data.handler[object_data.field] = false;
        }
    };
    EditServiceRecordComponent.prototype.calculateHowOld = function () {
        var my_bd = this.edit_sr_model.assigneeInformations[0].birth;
        if (my_bd != null || my_bd != '') {
            var date_init = new Date(my_bd.getFullYear(), my_bd.getMonth(), my_bd.getDate()), date_today = new Date();
            var diff = (date_init.getTime() - date_today.getTime()) / 1000;
            diff /= (60 * 60 * 24);
            this.edit_sr_model.assigneeInformations[0].age = Math.abs(Math.round(diff / 365.25));
        }
        else {
            this.edit_sr_model.assigneeInformations[0].age = null;
        }
    };
    EditServiceRecordComponent.prototype.validateEmail = function (email_in) {
        var result = true;
        var validating_email = this.emailPattern.test(email_in);
        if (!validating_email)
            result = false;
        return result;
    };
    EditServiceRecordComponent.prototype.validateEmailServerAvailability = function (mail) {
        var _this = this;
        if (mail != '') {
            this._services.service_general_get("User/VeryfyEmail?email=" + mail)
                .subscribe(function (response) {
                console.log('Res => ', response);
                if (_this.current_email != response.result) {
                    if (!response.success) {
                        _this.showGeneralMessageDialog('Email already exists', 'The email already exists, perhaps it has been used in any Service Record.');
                        _this.edit_sr_model.assigneeInformations[0].email = '';
                    }
                }
            }, function (error) {
                console.error('Error (User/VeryfyEmail) => ', error);
            });
        }
    };
    EditServiceRecordComponent.prototype.calculateHowOldDina = function (to_who, value_input, native_input) {
        if (native_input === void 0) { native_input = true; }
        value_input = value_input.target.value;
        var field_age_group = document.getElementById(to_who);
        if (value_input != null)
            field_age_group.value = getYears(value_input);
        else
            field_age_group.value = null;
        function getYears(date_in) {
            var date_init = new Date(date_in.getFullYear(), date_in.getMonth(), date_in.getDate()), date_today = new Date();
            var diff = (date_init.getTime() - date_today.getTime()) / 1000;
            diff /= (60 * 60 * 24);
            return Math.abs(Math.round(diff / 365.25));
        }
    };
    EditServiceRecordComponent.prototype.previewSelectedPhoto = function (event, field_to_display, section) {
        if (section === void 0) { section = ''; }
        this.no_main_photo = false;
        var field_photo = document.getElementById(field_to_display), event_data = event.target.files[0], dependent_index = field_to_display.split('_')[3], root = this;
        if (event_data.type == 'image/png' || event_data.type == 'image/jpg' || event_data.type == 'image/jpeg') {
            var reader = new FileReader();
            reader.onload = function (e) {
                var base64 = e.target.result;
                switch (section) {
                    case 'dependent':
                        root.assign_dependents[dependent_index].photo = base64.split(',')[1];
                        root.assign_dependents[dependent_index].PhotoExtension = event_data.name.split('.')[1];
                        break;
                    case 'pet':
                        root.pets[dependent_index].photo = base64.split(',')[1];
                        root.pets[dependent_index].PhotoExtension = event_data.name.split('.')[1];
                        break;
                    case 'profile':
                        root.edit_sr_model.assigneeInformations[0].photo = base64.split(',')[1];
                        root.edit_sr_model.assigneeInformations[0].PhotoExtension = event_data.name.split('.')[1];
                        break;
                }
                setTimeout(function () { return field_photo.setAttribute('src', base64); }, 333);
            };
            reader.readAsDataURL(event_data);
        }
    };
    EditServiceRecordComponent.prototype.removeErrorDinamic = function (input_value, id_label) {
        var get_input_label = document.getElementById(id_label);
        if (input_value == '' || input_value == null || input_value == undefined) {
            get_input_label.classList.remove('display-none');
        }
        else {
            get_input_label.classList.add('display-none');
        }
    };
    EditServiceRecordComponent.prototype.validEmailHiringManager = function (email) {
        !this.validateEmail(email) ?
            this.assign_form_validator.no_hmai_val = true :
            this.assign_form_validator.no_hmai_val = false;
    };
    EditServiceRecordComponent.prototype.validEmailAssignee = function (email) {
        !this.validateEmail(email) ?
            this.fass_validator.no_emai_val = true :
            this.fass_validator.no_emai_val = false;
    };
    EditServiceRecordComponent.prototype.showRelocationSupForm = function () {
        !this.show_relocation_form ?
            this.show_relocation_form = true :
            this.show_relocation_form = false;
    };
    EditServiceRecordComponent.prototype.showChatSelected = function (tab, event_data) {
        var chat_window = document.getElementsByClassName('chat_window'), chat_selected = document.getElementById(tab), chat_tab = document.getElementsByClassName('chat-tab');
        for (var window = chat_window.length; window--;) {
            chat_window[window].classList.add('display-none');
            chat_tab[window].classList.remove('page__section-tab--active');
        }
        chat_selected.classList.remove('display-none');
        event_data.classList.add('page__section-tab--active');
    };
    EditServiceRecordComponent.prototype.showCallsTabSelected = function (tab, event_data) {
        var call_window = document.getElementsByClassName('call_window'), call_selected = document.getElementById(tab), call_tab = document.getElementsByClassName('call-tab');
        for (var window = call_window.length; window--;) {
            call_window[window].classList.add('display-none');
            call_tab[window].classList.remove('page__section-tab--active');
        }
        call_selected.classList.remove('display-none');
        event_data.classList.add('page__section-tab--active');
    };
    EditServiceRecordComponent.prototype.showEmailsTabSelected = function (tab, event_data) {
        var call_window = document.getElementsByClassName('email_window'), call_selected = document.getElementById(tab), call_tab = document.getElementsByClassName('email-tab');
        for (var window = call_window.length; window--;) {
            call_window[window].classList.add('display-none');
            call_tab[window].classList.remove('page__section-tab--active');
        }
        call_selected.classList.remove('display-none');
        event_data.classList.add('page__section-tab--active');
    };
    EditServiceRecordComponent.prototype.showMapsTabSelected = function (tab, event_data) {
        var element_window = document.getElementsByClassName('map_window'), element_selected = document.getElementById(tab), element_tab = document.getElementsByClassName('map-tab');
        for (var window = element_window.length; window--;) {
            element_window[window].classList.add('display-none');
            element_tab[window].classList.remove('page__section-tab--active');
        }
        element_selected.classList.remove('display-none');
        event_data.classList.add('page__section-tab--active');
    };
    EditServiceRecordComponent.prototype.showTaskTabSelected = function (tab, event_data) {
        var element_window = document.getElementsByClassName('task_window'), element_selected = document.getElementById(tab), element_tab = document.getElementsByClassName('task-tab');
        for (var window = element_window.length; window--;) {
            element_window[window].classList.add('display-none');
            element_tab[window].classList.remove('page__section-tab--active');
        }
        element_selected.classList.remove('display-none');
        event_data.classList.add('page__section-tab--active');
    };
    EditServiceRecordComponent.prototype.showEscalationsTabSelected = function (tab, event_data) {
        var element_window = document.getElementsByClassName('escalation_window'), element_selected = document.getElementById(tab), element_tab = document.getElementsByClassName('escalation-tab');
        for (var window = element_window.length; window--;) {
            element_window[window].classList.add('display-none');
            element_tab[window].classList.remove('page__section-tab--active');
        }
        element_selected.classList.remove('display-none');
        event_data.classList.add('page__section-tab--active');
    };
    EditServiceRecordComponent.prototype.toggleFileTextChat = function () {
        !this.show_file_section ?
            this.show_file_section = true :
            this.show_file_section = false;
    };
    EditServiceRecordComponent.prototype.initChatBehavior = function (type) {
        var _this = this;
        if (type === void 0) { type = 1; }
        this.serviceline_conversation = type;
        var so_and_type = "?Service_record_id=" + this.SO_ID + "&type=" + this.serviceline_conversation;
        this._services.service_general_get("ChatImmigrationRelocation/GetConversation" + so_and_type)
            .subscribe(function (response) {
            if (response.success) {
                var chats_in = response.result.value;
                _this.chat_conversations = chats_in;
                if (chats_in.length == 0) {
                    _this.first_conversation = true;
                }
                else {
                    _this.first_conversation = false;
                }
                _this.chatWindowPosition();
                _this.chat_model.comment = '';
                _this.chat_model.chatDocumentImmigrationRelocations = [];
                console.log('[CP2294] Chats in res ===> ', response);
            }
        }, function (error) {
            console.error('ChatImmigrationRelocation/GetConversation => ', error);
        });
    };
    EditServiceRecordComponent.prototype.continueChatConversation = function () {
        var _this = this;
        this.chat_model.dateComment = new Date();
        this.chat_model.userId = this.USERDATA.id;
        this.chat_model.chatCoversationId = this.chat_conversations[0].conversationId;
        var chat_data = [this.chat_model];
        if (this.chat_model.comment.length != 0) {
            console.log('[CP2338] Continu Chat send ===> ', chat_data);
            this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateComment', chat_data)
                .subscribe(function (response) {
                console.log('Res (ChatImmigrationRelocation/CreateComment) => ', response);
                if (response.success) {
                    _this.chat_model.comment = '';
                    _this.chat_model.chatDocumentImmigrationRelocations = [];
                    _this.initChatBehavior(_this.serviceline_conversation);
                }
            }, function (error) {
                console.error('Error (ChatImmigrationRelocation/CreateComment) ==> ', error);
            });
        }
    };
    EditServiceRecordComponent.prototype.newChatConversation = function () {
        var _this = this;
        this.chat_model.dateComment = new Date();
        this.chat_model.userId = this.USERDATA.id;
        this.new_chat.createdDate = new Date();
        this.new_chat.createdBy = this.USERDATA.id;
        this.new_chat.serviceLineId = this.serviceline_conversation;
        this.new_chat.serviceRecordId = this.edit_sr_model.id;
        this.new_chat.chatImmigrationRelocations[0] = this.chat_model;
        var chat_data = [this.new_chat];
        if (this.chat_model.comment.length != 0) {
            this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateConversation', chat_data)
                .subscribe(function (response) {
                console.log('Res [CP2351] (ChatImmigrationRelocation/CreateConversation) => ', response);
                console.log('Data sent => ', chat_data);
                if (response.success) {
                    _this.chat_model.comment = '';
                    _this.initChatBehavior(_this.serviceline_conversation);
                }
            }, function (error) {
                console.log('Error (ChatImmigrationRelocation/CreateConversation) => ', error);
            });
        }
    };
    EditServiceRecordComponent.prototype.getChatDateFormat = function (date_in) {
        var result = '';
        var date_split = date_in.split('T'), hour_split = date_split[1].split(':');
        result = date_split[0] + " " + hour_split[0] + ":" + hour_split[1];
        return result;
    };
    EditServiceRecordComponent.prototype.chatImageSrcStyle = function (src_path) {
        var result = '';
        var kind_of_file = src_path.split('.')[1];
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
    };
    EditServiceRecordComponent.prototype.chatWindowPosition = function () {
        var _this = this;
        var chat_window = document.getElementsByClassName('chat__chat');
        setTimeout(function () {
            _this.serviceline_conversation == 1 ?
                chat_window[0].scrollTo(0, chat_window[0].scrollHeight) :
                chat_window[1].scrollTo(0, chat_window[1].scrollHeight);
        }, 200);
    };
    EditServiceRecordComponent.prototype.openCountryDialog = function () {
        var add_call_dialog = this._dialog.open(dialog_slider_component_1.DialogSliderComponent, {
            data: {
                id_so: this.edit_sr_model.id
            },
            width: "95%"
        });
    };
    EditServiceRecordComponent.prototype.initCallsBehavior = function (calls_sl) {
        var _this = this;
        this.calls_serviceline = calls_sl;
        var params = "?Service_record_id=" + this.edit_sr_model.id + "&service_line_id=" + this.calls_serviceline;
        this._services.service_general_get("Call/GetCallByServiceRecord" + params)
            .subscribe(function (response) {
            console.log('The calls ==> ', response, 'Call/GetCallByServiceRecord' + params);
            if (response.success) {
                switch (calls_sl) {
                    case 1:
                        _this.calls_in_list_rel = new table_1.MatTableDataSource(response.result);
                        _this.calls_in_list_rel.paginator = _this.paginator;
                        break;
                    case 2:
                        _this.calls_in_list_imm = new table_1.MatTableDataSource(response.result);
                        _this.calls_in_list_imm.paginator = _this.paginator;
                        break;
                }
            }
        }, function (error) {
            console.error();
        });
    };
    EditServiceRecordComponent.prototype.initEmailsBehavior = function (service_line) {
        var _this = this;
        if (service_line === void 0) { service_line = 1; }
        var params = "?service_line_id=" + service_line + "&service_record_id=" + this.edit_sr_model.id;
        this._services.service_general_get("EmailSend/GetEmail" + params)
            .subscribe(function (response) {
            if (response.success) {
                console.log('Aqui =======> ', response);
                switch (service_line) {
                    case 1:
                        _this.emails_rel_list = response.result.value;
                        break;
                    case 2:
                        _this.emails_imm_list = response.result.value;
                        break;
                }
            }
        }, function (error) {
            console.log('Error (EmailSend/GetEmail) => ', error);
        });
    };
    EditServiceRecordComponent.prototype.sendCommEmail = function (service_line, mail_data) {
        var _this = this;
        var params = "?email=" + this.USERDATA.email + "&username=" + this.USERDATA.name + this.USERDATA.lastName;
        this.sent_this_email.serviceLineId = service_line;
        this.sent_this_email.serviceRecordId = this.edit_sr_model.id;
        this.sent_this_email.emailId = mail_data.id;
        this.sent_this_email.completed = mail_data.completed;
        this.__loader__.showLoader();
        this._services.service_general_post_with_url("EmailSend/EmailSend" + params, this.sent_this_email)
            .subscribe(function (response) {
            if (response.success) {
                _this.initEmailsBehavior();
                _this.__loader__.hideLoader();
                _this.showGeneralMessageDialog('Email Sent', 'Email has been sent successfully.');
            }
        }, function (error) {
            console.log('Error (EmailSend/EmailSend) => ', error);
        });
    };
    EditServiceRecordComponent.prototype.initTasksBehavior = function (service_line) {
        var _this = this;
        if (service_line === void 0) { service_line = 1; }
        var params = "?service_record_id=" + this.edit_sr_model.id + "&service_line_id=" + service_line;
        console.log('Consultando en ===> ', "Task/GetAllTask" + params);
        this._services.service_general_get("Task/GetAllTask" + params)
            .subscribe(function (response) {
            console.log('Res ===> ', response);
            if (response.success) {
                switch (service_line) {
                    case 1:
                        _this.task_rel_table = response.result.value;
                        console.log('this.task_rel_table ==> ', _this.task_rel_table);
                        break;
                    case 2:
                        _this.task_imm_table = response.result.value;
                        console.log('this.task_imm_table ==> ', _this.task_imm_table);
                        break;
                }
            }
        }, function (error) {
            console.error('Error (Task/GetAllTask) ==> ', error);
        });
    };
    EditServiceRecordComponent.prototype.initAssFeedbackBehavior = function () {
        this.feedbackPaginator();
    };
    EditServiceRecordComponent.prototype.feedbackPaginator = function () {
        var _this = this;
        this.cofb_table_paginator.initNewPaginator('feedback-paginator', 'AssigneeFeedback/GetAssigneeFeedback');
        setTimeout(function () {
            _this.feedback_items = _this.cofb_table_paginator.paginatorRequest().result.value;
        }, 777);
    };
    EditServiceRecordComponent.prototype.getFeedbackstarts = function (how_many) {
        var total = [];
        for (var x = 0; x < how_many; x += 1) {
            total.push(x);
        }
        return total;
    };
    EditServiceRecordComponent.prototype.getFeedbackstartsGrays = function (how_many) {
        var total = [], how_many_grays = 5 - how_many;
        for (var x = 0; x < how_many_grays; x += 1) {
            total.push(x);
        }
        return total;
    };
    EditServiceRecordComponent.prototype.initMapitBehavior = function () {
        this.requestMapitsData(this.mapit_sl_id);
    };
    EditServiceRecordComponent.prototype.requestMapitsData = function (service_line) {
        var _this = this;
        this.mapit_sl_id = service_line;
        this._services.service_general_get("MapIt/GetMapIt?ServiceLineId=" + this.mapit_sl_id + "&service_record_id=" + this.edit_sr_model.id)
            .subscribe(function (response) {
            if (response.success) {
                _this.mapit_data_gotted = response.result.value;
                _this.mapit_table_data = new table_1.MatTableDataSource(_this.mapit_data_gotted);
                _this.mapit_table_data.paginator = _this.pagMaps;
            }
        }, function (error) {
            console.error('Error (GetMapItById) => ', error);
        });
    };
    EditServiceRecordComponent.prototype.initEscalationBehavoir = function () {
        this.requestEscalations(this.escalation_line);
    };
    EditServiceRecordComponent.prototype.requestEscalations = function (service_line) {
        var _this = this;
        console.log('URL paps ==========> ', "Scalate/GetEscalationCommunication?ServiceLineId=" + service_line);
        this._services.service_general_get("Scalate/GetEscalationCommunication?ServiceLineId=" + service_line + "&sr=" + this.edit_sr_model.id)
            .subscribe(function (response) {
            if (response.success) {
                _this.escalation_data = response.result.value;
                _this.escalation_table_data = new table_1.MatTableDataSource(_this.escalation_data);
                console.log('Scalate/GetEscalationCommunication ==> ', response);
            }
        }, function (error) {
            console.error('Error (Scalate/GetEscalationCommunication) => ', error);
        });
    };
    EditServiceRecordComponent.prototype.communicationAddCall = function (data_serviceLine) {
        var _this = this;
        console.log('More data ==> ', this.edit_sr_model);
        var add_call_dialog = this._dialog.open(addCall_component_1.DialogAddCall, {
            data: {
                id_so: this.edit_sr_model.id,
                serviceLineId: data_serviceLine
            },
            width: "95%"
        });
        add_call_dialog.afterClosed().subscribe(function (result) {
            _this.initCallsBehavior(_this.calls_serviceline);
        });
    };
    EditServiceRecordComponent.prototype.editCall = function (data) {
        var _this = this;
        console.log('More data ==> ', this.edit_sr_model);
        var add_call_dialog = this._dialog.open(dialog_edit_call_component_1.DialogEditCallComponent, {
            data: data,
            width: "95%"
        });
        add_call_dialog.afterClosed().subscribe(function (result) {
            _this.initCallsBehavior(_this.calls_serviceline);
        });
    };
    EditServiceRecordComponent.prototype.communicationAddMapit = function (map_in) {
        var _this = this;
        if (map_in === void 0) { map_in = null; }
        var add_call_dialog = this._dialog.open(mapit_component_1.DialogMapit, {
            data: {
                id_so: this.edit_sr_model.id,
                map_data: map_in
            },
            width: "95%"
        });
        add_call_dialog.afterClosed().subscribe(function (result) {
            _this.initMapitBehavior();
        });
    };
    EditServiceRecordComponent.prototype.communicationAddTask = function (service_line) {
        var _this = this;
        var assing_task_dialog = this._dialog.open(assignTask_component_1.DialogAssignTask, {
            data: {
                id_so: this.edit_sr_model.id,
                service_line: service_line
            },
            width: "95%"
        });
        assing_task_dialog.afterClosed().subscribe(function (result) {
            _this.initTasksBehavior(service_line);
        });
    };
    EditServiceRecordComponent.prototype.communicationViewEscalation = function (escalation) {
        //debugger
        var add_call_dialog = this._dialog.open(viewEscalation_component_1.DialogViewEscalation, {
            data: {
                id_so: this.edit_sr_model.id,
                escalation: escalation
            },
            width: "95%"
        });
        add_call_dialog.afterClosed().subscribe(function (result) {
        });
    };
    EditServiceRecordComponent.prototype.getSelectedTaskData = function (id_element) {
        var _this = this;
        var params = "?id=" + id_element;
        this.__loader__.showLoader();
        this._services.service_general_get("Task/GetTaskById" + params)
            .subscribe(function (response) {
            _this.__loader__.hideLoader();
            if (response.success) {
                var assing_task_dialog = _this._dialog.open(editTask_component_1.DialogEditTask, {
                    data: {
                        id: id_element,
                        id_so: _this.edit_sr_model.id,
                        task_data: response,
                        url_request: "Task/GetTaskById" + params
                    },
                    width: "95%"
                });
                assing_task_dialog.afterClosed().subscribe(function (result) {
                    _this.initTasksBehavior();
                });
            }
        }, function (error) {
            _this.__loader__.hideLoader();
            console.error('Error (Task/GetTaskById) => ', error);
        });
    };
    /* Reports Section: Functions and variables */
    EditServiceRecordComponent.prototype.downloadDocumentSelected = function (file) {
        window.open("" + this.image_path + file, '_blank');
    };
    EditServiceRecordComponent.prototype.splitTimeInDate = function (date_in) {
        return date_in.split('T')[0];
    };
    EditServiceRecordComponent.prototype.autoClickTab = function (section_name) {
        var selector_to_click = document.querySelector(section_name);
        selector_to_click.click();
    };
    EditServiceRecordComponent.prototype.dropped = function (files) {
        var _this = this;
        this.files = files;
        var root = this;
        var _loop_1 = function (droppedFile) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry_1 = droppedFile.fileEntry;
                var reader_1 = new FileReader();
                fileEntry_1.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, _this.files);
                    fileEntry_1.file(function (file) {
                        reader_1.readAsDataURL(file);
                        reader_1.onload = function () {
                            var base64_gotted = reader_1.result;
                            _this.chat_document.fileExtension = file.name.split('.')[1];
                            _this.chat_document.filePath = base64_gotted.split(',')[1];
                            _this.chat_model.chatDocumentImmigrationRelocations.push(_this.chat_document);
                            _this.chat_model.comment = file.name;
                            if (_this.serviceline_conversation == 1) {
                                _this.continueChatConversation();
                            }
                            else {
                                _this.newChatConversation();
                            }
                            _this.toggleFileTextChat();
                        };
                    });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                //console.log(droppedFile.relativePath, fileEntry);
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
    };
    EditServiceRecordComponent.prototype.fileOver = function (event) {
        //console.log(event);
    };
    EditServiceRecordComponent.prototype.fileLeave = function (event) {
        //console.log(event);
    };
    EditServiceRecordComponent.prototype.complete = function () {
        var dialogRef = this._dialog.open(dialog_complete_component_1.DialogCompleteComponent, {
            data: {
                sr: this.SO_ID,
                id: this.edit_sr_model.id,
                user_id: this.USERDATA.id,
                status: this.edit_sr_model
            }, width: "45%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    EditServiceRecordComponent.prototype.addActivityReport = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_report_day_component_1.DialogReportDayComponent, {
            data: {
                sr: this.SO_ID,
                id: 0
            }, width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getReport();
            _this.getSupplier();
            _this.ngOnInit();
        });
    };
    EditServiceRecordComponent.prototype.addRequestAddicionalTime = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_request_additional_time_component_1.DialogRequestAdditionalTimeComponent, {
            data: {
                sr: this.SO_ID,
                id: 0
            }, width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getReport();
        });
    };
    EditServiceRecordComponent.prototype.getMaxDateTo = function (years_ago) {
        if (years_ago === void 0) { years_ago = 18; }
        var today = new Date(), today_year = today.getFullYear(), today_month = today.getMonth(), today_day = today.getDate(), new_min_date = new Date(today_year - years_ago, today_month, today_day);
        return new_min_date;
    };
    /* Test Stuff ==================================================> */
    EditServiceRecordComponent.prototype.accepDeclineImmigrationCoordinator = function (status) {
        var _this = this;
        if (status === void 0) { status = true; }
        var coordinator = this.edit_sr_model.immigrationCoodinators[0];
        console.log('Imm ==> ', this.edit_sr_model.immigrationCoodinators[0]);
        console.log('Status => ', status);
        this._services.service_general_put("ServiceRecord/AcceptImmigrationCoordinator/" + coordinator.id + "/" + status, {})
            .subscribe(function (response) {
            console.log('Res ====> ', response);
            var text = '';
            status ? text = 'Coordinator has been accepted' : text = 'Coordinator has been decline';
            _this.showGeneralMessageDialog('Coordinator', text);
        }, function (error) {
            console.error('Error => ', error);
        });
    };
    EditServiceRecordComponent.prototype.acceptDeclineImmSupplier = function (element, status) {
        var _this = this;
        if (status === void 0) { status = true; }
        console.log('Eleme Imm => ', element);
        this._services.service_general_put("ServiceRecord/AcceptImmigrationSupplierPartner/" + element.id + "/" + status, {})
            .subscribe(function (response) {
            console.log('Res ===> ', response);
            var text = '';
            status ? text = 'Supplier has been accepted' : text = 'Supplier has been decline';
            _this.showGeneralMessageDialog('Supplier', text);
        }, function (error) {
            console.error('Error => ', error);
        });
    };
    EditServiceRecordComponent.prototype.accepDeclineRelCoordinator = function (status) {
        var _this = this;
        if (status === void 0) { status = true; }
        var coordinator = this.edit_sr_model.relocationCoordinators[0];
        console.log('Rel => ', coordinator);
        console.log('Status => ', status);
        this._services.service_general_put("ServiceRecord/AcceptRelocationCoordinator/" + coordinator.id + "/" + status, {})
            .subscribe(function (response) {
            console.log('Res => ', response);
            var text = '';
            status ? text = 'Coordinator has been accepted' : text = 'Coordinator has been decline';
            _this.showGeneralMessageDialog('Coordinator', text);
        }, function (error) {
            console.error('Error => ', error);
        });
    };
    EditServiceRecordComponent.prototype.acceptDeclineRelSupplier = function (element, status) {
        var _this = this;
        if (status === void 0) { status = true; }
        console.log('Eleme Rel => ', element);
        this._services.service_general_put("ServiceRecord/AcceptRelocationSupplierPartner/" + element.id + "/" + status, {})
            .subscribe(function (response) {
            console.log('Res ===> ', response);
            var text = '';
            status ? text = 'Supplier has been accepted' : text = 'Supplier has been decline';
            _this.showGeneralMessageDialog('Supplier', text);
        }, function (error) {
            console.error('Error => ', error);
        });
    };
    EditServiceRecordComponent.prototype.openRequestPayment = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent, {
            data: { sr: this.SO_ID, id: 0 },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_request();
        });
    };
    EditServiceRecordComponent.prototype.openRequestPaymentedit = function (element) {
        var _this = this;
        console.log(element);
        var dialogRef = this._dialog.open(dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent, {
            data: { sr: this.SO_ID, id: element.id },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_request();
        });
    };
    EditServiceRecordComponent.prototype.addCoordinador = function () {
        this.new_coordinator.push({
            "id": 0,
            "coordinatorTypeId": 0,
            "coordinatorId": 0,
            "assigned": null,
            "accepted": null,
            "serviceRecordId": Number(this.SO_ID),
            "statusId": 0,
            "createdBy": this.USERDATA.id,
            "createdDate": new Date(),
            "updateBy": this.USERDATA.id,
            "updatedDate": new Date()
        });
        console.log("Data nuevo coordinador: ", this.new_coordinator);
    };
    EditServiceRecordComponent.prototype.addToEditModel = function () {
        if (this.new_coordinator.length > 0) {
            for (var i = 0; i < this.new_coordinator.length; i++) {
                this.edit_sr_model.immigrationCoodinators.push(this.new_coordinator[i]);
            }
            this.new_coordinator = [];
        }
    };
    EditServiceRecordComponent.prototype.addToEditModelRel = function () {
        if (this.new_coordinator.length > 0) {
            for (var i = 0; i < this.new_coordinator.length; i++) {
                this.edit_sr_model.relocationCoordinators.push(this.new_coordinator[i]);
            }
            this.new_coordinator = [];
        }
    };
    EditServiceRecordComponent.prototype.deleteCoordinador = function (i) {
        this.new_coordinator.splice(i, 1);
    };
    EditServiceRecordComponent.prototype.getNameCoordinator = function (id) {
        for (var i = 0; i < this.coordinator_catalogue.length; i++) {
            if (this.coordinator_catalogue[i].id == id) {
                return this.coordinator_catalogue[i].coordinator;
            }
        }
        return '';
    };
    EditServiceRecordComponent.prototype.getTypeCoordinator = function (id) {
        for (var i = 0; i < this.coordinatortype_catalogue.length; i++) {
            if (this.coordinatortype_catalogue[i].id == id) {
                return this.coordinatortype_catalogue[i].coordinatorType;
            }
        }
        return '';
    };
    EditServiceRecordComponent.prototype.getEmail = function () {
        var _this = this;
        this._services.service_general_get('Email/ServiceRecord?user=' + this.USERDATA.id + '&sr=' + this.SO_ID).subscribe(function (response) {
            if (response.success) {
                _this.email_services = response.result.value;
                _this.email_relocation = _this.email_services.relocation;
                _this.email_immigration = _this.email_services.immigration;
                console.log(_this.email_services);
            }
        });
    };
    EditServiceRecordComponent.prototype.postEmail = function (serviceLine, data) {
        var _this = this;
        if (data.nickName == "Send App Access") {
            this.sendAccess();
            return true;
        }
        var json = {
            "id": 0,
            "serviceRecordId": this.SO_ID,
            "serviceLine": serviceLine,
            "emailId": data.email.id,
            "date": new Date(),
            "completed": true,
            "createdBy": this.USERDATA.id,
            "creationDate": new Date(),
            "updatedBy": this.USERDATA.id,
            "updatedDate": new Date()
        };
        console.log(json);
        console.log(JSON.stringify(json));
        this._services.service_general_post_with_url('Email/SendEmail', json).subscribe(function (response) {
            if (response.success) {
                console.log(response);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Email was send"
                    },
                    width: "350px"
                });
            }
        });
    };
    EditServiceRecordComponent.prototype.sendAccess = function () {
        var _this = this;
        this._services.service_general_put('Email/SendAppAccess?user=' + this.USERDATA.id, '').subscribe(function (response) {
            if (response.success) {
                console.log(response);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Email was send"
                    },
                    width: "350px"
                });
            }
        });
    };
    EditServiceRecordComponent.prototype.viewReportHistory = function () {
        this._router.navigate(['/viewAllReport/' + this.SO_ID]);
    };
    EditServiceRecordComponent.prototype.openmodal = function (data, home_host, country) {
        console.log("Entra a abrir modal de detalle del servicio");
        data.partnerId = this.edit_sr_model.partnerId;
        data.numberServiceRecord = this.edit_sr_model.numberServiceRecord;
        data.sr = this.SO_ID;
        if (home_host == 2) {
            data.country_city = {
                home_contry_name: this.Host_Home_country.host_country_name,
                country_id: this.Host_Home_country.host_country,
                home_city_name: this.Host_Home_country.hostCity_name,
                city_id: this.Host_Home_country.hostCity_Id
            };
        }
        else {
            data.country_city = {
                home_contry_name: this.Host_Home_country.home_country_name,
                country_id: this.Host_Home_country.home_country,
                home_city_name: this.Host_Home_country.homeCity_name,
                city_id: this.Host_Home_country.homeCity_Id
            };
        }
        data.home_host = country;
        data.sr = this.SO_ID;
        data.program = data.serviceType;
        data.wo = data.workOrderId;
        var dialogRef = this._dialog.open(dialog_bundle_component_1.DialogBundleComponent, {
            width: "95%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    EditServiceRecordComponent.prototype.InHold = function () {
        var _this = this;
        console.log("Boton in hold");
        var services = JSON.parse(localStorage.getItem('serviceLine'));
        var immigration = 0;
        var relocation = 0;
        var sl = 1;
        console.log(services);
        services.forEach(function (E) {
            if (E.serviceLineId == 1) {
                immigration++;
            }
            if (E.serviceLineId == 2) {
                relocation++;
            }
        });
        if (immigration >= 1 && relocation >= 1) {
            console.log("ABRE MODAL PARA ELEGIR LA SERVICE LINE A CERRAR");
            var dialogRef = this._dialog.open(dialog_in_hold_component_1.DialogInHoldComponent, {
                width: "50%"
            });
            dialogRef.afterClosed().subscribe(function (result) {
                console.log("dialog in hold ", result);
                if (result.success) {
                    _this._services.service_general_put('ServiceRecord/OnHold/' + Number(_this.SO_ID) + '/' + Number(result.serviceLineID), '').subscribe((function (data) {
                        if (data.success) {
                            console.log("CAMBIO DE STATUS A IN HOLD: ", data);
                            _this.ngOnInit();
                        }
                    }));
                }
            });
        }
        if (immigration >= 1 && relocation == 0) {
            sl = 1;
            this._services.service_general_put('ServiceRecord/OnHold/' + Number(this.SO_ID) + '/' + Number(sl), '').subscribe((function (data) {
                if (data.success) {
                    console.log("CAMBIO DE STATUS A IN HOLD: ", data);
                    _this.ngOnInit();
                }
            }));
        }
        if (immigration == 0 && relocation >= 1) {
            sl = 2;
            this._services.service_general_put('ServiceRecord/OnHold/' + Number(this.SO_ID) + '/' + Number(sl), '').subscribe((function (data) {
                if (data.success) {
                    console.log("CAMBIO DE STATUS A IN HOLD: ", data);
                    _this.ngOnInit();
                }
            }));
        }
    };
    EditServiceRecordComponent.prototype.ngOnDestroy = function () {
        console.log("Entra a eliminar serviceline");
        localStorage.removeItem('serviceLine');
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], EditServiceRecordComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], EditServiceRecordComponent.prototype, "sortable");
    __decorate([
        core_1.ViewChild('firstTableSort')
    ], EditServiceRecordComponent.prototype, "firstTableSort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], EditServiceRecordComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], EditServiceRecordComponent.prototype, "SupplierPartnersRecord");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], EditServiceRecordComponent.prototype, "ActivityReports");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], EditServiceRecordComponent.prototype, "Appointment");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], EditServiceRecordComponent.prototype, "CommentHistory");
    __decorate([
        core_1.ViewChild('third')
    ], EditServiceRecordComponent.prototype, "third");
    __decorate([
        core_1.ViewChild('supplier_')
    ], EditServiceRecordComponent.prototype, "supplier_");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], EditServiceRecordComponent.prototype, "pagMaps");
    __decorate([
        core_1.ViewChild('supplierSI_')
    ], EditServiceRecordComponent.prototype, "supplierSI_");
    EditServiceRecordComponent = __decorate([
        core_1.Component({
            selector: 'edit-service-record-component',
            templateUrl: './editServiceRecord.component.html',
            styleUrls: ['./editServiceRecord.component.scss']
        })
    ], EditServiceRecordComponent);
    return EditServiceRecordComponent;
}());
exports.EditServiceRecordComponent = EditServiceRecordComponent;
var Departament = /** @class */ (function () {
    function Departament() {
        this.relationship = '';
        this.name = '';
        this.final_date = '';
        this.age = '';
        this.language = '';
        this.nationality = '';
        this.aditionalComments = '';
    }
    return Departament;
}());
var Pet = /** @class */ (function () {
    function Pet() {
        this.photo = '';
        this.pet_type = '';
        this.pet_name = '';
        this.breed = '';
        this.age = '';
        this.size = '';
        this.peso = '';
    }
    return Pet;
}());
var Coordinator = /** @class */ (function () {
    function Coordinator() {
        this.supplier_type = '';
        this.supplier_comp = '';
        this.supplier = '';
        this.date = '';
        this.services = '';
    }
    return Coordinator;
}());
var FilterData = /** @class */ (function () {
    function FilterData() {
        this.status = '';
        this.partner = '';
        this.client = '';
        this.country = '';
        this.city = '';
        this.vip = '';
        this.supplier = '';
    }
    return FilterData;
}());
var NewServiceRecordData = /** @class */ (function () {
    function NewServiceRecordData() {
        this.id = 0;
        this.office = '';
        this.initialAutho = '';
        this.numberServiceRecord = '';
        this.inithialAuthoAcceptance = '';
        this.partnerId = null;
        this.clientId = null;
        this.clientFileNumber = '';
        this.copyOnEmail = false;
        this.spoc = false;
        this.vip = false;
        this.confidentialMove = false;
        this.specialIntructions = '';
        this.assigneeInformationId = 0;
        this.assigneeInformations = [new AssigneeInformationModel()];
        this.immigrationCoodinators = [new immigrationCoodinators()];
        this.immigrationSupplierPartners = [];
        this.relocationCoordinators = [new relocationCoordinators()];
        this.relocationSupplierPartners = [];
        this.serviceOrders = [];
        this.follows = [];
        this.aqui_campo = [];
        this.authorizedByImmigration = '';
        this.authorizedByRelocation = '';
        this.copyOnEmailImmigration = false;
        this.copyOnEmailRelocation = false;
        this.spocImmigration = false;
        this.spocRelocation = false;
        this.statusId = 0;
        this.urgent = false;
    }
    return NewServiceRecordData;
}());
var AssigneeInformationModel = /** @class */ (function () {
    function AssigneeInformationModel() {
        this.id = 0;
        this.assigneeName = '';
        this.assigneeNameId = 0;
        this.sexId = "1";
        this.birth = '';
        this.age = null;
        this.nationalityId = null;
        this.maritalStatusId = null;
        this.mobilePhone = '';
        this.workPhone = '';
        this.policyTypeId = null;
        this.assignmentDuration = '';
        this.assignmentDurationTime = '0';
        this.initialArrival = '';
        this.finalMove = '';
        this.homeCountryId = null;
        this.homeCityId = null;
        this.currentPosition = '';
        this.hostCountry = null;
        this.hostCityId = null;
        this.newPosition = '';
        this.dependentInformation = null;
        this.pets = null;
        this.email = '';
        this.photo = '';
        this.photoExtension = 'jpg';
        this.dependentInformations = [];
        this.petsNavigation = [];
        this.languagesSpokens = [];
    }
    return AssigneeInformationModel;
}());
var LanguagesSpokensModel = /** @class */ (function () {
    function LanguagesSpokensModel() {
        this.assignneInformation = 0;
        this.languages = '';
    }
    return LanguagesSpokensModel;
}());
var DependentInformationsModel = /** @class */ (function () {
    function DependentInformationsModel() {
        this.id = 0;
        this.sex = undefined;
        this.relationshipId = '0';
        this.name = '';
        this.birth = '';
        this.age = '';
        this.nationalityId = '';
        this.aditionalComments = '';
        this.assigneeInformationId = 0;
        this.language = '';
        this.photo = '';
        this.PhotoExtension = '';
        this.email = '';
        this.phone = '';
        this.ifOther = '';
        this.currentGrade = '';
        this.languageDependentInformations = [];
    }
    return DependentInformationsModel;
}());
var LanguagesSpokensModelDependent = /** @class */ (function () {
    function LanguagesSpokensModelDependent() {
        this.dependent = 0;
        this.language = 0;
    }
    return LanguagesSpokensModelDependent;
}());
var PetsNavigationModel = /** @class */ (function () {
    function PetsNavigationModel() {
        this.id = 0;
        this.petTypeId = '';
        this.birthDate = null;
        this.name = '';
        this.breedId = '';
        this.age = '';
        this.sizeId = '';
        this.weight = '';
        this.weightMeasuresId = '';
        this.assigneeInformationId = 0;
        this.photo = '';
        this.PhotoExtension = '';
    }
    return PetsNavigationModel;
}());
var immigrationCoodinators = /** @class */ (function () {
    function immigrationCoodinators() {
        this.id = 0;
        this.coordinatorTypeId = 0;
        this.coordinatorId = 0;
        this.assigned = '';
        this.accepted = '';
        this.serviceRecordId = 0;
        this.statusId = 2;
    }
    return immigrationCoodinators;
}());
var immigrationSupplierPartners = /** @class */ (function () {
    function immigrationSupplierPartners() {
        this.id = 0;
        this.supplierTypeId = 0;
        this.supplierCompanyId = 0;
        this.assignedDate = '';
        this.assignedServicesId = 0;
        this.serviceRecordId = 0;
        this.supplierId = 0;
    }
    return immigrationSupplierPartners;
}());
var relocationCoordinators = /** @class */ (function () {
    function relocationCoordinators() {
        this.id = 0;
        this.coordinatorTypeId = 0;
        this.coordinatorId = 0;
        this.assigned = '';
        this.accepted = '';
        this.serviceRecordId = 0;
        this.statusId = 2;
    }
    return relocationCoordinators;
}());
var relocationSupplierPartners = /** @class */ (function () {
    function relocationSupplierPartners() {
        this.id = 0;
        this.supplierTypeId = 0;
        this.supplierCompanyId = 0;
        this.assignedDate = '';
        this.assignedServicesId = 0;
        this.serviceRecordId = 0;
        this.supplierId = 0;
    }
    return relocationSupplierPartners;
}());
var EducationData = /** @class */ (function () {
    function EducationData() {
        this.institution = '';
        this.field_study = '';
        this.start_date = '';
        this.end_date = '';
        this.degree = '';
        this.licenses = '';
        this.id = 0;
    }
    return EducationData;
}());
var LanguageData = /** @class */ (function () {
    function LanguageData() {
        this.language = '';
        this.proficiency = '';
        this.comments = '';
        this.id = 0;
    }
    return LanguageData;
}());
var DependentData = /** @class */ (function () {
    function DependentData() {
        this.relationship = '';
        this.name = '';
        this.passport_number = '';
        this.date_issue = '';
        this.date_expi = '';
        this.issue_autho = '';
        this.place_of_issue = '';
        this.host_arraive = '';
        this.points = '';
        this.id = 0;
    }
    return DependentData;
}());
var ImmigrationProfileModel = /** @class */ (function () {
    function ImmigrationProfileModel() {
        this.id = 0;
        this.serviceRecordId = 0;
        this.passportInformationId = 0;
        this.previousHostCountryId = 0;
        this.assigmentInformationId = 0;
        this.highestLevelEducationalId = 0;
        this.passportInformation = new PassportInformation();
        this.previousHostCountry = new PreviousHostCountry();
        this.educationalBackgrounds = [];
        this.lenguageProficiencies = [];
        this.assigmentInformation = new AssigmentInformation();
        this.dependentImmigrationInfos = [];
    }
    return ImmigrationProfileModel;
}());
var PassportInformation = /** @class */ (function () {
    function PassportInformation() {
        this.id = 0;
        this.number = '';
        this.issue = '';
        this.expiration = '';
        this.issuingAuthority = '';
        this.placeIssue = '';
        this.currentAddress = '';
        this.specificAttentionPoints = '';
    }
    return PassportInformation;
}());
var PreviousHostCountry = /** @class */ (function () {
    function PreviousHostCountry() {
        this.priorHostCountryVisaIssued = false;
        this.id = 0;
        this.visaNumber = '';
        this.issue = '';
        this.expiration = '';
        this.issuingAuthority = '';
        this.placeIssue = '';
        this.visaCategoryId = '';
        this.idAssignedNumber = '';
        this.positionEmployer = '';
        this.positionResponsabilities = '';
    }
    return PreviousHostCountry;
}());
var EducationalBackgrounds = /** @class */ (function () {
    function EducationalBackgrounds() {
        this.id = 0;
        this.immigrationProfileId = 0;
        this.institution = '';
        this.fieldStudy = '';
        this.startDate = '';
        this.endDate = '';
        this.degree = '';
        this.listProfessionalLicenses = '';
    }
    return EducationalBackgrounds;
}());
var LenguageProficiencies = /** @class */ (function () {
    function LenguageProficiencies() {
        this.id = 0;
        this.languageId = '';
        this.proficiencyId = '';
        this.comments = '';
        this.immigrationProfileId = 0;
    }
    return LenguageProficiencies;
}());
var AssigmentInformation = /** @class */ (function () {
    function AssigmentInformation() {
        this.id = 0;
        this.legalNameHomeCountry = '';
        this.locationHome = '';
        this.currentJobPositionTitle = '';
        this.employmentFrom = '';
        this.employmentTo = '';
        this.legalNameHostCountry = '';
        this.locationHost = '';
        this.newJobPositionTitle = '';
        this.newJobResponsibilitie = '';
        this.estimatedStartDate = '';
        this.lenghtAssigment = '';
        this.currentGrossSalary = '';
        this.newGrossSalary = '';
        this.payrollLocation = '';
        this.splitPayrollApplicable = false;
        this.payrollLocationSecond = '';
        this.hiringManager = '';
        this.hiringManagerPhone = '';
        this.hiringManagerEmail = '';
        this.legalRepresentative = '';
        this.specificAtention = '';
        this.documentType = '';
        this.documentTypeExtension = '';
        this.licenseDriver = '';
        this.licenseDriverExtension = '';
        this.currencyCurrentGrossSalary = '';
        this.currencyNewGrossSalary = '';
    }
    return AssigmentInformation;
}());
var DependentImmigrationInfos = /** @class */ (function () {
    function DependentImmigrationInfos() {
        this.id = 0;
        this.relationshipId = '';
        this.name = '';
        this.passportNumber = '';
        this.issue = '';
        this.expiration = '';
        this.issuingAuthority = '';
        this.placeIssue = '';
        this.entryDateHostCountry = '';
        this.specificAttentionPoints = '';
        this.immigrationProfileId = 0;
        this.documentType = '';
        this.documentTypeExtension = '';
        this.licenceDriver = '';
        this.licenseDriverExtension = '';
        this.documentDependentImmigrationInfos = [];
    }
    return DependentImmigrationInfos;
}());
var EmailSend = /** @class */ (function () {
    function EmailSend() {
        this.id = 0;
        this.serviceLineId = 0;
        this.serviceRecordId = 0;
        this.emailId = 0;
        this.date = new Date();
        this.completed = false;
    }
    return EmailSend;
}());
var FilterImmRelFields = /** @class */ (function () {
    function FilterImmRelFields() {
        this.status = '';
        this.deliverTo = '';
        this.serviceType = '';
        this.program = '';
    }
    return FilterImmRelFields;
}());
var LibraryDocumentModel = /** @class */ (function () {
    function LibraryDocumentModel() {
        this.id = 0;
        this.fileName = '';
        this.fileRequest = '';
        this.fileExtension = '';
        this.documentType = 0;
        this.relationship = 0;
        this.issueDate = '';
        this.expirationDate = '';
        this.issuingAuthority = '';
        this.countryOrigin = 0;
        this.comment = '';
        this.dependentInformation = 0;
        this.createdBy = 0;
        this.createdDate = '';
        this.updateBy = 0;
        this.updatedDate = '';
    }
    return LibraryDocumentModel;
}());
var LibraryFilter = /** @class */ (function () {
    function LibraryFilter() {
        this.rangeDate1 = '';
        this.rangeDate2 = '';
        this.status = '';
    }
    return LibraryFilter;
}());
