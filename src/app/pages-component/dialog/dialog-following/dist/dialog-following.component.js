"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogFollowingComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../general-message/general-message.component");
var DialogFollowingComponent = /** @class */ (function () {
    function DialogFollowingComponent(_services, _dialog) {
        this._services = _services;
        this._dialog = _dialog;
        this.loader = new loader_1.LoaderComponent();
        this.ca_coordinator = [];
        this.ca_service_record = [];
        this.data_filter = {
            sr: "",
            coordinator: ""
        };
        this.filteruno = false;
        this.displayedColumns = ['ServiceRecord', 'VIP', 'status', 'AuthoDate', 'Partner', 'Client', 'Coordinator', 'AssigneeName', 'Services', 'Unfollow'];
        this.filterServiceRecord = { numberServiceRecord: '' };
        this.filterCoordinator = { coordinator: '' };
        this.maxall = 20;
        //*****************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    DialogFollowingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaPermisos();
        this.loader.showLoader();
        this.user = JSON.parse(localStorage.getItem("userData"));
        this._services.service_general_get('MyDashboard/GetFollowing/' + this.user.id).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                console.log(data.map.value);
                for (var i = 0; i < data.map.value.length; i++) {
                    data.map.value[i].services_SR = [];
                    for (var j = 0; j < data.map.value[i].immigration.length; j++) {
                        data.map.value[i].services_SR.push(data.map.value[i].immigration[j]);
                    }
                    for (var j = 0; j < data.map.value[i].relocation.length; j++) {
                        data.map.value[i].services_SR.push(data.map.value[i].relocation[j]);
                    }
                }
                console.log("Objeto final: ", data.map.value);
                _this.data_table = new table_1.MatTableDataSource(data.map.value);
                _this.data_table.paginator = _this.pagFollowing;
                _this.data_table.sort = _this.sortFollowing;
            }
        }));
        this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.ca_service_record = data.result;
            }
        }));
        this.catalogos();
    };
    // paginator
    DialogFollowingComponent.prototype.getPageSizeOptions = function () {
        if (this.data_table.paginator.length > this.maxall)
            return [10, 20, this.data_table.paginator.length];
        else
            return [10, 20];
    };
    DialogFollowingComponent.prototype.consultaPermisos = function () {
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
    DialogFollowingComponent.prototype.catalogos = function () {
        var _this = this;
        //this.ca_coordinator = await this._services.getCatalogueFrom('GetCoordinator');
        this._services.service_general_get("Catalogue/GetCoordinator/0").subscribe((function (data) {
            if (data.success) {
                console.log("select coordinator: ", data.result);
                _this.ca_coordinator = data.result.value;
            }
        }));
        this.loader.hideLoader();
    };
    //*********************************************//
    DialogFollowingComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.data_filter) {
            if (this.data_filter[item] != '') {
                service_record_params_selected += item + "=" + this.data_filter[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.getServiceRecordTableData(params);
    };
    //********************************************//
    DialogFollowingComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.loader.showLoader();
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('MyDashboard/GetFollowing/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                for (var i = 0; i < data.map.value.length; i++) {
                    data.map.value[i].services_SR = [];
                    for (var j = 0; j < data.map.value[i].immigration.length; j++) {
                        data.map.value[i].services_SR.push(data.map.value[i].immigration[j]);
                    }
                    for (var j = 0; j < data.map.value[i].relocation.length; j++) {
                        data.map.value[i].services_SR.push(data.map.value[i].relocation[j]);
                    }
                }
                _this.data_table = new table_1.MatTableDataSource(data.map.value);
                _this.data_table.paginator = _this.pagFollowing;
                _this.data_table.sort = _this.sortFollowing;
                _this.loader.hideLoader();
            }
        });
    };
    //********************************************//
    DialogFollowingComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.data_table.filter = filterValue.trim().toLowerCase();
    };
    //********************************************//
    DialogFollowingComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.filterServiceRecord = { numberServiceRecord: '' };
        this.filterCoordinator = { coordinator: '' };
        this.data_filter = {
            sr: '',
            coordinator: ''
        };
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    //*********************************************//
    DialogFollowingComponent.prototype.delete_follow = function (data) {
        var _this = this;
        console.log(data);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this following?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("Follow/DeleteFollow?id=" + data.id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Following deleted"
                            },
                            width: "350px"
                        });
                    }
                    _this.ngOnInit();
                }));
            }
        });
    };
    DialogFollowingComponent.prototype.viewList = function (element) {
        console.log("lista de servicios: ", element);
        this.services_List = element.services_SR;
    };
    __decorate([
        core_1.ViewChild('sortFollowing')
    ], DialogFollowingComponent.prototype, "sortFollowing");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], DialogFollowingComponent.prototype, "pagFollowing");
    DialogFollowingComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-following',
            templateUrl: './dialog-following.component.html',
            styleUrls: ['./dialog-following.component.css']
        })
    ], DialogFollowingComponent);
    return DialogFollowingComponent;
}());
exports.DialogFollowingComponent = DialogFollowingComponent;
