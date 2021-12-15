"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminCenterSystemConfigurationComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var general_message_component_1 = require("./../dialog/general-message/general-message.component");
var general_confirmation_component_1 = require("./../dialog/general-confirmation/general-confirmation.component");
var dialog_catalog_offices_component_1 = require("../dialog/dialog-catalog-offices/dialog-catalog-offices.component");
var dialog_admin_center_countries_component_1 = require("../dialog/dialog-admin-center-countries/dialog-admin-center-countries.component");
var dialog_add_country_seccion_country_component_1 = require("../dialog/dialog-add-country-seccion-country/dialog-add-country-seccion-country.component");
var dialog_add_service_admin_center_component_1 = require("../dialog/dialog-add-service-admin-center/dialog-add-service-admin-center.component");
var AdminCenterSystemConfigurationComponent = /** @class */ (function () {
    function AdminCenterSystemConfigurationComponent(_services, _dialog, _router) {
        this._services = _services;
        this._dialog = _dialog;
        this._router = _router;
        this.displayedColumnsOffices = ['Office Name', 'Country', 'City', 'Phone Number', 'Action'];
        this.displayedColumnsCountry = ['Country', 'Currency', 'Languages', 'Cities', 'Creation Date', 'Action'];
        // services
        this.cuatro = ['dos', 'tres', 'cuatro'];
        this.__loader__ = new loader_1.LoaderComponent();
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    AdminCenterSystemConfigurationComponent.prototype.ngOnInit = function () {
        this.__loader__.showLoader();
        this.selectCatalog('offices');
        this.get_catalogos();
        this.consultaPermisos();
        this.__loader__.hideLoader();
    };
    AdminCenterSystemConfigurationComponent.prototype.consultaPermisos = function () {
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
    AdminCenterSystemConfigurationComponent.prototype.selectCatalog = function (catalog) {
        console.log('se eligio el catalogo', catalog);
        this.tableCatalog = catalog;
        this.get_catalogos();
    };
    AdminCenterSystemConfigurationComponent.prototype.get_catalogos = function () {
        var _this = this;
        if (this.tableCatalog == 'offices') {
            this.__loader__.showLoader();
            this._services.service_general_get('Catalog/GetAllOffice').subscribe(function (rOffice) {
                console.log('catalogo office', rOffice);
                if (rOffice.success) {
                    _this.dataOffices = new table_1.MatTableDataSource(rOffice.result);
                    _this.dataOffices.paginator = _this.pagoffice;
                    _this.dataOffices.sort = _this.sortoffice;
                    // ++
                    document.getElementById('cardOffice').className = "filterCard__card--active";
                    document.getElementById('cardCountry').className = "filterCard__card";
                    document.getElementById('cardService').className = "filterCard__card";
                    document.getElementById('cardEmergency').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'countries') {
            this.__loader__.showLoader();
            this._services.service_general_get('CountryAdminCenter/GetCountry').subscribe(function (rCountry) {
                console.log('catalogo country', rCountry);
                if (rCountry.success) {
                    _this.dataCountries = new table_1.MatTableDataSource(rCountry.result.value);
                    _this.dataCountries.paginator = _this.pagocountry;
                    _this.dataCountries.sort = _this.sortcountry;
                    console.log('dataTable', _this.dataCountries);
                    // ++
                    document.getElementById('cardOffice').className = "filterCard__card";
                    document.getElementById('cardCountry').className = "filterCard__card--active";
                    document.getElementById('cardService').className = "filterCard__card";
                    document.getElementById('cardEmergency').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'services') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetAllServices/1').subscribe(function (rimi) {
                console.log('catalogo imigration', rimi);
                if (rimi.success) {
                    _this.serviceLocationsimmi = new table_1.MatTableDataSource(rimi.result);
                    _this.serviceLocationsimmi.paginator = _this.immipag;
                    _this.serviceLocationsimmi.sort = _this.immisort;
                    console.log('dataTable', _this.serviceLocationsimmi);
                    // ++
                    document.getElementById('cardOffice').className = "filterCard__card";
                    document.getElementById('cardCountry').className = "filterCard__card";
                    document.getElementById('cardService').className = "filterCard__card--active";
                    document.getElementById('cardEmergency').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this._services.service_general_get('AdminCenter/GetAllServices/2').subscribe(function (r) {
                if (r.success) {
                    _this.serviceLocationsrelo = new table_1.MatTableDataSource(r.result);
                    _this.serviceLocationsrelo.paginator = _this.relopag;
                    _this.serviceLocationsrelo.sort = _this.relosort;
                    // ++
                    document.getElementById('cardOffice').className = "filterCard__card";
                    document.getElementById('cardCountry').className = "filterCard__card";
                    document.getElementById('cardService').className = "filterCard__card--active";
                    document.getElementById('cardEmergency').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'emergency response') {
            // ++
            document.getElementById('cardOffice').className = "filterCard__card";
            document.getElementById('cardCountry').className = "filterCard__card";
            document.getElementById('cardService').className = "filterCard__card";
            document.getElementById('cardEmergency').className = "filterCard__card--active";
            this.search = '';
        }
    };
    AdminCenterSystemConfigurationComponent.prototype.applyFilter = function (event) {
        console.log(event, 'estas buscando');
        var filterValue = event.target.value;
        if (this.tableCatalog == 'offices') {
            this.dataOffices.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'countries') {
            this.dataCountries.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'services') {
            this.serviceLocationsimmi.filter = filterValue.trim().toLowerCase();
            this.serviceLocationsrelo.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'emergency response') {
        }
    };
    // office add and delete
    AdminCenterSystemConfigurationComponent.prototype.addOffice = function (id) {
        var _this = this;
        console.log('abrir modal office');
        var dialogRef = this._dialog.open(dialog_catalog_offices_component_1.DialogCatalogOfficesComponent, {
            data: { id: id },
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    AdminCenterSystemConfigurationComponent.prototype.deleteOffice = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Office?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("Catalog/DeleteOffice/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted " + data.result.office
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The office is in use by other records"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // countries add and delete
    AdminCenterSystemConfigurationComponent.prototype.addCountry = function () {
        var _this = this;
        console.log("ABRE MODAL COUNTRY");
        var dialogRef = this._dialog.open(dialog_admin_center_countries_component_1.DialogAdminCenterCountriesComponent, {
            data: { id: 0 },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_catalogos();
        });
    };
    AdminCenterSystemConfigurationComponent.prototype.editRegistro = function (data_) {
        var _this = this;
        data_.origin = 'systemConfiguration';
        console.log("ABRE MODAL PARA EDICION DE REGISTRO GENERAL: ", data_);
        var dialogRef = this._dialog.open(dialog_admin_center_countries_component_1.DialogAdminCenterCountriesComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_catalogos();
        });
    };
    AdminCenterSystemConfigurationComponent.prototype.deleteCountry = function (data) {
        var _this = this;
        console.log(data);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this country?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.__loader__.showLoader();
                _this._services.service_general_delete("CountryAdminCenter/DeleteCountry?id=" + data.id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: 'Country deleted successfull'
                            },
                            width: "350px"
                        });
                        _this.__loader__.hideLoader();
                        _this.get_catalogos();
                    }
                }), function (err) {
                    console.log("err ", err);
                    if (err.status == 409) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Attention",
                                body: 'This country can`t be deleted'
                            },
                            width: "350px"
                        });
                        _this.__loader__.hideLoader();
                        _this.get_catalogos();
                    }
                });
            }
        });
    };
    // countries
    AdminCenterSystemConfigurationComponent.prototype.AddCountryDialog = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_country_seccion_country_component_1.DialogAddCountrySeccionCountryComponent, {
            data: { data: 'no' },
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_catalogos();
        });
    };
    AdminCenterSystemConfigurationComponent.prototype.addService = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_service_admin_center_component_1.DialogAddServiceAdminCenterComponent, {
            data: { id: id },
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Updated data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    // emergency response
    AdminCenterSystemConfigurationComponent.prototype.addEmergencyResponse = function (id) {
    };
    __decorate([
        core_1.ViewChild('sortoffice')
    ], AdminCenterSystemConfigurationComponent.prototype, "sortoffice");
    __decorate([
        core_1.ViewChild('pagoffice')
    ], AdminCenterSystemConfigurationComponent.prototype, "pagoffice");
    __decorate([
        core_1.ViewChild('sortcountry')
    ], AdminCenterSystemConfigurationComponent.prototype, "sortcountry");
    __decorate([
        core_1.ViewChild('pagocountry')
    ], AdminCenterSystemConfigurationComponent.prototype, "pagocountry");
    __decorate([
        core_1.ViewChild('immisort')
    ], AdminCenterSystemConfigurationComponent.prototype, "immisort");
    __decorate([
        core_1.ViewChild('relosort')
    ], AdminCenterSystemConfigurationComponent.prototype, "relosort");
    __decorate([
        core_1.ViewChild('immipag')
    ], AdminCenterSystemConfigurationComponent.prototype, "immipag");
    __decorate([
        core_1.ViewChild('relopag')
    ], AdminCenterSystemConfigurationComponent.prototype, "relopag");
    AdminCenterSystemConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-center-system-configuration',
            templateUrl: './admin-center-system-configuration.component.html',
            styleUrls: ['./admin-center-system-configuration.component.css']
        })
    ], AdminCenterSystemConfigurationComponent);
    return AdminCenterSystemConfigurationComponent;
}());
exports.AdminCenterSystemConfigurationComponent = AdminCenterSystemConfigurationComponent;
