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
exports.DialogRentalFurnitureComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_addpayment_component_1 = require("../dialog-addpayment/dialog-addpayment.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var DialogRentalFurnitureComponent = /** @class */ (function () {
    function DialogRentalFurnitureComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.info = [];
        this.infomain = [];
        this.main = [];
        this.dataSource = [];
        this.displayedColumns = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
        this.dataSourcePayment = [];
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.showPanelSchooling = false;
        this.user = {};
        this.cestatus = [];
        this.cacontractType = [];
        this.caSize = [];
        this.caMetric = [];
        this.caRelationship = [];
        this.caLanguages = [];
        this.caCountry = [];
        this.caAmenity = [];
        this.caCurrency = [];
        this.caNumbers = [];
        this.caPaymentType = [];
        this.caSupplier = [];
        this.caDuration = [];
        this.table_payments = [];
        this.ca_requestType = [];
        this.supplier_get = [];
        this.temporalDocument = [];
        this.allUser = [];
        this.payments = [];
        this.calculo = {};
        this.cr = "Reply";
        this.rentalData = {};
        this.extensionToggle = false;
        this.__loader__ = new loader_1.LoaderComponent();
        this.show = false;
        this.ca_privacy = [];
    }
    DialogRentalFurnitureComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.data);
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem('userData'));
        for (var i = 1; i < 11; i++) {
            this.caNumbers.push(i);
        }
        this._services.service_general_get('RelocationServices/GetRentalFurnitureCoordinationById?id=' + this.data.data.service[0].id).subscribe(function (r) {
            if (r.success) {
                _this.rentalData = r.result;
                console.log(_this.rentalData);
                if (_this.rentalData.stayExtensionRentalFurnitureCoordinations.length > 0) {
                    _this.rentalData.extensionToggle = true;
                    _this.showPanelSchooling = true;
                }
                else {
                    _this.showPanelSchooling = false;
                    _this.rentalData.extensionToggle = false;
                }
                if (_this.rentalData.commentRentalFurnitureCoordinations.length == 0) {
                    _this.addReply();
                }
                _this._services.service_general_get('User').subscribe(function (r) {
                    _this.allUser = r.result;
                });
                _this.get_payment();
            }
            _this.get_SupplierType();
            _this.show = true;
            _this.__loader__.hideLoader();
        });
        this.catalogos();
    };
    DialogRentalFurnitureComponent.prototype.get_SupplierType = function () {
        var _this = this;
        this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=' + this.rentalData.workOrderServicesId + '&supplierType=' + 3 + '&serviceLine=2').subscribe(function (r) {
            if (r.success) {
                _this.supplier_get = r.result.value;
                console.log(_this.supplier_get);
                _this.getInfo();
                _this.getMain();
            }
        });
    };
    DialogRentalFurnitureComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        //this.cestatus = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=18").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.cestatus = data.result;
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        _a.ca_privacy = _h.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 2:
                        _b.caCurrency = _h.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentType')];
                    case 3:
                        _c.caPaymentType = _h.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplier')];
                    case 4:
                        _d.caSupplier = _h.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 5:
                        _e.caDuration = _h.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 6:
                        _f.ca_requestType = _h.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 7:
                        _g.nacionality = _h.sent();
                        //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_document = data.result;
                            }
                        }));
                        this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.caRelationship = data.applicant.value;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogRentalFurnitureComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.rentalData.workOrderServicesId).subscribe((function (data) {
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
    DialogRentalFurnitureComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.rentalData.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.rentalData.workOrderServicesId,
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
    //**EDIT PAYMENT**//
    DialogRentalFurnitureComponent.prototype.editPayment = function (data) {
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
    DialogRentalFurnitureComponent.prototype.deletePaymentConcept = function (data) {
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
    DialogRentalFurnitureComponent.prototype.displayPanel = function ($event) {
        this.rentalData.extensionToggle = $event.checked;
        if (this.rentalData.extensionToggle) {
            this.showPanelSchooling = true;
            console.log(this.showPanelSchooling);
            if (this.rentalData.stayExtensionRentalFurnitureCoordinations.length == 0) {
                this.addExtencion();
            }
        }
        else {
            this.showPanelSchooling = false;
            console.log(this.showPanelSchooling);
        }
    };
    DialogRentalFurnitureComponent.prototype.addpayment = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_addpayment_component_1.DialogAddpaymentComponent, {
            data: {
                id: 0
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            result.rentalFurnitureCoordinationId = _this.rentalData.id;
            _this.rentalData.paymentsRentalFurnitureCoordinations.push(result);
            console.log("cierre del dialog addPaymentType: ", _this.rentalData.paymentsRentalFurnitureCoordinations);
        });
    };
    DialogRentalFurnitureComponent.prototype.editPaymentType = function (data, pos) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_addpayment_component_1.DialogAddpaymentComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.rentalData.paymentsRentalFurnitureCoordinations[pos] = result;
            console.log("cierre del dialog EDIT PaymentType: ", _this.rentalData.paymentsRentalFurnitureCoordinations);
        });
    };
    DialogRentalFurnitureComponent.prototype.addExtencion = function () {
        this.rentalData.stayExtensionRentalFurnitureCoordinations.push({
            id: 0,
            rentalFurnitureCoordinationId: this.rentalData.id,
            initialDate: "",
            finalDate: "",
            comment: "",
            createdBy: this.user.id,
            createdDate: new Date(),
            updateBy: this.user.id,
            updatedDate: new Date()
        });
    };
    DialogRentalFurnitureComponent.prototype.addReply = function () {
        this.rentalData.commentRentalFurnitureCoordinations.push({
            "id": 0,
            "rentalFurnitureCoordinationId": this.rentalData.id,
            "reply": "",
            "userId": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.rentalData.commentRentalFurnitureCoordinations.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    DialogRentalFurnitureComponent.prototype.addReminder = function () {
        this.rentalData.reminderRentalFurnitureCoordinations.push({
            "id": 0,
            "rentalFurnitureCoordinationId": this.rentalData.id,
            "reminderDate": "",
            "reminderComments": "",
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date()
        });
    };
    //**DELETE REMINDER**//
    DialogRentalFurnitureComponent.prototype.removeReminder = function (i, id) {
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
                    _this.rentalData.reminderRentalFurnitureCoordinations.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("RelocationServices/DeleteReminderRFC?id=" + id).subscribe((function (data) {
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
    DialogRentalFurnitureComponent.prototype.addDocument = function () {
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
                result.rentalFurnitureCoordinationId = _this.rentalData.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    DialogRentalFurnitureComponent.prototype.deleteDocument_DB = function (id) {
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
                _this._services.service_general_delete("RelocationServices/DeleteDocumentRFC?id=" + id).subscribe((function (data) {
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
    DialogRentalFurnitureComponent.prototype.deleteDocument_LOCAL = function (position) {
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
    //DOCUMENT TYPE//
    DialogRentalFurnitureComponent.prototype.getDocument = function (id) {
        for (var i = 0; i < this.ca_document.length; i++) {
            if (this.ca_document[i].id == id) {
                return this.ca_document[i].documentType;
            }
        }
    };
    //NACIONALITY//
    DialogRentalFurnitureComponent.prototype.getNacionality = function (id) {
        for (var i = 0; i < this.nacionality.length; i++) {
            if (this.nacionality[i].id == id) {
                return this.nacionality[i].name;
            }
        }
    };
    DialogRentalFurnitureComponent.prototype.getInfo = function () {
        for (var i = 0; i < this.supplier_get.length; i++) {
            if (this.supplier_get[i].id == this.rentalData.supplierPartner) {
                this.info = this.supplier_get[i];
                console.log(this.info);
            }
        }
    };
    DialogRentalFurnitureComponent.prototype.getInfoMain = function () {
        for (var i = 0; i < this.main.length; i++) {
            if (this.main[i].id == this.rentalData.mainContact) {
                this.infomain = this.main[i];
                console.log(this.infomain);
            }
        }
    };
    DialogRentalFurnitureComponent.prototype.getMain = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetAdministrativeContactsServiceBySupplierPartner?workOrderService=" + this.rentalData.workOrderServicesId + "&supplierPartner=" + this.rentalData.supplierPartner).subscribe((function (data) {
            if (data.success) {
                _this.main = data.result.value;
                _this.getInfoMain();
            }
        }));
    };
    DialogRentalFurnitureComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    DialogRentalFurnitureComponent.prototype.save = function () {
        var _this = this;
        console.log("SAVE INFORMATION: ", this.rentalData);
        this.rentalData.documentRentalFurnitureCoordinations = this.temporalDocument;
        this.rentalData.updateBy = this.user.id;
        this.rentalData.updatedDate = new Date();
        this.rentalData.createdBy = this.user.id;
        this.rentalData.createdDate = new Date();
        var data_comment_aux = this.rentalData.commentRentalFurnitureCoordinations;
        this.rentalData.commentRentalFurnitureCoordinations = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.rentalData.commentRentalFurnitureCoordinations.push(data_comment_aux[i]);
            }
        }
        console.log(this.rentalData);
        this.temporalDocument = [];
        this.__loader__.showLoader();
        this._services.service_general_put("RelocationServices/PutRentalFurnitureCoordinaton", this.rentalData).subscribe((function (data) {
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
                _this.__loader__.hideLoader();
                _this.ngOnInit();
            }
        }));
    };
    //PRIVACY//
    DialogRentalFurnitureComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    DialogRentalFurnitureComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-rental-furniture',
            templateUrl: './dialog-rental-furniture.component.html',
            styleUrls: ['./dialog-rental-furniture.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogRentalFurnitureComponent);
    return DialogRentalFurnitureComponent;
}());
exports.DialogRentalFurnitureComponent = DialogRentalFurnitureComponent;
