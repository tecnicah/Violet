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
exports.DialogAdminCenterCountriesComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_admin_center_add_city_component_1 = require("../dialog-admin-center-add-city/dialog-admin-center-add-city.component");
var general_message_component_1 = require("../general-message/general-message.component");
var dialog_admin_center_documents_upload_component_1 = require("../dialog-admin-center-documents-upload/dialog-admin-center-documents-upload.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var loader_1 = require("app/shared/loader");
var dialog_add_leader_component_1 = require("./../dialog-add-leader/dialog-add-leader.component");
var DialogAdminCenterCountriesComponent = /** @class */ (function () {
    function DialogAdminCenterCountriesComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.data_ = {
            "sortname": "",
            "phonecode": "",
            "flag": "",
            catCities: [],
            countryDocuments: []
        };
        this.authoDate = new Date();
        this.document = [];
        this.countryLeaders = [];
        this.loader = new loader_1.LoaderComponent();
        //******************************************************//
        this.ca_currency = [];
        this.ca_language = [];
        this.caDocumentType = [];
        this.caCountry = [];
        this.caStatus = [];
        this.ca_timeZone = [];
    }
    //******************************************************//
    DialogAdminCenterCountriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log("Data que recibe modal: ", this.data);
        if (this.data.id != 0) {
            this.loader.showLoader();
            this._services.service_general_get('CountryAdminCenter/GetCountryById?id=' + this.data.id).subscribe((function (data_c) {
                if (data_c.success) {
                    console.log(data_c.result.value[0]);
                    _this.data_ = data_c.result.value[0];
                    for (var i = 0; i < _this.data_.catCities.length; i++) {
                        _this.data_.catCities[i].createDate = _this.data_.cities[i].createDate;
                        _this.data_.catCities[i].resource_guide = _this.data_.cities[i].resource_guide;
                    }
                    // console.log(this.data_);
                }
            }));
        }
        this.loader.hideLoader();
        this.getCatalogos();
    };
    DialogAdminCenterCountriesComponent.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTimeZone')];
                    case 1:
                        _a.ca_timeZone = _g.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 2:
                        _b.ca_currency = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 3:
                        _c.ca_language = _g.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType/1')];
                    case 4:
                        _d.caDocumentType = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 5:
                        _e.caCountry = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentStatus')];
                    case 6:
                        _f.caStatus = _g.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //******************************************************//
    DialogAdminCenterCountriesComponent.prototype.addCity = function () {
        var _this = this;
        var dataC = {};
        // dataC.id = this.data.id;
        dataC.id = 0;
        dataC.origin = this.data.origin;
        console.log("ABRE MODAL ADD CITY", dataC);
        var dialogRef = this._dialog.open(dialog_admin_center_add_city_component_1.DialogAdminCenterAddCityComponent, {
            // data: {
            //   id: this.data.id
            //   },
            data: dataC,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Este es el result de add city: ", result);
            if (result.success) {
                // result.id = this.data.id;
                result.idCountry = _this.data.id;
                result.createdDate = new Date();
                _this.data_.catCities.push(result);
            }
        });
    };
    //******************************************************//
    DialogAdminCenterCountriesComponent.prototype.editRegistro = function (data_, i) {
        var _this = this;
        data_.origin = this.data.origin;
        console.log("ABRE MODAL ADD CITY PARA EDICION", data_);
        var dialogRef = this._dialog.open(dialog_admin_center_add_city_component_1.DialogAdminCenterAddCityComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Este es el result de add city: ", result);
            if (result.success) {
                _this.data_.catCities[i] = result;
            }
        });
    };
    //******************************************************//
    DialogAdminCenterCountriesComponent.prototype.deleteLeader = function (idLeader) {
        var _this = this;
        // let countryLeader = this.data_.countryLeaders;
        console.log('borrar', idLeader);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this country leader?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                for (var i = 0; i < _this.data_.countryLeaders.length; i++) {
                    var element = _this.data_.countryLeaders[i];
                    if (element.leader == idLeader) {
                        _this.data_.countryLeaders.splice(i, 1);
                        break;
                    }
                    console.log('countryleader', _this.data_.countryLeaders);
                }
                _this._services.service_general_put("CountryAdminCenter/UpdateCountry", _this.data_).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted country leader"
                            },
                            width: "350px"
                        });
                        _this.getCatalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The country leader is in use "
                        },
                        width: "350px"
                    });
                    _this.getCatalogos();
                });
            }
        });
    };
    DialogAdminCenterCountriesComponent.prototype.addLeader = function () {
        var _this = this;
        console.log("ABRE MODAL LEADER PARA DOCUMENTO");
        var dialogRef = this._dialog.open(dialog_add_leader_component_1.DialogAddLeaderComponent, {
            data: {
                id: 0
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.country = _this.data_.id;
                console.log("Este es el result de leader: ", result);
                _this.data_.countryLeaders.push(result);
                // this.data_.countryLeaders = this.countryLeaders;
            }
        });
    };
    DialogAdminCenterCountriesComponent.prototype.save = function () {
        var _this = this;
        this.loader.showLoader();
        this.data_.id = this.data.id;
        this.data_.createdBy = this.user.id;
        this.data_.createdDate = new Date();
        this.data_.updateBy = this.user.id;
        this.data_.updatedDate = new Date();
        this.data_.countryDocuments = this.document;
        // if (this.data_.leader != undefined) {
        // this.data_.countryLeaders = this.data_.countryLeaders;
        // }
        console.log("Esta es la informacion a guardar: ", this.data_);
        console.log("Esta es la informacion a guardar (STRINGIFY): ", JSON.stringify(this.data_));
        if (this.data_.id == 0) {
            this._services.service_general_post_with_url("CountryAdminCenter/AddCountry", this.data_).subscribe((function (data) {
                if (data.success) {
                    console.log(data);
                    var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Saved Data"
                        },
                        width: "350px"
                    });
                    _this.loader.hideLoader();
                    _this.dialogRef.close();
                }
            }));
        }
        else {
            this._services.service_general_put("CountryAdminCenter/UpdateCountry", this.data_).subscribe((function (data) {
                if (data.success) {
                    console.log(data);
                    var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Saved Data"
                        },
                        width: "350px"
                    });
                    _this.loader.hideLoader();
                    _this.dialogRef.close();
                }
            }));
        }
    };
    //******************************************************//
    DialogAdminCenterCountriesComponent.prototype.addDocument = function () {
        var _this = this;
        console.log("ABRE MODAL DOCUMENT PARA DOCUMENTO");
        var dialogRef = this._dialog.open(dialog_admin_center_documents_upload_component_1.DialogAdminCenterDocumentsUploadComponent, {
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Este es el result de leader: ", result);
            if (result.success) {
                result.idCountry = _this.data_.id;
                _this.document.push(result);
            }
        });
    };
    //******************************************************//
    //FUNCIONES PARA CONSULTA DE NOMBRES//
    DialogAdminCenterCountriesComponent.prototype.getName = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    DialogAdminCenterCountriesComponent.prototype.getStatus = function (id) {
        for (var i = 0; i < this.caStatus.length; i++) {
            if (this.caStatus[i].id == id) {
                return this.caStatus[i].status;
            }
        }
    };
    DialogAdminCenterCountriesComponent.prototype.getPrivacy = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].privacy;
            }
        }
    };
    DialogAdminCenterCountriesComponent.prototype.getTimeZone = function (id) {
        for (var i = 0; i < this.ca_timeZone.length; i++) {
            if (this.ca_timeZone[i].id == id) {
                return this.ca_timeZone[i].timeZone;
            }
        }
    };
    //******************************************************//
    //FUNCIONES PARA ELIMINAR//
    DialogAdminCenterCountriesComponent.prototype.deleteTemporal = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this document?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.document.splice(i, 1);
            }
        });
    };
    //FUNCION PARA ELIMINAR DE BASE DE DATOS DOCUMENT COUNTRY//
    DialogAdminCenterCountriesComponent.prototype.deleteDocumentCountry = function (data) {
        var _this = this;
        console.log(data);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this document?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("CountryAdminCenter/DeleteCountryDocument?id=" + data.id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: 'Document deleted successfull'
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                }));
            }
        });
    };
    //DELETE CITY//
    DialogAdminCenterCountriesComponent.prototype.deleteCity = function (i, item) {
        var _this = this;
        console.log(item);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this city?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                if (item.id == 0) {
                    _this.data_.catCities.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("CountryAdminCenter/DeleteCity?id=" + item.id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "City was deleted"
                                },
                                width: "350px"
                            });
                            _this.ngOnInit();
                        }
                    }));
                }
            }
        }, function (error) {
            console.error('error con el delete', error);
            var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Warning",
                    body: "The city is in use."
                },
                width: "350px"
            });
            _this.ngOnInit();
        });
    };
    DialogAdminCenterCountriesComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-admin-center-countries',
            templateUrl: './dialog-admin-center-countries.component.html',
            styleUrls: ['./dialog-admin-center-countries.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAdminCenterCountriesComponent);
    return DialogAdminCenterCountriesComponent;
}());
exports.DialogAdminCenterCountriesComponent = DialogAdminCenterCountriesComponent;
