"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessengerCenterComponent = void 0;
var core_1 = require("@angular/core");
var dialog_new_chat_component_1 = require("../dialog/dialog-new-chat/dialog-new-chat.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var MessengerCenterComponent = /** @class */ (function () {
    function MessengerCenterComponent(_services, dialog, fullComponent) {
        this._services = _services;
        this.dialog = dialog;
        this.fullComponent = fullComponent;
        this.userData = {};
        this.displayedColumns = ['user'];
        this.table_contacts = [];
        this.conversationId = 0;
        this.chat = [];
        this.temporalDocument = [];
        this.actual_user = {};
        this.continuemesage = {};
        this.sending = false;
        this.contact = {
            name: ''
        };
        this.files = [];
    }
    MessengerCenterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.conversationId = Number(localStorage.getItem('conversationId'));
        console.log(this.conversationId, "con");
        this._services.retrieveMappedObject().subscribe(function (receivedObj) {
            console.log(receivedObj);
            _this.getResient();
            if (_this.conversationId != 0) {
                _this.getConversation(_this.conversationId);
            }
        });
        this.getResient();
        if (this.conversationId != 0) {
            this.getConversation(this.conversationId);
        }
    };
    MessengerCenterComponent.prototype.ngOnDestroy = function () {
        console.log("remove id");
        localStorage.removeItem('conversationId');
    };
    MessengerCenterComponent.prototype.getResient = function () {
        var _this = this;
        this._services.service_general_get('Chat/SeeChats?user=' + this.userData.id).subscribe(function (n) {
            if (n.success) {
                _this.table_contacts = n.result.value;
                console.log(_this.table_contacts);
                if (_this.conversationId != 0) {
                    for (var i = 0; i < _this.table_contacts.length; i++) {
                        var element = _this.table_contacts[i];
                        if (element.conversationId == _this.conversationId) {
                            _this.actual_user = element;
                        }
                    }
                }
            }
        });
    };
    MessengerCenterComponent.prototype.getConversation = function (id) {
        var _this = this;
        this.conversationId = id;
        this._services.service_general_get('Chat/GetConversation/' + id + '/' + this.userData.id).subscribe(function (n) {
            if (n.success) {
                _this.fullComponent.ngAfterViewInit();
                _this.chat = n.result.value;
                console.log(_this.chat);
                setTimeout(function () {
                    var objDiv = document.getElementById("texting");
                    objDiv.scrollTop = objDiv.scrollHeight;
                    console.log(objDiv);
                }, 1000);
            }
        });
    };
    MessengerCenterComponent.prototype.newMessage = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_new_chat_component_1.DialogNewChatComponent, {
            data: {},
            width: "60%"
        });
        dialogRef.afterClosed().subscribe(function (so_added) {
            _this.getConversation(so_added[0].id);
        });
    };
    MessengerCenterComponent.prototype.filesUpload = function (file) {
        console.log(file);
        document.getElementById(file).click();
    };
    MessengerCenterComponent.prototype.onKey = function ($event) {
        if ($event.key == "Enter" || $event.keyCode == 13) {
            this.sendMessage();
        }
    };
    MessengerCenterComponent.prototype.dropped = function (files) {
        var _this = this;
        this.files = files;
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
                        reader_1.onload = function () {
                            var imageUrl = reader_1.result;
                            var encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                            if ((encoded.length % 4) > 0) {
                                encoded += '='.repeat(4 - (encoded.length % 4));
                            }
                            var ext = droppedFile.relativePath.split(".");
                            _this.temporalDocument.push({
                                "id": 0,
                                "message": _this.conversationId,
                                "filePath": encoded,
                                "fileExtension": ext[1],
                                "date": new Date(),
                                "status": true
                            });
                            //this.continuemesage.message = droppedFile.relativePath;
                            //this.sendMessage();         
                        };
                    });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
    };
    MessengerCenterComponent.prototype.fileOver = function (event) {
        console.log(event);
    };
    MessengerCenterComponent.prototype.fileLeave = function (event) {
        console.log(event);
    };
    MessengerCenterComponent.prototype.pat = function (src_path) {
        var result = '';
        var kind_of_file = src_path.split('.')[1];
        switch (kind_of_file) {
            case 'gif':
            case 'jpg':
            case 'png':
            case 'svg':
            case 'jpeg':
                result = this._services.url_images + src_path;
                break;
            default:
                result = 'https://cdn.onlinewebfonts.com/svg/img_560325.png';
                break;
        }
        return result;
    };
    MessengerCenterComponent.prototype.sendMessage = function () {
        var _this = this;
        this.sending = true;
        this.continuemesage = {
            "id": 0,
            "conversation": this.conversationId,
            "userId": this.userData.id,
            "message1": this.continuemesage.message,
            "time": new Date(),
            "status": false,
            "documentMessages": this.temporalDocument
        };
        if (this.continuemesage.message1 == null || this.continuemesage.message1 == undefined) {
            this.continuemesage.message1 = '';
        }
        console.log(this.continuemesage);
        this._services.service_general_post_with_url('Chat/SentMessage', this.continuemesage).subscribe(function (n) {
            console.log(n);
            _this.temporalDocument = [];
            _this.continuemesage = {
                "id": 0,
                "conversation": 0,
                "userId": _this.userData.id,
                "message1": "",
                "time": "",
                "status": true
            };
            _this.sending = false;
        });
    };
    MessengerCenterComponent.prototype.deleteConversation = function (data) {
        var _this = this;
        console.log("data a eliminar: ", data);
        var dialogRef = this.dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete Conversation?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete('Chat/DeleteConversation/' + data.conversationId).subscribe(function (n) {
                    if (n.success) {
                        var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Conversation was deleted"
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                });
            }
        });
    };
    MessengerCenterComponent.prototype.deleteMenssage = function (data) {
        var _this = this;
        console.log("data a eliminar: ", data);
        var dialogRef = this.dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete Message?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete('Chat/DeleteMessage/' + data.id).subscribe(function (n) {
                    if (n.success) {
                        var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Message was deleted"
                            },
                            width: "350px"
                        });
                        _this.getConversation(data.conversationId);
                    }
                });
            }
        });
    };
    MessengerCenterComponent = __decorate([
        core_1.Component({
            selector: 'app-messenger-center',
            templateUrl: './messenger-center.component.html',
            styleUrls: ['./messenger-center.component.scss']
        })
    ], MessengerCenterComponent);
    return MessengerCenterComponent;
}());
exports.MessengerCenterComponent = MessengerCenterComponent;
