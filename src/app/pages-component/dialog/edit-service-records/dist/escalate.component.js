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
exports.DialogEscalateComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var general_message_component_1 = require("../../dialog/general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var escalationLevel_component_1 = require("../escalation-levels/escalationLevel.component");
var forms_1 = require("@angular/forms");
var DialogEscalateComponent = /** @class */ (function () {
    function DialogEscalateComponent(dialogRef, data_from_esr, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data_from_esr = data_from_esr;
        this._services = _services;
        this._dialog = _dialog;
        this.typeFilter = {
            numberWorkOrder: ''
        };
        this.toppings = new forms_1.FormControl();
        this.typeService = {
            category: ''
        };
        this.typeTo = {
            name: ''
        };
        this.typeLine = {
            serviceLine: ''
        };
        this.toppings_ = new forms_1.FormControl();
        this.loader = new loader_1.LoaderComponent();
        this.user_log_name = this.data_from_esr.user_log_name;
        this.image_path = this._services.url_images;
        this.today_date = new Date();
        this.user = JSON.parse(localStorage.getItem("userData"));
        this.userto_catalogue = [];
        this.service_catalogue = [];
        this.serviceline_catalogue = [];
        this.is_it_newone = false;
        this.escalation_model = new EscalationModel();
        this.new_comment = new CommentModel();
        this.no_first_comment = false;
        this.esc_form_validator = {
            no_fron: false,
            no_leve: false,
            no_serv: false,
            no_lser: false,
            no_come: false
        };
        this.services_catalogue = [];
        this.workorders_catalogue = [];
        this.now_can_see_services = false;
        this.new_document = new DocumentEscalation();
        /* AAAAAAAAAAAARRRRRRRTTTTTUUUUUU */
        this.files = [];
    }
    DialogEscalateComponent.prototype.ngOnInit = function () {
        console.log(this.user);
        this.escalation_model = new EscalationModel;
        this.escalation_model.createdDate = new Date();
        this.requestScalateStatus();
        this.getCatalogues();
    };
    DialogEscalateComponent.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, userto_catalogueC, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        params = "?user=" + this.data_from_esr.id_user;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetUserTo', params)];
                    case 1:
                        userto_catalogueC = _c.sent();
                        this.userto_catalogue = userto_catalogueC.value;
                        console.log(this.userto_catalogue);
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetService')];
                    case 2:
                        _a.service_catalogue = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 3:
                        _b.serviceline_catalogue = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogEscalateComponent.prototype.showEscalationLevels = function () {
        var add_call_dialog = this._dialog.open(escalationLevel_component_1.DialogEscalationLevels, {
            data: {},
            width: "95%"
        });
    };
    DialogEscalateComponent.prototype.requestScalateStatus = function () {
        /*this._services.service_general_get(`Scalate/GetScalate?srId=${ this.data_from_esr.id_sr }&user=${ this.data_from_esr.id_user }`)
            .subscribe( (response:any) => {

                if( response.success ) {

                    if( response.result == null ) {

                        this.is_it_newone = true;
                        this.escalation_model.createdDate = this.getTodayDay();

                    } else {

                        this.is_it_newone = false;
                        this.escalation_model = response.result;
                        this.escalation_model.createdDate = this.dateWorker( this.escalation_model.createdDate );
                        this.escalation_model.scalateDocuments = [];

                    }

                }

            }, (error:any) => {

                console.log('Error () => ', error);

            });*/
    };
    DialogEscalateComponent.prototype.sendEscalationData = function () {
        var _this = this;
        this.escalation_model.userFromId = this.data_from_esr.id_user;
        this.escalation_model.serviceRecordId = this.data_from_esr.id_sr;
        this.escalation_model.status = true;
        this.escalation_model.escalation = new Date();
        this.escalation_model.closedDate = new Date();
        this.escalation_model.scalateComments[0].createdDate = new Date();
        this.escalation_model.scalateComments[0].userFromId = this.user.id;
        this.escalation_model.scalateComments[0].userToId = this.escalation_model.userToId;
        this.escalation_model.scalateComments[0].scalateServiceId = Number(this.escalation_model.escalationLevel);
        this.escalation_model.escalationLevel = Number(this.escalation_model.escalationLevel);
        console.log('Orale ====> ', this.escalation_model);
        if (this.escalationFormValidator()) {
            this.loader.showLoader();
            this._services.service_general_post_with_url('Scalate/PostScalate', this.escalation_model)
                .subscribe(function (response) {
                _this.hideModal();
                _this.showGeneralMessageDialog('Escalation has been completed', 'An Escalation has been sent successfully.');
                _this.loader.hideLoader();
            }, function (error) {
                console.error('Error (Scalate/PostScalate) => ', error);
                _this.loader.hideLoader();
            });
        }
    };
    DialogEscalateComponent.prototype.sendEscalationDataUpdated = function () {
        var _this = this;
        this.loader.showLoader();
        this.escalation_model.escalation = new Date();
        this.escalation_model.closedDate = new Date();
        setTimeout(function () {
            _this._services.service_general_put('Scalate/PutScalate', _this.escalation_model)
                .subscribe(function (response) {
                if (response.success) {
                    _this.hideModal();
                    _this.showGeneralMessageDialog('Escalation has been updated', 'An Escalation has been updated successfully.');
                    _this.loader.hideLoader();
                }
            }, function (error) {
                console.error('Error (PutScalate) => ', error);
                _this.loader.hideLoader();
            });
        }, this.howMuchTimeWillWait());
    };
    DialogEscalateComponent.prototype.howMuchTimeWillWait = function () {
        return this.escalation_model.scalateDocuments.length * 2200;
    };
    DialogEscalateComponent.prototype.showGeneralMessageDialog = function (title, body) {
        if (title === void 0) { title = "No title"; }
        if (body === void 0) { body = "No content"; }
        var dialogRef = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: title,
                body: body
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    DialogEscalateComponent.prototype.replayComment = function () {
        var _this = this;
        var replay_comment = document.getElementById('replay-comment');
        this.new_comment.comments = replay_comment.value;
        this.new_comment.createdDate = new Date();
        this.new_comment.userFromId = this.data_from_esr.id_user;
        this.new_comment.userToId = this.escalation_model.userToId;
        this.new_comment.scalateServiceId = this.escalation_model.id;
        this._services.service_general_post_with_url('Scalate/PostComment', this.new_comment)
            .subscribe(function (response) {
            if (response.success) {
                _this.requestScalateStatus();
                replay_comment.value = '';
            }
        }, function (error) {
            console.log('Error (PostComment) => ', error);
        });
    };
    DialogEscalateComponent.prototype.getCommentsIn = function () {
        var comment_added = document.getElementsByClassName('comment-in');
        for (var comment = 0; comment < comment_added.length; comment += 1) {
            var comment_add = comment_added[comment].value, new_comment = new CommentModel();
            comment_added[0].value == '' ?
                this.no_first_comment = true :
                this.no_first_comment = false;
            new_comment.comments = comment_add;
            new_comment.userToId = this.escalation_model.userToId;
            new_comment.userFromId = this.data_from_esr.id_user;
            new_comment.createdDate = new Date();
            new_comment.date = new Date();
            if (comment_add != '')
                this.escalation_model.scalateComments.push(new_comment);
        }
    };
    DialogEscalateComponent.prototype.escalationFormValidator = function () {
        var result = true;
        this.escalation_model.userToId == 0 || this.escalation_model.userToId == null ?
            this.esc_form_validator.no_fron = true : this.esc_form_validator.no_fron = false;
        this.escalation_model.escalationLevel == 0 || this.escalation_model.escalationLevel == null ?
            this.esc_form_validator.no_leve = true : this.esc_form_validator.no_leve = false;
        this.escalation_model.serviceId == 0 || this.escalation_model.serviceId == null ?
            this.esc_form_validator.no_serv = true : this.esc_form_validator.no_serv = false;
        this.escalation_model.serviceLineId == 0 || this.escalation_model.serviceLineId == null ?
            this.esc_form_validator.no_lser = true : this.esc_form_validator.no_lser = false;
        for (var field in this.esc_form_validator) {
            if (this.esc_form_validator[field])
                result = false;
        }
        return result;
    };
    DialogEscalateComponent.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    DialogEscalateComponent.prototype.getTodayDay = function () {
        var date = {
            date: function () { return new Date(); },
            day: function () { return this.date().getDate(); },
            month: function () { return this.date().getMonth() + 1; },
            year: function () { return this.date().getFullYear(); },
            today: function () {
                return this.month() + "/" + this.day() + "/" + this.year();
            }
        };
        return date.today();
    };
    DialogEscalateComponent.prototype.removeErrorLabel = function (input_value, object_data) {
        if (input_value == "" || input_value == null) {
            object_data.handler[object_data.field] = true;
        }
        else {
            object_data.handler[object_data.field] = false;
        }
    };
    DialogEscalateComponent.prototype.dateWorker = function (date_in) {
        if (date_in != null && date_in != '' && date_in != undefined) {
            var date_actions = {
                set_date: function (d) { this.date = d; },
                split_date: function () { this.date_split = date_in.split('T'); },
                get_date: function () { return this.date_split[0]; }
            };
            var work_date = Object.create(date_actions);
            work_date.split_date();
            return work_date.get_date();
        }
        else {
            return 'No date found';
        }
    };
    DialogEscalateComponent.prototype.getServiceLine = function (line_id) {
        return __awaiter(this, void 0, Promise, function () {
            var params, _a, workorders_catalogueC;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("entra a funcion");
                        this.now_can_see_services = true;
                        params = "?service_record_Id=" + this.data_from_esr.id_sr + "&service_line_id=" + line_id;
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceBySOId', params)];
                    case 1:
                        _a.services_catalogue = _b.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetworkOrderBySR', params)];
                    case 2:
                        workorders_catalogueC = _b.sent();
                        this.workorders_catalogue = workorders_catalogueC.value;
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogEscalateComponent.prototype.dropped = function (files) {
        var _this = this;
        this.files = files;
        var root = this;
        var _loop_1 = function (droppedFile) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry_1 = droppedFile.fileEntry;
                var reader_1 = new FileReader();
                fileEntry_1.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, _this.files);
                    fileEntry_1.file(function (file) {
                        reader_1.readAsDataURL(file);
                        _this.new_document.fileExtension = file.name.split('.')[file.name.split('.').length - 1];
                        _this.new_document.name = file.name;
                        reader_1.onload = function () {
                            var base64_gotted = reader_1.result;
                            _this.new_document.fileRequest = base64_gotted.split(',')[1];
                            _this.new_document.document_from = 'local';
                            _this.new_document.createdDate = new Date();
                            _this.new_document.updatedBy = _this.user.id;
                            _this.new_document.updatedDate = new Date();
                            _this.new_document.createdBy = _this.user.id;
                            _this.escalation_model.scalateDocuments.push(_this.new_document);
                        };
                    });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                //console.log(droppedFile.relativePath, fileEntry);
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
        console.log('Saori ===> ', this.escalation_model);
    };
    DialogEscalateComponent.prototype.fileOver = function (event) {
        //console.log(event);
    };
    DialogEscalateComponent.prototype.fileLeave = function (event) {
        //console.log(event);
    };
    DialogEscalateComponent.prototype.SetServiceLine = function (item) {
        console.log(item);
        if (item.immigration) {
            this.escalation_model.serviceLineId = 1;
            this.getServiceLine(this.escalation_model.serviceLineId.toString());
        }
        if (item.relocation) {
            this.escalation_model.serviceLineId = 2;
            this.getServiceLine(this.escalation_model.serviceLineId.toString());
        }
    };
    DialogEscalateComponent = __decorate([
        core_1.Component({
            selector: 'edit-service-redcord-escalate',
            templateUrl: './escalate.component.html'
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogEscalateComponent);
    return DialogEscalateComponent;
}());
exports.DialogEscalateComponent = DialogEscalateComponent;
var EscalationModel = /** @class */ (function () {
    function EscalationModel() {
        this.id = 0;
        this.userToId = 0;
        this.userFromId = 0;
        this.status = true;
        this.escalationLevel = 0;
        this.workOrderId = 0;
        this.serviceId = 0;
        this.serviceLineId = 0;
        this.serviceRecordId = 0;
        this.scalateComments = [new CommentModel()];
        this.scalateDocuments = [];
    }
    return EscalationModel;
}());
var CommentModel = /** @class */ (function () {
    function CommentModel() {
        this.id = 0;
        this.comments = '';
        this.scalateServiceId = 0;
        this.userFromId = 0;
        this.userToId = 0;
    }
    return CommentModel;
}());
var DocumentEscalation = /** @class */ (function () {
    function DocumentEscalation() {
        this.id = 0;
        this.fileRequest = '';
        this.fileExtension = '';
        this.scalateServiceId = 0;
        this.createdBy = 0;
        this.document_from = '';
        this.name = '';
    }
    return DocumentEscalation;
}());
