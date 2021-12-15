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
exports.DialogAssignTask = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("../../../../app/shared/loader");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var dialog_documents_lead_client_component_1 = require("../dialog-documents-lead-client/dialog-documents-lead-client.component");
var DialogAssignTask = /** @class */ (function () {
    function DialogAssignTask(dialogRef, _services, _routerParams, preview_data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.preview_data = preview_data;
        this._dialog = _dialog;
        this.typeTo = {
            name: ''
        };
        this.typeAction = {
            actionType: ''
        };
        this.typeWork = {
            numberWorkOrder: ''
        };
        this.typeService = {
            serviceNumber: ''
        };
        this.typeC = {
            name: ''
        };
        this.__loader__ = new loader_1.LoaderComponent();
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.today_date = new Date();
        this.image_path = this._services.url_images;
        this.is_sr_detected = false;
        this.action_item_model = new ItemActionModel();
        this.show_create_errors = false;
        this.show_departament_section = false;
        this.show_service_section = false;
        this.wo_field_disabled = false;
        this.wo_catalogue = [];
        this.service_field_unable = false;
        this.service_catalogue = [];
        /***********************************************************************************/
        /***********************************************************************************/
        /***********************************************************************************/
        /********************** Funciones Generales ****************************************/
        /***********************************************************************************/
        /***********************************************************************************/
        /***********************************************************************************/
        this.userto_catalogue = [];
        this.actiontype_catalogue = [];
        this.statustask_catalogue = [];
        this.departament_catalogue = [];
        this.servicerecord_catalogue = [];
        this.collaborator_catalogue = [];
    }
    DialogAssignTask.prototype.ngOnInit = function () {
        this.getCatalogues();
        this.initPageBehavior();
    };
    DialogAssignTask.prototype.initPageBehavior = function () {
        this.action_item_model.taskFrom = "" + this.user_data.id;
        if (this.preview_data.id_so != undefined) {
            this.is_sr_detected = true;
            this.action_item_model.actionType = '1';
            this.action_item_model.serviceRecordId = this.preview_data.id_so;
            this.ableWOField();
            this.show_service_section = true;
        }
        if (this.preview_data.hasOwnProperty('service_line')) {
            this.action_item_model.serviceLineId = this.preview_data.service_line;
        }
    };
    DialogAssignTask.prototype.createNewActionItem = function () {
        var _this = this;
        console.log('Obj To send => ', this.action_item_model);
        if (this.actionItemFieldsValidator()) {
            this.beforeNewCreateTask();
            this.__loader__.showLoader();
            this._services.service_general_post_with_url('Task/CreateTask', this.action_item_model)
                .subscribe(function (response) {
                console.log('Res (Task/CreateTask) => ', response);
                if (response.success) {
                    _this.hideModal();
                    _this.showGeneralMessageDialog('Success', 'An Action Item has been created successfully,');
                    _this.dialogRef.close();
                }
                _this.__loader__.hideLoader();
            }, function (error) {
                console.error('Error (Task/CreateTask) => ', error);
                _this.__loader__.hideLoader();
            });
        }
    };
    DialogAssignTask.prototype.beforeNewCreateTask = function () {
        var colaborators_in = [];
        this.action_item_model.createdBy = this.user_data.id;
        this.action_item_model.createdDate = this.today_date;
        this.action_item_model.assignedDate = this.today_date;
        this.action_item_model.colaboratorMembers.forEach(function (colaborator) {
            var colaborator_model = new ColaboratorMembersModel();
            colaborator_model.colaborator = colaborator;
            colaborators_in.push(colaborator_model);
        });
        this.action_item_model.colaboratorMembers = colaborators_in;
    };
    DialogAssignTask.prototype.actionItemFieldsValidator = function () {
        var result = true;
        this.show_create_errors = true;
        if (this.action_item_model.actionTitle == '')
            result = false;
        if (this.action_item_model.taskDescription == '')
            result = false;
        if (this.action_item_model.to.length == 0)
            result = false;
        if (this.action_item_model.dueDate == '')
            result = false;
        if (this.action_item_model.actionType == '')
            result = false;
        if (this.action_item_model.actionType == '1') {
            if (this.action_item_model.serviceRecordId == '')
                result = false;
            if (this.action_item_model.workOrderId == '')
                result = false;
            if (this.action_item_model.serviceId == '')
                result = false;
            if (this.action_item_model.colaboratorMembers.length == 0)
                result = false;
        }
        else {
            if (this.action_item_model.department == '')
                result = false;
            if (this.action_item_model.colaboratorMembers.length == 0)
                result = false;
        }
        return result;
    };
    DialogAssignTask.prototype.addNewDocument = function () {
        var _this = this;
        var data = this.action_item_model;
        data.sr = this.action_item_model.serviceRecordId;
        data.typeDocument = 3;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var new_document = new ItemDocumentsModel();
            new_document.id = result.id;
            new_document.createdBy = _this.user_data.id;
            new_document.createdDate = _this.today_date;
            new_document.nameFile = result.fileName;
            new_document.fileRequest = result.fileRequest;
            new_document.fileExtension = result.fileExtension;
            new_document.comment = result.comment;
            if (new_document.nameFile != '' && new_document.nameFile != undefined &&
                new_document.fileRequest != '' && new_document.fileRequest != undefined &&
                new_document.fileExtension != '' && new_document.fileExtension != undefined) {
                _this.action_item_model.taskDocuments.push(new_document);
            }
        });
    };
    // add document office
    DialogAssignTask.prototype.AddDocumentOffice = function (data) {
        var _this = this;
        if (data == null) {
            data = { id: 0 };
        }
        var dialogRef = this._dialog.open(dialog_documents_lead_client_component_1.DialogDocumentsLeadClientComponent, {
            data: data, width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                var new_document = new ItemDocumentsModel();
                new_document.id = result.id;
                new_document.createdBy = _this.user_data.id;
                new_document.createdDate = _this.today_date;
                new_document.nameFile = result.fileName;
                new_document.fileRequest = result.fileRequest;
                new_document.fileExtension = result.fileExtension;
                new_document.comment = result.description;
                if (new_document.nameFile != '' && new_document.nameFile != undefined &&
                    new_document.fileRequest != '' && new_document.fileRequest != undefined &&
                    new_document.fileExtension != '' && new_document.fileExtension != undefined) {
                    _this.action_item_model.taskDocuments.push(new_document);
                }
            }
        });
    };
    DialogAssignTask.prototype.deleteItemActionDocument = function (index_document) {
        this.action_item_model.taskDocuments.splice(index_document, 1);
    };
    DialogAssignTask.prototype.actionTypeSelected = function () {
        if (this.action_item_model.actionType == '1') {
            this.show_departament_section = false;
            this.show_service_section = true;
        }
        else {
            this.show_departament_section = true;
            this.show_service_section = false;
        }
    };
    DialogAssignTask.prototype.ableWOField = function () {
        var _this = this;
        this.__loader__.showLoader();
        this._services.service_general_get("Catalogue/GetworkOrder/" + this.action_item_model.serviceRecordId)
            .subscribe(function (response) {
            _this.wo_catalogue = response.result.value;
            _this.__loader__.hideLoader();
            _this.wo_field_disabled = true;
        }, function (error) {
            console.error('Error (GetworkOrder) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogAssignTask.prototype.ableServiceField = function () {
        var _this = this;
        this.service_field_unable = true;
        console.log('Service ===> ', this.action_item_model.workOrderId);
        this.__loader__.showLoader();
        this._services.service_general_get("Catalogue/GetServiceByWorkOrder?wo=" + this.action_item_model.workOrderId)
            .subscribe(function (response) {
            console.log('Res ====> ', response);
            _this.service_catalogue = response.result.value;
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (GetServiceByWorkOrder) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogAssignTask.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetActionType')];
                    case 1:
                        _a.actiontype_catalogue = _g.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetEstatusTask')];
                    case 2:
                        _b.statustask_catalogue = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDepartment')];
                    case 3:
                        _c.departament_catalogue = _g.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetServiceRecord/" + this.user_data.id)];
                    case 4:
                        _d.servicerecord_catalogue = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetUserTo')];
                    case 5:
                        _e.userto_catalogue = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetUserTo')];
                    case 6:
                        _f.collaborator_catalogue = _g.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogAssignTask.prototype.showGeneralMessageDialog = function (title, body) {
        if (title === void 0) { title = "No title"; }
        if (body === void 0) { body = "No content"; }
        var dialogRef = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: title,
                body: body
            }
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    DialogAssignTask.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    DialogAssignTask = __decorate([
        core_1.Component({
            selector: 'assign-task-dialog',
            templateUrl: './assignTask.component.html',
            styleUrls: []
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogAssignTask);
    return DialogAssignTask;
}());
exports.DialogAssignTask = DialogAssignTask;
var ItemActionModel = /** @class */ (function () {
    function ItemActionModel() {
        this.id = 0;
        this.actionTitle = '';
        this.serviceRecordId = null;
        this.workOrderId = null;
        this.taskFrom = '';
        this.taskTo = '0';
        this.to = [];
        this.statusId = '1';
        this.assignedDate = undefined;
        this.dueDate = '';
        this.completedDate = '';
        this.serviceId = null;
        this.serviceLineId = null;
        this.comments = '';
        this.taskDescription = '';
        this.overdueTask = true;
        this.department = '';
        this.actionType = '';
        this.urgent = false;
        this.createdBy = '';
        this.createdDate = undefined;
        this.updateBy = '';
        this.taskDocuments = [];
        this.colaboratorMembers = [];
    }
    return ItemActionModel;
}());
var ItemDocumentsModel = /** @class */ (function () {
    function ItemDocumentsModel() {
        this.id = 0;
        this.fileRequest = '';
        this.nameFile = '';
        this.comment = '';
        this.taskId = '0';
        this.createdDate = undefined;
        this.createdBy = '';
        this.fileExtension = '';
    }
    return ItemDocumentsModel;
}());
var ColaboratorMembersModel = /** @class */ (function () {
    function ColaboratorMembersModel() {
        this.task = '0';
        this.colaborator = '';
    }
    return ColaboratorMembersModel;
}());
