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
exports.DialogTemporaryHousingComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var dialog_request_payment_component_1 = require("../dialog-request-payment/dialog-request-payment.component");
var dialog_housing_specifications_component_1 = require("../dialog-housing-specifications/dialog-housing-specifications.component");
var dialog_home_details_component_1 = require("../dialog-home-details/dialog-home-details.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var DialogTemporaryHousingComponent = /** @class */ (function () {
    function DialogTemporaryHousingComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        // variables
        this.dataSource = [];
        this.displayedColumns = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
        this.calculo = {};
        this.payments = [];
        this.document = [];
        this.cr = "Reply";
        // housing list
        this.showPanelHousing = false;
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.image_path = this._services.url_images;
        this.__loader__ = new loader_1.LoaderComponent();
        this.today_date = new Date();
        this.housing_model = new HousingModel();
        /*General Stuff*/
        this.payments_table_data = undefined;
        this.payments_table_fields = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7'];
        this.is_any_payment = false;
        this.comment_string = new SingleComment();
        //**********************************************************************************//
        //HOUSINGS//
        this.dataSourceHousing = [];
        this.displayedColumnsHousing = ['Supplier Partner', 'Supplier', 'Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Status', 'Actions'];
        /******************************************** */
        /* Utilities */
        this.status_catalogue = [];
        this.country_catalogue = [];
        this.currency_catalogue = [];
        this.duration_catalogue = [];
        this.services_catalogue = [];
        this.responsable_catalogue = [];
        this.reservation_catalogue = [];
        this.ca_privacy = [];
        this.documentType = [];
        this.toggle_stay_section = false;
        this.active = false;
    }
    DialogTemporaryHousingComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem("userData"));
        this.initPageApp();
    };
    DialogTemporaryHousingComponent.prototype.initPageApp = function () {
        this.requestHousingData();
        this.getCatalogos();
    };
    DialogTemporaryHousingComponent.prototype.requestHousingData = function () {
        var _this = this;
        this.__loader__.showLoader();
        this._services.service_general_get("RelocationServices/GetTemporaryHousingCoordinatonById?id=" + this.data.sr_id)
            .subscribe(function (response) {
            console.log('Res GetTemporaryHousingCoordinatonById => ', response);
            if (response.success) {
                _this.housing_model = response.result;
                _this.addReply();
                _this.get_supplierPartner();
                _this.housing_model.sr = _this.data.app_id;
                if (_this.housing_model.bathrooms != null)
                    _this.housing_model.bathrooms = _this.housing_model.bathrooms.toString();
                if (_this.housing_model.bedrooms != null)
                    _this.housing_model.bedrooms = _this.housing_model.bedrooms.toString();
                if (_this.housing_model.stayExtensionTemporaryHousings.length != 0) {
                    _this.active = true;
                    //this.toggleStaySection();
                }
                _this.get_payment();
                _this.getDataHousing();
                console.log('this.housing_model ==> ', _this.housing_model);
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (GetTemporaryHousingCoordinatonById) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    //**CONSULTA SUPPLIER PARTNER**//
    DialogTemporaryHousingComponent.prototype.get_supplierPartner = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=1").subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.services_catalogue = data.result.value;
            }
        }));
    };
    DialogTemporaryHousingComponent.prototype.requestPaymentsData = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestPayments?WorkOrderServicesId=" + this.housing_model.workOrderServicesId).subscribe(function (response) {
            console.log('Payments data ====> ', response.result);
            if (response.success) {
                _this.payments_table_data = new table_1.MatTableDataSource(response.result);
                if (response.result.length != 0)
                    _this.is_any_payment = true;
            }
        }, function (error) {
            console.error('Error (RequestPayment) => ', error);
        });
    };
    DialogTemporaryHousingComponent.prototype.requestPayment = function (data) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (data == null) {
            data = {
                WorkOrderServicesId: this.housing_model.workOrderServicesId,
                id: 0
            };
        }
        var dialogRef = this._dialog.open(dialog_request_payment_component_1.DialogRequestPaymentComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.initPageApp();
        });
    };
    //++++++++ consulta payment
    DialogTemporaryHousingComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.housing_model.workOrderServicesId).subscribe((function (data) {
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
    DialogTemporaryHousingComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.housing_model.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.housing_model.workOrderServicesId,
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
    // delete payment
    DialogTemporaryHousingComponent.prototype.deletePaymentConcept = function (data) {
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
    // edit payment
    DialogTemporaryHousingComponent.prototype.editPayment = function (data) {
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
    DialogTemporaryHousingComponent.prototype.AddDocument = function () {
        var _this = this;
        // this.data.sr = this.data.app_id;
        this.data.typeDocument = 1;
        this.data.location = this.data.data.location;
        var dialogRef = this._dialog.open(dialog_documents_relocation_component_1.DialogDocumentsRelocationComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.temporaryHousingCoordinationId = _this.housing_model.id;
                _this.document.push(result);
                console.log(_this.document);
            }
        });
    };
    DialogTemporaryHousingComponent.prototype.addNewReminder = function () {
        var reminder_model = new ReminderTemporaryHousingCoordinatonsModel();
        reminder_model.createdBy = this.user_data.id;
        reminder_model.createdDate = new Date();
        reminder_model.temporaryHousingCoordinationId = this.housing_model.id;
        this.housing_model.reminderTemporaryHousingCoordinatons.push(reminder_model);
    };
    // DeleteOnline(id) {
    //   const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
    //     data: {
    //       header: "Delete confirmation",
    //       body: "Are you sure to delete this document?"
    //     },
    //     width: "350px"
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log(result);
    //     if (result) {
    //       this._services.service_general_delete("RelocationServices/DeleteDocumentTHC?id=" + id).subscribe((data => {
    //         if (data.success) {
    //           const dialog = this._dialog.open(DialogGeneralMessageComponent, {
    //             data: {
    //               header: "Success",
    //               body: data.result
    //             },
    //             width: "350px"
    //           });
    //           this.ngOnInit();
    //         }
    //       }))
    //     }
    //   });
    // }
    //**DELETE DOCUMENT**//
    DialogTemporaryHousingComponent.prototype.removeDocument = function (i, id) {
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
                    _this.document.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("RelocationServices/DeleteDocumentTHC?id=" + id).subscribe((function (data) {
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
    DialogTemporaryHousingComponent.prototype.deleteReminderSelected = function (reminder, index) {
        var _this = this;
        if (reminder.id == 0) {
            this.housing_model.reminderTemporaryHousingCoordinatons.splice(index, 1);
        }
        else {
            this.__loader__.showLoader();
            this._services.service_general_delete("RelocationServices/DeleteReminderTHC?id=" + reminder.id)
                .subscribe(function (response) {
                console.log('Res ==> ', response);
                if (response.success) {
                    var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Reminder Deleted",
                            body: "Reminder has been deleted successfully."
                        }
                    });
                    _this.initPageApp();
                }
            }, function (error) {
                console.error('Error (DeleteReminderTHC) => ', error);
            });
        }
    };
    DialogTemporaryHousingComponent.prototype.deleteExtension = function (extention, i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete extension?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.housing_model.stayExtensionTemporaryHousings.splice(i, 1);
            }
        });
    };
    DialogTemporaryHousingComponent.prototype.addExtention = function () {
        /*
        const new_extention:ExtensionTemporaryHousingCoordinatonsModel = new ExtensionTemporaryHousingCoordinatonsModel();
        new_extention.temporaryHousingCoordinationId = this.housing_model.id;
        new_extention.createdBy = this.user_data.id;
        new_extention.createdDate = new Date();
        new_extention.updateBy = this.user_data.id;
        new_extention.updatedDate = new Date();
        this.housing_model.stayExtensionTemporaryHousings.push( new_extention );
        */
        this.housing_model.stayExtensionTemporaryHousings.push({
            "id": 0,
            "temporaryHousingCoordinationId": this.housing_model.id,
            "initialDate": null,
            "finalDate": null,
            "extraDays": 0,
            "totalDays": 0,
            "comment": "",
            "createdBy": this.user_data.id,
            "createdDate": new Date(),
            "updateBy": this.user_data.id,
            "updatedDate": new Date()
        });
    };
    DialogTemporaryHousingComponent.prototype.addNewComment = function () {
        var new_comment = new CommentTemporaryHosuingsModel();
        new_comment.reply = this.comment_string.comment;
        new_comment.createdBy = this.user_data.id;
        new_comment.createdDate = this.today_date;
        new_comment.temporaryHousingCoordinationId = this.housing_model.id;
        new_comment.userId = this.user_data.id;
        new_comment.user = this.user_data;
        this.housing_model.commentTemporaryHosuings.push(new_comment);
        this.comment_string.comment = '';
    };
    DialogTemporaryHousingComponent.prototype.save_data = function () {
        var _this = this;
        console.log("Informacion a guardar:  ", this.housing_model);
        this.housing_model.updateBy = this.user.id;
        this.housing_model.documentTemporaryHousingCoordinatons = this.document;
        this.housing_model.updatedDate = new Date();
        var data_comment_aux = this.housing_model.commentTemporaryHosuings;
        this.housing_model.commentTemporaryHosuings = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.housing_model.commentTemporaryHosuings.push(data_comment_aux[i]);
            }
        }
        this._services.service_general_put("RelocationServices/PutTemporaryHousingCoordinaton", this.housing_model).subscribe((function (data) {
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
    //***********************************************************************************//
    //DATA TABLE HOUSING//
    DialogTemporaryHousingComponent.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe((function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
            }
        }));
    };
    DialogTemporaryHousingComponent.prototype.HousingSpecs = function () {
        var dialogRef = this._dialog.open(dialog_housing_specifications_component_1.DialogHousingSpecificationsComponent, {
            data: this.housing_model,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
            }
        });
    };
    //NEW RECORD//
    DialogTemporaryHousingComponent.prototype.HomeDetailsnew = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                /*
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                numberWorkOrder: this.data.data.numberWorkOrder,
                serviceID: this.data.data.number_server,
                serviceName:  this.data.data.service_name,
                service: this.data.data.serviceRecordId,
                serviceTypeId : this.data.data.serviceTypeId,
                sr: this.data.sr
                */
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                workOrderServicesId: this.housing_model.workOrderServicesId,
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
    //EDIT HOUSING//
    DialogTemporaryHousingComponent.prototype.editHousing = function (data) {
        var _this = this;
        /*
        data.sr = this.data.sr;
        data.numberWorkOrder = this.data.data.numberWorkOrder;
        data.serviceID =  this.data.data.number_server;
        data.serviceName = this.data.data.service_name;
        */
        data.supplierType = 3;
        data.workOrderServicesId = this.housing_model.workOrderServicesId,
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
    DialogTemporaryHousingComponent.prototype.viewHomeDetails = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                id: 0,
                workOrder: this.data.data.workOrderId,
                service: this.data.data.serviceRecordId,
                serviceTypeId: this.data.data.serviceTypeId,
                sr: this.data.sr
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    DialogTemporaryHousingComponent.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        _a.ca_privacy = _g.sent();
                        //this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=17").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.status_catalogue = data.result;
                            }
                        }));
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.country_catalogue = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 3:
                        _c.currency_catalogue = _g.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 4:
                        _d.duration_catalogue = _g.sent();
                        //this.services_catalogue = await this._services.getCatalogueFrom('GetSupplierBySupplierType?key=1');
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetDependents?sr=" + this.data.app_id)];
                    case 5:
                        //this.services_catalogue = await this._services.getCatalogueFrom('GetSupplierBySupplierType?key=1');
                        _e.responsable_catalogue = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetReservationType')];
                    case 6:
                        _f.reservation_catalogue = _g.sent();
                        //this.documentType = await this._services.getCatalogueFrom('GetDocumentType');
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
    DialogTemporaryHousingComponent.prototype.getValueFromCatalogue = function (catalogue, id_to_find, get_field) {
        var result = '';
        catalogue.forEach(function (item) {
            if (item.id == id_to_find || item.dependentId == id_to_find) {
                result = item[get_field];
            }
        });
        return result;
    };
    // getNameDocument(id_to_find){
    //   return this.getValueFromCatalogue( this.documentType , id_to_find, 'documentType' );
    // }
    //GET DOCUMENT TYPE NAME//
    DialogTemporaryHousingComponent.prototype.getDocumentTypeName = function (id) {
        for (var i = 0; i < this.documentType.length; i++) {
            if (this.documentType[i].id == id) {
                return this.documentType[i].documentType;
            }
        }
    };
    //**METHODS COMMENTS (NEW)**//
    DialogTemporaryHousingComponent.prototype.addReply = function () {
        console.log(this.user);
        this.housing_model.commentTemporaryHosuings.push({
            "id": 0,
            "temporaryHousingCoordinationId": this.housing_model.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.housing_model.commentTemporaryHosuings.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    // public getDocumentCountryOrigin( id_to_find:number ):string {
    //   return this.getValueFromCatalogue( this.country_catalogue , id_to_find, 'name' );
    // }
    //GET COUNTRY ORIGIN NAME//
    DialogTemporaryHousingComponent.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    DialogTemporaryHousingComponent.prototype.getDaysBetweenDatesStaticField = function (model, fields_in, field_to_append) {
        var date_one = new Date(model[fields_in[0]]), date_two = new Date(model[fields_in[1]]), difference_in_time = date_two.getTime() - date_one.getTime(), difference_in_days = difference_in_time / (1000 * 3600 * 24), days_container = document.getElementById(field_to_append);
        this.housing_model.totalDays = difference_in_days;
        console.log("HOUSING MODAL: ", this.housing_model);
        if (!isNaN(difference_in_days) &&
            model[fields_in[0]] != '' && model[fields_in[0]] != null &&
            model[fields_in[1]] != '' && model[fields_in[1]] != null) {
            days_container.value = difference_in_days;
            this.housing_model.stayExtensionTemporaryHousings[field_to_append].totalDays = difference_in_days;
        }
    };
    DialogTemporaryHousingComponent.prototype.toggleStaySection = function (e) {
        console.log(e);
        if (e.checked) {
            this.active = true;
        }
        else {
            this.active = false;
        }
    };
    DialogTemporaryHousingComponent.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    DialogTemporaryHousingComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.sr,
                document: document,
                name_section: "only_one_service",
                sl: 1
            }
        });
    };
    //PRIVACY//
    DialogTemporaryHousingComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    DialogTemporaryHousingComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-temporary-housing',
            templateUrl: './dialog-temporary-housing.component.html',
            styleUrls: ['./dialog-temporary-housing.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogTemporaryHousingComponent);
    return DialogTemporaryHousingComponent;
}());
exports.DialogTemporaryHousingComponent = DialogTemporaryHousingComponent;
var HousingModel = /** @class */ (function () {
    function HousingModel() {
        this.id = 0;
        this.sr = undefined;
        this.coordination = false;
        this.serviceOrderServicesId = 0;
        this.authoDate = '';
        this.authoAcceptanceDate = '';
        this.statusId = '';
        this.serviceCompletionDate = '';
        this.apartment = false;
        this.house = false;
        this.bedrooms = '';
        this.bathrooms = '';
        this.propertyNo = '';
        this.petFrindly = false;
        this.totalAllotedDaysStart = null;
        this.totalAllotedDaysEnd = null;
        this.totalTimeAllowed = '';
        this.totalTimeAllowedId = '';
        this.budget = '';
        this.currency = '';
        this.paymentResponsibilty = '';
        this.paymentsDue = 0;
        this.reservationType = '';
        this.supplierPartner = '';
        this.propertyAddress = '';
        this.neighborhood = '';
        this.finalReservationAmount = '';
        this.currencyFinalReservationAmount = '';
        this.checkIn = '';
        this.checkOut = '';
        this.securityDeposit = '';
        this.curencySecurityDeposit = '';
        this.paymentsDate = '';
        this.totalDays = '';
        this.workOrderServicesId = 0;
        this.extension = false;
        this.comments = '';
        this.createdBy = 0;
        this.updateBy = '';
        this.clientSecurityInspectionRequired = false;
        this.curencySecurityDepositNavigation = undefined;
        this.currencyFinalReservationAmountNavigation = undefined;
        this.currencyNavigation = undefined;
        this.reservationTypeNavigation = undefined;
        this.status = undefined;
        this.supplierPartnerNavigation = undefined;
        this.totalTimeAllowedNavigation = undefined;
        this.documentTemporaryHousingCoordinatons = [];
        this.extensionTemporaryHousingCoordinatons = [];
        this.stayExtensionTemporaryHousings = [];
        this.reminderTemporaryHousingCoordinatons = [];
        this.commentTemporaryHosuings = [];
    }
    return HousingModel;
}());
var CommentTemporaryHosuingsModel = /** @class */ (function () {
    function CommentTemporaryHosuingsModel() {
        this.id = 0;
        this.temporaryHousingCoordinationId = 0;
        this.reply = '';
        this.userId = 0;
        this.createdBy = 0;
        this.createdDate = undefined;
        this.updateBy = 0;
        this.updatedDate = undefined;
        this.user = new UserModel();
    }
    return CommentTemporaryHosuingsModel;
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
var CurencySecurityDepositNavigation = /** @class */ (function () {
    function CurencySecurityDepositNavigation() {
        this.id = 0;
        this.currency = '';
    }
    return CurencySecurityDepositNavigation;
}());
var ReservationTypeNavigation = /** @class */ (function () {
    function ReservationTypeNavigation() {
        this.id = 0;
        this.reservationType = '';
        this.createdBy = 0;
        this.createdDate = '';
        this.updateBy = 0;
        this.updatedDate = '';
        this.temporaryHousingCoordinatons = [];
    }
    return ReservationTypeNavigation;
}());
var StatusModel = /** @class */ (function () {
    function StatusModel() {
        this.id = 0;
        this.status = '';
    }
    return StatusModel;
}());
var SupplierPartnerNavigationModel = /** @class */ (function () {
    function SupplierPartnerNavigationModel() {
        this.id = 0;
        this.supplier = '';
        this.userId = 0;
        this.supplierType = '';
        this.createdBy = 0;
        this.createdDate = '';
        this.updateBy = 0;
        this.updatedDate = '';
    }
    return SupplierPartnerNavigationModel;
}());
var TotalTimeAllowedNavigationModel = /** @class */ (function () {
    function TotalTimeAllowedNavigationModel() {
        this.id = 0;
        this.duration = '';
        this.createdBy = 0;
        this.createdDate = '';
        this.updatedBy = 0;
        this.updateDate = '';
    }
    return TotalTimeAllowedNavigationModel;
}());
var DocumentTemporaryHousingCoordinatonsModel = /** @class */ (function () {
    function DocumentTemporaryHousingCoordinatonsModel() {
        this.fileName = '';
        this.fileRequest = '';
        this.fileExtension = '';
        this.issuingAuthority = '';
        this.comment = '';
        // updatedDate:Date;
        // local:boolean = false;
        this.countryOriginNavigation = new CountryOriginNavigationModel();
    }
    return DocumentTemporaryHousingCoordinatonsModel;
}());
var CountryOriginNavigationModel = /** @class */ (function () {
    function CountryOriginNavigationModel() {
        this.id = 0;
        this.name = '';
        this.sortname = '';
        this.phonecode = '';
    }
    return CountryOriginNavigationModel;
}());
var ExtensionTemporaryHousingCoordinatonsModel = /** @class */ (function () {
    function ExtensionTemporaryHousingCoordinatonsModel() {
        this.id = 0;
        this.temporaryHousingCoordinationId = 0;
        this.initialDate = '';
        this.finalDate = '';
        this.extraDays = 0;
        this.totalDays = 0;
        this.comment = '';
        this.createdBy = 0;
        this.createdDate = undefined;
        this.updateBy = 0;
        this.updatedDate = undefined;
    }
    return ExtensionTemporaryHousingCoordinatonsModel;
}());
var ReminderTemporaryHousingCoordinatonsModel = /** @class */ (function () {
    function ReminderTemporaryHousingCoordinatonsModel() {
        this.id = 0;
        this.temporaryHousingCoordinationId = 0;
        this.reminderDate = '';
        this.reminderComments = '';
        this.createdBy = 0;
        this.createdDate = undefined;
        this.updateBy = 0;
        this.updatedDate = '';
    }
    return ReminderTemporaryHousingCoordinatonsModel;
}());
var SingleComment = /** @class */ (function () {
    function SingleComment() {
        this.comment = '';
    }
    return SingleComment;
}());
