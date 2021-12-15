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
exports.NewServiceRecordComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("../../../app/shared/loader");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var new_service_order_component_1 = require("../dialog/new-services-record-dialogs/new-service-order.component");
var search_profile_component_1 = require("../dialog/search-profile/search-profile.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var nsr_table_detail_component_1 = require("../dialog/new-services-record-dialogs/nsr-table-detail.component");
var forms_1 = require("@angular/forms");
var dialog_export_component_1 = require("../dialog/dialog-export/dialog-export.component");
var sort_1 = require("@angular/material/sort");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts"); // fonts provided for pdfmake
var NewServiceRecordComponent = /** @class */ (function () {
    function NewServiceRecordComponent(_router, dialog, _services, exportAsService, _snackBar) {
        this._router = _router;
        this.dialog = dialog;
        this._services = _services;
        this.exportAsService = exportAsService;
        this._snackBar = _snackBar;
        /*
            1. Globals
            2. Functionality
            3. Utilities
            Ex: Class & Models
        */
        // Set the fonts to use
        this.exportAsConfig = {
            type: 'pdf',
            elementIdOrContent: 'export',
            options: {
                jsPDF: {
                    orientation: 'landscape'
                }
            }
        };
        // seccion de searc
        this.filterPartner0 = { coordinator: '' };
        this.filterClient0 = { name: '' };
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterCoordinator = { coordinator: '' };
        this.filterSupplierPart = { comercialName: '' };
        this.minDate = new Date();
        this.p = {
            total: 0,
            pagina: 1
        };
        this.loader = new loader_1.LoaderComponent();
        this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.range = new forms_1.FormGroup({
            start: new forms_1.FormControl(),
            end: new forms_1.FormControl()
        });
        this.city_home_catalogue = [];
        this.city_hosts_catalogue = [];
        // public session_aut:SessionSettings = new SessionSettings( this._router );
        //public displayedColumns: string[] = ['service_record', 'service_line','vip', 'status', 'autho_date', 'country', 'city', 'partner', 'client', 'assigne_name', 'services', 'coordinator', 'supplier'];
        this.displayedColumns = ['service_record', 'service_line', 'vip', 'status', 'autho_date', 'country', 'city', 'partner', 'client', 'assigne_name', 'services', 'coordinator'];
        this.filteruno = false;
        // search of select option
        this.filterOffice = { office: '' };
        this.filterPartner = { coordinator: '' };
        this.filterClient = { name: '' };
        this.filterNationality = { name: '' };
        this.filterMarital = { name: '' };
        this.filterPolicy = { policyType: '' };
        this.filterHomeCountry = { name: '' };
        this.filterHomeCity = { city: '' };
        this.filterLanguages = { name: '' };
        this.filterHostCountry = { name: '' };
        this.filterHostCity = { city: '' };
        this.filterRelationship = { relationship: '' };
        this.filterLanguagesRe = { name: '' };
        this.filterNationalityRe = { name: '' };
        this.filterGrade = { grade: '' };
        this.filterPet = { petType: '' };
        this.filterBreed = { breed: '' };
        this.filterSize = { size: '' };
        this.filterWeight = { name: '' };
        this.filterImiAutori = { name: '' };
        this.filterImiCoordina = { coordinatorType: '' };
        this.filterImiCoordina2 = { coordinator: '' };
        this.filterImiSupplier = { type: '' };
        this.filterImiSupplierCompany = { comercialName: '' };
        this.filterImiSupplier2 = { name: '' };
        this.filterImiAssignedService = { assignedService: '' };
        this.filterReloAutori = { name: '' };
        this.filterReloCoordina = { coordinatorType: '' };
        this.filterReloCoordina2 = { coordinator: '' };
        this.filterReloSupplier = { type: '' };
        this.filterReloSupplierCompany = { comercialName: '' };
        this.filterReloSupplier2 = { name: '' };
        this.filterReloAssignedService = { assignedService: '' };
        this.maxall = 20;
        this.check = 'assets/table-icons/check.png';
        this.uncheck = 'assets/table-icons/uncheck.png';
        //*****************************************************************//
        this.info_row = {};
        //*****************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        /* 2. Functionality */
        this.caServiceLine = [];
        this.country_catalogue = [];
        this.state_catalogue = [];
        this.city_catalogue = [];
        this.status_catalogue = [];
        this.client_catalogue = [];
        this.supplier_catalogue = [];
        this.suppliertype_catalogue = [];
        this.suppliercompany_catalogue = [];
        this.parther_catalogue = [];
        this.authorize_catalogue = [];
        this.marital_catalogue = [];
        this.assigment_catalogue = [];
        this.policytype_catalogue = [];
        this.relationship_catalogue = [];
        this.languages_catalogue = [];
        this.pettype_catalogue = [];
        this.breed_catalogue = [];
        this.petsize_catalogue = [];
        this.weightmeasure_catalogue = [];
        this.gender_catalogue = [];
        this.coordinator_catalogue = [];
        this.coordinatortype_catalogue = [];
        this.assduration_catalogue = [];
        this.cacliente = [];
        this.schoolgrades_catalogue = [];
        this.office_catalogues = [];
        this.sp_catalog = [];
        this.coordinator_catalogue_rel = [];
        this.service_records_table_data = undefined;
        this.filter_data = new FilterData();
        this.service_record_params_selected = '';
        this.filter_input_city = false;
        this.SO_ID = null;
        this.show_language_dropdown = false;
        this.user_languages = undefined;
        this.languages_selected = '';
        this.assing_dependents = [];
        this.assing_pets = [];
        this.new_service_record_data = new NewServiceRecordData();
        this.show_dependent_erros = false;
        this.show_pets_erros = false;
        this.imm_coordinator_model = new immigrationCoodinators();
        this.rel_coordinator_model = new relocationCoordinators();
        this.one_coordinator_selected = true;
        this.nso_fields = {
            no_init: false,
            no_iaut: false,
            no_part: false,
            no_clie: false,
            no_file: false,
            no_auto: false,
            no_offi: false
        };
        this.nso_ainfo_fields = {
            no_phot: false,
            no_name: false,
            no_emai: false,
            no_emai_val: false
        };
        this.imm_form = {
            no_ctyp: false,
            no_coor: false,
            no_assi: false,
            no_acce: false
        };
        this.home_city_client_able = false;
        this.home_city_host_able = false;
        this.city_host_catalogue = [];
        this.able_sup_com_field = false;
        //**contactName**//
        this.colums_sup_table = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5'];
        this.imm_sup_model = new immigrationSupplierPartners();
        this.table_imm_sup_par = null;
        this.imm_sup_form = {
            no_styp: false,
            no_scom: false,
            no_supp: false,
            no_date: false,
            no_serv: false
        };
        this.rel_sup_model = new relocationSupplierPartners();
        this.table_rel_sup_par = null;
        this.rel_sup_form = {
            no_styp: false,
            no_scom: false,
            no_supp: false,
            no_date: false,
            no_serv: false
        };
        /* 3. Utilities */
        this.show_listado = true;
        this.show_dependent_section = false;
        this.show_pets_section = false;
        this.show_supplier_section = false;
        this.no_main_photo = false;
        this.horizontalPosition = 'end';
        this.verticalPosition = 'top';
    }
    NewServiceRecordComponent.prototype.ngOnInit = function () {
        this.consultaPermisos();
        // this.session_aut.canContinueInMySession();
        if (this.isUserActive()) {
            this.assing_dependents.push(new DependentInformationsModel());
            this.assing_pets.push(new PetsNavigationModel());
            this.getTodayDay();
            this.getCatalogues();
            this.getServiceRecordTableData();
        }
        else {
            this._router.navigateByUrl('');
        }
    };
    NewServiceRecordComponent.prototype.viewData = function (data) {
        this.info_row.assignee = data.assigneeName;
        this.info_row.coordinator = data.coordinator;
    };
    NewServiceRecordComponent.prototype.consultaPermisos = function () {
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
    //*****************************************************************//
    NewServiceRecordComponent.prototype.goBack = function () {
        window.history.back();
    };
    NewServiceRecordComponent.prototype.getPageSizeOptionsServiceR = function () {
        if (this.service_records_table_data.paginator.length > this.maxall)
            return [10, 20, this.service_records_table_data.paginator.length];
        else
            return [10, 20, this.maxall];
    };
    NewServiceRecordComponent.prototype.getPageSizeOptionsImmi = function () {
        if (this.table_imm_sup_par.paginator.length > this.maxall)
            return [10, 20, this.table_imm_sup_par.paginator.length];
        else
            return [10, 20, this.maxall];
    };
    NewServiceRecordComponent.prototype.getNameCountry = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    NewServiceRecordComponent.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            var _this = this;
            return __generator(this, function (_w) {
                switch (_w.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierPartnerType')];
                    case 1:
                        _a.sp_catalog = _w.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.country_catalogue = _w.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetState')];
                    case 3:
                        _c.state_catalogue = _w.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 4:
                        _d.status_catalogue = _w.sent();
                        //this.client_catalogue = await this._services.getCatalogueFrom('GetClient');
                        //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierType')];
                    case 5:
                        //this.client_catalogue = await this._services.getCatalogueFrom('GetClient');
                        //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
                        _e.suppliertype_catalogue = _w.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPartner')];
                    case 6:
                        _f.parther_catalogue = _w.sent();
                        console.log("partner: ", this.parther_catalogue);
                        //this.authorize_catalogue = await this._services.getCatalogueFrom('GetAuthorizedBy');
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetMaritalStatus')];
                    case 7:
                        //this.authorize_catalogue = await this._services.getCatalogueFrom('GetAuthorizedBy');
                        _g.marital_catalogue = _w.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetAssignedService')];
                    case 8:
                        _h.assigment_catalogue = _w.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDurationForServiceRecord')];
                    case 9:
                        _j.assduration_catalogue = _w.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPolicyType')];
                    case 10:
                        _k.policytype_catalogue = _w.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 11:
                        _l.relationship_catalogue = _w.sent();
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 12:
                        _m.languages_catalogue = _w.sent();
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPetType')];
                    case 13:
                        _o.pettype_catalogue = _w.sent();
                        _p = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSize')];
                    case 14:
                        _p.petsize_catalogue = _w.sent();
                        _q = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetWeightMeasure')];
                    case 15:
                        _q.weightmeasure_catalogue = _w.sent();
                        _r = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSex')];
                    case 16:
                        _r.gender_catalogue = _w.sent();
                        //this.coordinator_catalogue = await this._services.getCatalogueFrom('GetCoordinator');
                        _s = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCoordinatorType')];
                    case 17:
                        //this.coordinator_catalogue = await this._services.getCatalogueFrom('GetCoordinator');
                        _s.coordinatortype_catalogue = _w.sent();
                        _t = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 18:
                        _t.caServiceLine = _w.sent();
                        _u = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetGradeSchooling')];
                    case 19:
                        _u.schoolgrades_catalogue = _w.sent();
                        _v = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetOffice')];
                    case 20:
                        _v.office_catalogues = _w.sent();
                        console.log('languages_catalogue => ', this.languages_catalogue);
                        this._services.service_general_get("Catalogue/GetUserTo?user=" + this.USERDATA.id).subscribe((function (data) {
                            if (data.success) {
                                _this.cacliente = data.result.value;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    NewServiceRecordComponent.prototype.athorizedBy = function () {
        var _this = this;
        if (this.new_service_record_data.assigneeInformations[0].homeCountryId == null ||
            this.new_service_record_data.assigneeInformations[0].homeCityId == null ||
            this.new_service_record_data.clientId == null) {
            return true;
        }
        this._services.service_general_get("Catalogue/GetAuthorizedBy/" + this.new_service_record_data.clientId + "/" + this.new_service_record_data.assigneeInformations[0].homeCountryId + "/" + this.new_service_record_data.assigneeInformations[0].homeCityId).subscribe((function (data) {
            if (data.success) {
                console.log("select authorized by: ", data.result.value);
                _this.authorize_catalogue = data.result.value;
            }
        }));
    };
    NewServiceRecordComponent.prototype.getClient = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetClient/" + this.filter_data.partner).subscribe((function (data) {
            if (data.success) {
                console.log("select cliente: ", data.result.value);
                _this.client_catalogue = data.result.value;
            }
        }));
    };
    NewServiceRecordComponent.prototype.getClientNew = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetClient/" + this.new_service_record_data.partnerId).subscribe((function (data) {
            if (data.success) {
                console.log("select cliente: ", data.result.value);
                _this.client_catalogue = data.result.value;
            }
        }));
    };
    NewServiceRecordComponent.prototype.getCoordinator = function () {
        var _this = this;
        if (this.filter_data.serviceLine == "" || this.filter_data.client == "") {
            return true;
        }
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.filter_data.client + "?servileLine=" + this.filter_data.serviceLine).subscribe((function (data) {
            if (data.success) {
                console.log("select coordinator: ", data.result);
                _this.coordinator_catalogue = data.result.value;
            }
        }));
    };
    //getCoordinatorNew
    NewServiceRecordComponent.prototype.getCoordinatorImmigration = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.new_service_record_data.partnerId + "?servileLine=" + 1).subscribe((function (data) {
            if (data.success) {
                console.log("select coordinator new SR Immigration: ", data.result);
                _this.coordinator_catalogue = data.result.value;
            }
        }));
    };
    NewServiceRecordComponent.prototype.getCoordinatorRelocation = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.new_service_record_data.partnerId + "?servileLine=" + 2).subscribe((function (data) {
            if (data.success) {
                console.log("select coordinator new SR relocation: ", data.result);
                _this.coordinator_catalogue_rel = data.result.value;
            }
        }));
    };
    NewServiceRecordComponent.prototype.getSupplierPartner = function () {
        var _this = this;
        console.log(this.filter_data);
        if (this.filter_data.serviceLine == "" || this.filter_data.country == "" || this.filter_data.city == "") {
            return true;
        }
        this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerConsultant?country=" + this.filter_data.country + "&city=" + this.filter_data.city + "&serviceLine=" + this.filter_data.serviceLine).subscribe((function (data) {
            if (data.success) {
                console.log("select supplier: ", data.result.value);
                _this.supplier_catalogue = data.result.value;
            }
        }));
    };
    NewServiceRecordComponent.prototype.manageLoaderMoments = function () {
        var _this = this;
        setTimeout(function () {
            var validate_items = {
                item_a: _this.parther_catalogue,
                item_b: _this.client_catalogue,
                item_c: _this.country_catalogue,
                item_d: _this.policytype_catalogue,
                item_e: _this.relationship_catalogue,
                item_f: _this.pettype_catalogue
            };
            for (var item in validate_items) {
                if (validate_items[item].length == 0) {
                    var dialogRef = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: 'Error connection',
                            body: 'Some elements can not be loaded, system will reload or try later.'
                        }, width: '420px'
                    });
                    dialogRef.afterClosed().subscribe(function (result) {
                        //window.location.reload();
                    });
                    return;
                }
            }
        }, 777);
    };
    NewServiceRecordComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        var params_in = params == '' ? '' : "?" + params;
        this.loader.showLoader();
        this._services.service_general_get('ServiceRecord/GetServiceRecord/1/100/' + this.USERDATA.id + '/' + params_in)
            .subscribe(function (response) {
            if (response.success) {
                console.log('data service record', response);
                _this.p.total = response.map.value.length;
                _this.service_records_table_data = new table_1.MatTableDataSource(response.map.value);
                _this.service_records_table_data.paginator = _this.paginator;
                _this.service_records_table_data.sort = _this.sort;
                _this.loader.hideLoader();
            }
        }, function (error) {
            console.error('Error (GetServiceRecord) => ', error);
            _this.showGeneralMessageDialog('Error connection', 'Some error has happen in your connection, please try again or later. System will reload.');
            setTimeout(function () {
                //location.reload();
            }, 4477);
            _this.loader.hideLoader();
        });
    };
    NewServiceRecordComponent.prototype.filteringServiceRecordTable = function () {
        this.service_record_params_selected = '';
        var params = '';
        if (this.range.value.start != '' && this.range.value.start != null)
            this.filter_data.startDate = this.filterDate(this.range.value.start);
        if (this.range.value.end != '' && this.range.value.end != null)
            this.filter_data.endDate = this.filterDate(this.range.value.end);
        debugger;
        for (var item in this.filter_data) {
            if (this.filter_data[item] != '') {
                this.service_record_params_selected += item + "=" + this.filter_data[item] + "&";
                params = this.service_record_params_selected.substring(0, this.service_record_params_selected.length - 1);
            }
        }
        this.getServiceRecordTableData(params);
    };
    NewServiceRecordComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.filterPartner0 = { coordinator: '' };
        this.filterClient0 = { name: '' };
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterCoordinator = { coordinator: '' };
        this.filterSupplierPart = { comercialName: '' };
        this.range.reset({ start: '', end: '' });
        this.filter_data = new FilterData();
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.getServiceRecordTableData();
    };
    NewServiceRecordComponent.prototype.getcity = function (id) {
        var _this = this;
        this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe((function (data) {
            if (data.success) {
                _this.city_catalogue = data.result;
            }
        }));
    };
    NewServiceRecordComponent.prototype.getcityhome = function (id) {
        var _this = this;
        this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe((function (data) {
            if (data.success) {
                _this.city_home_catalogue = data.result;
            }
        }));
    };
    NewServiceRecordComponent.prototype.getcityhost = function (id) {
        var _this = this;
        this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe((function (data) {
            if (data.success) {
                _this.city_hosts_catalogue = data.result;
            }
        }));
    };
    NewServiceRecordComponent.prototype.filterServiceRecordAble = function (which_field) {
        if (which_field === void 0) { which_field = ''; }
        return __awaiter(this, void 0, Promise, function () {
            var _a, extra_param, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = which_field;
                        switch (_a) {
                            case 'city': return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1:
                        this.filter_data.country != '' ?
                            this.filter_input_city = true :
                            this.filter_input_city = false;
                        extra_param = "?state=" + this.filter_data.country;
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetState', extra_param)];
                    case 2:
                        _b.city_catalogue = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Error en la seleccion de campo');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NewServiceRecordComponent.prototype.isUserActive = function () {
        var result = false;
        var user_in = localStorage.getItem('userData');
        if (user_in != undefined) {
            this.USERDATA = JSON.parse(user_in);
            this.SO_ID = this.USERDATA.id;
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
    NewServiceRecordComponent.prototype.showLanguagesDropdow = function () {
        !this.show_language_dropdown ?
            this.show_language_dropdown = true :
            this.show_language_dropdown = false;
    };
    NewServiceRecordComponent.prototype.initLanguageSelector = function () {
        this.user_languages = this.languages_catalogue;
        this.user_languages.forEach(function (language) {
            language.active = false;
        });
    };
    NewServiceRecordComponent.prototype.selectingLanguages = function (language_in) {
        !language_in.active ? language_in.active = true : language_in.active = false;
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
    NewServiceRecordComponent.prototype.addDepartament = function () {
        this.assing_dependents.push(new DependentInformationsModel());
    };
    NewServiceRecordComponent.prototype.removeDepartament = function (index) {
        this.assing_dependents.splice(index, 1);
    };
    NewServiceRecordComponent.prototype.addPet = function () {
        this.assing_pets.push(new PetsNavigationModel());
    };
    NewServiceRecordComponent.prototype.removePet = function (index) {
        this.assing_pets.splice(index, 1);
    };
    NewServiceRecordComponent.prototype.addNewServiceRecord = function () {
        var _this = this;
        console.log("Entra a guardar SR");
        this.show_dependent_erros = true;
        this.show_pets_erros = true;
        this.new_service_record_data.createdBy = this.USERDATA.id;
        var validations = {
            general_form: this.fieldsMustBeFill(),
            assing_form: this.assigneeFormValidation(),
            one_coordinator: this.atLeatsOneCoordinator(),
            assing_depen: this.validateDependents(),
            assing_pets: this.validatingPets()
        };
        this.changePageToSection(validations);
        console.log('Obj Validations ====> ', validations);
        console.log('Obj Sent ========> ', this.new_service_record_data);
        if (this.new_service_record_data.assigneeInformations[0].mobilePhone != undefined &&
            this.new_service_record_data.assigneeInformations[0].mobilePhone != null) {
            this.new_service_record_data.assigneeInformations[0].mobilePhone.toString();
        }
        if (this.new_service_record_data.assigneeInformations[0].workPhone != undefined &&
            this.new_service_record_data.assigneeInformations[0].workPhone != null) {
            this.new_service_record_data.assigneeInformations[0].workPhone.toString();
        }
        for (var i = 0; i < this.new_service_record_data.assigneeInformations[0].dependentInformations.length; i++) {
            var element = this.new_service_record_data.assigneeInformations[0].dependentInformations[i];
            if (this.new_service_record_data.assigneeInformations[0].dependentInformations[i].phone != null && this.new_service_record_data.assigneeInformations[0].dependentInformations[i].phone != undefined && this.new_service_record_data.assigneeInformations[0].dependentInformations[i].phone != '') {
                this.new_service_record_data.assigneeInformations[0].dependentInformations[i].phone.toString();
            }
        }
        if (validations.general_form &&
            validations.assing_form &&
            validations.one_coordinator &&
            validations.assing_depen &&
            validations.assing_pets) {
            this.loader.showLoader();
            this.getLanguagesData();
            this.getLanguagesDependentsData();
            debugger;
            this._services.service_general_post_with_url('ServiceRecord/Create', this.new_service_record_data)
                .subscribe(function (response) {
                _this.loader.hideLoader();
                if (response.success) {
                    var sr_response_data = response.result;
                    _this._services.service_general_get("ServiceRecord/GetServiceRecordById?id=" + sr_response_data.id + "&user=" + _this.USERDATA.id)
                        .subscribe(function (response) {
                        _this.showModal(response.result);
                    }, function (error) {
                        console.error('WS Error (GetServiceRecordById) => ', error);
                    });
                }
            }, function (error) {
                console.error('Error en el WS => ServiceRecord/Create');
                _this.loader.hideLoader();
                _this.showGeneralMessageDialog('Error connection', 'Some error has happen in your connection, please try again or later.');
            });
        }
    };
    NewServiceRecordComponent.prototype.atLeatsOneCoordinator = function () {
        var result = true;
        var validations = {
            imm_form: this.getImmigrationValidation(),
            rel_form: this.getRelocationValidation()
        };
        if (!validations.imm_form && !validations.rel_form) {
            this.one_coordinator_selected = false;
            result = false;
            this.showDialogMessage('You must fill at leats one coordinator: Immigration or Relocations');
        }
        else {
            this.one_coordinator_selected = true;
            if (validations.imm_form) {
                this.new_service_record_data.immigrationCoodinators.push(this.imm_coordinator_model);
            }
            if (validations.rel_form) {
                this.new_service_record_data.relocationCoordinators.push(this.rel_coordinator_model);
            }
        }
        return result;
    };
    NewServiceRecordComponent.prototype.validateDependents = function () {
        var _this = this;
        var result = true;
        if (this.show_dependent_section) {
            this.new_service_record_data.assigneeInformations[0].dependentInformations
                .forEach(function (dependent, index) {
                if (dependent.relationshipId == "0")
                    result = false;
                switch (dependent.relationship) {
                    case '1':
                        if (dependent.name == "")
                            result = false;
                        if (dependent.birth == "")
                            result = false;
                        if (dependent.languagesId == "")
                            result = false;
                        if (dependent.nationalityId == "")
                            result = false;
                        if (dependent.email == "")
                            result = false;
                        if (!_this.validateEmail(dependent.email))
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
                console.log('Dep ===> ', dependent);
            });
        }
        if (this.show_dependent_section) {
            this.new_service_record_data.assigneeInformations[0].dependentInformations = this.assing_dependents;
            this.getDependentAges();
        }
        else {
            this.new_service_record_data.assigneeInformations[0].dependentInformations = [];
        }
        return result;
    };
    NewServiceRecordComponent.prototype.getDependentAges = function () {
        this.new_service_record_data.assigneeInformations[0].dependentInformations
            .forEach(function (dependent, index) {
            var age_container = document.getElementById("dependent_age_" + index);
            dependent.age = age_container.value;
        });
    };
    NewServiceRecordComponent.prototype.validatingPets = function () {
        console.log("valida pets");
        var result = true;
        //const pets:any = this.new_service_record_data.assigneeInformations[0].petsNavigation;
        var pets = this.assing_pets;
        pets.forEach(function (pet) {
            if (pet.age == '')
                result = false;
            if (pet.name == '')
                result = false;
            if (pet.breedId == '')
                result = false;
            if (pet.petTypeId == '')
                result = false;
            if (pet.weight == '')
                result = false;
        });
        if (this.show_pets_section) {
            this.new_service_record_data.assigneeInformations[0].petsNavigation = this.assing_pets;
            this.getPetsAges();
        }
        else {
            this.new_service_record_data.assigneeInformations[0].petsNavigation = [];
            result = true;
        }
        return result;
    };
    NewServiceRecordComponent.prototype.getPetsAges = function () {
        this.new_service_record_data.assigneeInformations[0].petsNavigation
            .forEach(function (pet, index) {
            var age_container = document.getElementById("pet_" + index);
            pet.age = age_container.value;
        });
    };
    NewServiceRecordComponent.prototype.fieldsMustBeFill = function () {
        var result = true;
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
        for (var field in this.nso_fields) {
            if (this.nso_fields[field]) {
                this.showDialogMessage('All fields must be filled', 3000);
                result = false;
            }
        }
        return result;
    };
    NewServiceRecordComponent.prototype.assigneeFormValidation = function () {
        var form_data = this.new_service_record_data.assigneeInformations[0], root = this;
        var result = true;
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
        for (var item in this.nso_ainfo_fields) {
            if (this.nso_ainfo_fields[item])
                result = false;
        }
        function getImageAssign() {
            var id_photo_container = document.getElementById('ass_prof_photo'), photo_src = id_photo_container.src, photo_input = document.getElementById('ass_prof_photo_input');
            var split_photo_value = '';
            var result = true;
            if (photo_input.value != '') {
                split_photo_value = photo_input.value.split('.')[photo_input.value.split('.').length - 1];
                form_data.PhotoExtension = split_photo_value;
                form_data.photo = photo_src.split(',')[1];
                root.no_main_photo = false;
            }
            else {
                root.no_main_photo = false;
                form_data.PhotoExtension = 'jpg';
                form_data.photo = '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';
                result = true;
            }
            return result;
        }
        return result;
    };
    NewServiceRecordComponent.prototype.getLanguagesData = function () {
        var _this = this;
        console.log(this.new_service_record_data.assigneeInformations[0].languagesSpokens_);
        debugger;
        var languages_selected = this.new_service_record_data.assigneeInformations[0].languagesSpokens_;
        //let hold_language = [];
        languages_selected.forEach(function (language) {
            _this.new_service_record_data.assigneeInformations[0].languagesSpokens.push({
                assignneInformation: _this.new_service_record_data.assigneeInformations[0].id,
                languages: language
            });
        });
        //this.new_service_record_data.assigneeInformations[0].languagesSpokens = [];
    };
    NewServiceRecordComponent.prototype.getLanguagesDependentsData = function () {
        var dependents = this.assing_dependents;
        if (dependents.length != 0) {
            //let language_holder:any[] = [];
            dependents.forEach(function (dependent) {
                if (dependent.languageDependentInformations_.length != 0) {
                    var languages = dependent.languageDependentInformations_;
                    console.log(languages);
                    languages.forEach(function (language_) {
                        //const new_language:LanguagesSpokensModelDependent = new LanguagesSpokensModelDependent;
                        dependent.languageDependentInformations.push({
                            dependent: 0,
                            language: language_
                        });
                        //new_language.language = language.language;
                        //language_holder.push( new_language );
                    });
                    //dependent.languageDependentInformations = language_holder;
                    //language_holder = [];
                }
            });
        }
    };
    NewServiceRecordComponent.prototype.validEmailAssignee = function (email) {
        !this.validateEmail(email) ?
            this.nso_ainfo_fields.no_emai_val = true :
            this.nso_ainfo_fields.no_emai_val = false;
    };
    NewServiceRecordComponent.prototype.validatingDependents = function () {
        var result = true;
        var dependents = this.new_service_record_data.assigneeInformations[0].dependentInformations;
        dependents.forEach(function (dependent) {
            if (dependent.relationshipId == "")
                result = false;
            if (dependent.name == "")
                result = false;
            if (dependent.birth == "")
                result = false;
            if (dependent.age == "")
                result = false;
            if (dependent.language == "")
                result = false;
            if (dependent.nationalityId == "")
                result = false;
        });
        return result;
    };
    NewServiceRecordComponent.prototype.getImmigrationValidation = function () {
        var result = true;
        var imm_prof_data = this.imm_coordinator_model;
        imm_prof_data.coordinatorTypeId == 0 ?
            this.imm_form.ctype = true : this.imm_form.ctype = false;
        imm_prof_data.coordinatorId == 0 ?
            this.imm_form.no_coor = true : this.imm_form.no_coor = false;
        imm_prof_data.assigned == '' ?
            this.imm_form.no_assi = true : this.imm_form.no_assi = false;
        imm_prof_data.accepted == '' ?
            this.imm_form.no_acce = true : this.imm_form.no_acce = false;
        for (var field in this.imm_form) {
            if (this.imm_form[field])
                result = false;
        }
        return result;
    };
    NewServiceRecordComponent.prototype.getRelocationValidation = function () {
        var result = true;
        var relocation_data = this.rel_coordinator_model;
        if (relocation_data.coordinatorTypeId == '')
            result = false;
        if (relocation_data.coordinatorId == '')
            result = false;
        if (relocation_data.assigned == '')
            result = false;
        return result;
    };
    NewServiceRecordComponent.prototype.ableInputsFromAssignmentSection = function (id_country, section) {
        return __awaiter(this, void 0, Promise, function () {
            var extra_param, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        extra_param = "?state=" + id_country;
                        _a = section;
                        switch (_a) {
                            case 'client': return [3 /*break*/, 1];
                            case 'host': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!this.home_city_client_able)
                            this.home_city_client_able = true;
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCity', extra_param)];
                    case 2:
                        _b.city_catalogue = _d.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!this.home_city_host_able)
                            this.home_city_host_able = true;
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCity', extra_param)];
                    case 4:
                        _c.city_host_catalogue = _d.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NewServiceRecordComponent.prototype.requestPetBreedCatalogue = function (id_pet_type) {
        return __awaiter(this, void 0, Promise, function () {
            var extra_data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        extra_data = "?id=" + id_pet_type;
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBreed', extra_data)];
                    case 1:
                        _a.breed_catalogue = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewServiceRecordComponent.prototype.ableSupplierCompImm = function (id_in, type) {
        return __awaiter(this, void 0, Promise, function () {
            var country, city, extra_data;
            var _this = this;
            return __generator(this, function (_a) {
                console.log(id_in);
                if (type == 1) {
                    country = this.new_service_record_data.assigneeInformations[0].homeCountryId;
                    city = this.new_service_record_data.assigneeInformations[0].homeCityId;
                }
                else if (type == 2) {
                    country = this.new_service_record_data.assigneeInformations[0].hostCountry;
                    city = this.new_service_record_data.assigneeInformations[0].hostCityId;
                }
                extra_data = "?country=" + country + "&city=" + city + "&serviceLine=" + type;
                this.parametros_busqueda = extra_data;
                console.log('parametros supplier company: ', extra_data);
                this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerConsultant' + extra_data).subscribe((function (data) {
                    if (data.success) {
                        console.log('DATA CONSULTA: ', data);
                        _this.suppliercompany_catalogue = data.result.value;
                        console.log('DATA CONSULTA SUPPLIER COMPANY: ', _this.suppliercompany_catalogue);
                        _this.able_sup_com_field = true;
                    }
                }));
                return [2 /*return*/];
            });
        });
    };
    NewServiceRecordComponent.prototype.__supplier__ = function (country, city, serviceLine) {
        return __awaiter(this, void 0, Promise, function () {
            var extra_data;
            var _this = this;
            return __generator(this, function (_a) {
                extra_data = "?country=" + country + "&city=" + city + "&serviceLine=" + serviceLine;
                debugger;
                console.log('parametros supplier: ', extra_data);
                this._services.service_general_get('SupplierPartnerProfile/GetConsultantContactsConsultants' + extra_data).subscribe((function (data) {
                    if (data.success) {
                        console.log('DATA CONSULTA: ', data);
                        _this.supplier_catalogue = data.result.value;
                        console.log('DATA CONSULTA SUPPLIER: ', _this.supplier_catalogue);
                    }
                }));
                return [2 /*return*/];
            });
        });
    };
    NewServiceRecordComponent.prototype.initTableImmSupPar = function () {
        var _this = this;
        var table_in = this.new_service_record_data.immigrationSupplierPartners;
        table_in.forEach(function (row) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        row.supplierTypeIdText = this.getValueFromCatalogue(this.suppliertype_catalogue, row.supplierTypeId, 'supplierType');
                        row.supplierIdText = this.getValueFromCatalogue(this.supplier_catalogue, row.supplierId, 'name');
                        row.assignedServicesIdText = this.getValueFromCatalogue(this.assigment_catalogue, row.assignedServicesId, 'assignedService');
                        _a = row;
                        return [4 /*yield*/, this.getValueFromCatalogueAfter({
                                url: 'SupplierPartnerProfile/GetSupplierPartnerConsultant' + this.parametros_busqueda,
                                match: row.supplierCompanyId,
                                field_to_find: 'comercialName',
                                id_index: 'id'
                            })];
                    case 1:
                        _a.supplierCompanyIdText = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        debugger;
        this.table_imm_sup_par = new table_1.MatTableDataSource(table_in);
        this.table_imm_sup_par.paginator = this.paginator;
        debugger;
    };
    NewServiceRecordComponent.prototype.addImmigrationSupplier = function () {
        var _a;
        console.log('suplier table', this.imm_sup_model);
        if (this.isImmSupParFill()) {
            this.imm_sup_model.supplierCompanyId = (_a = this.supplier_catalogue[0]) === null || _a === void 0 ? void 0 : _a.companyId;
            this.new_service_record_data.immigrationSupplierPartners.push(this.imm_sup_model);
            this.cleanImmSup();
            this.showSupplierSection();
            this.initTableImmSupPar();
            this.able_sup_com_field = false;
        }
    };
    NewServiceRecordComponent.prototype.isImmSupParFill = function () {
        this.imm_sup_model.supplierCompanyId = this.supplier_catalogue[0].companyId;
        var result = true;
        this.imm_sup_model.supplierTypeId == null ?
            this.imm_sup_form.no_styp = true : this.imm_sup_form.no_styp = false;
        //this.imm_sup_model.supplierCompanyId == null ? 
        //    this.imm_sup_form.no_scom = true : this.imm_sup_form.no_scom = false;
        this.imm_sup_model.supplierId == null ?
            this.imm_sup_form.no_supp = true : this.imm_sup_form.no_supp = false;
        this.imm_sup_model.assignedDate == '' ?
            this.imm_sup_form.no_date = true : this.imm_sup_form.no_date = false;
        // this.imm_sup_model.assignedServicesId == null ?
        //     this.imm_sup_form.no_serv = true : this.imm_sup_form.no_serv = false;
        for (var field in this.imm_sup_form) {
            if (this.imm_sup_form[field])
                result = false;
        }
        return result;
    };
    NewServiceRecordComponent.prototype.cleanImmSup = function () {
        this.imm_sup_form.no_styp = false;
        this.imm_sup_form.no_scom = false;
        this.imm_sup_form.no_supp = false;
        this.imm_sup_form.no_date = false;
        this.imm_sup_form.no_serv = false;
        this.imm_sup_model = new immigrationSupplierPartners();
    };
    NewServiceRecordComponent.prototype.deleteImmSupPar = function (index_row) {
        this.new_service_record_data.immigrationSupplierPartners.splice(index_row, 1);
        this.initTableImmSupPar();
    };
    NewServiceRecordComponent.prototype.addRelocationSupplier = function () {
        console.log('table suplier relocation');
        if (this.isRelSupParFill()) {
            this.new_service_record_data.relocationSupplierPartners.push(this.rel_sup_model);
            this.cleanRelSup();
            this.showSupplierSection();
            this.initTableRelSupPar();
            this.able_sup_com_field = false;
            console.log('service', this.new_service_record_data.relocationSupplierPartners);
        }
    };
    NewServiceRecordComponent.prototype.initTableRelSupPar = function () {
        var _this = this;
        var table_in = this.new_service_record_data.relocationSupplierPartners;
        table_in.forEach(function (row) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        row.supplierTypeIdText = this.getValueFromCatalogue(this.suppliertype_catalogue, row.supplierTypeId, 'supplierType');
                        row.supplierIdText = this.getValueFromCatalogue(this.supplier_catalogue, row.supplierId, 'name');
                        row.assignedServicesIdText = this.getValueFromCatalogue(this.assigment_catalogue, row.assignedServicesId, 'assignedService');
                        _a = row;
                        return [4 /*yield*/, this.getValueFromCatalogueAfter({
                                url: 'SupplierPartnerProfile/GetSupplierPartnerConsultant' + this.parametros_busqueda,
                                match: row.supplierCompanyId,
                                field_to_find: 'comercialName',
                                id_index: 'id'
                            })];
                    case 1:
                        _a.supplierCompanyIdText = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        debugger;
        this.table_imm_sup_par = new table_1.MatTableDataSource(table_in);
        this.table_imm_sup_par.paginator = this.paginator;
        this.table_rel_sup_par = new table_1.MatTableDataSource(table_in);
        this.table_rel_sup_par.paginator = this.paginator;
        debugger;
    };
    NewServiceRecordComponent.prototype.isRelSupParFill = function () {
        var result = true;
        this.rel_sup_model.supplierCompanyId = this.supplier_catalogue[0].companyId;
        this.rel_sup_model.supplierTypeId == null ?
            this.rel_sup_form.no_styp = true : this.rel_sup_form.no_styp = false;
        //this.rel_sup_model.supplierCompanyId == null ?
        //    this.rel_sup_form.no_scom = true : this.rel_sup_form.no_scom = false;
        this.rel_sup_model.supplierId == null ?
            this.rel_sup_form.no_supp = true : this.rel_sup_form.no_supp = false;
        this.rel_sup_model.assignedDate == '' ?
            this.rel_sup_form.no_date = true : this.rel_sup_form.no_date = false;
        // this.rel_sup_model.assignedServicesId == null ?
        //     this.rel_sup_form.no_serv = true : this.rel_sup_form.no_serv = false;
        for (var field in this.rel_sup_form) {
            if (this.rel_sup_form[field])
                result = false;
        }
        return result;
    };
    NewServiceRecordComponent.prototype.deleteRelSupPar = function (index_row) {
        this.new_service_record_data.relocationSupplierPartners.splice(index_row, 1);
        this.initTableRelSupPar();
    };
    NewServiceRecordComponent.prototype.cleanRelSup = function () {
        this.imm_sup_form.no_styp = false;
        this.imm_sup_form.no_scom = false;
        this.imm_sup_form.no_supp = false;
        this.imm_sup_form.no_date = false;
        this.imm_sup_form.no_serv = false;
        this.imm_sup_model = new relocationSupplierPartners();
    };
    NewServiceRecordComponent.prototype.toggleSection = function () {
        this.show_listado ?
            this.show_listado = false :
            this.show_listado = true;
        this.new_service_record_data = new NewServiceRecordData;
        this.show_dependent_erros = false;
        this.show_pets_erros = false;
        this.imm_coordinator_model = new immigrationCoodinators();
        this.rel_coordinator_model = new relocationCoordinators();
    };
    NewServiceRecordComponent.prototype.showTabSelected = function (which_tab, event_data) {
        var tab_selected = document.getElementById("tab_" + which_tab), tab_parent = tab_selected.parentElement.children, event = event_data.target, tabs_container = document.getElementById('tabs');
        for (var index = 0; index < tab_parent.length; index += 1) {
            tab_parent[index].classList.add('display-none');
            tabs_container.children[index].classList.remove('page__section-tab--active');
        }
        tab_selected.classList.remove('display-none');
        event.classList.add('page__section-tab--active');
    };
    NewServiceRecordComponent.prototype.showModal = function (sr_data) {
        if (sr_data === void 0) { sr_data = null; }
        console.log(sr_data);
        var dialogRef = this.dialog.open(new_service_order_component_1.NewServiceOrderDialog, {
            data: {
                id_sr: sr_data.id,
                new_sr_data: sr_data,
                new_sr: false,
                close: false
            }, width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (so_added) {
            // location.reload();
        });
    };
    NewServiceRecordComponent.prototype.showModalSearchProfile = function () {
        var dialogRef = this.dialog.open(search_profile_component_1.DialogSearchProfileComponent, {
            data: {},
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    NewServiceRecordComponent.prototype.showGeneralMessageDialog = function (title, body) {
        if (title === void 0) { title = ''; }
        if (body === void 0) { body = ''; }
        var dialogRef = this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: title,
                body: body
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    NewServiceRecordComponent.prototype.showExportDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_export_component_1.DialogExportComponent, {
            data: this.service_records_table_data.filteredData,
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result === 1) {
                document.getElementById("excel").click();
            }
            if (result === 2) {
                _this.generatePDF();
            }
        });
    };
    NewServiceRecordComponent.prototype.generatePDF = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pdf, tabla, i, element;
            return __generator(this, function (_a) {
                pdf = new pdfmake_wrapper_1.PdfMakeWrapper();
                pdfmake_wrapper_1.PdfMakeWrapper.setFonts(vfs_fonts_1["default"]);
                tabla = [['Service Record', 'Service Line', 'VIP', 'Status', 'Autho Date', 'Country', 'City', 'Partner', 'Client', 'Assignee Name', 'Services', 'Coordinator', 'Supplier Consultant']];
                for (i = 0; i < this.service_records_table_data.filteredData.length; i++) {
                    element = this.service_records_table_data.filteredData[i];
                    if (element.vip == false) {
                        element.vip = 'No';
                    }
                    else if (element.vip == true) {
                        element.vip = 'Yes';
                    }
                    tabla.push([
                        element.serviceRecordNo, element.serviceLineName, element.vip, element.status.status, this.formatDate(element.autho), element.country,
                        element.city, element.partner, element.client, element.assigneeName,
                        element.serviceLine.length, element.coordinator, element.supplierConsultant
                    ]);
                }
                console.log(tabla);
                // Set the fonts to use
                pdf.pageMargins([30, 30, 30, 30]);
                pdf.pageOrientation('landscape');
                pdf.styles({
                    img: {
                        width: 5,
                        height: 5
                    }
                });
                pdf.defaultStyle({
                    fontSize: 9,
                    alignment: 'center'
                });
                pdf.add(new pdfmake_wrapper_1.Table(tabla).layout('lightHorizontalLines').end);
                pdf.create().download('Services.pdf');
                return [2 /*return*/];
            });
        });
    };
    NewServiceRecordComponent.prototype.toggleDependentsSection = function () {
        !this.show_dependent_section ?
            this.show_dependent_section = true :
            this.show_dependent_section = false;
    };
    NewServiceRecordComponent.prototype.formatDate = function (fecha) {
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
    NewServiceRecordComponent.prototype.togglePetsSection = function () {
        !this.show_pets_section ?
            this.show_pets_section = true :
            this.show_pets_section = false;
    };
    NewServiceRecordComponent.prototype.showSupplierSection = function () {
        !this.show_supplier_section ?
            this.show_supplier_section = true :
            this.show_supplier_section = false;
    };
    NewServiceRecordComponent.prototype.navigateTo = function (where_to) {
        if (this.permission_read == false) {
            return true;
        }
        this._router.navigateByUrl(where_to);
    };
    NewServiceRecordComponent.prototype.showFieldDetail = function (event_data) {
        if (event_data === void 0) { event_data = null; }
        var dialogRef = this.dialog.open(nsr_table_detail_component_1.DialogNsrTableDetail, {
            data: {}
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    NewServiceRecordComponent.prototype.previewSelectedPhoto = function (event, field_to_display, fill_model) {
        if (fill_model === void 0) { fill_model = ''; }
        var field_photo = document.getElementById(field_to_display), event_data = event.target.files[0], photo_index = field_to_display.split('_')[3], dependents_model = this.assing_dependents, pets_model = this.assing_pets, root = this;
        if (event_data.type == 'image/png' || event_data.type == 'image/jpg' || event_data.type == 'image/jpeg') {
            var reader = new FileReader();
            reader.onload = function (e) {
                var base64 = e.target.result;
                field_photo.setAttribute('src', base64);
                switch (fill_model) {
                    case 'dependents':
                        dependents_model[photo_index].photo = base64.split(',')[1];
                        dependents_model[photo_index].PhotoExtension =
                            event_data.name.split('.')[event_data.name.split('.').length - 1];
                        break;
                    case 'pets':
                        pets_model[photo_index].photo = base64.split(',')[1];
                        pets_model[photo_index].PhotoExtension =
                            event_data.name.split('.')[event_data.name.split('.').length - 1];
                        break;
                    case 'profile':
                        root.new_service_record_data.assigneeInformations[0].photo = base64.split(',')[1];
                        root.new_service_record_data.assigneeInformations[0].PhotoExtension =
                            event_data.name.split('.')[event_data.name.split('.').length - 1];
                        root.no_main_photo = false;
                        break;
                }
            };
            reader.readAsDataURL(event_data);
        }
    };
    NewServiceRecordComponent.prototype.dateWorker = function (date_in) {
        var date_actions = {
            set_date: function (d) { this.date = d; },
            split_date: function () { this.date_split = date_in.split('T'); },
            get_date: function () { return this.date_split[0]; }
        };
        var work_date = Object.create(date_actions);
        work_date.split_date();
        return work_date.get_date();
    };
    NewServiceRecordComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.service_records_table_data.filter = filterValue.trim().toLowerCase();
    };
    NewServiceRecordComponent.prototype.scrollPageTo = function (x_position, y_position) {
        if (x_position === void 0) { x_position = 0; }
        if (y_position === void 0) { y_position = 0; }
        window.scrollTo(x_position, y_position);
    };
    NewServiceRecordComponent.prototype.removeErrorLabel = function (input_value, object_data) {
        if (input_value == "" || input_value == null) {
            object_data.handler[object_data.field] = true;
        }
        else {
            object_data.handler[object_data.field] = false;
        }
    };
    NewServiceRecordComponent.prototype.getTodayDay = function () {
        var date = {
            date: function () { return new Date(); },
            day: function () { return this.date().getDate(); },
            month: function () { return this.date().getMonth() + 1; },
            year: function () { return this.date().getFullYear(); },
            today: function () {
                return this.month() + "/" + this.day() + "/" + this.year();
            }
        };
        return date.today();
    };
    NewServiceRecordComponent.prototype.validateEmail = function (email_in) {
        var result = true;
        var validating_email = this.emailPattern.test(email_in);
        if (!validating_email)
            result = false;
        return result;
    };
    NewServiceRecordComponent.prototype.validateEmailServerAvailability = function (mail) {
        var _this = this;
        if (mail != '') {
            this._services.service_general_get("User/VeryfyEmail?email=" + mail)
                .subscribe(function (response) {
                console.log('Res => ', response);
                if (!response.success) {
                    _this.showGeneralMessageDialog('Email already exists', 'The email already exists, perhaps it has been used in any service record.');
                    _this.new_service_record_data.assigneeInformations[0].email = '';
                }
            }, function (error) {
                console.error('Error (User/VeryfyEmail) => ', error);
            });
        }
    };
    NewServiceRecordComponent.prototype.calculateHowOld = function () {
        var my_bd = this.new_service_record_data.assigneeInformations[0].birth;
        if (my_bd != null || my_bd != '') {
            this.new_service_record_data.assigneeInformations[0].age = calculateAge(my_bd);
        }
        else {
            this.new_service_record_data.assigneeInformations[0].age = null;
        }
        function calculateAge(birthday) {
            var ageDifMs = Date.now() - birthday.getTime(), ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    };
    NewServiceRecordComponent.prototype.calculateHowOldDina = function (to_who, value_input, native_input) {
        if (native_input === void 0) { native_input = true; }
        if (!native_input) {
            var field_age_group = document.getElementById(to_who);
            if (value_input != null)
                field_age_group.value = calculateAge(value_input);
            else
                field_age_group.value = null;
        }
        function calculateAge(birthday) {
            var ageDifMs = Date.now() - birthday.getTime(), ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    };
    NewServiceRecordComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    NewServiceRecordComponent.prototype.getValueFromCatalogue = function (catalogue, id_to_find, field_to_find) {
        var result = '';
        catalogue.forEach(function (item) {
            if (item.id == id_to_find) {
                result = item[field_to_find];
            }
        });
        return result;
    };
    NewServiceRecordComponent.prototype.getValueFromCatalogueAfter = function (settings) {
        var _this = this;
        var result = '';
        var get_result = new Promise(function (resolve) {
            _this._services.service_general_get(settings.url)
                .subscribe(function (response) {
                if (response.success) {
                    response.result.value.forEach(function (item) {
                        if (item[settings.id_index] == settings.match) {
                            result = item[settings.field_to_find];
                            resolve(result);
                        }
                    });
                }
            }, function (error) {
                console.error('Error (getValueFromCatalogueAfter) ==> ', error);
            });
        });
        return get_result.then(function (result) {
            return result;
        });
    };
    NewServiceRecordComponent.prototype.changePageToSection = function (sections) {
        var tis_as_button = document.getElementById('tab_immigration_section'), tas_as_button = document.getElementById('tab_assign_section');
        if (!sections.general_form) {
            this.scrollPageTo(0, 0);
            this.showDialogMessage('Partner / Client Information must be completed');
        }
        if (sections.general_form && !sections.assing_form) {
            var dependenttap = document.getElementById('tab_assign_section');
            dependenttap.click();
            this.scrollPageTo(0, 350);
            this.showDialogMessage('Assignee Information must be completed');
        }
        if (this.show_dependent_section) {
            if (sections.general_form && sections.assing_form &&
                (sections.assing_depen)) {
                var dependenttap = document.getElementById('tab_assign_section');
                dependenttap.click();
                this.scrollPageTo(0, 420);
                this.showDialogMessage('Dependents section must be completed');
            }
        }
        if (!this.show_pets_section) {
            if (sections.general_form && sections.assing_form &&
                (sections.assing_pets)) {
                var dependenttap = document.getElementById('tab_assign_section');
                dependenttap.click();
                this.scrollPageTo(0, 420);
                this.showDialogMessage('Pets section must be completed');
            }
        }
        if (sections.general_form &&
            sections.assing_form &&
            !sections.immigration_forms) {
            tis_as_button.click();
            this.scrollPageTo(0, 350);
        }
    };
    NewServiceRecordComponent.prototype.showDialogMessage = function (message, time) {
        if (time === void 0) { time = 6222; }
        this._snackBar.open(message, 'Close', {
            duration: time,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['dialog-mat-custom']
        });
    };
    NewServiceRecordComponent.prototype.getMaxDateTo = function (years_ago) {
        if (years_ago === void 0) { years_ago = 18; }
        var today = new Date(), today_year = today.getFullYear(), today_month = today.getMonth(), today_day = today.getDate(), new_min_date = new Date(today_year - years_ago, today_month, today_day);
        return new_min_date;
    };
    NewServiceRecordComponent.prototype.goBack_ = function () {
        this.show_listado = true;
        //window.history.back();
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], NewServiceRecordComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], NewServiceRecordComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild('paginatorElement', { read: core_1.ElementRef })
    ], NewServiceRecordComponent.prototype, "paginatorHtmlElement");
    NewServiceRecordComponent = __decorate([
        core_1.Component({
            selector: 'new-service-record-component',
            templateUrl: './newServiceRecord.component.html',
            styleUrls: ['./newServiceRecord.component.scss']
        })
    ], NewServiceRecordComponent);
    return NewServiceRecordComponent;
}());
exports.NewServiceRecordComponent = NewServiceRecordComponent;
//Ex: Class and Models
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
        this.coordinator = '';
        this.partner = '';
        this.client = '';
        this.country = '';
        this.city = '';
        this.vip = '';
        this.supplier = '';
        this.sr = '';
        this.startDate = '';
        this.endDate = '';
        this.serviceLine = '';
    }
    return FilterData;
}());
var NewServiceRecordData = /** @class */ (function () {
    function NewServiceRecordData() {
        this.id = 0;
        this.office = '';
        this.initialAutho = '';
        this.inithialAuthoAcceptance = '';
        this.partnerId = null;
        this.clientId = null;
        this.clientFileNumber = null;
        //authorizedBy:boolean = null;
        this.copyOnEmail = false;
        this.spoc = false;
        this.vip = false;
        this.confidentialMove = false;
        this.specialIntructions = '';
        this.assigneeInformationId = 0;
        this.assigneeInformations = [new AssigneeInformationModel()];
        this.immigrationCoodinators = [];
        this.immigrationSupplierPartners = [];
        this.relocationCoordinators = [];
        this.relocationSupplierPartners = [];
        this.authorizedByImmigration = '';
        this.authorizedByRelocation = '';
        this.copyOnEmailImmigration = false;
        this.copyOnEmailRelocation = false;
        this.spocImmigration = false;
        this.spocRelocation = false;
        this.createdBy = 0;
        this.urgent = false;
    }
    return NewServiceRecordData;
}());
var AssigneeInformationModel = /** @class */ (function () {
    function AssigneeInformationModel() {
        this.id = 0;
        this.assigneePhoto = '';
        this.assigneeName = '';
        this.assigneeNameId = 0;
        this.sexId = 1;
        this.birth = '';
        this.age = null;
        this.nationalityId = null;
        this.maritalStatusId = null;
        this.policyTypeId = null;
        this.assignmentDuration = '';
        this.assignmentDurationTime = '1';
        this.initialArrival = '';
        this.homeCountryId = null;
        this.homeCityId = null;
        this.currentPosition = '';
        this.hostCountry = null;
        this.photo = '';
        this.PhotoExtension = '';
        this.hostCityId = null;
        this.newPosition = '';
        this.dependentInformation = null;
        this.pets = null;
        this.email = '';
        this.dependentInformations = [];
        this.petsNavigation = [];
        this.languagesSpokens = [];
        this.languagesSpokens_ = [];
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
var LanguagesSpokensModelDependent = /** @class */ (function () {
    function LanguagesSpokensModelDependent() {
        this.dependent = 0;
        this.language = 0;
    }
    return LanguagesSpokensModelDependent;
}());
var DependentInformationsModel = /** @class */ (function () {
    function DependentInformationsModel() {
        this.id = 0;
        this.sex = 1;
        this.photo = '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';
        this.PhotoExtension = 'jpg';
        this.relationshipId = '0';
        this.name = '';
        this.birth = '';
        this.age = '';
        this.nationalityId = '';
        this.aditionalComments = '';
        this.assigneeInformationId = 0;
        this.languageDependentInformations = [];
        this.languageDependentInformations_ = [];
        this.email = '';
        this.currentGrade = '';
        this.ifOther = '';
    }
    return DependentInformationsModel;
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
        this.PhotoExtension = 'jpg';
        this.weightMeasuresId = '';
        this.assigneeInformationId = 0;
        this.photo = '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';
    }
    return PetsNavigationModel;
}());
var immigrationCoodinators = /** @class */ (function () {
    function immigrationCoodinators() {
        this.id = 0;
        this.coordinatorTypeId = 0;
        this.coordinatorId = 0;
        this.assigned = '';
        this.accepted = '01/01/1900';
        this.serviceRecordId = 0;
        this.statusId = 2;
    }
    return immigrationCoodinators;
}());
var immigrationSupplierPartners = /** @class */ (function () {
    function immigrationSupplierPartners() {
        this.id = 0;
        this.supplierTypeId = null;
        this.supplierCompanyId = null;
        this.assignedDate = '';
        this.assignedServicesId = null;
        this.serviceRecordId = 0;
        this.supplierId = null;
        this.statusId = 2;
    }
    return immigrationSupplierPartners;
}());
var relocationCoordinators = /** @class */ (function () {
    function relocationCoordinators() {
        this.id = 0;
        this.coordinatorTypeId = '';
        this.coordinatorId = '';
        this.assigned = '';
        this.accepted = '01/01/1900';
        this.serviceRecordId = 0;
        this.statusId = 2;
    }
    return relocationCoordinators;
}());
var relocationSupplierPartners = /** @class */ (function () {
    function relocationSupplierPartners() {
        this.id = 0;
        this.supplierTypeId = null;
        this.supplierCompanyId = null;
        this.assignedDate = '';
        this.assignedServicesId = null;
        this.serviceRecordId = 0;
        this.supplierId = null;
        this.statusId = 2;
    }
    return relocationSupplierPartners;
}());
