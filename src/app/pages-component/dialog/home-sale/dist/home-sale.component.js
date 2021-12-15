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
exports.HomeSaleComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var dialog_home_details_component_1 = require("../dialog-home-details/dialog-home-details.component");
var dialog_add_visit_component_1 = require("./../dialog-add-visit/dialog-add-visit.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var HomeSaleComponent = /** @class */ (function () {
    function HomeSaleComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.loader = new loader_1.LoaderComponent();
        this.image_path = this._services.url_images;
        this.show = false;
        this.calculo = {};
        this.switchProperty = false;
        this.catalog_estatus = [];
        this.catalog_currency = [];
        this.catalog_statusSale = [];
        this.displayedColumnsHomeSale = ['Date', 'Comment', 'Actions'];
        this.payments_table_fields = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.temporalDocument = [];
        this.caDocumentType = [];
        this.caCountry = [];
        this.caPropertyComission = [];
        this.caComissionCurrency = [];
        this.document = [];
        this.payments = [];
        this.today_date = new Date();
        this.visit = [];
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.homeSale = new HomeSaleModel();
        this.ca_privacy = [];
        //**PERMANENT HOME**//
        // permanentHome:any;
        this.data_inspection = [];
        this.data_repairs = [];
        this.data_home = [];
        // ********fin request payment
        // inicio comment
        this.comment_string = new SingleComment();
    }
    HomeSaleComponent.prototype.ngOnInit = function () {
        this.loader.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        console.log("Data que recibe el modal:", this.data);
        this.idHomeSale = this.data.data.service[0].id;
        console.log('id', this.data.data.service[0].id);
        this.dataHomeSale();
    };
    HomeSaleComponent.prototype.dataHomeSale = function () {
        var _this = this;
        this.getCatalog();
        this._services.service_general_get("RelocationServices/GetHomeSaleById?id=" + this.idHomeSale).subscribe(function (resp) {
            if (resp.success) {
                _this.loader.hideLoader();
                _this.homeSale = resp.result;
                console.log('home sale', _this.homeSale);
                _this.visit = _this.homeSale.visitHomeSales;
                _this.getdeliver();
                _this.get_payment();
                _this.getDataHousing();
            }
        }, function (error) {
            console.log('error GetHomeSaleById', error);
        });
    };
    HomeSaleComponent.prototype.getdeliver = function () {
        var _this = this;
        this._services.service_general_get("ServiceOrder/GetDeliverTo?wos=" + this.homeSale.workOrderServices).subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.dataDeliver = data.result.value;
            }
        }));
    };
    HomeSaleComponent.prototype.getCatalog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.show = true;
                        //this.catalog_estatus = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=23").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.catalog_estatus = data.result;
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
                        //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.caDocumentType = data.result;
                            }
                        }));
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 3:
                        _c.caCountry = _g.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusHomeSale')];
                    case 4:
                        _d.catalog_statusSale = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusReportIssue')];
                    case 5:
                        _e.caPropertyComission = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSeverity')];
                    case 6:
                        _f.caComissionCurrency = _g.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // seccion visit
    HomeSaleComponent.prototype.addVisit = function (data) {
        var _this = this;
        console.log(data);
        if (data == null) {
            data = {
                id: 0,
                homeSale: this.homeSale.id,
                date: Date,
                comment: "",
                createdBy: this.user.id,
                createdDate: Date,
                updateBy: this.user.id,
                updatedDate: Date
            };
            console.log('add visit');
        }
        // this.homeSale.visitHomeSales[0].id = 0
        var dialogRef = this._dialog.open(dialog_add_visit_component_1.DialogAddVisitComponent, {
            width: "50%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            // result.homeSale = this.homeSale.id;
            _this.visit.push(result);
            console.log(_this.visit);
        });
    };
    HomeSaleComponent.prototype.editVisit = function (data) {
        var _this = this;
        console.log('edit', data);
        // this.homeSale.visitHomeSales[0].id = 0
        var dialogRef = this._dialog.open(dialog_add_visit_component_1.DialogAddVisitComponent, {
            width: "50%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            // result.homeSale = this.homeSale.id;
            // this.visit.push(result);
            console.log(result);
            _this.visit.push(result);
        });
    };
    HomeSaleComponent.prototype.initDocumentsSettings = function () {
        this.homeSale.documentHomeSales.forEach(function (document) {
            // document.local = false;
        });
    };
    HomeSaleComponent.prototype.dataHousing = function (item) {
        this.data_propiedad = item;
    };
    HomeSaleComponent.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe(function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
                // this.permanent_homet(this.dataSourceHousing);
            }
        });
    };
    //**************************************************************//
    //METODO PARA AGREGAR HOUSING//
    HomeSaleComponent.prototype.HomeDetailsnew = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                workOrderServicesId: this.homeSale.workOrderServices,
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
    //METODO PAR EDICION DE HOUSING//
    HomeSaleComponent.prototype.editHousing = function () {
        var _this = this;
        this.data_propiedad.supplierType = 3;
        this.data_propiedad.workOrderServices = this.homeSale.workOrderServices,
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
    HomeSaleComponent.prototype.documentType = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            if (this.caDocumentType[i].id == id) {
                return this.caDocumentType[i].documentType;
            }
        }
    };
    HomeSaleComponent.prototype.countryOrigin = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].name;
            }
        }
    };
    HomeSaleComponent.prototype.DeleteOnline = function (i, id) {
        var _this = this;
        // /api/RelocationServices/DeleteDocumentHomeSale
        console.log('delete');
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
                    _this._services.service_general_delete("RelocationServices/DeleteDocumentHomeSale?id=" + id).subscribe((function (data) {
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
    HomeSaleComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.sr,
                document: document,
                sl: service_line,
                name_section: "only_one_service"
            }
        });
    };
    //METODO PARA AGREGAR DOCUMENTOS//
    HomeSaleComponent.prototype.addDocument = function () {
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
                _this.document.push(result);
                console.log(_this.document);
            }
        });
    };
    //**DELETE DOCUMENT**//
    HomeSaleComponent.prototype.removeDocument = function (i, id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete document?"
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
                    _this._services.service_general_delete("RelocationServices/DeleteDocumentHomeSale?id=" + id).subscribe((function (data) {
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
    // seccion request payment
    //++++++++ consulta payment
    HomeSaleComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?workOrderServices=" + this.homeSale.workOrderServices).subscribe((function (data) {
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
    HomeSaleComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServices', this.homeSale.workOrderServices);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.homeSale.workOrderServices,
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
    HomeSaleComponent.prototype.editPayment = function (data) {
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
    // borrar payment
    HomeSaleComponent.prototype.deletePaymentConcept = function (data) {
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
    HomeSaleComponent.prototype.addNewComment = function () {
        var new_comment = new CommentHomeSaleModel();
        new_comment.id = 0;
        new_comment.homeSale = this.homeSale.id;
        new_comment.comment = '';
        new_comment.createdBy = this.user_data.id;
        new_comment.createdDate = this.today_date;
        new_comment.updatedBy = this.user_data.id;
        new_comment.updatedDate = this.today_date;
        new_comment.createdByNavigation = this.user_data;
        this.homeSale.commentHomeSales.push(new_comment);
        this.comment_string.comment = '';
    };
    // remminder
    HomeSaleComponent.prototype.deleteReminderSelected = function (reminder, index) {
        var _this = this;
        if (reminder.id == 0) {
            this.homeSale.reminderHomeSales.splice(index, 1);
        }
        else {
            this.loader.showLoader();
            this._services.service_general_delete("RelocationServices/DeleteReminderHomeSale?id=" + reminder.id)
                .subscribe(function (response) {
                console.log('Res ==> ', response);
                if (response.success) {
                    var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Reminder Deleted",
                            body: "Reminder has been deleted successfully."
                        }
                    });
                    _this.dataHomeSale();
                }
            }, function (error) {
                console.error('Error (DeleteReminderTHC) => ', error);
            });
        }
    };
    HomeSaleComponent.prototype.addNewReminder = function () {
        var reminder_model = new ReminderHomeSaleModel();
        reminder_model.createdBy = this.user_data.id;
        reminder_model.createdDate = new Date();
        reminder_model.homeSale = this.homeSale.id;
        this.homeSale.reminderHomeSales.push(reminder_model);
    };
    HomeSaleComponent.prototype.save = function () {
        var _this = this;
        console.log("Informacion a guardar:  ", this.homeSale);
        this.homeSale.updateBy = this.user.id;
        this.homeSale.documentHomeSales = this.document;
        this.homeSale.updatedDate = new Date();
        this.homeSale.visitHomeSales = this.visit;
        for (var com = 0; com < this.homeSale.commentHomeSales.length; com++) {
            var element = this.homeSale.commentHomeSales[com];
            if (element.id == 0) {
                delete element.createdByNavigation;
            }
        }
        this._services.service_general_put("RelocationServices/PutHomeSale", this.homeSale).subscribe((function (data) {
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
                _this.visit = [];
                _this.ngOnInit();
            }
        }));
    };
    //PRIVACY//
    HomeSaleComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    HomeSaleComponent = __decorate([
        core_1.Component({
            selector: 'app-home-sale',
            templateUrl: './home-sale.component.html',
            styleUrls: ['./home-sale.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], HomeSaleComponent);
    return HomeSaleComponent;
}());
exports.HomeSaleComponent = HomeSaleComponent;
var HomeSaleModel = /** @class */ (function () {
    function HomeSaleModel() {
        this.id = 0;
        this.workOrderServices = 0;
        this.coordination = true;
        this.deliverTo = 0;
        this.statusId = 0;
        this.listPrice = 0;
        this.currencyListPriceId = 0;
        this.purchaseFinalPrice = 0;
        this.currencyFinalPriceId = 0;
        this.propertyId = 0;
        this.saleStatusId = 0;
        this.comment = "";
        this.agency = "";
        this.contactName = "";
        this.contactEmail = "";
        this.contactPhoneNo = "";
        this.propertyCommission = 0;
        this.commissionAmount = 0;
        this.currencyCommissionId = 0;
        this.createdBy = 0;
        this.updateBy = 0;
        this.commentHomeSales = [];
        this.documentHomeSales = [];
        this.reminderHomeSales = [];
        this.visitHomeSales = [];
    }
    return HomeSaleModel;
}());
var CommentHomeSaleModel = /** @class */ (function () {
    function CommentHomeSaleModel() {
        this.id = 0;
        this.homeSale = 0;
        this.comment = "";
        this.createdBy = 0;
        this.updatedBy = 0;
        this.createdByNavigation = [];
    }
    return CommentHomeSaleModel;
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
var DocumentHomeSaleModel = /** @class */ (function () {
    function DocumentHomeSaleModel() {
        this.id = 0;
        this.homeSale = 0;
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
    return DocumentHomeSaleModel;
}());
var ReminderHomeSaleModel = /** @class */ (function () {
    function ReminderHomeSaleModel() {
        this.id = 0;
        this.homeSale = 0;
        this.reminderComments = "";
        this.createdBy = 0;
    }
    return ReminderHomeSaleModel;
}());
var VisitHomeSalesModel = /** @class */ (function () {
    function VisitHomeSalesModel() {
        this.id = 0;
        this.homeSale = 0;
        this.comment = "";
        this.createdBy = 0;
        this.updateBy = 0;
    }
    return VisitHomeSalesModel;
}());
var SingleComment = /** @class */ (function () {
    function SingleComment() {
        this.comment = '';
    }
    return SingleComment;
}());
