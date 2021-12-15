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
exports.PendingAuthorizationsComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var loader_1 = require("app/shared/loader");
var dialog_export_component_1 = require("../dialog/dialog-export/dialog-export.component");
var pdfmake_wrapper_1 = require("pdfmake-wrapper");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts");
var PendingAuthorizationsComponent = /** @class */ (function () {
    function PendingAuthorizationsComponent(_router, dialog, _services) {
        this._router = _router;
        this.dialog = dialog;
        this._services = _services;
        //   @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
        // @ViewChild(MatSort) sort:MatSort;
        this.__imagesPath__ = this._services.url_images;
        this.__loader__ = new loader_1.LoaderComponent();
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        this.pendingAcceptance = false;
        this.pendingAssignments = true;
        //public pending_table_colums:string[] = ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13'];
        this.pending_table_colums = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];
        this.pending_table_data = undefined;
        this.filter_data = new FilterDataModel();
        /*****************************************************************************************/
        /*****************************************************************************************/
        /*****************************************************************************************/
        /************************** Funciones Generales ******************************************/
        /*****************************************************************************************/
        /*****************************************************************************************/
        this.country_catalogue = [];
        this.city_catalogue = [];
        this.serviceline_catalogue = [];
        this.tablesr_catalogue = [];
        this.service_record = [];
        this.able_city_filter = false;
        this.info_row = {};
    }
    PendingAuthorizationsComponent.prototype.ngOnInit = function () { this.initPageBehavior(); };
    PendingAuthorizationsComponent.prototype.initPageBehavior = function () {
        var _this = this;
        this.requestCataloguesData();
        this.requestTablePendingAuthoData();
        this._services.service_general_get('Catalogue/GetServiceRecord/' + this.__userlog__.id)
            .subscribe(function (response) {
            if (response.success) {
                _this.service_record = response.result;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            _this.__loader__.hideLoader();
        });
        //this.filterByPendingAcceptance();
        this.filterByPendingAssingments();
    };
    PendingAuthorizationsComponent.prototype.requestTablePendingAuthoData = function (url_params) {
        var _this = this;
        if (url_params === void 0) { url_params = ''; }
        this.__loader__.showLoader();
        console.log('url_params => ', url_params);
        this._services.service_general_get("ServiceRecord/GetPendingAuthorizations/" + (this.__userlog__.id + url_params))
            .subscribe(function (response) {
            console.log('Response ===> ', response);
            if (response.success) {
                _this.pending_autho_obj = response.result.value;
                debugger;
                _this.pending_table_data = new table_1.MatTableDataSource(_this.pending_autho_obj.pendingAuthorizations);
                _this.pending_table_data.paginator = _this.pagpending;
                _this.pendingAcceptance = false;
                _this.pendingAssignments = true;
                setTimeout(function () {
                    _this.pending_table_data.sort = _this.sortpending;
                    console.log('===> ', _this.pending_table_data);
                }, 3000);
                console.log('this.pending_autho_obj ===> ', _this.pending_autho_obj);
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (GetPendingAuthorizations) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    PendingAuthorizationsComponent.prototype.updatePendingAuthoTableData = function () {
        var url_params = '';
        for (var field in this.filter_data) {
            if (this.filter_data[field] != '') {
                url_params += "&" + field + "=" + this.filter_data[field];
            }
        }
        this.requestTablePendingAuthoData('?' + url_params.substring(1));
    };
    PendingAuthorizationsComponent.prototype.serchByText = function (event) {
        var filterValue = event.target.value;
        this.pending_table_data.filter = filterValue.trim().toLowerCase();
    };
    PendingAuthorizationsComponent.prototype.resetPendingAuthoTableFilter = function () {
        var pending_serch_input = document.getElementById('pending_serch_text');
        pending_serch_input.value = '';
        this.filter_data = new FilterDataModel();
        this.requestTablePendingAuthoData();
    };
    PendingAuthorizationsComponent.prototype.showExportDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_export_component_1.DialogExportComponent, {
            data: this.pending_table_data.filteredData,
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('Response ===> ', result);
            if (result === 1) {
                document.getElementById("excel").click();
            }
            if (result === 2) {
                var tabla = [['Service Record', 'VIP', 'Autho Date', 'Service Line', 'Country', 'City', 'Partner', 'Client', 'Assignee Name', 'Arrival Date', 'Services', 'Coordinator', 'Consultant']];
                for (var i = 0; i < _this.pending_table_data.filteredData.length; i++) {
                    var element = _this.pending_table_data.filteredData[i];
                    tabla.push([
                        element.numberServiceRecord,
                        element.vip,
                        _this.formatDate(element.inithialAuthoAcceptance),
                        element.serviceLine,
                        element.country,
                        element.city,
                        element.partner,
                        element.client,
                        element.assigneeName,
                        _this.formatDate(element.initialArrival),
                        element.services,
                        element.coordinator,
                        element.supplier
                    ]);
                }
                pdfmake_wrapper_1.PdfMakeWrapper.setFonts(vfs_fonts_1["default"]);
                var pdf = new pdfmake_wrapper_1.PdfMakeWrapper();
                pdf.pageMargins([30, 30, 30, 30]);
                pdf.pageOrientation('landscape');
                pdf.defaultStyle({
                    fontSize: 9,
                    alignment: 'center'
                });
                pdf.add(new pdfmake_wrapper_1.Table(tabla).layout('lightHorizontalLines').end);
                pdf.create().download('Pending-Authorizations.pdf');
            }
        });
    };
    PendingAuthorizationsComponent.prototype.requestCataloguesData = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.country_catalogue = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 2:
                        _b.serviceline_catalogue = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetServiceRecord/" + this.__userlog__.id)];
                    case 3:
                        _c.tablesr_catalogue = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PendingAuthorizationsComponent.prototype.ableCityField = function () {
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
    PendingAuthorizationsComponent.prototype.formatDate = function (fecha) {
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
    PendingAuthorizationsComponent.prototype.goToSR = function (data) {
        console.log(data);
        this._router.navigate(['editServiceRecord/' + data.id]);
    };
    PendingAuthorizationsComponent.prototype.filterByPendingAcceptance = function () {
        var _this = this;
        console.log("Entra a pending acceptance");
        var data_filtrada;
        var data_final;
        this._services.service_general_get("ServiceRecord/GetPendingAuthorizations/" + this.__userlog__.id)
            .subscribe(function (response) {
            console.log('Response ===> ', response);
            if (response.success) {
                data_filtrada = response.result.value.pendingAuthorizations.filter(function (E) {
                    if (E.pendingAcceptance == 2) {
                        return true;
                    }
                });
                data_final = {
                    pendingAcceptance: response.result.value.pendingAcceptance,
                    pendingAssignments: response.result.value.pendingAssignments,
                    pendingAuthorizations: data_filtrada
                };
                _this.pending_autho_obj = data_final;
                _this.pending_table_data = new table_1.MatTableDataSource(_this.pending_autho_obj.pendingAuthorizations);
                _this.pending_table_data.paginator = _this.pagpending;
                _this.pending_table_data.sort = _this.sortpending;
                console.log('this.pending_autho_obj ===> ', _this.pending_autho_obj);
                _this.pendingAcceptance = true;
                _this.pendingAssignments = false;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (GetPendingAuthorizations) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    PendingAuthorizationsComponent.prototype.filterByPendingAssingments = function () {
        var _this = this;
        console.log("Entra a pending Assigment");
        var data_filtrada;
        var data_final;
        this._services.service_general_get("ServiceRecord/GetPendingAuthorizations/" + this.__userlog__.id)
            .subscribe(function (response) {
            console.log('Response ===> ', response);
            if (response.success) {
                data_filtrada = response.result.value.pendingAuthorizations.filter(function (E) {
                    if (E.pendingAssignment == 2) {
                        return true;
                    }
                });
                data_final = {
                    pendingAcceptance: response.result.value.pendingAcceptance,
                    pendingAssignments: response.result.value.pendingAssignments,
                    pendingAuthorizations: data_filtrada
                };
                _this.pending_autho_obj = data_final;
                _this.pending_table_data = new table_1.MatTableDataSource(_this.pending_autho_obj.pendingAuthorizations);
                _this.pending_table_data.paginator = _this.pagpending;
                _this.pending_table_data.sort = _this.sortpending;
                console.log('this.pending_autho_obj ===> ', _this.pending_autho_obj);
                _this.pendingAssignments = true;
                _this.pendingAcceptance = false;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (GetPendingAuthorizations) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    PendingAuthorizationsComponent.prototype.viewData = function (data) {
        this.info_row.assignee = data.assigneeName;
        this.info_row.coordinator = data.coordinator;
    };
    __decorate([
        core_1.ViewChild('sortpending')
    ], PendingAuthorizationsComponent.prototype, "sortpending");
    __decorate([
        core_1.ViewChild('pagpending')
    ], PendingAuthorizationsComponent.prototype, "pagpending");
    PendingAuthorizationsComponent = __decorate([
        core_1.Component({
            selector: 'pending-authorizations-component',
            templateUrl: './PendingAuthorizations.component.html',
            styleUrls: ['./PendingAuthorizations.component.scss']
        })
    ], PendingAuthorizationsComponent);
    return PendingAuthorizationsComponent;
}());
exports.PendingAuthorizationsComponent = PendingAuthorizationsComponent;
var FilterDataModel = /** @class */ (function () {
    function FilterDataModel() {
        this.country = '';
        this.city = '';
        this.service_line = '';
        this.sr = '';
    }
    return FilterDataModel;
}());
/*
class PendingAuthoData {
    pendingAcceptance:number = 0;
    pendingAssignments:number = 0;
    pendingAuthorizations:any[] = [];
}
*/
