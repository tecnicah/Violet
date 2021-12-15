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
exports.LegalRenewalComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var general_message_component_1 = require("../general-message/general-message.component");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_home_details_component_1 = require("../dialog-home-details/dialog-home-details.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var LegalRenewalComponent = /** @class */ (function () {
    function LegalRenewalComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.calculo = {};
        this.settlingin = { documentLeaseRenewals: [] };
        this.user = {};
        this.cestatus = [];
        this.temporalDocument = [];
        this.table_payments = [];
        this.caDocumentType = [];
        this.caCountry = [];
        this.cr = "Reply";
        this.dataSourcePayment = [];
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.mostrarTarjeta = {
            contractDetails: false,
            paymenType: false,
            costSaving: false,
            renewalDetails: false,
            departureDetails: false,
            landLord: false,
            repairs: false,
            move_in: false,
            move_out: false
        };
        //VARIABLES PARA LEASER SUMMARY//
        this.data_contracts = {};
        this.paymentHousings = [];
        this.costSavingHomes = [];
        this.data_renewal = {};
        this.data_departure = {};
        this.data_land = {
            creditCardLandLordDetails: []
        };
        //VARIABLES PARA INSECTIONS & REPAIRS//
        this.data_move_in = {
            propertyReportSections: [],
            keyInventories: [],
            attendees: []
        };
        this.data_move_out = {
            propertyReportSections: [],
            keyInventories: [],
            attendees: []
        };
        this.__loader__ = new loader_1.LoaderComponent();
        this.ca_creditCard = [];
        this.ca_property = [];
        this.ca_currency = [];
        this.ca_recurrence = [];
        this.ca_payment_Type = [];
        this.ca_responsible = [];
        this.ca_accountType = [];
        this.ca_propertySection = [];
        this.ca_statuspropertySection = [];
        this.ca_repair = [];
        this.ca_relation = [];
        this.SupplierCompany = [];
        this.ca_privacy = [];
        //***************************************************************//
        //METODOS PARA CARGA DE DOCUMENTOS//
        this.files = [];
        //GET DATA DEPENDENT//
        this.data_dependent = { name: '' };
        this.data_inspection = [];
        this.data_repairs = [];
        this.data_home = [];
        //**************************************************************//
        //DEPENDENT//
        this.ca_dependent = [];
    }
    LegalRenewalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log('data user', this.user);
        console.log("data que recibe modal: ", this.data);
        this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((function (data) {
            if (data.success) {
                _this.caDocumentType = data.result;
                console.log(_this.caDocumentType);
                _this.__loader__.hideLoader();
            }
        }));
        this.catalogos();
    };
    LegalRenewalComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, duration, _j, _k, _l, _m;
            var _this = this;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCountry = _o.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRepairType')];
                    case 2:
                        _b.ca_repair = _o.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 3:
                        _c.ca_relation = _o.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusPropertySection')];
                    case 4:
                        _d.ca_statuspropertySection = _o.sent();
                        //this.cestatus = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=22").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.cestatus = data.result;
                            }
                        }));
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 5:
                        _e.ca_privacy = _o.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 6:
                        _f.ca_currency = _o.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 7:
                        _g.ca_creditCard = _o.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertyTypeHousing')];
                    case 8:
                        _h.ca_property = _o.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 9:
                        duration = _o.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentType')];
                    case 10:
                        _j.ca_payment_Type = _o.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetResponsablePayment')];
                    case 11:
                        _k.ca_responsible = _o.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 12:
                        _l.ca_accountType = _o.sent();
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertySection')];
                    case 13:
                        _m.ca_propertySection = _o.sent();
                        this.ca_recurrence = duration.filter(function (E) {
                            if (E.recurrence != null) {
                                return true;
                            }
                        });
                        this._services.service_general_get('RelocationServices/GetLeaseRenewalById?id=' + this.data.data.service[0].id).subscribe((function (data) {
                            if (data.success) {
                                _this.settlingin = data.result;
                                if (_this.settlingin.commentLeaseRenewals.length == 0) {
                                    _this.addReply();
                                }
                                console.log(_this.settlingin);
                                _this.__loader__.hideLoader();
                                _this.get_payment();
                                _this.getDataDependent();
                                _this.getDataHousing();
                            }
                        }));
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(function (r) {
                            if (r.success) {
                                for (var i = 0; i < r.result.length; i++) {
                                    var element = r.result[i];
                                    _this.SupplierCompany.push(element);
                                }
                            }
                        });
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(function (r) {
                            if (r.success) {
                                for (var i = 0; i < r.result.length; i++) {
                                    var element = r.result[i];
                                    _this.SupplierCompany.push(element);
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //***************************************************************//
    //CONSULTA DE REQUEST PAYMENT//
    LegalRenewalComponent.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.settlingin.workOrderServices).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.calculo = data.result.value;
                _this.calculo.total = _this.calculo.ammountSubTotal + _this.calculo.managementFeeSubTotal + _this.calculo.wireFeeSubTotal + _this.calculo.advanceFeeSubTotal;
                _this.table_payments = data.result.value.payments;
                console.log(_this.table_payments);
            }
            console.log(_this.table_payments);
        }));
    };
    //METODO PARA AGREGAR NUEVO PAYMENT//
    LegalRenewalComponent.prototype.addPayment = function () {
        var _this = this;
        var data = {
            serviceRecord: this.data.data.serviceRecordId,
            sr: this.data.data.serviceRecordId,
            workOrderServices: this.settlingin.workOrderServices,
            workOrder: this.data.data.workOrderId,
            service: this.data.data.id_server,
            id: 0,
            type: 2,
            supplierType: 3
        };
        var dialogRef = this._dialog.open(dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_payment();
        });
    };
    //METODO PARA EDICION DE PAYMENT//
    LegalRenewalComponent.prototype.editPayment = function (data) {
        var _this = this;
        data.type = 2;
        data.supplierType = 3;
        data.id = data.requestPaymentId;
        data.serviceRecord = this.data.data.serviceRecordId;
        data.sr = this.data.data.serviceRecordId;
        data.service = this.data.data.id_server;
        var dialogRef = this._dialog.open(dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_payment();
        });
    };
    //METODO PARA ELIMINAR PAYMENT//
    LegalRenewalComponent.prototype.deletePaymentConcept = function (data) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_deletepaymentconcept_component_1.DialogDeletepaymentconceptComponent, {
            width: "20%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this._services.service_general_delete("RequestPayment/DeletePaymentConcept/" + data.id + "/" + result.type).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: data.message
                            },
                            width: "350px"
                        });
                        _this.get_payment();
                    }
                }));
            }
        });
    };
    //***************************************************************//
    //FUNCION PARA AGREGAR COMENTARIOS//
    LegalRenewalComponent.prototype.addReply = function () {
        console.log(this.user);
        this.settlingin.commentLeaseRenewals.push({
            "id": 0,
            "leaseRenewal": this.settlingin.id,
            "comment": null,
            "userId": this.user.id,
            "creationBy": this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.settlingin.commentLeaseRenewals.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    LegalRenewalComponent.prototype.dropped = function (files) {
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
                            var dialogRef = _this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
                                data: {
                                    sr: _this.data.sr
                                },
                                width: "95%"
                            });
                            dialogRef.afterClosed().subscribe(function (result) {
                                if (result.success) {
                                    _this.temporalDocument.push({
                                        "id": 0,
                                        "fileRequest": encoded,
                                        "fileExtension": ext[1],
                                        "documentType": result.documentType,
                                        "relationship": result.relationship,
                                        "issueDate": result.issueDate,
                                        "expirationDate": result.expirationDate,
                                        "issuingAuthority": result.issuingAuthority,
                                        "countryOrigin": result.countryOrigin,
                                        "comment": result.comment,
                                        "leaseRenewal": _this.settlingin.id,
                                        "createdBy": _this.user.id,
                                        "createdDate": new Date()
                                    });
                                }
                            });
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
    LegalRenewalComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    LegalRenewalComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    //METODO PARA ELIMINAR DOCUMENTOS DE BASE DE DATOS//
    LegalRenewalComponent.prototype.DeleteOnline = function (id) {
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
                _this._services.service_general_delete("RelocationServices/DeleteDocumentLeaseRenewal?id=" + id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: data.result
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                }));
            }
        });
    };
    //METODO PARA ELIMINAR DOCUMENTOS EN VARIABLE TEMPORAR//
    LegalRenewalComponent.prototype.DeleteOnlineof = function (i) {
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
    //METODO PARA AGREGAR DOCUMENTOS//
    LegalRenewalComponent.prototype.addDocument = function () {
        var _this = this;
        this.data.typeDocument = 1;
        this.data.location = this.data.data.location;
        var dialogRef = this._dialog.open(dialog_documents_relocation_component_1.DialogDocumentsRelocationComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.leaseRenewal = _this.settlingin.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    //METODO PARA OBTENER EL NOMBRE DEL DOCUMENTO//
    LegalRenewalComponent.prototype.documentType = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    //METODO PARA OBTENER EL NOMBRE DEL PAIS//
    LegalRenewalComponent.prototype.countryOrigin = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].name;
            }
        }
    };
    LegalRenewalComponent.prototype.getDataDependent = function () {
        var _this = this;
        this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.settlingin.workOrderServices).subscribe(function (r) {
            if (r.success) {
                _this.data_dependent = r.result.value;
                console.log(_this.data_dependent);
            }
        });
    };
    //***************************************************************//
    //METODOS PARA REMINDER//
    LegalRenewalComponent.prototype.addRemminder = function () {
        if (this.settlingin.reminderLeaseRenewals) { }
        else {
            this.settlingin.reminderLeaseRenewals = [];
        }
        this.settlingin.reminderLeaseRenewals.push({
            "id": 0,
            "leaseRenewal": this.settlingin.id,
            "reminderDate": "",
            "reminderComments": "",
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    //METODO PARA ELIMINAR REMINDER//
    LegalRenewalComponent.prototype.deletereminder = function (i, item) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Reminder?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                if (item.id == 0) {
                    _this.settlingin.reminderSettlingIns.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("RelocationServices/DeleteReminderLeaseRenewal?id=" + item.id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Reminder delete"
                                },
                                width: "350px"
                            });
                        }
                        _this.ngOnInit();
                    }));
                }
            }
        });
    };
    LegalRenewalComponent.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe(function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
                _this.permanent_homet(_this.dataSourceHousing);
            }
        });
    };
    LegalRenewalComponent.prototype.permanent_homet = function (data) {
        var _this = this;
        var permanentHome = data.filter(function (E) {
            if (E.status == "Permanent Home") {
                return true;
            }
        });
        console.log(permanentHome);
        this.data_home = permanentHome;
        for (var i = 0; i < permanentHome.length; i++) {
            this._services.service_general_get("HousingList/GetHousing?key=" + permanentHome[i].id).subscribe((function (data) {
                _this.permanentHome = data.result;
                console.log('esta es la casa permanente: ', _this.permanentHome);
                _this.data_contracts = _this.permanentHome.contractDetail;
                _this.paymentHousings = _this.permanentHome.paymentHousings;
                _this.costSavingHomes = _this.permanentHome.costSavingHomes;
                _this.data_renewal = _this.permanentHome.renewalDetailHome;
                _this.data_departure = _this.permanentHome.departureDetailsHome;
                _this.data_land = _this.permanentHome.landlordDetailsHome;
                if (_this.data_land.creditCardLandLordDetails) {
                    _this.ca_creditCard.forEach(function (E) {
                        for (var i_1 = 0; i_1 < _this.data_land.creditCardLandLordDetails.length; i_1++) {
                            if (_this.data_land.creditCardLandLordDetails[i_1].creditCard == E.id) {
                                E.checked = true;
                            }
                        }
                    });
                }
                if (_this.permanentHome.propertyReports) {
                    for (var i_2 = 0; i_2 < _this.permanentHome.propertyReports.length; i_2++) {
                        if (_this.permanentHome.propertyReports[i_2].propertyInspection == 1) {
                            _this.data_move_in = _this.permanentHome.propertyReports[i_2];
                        }
                        if (_this.permanentHome.propertyReports[i_2].propertyInspection == 2) {
                            _this.data_move_out = _this.permanentHome.propertyReports[i_2];
                        }
                    }
                    console.log(_this.data_move_in);
                }
                _this.data_inspection = _this.permanentHome.inspections;
                _this.data_repairs = _this.permanentHome.repairs;
            }));
        }
    };
    LegalRenewalComponent.prototype.get_dependent = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(this.data.sr)).subscribe(function (data) {
            if (data.success) {
                console.log('DATA CONSULTA: ', data);
                _this.ca_dependent = data.result;
            }
        });
    };
    //**************************************************************//
    LegalRenewalComponent.prototype.getProperty_ = function (id) {
        for (var i = 0; i < this.ca_property.length; i++) {
            if (this.ca_property[i].id == id) {
                return this.ca_property[i].propertyType;
            }
        }
    };
    //**************************************************************//
    //Currency//
    LegalRenewalComponent.prototype.getCurrency = function (id) {
        for (var i = 0; i < this.ca_currency.length; i++) {
            if (this.ca_currency[i].id == id) {
                return this.ca_currency[i].currency;
            }
        }
    };
    //**************************************************************//
    //Recurrencia//
    LegalRenewalComponent.prototype.getRecurrence = function (id) {
        for (var i = 0; i < this.ca_recurrence.length; i++) {
            if (this.ca_recurrence[i].id == id) {
                return this.ca_recurrence[i].recurrence;
            }
        }
    };
    //**************************************************************//
    //Payment//
    LegalRenewalComponent.prototype.getPayment = function (id) {
        for (var i = 0; i < this.ca_payment_Type.length; i++) {
            if (this.ca_payment_Type[i].id == id) {
                return this.ca_payment_Type[i].paymentType;
            }
        }
    };
    //**************************************************************//
    //Responsable//
    LegalRenewalComponent.prototype.getResponsable = function (id) {
        for (var i = 0; i < this.ca_responsible.length; i++) {
            if (this.ca_responsible[i].id == id) {
                return this.ca_responsible[i].responsable;
            }
        }
    };
    //**************************************************************//
    //DEPENDENT//
    LegalRenewalComponent.prototype.getDependent = function (id) {
        for (var i = 0; i < this.ca_dependent.length; i++) {
            if (this.ca_dependent[i].id == id) {
                return this.ca_dependent[i].name;
            }
        }
    };
    //**************************************************************//
    //ACCOUNT//
    LegalRenewalComponent.prototype.getAccount = function (id) {
        for (var i = 0; i < this.ca_accountType.length; i++) {
            if (this.ca_accountType[i].id == id) {
                return this.ca_accountType[i].accountType;
            }
        }
    };
    //**************************************************************//
    //Seccion property//
    LegalRenewalComponent.prototype.getProperty = function (id) {
        for (var i = 0; i < this.ca_propertySection.length; i++) {
            if (this.ca_propertySection[i].id == id) {
                return this.ca_propertySection[i].propertySection;
            }
        }
    };
    //Seccion property//
    LegalRenewalComponent.prototype.getCondicion = function (id) {
        for (var i = 0; i < this.ca_statuspropertySection.length; i++) {
            if (this.ca_statuspropertySection[i].id == id) {
                return this.ca_statuspropertySection[i].status;
            }
        }
    };
    //RELATION SHIP//  
    LegalRenewalComponent.prototype.getReltion = function (id) {
        for (var i = 0; i < this.ca_relation.length; i++) {
            if (this.ca_relation[i].id == id) {
                return this.ca_relation[i].relationship;
            }
        }
    };
    //Repair//  
    LegalRenewalComponent.prototype.getRepair = function (id) {
        for (var i = 0; i < this.ca_repair.length; i++) {
            if (this.ca_repair[i].id == id) {
                return this.ca_repair[i].repairType;
            }
        }
    };
    //Supplier//  
    LegalRenewalComponent.prototype.getSupplier = function (id) {
        for (var i = 0; i < this.SupplierCompany.length; i++) {
            if (this.SupplierCompany[i].int == id) {
                return this.SupplierCompany[i].supplierCompany;
            }
        }
    };
    //**************************************************************//
    //METODO PARA AGREGAR HOUSING//
    LegalRenewalComponent.prototype.HomeDetailsnew = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                workOrderServicesId: this.settlingin.workOrderServices,
                numberWorkOrder: this.data.data.numberWorkOrder,
                serviceID: this.data.data.number_server,
                serviceName: this.data.data.service_name,
                service: this.data.data.serviceRecordId,
                serviceTypeId: this.data.data.serviceTypeId,
                sr: this.data.sr,
                supplierType: 3
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    //METODO PAR EDICION DE HOUSING//
    LegalRenewalComponent.prototype.editHousing = function () {
        var _this = this;
        this.data_propiedad.supplierType = 3;
        this.data_propiedad.workOrderServicesId = this.settlingin.workOrderServices,
            this.data_propiedad.sr = this.data.sr;
        this.data_propiedad.numberWorkOrder = this.data.data.numberWorkOrder;
        this.data_propiedad.serviceID = this.data.data.number_server;
        this.data_propiedad.serviceName = this.data.data.service_name;
        console.log("Editar Housing: ", this.data_propiedad);
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: this.data_propiedad,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    LegalRenewalComponent.prototype.dataHousing = function (item) {
        this.data_propiedad = item;
    };
    //**************************************************************//
    //METODO PARA GUARDAR INFORMACION//
    LegalRenewalComponent.prototype.save = function () {
        var _this = this;
        this.settlingin.updateBy = this.user.id;
        this.settlingin.updatedDate = new Date();
        this.settlingin.documentLeaseRenewals = this.temporalDocument;
        this.__loader__.showLoader();
        var data_comment_aux = this.settlingin.commentLeaseRenewals;
        this.settlingin.commentLeaseRenewals = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
                this.settlingin.commentLeaseRenewals.push(data_comment_aux[i]);
            }
        }
        console.log(this.settlingin);
        this.temporalDocument = [];
        this._services.service_general_put("RelocationServices/PutLeaseRenewal", this.settlingin).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update Data"
                    },
                    width: "350px"
                });
                _this.dialogRef.close();
                _this.ngOnInit();
                _this.__loader__.hideLoader();
            }
        }), function (err) {
            console.log("error: ", err);
            _this.__loader__.hideLoader();
        });
    };
    LegalRenewalComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.sr,
                document: document,
                sl: 1,
                name_section: "only_one_service"
            }
        });
    };
    LegalRenewalComponent.prototype.editHousing_ = function (permanentHome) {
        var _this = this;
        console.log(permanentHome);
        permanentHome.supplierType = 3;
        permanentHome.workOrderServicesId = this.settlingin.workOrderServices,
            permanentHome.sr = this.data.sr;
        permanentHome.numberWorkOrder = this.data.data.numberWorkOrder;
        permanentHome.serviceID = this.data.data.number_server;
        permanentHome.serviceName = this.data.data.service_name;
        console.log("Editar Housing: ", permanentHome);
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: permanentHome,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    //PRIVACY//
    LegalRenewalComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    LegalRenewalComponent = __decorate([
        core_1.Component({
            selector: 'app-legal-renewal',
            templateUrl: './legal-renewal.component.html',
            styleUrls: ['./legal-renewal.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], LegalRenewalComponent);
    return LegalRenewalComponent;
}());
exports.LegalRenewalComponent = LegalRenewalComponent;
