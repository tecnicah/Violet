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
exports.DialogLegalReviewConsultation = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("../../../../app/shared/loader");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var DialogLegalReviewConsultation = /** @class */ (function () {
    function DialogLegalReviewConsultation(dialogRef, _services, _routerParams, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.data = data;
        this._dialog = _dialog;
        this.loader = new loader_1.LoaderComponent();
        this.show = false;
        this.cRequestType = [];
        this.cr = 'Reply';
        this.document = [];
        this.__loader__ = new loader_1.LoaderComponent();
        this.today_date = new Date();
        this.image_path = this._services.url_images;
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.legal_model = new LegalReviewModelU();
        this.payments_table_data = undefined;
        this.payments_table_fields = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.is_any_payment = false;
        //**END METHODS DOCUMENTS**//
        this.status_catalogue = [];
        this.country_catalogue = [];
        this.applicant_catalogue = [];
        this.servicetype_catalogue = [];
        this.caDocumentType = [];
        this.comment_string = new SingleComment();
    }
    DialogLegalReviewConsultation.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.showLoader();
        this.initPageSettings();
        this._services.service_general_get("Catalogue/GetRequestType").subscribe(function (data) {
            if (data.success) {
                _this.cRequestType = data.result;
            }
        });
    };
    DialogLegalReviewConsultation.prototype.initPageSettings = function () {
        var _this = this;
        this.getCatalogues();
        this._services.service_general_get("ImmigrationServices/GetLegalReviewById?id=" + this.data.data.service[0].id)
            .subscribe(function (response) {
            console.log('Response ===> ', response);
            if (response.success) {
                _this.legal_model = response.result;
                _this.loader.hideLoader();
                _this.initDocumentsSettings();
                _this.initMainModelSettings();
                _this.requestPaymentsData();
                console.log('this.legal_model ===> ', _this.legal_model);
                if (_this.legal_model.commentLegalReviews.length == 0) {
                    _this.addReply();
                }
            }
        }, function (error) {
            console.error('Error (GetLegalReviewById) => ', error);
        });
    };
    DialogLegalReviewConsultation.prototype.initMainModelSettings = function () {
        var date_accep = this.legal_model.authoAcceptanceDate.split('-')[0];
        if (date_accep == '0001')
            this.legal_model.authoAcceptanceDate = '';
    };
    DialogLegalReviewConsultation.prototype.initDocumentsSettings = function () {
        this.legal_model.documentLegalReviews.forEach(function (document) {
            document.local = false;
        });
    };
    DialogLegalReviewConsultation.prototype.requestPaymentsData = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.legal_model.workOrderServicesId).subscribe((function (data) {
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
    DialogLegalReviewConsultation.prototype.addNewReminder = function () {
        var reminder_model = new ReminderLegalReviews();
        reminder_model.createdBy = this.user_data.id;
        reminder_model.legalReviewId = this.legal_model.id;
        this.legal_model.reminderLegalReviews.push(reminder_model);
    };
    DialogLegalReviewConsultation.prototype.updateLegalReview = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.filteringDocuments();
        var data_comment_aux = this.legal_model.commentLegalReviews;
        this.legal_model.commentLegalReviews = [];
        this.legal_model.documentLegalReviews = this.document;
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                data_comment_aux[i].user.profileUsers = [];
                this.legal_model.commentLegalReviews.push(data_comment_aux[i]);
            }
        }
        console.log('Data sent ==> ', this.legal_model);
        this._services.service_general_put('ImmigrationServices/PutLegalReview', this.legal_model)
            .subscribe(function (response) {
            if (response.success) {
                _this.initPageSettings();
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Success',
                        body: 'Legal Review has been uploaded successfully.'
                    },
                    width: "350px"
                });
                _this.dialogRef.close();
                _this.document = [];
                _this.ngOnInit();
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (PutLegalReview) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogLegalReviewConsultation.prototype.filteringDocuments = function () {
        this.legal_model.documentLegalReviews =
            this.legal_model.documentLegalReviews.filter(function (document_in) {
                if (document_in.local) {
                    return document_in;
                }
            });
    };
    DialogLegalReviewConsultation.prototype.deleteReminderSelected = function (reminder, index_reminder) {
        var _this = this;
        if (reminder.id != 0) {
            this.__loader__.showLoader();
            this._services.service_general_delete_with_url("ImmigrationServices/DeleteReminderLR?id=" + reminder.id)
                .subscribe(function (response) {
                if (response.success) {
                    _this.__loader__.hideLoader();
                    _this.legal_model.reminderLegalReviews.splice(index_reminder, 1);
                }
            }, function (error) {
                console.error('Error (DeleteReminderN) => ', error);
                _this.__loader__.hideLoader();
            });
        }
        else {
            this.legal_model.reminderLegalReviews.splice(index_reminder, 1);
        }
    };
    DialogLegalReviewConsultation.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.app_id,
                document: document,
                name_section: "only_one_service"
            }
        });
    };
    DialogLegalReviewConsultation.prototype.getDocumentTypeName = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    DialogLegalReviewConsultation.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    DialogLegalReviewConsultation.prototype.AddDocument = function () {
        var _this = this;
        this.data.sr = this.data.app_id;
        this.data.typeDocument = 2;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.data.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.legalReviewId = _this.legal_model.id;
                _this.document.push(result);
                console.log(_this.document);
            }
        });
    };
    //**DELETE DOCUMENT**//
    DialogLegalReviewConsultation.prototype.removeDocument = function (i, id) {
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
                if (id == 0) {
                    _this.document.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("ImmigrationServices/DeleteDocumentLR?id=" + id).subscribe((function (data) {
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
    DialogLegalReviewConsultation.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        //this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=10").subscribe((function (data) {
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
                        //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get("Catalogue/GetDocumentType/2").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.caDocumentType = data.result;
                            }
                        }));
                        this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.app_id)
                            .subscribe(function (response) {
                            if (response.success) {
                                _this.applicant_catalogue = response.applicant.value;
                            }
                        }, function (error) {
                            console.log('Error () => ', error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogLegalReviewConsultation.prototype.requestPayment = function (data) {
        var _this = this;
        if (data === void 0) { data = null; }
        console.log(this.data.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.legal_model.workOrderServicesId,
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
    DialogLegalReviewConsultation.prototype.deletePaymentConcept = function (data) {
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
    // public addNewComment():void {
    //   const new_comment:CommentLegalReviews = new CommentLegalReviews();
    //   new_comment.reply = this.comment_string.comment;
    //   new_comment.createdBy = this.user_data.id;
    //   new_comment.createdDate = this.today_date;
    //   new_comment.legalReviewId = this.legal_model.id;
    //   new_comment.userId = this.user_data.id;
    //   new_comment.user = this.user_data;
    //   this.legal_model.commentLegalReviews.push( new_comment );
    //   this.comment_string.comment = '';
    // }
    DialogLegalReviewConsultation.prototype.addReply = function () {
        console.log(this.user_data);
        this.legal_model.commentLegalReviews.push({
            "id": 0,
            "legalReviewId": this.data.id,
            "reply": '',
            "userId": this.user_data.id,
            "createdBy": this.user_data.id,
            "createdDate": new Date(),
            "updateBy": this.user_data.id,
            "updatedDate": new Date(),
            "user": this.user_data
        });
        if (this.legal_model.commentLegalReviews.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    /* Utilities */
    DialogLegalReviewConsultation.prototype.getValueFromCatalogue = function (catalogue, id_to_find, get_field) {
        var result = '';
        catalogue.forEach(function (item) {
            if (item.id == id_to_find || item.dependentId == id_to_find) {
                result = item[get_field];
            }
        });
        return result;
    };
    DialogLegalReviewConsultation.prototype.getDocumentCountryOrigin = function (id_to_find) {
        return this.getValueFromCatalogue(this.country_catalogue, id_to_find, 'name');
    };
    DialogLegalReviewConsultation.prototype.documentTypename = function (id) {
        console.log(id, this.caDocumentType);
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    DialogLegalReviewConsultation.prototype.readDeliverTo = function (id_to_find) {
        return this.getValueFromCatalogue(this.applicant_catalogue, id_to_find, 'relationship');
    };
    DialogLegalReviewConsultation.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    DialogLegalReviewConsultation = __decorate([
        core_1.Component({
            selector: 'legal-consultation-dialog',
            templateUrl: './legal-review-consultation.component.html',
            styleUrls: ['./legal-review-consultation.component.scss']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogLegalReviewConsultation);
    return DialogLegalReviewConsultation;
}());
exports.DialogLegalReviewConsultation = DialogLegalReviewConsultation;
var LegalReviewModelU = /** @class */ (function () {
    function LegalReviewModelU() {
        this.authoDate = '';
        this.authoAcceptanceDate = '';
        this.applicantId = '';
        this.applicantName = '';
        this.statusId = '';
        this.name = '';
        this.workOrderServicesId = 0;
        this.serviceCompletionDate = '';
        this.hostCountryId = '';
        this.billiableHours = '';
        this.comment = '';
        this.createdBy = 0;
        this.createdDate = '';
        this.updatedBy = 0;
        this.updatedDate = '';
        this.commentLegalReviews = [];
        this.documentLegalReviews = [];
        this.reminderLegalReviews = [];
    }
    return LegalReviewModelU;
}());
var CommentLegalReviews = /** @class */ (function () {
    function CommentLegalReviews() {
        this.id = 0;
        this.legalReviewId = 0;
        this.reply = '';
        this.userId = 0;
        this.createdBy = 0;
        this.createdDate = undefined;
        this.updateBy = 0;
        this.updatedDate = undefined;
        this.user = new UserModel();
    }
    return CommentLegalReviews;
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
        this.status = true;
        this.profileUsers = [];
    }
    return UserModel;
}());
var DocumentLegalReviews = /** @class */ (function () {
    function DocumentLegalReviews() {
        this.id = 0;
        this.legalReviewId = 0;
        this.fileName = '';
        this.fileRequest = '';
        this.fileExtension = '';
        this.createdDate = '';
        this.createdBy = 0;
        this.updatedDate = '';
        this.issueDate = '';
        this.expirationDate = '';
        this.issuingAuthority = '';
        this.countryOrigin = '';
        this.local = true;
    }
    return DocumentLegalReviews;
}());
var ReminderLegalReviews = /** @class */ (function () {
    function ReminderLegalReviews() {
        this.id = 0;
        this.legalReviewId = 0;
        this.reminderDate = '';
        this.reminderComments = '';
        this.createdBy = 0;
        this.createdDate = new Date();
    }
    return ReminderLegalReviews;
}());
var SingleComment = /** @class */ (function () {
    function SingleComment() {
        this.comment = '';
    }
    return SingleComment;
}());
