"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.DialogAddServiceAdminCenterComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var table_1 = require("@angular/material/table");
var loader_1 = require("app/shared/loader");
var dialog_add_country_seccion_country_component_1 = require("../dialog-add-country-seccion-country/dialog-add-country-seccion-country.component");
var DialogAddServiceAdminCenterComponent = /** @class */ (function () {
    function DialogAddServiceAdminCenterComponent(dialogRef, _services, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this.data = data;
        this._dialog = _dialog;
        this.GetService = [];
        this.GetServiceLine = [];
        this.GetCountry = [];
        this.cuatro = ['uno', 'dos', 'tres', 'cuatro'];
        this.caCounty = [];
        this.loader = new loader_1.LoaderComponent();
    }
    DialogAddServiceAdminCenterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.catalogos();
        console.log(this.data);
        if (this.data.id == 0) {
            if (this.data.serviceCountries) { }
            else {
                this.data.serviceCountries = [];
            }
        }
        else {
            this.loader.showLoader();
            this._services.service_general_get('AdminCenter/GetService/' + this.data.id).subscribe(function (r) {
                if (r.success) {
                    _this.data = r.result;
                    console.log(_this.data);
                    _this.loader.hideLoader();
                    _this.getCountry();
                    _this.getService();
                }
            });
        }
    };
    DialogAddServiceAdminCenterComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // this.GetService = await this._services.getCatalogueFrom('GetService');
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        // this.GetService = await this._services.getCatalogueFrom('GetService');
                        _a.GetServiceLine = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.GetCountry = _c.sent();
                        this.getService();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogAddServiceAdminCenterComponent.prototype.getCountry = function () {
        var _this = this;
        this.serviceCountries = [];
        this._services.service_general_get('Catalogue/GetCountry').subscribe(function (r) {
            if (r.success) {
                _this.caCounty = r.result;
                for (var i = 0; i < _this.data.serviceCountries.length; i++) {
                    var element = _this.data.serviceCountries[i];
                    for (var j = 0; j < _this.caCounty.length; j++) {
                        var elementc = _this.caCounty[j];
                        if (element.country == elementc.id) {
                            _this.data.serviceCountries[i].namec = elementc.name;
                        }
                    }
                }
                console.log(_this.data.serviceCountries);
                _this.serviceCountries = new table_1.MatTableDataSource(_this.data.serviceCountries);
            }
        });
    };
    DialogAddServiceAdminCenterComponent.prototype.getService = function () {
        var _this = this;
        if (this.data.serviceLine == 0 || this.data.serviceLine == null) {
        }
        else {
            this._services.service_general_get("Catalogue/GetServiceByServiceLine?idServiceLine=" + this.data.serviceLine).subscribe(function (r) {
                if (r.success) {
                    _this.GetService = r.result.value;
                }
            });
        }
    };
    // este methodo es para pintar la tabla de countrys cuando aun no estan guardados los datos
    DialogAddServiceAdminCenterComponent.prototype.getCountryNoSave = function () {
        var _this = this;
        var valorTabla = [];
        this.serviceCountries = [];
        this._services.service_general_get('Catalogue/GetCountry').subscribe(function (r) {
            if (r.success) {
                _this.caCounty = r.result;
                for (var i = 0; i < _this.data.serviceCountries[0].countries.length; i++) {
                    var element = _this.data.serviceCountries[0].countries[i];
                    for (var j = 0; j < _this.caCounty.length; j++) {
                        var elementc = _this.caCounty[j];
                        if (element == elementc.id) {
                            // this.data.serviceCountries[i].namec = elementc.name;
                            valorTabla.push({
                                namec: elementc.name,
                                scopeDescription: _this.data.serviceCountries[0].scopeDescription,
                                documentServiceCountries: _this.data.serviceCountries[0].documentServiceCountries
                            });
                        }
                    }
                }
                _this.serviceCountries = new table_1.MatTableDataSource(valorTabla);
            }
        });
    };
    //
    DialogAddServiceAdminCenterComponent.prototype.addCountryUpdate = function () {
        // metodo que agrega nombre y ciudad a la tabla cuando aun no se guarda los countries que se agregaron
        var valorTabla = [];
        for (var c = 0; c < this.data.serviceCountries.length; c++) {
            var dataTableCountry = this.data.serviceCountries[c];
            for (var j = 0; j < this.GetCountry.length; j++) {
                var elementc = this.GetCountry[j];
                if (dataTableCountry.country == elementc.id) {
                    valorTabla.push({
                        namec: elementc.name,
                        scopeDescription: dataTableCountry.scopeDescription,
                        documentServiceCountries: dataTableCountry.documentServiceCountries
                    });
                }
            }
        }
        this.serviceCountries = new table_1.MatTableDataSource(valorTabla);
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //office information
    DialogAddServiceAdminCenterComponent.prototype.addCountry = function (data, i) {
        var _this = this;
        console.log('data form', data, +'indice' + i);
        // opcion cuando se crea un servicio nuevo y puede elegir muchos paises
        if (this.data.id == 0 && data == null) {
            data = { id: 0, action: "new" };
        }
        // opcion cuando es un servicio ya creado y se le quiere agregar un pais nuevo ya no hay multicheck
        else if (this.data.id != 0 && data == null) {
            data = { id: 0, action: 0 };
        }
        //opcion cuando editas un country
        else {
            data.action = i;
        }
        var dialogRef = this._dialog.open(dialog_add_country_seccion_country_component_1.DialogAddCountrySeccionCountryComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                var user = JSON.parse(localStorage.getItem('userData'));
                result.updatedBy = user.id;
                result.updatedDate = new Date();
                if (result.action == "new") {
                    result.countries = result.country;
                    result.country = 0;
                    result.service = _this.data.id;
                    result.createdBy = user.id;
                    result.createdDate = new Date();
                    _this.data.serviceCountries.push(result);
                    _this.getCountryNoSave();
                }
                // si es un update de un service y se agrega un nuevo country
                else if (result.action == 0 && result.id == 0) {
                    // push a la data
                    result.countries = [];
                    result.serviceCountryLeaders = [];
                    result.service = _this.data.id;
                    result.createdBy = user.id;
                    result.createdDate = new Date();
                    _this.data.serviceCountries.push(result);
                    // this.getCountryNoSave();
                    _this.addCountryUpdate();
                    // this.data.serviceCountries.push(countryAdd);
                    // this.getCountryNoSave();
                }
                else {
                    result.countries = [];
                    result.serviceCountryLeaders = [];
                    if (result.documentServiceCountries.length == 0) {
                        result.documentServiceCountries = [];
                    }
                    // this.data.serviceCountries.push(result);
                    _this.data.serviceCountries[result.action] = result;
                    _this.getCountry();
                }
                console.log(_this.data.serviceCountries);
            }
        });
    };
    DialogAddServiceAdminCenterComponent.prototype.save = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userData'));
        this.data.serviceCountries.serviceCountryLeaders = [];
        this.data.updatedBy = userData.id;
        this.data.updatedDate = new Date();
        console.log(this.data);
        debugger;
        if (this.data.id == 0) {
            this.loader.showLoader();
            this.data.createdBy = userData.id;
            this.data.createdDate = new Date();
            console.log(JSON.stringify(this.data), this.data);
            this._services.service_general_post_with_url('AdminCenter/AddService', this.data).subscribe(function (r) {
                console.log(r);
                _this.loader.hideLoader();
                _this.dialogRef.close(1);
            });
        }
        else {
            this.loader.showLoader();
            console.log(JSON.stringify(this.data), this.data);
            this._services.service_general_put('AdminCenter/UpdateService', this.data).subscribe(function (r) {
                console.log(r);
                _this.loader.hideLoader();
                _this.dialogRef.close(2);
            });
        }
    };
    DialogAddServiceAdminCenterComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-add-service-admin-center',
            templateUrl: './dialog-add-service-admin-center.component.html',
            styleUrls: ['./dialog-add-service-admin-center.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAddServiceAdminCenterComponent);
    return DialogAddServiceAdminCenterComponent;
}());
exports.DialogAddServiceAdminCenterComponent = DialogAddServiceAdminCenterComponent;
