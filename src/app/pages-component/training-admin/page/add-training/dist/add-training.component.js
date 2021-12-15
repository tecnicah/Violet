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
exports.AddTrainingComponent = void 0;
var core_1 = require("@angular/core");
var add_content_component_1 = require("../../dialog/add-content/add-content.component");
var general_message_component_1 = require("app/pages-component/dialog/general-message/general-message.component");
var AddTrainingComponent = /** @class */ (function () {
    function AddTrainingComponent(router, _services, _dialog, _routerParams) {
        this.router = router;
        this._services = _services;
        this._dialog = _dialog;
        this._routerParams = _routerParams;
        this.fecha = new Date();
        //*************************************************************//
        this.training_data = {
            "contents": []
        };
        //************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        //*************************************************************//
        //FUNCION PARA CONSULTA DE CATALOGOS//
        this.ca_training_type = [];
        this.ca_training_group = [];
    }
    AddTrainingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getCatalogos();
        this.consultaPermisos();
        var id_ = this._routerParams.snapshot.params.id;
        ;
        this.id = id_;
        if (id_ != 0) {
            this._services.service_general_get('Training?key=' + id_).subscribe((function (data) {
                if (data.success) {
                    console.log(data.result);
                    _this.training_data = data.result;
                    if (localStorage.getItem('data_content') != null && localStorage.getItem('data_content') != undefined && localStorage.getItem('data_content') != '') {
                        var data_regitro = JSON.parse(localStorage.getItem('data_content'));
                        if (data_regitro.index) {
                            _this.training_data.contents[data_regitro.index] = data_regitro;
                            _this.simpleList = _this.training_data.contents;
                            localStorage.removeItem('data_content');
                        }
                        else {
                            data_regitro.training = _this.training_data.id;
                            data_regitro.order = _this.training_data.contents.length - 1;
                            _this.training_data.contents.push(data_regitro);
                            _this.simpleList = _this.training_data.contents;
                            localStorage.removeItem('data_content');
                        }
                        _this.updateDate();
                    }
                    else {
                        _this.simpleList = _this.training_data.contents;
                    }
                    if (_this.training_data.photo != null && _this.training_data.photo != '') {
                        document.getElementById('lead_client_avatar').setAttribute('src', _this._services.url_images + _this.training_data.photo);
                    }
                }
            }));
        }
        else {
            console.log("Nuevos registros");
            console.log(JSON.parse(localStorage.getItem('data_content')));
            var data_ = JSON.parse(localStorage.getItem('data_content'));
            if (data_ != undefined && data_ != null) {
                if (localStorage.getItem('training') != null && localStorage.getItem('training') != undefined) {
                    this.training_data = JSON.parse(localStorage.getItem('training'));
                    this.training_data.contents.push(data_);
                    this.simpleList = this.training_data.contents;
                }
                else {
                    this.training_data.contents.push(data_);
                    this.simpleList = this.training_data.contents;
                }
            }
            //this.insertData();
        }
    };
    AddTrainingComponent.prototype.consultaPermisos = function () {
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
    AddTrainingComponent.prototype.getCatalogos = function () {
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
    //*************************************************************//
    //FUNCION PARA AGREGAR CONTENIDO//
    AddTrainingComponent.prototype.addContent = function () {
        var _this = this;
        var dialogRef = this._dialog.open(add_content_component_1.AddContentComponent, {
            width: "20%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                localStorage.removeItem('content');
                localStorage.setItem('tipo_contenido', result.typeContent);
                localStorage.setItem('training', JSON.stringify(_this.training_data));
                _this.router.navigateByUrl('/addTraining/Content');
            }
        });
    };
    //*************************************************************//
    //FUNCION PARA EDITAR CONTENIDO//
    AddTrainingComponent.prototype.editContent = function (data, i) {
        data.index = i;
        console.log("contenido a editar: ", data);
        localStorage.setItem('content', JSON.stringify(data));
        this.router.navigateByUrl('/addTraining/Content');
    };
    //*************************************************************//
    //FUNCION PARA EDICION DE FOTOGRAFIA//
    AddTrainingComponent.prototype.img = function (event) {
        var _this = this;
        console.log(event);
        var file = event.target.files[0];
        var ext = event.target.files[0].type.split('/');
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader);
            var encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            _this.training_data.photo = encoded;
            _this.training_data.photoExtension = ext[1];
            document.getElementById('lead_client_avatar').setAttribute('src', '' + reader.result);
        };
    };
    //*************************************************************//
    AddTrainingComponent.prototype.removeItem = function (item, list) {
        list.splice(list.indexOf(item), 1);
    };
    //*************************************************************//
    AddTrainingComponent.prototype.save = function () {
        if (this.id == 0) {
            this.insertData();
        }
        else {
            this.updateDate();
        }
    };
    //*************************************************************//
    //FUNCION PARA INSERTAR REGISTRO//
    AddTrainingComponent.prototype.insertData = function () {
        var _this = this;
        console.log("entra a actualizar informacion");
        this.training_data.creationDate = new Date();
        this.training_data.updatedBy = this.userData.id;
        this.training_data.createdBy = this.userData.id;
        this.training_data.updatedDate = new Date();
        this._services.service_general_post_with_url('Training', this.training_data).subscribe((function (data) {
            if (data.success) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Training was saved"
                    },
                    width: "350px"
                });
                localStorage.removeItem('data_content');
                localStorage.removeItem('content');
                localStorage.removeItem('training');
                _this.router.navigateByUrl('/admin-trainig');
            }
        }));
    };
    //*************************************************************//
    //FUNCION PARA ACTUALIZAR REGISTRO//
    AddTrainingComponent.prototype.updateDate = function () {
        var _this = this;
        console.log("entra a actualizar informacion");
        this.training_data.updatedDate = new Date();
        this.training_data.updatedBy = this.userData.id;
        this._services.service_general_put('Training', this.training_data).subscribe((function (data) {
            if (data.success) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Training was Updated"
                    },
                    width: "350px"
                });
                localStorage.removeItem('data_content');
                localStorage.removeItem('content');
                localStorage.removeItem('training');
                _this.ngOnInit();
            }
        }));
    };
    //*************************************************************//
    //LIMPIEZA DE LOCALSTORAGE//
    AddTrainingComponent.prototype.ngOnDestroy = function () {
        console.log("ng on destroy");
        localStorage.removeItem('data_content');
        //localStorage.removeItem('content');
    };
    //*************************************************************//
    //FUNCION PARA REGRESAR//
    AddTrainingComponent.prototype.goBack = function () {
        window.history.back();
    };
    AddTrainingComponent = __decorate([
        core_1.Component({
            selector: 'app-add-training',
            templateUrl: './add-training.component.html',
            styleUrls: ['./add-training.component.scss']
        })
    ], AddTrainingComponent);
    return AddTrainingComponent;
}());
exports.AddTrainingComponent = AddTrainingComponent;
