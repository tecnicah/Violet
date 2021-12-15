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
exports.DialogInspectionrepairsComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_inventory_component_1 = require("../dialog-inventory/dialog-inventory.component");
var dialog_key_component_1 = require("../dialog-key/dialog-key.component");
var dialog_attendees_component_1 = require("../dialog-attendees/dialog-attendees.component");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var DialogInspectionrepairsComponent = /** @class */ (function () {
    function DialogInspectionrepairsComponent(_dialog, dialogRef, data, _services) {
        this._dialog = _dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this.mostrarTarjeta = {
            repairs: false,
            move_in: false,
            move_out: false
        };
        this.loader = new loader_1.LoaderComponent();
        this.user = {};
        this.data_move_out = {
            propertyReportSections: [],
            keyInventories: [],
            attendees: []
        };
        this.data_move_in = {
            propertyReportSections: [],
            keyInventories: [],
            attendees: []
        };
        this.dateNew = new Date();
        //************************************************//
        //CONSULTA DE INFORMACION CATALOGOS//
        this.ca_currency = [];
        this.ca_repair = [];
        this.ca_propertySection = [];
        this.SupplierCompany = [];
        this.ca_statuspropertySection = [];
        this.ca_relation = [];
        //************************************************//
        this.data_inspection = [];
        //************************************************//
        this.data_repairs = [];
        //************************************************//
        this.data_final = {};
        //************************************************//
        //CARGA DE DOCUMENTOS PARA SECCION REPAIRS MOVE IN//
        this.files = [];
    }
    DialogInspectionrepairsComponent.prototype.ngOnInit = function () {
        this.loader.showLoader();
        console.log("DATA QUE RECIBE EL MODAL DE INSPECTIONS & REPAIRS: ", this.data);
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log("User info: ", this.user);
        this.catalogos();
        this.supplierPartner();
        this.llenarJSON();
    };
    //************************************************//
    DialogInspectionrepairsComponent.prototype.llenarJSON = function () {
        if (this.data.repairs) {
            this.data_repairs = this.data.repairs;
            this.data_final.repairs = this.data_repairs;
        }
        if (this.data.inspections) {
            this.data_inspection = this.data.inspections;
            this.data_final.inspection = this.data_inspection;
        }
        if (this.data.propertyReports) {
            for (var i = 0; i < this.data.propertyReports.length; i++) {
                if (this.data.propertyReports[i].propertyInspection == 1) {
                    this.data_move_in = this.data.propertyReports[i];
                    this.data_final.propertyReportSections = this.data_move_in;
                }
                if (this.data.propertyReports[i].propertyInspection == 2) {
                    this.data_move_out = this.data.propertyReports[i];
                    this.data_final.propertyReportSectionsOut = this.data_move_out;
                }
            }
        }
        this.loader.hideLoader();
    };
    //************************************************//
    DialogInspectionrepairsComponent.prototype.supplierPartner = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=" + this.data.workOrderServicesId + "&supplierType=" + this.data.supplierType + "&serviceLine=" + 2).subscribe((function (data) {
            if (data.success) {
                console.log('DATA CONSULTA SUPPLIER PARTNER: ', data.result.value);
                _this.SupplierCompany = data.result.value;
            }
        }), function (err) {
            console.log("no se realizo la consulta por falta de parametro");
        });
    };
    DialogInspectionrepairsComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 1:
                        _a.ca_currency = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRepairType')];
                    case 2:
                        _b.ca_repair = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertySection')];
                    case 3:
                        _c.ca_propertySection = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusPropertySection')];
                    case 4:
                        _d.ca_statuspropertySection = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 5:
                        _e.ca_relation = _f.sent();
                        /*
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r=> {
                            if(r.success) {
                              for (let i=0; i < r.result.length; i++) {
                                const element=r.result[i];
                                this.SupplierCompany.push(element)
                              }
                            }
                          });
                    
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r=> {
                            if(r.success) {
                              for (let i=0; i < r.result.length; i++) {
                                const element=r.result[i];
                                this.SupplierCompany.push(element)
                              }
                            }
                          })
                          */
                        this.loader.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    //AGREGAR NUEVO INSPECTION//
    DialogInspectionrepairsComponent.prototype.addInspectionDate = function () {
        this.data_inspection.push({
            id: 0,
            housingList: this.data.id,
            initialInspectionDate: null,
            finalInspectionDate: null,
            createdBy: this.user.id,
            createdDate: new Date(),
            updateBy: this.user.id,
            updatedDate: new Date()
        });
    };
    //DELETE INSPECTION//
    DialogInspectionrepairsComponent.prototype.deleteInspection = function (k) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this inspection?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_inspection.splice(k, 1);
            }
        });
    };
    //REPAIRS//
    DialogInspectionrepairsComponent.prototype.addRepairs = function () {
        this.data_repairs.push({
            id: 0,
            housingList: this.data.id,
            repairType: 0,
            supplierPartner: 0,
            repairStartDate: null,
            repairEndDate: null,
            totalDays: 0,
            totalCostRepair: 0,
            currency: 0,
            comments: null,
            createdBy: this.user.id,
            createdDate: new Date(),
            updateBy: this.user.id,
            updatedDate: new Date(),
            documentRepairs: []
        });
    };
    //************************************************//
    //FUNCION PARA GUARDAR INSPECIONS AND REPAIRS//
    DialogInspectionrepairsComponent.prototype.guardar_inspectionAndRepairs = function () {
        if (this.data.status_ == 'nuevo') {
            this.loader.showLoader();
            this.pasar_Informacion();
            var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Success",
                    body: "Save Data"
                },
                width: "350px"
            });
            this.loader.hideLoader();
        }
        else {
            this.updateInspection();
        }
    };
    //************************************************//
    //FUNCION PARA ACTUALIAZAR LA SECCION REPAIRS//
    DialogInspectionrepairsComponent.prototype.updateInspection = function () {
        var _this = this;
        this.loader.showLoader();
        console.log("DATA A GUARDAR RERPAIS: ", this.data_repairs);
        for (var i = 0; i < this.data_repairs.length; i++) {
            if (this.data_repairs[i].id != 0) {
                this._services.service_general_put("HousingList/PutRepair", this.data_repairs[i]).subscribe((function (data) {
                    if (data.success) {
                        console.log(data);
                        _this.loader.hideLoader();
                    }
                }), function (err) {
                    _this.loader.hideLoader();
                    console.log("error al guardar los repairs: ", err);
                });
            }
            else {
                this._services.service_general_post_with_url("HousingList/PostRepair", this.data_repairs[i]).subscribe((function (data) {
                    if (data.success) {
                        console.log(data);
                        _this.loader.hideLoader();
                    }
                }), function (err) {
                    _this.loader.hideLoader();
                    console.log("error al guardar los repairs: ", err);
                });
            }
        }
        var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: "Success",
                body: "Saved Data"
            },
            width: "350px"
        });
    };
    //************************************************//
    //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
    DialogInspectionrepairsComponent.prototype.addMoveIn = function () {
        this.data_move_in.propertyReportSections.push({
            "id": 0,
            "propertyReport": this.data_move_in.id,
            "propertySection": 0,
            "status": 0,
            "needRepair": false,
            "reportDate": null,
            "reportDetails": null,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date(),
            "photosPropertyReportSections": [],
            "sectionInventories": []
        });
    };
    //************************************************//
    //GUARDAR TARJETA ITERABLE DE MOVE OUT//
    DialogInspectionrepairsComponent.prototype.save = function () {
        var _this = this;
        this.loader.showLoader();
        console.log("ENTRA A GUARDAR O ACTUALIZAR INFORMACION MOVE IN: ", this.data_move_in);
        if (this.data.status_ == 'nuevo') {
            this.data_move_in.id = 0;
            this.data_move_in.propertyInspection = 1;
            this.data_move_in.housingList = this.data.id,
                this.data_move_in.propertyAddress = this.data.address;
            this.data_move_in.zipCode = this.data.zip;
            this.data_move_in.createdBy = this.user.id;
            this.data_move_in.createdDate = new Date();
            this.data_move_in.updatedBy = this.user.id;
            this.data_move_in.updatedDate = new Date();
            this.pasar_Informacion();
            console.log(this.data_move_in);
            console.log(this.data_move_out);
            var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Success",
                    body: "Saved Data"
                },
                width: "350px"
            });
            this.loader.hideLoader();
        }
        else {
            //ACTUALIZACION DEL REGISTROS//
            this.data_move_in.propertyInspection = 1;
            this.data_move_in.housingList = this.data.id,
                this.data_move_in.propertyAddress = this.data.address;
            this.data_move_in.zipCode = this.data.zip;
            this.data_move_in.createdBy = this.user.id;
            this.data_move_in.createdDate = new Date();
            this.data_move_in.updatedBy = this.user.id;
            this.data_move_in.updatedDate = new Date();
            if (this.data_move_in.id && this.data_move_in.id != 0) {
                console.log("data_move_in", this.data_move_in);
                this._services.service_general_put("PropertyReport/PutPropertyReport", this.data_move_in).subscribe((function (data) {
                    if (data.success) {
                        console.log(data);
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Updated Data"
                            },
                            width: "350px"
                        });
                        _this.loader.hideLoader();
                    }
                }));
            }
            else {
                this.data_move_in.id = 0;
                this._services.service_general_post_with_url("PropertyReport/PostPropertyReport", this.data_move_in).subscribe((function (data) {
                    if (data.success) {
                        console.log(data);
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Saved Data"
                            },
                            width: "350px"
                        });
                        _this.loader.hideLoader();
                    }
                }));
            }
        }
    };
    //MOVE OUT//
    DialogInspectionrepairsComponent.prototype.save_out = function () {
        var _this = this;
        this.loader.showLoader();
        console.log("ENTRA A GUARDAR O ACTUALIZAR INFORMACION MOVE OUT: ", this.data_move_out);
        if (this.data.status_ == 'nuevo') {
            this.data_move_out.id = 0;
            this.data_move_out.propertyInspection = 2;
            this.data_move_out.housingList = this.data.id,
                this.data_move_out.propertyAddress = this.data.address;
            this.data_move_out.zipCode = this.data.zip;
            this.data_move_out.createdBy = this.user.id;
            this.data_move_out.createdDate = new Date();
            this.data_move_out.updatedBy = this.user.id;
            this.data_move_out.updatedDate = new Date();
            this.pasar_Informacion();
            console.log(this.data_move_in);
            console.log(this.data_move_out);
            var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Success",
                    body: "Saved Data"
                },
                width: "350px"
            });
            this.loader.hideLoader();
        }
        else {
            this.data_move_out.propertyInspection = 2;
            this.data_move_out.housingList = this.data.id,
                this.data_move_out.propertyAddress = this.data.address;
            this.data_move_out.zipCode = this.data.zip;
            this.data_move_out.createdBy = this.user.id;
            this.data_move_out.createdDate = new Date();
            this.data_move_out.updatedBy = this.user.id;
            this.data_move_out.updatedDate = new Date();
            if (this.data_move_out.id && this.data_move_out.id != 0) {
                console.log("data_move_out", this.data_move_out);
                this._services.service_general_put("PropertyReport/PutPropertyReport", this.data_move_out).subscribe((function (data) {
                    if (data.success) {
                        console.log(data);
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Updated Data"
                            },
                            width: "350px"
                        });
                        _this.loader.hideLoader();
                    }
                }));
            }
            else {
                this.data_move_in.id = 0;
                this._services.service_general_post_with_url("PropertyReport/PostPropertyReport", this.data_move_out).subscribe((function (data) {
                    if (data.success) {
                        console.log(data);
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Saved Data"
                            },
                            width: "350px"
                        });
                        _this.loader.hideLoader();
                    }
                }));
            }
            /*
            //ACTUALIZACION DEL REGISTROS//
            this._services.service_general_put("PropertyReport/PutPropertyReport", this.data_move_out).subscribe((data => {
              if(data.success){
                console.log(data);
                 const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                      data: {
                        header: "Success",
                        body: "Update Data"
                      },
                      width: "350px"
                    });
                    this.loader.hideLoader();
                }
            }))
            */
        }
    };
    DialogInspectionrepairsComponent.prototype.pasar_Informacion = function () {
        this.data_final = {
            "inspection": this.data_inspection,
            "repairs": this.data_repairs,
            "propertyReportSections": this.data_move_in,
            "propertyReportSectionsOut": this.data_move_out
        };
    };
    //************************************************//
    DialogInspectionrepairsComponent.prototype.close_Modal = function () {
        this.pasar_Informacion();
        this.dialogRef.close(this.data_final);
    };
    //************************************************//
    DialogInspectionrepairsComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    //************************************************//
    DialogInspectionrepairsComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    //FUNCION PARA AGREGAR MAS DOCUMENTOS//
    DialogInspectionrepairsComponent.prototype.addDocument = function (i) {
        document.getElementById('doc' + i).click();
    };
    //************************************************//
    //FUNCION PARA ELIMINAR DOCUMENTOS//
    DialogInspectionrepairsComponent.prototype.deleteDocument = function (i, j) {
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
                _this.data_repairs[i].documentRepairs.splice(j, 1);
            }
        });
    };
    //************************************************//
    //FUNCION PARA ELIMINAR REPAIR//
    DialogInspectionrepairsComponent.prototype.deleteRepair = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this repair?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_repairs.splice(i, 1);
            }
        });
    };
    //************************************************//
    //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.deletePhoto = function (r, p) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this photo?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_move_in.propertyReportSections[r].photosPropertyReportSections.splice(p, 1);
            }
        });
    };
    //************************************************//
    //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
    DialogInspectionrepairsComponent.prototype.deletePhotoOut = function (o, p) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this photo?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_move_out.propertyReportSections[o].photosPropertyReportSections.splice(p, 1);
            }
        });
    };
    //************************************************//
    //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
    DialogInspectionrepairsComponent.prototype.deleteMoveIn = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Move In?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_move_in.propertyReportSections.splice(i, 1);
            }
        });
    };
    //************************************************//
    //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
    DialogInspectionrepairsComponent.prototype.deleteMoveOut = function (i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Move Out?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_move_out.propertyReportSections.splice(i, 1);
            }
        });
    };
    //************************************************//
    //FUNCION PARA AGREGAR INVENTORY DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.addInventoriModal = function (r) {
        var _this = this;
        console.log("entra a abrir modal inventori");
        var dialog = this._dialog.open(dialog_inventory_component_1.DialogInventoryComponent, {
            data: {
                id: 0, operacion: 'insertar'
            },
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            result.propertyReportSectionId = _this.data_move_in.propertyReportSections[r].id;
            _this.data_move_in.propertyReportSections[r].sectionInventories.push(result);
        });
    };
    //************************************************//
    //FUNCION PARA EDITAR INVENTORY DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.editSectionInventory = function (data_inv, pos, r) {
        var _this = this;
        console.log("entra a abrir modal inventori EDICION");
        var dialog = this._dialog.open(dialog_inventory_component_1.DialogInventoryComponent, {
            data: data_inv,
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_move_in.propertyReportSections[r].sectionInventories[pos] = result;
            }
        });
    };
    //************************************************//
    //FUNCION AGREGAR KEY INVENTORY DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.addKeyInventory = function () {
        var _this = this;
        console.log("entra a abrir modal inventori");
        var dialog = this._dialog.open(dialog_key_component_1.DialogKeyComponent, {
            data: {
                id: 0, operacion: 'insertar', propertyReport: this.data_move_in.id
            },
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.propertyReport = _this.data_move_in.id;
                _this.data_move_in.keyInventories.push(result);
            }
        });
    };
    //************************************************//
    //FUNCION EDITAR KEY INVENTORY  DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.editKeyInventory = function (data_inv, pos) {
        var _this = this;
        console.log("entra a abrir modal key inventory EDICION");
        var dialog = this._dialog.open(dialog_key_component_1.DialogKeyComponent, {
            data: data_inv,
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_move_in.keyInventories[pos] = result;
            }
        });
    };
    //************************************************//
    //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.addAttendees = function () {
        var _this = this;
        console.log("entra a abrir modal attendees");
        var dialog = this._dialog.open(dialog_attendees_component_1.DialogAttendeesComponent, {
            data: {
                id: 0, sr: this.data.sr, operacion: 'insertar', propertyReport: this.data_move_in.id
            },
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.propertyReport = _this.data_move_in.id;
                _this.data_move_in.attendees.push(result);
            }
        });
    };
    //************************************************//
    //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.editAttend = function (data_inv, pos) {
        var _this = this;
        console.log("entra a abrir modal attend EDICION");
        var dialog = this._dialog.open(dialog_attendees_component_1.DialogAttendeesComponent, {
            data: data_inv,
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_move_in.attendees[pos] = result;
            }
        });
    };
    //************************************************//
    //FUNCION PARA ABRIR MODAL DE CARGA DE FOTOS//
    DialogInspectionrepairsComponent.prototype.addFotosMove = function (r) {
        document.getElementById('doc' + r).click();
    };
    //************************************************//
    //CARGA DE FOTOS DE MOVE OUT//
    DialogInspectionrepairsComponent.prototype.droppedFotos = function (files, r) {
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
                            var ext = droppedFile.relativePath.split(".");
                            _this.data_move_in.propertyReportSections[r].photosPropertyReportSections.push({
                                "id": 0,
                                "propertyReportId": _this.data_move_in.propertyReportSections[r].id,
                                "base64": imageUrl,
                                "photo": encoded,
                                "photoExtension": ext[ext.length - 1],
                                "createdBy": _this.user.id,
                                "createdDate": new Date(),
                                "updatedBy": _this.user.id,
                                "updatedDate": new Date()
                            });
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
    DialogInspectionrepairsComponent.prototype.dropped = function (files, i) {
        var _this = this;
        this.files = files;
        var _loop_2 = function (droppedFile) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry_2 = droppedFile.fileEntry;
                var reader_2 = new FileReader();
                fileEntry_2.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, _this.files);
                    fileEntry_2.file(function (file) {
                        reader_2.readAsDataURL(file);
                        reader_2.onload = function () {
                            var imageUrl = reader_2.result;
                            var encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                            if ((encoded.length % 4) > 0) {
                                encoded += '='.repeat(4 - (encoded.length % 4));
                            }
                            var ext = droppedFile.relativePath.split(".");
                            _this.data_repairs[i].documentRepairs.push({
                                "id": 0,
                                "fileRequest": encoded,
                                "fileExtension": ext[ext.length - 1],
                                "fileName": droppedFile.relativePath,
                                "repairId": 0,
                                "createdBy": _this.user.id,
                                "createdDate": new Date()
                            });
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
        for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
            var droppedFile = files_2[_i];
            _loop_2(droppedFile);
        }
    };
    //***********************************************************************//
    //***********************************************************************//
    //FUNCION PARA MOVE OUT//
    //************************************************//
    //FUNCION PARA AGREGAR INVENTORY DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.addInventoriModalOut = function (r) {
        var _this = this;
        console.log("entra a abrir modal inventory move out");
        var dialog = this._dialog.open(dialog_inventory_component_1.DialogInventoryComponent, {
            data: {
                id: 0, operacion: 'insertar'
            },
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            result.propertyReportSectionId = _this.data_move_out.propertyReportSections[r].id;
            _this.data_move_out.propertyReportSections[r].sectionInventories.push(result);
        });
    };
    //************************************************//
    //FUNCION PARA EDITAR INVENTORY DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.editSectionInventoryOut = function (data_inv, pos, r) {
        var _this = this;
        console.log("entra a abrir modal inventory EDICION move out");
        var dialog = this._dialog.open(dialog_inventory_component_1.DialogInventoryComponent, {
            data: data_inv,
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_move_out.propertyReportSections[r].sectionInventories[pos] = result;
            }
        });
    };
    //************************************************//
    //FUNCION PARA ABRIR MODAL DE CARGA DE FOTOS//
    DialogInspectionrepairsComponent.prototype.addFotosMoveOut = function (o) {
        document.getElementById('doc' + o).click();
    };
    //************************************************//
    //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
    DialogInspectionrepairsComponent.prototype.addMoveOut = function () {
        this.data_move_out.propertyReportSections.push({
            "id": 0,
            "propertyReport": this.data_move_out.id,
            "propertySection": 0,
            "status": 0,
            "needRepair": false,
            "reportDate": null,
            "reportDetails": null,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date(),
            "photosPropertyReportSections": [],
            "sectionInventories": []
        });
    };
    //************************************************//
    //FUNCION AGREGAR KEY INVENTORY DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.addKeyInventoryOut = function () {
        var _this = this;
        console.log("entra a abrir modal inventory move out");
        var dialog = this._dialog.open(dialog_key_component_1.DialogKeyComponent, {
            data: {
                id: 0, operacion: 'insertar', propertyReport: this.data_move_out.id
            },
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.propertyReport = _this.data_move_out.id;
                _this.data_move_out.keyInventories.push(result);
            }
        });
    };
    //************************************************//
    //FUNCION EDITAR KEY INVENTORY  DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.editKeyInventoryOut = function (data_inv, pos) {
        var _this = this;
        console.log("entra a abrir modal key inventory EDICION");
        var dialog = this._dialog.open(dialog_key_component_1.DialogKeyComponent, {
            data: data_inv,
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_move_out.keyInventories[pos] = result;
            }
        });
    };
    //************************************************//
    //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.addAttendeesOut = function () {
        var _this = this;
        console.log("entra a abrir modal attendees move out");
        var dialog = this._dialog.open(dialog_attendees_component_1.DialogAttendeesComponent, {
            data: {
                id: 0, sr: this.data.sr, operacion: 'insertar', propertyReport: this.data_move_out.id
            },
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.propertyReport = _this.data_move_in.id;
                _this.data_move_out.attendees.push(result);
            }
        });
    };
    //************************************************//
    //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
    DialogInspectionrepairsComponent.prototype.editAttendOut = function (data_inv, pos) {
        var _this = this;
        console.log("entra a abrir modal attend move out EDICION");
        var dialog = this._dialog.open(dialog_attendees_component_1.DialogAttendeesComponent, {
            data: data_inv,
            width: "95%"
        });
        dialog.beforeClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.data_move_out.attendees[pos] = result;
            }
        });
    };
    //************************************************//
    //CARGA DE FOTOS DE MOVE OUT//
    DialogInspectionrepairsComponent.prototype.droppedFotosOut = function (files, r) {
        var _this = this;
        this.files = files;
        var _loop_3 = function (droppedFile) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry_3 = droppedFile.fileEntry;
                var reader_3 = new FileReader();
                fileEntry_3.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, _this.files);
                    fileEntry_3.file(function (file) {
                        reader_3.readAsDataURL(file);
                        reader_3.onload = function () {
                            var imageUrl = reader_3.result;
                            var encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                            if ((encoded.length % 4) > 0) {
                                encoded += '='.repeat(4 - (encoded.length % 4));
                            }
                            var ext = droppedFile.relativePath.split(".");
                            _this.data_move_out.propertyReportSections[r].photosPropertyReportSections.push({
                                "id": 0,
                                "propertyReportId": _this.data_move_out.propertyReportSections[r].id,
                                "base64": imageUrl,
                                "photo": encoded,
                                "photoExtension": ext[ext.length - 1],
                                "createdBy": _this.user.id,
                                "createdDate": new Date(),
                                "updatedBy": _this.user.id,
                                "updatedDate": new Date()
                            });
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
        for (var _i = 0, files_3 = files; _i < files_3.length; _i++) {
            var droppedFile = files_3[_i];
            _loop_3(droppedFile);
        }
    };
    //************************************************//
    DialogInspectionrepairsComponent.prototype.getProperty = function (id) {
        for (var i = 0; i < this.ca_propertySection.length; i++) {
            if (this.ca_propertySection[i].id == id) {
                return this.ca_propertySection[i].propertySection;
            }
        }
    };
    //************************************************//
    DialogInspectionrepairsComponent.prototype.getReltion = function (id) {
        for (var i = 0; i < this.ca_relation.length; i++) {
            if (this.ca_relation[i].id == id) {
                return this.ca_relation[i].relationship;
            }
        }
    };
    //FUNCION PARA VER DOCUMENTO//
    DialogInspectionrepairsComponent.prototype.showDocumentDialogDetails = function (url_in) {
        var server_url = this._services.url_images + url_in;
        window.open(server_url);
    };
    DialogInspectionrepairsComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-inspectionrepairs',
            templateUrl: './dialog-inspectionrepairs.component.html',
            styleUrls: ['./dialog-inspectionrepairs.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogInspectionrepairsComponent);
    return DialogInspectionrepairsComponent;
}());
exports.DialogInspectionrepairsComponent = DialogInspectionrepairsComponent;
