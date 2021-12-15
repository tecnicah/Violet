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
exports.OtherComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var OtherComponent = /** @class */ (function () {
    function OtherComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.loader = new loader_1.LoaderComponent();
        this.show = false;
        this.calculo = {};
        this.catalog_status = [];
        this.catalog_currency = [];
        this.payments_table_fields = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.image_path = this._services.url_images;
        this.document = [];
        this.documentType = [];
        this.country_catalogue = [];
        this.payments = [];
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.today_date = new Date();
        this.dataOther = new dataOtherModel();
        this.ca_privacy = [];
        // commet
        this.comment_string = new SingleComment();
    }
    OtherComponent.prototype.ngOnInit = function () {
        this.loader.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        console.log("Data que recibe el modal:", this.data);
        this.idDataOther = this.data.data.service[0].id;
        console.log('id', this.data.data.service[0].id);
        this.getDataOther();
    };
    OtherComponent.prototype.getDataOther = function () {
        var _this = this;
        this.getCatalog();
        this._services.service_general_get("RelocationServices/GetOtherById?id=" + this.idDataOther).subscribe(function (resp) {
            if (resp.success) {
                _this.loader.hideLoader();
                _this.dataOther = resp.result;
                _this.getdeliver();
                _this.get_payment();
                console.log('home sale', _this.dataOther);
            }
        }, function (error) {
            console.log('error GetOther', error);
        });
    };
    OtherComponent.prototype.getdeliver = function () {
        var _this = this;
        this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.dataOther.workOrderServices).subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.dataDeliver = data.result.value;
            }
        }));
        // GetDeliverTo?wos=2041
    };
    OtherComponent.prototype.getCatalog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.show = true;
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        _a.ca_privacy = _d.sent();
                        //this.catalog_status = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=26").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.catalog_status = data.result;
                            }
                        }));
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 2:
                        _b.catalog_currency = _d.sent();
                        //this.documentType = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((function (data) {
                            if (data.success) {
                                _this.documentType = data.result;
                                console.log(_this.documentType);
                            }
                        }));
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 3:
                        _c.country_catalogue = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // seccion documentos
    OtherComponent.prototype.AddDocument = function () {
        var _this = this;
        this.data.typeDocument = 1;
        this.data.location = this.data.data.location;
        // this.data.sr = this.data.app_id;
        var dialogRef = this._dialog.open(dialog_documents_relocation_component_1.DialogDocumentsRelocationComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.other = _this.dataOther.id;
                _this.document.push(result);
                console.log(_this.document);
            }
        });
    };
    //**DELETE DOCUMENT**//
    OtherComponent.prototype.removeDocument = function (i, id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete Document?"
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
                    _this._services.service_general_delete("RelocationServices/DeleteDocumentOther?id=" + id).subscribe((function (data) {
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
    // show document
    OtherComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    //GET DOCUMENT TYPE NAME//
    OtherComponent.prototype.getDocumentTypeName = function (id) {
        for (var i = 0; i < this.documentType.length; i++) {
            if (this.documentType[i].id == id) {
                return this.documentType[i].documentType;
            }
        }
    };
    //GET COUNTRY ORIGIN NAME//
    OtherComponent.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    // inicio de request payment
    // edit payment
    //++++++++ consulta payment
    OtherComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.dataOther.workOrderServices).subscribe((function (data) {
            if (data.success) {
                console.log('datos de tabla request', data);
                _this.calculo = data.result.value;
                _this.calculo.total = _this.calculo.ammountSubTotal + _this.calculo.managementFeeSubTotal + _this.calculo.wireFeeSubTotal + _this.calculo.advanceFeeSubTotal;
                _this.payments = data.result.value.payments;
                // console.log('datos de la tabla' + data.result.value.payments);
            }
            console.log('2° datos de la tabla', _this.payments);
        }));
    };
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    OtherComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.dataOther.workOrderServices);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.dataOther.workOrderServices,
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
    OtherComponent.prototype.editPayment = function (data) {
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
    OtherComponent.prototype.deletePaymentConcept = function (data) {
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
    OtherComponent.prototype.addNewComment = function () {
        var new_comment = new commentOthersModel();
        new_comment.id = 0;
        new_comment.other = this.dataOther.id;
        new_comment.comment = this.comment_string.comment;
        new_comment.createdBy = this.user_data.id;
        new_comment.createdDate = this.today_date;
        new_comment.updatedBy = this.user_data.id;
        new_comment.updatedDate = this.today_date;
        new_comment.createdByNavigation = this.user_data;
        this.dataOther.commentOthers.push(new_comment);
        this.comment_string.comment = '';
    };
    // reminder
    OtherComponent.prototype.deleteReminderSelected = function (reminder, index) {
        var _this = this;
        if (reminder.id == 0) {
            this.dataOther.reminderOthers.splice(index, 1);
        }
        else {
            this.loader.showLoader();
            this._services.service_general_delete("RelocationServices/DeleteOther?id=" + reminder.id)
                .subscribe(function (response) {
                console.log('Res ==> ', response);
                if (response.success) {
                    var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Reminder Deleted",
                            body: "Reminder has been deleted successfully."
                        }
                    });
                    _this.getDataOther();
                }
            }, function (error) {
                console.error('Error (DeleteReminderTHC) => ', error);
            });
        }
    };
    OtherComponent.prototype.addNewReminder = function () {
        var reminder_model = new reminderOthersModel();
        reminder_model.createdBy = this.user_data.id;
        reminder_model.createdDate = new Date();
        reminder_model.other = this.dataOther.id;
        this.dataOther.reminderOthers.push(reminder_model);
    };
    OtherComponent.prototype.save = function () {
        var _this = this;
        console.log("Informacion a guardar:  ", this.dataOther);
        this.dataOther.updatedBy = this.user.id;
        this.dataOther.documentOthers = this.document;
        this.dataOther.updatedDate = new Date();
        for (var com = 0; com < this.dataOther.commentOthers.length; com++) {
            var element = this.dataOther.commentOthers[com];
            if (element.id == 0) {
                delete element.createdByNavigation;
            }
        }
        this._services.service_general_put("RelocationServices/PutOther", this.dataOther).subscribe((function (data) {
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
    //PRIVACY//
    OtherComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    OtherComponent = __decorate([
        core_1.Component({
            selector: 'app-other',
            templateUrl: './other.component.html',
            styleUrls: ['./other.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], OtherComponent);
    return OtherComponent;
}());
exports.OtherComponent = OtherComponent;
var dataOtherModel = /** @class */ (function () {
    function dataOtherModel() {
        this.id = 0;
        this.workOrderServices = 0;
        this.coordination = true;
        this.deliverTo = 0;
        this.statusId = 0;
        this.description = "";
        this.createdBy = 0;
        this.updatedBy = 0;
        this.commentOthers = [];
        this.documentOthers = [];
        this.reminderOthers = [];
    }
    return dataOtherModel;
}());
var commentOthersModel = /** @class */ (function () {
    function commentOthersModel() {
        this.id = 0;
        this.other = 0;
        this.comment = "";
        this.createdBy = 0;
        this.updatedBy = 0;
        this.createdByNavigation = [];
    }
    return commentOthersModel;
}());
var documentOthersModel = /** @class */ (function () {
    function documentOthersModel() {
        this.id = 0;
        this.other = 0;
        this.fileName = "";
        this.fileRequest = "";
        this.fileExtension = "";
        this.documentType = 0;
        this.relationship = 0;
        this.issuingAuthority = "";
        this.countryOrigin = 0;
        this.comment = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return documentOthersModel;
}());
var reminderOthersModel = /** @class */ (function () {
    function reminderOthersModel() {
        this.id = 0;
        this.other = 0;
        this.reminderComments = "";
        this.createdBy = 0;
        this.updatedBy = 0;
    }
    return reminderOthersModel;
}());
var createdByNavigationModel = /** @class */ (function () {
    function createdByNavigationModel() {
        this.id = 0;
        this.email = "";
        this.name = "";
        this.lastName = "";
        this.motherLastName = "";
        this.mobilePhone = "";
        this.avatar = "";
        this.reset = true;
        this.token = "";
        this.status = true;
        this.clientName = "";
        this.userType = [];
    }
    return createdByNavigationModel;
}());
var userTypeModel = /** @class */ (function () {
    function userTypeModel() {
        this.id = 0;
        this.type = "";
    }
    return userTypeModel;
}());
var SingleComment = /** @class */ (function () {
    function SingleComment() {
        this.comment = '';
    }
    return SingleComment;
}());
