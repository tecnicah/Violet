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
exports.NotificationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var loader_1 = require("app/shared/loader");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(_services, _dialog, full) {
        this._services = _services;
        this._dialog = _dialog;
        this.full = full;
        this.date_ = new Date();
        this.data_model = {};
        this.filteruno = false;
        this.range = new forms_1.FormGroup({
            dateRange1: new forms_1.FormControl(),
            dateRange2: new forms_1.FormControl()
        });
        this.__loader__ = new loader_1.LoaderComponent();
        this.filterNotification = { type: '' };
        this.filterServiceRecord = { numberServiceRecord: '' };
        //*************************************************************//
        this.ca_notificationType = [];
        this.ca_SR = [];
        //*************************************************************//
        //CONSULTA DE INFORMACION DE LAS NOTIFICACIONES//
        this.ca_notification = {};
    }
    //*************************************************************//
    NotificationComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log("USER LOGUEADO: ", this.user);
        this.data_model.archive = false;
        this.get_catalogos();
        this.get_Notification();
    };
    NotificationComponent.prototype.goBack = function () {
        window.history.back();
    };
    NotificationComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this._services.service_general_get('Catalogue/GetNotificationSystemType').subscribe((function (dataN) {
                    if (dataN.success) {
                        _this.ca_notificationType = dataN.result;
                        console.log('CATALOG NOTIFICATION TYPE: ', _this.ca_notificationType);
                    }
                }));
                // this.ca_notificationType = await this._services.getCatalogueFrom('Catalogue/GetNotificationSystemType');
                this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe((function (data) {
                    if (data.success) {
                        console.log('DATA CONSULTA SR: ', data);
                        _this.ca_SR = data.result;
                    }
                }));
                return [2 /*return*/];
            });
        });
    };
    NotificationComponent.prototype.get_Notification = function () {
        var _this = this;
        this._services.service_general_get('Notification/GetNotificationCenter/' + this.user.id).subscribe((function (data) {
            if (data.success) {
                console.log('DATA CONSULTA NOTIFICACIONES: ', data);
                //this.ca_notification = data.result.value;
                _this.ca_notification = new table_1.MatTableDataSource(data.result.value);
                _this.ca_notification.paginator = _this.DataFollow;
                _this.ca_notification.sort = _this.sort;
                console.log(_this.ca_notification);
            }
        }));
    };
    //*************************************************************//
    //FILTRO DE BUSQUEDA MANUAL//
    NotificationComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.ca_notification.filter = filterValue.trim().toLowerCase();
    };
    //*************************************************************//
    //FILTRO FECHA//
    NotificationComponent.prototype.filteringServiceRecordTable = function () {
        var service_record_params_selected = '';
        var params = '';
        if (this.range.value.dateRange1 != null)
            this.data_model.dateRange1 = this.filterDate(this.range.value.dateRange1);
        if (this.range.value.dateRange2 != null)
            this.data_model.dateRange2 = this.filterDate(this.range.value.dateRange2);
        for (var item in this.data_model) {
            if (this.data_model[item] != '') {
                service_record_params_selected += item + "=" + this.data_model[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        if (this.range.value.dateRange1 != null && this.range.value.dateRange2 != null) {
            this.getServiceRecordTableData(params);
        }
    };
    //*************************************************************//
    NotificationComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //*************************************************************//
    NotificationComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.data_model) {
            if (this.data_model[item] != '') {
                service_record_params_selected += item + "=" + this.data_model[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.getServiceRecordTableData(params);
    };
    //*************************************************************//
    NotificationComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('Notification/GetNotificationCenter/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                console.log("ESTAS SON LAS NOTIFICACIONES FILTRADAS:  ", data.result.value);
                _this.ca_notification = new table_1.MatTableDataSource(data.result.value);
                _this.ca_notification.paginator = _this.DataFollow;
                _this.ca_notification.sort = _this.sort;
                _this.__loader__.hideLoader();
            }
        });
    };
    //*************************************************************//
    //LIMPIEZA DE FILTROS//
    NotificationComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.filterNotification = { type: '' };
        this.filterServiceRecord = { numberServiceRecord: '' };
        this.range.reset({
            dateRange1: '',
            dateRange2: ''
        });
        this.data_model = {};
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    //*************************************************************//
    NotificationComponent.prototype.archive = function (item, data) {
        var _this = this;
        console.log(data);
        debugger;
        if (data.checked) {
            this._services.service_general_put('Notification/PutArchive/' + item.id + "/" + data.checked, '').subscribe(function (data) {
                if (data.success) {
                    console.log("NOTIFICACION ARCHIVADA:  ", data);
                    var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Notification Archived."
                        },
                        width: "350px"
                    });
                    _this.cleanFilter();
                    _this.get_Notification();
                }
            });
        }
        else {
            this._services.service_general_put('Notification/PutArchive/' + item.id + "/" + data.checked, '').subscribe(function (data) {
                if (data.success) {
                    console.log("NOTIFICACION ARCHIVADA:  ", data);
                    var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Notification Archived."
                        },
                        width: "350px"
                    });
                    _this.cleanFilter();
                    _this.get_Notification();
                }
            });
        }
    };
    //*************************************************************//
    NotificationComponent.prototype.marcarLeida = function (data) {
        var _this = this;
        console.log(data);
        if (data.view == false) {
            this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + true, '').subscribe((function (data) {
                if (data.success) {
                    _this.full.get_Notification();
                    _this.ngOnInit();
                }
            }));
        }
        else if (data.view == true) {
            this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + false, '').subscribe((function (data) {
                if (data.success) {
                    _this.full.get_Notification();
                    _this.ngOnInit();
                }
            }));
        }
    };
    //***************************************************//
    //ACEPTAMOS NOTIFICACION//
    NotificationComponent.prototype.accept = function (data_, status) {
        var _this = this;
        console.log(status);
        this._services.service_general_putnoapi(status, '').subscribe((function (data) {
            _this.archive(data_, { checked: true });
            _this.marcarLeida(data_);
        }));
    };
    //DECLINAMOS NOTIFICACION//
    NotificationComponent.prototype.decline = function (data_, status) {
        var _this = this;
        console.log(status);
        this._services.service_general_putnoapi(status, '').subscribe((function (data) {
            console.log(data);
            _this.archive(data_, { checked: true });
            _this.marcarLeida(data_);
        }));
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], NotificationComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild('DataFollow')
    ], NotificationComponent.prototype, "DataFollow");
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'app-notification',
            templateUrl: './notification.component.html',
            styleUrls: ['./notification.component.scss']
        })
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
