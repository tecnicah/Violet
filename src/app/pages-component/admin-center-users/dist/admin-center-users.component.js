"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminCenterUsersComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var dialog_catalog_roles_component_1 = require("../dialog/dialog-catalog-roles/dialog-catalog-roles.component");
var dialog_catalog_user_component_1 = require("../dialog/dialog-catalog-user/dialog-catalog-user.component");
var general_message_component_1 = require("./../dialog/general-message/general-message.component");
var paginator_1 = require("@angular/material/paginator");
var general_confirmation_component_1 = require("./../dialog/general-confirmation/general-confirmation.component");
var dialog_inactive_user_component_1 = require("./../dialog/dialog-inactive-user/dialog-inactive-user.component");
var AdminCenterUsersComponent = /** @class */ (function () {
    function AdminCenterUsersComponent(_services, _dialog, _router) {
        this._services = _services;
        this._dialog = _dialog;
        this._router = _router;
        this.dataRolesSerch = [];
        this.data_model = {};
        this.role = [];
        this.filteruno = false;
        this.displayedColumnsRoles = ['Role', 'Description', 'Creation Date', 'Action'];
        this.displayedColumnsUser = ['Name', 'Office', 'Country', 'Job Title', 'Role', 'Creation Date', 'Action'];
        this.displayedColumnsDeleteUser = ['Name', 'Office', 'Country', 'Job Title', 'Role', 'Creation Date', 'Action'];
        // loader
        this.__loader__ = new loader_1.LoaderComponent();
        this.filterRole = { name: '' };
        this.maxall = 20;
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    AdminCenterUsersComponent.prototype.ngOnInit = function () {
        this.__loader__.showLoader();
        this.selectCatalog('Users');
        this.get_catalogos();
        this.consultaPermisos();
        this.__loader__.hideLoader();
    };
    AdminCenterUsersComponent.prototype.consultaPermisos = function () {
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
    AdminCenterUsersComponent.prototype.selectCatalog = function (catalog) {
        console.log('se eligio el catalogo', catalog);
        this.tableCatalog = catalog;
        this.get_catalogos();
    };
    AdminCenterUsersComponent.prototype.get_catalogos = function () {
        var _this = this;
        if (this.tableCatalog == 'Roles') {
            this.__loader__.showLoader();
            this._services.service_general_get('Catalog/GetAllRole').subscribe(function (rRole) {
                console.log('catalogo role', rRole);
                if (rRole.success) {
                    // this.dataRoles = rRole.result;
                    _this.dataRoles = new table_1.MatTableDataSource(rRole.result);
                    _this.dataRoles.paginator = _this.pagrole;
                    _this.dataRoles.sort = _this.sortrole;
                    // ++
                    document.getElementById('role').className = "filterCard__card--active";
                    // document.getElementById('jobT').className = "filterCard__card";
                    // document.getElementById('life').className = "filterCard__card";
                    document.getElementById('user').className = "filterCard__card";
                    document.getElementById('cardDeleteUser').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Users') {
            this.__loader__.showLoader();
            // role
            this._services.service_general_get('Catalog/GetRoles').subscribe(function (rRole) {
                console.log('catalogo role', rRole);
                if (rRole.success) {
                    _this.dataRolesSerch = [];
                    for (var i = 0; i < rRole.result.length; i++) {
                        var eRole = rRole.result[i];
                        _this.dataRolesSerch.push(eRole);
                    }
                }
            });
            this._services.service_general_get('Catalog/GetAllUsers').subscribe(function (rUser) {
                console.log('catalogo user', rUser);
                if (rUser.success) {
                    // this.dataUser = rUser.result.value;
                    _this.dataUser = new table_1.MatTableDataSource(rUser.result.value);
                    _this.dataUser.paginator = _this.paguser;
                    _this.dataUser.sort = _this.sortuser;
                    console.log('dataTable', _this.dataUser);
                    // ++
                    document.getElementById('role').className = "filterCard__card";
                    // document.getElementById('jobT').className = "filterCard__card";
                    // document.getElementById('life').className = "filterCard__card";
                    document.getElementById('user').className = "filterCard__card--active";
                    document.getElementById('cardDeleteUser').className = "filterCard__card";
                    _this.search = '';
                    _this.data_model.role = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Delete user') {
            this.__loader__.showLoader();
            this._services.service_general_get('Catalog/User/Inactive').subscribe(function (rDeleteUser) {
                console.log('catalogo delete user', rDeleteUser);
                if (rDeleteUser.success) {
                    _this.dataDeleteUser = new table_1.MatTableDataSource(rDeleteUser.result.value);
                    _this.dataDeleteUser.paginator = _this.pagdeleteuser;
                    _this.dataDeleteUser.sort = _this.sortdeleteuser;
                    console.log('dataTable', _this.dataDeleteUser);
                    document.getElementById('role').className = "filterCard__card";
                    document.getElementById('user').className = "filterCard__card";
                    document.getElementById('cardDeleteUser').className = "filterCard__card--active";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
    };
    AdminCenterUsersComponent.prototype.getPageSizeOptionsRole = function () {
        if (this.dataRoles.paginator.length > this.maxall)
            return [10, 20, this.dataRoles.paginator.length];
        else
            return [10, 20, this.maxall];
    };
    AdminCenterUsersComponent.prototype.getPageSizeOptionsUser = function () {
        if (this.dataUser.paginator.length > this.maxall)
            return [10, 20, this.dataUser.paginator.length];
        else
            return [10, 20, this.maxall];
    };
    AdminCenterUsersComponent.prototype.getPageSizeOptionsDelete = function () {
        if (this.dataDeleteUser.paginator.length > this.maxall)
            return [10, 20, this.dataDeleteUser.paginator.length];
        else
            return [10, 20, this.maxall];
    };
    // paginator
    AdminCenterUsersComponent.prototype.applyFilter = function (event) {
        console.log(event, 'estas buscando');
        var filterValue = event.target.value;
        if (this.tableCatalog == 'Roles') {
            this.dataRoles.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Users') {
            this.dataUser.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Delete user') {
            this.dataDeleteUser = filterValue.trim().toLowerCase();
        }
    };
    AdminCenterUsersComponent.prototype.searchData = function () {
        // let role_select: string = '';
        // let params = '';
        if (this.data_model.role != '') {
            // role_select = this.data_model.role;
            this.getServiceRecordTableData(this.data_model.role);
        }
    };
    //CONSULTA INFORMACION POR FILTRO//
    AdminCenterUsersComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        this.__loader__.showLoader();
        this.dataUser = [];
        this._services.service_general_get("Catalog/GetAllUsers?role=" + params).subscribe(function (data) {
            if (data.success) {
                _this.dataUser = new table_1.MatTableDataSource(data.result.value);
                _this.dataUser.paginator = _this.paguser;
                _this.dataUser.sort = _this.sortuser;
                _this.__loader__.hideLoader();
            }
        });
    };
    AdminCenterUsersComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.filterRole = { name: '' };
        this.data_model.role = '';
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    AdminCenterUsersComponent.prototype.addRole = function (id) {
        var _this = this;
        console.log('abrir modal role');
        console.log('abrir modal currencies');
        var dialogRef = this._dialog.open(dialog_catalog_roles_component_1.DialogCatalogRolesComponent, {
            data: { id: id },
            width: "100%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Updated data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    AdminCenterUsersComponent.prototype.deleteRole = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Role?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("Catalog/DeleteRole/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted " + data.result.role
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Role is in use by other records"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    AdminCenterUsersComponent.prototype.addUser = function (id, role) {
        var _this = this;
        console.log('abrir modal currencies');
        var dialogRef = this._dialog.open(dialog_catalog_user_component_1.DialogCatalogUserComponent, {
            data: {
                id: id,
                role: role
            },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Updated data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 3) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Error",
                        body: "error mail"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    AdminCenterUsersComponent.prototype.profilePage = function (id) {
        var _this = this;
        var role;
        console.log(id);
        if (id != 0) {
            this._services.service_general_get("Catalog/GetUser/" + id).subscribe(function (r) {
                if (r.success) {
                    role = r.result.value.role;
                    // role id 19 es igual a "Super Admin"
                    // if (role == 1 || role == 19) {
                    if(role != 2 && role != 3){
                        _this._router.navigateByUrl("profilemanager/" + id);
                    }
                    else if (role == 2) {
                        _this._router.navigateByUrl("profilecoordinator/" + id);
                    }
                    else if (role == 3) {
                        _this._router.navigateByUrl("profileconsultant/" + id);
                    }
                }
            });
        }
    };
    AdminCenterUsersComponent.prototype.deleteUser = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this User?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete('Catalog/User/' + id + '/Inactive').subscribe(function (data) {
                    console.log('respuesta de inactivacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted " + data.result.name
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The user is in use."
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // activa el usuario en la seccion delete user
    AdminCenterUsersComponent.prototype.activeUser = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_inactive_user_component_1.DialogInactiveUserComponent, {
            data: {
                header: "Active confirmation",
                body: "Are you sure to active this User?"
            },
            width: "350px"
        });
        // Catalog/User/${id}/Active
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_put("Catalog/User/" + id + "/active", '').subscribe(function (data) {
                    console.log('respuesta de activacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Active " + data.result.name
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                });
            }
        });
    };
    AdminCenterUsersComponent.prototype.dateWorker = function (date) {
        var result = '';
        if (date != null) {
            var date_to_work = date, date_remove_time = date_to_work.split('T')[0];
            result = date_remove_time;
        }
        else {
            result = 'No Date';
        }
        return result;
    };
    __decorate([
        core_1.ViewChild('sortrole')
    ], AdminCenterUsersComponent.prototype, "sortrole");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], AdminCenterUsersComponent.prototype, "pagrole");
    __decorate([
        core_1.ViewChild('sortuser')
    ], AdminCenterUsersComponent.prototype, "sortuser");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], AdminCenterUsersComponent.prototype, "paguser");
    __decorate([
        core_1.ViewChild('sortdeleteuser')
    ], AdminCenterUsersComponent.prototype, "sortdeleteuser");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], AdminCenterUsersComponent.prototype, "pagdeleteuser");
    AdminCenterUsersComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-center-users',
            templateUrl: './admin-center-users.component.html',
            styleUrls: ['./admin-center-users.component.css']
        })
    ], AdminCenterUsersComponent);
    return AdminCenterUsersComponent;
}());
exports.AdminCenterUsersComponent = AdminCenterUsersComponent;
