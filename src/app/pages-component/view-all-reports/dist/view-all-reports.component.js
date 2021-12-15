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
exports.ViewAllReportsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var sort_1 = require("@angular/material/sort");
var ViewAllReportsComponent = /** @class */ (function () {
    function ViewAllReportsComponent(_services, _routerParams) {
        this._services = _services;
        this._routerParams = _routerParams;
        this.filteruno = false;
        this.range = new forms_1.FormGroup({
            initialReportDate: new forms_1.FormControl(),
            finalReportDate: new forms_1.FormControl()
        });
        this.__loader__ = new loader_1.LoaderComponent();
        this.search = {
            serviceLine: ''
        };
        //***************************************************************************//
        //PARA CATLOGOS//
        this.caServiceLine = [];
    }
    ViewAllReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem("userData"));
        this.__loader__.showLoader();
        var id_sr = this._routerParams.snapshot.params.id;
        this.sr = id_sr;
        this._services.service_general_get('ReportDay/ReportsHistory?sr=' + id_sr).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.all_reports = new table_1.MatTableDataSource(data.result);
                _this.all_reports.paginator = _this.Supplier;
                _this.all_reports.sort = _this.sort;
                console.log(_this.all_reports);
                //this.all_reports = data.result;
                _this.__loader__.hideLoader();
            }
        }));
        this.getCatalogos();
    };
    ViewAllReportsComponent.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        _a.caServiceLine = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //***************************************************************************//
    //PARA LIMPIAR FILTROS//
    ViewAllReportsComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.range.reset({ start: '', end: '' });
        this.search.serviceLine = null;
        this.search = {};
        this.filteruno = true;
        this.ngOnInit();
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
    };
    //***************************************************************************//
    //FILTER DATA BY INPUT//
    ViewAllReportsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.all_reports.filter = filterValue.trim().toLowerCase();
        console.log(this.all_reports);
    };
    //***************************************************************************//
    //SEARCH DATA BY FILTER//
    ViewAllReportsComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.search) {
            if (this.search[item] != '') {
                service_record_params_selected += item + "=" + this.search[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.getServiceRecordTableData(params);
    };
    //***************************************************************************//
    ViewAllReportsComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        var params_in = params == '' ? '' : "&" + params;
        this._services.service_general_get('ReportDay/ReportsHistory?sr=' + this.sr + params_in).subscribe(function (data) {
            if (data.success) {
                console.log(data.result);
                _this.all_reports = new table_1.MatTableDataSource(data.result);
                _this.all_reports.paginator = _this.Supplier;
                _this.all_reports.sort = _this.sort;
                _this.__loader__.hideLoader();
            }
        }, function (err) {
            console.log(err);
            _this.__loader__.hideLoader();
            _this.ngOnInit();
        });
    };
    //****************************************************************************//
    //FILTER BY DATE//
    ViewAllReportsComponent.prototype.filteringServiceRecordTable = function () {
        var service_record_params_selected = '';
        var params = '';
        if (this.range.value.initialReportDate != null)
            this.search.initialReportDate = this.filterDate(this.range.value.initialReportDate);
        if (this.range.value.finalReportDate != null)
            this.search.finalReportDate = this.filterDate(this.range.value.finalReportDate);
        for (var item in this.search) {
            if (this.search[item] != '') {
                service_record_params_selected += item + "=" + this.search[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        if (this.range.value.initialReportDate != null && this.range.value.finalReportDate != null) {
            this.getServiceRecordTableData(params);
        }
    };
    //******************************************************************************//
    ViewAllReportsComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //******************************************************************************//
    ViewAllReportsComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ViewAllReportsComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild('Supplier')
    ], ViewAllReportsComponent.prototype, "Supplier");
    ViewAllReportsComponent = __decorate([
        core_1.Component({
            selector: 'app-view-all-reports',
            templateUrl: './view-all-reports.component.html',
            styleUrls: ['./view-all-reports.component.css']
        })
    ], ViewAllReportsComponent);
    return ViewAllReportsComponent;
}());
exports.ViewAllReportsComponent = ViewAllReportsComponent;
