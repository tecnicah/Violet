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
exports.SettlingInComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../general-message/general-message.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var SettlingInComponent = /** @class */ (function () {
    function SettlingInComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.calculo = {};
        this.vista = false;
        this.settlingin = {};
        this.user = {};
        this.cestatus = [];
        this.temporalDocument = [];
        this.table_payments = [];
        this.ca_requestType = [];
        this.caDocumentType = [];
        this.caCountry = [];
        this.cRequestType = [];
        this.allUser = [];
        this.CleaningCompanySupplier = [];
        this.ChildCareSupplier = [];
        this.ChildPArtner = [];
        this.CleaningCompanyPartner = [];
        this.cr = "Reply";
        this.dataSource = [];
        this.displayedColumns = ['Requested By', 'Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
        this.dataSourcePayment = [];
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.__loader__ = new loader_1.LoaderComponent();
        this.ca_privacy = [];
        //**********************************************************************************//
        //documents
        this.files = [];
    }
    SettlingInComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log('datat user', this.user);
        this.catalogos();
    };
    SettlingInComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.__loader__.showLoader();
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        _a.ca_privacy = _b.sent();
                        //this.cestatus = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=14").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.cestatus = data.result;
                            }
                        }));
                        /*
                        this.CleaningCompanySupplier = await this._services.getCatalogueFrom('GetSupplier');
                        this.ChildCareSupplier = this.CleaningCompanyPartner;
                        */
                        //console.log("supplier: ",this.CleaningCompanySupplier);
                        this._services.service_general_get('User').subscribe(function (r) {
                            _this.allUser = r.result;
                        });
                        this._services.service_general_get('RelocationServices/GetSettlingInById?id=' + this.data.data.service[0].id).subscribe((function (data) {
                            if (data.success) {
                                _this.settlingin = data.result;
                                _this.get_supplierPartner();
                                _this.vista = true;
                                if (_this.settlingin.commentSettlingIns.length == 0) {
                                    _this.addReply();
                                }
                                console.log(_this.settlingin);
                                _this.__loader__.hideLoader();
                                _this.get_payment();
                            }
                        }));
                        /*
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=15').subscribe(r => {
                          if (r.success) {
                            this.CleaningCompanySupplier = r.result;
                          }
                        })
                    
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=15').subscribe(r => {
                          if (r.success) {
                            this.ChildCareSupplier = r.result;
                          }
                        })
                        */
                        this.documentoscatalogos();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettlingInComponent.prototype.documentoscatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((function (data) {
                            if (data.success) {
                                _this.caDocumentType = data.result;
                                console.log(_this.caDocumentType);
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCountry = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //**CONSULTA SUPPLIER PARTNER**//
    SettlingInComponent.prototype.get_supplierPartner = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=" + this.settlingin.workOrderServicesId + "&supplierType=1&serviceLine=2").subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.CleaningCompanySupplier = data.result.value;
            }
        }));
    };
    ///Documents catalogos
    SettlingInComponent.prototype.documentType = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    SettlingInComponent.prototype.countryOrigin = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].name;
            }
        }
    };
    SettlingInComponent.prototype.getChildPArtner = function (supplierTypeId) {
        var _this = this;
        this._services.service_general_get('Catalogue/GetSupplierBySupplierType?key=' + supplierTypeId).subscribe(function (r) {
            if (r.success) {
                _this.ChildPArtner = r.result;
            }
        });
    };
    SettlingInComponent.prototype.getCleaningCompanyPartner = function (supplierTypeId) {
        var _this = this;
        this._services.service_general_get('Catalogue/GetSupplierBySupplierType?key=' + supplierTypeId).subscribe(function (r) {
            if (r.success) {
                _this.CleaningCompanyPartner = r.result;
            }
        });
    };
    SettlingInComponent.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.settlingin.workOrderServicesId).subscribe((function (data) {
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
    //**METHODS COMMENTS (NEW)**//
    SettlingInComponent.prototype.addReply = function () {
        console.log(this.user);
        this.settlingin.commentSettlingIns.push({
            "id": 0,
            "settlingInId": this.settlingin.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.settlingin.commentSettlingIns.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    //**********************************************************************************//
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    SettlingInComponent.prototype.addPayment = function () {
        var _this = this;
        var data = {
            serviceRecord: this.data.data.serviceRecordId,
            sr: this.data.data.serviceRecordId,
            workOrderServices: this.settlingin.workOrderServicesId,
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
    SettlingInComponent.prototype.editPayment = function (data) {
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
    SettlingInComponent.prototype.deletePaymentConcept = function (data) {
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
    SettlingInComponent.prototype.dropped = function (files) {
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
                            var dialogRef = _this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
                                data: {
                                    sr: _this.data.sr
                                },
                                width: "95%"
                            });
                            dialogRef.afterClosed().subscribe(function (result) {
                                if (result.success) {
                                    _this.temporalDocument.push({
                                        "id": 0,
                                        "fileRequest": encoded,
                                        "fileExtension": ext[1],
                                        "documentType": result.documentType,
                                        "relationship": result.relationship,
                                        "issueDate": result.issueDate,
                                        "expirationDate": result.expirationDate,
                                        "issuingAuthority": result.issuingAuthority,
                                        "countryOrigin": result.countryOrigin,
                                        "comment": result.comment,
                                        "settlingInId": _this.settlingin.id,
                                        "createdBy": _this.user.id,
                                        "createdDate": new Date()
                                    });
                                }
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
    SettlingInComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    SettlingInComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    //reminders
    SettlingInComponent.prototype.addRemminder = function () {
        if (this.settlingin.reminderSettlingIns) { }
        else {
            this.settlingin.reminderSettlingIns = [];
        }
        this.settlingin.reminderSettlingIns.push({
            "id": 0,
            "settlingInId": this.settlingin.id,
            "reminderDate": "",
            "reminderComments": "",
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    SettlingInComponent.prototype.deletereminder = function (i, item) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Reminder?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                if (item.id == 0) {
                    _this.settlingin.reminderSettlingIns.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("RelocationServices/DeleteReminderSI?id=" + item.id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Reminder delete"
                                },
                                width: "350px"
                            });
                        }
                        _this.ngOnInit();
                    }));
                }
            }
        });
    };
    SettlingInComponent.prototype.DeleteOnline = function (id) {
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
                _this._services.service_general_delete("RelocationServices/DeleteDocumentSI?id=" + id).subscribe((function (data) {
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
    SettlingInComponent.prototype.DeleteOnlineof = function (i) {
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
    SettlingInComponent.prototype.addDocument = function () {
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
                result.settlingInId = _this.settlingin.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    SettlingInComponent.prototype.save = function () {
        var _this = this;
        this.settlingin.updateBy = this.user.id;
        this.settlingin.updatedDate = new Date();
        this.settlingin.documentSettlingIns = this.temporalDocument;
        this.__loader__.showLoader();
        var data_comment_aux = this.settlingin.commentSettlingIns;
        this.settlingin.commentSettlingIns = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.settlingin.commentSettlingIns.push(data_comment_aux[i]);
            }
        }
        console.log(this.settlingin);
        this.temporalDocument = [];
        this._services.service_general_put("RelocationServices/PutSettlingIn", this.settlingin).subscribe((function (data) {
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
                _this.ngOnInit();
                _this.__loader__.hideLoader();
            }
        }), function (err) {
            console.log("error: ", err);
            _this.__loader__.hideLoader();
        });
    };
    SettlingInComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    //PRIVACY//
    SettlingInComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    SettlingInComponent = __decorate([
        core_1.Component({
            selector: 'app-settling-in',
            templateUrl: './settling-in.component.html',
            styleUrls: ['./settling-in.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], SettlingInComponent);
    return SettlingInComponent;
}());
exports.SettlingInComponent = SettlingInComponent;
