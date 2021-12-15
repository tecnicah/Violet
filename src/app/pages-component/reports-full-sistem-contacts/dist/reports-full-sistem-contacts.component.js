"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportsFullSistemContactsComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var dialog_add_table_full_sistem_contact_component_1 = require("./../dialog/dialog-add-table-full-sistem-contact/dialog-add-table-full-sistem-contact.component");
var general_message_component_1 = require("./../dialog/general-message/general-message.component");
var dialog_add_filter_full_sistem_contact_component_1 = require("./../dialog/dialog-add-filter-full-sistem-contact/dialog-add-filter-full-sistem-contact.component");
var dialog_add_columns_full_sistem_contact_component_1 = require("./../dialog/dialog-add-columns-full-sistem-contact/dialog-add-columns-full-sistem-contact.component");
var table_1 = require("@angular/material/table");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var ReportsFullSistemContactsComponent = /** @class */ (function () {
    function ReportsFullSistemContactsComponent(_services, _dialog) {
        this._services = _services;
        this._dialog = _dialog;
        this.__loader__ = new loader_1.LoaderComponent();
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.dataReport = {}; //contiene la informacion despues de que se crea una tabla
        this.columns = []; //columnas
        this.activeLink = 0;
        this.dateR = {};
        // columnas base
        this.baseColums = ["Contact Name",
            "Title",
            "Company",
            "Office",
            "Country",
            "City",
            "Phone",
            "E-mail",
            "Experience"];
        this.datasource = [];
        this.filters = [];
        this.data = [];
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    ReportsFullSistemContactsComponent.prototype.ngOnInit = function () {
        this.__loader__.hideLoader();
        this.getTables();
        this.consultaPermisos();
    };
    ReportsFullSistemContactsComponent.prototype.consultaPermisos = function () {
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
    ReportsFullSistemContactsComponent.prototype.getTables = function () {
        var _this = this;
        this.columns = [];
        this.__loader__.showLoader();
        this._services.service_general_get("Report/GetTables/" + this.userData.id + "/" + 2).subscribe(function (r) {
            console.log('get report for user', r.result);
            if (r.success) {
                _this.taps = r.result.value;
                if (_this.taps.length > 0) {
                    _this.datasource = new table_1.MatTableDataSource(_this.taps[0].contacts);
                    setTimeout(function () {
                        _this.datasource.paginator = _this.immipag;
                        _this.datasource.sort = _this.immisort;
                        _this.__loader__.hideLoader();
                    }, 10);
                    if (_this.taps[0].columns1.length > 0) {
                        for (var i = 0; i < _this.taps[0].columns1.length; i++) {
                            _this.columns.push(_this.taps[0].columns1[i].columnsNavigation.name);
                        }
                        _this.__loader__.hideLoader();
                    }
                    else {
                        _this.columns = _this.baseColums;
                    }
                }
                _this.__loader__.hideLoader();
                console.log('columnas', _this.columns);
            }
            _this.__loader__.hideLoader();
        });
    };
    ReportsFullSistemContactsComponent.prototype.addTable = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_table_full_sistem_contact_component_1.DialogAddTableFullSistemContactComponent, {
            data: {
                id: 0,
                report: this.dataReport.id
                // report: 12
            },
            width: '30%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('resp creacion tabla', result);
            if (result.success) {
                _this.taps.push(result.result);
                _this.columns = _this.baseColums;
                // this.taps.sort = this.immisort;
                // this.taps.paginator = this.immipag;
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Table created"
                    },
                    width: "350px"
                });
                _this.ngOnInit();
            }
        });
    };
    ReportsFullSistemContactsComponent.prototype.addFilter = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_filter_full_sistem_contact_component_1.DialogAddFilterFullSistemContactComponent, {
            data: {
                id: id,
                report: this.reportSelect.id,
                filter: this.reportSelect.filters1
                // report: 12
            },
            width: '50%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Filter created"
                    },
                    width: "350px"
                });
                _this.ngOnInit();
            }
        });
    };
    // agregar columnas
    ReportsFullSistemContactsComponent.prototype.addColumns = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_columns_full_sistem_contact_component_1.DialogAddColumnsFullSistemContactComponent, {
            data: {
                id: id,
                report: this.reportSelect.id,
                colums: this.reportSelect.columns1
                // report: 12
            },
            width: '50%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('resp de add columns', result);
            if (result.success) {
                var columnas = [];
                for (var c = 0; c < result.result.length; c++) {
                    var element = result.result[c];
                    console.log();
                    columnas.push(element.name);
                }
                _this.columns = columnas;
                console.log('columnas', _this.columns);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Columns created"
                    },
                    width: "350px"
                });
                _this.ngOnInit();
            }
        });
    };
    ReportsFullSistemContactsComponent.prototype.changeTab = function (item) {
        var _this = this;
        this.columns = [];
        this.dateR = {};
        this.reportSelect = item;
        if (item.columns1.length > 0) {
            for (var i = 0; i < item.columns1.length; i++) {
                this.columns.push(item.columns1[i].columnsNavigation.name);
            }
        }
        else {
            this.columns = this.baseColums;
        }
        this.datasource = new table_1.MatTableDataSource(item.contacts);
        setTimeout(function () {
            _this.datasource.paginator = _this.immipag;
            _this.datasource.sort = _this.immisort;
            _this.__loader__.hideLoader();
        }, 10);
        console.log('valor de tab', item);
        console.log(this.taps[this.activeLink]);
    };
    ReportsFullSistemContactsComponent.prototype.deleteReport = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
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
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
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
    ReportsFullSistemContactsComponent.prototype.applyFilter = function (event) {
        this.dateR.i = null;
        var filterValue = event.target.value;
        this.datasource.filter = filterValue.trim().toLowerCase();
    };
    ReportsFullSistemContactsComponent.prototype.applyFilterdr = function () {
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
    ReportsFullSistemContactsComponent.prototype.clearFilter = function () {
        this.dateR.i = null;
        this.dateR.f = null;
        this.datasource.filter = "";
    };
    __decorate([
        core_1.ViewChild('immisort')
    ], ReportsFullSistemContactsComponent.prototype, "immisort");
    __decorate([
        core_1.ViewChild('immipag')
    ], ReportsFullSistemContactsComponent.prototype, "immipag");
    ReportsFullSistemContactsComponent = __decorate([
        core_1.Component({
            selector: 'app-reports-full-sistem-contacts',
            templateUrl: './reports-full-sistem-contacts.component.html',
            styleUrls: ['./reports-full-sistem-contacts.component.css']
        })
    ], ReportsFullSistemContactsComponent);
    return ReportsFullSistemContactsComponent;
}());
exports.ReportsFullSistemContactsComponent = ReportsFullSistemContactsComponent;
// /api/Report/RemoveReport/{report}
