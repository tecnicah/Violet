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
exports.RequestCenterComponent = void 0;
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var forms_1 = require("@angular/forms");
var table_1 = require("@angular/material/table");
var loader_1 = require("app/shared/loader");
var dialog_requested_invoice_component_1 = require("../dialog/dialog-requested-invoice/dialog-requested-invoice.component");
var dialog_request_payment_new_component_1 = require("../dialog/dialog-request-payment-new/dialog-request-payment-new.component");
var RequestCenterComponent = /** @class */ (function () {
    function RequestCenterComponent(_services, router, _dialog) {
        this._services = _services;
        this.router = router;
        this._dialog = _dialog;
        this.filteruno = false;
        this.displayedColumns = ['Service Record', 'Service Line', 'Request Date', 'Request Type', 'Description', 'Amount', 'Currency', 'Due Date', 'Country', 'Status', 'Accion'];
        this.__loader__ = new loader_1.LoaderComponent();
        this.range = new forms_1.FormGroup({
            rangeDate1: new forms_1.FormControl(),
            rangeDate2: new forms_1.FormControl()
        });
        this.data = {};
        //******************************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        //************************************************************************************//
        //CONSULTA DE CATALOGOS//
        this.ca_invoice = [];
        this.ca_serviceLine = [];
        this.ca_partner = [];
        this.ca_status = [];
        this.ca_country = [];
        //*************************************************************************************//
        this.ca_cliente = [];
        //*************************************************************************************//
        this.ca_coordinator = [];
        //*************************************************************************************//
        //DATA A IMPRIMIR DE MODAL//
        this.data_registro = {};
    }
    //************************************************************************************//
    //CONSULTA DE INFORMACION PARA LA TABLA//
    RequestCenterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        this._services.service_general_get('RequestInvoice/GetRequestCenter').subscribe((function (data) {
            if (data.success) {
                console.log(data.result.value);
                _this.dataSource = new table_1.MatTableDataSource(data.result.value);
                _this.dataSource.paginator = _this.DataFollow;
                _this.dataSource.sort = _this.sort;
                _this.__loader__.hideLoader();
            }
        }));
        this.catalogos();
        this.consultaPermisos();
    };
    RequestCenterComponent.prototype.consultaPermisos = function () {
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
    RequestCenterComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 1:
                        _a.ca_invoice = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 2:
                        _b.ca_serviceLine = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPartner')];
                    case 3:
                        _c.ca_partner = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusInvoice')];
                    case 4:
                        _d.ca_status = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 5:
                        _e.ca_country = _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RequestCenterComponent.prototype.getCliente = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetClient/' + this.data.partner).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data.success) {
                    console.log('DATA CONSULTA: ', data);
                    this.ca_cliente = data.result.value;
                }
                return [2 /*return*/];
            });
        }); });
    };
    RequestCenterComponent.prototype.getCoordinator = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetCoordinator/' + this.data.client + "?servileLine=" + this.data.serviceLine).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data.success) {
                    console.log('DATA CONSULTA: ', data);
                    this.ca_coordinator = data.result.value;
                }
                return [2 /*return*/];
            });
        }); });
    };
    //*************************************************************************************//
    //BUSQUEDA DE INFORMACION A TRAVES DE CAMPO ABIERTO//
    RequestCenterComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    //*************************************************************************************//
    //BUSQUEDA DE INFORMACION A TRAVES DE CATALOGOS//
    RequestCenterComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.data) {
            if (this.data[item] != '') {
                service_record_params_selected += item + "=" + this.data[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.consultaInformacionPorFiltro(params);
    };
    //*************************************************************************************//
    //CONSULTA INFORMACION POR FILTRO//
    RequestCenterComponent.prototype.consultaInformacionPorFiltro = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        console.log(params_in);
        this._services.service_general_get('RequestInvoice/GetInvoiceList/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                var eventos = data.result.value;
                console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
                _this.dataSource = new table_1.MatTableDataSource(data.result.value);
                _this.dataSource.paginator = _this.DataFollow;
                _this.dataSource.sort = _this.sort;
                _this.__loader__.hideLoader();
            }
        });
    };
    //*************************************************************************************//  
    //FILTRO FECHA//
    RequestCenterComponent.prototype.filteringServiceRecordTable = function () {
        var service_record_params_selected = '';
        var params = '';
        if (this.range.value.rangeDate1 != null)
            this.data.renge1 = this.filterDate(this.range.value.rangeDate1);
        if (this.range.value.rangeDate2 != null)
            this.data.range2 = this.filterDate(this.range.value.rangeDate2);
        for (var item in this.data) {
            if (this.data[item] != '') {
                service_record_params_selected += item + "=" + this.data[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        if (this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null) {
            this.consultaInformacionPorFiltro(params);
        }
    };
    //*************************************************************************************//
    RequestCenterComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //*************************************************************************************//
    //ENTRA A LIMPIAR FILTROS DE BUSQUEDA//
    RequestCenterComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.data = {};
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    RequestCenterComponent.prototype.sr = function (element) {
        this.data_registro.assinee = element.asignee;
        this.data_registro.partner = element.partner;
        this.data_registro.client = element.client;
        this.data_registro.coordinator = element.coordinator;
    };
    //*************************************************************************************//
    //FUNCION PARA LA EDICION DEL REGISTRO//
    RequestCenterComponent.prototype.editarInvoice = function (element) {
        console.log("DATA A EDITAR: ", element);
        if (element.request_id == 1) {
            this.thirdPartyInvoice(element);
        }
        if (element.request_id == 2) {
            this.requestPayment(element);
        }
    };
    //*************************************************************************************//
    //FUNCION PARA LA EDICION DEL REGISTRO (THIRD PARTY INVOICE) REQUEST PAYMENT//
    RequestCenterComponent.prototype.thirdPartyInvoice = function (element) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent, {
            width: "95%",
            data: { id: element.id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    //*************************************************************************************//
    //FUNCION PARA LA EDICION DEL REGISTRO (THIRD PARTY INVOICE)//
    RequestCenterComponent.prototype.requestPayment = function (element) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_requested_invoice_component_1.DialogRequestedInvoiceComponent, {
            width: "95%",
            data: { id: element.id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], RequestCenterComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild('DataFollow')
    ], RequestCenterComponent.prototype, "DataFollow");
    RequestCenterComponent = __decorate([
        core_1.Component({
            selector: 'app-request-center',
            templateUrl: './request-center.component.html',
            styleUrls: ['./request-center.component.css']
        })
    ], RequestCenterComponent);
    return RequestCenterComponent;
}());
exports.RequestCenterComponent = RequestCenterComponent;
