"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PreviewComponent = void 0;
var core_1 = require("@angular/core");
var PreviewComponent = /** @class */ (function () {
    function PreviewComponent() {
        this.show_theme = false;
        this.show_evaluation = false;
        this.renderizarHTML = [];
    }
    PreviewComponent.prototype.ngOnInit = function () {
        var data = JSON.parse(localStorage.getItem('data_content'));
        console.log(data);
        if (data.type == 1) {
            this.show_theme = true;
            this.show_evaluation = false;
            this.renderizarHTML = data.themes;
        }
        else if (data.type == 2) {
            this.show_theme = false;
            this.show_evaluation = true;
            this.renderizarHTML = data.evaluations;
        }
    };
    //*************************************************************//
    //FUNCION PARA REGRESAR//
    PreviewComponent.prototype.goBack = function () {
        window.history.back();
    };
    PreviewComponent = __decorate([
        core_1.Component({
            selector: 'app-preview',
            templateUrl: './preview.component.html',
            styleUrls: ['./preview.component.scss']
        })
    ], PreviewComponent);
    return PreviewComponent;
}());
exports.PreviewComponent = PreviewComponent;
