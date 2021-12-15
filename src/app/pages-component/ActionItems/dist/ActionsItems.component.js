"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ActionItemsComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var loader_1 = require("app/shared/loader");
var assignTask_component_1 = require("../dialog/dialog-assign-task/assignTask.component");
var editTask_component_1 = require("../dialog/dialog-edit-task/editTask.component");
var ActionItemsComponent = /** @class */ (function () {
    function ActionItemsComponent(_router, _dialog, _services) {
        this._router = _router;
        this._dialog = _dialog;
        this._services = _services;
        this.filteruno = false;
        this.filter_list = {};
        this.__imagesPath__ = this._services.url_images;
        this.__loader__ = new loader_1.LoaderComponent();
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        /***********************************************************************/
        /***********************************************************************/
        /************ Funciones Lista Action Items *****************/
        /***********************************************************************/
        this.pending_cards_list = [];
        this.progress_cards_list = [];
        this.done_cards_list = [];
        this.list_filter = new ListFilterText();
        /***********************************************************************/
        /***********************************************************************/
        /************ Funciones Tabla Action Items *****************/
        /***********************************************************************/
        this.actions_items_table_data = undefined;
        this.actions_items_table_cols = ['col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6', 'col_7', 'col_8'];
        this.table_filters = new TableFilterModel();
        /***********************************************************************/
        /***********************************************************************/
        /************ Funciones generales *****************/
        /***********************************************************************/
        this.show_cards_content = true;
        this.statusTask_catalogue = [];
        this.tablesr_catalogue = [];
    }
    ActionItemsComponent.prototype.consultaPermisos = function () {
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
    ActionItemsComponent.prototype.ngOnInit = function () {
        this.consultaPermisos();
        this.initPageBehavior();
    };
    ActionItemsComponent.prototype.initPageBehavior = function () {
        this.requestCatalogues();
        this.requestDataListActionItems();
    };
    ActionItemsComponent.prototype.requestDataListActionItems = function (url_params) {
        var _this = this;
        if (url_params === void 0) { url_params = ''; }
        this.__loader__.showLoader();
        console.log('URL => ', "Task/GetActionItems/" + (this.__userlog__.id + url_params));
        this._services.service_general_get("Task/GetActionItems/" + (this.__userlog__.id + url_params))
            .subscribe(function (response) {
            console.log('Aqui cainal ====> ', response);
            if (response.success) {
                _this.pending_cards_list = response.result.value.pending;
                _this.progress_cards_list = response.result.value.inProgress;
                _this.done_cards_list = response.result.value.done;
                _this.configureCardsDataToView();
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (Task/GetActionItems) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    ActionItemsComponent.prototype.configureCardsDataToView = function () {
        this.pending_cards_list.forEach(function (card) { card.active = true; });
        this.progress_cards_list.forEach(function (card) { card.active = true; });
        this.done_cards_list.forEach(function (card) { card.active = true; });
    };
    // public filter_list:ListFilter = new ListFilter();
    ActionItemsComponent.prototype.filterListRequest = function () {
        var url_params = '', range_params = '';
        for (var field in this.filter_list) {
            if (this.filter_list[field] != undefined && this.filter_list[field] != '' && this.filter_list[field] != null &&
                field != 'rangeDate1' && field != 'rangeDate2') {
                url_params += "&" + field + "=" + this.filter_list[field];
            }
            if (field == 'rangeDate1' || field == 'rangeDate2') {
                var date_1 = this.getDateFormatToUrl(this.filter_list['rangeDate1']), date_2 = this.getDateFormatToUrl(this.filter_list['rangeDate2']);
                if (date_1 != '' && date_2 != '') {
                    range_params = "&rangeDate1=" + date_1 + "&rangeDate2=" + date_2;
                }
            }
        }
        if (url_params != '' || range_params != '') {
            this.requestDataListActionItems('?' + url_params.substring(1) + range_params);
        }
    };
    ActionItemsComponent.prototype.resetActionItemsFiltersList = function () {
        var _this = this;
        this.list_filter = new ListFilterText();
        this.filter_list = new ListFilter();
        this.filter_list = {};
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.requestDataListActionItems();
    };
    ActionItemsComponent.prototype.filterListCardsBy = function () {
        var _this = this;
        this.pending_cards_list.forEach(function (card) {
            var from_data = card.from == null ? '' : card.from, to_data = card.to == null ? '' : card.to, sr_data = card.numberServiceRecord == null ? '' : card.numberServiceRecord, task_data = card.taskDescription == null ? '' : card.taskDescription;
            if (from_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                to_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                sr_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                task_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()))
                card.active = true;
            else
                card.active = false;
        });
        this.progress_cards_list.forEach(function (card) {
            var from_data = card.from == null ? '' : card.from, to_data = card.to == null ? '' : card.to, sr_data = card.numberServiceRecord == null ? '' : card.numberServiceRecord, task_data = card.taskDescription == null ? '' : card.taskDescription;
            if (from_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                to_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                sr_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                task_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()))
                card.active = true;
            else
                card.active = false;
        });
        this.done_cards_list.forEach(function (card) {
            var from_data = card.from == null ? '' : card.from, to_data = card.to == null ? '' : card.to, sr_data = card.numberServiceRecord == null ? '' : card.numberServiceRecord, task_data = card.taskDescription == null ? '' : card.taskDescription;
            if (from_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                to_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                sr_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()) ||
                task_data.toLowerCase().includes(_this.list_filter.text.toLowerCase()))
                card.active = true;
            else
                card.active = false;
        });
    };
    ActionItemsComponent.prototype.requestDataTableActionItems = function (url_params) {
        var _this = this;
        if (url_params === void 0) { url_params = ''; }
        this.__loader__.showLoader();
        this._services.service_general_get("Task/GetAllActions/" + (this.__userlog__.id + url_params))
            .subscribe(function (response) {
            if (response.success) {
                _this.actions_items_table_data = new table_1.MatTableDataSource(response.result.value);
                _this.actions_items_table_data.paginator = _this.pagAction;
                _this.actions_items_table_data.sort = _this.sortAction;
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (GetAllActions) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    ActionItemsComponent.prototype.filterTableRequest = function () {
        var filter_params = '', range_params = '';
        for (var field in this.table_filters) {
            if (this.table_filters[field] != '' && this.table_filters[field] != null
                && this.table_filters[field] != undefined && field != 'rangeDate1'
                && field != 'rangeDate2') {
                filter_params += "&" + field + "=" + this.table_filters[field];
            }
            if (field == 'rangeDate1' || field == 'rangeDate2') {
                var date_1 = this.getDateFormatToUrl(this.table_filters['rangeDate1']), date_2 = this.getDateFormatToUrl(this.table_filters['rangeDate2']);
                if (date_1 != '' && date_2 != '') {
                    range_params = "&rangeDate1=" + date_1 + "&rangeDate2=" + date_2;
                }
            }
        }
        if (filter_params != '' || range_params != '') {
            this.requestDataTableActionItems('?' + filter_params.substring(1) + range_params);
        }
    };
    ActionItemsComponent.prototype.resetActionItemsFiltersTable = function () {
        var filter_text_container = document.getElementById('table_text_filter');
        filter_text_container.value = '';
        this.table_filters = new TableFilterModel();
        this.requestDataTableActionItems();
    };
    ActionItemsComponent.prototype.serchFilterTable = function (event) {
        var filterValue = event.target.value;
        this.actions_items_table_data.filter = filterValue.trim().toLowerCase();
    };
    ActionItemsComponent.prototype.toggleActionsItemsView = function () {
        this.show_cards_content ?
            this.show_cards_content = false :
            this.show_cards_content = true;
    };
    ActionItemsComponent.prototype.requestCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetEstatusTask')];
                    case 1:
                        _a.statusTask_catalogue = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetServiceRecord/" + this.__userlog__.id)];
                    case 2:
                        _b.tablesr_catalogue = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ActionItemsComponent.prototype.getDateFormatToUrl = function (date_in) {
        var result = '';
        if (date_in != '' && date_in != null && date_in != undefined) {
            result = date_in.getFullYear() + "-" + (date_in.getMonth() + 1) + "-" + date_in.getDate();
        }
        return result;
    };
    // crear
    ActionItemsComponent.prototype.openDialogAddItemAction = function () {
        var _this = this;
        var dialog = this._dialog.open(assignTask_component_1.DialogAssignTask, {
            data: {
                id_so: undefined
            },
            width: "95%"
        });
        dialog.afterClosed().subscribe(function (result) {
            _this.initPageBehavior();
        });
    };
    // editar
    ActionItemsComponent.prototype.openDialogActionItemDetail = function (card) {
        var _this = this;
        var assing_task_dialog = this._dialog.open(editTask_component_1.DialogEditTask, {
            data: card,
            width: '95%'
        });
        assing_task_dialog.afterClosed().subscribe(function (result) {
            _this.initPageBehavior();
        });
    };
    ActionItemsComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.ViewChild('sortAction')
    ], ActionItemsComponent.prototype, "sortAction");
    __decorate([
        core_1.ViewChild('pagAction')
    ], ActionItemsComponent.prototype, "pagAction");
    ActionItemsComponent = __decorate([
        core_1.Component({
            selector: 'action-items-component',
            templateUrl: './ActionsItems.component.html',
            styleUrls: ['./ActionsItems.component.scss']
        })
    ], ActionItemsComponent);
    return ActionItemsComponent;
}());
exports.ActionItemsComponent = ActionItemsComponent;
var ListFilter = /** @class */ (function () {
    function ListFilter() {
        this.rangeDate1 = '';
        this.rangeDate2 = '';
        this.asignedToMeOrByMe = '';
    }
    return ListFilter;
}());
var ListFilterText = /** @class */ (function () {
    function ListFilterText() {
        this.text = '';
    }
    return ListFilterText;
}());
var TableFilterModel = /** @class */ (function () {
    function TableFilterModel() {
        this.rangeDate1 = '';
        this.rangeDate2 = '';
        this.sr = '';
        this.status = '';
    }
    return TableFilterModel;
}());
