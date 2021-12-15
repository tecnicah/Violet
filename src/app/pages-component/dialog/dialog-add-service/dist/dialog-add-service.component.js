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
exports.DialogAddServiceComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var table_1 = require("@angular/material/table");
var dialog_add_cuntry_component_1 = require("../dialog-add-cuntry/dialog-add-cuntry.component");
var DialogAddServiceComponent = /** @class */ (function () {
    function DialogAddServiceComponent(dialogRef, _services, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this.data = data;
        this._dialog = _dialog;
        this.GetService = [];
        this.cuatro = ['uno', 'dos', 'tres', 'cuatro'];
        this.caCountry = [];
    }
    DialogAddServiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('data que recibe service', this.data);
        this.catalogos();
        if (this.data.serviceLocationCountries) { }
        else {
            this.data.serviceLocationCountries = [];
        }
        this.serviceLocationCountries = new table_1.MatTableDataSource(this.data.serviceLocationCountries);
        this._services.service_general_get("Catalogue/GetServiceByServiceLine?idServiceLine=" + this.data.sl).subscribe((function (data) {
            if (data.result) {
                _this.GetService = data.result.value;
            }
        }));
    };
    DialogAddServiceComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //let im = await this._services.getCatalogueFrom('GetCataegoryByServiceLineId?serviceLineId='+this.data.sl);
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        //let im = await this._services.getCatalogueFrom('GetCataegoryByServiceLineId?serviceLineId='+this.data.sl);
                        _a.caCountry = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogAddServiceComponent.prototype.getCountry = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].name;
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //office information
    DialogAddServiceComponent.prototype.addCountry = function (data, i) {
        var _this = this;
        console.log(data, i);
        if (data == null) {
            data = { id: 0, action: "new" };
        }
        else {
            data.action = i;
        }
        var dialogRef = this._dialog.open(dialog_add_cuntry_component_1.DialogAddCuntryComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                if (result.action == "new") {
                    result.idServiceLocation = _this.data.id;
                    _this.data.serviceLocationCountries.push(result);
                }
                else {
                    _this.data.serviceLocationCountries[result.action] = result;
                }
                console.log(_this.data.serviceLocationCountries);
                _this.serviceLocationCountries = new table_1.MatTableDataSource(_this.data.serviceLocationCountries);
            }
        });
    };
    DialogAddServiceComponent.prototype.save = function () {
        this.data.success = true;
        this.dialogRef.close(this.data);
    };
    DialogAddServiceComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-add-service',
            templateUrl: './dialog-add-service.component.html',
            styleUrls: ['./dialog-add-service.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAddServiceComponent);
    return DialogAddServiceComponent;
}());
exports.DialogAddServiceComponent = DialogAddServiceComponent;
