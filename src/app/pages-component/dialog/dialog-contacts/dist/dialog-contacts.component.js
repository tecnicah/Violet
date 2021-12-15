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
exports.DialogContactsComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var DialogContactsComponent = /** @class */ (function () {
    function DialogContactsComponent(dialogRef, _services, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this.data = data;
        this._dialog = _dialog;
        this.caTypeOffice = [];
        this.caCity = [];
        this.current_email = '';
        this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.fass_validator = {
            no_name: false,
            no_bdat: false,
            no_emai: false,
            no_emai_val: false,
            no_mpho: false,
            no_wpho: false,
            no_idat: false,
            no_fdat: false,
            no_cpos: false,
            no_npos: false,
            no_adur: false,
            no_atim: false
        };
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    DialogContactsComponent.prototype.ngOnInit = function () {
        this.consultaPermisos();
        console.log('data modal', this.data);
        this.catalogos();
    };
    DialogContactsComponent.prototype.consultaPermisos = function () {
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
    DialogContactsComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetContactType')];
                    case 1:
                        _a.caTypeOffice = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCity')];
                    case 2:
                        _b.caCity = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogContactsComponent.prototype.showGeneralMessageDialog = function (title, body) {
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
    DialogContactsComponent.prototype.removeErrorLabel = function (input_value, object_data) {
        if (input_value == "" || input_value == null) {
            object_data.handler[object_data.field] = true;
        }
        else {
            object_data.handler[object_data.field] = false;
        }
    };
    DialogContactsComponent.prototype.validEmailAssignee = function (email) {
        !this.validateEmail(email) ?
            this.fass_validator.no_emai_val = true :
            this.fass_validator.no_emai_val = false;
    };
    DialogContactsComponent.prototype.validateEmail = function (email_in) {
        var result = true;
        var validating_email = this.emailPattern.test(email_in);
        if (!validating_email)
            result = false;
        return result;
    };
    DialogContactsComponent.prototype.validateEmailServerAvailability = function (mail) {
        var _this = this;
        if (mail != '') {
            this._services.service_general_get("User/VeryfyEmail?email=" + mail)
                .subscribe(function (response) {
                console.log('Res => ', response);
                if (_this.current_email != response.result) {
                    if (!response.success) {
                        _this.showGeneralMessageDialog('Email already exists', 'The email already exists, perhaps it has been used in any Service Record.');
                        _this.data.email = '';
                    }
                }
            }, function (error) {
                console.error('Error (User/VeryfyEmail) => ', error);
            });
        }
    };
    DialogContactsComponent.prototype.save = function () {
        this.data.success = true;
        this.dialogRef.close(this.data);
    };
    DialogContactsComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-contacts',
            templateUrl: './dialog-contacts.component.html',
            styleUrls: ['./dialog-contacts.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogContactsComponent);
    return DialogContactsComponent;
}());
exports.DialogContactsComponent = DialogContactsComponent;
