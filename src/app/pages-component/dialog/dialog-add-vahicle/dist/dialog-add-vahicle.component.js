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
exports.DialogAddVahicleComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_document_profile_supplier_component_1 = require("../dialog-document-profile-supplier/dialog-document-profile-supplier.component");
var DialogAddVahicleComponent = /** @class */ (function () {
    function DialogAddVahicleComponent(_services, _dialog, dialogRef, data) {
        this._services = _services;
        this._dialog = _dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.ca_city = [];
        this.ca_vehiculo = [];
        this.data_vehiculo = {
            "documentVehicleServices": [],
            "photosVehicleServices": []
        };
        this.ca_year = [];
        this.ca_documentType = [];
        this.ca_privacy = [];
        this.interiorShow = false;
        this.exteriorShow = false;
        this.safetyShow = false;
        //*********************************************//
        this.files = [];
    }
    DialogAddVahicleComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.catalogos();
        console.log("data de ingreso a modal: ", this.data);
        if (this.data != null) {
            this.data_vehiculo = this.data;
            if (!this.data_vehiculo.documentVehicleServices) {
                this.data_vehiculo.documentVehicleServices = [];
            }
            if (!this.data_vehiculo.photosVehicleServices) {
                this.data_vehiculo.photosVehicleServices = [];
            }
            else {
                this.verifyPhotos();
            }
            this.city();
        }
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetVehicleType')];
                    case 1:
                        _a.ca_vehiculo = _c.sent();
                        //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType');
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 2:
                        //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType');
                        _b.ca_privacy = _c.sent();
                        this._services.service_general_get("Catalogue/GetDocumentType/3").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_documentType = data.result;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.city = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetState?country=' + this.data.country).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
    };
    DialogAddVahicleComponent.prototype.dropped = function (files, type) {
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
                            _this.temporalPhoto = {
                                "id": 0,
                                "vehicleService": 0,
                                "photo": encoded,
                                "b64": imageUrl,
                                "photoExtension": ext[1],
                                "createdBy": _this.user.id,
                                "createdDate": new Date(),
                                "updatedBy": _this.user.id,
                                "updatedDate": new Date()
                            };
                            if (type == 1) {
                                _this.temporalPhoto.interior = true;
                                _this.temporalPhoto.exterior = false;
                                _this.temporalPhoto.safety = false;
                            }
                            if (type == 2) {
                                _this.temporalPhoto.interior = false;
                                _this.temporalPhoto.exterior = true;
                                _this.temporalPhoto.safety = false;
                            }
                            if (type == 3) {
                                _this.temporalPhoto.interior = false;
                                _this.temporalPhoto.exterior = false;
                                _this.temporalPhoto.safety = true;
                            }
                            _this.pushData();
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
    //*********************************************//
    DialogAddVahicleComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.addDocument = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_document_profile_supplier_component_1.DialogDocumentProfileSupplierComponent, {
            width: "90%",
            data: { country: this.data.country, city: this.data.city }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_vehiculo.documentVehicleServices.push(result);
            }
        });
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.nameDocument = function (id) {
        for (var i = 0; i < this.ca_documentType.length; i++) {
            if (this.ca_documentType[i].id == id) {
                return this.ca_documentType[i].documentType;
            }
        }
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.namePrivacy = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
            }
        }
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.nameCity = function (id) {
        for (var i = 0; i < this.ca_city.length; i++) {
            if (this.ca_city[i].id == id) {
                return this.ca_city[i].city;
            }
        }
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.pushData = function () {
        this.data_vehiculo.photosVehicleServices.push(this.temporalPhoto);
        console.log("Photos: ", this.data_vehiculo);
        this.verifyPhotos();
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.addNewPhoto = function (id) {
        document.getElementById('doc' + id).click();
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.verifyPhotos = function () {
        var interior = 0;
        var exterior = 0;
        var safety = 0;
        for (var i = 0; i < this.data_vehiculo.photosVehicleServices.length; i++) {
            if (this.data_vehiculo.photosVehicleServices[i].interior == true) {
                interior++;
            }
            if (this.data_vehiculo.photosVehicleServices[i].exterior == true) {
                exterior++;
            }
            if (this.data_vehiculo.photosVehicleServices[i].safety == true) {
                safety++;
            }
        }
        if (interior > 0) {
            this.interiorShow = true;
        }
        if (exterior > 0) {
            this.exteriorShow = true;
        }
        if (safety > 0) {
            this.safetyShow = true;
        }
    };
    //*********************************************//
    DialogAddVahicleComponent.prototype.save = function () {
        this.data_vehiculo.success = true;
        if (this.data.id != undefined && this.data.id != null) {
            if (this.temporalPhoto != undefined) {
                this.temporalPhoto.vehicleService = this.data.id;
            }
        }
        this.data_vehiculo.createdBy = this.user.id,
            this.data_vehiculo.createdDate = new Date();
        this.data_vehiculo.updatedBy = this.user.id,
            this.data_vehiculo.updatedDate = new Date();
        this.dialogRef.close(this.data_vehiculo);
    };
    DialogAddVahicleComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-add-vahicle',
            templateUrl: './dialog-add-vahicle.component.html',
            styleUrls: ['./dialog-add-vahicle.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAddVahicleComponent);
    return DialogAddVahicleComponent;
}());
exports.DialogAddVahicleComponent = DialogAddVahicleComponent;
