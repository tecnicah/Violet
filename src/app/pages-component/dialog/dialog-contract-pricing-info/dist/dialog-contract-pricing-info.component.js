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
exports.DialogContractPricingInfoComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_documents_lead_client_component_1 = require("../dialog-documents-lead-client/dialog-documents-lead-client.component");
var DialogContractPricingInfoComponent = /** @class */ (function () {
    function DialogContractPricingInfoComponent(dialogRef, _services, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this.data = data;
        this._dialog = _dialog;
        this.minDate = new Date();
        this.caCompanyType = [];
        this.caResponsiblePremierOffice = [];
        this.caLifeCircle = [];
        this.caSuccessProbability = [];
        this.caReferrelFee = [];
        this.caDuration = [];
        this.caPrecingSchedule = [];
        this.caDocumentType = [];
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    DialogContractPricingInfoComponent.prototype.consultaPermisos = function () {
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
    DialogContractPricingInfoComponent.prototype.ngOnInit = function () {
        this.consultaPermisos();
        console.log(this.data);
        if (this.data.documentGeneralContractPricingInfos) { }
        else {
            this.data.documentGeneralContractPricingInfos = [];
        }
        this.catalogos();
    };
    DialogContractPricingInfoComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCompanyType')];
                    case 1:
                        _a.caCompanyType = _j.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetResponsiblePremierOffice')];
                    case 2:
                        _b.caResponsiblePremierOffice = _j.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLifeCircle')];
                    case 3:
                        _c.caLifeCircle = _j.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSuccessProbabilityRepository')];
                    case 4:
                        _d.caSuccessProbability = _j.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetReferrelFee')];
                    case 5:
                        _e.caReferrelFee = _j.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCatPaymentRecurrence')];
                    case 6:
                        _f.caDuration = _j.sent();
                        // this.caDuration = await this._services.getCatalogueFrom('GetPaymentRecurrence');
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrecingSchedule')];
                    case 7:
                        // this.caDuration = await this._services.getCatalogueFrom('GetPaymentRecurrence');
                        _g.caPrecingSchedule = _j.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType/1')];
                    case 8:
                        _h.caDocumentType = _j.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogContractPricingInfoComponent.prototype.getDocument = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            var element = this.caDocumentType[i];
            if (id == element.id) {
                return element.documentType;
            }
        }
    };
    DialogContractPricingInfoComponent.prototype.getReferralFerr = function (id) {
        for (var i = 0; i < this.caReferrelFee.length; i++) {
            if (this.caReferrelFee[i].id == id) {
                return this.caReferrelFee[i].referralFee1;
            }
        }
    };
    DialogContractPricingInfoComponent.prototype.namepricing = function () {
        for (var i = 0; i < this.caPrecingSchedule.length; i++) {
            var element = this.caPrecingSchedule[i];
            if (this.data.idPricingSchedule == element.id) {
                this.data.pricingSchedule1 = element.pricingSchedule1;
            }
        }
    };
    DialogContractPricingInfoComponent.prototype.namepaymentRecurrence = function () {
        for (var i = 0; i < this.caDuration.length; i++) {
            var element = this.caDuration[i];
            if (this.data.idPaymentRecurrence == element.id) {
                this.data.paymentRecurrence1 = element.name;
            }
        }
    };
    DialogContractPricingInfoComponent.prototype.DialogDocumentsLeadClientComponent = function (data) {
        var _this = this;
        if (data == null) {
            data = { id: 0 };
        }
        var dialogRef = this._dialog.open(dialog_documents_lead_client_component_1.DialogDocumentsLeadClientComponent, {
            data: data, width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.idGeneralContractPricingInfo = _this.data.id;
                console.log(result);
                _this.data.documentGeneralContractPricingInfos.push(result);
            }
        });
    };
    DialogContractPricingInfoComponent.prototype.save = function () {
        var referal = this.getReferralFerr(this.data.idReferralFee);
        this.data['referralFee'] = referal;
        console.log(referal);
        this.data.success = true;
        this.dialogRef.close(this.data);
    };
    DialogContractPricingInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-contract-pricing-info',
            templateUrl: './dialog-contract-pricing-info.component.html',
            styleUrls: ['./dialog-contract-pricing-info.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogContractPricingInfoComponent);
    return DialogContractPricingInfoComponent;
}());
exports.DialogContractPricingInfoComponent = DialogContractPricingInfoComponent;
