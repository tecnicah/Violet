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
exports.AddParticipanteComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var general_message_component_1 = require("app/pages-component/dialog/general-message/general-message.component");
var AddParticipanteComponent = /** @class */ (function () {
    function AddParticipanteComponent(_services, _dialog, dialogRef, data) {
        this._services = _services;
        this._dialog = _dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.filterC = { name: '' };
        //*********************************************//
        this.ca_user = [];
        //*********************************************//
        this.usuarios = [];
        this.toppings = new forms_1.FormControl();
    }
    AddParticipanteComponent.prototype.ngOnInit = function () {
        console.log(this.data);
        this.getContactos();
    };
    AddParticipanteComponent.prototype.getContactos = function () {
        var _this = this;
        this._services.service_general_get('Training/ParticipantList').subscribe(function (response) {
            // if(response.success){
            _this.ca_user = response.result.value;
            console.log(_this.ca_user);
            // }
        });
    };
    AddParticipanteComponent.prototype.save = function () {
        var _this = this;
        console.log(this.data_usuarios);
        this._services.service_general_post_with_url('Training/AddParticipants?training=' + this.data.id + '&groups=' + this.data.groupId, this.data_usuarios).subscribe(function (response) {
            if (response.success) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Users Added"
                    },
                    width: "350px"
                });
                _this.dialogRef.close();
            }
        });
    };
    AddParticipanteComponent = __decorate([
        core_1.Component({
            selector: 'app-add-participante',
            templateUrl: './add-participante.component.html',
            styleUrls: ['./add-participante.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddParticipanteComponent);
    return AddParticipanteComponent;
}());
exports.AddParticipanteComponent = AddParticipanteComponent;
