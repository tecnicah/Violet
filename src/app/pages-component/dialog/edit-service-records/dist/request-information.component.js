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
exports.DialogRequestInformation = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loader_1 = require("app/shared/loader");
var general_message_component_1 = require("../general-message/general-message.component");
var DialogRequestInformation = /** @class */ (function () {
    function DialogRequestInformation(dialogRef, _services, _router, data_income, _dialog) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._router = _router;
        this.data_income = data_income;
        this._dialog = _dialog;
        this._loader_ = new loader_1.LoaderComponent();
        this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.today = new Date();
        this.relationship_catalogue = [];
        this.autoriza_catalogue = [];
        this.documenttype_catalogue = [];
        this.USERDATA = null;
        this.SO_ID = null;
        this.new_request_data = new InformationRequest();
        this.can_show_errors = false;
        this.form_data = {
            no_send: false,
            no_mail_valid: false,
            no_ddue: false,
            no_file: false
        };
        this.documents = [];
        //public new_document:Document = new Document();
        this.new_document = new DocumentRequest();
    }
    DialogRequestInformation.prototype.ngOnInit = function () {
        console.log("userData ", this.user);
        if (this.isUserActive()) {
            //this.documents.push( this.new_document );
            //this.new_request_data.requestInformationDocuments.push( new DocumentRequest );
            this.getCatalogues();
        }
        else {
            this._router.navigateByUrl('');
        }
    };
    DialogRequestInformation.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var id_user, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id_user = "?user=" + this.SO_ID;
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetUserTo', id_user)];
                    case 1:
                        _a.autoriza_catalogue = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType/3')];
                    case 2:
                        _b.documenttype_catalogue = _c.sent();
                        this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data_income.sr_id)
                            .subscribe(function (response) {
                            if (response.success) {
                                _this.relationship_catalogue = response.applicant.value;
                            }
                        }, function (error) {
                            console.error('Error (GetApplicant) => ', error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogRequestInformation.prototype.isUserActive = function () {
        var result = false;
        var user_in = localStorage.getItem('userData');
        if (user_in != undefined) {
            this.USERDATA = JSON.parse(user_in);
            this.SO_ID = this.USERDATA.id;
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
    DialogRequestInformation.prototype.sendRequestData = function () {
        var _this = this;
        this.can_show_errors = true;
        // seteo de autorized by por el id loggeado
        this.new_request_data.authorizedBy = this.user.id;
        console.log('autorized', this.new_request_data.authorizedBy);
        this.new_request_data.serviceRecordId = this.data_income.sr_id;
        var form_validations = {
            main_form: this.validateRequestForm(),
            docs_forms: this.validatingDocumentGroup()
        };
        console.log('Construyendo OBJ => ', this.new_request_data);
        //if( form_validations.main_form && form_validations.docs_forms ) {
        if (form_validations.main_form) {
            var working_request = new Promise(function (resolve) {
                _this._loader_.showLoader();
                resolve(true);
            });
            var aux_documentos = this.new_request_data.requestInformationDocuments;
            this.new_request_data.requestInformationDocuments = [];
            for (var i = 0; i < aux_documentos.length; i++) {
                if (aux_documentos[i].documentType != 0 || aux_documentos[i].relationshipId != 0) {
                    this.new_request_data.requestInformationDocuments.push(aux_documentos[i]);
                }
            }
            working_request.then(function (result) {
                var total_documents = _this.new_request_data.requestInformationDocuments.length;
                console.log('Envio esto ==> ', _this.new_request_data);
                setTimeout(function () {
                    _this._services.service_general_post_with_url('RequestInformation/PostRequestInformation', _this.new_request_data)
                        .subscribe(function (response) {
                        console.log('Response (PostRequestInformation) => ', response);
                        if (response.success) {
                            _this.hideModal(true);
                        }
                        _this._loader_.hideLoader();
                        _this.showGeneralMessageDialog('Request information sent', 'Request information has been sent successfully.');
                    }, function (error) {
                        console.log('WS Erros => ', error);
                        _this._loader_.hideLoader();
                    });
                }, total_documents * 4200);
            });
        }
    };
    DialogRequestInformation.prototype.appendDocumentToModel = function (file_data, document) {
        var file_reader = new FileReader();
        file_reader.onload = function () {
            var base64 = file_reader.result;
            document.fileRequest = base64.split(',')[1];
            document.fileExtension = file_data.name.split('.')[1];
        };
        file_reader.readAsDataURL(file_data);
    };
    DialogRequestInformation.prototype.validatingDocumentGroup = function () {
        var result = true;
        var documents = document.getElementsByClassName('document');
        for (var document = 0; document < documents.length; document += 1) {
            var root_element = documents[document], doc_inputs = root_element.querySelectorAll('input');
            validateInputs(doc_inputs);
        }
        function validateInputs(inputs_in) {
            //const input_one:any = inputs_in[0];
            //console.log('inpunt', input_one);
            //input_one.value == '' ?
            //input_one.parentElement.querySelector('.label-error').classList.remove('display-none') :
            //input_one.parentElement.querySelector('.label-error').classList.add('display-none');
            //if( input_one.value == '' ) result = false;
        }
        this.new_request_data.requestInformationDocuments.forEach(function (document) {
            //if( document.documentType == 0 ) result = false;
            if (document.relationshipId == 0)
                result = false;
        });
        return result;
    };
    DialogRequestInformation.prototype.validateRequestForm = function () {
        var result = true;
        this.new_request_data.sentTo == "" ?
            this.form_data.no_send = true : this.form_data.no_send = false;
        !this.validateEmail(this.new_request_data.sentTo) ?
            this.form_data.no_mail_valid = true : this.form_data.no_mail_valid = false;
        this.new_request_data.due == "" || this.new_request_data.due == null ?
            this.form_data.no_ddue = true : this.form_data.no_ddue = false;
        this.new_request_data.authorizedBy == "" ?
            this.form_data.no_auto = true : this.form_data.no_auto = false;
        !this.new_request_data.housingSpecification &&
            !this.new_request_data.immigrationProfile &&
            !this.new_request_data.needsAssessment ?
            this.form_data.no_file = true : this.form_data.no_file = false;
        for (var field in this.form_data) {
            if (this.form_data[field])
                result = false;
        }
        return result;
    };
    DialogRequestInformation.prototype.setNameFileName = function (event_data, to_where) {
        var get_name_container = document.getElementById(to_where);
        get_name_container.innerHTML = event_data.files[0].name;
    };
    DialogRequestInformation.prototype.addDocument = function () {
        this.new_request_data.requestInformationDocuments.push(new DocumentRequest());
    };
    DialogRequestInformation.prototype.removeDocument = function (index) {
        this.documents.splice(index, 1);
    };
    DialogRequestInformation.prototype.hideModal = function (completed) {
        if (completed === void 0) { completed = false; }
        this.dialogRef.close(completed);
    };
    DialogRequestInformation.prototype.validateEmail = function (email_in) {
        var result = true;
        var validating_email = this.emailPattern.test(email_in);
        if (!validating_email)
            result = false;
        return result;
    };
    DialogRequestInformation.prototype.removeErrorLabel = function (input_value, object_data) {
        if (input_value == "" || input_value == null) {
            object_data.handler[object_data.field] = true;
        }
        else {
            object_data.handler[object_data.field] = false;
        }
    };
    DialogRequestInformation.prototype.validEmailSentTo = function (email) {
        !this.validateEmail(email) ?
            this.form_data.no_mail_valid = true :
            this.form_data.no_mail_valid = false;
    };
    DialogRequestInformation.prototype.formSelected = function () {
        !this.new_request_data.housingSpecification &&
            !this.new_request_data.immigrationProfile &&
            !this.new_request_data.needsAssessment ?
            this.form_data.no_file = true : this.form_data.no_file = false;
    };
    DialogRequestInformation.prototype.removeErrorDinamic = function (input_value, id_label) {
        var get_input_label = document.getElementById(id_label);
        if (input_value == '' || input_value == null || input_value == undefined) {
            get_input_label.classList.remove('display-none');
        }
        else {
            get_input_label.classList.add('display-none');
        }
    };
    DialogRequestInformation.prototype.showGeneralMessageDialog = function (title, body) {
        if (title === void 0) { title = ''; }
        if (body === void 0) { body = ''; }
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
    DialogRequestInformation = __decorate([
        core_1.Component({
            selector: 'edit-record-request-info',
            templateUrl: './request-information.component.html'
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogRequestInformation);
    return DialogRequestInformation;
}());
exports.DialogRequestInformation = DialogRequestInformation;
var Document = /** @class */ (function () {
    function Document() {
        this.type = '';
        this.relationship = '';
    }
    return Document;
}());
var InformationRequest = /** @class */ (function () {
    function InformationRequest() {
        this.id = 0;
        this.sentTo = '';
        this.authorizedBy = '';
        this.needsAssessment = false;
        this.immigrationProfile = false;
        this.housingSpecification = false;
        this.serviceRecordId = 0;
        this.due = '';
        this.requestInformationDocuments = [];
    }
    return InformationRequest;
}());
var DocumentRequest = /** @class */ (function () {
    function DocumentRequest() {
        this.id = 0;
        this.documentType = 0;
        this.relationshipId = 0;
        this.fileRequest = '';
        this.requestInformationId = 0;
        this.fileExtension = '';
    }
    return DocumentRequest;
}());
