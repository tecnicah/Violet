"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContentComponent = void 0;
var core_1 = require("@angular/core");
var add_element_component_1 = require("../../dialog/add-element/add-element.component");
var general_confirmation_component_1 = require("app/pages-component/dialog/general-confirmation/general-confirmation.component");
var ContentComponent = /** @class */ (function () {
    function ContentComponent(_sanitizer, sanitizeHtml, router, _services, _dialog, _routerParams) {
        this._sanitizer = _sanitizer;
        this.sanitizeHtml = sanitizeHtml;
        this.router = router;
        this._services = _services;
        this._dialog = _dialog;
        this._routerParams = _routerParams;
        this.html_renderizar = [];
        this.data_content = {};
        //************************************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    ContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaPermisos();
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.data_content = JSON.parse(localStorage.getItem('content'));
        if (this.data_content == null) {
            this.data_content = {
                "id": 0,
                "training": 0,
                "title": "",
                "type": Number(localStorage.getItem('tipo_contenido')),
                "order": 0,
                "createdBy": this.userData.id,
                "createdDate": new Date(),
                "updatedBy": this.userData.id,
                "updatedDate": new Date(),
                "evaluations": [],
                "themes": []
            };
        }
        else {
            localStorage.setItem('tipo_contenido', this.data_content.type);
            setTimeout(function () {
                for (var i = 0; i < _this.data_content.themes.length; i++) {
                    if (_this.data_content.themes[i].element == 5) {
                        if (_this.data_content.themes[i].files.length > 0 && _this.data_content.themes[i].id != 0) {
                            _this.data_content.themes[i].image = _this._sanitizer.bypassSecurityTrustUrl(_this._services.url_images + _this.data_content.themes[i].files[0].path);
                            var id = 'lead_client_avatar' + i;
                            console.log(id);
                            console.log(document.getElementById(id));
                            document.getElementById('' + id).setAttribute('src', _this.data_content.themes[i].image.changingThisBreaksApplicationSecurity);
                        }
                    }
                }
            }, 2000);
        }
        console.log(this.data_content);
    };
    ContentComponent.prototype.consultaPermisos = function () {
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
    //*************************************************************//
    ContentComponent.prototype.addElement = function () {
        var _this = this;
        var dialogRef = this._dialog.open(add_element_component_1.AddElementComponent, {
            width: "40%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                console.log(result);
                if (Number(localStorage.getItem('tipo_contenido')) == 1) {
                    _this.insertNewElement(result.id);
                }
                else {
                    _this.insertNewElementEvaluation(result.id);
                }
            }
        });
    };
    //*************************************************************//
    //FUNCIONA PARA INSERTAR ELEMENTOS DE LA EVALUACION //
    ContentComponent.prototype.insertNewElementEvaluation = function (id) {
        this.data_content.evaluations.push({
            "id": 0,
            "content": this.data_content.id,
            "element": id,
            "text": "",
            "question": "",
            "required": false,
            "order": 0,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "updatedBy": this.userData.id,
            "updatedDate": new Date(),
            "answers": []
        });
        for (var i = 0; i < this.data_content.themes.length; i++) {
            this.data_content.themes[i].order = i;
        }
    };
    //*************************************************************//
    //FUNCIONA PARA INSERTAR ELEMENTOS DEL TEMA //
    ContentComponent.prototype.insertNewElement = function (id) {
        this.data_content.themes.push({
            "content": this.data_content.id,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "element": id,
            "files": [],
            "id": 0,
            "order": 0,
            "text": "",
            "updatedBy": this.userData.id,
            "updatedDate": new Date(),
            "url": ""
        });
        for (var i = 0; i < this.data_content.themes.length; i++) {
            this.data_content.themes[i].order = i;
        }
    };
    //*************************************************************//
    //FUNCION PARA AGREGAR OPCIONES//
    ContentComponent.prototype.addOption = function (i) {
        this.data_content.evaluations[i].answers.push({
            "id": 0,
            "evaluation": this.data_content.evaluations.id,
            "answer1": "",
            "correct": false,
            "order": 0,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "updatedBy": this.userData.id,
            "updatedDate": new Date()
        });
    };
    //*************************************************************//
    //FUNCION PARA PONER EN TRUE LA RESPUEST CORRECTA//
    ContentComponent.prototype.changeTrue = function (item, o, i, e) {
        console.log(e);
        for (var k = 0; k < this.data_content.evaluations[i].answers.length; k++) {
            this.data_content.evaluations[i].answers[k] = false;
        }
        this.data_content.evaluations[i].answers[o].correct = true;
        this.data_content.evaluations[i].answers[o].correctid = item.id;
    };
    //*************************************************************//
    //FUNCION PARA ELIMINAR SECCION THEME//
    ContentComponent.prototype.deleteSection = function (item, i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this section?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_content.themes.splice(i, 1);
            }
        });
    };
    //*************************************************************//
    //FUNCION PARA ELIMINAR SECCION EVALUATION//
    ContentComponent.prototype.deleteSectionE = function (item, i) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this section?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.data_content.evaluations.splice(i, 1);
            }
        });
    };
    //*
    //*************************************************************//
    ContentComponent.prototype.takephoto = function (i) {
        document.getElementById('file' + i).click();
    };
    //*************************************************************//
    //FUNCION PARA EDICION DE FOTOGRAFIA//
    ContentComponent.prototype.img = function (event, i) {
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
            //this.training_data.photo = encoded;
            //this.training_data.photoExtension = ext[1];
            _this.data_content.themes[i].files = [];
            _this.data_content.themes[i].files.push({
                "createdBy": _this.userData.id,
                "createdDate": new Date(),
                "fileExtension": ext[1],
                "fileName": "Document",
                "id": 0,
                "path": encoded,
                "theme": _this.data_content.id,
                "updatedBy": _this.userData.id,
                "updatedDate": new Date()
            });
            document.getElementById('lead_client_avatar' + i).setAttribute('src', '' + reader.result);
        };
    };
    //*************************************************************//
    ContentComponent.prototype.removeItem = function (item, list) {
        list.splice(list.indexOf(item), 1);
    };
    //*************************************************************//
    //FUNCION PARA GUARDAR//
    ContentComponent.prototype.save = function () {
        console.log("info a guardar para theme: ", this.data_content);
        window.history.back();
        localStorage.setItem('data_content', JSON.stringify(this.data_content));
    };
    //*************************************************************//
    ContentComponent.prototype.preview = function () {
        console.log("info a guardar para theme: ", this.data_content);
        localStorage.setItem('data_content', JSON.stringify(this.data_content));
        this.router.navigateByUrl('/PreviewComponent');
    };
    //*************************************************************//
    //FUNCION PARA REGRESAR//
    ContentComponent.prototype.goBack = function () {
        window.history.back();
    };
    ContentComponent = __decorate([
        core_1.Component({
            selector: 'app-content',
            templateUrl: './content.component.html',
            styleUrls: ['./content.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], ContentComponent);
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;
