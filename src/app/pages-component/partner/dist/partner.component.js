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
exports.PartnerComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var dialog_export_component_1 = require("../dialog/dialog-export/dialog-export.component");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts"); // fonts provided for pdfmake
var forms_1 = require("@angular/forms");
var PartnerComponent = /** @class */ (function () {
    function PartnerComponent(_services, _dialog) {
        this._services = _services;
        this._dialog = _dialog;
        this.ca_companyType = [];
        this.caCompanyType = [];
        this.caCountry = [];
        this.ccity = [];
        this.refresh = false;
        this.range = new forms_1.FormGroup({
            rangeDate1: new forms_1.FormControl(),
            rangeDate2: new forms_1.FormControl()
        });
        this.filter = {};
        this.ELEMENT_DATA = [];
        this.displayedColumns = ['Company Type', 'Client Type', 'City', 'Date of Contract', 'Status', 'Contact Name', 'Actions'];
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        this.caStatus = [];
    }
    PartnerComponent.prototype.consultaPermisos = function () {
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
    PartnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaPermisos();
        this._services.service_general_get_noapi('GetClientPartnerProfile?lead_or_client=4').subscribe(function (r) {
            if (r.success) {
                console.log(r.result.value);
                _this.datasource = new table_1.MatTableDataSource(r.result.value);
                _this.datasource.paginator = _this.paginator;
                _this.datasource.sort = _this.sort;
            }
        });
        this.catalogos();
    };
    PartnerComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierType')];
                    case 1:
                        _a.ca_companyType = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCompanyType')];
                    case 2:
                        _b.caCompanyType = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 3:
                        _c.caCountry = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 4:
                        _d.caCountry = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusClienPartner')];
                    case 5:
                        _e.caStatus = _f.sent();
                        console.log(this.caStatus);
                        return [2 /*return*/];
                }
            });
        });
    };
    PartnerComponent.prototype.getcity = function (data) {
        var _this = this;
        this._services.service_general_get("Catalogue/GetState?country=" + data.country).subscribe((function (data) {
            if (data.success) {
                _this.ccity = data.result;
            }
        }));
    };
    PartnerComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.datasource.filter = filterValue.trim().toLowerCase();
    };
    PartnerComponent.prototype.applyFiltersBK = function () {
        var _this = this;
        console.log("entra", this.filter);
        this._services.service_general_get_noapi('GetClientPartnerProfile?lead_or_client=4' +
            '&date_range_in=' + this.filter.date_range_in +
            '&date_range_fi=' + this.filter.date_range_fi +
            '&type=' + this.filter.type +
            '&company_type=' + this.filter.company_type +
            '&country=' + this.filter.country +
            '&city=' + this.filter.city +
            '&status=' + this.filter.status).subscribe(function (r) {
            if (r.success) {
                _this.datasource = new table_1.MatTableDataSource(r.result.value);
                _this.datasource.paginator = _this.paginator;
                _this.datasource.sort = _this.sort;
            }
        });
    };
    PartnerComponent.prototype.showExportDialog = function () {
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
                var tabla = [['Company Name', 'Company Type', 'Client Type', 'Country', 'City', 'Date of Contract', 'Status', 'Contact Name', 'Phone', 'E-mail']];
                for (var i = 0; i < _this.datasource.filteredData.length; i++) {
                    var element = _this.datasource.filteredData[i];
                    tabla.push([
                        element.company,
                        element.company_type,
                        element.lead_type,
                        element.country,
                        element.city,
                        element.dateFirst,
                        element.status,
                        element.contactName,
                        element.phoneNumber,
                        element.email
                    ]);
                }
                console.log(tabla);
                // Set the fonts to use
                pdfmake_wrapper_1.PdfMakeWrapper.setFonts(vfs_fonts_1["default"]);
                var pdf = new pdfmake_wrapper_1.PdfMakeWrapper();
                pdf.pageMargins([30, 30, 30, 30]);
                pdf.pageOrientation('landscape');
                pdf.defaultStyle({
                    fontSize: 10,
                    alignment: 'center'
                });
                pdf.add(new pdfmake_wrapper_1.Table(tabla).layout('lightHorizontalLines').end);
                pdf.create().download('partner&client.pdf');
            }
        });
    };
    PartnerComponent.prototype.clean = function () {
        var _this = this;
        this.range.reset({ rangeDate1: '', rangeDate2: '' });
        this.filter.type = null;
        this.filter.company_type = null;
        this.filter.country = null;
        this.filter.city = null;
        this.filter.status = null;
        this.refresh = true;
        setTimeout(function () {
            _this.refresh = false;
        }, 2000);
        this.ngOnInit();
    };
    //FILTRO FECHA//
    PartnerComponent.prototype.filteringServiceRecordTable = function () {
        var service_record_params_selected = '';
        var params = '';
        if (this.range.value.rangeDate1 != null)
            this.filter.date_range_in = this.filterDate(this.range.value.rangeDate1);
        if (this.range.value.rangeDate2 != null)
            this.filter.date_range_fi = this.filterDate(this.range.value.rangeDate2);
        for (var item in this.filter) {
            if (this.filter[item] != '') {
                service_record_params_selected += item + "=" + this.filter[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        if (this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null) {
            this.applyFiltersBK();
        }
    };
    //*******************************************//
    PartnerComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], PartnerComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], PartnerComponent.prototype, "paginator");
    PartnerComponent = __decorate([
        core_1.Component({
            selector: 'app-partner',
            templateUrl: './partner.component.html',
            styleUrls: ['./partner.component.css']
        })
    ], PartnerComponent);
    return PartnerComponent;
}());
exports.PartnerComponent = PartnerComponent;
