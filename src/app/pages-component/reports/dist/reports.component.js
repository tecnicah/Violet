"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportsComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var loader_1 = require("app/shared/loader");
var dialog_edit_colums_operational_reports_component_1 = require("../dialog/dialog-edit-colums-operational-reports/dialog-edit-colums-operational-reports.component");
var dialog_edit_filters_operational_reports_component_1 = require("../dialog/dialog-edit-filters-operational-reports/dialog-edit-filters-operational-reports.component");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var new_table_operational_reports_component_1 = require("../dialog/new-table-operational-reports/new-table-operational-reports.component");
var ReportsComponent = /** @class */ (function () {
    function ReportsComponent(_services, dialog) {
        this._services = _services;
        this.dialog = dialog;
        this.taps = [];
        this.columns = [];
        this.userData = {};
        this.__loader__ = new loader_1.LoaderComponent();
        this.baseColums = ["Service Record No",
            "Vip",
            "Status",
            "Autho Date",
            "Country",
            "City",
            "Partner",
            "Client",
            "Assignee Name",
            "Services",
            "Supplier Partner",
            "Invoice",
            "Invoice Date",
            "Invoice Type",
            "Description",
            "Amount",
            "Status Invoice",
            "Ammount Sub Total",
            "Management Fee Sub Total",
            "Wire Fee Sub Total",
            "Advance Fee Sub Total",
            "Funding Requested Date",
            "Recurrent",
            "Status Third Party"];
        this.datasource = [];
        this.dateR = {};
        this.activeLink = 0;
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    ReportsComponent.prototype.ngOnInit = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getData();
        this.consultaPermisos();
    };
    ReportsComponent.prototype.consultaPermisos = function () {
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
    ReportsComponent.prototype.getData = function () {
        var _this = this;
        this.columns = [];
        this.__loader__.showLoader();
        this._services.service_general_get('Report/GetTables/' + this.userData.id + '/1').subscribe(function (r) {
            console.log(r);
            if (r.success && r.result.value.length > 0) {
                _this.taps = r.result.value;
                if (_this.taps[_this.activeLink].columns1.length > 0) {
                    for (var i = 0; i < _this.taps[_this.activeLink].columns1.length; i++) {
                        var element = _this.taps[_this.activeLink].columns1[i];
                        _this.columns.push(_this.taps[_this.activeLink].columns1[i].columnsNavigation.name);
                    }
                }
                else {
                    _this.columns = _this.baseColums;
                }
                _this.datasource = new table_1.MatTableDataSource(_this.taps[0].operationals);
                setTimeout(function () {
                    _this.datasource.paginator = _this.immipag;
                    _this.datasource.sort = _this.immisort;
                    _this.__loader__.hideLoader();
                }, 10);
            }
            else {
                _this.__loader__.hideLoader();
            }
        });
    };
    ReportsComponent.prototype.changeTable = function (item) {
        var _this = this;
        this.columns = [];
        this.dateR = {};
        if (item.columns1.length > 0) {
            for (var i = 0; i < item.columns1.length; i++) {
                var element = item.columns1[i];
                this.columns.push(item.columns1[i].columnsNavigation.name);
            }
        }
        else {
            this.columns = this.baseColums;
        }
        this.datasource = new table_1.MatTableDataSource(item.operationals);
        setTimeout(function () {
            _this.datasource.paginator = _this.immipag;
            _this.datasource.sort = _this.immisort;
        }, 10);
        console.log(this.datasource);
        console.log(this.columns);
        console.log(this.taps[this.activeLink]);
    };
    ReportsComponent.prototype.newTable = function () {
        var _this = this;
        var dialogRef = this.dialog.open(new_table_operational_reports_component_1.NewTableOperationalReportsComponent, {
            width: "500px"
        });
        dialogRef.afterClosed().subscribe(function (so_added) {
            console.log(so_added);
            if (so_added.success) {
                _this.__loader__.showLoader();
                var data = {
                    id: 0,
                    name: so_added.tableName,
                    reportType: 6,
                    createdBy: _this.userData.id,
                    createdDate: new Date(),
                    updatedBy: _this.userData.id,
                    updatedDate: new Date()
                };
                _this._services.service_general_post_with_url('Report/AddTable', data).subscribe(function (r) {
                    console.log(r);
                    _this.getData();
                });
            }
        });
    };
    ReportsComponent.prototype.editColums = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_edit_colums_operational_reports_component_1.DialogEditColumsOperationalReportsComponent, {
            width: "500px",
            data: { colums: this.taps[this.activeLink].columns1 }
        });
        dialogRef.afterClosed().subscribe(function (so_added) {
            console.log(so_added);
            if (so_added.success) {
                _this.__loader__.showLoader();
                var columnas = [];
                var toBack = [];
                for (var o = 0; o < so_added.data.length; o++) {
                    var element = so_added.data[o];
                    columnas.push(element.name);
                    toBack.push({
                        "id": 0,
                        "report": _this.taps[_this.activeLink].id,
                        "columns": element.id,
                        "orden": o,
                        "createdBy": _this.userData.id,
                        "createdDate": new Date(),
                        "updatedBy": _this.userData.id,
                        "updatedDate": new Date()
                    });
                }
                _this._services.service_general_post_with_url('Report/EditColumns/' + _this.taps[_this.activeLink].id, toBack).subscribe(function (r) {
                    console.log(r);
                    if (r.success) {
                        var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: 'Edited columns'
                            },
                            width: "350px"
                        });
                        _this.__loader__.hideLoader();
                        _this.ngOnInit();
                    }
                });
                _this.columns = columnas;
                console.log(_this.columns);
            }
        });
    };
    ReportsComponent.prototype.editFilters = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_edit_filters_operational_reports_component_1.DialogEditFiltersOperationalReportsComponent, {
            width: "500px",
            data: { filter: this.taps[this.activeLink].filters1 }
        });
        dialogRef.afterClosed().subscribe(function (so_added) {
            console.log(so_added);
            if (so_added.length > 0) {
                for (var i = 0; i < so_added.length; i++) {
                    var element = so_added[i];
                    so_added[i].report = _this.taps[_this.activeLink].id;
                }
                console.log(so_added);
                _this._services.service_general_post_with_url('Report/AddFiltersOpertionals/' + _this.taps[_this.activeLink].id + '/1', so_added).subscribe(function (r) {
                    console.log(r);
                    if (r.success) {
                        var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: 'Edited Filters'
                            },
                            width: "350px"
                        });
                        _this.__loader__.hideLoader();
                        _this.ngOnInit();
                    }
                });
            }
        });
    };
    ReportsComponent.prototype.deleteTable = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this report?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.__loader__.showLoader();
                _this._services.service_general_delete_with_url('Report/RemoveReport/' + id).subscribe(function (r) {
                    if (r.success) {
                        var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: 'Report deleted successfull'
                            },
                            width: "350px"
                        });
                        _this.__loader__.hideLoader();
                        _this.ngOnInit();
                    }
                });
            }
        });
    };
    ReportsComponent.prototype.applyFilter = function (event) {
        this.dateR.i = null;
        var filterValue = event.target.value;
        this.datasource.filter = filterValue.trim().toLowerCase();
    };
    ReportsComponent.prototype.applyFilterdr = function () {
        var year = this.dateR.i.getFullYear();
        var mont = this.dateR.i.getMonth() + 1;
        var day = this.dateR.i.getDate();
        if (mont < 9) {
            mont = '0' + mont;
        }
        if (day < 10) {
            day = '0' + day;
        }
        this.datasource.filter = year + '-' + mont + '-' + day;
    };
    ReportsComponent.prototype.clearFilter = function () {
        this.dateR.i = null;
        this.dateR.f = null;
        this.datasource.filter = "";
    };
    __decorate([
        core_1.ViewChild('immisort')
    ], ReportsComponent.prototype, "immisort");
    __decorate([
        core_1.ViewChild('immipag')
    ], ReportsComponent.prototype, "immipag");
    ReportsComponent = __decorate([
        core_1.Component({
            selector: 'app-reports',
            templateUrl: './reports.component.html',
            styleUrls: ['./reports.component.scss']
        })
    ], ReportsComponent);
    return ReportsComponent;
}());
exports.ReportsComponent = ReportsComponent;
