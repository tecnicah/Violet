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
exports.DialogAddCountrySeccionCountryComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_documents_lead_client_component_1 = require("../dialog-documents-lead-client/dialog-documents-lead-client.component");
var DialogAddCountrySeccionCountryComponent = /** @class */ (function () {
    function DialogAddCountrySeccionCountryComponent(dialogRef, _services, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this.data = data;
        this._dialog = _dialog;
        this.config = {
            editable: true,
            spellcheck: true,
            height: '10rem',
            minHeight: '5rem',
            placeholder: 'Enter text here...',
            translate: 'no',
            defaultParagraphSeparator: 'p',
            defaultFontName: 'Arial',
            toolbarHiddenButtons: [
                ['bold']
            ],
            customClasses: [
                {
                    name: "quote",
                    "class": "quote"
                },
                {
                    name: 'redText',
                    "class": 'redText'
                },
                {
                    name: "titleText",
                    "class": "titleText",
                    tag: "h1"
                },
            ]
        };
        this.caCounty = [];
        this.caDocumentType = [];
        this.caDocumentStatus = [];
        this.caPrivacy = [];
    }
    DialogAddCountrySeccionCountryComponent.prototype.ngOnInit = function () {
        console.log('data que recibe modal contry', this.data);
        if (this.data.documentServiceCountries) { }
        else {
            this.data.documentServiceCountries = [];
        }
        this.catalogos();
    };
    DialogAddCountrySeccionCountryComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCounty = _e.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType/1')];
                    case 2:
                        _b.caDocumentType = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentStatus')];
                    case 3:
                        _c.caDocumentStatus = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 4:
                        _d.caPrivacy = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogAddCountrySeccionCountryComponent.prototype.DialogDocumentsLeadClientComponent = function (data) {
        var _this = this;
        if (data == null) {
            data = { id: 0 };
        }
        data.status = true;
        var dialogRef = this._dialog.open(dialog_documents_lead_client_component_1.DialogDocumentsLeadClientComponent, {
            data: data, width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var userData = JSON.parse(localStorage.getItem('userData'));
            if (result.success) {
                result.serviceCountry = _this.data.id;
                result.updatedBy = userData.id;
                result.updatedDate = new Date();
                result.documentType = result.idDocumentType;
                result.filePath = result.fileRequest;
                if (_this.data.id == 0) {
                    result.createdBy = userData.id;
                    result.createdDate = new Date();
                }
                console.log(result);
                _this.data.documentServiceCountries.push(result);
            }
        });
    };
    DialogAddCountrySeccionCountryComponent.prototype.getDocumentName = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            var element = this.caDocumentType[i];
            if (id == element.id) {
                return element.documentType;
            }
        }
    };
    DialogAddCountrySeccionCountryComponent.prototype.statusName = function (id) {
        for (var i = 0; i < this.caDocumentStatus.length; i++) {
            var element = this.caDocumentStatus[i];
            if (id == element.id) {
                return element.status;
            }
        }
    };
    DialogAddCountrySeccionCountryComponent.prototype.privacyName = function (id) {
        for (var i = 0; i < this.caPrivacy.length; i++) {
            var element = this.caPrivacy[i];
            if (id == element.id) {
                return element.privacy;
            }
        }
    };
    DialogAddCountrySeccionCountryComponent.prototype.save = function () {
        this.data.success = true;
        this.dialogRef.close(this.data);
    };
    DialogAddCountrySeccionCountryComponent.prototype.view = function () {
        console.log(this.data.scopeDescription);
    };
    DialogAddCountrySeccionCountryComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-add-country-seccion-country',
            templateUrl: './dialog-add-country-seccion-country.component.html',
            styleUrls: ['./dialog-add-country-seccion-country.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAddCountrySeccionCountryComponent);
    return DialogAddCountrySeccionCountryComponent;
}());
exports.DialogAddCountrySeccionCountryComponent = DialogAddCountrySeccionCountryComponent;
