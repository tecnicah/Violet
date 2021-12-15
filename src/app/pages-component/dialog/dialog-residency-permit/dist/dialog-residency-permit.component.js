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
exports.DialogResidencyPermitComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var DialogResidencyPermitComponent = /** @class */ (function () {
    function DialogResidencyPermitComponent(formBuilder, dialogRef, data, _services, _dialog) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.show = false;
        this.calculo = {};
        this.entryVisa = {};
        this.cr = "Reply";
        //Catalogos
        this.cestatus = [];
        this.ccountry = [];
        this.ccity = [];
        this.cappicant = [];
        this.cvisatype = [];
        this.payments = [];
        this.caDocumentType = [];
        this.caCountry = [];
        this.cRequestType = [];
        this.ca_city = [];
        this.dataSource = [];
        this.displayedColumns = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.temporalDocument = [];
        this.__loader__ = new loader_1.LoaderComponent();
        this.files = [];
    }
    DialogResidencyPermitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.__loader__.showLoader();
        console.log(this.data);
        this.user = JSON.parse(localStorage.getItem("userData"));
        this._services.service_general_get("Catalogue/GetState?country=" + this.data.hostCountryId).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
        this.documentoscatalogos();
        this.getcatalogos();
        this.getdata();
    };
    DialogResidencyPermitComponent.prototype.documentoscatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get("Catalogue/GetDocumentType/2").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.caDocumentType = data.result;
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
    DialogResidencyPermitComponent.prototype.getcatalogos = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=4").subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.cestatus = data.result;
            }
        }));
        this._services.service_general_get("Catalogue/GetCountry").subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.ccountry = data.result;
            }
        }));
        this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.cappicant = data.applicant.value;
            }
        }));
        this._services.service_general_get("Catalogue/GetVisaCategory").subscribe((function (data) {
            if (data.success) {
                _this.cvisatype = data.result;
            }
        }));
    };
    DialogResidencyPermitComponent.prototype.getdata = function () {
        var _this = this;
        this._services.service_general_get("ImmigrationServices/GetResidencyPermitById?id=" + this.data.service[0].id).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.getcity(data.result);
            }
        }));
    };
    DialogResidencyPermitComponent.prototype.getcity = function (visa) {
        var _this = this;
        this._services.service_general_get("Catalogue/GetState?country=" + visa.hostCountryId).subscribe((function (data) {
            if (data.success) {
                _this.ccity = data.result;
                _this.entryVisa = visa;
                _this.request();
                _this.show = true;
                _this.__loader__.hideLoader();
                if (_this.entryVisa.commentResidencyPermits.length == 0) {
                    _this.addReply();
                }
            }
        }));
    };
    DialogResidencyPermitComponent.prototype.request = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.entryVisa.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.calculo = data.result.value;
                _this.calculo.total = _this.calculo.ammountSubTotal + _this.calculo.managementFeeSubTotal + _this.calculo.wireFeeSubTotal + _this.calculo.advanceFeeSubTotal;
                _this.payments = data.result.value.payments;
                console.log(_this.payments);
            }
            console.log(_this.payments);
        }));
    };
    DialogResidencyPermitComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    ///Documents catalogos
    DialogResidencyPermitComponent.prototype.documentType = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    DialogResidencyPermitComponent.prototype.countryOrigin = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].name;
            }
        }
    };
    DialogResidencyPermitComponent.prototype.getAppName = function (applicantId) {
        for (var i = 0; i < this.cappicant.length; i++) {
            var element = this.cappicant[i];
            if (element.dependentId = applicantId) {
                return element.name;
            }
        }
    };
    DialogResidencyPermitComponent.prototype.doc = function () {
        document.getElementById("doc").click();
    };
    DialogResidencyPermitComponent.prototype.dropped = function (files) {
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
                            console.log(imageUrl);
                            _this.temporalDocument.push({
                                "id": 0,
                                "fileName": droppedFile.relativePath,
                                "fileRequest": encoded,
                                "residencyPermitId": _this.entryVisa.id,
                                "createdDate": new Date(),
                                "createdBy": _this.user.id,
                                "fileExtension": ext[1]
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
    DialogResidencyPermitComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    DialogResidencyPermitComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    DialogResidencyPermitComponent.prototype.addReminders = function () {
        this.entryVisa.reminderResidencyPermits.push({
            id: 0,
            residencyPermitId: this.entryVisa.id,
            reminderDate: null,
            reminderComments: "",
            createdBy: this.user.id,
            createdDate: new Date()
        });
    };
    DialogResidencyPermitComponent.prototype.removeReminder = function (i, id) {
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
                    _this.entryVisa.reminderResidencyPermits.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("ImmigrationServices/DeleteReminderRP?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: data.result
                                },
                                width: "350px"
                            });
                            _this.getdata();
                        }
                    }));
                }
            }
        });
    };
    DialogResidencyPermitComponent.prototype.DeleteOnline = function (id) {
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
                _this._services.service_general_delete("ImmigrationServices/DeleteDocumentRP?id=" + id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: data.result
                            },
                            width: "350px"
                        });
                        _this.getdata();
                    }
                }));
            }
        });
    };
    DialogResidencyPermitComponent.prototype.DeleteOnlineof = function (i) {
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
    DialogResidencyPermitComponent.prototype.addDocument = function () {
        var _this = this;
        this.data.typeDocument = 2;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.residencyPermitId = _this.entryVisa.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    DialogResidencyPermitComponent.prototype.requestPayment = function (data) {
        var _this = this;
        console.log(this.entryVisa.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.serviceRecordId,
                sr: this.data.serviceRecordId,
                workOrderServices: this.entryVisa.workOrderServicesId,
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
            _this.request();
        });
    };
    DialogResidencyPermitComponent.prototype.deletePaymentConcept = function (data) {
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
                        _this.request();
                        ;
                    }
                }));
            }
        });
    };
    DialogResidencyPermitComponent.prototype.addReply = function () {
        console.log(this.user);
        this.entryVisa.commentResidencyPermits.push({
            "id": 0,
            "residencyPermitId": this.entryVisa.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.entryVisa.commentsWorkPermits.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    DialogResidencyPermitComponent.prototype.save = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.entryVisa.updatedBy = this.user.id;
        this.entryVisa.updatedDate = new Date();
        this.entryVisa.documentResidencyPermits = this.temporalDocument;
        var data_comment_aux = this.entryVisa.commentResidencyPermits;
        this.entryVisa.commentResidencyPermits = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                data_comment_aux[i].user.profileUsers = [];
                this.entryVisa.commentResidencyPermits.push(data_comment_aux[i]);
            }
        }
        console.log(this.entryVisa);
        this._services.service_general_put("ImmigrationServices/PutResidencyPermit", this.entryVisa).subscribe((function (data) {
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
                _this.__loader__.hideLoader();
            }
        }));
    };
    DialogResidencyPermitComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-residency-permit',
            templateUrl: './dialog-residency-permit.component.html',
            styleUrls: ['./dialog-residency-permit.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogResidencyPermitComponent);
    return DialogResidencyPermitComponent;
}());
exports.DialogResidencyPermitComponent = DialogResidencyPermitComponent;
