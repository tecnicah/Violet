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
exports.AddGroupComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("app/pages-component/dialog/general-message/general-message.component");
var AddGroupComponent = /** @class */ (function () {
    function AddGroupComponent(_services, _dialog, dialogRef, data) {
        this._services = _services;
        this._dialog = _dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.training_data = {};
    }
    AddGroupComponent.prototype.ngOnInit = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        console.log(this.data);
    };
    //*********************************************//
    AddGroupComponent.prototype.save = function () {
        var _this = this;
        this.training_data.id = 0;
        this.training_data.createdBy = this.userData.id;
        this.training_data.createdDate = new Date();
        this.training_data.updatedBy = this.userData.id;
        this.training_data.updatedDate = new Date();
        console.log(this.training_data);
        this._services.service_general_post_with_url('Training/AddGroup', this.training_data).subscribe(function (response) {
            if (response.success) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Group Added"
                    },
                    width: "350px"
                });
                _this.dialogRef.close();
            }
        });
    };
    AddGroupComponent = __decorate([
        core_1.Component({
            selector: 'app-add-group',
            templateUrl: './add-group.component.html',
            styleUrls: ['./add-group.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddGroupComponent);
    return AddGroupComponent;
}());
exports.AddGroupComponent = AddGroupComponent;
