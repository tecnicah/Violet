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
exports.TrainingAdminComponent = void 0;
var core_1 = require("@angular/core");
var add_participante_component_1 = require("./dialog/add-participante/add-participante.component");
var sort_1 = require("@angular/material/sort");
var forms_1 = require("@angular/forms");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var add_group_component_1 = require("./dialog/add-group/add-group.component");
var TrainingAdminComponent = /** @class */ (function () {
    function TrainingAdminComponent(router, _services, _dialog, _routerParams) {
        this.router = router;
        this._services = _services;
        this._dialog = _dialog;
        this._routerParams = _routerParams;
        this.range = new forms_1.FormGroup({
            startDate: new forms_1.FormControl(),
            endDate: new forms_1.FormControl()
        });
        this.p = 1;
        this.c = 1;
        this.show_no_registros_individuales = false;
        this.show_no_registros_grupales = false;
        this.userFilter = { name: '' };
        this.userGroup = { name: '' };
        this.global_training_individual = [];
        this.global_training_grupal = [];
        this.filterTraining = { type: '' };
        //********************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        //********************************************************************//
        //FUNCION PARA CONSULTA DE CATALOGOS//
        this.ca_training_type = [];
        this.ca_training_group = [];
        //********************************************************************//
        this.show_group = false;
        //********************************************************************//
        //VARIABLES PARA BUSCAR//
        this.search = {
            groups: false
        };
        //******************************************************************************//
        this.filteruno = false;
    }
    TrainingAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("data");
        this.getCatalogos();
        this.consultaPermisos();
        this._services.service_general_get('Training/GetTrainings').subscribe((function (data) {
            if (data.success) {
                var registros = data.result;
                console.log(registros);
                _this.registros_training = registros;
                var contadorGrupal = 0;
                var contadorIndividual = 0;
                var training_individual = [];
                var training_grupal = [];
                for (var i = 0; i < _this.registros_training.length; i++) {
                    if (_this.registros_training[i].groups == true) {
                        contadorGrupal++;
                        training_grupal.push(_this.registros_training[i]);
                    }
                    if (_this.registros_training[i].groups == false) {
                        contadorIndividual++;
                        training_individual.push(_this.registros_training[i]);
                    }
                }
                _this.global_training_individual = training_individual;
                //this.global_training_grupal = training_grupal;
                console.log('Este es el training grupal', training_grupal);
                var json_menu = [];
                var contador_aux = 0;
                var posicion_json = 0;
                for (var i = 0; i < training_grupal.length; i++) {
                    contador_aux = 0;
                    posicion_json = 0;
                    for (var j = 0; j < json_menu.length; j++) {
                        if (training_grupal[i].groupId == json_menu[j].groupId) {
                            contador_aux++;
                            posicion_json = j;
                        }
                    }
                    switch (training_grupal[i].groupId) {
                        case training_grupal[i].groupId:
                            if (contador_aux == 0) {
                                json_menu.push({
                                    name: training_grupal[i].groupName,
                                    groupId: training_grupal[i].groupId,
                                    id: training_grupal[i].id,
                                    training: [{
                                            "creationDate": training_grupal[i].creationDate,
                                            "description": training_grupal[i].description,
                                            "groupId": training_grupal[i].groupId,
                                            "groupName": training_grupal[i].groupName,
                                            "groups": training_grupal[i].groups,
                                            "id": training_grupal[i].id,
                                            "name": training_grupal[i].name,
                                            "type": training_grupal[i].type,
                                            "typeId": training_grupal[i].typeId
                                        }]
                                });
                            }
                            else {
                                json_menu[posicion_json].training.push({
                                    "creationDate": training_grupal[i].creationDate,
                                    "description": training_grupal[i].description,
                                    "groupId": training_grupal[i].groupId,
                                    "groupName": training_grupal[i].groupName,
                                    "groups": training_grupal[i].groups,
                                    "id": training_grupal[i].id,
                                    "name": training_grupal[i].name,
                                    "type": training_grupal[i].type,
                                    "typeId": training_grupal[i].typeId
                                });
                            }
                            break;
                    }
                }
                console.log("Este es el JSON GRUPAL: ", json_menu);
                _this.global_training_grupal = json_menu;
                console.log(_this.global_training_grupal);
                if (contadorIndividual > 0) {
                    _this.show_no_registros_individuales = true;
                }
                if (contadorGrupal > 0) {
                    _this.show_no_registros_grupales = true;
                }
            }
        }));
    };
    TrainingAdminComponent.prototype.consultaPermisos = function () {
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
    TrainingAdminComponent.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTrainingType')];
                    case 1:
                        _a.ca_training_type = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTrainingGroup')];
                    case 2:
                        _b.ca_training_group = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TrainingAdminComponent.prototype.showGroups = function (e) {
        console.log(e);
        if (e.checked) {
            this.show_group = true;
        }
        else {
            this.show_group = false;
        }
    };
    //********************************************************************//
    //FUNCIONA PARA AGREGAR PARTICIPANTES AL CURSO//
    TrainingAdminComponent.prototype.addParticipante = function (data_) {
        var dialogRef = this._dialog.open(add_participante_component_1.AddParticipanteComponent, {
            width: "40%",
            data: data_
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //this.ngOnInit();
        });
    };
    //********************************************************************//
    //FUNCION PARA AGREGAR NUEVO GRUPO//
    TrainingAdminComponent.prototype.addGroup = function () {
        var _this = this;
        var dialogRef = this._dialog.open(add_group_component_1.AddGroupComponent, {
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    //********************************************************************//
    //FUNCION PARA AGREGAR UN NUEVO TRAINING//
    TrainingAdminComponent.prototype.addTraining = function () {
        var id = 0;
        this.router.navigateByUrl('/admin-trainig/addTraining/' + id);
    };
    //FUNCION PARA EDITAR TRAINING//
    TrainingAdminComponent.prototype.editTraining = function (id) {
        this.router.navigateByUrl('/admin-trainig/addTraining/' + id);
        //localStorage.setItem('id_training',id)
    };
    //METODO PARA BUSQUEDA POR TECLEADO DE FOMRA MANUAL//
    TrainingAdminComponent.prototype.applyFilter = function (event) {
        //const filterValue = (event.target as HTMLInputElement).value;
        //this.registros_training.filter = filterValue.trim().toLowerCase();
        //console.log(this.registros_training);
    };
    //FUNCION PARA ARMAR LA URL PARA REALIZAR BUSQUEDA DE REGISTROS CON PARAMETROS PERSONALIZADOS//
    TrainingAdminComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.search) {
            if (this.search[item] != '') {
                service_record_params_selected += item + "=" + this.search[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.getServiceRecordTableData(params);
    };
    //FUNCION PARA BUSCAR REGISTROS CON PARAMETROS PERSONALIZADOS//
    TrainingAdminComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('Training/GetTrainings' + params_in).subscribe(function (data) {
            if (data.success) {
                var registros = data.result[0];
                _this.registros_training = registros;
                //this.registros_training = new MatTableDataSource(registros);
                //this.registros_training.paginator = this.Supplier;
                //this.registros_training.sort = this.sort;
            }
        });
    };
    //**********************************************************//
    //FUNCION PARA REALIZAAR BUSQUEDA POR RENGO DE FECHA//
    TrainingAdminComponent.prototype.filteringServiceRecordTable = function () {
        var service_record_params_selected = '';
        var params = '';
        if (this.range.value.startDate != null)
            this.search.startDate = this.filterDate(this.range.value.startDate);
        if (this.range.value.endDate != null)
            this.search.endDate = this.filterDate(this.range.value.endDate);
        for (var item in this.search) {
            if (this.search[item] != '') {
                service_record_params_selected += item + "=" + this.search[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        if (this.range.value.startDate != null && this.range.value.endDate != null) {
            this.getServiceRecordTableData(params);
        }
    };
    //FUNCION PARA DAR FORMATO AL RANGO POR FECHA//
    TrainingAdminComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //*******************************************************************************************//
    //FUNCION PARA ELIMINAR CURSOS//
    TrainingAdminComponent.prototype.deleteCurso = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Training?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                console.log("training eliminado");
                _this._services.service_general_delete("Training?key=" + id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Training was deleted"
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                }));
            }
        });
    };
    TrainingAdminComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.filterTraining = { type: '' };
        this.range.reset({ startDate: '', endDate: '' });
        this.search = {
            groups: false
        };
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    __decorate([
        core_1.ViewChild('Supplier')
    ], TrainingAdminComponent.prototype, "Supplier");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], TrainingAdminComponent.prototype, "sort");
    TrainingAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-training-admin',
            templateUrl: './training-admin.component.html',
            styleUrls: ['./training-admin.component.css']
        })
    ], TrainingAdminComponent);
    return TrainingAdminComponent;
}());
exports.TrainingAdminComponent = TrainingAdminComponent;
