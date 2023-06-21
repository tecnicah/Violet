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
exports.DialogDepartureComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_addpayment_component_1 = require("../dialog-addpayment/dialog-addpayment.component");
var dialog_home_details_component_1 = require("../dialog-home-details/dialog-home-details.component");
var dialog_cost_savings_component_1 = require("../dialog-cost-savings/dialog-cost-savings.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var DialogDepartureComponent = /** @class */ (function () {
    function DialogDepartureComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.departure = {}; //era public
        this.temporalDocument = [];
        this.vista = false;
        //EXTENSION//
        this.dataSource = [];
        this.displayedColumns = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
        //RESQUEST PAYMENT//
        this.dataSourcePay = [];
        this.displayedColumnsPay = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date', 'Status', 'action'];
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        //TABLE HOUSING//
        this.dataSourceHousing = [];
        this.displayedColumnsHousing = ['Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Housing Status', 'Actions'];
        //CATALOGOS_GET//
        this.ca_estatus = [];
        this.ca_requestType = [];
        this.ca_dependent = [];
        // ca_property :any[]=[];
        // ca_repair:any[] = [];
        this.ca_supplier = [];
        this.ca_asistance = [];
        this.ca_accounttype = [];
        this.cr = "Reply";
        this.other = false;
        this.payments = [];
        this.calculo = {};
        this.ca_creditCard = [];
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
        //*****************************************************************************************************//
        // se agrego para credit card
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
        //*****************************************************************************************************//
        //************************************//
        this.files = [];
    }
    //*****************************************************************************************************//
    DialogDepartureComponent.prototype.ngOnInit = function () {
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log("datos de la tabla: ", this.data);
        this.get_catalogos();
    };
    DialogDepartureComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, duration, _m, _o, _p, _q, _r;
            var _this = this;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        this.__loader__.showLoader();
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusPropertySection')];
                    case 1:
                        _a.ca_statuspropertySection = _s.sent(); //
                        //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=16").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_estatus = data.result;
                            }
                        }));
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 2:
                        _b.ca_requestType = _s.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 3:
                        _c.nacionality = _s.sent();
                        //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_document = data.result;
                            }
                        }));
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 4:
                        _d.ca_privacy = _s.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertySection')];
                    case 5:
                        _e.ca_propertySection = _s.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 6:
                        _f.ca_relation = _s.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 7:
                        _g.ca_currency = _s.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertyTypeHousing')];
                    case 8:
                        _h.ca_property = _s.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRepairType')];
                    case 9:
                        _j.ca_repair = _s.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplier')];
                    case 10:
                        _k.ca_supplier = _s.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetAssistanceWith')];
                    case 11:
                        _l.ca_asistance = _s.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 12:
                        duration = _s.sent();
                        this.ca_recurrence = duration.filter(function (E) {
                            if (E.recurrence != null) {
                                return true;
                            }
                        });
                        // credit card se agrego
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 13:
                        // credit card se agrego
                        _m.ca_creditCard = _s.sent();
                        // credit card se agrego
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 14:
                        // credit card se agrego
                        _o.ca_accountType = _s.sent();
                        _p = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 15:
                        _p.ca_creditCard = _s.sent();
                        this.ca_creditCard.forEach(function (E) {
                            E.checked = false;
                        });
                        // fin credit card
                        _q = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentType')];
                    case 16:
                        // fin credit card
                        _q.ca_payment_Type = _s.sent();
                        _r = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetResponsablePayment')];
                    case 17:
                        _r.ca_responsible = _s.sent();
                        // se agrego para repair
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(function (r) {
                            if (r.success) {
                                for (var i = 0; i < r.result.length; i++) {
                                    var element = r.result[i];
                                    _this.SupplierCompany.push(element);
                                }
                            }
                        });
                        // se agrego para reapair
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(function (r) {
                            if (r.success) {
                                for (var i = 0; i < r.result.length; i++) {
                                    var element = r.result[i];
                                    _this.SupplierCompany.push(element);
                                }
                            }
                        });
                        this._services.service_general_get('RelocationServices/GetDepartureById?id=' + this.data.data.service[0].id).subscribe((function (data) {
                            if (data.success) {
                                console.log('id', _this.data.data.service[0].id);
                                console.log('DATA CONSULTA: ', data);
                                _this.departure = data.result;
                                _this.vista = true;
                                _this.dataSource = _this.departure.extensionDepartures;
                                if (_this.departure.commentDepartures.length == 0) {
                                    _this.addReply();
                                }
                                var data_assistance = [];
                                for (var i = 0; i < _this.ca_asistance.length; i++) {
                                    var element = _this.ca_asistance[i];
                                    _this.ca_asistance[i].id_other = 1;
                                    if (_this.ca_asistance[i].id == 4) {
                                        _this.ca_asistance.splice(i, 1);
                                    }
                                }
                                for (var i = 0; i < _this.departure.departureAssistanceWiths.length; i++) {
                                    var element = _this.departure.departureAssistanceWiths[i];
                                    for (var j = 0; j < _this.ca_asistance.length; j++) {
                                        if (element.completionDate != '' && element.completionDate != undefined && element.completionDate != null && element.assistanceWith == _this.ca_asistance[j].id) {
                                            _this.ca_asistance[j].check = true;
                                            _this.ca_asistance[j].completionDate = element.completionDate;
                                            _this.ca_asistance[j].other = element.otherSpecify;
                                            _this.ca_asistance[j].departaureId = _this.departure.id;
                                            _this.ca_asistance[j].idDB = _this.departure.departureAssistanceWiths[i].id;
                                            _this.ca_asistance[j].assistanceWith = _this.ca_asistance[j].id;
                                        }
                                        /*
                                        else{
                                          this.ca_asistance[j].check = false;
                                        }
                                        */
                                    }
                                    if (_this.departure.departureAssistanceWiths[i].assistanceWith == 4) {
                                        data_assistance.push({
                                            "assistance": "Other",
                                            "completionDate": element.completionDate,
                                            "createdBy": null,
                                            "createdDate": null,
                                            "id": 4,
                                            "check": true,
                                            "other": element.otherSpecify,
                                            "updateBy": null,
                                            "updatedDate": null
                                        });
                                    }
                                }
                                for (var i = 0; i < data_assistance.length; i++) {
                                    _this.ca_asistance.push(data_assistance[i]);
                                }
                                // if(this.departure.departureRepairs.length == 0){
                                //   this.addRepair();
                                // }
                                // if(this.departure.inspectionsRepairs.length == 0){
                                //   inspectionsRepairs.departureId = this.departure.id;
                                //   inspectionsRepairs.createdBy = this.user.id;
                                //   inspectionsRepairs.createdDate = new Date()
                                //   this.departure.inspectionsRepairs.push(inspectionsRepairs);
                                // }
                                _this.getDataHousing(); //permanent home
                                _this.get_dependent();
                                _this.get_payment();
                                _this.__loader__.hideLoader();
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    //*****************************************************************************************************//
    DialogDepartureComponent.prototype.propertyDetails = function (data_) {
        console.log(data_);
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                workOrderServicesId: this.departure.workOrderServicesId,
                type: 2,
                supplierType: 3,
                id: Number(data_)
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            /*
            console.log(result);
            result.departaureId = this.departure.id;
            result.ongoingPayment = result.paymentResponsibility;
            this.departure.departurePayments.push(result);
            console.log("cierre del dialog addPaymentType: ", this.departure.departurePayments);
            */
        });
    };
    //*****************************************************************************************************//
    //DEPENDENT//
    DialogDepartureComponent.prototype.get_dependent = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(this.data.sr)).subscribe(function (data) {
            if (data.success) {
                console.log('DATA CONSULTA: ', data);
                _this.ca_dependent = data.result;
            }
        });
    };
    //*****************************************************************************************************//
    //ADD PAYMENT TYPE (TABLE)//
    DialogDepartureComponent.prototype.addPaymentType = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_addpayment_component_1.DialogAddpaymentComponent, {
            data: { id: 0 },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            result.departaureId = _this.departure.id;
            result.ongoingPayment = result.paymentResponsibility;
            _this.departure.departurePayments.push(result);
            console.log("cierre del dialog addPaymentType: ", _this.departure.departurePayments);
        });
    };
    //EDIT PAYMENT//
    DialogDepartureComponent.prototype.editPaymentType = function (data, pos) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_addpayment_component_1.DialogAddpaymentComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            result.ongoingPayment = result.paymentResponsibility;
            _this.departure.departurePayments[pos] = result;
            console.log("cierre del dialog EDIT PaymentType: ", _this.departure.departurePayments);
        });
    };
    //*****************************************************************************************************//
    DialogDepartureComponent.prototype.addAssistance = function () {
        this.departure.departureAssistanceWiths.push({
            "id": 0,
            "departaureId": this.departure.id,
            "assistanceWith": 0,
            "completionDate": null,
            "otherSpecify": null,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date()
        });
    };
    //*****************************************************************************************************//
    DialogDepartureComponent.prototype.addAddInspectionDate = function () {
        this.departure.inspectionsRepairs.push({
            "id": 0,
            "departureId": this.departure.id,
            "initialInspectionDate": null,
            "finalInspectionDate": null,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date()
        });
    };
    //DELETE INSPECTION DATE//
    DialogDepartureComponent.prototype.removeinspectionsRepairs = function (i, id) {
        this.departure.inspectionsRepairs.splice(i, 1);
    };
    //*****************************************************************************************************//
    //REPAIRS//
    DialogDepartureComponent.prototype.removeRepairs = function (i, id) {
        this.departure.departureRepairs.splice(i, 1);
    };
    //ADD REPAIRS//
    DialogDepartureComponent.prototype.addRepair = function () {
        this.departure.departureRepairs.push({
            "id": 0,
            "departaureId": this.departure.id,
            "repairType": 0,
            "supplierPartner": 0,
            "repairStartDate": null,
            "repairEndDate": null,
            "totalDays": 0,
            "comments": null,
            "documentRepairs": []
        });
    };
    DialogDepartureComponent.prototype.permanent_homet = function (data) {
        var _this = this;
        console.log("PERMANENT HOME");
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
    //Supplier//
    DialogDepartureComponent.prototype.getProperty_ = function (id) {
        for (var i = 0; i < this.ca_property.length; i++) {
            if (this.ca_property[i].id == id) {
                return this.ca_property[i].propertyType;
            }
        }
    };
    DialogDepartureComponent.prototype.editHousing = function () {
        var _this = this;
        var data = {};
        data.id = this.departure.propertyId;
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
    DialogDepartureComponent.prototype.dataFinal = function () {

    };
    //DATA TABLE HOUSING//
    DialogDepartureComponent.prototype.getDataHousing = function () {
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
    //NEW RECORD//
    DialogDepartureComponent.prototype.HomeDetailsnew = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
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
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                workOrderServicesId: this.departure.workOrderServicesId,
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
    //Recurrencia//
    DialogDepartureComponent.prototype.getRecurrence = function (id) {
        for (var i = 0; i < this.ca_recurrence.length; i++) {
            if (this.ca_recurrence[i].id == id) {
                return this.ca_recurrence[i].recurrence;
            }
        }
    };
    //Payment//
    DialogDepartureComponent.prototype.getPayment = function (id) {
        for (var i = 0; i < this.ca_payment_Type.length; i++) {
            if (this.ca_payment_Type[i].id == id) {
                return this.ca_payment_Type[i].paymentType;
            }
        }
    };
    //Responsable//
    DialogDepartureComponent.prototype.getResponsable = function (id) {
        for (var i = 0; i < this.ca_responsible.length; i++) {
            if (this.ca_responsible[i].id == id) {
                return this.ca_responsible[i].responsable;
            }
        }
    };
    //DEPENDENT//
    DialogDepartureComponent.prototype.getDependent = function (id) {
        for (var i = 0; i < this.ca_dependent.length; i++) {
            if (this.ca_dependent[i].id == id) {
                return this.ca_dependent[i].name;
            }
        }
    };
    //DEPENDENT//
    DialogDepartureComponent.prototype.getAccount = function (id) {
        for (var i = 0; i < this.ca_accountType.length; i++) {
            if (this.ca_accountType[i].id == id) {
                return this.ca_accountType[i].accountType;
            }
        }
    };
    //Seccion property//
    DialogDepartureComponent.prototype.getProperty = function (id) {
        for (var i = 0; i < this.ca_propertySection.length; i++) {
            if (this.ca_propertySection[i].id == id) {
                return this.ca_propertySection[i].propertySection;
            }
        }
    };
    //Seccion property//
    DialogDepartureComponent.prototype.getCondicion = function (id) {
        for (var i = 0; i < this.ca_statuspropertySection.length; i++) {
            if (this.ca_statuspropertySection[i].id == id) {
                return this.ca_statuspropertySection[i].status;
            }
        }
    };
    //RELATION SHIP//
    DialogDepartureComponent.prototype.getReltion = function (id) {
        for (var i = 0; i < this.ca_relation.length; i++) {
            if (this.ca_relation[i].id == id) {
                return this.ca_relation[i].relationship;
            }
        }
    };
    DialogDepartureComponent.prototype.getRepair = function (id) {
        for (var i = 0; i < this.ca_repair.length; i++) {
            if (this.ca_repair[i].id == id) {
                return this.ca_repair[i].repairType;
            }
        }
    };
    //Supplier//
    DialogDepartureComponent.prototype.getSupplier = function (id) {
        for (var i = 0; i < this.SupplierCompany.length; i++) {
            if (this.SupplierCompany[i].int == id) {
                return this.SupplierCompany[i].supplierCompany;
            }
        }
    };
    DialogDepartureComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.sr,
                document: document,
                name_section: "only_one_service",
                sl: 1
            }
        });
    };
    //**FUNCIONES DE CARGA DE DOCUMENTO***//
    DialogDepartureComponent.prototype.dropped = function (files, i) {
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
                            _this.departure.departureRepairs[i].documentRepairs.push({
                                "id": 0,
                                "fileName": droppedFile.relativePath,
                                "fileExtension": ext[1],
                                "fileRequest": encoded,
                                "createdBy": _this.user.id,
                                "createdDate": new Date(),
                                "repairId": _this.departure.id
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
    //**FUNCIONES DE CARGA DE DOCUMENTO***//
    DialogDepartureComponent.prototype.fileOver = function (event, i) {
        console.log(event);
    };
    //**FUNCIONES DE CARGA DE DOCUMENTO***//
    DialogDepartureComponent.prototype.fileLeave = function (event, i) {
        console.log(event);
    };
    //*****************************************************************************************************//
    //**NEW DOCUMENT**//
    DialogDepartureComponent.prototype.addDocument = function () {
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
                result.departaureId = _this.departure.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    //**DELETE DOCUMENTO FROM DATABASE**//
    DialogDepartureComponent.prototype.deleteDocument_DB = function (id) {
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
                _this._services.service_general_delete("RelocationServices/DeleteDocumentD?id=" + id).subscribe((function (data) {
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
    DialogDepartureComponent.prototype.deleteDocument_LOCAL = function (position) {
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
    //**CONSULTA PAYMENT**//
    DialogDepartureComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.departure.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                console.log('datos de tabla request', data);
                _this.calculo = data.result.value;
                _this.calculo.total = _this.calculo.ammountSubTotal + _this.calculo.managementFeeSubTotal + _this.calculo.wireFeeSubTotal + _this.calculo.advanceFeeSubTotal;
                _this.payments = data.result.value.payments;
                // console.log('datos de la tabla' + data.result.value.payments);
            }
            console.log('2° datos de la tabla' + _this.payments);
        }));
    };
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    DialogDepartureComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.departure.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.departure.workOrderServicesId,
                workOrder: this.data.data.workOrderId,
                service: this.data.data.id_server,
                id: 0,
                type: 2,
                supplierType: 3
            };
        }
        else {
            data.type = 2;
            data.supplierType = 3;
            data.id = data.requestPaymentId;
            data.serviceRecord = this.data.data.serviceRecordId;
            data.sr = this.data.data.serviceRecordId;
            data.service = this.data.data.id_server;
        }
        console.log("Data al abrir modal de payment concept: ", data);
        var dialogRef = this._dialog.open(dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_payment();
            ;
        });
    };
    //**EDIT REQUEST PAYMENT**//
    DialogDepartureComponent.prototype.editPayment = function (data) {
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
    // delete payment
    DialogDepartureComponent.prototype.deletePaymentConcept = function (data) {
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
                        ;
                    }
                }));
            }
        });
    };
    //*****************************************************************************************************//
    //**METHODS COMMENTS (NEW)**//
    DialogDepartureComponent.prototype.addReply = function () {
        console.log(this.user);
        this.departure.commentDepartures.push({
            "id": 0,
            "departureId": this.departure.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.departure.commentDepartures.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    //*****************************************************************************************************//
    //**METHODS REMINDER (NEW)**//
    DialogDepartureComponent.prototype.addReminder = function () {
        this.departure.reminderDepartures.push({
            "id": 0,
            "departaureId": this.departure.id,
            "reminderDate": null,
            "reminderComments": null,
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    //**DELETE REMINDER**//
    DialogDepartureComponent.prototype.removeReminder = function (i, id) {
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
                    _this.departure.reminderDepartures.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("RelocationServices/DeleteReminderD?id=" + id).subscribe((function (data) {
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
    //DOCUMENT TYPE//
    DialogDepartureComponent.prototype.getDocument = function (id) {
        for (var i = 0; i < this.ca_document.length; i++) {
            if (this.ca_document[i].id == id) {
                return this.ca_document[i].documentType;
            }
        }
    };
    //NACIONALITY//
    DialogDepartureComponent.prototype.getNacionality = function (id) {
        if (id != null) {
            for (var i = 0; i < this.nacionality.length; i++) {
                if (this.nacionality[i].id == id) {
                    return this.nacionality[i].name;
                }
            }
        }
        else {
            return "--";
        }
    };
    //INCLUDED//
    DialogDepartureComponent.prototype.getIncluded = function (data) {
        if (data == false) {
            return 'NO';
        }
        else if (data == true) {
            return 'SI';
        }
    };
    //CURRENCY//
    DialogDepartureComponent.prototype.getCurrency = function (id) {
        for (var i = 0; i < this.ca_currency.length; i++) {
            if (this.ca_currency[i].id == id) {
                return this.ca_currency[i].currency;
            }
        }
    };
    //*****************************************************************************************************//
    //**SAVE**//
    DialogDepartureComponent.prototype.save = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.departure.updateBy = this.user.id;
        this.departure.updatedDate = new Date();
        this.departure.createdBy = this.user.id;
        this.departure.createdDate = new Date();
        this.departure.documentDepartures = this.temporalDocument;
        this.temporalDocument = [];
        for (var i = 0; i < this.ca_asistance.length; i++) {
            var element = this.ca_asistance[i];
            this.ca_asistance[i].assistanceWith = this.ca_asistance[i].id;
            if (this.ca_asistance[i].idDB != undefined) {
                this.ca_asistance[i].id = this.ca_asistance[i].idDB;
            }
            else {
                this.ca_asistance[i].id = 0;
            }
            if (this.ca_asistance[i].check != true) {
                this.ca_asistance.splice(i, 1);
            }
            else {
                this.ca_asistance[i].departaureId = this.departure.id;
            }
        }
        this.departure.departureAssistanceWiths = this.ca_asistance;
        var data_comment_aux = this.departure.commentDepartures;
        this.departure.commentDepartures = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.departure.commentDepartures.push(data_comment_aux[i]);
            }
        }
        console.log("SAVED DATA: ", this.departure);
        // service_general_post_with_url
        this._services.service_general_put("RelocationServices/PutDeparture", this.departure).subscribe((function (data) {
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
        this.__loader__.hideLoader();
    };
    //*****************************************************************************************************//
    DialogDepartureComponent.prototype.displayPanelSchooling = function ($event) {
        this.departure.propertyDeparture = $event.checked;
    };
    //*****************************************************************************************************//
    //ADD COST SAVINGS (TABLE)//
    DialogDepartureComponent.prototype.addCostSavings = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_cost_savings_component_1.DialogCostSavingsComponent, {
            data: { id: 0 },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            result.departureId = _this.departure.id;
            result.createdBy = _this.user.id;
            result.createdDate = new Date();
            result.updateBy = _this.user.id;
            result.updatedDate = new Date();
            _this.departure.departureCostSavings.push(result);
            console.log("COST SAVING:  ", _this.departure.costSavingDetails);
        });
    };
    //EDIT COST SAVINGS//
    DialogDepartureComponent.prototype.editCostSavings = function (data, pos) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_cost_savings_component_1.DialogCostSavingsComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.departure.costSavingDetails[pos] = result;
            console.log("cierre del dialog INCLUDED COST SAVINGS EDIT: ", _this.departure.costSavingDetails);
        });
    };
    //*****************************************************************************************************//
    DialogDepartureComponent.prototype.addOther = function () {
        this.ca_asistance.push({
            "assistance": "Other",
            "completionDate": null,
            "createdBy": null,
            "createdDate": null,
            "id": 4,
            "id_other": 0,
            "other": null,
            "updateBy": null,
            "updatedDate": null
        });
    };
    //PRIVACY//
    DialogDepartureComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    DialogDepartureComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-departure',
            templateUrl: './dialog-departure.component.html',
            styleUrls: ['./dialog-departure.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogDepartureComponent);
    return DialogDepartureComponent;
}());
exports.DialogDepartureComponent = DialogDepartureComponent;
