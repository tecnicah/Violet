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
exports.SupplierServicesComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_new_contact_component_1 = require("../dialog/dialog-new-contact/dialog-new-contact.component");
var dialog_consultant_component_1 = require("../dialog/dialog-consultant/dialog-consultant.component");
var dialog_wire_transfer_component_1 = require("../dialog/dialog-wire-transfer/dialog-wire-transfer.component");
var dialog_document_profile_supplier_component_1 = require("../dialog/dialog-document-profile-supplier/dialog-document-profile-supplier.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var dialog_campus_component_1 = require("../dialog/dialog-campus/dialog-campus.component");
var SupplierServicesComponent = /** @class */ (function () {
    function SupplierServicesComponent(router, _services, _dialog, _routerParams) {
        this.router = router;
        this._services = _services;
        this._dialog = _dialog;
        this._routerParams = _routerParams;
        this.loader = new loader_1.LoaderComponent();
        this.toppings = new forms_1.FormControl();
        this.multipleCity = new forms_1.FormControl();
        this.fleetSize = [];
        this.ca_methodPayment = [];
        this.ca_creditCard = [];
        this.ca_serviceLine = [];
        this.ca_status = [];
        this.ca_country = [];
        this.ca_city = [];
        this.ca_supplierType = [];
        this.ca_areacoverage = [];
        this.ca_vehiculo = [];
        this.ca_documentType = [];
        this.ca_privacy = [];
        this.ca_accountType = [];
        this.ca_typeSupplier = [];
        this.ca_contactType = [];
        this.ca_language = [];
        this.data = {
            "id": 0,
            "photo": ''
        };
        this.minDate = new Date();
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        //*************************************************************//
        this.ca_taxes = [];
        this.ca_term = [];
        this.ca_currency = [];
        //*************************************************************//
        this.files = [];
        //*************************************************************//
        //VALIDACIONES//
        this.active_status = false;
        this.active_serviceLine = false;
        this.active_supplierType = false;
        this.active_comercialName = false;
        this.active_legalName = false;
        this.active_since = false;
        this.active_type = false;
    }
    SupplierServicesComponent.prototype.consultaPermisos = function () {
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
    SupplierServicesComponent.prototype.ngOnInit = function () {
        this.consultaPermisos();
        this.date = new Date();
        for (var i = 1; i <= 10; i++) {
            this.fleetSize.push(i);
        }
        this.user = JSON.parse(localStorage.getItem('userData'));
        /*
        this._services.service_general_get('Catalogue/GetSupplierTypeCatalogue?id=5&id=10&id=6&id=7&id=8&id=13&id=11&id=12').subscribe((data => {
          if (data.success) {
            this.ca_supplierType = data.result;
          }
        }));
        */
        this.catalogos();
        this.verificaNodos();
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.verificaNodos = function () {
        if (!this.data.supplierPartnerDetails) {
            this.data.supplierPartnerDetails = [{
                    "id": 0,
                    "supplierPartnerProfileService": 0,
                    "fleetSize": null,
                    "numberDirvers": null,
                    "armouredVehicles": false,
                    "typeVehicles": null,
                    "carSeatRental": null,
                    "createdBy": this.user.id,
                    "createdDate": new Date(),
                    "updatedBy": this.user.id,
                    "updatedDate": new Date(),
                    "typeVehiclesSupplierPartnerDetails": []
                }];
        }
        if (!this.data.areasCoverageServices) {
            this.data.areasCoverageServices = [];
        }
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.consultaInformacionServicio = function (id_serivice) {
        var _this = this;
        console.log(typeof id_serivice);
        console.log(id_serivice);
        if (id_serivice.trim() == '') {
            return true;
        }
        this.loader.showLoader();
        this._services.service_general_get('SupplierPartnerProfile/GetService?key=' + id_serivice).subscribe((function (data) {
            if (data.success) {
                _this.data = data.result;
                _this.data.supplierPartnerDetails[0].vehiculo = [];
                if (_this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails.length > 0) {
                    for (var i = 0; i < _this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails.length; i++) {
                        _this.data.supplierPartnerDetails[0].vehiculo.push(_this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails[i].typeVehicles);
                    }
                }
                if (_this.data.areasCoverageServices.length > 0) {
                    var city_additional = void 0;
                    for (var i = 0; i < _this.data.areasCoverageServices.length; i++) {
                        _this.data.areasCoverageServices[i].additional = [];
                        city_additional = _this.data.areasCoverageServices[i].cityAreasCoverageServices;
                        for (var j = 0; j < city_additional.length; j++) {
                            _this.data.areasCoverageServices[i].additional.push(city_additional[j].city);
                        }
                    }
                }
                for (var i = 0; i < _this.data.areasCoverageServices.length; i++) {
                    var element = _this.data.areasCoverageServices[i].country;
                    _this.getCity(element, i);
                }
                console.log("esta es la consulta del servicio: ", _this.data);
                _this.ca_creditCard.forEach(function (E) {
                    E.checked = false;
                });
                for (var i = 0; i < _this.ca_creditCard.length; i++) {
                    for (var j = 0; j < _this.data.areasCoverageServices.length; j++) {
                        var payment = _this.data.areasCoverageServices[j].paymentInformationServices;
                        for (var k = 0; k < payment.length; k++) {
                            var credit_card = payment[k].creditCardPaymentInformationServices;
                            for (var m = 0; m < credit_card.length; m++) {
                                if (_this.ca_creditCard[i].id == credit_card[m].creditCard) {
                                    _this.ca_creditCard[i].checked = true;
                                }
                            }
                        }
                    }
                }
                _this.loader.hideLoader();
            }
        }));
    };
    SupplierServicesComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, id_serivice;
            var _this = this;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierType')];
                    case 1:
                        _a.ca_typeSupplier = _s.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 2:
                        _b.ca_creditCard = _s.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentMethod')];
                    case 3:
                        _c.ca_methodPayment = _s.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 4:
                        _d.ca_serviceLine = _s.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplierPartnerProfileStatus')];
                    case 5:
                        _e.ca_status = _s.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 6:
                        _f.ca_country = _s.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 7:
                        _g.ca_accountType = _s.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetAreaCoverageType')];
                    case 8:
                        _h.ca_areacoverage = _s.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetVehicleType')];
                    case 9:
                        _j.ca_vehiculo = _s.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType')];
                    case 10:
                        _k.ca_documentType = _s.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 11:
                        _l.ca_privacy = _s.sent();
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetContactType')];
                    case 12:
                        _m.ca_contactType = _s.sent();
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 13:
                        _o.ca_language = _s.sent();
                        //this.ca_supplierType = await this._services.getCatalogueFrom('GetSupplierType');
                        _p = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTaxePercentage')];
                    case 14:
                        //this.ca_supplierType = await this._services.getCatalogueFrom('GetSupplierType');
                        _p.ca_taxes = _s.sent();
                        _q = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditTerm')];
                    case 15:
                        _q.ca_term = _s.sent();
                        _r = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 16:
                        _r.ca_currency = _s.sent();
                        this._services.service_general_get('Catalogue/GetSupplierType/2').subscribe((function (data) {
                            if (data.success) {
                                _this.ca_supplierType = data.result;
                            }
                        }));
                        id_serivice = this._routerParams.snapshot.params.id;
                        if (id_serivice != 'nuevo') {
                            this.consultaInformacionServicio(id_serivice);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.newCampus = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_campus_component_1.DialogCampusComponent, {
            width: "90%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                console.log(result);
                result.createdBy = _this.user.id;
                result.createdDate = new Date();
                result.updatedBy = _this.user.id;
                result.updatedDate = new Date();
                result.id = 0;
                result.areaCoverageId = _this.data.areasCoverageServices[i].id;
                _this.data.areasCoverageServices[i].campuses.push(result);
            }
        });
    };
    //************************************************************//
    SupplierServicesComponent.prototype.editCampus = function (i, datos, k) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_campus_component_1.DialogCampusComponent, {
            width: "90%",
            data: datos
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                console.log(result);
                result.createdBy = _this.user.id;
                result.createdDate = new Date();
                result.updatedBy = _this.user.id;
                result.updatedDate = new Date();
                _this.data.areasCoverageServices[i].campuses[k] = result;
            }
        });
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.newContact = function (type, i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_new_contact_component_1.DialogNewContactComponent, {
            width: "90%",
            data: {
                country: this.data.areasCoverageServices[i].country
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                console.log(result);
                result.createdBy = _this.user.id;
                result.createdDate = new Date();
                result.updatedBy = _this.user.id;
                result.updatedDate = new Date();
                result.id = 0;
                result.areasCoverage = _this.data.areasCoverageServices[i].id;
                _this.data.areasCoverageServices[i].administrativeContactsServices.push(result);
            }
        });
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.newConsultant = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_consultant_component_1.DialogConsultantComponent, {
            width: "90%",
            data: {
                country: this.data.areasCoverageServices[i].country
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                console.log(result);
                result.createdBy = _this.user.id;
                result.createdDate = new Date();
                result.updatedBy = _this.user.id;
                result.updatedDate = new Date();
                result.id = 0;
                result.areasCoverage = _this.data.areasCoverageServices[i].id;
                _this.data.areasCoverageServices[i].consultantContactsServices.push(result);
            }
        });
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.addWireTransfer = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_wire_transfer_component_1.DialogWireTransferComponent, {
            width: "90%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.data.areasCoverageServices[i].paymentInformationServices[0].wireTransferServices.push(result);
            console.log(_this.data);
            debugger;
        });
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.getCity = function (data, i) {
        var _this = this;
        console.log("consulta ciudad: ", data);
        this._services.service_general_get('Catalogue/GetState?country=' + data).subscribe((function (data) {
            if (data.success) {
                _this.ca_city[i] = data.result;
            }
        }));
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.getCityName = function (city, i) {
        for (var j = 0; j < this.ca_city[i].length; j++) {
            var element = this.ca_city[i][j];
            if (element.id == city) {
                return element.city;
            }
        }
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.addAreaCoverage = function () {
        this.data.areasCoverageServices.push({
            "id": 0,
            "supplierPartnerProfileService": 0,
            "type": null,
            "country": null,
            "primaryCity": null,
            "currentAddress": null,
            "zipCode": null,
            "campuses": [],
            "administrativeContactsServices": [],
            "consultantContactsServices": [],
            "paymentInformationServices": [{
                    "id": 0,
                    "areasCoverageService": 0,
                    "fiscalInvoice": null,
                    "creditCard": null,
                    "checks": null,
                    "payToOrderOf": null,
                    "cash": null,
                    "comment": null,
                    "generalComment": null,
                    "createdBy": this.user.id,
                    "createdDate": new Date(),
                    "updatedBy": this.user.id,
                    "updatedDate": new Date,
                    "creditCardPaymentInformationServices": [],
                    "wireTransferServices": []
                }],
            "documentAreasCoverageServices": [],
            "cityAreasCoverageServices": [],
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date()
        });
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.pushData = function (data, i, event, j) {
        if (event.checked) {
            this.data.areasCoverageServices[i].paymentInformationServices[0].creditCardPaymentInformationServices.push({
                "paymentInformationService": 0,
                "creditCard": data.id
            });
        }
        else {
            this.data.areasCoverageServices[i].paymentInformationServices[0].creditCardPaymentInformationServices.splice(j, 1);
        }
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.addNewDocument = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_document_profile_supplier_component_1.DialogDocumentProfileSupplierComponent, {
            width: "90%",
            data: {
                city: this.data.areasCoverageServices[i].primaryCity
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.areaCoverage = 0;
                _this.data.areasCoverageServices[i].documentAreasCoverageServices.push(result);
                console.log(_this.data);
            }
        });
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.editPhoto = function () {
        document.getElementById('photoSup').click();
    };
    SupplierServicesComponent.prototype.dropped = function (files) {
        var _this = this;
        this.files = files;
        var _loop_1 = function (droppedFile) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry_1 = droppedFile.fileEntry;
                var reader_1 = new FileReader();
                fileEntry_1.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, _this.files);
                    fileEntry_1.file(function (file) {
                        reader_1.readAsDataURL(file);
                        reader_1.onload = function () {
                            var imageUrl = reader_1.result;
                            var encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                            if ((encoded.length % 4) > 0) {
                                encoded += '='.repeat(4 - (encoded.length % 4));
                            }
                            var ext = file.type.split("/");
                            _this.data.photo = encoded;
                            _this.data.photoExtension = ext[1];
                            _this.data.b64 = imageUrl;
                        };
                    });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    //*************************************************************//
    SupplierServicesComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    //************************************************************//
    SupplierServicesComponent.prototype.editWireTransfer = function (i, wire, k) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_wire_transfer_component_1.DialogWireTransferComponent, {
            width: "90%",
            data: wire
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                _this.data.areasCoverageServices[i].paymentInformationServices[0].wireTransferServices[k] = result;
                console.log("Edicion de archivo: ", _this.data);
            }
        });
    };
    //************************************************************//
    SupplierServicesComponent.prototype.editAdmin = function (i, datos, k) {
        var _this = this;
        datos.country = this.data.areasCoverageServices[i].country;
        var dialogRef = this._dialog.open(dialog_new_contact_component_1.DialogNewContactComponent, {
            width: "90%",
            data: datos
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                console.log(result);
                result.createdBy = _this.user.id;
                result.createdDate = new Date();
                result.updatedBy = _this.user.id;
                result.updatedDate = new Date();
                _this.data.areasCoverageServices[i].administrativeContactsServices[k] = result;
            }
        });
    };
    //************************************************************//
    SupplierServicesComponent.prototype.editConsultant = function (i, datos, k) {
        var _this = this;
        datos.country = this.data.areasCoverageServices[i].country;
        var dialogRef = this._dialog.open(dialog_consultant_component_1.DialogConsultantComponent, {
            width: "90%",
            data: datos
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                console.log(result);
                result.createdBy = _this.user.id;
                result.createdDate = new Date();
                result.updatedBy = _this.user.id;
                result.updatedDate = new Date();
                _this.data.areasCoverageServices[i].consultantContactsServices[k] = result;
            }
        });
    };
    //************************************************************//
    SupplierServicesComponent.prototype.nameDocument = function (id) {
        for (var i = 0; i < this.ca_documentType.length; i++) {
            if (this.ca_documentType[i].id == id) {
                return this.ca_documentType[i].documentType;
            }
        }
    };
    //************************************************************//
    SupplierServicesComponent.prototype.namePrivacy = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
            }
        }
    };
    //************************************************************//
    SupplierServicesComponent.prototype.nameAccount = function (id) {
        for (var i = 0; i < this.ca_accountType.length; i++) {
            if (this.ca_accountType[i].id == id) {
                return this.ca_accountType[i].accountType;
            }
        }
    };
    //************************************************************//
    SupplierServicesComponent.prototype.nameSupplier = function (id) {
        for (var i = 0; i < this.ca_typeSupplier.length; i++) {
            if (this.ca_typeSupplier[i].id == id) {
                return this.ca_typeSupplier[i].supplierType;
            }
        }
    };
    //************************************************************//
    SupplierServicesComponent.prototype.nameContact = function (id) {
        for (var i = 0; i < this.ca_contactType.length; i++) {
            if (this.ca_contactType[i].id == id) {
                return this.ca_contactType[i].type;
            }
        }
    };
    //************************************************************//
    SupplierServicesComponent.prototype.nameLanguage = function (data) {
        //console.log("lenguajes: ", data);
        var lenguajes = '';
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < this.ca_language.length; j++) {
                if (data[i].language == this.ca_language[j].id) {
                    lenguajes = lenguajes.concat(this.ca_language[j].name + ' ');
                }
            }
        }
        return lenguajes;
    };
    SupplierServicesComponent.prototype.valida_form = function () {
        if (this.data.status == undefined) {
            this.active_status = true;
        }
        if (this.data.serviceLine == undefined) {
            this.active_serviceLine = true;
        }
        if (this.data.supplierType == undefined) {
            this.active_supplierType = true;
        }
        if (this.data.comercialName == undefined || this.data.comercialName.length == 0) {
            this.active_comercialName = true;
        }
        if (this.data.legalName == undefined || this.data.legalName.length == 0) {
            this.active_legalName = true;
        }
        if (this.data.supplierSince == undefined || this.data.supplierSince.length == 0) {
            this.active_since = true;
        }
        if (this.data.areasCoverageServices.length == 0) {
            this.addAreaCoverage();
        }
        for (var index = 0; index < this.data.areasCoverageServices.length; index++) {
            if (this.data.areasCoverageServices[index].type == undefined) {
                this.data.areasCoverageServices[index].typeValid = true;
            }
            if (this.data.areasCoverageServices[index].country == undefined) {
                this.data.areasCoverageServices[index].countryValid = true;
            }
            if (this.data.areasCoverageServices[index].primaryCity == undefined) {
                this.data.areasCoverageServices[index].cityValid = true;
            }
            if (this.data.areasCoverageServices[index].additional == undefined) {
                this.data.areasCoverageServices[index].additionalValid = true;
            }
        }
        if (this.data.status != undefined && this.data.serviceLine != undefined && this.data.supplierType != undefined && this.data.comercialName != undefined && this.data.legalName != undefined && this.data.supplierSince != undefined) {
            var contador = 0;
            for (var index = 0; index < this.data.areasCoverageServices.length; index++) {
                if (this.data.areasCoverageServices[index].type != undefined) {
                    this.data.areasCoverageServices[index].typeValid = false;
                }
                else {
                    contador++;
                }
                if (this.data.areasCoverageServices[index].country != undefined) {
                    this.data.areasCoverageServices[index].countryValid = false;
                }
                else {
                    contador++;
                }
                if (this.data.areasCoverageServices[index].primaryCity != undefined) {
                    this.data.areasCoverageServices[index].cityValid = false;
                }
                else {
                    contador++;
                }
                if (this.data.areasCoverageServices[index].additional != undefined) {
                    this.data.areasCoverageServices[index].additionalValid = false;
                }
                else {
                    contador++;
                }
            }
            if (contador == 0) {
                console.log("entra a guardar la informacion");
                this.save();
            }
        }
        console.log(this.data);
    };
    //************************************************************//
    SupplierServicesComponent.prototype.save = function () {
        var _this = this;
        this.loader.showLoader();
        this.data.createdBy = this.user.id;
        this.data.createdDate = new Date();
        this.data.updatedBy = this.user.id;
        this.data.updatedDate = new Date();
        console.log("DATA: ", this.data);
        console.log(this.toppings);
        if (this.data.supplierPartnerDetails[0].vehiculo != undefined && this.data.supplierPartnerDetails[0].vehiculo.length > 0) {
            this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails = [];
            for (var i = 0; i < this.data.supplierPartnerDetails[0].vehiculo.length; i++) {
                this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails.push({
                    "supplairPartnerDetail": this.data.supplierPartnerDetails[0].id,
                    "typeVehicles": this.data.supplierPartnerDetails[0].vehiculo[i]
                });
            }
        }
        if (this.data.areasCoverageServices.length > 0) {
            for (var i = 0; i < this.data.areasCoverageServices.length; i++) {
                if (this.data.areasCoverageServices[i].additional) {
                    var additionalCity = this.data.areasCoverageServices[i].additional;
                    if (additionalCity.length > 0) {
                        for (var j = 0; j < additionalCity.length; j++) {
                            this.data.areasCoverageServices[i].cityAreasCoverageServices.push({
                                "areasCoverageService": this.data.areasCoverageServices[i].id,
                                "city": additionalCity[j]
                            });
                        }
                    }
                }
            }
        }
        console.log("DATA: ", this.data);
        console.log(JSON.stringify(this.data));
        if (this.data.id == 0) {
            console.log("ENTRA A POST");
            this._services.service_general_post_with_url('SupplierPartnerProfile/PostService', this.data).subscribe((function (data) {
                console.log("save supplier: ", data);
                if (data.success) {
                    console.log(data);
                    var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Save Data"
                        },
                        width: "350px"
                    });
                    _this.loader.hideLoader();
                    _this.router.navigateByUrl('/supplierPartners');
                }
            }));
        }
        else {
            this.verificab64();
        }
    };
    //************************************************************//
    SupplierServicesComponent.prototype.verificab64 = function () {
        for (var i = 0; i < this.data.areasCoverageServices.length; i++) {
            var documentos = this.data.areasCoverageServices[i].administrativeContactsServices;
            for (var j = 0; j < documentos.length; j++) {
                var doc = documentos[j].documentAdministrativeContactsServices;
                documentos[j].documentAdministrativeContactsServices = [];
                for (var k = 0; k < doc.length; k++) {
                    if (doc[k].id == 0) {
                        this.data.areasCoverageServices[i].administrativeContactsServices[j].documentAdministrativeContactsServices.push(doc[k]);
                    }
                }
            }
        }
        for (var i = 0; i < this.data.areasCoverageServices.length; i++) {
            var documentos = this.data.areasCoverageServices[i].consultantContactsServices;
            for (var j = 0; j < documentos.length; j++) {
                var doc = documentos[j].documentConsultantContactsServices;
                documentos[j].documentConsultantContactsServices = [];
                for (var k = 0; k < doc.length; k++) {
                    if (doc[k].id == 0) {
                        this.data.areasCoverageServices[i].consultantContactsServices[j].documentConsultantContactsServices.push(doc[k]);
                    }
                }
            }
        }
        for (var i = 0; i < this.data.areasCoverageServices.length; i++) {
            var documentos = this.data.areasCoverageServices[i].consultantContactsServices;
            for (var j = 0; j < documentos.length; j++) {
                var docVehicle = documentos[j].vehicleServices;
                for (var k = 0; k < docVehicle.length; k++) {
                    var doc = docVehicle[k].documentVehicleServices;
                    docVehicle[k].documentVehicleServices = [];
                    for (var r = 0; r < doc.length; r++) {
                        if (doc[r].id == 0) {
                            this.data.areasCoverageServices[i].consultantContactsServices[j].vehicleServices[k].documentVehicleServices.push(doc[r]);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < this.data.areasCoverageServices.length; i++) {
            var documentos = this.data.areasCoverageServices[i].consultantContactsServices;
            for (var j = 0; j < documentos.length; j++) {
                var docVehicle = documentos[j].vehicleServices;
                for (var k = 0; k < docVehicle.length; k++) {
                    var doc = docVehicle[k].photosVehicleServices;
                    docVehicle[k].photosVehicleServices = [];
                    for (var r = 0; r < doc.length; r++) {
                        if (doc[r].id == 0) {
                            this.data.areasCoverageServices[i].consultantContactsServices[j].vehicleServices[k].photosVehicleServices.push(doc[r]);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < this.data.areasCoverageServices.length; i++) {
            var documentos = this.data.areasCoverageServices[i].documentAreasCoverageServices;
            this.data.areasCoverageServices[i].documentAreasCoverageServices = [];
            for (var j = 0; j < documentos.length; j++) {
                if (documentos[j].id == 0) {
                    this.data.areasCoverageServices[i].documentAreasCoverageServices.push(documentos[j]);
                }
            }
        }
        this.updateDate();
    };
    //************************************************************//
    SupplierServicesComponent.prototype.updateDate = function () {
        var _this = this;
        this._services.service_general_put('SupplierPartnerProfile/PutService', this.data).subscribe((function (data) {
            console.log("save supplier: ", data);
            if (data.success) {
                console.log(data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Updated Data"
                    },
                    width: "350px"
                });
                _this.loader.hideLoader();
                _this.router.navigateByUrl('/supplierPartners');
            }
        }));
    };
    //************************************************************//
    SupplierServicesComponent.prototype.deleteDocument = function (i, a) {
        var _this = this;
        console.log("Entra a eliminar documento: ", i, a);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete the document"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data.areasCoverageServices[i].documentAreasCoverageServices.splice(a, 1);
            }
        });
    };
    SupplierServicesComponent.prototype.goBack = function () {
        window.history.back();
    };
    SupplierServicesComponent = __decorate([
        core_1.Component({
            selector: 'app-supplier-services',
            templateUrl: './supplier-services.component.html',
            styleUrls: ['./supplier-services.component.css']
        })
    ], SupplierServicesComponent);
    return SupplierServicesComponent;
}());
exports.SupplierServicesComponent = SupplierServicesComponent;
