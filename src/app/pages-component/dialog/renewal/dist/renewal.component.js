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
exports.DialogRenewal = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("../../../../app/shared/loader");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var DialogRenewal = /** @class */ (function () {
    function DialogRenewal(dialogRef, _services, _routerParams, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.data = data;
        this._dialog = _dialog;
        this.cr = 'Reply';
        this.show = false;
        this.temporalDocument = [];
        this.caDocumentType = [];
        this.caCountry = [];
        this.cRequestType = [];
        this.__loader__ = new loader_1.LoaderComponent();
        this.today_date = new Date();
        this.image_path = this._services.url_images;
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.renewal_model = new RenewalModel();
        this.payments_table_data = undefined;
        this.payments_table_fields = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.is_any_payment = false;
        this.comment_string = new SingleComment();
        this.status_catalogue = [];
        this.country_catalogue = [];
        this.applicant_catalogue = [];
        this.servicetype_catalogue = [];
        this.city_catalogue = [];
    }
    DialogRenewal.prototype.ngOnInit = function () {
        var _this = this;
        console.log("data modal renewal: ", this.data);
        this.__loader__.showLoader();
        this.initPageSettings();
        this._services.service_general_get("Catalogue/GetRequestType").subscribe(function (data) {
            if (data.success) {
                _this.cRequestType = data.result;
            }
        });
    };
    DialogRenewal.prototype.initPageSettings = function () {
        var _this = this;
        this.getCatalogues();
        console.log('Modelo =========> ', this.renewal_model);
        this._services.service_general_get("ImmigrationServices/GetRenewalById?id=" + this.data.sr_id)
            .subscribe(function (response) {
            console.log('Response ===> ', response);
            if (response.success) {
                _this.renewal_model = response.result;
                _this.__loader__.hideLoader();
                _this.initDocumentsSettings();
                _this.initMainModelSettings();
                _this.requestPaymentsData();
                console.log('this.legal_model ===> ', _this.renewal_model);
                if (_this.renewal_model.commentRenewals.length == 0) {
                    _this.addReply();
                }
            }
        }, function (error) {
            console.error('Error (GetLegalReviewById) => ', error);
        });
    };
    DialogRenewal.prototype.initMainModelSettings = function () {
        var date_accep = this.renewal_model.authoAcceptanceDate.split('-')[0];
        if (date_accep == '0001')
            this.renewal_model.authoAcceptanceDate = '';
    };
    DialogRenewal.prototype.requestPaymentsData = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.renewal_model.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                _this.payments_table_data = data.result.value;
                console.log(data);
                _this.show = true;
                if (_this.payments_table_data.payments.length != 0)
                    _this.is_any_payment = true;
                console.log('Pays ==========> ', _this.is_any_payment);
            }
        }));
    };
    DialogRenewal.prototype.requestPayment = function (data) {
        var _this = this;
        if (data === void 0) { data = null; }
        console.log(this.data.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.renewal_model.workOrderServicesId,
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
            _this.requestPaymentsData();
        });
    };
    DialogRenewal.prototype.deletePaymentConcept = function (data) {
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
                        _this.requestPaymentsData();
                    }
                }));
            }
        });
    };
    //   public addNewComment():void {
    //       const new_comment:CommentRenewalsModel = new CommentRenewalsModel();
    //       new_comment.reply = this.comment_string.comment;
    //       new_comment.createdBy = this.user_data.id;
    //       new_comment.createdDate = this.today_date;
    //       new_comment.renewalId = this.renewal_model.id;
    //       new_comment.userId = this.user_data.id;
    //       new_comment.user = this.user_data;
    //       this.renewal_model.commentRenewals.push( new_comment );
    //       this.comment_string.comment = '';
    // }
    DialogRenewal.prototype.addReply = function () {
        console.log(this.user_data);
        this.renewal_model.commentRenewals.push({
            "id": 0,
            "renewalId": this.renewal_model.id,
            "reply": this.comment_string.comment,
            "userId": this.user_data.id,
            "createdBy": this.user_data.id,
            "createdDate": new Date(),
            "updateBy": this.user_data.id,
            "updatedDate": new Date(),
            "user": this.user_data
        });
        if (this.renewal_model.commentRenewals.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    DialogRenewal.prototype.addNewDocument = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.renewal_model
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var document_data = new DocumentRenewalsModel();
            document_data.id = result.id;
            document_data.fileName = result.fileName;
            document_data.fileExtension = result.fileExtension;
            document_data.fileRequest = result.fileRequest;
            document_data.createdBy = result.createdBy;
            document_data.renewalId = _this.renewal_model.id;
            document_data.updatedDate = result.updatedDate;
            document_data.issueDate = result.issueDate;
            document_data.expirationDate = result.expirationDate;
            document_data.issuingAuthority = result.issuingAuthority;
            document_data.countryOrigin = result.countryOrigin;
            document_data.local = true;
            _this.renewal_model.documentRenewals.push(document_data);
        });
    };
    DialogRenewal.prototype.initDocumentsSettings = function () {
        this.renewal_model.documentRenewals.forEach(function (document) {
            document.local = false;
        });
    };
    DialogRenewal.prototype.addNewReminder = function () {
        var reminder_model = new ReminderRenewalsModel();
        reminder_model.createdBy = this.user_data.id;
        reminder_model.renewalId = this.renewal_model.id;
        this.renewal_model.reminderRenewals.push(reminder_model);
    };
    DialogRenewal.prototype.deleteReminderSelected = function (reminder, index_reminder) {
        var _this = this;
        if (reminder.id != 0) {
            this.__loader__.showLoader();
            this._services.service_general_delete_with_url("ImmigrationServices/DeleteReminderR?id=" + reminder.id)
                .subscribe(function (response) {
                if (response.success) {
                    _this.__loader__.hideLoader();
                    _this.renewal_model.reminderRenewals.splice(index_reminder, 1);
                }
            }, function (error) {
                console.error('Error (DeleteReminderN) => ', error);
                _this.__loader__.hideLoader();
            });
        }
        else {
            this.renewal_model.reminderRenewals.splice(index_reminder, 1);
        }
    };
    DialogRenewal.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    DialogRenewal.prototype.deleteDocumentSelected = function (document_in) {
        var _this = this;
        this.__loader__.showLoader();
        this._services.service_general_delete("ImmigrationServices/DeleteDocumentR?id=" + document_in.id)
            .subscribe(function (response) {
            if (response.success) {
                _this.initPageSettings();
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (DeleteDocumentLR) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    ///Documents catalogos
    DialogRenewal.prototype.documentType = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    DialogRenewal.prototype.countryOrigin = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].name;
            }
        }
    };
    DialogRenewal.prototype.DeleteOnline = function (id) {
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
                _this._services.service_general_delete("ImmigrationServices/DeleteDocumentR?id=" + id).subscribe((function (data) {
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
    DialogRenewal.prototype.addDocument = function () {
        var _this = this;
        this.data.typeDocument = 2;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.data.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.renewalId = _this.renewal_model.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    DialogRenewal.prototype.DeleteOnlineof = function (i) {
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
    DialogRenewal.prototype.updateRenwal = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.renewal_model.documentRenewals = this.temporalDocument;
        var data_comment_aux = this.renewal_model.commentRenewals;
        this.renewal_model.commentRenewals = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                data_comment_aux[i].user.profileUsers = [];
                this.renewal_model.commentRenewals.push(data_comment_aux[i]);
            }
        }
        this._services.service_general_put('ImmigrationServices/PutRenewal', this.renewal_model)
            .subscribe(function (response) {
            console.log('Response update ===> ', response);
            if (response.success) {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Renewal updated',
                        body: 'The Renewal has been successfully updated.'
                    }
                });
                _this.dialogRef.close();
                _this.temporalDocument = [];
                _this.initPageSettings();
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (PutRenewal) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogRenewal.prototype.filteringDocuments = function () {
        this.renewal_model.documentRenewals =
            this.renewal_model.documentRenewals.filter(function (document_in) {
                if (document_in.local) {
                    return document_in;
                }
            });
    };
    /* Utilities */
    DialogRenewal.prototype.getValueFromCatalogue = function (catalogue, id_to_find, get_field) {
        var result = '';
        catalogue.forEach(function (item) {
            if (item.id == id_to_find || item.dependentId == id_to_find) {
                result = item[get_field];
            }
        });
        return result;
    };
    DialogRenewal.prototype.getDocumentCountryOrigin = function (id_to_find) {
        return this.getValueFromCatalogue(this.country_catalogue, id_to_find, 'name');
    };
    DialogRenewal.prototype.readDeliverTo = function (id_to_find) {
        return this.getValueFromCatalogue(this.applicant_catalogue, id_to_find, 'relationship');
    };
    DialogRenewal.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    DialogRenewal.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        //this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=8").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.status_catalogue = data.result;
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.country_catalogue = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTypeService')];
                    case 2:
                        _b.servicetype_catalogue = _c.sent();
                        this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.app_id)
                            .subscribe(function (response) {
                            if (response.success) {
                                _this.applicant_catalogue = response.applicant.value;
                            }
                        }, function (error) {
                            console.log('Error () => ', error);
                        });
                        this.documentoscatalogos();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogRenewal.prototype.documentoscatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get('Catalogue/GetDocumentType/2').subscribe((function (data) {
                            if (data.success) {
                                _this.caDocumentType = data.result;
                                console.log(_this.caDocumentType);
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCountry = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 2:
                        _b.cRequestType = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogRenewal.prototype.getCataloguesAfter = function (id_country) {
        return __awaiter(this, void 0, Promise, function () {
            var params, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = "?country=" + id_country;
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetState', params)];
                    case 1:
                        _a.city_catalogue = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogRenewal = __decorate([
        core_1.Component({
            selector: 'renewal-dialog',
            templateUrl: './renewal.component.html',
            styleUrls: ['./renewal.component.scss']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogRenewal);
    return DialogRenewal;
}());
exports.DialogRenewal = DialogRenewal;
var RenewalModel = /** @class */ (function () {
    function RenewalModel() {
        this.id = 0;
        this.authoDate = '';
        this.authoAcceptanceDate = '';
        this.applicantId = '';
        this.applicantName = '';
        this.statusId = '';
        this.name = '';
        this.workOrderServicesId = 0;
        this.serviceCompletionDate = '';
        this.hostCountryId = 0;
        this.hostCityId = 0;
        this.visaTypeId = 0;
        this.consularServiceId = '';
        this.documentCollectionStartDate = '';
        this.documentCollectionCompletionDate = '';
        this.documentDeliveryDate = '';
        this.applicationSubmissionDate = '';
        this.documentExpirationDate = '';
        this.applicationApprovalDate = '';
        this.appointmentDate = '';
        this.comment = '';
        this.createdBy = 0;
        this.createdDate = '';
        this.updatedBy = 0;
        this.updatedDate = new Date();
        this.serviceTypeId = '';
        this.relationship = '';
        this.commentRenewals = [];
        this.documentRenewals = [];
        this.reminderRenewals = [];
    }
    return RenewalModel;
}());
var CommentRenewalsModel = /** @class */ (function () {
    function CommentRenewalsModel() {
        this.id = 0;
        this.renewalId = 0;
        this.reply = '';
        this.userId = 0;
        this.createdBy = 0;
        this.createdDate = undefined;
        this.updateBy = 0;
        this.updatedDate = new Date();
        this.user = new UserModel();
    }
    return CommentRenewalsModel;
}());
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.id = 0;
        this.email = '';
        this.name = '';
        this.lastName = '';
        this.motherLastName = '';
        this.mobilePhone = '';
        this.avatar = '';
        this.token = '';
        this.status = false;
        this.profileUsers = [];
    }
    return UserModel;
}());
var DocumentRenewalsModel = /** @class */ (function () {
    function DocumentRenewalsModel() {
        this.id = 0;
        this.fileName = '';
        this.fileRequest = '';
        this.fileExtension = '';
        this.documentType = '';
        this.relationship = '';
        this.issueDate = '';
        this.expirationDate = '';
        this.issuingAuthority = '';
        this.countryOrigin = 0;
        this.comment = '';
        this.renewalId = 0;
        this.createdDate = '';
        this.createdBy = 0;
        this.updateBy = 0;
        this.updatedDate = '';
        this.local = true;
    }
    return DocumentRenewalsModel;
}());
var ReminderRenewalsModel = /** @class */ (function () {
    function ReminderRenewalsModel() {
        this.id = 0;
        this.renewalId = 0;
        this.reminderDate = '';
        this.reminderComments = '';
        this.createdBy = '';
        this.createdDate = '';
    }
    return ReminderRenewalsModel;
}());
var SingleComment = /** @class */ (function () {
    function SingleComment() {
        this.comment = '';
    }
    return SingleComment;
}());
