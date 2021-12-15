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
exports.DialogAddCall = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var DialogAddCall = /** @class */ (function () {
    function DialogAddCall(dialogRef, _services, _routerParams, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.data = data;
        this._dialog = _dialog;
        this.duration_catalogue = [];
        this.serviceline_catalogue = [];
        this.userto_catalogue = [];
        this.calle = [];
        this.assistance = [];
        this.show_errors_form = false;
        this.call_model = new CallModel();
        this.services_catalogue = [];
        this.workorders_catalogue = [];
        this.now_can_see_services = false;
        this.now_can_see_services_wo = false;
    }
    DialogAddCall.prototype.ngOnInit = function () {
        this.getCatalogues();
        this.call_model = this.data;
        console.log("call_model: ", this.call_model);
        this.filterServices();
    };
    DialogAddCall.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 1:
                        _a.duration_catalogue = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 2:
                        _b.serviceline_catalogue = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetUserTo')];
                    case 3:
                        _c.userto_catalogue = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogAddCall.prototype.FilterUser = function () {
        console.log("Entra a filtrar informacion");
        var aux_data = [];
        for (var i = 0; i < this.userto_catalogue.value.length; i++) {
            if (this.userto_catalogue.value[i].id != this.call_model.caller) {
                aux_data.push(this.userto_catalogue.value[i]);
            }
        }
        this.calle = aux_data;
    };
    DialogAddCall.prototype.FilterAssistance = function () {
        console.log("Entra a filtrar informacion");
        var aux_data = [];
        for (var i = 0; i < this.calle.length; i++) {
            if (this.calle[i].id != this.call_model.calle) {
                aux_data.push(this.calle[i]);
            }
        }
        this.assistance = aux_data;
    };
    DialogAddCall.prototype.sendNewCall = function () {
        var _this = this;
        this.show_errors_form = true;
        this.call_model.serviceRecordId = this.data.id_so;
        this.call_model.callAssistants = [];
        var data = this.userto_catalogue.value;
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < this.call_model.assistance.length; j++) {
                if (data[i].id == this.call_model.assistance[j]) {
                    this.call_model.callAssistants.push({
                        "callId": this.call_model.id,
                        "assistant": data[i].id
                    });
                }
            }
        }
        debugger;
        if (this.validatingFullForm()) {
            this._services.service_general_post_with_url('Call/CreateCall', this.call_model)
                .subscribe(function (response) {
                if (response.success) {
                    _this.hideModal();
                    _this.showGeneralMessageDialog('Call created', 'Call has been created successfully');
                }
            }, function (error) {
                console.error('[CP57] (Call/CreateCall) => ', error);
            });
        }
    };
    DialogAddCall.prototype.validatingFullForm = function () {
        var result = true;
        if (this.call_model.caller == '')
            result = false;
        if (this.call_model.calle == '')
            result = false;
        if (this.call_model.date == '')
            result = false;
        if (this.call_model.time == '')
            result = false;
        if (this.call_model.duration == '')
            result = false;
        if (this.call_model.serviceLineId == '')
            result = false;
        if (this.call_model.serviceId == '')
            result = false;
        if (this.call_model.workOrderId == '')
            result = false;
        return result;
    };
    DialogAddCall.prototype.getServiceLine = function (line_id) {
        return __awaiter(this, void 0, Promise, function () {
            var params, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.now_can_see_services = true;
                        params = "?service_record_Id=" + this.data.id_so + "&service_line_id=" + line_id;
                        //this.services_catalogue = await this._services.getCatalogueFrom('GetServiceBySOId', params);
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetworkOrderBySR', params)];
                    case 1:
                        //this.services_catalogue = await this._services.getCatalogueFrom('GetServiceBySOId', params);
                        _a.workorders_catalogue = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogAddCall.prototype.filterServices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceByWorkOrder?wo=' + this.call_model.workOrderId)];
                    case 1:
                        _a.services_catalogue = _b.sent();
                        this.now_can_see_services_wo = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogAddCall.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    DialogAddCall.prototype.showGeneralMessageDialog = function (title, body) {
        if (title === void 0) { title = "No title"; }
        if (body === void 0) { body = "No content"; }
        var dialogRef = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: title,
                body: body
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    DialogAddCall = __decorate([
        core_1.Component({
            selector: 'add-call-dialog',
            templateUrl: './addCall.component.html',
            styleUrls: []
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAddCall);
    return DialogAddCall;
}());
exports.DialogAddCall = DialogAddCall;
var CallModel = /** @class */ (function () {
    function CallModel() {
        this.id = 0;
        this.serviceRecordId = 0;
        this.caller = '';
        this.calle = '';
        this.date = '';
        this.time = '';
        this.duration = '';
        this.welcomeCall = false;
        this.escalate = false;
        this.serviceId = '';
        this.serviceLineId = '';
        this.comments = '';
        this.workOrderId = '';
        this.assistance = [];
        this.callAssistants = [];
    }
    return CallModel;
}());
