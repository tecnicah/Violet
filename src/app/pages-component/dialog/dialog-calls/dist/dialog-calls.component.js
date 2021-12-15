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
exports.DialogCallsComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_edit_call_component_1 = require("../dialog-edit-call/dialog-edit-call.component");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var dialog_dashboard_add_call_component_1 = require("../dialog-dashboard-add-call/dialog-dashboard-add-call.component");
var DialogCallsComponent = /** @class */ (function () {
    function DialogCallsComponent(_services, _dialog, dialogRef, data) {
        this._services = _services;
        this._dialog = _dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.__loader__ = new loader_1.LoaderComponent();
        this.displayedColumns = ['ServiceRecord', 'WorkOrder', 'Service', 'Caller', 'Callee', 'Date', 'Time', 'Duration', 'Escalate', 'edit'];
        this.filter_ = { numberServiceRecord: '' };
        this.filter = { numberWorkOrder: '' };
        this.filters = { serviceNumber: '' };
        this.filteruno = false;
        this.ca_service_record = [];
        this.data_model = {};
        this.workOrder = [];
        this.services = [];
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    DialogCallsComponent.prototype.consultaPermisos = function () {
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
    DialogCallsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaPermisos();
        this.__loader__.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe((function (data) {
            if (data.success) {
                _this.ca_service_record = data.result;
            }
        }));
        this._services.service_general_get('MyDashboard/GetCalls/' + this.user.id).subscribe((function (data) {
            if (data.success) {
                console.log(data.map.value);
                _this.data_table = new table_1.MatTableDataSource(data.map.value);
                _this.data_table.paginator = _this.pagcall;
                _this.data_table.sort = _this.sortcall;
                _this.__loader__.hideLoader();
            }
        }));
    };
    //********************************************************************//
    DialogCallsComponent.prototype.consultaWorkOrder = function () {
        var _this = this;
        this.workOrder = [];
        this.services = [];
        this._services.service_general_get('Catalogue/GetworkOrder/' + this.data_model.sr).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.workOrder = data.result.value;
            }
        }));
    };
    //********************************************************************//
    DialogCallsComponent.prototype.consultaService = function () {
        var _this = this;
        console.log("Entra a consultar servicios");
        this.services = [];
        this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data_model.wo).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.services = data.result.value;
            }
        }), function (err) {
            console.log("err: ", err);
        });
    };
    //********************************************************************//
    DialogCallsComponent.prototype.editCall = function (element) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_edit_call_component_1.DialogEditCallComponent, {
            data: element,
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
            //this.cleanFilter();
        });
    };
    //********************************************************************//
    DialogCallsComponent.prototype.AddCall = function () {
        var _this = this;
        var add_call_dialog = this._dialog.open(dialog_dashboard_add_call_component_1.DialogDashboardAddCallComponent, {
            width: "95%"
        });
        add_call_dialog.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
            //this.cleanFilter();
        });
    };
    //********************************************************************//
    DialogCallsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.data_table.filter = filterValue.trim().toLowerCase();
    };
    //********************************************************************//
    //FUNCION PARA BUSQUEDA DE EVENTOS//
    DialogCallsComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        var params = '';
        for (var item in this.data_model) {
            if (this.data_model[item] != '') {
                service_record_params_selected += item + "=" + this.data_model[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.getServiceRecordTableData(params);
    };
    //********************************************************************//
    //CONSULTA INFORMACION POR FILTRO//
    DialogCallsComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('MyDashboard/GetCalls/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                var eventos = data.map.value;
                console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
                _this.data_table = new table_1.MatTableDataSource(data.map.value);
                _this.data_table.paginator = _this.pagcall;
                _this.data_table.sort = _this.sortcall;
                _this.__loader__.hideLoader();
            }
        });
    };
    //**********************************************************************//
    DialogCallsComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.workOrder = [];
        this.services = [];
        this.data_model = {};
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    __decorate([
        core_1.ViewChild('sortcall')
    ], DialogCallsComponent.prototype, "sortcall");
    __decorate([
        core_1.ViewChild('pagcall')
    ], DialogCallsComponent.prototype, "pagcall");
    DialogCallsComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-calls',
            templateUrl: './dialog-calls.component.html',
            styleUrls: ['./dialog-calls.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogCallsComponent);
    return DialogCallsComponent;
}());
exports.DialogCallsComponent = DialogCallsComponent;
