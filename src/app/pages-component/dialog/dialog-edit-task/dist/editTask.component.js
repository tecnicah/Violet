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
exports.DialogEditTask = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("../../../../app/shared/loader");
var dialog_documents_component_1 = require("../dialog-documents/dialog-documents.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var dialog_documents_lead_client_component_1 = require("../dialog-documents-lead-client/dialog-documents-lead-client.component");
var DialogEditTask = /** @class */ (function () {
    function DialogEditTask(dialogRef, _services, _routerParams, preview_data, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.preview_data = preview_data;
        this._dialog = _dialog;
        this.__loader__ = new loader_1.LoaderComponent();
        this.user_data = JSON.parse(localStorage.getItem('userData'));
        this.today_date = new Date();
        this.image_path = this._services.url_images;
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        this.action_item_data = new ActionItemModel();
        this.show_departament_section = false;
        this.show_sr_section = false;
        this.name_section_active = '';
        this.reply_model = new ReplyItemActionModel();
        /***********************************************************************************/
        /***********************************************************************************/
        /***********************************************************************************/
        /********************** Funciones Generales ****************************************/
        /***********************************************************************************/
        /***********************************************************************************/
        /***********************************************************************************/
        this.statustask_catalogue = [];
    }
    DialogEditTask.prototype.consultaPermisos = function () {
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
    DialogEditTask.prototype.ngOnInit = function () {
        this.consultaPermisos();
        this.initPageApp();
    };
    DialogEditTask.prototype.initPageApp = function () {
        this.getCatalogues();
        this.getActionItemDataByRequest();
    };
    DialogEditTask.prototype.getActionItemDataByRequest = function () {
        var _this = this;
        console.log('preview_data ===> ', this.preview_data);
        this.__loader__.showLoader();
        this._services.service_general_get("Task/GetTaskById?Id=" + this.preview_data.id)
            .subscribe(function (response) {
            if (response.success) {
                console.log('Iteraciones ===> ', response);
                _this.action_item_data = response.result;
                console.log('this.action_item_data ===> ', _this.action_item_data);
                _this.documentsConfiguration();
                if (_this.action_item_data.actionType == 1) {
                    _this.show_departament_section = false;
                    _this.show_sr_section = true;
                    _this.name_section_active = 'Service Record';
                }
                else if (_this.action_item_data.actionType == 2) {
                    _this.show_departament_section = true;
                    _this.show_sr_section = false;
                    _this.name_section_active = 'Departament';
                }
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (GetTaskById) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogEditTask.prototype.documentsConfiguration = function () {
        this.action_item_data.taskDocuments.forEach(function (document) {
            document.local = false;
        });
    };
    DialogEditTask.prototype.addNewReply = function () {
        if (this.reply_model.reply.length != 0) {
            this.reply_model.createdDate = new Date();
            this.reply_model.taskId = this.action_item_data.id;
            this.reply_model.user_name = this.user_data.name + " " + this.user_data.lastName;
            this.reply_model.avatar = this.user_data.avatar;
            this.reply_model.createdBy = this.user_data.id;
            this.action_item_data.taskReplies.push(this.reply_model);
            this.reply_model = new ReplyItemActionModel();
        }
    };
    DialogEditTask.prototype.AddDocumentOffice = function (data) {
        var _this = this;
        data = { id: 0 };
        // this.action_item_data.sr = this.action_item_data.serviceRecordId;
        var dialogRef = this._dialog.open(dialog_documents_lead_client_component_1.DialogDocumentsLeadClientComponent, {
            width: "95%",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                var new_document = new ItemDocumentsModel();
                // new_document.taskId = this.action_item_data.id;
                new_document.id = 0;
                new_document.createdBy = _this.user_data.id;
                new_document.createdDate = _this.today_date;
                new_document.nameFile = result.fileName;
                new_document.fileRequest = result.fileRequest;
                new_document.fileExtension = result.fileExtension;
                new_document.comment = result.description;
                if (new_document.nameFile != '' && new_document.nameFile != undefined &&
                    new_document.fileRequest != '' && new_document.fileRequest != undefined &&
                    new_document.fileExtension != '' && new_document.fileExtension != undefined) {
                    _this.action_item_data.taskDocuments.push(new_document);
                }
            }
        });
    };
    DialogEditTask.prototype.addNewDocument = function () {
        var _this = this;
        this.action_item_data.sr = this.action_item_data.serviceRecordId;
        var dialogRef = this._dialog.open(dialog_documents_component_1.DialogDocumentsComponent, {
            width: "95%",
            data: this.action_item_data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var new_document = new ItemDocumentsModel();
            new_document.taskId = _this.action_item_data.id;
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
                _this.action_item_data.taskDocuments.push(new_document);
            }
        });
    };
    DialogEditTask.prototype.updateActionItemRequest = function () {
        var _this = this;
        this.__loader__.showLoader();
        var documentos = this.action_item_data.taskDocuments;
        this.action_item_data.taskDocuments = [];
        for (var i = 0; i < documentos.length; i++) {
            if (documentos[i].id == 0 || documentos[i].id == undefined) {
                this.action_item_data.taskDocuments.push(documentos[i]);
            }
        }
        console.log('Data update sent ===> ', this.action_item_data);
        console.log('Data update sent ===> ', JSON.stringify(this.action_item_data));
        this._services.service_general_put('Task/UpdateTask', this.action_item_data).subscribe(function (response) {
            console.log('Res ======> ', response);
            if (response.success) {
                _this.showGeneralMessageDialog('Success', 'Action item has been updated successfully');
                _this.dialogRef.close();
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (UpdateTask) =>', error);
            _this.__loader__.hideLoader();
            _this.dialogRef.close();
        });
    };
    DialogEditTask.prototype.deleteDocument = function (document_in, index) {
        var _this = this;
        console.log('document_in ===> ', document_in);
        console.log('==========> ', index);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            width: "420px",
            data: {
                header: 'Delete Document',
                body: 'Are you sure to delete this document?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                if (document_in.local) {
                    _this.action_item_data.taskDocuments.splice(index, 1);
                }
                else {
                    _this.__loader__.showLoader();
                    _this._services.service_general_get("Task/DeleteDocumentTask?id=" + document_in.id)
                        .subscribe(function (response) {
                        if (response.success) {
                            _this.showGeneralMessageDialog('Document deleted', 'Document has beeen successfully deleted.');
                        }
                        _this.__loader__.hideLoader();
                    }, function (error) {
                        console.error('Error (DeleteDocumentTask) => ', error);
                        _this.__loader__.hideLoader();
                    });
                    _this.action_item_data.taskDocuments.splice(index, 1);
                }
            }
        });
    };
    DialogEditTask.prototype.getCollaborators = function (people_in) {
        var collaborators = [], collaborators_names = '';
        if (people_in.length != 0) {
            people_in.forEach(function (person) {
                collaborators.push(person.colaboratorNavigation.name + " " + person.colaboratorNavigation.lastName);
            });
        }
        collaborators_names = collaborators.join(', ');
        return collaborators_names;
    };
    DialogEditTask.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetEstatusTask')];
                    case 1:
                        _a.statustask_catalogue = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogEditTask.prototype.showGeneralMessageDialog = function (title, body) {
        var _this = this;
        if (title === void 0) { title = "No title"; }
        if (body === void 0) { body = "No content"; }
        var dialogRef = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: title,
                body: body
            },
            width: '420px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.initPageApp();
        });
    };
    DialogEditTask.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    //FUNCION PARA VER DOCUMENTO//
    DialogEditTask.prototype.showDocumentDialogDetails = function (item) {
        console.log(item);
        var server_url = this._services.url_images + item.fileRequest;
        window.open(server_url);
    };
    DialogEditTask = __decorate([
        core_1.Component({
            selector: 'edit-task-dialog',
            templateUrl: './editTask.component.html',
            styleUrls: []
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogEditTask);
    return DialogEditTask;
}());
exports.DialogEditTask = DialogEditTask;
var ActionItemModel = /** @class */ (function () {
    function ActionItemModel() {
        this.id = 0;
        this.actionTitle = '';
        this.actionType = 0;
        this.serviceRecordId = 0;
        this.taskFromName = '';
        this.taskFrom = 0;
        this.taskToName = '';
        this.taskTo = 0;
        this.status = '';
        this.statusId = '';
        this.assignedDate = '';
        this.dueDate = '';
        this.completedDate = '';
        this.serviceId = null;
        this.standalone = null;
        this.bundled = null;
        this.serviceLineId = null;
        this.serviceLine = null;
        this.comments = '';
        this.taskDescription = '';
        this.user_name_comment = '';
        this.tittle_comment = '';
        this.taskReplies = [];
        this.taskDocuments = [];
        this.colaboratorMembers = [];
        this.overdueTask = false;
    }
    return ActionItemModel;
}());
var Collaborator = /** @class */ (function () {
    function Collaborator() {
        this.colaboratorNavigation = {};
    }
    return Collaborator;
}());
var ReplyItemActionModel = /** @class */ (function () {
    function ReplyItemActionModel() {
        this.user_name = '';
        this.tittle = '';
        this.id = 0;
        this.taskId = 0;
        this.reply = '';
        this.avatar = '';
        this.createdDate = new Date();
        this.createdBy = 0;
        this.createdByNavigation = {};
    }
    return ReplyItemActionModel;
}());
var ItemDocumentsModel = /** @class */ (function () {
    function ItemDocumentsModel() {
        this.id = 0;
        this.fileRequest = '';
        this.nameFile = '';
        this.comment = '';
        this.taskId = 0;
        this.createdDate = undefined;
        this.createdBy = '';
        this.fileExtension = '';
        this.local = true;
    }
    return ItemDocumentsModel;
}());
