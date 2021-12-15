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
exports.DialogDashboardRemindersComponent = void 0;
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var forms_1 = require("@angular/forms");
var dialog_dashboard_add_reminders_component_1 = require("../dialog-dashboard-add-reminders/dialog-dashboard-add-reminders.component");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var DialogDashboardRemindersComponent = /** @class */ (function () {
    function DialogDashboardRemindersComponent(_dialog, _services) {
        this._dialog = _dialog;
        this._services = _services;
        this.__loader__ = new loader_1.LoaderComponent();
        this.displayedColumns = ['ServiceRecord_', 'ServiceLine_', 'ServiceName_', 'Date_', 'Assignee_', 'Partner_', 'Client_', 'City_', 'Accion'];
        this.filteruno = false;
        this.range = new forms_1.FormGroup({
            rangeDate1: new forms_1.FormControl(),
            rangeDate2: new forms_1.FormControl()
        });
        this.data_search = {};
        this.ca_service_record = [];
        this.serviceLine = [];
        this.wo_ = [];
        this.filterCity = { city: '' };
        this.filterServiceRecord = { numberServiceRecord: '', assigneeName: '' };
        this.filterWorkOrder = { numberWorkOrder: '' };
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    DialogDashboardRemindersComponent.prototype.consultaPermisos = function () {
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
    //*********************************************//
    DialogDashboardRemindersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaPermisos();
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        this._services.service_general_get('MyDashboard/GetReminders/' + this.user.id).subscribe((function (data) {
            if (data.success) {
                console.log(data.map.value);
                _this.data_table = new table_1.MatTableDataSource(data.map.value);
                _this.data_table.paginator = _this.DataFollow;
                _this.data_table.sort = _this.sort;
                _this._services.service_general_get('Catalogue/GetServiceRecord/' + _this.user.id).subscribe((function (data) {
                    if (data.success) {
                        console.log(data.result);
                        _this.ca_service_record = data.result;
                        _this.__loader__.hideLoader();
                    }
                }));
            }
        }), function (err) {
            console.log("Error al consultar reminder: ", err);
            _this._services.service_general_get('Catalogue/GetServiceRecord/' + _this.user.id).subscribe((function (data) {
                if (data.success) {
                    console.log(data.result);
                    _this.ca_service_record = data.result;
                    _this.__loader__.hideLoader();
                }
            }));
            _this.__loader__.hideLoader();
        });
        this.catalogos();
    };
    //********************************************************************************************************//
    DialogDashboardRemindersComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var city, city_final, _a, country, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        city = [];
                        city_final = [];
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        _a.serviceLine = _b.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        country = _b.sent();
                        for (i = 0; i < country.length; i++) {
                            this._services.service_general_get('Catalogue/GetState?country=' + country[i].id).subscribe((function (data) {
                                if (data.success) {
                                    city = data.result;
                                    for (var j = 0; j < city.length; j++) {
                                        city_final.push(city[j]);
                                    }
                                }
                            }));
                        }
                        console.log("CIUDADES DINALES: ", city_final);
                        this.city_select = city_final;
                        return [2 /*return*/];
                }
            });
        });
    };
    //********************************************************************************************************//
    //FILTRO FECHA//
    DialogDashboardRemindersComponent.prototype.filteringServiceRecordTable = function () {
        var service_record_params_selected = '';
        var params = '';
        if (this.range.value.rangeDate1 != null)
            this.data_search.rangeDate1 = this.filterDate(this.range.value.rangeDate1);
        if (this.range.value.rangeDate2 != null)
            this.data_search.rangeDate2 = this.filterDate(this.range.value.rangeDate2);
        for (var item in this.data_search) {
            if (this.data_search[item] != '') {
                service_record_params_selected += item + "=" + this.data_search[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        if (this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null) {
            this.getServiceRecordTableData(params);
        }
    };
    //********************************************************************************************************//
    DialogDashboardRemindersComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //********************************************************************************************************//
    //CONSULTA INFORMACION POR FILTRO//
    DialogDashboardRemindersComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('MyDashboard/GetReminders/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                var eventos = data.map.value;
                console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
                _this.data_table = new table_1.MatTableDataSource(data.map.value);
                _this.data_table.paginator = _this.DataFollow;
                _this.data_table.sort = _this.sort;
                _this.__loader__.hideLoader();
            }
        });
    };
    //********************************************************************************************************//
    //FUNCION PARA BUSQUEDA DE EVENTOS//
    DialogDashboardRemindersComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.data_search) {
            if (this.data_search[item] != '') {
                service_record_params_selected += item + "=" + this.data_search[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.getServiceRecordTableData(params);
    };
    //********************************************************************************************************//
    DialogDashboardRemindersComponent.prototype.getWO = function () {
        var _this = this;
        this.__loader__.showLoader();
        this._services.service_general_get('Catalogue/GetWorkOrderByServiceLine?sr=' + this.data_search.sr + '&sl=' + this.data_search.sl).subscribe(function (data) {
            if (data.success) {
                console.log("ESTOS SON LAS WO:  ", data.result);
                _this.wo_ = data.result;
                _this.__loader__.hideLoader();
            }
        });
    };
    //********************************************************************************************************//
    DialogDashboardRemindersComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.data_search = {
            sr: '',
            coordinator: ''
        };
        this.range.reset({ rangeDate1: '', rangeDate2: '' });
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    //********************************************************************************************************//
    DialogDashboardRemindersComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.data_table.filter = filterValue.trim().toLowerCase();
    };
    //********************************************************************************************************//
    DialogDashboardRemindersComponent.prototype.addReminder = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_dashboard_add_reminders_component_1.DialogDashboardAddRemindersComponent, {
            data: "0",
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    //********************************************************************************************************//
    DialogDashboardRemindersComponent.prototype.viewRegister = function (data) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_dashboard_add_reminders_component_1.DialogDashboardAddRemindersComponent, {
            data: data,
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], DialogDashboardRemindersComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild('DataFollow')
    ], DialogDashboardRemindersComponent.prototype, "DataFollow");
    DialogDashboardRemindersComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-dashboard-reminders',
            templateUrl: './dialog-dashboard-reminders.component.html',
            styleUrls: ['./dialog-dashboard-reminders.component.css']
        })
    ], DialogDashboardRemindersComponent);
    return DialogDashboardRemindersComponent;
}());
exports.DialogDashboardRemindersComponent = DialogDashboardRemindersComponent;
