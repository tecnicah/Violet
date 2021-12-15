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
exports.TenancyManagementComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var dialog_home_details_component_1 = require("../dialog-home-details/dialog-home-details.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_add_event_tenancy_component_1 = require("./../dialog-add-event-tenancy/dialog-add-event-tenancy.component");
var TenancyManagementComponent = /** @class */ (function () {
    function TenancyManagementComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.loader = new loader_1.LoaderComponent();
        this.show = false;
        this.document = [];
        this.catalog_estatus = [];
        this.displayedColumnsReportVisit = ['ReportDate', 'CloseDate', 'Severity', 'Description', 'Status', 'Photos', 'Actions'];
        this.payments_table_fields = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.image_path = this._services.url_images;
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.today_date = new Date();
        this.country_catalogue = [];
        this.documentType = [];
        this.calculo = {};
        this.payments = [];
        this.newComment = [];
        this.tenancyManagement = new tenancyManagementModel();
        this.comment_string = new SingleComment();
    }
    // dataComment;
    TenancyManagementComponent.prototype.ngOnInit = function () {
        this.loader.showLoader();
        console.log("Data que recibe el modal:", this.data);
        this.getCatalog();
        this.idTenancy = this.data.data.service[0].id;
        console.log('id', this.data.data.service[0].id);
        this.dataTenancy();
    };
    TenancyManagementComponent.prototype.dataTenancy = function () {
        var _this = this;
        this._services.service_general_get("RelocationServices/TenancyManagementById?id=" + this.idTenancy).subscribe(function (resp) {
            if (resp.success) {
                _this.loader.hideLoader();
                _this.tenancyManagement = resp.result;
                // this.dataComment = resp.result.commentTenancyManagements;
                console.log('tenancy', _this.tenancyManagement);
                _this.getdeliver();
                _this.get_payment();
                _this.getDataHousing();
                // this.getRealtor();
            }
        }, function (error) {
            console.log('error RelocationServices/TenancyManagement', error);
        });
    };
    TenancyManagementComponent.prototype.getdeliver = function () {
        var _this = this;
        this._services.service_general_get("ServiceOrder/GetDeliverTo?wos=" + this.tenancyManagement.workOrderServices).subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.dataDeliver = data.result.value;
            }
        }));
    };
    TenancyManagementComponent.prototype.getCatalog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.show = true;
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.country_catalogue = _d.sent();
                        //this.documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
                        this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((function (data) {
                            if (data.success) {
                                _this.documentType = data.result;
                                console.log(_this.documentType);
                            }
                        }));
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusReportAnEvent')];
                    case 2:
                        _b.statusEvent_catalog = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSeverity')];
                    case 3:
                        _c.severity_catalogue = _d.sent();
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=23").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.catalog_estatus = data.result;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    TenancyManagementComponent.prototype.addEvent = function (id) {
        var _this = this;
        console.log('add event');
        var dialogRef = this._dialog.open(dialog_add_event_tenancy_component_1.DialogAddEventTenancyComponent, {
            width: "95%",
            data: { id: id, tenancyManagementId: this.tenancyManagement.id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    TenancyManagementComponent.prototype.dataHousing = function (item) {
        this.data_propiedad = item;
    };
    TenancyManagementComponent.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe(function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
                // this.permanent_homet(this.dataSourceHousing);
            }
        });
    };
    TenancyManagementComponent.prototype.HomeDetailsnew = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                workOrderServicesId: this.tenancyManagement.workOrderServices,
                numberWorkOrder: this.data.data.numberWorkOrder,
                serviceID: this.data.data.number_server,
                serviceName: this.data.data.service_name,
                service: this.data.data.serviceRecordId,
                serviceTypeId: this.data.data.serviceTypeId,
                sr: this.data.sr,
                supplierType: 3
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            // this.dataTenancy();
            _this.getDataHousing();
        });
    };
    //METODO PAR EDICION DE HOUSING//
    TenancyManagementComponent.prototype.editHousing = function () {
        var _this = this;
        this.data_propiedad.supplierType = 3;
        this.data_propiedad.workOrderServices = this.tenancyManagement.workOrderServices,
            this.data_propiedad.sr = this.data.sr;
        this.data_propiedad.numberWorkOrder = this.data.data.numberWorkOrder;
        this.data_propiedad.serviceID = this.data.data.number_server;
        this.data_propiedad.serviceName = this.data.data.service_name;
        console.log("Editar Housing: ", this.data_propiedad);
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: this.data_propiedad,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    // documents
    TenancyManagementComponent.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    TenancyManagementComponent.prototype.getStatusEvent = function (id) {
        for (var i = 0; i < this.statusEvent_catalog.length; i++) {
            if (this.statusEvent_catalog[i].id == id) {
                return this.statusEvent_catalog[i].status;
            }
        }
    };
    TenancyManagementComponent.prototype.getSeverityEvent = function (id) {
        for (var i = 0; i < this.severity_catalogue.length; i++) {
            if (this.severity_catalogue[i].id == id) {
                return this.severity_catalogue[i].severity;
            }
        }
    };
    TenancyManagementComponent.prototype.removeDocument = function (i, id) {
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
                    // /api/RelocationServices/Document/TenancyManagement
                    _this._services.service_general_delete("RelocationServices/Document/TenancyManagement?id=" + id).subscribe((function (data) {
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
    TenancyManagementComponent.prototype.getDocumentTypeName = function (id) {
        for (var i = 0; i < this.documentType.length; i++) {
            if (this.documentType[i].id == id) {
                return this.documentType[i].documentType;
            }
        }
    };
    TenancyManagementComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    TenancyManagementComponent.prototype.addDocument = function () {
        var _this = this;
        console.log('add document');
        this.data.typeDocument = 1;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.tenancyManagementId = _this.tenancyManagement.id;
                _this.document.push(result);
                console.log(_this.document);
            }
        });
    };
    // payment
    //++++++++ consulta payment
    TenancyManagementComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.tenancyManagement.workOrderServices).subscribe((function (data) {
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
    TenancyManagementComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('add payment');
        console.log('workOrderServicesId', this.tenancyManagement.workOrderServices);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.tenancyManagement.workOrderServices,
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
    TenancyManagementComponent.prototype.editPayment = function (data) {
        var _this = this;
        console.log('edit payment');
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
    TenancyManagementComponent.prototype.deletePaymentConcept = function (data) {
        var _this = this;
        console.log('delete');
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
    TenancyManagementComponent.prototype.addNewComment = function () {
        var new_comment = new commentTenancyManagementsModel();
        new_comment.id = 0;
        new_comment.tenancyManagementId = this.tenancyManagement.id;
        new_comment.comment = '';
        new_comment.createdBy = this.user_data.id;
        new_comment.createdDate = this.today_date;
        new_comment.updatedBy = this.user_data.id;
        new_comment.updatedDate = this.today_date;
        new_comment.createdByNavigation = this.user_data;
        this.tenancyManagement.commentTenancyManagements.push(new_comment);
        this.comment_string.comment = '';
    };
    TenancyManagementComponent.prototype.deleteReminderSelected = function (reminder, index) {
        var _this = this;
        if (reminder.id == 0) {
            this.tenancyManagement.reminderTenancyManagements.splice(index, 1);
        }
        else {
            this.loader.showLoader();
            this._services.service_general_delete("RelocationServices/Reminder/TenancyManagement?id=" + reminder.id)
                .subscribe(function (response) {
                console.log('Res ==> ', response);
                if (response.success) {
                    var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Reminder Deleted",
                            body: "Reminder has been deleted successfully."
                        }
                    });
                    _this.dataTenancy();
                }
            }, function (error) {
                console.error('Error (RelocationServices/Reminder/TenancyManagement) => ', error);
            });
        }
    };
    TenancyManagementComponent.prototype.addNewReminder = function () {
        var reminder_model = new reminderTenancyManagementsModel();
        reminder_model.createdBy = this.user_data.id;
        reminder_model.createdDate = new Date();
        reminder_model.tenancyManagementId = this.tenancyManagement.id;
        this.tenancyManagement.reminderTenancyManagements.push(reminder_model);
    };
    TenancyManagementComponent.prototype.save = function () {
        var _this = this;
        console.log('save');
        this.tenancyManagement.updateBy = this.user_data.id;
        this.tenancyManagement.updatedDate = new Date();
        for (var com = 0; com < this.tenancyManagement.commentTenancyManagements.length; com++) {
            var element = this.tenancyManagement.commentTenancyManagements[com];
            if (element.id == 0) {
                delete element.createdByNavigation;
            }
        }
        this.tenancyManagement.documentTenancyManagements = this.document;
        console.log("Informacion a guardar:  ", this.tenancyManagement);
        this._services.service_general_put("RelocationServices/TenancyManagement", this.tenancyManagement).subscribe((function (data) {
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
    TenancyManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-tenancy-management',
            templateUrl: './tenancy-management.component.html',
            styleUrls: ['./tenancy-management.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], TenancyManagementComponent);
    return TenancyManagementComponent;
}());
exports.TenancyManagementComponent = TenancyManagementComponent;
var tenancyManagementModel = /** @class */ (function () {
    function tenancyManagementModel() {
        this.id = 0;
        this.workOrderServices = 0;
        this.coordination = true;
        this.deliverTo = 0;
        this.statusId = 0;
        this.propertyId = 0;
        this.createdBy = 0;
        this.updateBy = 0;
        this.commentTenancyManagements = [];
        this.documentTenancyManagements = [];
        this.reminderTenancyManagements = [];
        this.reportAnEvents = [];
        this.eventTables = [];
    }
    return tenancyManagementModel;
}());
var commentTenancyManagementsModel = /** @class */ (function () {
    function commentTenancyManagementsModel() {
        this.id = 0;
        this.tenancyManagementId = 0;
        this.comment = "";
        this.createdBy = 0;
        this.updatedBy = 0;
        this.createdByNavigation = [];
    }
    return commentTenancyManagementsModel;
}());
var documentTenancyManagementsMoldel = /** @class */ (function () {
    function documentTenancyManagementsMoldel() {
        this.id = 0;
        this.tenancyManagementId = 0;
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
    return documentTenancyManagementsMoldel;
}());
var reminderTenancyManagementsModel = /** @class */ (function () {
    function reminderTenancyManagementsModel() {
        this.id = 0;
        this.tenancyManagementId = 0;
        this.reminderComments = "";
        this.createdBy = 0;
        this.remi = "";
    }
    return reminderTenancyManagementsModel;
}());
var reportAnEventsModel = /** @class */ (function () {
    function reportAnEventsModel() {
        this.id = 0;
        this.tenancyManagementId = 0;
        this.severityId = 0;
        this.description = "";
        this.statusId = 0;
        this.quoteApproval = "";
        this.createdBy = 0;
        this.updateBy = 0;
        this.assignedPhotos = [];
        this.commentReportAnEvents = [];
        this.supplierConsultantPhotos = [];
    }
    return reportAnEventsModel;
}());
var eventTablesModel = /** @class */ (function () {
    function eventTablesModel() {
        this.id = 0;
        this.severity = "";
        this.description = "";
        this.status = "";
        this.photos = 0;
        this.quoteApproval = "";
    }
    return eventTablesModel;
}());
// clases de repor event
var assignedPhotosModel = /** @class */ (function () {
    function assignedPhotosModel() {
        this.id = 0;
        this.reportAnEventId = 0;
        this.photoName = "";
        this.photoPath = "";
        this.photoExtension = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return assignedPhotosModel;
}());
var commentReportAnEventsModel = /** @class */ (function () {
    function commentReportAnEventsModel() {
        this.id = 0;
        this.reportAnEventId = 0;
        this.comment = "";
        this.createdBy = 0;
        this.updatedBy = 0;
    }
    return commentReportAnEventsModel;
}());
var supplierConsultantPhotosModel = /** @class */ (function () {
    function supplierConsultantPhotosModel() {
        this.id = 0;
        this.reportAnEventId = 0;
        this.photoName = "";
        this.photoPath = "";
        this.photoExtension = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return supplierConsultantPhotosModel;
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
