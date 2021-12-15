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
exports.PropertyManagementComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var PropertyManagementComponent = /** @class */ (function () {
    function PropertyManagementComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.show = false;
        this.catalog_status = [];
        this.catalog_currency = [];
        this.catalog_library = [];
        this.catalog_severity = [];
        this.payments_table_fields = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.switchVacant = false;
        this.switchRented = false;
        this.loader = new loader_1.LoaderComponent();
        this.document = [];
        this.documentType = [];
        this.country_catalogue = [];
        this.payments = [];
        this.calculo = {};
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.today_date = new Date();
        this.catalog_status_report = [];
        this.catalog_bill = [];
        this.newPhotoInspection = [];
        this.newPhotoBill = [];
        this.newPhotoMail = [];
        this.newPhotoIssue = [];
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.propertyManagement = new propertyManagementModel();
        this.image_path = this._services.url_images;
        this.ca_privacy = [];
        // fin add photos
        this.comment_string = new SingleComment();
        // add document report an issue
        this.files = [];
    }
    // temporalDocument:   any = {};
    PropertyManagementComponent.prototype.ngOnInit = function () {
        this.loader.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        console.log("Data que recibe el modal:", this.data);
        this.idPropertyManagement = this.data.data.service[0].id;
        console.log('id', this.data.data.service[0].id);
        this.dataPropertyManag();
    };
    PropertyManagementComponent.prototype.dataPropertyManag = function () {
        var _this = this;
        this.getCatalog();
        this._services.service_general_get("RelocationServices/GetPropertyManagementById?id=" + this.idPropertyManagement).subscribe(function (resp) {
            if (resp.success) {
                _this.loader.hideLoader();
                _this.propertyManagement = resp.result;
                console.log('Data property Management', _this.propertyManagement);
                _this.get_payment();
            }
        }, function (error) {
            console.log('error getpropertyManagement', error);
        });
    };
    PropertyManagementComponent.prototype.getCatalog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        this.show = true;
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=25").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.catalog_status = data.result;
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 1:
                        _a.catalog_currency = _h.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLibrary')];
                    case 2:
                        _b.catalog_library = _h.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSeverity')];
                    case 3:
                        _c.catalog_severity = _h.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 4:
                        _d.ca_privacy = _h.sent();
                        //this.documentType = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((function (data) {
                            if (data.success) {
                                _this.documentType = data.result;
                                console.log(_this.documentType);
                            }
                        }));
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 5:
                        _e.country_catalogue = _h.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusReportIssue')];
                    case 6:
                        _f.catalog_status_report = _h.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBillType')];
                    case 7:
                        _g.catalog_bill = _h.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PropertyManagementComponent.prototype.changeSwitch = function () {
        if (this.switchRented == true) {
            this.switchVacant = false;
        }
        if (this.switchVacant == true) {
            this.switchRented = false;
        }
    };
    // documentos
    PropertyManagementComponent.prototype.AddDocument = function () {
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
                // result.proper = this.propertyManagement.id;
                _this.document.push(result);
                console.log(_this.document);
            }
        });
    };
    //**DELETE DOCUMENT**//
    PropertyManagementComponent.prototype.removeDocument = function (i, id) {
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
                    _this._services.service_general_delete("RelocationServices/DeleteDocumentPropertyManagement?id=" + id).subscribe((function (data) {
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
    // ver documentos
    PropertyManagementComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    PropertyManagementComponent.prototype.getDocumentTypeName = function (id) {
        for (var i = 0; i < this.documentType.length; i++) {
            if (this.documentType[i].id == id) {
                return this.documentType[i].documentType;
            }
        }
    };
    //GET COUNTRY ORIGIN NAME//
    PropertyManagementComponent.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    // payment
    //++++++++ consulta payment
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    PropertyManagementComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.propertyManagement.workOrderServices);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.propertyManagement.workOrderServices,
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
    // get payment
    PropertyManagementComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.propertyManagement.workOrderServices).subscribe((function (data) {
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
    // edit payment
    PropertyManagementComponent.prototype.editPayment = function (data) {
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
    PropertyManagementComponent.prototype.deletePaymentConcept = function (data) {
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
    // add photos inspection
    PropertyManagementComponent.prototype.addPhotosInspection = function (event) {
        var _this = this;
        console.log(event);
        var file = event.target.files[0];
        var ext = event.target.files[0].type.split('/');
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader);
            var encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            _this.newPhotoInspection.push({
                'id': 0,
                'propertyManagement': _this.propertyManagement.id,
                'photo': encoded,
                'photoExtension': ext[1],
                'namePhoto': file.name,
                'createdBy': _this.user_data.id,
                'createdDate': new Date(),
                'updateBy': _this.user_data.id,
                'updatedDate': new Date()
            });
        };
    };
    // add photos bill
    PropertyManagementComponent.prototype.addPhotosBill = function (event) {
        var _this = this;
        console.log(event);
        var file = event.target.files[0];
        var ext = event.target.files[0].type.split('/');
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader);
            var encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            _this.newPhotoBill.push({
                'id': 0,
                'propertyManagement': _this.propertyManagement.id,
                'photo': encoded,
                'photoExtension': ext[1],
                'namePhoto': file.name,
                'createdBy': _this.user_data.id,
                'createdDate': new Date(),
                'updateBy': _this.user_data.id,
                'updatedDate': new Date()
            });
        };
    };
    // add photos mail
    PropertyManagementComponent.prototype.addPhotosMail = function (event) {
        var _this = this;
        console.log(event);
        var file = event.target.files[0];
        var ext = event.target.files[0].type.split('/');
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader);
            var encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            _this.newPhotoMail.push({
                'id': 0,
                'propertyManagement': _this.propertyManagement.id,
                'photo': encoded,
                'photoExtension': ext[1],
                'namePhoto': file.name,
                'createdBy': _this.user_data.id,
                'createdDate': new Date(),
                'updateBy': _this.user_data.id,
                'updatedDate': new Date()
            });
        };
    };
    // add photos inspection
    PropertyManagementComponent.prototype.addPhotosIssue = function (event) {
        var _this = this;
        console.log(event);
        var file = event.target.files[0];
        var ext = event.target.files[0].type.split('/');
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader);
            var encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            _this.newPhotoIssue.push({
                'id': 0,
                'propertyManagement': _this.propertyManagement.id,
                'photo': encoded,
                'photoExtension': ext[1],
                'namePhoto': file.name,
                'createdBy': _this.user_data.id,
                'createdDate': new Date(),
                'updateBy': _this.user_data.id,
                'updatedDate': new Date()
            });
        };
    };
    PropertyManagementComponent.prototype.deleteImgInspection = function (data, type) {
        var _this = this;
        // type es dependiendo del nodo de la foto
        console.log('borrar foto', data);
        if (data.id == 0) {
            this.newPhotoInspection.splice(data.id, 1);
        }
        else if (data.id != 0) {
            // DeletePhotoPropertyManagement?id=5&type=1
            this._services.service_general_delete("RelocationServices/DeletePhotoPropertyManagement?id=" + data.id + "&type=" + type).subscribe(function (resp) {
                if (resp.success) {
                    var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Delete Photo"
                        },
                        width: "350px"
                    });
                    _this.dialogRef.close();
                    _this.ngOnInit();
                }
            });
        }
    };
    // comment
    PropertyManagementComponent.prototype.addNewComment = function () {
        var new_comment = new commentPropertyManagementsModel();
        new_comment.id = 0;
        new_comment.propertyManagement = this.propertyManagement.id;
        new_comment.comment = '';
        new_comment.createdBy = this.user_data.id;
        new_comment.createdDate = this.today_date;
        new_comment.updatedBy = this.user_data.id;
        new_comment.updatedDate = this.today_date;
        new_comment.createdByNavigation = this.user_data;
        this.propertyManagement.commentPropertyManagements.push(new_comment);
        this.comment_string.comment = '';
    };
    // remminder
    PropertyManagementComponent.prototype.deleteReminderSelected = function (reminder, index) {
        var _this = this;
        if (reminder.id == 0) {
            this.propertyManagement.reminderPropertyManagements.splice(index, 1);
        }
        else {
            this.loader.showLoader();
            this._services.service_general_delete("RelocationServices/DeleteReminderPropertyManagement?id=" + reminder.id)
                .subscribe(function (response) {
                console.log('Res ==> ', response);
                if (response.success) {
                    var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Reminder Deleted",
                            body: "Reminder has been deleted successfully."
                        }
                    });
                    _this.dataPropertyManag();
                }
            }, function (error) {
                console.error('Error (DeleteReminderPropertyManagement) => ', error);
            });
        }
    };
    PropertyManagementComponent.prototype.addNewReminder = function () {
        var reminder_model = new reminderPropertyManagementsModel();
        reminder_model.createdBy = this.user_data.id;
        reminder_model.createdDate = new Date();
        reminder_model.propertyManagement = this.propertyManagement.id;
        this.propertyManagement.reminderPropertyManagements.push(reminder_model);
    };
    PropertyManagementComponent.prototype.addVisitReport = function () {
        var new_reportVisit = new visitReportPropertyManagementsModel();
        new_reportVisit.id = 0;
        new_reportVisit.propertyManagement = this.propertyManagement.id;
        new_reportVisit.visitReport = '';
        new_reportVisit.createdBy = this.user_data.id;
        new_reportVisit.createdDate = this.today_date;
        new_reportVisit.updateBy = this.user_data.id;
        new_reportVisit.updatedDate = this.today_date;
        this.propertyManagement.visitReportPropertyManagements.push(new_reportVisit);
    };
    PropertyManagementComponent.prototype.dropped = function (files) {
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
                            var ext = droppedFile.relativePath.split(".");
                            _this.documentReportIssue.push({
                                'id': 0,
                                'propertyManagement': _this.propertyManagement.id,
                                'filePath': encoded,
                                'fileExtension': ext[ext.length - 1],
                                'nameFile': droppedFile.relativePath,
                                'createdBy': _this.user.id,
                                'createdDate': new Date(),
                                'updateBy': _this.user.id,
                                'updatedDate': new Date()
                            });
                        };
                    });
                    console.log('documentos en report', _this.documentReportIssue);
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
    PropertyManagementComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    PropertyManagementComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    PropertyManagementComponent.prototype.save = function () {
        var _this = this;
        console.log("Informacion a guardar:  ", this.propertyManagement);
        // this.propertyManagement.updateBy = this.user.id;
        this.propertyManagement.documentPropertyManagements = this.document;
        this.propertyManagement.documentReportIssuePropertyManagements = this.documentReportIssue;
        this.propertyManagement.photoInspectionPropertyManagements = this.newPhotoInspection;
        this.propertyManagement.photoBillPropertyManagements = this.newPhotoBill;
        this.propertyManagement.photoMailPropertyManagements = this.newPhotoMail;
        this.propertyManagement.photoReportIssuePropertyManagements = this.newPhotoIssue;
        for (var com = 0; com < this.propertyManagement.commentPropertyManagements.length; com++) {
            var element = this.propertyManagement.commentPropertyManagements[com];
            if (element.id == 0) {
                delete element.createdByNavigation;
            }
        }
        this._services.service_general_put("RelocationServices/PutPropertyManagement", this.propertyManagement).subscribe((function (data) {
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
    PropertyManagementComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    PropertyManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-property-management',
            templateUrl: './property-management.component.html',
            styleUrls: ['./property-management.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PropertyManagementComponent);
    return PropertyManagementComponent;
}());
exports.PropertyManagementComponent = PropertyManagementComponent;
var propertyManagementModel = /** @class */ (function () {
    function propertyManagementModel() {
        this.id = 0;
        this.workOrderServices = 0;
        this.coordination = true;
        this.statusId = 0;
        this.propertAddress = "";
        this.library = 0;
        this.vacant = true;
        this.rented = true;
        this.marketing = "";
        this.links = "";
        this.countVisit = 0;
        this.offerReceived = "";
        this.submit = "";
        this.offerApprovedTenantSelected = 0;
        this.leaseNegotiation = "";
        this.sendDraft = "";
        this.comments = "";
        this.signatureCoordination = "";
        this.libraryPaymentCoordination = 0;
        this.tenancySupport = "";
        this.commentsQuestion = "";
        this.report = "";
        this.itemOngoingMaintanance = 0;
        this.providerVisit = 0;
        this.providerPayment = 0;
        this.billType = 0;
        this.commentBill = "";
        this.providerPaymentBill = 0;
        this.commentMail = "";
        this.severity = 0;
        this.descriptionReportIssue = "";
        this.statusReportIssue = 0;
        this.commentPropertyManagements = [];
        this.documentPropertyManagements = [];
        this.documentReportIssuePropertyManagements = [];
        this.photoBillPropertyManagements = [];
        this.photoInspectionPropertyManagements = [];
        this.photoMailPropertyManagements = [];
        this.photoPropertyManagements = [];
        this.photoReportIssuePropertyManagements = [];
        this.reminderPropertyManagements = [];
        this.visitReportPropertyManagements = [];
    }
    return propertyManagementModel;
}());
var commentPropertyManagementsModel = /** @class */ (function () {
    function commentPropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.comment = "";
        this.createdBy = 0;
        this.updatedBy = 0;
        this.createdByNavigation = [];
    }
    return commentPropertyManagementsModel;
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
var documentPropertyManagementsModel = /** @class */ (function () {
    function documentPropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
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
    return documentPropertyManagementsModel;
}());
var documentReportIssuePropertyManagementsModel = /** @class */ (function () {
    function documentReportIssuePropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.filePath = "";
        this.fileExtension = "";
        this.nameFile = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return documentReportIssuePropertyManagementsModel;
}());
var photoBillPropertyManagementsModel = /** @class */ (function () {
    function photoBillPropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.photo = "";
        this.photoExtension = "";
        this.namePhoto = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return photoBillPropertyManagementsModel;
}());
var photoInspectionPropertyManagementsModel = /** @class */ (function () {
    function photoInspectionPropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.photo = "";
        this.photoExtension = "";
        this.namePhoto = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return photoInspectionPropertyManagementsModel;
}());
var photoMailPropertyManagementsModel = /** @class */ (function () {
    function photoMailPropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.photo = "";
        this.photoExtension = "";
        this.namePhoto = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return photoMailPropertyManagementsModel;
}());
var photoPropertyManagementsModel = /** @class */ (function () {
    function photoPropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.photo = "";
        this.photoExtension = "";
        this.namePhoto = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return photoPropertyManagementsModel;
}());
var photoReportIssuePropertyManagementsModel = /** @class */ (function () {
    function photoReportIssuePropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.photo = "";
        this.photoExtension = "";
        this.namePhoto = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return photoReportIssuePropertyManagementsModel;
}());
var reminderPropertyManagementsModel = /** @class */ (function () {
    function reminderPropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.reminderComments = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return reminderPropertyManagementsModel;
}());
var visitReportPropertyManagementsModel = /** @class */ (function () {
    function visitReportPropertyManagementsModel() {
        this.id = 0;
        this.propertyManagement = 0;
        this.visitReport = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return visitReportPropertyManagementsModel;
}());
var SingleComment = /** @class */ (function () {
    function SingleComment() {
        this.comment = '';
    }
    return SingleComment;
}());
