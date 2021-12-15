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
exports.DialogViewEscalation = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var escalationLevel_component_1 = require("../escalation-levels/escalationLevel.component");
var loader_1 = require("../../../../app/shared/loader");
var DialogViewEscalation = /** @class */ (function () {
    function DialogViewEscalation(dialogRef, _services, _routerParams, pre_esc_data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.pre_esc_data = pre_esc_data;
        this._dialog = _dialog;
        this.image_path = this._services.url_images;
        this.today_date = new Date();
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.__loader__ = new loader_1.LoaderComponent();
        this.escalation_data = new EscalationModel();
        this.comment_string = new SingleComment();
    }
    DialogViewEscalation.prototype.ngOnInit = function () { this.initPageBehavoir(); };
    DialogViewEscalation.prototype.initPageBehavoir = function () {
        console.log(this.pre_esc_data);
        this.requestEscalationData();
    };
    DialogViewEscalation.prototype.requestEscalationData = function () {
        var _this = this;
        this._services.service_general_get("Scalate/GetEscalationCommunicationById?id=" + this.pre_esc_data.escalation.id)
            .subscribe(function (response) {
            if (response.success) {
                _this.getCatalogues();
                _this.escalation_data = response.result.value[0];
                console.log('this.escalation_data ===> ', _this.escalation_data);
            }
        }, function (error) {
            console.error('Error (GetEscalationCommunicationById) => ', error);
        });
    };
    DialogViewEscalation.prototype.updateEscalationData = function () {
        var _this = this;
        if (!this.escalation_data.status) {
            this.escalation_data.closedDate = new Date();
        }
        console.log('Sent this ===> ', this.escalation_data);
        this.__loader__.showLoader();
        this._services.service_general_put('Scalate/PutScalate', this.escalation_data)
            .subscribe(function (response) {
            console.log('Res ====> ', response);
            if (response.success) {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Escalate updated",
                        body: "Escalate has been updated successfully."
                    }
                });
                _this.initPageBehavoir();
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (PutScalate) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogViewEscalation.prototype.addNewComment = function () {
        var _this = this;
        var new_comment = new ScalateCommentsModel();
        new_comment.comments = this.comment_string.comment;
        new_comment.createdDate = this.today_date;
        new_comment.date = this.today_date;
        new_comment.scalateServiceId = this.escalation_data.id;
        new_comment.userFromId = this.user_data.id;
        new_comment.userToId = this.escalation_data.userToId;
        if (new_comment.comments.length != 0) {
            this.__loader__.showLoader();
            this._services.service_general_post_with_url('Scalate/PostComment', new_comment)
                .subscribe(function (response) {
                if (response.success) {
                    _this.initPageBehavoir();
                }
                _this.__loader__.hideLoader();
            }, function (error) {
                console.error('Error (PostComment) => ', error);
                _this.__loader__.hideLoader();
            });
            this.comment_string.comment = '';
        }
    };
    DialogViewEscalation.prototype.addNewDocument = function (event_data) {
        var new_document = new ScalateDocumentsModel(), file_root = event_data.files[0], file_reader = new FileReader();
        new_document.createdDate = this.today_date;
        new_document.scalateServiceId = this.escalation_data.id;
        new_document.createdBy = this.user_data.id;
        new_document.local = true;
        file_reader.onload = function () {
            var base64 = file_reader.result;
            new_document.fileRequest = base64.split(',')[1];
            new_document.fileName = file_root.name;
            new_document.fileExtension = file_root.name.split('.')[file_root.name.split('.').length - 1];
        };
        file_reader.readAsDataURL(file_root);
        this.escalation_data.scalateDocuments.push(new_document);
    };
    DialogViewEscalation.prototype.deleteDocument = function (document, index) {
        var _this = this;
        if (document.local) {
            this.escalation_data.scalateDocuments.splice(index, 1);
        }
        else {
            this.__loader__.showLoader();
            this._services.service_general_delete("Scalate/DeleteDocument?docId=" + document.id)
                .subscribe(function (response) {
                if (response.success) {
                    _this.__loader__.hideLoader();
                }
            }, function (error) {
                console.error('Error (DeleteDocument) => ', error);
                _this.__loader__.hideLoader();
            });
        }
    };
    /* Utilities */
    DialogViewEscalation.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DialogViewEscalation.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    DialogViewEscalation.prototype.showEscalationLevels = function () {
        var add_call_dialog = this._dialog.open(escalationLevel_component_1.DialogEscalationLevels, {
            data: {},
            width: "95%"
        });
        add_call_dialog.afterClosed().subscribe(function (result) {
        });
    };
    DialogViewEscalation = __decorate([
        core_1.Component({
            selector: 'view-escalation-dialog',
            templateUrl: './viewEscalation.component.html',
            styleUrls: []
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogViewEscalation);
    return DialogViewEscalation;
}());
exports.DialogViewEscalation = DialogViewEscalation;
var EscalationModel = /** @class */ (function () {
    function EscalationModel() {
        this.id = 0;
        this.userToId = 0;
        this.to = '';
        this.userFromId = 0;
        this.userFrom = '';
        this.status = false;
        this.escalationLevel = '';
        this.workOrderId = '';
        this.serviceId = 0;
        this.serviceLineId = 0;
        this.serviceLine = '';
        this.escalation = '';
        this.serviceRecordId = 0;
        this.createdDate = undefined;
        this.closedDate = undefined;
        this.numberWorkOrder = '';
        this.scalateComments = [];
        this.scalateDocuments = [];
    }
    return EscalationModel;
}());
var ScalateCommentsModel = /** @class */ (function () {
    function ScalateCommentsModel() {
        this.id = 0;
        this.comments = '';
        this.scalateServiceId = 0;
        this.date = undefined;
        this.userFromId = 0;
        this.userToId = 0;
        this.createdDate = undefined;
        this.name_user = '';
        this.avatar_user = '';
        this.tittle_user = '';
    }
    return ScalateCommentsModel;
}());
var ScalateDocumentsModel = /** @class */ (function () {
    function ScalateDocumentsModel() {
        this.id = 0;
        this.fileName = '';
        this.fileRequest = undefined;
        this.fileExtension = '';
        this.createdDate = undefined;
        this.updatedDate = new Date();
        this.updatedBy = 0;
        this.createdBy = 0;
        this.scalateServiceId = 0;
        this.local = false;
    }
    return ScalateDocumentsModel;
}());
var SingleComment = /** @class */ (function () {
    function SingleComment() {
        this.comment = '';
    }
    return SingleComment;
}());
