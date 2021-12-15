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
exports.DialogLocalDocumentationComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var DialogLocalDocumentationComponent = /** @class */ (function () {
    function DialogLocalDocumentationComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.show = false;
        this.__loader__ = new loader_1.LoaderComponent();
        this.cr = 'Reply';
        this.document = [];
        this.comment_DM = [];
        this.reminder_DM = [];
        this.data_card_id = [];
        this.displayedColumnsPayment = ['Description', 'Supplier', 'Amount', "Recurrent", 'Payment Date', 'Due Date', 'Status', 'action'];
    }
    DialogLocalDocumentationComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem("userData"));
        console.log("este es el data =====>", this.data);
        this.getcatalogos();
    };
    //***********************************************************************************************************************//
    //**OBTENEMOS INFORMACION DE LOS CATALOGOS**//
    DialogLocalDocumentationComponent.prototype.getcatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.__loader__.showLoader();
                        return [4 /*yield*/, this._services.service_general_get("ImmigrationServices/GetLocalDocumentationById?id=" + this.data.id_server /*service[0].id*/).subscribe(function (data_) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log("GET PRINCIPAL: ", data_);
                                            if (!data_.success) return [3 /*break*/, 2];
                                            this.DocumentData = data_.result;
                                            this.get_City(this.DocumentData);
                                            this.get_supplierPartner();
                                            return [4 /*yield*/, this._services.service_general_get("ImmigrationServices/GetLocalOrDocumentation?applicantId=" + this.data.deliveredToId + '&category=' + this.data.categoryId + '&service_order_id=' + Number(this.data.workOrderId) + '&type_service=' + Number(this.data.home_host)).subscribe((function (data) {
                                                    //await this._services.service_general_get("ImmigrationServices/GetLocalOrDocumentation?applicantId=" + 183 + '&category=' + 5 + '&service_order_id=' + 258 + '&type_service=' + 1).subscribe((data => {
                                                    if (data.success) {
                                                        console.log(data);
                                                        _this.information_Document_Management = data.result.value.standalone;
                                                        if (_this.information_Document_Management.length == 0) {
                                                            _this.information_Document_Management = data.result.value.bundle;
                                                        }
                                                        _this.comment_DM = _this.information_Document_Management[0].commentLocalDocumentations;
                                                        _this.reminder_DM = _this.information_Document_Management[0].reminderLocalDocumentations;
                                                        _this.id_reminder = _this.information_Document_Management[0].localDocumentation[0].id;
                                                        _this.deliverTo = _this.information_Document_Management[0].localDocumentation[0].relationship;
                                                        _this.workOrderServicesId = _this.information_Document_Management[0].localDocumentation[0].workOrderServicesId;
                                                        _this.name = _this.information_Document_Management[0].localDocumentation[0].applicantName;
                                                        _this.DocumentData.reminderLocalDocumentations = _this.reminder_DM;
                                                        for (var i = 0; i < _this.information_Document_Management.length; i++) {
                                                            var information_card = _this.information_Document_Management[i].localDocumentation;
                                                            console.log("INFORMATION CARD: ", information_card);
                                                            for (var j = 0; j < information_card.length; j++) {
                                                                _this.data_card_id.push(_this.information_Document_Management[i].localDocumentation[j].id);
                                                            }
                                                        }
                                                        if (_this.DocumentData.commentLocalDocumentations.length == 0 && _this.comment_DM.length == 0) {
                                                            _this.addReply();
                                                        }
                                                        _this.__loader__.hideLoader();
                                                    }
                                                    _this.get_payment();
                                                    _this._services.service_general_get("ServiceRecord/GetApplicant/" + _this.data.sr).subscribe((function (data) {
                                                        console.log(data);
                                                        if (data.success) {
                                                            _this.ca_applicant = data.applicant.value;
                                                            console.log(_this.ca_applicant);
                                                        }
                                                    }));
                                                }))];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _c.sent();
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=6").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_estatus = data.result;
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 2:
                        _a.ca_requestType = _c.sent();
                        //this.ca_estatus = await this._services.getCatalogueFrom("GetStatus");
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetCountry")];
                    case 3:
                        //this.ca_estatus = await this._services.getCatalogueFrom("GetStatus");
                        _b.ca_country = _c.sent();
                        //this.ca_document_type = await this._services.getCatalogueFrom("GetDocumentType");
                        this._services.service_general_get("Catalogue/GetDocumentType/2").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_document_type = data.result;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    //***********************************************************************************************************************//
    //**CONSULTA SUPPLIER PARTNER**//
    DialogLocalDocumentationComponent.prototype.get_supplierPartner = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=3").subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.ca_suplier = data.result.value;
            }
        }));
    };
    //***********************************************************************************************************************//
    //**CONSULTA CITY**//
    DialogLocalDocumentationComponent.prototype.get_City = function (data) {
        var _this = this;
        this._services.service_general_get("Catalogue/GetState?country=" + data.hostCountryId).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
    };
    //**CONSULTA PAYMENT**//
    DialogLocalDocumentationComponent.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                _this.table_payments = data.result.value;
                console.log(data);
                _this.show = true;
            }
        }));
    };
    //***********************************************************************************************************************//
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    DialogLocalDocumentationComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log(this.data.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.serviceRecordId,
                sr: this.data.serviceRecordId,
                workOrderServices: this.DocumentData.workOrderServicesId,
                workOrder: this.data.workOrderId,
                service: this.data.id_server,
                id: 0,
                type: 1,
                supplierType: 3
            };
        }
        else {
            data.type = 1;
            data.supplierType = 3;
            data.id = data.requestPaymentId;
            data.serviceRecord = this.data.serviceRecordId;
            data.sr = this.data.serviceRecordId;
            data.service = this.data.id_server;
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
    DialogLocalDocumentationComponent.prototype.deletePaymentConcept = function (data) {
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
    //**METHODS COMMENTS (NEW)**//
    DialogLocalDocumentationComponent.prototype.addReply = function () {
        console.log(this.user);
        this.DocumentData.commentLocalDocumentations.push({
            "id": 0,
            "localDocumentationId": this.DocumentData.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.DocumentData.commentLocalDocumentations.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    //***********************************************************************************************************************//  
    //**METHODS REMINDER (NEW)**//
    DialogLocalDocumentationComponent.prototype.addReminder = function () {
        this.DocumentData.reminderLocalDocumentations.push({
            "id": 0,
            "localDocumentationId": 0,
            "reminderDate": null,
            "reminderComments": null,
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    //**DELETE REMINDER**//
    DialogLocalDocumentationComponent.prototype.removeReminder = function (i, id) {
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
                    _this.DocumentData.reminderLocalDocumentations.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("ImmigrationServices/DeleteReminderLD?id=" + id).subscribe((function (data) {
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
    //**END METHODS REMINDER**//
    //***********************************************************************************************************************//  
    //**METHODS DOCUMENT (NEW)**//
    DialogLocalDocumentationComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    DialogLocalDocumentationComponent.prototype.AddDocument = function (k, i) {
        var _this = this;
        this.data.typeDocument = 2;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.localDocumentationId = _this.information_Document_Management[k].localDocumentation[i].id;
                console.log("result: ", result);
                _this.information_Document_Management[k].localDocumentation[i].documentLocalDocumentations.push(result);
                console.log("Documentos: ", _this.information_Document_Management);
            }
        });
    };
    //**DELETE DOCUMENT**//
    DialogLocalDocumentationComponent.prototype.removeDocument = function (i, k, j, id) {
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
                    console.log(_this.information_Document_Management[i].localDocumentation[k].documentLocalDocumentations);
                    _this.information_Document_Management[i].localDocumentation[k].documentLocalDocumentations.splice(j, 1);
                }
                else {
                    _this._services.service_general_delete("ImmigrationServices/DeleteDocumentLD?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Document deleted"
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
    //**SAVE DATA**//
    DialogLocalDocumentationComponent.prototype.save_data = function () {
        var _this = this;
        var data_to_send = [];
        var aux_reminder = [];
        console.log("INFO GENERAL: ", this.DocumentData);
        //console.log("GUARDAR: ", this.information_Document_Management);
        ///this.DocumentData.forEach(E => {
        var aux_data = this.DocumentData;
        console.log(this.data_card_id);
        var a = [];
        for (var i = 0; i < this.data_card_id.length; i++) {
            for (var j = 0; j < aux_data.reminderLocalDocumentations.length; j++) {
                aux_data.reminderLocalDocumentations[j].localDocumentationId = this.data_card_id[i];
                if (aux_data.reminderLocalDocumentations[j].id === 0) {
                    a.push({
                        "id": 0,
                        "localDocumentationId": this.data_card_id[i],
                        "reminderDate": aux_data.reminderLocalDocumentations[j].reminderDate,
                        "reminderComments": aux_data.reminderLocalDocumentations[j].reminderComments,
                        "createdBy": this.user.id,
                        "createdDate": new Date()
                    });
                }
                else {
                    a.push({
                        "id": aux_data.reminderLocalDocumentations[j].id,
                        "localDocumentationId": this.data_card_id[0],
                        "reminderDate": aux_data.reminderLocalDocumentations[j].reminderDate,
                        "reminderComments": aux_data.reminderLocalDocumentations[j].reminderComments,
                        "createdBy": this.user.id,
                        "createdDate": new Date()
                    });
                }
            }
            aux_reminder.push(a);
            a = [];
        }
        console.log(aux_reminder);
        for (var i = 0; i < this.information_Document_Management.length; i++) {
            var information_card = this.information_Document_Management[i].localDocumentation;
            console.log("INFORMATION CARD: ", information_card);
            for (var j = 0; j < information_card.length; j++) {
                this.information_Document_Management[i].localDocumentation[j].commentLocalDocumentations = this.DocumentData.commentLocalDocumentations;
                this.information_Document_Management[i].localDocumentation[j].reminderLocalDocumentations = aux_reminder[i];
                this.information_Document_Management[i].localDocumentation[j].authoDate = this.DocumentData.authoDate;
                this.information_Document_Management[i].localDocumentation[j].authoAcceptanceDate = this.DocumentData.authoAcceptanceDate;
                //this.information_Document_Management[i].localDocumentation[j].applicantId = this.DocumentData.applicantId;
                this.information_Document_Management[i].localDocumentation[j].name = this.name;
                this.information_Document_Management[i].localDocumentation[j].hostCountryId = this.data.country_city.city_id;
                this.information_Document_Management[i].localDocumentation[j].hostCityId = this.data.country_city.country_id;
                this.information_Document_Management[i].localDocumentation[j].updateBy = this.user.id;
                this.information_Document_Management[i].localDocumentation[j].createdBy = this.user.id;
                this.information_Document_Management[i].localDocumentation[j].createdDate = this.DocumentData.createdDate;
                this.information_Document_Management[i].localDocumentation[j].updatedDate = new Date();
                this.information_Document_Management[i].localDocumentation[j].city = this.information_Document_Management[i].localDocumentation[j].hostCityId;
                this.information_Document_Management[i].localDocumentation[j].country = this.information_Document_Management[i].localDocumentation[j].hostCountryId;
                this.information_Document_Management[i].localDocumentation[j].comment = "";
                data_to_send.push(this.information_Document_Management[i].localDocumentation[j]);
            }
        }
        for (var i = 0; i < data_to_send.length; i++) {
            var doc = data_to_send[i].documentLocalDocumentations;
            for (var j = 0; j < doc.length; j++) {
                if (doc[j].id != 0) {
                    data_to_send[i].documentLocalDocumentations.splice(j, 1);
                }
            }
        }
        for (var i = 0; i < data_to_send.length; i++) {
            var comment = data_to_send[i].commentLocalDocumentations;
            data_to_send[i].commentLocalDocumentations = [];
            for (var j = 0; j < comment.length; j++) {
                if (comment[j].reply != null && comment[j].reply != undefined && comment[j].reply.trim() != '') {
                    comment[j].user.profileUsers = [];
                    data_to_send[i].commentLocalDocumentations.push(comment[j]);
                }
            }
        }
        console.log(data_to_send);
        this._services.service_general_put("ImmigrationServices/PutLocalDocumentation", data_to_send).subscribe((function (data) {
            console.log("guardar db: ", data);
            if (data.success) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Information saved"
                    },
                    width: "350px"
                });
                _this.dialogRef.close();
                _this.ngOnInit();
            }
        }));
    };
    //***********************************************************************************************************************//
    //GET DOCUMENT TYPE NAME//
    DialogLocalDocumentationComponent.prototype.getDocumentTypeName = function (id) {
        for (var i = 0; i < this.ca_document_type.length; i++) {
            if (this.ca_document_type[i].id == id) {
                return this.ca_document_type[i].documentType;
            }
        }
    };
    //***********************************************************************************************************************//
    //GET COUNTRY ORIGIN NAME//
    DialogLocalDocumentationComponent.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.ca_country.length; i++) {
            if (this.ca_country[i].id == id) {
                return this.ca_country[i].name;
            }
        }
    };
    DialogLocalDocumentationComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-local-documentation',
            templateUrl: './dialog-local-documentation.component.html',
            styleUrls: ['./dialog-local-documentation.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogLocalDocumentationComponent);
    return DialogLocalDocumentationComponent;
}());
exports.DialogLocalDocumentationComponent = DialogLocalDocumentationComponent;
