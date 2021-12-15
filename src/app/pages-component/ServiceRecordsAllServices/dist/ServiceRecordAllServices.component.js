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
exports.ServiceRecordAllServicesComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("../../../app/shared/loader");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var forms_1 = require("@angular/forms");
var dialog_export_component_1 = require("../dialog/dialog-export/dialog-export.component");
var sort_1 = require("@angular/material/sort");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts"); // fonts provided for pdfmake
var ServiceRecordAllServicesComponent = /** @class */ (function () {
    function ServiceRecordAllServicesComponent(_dialog, _router, _services, formBuilder, dialog, exportAsService, _routerParams) {
        this._dialog = _dialog;
        this._router = _router;
        this._services = _services;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.exportAsService = exportAsService;
        this._routerParams = _routerParams;
        this.loader = new loader_1.LoaderComponent();
        this.service_type_catalog = [];
        this.status_catalog = [];
        this.exportAsConfig = {
            type: 'pdf',
            elementIdOrContent: 'export',
            options: {
                orientation: 'landscape'
            }
        };
        this.data_all = {};
        this.filteruno = false;
        this.table_columns = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5', 'campo_6', 'campo_7', 'campo_8', 'campo_9', 'campo_10', 'campo_11', 'campo_12'];
        this.data_services = [];
        this.filter_data = {};
        this.range = new forms_1.FormGroup({
            start: new forms_1.FormControl(),
            end: new forms_1.FormControl()
        });
        //************************************************************************//
        //FUNCION PARA TABS//
        this.service_line_ = 1;
        //************************************************************************//
        //CONSULTA DE INFORMACION POR FILTRO//
        this.service_record_params_selected = '';
    }
    //************************************************************************//
    ServiceRecordAllServicesComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("Entra a Immigration");
                        this.numSR = this._routerParams.snapshot.params.id;
                        this.loader.showLoader();
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTypeService')];
                    case 1:
                        _a.service_type_catalog = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusWorkOrder')];
                    case 2:
                        _b.status_catalog = _c.sent();
                        return [4 /*yield*/, this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=' + this.service_line_ + '&serviceRecordId=' + this.numSR)
                                .subscribe(function (response) {
                                console.log(response.result.value);
                                if (response.success) {
                                    _this.data_services = new table_1.MatTableDataSource(response.result.value);
                                    _this.data_services.paginator = _this.DataFollow;
                                    _this.data_services.sort = _this.sort;
                                }
                            })];
                    case 3:
                        _c.sent();
                        this.loader.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    //************************************************************************//
    ServiceRecordAllServicesComponent.prototype.getDataRelocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Entra a Relocation");
                        this.loader.showLoader();
                        return [4 /*yield*/, this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=' + this.service_line_ + '&serviceRecordId=' + this.numSR)
                                .subscribe(function (response) {
                                console.log(response.result.value);
                                if (response.success) {
                                    _this.data_services = new table_1.MatTableDataSource(response.result.value);
                                    _this.data_services.paginator = _this.DataFollowS;
                                    _this.data_services.sort = _this.sort;
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.loader.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceRecordAllServicesComponent.prototype.Line = function (param) {
        console.log(param);
        if (param.index == 0) {
            this.service_line_ = 1;
            this.ngOnInit();
        }
        else {
            this.service_line_ = 2;
            this.getDataRelocation();
        }
    };
    //************************************************************************//
    //BUSQUEDA DE INFORMACION A TRAVES DE CAMPO ABIERTO (IMMIGRATION Y RELOCATION)//
    ServiceRecordAllServicesComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.data_services.filter = filterValue.trim().toLowerCase();
    };
    //************************************************************************//
    //FUNCION PARA BUSQUEDA DE INFORMACION POR FILTROS//
    ServiceRecordAllServicesComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.filter_data) {
            if (this.filter_data[item] != '') {
                service_record_params_selected += item + "=" + this.filter_data[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        if (this.service_line_ == 1) {
            this.getServiceRecordTableData(params);
        }
        else {
            this.getServiceRecordTableDataRelocation(params);
        }
    };
    //************************************************************************//
    //CONSULTA INFORMACION POR FILTRO IMMIGRATION//
    ServiceRecordAllServicesComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.loader.showLoader();
        var params_in = params == '' ? '' : "&" + params;
        this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=' + this.service_line_ + '&serviceRecordId=' + this.numSR + params_in).subscribe(function (data) {
            if (data.success) {
                console.log("FILTROS DE IMMIGRATION: ", data);
                _this.data_services = new table_1.MatTableDataSource(data.result.value);
                _this.data_services.paginator = _this.DataFollow;
                _this.data_services.sort = _this.sort;
                _this.loader.hideLoader();
            }
        });
    };
    //************************************************************************//
    //CONSULTA INFORMACION POR FILTRO (RELOCATION)//
    ServiceRecordAllServicesComponent.prototype.getServiceRecordTableDataRelocation = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.loader.showLoader();
        var params_in = params == '' ? '' : "&" + params;
        this._services.service_general_get('ServiceOrder/GetServiceAllService?serviceLineId=' + this.service_line_ + '&serviceRecordId=' + this.numSR + params_in).subscribe(function (data) {
            if (data.success) {
                console.log("FILTROS DE IMMIGRATION: ", data);
                _this.data_services = new table_1.MatTableDataSource(data.result.value);
                _this.data_services.paginator = _this.DataFollowS;
                _this.data_services.sort = _this.sort;
                _this.loader.hideLoader();
            }
        });
    };
    ServiceRecordAllServicesComponent.prototype.filteringServiceRecordTable = function () {
        this.service_record_params_selected = '';
        var params = '';
        if (this.range.value.start != '' && this.range.value.start != null)
            this.filter_data.date_in = this.filterDate(this.range.value.start);
        if (this.range.value.end != '' && this.range.value.end != null)
            this.filter_data.date_last = this.filterDate(this.range.value.end);
        for (var item in this.filter_data) {
            if (this.filter_data[item] != '') {
                this.service_record_params_selected += item + "=" + this.filter_data[item] + "&";
                params = this.service_record_params_selected.substring(0, this.service_record_params_selected.length - 1);
            }
        }
        console.log(params);
        if (this.service_line_ == 1) {
            this.getServiceRecordTableData(params);
        }
        else {
            this.getServiceRecordTableDataRelocation(params);
        }
    };
    //************************************************************************//
    //FUNCION PARA FORMATO DE FECHA//
    ServiceRecordAllServicesComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //************************************************************************//
    //FUNCION PARA EXPORTAR PDF O EXCEL//
    ServiceRecordAllServicesComponent.prototype.showExportDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_export_component_1.DialogExportComponent, {
            data: "",
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                document.getElementById("excel").click();
            }
            if (result === 2) {
                var tabla = [['Work Order', 'Service', 'Service ID', 'Program', 'Category', 'Location', 'Delivered To', 'Autho Date', 'Completion Date', 'Status', 'Coordinator', 'Supplier Partner', 'Service Fee']];
                for (var i = 0; i < _this.data_services.filteredData.length; i++) {
                    var element = _this.data_services.filteredData[i];
                    tabla.push([
                        element.service,
                        element.service,
                        element.serviceNumber,
                        element.program,
                        element.category,
                        element.location,
                        element.deliveredTo,
                        element.autho,
                        element.autho,
                        element.status,
                        element.coordinator,
                        element.supplier,
                        element.projectedFee,
                    ]);
                }
                console.log(tabla);
                // Set the fonts to use
                pdfmake_wrapper_1.PdfMakeWrapper.setFonts(vfs_fonts_1["default"]);
                var pdf = new pdfmake_wrapper_1.PdfMakeWrapper();
                pdf.pageMargins([30, 30, 30, 30]);
                pdf.pageOrientation('landscape');
                pdf.defaultStyle({
                    fontSize: 8,
                    alignment: 'center'
                });
                pdf.add(new pdfmake_wrapper_1.Table(tabla).layout('lightHorizontalLines').end);
                pdf.create().download('All services.pdf');
            }
        });
    };
    //************************************************************************//
    //FUNCION PARA LIMPIAR FILTROS//
    ServiceRecordAllServicesComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.range.reset();
        this.filter_data = {};
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        if (this.service_line_ == 1) {
            this.ngOnInit();
        }
        else {
            this.getDataRelocation();
        }
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ServiceRecordAllServicesComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], ServiceRecordAllServicesComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild('DataFollow')
    ], ServiceRecordAllServicesComponent.prototype, "DataFollow");
    __decorate([
        core_1.ViewChild('DataFollowS')
    ], ServiceRecordAllServicesComponent.prototype, "DataFollowS");
    ServiceRecordAllServicesComponent = __decorate([
        core_1.Component({
            selector: 'service-record-all-services',
            templateUrl: './ServiceRecordAllServices.component.html',
            styleUrls: []
        })
    ], ServiceRecordAllServicesComponent);
    return ServiceRecordAllServicesComponent;
}());
exports.ServiceRecordAllServicesComponent = ServiceRecordAllServicesComponent;
