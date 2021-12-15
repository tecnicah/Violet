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
exports.NotificationDialog = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("../../../../app/shared/loader");
var dialog_request_payment_component_1 = require("../dialog-request-payment/dialog-request-payment.component");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var NotificationDialog = /** @class */ (function () {
    function NotificationDialog(dialogRef, _services, _routerParams, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.data = data;
        this._dialog = _dialog;
        this.displayedColumnsPayment = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date', 'Status', 'action'];
        this.show = false;
        this.loader = new loader_1.LoaderComponent();
        this.document = [];
        //**********CATALOGOS********//
        this.ca_estatus = [];
        this.ca_country = [];
        this.ca_city = [];
        this.ca_type_service = [];
        this.ca_applicant = [];
        this.ca_type_services = [];
    }
    NotificationDialog.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("modal notification: ", this.data);
                        this.loader.showLoader();
                        this.user = JSON.parse(localStorage.getItem("userData"));
                        return [4 /*yield*/, this.get_catalogos()];
                    case 1:
                        _a.sent();
                        console.log("=====>", this.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    //***********************************************************************************************************************//
    //**OBTENEMOS INFORMACION DE LOS CATALOGOS**//this.data.app_id
    NotificationDialog.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this._services.service_general_get("ImmigrationServices/GetNotificationById?id=" + this.data.sr_id).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        //console.log(data);
                                        if (data.success) {
                                            this.notification = data.result;
                                            console.log("DATA NOTIFICATION: ", this.notification);
                                            this.get_payment();
                                            //console.log(this.data_general);
                                            if (this.notification.commentNotifications.length == 0) {
                                                this.addReply();
                                            }
                                        }
                                        return [4 /*yield*/, this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.app_id).subscribe((function (data) {
                                                //console.log(data);
                                                if (data.success) {
                                                    _this.ca_applicant = data.applicant.value;
                                                }
                                            }))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _g.sent();
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 2:
                        _a.ca_requestType = _g.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetStatus")];
                    case 3:
                        _b.ca_estatus = _g.sent();
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=9").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_estatus = data.result;
                            }
                        }));
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetCountry")];
                    case 4:
                        _c.ca_country = _g.sent();
                        //this.ca_document_type = await this._services.getCatalogueFrom("GetDocumentType");
                        this._services.service_general_get('Catalogue/GetDocumentType/2').subscribe((function (data) {
                            if (data.success) {
                                _this.ca_document_type = data.result;
                                console.log(_this.ca_document_type);
                            }
                        }));
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetSupplier")];
                    case 5:
                        _d.ca_suplier = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetTypeService")];
                    case 6:
                        _e.ca_type_services = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetNotificationType")];
                    case 7:
                        _f.ca_notification = _g.sent();
                        this.loader.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    //***********************************************************************************************************************//
    //**CONSULTA PAYMENT**//
    NotificationDialog.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.notification.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                _this.table_payments = data.result.value;
                console.log(data);
                _this.show = true;
            }
        }));
    };
    //***********************************************************************************************************************//
    //**METHODS DOCUMENT (NEW)**//
    NotificationDialog.prototype.AddDocument = function () {
        var _this = this;
        this.data.typeDocument = 2;
        this.data.sr = this.data.app_id;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.notificationId = _this.notification.id;
                _this.document.push(result);
                console.log(_this.document);
            }
        });
    };
    //**DELETE DOCUMENT**//
    NotificationDialog.prototype.removeDocument = function (i, id) {
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
                    _this.document.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("ImmigrationServices/DeleteDocumentN?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "information deleted"
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
    //**END METHODS DOCUMENTS**//
    //***********************************************************************************************************************//
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    NotificationDialog.prototype.addPayment = function (data) {
        var _this = this;
        console.log(this.data, this.notification);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.notification.workOrderServicesId,
                workOrder: this.data.data.workOrderId,
                service: this.data.data.id_server,
                id: 0,
                type: 1,
                supplierType: 3
            };
        }
        else {
            data.type = 1;
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
        });
    };
    NotificationDialog.prototype.deletePaymentConcept = function (data) {
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
    //***********************************************************************************************************************//
    //**EDIT PAYMENT**//
    NotificationDialog.prototype.editPayment = function (data) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_request_payment_component_1.DialogRequestPaymentComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_payment();
        });
    };
    //***********************************************************************************************************************//
    //**METHODS COMMENTS (NEW)**//
    NotificationDialog.prototype.addReply = function () {
        console.log(this.user);
        this.notification.commentNotifications.push({
            "id": 0,
            "notificationId": this.data.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
    };
    NotificationDialog.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.sr,
                document: document,
                name_section: "only_one_service"
            }
        });
    };
    //***********************************************************************************************************************//
    //**METHODS REMINDER (NEW)**//
    NotificationDialog.prototype.addReminder = function () {
        this.notification.reminderNotifications.push({
            "id": 0,
            "notificationId": this.notification.id,
            "reminderDate": null,
            "reminderComments": null,
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    //**DELETE REMINDER**//
    NotificationDialog.prototype.removeReminder = function (i, id) {
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
                    _this.notification.reminderNotifications.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("ImmigrationServices/DeleteReminderN?id=" + id).subscribe((function (data) {
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
            }
        });
    };
    //**END METHODS REMINDER**//
    //***********************************************************************************************************************//
    NotificationDialog.prototype.save_data = function () {
        var _this = this;
        console.log("Informacion a guardar:  ", this.notification);
        this.notification.updateBy = this.user.id;
        this.notification.documentNotifications = this.document;
        this.notification.updateDate = new Date();
        var data_comment_aux = this.notification.commentNotifications;
        this.notification.commentNotifications = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                data_comment_aux[i].user.profileUsers = [];
                this.notification.commentNotifications.push(data_comment_aux[i]);
            }
        }
        this._services.service_general_put("ImmigrationServices/PutNotification", this.notification).subscribe((function (data) {
            if (data.success) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Information saved"
                    },
                    width: "350px"
                });
                _this.dialogRef.close();
                _this.document = [];
                _this.ngOnInit();
            }
        }));
    };
    //***********************************************************************************************************************//
    //GET DOCUMENT TYPE NAME//
    NotificationDialog.prototype.getDocumentTypeName = function (id) {
        for (var i = 0; i < this.ca_document_type.length; i++) {
            if (this.ca_document_type[i].id == id) {
                return this.ca_document_type[i].documentType;
            }
        }
    };
    //***********************************************************************************************************************//
    //GET COUNTRY ORIGIN NAME//
    NotificationDialog.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.ca_country.length; i++) {
            if (this.ca_country[i].id == id) {
                return this.ca_country[i].name;
            }
        }
    };
    NotificationDialog = __decorate([
        core_1.Component({
            selector: 'notification-dialog',
            templateUrl: './notification.component.html',
            styleUrls: ['./notification.component.scss']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], NotificationDialog);
    return NotificationDialog;
}());
exports.NotificationDialog = NotificationDialog;
