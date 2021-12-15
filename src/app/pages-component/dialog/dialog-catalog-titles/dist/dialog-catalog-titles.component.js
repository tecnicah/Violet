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
exports.__esModule = true;
exports.DialogCatalogTitlesComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var DialogCatalogTitlesComponent = /** @class */ (function () {
    function DialogCatalogTitlesComponent(_services, _dialog, data, dialogRef) {
        this._services = _services;
        this._dialog = _dialog;
        this.data = data;
        this.dialogRef = dialogRef;
        this.__loader__ = new loader_1.LoaderComponent();
        // variables
        // title: any = {};
        this.dataOffices = [];
        // validar formulario
        this.active_office = false;
        this.active_section = false;
        this.active_title = false;
    }
    DialogCatalogTitlesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getOffice();
        console.log("DATA QUE RECIBE EL MODAL: ", this.data);
        // comprobar si es creacion o actualizacion de currencies
        if (this.data.id != 0) {
            this._services.service_general_get("Catalog/GetTitle/" + this.data.id).subscribe(function (r) {
                if (r.success) {
                    _this.data = r.result;
                    console.log('respuesta de actualizacion', r);
                    _this.__loader__.hideLoader();
                }
            });
        }
    };
    // traer las officinas
    DialogCatalogTitlesComponent.prototype.getOffice = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetOffice').subscribe(function (rOffice) {
            console.log('catalogo office', rOffice);
            if (rOffice.success) {
                for (var i = 0; i < rOffice.result.length; i++) {
                    var eOffice = rOffice.result[i];
                    _this.dataOffices.push(eOffice);
                }
            }
        });
    };
    DialogCatalogTitlesComponent.prototype.validForm = function () {
        /*if(this.data.office == undefined){
          this.active_office = true;
        }*/
        if (this.data.section == undefined) {
            this.active_section = true;
        }
        if (this.data.title == undefined) {
            this.active_title = true;
        }
        if ((this.data.section != undefined || this.data.section == '') && (this.data.title != undefined || this.data.title == '')) {
            this.save();
        }
    };
    // guardar title
    DialogCatalogTitlesComponent.prototype.save = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userData'));
        this.data.updatedBy = userData.id;
        this.data.updatedDate = new Date();
        if (this.data.id == 0) {
            this.__loader__.showLoader();
            this.data.createdBy = userData.id;
            this.data.createdDate = new Date();
            console.log(JSON.stringify(this.data), this.data);
            this._services.service_general_post_with_url("Catalog/AddTitle", this.data).subscribe(function (r) {
                console.log(r);
                _this.__loader__.hideLoader();
                _this.dialogRef.close(1);
            });
        }
        else {
            this.__loader__.showLoader();
            this._services.service_general_put('Catalog/UpdateTitle', this.data).subscribe(function (r) {
                console.log('respuesta de update', r);
                _this.__loader__.hideLoader();
                _this.dialogRef.close(2);
            });
        }
    };
    DialogCatalogTitlesComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-catalog-titles',
            templateUrl: './dialog-catalog-titles.component.html',
            styleUrls: ['./dialog-catalog-titles.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogCatalogTitlesComponent);
    return DialogCatalogTitlesComponent;
}());
exports.DialogCatalogTitlesComponent = DialogCatalogTitlesComponent;
