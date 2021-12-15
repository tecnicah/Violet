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
exports.ProfileCoordinatorComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var dialog_add_vahicle_consultant_component_1 = require("../dialog/dialog-add-vahicle-consultant/dialog-add-vahicle-consultant.component");
var dialog_emergency_contact_component_1 = require("../dialog/dialog-emergency-contact/dialog-emergency-contact.component");
var dialog_profile_document_component_1 = require("../dialog/dialog-profile-document/dialog-profile-document.component");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var dialog_add_office_component_1 = require("../dialog/dialog-add-office/dialog-add-office.component");
var dialog_add_country_component_1 = require("../dialog/dialog-add-country/dialog-add-country.component");
var dialog_add_operation_leader_component_1 = require("../dialog/dialog-add-operation-leader/dialog-add-operation-leader.component");
var ProfileCoordinatorComponent = /** @class */ (function () {
    function ProfileCoordinatorComponent(_services, _routerParams, _dialog, _permissions) {
        this._services = _services;
        this._routerParams = _routerParams;
        this._dialog = _dialog;
        this._permissions = _permissions;
        this.ca_assignedTeam = [];
        this.ca_cliente = [];
        this.temporalDocument = [];
        this.show = false;
        this.loader = new loader_1.LoaderComponent();
        this.data_coordinator = {};
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        //*********************************************************************************//
        //CONSULTA DE CATALOGOS DE INFORMACION//
        this.ca_creditCard = [];
        this.ca_accountType = [];
        this.ca_currency = [];
        this.ca_office = [];
        this.ca_title = [];
        this.ca_country = [];
        this.ca_languages = [];
        this.ca_benefit = [];
        this.ca_duration = [];
        this.supplier_catalogue = [];
        this.ca_privacy = [];
        this.ca_documentType = [];
        this.ca_documentStatus = [];
        this.ca_vehicle = [];
        //*********************************************************************************//
        //CONSULTA CIUDAD//
        this.ca_city = [];
    }
    ProfileCoordinatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initPageSettings();
        this.loader.showLoader();
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.id = this._routerParams.snapshot.params.id;
        console.log(this.id);
        this._services.service_general_get('Profile/GetProfile/' + this.id).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.data_coordinator = data.result;
                _this._services.service_general_get('Profile/GetClients?user=' + _this.data_coordinator.userId).subscribe((function (data) {
                    if (data.success) {
                        console.log(data.result.value);
                        _this.ca_cliente = data.result.value;
                    }
                }));
                _this.getCity();
                _this.loader.hideLoader();
                if (_this.data_coordinator.photo != null && _this.data_coordinator.photo != '') {
                    document.getElementById('lead_client_avatar').setAttribute('src', _this._services.url_images + _this.data_coordinator.photo);
                }
                var language_additional = void 0;
                _this.data_coordinator.additional = [];
                if (_this.data_coordinator.languagesConsultantContactsConsultants.length > 0) {
                    language_additional = _this.data_coordinator.languagesConsultantContactsConsultants;
                    for (var j = 0; j < language_additional.length; j++) {
                        _this.data_coordinator.additional.push(language_additional[j].language);
                    }
                }
                _this.verificaNodos();
                if (_this.data_coordinator.personalInformation.paymentInformationProfiles.length == 0) {
                    _this.data_coordinator.personalInformation.paymentInformationProfiles.push({
                        "wireTransfer": null,
                        "fiscalInvoice": null,
                        "accountType": null,
                        "accountHoldersName": "",
                        "bankName": "",
                        "accountNumber": null,
                        "routingNumber": null,
                        "swiftBicCode": "",
                        "currency": null,
                        "clabe": null,
                        "wireFeeApprox": null,
                        "bankAddress": "",
                        "internationalPaymentAcceptance": null,
                        "createdBy": _this.user.id,
                        "createdDate": new Date(),
                        "updatedBy": _this.user.id,
                        "updatedDate": new Date()
                    });
                }
                else {
                    if (_this.data_coordinator.personalInformation.paymentInformationProfiles[0].wireTransfer ||
                        _this.data_coordinator.personalInformation.paymentInformationProfiles[0].fiscalInvoice) {
                        _this.data_coordinator.togglePayment = true;
                        _this.show = true;
                    }
                }
            }
            _this.catalogos();
        }));
        this._services.service_general_get('Profile/GetAssignedTeam').subscribe((function (data) {
            if (data.success) {
                _this.ca_assignedTeam = data.result.value;
            }
        }));
    };
    ProfileCoordinatorComponent.prototype.goBack = function () {
        window.history.back();
    };
    ProfileCoordinatorComponent.prototype.initPageSettings = function () {
        this.user = JSON.parse(localStorage.getItem('userData'));
        var user_rol = [this.__userlog__.role.role];
        this._permissions.loadPermissions(user_rol);
    };
    //*********************************************************************************//
    //FUNCION PARA CREAR NODOS QUE NO EXISTAN//
    ProfileCoordinatorComponent.prototype.verificaNodos = function () {
        if (!this.data_coordinator.personalInformation) {
            this.data_coordinator.personalInformation = {};
            if (!this.data_coordinator.personalInformation.paymentInformationProfiles) {
                this.data_coordinator.personalInformation.paymentInformationProfiles = [];
            }
        }
        if (!this.data_coordinator.personalInformation.emergencyContacts) {
            this.data_coordinator.personalInformation.emergencyContacts = [];
        }
        if (!this.data_coordinator.personalInformation.compesationBenefits) {
            this.data_coordinator.personalInformation.compesationBenefits = [];
        }
    };
    ProfileCoordinatorComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, duration, _k, _l, _m, _o;
            var _this = this;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 1:
                        _a.ca_accountType = _p.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 2:
                        _b.ca_creditCard = _p.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 3:
                        _c.ca_currency = _p.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetOffice')];
                    case 4:
                        _d.ca_office = _p.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTitle')];
                    case 5:
                        _e.ca_title = _p.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 6:
                        _f.ca_country = _p.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 7:
                        _g.ca_languages = _p.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 8:
                        _h.ca_languages = _p.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBenefit')];
                    case 9:
                        _j.ca_benefit = _p.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 10:
                        duration = _p.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplier')];
                    case 11:
                        _k.supplier_catalogue = _p.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 12:
                        _l.ca_privacy = _p.sent();
                        //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentStatus')];
                    case 13:
                        //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
                        _m.ca_documentStatus = _p.sent();
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetVehicleType')];
                    case 14:
                        _o.ca_vehicle = _p.sent();
                        this.ca_duration = duration.filter(function (E) {
                            if (E.recurrence != null) {
                                return true;
                            }
                        });
                        this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((function (data) {
                            if (data.success) {
                                _this.ca_documentType = data.result;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileCoordinatorComponent.prototype.getCity = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetState?country=' + this.data_coordinator.country).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
    };
    //*********************************************************************************//
    //FUNCION PARA EDICION DE FOTOGRAFIA//
    ProfileCoordinatorComponent.prototype.img = function (event) {
        var _this = this;
        console.log(event);
        var file = event.target.files[0];
        var ext = event.target.files[0].type.split('/');
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader);
            var encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            _this.data_coordinator.photo = encoded;
            _this.data_coordinator.photoExtension = ext[1];
            document.getElementById('lead_client_avatar').setAttribute('src', '' + reader.result);
        };
    };
    //*********************************************************************************//
    //FUNCION PARA AGREGAR  NUEVO VEHICULO//
    ProfileCoordinatorComponent.prototype.addVehicle = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_vahicle_consultant_component_1.DialogAddVahicleConsultantComponent, {
            width: "90%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_coordinator.vehicleConsultants.push(result);
            }
        });
    };
    //FUNCION PARA EDICION DE VEHICULO//
    ProfileCoordinatorComponent.prototype.editVehicle = function (data, i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_vahicle_consultant_component_1.DialogAddVahicleConsultantComponent, {
            width: "90%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_coordinator.vehicleConsultants[i] = result;
            }
        });
    };
    //*********************************************************************************//
    //AGREGAR NUEVO CONTACTO DE EMERGENCIA//
    ProfileCoordinatorComponent.prototype.addContact = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_emergency_contact_component_1.DialogEmergencyContactComponent, {
            width: "90%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_coordinator.personalInformation.emergencyContacts.push(result);
            }
        });
    };
    //*********************************************************************************//
    //EDITAR CONTACTO DE EMERGENCIA//
    ProfileCoordinatorComponent.prototype.editContact = function (data, i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_emergency_contact_component_1.DialogEmergencyContactComponent, {
            width: "90%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_coordinator.personalInformation.emergencyContacts[i] = result;
            }
        });
    };
    //*********************************************************************************//
    //FUNCION PARA AGREGAR NUEVO BENEFIT//
    ProfileCoordinatorComponent.prototype.addBenefit = function () {
        this.data_coordinator.personalInformation.compesationBenefits.push({
            "id": 0,
            "profile": 0,
            "placeWork": 0,
            "baseCompesation": null,
            "currency": 0,
            "taxes": null,
            "benefit": 0,
            "ammount": null,
            "frequency": 0
        });
    };
    //*********************************************************************************//
    //FUNCION PARA NUEVO DOCUMENTO//
    ProfileCoordinatorComponent.prototype.addDocument = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_profile_document_component_1.DialogProfileDocumentComponent, {
            width: "90%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.temporalDocument.push(result);
            }
        });
    };
    //ELIMINAR DOCUMENTO//
    ProfileCoordinatorComponent.prototype.deleteDocument = function (i) {
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
                _this.temporalDocument.splice(i, 1);
            }
        });
    };
    //*********************************************************************************//
    //FUNCION PARA PAYMENT INFORMATION//
    ProfileCoordinatorComponent.prototype.paymentInformation = function (event) {
        //  console.log(event);
        if (event.checked) {
            this.show = true;
        }
        else {
            this.show = false;
        }
    };
    //********************************************************************************//
    //FUNCION PARA CONSULTAR EL NOMBRE DE LA OFICINA//
    ProfileCoordinatorComponent.prototype.getNameOffice = function (id) {
        for (var i = 0; i < this.ca_office.length; i++) {
            if (this.ca_office[i].id == id) {
                return this.ca_office[i].office;
            }
        }
    };
    //FUNCION PARA CONSULTA DE IMAGEN DE LA OFICINA//
    ProfileCoordinatorComponent.prototype.getPhotoOffice = function (id) {
        for (var i = 0; i < this.ca_office.length; i++) {
            if (this.ca_office[i].id == id) {
                return this.ca_office[i].image;
            }
        }
    };
    //FUNCION PARA ELIMINAR OFICINA//
    ProfileCoordinatorComponent.prototype.deleteOffice = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete Office?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_coordinator.offices.splice(i, 1);
            }
        });
    };
    //FUNCION PARA AGREGAR NUEVA OFICINA//
    ProfileCoordinatorComponent.prototype.addOffice = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_office_component_1.DialogAddOfficeComponent, {
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                result.consultant = _this.data_coordinator.id;
                _this.data_coordinator.offices.push(result);
            }
        });
    };
    //********************************************************************************//
    //FUNCIONES PARA COUNTRY AGREGAR Y ELIMINAR//
    ProfileCoordinatorComponent.prototype.addCountry = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_country_component_1.DialogAddCountryComponent, {
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                result.consultant = _this.data_coordinator.id;
                _this.data_coordinator.countryServices.push(result);
            }
        });
    };
    //FUNCION PARA ELIMINAR COUNTRY//
    ProfileCoordinatorComponent.prototype.deleteCountry = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete Country?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_coordinator.countryServices.splice(i, 1);
            }
        });
    };
    //********************************************************************************//
    //FUNCION PARA AGREGAR NUEVO OPERATION LEADER//
    ProfileCoordinatorComponent.prototype.addOperationLeader = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_operation_leader_component_1.DialogAddOperationLeaderComponent, {
            data: this.data_coordinator.country,
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.createdBy = _this.data_coordinator.id;
                _this.data_coordinator.operationLeaderCreatedByNavigations.push(result);
            }
        });
    };
    //FUNCION PARA ELIMINAR OPERATION LEADER//
    ProfileCoordinatorComponent.prototype.deleteOperationLeader = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete Operation Leader?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_coordinator.operationLeaderCreatedByNavigations.splice(i, 1);
            }
        });
    };
    //********************************************************************************//
    //FUNCION PARA CONSULTAR NOMBRE DEL COUNTRY//
    ProfileCoordinatorComponent.prototype.getNameCountry = function (id) {
        for (var i = 0; i < this.ca_country.length; i++) {
            if (this.ca_country[i].id == id) {
                return this.ca_country[i].name;
            }
        }
    };
    //FUNCION PARA CONSULTA DE IMAGEN DEL COUNTRY//
    ProfileCoordinatorComponent.prototype.getImageCountry = function (id) {
        for (var i = 0; i < this.ca_country.length; i++) {
            if (this.ca_country[i].id == id) {
                return this.ca_country[i].flag;
            }
        }
    };
    //FUNCIONA PARA TRAER NOMBRE DE PRIVACIDAD//
    ProfileCoordinatorComponent.prototype.getNamePrivacy = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
            }
        }
    };
    //FUNCION PARA CONSULTAR NOMBRE DEL DOCUMEN TYPE//
    ProfileCoordinatorComponent.prototype.getNameDocument = function (id) {
        // let document;
        // this._services.service_general_get(`Catalogue/GetDocumentType/${id}`).subscribe((data => {
        //   if (data.success) {
        //      document = data.result;
        //       return document.documentType;
        //   }
        // }))
        for (var i = 0; i < this.ca_documentType.length; i++) {
            if (this.ca_documentType[i].id == id) {
                return this.ca_documentType[i].documentType;
            }
        }
    };
    //FUNCION PARA STATUS DEL DOCUMENTO//
    ProfileCoordinatorComponent.prototype.getDocumentStatus = function (id) {
        for (var i = 0; i < this.ca_documentStatus.length; i++) {
            if (this.ca_documentStatus[i].id == id) {
                return this.ca_documentStatus[i].status;
            }
        }
    };
    //GET DATA TEAM NAME//
    ProfileCoordinatorComponent.prototype.getDataTeam = function (id) {
        for (var i = 0; i < this.ca_assignedTeam.length; i++) {
            if (this.ca_assignedTeam[i].id == id) {
                return this.ca_assignedTeam[i].name;
            }
        }
    };
    //FUNCION PARA CONSULTA DE ROL//
    ProfileCoordinatorComponent.prototype.getDataTeamTile = function (id) {
        for (var i = 0; i < this.ca_assignedTeam.length; i++) {
            if (this.ca_assignedTeam[i].id == id) {
                return this.ca_assignedTeam[i].title;
            }
        }
    };
    //FUNCION PARA CONSULTA DE FOTOGRAFIA//
    ProfileCoordinatorComponent.prototype.getDataTeamPhoto = function (id) {
        for (var i = 0; i < this.ca_assignedTeam.length; i++) {
            if (this.ca_assignedTeam[i].id == id) {
                return this.ca_assignedTeam[i].photo;
            }
        }
    };
    //NOMBRE DEL TIPO DE VIHICULO//
    ProfileCoordinatorComponent.prototype.getVehicle = function (id) {
        for (var i = 0; i < this.ca_vehicle.length; i++) {
            if (this.ca_vehicle[i].id == id) {
                return this.ca_vehicle[i].type;
            }
        }
    };
    //********************************************************************************//
    //FUNCION PARA GUARDAR LA INFORMACION//
    ProfileCoordinatorComponent.prototype.save = function () {
        var _this = this;
        this.data_coordinator.user = null;
        this.loader.showLoader();
        if (this.data_coordinator.additional.length > 0) {
            this.data_coordinator.languagesConsultantContactsConsultants = [];
            var languages = this.data_coordinator.additional;
            if (languages.length > 0) {
                for (var j = 0; j < languages.length; j++) {
                    this.data_coordinator.languagesConsultantContactsConsultants.push({
                        "consultantContactsService": this.data_coordinator.id,
                        "language": languages[j]
                    });
                }
            }
        }
        this.data_coordinator.documentConsultantContactsConsultants = [];
        this.data_coordinator.documentConsultantContactsConsultants = this.temporalDocument;
        if (this.data_coordinator.photo == null) {
            this.data_coordinator.photo = '';
            this.data_coordinator.photoExtension = '';
        }
        console.log("data a guardar: ", this.data_coordinator);
        this._services.service_general_put("Profile/UpdateProfile", this.data_coordinator).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update Data"
                    },
                    width: "350px"
                });
                _this.loader.hideLoader();
                _this.temporalDocument = [];
                _this.ngOnInit();
            }
        }), function (err) {
            console.log("error: ", err);
            _this.loader.hideLoader();
        });
    };
    ProfileCoordinatorComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-coordinator',
            templateUrl: './profile-coordinator.component.html',
            styleUrls: ['./profile-coordinator.component.scss']
        })
    ], ProfileCoordinatorComponent);
    return ProfileCoordinatorComponent;
}());
exports.ProfileCoordinatorComponent = ProfileCoordinatorComponent;
