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
exports.DialogRequestedInvoiceComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var dialog_requested_invoices_document_component_1 = require("../dialog-requested-invoices-document/dialog-requested-invoices-document.component");
var general_message_component_1 = require("../general-message/general-message.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var DialogRequestedInvoiceComponent = /** @class */ (function () {
    function DialogRequestedInvoiceComponent(_permissions, dialogRef, data, _services, _dialog) {
        this._permissions = _permissions;
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.show = false;
        this.today = new Date();
        this.temporalDocument = [];
        this.data_registro = {};
        this.data_put = {
            commentInvoices: [],
            documentInvoices: [],
            additionalExpenses: [],
            serviceInvoices: []
        };
        this.invoiceDetail = false;
        this.additionalDetail = false;
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        this.__loader__ = new loader_1.LoaderComponent();
        //**************************************************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        //**************************************************************************************************//
        //REALIZAMOS CONSULTA DE LOS CATALOGOS//
        this.ca_paymentMetohod = [];
        this.ca_status = [];
        this.ca_document = [];
        //**************************************************************************************************//
        //VALIDACIONES//
        this.active_payment = false;
        this.active_invoice = false;
        this.active_method = false;
    }
    DialogRequestedInvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem('userData'));
        var user_rol = [this.__userlog__.role.role];
        this.type_user = user_rol;
        this._permissions.loadPermissions(user_rol);
        this.getCatalogos();
        this.consultaPermisos();
        console.log(this.data);
        this._services.service_general_get('Invoice/GetInvoiceById?key=' + this.data.id).subscribe((function (data) {
            if (data.success) {
                console.log(data.result.value);
                _this.data_registro = data.result.value;
                if (_this.data_registro.requestInvoice.services.length > 0) {
                    _this.invoiceDetail = true;
                }
                if (_this.data_registro.requestInvoice.additionalExpense.length > 0) {
                    _this.additionalDetail = true;
                }
                _this.show = true;
                _this.__loader__.hideLoader();
            }
        }));
    };
    DialogRequestedInvoiceComponent.prototype.consultaPermisos = function () {
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
    DialogRequestedInvoiceComponent.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentMethod')];
                    case 1:
                        _a.ca_paymentMetohod = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusInvoice')];
                    case 2:
                        _b.ca_status = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType')];
                    case 3:
                        _c.ca_document = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //**************************************************************************************************//
    //REALIZAMOS CONSULTA DE NOMBRE DE DOCUMENTO//
    DialogRequestedInvoiceComponent.prototype.getDocument = function (id) {
        for (var index = 0; index < this.ca_document.length; index++) {
            if (this.ca_document[index].id = id) {
                return this.ca_document[index].documentType;
            }
        }
    };
    //**************************************************************************************************//
    //REALIZAMOS LA INSERCCION DE NUEVAS REPLICAS O COMENTARIO INICIAL//
    DialogRequestedInvoiceComponent.prototype.addReply = function () {
        this.data_put.commentInvoices.push({
            "id": 0,
            "invoice": this.data_registro.requestInvoice.id,
            "comment": '',
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
    };
    //**************************************************************************************************//
    //REALIZAMOS LA INSERCCION DE NUEVOS DOCUMENTOS PARA FINANCE O CONSULTANT//
    DialogRequestedInvoiceComponent.prototype.addDocument = function (type) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_requested_invoices_document_component_1.DialogRequestedInvoicesDocumentComponent, {
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.type = type;
                result.invoice = _this.data_registro.requestInvoice.id;
                _this.temporalDocument.push(result);
                console.log(_this.temporalDocument);
            }
        });
    };
    //**************************************************************************************************//
    //ELIMINAR DOCUMENTO//
    DialogRequestedInvoiceComponent.prototype.deleteDocument = function (i) {
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
    //**************************************************************************************************//
    //VISUALIZAR DOCUMENTO//
    DialogRequestedInvoiceComponent.prototype.showDocumentDialogDetails = function (item) {
        console.log(item);
        var server_url = this._services.url_images + item.documet;
        window.open(server_url);
    };
    DialogRequestedInvoiceComponent.prototype.valida_campos = function () {
        console.log(this.type_user);
        var contador = 0;
        var respaldo_documentos = [];
        respaldo_documentos = this.temporalDocument;
        if (this.data_registro.requestInvoice.document.length > 0) {
            this.temporalDocument = [];
            this.temporalDocument = this.data_registro.requestInvoice.document;
        }
        if (this.type_user[0] == "Finance") {
            if (this.data_registro.requestInvoice.paymentNumber == undefined || this.data_registro.requestInvoice.paymentNumber.length == 0) {
                this.active_payment = true;
            }
            for (var i = 0; i < this.temporalDocument.length; i++) {
                if (this.temporalDocument[i].type == 2) {
                    contador++;
                }
            }
            if (contador == 0) {
                var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Attention",
                        body: "Add Document"
                    },
                    width: "350px"
                });
            }
            if (contador > 0 && this.data_registro.requestInvoice.paymentNumber != undefined && this.data_registro.requestInvoice.paymentNumber.length > 0) {
                this.temporalDocument = respaldo_documentos;
                this.save();
            }
        }
        else if (this.type_user[0] == "Supplier") {
            for (var i = 0; i < this.temporalDocument.length; i++) {
                if (this.temporalDocument[i].type == 1) {
                    contador++;
                }
            }
            if (contador == 0) {
                var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Attention",
                        body: "Add Document"
                    },
                    width: "350px"
                });
            }
            if (this.data_registro.requestInvoice.invoiceObjectGeneral.methodPayment == undefined) {
                this.active_method = true;
            }
            if (this.data_registro.requestInvoice.invoiceObjectGeneral.inoviceNo == undefined || this.data_registro.requestInvoice.invoiceObjectGeneral.inoviceNo.length == 0) {
                this.active_invoice = true;
            }
            if (contador > 0 && this.data_registro.requestInvoice.paymentNumber != undefined && this.data_registro.requestInvoice.invoiceObjectGeneral.methodPayment != undefined) {
                this.temporalDocument = respaldo_documentos;
                this.save();
            }
        }
    };
    //**************************************************************************************************//
    //REALIZAMOS OPERACION PUT//
    DialogRequestedInvoiceComponent.prototype.save = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.data_put.serviceInvoices = [];
        this.data_put.documentInvoices = this.temporalDocument;
        this.data_put.id = this.data_registro.requestInvoice.invoiceObjectGeneral.id;
        this.data_put.serviceRecord = this.data_registro.requestInvoice.invoiceObjectGeneral.serviceRecord;
        this.data_put.invoiceType = this.data_registro.requestInvoice.invoiceObjectGeneral.invoiceType;
        this.data_put.consultant = this.data_registro.requestInvoice.invoiceObjectGeneral.consultant;
        this.data_put.comments = this.data_registro.requestInvoice.comments;
        this.data_put.inoviceNo = this.data_registro.requestInvoice.invoiceObjectGeneral.inoviceNo;
        this.data_put.paymentNumber = this.data_registro.requestInvoice.paymentNumber;
        this.data_put.methodPayment = this.data_registro.requestInvoice.invoiceObjectGeneral.methodPayment;
        this.data_put.paymentId = this.data_registro.requestInvoice.invoiceObjectGeneral.paymentId;
        this.data_put.createdBy = this.user.id;
        this.data_put.createdDate = new Date();
        this.data_put.updatedBy = this.user.id;
        this.data_put.updatedDate = new Date();
        this.data_put.serviceInvoices.push({
            "id": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].id,
            "invoice": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].invoice,
            "workOrder": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].workOrder,
            "service": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].service,
            "serviceLine": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].serviceLine,
            "typeService": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].typeService,
            "status": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].status,
            "toInvoice": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].toInvoice,
            "hourInvoice": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].hourInvoice,
            "amountToInvoice": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].amountToInvoice,
            "createdBy": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].createdBy,
            "createdDate": this.data_registro.requestInvoice.invoiceObjectGeneral.serviceInvoices[0].createdDate,
            "updatedBy": this.user.id,
            "updatedDate": new Date()
        });
        var data_comment_aux = this.data_put.commentInvoices;
        this.data_put.commentInvoices = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
                data_comment_aux[i].user.profileUsers = [];
                this.data_put.commentInvoices.push(data_comment_aux[i]);
            }
        }
        console.log(this.data_registro);
        console.log(this.data_put);
        console.log(JSON.stringify(this.data_put));
        this._services.service_general_put("Invoice", this.data_put).subscribe((function (data) {
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
                _this.__loader__.hideLoader();
            }
        }), function (err) {
            _this.__loader__.hideLoader();
            console.log("error: ", err);
        });
    };
    DialogRequestedInvoiceComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-requested-invoice',
            templateUrl: './dialog-requested-invoice.component.html',
            styleUrls: ['./dialog-requested-invoice.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogRequestedInvoiceComponent);
    return DialogRequestedInvoiceComponent;
}());
exports.DialogRequestedInvoiceComponent = DialogRequestedInvoiceComponent;
