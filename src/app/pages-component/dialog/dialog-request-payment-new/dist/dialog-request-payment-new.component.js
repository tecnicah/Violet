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
exports.DialogRequestPaymentNewComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_document_request_component_1 = require("../dialog-document-request/dialog-document-request.component");
var dialog_document_request_recurrent_component_1 = require("../dialog-document-request-recurrent/dialog-document-request-recurrent.component");
var dialog_payment_concept_component_1 = require("../dialog-payment-concept/dialog-payment-concept.component");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_message_component_1 = require("../general-message/general-message.component");
var moment = require("moment");
var loader_1 = require("app/shared/loader");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var DialogRequestPaymentNewComponent = /** @class */ (function () {
    function DialogRequestPaymentNewComponent(_permissions, dialogRef, data, _services, _dialog) {
        this._permissions = _permissions;
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        this.__loader__ = new loader_1.LoaderComponent();
        this.cr = "Comment";
        this.tabs = "req";
        this.data_ = {
            status: 1,
            nextReminderDate: '',
            documentRequestPayments: [],
            commentRequestPayments: [],
            recurrenceRequestPayments: [],
            documentsPaymentConcept: [],
            payments: [],
            requestedPayments: {
                payments: []
            }
        };
        //*******************************************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        //**********************************************************************//
        //FUNCION PARA CONSULTA DE INFORMACION//
        this.ca_status = [];
        this.ca_document = [];
        this.ca_country = [];
    }
    DialogRequestPaymentNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user_rol = [this.__userlog__.role.role];
        this._permissions.loadPermissions(user_rol);
        console.log("Data que recibe el modal: ", this.data);
        if (this.data.id != 0) {
            this.__loader__.showLoader();
            this._services.service_general_get('RequestPayment/GetRequestPaymentById?requestPaymentId=' + this.data.id).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (data.success) {
                        console.log('DATA CONSULTA DE REQUEST PAYMENT: ', data.result.value);
                        this.data_ = data.result.value.requestPayment;
                        this.data_.nextReminderDate = data.result.value.nextReminderDate;
                        this.data_.documentsPaymentConcept = data.result.value.documentsPaymentConcept;
                        this.data_.requestedPayments = data.result.value.requestedPayments;
                        this.data_.payments = [];
                        this.data.requestPayment = this.data_.id;
                        console.log(this.data_);
                        if (this.data_.recurrenceRequestPayments.length > 0) {
                            //this.data_.recurrencia = this.data_.recurrencePaymentConcepts[0].periodNavigation.recurrence;
                            this.data_.endDate = this.data_.recurrenceRequestPayments[0].endDate;
                        }
                        this.__loader__.hideLoader();
                    }
                    return [2 /*return*/];
                });
            }); });
        }
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.tabs = "req";
        this.__loader__.hideLoader();
        this.getCatalogos();
        this.consultaPermisos();
    };
    DialogRequestPaymentNewComponent.prototype.consultaPermisos = function () {
        var _this = this;
        console.log("CONSULTA PARA PERMISOS DE USUARIO");
        var url = localStorage.getItem('url_permisos');
        this._services.service_general_get('Role/' + url).subscribe(function (data) {
            if (data.success) {
                console.log("Permisos: ", data.result.value);
                _this.permission_read = data.result.value[0].reading;
                _this.permission_write = data.result.value[0].writing;
                _this.permission_edit = data.result.value[0].editing;
                _this.permission_delete = data.result.value[0].deleting;
            }
        });
    };
    DialogRequestPaymentNewComponent.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestPaymentStatus')];
                    case 1:
                        _a.ca_status = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType')];
                    case 2:
                        _b.ca_document = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 3:
                        _c.ca_country = _d.sent();
                        console.log("estatus: ", this.ca_status);
                        return [2 /*return*/];
                }
            });
        });
    };
    //**********************************************************************//
    //FUNCION PARA AGREGAR NUEVO DOCUMENTO//
    DialogRequestPaymentNewComponent.prototype.getDocument = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            data: {
                sr: this.data.sr
            },
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                console.log(result);
                result.requestPaymentId = _this.data.id;
                _this.data_.documentRequestPayments.push(result);
            }
        });
    };
    //**********************************************************************//
    //FUNCION PARA AGREGAR NUEVO COMENTARIO//
    DialogRequestPaymentNewComponent.prototype.addComment = function () {
        this.data_.commentRequestPayments.push({
            "id": 0,
            "requestPaymentId": this.data.id,
            "reply": '',
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.data_.commentRequestPayments.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    //**********************************************************************//
    //EDICION DE PAYMENT CONCEPT//
    DialogRequestPaymentNewComponent.prototype.editConcept = function (item, i) {
        var _this = this;
        item.type = 2, //service line
            item.supplierType = 3,
            item["new"] = true;
        item.operacion = 'edicion';
        item.requestPayment = this.data.requestPayment;
        console.log(item);
        var dialogRef = this._dialog.open(dialog_payment_concept_component_1.DialogPaymentConceptComponent, {
            data: item,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                _this.data_.payments[i] = result;
            }
        });
    };
    //EDICION DEL CONCEPTO  ONLINE//
    DialogRequestPaymentNewComponent.prototype.editConceptBD = function (item, i) {
        var _this = this;
        item.type = 2, //service line
            item.supplierType = 3,
            item["new"] = true;
        item.operacion = 'edicion';
        item.serviceRecord = Number(this.data.sr);
        item.requestPayment = this.data.requestPayment;
        console.log(item);
        var dialogRef = this._dialog.open(dialog_payment_concept_component_1.DialogPaymentConceptComponent, {
            data: item,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                _this.ngOnInit();
                //this.data_.requestedPayments.payments[i] = result;
            }
        });
    };
    //**********************************************************************//
    DialogRequestPaymentNewComponent.prototype.viewDocumentRequest = function (item) {
        item.sr = this.data.sr;
        console.log(item);
        var dialogRef = this._dialog.open(dialog_document_request_component_1.DialogDocumentRequestComponent, {
            data: item,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    //**********************************************************************//
    //FUNCION PARA AGREGAR LA RECURRENCIA//
    DialogRequestPaymentNewComponent.prototype.viewRecurrent = function () {
        var _this = this;
        localStorage.setItem('month', '5');
        var dialogRef = this._dialog.open(dialog_document_request_recurrent_component_1.DialogDocumentRequestRecurrentComponent, {
            width: "35%",
            data: this.data_.recurrenceRequestPayments[0]
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("recurrencia: ", result);
            if (result.success) {
                var fechas = [];
                var fecha1 = moment(result.startDate);
                _this.data_.endDate = result.endDate;
                _this.data_.recurrencia = result.periodName;
                //if(result.day == undefined){ result.day = 1 }
                if (result.period == 5) {
                    result.type_period = 'month';
                }
                if (result.period == 4) {
                    result.type_period = 'week';
                }
                fechas.push({
                    "id": 0,
                    "requestPayment": _this.data.id,
                    "repeatEvery": result.repeatEvery,
                    "period": result.period,
                    "startDate": result.startDate,
                    "never": result.never,
                    "date": result.date,
                    "endDate": result.endDate,
                    "success": result.success,
                    "createdBy": result.createdBy,
                    "createdDate": result.createdDate,
                    "updatedBy": result.updatedBy,
                    "updatedDate": result.updatedDate,
                    "nextDateReminder": new Date(fecha1.add(result.repeatEvery, result.type_period).toString())
                });
                _this.data_.nextReminderDate = fechas[0].nextDateReminder;
                console.log('fechas: ', fechas);
                _this.data_.recurrenceRequestPayments = fechas;
            }
        });
    };
    //**********************************************************************//
    //FUNCION PARA AGREGAR NUEVO CONCEPTO DE PAGO//
    DialogRequestPaymentNewComponent.prototype.addNewConcept = function () {
        var _this = this;
        if (this.data.supplierType == undefined) {
            this.data.supplierType = 3;
        }
        if (this.data.type == undefined) {
            this.data.type = 2;
        }
        var data_ = {
            serviceRecord: Number(this.data.sr),
            id: 0,
            type: this.data.type,
            supplierType: this.data.supplierType,
            "new": true,
            service: this.data.service,
            workOrder: this.data.workOrder,
            workOrderServices: this.data.workOrderServices,
            requestPayment: this.data.requestPayment
        };
        var dialogRef = this._dialog.open(dialog_payment_concept_component_1.DialogPaymentConceptComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.requestPayment = _this.data.id;
                _this.data_.payments.push(result);
                console.log(_this.data_);
            }
        });
    };
    //**********************************************************************//
    DialogRequestPaymentNewComponent.prototype.showTabSelected = function (which_tab, event_data) {
        console.log('Tab selected ===> ', which_tab);
        this.tabs = which_tab;
        if (which_tab == 'req') {
        }
        if (which_tab == 'con') {
        }
        var tab_selected = document.getElementById("tab_" + which_tab), tab_parent = tab_selected.parentElement.children, event = event_data.target, tabs_container = document.getElementById('tabs');
        for (var index = 0; index < tab_parent.length; index += 1) {
            tab_parent[index].classList.add('display-none');
            tabs_container.children[index].classList.remove('page__section-tab--active');
            tabs_container.children[index].id = "0";
        }
        tab_selected.classList.remove('display-none');
        event.classList.add('page__section-tab--active');
        event.id = "active-tab";
    };
    //**********************************************************************//
    DialogRequestPaymentNewComponent.prototype.save = function () {
        if (!this.data.id) {
            this.insertDB();
        }
        else {
            this.updateBD();
        }
    };
    //**********************************************************************//
    //POST EN BASE DE DATOS
    DialogRequestPaymentNewComponent.prototype.insertDB = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.data_.id = 0;
        this.data_.title = null;
        this.data_.country = null;
        this.data_.city = null;
        this.data_.urgent = null;
        this.data_.createdBy = this.user.id;
        this.data_.createdDate = new Date(),
            this.data_.updatedBy = this.user.id;
        this.data_.updatedDate = new Date();
        this.data_.workOrderServicesId = this.data_.payments[0].workPayment;
        console.log(this.data_);
        console.log(JSON.stringify(this.data_));
        this._services.service_general_post_with_url("RequestPayment/PostRequestPayment", this.data_).subscribe((function (data) {
            if (data.success) {
                console.log('request payment', data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Save Data"
                    },
                    width: "350px"
                });
                //this.dialogRef.close();
                _this.__loader__.hideLoader();
                _this.dialogRef.close();
            }
        }), function (err) {
            console.log(err);
            _this.__loader__.hideLoader();
        });
    };
    //**********************************************************************//
    //UPDATE DATA//
    DialogRequestPaymentNewComponent.prototype.updateBD = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.data_.updatedBy = this.user.id;
        this.data_.updatedDate = new Date();
        this.data_.workOrderServicesId = this.data_.workOrderServicesId;
        var documentos = this.data_.documentRequestPayments;
        this.data_.documentRequestPayments = [];
        documentos.forEach(function (E) {
            if (E.id == 0) {
                _this.data_.documentRequestPayments.push(E);
            }
        });
        var comment;
        for (var i = 0; i < this.data_.payments.length; i++) {
            comment = this.data_.payments[i].commentPaymentConcepts;
            for (var j = 0; j < comment.length; j++) {
                if (comment[j].user) {
                    comment[j].user.profileUsers = null;
                }
            }
        }
        console.log(this.data_);
        console.log(JSON.stringify(this.data_));
        this._services.service_general_put("RequestPayment/PutRequestPayment", this.data_).subscribe((function (data) {
            if (data.success) {
                console.log('request payment', data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Updated Data"
                    },
                    width: "350px"
                });
                //this.dialogRef.close();
                _this.__loader__.hideLoader();
                _this.dialogRef.close();
            }
        }), function (err) {
            console.log(err);
            _this.__loader__.hideLoader();
        });
    };
    //**********************************************************************//
    //CITY ORIGIN//
    DialogRequestPaymentNewComponent.prototype.getNameCountry = function (id) {
        for (var i = 0; i < this.ca_country.length; i++) {
            if (this.ca_country[i].id == id) {
                return this.ca_country[i].name;
            }
        }
    };
    //**********************************************************************//
    //DOCUMENT TYPE//
    DialogRequestPaymentNewComponent.prototype.getNameDocument = function (id) {
        for (var i = 0; i < this.ca_document.length; i++) {
            if (this.ca_document[i].id == id) {
                return this.ca_document[i].documentType;
            }
        }
        return id;
    };
    //**********************************************************************//
    //DELETE PAYMENT CONCEPT (ON DATABASE)//
    DialogRequestPaymentNewComponent.prototype.deletePaymentConcept = function (data) {
        var _this = this;
        console.log(data);
        debugger;
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
                        _this.ngOnInit();
                    }
                }));
            }
        });
    };
    //**********************************************************************//
    //DELETE PATMENT CONCEPT (NO DATABASE)//
    DialogRequestPaymentNewComponent.prototype.deletePaymentConcept_ = function (data, i) {
        var _this = this;
        console.log(data);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this payment concept"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_.payments.splice(i, 1);
            }
        });
    };
    DialogRequestPaymentNewComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-request-payment-new',
            templateUrl: './dialog-request-payment-new.component.html',
            styleUrls: ['./dialog-request-payment-new.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogRequestPaymentNewComponent);
    return DialogRequestPaymentNewComponent;
}());
exports.DialogRequestPaymentNewComponent = DialogRequestPaymentNewComponent;
