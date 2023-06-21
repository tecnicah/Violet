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
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var loader_1 = require("app/shared/loader");
var dialog_following_component_1 = require("../dialog/dialog-following/dialog-following.component");
var dialog_arrival_component_1 = require("../dialog/dialog-arrival/dialog-arrival.component");
var dialog_calls_component_1 = require("../dialog/dialog-calls/dialog-calls.component");
var dialog_dashboard_reminders_component_1 = require("../dialog/dialog-dashboard-reminders/dialog-dashboard-reminders.component");
var dialog_export_component_1 = require("../dialog/dialog-export/dialog-export.component");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts");
var Coordinators_component_1 = require("../dialog/dialog-coordinators/Coordinators.component");
var dialog_availability_calendar_component_1 = require("../dialog/dialog-availability-calendar/dialog-availability-calendar.component");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(_services, _router, _dialog, _permissions) {
        this._services = _services;
        this._router = _router;
        this._dialog = _dialog;
        this._permissions = _permissions;
        this.filterStatus = { status: '' };
        this.filterPartner = { coordinator: '' };
        this.filterClient = { name: '' };
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterCoordinator = { coordinator: '' };
        this.filterSupplier = { comercialName: '' };
        this.__todaydate__ = new Date();
        this.__months__ = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.__loader__ = new loader_1.LoaderComponent();
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        this.service_records_table_data = undefined;
        this.service_records_colums = ['col_0', 'col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6', 'col_7', 'col_8', 'col_9', 'col_10', 'col_11'];
        this.service_records_colums_x = ['col_0', 'col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6', 'col_7', 'col_8', 'col_9', 'col_10'];
        this.dash_data = new DashDataModel();
        this.View_All = 0;
        this.dash_table_params = '';
        this.filter_cards_selected = [];
        this.country_catalogue = [];
        this.city_catalogue = [];
        this.status_catalogue = [];
        this.parther_catalogue = [];
        this.client_catalogue = [];
        this.coordinator_catalogue = [];
        this.serviceline_catalogue = [];
        this.supplier_catalogue = [];
        this.filter_data = new FilterDataModel();
        this.able_city_filter = false;
        //*****************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.consultaPermisos();
        this.initPageSettings();
    };
    DashboardComponent.prototype.initPageSettings = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        var user_rol = [this.__userlog__.role.id];
        this._permissions.loadPermissions(user_rol);
        this.requestDashboarData();
        this.initCataloguesRequest();
    };
    DashboardComponent.prototype.requestDashboarData = function (url_params) {
        var _this = this;
        if (url_params === void 0) { url_params = ''; }
        console.log("ENTRA A CONSULTAR INFORMACION");
        var serv_line = this.filter_data.serviceLine, user_id = this.__userlog__.id;
        console.log(user_id);
        console.log(serv_line);
        console.log(url_params);
        this.__loader__.showLoader();
        this._services.service_general_get("MyDashboard/GetDashboard/" + user_id + "/" + serv_line + url_params)
            .subscribe(function (response) {
            if (response.success) {
                console.log("DASHBOARD RESPONSE: ", response);
                _this.dash_data = new DashDataModel;
                _this.dash_data = response.map.value;
                _this.counts = response.map.value.counts;
                console.log('this.dash_data ==> ', _this.dash_data);
                _this.service_records_table_data = new table_1.MatTableDataSource(_this.dataDashboardFilterByCards(_this.dash_data.board));
                _this.service_records_table_data.paginator = _this.paginator;
                _this.service_records_table_data.sort = _this.sort;
                _this.View_All = _this.service_records_table_data.filteredData.length;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DashboardComponent.prototype.serchFilter = function (event) {
        var filterValue = event.target.value;
        this.service_records_table_data.filter = filterValue.trim().toLowerCase();
    };
    DashboardComponent.prototype.getClient = function () {
        var _this = this;
        console.log("consulta Cliente");
        this._services.service_general_get('Catalogue/GetClient/' + this.filter_data.partner).subscribe((function (data) {
            if (data.success) {
                _this.client_catalogue = data.result.value;
            }
        }));
    };
    DashboardComponent.prototype.getCoordinatorImmigration = function () {
        var _this = this;
        // if(this.filter_data.client== "" || this.filter_data.serviceLine == "" || this.filter_data.city == ""){
        if (this.filter_data.client == "") {
            return true;
        }
        else {
            if (this.filter_data.serviceLine == "" || this.filter_data.serviceLine == null) {
                this._services.service_general_get("Catalogue/GetCoordinator/" + this.filter_data.client).subscribe((function (data) {
                    if (data.success) {
                        console.log("select coordinator new SR Immigration: ", data.result);
                        _this.coordinator_catalogue = data.result.value;
                    }
                }));
            }
            else {
                this._services.service_general_get("Catalogue/GetCoordinator/" + this.filter_data.client + "?servileLine=" + this.filter_data.serviceLine).subscribe((function (data) {
                    if (data.success) {
                        console.log("select coordinator new SR Immigration: ", data.result);
                        _this.coordinator_catalogue = data.result.value;
                    }
                }));
            }
        }
    };
    DashboardComponent.prototype.getSupplierPartner = function () {
        var _this = this;
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
    DashboardComponent.prototype.updateDashboardData = function () {
        console.log("ENTRA A FILTRAR INFORMACION");
        this.dash_table_params = '';
        for (var field in this.filter_data) {
            if (field != 'serviceLine') {
                if (this.filter_data[field] != '') {
                    this.dash_table_params += "&" + field + "=" + this.filter_data[field];
                }
            }
        }
        this.requestDashboarData("?" + this.dash_table_params.substring(1));
    };
    DashboardComponent.prototype.resetDashboardTableFilters = function () {
        this.filterStatus = { status: '' };
        this.filterPartner = { coordinator: '' };
        this.filterClient = { name: '' };
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterCoordinator = { coordinator: '' };
        this.filterSupplier = { comercialName: '' };
        this.client_catalogue = [];
        this.coordinator_catalogue = [];
        this.city_catalogue = [];
        this.filter_data = new FilterDataModel();
        this.requestDashboarData();
    };
    DashboardComponent.prototype.dataDashboardFilterByCards = function (table_rows) {
        var _this = this;
        var rows_in = table_rows;
        var rows_selected = [];
        rows_in.forEach(function (row) {
            if (_this.filter_cards_selected.length != 0) {
                _this.filter_cards_selected.forEach(function (filter_condition) {
                    if (filter_condition == 'vip') {
                        if (row.vip) {
                            rows_selected.push(row);
                            console.log('rows_selected ===> ', rows_selected);
                        }
                    }
                    if (filter_condition == 'act') {
                        if (row.statusId == 2) {
                            rows_selected.push(row);
                        }
                    }
                    if (filter_condition == 'onh') {
                        if (row.statusId == 4) {
                            rows_selected.push(row);
                        }
                    }
                    if (filter_condition == 'pen') {
                        if (row.statusId == 1) {
                            rows_selected.push(row);
                        }
                    }
                });
            }
            else {
                rows_selected.push(row);
            }
        });
        table_rows = [];
        return rows_selected;
    };
    DashboardComponent.prototype.filterTableByCard = function (card_selector) {
        var is_filter_active = (this.filter_cards_selected.indexOf(card_selector) > -1), card_container = document.getElementById(card_selector + "_filter_card"), params_used = this.dash_table_params == '' ? '' : "?" + this.dash_table_params.substring(1);
        // debugger;
        if (is_filter_active) {
            card_container.classList.remove('filterCard__card--active');
            this.filter_cards_selected.splice(this.filter_cards_selected.indexOf(card_selector), 1);
            this.requestDashboarData(params_used);
        }
        else {
            card_container.classList.add('filterCard__card--active');
            this.filter_cards_selected.push(card_selector);
            this.requestDashboarData(params_used);
        }
    };
    DashboardComponent.prototype.openDialogCoordinadors = function () {
        var dialogRef = this._dialog.open(Coordinators_component_1.DialogCoordinatorsComponent, {
            data: {}, width: '95%'
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    DashboardComponent.prototype.showExportDialog = function (current_table) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_export_component_1.DialogExportComponent, {
            data: this.service_records_table_data.filteredData,
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result === 1) {
                document.getElementById("excel").click();
            }
            if (result === 2) {
                console.log('current_table => ', current_table);
                var tabla = [];
                if (current_table == 'm') {
                    tabla.push(['Service Record', 'VIP', 'Status', 'Autho Date', 'Country', 'City',
                        'Partner', 'Client', 'Assignee Name', 'Services', 'Coordinator', 'Supplier Consultant']);
                }
                else if (current_table == 'c') {
                    tabla.push(['Service Record', 'VIP', 'Status', 'Autho Date', 'Country', 'City',
                        'Partner', 'Client', 'Assignee Name', 'Services', 'Supplier Consultant']);
                }
                else if (current_table == 's') {
                    tabla.push(['Service Record', 'VIP', 'Status', 'Autho Date', 'Country', 'City',
                        'Partner', 'Client', 'Assignee Name', 'Services', 'Coordinator']);
                }
                for (var i = 0; i < _this.service_records_table_data.filteredData.length; i++) {
                    var element = _this.service_records_table_data.filteredData[i];
                    if (current_table == 'm') {
                        tabla.push([
                            element.numberServiceRecord,
                            element.vip,
                            element.status,
                            _this.formatDate(element.initialAutho),
                            element.hostCountry,
                            element.homeCity,
                            element.partner,
                            element.client,
                            element.assigneeName,
                            element.bundled.length + element.standalone.length,
                            element.coordinator,
                            element.supplier
                        ]);
                    }
                    else if (current_table == 'c') {
                        tabla.push([
                            element.numberServiceRecord,
                            element.vip,
                            element.status,
                            _this.formatDate(element.initialAutho),
                            element.hostCountry,
                            element.homeCity,
                            element.partner,
                            element.client,
                            element.assigneeName,
                            element.bundled.length + element.standalone.length,
                            element.supplier
                        ]);
                    }
                    else if (current_table == 's') {
                        tabla.push([
                            element.numberServiceRecord,
                            element.vip,
                            element.status,
                            _this.formatDate(element.initialAutho),
                            element.hostCountry,
                            element.homeCity,
                            element.partner,
                            element.client,
                            element.assigneeName,
                            element.bundled.length + element.standalone.length,
                            element.coordinator
                        ]);
                    }
                }
                console.log(tabla);
                // Set the fonts to use
                pdfmake_wrapper_1.PdfMakeWrapper.setFonts(vfs_fonts_1["default"]);
                var pdf = new pdfmake_wrapper_1.PdfMakeWrapper();
                pdf.pageMargins([30, 30, 30, 30]);
                pdf.pageOrientation('landscape');
                pdf.defaultStyle({
                    fontSize: 9,
                    alignment: 'center'
                });
                pdf.add(new pdfmake_wrapper_1.Table(tabla).layout('lightHorizontalLines').end);
                pdf.create().download('Services.pdf');
            }
        });
    };
    DashboardComponent.prototype.initCataloguesRequest = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        _a.serviceline_catalogue = _e.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.country_catalogue = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 3:
                        _c.status_catalogue = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPartner')];
                    case 4:
                        _d.parther_catalogue = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.prototype.ableCityField = function () {
        var _this = this;
        if (this.filter_data.country != '') {
            this.able_city_filter = true;
            this._services.service_general_get("Catalogue/GetState?country=" + this.filter_data.country)
                .subscribe(function (response) {
                if (response.success) {
                    _this.city_catalogue = response.result;
                }
            }, function (error) {
                console.error('Error ==> ', error);
            });
        }
        else {
            this.able_city_filter = false;
        }
    };
    DashboardComponent.prototype.goToPage = function (the_page) {
        this._router.navigateByUrl(the_page);
    };
    DashboardComponent.prototype.openCalendar = function () {
        this._router.navigate(['serviceCalendar']);
    };
    DashboardComponent.prototype.openFollowers = function () {
        var dialogRef = this._dialog.open(dialog_following_component_1.DialogFollowingComponent, {
            data: "",
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    DashboardComponent.prototype.openEscalation = function () {
        this._router.navigate(['escalations']);
    };
    DashboardComponent.prototype.openArraivals = function () {
        var dialogRef = this._dialog.open(dialog_arrival_component_1.DialogArrivalComponent, {
            data: "",
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    DashboardComponent.prototype.openCall = function () {
        var dialogRef = this._dialog.open(dialog_calls_component_1.DialogCallsComponent, {
            data: "",
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    DashboardComponent.prototype.openReminders = function () {
        var dialogRef = this._dialog.open(dialog_dashboard_reminders_component_1.DialogDashboardRemindersComponent, {
            data: "",
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    DashboardComponent.prototype.openAvailavility = function () {
        var dialogRef = this._dialog.open(dialog_availability_calendar_component_1.DialogAvailabilityCalendarComponent, {
            data: "",
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    DashboardComponent.prototype.openNotification = function () {
        this._router.navigate(['notification']);
    };
    DashboardComponent.prototype.formatDate = function (fecha) {
        var date = new Date(fecha), day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear(), montstring = "";
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
        }
        return day + " " + montstring + " " + year;
    };
    DashboardComponent.prototype.goToSR = function (data) {
        console.log(data);
        this._router.navigate(['editServiceRecord/' + data.id]);
    };
    DashboardComponent.prototype.consultaPermisos = function () {
        var _this = this;
        console.log("CONSULTA PARA PERMISOS DE USUARIO");
        var url = localStorage.getItem('url_permisos');
        this._services.service_general_get('Role/' + url).subscribe(function (data) {
            if (data.success) {
                console.log("Permisos: ", data.result.value);
                _this.permission_read = data.result.value[0].reading;
                _this.permission_write = data.result.value[0].writing;
                _this.permission_delete = data.result.value[0].editing;
                _this.permission_edit = data.result.value[0].deleting;
            }
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], DashboardComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], DashboardComponent.prototype, "sort");
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
var FilterDataModel = /** @class */ (function () {
    function FilterDataModel() {
        this.serviceLine = '1';
        this.status = '';
        this.country = '';
        this.city = '';
        this.partner = '';
        this.client = '';
        this.coordinator = '';
        this.supplier = '';
    }
    return FilterDataModel;
}());
var DashDataModel = /** @class */ (function () {
    function DashDataModel() {
        this.active = 0;
        this.inprogress = 0;
        this.onHold = 0;
        this.pendngAcceptance = 0;
        this.vip = 0;
        this.board = [];
    }
    return DashDataModel;
}());
