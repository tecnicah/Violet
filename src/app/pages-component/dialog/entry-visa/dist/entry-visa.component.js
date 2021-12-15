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
exports.EntryVisaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var EntryVisaComponent = /** @class */ (function () {
    function EntryVisaComponent(formBuilder, dialogRef, data, _services, _dialog) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.show = false;
        this.calculo = {};
        this.entryVisa = {};
        this.consultar = false;
        this.cr = "Reply";
        //Catalogos
        this.cestatus = [];
        this.ccountry = [];
        this.ccity = [];
        this.cappicant = [];
        this.cvisatype = [];
        this.dataSource = [];
        this.payments = [];
        this.caDocumentType = [];
        this.caCountry = [];
        this.cRequestType = [];
        this.displayedColumns = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.temporalDocument = [];
        this.__loader__ = new loader_1.LoaderComponent();
        this.ca_city = [];
        this.files = [];
    }
    EntryVisaComponent.prototype.ngOnInit = function () {
        this.__loader__.showLoader();
        this.VisaForm = this.formBuilder.group({
            authoDate: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            authoAcceptanceDate: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            statusId: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            applicantId: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            name: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            serviceCompletionDate: new forms_1.FormControl(null),
            countryId: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            cityId: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            visaTypeId: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            consularServiceId: new forms_1.FormControl(false, forms_1.Validators.compose([forms_1.Validators.required])),
            documentCollectionStartDate: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            documentDeliveryDate: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            documentExpirationDate: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            documentCollectionDompletionDate: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            applicationSubmissionDate: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            applicationApprovalDate: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required])),
            comment: new forms_1.FormControl(null)
        });
        this.Reminders = this.formBuilder.array([{
                reminderDate: new forms_1.FormControl('', forms_1.Validators.required),
                reminderComments: new forms_1.FormControl("")
            }]);
        console.log(this.data);
        this.user = JSON.parse(localStorage.getItem("userData"));
        this.getcatalogos();
        this.getdata();
        if (this.data.type = 1) {
            this.getSupplierPartner();
        }
    };
    EntryVisaComponent.prototype.getcatalogos = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=1").subscribe((function (data) {
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
        this._services.service_general_get("Catalogue/GetRequestType").subscribe((function (data) {
            if (data.success) {
                _this.cRequestType = data.result;
            }
        }));
        this.documentoscatalogos();
    };
    EntryVisaComponent.prototype.getSupplierPartner = function () {
    };
    EntryVisaComponent.prototype.documentoscatalogos = function () {
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
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCity')];
                    case 2:
                        _b.ca_city = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EntryVisaComponent.prototype.getdata = function () {
        var _this = this;
        this._services.service_general_get("ImmigrationServices/GetEntryVisaById?id=" + this.data.service[0].id).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.__loader__.hideLoader();
                _this.show = true;
                _this.entryVisa = data.result;
                if (_this.entryVisa.commentsEntryVisas.length === 0) {
                    _this.addReply();
                }
                _this.VisaForm.get("authoDate").setValue(_this.entryVisa.authoDate);
                _this.VisaForm.get('authoAcceptanceDate').setValue(_this.entryVisa.authoAcceptanceDate);
                _this.VisaForm.get('statusId').setValue(_this.entryVisa.statusId);
                _this.VisaForm.get('applicantId').setValue(_this.entryVisa.applicantId);
                _this.VisaForm.get('name').setValue(_this.entryVisa.name);
                _this.VisaForm.get('serviceCompletionDate').setValue(_this.entryVisa.serviceCompletionDate);
                _this.VisaForm.get('countryId').setValue(_this.entryVisa.countryId);
                _this.VisaForm.get('cityId').setValue(_this.entryVisa.cityId);
                _this.VisaForm.get('consularServiceId').setValue(_this.entryVisa.consularServiceId == 1 ? true : false);
                _this.VisaForm.get('visaTypeId').setValue(_this.entryVisa.visaTypeId);
                _this.VisaForm.get('documentCollectionStartDate').setValue(_this.entryVisa.documentCollectionStartDate);
                _this.VisaForm.get('documentDeliveryDate').setValue(_this.entryVisa.documentDeliveryDate);
                _this.VisaForm.get('documentExpirationDate').setValue(_this.entryVisa.documentExpirationDate);
                _this.VisaForm.get('documentCollectionDompletionDate').setValue(_this.entryVisa.documentCollectionDompletionDate);
                _this.VisaForm.get('applicationSubmissionDate').setValue(_this.entryVisa.applicationSubmissionDate);
                _this.VisaForm.get('applicationApprovalDate').setValue(_this.entryVisa.applicationApprovalDate);
                _this.VisaForm.get('comment').setValue(_this.entryVisa.comment);
                _this.getcity();
                _this.request();
            }
        }));
    };
    EntryVisaComponent.prototype.getcity = function () {
        var _this = this;
        var data = this.VisaForm.value;
        this._services.service_general_get("Catalogue/GetState?country=" + data.countryId).subscribe((function (data) {
            if (data.success) {
                _this.ccity = data.result;
            }
        }));
    };
    EntryVisaComponent.prototype.request = function () {
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
    EntryVisaComponent.prototype.addReply = function () {
        console.log(this.user);
        this.entryVisa.commentsEntryVisas.push({
            "id": 0,
            "entryVisaId": this.entryVisa.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.entryVisa.commentsEntryVisas.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    EntryVisaComponent.prototype.getAppName = function (applicantId) {
        for (var i = 0; i < this.cappicant.length; i++) {
            var element = this.cappicant[i];
            if (element.dependentId = applicantId) {
                return element.name;
            }
        }
    };
    EntryVisaComponent.prototype.doc = function () {
        document.getElementById("doc").click();
    };
    EntryVisaComponent.prototype.dropped = function (files) {
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
                            _this.temporalDocument.push({
                                "id": 0,
                                "fileName": droppedFile.relativePath,
                                "fileRequest": encoded,
                                "fileExtension": ext[1],
                                "entryVisaId": _this.entryVisa.id,
                                "createdBy": _this.user.id,
                                "createdDate": new Date()
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
    EntryVisaComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    EntryVisaComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    EntryVisaComponent.prototype.addReminder = function () {
        console.log("add");
        this.entryVisa.reminderEntryVisas.push({
            id: 0,
            entryVisaId: this.entryVisa.id,
            reminderDate: null,
            reminderComments: null,
            createdBy: this.user.id,
            createdDate: new Date()
        });
    };
    EntryVisaComponent.prototype.event = function (a, e) {
        console.log(a, e);
    };
    EntryVisaComponent.prototype.removeReminder = function (i, id) {
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
                    _this.entryVisa.reminderEntryVisas.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("ImmigrationServices/DeleteReminderEV?id=" + id).subscribe((function (data) {
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
    EntryVisaComponent.prototype.viewConsularService = function (e) {
        console.log(e);
        this.consultar = e.checked;
        if (e.checked) {
            this.entryVisa.consularServiceId = 1;
        }
        else {
            this.entryVisa.consularServiceId = 2;
        }
    };
    EntryVisaComponent.prototype.DeleteOnline = function (id) {
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
                _this._services.service_general_delete("ImmigrationServices/DeleteDocumentEV?id=" + id).subscribe((function (data) {
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
    EntryVisaComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    EntryVisaComponent.prototype.addDocument = function () {
        var _this = this;
        this.data.typeDocument = 2;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.temporalDocument.push(result);
            }
        });
    };
    EntryVisaComponent.prototype.requestPayment = function (data) {
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
    EntryVisaComponent.prototype.deletePaymentConcept = function (data) {
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
    ///Documents catalogos
    EntryVisaComponent.prototype.documentType = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    EntryVisaComponent.prototype.countryOrigin = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].name;
            }
        }
    };
    EntryVisaComponent.prototype.DeleteOnlineof = function (i) {
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
    EntryVisaComponent.prototype.save = function () {
        var _this = this;
        this.entryVisa.updateBy = this.user.id;
        this.entryVisa.updatedDate = new Date();
        var rem = this.entryVisa;
        this.entryVisa = this.VisaForm.value;
        this.entryVisa.documentEntryVisas = this.temporalDocument;
        this.entryVisa.reminderEntryVisas = rem.reminderEntryVisas;
        this.entryVisa.id = rem.id;
        this.entryVisa.workOrderServicesId = rem.workOrderServicesId;
        this.entryVisa.serviceOrderServicesId = rem.serviceOrderServicesId;
        this.entryVisa.updateBy = this.user.id;
        this.entryVisa.updatedDate = new Date();
        this.entryVisa.consularServiceId = this.consultar ? 1 : 2;
        this.entryVisa.commentsEntryVisas = rem.commentsEntryVisas;
        var data_comment_aux = this.entryVisa.commentsEntryVisas;
        this.entryVisa.commentsEntryVisas = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                data_comment_aux[i].user.profileUsers = [];
                this.entryVisa.commentsEntryVisas.push(data_comment_aux[i]);
            }
        }
        if (this.entryVisa.reminderEntryVisas.length > 0) {
            for (var i = 0; i < this.entryVisa.reminderEntryVisas.length; i++) {
                if (this.entryVisa.reminderEntryVisas[i].reminderDate == null ||
                    this.entryVisa.reminderEntryVisas[i].reminderDate == '' ||
                    this.entryVisa.reminderEntryVisas[i].reminderComments == null ||
                    this.entryVisa.reminderEntryVisas[i].reminderComments == '') {
                    return;
                }
            }
        }
        this.__loader__.showLoader();
        console.log(this.entryVisa);
        this._services.service_general_put("ImmigrationServices/UpdateEntryVisa", this.entryVisa).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update Data"
                    },
                    width: "350px"
                });
                _this.temporalDocument = [];
                _this.dialogRef.close();
                _this.ngOnInit();
                _this.__loader__.hideLoader();
            }
        }));
    };
    EntryVisaComponent = __decorate([
        core_1.Component({
            selector: 'app-entry-visa',
            templateUrl: './entry-visa.component.html',
            styleUrls: ['./entry-visa.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], EntryVisaComponent);
    return EntryVisaComponent;
}());
exports.EntryVisaComponent = EntryVisaComponent;
