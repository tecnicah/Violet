"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrainingCursoComponent = void 0;
var core_1 = require("@angular/core");
var general_message_component_1 = require("app/pages-component/dialog/general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var TrainingCursoComponent = /** @class */ (function () {
    function TrainingCursoComponent(_sanitizer, router, _services, _dialog, _routerParams) {
        this._sanitizer = _sanitizer;
        this.router = router;
        this._services = _services;
        this._dialog = _dialog;
        this._routerParams = _routerParams;
        this.section = [];
        this.__loader__ = new loader_1.LoaderComponent();
        this.show_theme = false;
        this.show_evaluation = false;
        this.posicion = 0;
        //**************************************************************************************//
        this.respuestas = [];
        this.radio = [];
    }
    //**************************************************************************************//
    //FUNCION DE CONSULTA DE INFORMACION DEL CURSO O EVALUACION/
    TrainingCursoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.userData = JSON.parse(localStorage.getItem('userData'));
        var id_ = this._routerParams.snapshot.params.id;
        this._services.service_general_get('Training/' + id_ + '/MyTraining').subscribe((function (data) {
            if (data.success) {
                console.log(data.result.value);
                _this.training = data.result.value;
                _this.trainingId = _this.training.training.id;
                _this.section = _this.training.training.contents;
                console.log(_this.training);
                _this.__loader__.hideLoader();
            }
        }));
    };
    TrainingCursoComponent.prototype.obtenerRespuesta = function (item) {
        console.log(item);
        var valor = this.elementView.nativeElement.value;
        console.log(valor);
        //this.respuestas_guardar(item, respuesta)
        ;
    };
    //**************************************************************************************//
    //FUNCION PARA CONTINUAR O EMPEZAR EVALUACION//
    TrainingCursoComponent.prototype.continuar = function () {
        var pos = this.posicion + 1;
        this.active = pos;
        this.contenido(this.section[pos], pos);
    };
    TrainingCursoComponent.prototype.contenido = function (item, i) {
        console.log(item);
        this.posicion = i;
        this.contenido_seccion = item;
        if (item.type == 1) {
            this.show_theme = true;
            this.show_evaluation = false;
            for (var i_1 = 0; i_1 < item.themes.length; i_1++) {
                if (item.themes[i_1].element == 5) {
                    if (item.themes[i_1].files.length > 0) {
                        item.themes[i_1].image = this._sanitizer.bypassSecurityTrustUrl(this._services.url_images + item.themes[i_1].files[0].path);
                    }
                }
            }
            this.renderizarHTML = item.themes;
        }
        else {
            this.show_theme = false;
            this.show_evaluation = true;
            this.renderizarHTML = item.evaluations;
        }
        this.active = i;
    };
    //**************************************************************************************//
    //FUNCION PARA MOSTRAR VIDEO//
    TrainingCursoComponent.prototype.getVideoIframe = function (url) {
        var video, results;
        if (url === null) {
            return '';
        }
        results = url.match('[\\?&]v=([^&#]*)');
        video = (results === null) ? url : results[1];
        return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
    };
    //**************************************************************************************//
    //FUNCION PARA REGRESAR//
    TrainingCursoComponent.prototype.goBack = function () {
        window.history.back();
    };
    //**************************************************************************************//
    //FUNCION PARA DOCUMENTO//
    TrainingCursoComponent.prototype.viewDocument = function (item) {
        console.log(item);
        var server_url = this._services.url_images + item.files[0].path;
        ;
        window.open(server_url);
    };
    TrainingCursoComponent.prototype.respuestas_guardar = function (pregunta, respuesta) {
        console.log(pregunta);
        console.log(respuesta);
        var contador = 0;
        for (var i = 0; i < this.respuestas.length; i++) {
            if (this.respuestas[i].question == pregunta.id) {
                this.respuestas[i].answer = respuesta.id;
            }
            else {
                contador++;
            }
        }
        if (contador == this.respuestas.length) {
            this.respuestas.push({
                "id": 0,
                "participantContent": 0,
                "question": pregunta.id,
                "answer": respuesta.id,
                "correct": respuesta.correct,
                "createdBy": this.userData.id,
                "createdDate": new Date(),
                "updatedBy": this.userData.id,
                "updatedDate": new Date()
            });
        }
        console.log(this.respuestas);
    };
    //**************************************************************************************//
    //FUNCION PARA GUARDAR TEST COMPLETO//
    TrainingCursoComponent.prototype.save = function () {
        var _this = this;
        var data = {
            "id": 0,
            "participant": this.training.training.participants[0].id,
            "content": this.contenido_seccion.id,
            "complete": true,
            "score": 0,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "updatedBy": this.userData.id,
            "updatedDate": new Date(),
            "participantEvaluations": this.respuestas
        };
        console.log(JSON.stringify(data));
        console.log(data);
        this._services.service_general_post_with_url('Training/' + this.trainingId + '/CompleteContent', data).subscribe((function (data) {
            console.log("save", data);
            if (data.success) {
                console.log(data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Save Data"
                    },
                    width: "350px"
                });
                _this.router.navigateByUrl('/trainingFinish/' + data.result.score);
            }
        }));
    };
    //**************************************************************************************//
    //FUNCION PARA GUARDAR TEST COMPLETO//
    TrainingCursoComponent.prototype.save_incomplete = function () {
        var _this = this;
        var data = {
            "id": 0,
            "participant": this.training.training.participants[0].id,
            "content": this.contenido_seccion.id,
            "complete": false,
            "score": 0,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "updatedBy": this.userData.id,
            "updatedDate": new Date(),
            "participantEvaluations": this.respuestas
        };
        console.log();
        this._services.service_general_post_with_url('Training/' + this.trainingId + '/CompleteContent', data).subscribe((function (data) {
            console.log("save", data);
            if (data.success) {
                console.log(data);
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Save Data"
                    },
                    width: "350px"
                });
            }
        }));
    };
    __decorate([
        core_1.ViewChild("myimg")
    ], TrainingCursoComponent.prototype, "elementView");
    TrainingCursoComponent = __decorate([
        core_1.Component({
            selector: 'app-training-curso',
            templateUrl: './training-curso.component.html',
            styleUrls: ['./training-curso.component.scss']
        })
    ], TrainingCursoComponent);
    return TrainingCursoComponent;
}());
exports.TrainingCursoComponent = TrainingCursoComponent;
