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
exports.EscalationsComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var forms_1 = require("@angular/forms");
var table_1 = require("@angular/material/table");
var viewEscalation_component_1 = require("../dialog/dialog-view-escalation/viewEscalation.component");
var dialog_export_component_1 = require("../dialog/dialog-export/dialog-export.component");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts"); // fonts provided for pdfmake
var EscalationsComponent = /** @class */ (function () {
    function EscalationsComponent(_services, _dialog) {
        this._services = _services;
        this._dialog = _dialog;
        this.__loader__ = new loader_1.LoaderComponent();
        this.ca_status = [];
        this.ca_cliente = [];
        this.supplier_catalogue = [];
        this.ca_serviceLine = [];
        this.ca_country = [];
        this.ca_city = [];
        this.ca_partner = [];
        this.data = {};
        this.range = new forms_1.FormGroup({
            rangeDate1: new forms_1.FormControl(),
            rangeDate2: new forms_1.FormControl()
        });
        this.filterPartner = { coordinator: '' };
        this.filterOffice = { office: '' };
        this.filterClient = { name: '' };
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterSuplierPartner = { comercialName: '' };
        // @ViewChild(MatSort) sort: MatSort;
        // @ViewChild('DataFollow') DataFollow: MatPaginator;
        this.filteruno = false;
        this.displayedColumns = ['ServiceRecord', 'VIP', 'EscalationLevel', 'ServiceLine', 'Status', 'AuthoDate', 'Country', 'City', 'Partner', 'Client', 'AssigneeName', 'Coordinator', 'Supplier'];
        this.data_level = {
            level1: '',
            level2: '',
            level3: '',
            level4: '',
            level5: ''
        };
        this.data_filter = {
            partner: '',
            client: '',
            supplierPartner: '',
            status: '',
            serviceLine: '',
            country: '',
            city: '',
            level: ''
        };
        //***********************************//
        this.ca_office = [];
        this.dash_table_params = '';
        // filter cards
        this.filter_cards_selected = [];
    }
    EscalationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        this._services.service_general_get('MyDashboard/GetEscalation/' + this.user.id).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                console.log(data.map.value);
                _this.data_table = new table_1.MatTableDataSource(data.map.value.escalation);
                _this.data_table.paginator = _this.pagescalation;
                _this.data_table.sort = _this.sortescalation;
                _this.data_level = data.map.value;
            }
        }));
        this.catalogos();
    };
    EscalationsComponent.prototype.goBack = function () {
        window.history.back();
    };
    EscalationsComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 1:
                        _a.ca_status = _f.sent();
                        //this.ca_cliente = await this._services.getCatalogueFrom('GetClient');
                        //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 2:
                        //this.ca_cliente = await this._services.getCatalogueFrom('GetClient');
                        //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
                        _b.ca_serviceLine = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 3:
                        _c.ca_country = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPartner')];
                    case 4:
                        _d.ca_partner = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetOffice')];
                    case 5:
                        _e.ca_office = _f.sent();
                        this.__loader__.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    //***********************************//
    EscalationsComponent.prototype.getClient = function () {
        var _this = this;
        console.log("consulta Cliente");
        this._services.service_general_get('Catalogue/GetClient/' + this.data_filter.partner).subscribe((function (data) {
            if (data.success) {
                _this.ca_cliente = data.result.value;
            }
        }));
    };
    //***********************************//
    EscalationsComponent.prototype.getSupplierPartner = function () {
        var _this = this;
        if (this.data_filter.serviceLine == "" || this.data_filter.country == "" || this.data_filter.city == "") {
            return true;
        }
        this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerConsultant?country=" + this.data_filter.country + "&city=" + this.data_filter.city + "&serviceLine=" + this.data_filter.serviceLine).subscribe((function (data) {
            if (data.success) {
                console.log("select supplier: ", data.result.value);
                _this.supplier_catalogue = data.result.value;
            }
        }));
    };
    //***********************************//
    EscalationsComponent.prototype.getCity = function () {
        var _this = this;
        console.log("consulta ciudad");
        this._services.service_general_get('Catalogue/GetState?country=' + this.data_filter.country).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
    };
    //***********************************//
    EscalationsComponent.prototype.openEscalation = function (escalation) {
        var add_call_dialog = this._dialog.open(viewEscalation_component_1.DialogViewEscalation, {
            data: {
                id_so: escalation.id,
                escalation: escalation
            },
            width: "95%"
        });
        add_call_dialog.afterClosed().subscribe(function (result) {
        });
    };
    //********************************************//
    EscalationsComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.data_filter) {
            if (this.data_filter[item] != '') {
                service_record_params_selected += item + "=" + this.data_filter[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.getServiceRecordTableData(params);
    };
    //********************************************//
    EscalationsComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('MyDashboard/GetEscalation/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                _this.data_table = new table_1.MatTableDataSource(_this.dataDashboardFilterByCards(data.map.value.escalation));
                _this.data_table.paginator = _this.pagescalation;
                _this.data_table.sort = _this.sortescalation;
                _this.data_level = data.map.value;
                _this.__loader__.hideLoader();
            }
        });
    };
    EscalationsComponent.prototype.filterTableByCard = function (card_selector) {
        console.log('card select', card_selector);
        var is_filter_active = (this.filter_cards_selected.indexOf(card_selector) > -1), card_container = document.getElementById(card_selector + "_filter_card"), params_used = this.dash_table_params == '' ? '' : "?" + this.dash_table_params.substring(1);
        debugger;
        if (is_filter_active) {
            card_container.classList.remove('filterCard__card--active');
            this.filter_cards_selected.splice(this.filter_cards_selected.indexOf(card_selector), 1);
            this.getServiceRecordTableData(params_used);
        }
        else {
            card_container.classList.add('filterCard__card--active');
            this.filter_cards_selected.push(card_selector);
            this.getServiceRecordTableData(params_used);
        }
    };
    EscalationsComponent.prototype.dataDashboardFilterByCards = function (table_rows) {
        var _this = this;
        var rows_in = table_rows;
        var rows_selected = [];
        rows_in.forEach(function (row) {
            if (_this.filter_cards_selected.length != 0) {
                _this.filter_cards_selected.forEach(function (filter_condition) {
                    if (filter_condition == 'level1') {
                        if (row.escalationLevel == 1) {
                            rows_selected.push(row);
                            console.log('rows_selected ===> ', rows_selected);
                        }
                    }
                    if (filter_condition == 'level2') {
                        if (row.escalationLevel == 2) {
                            rows_selected.push(row);
                        }
                    }
                    if (filter_condition == 'level3') {
                        if (row.escalationLevel == 3) {
                            rows_selected.push(row);
                        }
                    }
                    if (filter_condition == 'level4') {
                        if (row.escalationLevel == 4) {
                            rows_selected.push(row);
                        }
                    }
                    if (filter_condition == 'level5') {
                        if (row.escalationLevel == 5) {
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
    //********************************************//
    EscalationsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.data_table.filter = filterValue.trim().toLowerCase();
    };
    //********************************************//
    EscalationsComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.filterPartner = { coordinator: '' };
        this.filterClient = { name: '' };
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterSuplierPartner = { comercialName: '' };
        this.filterOffice = { office: '' };
        this.range.reset({
            rangeDate1: '',
            rangeDate2: ''
        });
        this.data_filter = {
            sr: '',
            coordinator: ''
        };
        this.filter_cards_selected = [];
        var level1 = document.getElementById('level1_filter_card');
        var level2 = document.getElementById('level2_filter_card');
        var level3 = document.getElementById('level3_filter_card');
        var level4 = document.getElementById('level4_filter_card');
        var level5 = document.getElementById('level5_filter_card');
        level1.classList.remove('filterCard__card--active');
        level2.classList.remove('filterCard__card--active');
        level3.classList.remove('filterCard__card--active');
        level4.classList.remove('filterCard__card--active');
        level5.classList.remove('filterCard__card--active');
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    //*********************************************//
    EscalationsComponent.prototype.showExportDialog = function () {
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
                var tabla = [['ServiceRecord', 'VIP', 'Escalations', 'EscalationLevel', 'ServiceLine', 'Status', 'AuthoDate', 'Country', 'City', 'Partner', 'Client', 'AssigneeName', 'Coordinator', 'Supplier']];
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
                        element.escalations,
                        element.escalationLevel,
                        element.serviceLine,
                        element.status,
                        element.initialAutho,
                        element.country,
                        element.state,
                        element.partner,
                        element.client,
                        element.assigneeName,
                        element.coordinator,
                        element.supplier
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
                pdf.create().download('escalations.pdf');
            }
        });
    };
    __decorate([
        core_1.ViewChild('sortescalation')
    ], EscalationsComponent.prototype, "sortescalation");
    __decorate([
        core_1.ViewChild('pagescalation')
    ], EscalationsComponent.prototype, "pagescalation");
    EscalationsComponent = __decorate([
        core_1.Component({
            selector: 'app-escalations',
            templateUrl: './escalations.component.html',
            styleUrls: ['./escalations.component.scss']
        })
    ], EscalationsComponent);
    return EscalationsComponent;
}());
exports.EscalationsComponent = EscalationsComponent;
