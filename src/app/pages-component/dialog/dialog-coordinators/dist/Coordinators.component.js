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
exports.DialogCoordinatorsComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var DialogCoordinatorsComponent = /** @class */ (function () {
    function DialogCoordinatorsComponent(dialogRef, _services, data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this.data = data;
        this._dialog = _dialog;
        // variables
        //   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
        // @ViewChild(MatSort) sort: MatSort;
        this.filter = { office: '' };
        this.filter_ = { serviceLine: '' };
        this.__loader__ = new loader_1.LoaderComponent();
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        this.coordinators_table_colums = ['col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6', 'col_7', 'col_8'];
        this.coordinators_table_data = undefined;
        this.filter_data = new FilterDataModel();
        /************************************************************************/
        /************************************************************************/
        /************************************************************************/
        /***************    General Functions     *******************************/
        /************************************************************************/
        /************************************************************************/
        /************************************************************************/
        this.country_catalogue = [];
        this.city_catalogue = [];
        this.serviceline_catalogue = [];
        this.office_catalogue = [];
        this.able_city_filter = false;
    }
    DialogCoordinatorsComponent.prototype.ngOnInit = function () { this.initPageBehavior(); };
    DialogCoordinatorsComponent.prototype.initPageBehavior = function () {
        this.requestCataloguesData();
        this.requestCoordinatorsTableData();
    };
    DialogCoordinatorsComponent.prototype.requestCoordinatorsTableData = function (url_params) {
        var _this = this;
        if (url_params === void 0) { url_params = ''; }
        this.__loader__.showLoader();
        this._services.service_general_get("MyDashboard/GetCoordinators/" + (this.__userlog__.id + url_params))
            .subscribe(function (response) {
            console.log('Res => ', response);
            if (response.success) {
                _this.coordinators_table_data = new table_1.MatTableDataSource(response.map.value);
                _this.coordinators_table_data.paginator = _this.pagdcoord;
                _this.coordinators_table_data.sort = _this.sortcoord;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (MyDashboard/GetCoordinators) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogCoordinatorsComponent.prototype.updateTableRequest = function () {
        var filter_params = '';
        for (var field in this.filter_data) {
            if (this.filter_data[field] != '') {
                filter_params += "&" + field + "=" + this.filter_data[field];
            }
        }
        this.requestCoordinatorsTableData('?' + filter_params.substring(1));
    };
    DialogCoordinatorsComponent.prototype.resetCoordinatorsFiltersTable = function () {
        this.filter_data = new FilterDataModel();
        this.requestCoordinatorsTableData();
    };
    DialogCoordinatorsComponent.prototype.tableSerchFilter = function (event) {
        var filterValue = event.target.value;
        this.coordinators_table_data.filter = filterValue.trim().toLowerCase();
    };
    DialogCoordinatorsComponent.prototype.requestCataloguesData = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.country_catalogue = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetServiceLine")];
                    case 2:
                        _b.serviceline_catalogue = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetOffice')];
                    case 3:
                        _c.office_catalogue = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogCoordinatorsComponent.prototype.ableCityField = function () {
        var _this = this;
        if (this.filter_data.country != '') {
            this.able_city_filter = true;
            this._services.service_general_get("Catalogue/GetState?country=" + this.filter_data.country)
                .subscribe(function (response) {
                if (response.success) {
                    _this.city_catalogue = response.result;
                }
            }, function (error) {
                console.error('Error ==> ', error);
            });
        }
        else {
            this.able_city_filter = false;
        }
    };
    DialogCoordinatorsComponent.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    __decorate([
        core_1.ViewChild('sortcoord')
    ], DialogCoordinatorsComponent.prototype, "sortcoord");
    __decorate([
        core_1.ViewChild('pagdcoord')
    ], DialogCoordinatorsComponent.prototype, "pagdcoord");
    DialogCoordinatorsComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-coordinators',
            templateUrl: './Coordinators.component.html',
            styleUrls: []
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogCoordinatorsComponent);
    return DialogCoordinatorsComponent;
}());
exports.DialogCoordinatorsComponent = DialogCoordinatorsComponent;
var FilterDataModel = /** @class */ (function () {
    function FilterDataModel() {
        this.country = '';
        this.city = '';
        this.serviceLine = '';
        this.office = '';
    }
    return FilterDataModel;
}());
