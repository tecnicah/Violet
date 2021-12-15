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
exports.DialogAdministrativeContactConsultantComponent = void 0;
var core_1 = require("@angular/core");
var dialog_document_profile_supplier_component_1 = require("../dialog-document-profile-supplier/dialog-document-profile-supplier.component");
var dialog_1 = require("@angular/material/dialog");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var DialogAdministrativeContactConsultantComponent = /** @class */ (function () {
    function DialogAdministrativeContactConsultantComponent(_services, _dialog, dialogRef, data) {
        this._services = _services;
        this._dialog = _dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.ca_contactType = [];
        this.ca_city = [];
        this.ca_privacy = [];
        this.ca_documentType = [];
        this.administrativeContactsConsultants = {
            "documentAdministrativeContactsConsultants": []
        };
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        //*************************************************************//
        this.files = [];
    }
    DialogAdministrativeContactConsultantComponent.prototype.consultaPermisos = function () {
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
    DialogAdministrativeContactConsultantComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaPermisos();
        console.log("data recibida: ", this.data);
        if (this.data != null) {
            this.administrativeContactsConsultants = this.data;
            if (!this.administrativeContactsConsultants.documentAdministrativeContactsConsultants) {
                this.administrativeContactsConsultants.photo = '';
                this.administrativeContactsConsultants.id = 0;
                this.administrativeContactsConsultants.documentAdministrativeContactsConsultants = [];
            }
        }
        this._services.service_general_get('Catalogue/GetState?country=' + this.data.country).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
        this.catalogos();
        this.date = new Date();
        this.user = JSON.parse(localStorage.getItem('userData'));
    };
    //***********************************//
    DialogAdministrativeContactConsultantComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        //this.ca_documentType  = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get('Catalogue/GetDocumentType/3').subscribe((function (data) {
                            if (data.success) {
                                _this.ca_documentType = data.result;
                                console.log(_this.ca_documentType);
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetContactType')];
                    case 1:
                        _a.ca_contactType = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 2:
                        _b.ca_privacy = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //***********************************//
    DialogAdministrativeContactConsultantComponent.prototype.addDocument = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_document_profile_supplier_component_1.DialogDocumentProfileSupplierComponent, {
            width: "90%",
            data: {
                country: this.administrativeContactsConsultants.country,
                city: this.administrativeContactsConsultants.city
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.administrativeContactsConsultants.documentAdministrativeContactsConsultants.push(result);
            }
        });
    };
    //*************************************************************//
    DialogAdministrativeContactConsultantComponent.prototype.editPhoto = function () {
        document.getElementById('photoCont').click();
    };
    DialogAdministrativeContactConsultantComponent.prototype.dropped = function (files) {
        var _this = this;
        this.files = files;
        var _loop_1 = function (droppedFile) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry_1 = droppedFile.fileEntry;
                var reader_1 = new FileReader();
                fileEntry_1.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, _this.files);
                    fileEntry_1.file(function (file) {
                        reader_1.readAsDataURL(file);
                        reader_1.onload = function () {
                            var imageUrl = reader_1.result;
                            var encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                            if ((encoded.length % 4) > 0) {
                                encoded += '='.repeat(4 - (encoded.length % 4));
                            }
                            var ext = file.type.split("/");
                            _this.administrativeContactsConsultants.photo = encoded;
                            _this.administrativeContactsConsultants.photoExtension = ext[1];
                            _this.administrativeContactsConsultants.b64 = imageUrl;
                        };
                    });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
    };
    //*************************************************************//
    DialogAdministrativeContactConsultantComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    //*************************************************************//
    DialogAdministrativeContactConsultantComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    //*************************************************************//
    DialogAdministrativeContactConsultantComponent.prototype.nameDocument = function (id) {
        for (var i = 0; i < this.ca_documentType.length; i++) {
            if (this.ca_documentType[i].id == id) {
                return this.ca_documentType[i].documentType;
            }
        }
    };
    //************************************************************//
    DialogAdministrativeContactConsultantComponent.prototype.namePrivacy = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
            }
        }
    };
    //************************************************************//
    DialogAdministrativeContactConsultantComponent.prototype.nameCity = function (id) {
        for (var i = 0; i < this.ca_city.length; i++) {
            if (this.ca_city[i].id == id) {
                return this.ca_city[i].city;
            }
        }
    };
    //************************************************************//
    DialogAdministrativeContactConsultantComponent.prototype.save = function () {
        this.administrativeContactsConsultants.success = true;
        this.dialogRef.close(this.administrativeContactsConsultants);
    };
    //*************************************************************//
    DialogAdministrativeContactConsultantComponent.prototype.deleteDocument = function (i) {
        var _this = this;
        console.log("Entra a eliminar documento: ", i);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete the document"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.administrativeContactsConsultants.documentAdministrativeContactsConsultants.splice(i, 1);
            }
        });
    };
    DialogAdministrativeContactConsultantComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-administrative-contact-consultant',
            templateUrl: './dialog-administrative-contact-consultant.component.html',
            styleUrls: ['./dialog-administrative-contact-consultant.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAdministrativeContactConsultantComponent);
    return DialogAdministrativeContactConsultantComponent;
}());
exports.DialogAdministrativeContactConsultantComponent = DialogAdministrativeContactConsultantComponent;
