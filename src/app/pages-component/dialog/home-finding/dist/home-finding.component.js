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
exports.HomeFindingComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../general-message/general-message.component");
var dialog_home_details_component_1 = require("../dialog-home-details/dialog-home-details.component");
var dialog_housing_specifications_component_1 = require("../dialog-housing-specifications/dialog-housing-specifications.component");
var loader_1 = require("app/shared/loader");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var HomeFindingComponent = /** @class */ (function () {
    function HomeFindingComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.calculo = {};
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
        this.show = false;
        this.user = {};
        this.ca_estatus = [];
        this.ca_currency = [];
        this.ca_requestType = [];
        this.ca_dependent = [];
        this.home_finding = {};
        this.temporalDocument = [];
        this.ca_accounttype = [];
        this.ca_leaseTemplate = [];
        this.ca_creditCard = [];
        this.nacionality = [];
        this.ca_document = [];
        this.cr = "Reply";
        this.loader = new loader_1.LoaderComponent();
        //TABLE EXTENSION//
        this.dataSource = [];
        this.displayedColumns = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
        //RESQUEST PAYMENT//
        this.dataSourcePay = [];
        this.displayedColumnsPay = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        //TABLE HOUSING//
        this.dataSourceHousing = [];
        this.displayedColumnsHousing = ['Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Housing Status', 'Actions'];
        //*****************************************************************************************************//
        this.ca_accountType = [];
        this.ca_payment_Type = [];
        this.ca_responsible = [];
        this.ca_recurrence = [];
        this.ca_statuspropertySection = [];
        this.ca_propertySection = [];
        this.ca_relation = [];
        this.ca_repair = [];
        this.SupplierCompany = [];
        this.ca_property = [];
        this.ca_privacy = [];
        this.data_inspection = [];
        this.data_repairs = [];
        this.data_home = [];
    }
    //*******************************************************//
    HomeFindingComponent.prototype.ngOnInit = function () {
        this.loader.showLoader();
        console.log("HOME FINDING: ", this.data);
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.home_finding = {};
        this.get_catalogos();
    };
    //BRING DATA CATALOGUES//
    HomeFindingComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, duration, _j, _k, _l, _m, _o, _p, _q;
            var _this = this;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusPropertySection')];
                    case 1:
                        _a.ca_statuspropertySection = _r.sent();
                        //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=21").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_estatus = data.result;
                            }
                        }));
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 2:
                        _b.ca_privacy = _r.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 3:
                        _c.ca_currency = _r.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 4:
                        _d.ca_requestType = _r.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLeaseTemplate')];
                    case 5:
                        _e.ca_leaseTemplate = _r.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 6:
                        _f.ca_creditCard = _r.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 7:
                        _g.nacionality = _r.sent();
                        //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_document = data.result;
                            }
                        }));
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertySection')];
                    case 8:
                        _h.ca_propertySection = _r.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 9:
                        duration = _r.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 10:
                        _j.ca_relation = _r.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRepairType')];
                    case 11:
                        _k.ca_repair = _r.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertyTypeHousing')];
                    case 12:
                        _l.ca_property = _r.sent();
                        this.ca_recurrence = duration.filter(function (E) {
                            if (E.recurrence != null) {
                                return true;
                            }
                        });
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 13:
                        _m.ca_accountType = _r.sent();
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 14:
                        _o.ca_creditCard = _r.sent();
                        this.ca_creditCard.forEach(function (E) {
                            E.checked = false;
                        });
                        _p = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentType')];
                    case 15:
                        _p.ca_payment_Type = _r.sent();
                        _q = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetResponsablePayment')];
                    case 16:
                        _q.ca_responsible = _r.sent();
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
                        this._services.service_general_get('RelocationServices/GetHomeFindingById?id=' + this.data.data.service[0].id).subscribe(function (data) {
                            if (data.success) {
                                console.log('DATA CONSULTA: ', data);
                                _this.home_finding = data.result;
                                _this.show = true;
                                _this.dataSource = _this.home_finding.extensionHomeFindings;
                                _this.get_dependent();
                                if (_this.home_finding.commentHomeFindings.length == 0) {
                                    _this.addReply();
                                }
                                _this.getDataHousing();
                                _this.get_payment();
                                _this.loader.hideLoader();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //*****************************************************************************************************//
    //DEPENDENT//
    HomeFindingComponent.prototype.get_dependent = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(this.data.sr)).subscribe(function (data) {
            if (data.success) {
                console.log('DATA CONSULTA: ', data);
                _this.ca_dependent = data.result;
            }
        });
    };
    //*****************************************************************************************************//
    //DATA TABLE HOUSING//
    HomeFindingComponent.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe(function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
                _this.permanent_homet(_this.dataSourceHousing);
                _this.dataFinal();
            }
        });
    };
    HomeFindingComponent.prototype.permanent_homet = function (data) {
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
    //*****************************************************************************************************//
    //**CONSULTA PAYMENT**//
    HomeFindingComponent.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.home_finding.workOrderServicesId).subscribe((function (data) {
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
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    HomeFindingComponent.prototype.addPayment = function () {
        var _this = this;
        var data = {
            serviceRecord: this.data.data.serviceRecordId,
            sr: this.data.data.serviceRecordId,
            workOrderServices: this.home_finding.workOrderServicesId,
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
    //**EDIT REQUEST PAYMENT**//
    HomeFindingComponent.prototype.editPayment = function (data) {
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
    //DELETE PAYMENT CONCEPT//
    HomeFindingComponent.prototype.deletePaymentConcept = function (data) {
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
    //*****************************************************************************************************//
    //**METHODS COMMENTS (NEW)**//
    HomeFindingComponent.prototype.addReply = function () {
        console.log(this.user);
        this.home_finding.commentHomeFindings.push({
            "id": 0,
            "homeFindingId": this.home_finding.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.home_finding.commentHomeFindings.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    //*****************************************************************************************************//
    HomeFindingComponent.prototype.addDocument = function () {
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
                result.homeFindingId = _this.home_finding.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    //*****************************************************************************************************//
    //**DELETE DOCUMENTO FROM DATABASE**//
    HomeFindingComponent.prototype.deleteDocument_DB = function (id) {
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
                _this._services.service_general_delete("RelocationServices/DeleteDocumentHF?id=" + id).subscribe((function (data) {
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
    //**DELETE DOCUMENT FROM VAR TEMPORALS**//
    HomeFindingComponent.prototype.deleteDocument_LOCAL = function (position) {
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
                _this.temporalDocument.splice(position, 1);
            }
        });
    };
    //*****************************************************************************************************//
    //**METHODS REMINDER (NEW)**//
    HomeFindingComponent.prototype.addReminder = function () {
        this.home_finding.reminderHomeFindings.push({
            "id": 0,
            "homeFindingId": this.home_finding.id,
            "reminderDate": null,
            "reminderComments": null,
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    //**DELETE REMINDER**//
    HomeFindingComponent.prototype.removeReminder = function (i, id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete Reminder?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                if (id == 0) {
                    _this.home_finding.reminderHomeFindings.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("RelocationServices/DeleteReminderHF?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Reminder deleted"
                                },
                                width: "350px"
                            });
                            _this.ngOnInit();
                        }
                    }));
                }
            }
        });
    };
    //******************************************************************************************************//
    //HOUSING//
    HomeFindingComponent.prototype.HousingSpecs = function () {
        var data_ = {
            numberWorkOrder: this.data.data.numberWorkOrder,
            serviceID: this.data.data.number_server,
            serviceName: this.data.data.service_name,
            sr: this.data.sr,
            service: this.data.data.serviceTypeId,
            type_housing: 2,
            workOrderServicesId: this.home_finding.workOrderServicesId
        };
        var dialogRef = this._dialog.open(dialog_housing_specifications_component_1.DialogHousingSpecificationsComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
            }
        });
    };
    //NEW RECORD//
    HomeFindingComponent.prototype.HomeDetailsnew = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                workOrderServicesId: this.home_finding.workOrderServicesId,
                numberWorkOrder: this.data.data.numberWorkOrder,
                serviceID: this.data.data.number_server,
                serviceName: this.data.data.service_name,
                service: this.data.data.serviceRecordId,
                serviceTypeId: this.data.data.serviceTypeId,
                sr: this.data.sr,
                supplierType: 3
                /*
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                numberWorkOrder: this.data.data.numberWorkOrder,
                serviceID: this.data.data.number_server,
                serviceName:  this.data.data.service_name,
                service: this.data.data.serviceRecordId,
                serviceTypeId : this.data.data.serviceTypeId,
                sr: this.data.sr
                */
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    //EDIT HOUSING//
    HomeFindingComponent.prototype.editHousing = function (data) {
        var _this = this;
        /*
        data.sr = this.data.sr;
        data.numberWorkOrder = this.data.data.numberWorkOrder;
        data.serviceID =  this.data.data.number_server;
        data.serviceName = this.data.data.service_name;
        */
        data.supplierType = 3;
        data.workOrderServicesId = this.home_finding.workOrderServicesId,
            data.sr = this.data.sr;
        data.numberWorkOrder = this.data.data.numberWorkOrder;
        data.serviceID = this.data.data.number_server;
        data.serviceName = this.data.data.service_name;
        console.log("Editar Housing: ", data);
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    //******************************************************************************************************//
    //DATA FINAL//
    HomeFindingComponent.prototype.dataFinal = function () {
        /*
        this.home_finding.permanentHomes = [];
        let housing = this.dataSourceHousing.filter(function(E){
          if(E.status == 'Pending'){
            return true;
          }
        })
        
        housing.forEach(E => {
         this._services.service_general_get("HousingList/GetHousing?key="+E.id).subscribe(async(data) => {
            console.log("LA CASA ES: ",data);
            if(data.success){
              this.home_finding.permanentHomes.push(data.result);
            }
          });
        })
        */
        ///console.log("OBJETO FINALLLLLLL OBJETO FINALLLLLLL: ",this.home_finding);
    };
    //******************************************************************************************************//
    //DOCUMENT TYPE//
    HomeFindingComponent.prototype.getDocument = function (id) {
        for (var i = 0; i < this.ca_document.length; i++) {
            if (this.ca_document[i].id == id) {
                return this.ca_document[i].documentType;
            }
        }
    };
    //NACIONALITY//
    HomeFindingComponent.prototype.getNacionality = function (id) {
        for (var i = 0; i < this.nacionality.length; i++) {
            if (this.nacionality[i].id == id) {
                return this.nacionality[i].name;
            }
        }
    };
    //INCLUDED//
    HomeFindingComponent.prototype.getIncluded = function (data) {
        if (data == false) {
            return 'NO';
        }
        else if (data == true) {
            return 'SI';
        }
    };
    //Currency//
    HomeFindingComponent.prototype.getCurrency = function (id) {
        for (var i = 0; i < this.ca_currency.length; i++) {
            if (this.ca_currency[i].id == id) {
                return this.ca_currency[i].currency;
            }
        }
    };
    //Payment//
    HomeFindingComponent.prototype.getPayment = function (id) {
        for (var i = 0; i < this.ca_payment_Type.length; i++) {
            if (this.ca_payment_Type[i].id == id) {
                return this.ca_payment_Type[i].paymentType;
            }
        }
    };
    //Responsable//
    HomeFindingComponent.prototype.getResponsable = function (id) {
        for (var i = 0; i < this.ca_responsible.length; i++) {
            if (this.ca_responsible[i].id == id) {
                return this.ca_responsible[i].responsable;
            }
        }
    };
    //Recurrencia//
    HomeFindingComponent.prototype.getRecurrence = function (id) {
        for (var i = 0; i < this.ca_recurrence.length; i++) {
            if (this.ca_recurrence[i].id == id) {
                return this.ca_recurrence[i].recurrence;
            }
        }
    };
    //DEPENDENT//
    HomeFindingComponent.prototype.getDependent = function (id) {
        for (var i = 0; i < this.ca_dependent.length; i++) {
            if (this.ca_dependent[i].id == id) {
                return this.ca_dependent[i].name;
            }
        }
    };
    //DEPENDENT//
    HomeFindingComponent.prototype.getAccount = function (id) {
        for (var i = 0; i < this.ca_accountType.length; i++) {
            if (this.ca_accountType[i].id == id) {
                return this.ca_accountType[i].accountType;
            }
        }
    };
    //Seccion property//
    HomeFindingComponent.prototype.getProperty = function (id) {
        for (var i = 0; i < this.ca_propertySection.length; i++) {
            if (this.ca_propertySection[i].id == id) {
                return this.ca_propertySection[i].propertySection;
            }
        }
    };
    //Seccion property//
    HomeFindingComponent.prototype.getCondicion = function (id) {
        for (var i = 0; i < this.ca_statuspropertySection.length; i++) {
            if (this.ca_statuspropertySection[i].id == id) {
                return this.ca_statuspropertySection[i].status;
            }
        }
    };
    //RELATION SHIP//  
    HomeFindingComponent.prototype.getReltion = function (id) {
        for (var i = 0; i < this.ca_relation.length; i++) {
            if (this.ca_relation[i].id == id) {
                return this.ca_relation[i].relationship;
            }
        }
    };
    //Repair//  
    HomeFindingComponent.prototype.getRepair = function (id) {
        for (var i = 0; i < this.ca_repair.length; i++) {
            if (this.ca_repair[i].id == id) {
                return this.ca_repair[i].repairType;
            }
        }
    };
    //Supplier//  
    HomeFindingComponent.prototype.getSupplier = function (id) {
        for (var i = 0; i < this.SupplierCompany.length; i++) {
            if (this.SupplierCompany[i].int == id) {
                return this.SupplierCompany[i].supplierCompany;
            }
        }
    };
    //Supplier//  
    HomeFindingComponent.prototype.getProperty_ = function (id) {
        for (var i = 0; i < this.ca_property.length; i++) {
            if (this.ca_property[i].id == id) {
                return this.ca_property[i].propertyType;
            }
        }
    };
    //FUNCION PARA VER DOCUMENTO//
    HomeFindingComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    //******************************************************************************************************//
    //SELECT CARD//
    HomeFindingComponent.prototype.select_card = function (data, event) {
        console.log(data);
        console.log(event);
    };
    //******************************************************************************************************//
    HomeFindingComponent.prototype.save = function () {
        var _this = this;
        this.home_finding.updateBy = this.user.id;
        this.home_finding.updatedDate = new Date();
        this.home_finding.createdBy = this.user.id;
        this.home_finding.createdDate = new Date();
        this.home_finding.documentHomeFindings = this.temporalDocument;
        var data_comment_aux = this.home_finding.commentHomeFindings;
        this.home_finding.commentHomeFindings = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.home_finding.commentHomeFindings.push(data_comment_aux[i]);
            }
        }
        console.log("GUARDAR: ", this.home_finding);
        this.temporalDocument = [];
        this._services.service_general_put("RelocationServices/PutHomeFinding", this.home_finding).subscribe((function (data) {
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
                _this.temporalDocument = [];
                _this.ngOnInit();
            }
        }));
        this.loader.hideLoader();
    };
    //PRIVACY//
    HomeFindingComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    HomeFindingComponent = __decorate([
        core_1.Component({
            selector: 'app-home-finding',
            templateUrl: './home-finding.component.html',
            styleUrls: ['./home-finding.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], HomeFindingComponent);
    return HomeFindingComponent;
}());
exports.HomeFindingComponent = HomeFindingComponent;
