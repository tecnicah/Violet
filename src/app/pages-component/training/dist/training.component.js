"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrainingComponent = void 0;
var core_1 = require("@angular/core");
var TrainingComponent = /** @class */ (function () {
    function TrainingComponent(router, _services, _dialog, _routerParams) {
        this.router = router;
        this._services = _services;
        this._dialog = _dialog;
        this._routerParams = _routerParams;
        this.training = [];
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    TrainingComponent.prototype.consultaPermisos = function () {
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
    TrainingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaPermisos();
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this._services.service_general_get('Training/' + this.userData.id + '/MyTrainings').subscribe((function (data) {
            if (data.success) {
                console.log(data.result.value);
                _this.training = data.result.value;
            }
        }));
    };
    //*****************************************************************//
    //FUNCION PARA ABRIR CURSO//
    TrainingComponent.prototype.openTraining = function (item) {
        console.log(item);
        this.router.navigateByUrl('/TrainingCursoComponent/' + item.participantId);
    };
    //*****************************************************************//
    TrainingComponent.prototype.editCurso = function (item) {
        this.router.navigateByUrl('/admin-trainig/addTraining/' + item.training);
    };
    TrainingComponent = __decorate([
        core_1.Component({
            selector: 'app-training',
            templateUrl: './training.component.html',
            styleUrls: ['./training.component.scss']
        })
    ], TrainingComponent);
    return TrainingComponent;
}());
exports.TrainingComponent = TrainingComponent;
