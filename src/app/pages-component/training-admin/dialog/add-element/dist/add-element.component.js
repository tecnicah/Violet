"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddElementComponent = void 0;
var core_1 = require("@angular/core");
var AddElementComponent = /** @class */ (function () {
    function AddElementComponent(router, _services, _dialog, dialogRef, _routerParams) {
        this.router = router;
        this._services = _services;
        this._dialog = _dialog;
        this.dialogRef = dialogRef;
        this._routerParams = _routerParams;
    }
    AddElementComponent.prototype.ngOnInit = function () {
        console.log("add element");
        this.getCatalogos();
    };
    AddElementComponent.prototype.getCatalogos = function () {
        var _this = this;
        var id = Number(localStorage.getItem('tipo_contenido'));
        this._services.service_general_get('Catalogue/GetElement?content=' + id).subscribe((function (data) {
            if (data.success) {
                _this.element = data.result;
            }
        }));
    };
    AddElementComponent.prototype.addElement = function (item, i) {
        item.success = true;
        this.elemento = item;
        this.active = i;
    };
    //***************************************************//
    //FUNCION PARA INSERTAR//
    AddElementComponent.prototype.save = function () {
        this.dialogRef.close(this.elemento);
    };
    AddElementComponent = __decorate([
        core_1.Component({
            selector: 'app-add-element',
            templateUrl: './add-element.component.html',
            styleUrls: ['./add-element.component.scss']
        })
    ], AddElementComponent);
    return AddElementComponent;
}());
exports.AddElementComponent = AddElementComponent;
