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
exports.ProfileConsultantComponent = void 0;
var core_1 = require("@angular/core");
var dialog_add_vahicle_consultant_component_1 = require("../dialog/dialog-add-vahicle-consultant/dialog-add-vahicle-consultant.component");
var dialog_emergency_contact_component_1 = require("../dialog/dialog-emergency-contact/dialog-emergency-contact.component");
var dialog_profile_document_component_1 = require("../dialog/dialog-profile-document/dialog-profile-document.component");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var ProfileConsultantComponent = /** @class */ (function () {
    function ProfileConsultantComponent(router, _services, _dialog, _routerParams, _permissions) {
        this.router = router;
        this._services = _services;
        this._dialog = _dialog;
        this._routerParams = _routerParams;
        this._permissions = _permissions;
        this.loader = new loader_1.LoaderComponent();
        this.mostrar = false;
        this.show = false;
        this.data_consultant = {
            additional: [],
            photo: '',
            photoExtension: '',
            personalInformation: {
                compesationBenefits: [],
                documentProfiles: [],
                emergencyContacts: [],
                paymentInformationProfiles: []
            },
            assignedTeamAssignedByNavigations: [],
            assignedTeamAssignedToNavigations: [],
            offices: [],
            operationLeaderConsultantNavigations: [],
            operationLeaderCreatedByNavigations: [],
            countryServices: [],
            documentConsultantContactsConsultants: [],
            languagesConsultantContactsConsultants: [],
            vehicleConsultants: []
        };
        this.temporalDocument = [];
        this.id_covertura = 0;
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
        this.ca_vehicle = [];
        this.ca_privacy = [];
        this.ca_documentType = [];
        this.ca_documentStatus = [];
        this.ca_relation = [];
        this.ca_supplierType = [];
        //*********************************************************************************//
        //CONSULTA CIUDAD//
        this.ca_city = [];
        //CONSULTA CIUDAD//
        this.ca_city_ = [];
        //********************************************************************************//
        //VALIDACIONES//
        this.active_responsablePremierOffice = false;
        this.active_name = false;
        this.active_title = false;
        this.active_email = false;
        this.active_country = false;
        this.active_city = false;
    }
    ProfileConsultantComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.showLoader();
        this.initPageSettings();
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.id_covertura = Number(localStorage.getItem('id_coverture'));
        this.id = this._routerParams.snapshot.params.id;
        console.log(this.id);
        console.log(this.id_covertura);
        if (this.id_covertura != 0) {
            this.data_consultant.id = 0;
            this.catalogos();
            this.paymentMethod();
            this.loader.hideLoader();
        }
        else if (this.id_covertura == 0 && this.id != "New") {
            this._services.service_general_get('Profile/GetProfile/' + Number(this.id)).subscribe((function (data) {
                if (data.success) {
                    console.log(data.result);
                    _this.data_consultant = data.result;
                    _this.getCity();
                    if (_this.data_consultant.personalInformation != null) {
                        _this.getCity_();
                    }
                    _this.loader.hideLoader();
                    if (_this.data_consultant.photo != null && _this.data_consultant.photo != "") {
                        document.getElementById('lead_client_avatar').setAttribute('src', _this._services.url_images + _this.data_consultant.photo);
                    }
                    console.log('foto', _this.data_consultant.photo);
                    var language_additional = void 0;
                    _this.data_consultant.additional = [];
                    if (_this.data_consultant.languagesConsultantContactsConsultants.length > 0) {
                        language_additional = _this.data_consultant.languagesConsultantContactsConsultants;
                        for (var j = 0; j < language_additional.length; j++) {
                            _this.data_consultant.additional.push(language_additional[j].language);
                        }
                    }
                    _this.verificaNodos();
                    if (_this.data_consultant.personalInformation.paymentInformationProfiles.length == 0) {
                        _this.data_consultant.personalInformation.paymentInformationProfiles.push({
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
                        if (_this.data_consultant.personalInformation.paymentInformationProfiles[0].wireTransfer ||
                            _this.data_consultant.personalInformation.paymentInformationProfiles[0].fiscalInvoice) {
                            _this.data_consultant.togglePayment = true;
                            _this.show = true;
                        }
                    }
                }
                _this.catalogos();
            }));
        }
        else {
            this.data_consultant.id = 0;
            this.catalogos();
            this.paymentMethod();
            this.loader.hideLoader();
        }
    };
    ProfileConsultantComponent.prototype.goBack = function () {
        window.history.back();
    };
    ProfileConsultantComponent.prototype.initPageSettings = function () {
        this.user = JSON.parse(localStorage.getItem('userData'));
        var user_rol = [this.__userlog__.role.role];
        this._permissions.loadPermissions(user_rol);
    };
    //VERIFICA NODOS//
    ProfileConsultantComponent.prototype.verificaNodos = function () {
        console.log("ENTRA AVERIFICAR NODOS");
        if (this.data_consultant.personalInformation == null) {
            this.data_consultant.personalInformation = {};
            if (!this.data_consultant.personalInformation.paymentInformationProfiles) {
                this.data_consultant.personalInformation.paymentInformationProfiles = [];
            }
        }
        if (!this.data_consultant.personalInformation.emergencyContacts) {
            this.data_consultant.personalInformation.emergencyContacts = [];
        }
        if (!this.data_consultant.personalInformation.compesationBenefits) {
            this.data_consultant.personalInformation.compesationBenefits = [];
        }
    };
    //FUNCION PARA HACER PAYMENT INFORMATION//
    ProfileConsultantComponent.prototype.paymentMethod = function () {
        this.data_consultant.personalInformation.paymentInformationProfiles.push({
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
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date()
        });
    };
    ProfileConsultantComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, duration, _l, _m, _o, _p;
            var _this = this;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 1:
                        _a.ca_relation = _q.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 2:
                        _b.ca_accountType = _q.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 3:
                        _c.ca_creditCard = _q.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 4:
                        _d.ca_currency = _q.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetOffice')];
                    case 5:
                        _e.ca_office = _q.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTitle')];
                    case 6:
                        _f.ca_title = _q.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 7:
                        _g.ca_country = _q.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 8:
                        _h.ca_languages = _q.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 9:
                        _j.ca_languages = _q.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBenefit')];
                    case 10:
                        _k.ca_benefit = _q.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 11:
                        duration = _q.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplier')];
                    case 12:
                        _l.supplier_catalogue = _q.sent();
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetVehicleType')];
                    case 13:
                        _m.ca_vehicle = _q.sent();
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 14:
                        _o.ca_privacy = _q.sent();
                        //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
                        _p = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentStatus')];
                    case 15:
                        //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
                        _p.ca_documentStatus = _q.sent();
                        this._services.service_general_get('Catalogue/GetSupplierType/3').subscribe((function (data) {
                            if (data.success) {
                                _this.ca_supplierType = data.result;
                            }
                        }));
                        this._services.service_general_get('Catalogue/GetDocumentType/3').subscribe((function (data) {
                            if (data.success) {
                                _this.ca_documentType = data.result;
                            }
                        }));
                        this.ca_duration = duration.filter(function (E) {
                            if (E.recurrence != null) {
                                return true;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileConsultantComponent.prototype.getCity = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetState?country=' + this.data_consultant.country).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
    };
    ProfileConsultantComponent.prototype.getCity_ = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetState?country=' + this.data_consultant.personalInformation.country).subscribe((function (data) {
            if (data.success) {
                _this.ca_city_ = data.result;
            }
        }));
    };
    //*********************************************************************************//
    //FUNCION PARA EDICION DE FOTOGRAFIA//
    ProfileConsultantComponent.prototype.img = function (event) {
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
            _this.data_consultant.photo = encoded;
            _this.data_consultant.photoExtension = ext[1];
            document.getElementById('lead_client_avatar').setAttribute('src', '' + reader.result);
        };
    };
    //*********************************************************************************//
    //FUNCION PARA AGREGAR  NUEVO VEHICULO//
    ProfileConsultantComponent.prototype.addVehicle = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_vahicle_consultant_component_1.DialogAddVahicleConsultantComponent, {
            width: "90%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_consultant.vehicleConsultants.push(result);
            }
        });
    };
    //FUNCION PARA EDICION DE VEHICULO//
    ProfileConsultantComponent.prototype.editVehicle = function (data, i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_add_vahicle_consultant_component_1.DialogAddVahicleConsultantComponent, {
            width: "90%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_consultant.vehicleConsultants[i] = result;
            }
        });
    };
    //*********************************************************************************//
    //AGREGAR NUEVO CONTACTO DE EMERGENCIA//
    ProfileConsultantComponent.prototype.addContact = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_emergency_contact_component_1.DialogEmergencyContactComponent, {
            width: "90%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_consultant.personalInformation.emergencyContacts.push(result);
            }
        });
    };
    //*********************************************************************************//
    //EDITAR CONTACTO DE EMERGENCIA//
    ProfileConsultantComponent.prototype.editContact = function (data, i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_emergency_contact_component_1.DialogEmergencyContactComponent, {
            width: "90%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_consultant.personalInformation.emergencyContacts[i] = result;
            }
        });
    };
    //*********************************************************************************//
    //FUNCION PARA AGREGAR NUEVO BENEFIT//
    ProfileConsultantComponent.prototype.addBenefit = function () {
        this.data_consultant.personalInformation.compesationBenefits.push({
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
    ProfileConsultantComponent.prototype.addDocument = function () {
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
    ProfileConsultantComponent.prototype.deleteDocument = function (i) {
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
    ProfileConsultantComponent.prototype.paymentInformation = function (event) {
        //  console.log(event);
        if (event.checked) {
            this.show = true;
        }
        else {
            this.show = false;
        }
    };
    //NOMBRE DEL TIPO DE VIHICULO//
    ProfileConsultantComponent.prototype.getVehicle = function (id) {
        for (var i = 0; i < this.ca_vehicle.length; i++) {
            if (this.ca_vehicle[i].id == id) {
                return this.ca_vehicle[i].type;
            }
        }
    };
    //FUNCIONA PARA TRAER NOMBRE DE PRIVACIDAD//
    ProfileConsultantComponent.prototype.getNamePrivacy = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
            }
        }
    };
    //FUNCION PARA CONSULTAR NOMBRE DEL DOCUMEN TYPE//
    ProfileConsultantComponent.prototype.getNameDocument = function (id) {
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
    ProfileConsultantComponent.prototype.getDocumentStatus = function (id) {
        for (var i = 0; i < this.ca_documentStatus.length; i++) {
            if (this.ca_documentStatus[i].id == id) {
                return this.ca_documentStatus[i].status;
            }
        }
    };
    ProfileConsultantComponent.prototype.valida_form = function () {
        if (this.data_consultant.responsablePremierOffice == undefined) {
            this.active_responsablePremierOffice = true;
        }
        if (this.data_consultant.name == undefined || this.data_consultant.name.length == 0) {
            this.active_name = true;
        }
        if (this.data_consultant.title == undefined) {
            this.active_title = true;
        }
        if (this.data_consultant.email == undefined || this.data_consultant.email.length == 0) {
            this.active_email = true;
        }
        if (this.data_consultant.country == undefined) {
            this.active_country = true;
        }
        if (this.data_consultant.city == undefined) {
            this.active_city = true;
        }
        if (this.data_consultant.city != undefined && this.data_consultant.country != undefined && this.data_consultant.email != undefined && this.data_consultant.responsablePremierOffice != undefined && this.data_consultant.name != undefined && this.data_consultant.title != undefined) {
            console.log("entra a guardar la informacion");
            this.save();
        }
    };
    //********************************************************************************//
    //FUNCION PARA GUARDAR LA INFORMACION//
    ProfileConsultantComponent.prototype.save = function () {
        if (this.data_consultant.id == 0) {
            this.insert_data();
        }
        else {
            this.update_data();
        }
    };
    //********************************************************************************//
    //FUNCION PARA INSERTAR LA INFORMACION//
    ProfileConsultantComponent.prototype.insert_data = function () {
        var _this = this;
        this.loader.showLoader();
        if (this.data_consultant.additional.length > 0) {
            this.data_consultant.languagesConsultantContactsConsultants = [];
            var languages = this.data_consultant.additional;
            if (languages.length > 0) {
                for (var j = 0; j < languages.length; j++) {
                    this.data_consultant.languagesConsultantContactsConsultants.push({
                        "consultantContactsService": this.data_consultant.id,
                        "language": languages[j]
                    });
                }
            }
        }
        this.data_consultant.areasCoverage = this.id_covertura;
        if (this.id == 'New') {
            this.data_consultant.areasCoverage = null;
        }
        this.data_consultant.documentConsultantContactsConsultants = [];
        this.data_consultant.documentConsultantContactsConsultants = this.temporalDocument;
        console.log("data a guardar: ", this.data_consultant);
        console.log("data a guardar: ", JSON.stringify(this.data_consultant));
        this.data_consultant.createdBy = this.user.id;
        this.data_consultant.createdDate = new Date();
        this._services.service_general_post_with_url("Profile/AddProfile", this.data_consultant).subscribe((function (data) {
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
                localStorage.removeItem('id_coverture');
                _this.temporalDocument = [];
                _this.router.navigateByUrl('/supplierPartners');
                //this.ngOnInit();
            }
        }), function (err) {
            console.log("error: ", err);
        });
    };
    //********************************************************************************//
    //FUNCION PARA EDITAR LA INFORMACION//
    ProfileConsultantComponent.prototype.update_data = function () {
        var _this = this;
        this.data_consultant.user = null;
        this.loader.showLoader();
        if (this.data_consultant.additional.length > 0) {
            //if(this.data_consultant.length > 0){
            this.data_consultant.languagesConsultantContactsConsultants = [];
            // let languages = this.data_consultant.additional;
            var languages = this.data_consultant.additional;
            if (languages.length > 0) {
                for (var j = 0; j < languages.length; j++) {
                    this.data_consultant.languagesConsultantContactsConsultants.push({
                        "consultantContactsService": this.data_consultant.id,
                        "language": languages[j]
                    });
                }
            }
        }
        this.data_consultant.documentConsultantContactsConsultants = [];
        this.data_consultant.documentConsultantContactsConsultants = this.temporalDocument;
        this.data_consultant.updatedBy = this.user.id;
        this.data_consultant.updatedDate = new Date();
        if (this.data_consultant.photo == null) {
            this.data_consultant.photo = '';
            this.data_consultant.photoExtension = '';
        }
        console.log("data a guardar: ", this.data_consultant);
        console.log("data a guardar: ", JSON.stringify(this.data_consultant));
        this._services.service_general_put("Profile/UpdateProfile", this.data_consultant).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update Data"
                    },
                    width: "350px"
                });
                localStorage.removeItem('id_coverture');
                _this.loader.hideLoader();
                _this.temporalDocument = [];
                _this.ngOnInit();
            }
        }), function (err) {
            console.log("error: ", err);
        });
    };
    ProfileConsultantComponent.prototype.ngOnDestroy = function () {
        console.log("remove id");
        localStorage.removeItem('id_coverture');
    };
    ProfileConsultantComponent.prototype.getRelation = function (id) {
        for (var i = 0; i < this.ca_relation.length; i++) {
            if (this.ca_relation[i].id == id) {
                return this.ca_relation[i].relationship;
            }
        }
    };
    ProfileConsultantComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-consultant',
            templateUrl: './profile-consultant.component.html',
            styleUrls: ['./profile-consultant.component.scss']
        })
    ], ProfileConsultantComponent);
    return ProfileConsultantComponent;
}());
exports.ProfileConsultantComponent = ProfileConsultantComponent;
