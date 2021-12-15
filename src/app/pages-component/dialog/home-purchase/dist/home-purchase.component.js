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
exports.HomePurchaseComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var dialog_housing_specifications_component_1 = require("../dialog-housing-specifications/dialog-housing-specifications.component");
var dialog_home_details_component_1 = require("../dialog-home-details/dialog-home-details.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var HomePurchaseComponent = /** @class */ (function () {
    function HomePurchaseComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.loader = new loader_1.LoaderComponent();
        this.show = false;
        this.catalog_status = [];
        this.catalog_realtor = [];
        this.catalog_currency = [];
        this.displayedColumnsHousing = ['Supplier Partner', 'Supplier', 'Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Status', 'Actions'];
        this.payments_table_fields = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.catalog_statusPurchase = [];
        this.services_catalogue = [];
        this.caPropertyComission = [];
        this.caComissionCurrency = [];
        this.document = [];
        this.documentType = [];
        this.country_catalogue = [];
        this.payments = [];
        this.calculo = {};
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.image_path = this._services.url_images;
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.today_date = new Date();
        this.homePurchase = new HomePurchaseModel();
        this.ca_privacy = [];
        // get housing
        //DATA TABLE HOUSING//
        this.dataSourceHousing = [];
        this.comment_string = new SingleComment();
    }
    HomePurchaseComponent.prototype.ngOnInit = function () {
        this.loader.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        console.log("Data que recibe el modal:", this.data);
        this.idHomePurchase = this.data.data.service[0].id;
        console.log('id', this.data.data.service[0].id);
        this.dataHomePurchase();
    };
    HomePurchaseComponent.prototype.dataHomePurchase = function () {
        var _this = this;
        this.getCatalog();
        this._services.service_general_get("RelocationServices/GetHomePurchaseById?id=" + this.idHomePurchase).subscribe(function (resp) {
            if (resp.success) {
                _this.loader.hideLoader();
                _this.homePurchase = resp.result;
                console.log('home sale', _this.homePurchase);
                _this.getdeliver();
                _this.get_payment();
                _this.getDataHousing();
                _this.getRealtor();
            }
        }, function (error) {
            console.log('error GetHomePurchaseById', error);
        });
    };
    HomePurchaseComponent.prototype.getdeliver = function () {
        var _this = this;
        this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.homePurchase.workOrderServices).subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.dataDeliver = data.result.value;
            }
        }));
        // GetDeliverTo?wos=2041
    };
    HomePurchaseComponent.prototype.getCatalog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.show = true;
                        //this.catalog_status = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=24").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.catalog_status = data.result;
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        _a.ca_privacy = _g.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 2:
                        _b.catalog_currency = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusHomePurchase')];
                    case 3:
                        _c.catalog_statusPurchase = _g.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusReportIssue')];
                    case 4:
                        _d.caPropertyComission = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSeverity')];
                    case 5:
                        _e.caComissionCurrency = _g.sent();
                        //this.documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 6:
                        //this.documentType = await this._services.getCatalogueFrom('GetDocumentType/1');
                        _f.country_catalogue = _g.sent();
                        this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.documentType = data.result;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    // seccion housing list
    HomePurchaseComponent.prototype.HousingSpecs = function () {
        var dialogRef = this._dialog.open(dialog_housing_specifications_component_1.DialogHousingSpecificationsComponent, {
            data: this.homePurchase,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
            }
        });
    };
    HomePurchaseComponent.prototype.HomeDetailsnew = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                workOrderServicesId: this.homePurchase.workOrderServices,
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
            _this.getDataHousing();
        });
    };
    HomePurchaseComponent.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe((function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
            }
        }));
    };
    //EDIT HOUSING//
    HomePurchaseComponent.prototype.editHousing = function (data) {
        var _this = this;
        data.supplierType = 3;
        data.workOrderServicesId = this.homePurchase.workOrderServices,
            data.sr = this.data.sr;
        data.numberWorkOrder = this.data.data.numberWorkOrder;
        data.serviceID = this.data.data.number_server;
        data.serviceName = this.data.data.service_name;
        console.log("Editar Housing: ", data);
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    // documents
    HomePurchaseComponent.prototype.AddDocument = function () {
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
                result.homePurchase = _this.homePurchase.id;
                _this.document.push(result);
                console.log(_this.document);
            }
        });
    };
    HomePurchaseComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
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
    //**DELETE DOCUMENT**//
    HomePurchaseComponent.prototype.removeDocument = function (i, id) {
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
                    _this._services.service_general_delete("RelocationServices/DeleteDocumentHomePurchase?id=" + id).subscribe((function (data) {
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
    HomePurchaseComponent.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    HomePurchaseComponent.prototype.getDocumentTypeName = function (id) {
        for (var i = 0; i < this.documentType.length; i++) {
            if (this.documentType[i].id == id) {
                return this.documentType[i].documentType;
            }
        }
    };
    // get payment
    //++++++++ consulta payment
    HomePurchaseComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServices=" + this.homePurchase.workOrderServices).subscribe((function (data) {
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
    // add payment
    HomePurchaseComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.homePurchase.workOrderServices);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.homePurchase.workOrderServices,
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
    // edit payment
    HomePurchaseComponent.prototype.editPayment = function (data) {
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
    // delete
    // delete payment
    HomePurchaseComponent.prototype.deletePaymentConcept = function (data) {
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
    // get realtor
    HomePurchaseComponent.prototype.getRealtor = function () {
        var _this = this;
        if (this.homePurchase.supplierPartnerId == 0) {
        }
        else {
            console.log('supplier', this.homePurchase.supplierPartnerId);
            this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierPartner=" + this.homePurchase.supplierPartnerId + "&supplierType=33").subscribe(function (resp) {
                if (resp.success) {
                    _this.catalog_realtor = resp.result.value;
                }
            });
        }
    };
    HomePurchaseComponent.prototype.addNewComment = function () {
        var new_comment = new commentHomePurchasesModel();
        new_comment.id = 0;
        new_comment.homePurchase = this.homePurchase.id;
        new_comment.comment = '';
        new_comment.createdBy = this.user_data.id;
        new_comment.createdDate = this.today_date;
        new_comment.updatedBy = this.user_data.id;
        new_comment.updatedDate = this.today_date;
        new_comment.createdByNavigation = this.user_data;
        this.homePurchase.commentHomePurchases.push(new_comment);
        this.comment_string.comment = '';
    };
    // reminder
    HomePurchaseComponent.prototype.deleteReminderSelected = function (reminder, index) {
        var _this = this;
        if (reminder.id == 0) {
            this.homePurchase.reminderHomePurchases.splice(index, 1);
        }
        else {
            this.loader.showLoader();
            this._services.service_general_delete("RelocationServices/DeleteReminderHomePurchase?id=" + reminder.id)
                .subscribe(function (response) {
                console.log('Res ==> ', response);
                if (response.success) {
                    var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Reminder Deleted",
                            body: "Reminder has been deleted successfully."
                        }
                    });
                    _this.dataHomePurchase();
                }
            }, function (error) {
                console.error('Error (DeleteReminder) => ', error);
            });
        }
    };
    // reminder add
    HomePurchaseComponent.prototype.addNewReminder = function () {
        var reminder_model = new reminderHomePurchasesModel();
        reminder_model.createdBy = this.user_data.id;
        reminder_model.createdDate = new Date();
        reminder_model.homePurchase = this.homePurchase.id;
        this.homePurchase.reminderHomePurchases.push(reminder_model);
    };
    HomePurchaseComponent.prototype.save = function () {
        var _this = this;
        this.homePurchase.updatedBy = this.user_data.id;
        this.homePurchase.updatedDate = new Date();
        console.log("Informacion a guardar:  ", this.homePurchase);
        // this.homePurchase.updateBy = this.user.id;
        this.homePurchase.documentHomePurchases = this.document;
        // this.homePurchase.updatedDate = new Date();
        for (var com = 0; com < this.homePurchase.commentHomePurchases.length; com++) {
            var element = this.homePurchase.commentHomePurchases[com];
            if (element.id == 0) {
                delete element.createdByNavigation;
            }
        }
        this._services.service_general_put("RelocationServices/PutHomePurchase", this.homePurchase).subscribe((function (data) {
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
    HomePurchaseComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    HomePurchaseComponent = __decorate([
        core_1.Component({
            selector: 'app-home-purchase',
            templateUrl: './home-purchase.component.html',
            styleUrls: ['./home-purchase.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], HomePurchaseComponent);
    return HomePurchaseComponent;
}());
exports.HomePurchaseComponent = HomePurchaseComponent;
var HomePurchaseModel = /** @class */ (function () {
    function HomePurchaseModel() {
        this.id = 0;
        this.workOrderServices = 0;
        this.coordination = true;
        this.deliverTo = 0;
        this.statusId = 0;
        this.purchaseDesiredPrice = 0;
        this.currencyPurchaseDesiredPriceId = 0;
        this.purchaseFinalPrice = 0;
        this.currencyPurchaseFinalPriceId = 0;
        this.purchaseStatusId = 0;
        this.comment = "";
        this.relatedSupplier = true;
        this.supplierPartnerId = 0; // se quito
        this.agency = "";
        this.contactName = "";
        this.contactEmail = "";
        this.contactPhoneNo = "";
        this.propertyCommission = 0;
        this.commissionAmount = 0;
        this.currencyCommissionId = 0;
        this.createdBy = 0;
        this.updatedBy = 0;
        this.commentHomePurchases = [];
        this.documentHomePurchases = [];
        this.reminderHomePurchases = [];
    }
    return HomePurchaseModel;
}());
var commentHomePurchasesModel = /** @class */ (function () {
    function commentHomePurchasesModel() {
        this.id = 0;
        this.homePurchase = 0;
        this.comment = "";
        this.createdBy = 0;
        this.updatedBy = 0;
        this.createdByNavigation = [];
    }
    return commentHomePurchasesModel;
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
var documentHomePurchasesModel = /** @class */ (function () {
    function documentHomePurchasesModel() {
        this.id = 0;
        this.homePurchase = 0;
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
    return documentHomePurchasesModel;
}());
var reminderHomePurchasesModel = /** @class */ (function () {
    function reminderHomePurchasesModel() {
        this.id = 0;
        this.homePurchase = 0;
        this.reminderComments = "";
        this.createdBy = 0;
    }
    return reminderHomePurchasesModel;
}());
var SingleComment = /** @class */ (function () {
    function SingleComment() {
        this.comment = '';
    }
    return SingleComment;
}());
