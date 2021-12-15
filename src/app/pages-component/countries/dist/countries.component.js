"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CountriesComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var dialog_admin_center_countries_component_1 = require("../dialog/dialog-admin-center-countries/dialog-admin-center-countries.component");
var table_1 = require("@angular/material/table");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var CountriesComponent = /** @class */ (function () {
    function CountriesComponent(_services, _dialog) {
        this._services = _services;
        this._dialog = _dialog;
        this.displayedColumns = ['Country', 'Currency', 'Languages', 'Cities', 'Creation Date', 'Actions'];
        this.filteruno = false;
        this.loader = new loader_1.LoaderComponent();
        //***************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    CountriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.dataSource = this.ELEMENT_DATA;
        this.loader.showLoader();
        this._services.service_general_get('CountryAdminCenter/GetCountry').subscribe((function (data) {
            if (data.success) {
                console.log(data.result.value);
                _this.dataSource = new table_1.MatTableDataSource(data.result.value);
                _this.dataSource.paginator = _this.pagcountry;
                _this.dataSource.sort = _this.sortcountry;
                _this.loader.hideLoader();
            }
        }));
    };
    CountriesComponent.prototype.consultaPermisos = function () {
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
    //*****************************************************************//
    //ABRE MODAL PARA AGREGAR NUEVA COUNTRY//
    CountriesComponent.prototype.addCountry = function () {
        var _this = this;
        console.log("ABRE MODAL COUNTRY");
        var dialogRef = this._dialog.open(dialog_admin_center_countries_component_1.DialogAdminCenterCountriesComponent, {
            data: { id: 0 },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    //*****************************************************************//
    //BUSQUEDA POR FILTRO//
    CountriesComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    //*****************************************************************//
    //EDICION DE REGISTRO//
    CountriesComponent.prototype.editRegistro = function (data_) {
        var _this = this;
        console.log("ABRE MODAL PARA EDICION DE REGISTRO GENERAL: ", data_);
        data_.origin = 'violetApp';
        var dialogRef = this._dialog.open(dialog_admin_center_countries_component_1.DialogAdminCenterCountriesComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    //*****************************************************************//
    //FUNCION PARA ELIMINAR DE BASE DE DATOS DOCUMENT COUNTRY//
    CountriesComponent.prototype.deleteCountry = function (data) {
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
                _this.loader.showLoader();
                _this._services.service_general_delete("CountryAdminCenter/DeleteCountry?id=" + data.id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: 'Country deleted successfull'
                            },
                            width: "350px"
                        });
                        _this.loader.hideLoader();
                        _this.ngOnInit();
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
                        _this.loader.hideLoader();
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('sortcountry')
    ], CountriesComponent.prototype, "sortcountry");
    __decorate([
        core_1.ViewChild('pagcountry')
    ], CountriesComponent.prototype, "pagcountry");
    CountriesComponent = __decorate([
        core_1.Component({
            selector: 'app-countries',
            templateUrl: './countries.component.html',
            styleUrls: ['./countries.component.css']
        })
    ], CountriesComponent);
    return CountriesComponent;
}());
exports.CountriesComponent = CountriesComponent;
