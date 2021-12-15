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
exports.DialogArrivalComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var table_1 = require("@angular/material/table");
var loader_1 = require("app/shared/loader");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var dialog_export_component_1 = require("../dialog-export/dialog-export.component");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts"); // fonts provided for pdfmake
var DialogArrivalComponent = /** @class */ (function () {
    function DialogArrivalComponent(_services, _dialog) {
        this._services = _services;
        this._dialog = _dialog;
        this.__loader__ = new loader_1.LoaderComponent();
        this.range = new forms_1.FormGroup({
            rangeDate1: new forms_1.FormControl(),
            rangeDate2: new forms_1.FormControl()
        });
        this.displayedColumns = ['ServiceRecord', 'VIP', 'ArrivalDate', 'AssigneeName', 'Partner', 'Client', 'Coordinator', 'Supplier', 'Location', 'Services'];
        // filtros select
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterPartner = { coordinator: '' };
        this.filterClient = { name: '' };
        this.filterCoordinator = { coordinator: '' };
        this.filterSupplier = { comercialName: '' };
        // @ViewChild('arrivalpag') arrivalpag: MatPaginator;
        this.filteruno = false;
        this.data_search = {};
        this.ca_cliente = [];
        this.ca_partner = [];
        this.supplier_catalogue = [];
        this.ca_coordinator = [];
        this.country_select = [];
        this.city_select = [];
    }
    DialogArrivalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        this._services.service_general_get('MyDashboard/GetUpcomingArrivals/' + this.user.id).subscribe(function (data) {
            if (data.success) {
                console.log(data.map.value);
                _this.data_table = new table_1.MatTableDataSource(data.map.value);
                _this.data_table.paginator = _this.arrivalpag;
                _this.data_table.sort = _this.arrivalsort;
            }
        });
        this.catalogos();
    };
    //*******************************************//
    DialogArrivalComponent.prototype.ableCityField = function () {
        var _this = this;
        this.city_select = [];
        this._services.service_general_get("Catalogue/GetState?country=" + this.data_search.country)
            .subscribe(function (response) {
            if (response.success) {
                _this.city_select = response.result;
            }
        }, function (error) {
            console.error('Error ==> ', error);
        });
    };
    DialogArrivalComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var city, city_final, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        city = [];
                        city_final = [];
                        //this.ca_coordinator = await this._services.getCatalogueFrom('GetCoordinator');
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPartner')];
                    case 1:
                        //this.ca_coordinator = await this._services.getCatalogueFrom('GetCoordinator');
                        _a.ca_partner = _c.sent();
                        //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
                        _b.country_select = _c.sent();
                        // for (let i = 0; i < country.length; i++) {
                        //   this._services.service_general_get('Catalogue/GetState?country=' + country[i].id).subscribe((data => {
                        //     if (data.success) {
                        //         city = data.result;
                        //         for (let j = 0; j < city.length; j++) {
                        //           city_final.push(city[j]);
                        //         }
                        //     }
                        //   }))
                        // }
                        // console.log("CIUDADES DINALES: ", city_final);
                        // this.city_select = city_final;
                        this.__loader__.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    //*******************************************//
    //CONSULTA DE CLIENTE//
    DialogArrivalComponent.prototype.getClient = function () {
        var _this = this;
        console.log("consulta Cliente");
        this._services.service_general_get('Catalogue/GetClient/' + this.data_search.partner).subscribe((function (data) {
            if (data.success) {
                _this.ca_cliente = data.result.value;
            }
        }));
    };
    //CONSULTA PARA TRAER LOS COORDINATOR//
    DialogArrivalComponent.prototype.getCoordinator = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.data_search.client).subscribe((function (data) {
            if (data.success) {
                console.log("select coordinator: ", data.result);
                _this.ca_coordinator = data.result.value;
            }
        }));
    };
    //CONSULTA DE SUPPLIER PARTNER//
    DialogArrivalComponent.prototype.getSupplierPartner = function () {
        var _this = this;
        if (this.data_search.city == "") {
            return true;
        }
        this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerConsultant?country=" + this.data_search.country + "&city=" + this.data_search.city).subscribe((function (data) {
            if (data.success) {
                console.log("select supplier: ", data.result.value);
                _this.supplier_catalogue = data.result.value;
            }
        }));
    };
    //*******************************************//
    //FILTRO FECHA//
    DialogArrivalComponent.prototype.filteringServiceRecordTable = function () {
        var service_record_params_selected = '';
        var params = '';
        if (this.range.value.rangeDate1 != null && this.range.value.rangeDate1 != '')
            this.data_search.rangeDate1 = this.filterDate(this.range.value.rangeDate1);
        if (this.range.value.rangeDate2 != null && this.range.value.rangeDate2 != '')
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
    //*******************************************//
    DialogArrivalComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //*******************************************//
    //CONSULTA INFORMACION POR FILTRO//
    DialogArrivalComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('MyDashboard/GetUpcomingArrivals/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                var eventos = data.map.value;
                console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
                _this.data_table = new table_1.MatTableDataSource(data.map.value);
                _this.data_table.paginator = _this.arrivalpag;
                _this.data_table.sort = _this.arrivalsort;
                _this.__loader__.hideLoader();
            }
        });
    };
    //********************************************//
    //FUNCION PARA BUSQUEDA DE EVENTOS//
    DialogArrivalComponent.prototype.searchData = function () {
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
    //*********************************************//
    DialogArrivalComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.data_table.filter = filterValue.trim().toLowerCase();
    };
    //*********************************************//
    DialogArrivalComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.data_search.filter = '';
        this.data_search.city = '';
        this.data_search.country = '';
        this.data_search.partner = '';
        this.data_search.client = '';
        this.data_search.coordinator = '';
        this.data_search.supplier = '';
        this.range.reset({ rangeDate1: '', rangeDate2: '' });
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterPartner = { coordinator: '' };
        this.filterClient = { name: '' };
        this.filterCoordinator = { coordinator: '' };
        this.filterSupplier = { comercialName: '' };
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    //*********************************************//
    DialogArrivalComponent.prototype.showExportDialog = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_export_component_1.DialogExportComponent, {
            data: this.data_table.filteredData,
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result === 1) {
                document.getElementById("excel").click();
            }
            if (result === 2) {
                var tabla = [['Service Record', 'VIP', 'Arrival Date', 'Assignee Name', 'Partner', 'Client', 'Coordinator', 'Supplier', 'Location', 'Services']];
                for (var i = 0; i < _this.data_table.filteredData.length; i++) {
                    var element = _this.data_table.filteredData[i];
                    if (element.status) {
                        element.status = 'Active';
                    }
                    else {
                        element.status = 'Inactive';
                    }
                    tabla.push([
                        element.numberServiceRecord,
                        element.vip,
                        element.initialArrival,
                        element.assigneeName,
                        element.partner,
                        element.client,
                        element.coordinator,
                        element.supplier,
                        element.location,
                        element.services
                    ]);
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
                pdf.create().download('arrivals.pdf');
            }
        });
    };
    __decorate([
        core_1.ViewChild('arrivalsort')
    ], DialogArrivalComponent.prototype, "arrivalsort");
    __decorate([
        core_1.ViewChild('arrivalpag')
    ], DialogArrivalComponent.prototype, "arrivalpag");
    DialogArrivalComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-arrival',
            templateUrl: './dialog-arrival.component.html',
            styleUrls: ['./dialog-arrival.component.css']
        })
    ], DialogArrivalComponent);
    return DialogArrivalComponent;
}());
exports.DialogArrivalComponent = DialogArrivalComponent;
