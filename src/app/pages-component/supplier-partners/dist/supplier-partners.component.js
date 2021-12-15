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
exports.SupplierPartnersComponent = void 0;
var new_supplier_component_1 = require("../dialog/new-supplier/new-supplier.component");
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var dialog_export_component_1 = require("../dialog/dialog-export/dialog-export.component");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts"); // fonts provided for pdfmake
var loader_1 = require("app/shared/loader");
var SupplierPartnersComponent = /** @class */ (function () {
    function SupplierPartnersComponent(exportAsService, _services, _dialog, router) {
        this.exportAsService = exportAsService;
        this._services = _services;
        this._dialog = _dialog;
        this.router = router;
        this.loader = new loader_1.LoaderComponent();
        //displayedColumns: string[] = ['SupplierCategory', 'SupplierPartner', 'SupplierPartnerType', 'VIP', 'Country', 'City', 'ContactName', 'Phone', 'TotalServices', 'Experience', 'Contact'];
        this.displayedColumns = ['SupplierPartner', 'SupplierPartnerType', 'VIP', 'Country', 'City', 'ContactName', 'Phone', 'TotalServices', 'Experience', 'Contact'];
        this.ca_country = [];
        this.ca_city = [];
        this.ca_status = [];
        this.ca_supplierType = [];
        this.ca_supplierCategory = [];
        this.search = {
            status: '',
            supplierCategory: '',
            partnerType: '',
            country: '',
            city: ''
        };
        this.filterSPT = { supplierType: '' };
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterStatus = { status: '' };
        this.maxall = 20;
        this.exportAsConfig = {
            type: 'pdf',
            elementIdOrContent: 'export',
            options: {
                jsPDF: {
                    orientation: 'landscape'
                }
            }
        };
        this.filteruno = false;
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    SupplierPartnersComponent.prototype.consultaPermisos = function () {
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
    SupplierPartnersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.consultaPermisos();
                this.loader.showLoader();
                this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartners').subscribe((function (data) {
                    if (data.success) {
                        console.log(data.result.value);
                        var filterSupplier = void 0;
                        filterSupplier = data.result.value.sort(function (a, b) {
                            return b.createdDate.localeCompare(a.createdDate);
                        });
                        _this.supplier = new table_1.MatTableDataSource(filterSupplier);
                        _this.supplier.paginator = _this.Supplier;
                        _this.supplier.sort = _this.sort;
                    }
                }));
                this._services.service_general_get('Catalogue/GetSupplierTypeCatalogue?id=5&id=10&id=6&id=7&id=8&id=13&id=11&id=12').subscribe((function (data) {
                    if (data.success) {
                        _this.ca_supplierType = data.result;
                    }
                }));
                this.catalogos();
                return [2 /*return*/];
            });
        });
    };
    SupplierPartnersComponent.prototype.getPageSizeOptions = function () {
        if (this.supplier.paginator.length > this.maxall)
            return [10, 20, this.supplier.paginator.length];
        else
            return [10, 20, this.maxall];
    };
    //*************************************************************//
    SupplierPartnersComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.ca_country = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierPartnerProfileStatus')];
                    case 2:
                        _b.ca_status = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierType')];
                    case 3:
                        _c.ca_supplierCategory = _d.sent();
                        this.loader.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    //*************************************************************//
    SupplierPartnersComponent.prototype.getCity = function () {
        var _this = this;
        var data = this.search.country;
        console.log("consulta ciudad: ", data);
        this._services.service_general_get('Catalogue/GetState?country=' + data).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
    };
    //*************************************************************//
    SupplierPartnersComponent.prototype.searchData = function () {
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
    //*************************************************************//
    SupplierPartnersComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.loader.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartners' + params_in).subscribe(function (data) {
            if (data.success) {
                _this.supplier = new table_1.MatTableDataSource(data.result.value);
                _this.supplier.paginator = _this.Supplier;
                _this.supplier.sort = _this.sort;
                _this.loader.hideLoader();
            }
        });
    };
    //*************************************************************//
    SupplierPartnersComponent.prototype.newSupplier = function () {
        var _this = this;
        var dialogRef = this._dialog.open(new_supplier_component_1.NewSupplierComponent, {
            width: "500px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.type == 1) {
                _this.router.navigateByUrl('supplierConsultant/nuevo');
            }
            else if (result.type == 2) {
                _this.router.navigateByUrl('supplierServices/nuevo');
            }
            else if (result.type == 3) {
                _this.router.navigateByUrl('profileconsultant/New');
            }
        });
    };
    //*************************************************************//
    SupplierPartnersComponent.prototype.viewSupplier = function (data) {
        console.log("viewSupplier: ", data);
        if (data.supplierCategory == 'Consultant') {
            this.router.navigateByUrl('supplierConsultant/' + data.id);
        }
        if (data.supplierCategory == 'Services') {
            this.router.navigateByUrl('supplierServices/' + data.id);
        }
        if (data.supplierCategory == 'Profile') {
            this.router.navigateByUrl('profileconsultant/' + data.id);
        }
    };
    //*************************************************************//
    SupplierPartnersComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.supplier.filter = filterValue.trim().toLowerCase();
        console.log(this.supplier);
    };
    //*************************************************************//
    SupplierPartnersComponent.prototype.showExportDialog = function () {
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
                var tabla = [['Supplier Category', 'Supplier Partner', 'Supplier Partner Type', 'VIP', 'Country', 'City', 'Contact Name', 'Phone', 'Total Services', 'Experience', 'Contact']];
                for (var i = 0; i < _this.supplier.filteredData.length; i++) {
                    var element = _this.supplier.filteredData[i];
                    tabla.push([
                        element.supplierCategory,
                        element.supplierPartner,
                        element.supplierPartnerType,
                        element.luxuryVip,
                        element.name,
                        element.state,
                        element.contactName,
                        element.phone,
                        element.totalServices,
                        element.experience,
                        element.contact
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
                pdf.create().download('Supplier Partner.pdf');
            }
        });
    };
    //****************************************************************//
    SupplierPartnersComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.filterSPT = { supplierType: '' };
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterStatus = { status: '' };
        this.search = {
            status: '',
            supplierCategory: '',
            partnerType: '',
            country: '',
            city: ''
        };
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], SupplierPartnersComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], SupplierPartnersComponent.prototype, "Supplier");
    SupplierPartnersComponent = __decorate([
        core_1.Component({
            selector: 'app-supplier-partners',
            templateUrl: './supplier-partners.component.html',
            styleUrls: ['./supplier-partners.component.css']
        })
    ], SupplierPartnersComponent);
    return SupplierPartnersComponent;
}());
exports.SupplierPartnersComponent = SupplierPartnersComponent;
