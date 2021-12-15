"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FullComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
/** @title Responsive sidenav */
var FullComponent = /** @class */ (function () {
    function FullComponent(changeDetectorRef, media, menuItems, menuItemsSide, menu, _router, _services) {
        var _this = this;
        this.menuItems = menuItems;
        this.menuItemsSide = menuItemsSide;
        this.menu = menu;
        this._router = _router;
        this._services = _services;
        this.userData = {};
        this.__loader__ = new loader_1.LoaderComponent();
        this.table_contacts = [];
        this.id = 0;
        //*************************************************************//
        this.ca_notification = [];
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.menu.retrieveMappedObject().subscribe(function (receivedObj) {
            console.log(receivedObj);
            _this.get_Chats();
            _this.get_Notification();
        });
    }
    FullComponent.prototype.ngOnDestroy = function () {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    };
    FullComponent.prototype.viewMessage = function (id) {
        console.log(id);
        localStorage.setItem("conversationId", id);
        this._router.navigateByUrl('/messenger-center');
    };
    FullComponent.prototype.destroySession = function () {
        var _this = this;
        this.__loader__.showLoader();
        var wait_for_remover = new Promise(function (resolve) {
            localStorage.removeItem('userData');
            setTimeout(function () { return resolve(true); }, 777);
        });
        wait_for_remover.then(function (result) {
            if (result) {
                _this.__loader__.hideLoader();
                _this._router.navigateByUrl('');
            }
        });
        this._router.navigateByUrl('');
    };
    FullComponent.prototype.profilePage = function () {
        var user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        if (user.role.id == 1) {
            this._router.navigateByUrl('profilemanager/' + user.profileUsers[0].id);
        }
        else if (user.role.id == 2) {
            this._router.navigateByUrl('profilecoordinator/' + user.profileUsers[0].id);
        }
        else if (user.role.id == 3) {
            this._router.navigateByUrl('profileconsultant/' + user.profileUsers[0].id);
        }
    };
    FullComponent.prototype.ngAfterViewInit = function () {
        this.get_Notification();
        this.get_Chats();
        var user = JSON.parse(localStorage.getItem('userData'));
        this.id = user.id;
        this.getAvatarProfile(user.profileUsers[0].id);
    };
    FullComponent.prototype.getAvatarProfile = function (id) {
        var _this = this;
        this._services.service_general_get("Profile/GetProfile/" + id).subscribe(function (profile) {
            if (profile.success) {
                _this.profileUser = profile.result;
            }
        });
    };
    FullComponent.prototype.menus = function () {
        var _this = this;
        if (this.menu.menu) {
            this.menu.small = true;
            this.menu.big = false;
            setTimeout(function () {
                _this.menu.menu = false;
            }, 200);
        }
        else {
            this.menu.small = false;
            this.menu.big = true;
            setTimeout(function () {
                _this.menu.menu = true;
            }, 1500);
        }
    };
    FullComponent.prototype.get_Chats = function () {
        var _this = this;
        this.menu.service_general_get('Chat/GetChatNotification/' + this.userData.id).subscribe(function (n) {
            if (n.success) {
                _this.table_contacts = n.result.value;
                console.log(_this.table_contacts);
            }
        });
    };
    FullComponent.prototype.get_Notification = function () {
        var _this = this;
        //this.get_NotificationView();
        var notificaciones = [];
        this.menu.service_general_get('Notification/GetNotificationCenter/' + this.userData.id).subscribe((function (data) {
            if (data.success) {
                console.log('DATA CONSULTA NOTIFICACIONES:', data);
                // notificaciones = data.result.value.filter(function(E){
                //   if(E.view == false){
                //     return true;
                //   }
                // })
                notificaciones = data.result.value.sort(function (a, b) {
                    return b.createdDate.localeCompare(a.createdDate);
                });
                var uux_notificaciones = [];
                for (var i = 0; i < notificaciones.length; i++) {
                    if ((notificaciones[i].archive == false && notificaciones[i].view == false)) {
                        uux_notificaciones.push(notificaciones[i]);
                    }
                }
                _this.ca_notificationView = uux_notificaciones.length;
                //this.ca_notification = data.result.value;
                _this.ca_notification = notificaciones;
                //this.get_NotificationView();
            }
        }));
    };
    FullComponent.prototype.get_NotificationView = function () {
        var _this = this;
        var notificaciones = [];
        this.menu.service_general_get('Notification/GetNotifications/' + this.userData.id).subscribe((function (data) {
            if (data.success) {
                console.log('DATA CONSULTA NOTIFICACIONES: ', data);
                //this.ca_notification = data.result.value;
                notificaciones = data.result.value.filter(function (E) {
                    if (E.view == false) {
                        return true;
                    }
                });
                _this.ca_notificationView = notificaciones.length;
            }
        }));
    };
    //*************************************************************//
    FullComponent.prototype.marcarLeida = function (data) {
        var _this = this;
        console.log(data);
        if (data.view == false) {
            var viewt = true;
            this.menu.service_general_put('Notification/PutViewed/' + data.id + '/' + viewt, '').subscribe((function (data) {
                // this.menu.service_general_put(`Notification/PutViewed/${data.id}/true`).subscribe((data => {
                if (data.success) {
                    _this.get_NotificationView();
                }
            }));
        }
        else if (data.view == true) {
            var viewf = false;
            this.menu.service_general_put('Notification/PutViewed/' + data.id + '/' + viewf, '').subscribe((function (data) {
                if (data.success) {
                    _this.get_NotificationView();
                }
            }));
        }
    };
    //*************************************************************//
    FullComponent.prototype.archivar = function (data, event) {
        var _this = this;
        console.log(data);
        if (event.checked) {
            this.menu.service_general_put('Notification/PutArchive/' + data.id + '/' + event.checked, '').subscribe((function (data) {
                if (data.success) {
                    _this.get_Notification();
                }
            }));
        }
        else {
            this.menu.service_general_put('Notification/PutArchive/' + data.id + '/' + event.checked, '').subscribe((function (data) {
                if (data.success) {
                    _this.get_Notification();
                }
            }));
        }
    };
    //ACEPTAMOS NOTIFICACION//
    FullComponent.prototype.accept = function (data_, status) {
        var _this = this;
        console.log(status);
        this.menu.service_general_putnoapi(status, '').subscribe((function (resp) {
            var event = { 'checked': true };
            _this.archivar(data_, event);
            _this.marcarLeida(data_);
        }));
    };
    //DECLINAMOS NOTIFICACION//
    FullComponent.prototype.decline = function (data_, status) {
        var _this = this;
        console.log(status);
        this.menu.service_general_putnoapi(status, '').subscribe((function (data) {
            console.log(data);
            var event = { 'checked': false };
            _this.archivar(data_, event);
            _this.marcarLeida(data_);
        }));
    };
    FullComponent = __decorate([
        core_1.Component({
            selector: 'app-full-layout',
            templateUrl: 'full.component.html',
            styleUrls: []
        })
    ], FullComponent);
    return FullComponent;
}());
exports.FullComponent = FullComponent;
