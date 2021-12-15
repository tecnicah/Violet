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
exports.DialogOfficeInformationComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var dialog_contacts_component_1 = require("../dialog-contacts/dialog-contacts.component");
var dialog_documents_lead_client_component_1 = require("../dialog-documents-lead-client/dialog-documents-lead-client.component");
var dialog_wire_transfer_component_1 = require("../dialog-wire-transfer/dialog-wire-transfer.component");
var general_message_component_1 = require("../general-message/general-message.component");
var DialogOfficeInformationComponent = /** @class */ (function () {
    function DialogOfficeInformationComponent(dialogRef, _services, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this.data = data;
        this._dialog = _dialog;
        this.caCountry = [];
        this.ccity = [];
        this.caTypeOffice = [];
        this.ca_accountType = [];
        this.ca_creditCard = [];
        this.ca_currency = [];
        this.caDocumentType = [];
        this.ca_account = [];
        this.paymentMetod = false;
        this.ELEMENT_DATA = [
            { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
            { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
            { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
            { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
        ];
        this.dataSource = new table_1.MatTableDataSource(this.ELEMENT_DATA);
        this.siete = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete'];
        this.userData = JSON.parse(localStorage.getItem('userData'));
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        this.ca_contactType = [];
        this.ca_city = [];
        //*************************************************************//
        //VALIDACIONES//
        this.active_type = false;
        this.active_comercialName = false;
        this.active_legalName = false;
        this.active_country = false;
        this.active_city = false;
        this.active_address = false;
        this.active_code = false;
        this.active_contact = false;
    }
    DialogOfficeInformationComponent.prototype.consultaPermisos = function () {
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
    //*********************************************//
    DialogOfficeInformationComponent.prototype.ngOnInit = function () {
        this.consultaPermisos();
        console.log(this.data);
        if (this.data.officeContacts) {
            this.officeContacts = new table_1.MatTableDataSource(this.data.officeContacts);
        }
        else {
            this.data.officeContacts = [];
            this.data.documentOfficeInformations = [];
        }
        if (!this.data.paymentInformationOffices) {
            this.data.paymentInformationOffices = [];
            this.data.paymentInformationOffices.push({
                wireTransferPaymentInformationOffices: [],
                id: 0,
                idOfficeInformation: this.data.id,
                fiscalInvoice: false,
                creditCard: false,
                checks: false,
                payToOrderOf: "",
                cash: false,
                comment: "",
                generalComment: "",
                createdBy: this.userData.id,
                createdDate: new Date(),
                updatedBy: this.userData.id,
                updatedDate: new Date()
            });
        }
        if (this.data.idCountry != null && this.data.idCountry != undefined && this.data.idCountry != 0) {
            this.getcity(this.data);
        }
        this.catalogos();
        console.log('data push', this.data);
    };
    DialogOfficeInformationComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
    };
    DialogOfficeInformationComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCountry = _k.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTypeOffice')];
                    case 2:
                        _b.caTypeOffice = _k.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 3:
                        _c.ca_accountType = _k.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 4:
                        _d.ca_creditCard = _k.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 5:
                        _e.ca_currency = _k.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType/1')];
                    case 6:
                        _f.caDocumentType = _k.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 7:
                        _g.ca_account = _k.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetContactType')];
                    case 8:
                        _h.ca_contactType = _k.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCity')];
                    case 9:
                        _j.ca_city = _k.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogOfficeInformationComponent.prototype.get_contacType = function (id) {
        for (var i = 0; i < this.ca_contactType.length; i++) {
            if (this.ca_contactType[i].id == id) {
                return this.ca_contactType[i].type;
            }
        }
        return id;
    };
    DialogOfficeInformationComponent.prototype.get_city = function (id) {
        for (var i = 0; i < this.ca_city.length; i++) {
            if (this.ca_city[i].id == id) {
                return this.ca_city[i].city;
            }
        }
        return id;
    };
    DialogOfficeInformationComponent.prototype.get_account = function (id) {
        for (var i = 0; i < this.ca_account.length; i++) {
            if (this.ca_account[i].id == id) {
                return this.ca_account[i].accountType;
            }
        }
        return id;
    };
    DialogOfficeInformationComponent.prototype.getDocument = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            var element = this.caDocumentType[i];
            if (id == element.id) {
                return element.documentType;
            }
        }
    };
    DialogOfficeInformationComponent.prototype.DialogDocumentsLeadClientComponent = function (data) {
        var _this = this;
        if (data == null) {
            data = { id: 0 };
        }
        var dialogRef = this._dialog.open(dialog_documents_lead_client_component_1.DialogDocumentsLeadClientComponent, {
            data: data, width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.idOfficeInformation = _this.data.id;
                console.log(result);
                _this.data.documentOfficeInformations.push(result);
            }
        });
    };
    DialogOfficeInformationComponent.prototype.getcity = function (data) {
        var _this = this;
        this._services.service_general_get("Catalogue/GetState?country=" + data.idCountry).subscribe((function (data) {
            if (data.success) {
                _this.ccity = data.result;
            }
        }));
    };
    DialogOfficeInformationComponent.prototype.typename = function () {
        for (var i = 0; i < this.caTypeOffice.length; i++) {
            var element = this.caTypeOffice[i];
            if (this.data.idTypeOffice == element.id) {
                this.data.typeOffice = element.type;
            }
        }
    };
    DialogOfficeInformationComponent.prototype.countryname = function () {
        for (var i = 0; i < this.caCountry.length; i++) {
            var element = this.caCountry[i];
            if (this.data.idCountry == element.id) {
                this.data.country = element.name;
            }
        }
    };
    DialogOfficeInformationComponent.prototype.cityname = function () {
        for (var i = 0; i < this.ccity.length; i++) {
            var element = this.ccity[i];
            if (this.data.idCity == element.id) {
                this.data.typeOffice = element.state;
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //contacts
    DialogOfficeInformationComponent.prototype.dialogContact = function (data, i) {
        var _this = this;
        console.log(data, i);
        if (data == null) {
            data = { id: 0, action: "new" };
        }
        else {
            data.action = i;
        }
        data.caCity = this.ccity;
        var dialogRef = this._dialog.open(dialog_contacts_component_1.DialogContactsComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                if (result.action == "new") {
                    result.idOfficeInformation = _this.data.id;
                    if (_this.data.id == 0) {
                        _this.data.officeContacts.push(result);
                    }
                    else {
                        _this._services.service_general_putnoapi('AddOfficeContact', result).subscribe(function (r) {
                            if (r.success) {
                                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Inserted data"
                                    },
                                    width: "350px"
                                });
                            }
                        });
                    }
                }
                else {
                    _this._services.service_general_putnoapi('UpdateOfficeContact', result).subscribe(function (r) {
                        if (r.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Updated data"
                                },
                                width: "350px"
                            });
                        }
                    });
                }
                console.log(_this.data.officeContacts);
                _this.officeContacts = new table_1.MatTableDataSource(_this.data.officeContacts);
            }
        });
    };
    DialogOfficeInformationComponent.prototype.editWireTransfer = function (data_, i) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_wire_transfer_component_1.DialogWireTransferComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data.paymentInformationOffices[0].wireTransferPaymentInformationOffices[i] = result;
            }
        });
    };
    DialogOfficeInformationComponent.prototype.addWireTransfer = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_wire_transfer_component_1.DialogWireTransferComponent, {
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.idPaymentInformationOffice = _this.data.id;
                if (_this.data.paymentInformationOffices[0].wireTransferPaymentInformationOffices) {
                    _this.data.paymentInformationOffices[0].wireTransferPaymentInformationOffices.push(result);
                }
                else {
                    _this.data.paymentInformationOffices.push({
                        wireTransferPaymentInformationOffices: [result]
                    });
                }
                debugger;
            }
        });
    };
    DialogOfficeInformationComponent.prototype.valida_form = function () {
        if (this.data.idTypeOffice == undefined) {
            this.active_type = true;
        }
        if (this.data.commercialName == undefined || this.data.commercialName.length == 0) {
            this.active_comercialName = true;
        }
        if (this.data.legalName == undefined || this.data.legalName.length == 0) {
            this.active_legalName = true;
        }
        if (this.data.idCountry == undefined) {
            this.active_country = true;
        }
        if (this.data.idCity == undefined) {
            this.active_city = true;
        }
        if (this.data.currentAddress == undefined || this.data.currentAddress.length == 0) {
            this.active_address = true;
        }
        if (this.data.zipCode == undefined || this.data.zipCode.length == 0) {
            this.active_code = true;
        }
        if (this.data.officeContacts == undefined || this.data.officeContacts.length == 0) {
            window.scrollTo(0, 350);
            var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Contact",
                    body: "Required a Contact"
                },
                width: "350px"
            });
            this.active_contact = true;
        }
        if (this.data.idTypeOffice != undefined && this.data.commercialName != undefined && this.data.legalName != undefined
            && this.data.idCountry != undefined && this.data.idCity != undefined && this.data.currentAddress != undefined
            && this.data.zipCode != undefined && this.data.officeContacts.length != 0) {
            this.save();
        }
    };
    DialogOfficeInformationComponent.prototype.save = function () {
        this.data.success = true;
        this.dialogRef.close(this.data);
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], DialogOfficeInformationComponent.prototype, "sort");
    DialogOfficeInformationComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-office-information',
            templateUrl: './dialog-office-information.component.html',
            styleUrls: ['./dialog-office-information.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogOfficeInformationComponent);
    return DialogOfficeInformationComponent;
}());
exports.DialogOfficeInformationComponent = DialogOfficeInformationComponent;
