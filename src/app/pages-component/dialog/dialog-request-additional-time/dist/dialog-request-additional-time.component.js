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
exports.DialogRequestAdditionalTimeComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var DialogRequestAdditionalTimeComponent = /** @class */ (function () {
    function DialogRequestAdditionalTimeComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        this.__loader__ = new loader_1.LoaderComponent();
        this.caServiceLine = [];
        this.caService = [];
        this.user = {};
        this.wos = [];
        this.allUser = [];
        this.userReport = {};
        this.caNumbers = [];
        this.requestData = [];
    }
    DialogRequestAdditionalTimeComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.getWorkOrders();
        for (var i = 1; i < 49; i++) {
            this.caNumbers.push(i);
        }
    };
    DialogRequestAdditionalTimeComponent.prototype.getWorkOrders = function () {
        var _this = this;
        console.log("ENTRA A WORK ORDERS");
        this._services.service_general_get('Catalogue/GetWorkOrderByServiceLine?sr=' + Number(this.data.sr) + '&sl=2').subscribe(function (r) {
            if (r.success) {
                console.log(r.result);
                _this.wos = r.result;
                if (_this.wos.length == 0) {
                    _this.message();
                }
                if (_this.requestData.length == 0) {
                    _this.addRequest();
                }
            }
        });
    };
    DialogRequestAdditionalTimeComponent.prototype.message = function () {
        var _this = this;
        var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: "Attention",
                body: "To request additional time it is necessary to have relocation services available"
            },
            width: "350px"
        });
        setTimeout(function () {
            _this.dialogRef.close();
        }, 3000);
    };
    DialogRequestAdditionalTimeComponent.prototype.getService = function (i) {
        var _this = this;
        this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.requestData[i].workOrder).subscribe(function (r) {
            if (r.success) {
                _this.caService[i] = r.result.value;
            }
        });
    };
    DialogRequestAdditionalTimeComponent.prototype.addRequest = function () {
        this.requestData.push({
            id: 0,
            workOrder: null,
            service: null,
            requestTime: null,
            comments: null,
            createdBy: this.user.id,
            createdDate: new Date(),
            updateBy: this.user.id,
            updatedDate: new Date()
        });
    };
    DialogRequestAdditionalTimeComponent.prototype["delete"] = function (i) {
        this.requestData.splice(i, 1);
    };
    DialogRequestAdditionalTimeComponent.prototype.save = function () {
        var _this = this;
        console.log("SAVE REQUEST TIME: ", this.requestData);
        var contador = 0;
        this.requestData.forEach(function (E) {
            if (E.comments == null || E.requestTime == null || E.service == null || E.workOrder == null) {
                contador++;
            }
        });
        console.log("Data final: ", JSON.stringify(this.requestData));
        if (contador == 0) {
            this.__loader__.showLoader();
            this._services.service_general_post_with_url("RequestAdditionalTime/PostRequestAdditionalTime", this.requestData).subscribe((function (data) {
                if (data.success) {
                    console.log(data);
                    var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Save Data"
                        },
                        width: "350px"
                    });
                    _this.__loader__.hideLoader();
                    _this.ngOnInit();
                }
            }));
        }
        else {
            var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Attention",
                    body: "All fields are required"
                },
                width: "350px"
            });
            console.log("la informacion es requerida");
            return true;
        }
    };
    DialogRequestAdditionalTimeComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-request-additional-time',
            templateUrl: './dialog-request-additional-time.component.html',
            styleUrls: ['./dialog-request-additional-time.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogRequestAdditionalTimeComponent);
    return DialogRequestAdditionalTimeComponent;
}());
exports.DialogRequestAdditionalTimeComponent = DialogRequestAdditionalTimeComponent;
