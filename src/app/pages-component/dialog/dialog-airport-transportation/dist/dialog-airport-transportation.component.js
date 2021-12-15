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
exports.DialogAirportTransportationComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var dialog_addpayment_component_1 = require("../dialog-addpayment/dialog-addpayment.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var forms_1 = require("@angular/forms");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var DialogAirportTransportationComponent = /** @class */ (function () {
    function DialogAirportTransportationComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        //VARIABLES//
        this.info = [];
        this.supplier_get = [];
        this.toppings = new forms_1.FormControl();
        this.temporalDocument = [];
        this.vista = false;
        this.payments = [];
        this.calculo = {};
        //CATALOGOS//
        this.ca_estatus = [];
        this.ca_requestType = [];
        this.ca_duracion = [];
        this.caNumbers = [];
        this.caNumbersMin = [];
        this.ca_transportType = [];
        this.ca_supplier = [];
        this.family = [];
        //TABLE EXTENSION//
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.dataSource = [];
        this.displayedColumns = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
        //TABLE PAYMENTS//
        this.dataSourceP = [];
        this.displayedColumnsP = ['Payment Type', 'Assign To', 'Concept', 'Acciones'];
        //TABLE REQUEST PAYMENT//
        this.dataSourcePayment = [];
        this.cr = "Reply";
        this.loader = new loader_1.LoaderComponent();
        this.show = false;
        //**********************************************************************************//
        //CATALOGOS//
        this.ca_privacy = [];
    }
    DialogAirportTransportationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                this.loader.showLoader();
                console.log("DATA DE LA TABLA: ", this.data);
                this.user = JSON.parse(localStorage.getItem('userData'));
                for (i = 1; i < 24; i++) {
                    this.caNumbers.push(i + ' hr');
                }
                for (i = 1; i < 60; i++) {
                    this.caNumbersMin.push(i + ' min');
                }
                this.get_catalogos();
                return [2 /*return*/];
            });
        });
    };
    DialogAirportTransportationComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
                        _a.ca_privacy = _g.sent();
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=20").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_estatus = data.result;
                            }
                        }));
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 2:
                        _b.ca_requestType = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 3:
                        _c.nacionality = _g.sent();
                        //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_document = data.result;
                            }
                        }));
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 4:
                        _d.ca_duracion = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTransportType')];
                    case 5:
                        _e.ca_transportType = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplier')];
                    case 6:
                        _f.ca_supplier = _g.sent();
                        this._services.service_general_get('RelocationServices/GetAirportTransportationServicesById?applicatId=   ' + this.data.data.deliveredToId + '&service_order_id=' + this.data.data.workOrderId + '&type_service=' + this.data.data.home_host).subscribe((function (data) {
                            if (data.success) {
                                _this.transportation = data.result.value[0];
                                for (var i = 0; i < _this.transportation.transportService.length; i++) {
                                    _this.transportation.transportService[i].family = [];
                                    if (_this.transportation.transportService[i].familyMemberTransportServices.length > 0) {
                                        for (var j = 0; j < _this.transportation.transportService[i].familyMemberTransportServices.length; j++) {
                                            _this.transportation.transportService[i].family.push(_this.transportation.transportService[i].familyMemberTransportServices[j].familyMember);
                                        }
                                    }
                                }
                                console.log('DATA CONSULTA FINAL: ', _this.transportation);
                                _this.dataSourceP = _this.transportation.paymentAirportTransportationServices;
                                _this.get_payment();
                                if (_this.transportation.commentAirportTransportationServices.length == 0) {
                                    _this.addReply();
                                }
                                _this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(_this.data.sr)).subscribe((function (data_) {
                                    if (data_.success) {
                                        _this.family = data_.result;
                                    }
                                }));
                                _this.get_SupplierType();
                                _this.show = true;
                                _this.loader.hideLoader();
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    //**********************************************************************************//
    //CONSULTA DEL SUPPLIER//
    DialogAirportTransportationComponent.prototype.get_SupplierType = function () {
        var _this = this;
        this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=' + this.transportation.transportService[0].workOrderServicesId + '&supplierType=' + 10 + '&serviceLine=2').subscribe(function (r) {
            if (r.success) {
                _this.supplier_get = r.result.value;
                console.log(_this.supplier_get);
                _this.getInfo();
            }
        });
    };
    //CONSULTA DE INFORMACION PARA MODAL//
    DialogAirportTransportationComponent.prototype.getInfo = function () {
        for (var i = 0; i < this.supplier_get.length; i++) {
            if (this.supplier_get[i].id == this.transportation.transportService[0].supplierPartner) {
                this.info = this.supplier_get[i];
                console.log(this.info);
            }
        }
    };
    //**********************************************************************************//
    //ADD PAYMENT TYPE (TABLE)//
    DialogAirportTransportationComponent.prototype.addPaymentType = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_addpayment_component_1.DialogAddpaymentComponent, {
            data: { id: 0 },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            result.airportTransportationServicesId = _this.transportation.transportService[0].id;
            _this.transportation.paymentAirportTransportationServices.push(result);
            console.log("cierre del dialog addPaymentType: ", _this.transportation.paymentAirportTransportationServices);
        });
    };
    //EDIT PAYMENT//
    DialogAirportTransportationComponent.prototype.editPaymentType = function (data, pos) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_addpayment_component_1.DialogAddpaymentComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.transportation.paymentAirportTransportationServices[pos] = result;
            console.log("cierre del dialog EDIT PaymentType: ", _this.transportation.paymentAirportTransportationServices);
        });
    };
    //**********************************************************************************//
    //**METHODS ADD DOCUMENT**//
    DialogAirportTransportationComponent.prototype.addDocument = function () {
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
                result.airportTransportationServicesId = _this.transportation.transportService[0].id;
                _this.temporalDocument.push(result);
            }
        });
    };
    //**********************************************************************************//
    //**DELETE DOCUMENTO FROM DATABASE**//
    DialogAirportTransportationComponent.prototype.deleteDocument_DB = function (id) {
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
                _this._services.service_general_delete("RelocationServices/DeleteDocumentATS?id=" + id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: 'Document deleted successul'
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                }));
            }
        });
    };
    //**********************************************************************************//
    //**DELETE DOCUMENT FROM VAR TEMPORALS**//
    DialogAirportTransportationComponent.prototype.deleteDocument_LOCAL = function (position) {
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
    //**********************************************************************************//
    //**CONSULTA PAYMENT**//
    DialogAirportTransportationComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.transportation.transportService[0].workOrderServicesId).subscribe((function (data) {
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
    DialogAirportTransportationComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.transportation.transportService[0].workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.transportation.transportService[0].workOrderServicesId,
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
    // edit payment
    DialogAirportTransportationComponent.prototype.editPayment = function (data) {
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
    DialogAirportTransportationComponent.prototype.deletePaymentConcept = function (data) {
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
    //*********************************************************************************//
    //**METHODS COMMENTS (NEW)**//
    DialogAirportTransportationComponent.prototype.addReply = function () {
        this.transportation.commentAirportTransportationServices.push({
            "id": 0,
            "airportTransportationServicesId": this.transportation.transportService[0].id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.transportation.commentAirportTransportationServices.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    //***********************************************************************************//
    //**METHODS REMINDER (NEW)**//
    DialogAirportTransportationComponent.prototype.addReminder = function () {
        this.transportation.reminderAirportTransportationServices.push({
            "id": 0,
            "airportTransportationServicesId": this.transportation.transportService[0].id,
            "reminderDate": null,
            "reminderComments": null,
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    //**DELETE REMINDER**//
    DialogAirportTransportationComponent.prototype.removeReminder = function (i, id) {
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
                    _this.transportation.reminderAirportTransportationServices.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("RelocationServices/DeleteReminderATS?id=" + id).subscribe((function (data) {
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
    //***********************************************************************************//
    //DOCUMENT TYPE//
    DialogAirportTransportationComponent.prototype.getDocument = function (id) {
        for (var i = 0; i < this.ca_document.length; i++) {
            if (this.ca_document[i].id == id) {
                return this.ca_document[i].documentType;
            }
        }
    };
    //NACIONALITY//
    DialogAirportTransportationComponent.prototype.getNacionality = function (id) {
        for (var i = 0; i < this.nacionality.length; i++) {
            if (this.nacionality[i].id == id) {
                return this.nacionality[i].name;
            }
        }
    };
    //**********************************************************************************//
    DialogAirportTransportationComponent.prototype.save = function () {
        var _this = this;
        this.transportation.documentAirportTransportationServices = this.temporalDocument;
        for (var i = 0; i < this.transportation.transportService.length; i++) {
            this.transportation.transportService[i].documentAirportTransportationServices = this.temporalDocument;
            this.transportation.transportService[i].reminderAirportTransportationServices = this.transportation.reminderAirportTransportationServices;
            this.transportation.transportService[i].updateBy = this.user.id;
            this.transportation.transportService[i].updatedDate = new Date();
            this.transportation.transportService[i].createdBy = this.user.id;
            this.transportation.transportService[i].createdDate = new Date();
            this.transportation.transportService[i].authoDateExtension = new Date();
            this.transportation.transportService[i].authoAcceptanceDateExtension = new Date();
            if (this.transportation.transportService[i].family != undefined && this.transportation.transportService[i].family.length > 0) {
                this.transportation.transportService[i].familyMemberTransportServices = [];
                for (var j = 0; j < this.transportation.transportService[i].family.length; j++) {
                    this.transportation.transportService[i].familyMemberTransportServices.push({
                        "transportService": this.transportation.transportService[i].id,
                        "familyMember": this.transportation.transportService[i].family[j]
                    });
                }
            }
            var data_comment_aux = this.transportation.commentAirportTransportationServices;
            this.transportation.transportService[i].commentAirportTransportationServices = [];
            for (var k = 0; k < data_comment_aux.length; k++) {
                if (data_comment_aux[k].reply != null && data_comment_aux[k].reply != undefined && data_comment_aux[k].reply.trim() != '') {
                    this.transportation.transportService[i].commentAirportTransportationServices.push(data_comment_aux[k]);
                }
            }
        }
        console.log("SAVE INFORMATION: ", this.transportation);
        this.loader.showLoader();
        this._services.service_general_put("RelocationServices/PutAirportTransportationServices", this.transportation.transportService).subscribe((function (data) {
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
                _this.loader.hideLoader();
                _this.ngOnInit();
            }
        }));
    };
    DialogAirportTransportationComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.sr,
                sl: 1,
                document: document,
                name_section: "only_one_service"
            }
        });
    };
    //PRIVACY//
    DialogAirportTransportationComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    DialogAirportTransportationComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-airport-transportation',
            templateUrl: './dialog-airport-transportation.component.html',
            styleUrls: ['./dialog-airport-transportation.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAirportTransportationComponent);
    return DialogAirportTransportationComponent;
}());
exports.DialogAirportTransportationComponent = DialogAirportTransportationComponent;
