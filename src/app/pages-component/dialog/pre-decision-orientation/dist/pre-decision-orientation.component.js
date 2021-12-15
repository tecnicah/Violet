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
exports.PreDecisionOrientationComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_school_details_component_1 = require("../dialog-school-details/dialog-school-details.component");
var dialog_housing_specifications_component_1 = require("../dialog-housing-specifications/dialog-housing-specifications.component");
var dialog_home_details_component_1 = require("../dialog-home-details/dialog-home-details.component");
var dialog_addchild_component_1 = require("../dialog-addchild/dialog-addchild.component");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var PreDecisionOrientationComponent = /** @class */ (function () {
    function PreDecisionOrientationComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        //VISTA//
        this.show = false;
        //**********************************************//
        //*****************VARIABLES********************//
        //EXTENSION//
        this.dataSource = [];
        this.displayedColumns = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
        //HOUSING LIST//
        this.dataSourceHousing = [];
        this.displayedColumnsHousing = ['Property No.', 'Property Type', 'Address', 'Price', 'Currency', 'Housing Status', 'Actions'];
        //SCHOOLING LIST//
        this.dataSourceSchool = [];
        this.displayedColumnsSchool = ['School No.', 'School Name', 'Dependent', 'Schooling Status', 'Actions'];
        //PAYMENTS
        this.dataSourcePayment = [];
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        this.showPanelHousing = false;
        this.showPanelSchooling = false;
        this.temporalDocument = [];
        // request payment
        this.calculo = {};
        this.payments = [];
        //CATALOGOS_GET//
        this.ca_estatus = [];
        this.ca_requestType = [];
        this.ca_grade = [];
        this.cr = "Reply";
        this.loader = new loader_1.LoaderComponent();
        //***********************************************************************************//
        //GET DEPENDENT//
        this.applicant = [];
        //***********************************************************************************//
        //CONSULTING INFORMATION CATALOGOS//
        this.ca_privacy = [];
    }
    PreDecisionOrientationComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("DATA DE LA TABLA: ", this.data);
        this.loader.showLoader();
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.get_catalogos();
        this.getDataHousing();
        this.getDataSchool();
        this.get_dependent();
        this._services.service_general_get('RelocationServices/GetPredecisionOrientationById?id=' + this.data.data.service[0].id).subscribe((function (data) {
            if (data.success) {
                console.log('DATA CONSULTA: ', data);
                _this.area_orientation = data.result;
                _this.show = true;
                if (_this.area_orientation.commentPredecisionOrientations.length == 0) {
                    _this.addReply();
                }
                _this.showPanelHousing = _this.area_orientation.housing;
                _this.showPanelSchooling = _this.area_orientation.schooling;
                //DATA TABLE EXTENSION//
                _this.dataSource = _this.area_orientation.extensionAreaOrientations;
                _this.getDataHousing();
                _this.getDataSchool();
                _this.get_payment();
                _this.loader.hideLoader();
            }
        }));
    };
    PreDecisionOrientationComponent.prototype.get_dependent = function () {
        var _this = this;
        this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((function (data) {
            if (data.success) {
                console.log(data.applicant.value);
                _this.applicant = data.applicant.value;
            }
        }));
    };
    PreDecisionOrientationComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=12").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_estatus = data.result;
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        _a.ca_privacy = _e.sent();
                        //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
                        _b.nacionality = _e.sent();
                        //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((function (data) {
                            if (data.success) {
                                _this.ca_document = data.result;
                                console.log(_this.ca_document);
                            }
                        }));
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 3:
                        _c.ca_requestType = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetGradeSchooling')];
                    case 4:
                        _d.ca_grade = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //***********************************************************************************//
    //DATA TABLE HOUSING//
    PreDecisionOrientationComponent.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.data.workOrderId)).subscribe((function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
            }
        }));
    };
    //***********************************************************************************//
    PreDecisionOrientationComponent.prototype.getDataSchool = function () {
        var _this = this;
        //BRING DATA TABLE SCHOOLING LIST//
        this._services.service_general_get('SchoolsList/GetAllSchool?sr=' + Number(this.data.sr)).subscribe((function (data_schooling_list) {
            console.log('DATA CONSULTA SCHOOLING LIST: ', data_schooling_list);
            if (data_schooling_list.success) {
                //console.log('DATA CONSULTA SCHOOLING LIST: ',data_schooling_list);
                _this.dataSourceSchool = data_schooling_list.message;
                //BRING DATA TABLE PAYMENTS//
                //this.get_payment();
            }
        }));
    };
    //***********************************************************************************//
    //**CONSULTA PAYMENT**//
    PreDecisionOrientationComponent.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.area_orientation.workOrderServicesId).subscribe((function (data) {
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
    //***********************************************************************************//
    //FUNCTION FOR SHOW PANEL HOUSING//
    PreDecisionOrientationComponent.prototype.displayPanelHosudig = function ($event) {
        this.area_orientation.housing = $event.checked;
        if (this.area_orientation.housing) {
            this.showPanelHousing = true;
        }
        else {
            this.showPanelHousing = false;
        }
    };
    //***********************************************************************************//
    //FUNCTION FOR SHOW PANEL HOUSING//
    PreDecisionOrientationComponent.prototype.displayPanelSchooling = function ($event) {
        this.area_orientation.schooling = $event.checked;
        if (this.area_orientation.schooling) {
            this.showPanelSchooling = true;
        }
        else {
            this.showPanelSchooling = false;
        }
    };
    //***********************************************************************************//
    //**METHODS REMINDER (NEW)**//
    PreDecisionOrientationComponent.prototype.addReminder = function () {
        this.area_orientation.reminderPredecisionOrientations.push({
            "id": 0,
            "predecisionOrientationId": this.area_orientation.id,
            "reminderDate": null,
            "reminderComments": null,
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    //**DELETE REMINDER**//
    PreDecisionOrientationComponent.prototype.removeReminder = function (i, id) {
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
                    _this.area_orientation.predecisionOrientationId.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("ImmigrationServices/DeleteReminderPDO?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Reminder deleted"
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
    //*********************************************************************************//
    //**METHODS COMMENTS (NEW)**//
    PreDecisionOrientationComponent.prototype.addReply = function () {
        console.log(this.user);
        this.area_orientation.commentPredecisionOrientations.push({
            "id": 0,
            "predecisionOrientationId": this.area_orientation.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.area_orientation.commentPredecisionOrientations.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    //**********************************************************************************//
    //HOUSINGS//
    PreDecisionOrientationComponent.prototype.HousingSpecs = function () {
        var data_ = {
            numberWorkOrder: this.data.data.numberWorkOrder,
            serviceID: this.data.data.number_server,
            serviceName: this.data.data.service_name,
            sr: this.data.sr,
            service: this.data.data.serviceTypeId,
            type_housing: 1,
            //workOrderServicesId: this.data.data.workOrderId
            workOrderServicesId: this.area_orientation.workOrderServicesId
        };
        var dialogRef = this._dialog.open(dialog_housing_specifications_component_1.DialogHousingSpecificationsComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
            }
        });
    };
    //NEW RECORD//
    PreDecisionOrientationComponent.prototype.HomeDetailsnew = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: {
                /*
                id: 0,
                workOrder: this.data.data.workOrderId,
                numberWorkOrder: this.data.data.numberWorkOrder,
                serviceID: this.data.data.number_server,
                serviceName:  this.data.data.service_name,
                service: this.data.data.serviceRecordId,
                serviceTypeId : this.data.data.serviceTypeId,
                sr: this.data.sr,
                workOderServicesId: this.area_orientation.workOrderServicesId
                */
                id: 0,
                nuevo: true,
                workOrder: this.data.data.workOrderId,
                workOrderServicesId: this.area_orientation.workOrderServicesId,
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
    PreDecisionOrientationComponent.prototype.editHousing = function (data) {
        var _this = this;
        console.log("Editar Housing: ", data);
        data.supplierType = 3;
        data.workOrderServicesId = this.area_orientation.workOrderServicesId,
            data.sr = this.data.sr;
        data.numberWorkOrder = this.data.data.numberWorkOrder;
        data.serviceID = this.data.data.number_server;
        data.serviceName = this.data.data.service_name;
        //data.sr = this.data.sr;
        var dialogRef = this._dialog.open(dialog_home_details_component_1.DialogHomeDetailsComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataHousing();
        });
    };
    //**********************************************************************************//
    //AGREGAR ESCUELA//
    PreDecisionOrientationComponent.prototype.addSchool = function () {
        var _this = this;
        var data_ = {
            id: 0,
            workOrderId: this.data.data.workOrderId,
            service: this.data.data.serviceRecordId,
            serviceTypeId: this.data.data.serviceTypeId,
            sr: this.data.sr
        };
        var dialogRef = this._dialog.open(dialog_school_details_component_1.DialogSchoolDetailsComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataSchool();
        });
    };
    //EDITAR ESCUELA//
    PreDecisionOrientationComponent.prototype.editSchool = function (data_) {
        var _this = this;
        console.log("Editar escuela: ", data_);
        data_.sr = this.data.sr;
        var dialogRef = this._dialog.open(dialog_school_details_component_1.DialogSchoolDetailsComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataSchool();
        });
    };
    //**********************************************************************************//
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    PreDecisionOrientationComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.area_orientation.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.area_orientation.workOrderServicesId,
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
    //**EDIT REQUEST PAYMENT**//
    PreDecisionOrientationComponent.prototype.editPayment = function (data) {
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
    // delete request payment
    PreDecisionOrientationComponent.prototype.deletePaymentConcept = function (data) {
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
    //**********************************************************************************//
    //**METHODS ADD DOCUMENT**//
    PreDecisionOrientationComponent.prototype.addDocument = function () {
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
                result.predecisionOrientationId = _this.area_orientation.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    //**********************************************************************************//
    //**DELETE DOCUMENTO FROM DATABASE**//
    PreDecisionOrientationComponent.prototype.deleteDocument_DB = function (id) {
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
                _this._services.service_general_delete("RelocationServices/DeleteDocumentPDO?id=" + id).subscribe((function (data) {
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
    //**********************************************************************************//
    //**DELETE DOCUMENT FROM VAR TEMPORALS**//
    PreDecisionOrientationComponent.prototype.deleteDocument_LOCAL = function (position) {
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
                _this.temporalDocument.splice(position, 1);
            }
        });
    };
    //**********************************************************************************//
    //ELIMINAR HIJO//
    PreDecisionOrientationComponent.prototype.deleteChild = function (pos) {
        this.area_orientation.schoolings[pos].active = false;
    };
    //AGREGAR HIJO//
    PreDecisionOrientationComponent.prototype.addChild = function () {
        var _this = this;
        if (this.area_orientation.schoolings.length > 0) {
            var dialogRef = this._dialog.open(dialog_addchild_component_1.DialogAddchildComponent, {
                width: "350px",
                data: this.area_orientation.schoolings
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result.success) {
                    _this.area_orientation.schoolings = result;
                    console.log("NUEVOS HIJOS: ", _this.area_orientation);
                }
            });
        }
        else {
            var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Attention",
                    body: "No data child"
                },
                width: "350px"
            });
        }
    };
    //**********************************************************************************//
    //DOCUMENT TYPE//
    PreDecisionOrientationComponent.prototype.getDocument = function (id) {
        for (var i = 0; i < this.ca_document.length; i++) {
            if (this.ca_document[i].id == id) {
                return this.ca_document[i].documentType;
            }
        }
    };
    //NACIONALITY//
    PreDecisionOrientationComponent.prototype.getNacionality = function (id) {
        for (var i = 0; i < this.nacionality.length; i++) {
            if (this.nacionality[i].id == id) {
                return this.nacionality[i].name;
            }
        }
    };
    //GRADE//
    PreDecisionOrientationComponent.prototype.getGrade = function (id) {
        for (var i = 0; i < this.ca_grade.length; i++) {
            if (this.ca_grade[i].id == id) {
                return this.ca_grade[i].grade;
            }
        }
    };
    //APPLICANT//
    PreDecisionOrientationComponent.prototype.getApplicant = function (id) {
        for (var i = 0; i < this.applicant.length; i++) {
            if (this.applicant[i].dependentId == id) {
                return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    //**********************************************************************************//
    //**********************************************************************************//
    PreDecisionOrientationComponent.prototype.save = function () {
        var _this = this;
        console.log("SAVE INFORMATION: ", this.area_orientation);
        this.area_orientation.documentPredecisionOrientations = this.temporalDocument;
        this.area_orientation.updateBy = this.user.id;
        this.area_orientation.updatedDate = new Date();
        this.area_orientation.createdBy = this.user.id;
        this.area_orientation.createdDate = new Date();
        this.area_orientation.authoDateExtension = new Date();
        this.area_orientation.authoAcceptanceDateExtension = new Date();
        console.log(this.area_orientation);
        var data_comment_aux = this.area_orientation.commentPredecisionOrientations;
        this.area_orientation.commentPredecisionOrientations = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.area_orientation.commentPredecisionOrientations.push(data_comment_aux[i]);
            }
        }
        this.loader.showLoader();
        this._services.service_general_put("RelocationServices/PutPreDecisionOrientation", this.area_orientation).subscribe((function (data) {
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
                _this.loader.hideLoader();
            }
        }));
    };
    PreDecisionOrientationComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.sr,
                document: document,
                name_section: "only_one_service",
                sl: 1
            }
            // aqui se manda sl 1 que en caso de modales de doc es relocation
        });
    };
    //PRIVACY//
    PreDecisionOrientationComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    PreDecisionOrientationComponent = __decorate([
        core_1.Component({
            selector: 'app-pre-decision-orientation',
            templateUrl: './pre-decision-orientation.component.html',
            styleUrls: ['./pre-decision-orientation.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PreDecisionOrientationComponent);
    return PreDecisionOrientationComponent;
}());
exports.PreDecisionOrientationComponent = PreDecisionOrientationComponent;
