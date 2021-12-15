"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var loader_1 = require("../../shared/loader");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(service, _formBuilder, _router, _dialog) {
        this.service = service;
        this._formBuilder = _formBuilder;
        this._router = _router;
        this._dialog = _dialog;
        this.loader = new loader_1.LoaderComponent();
        this.type_input = 'password';
        this.eyed = false;
        this.section_active = 'login';
    }
    Object.defineProperty(LoginComponent.prototype, "email", {
        get: function () {
            return this.loginFormGroup.get('email');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "password", {
        get: function () {
            return this.loginFormGroup.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "email_recover", {
        get: function () {
            return this.recoverFormPassword.get('email_recover');
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.ngOnInit = function () {
        this.isAnySessionActive();
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.resetNavigator();
        this.loginFormGroup = this._formBuilder.group({
            'email': [null, [forms_1.Validators.required, forms_1.Validators.maxLength(50), forms_1.Validators.pattern(emailregex)]],
            'password': [null, [forms_1.Validators.required, forms_1.Validators.maxLength(50)]]
        });
        this.recoverFormPassword = this._formBuilder.group({
            'email_recover': [null, [forms_1.Validators.required, forms_1.Validators.pattern(emailregex)]]
        });
    };
    LoginComponent.prototype.isAnySessionActive = function () {
        var session_data = JSON.parse(localStorage.getItem('userData'));
        if (session_data != null || session_data != undefined) {
            if (session_data.token != '') {
                this._router.navigateByUrl('home');
            }
        }
    };
    LoginComponent.prototype.onSubmit = function (form_data) {
        var _this = this;
        console.log('Here ===> ', form_data);
        console.log(this.loginFormGroup);
        this.loader.showLoader();
        var user_in_info = {
            date: new Date()
        };
        //User/Login?email=${ form_data.email }&password=${ form_data.password }
        this.service.service_general_post_with_url('User/Login?' + 'email=' + form_data.email + '&password=' + form_data.password, form_data)
            .subscribe(function (response) {
            if (response.success) {
                _this._router.navigateByUrl('home');
                console.log(response.result);
                var permission = response.result.role.permissions;
                console.log("Estos son los permisos: ", permission);
                //**********************************************************//
                //ELIMANDO MENU OPERATIONAL REPORT//
                for (var i = 0; i < permission.length; i++) {
                    if (permission[i].idCatSubMenu == 3) {
                        permission.splice(i, 1);
                    }
                }
                console.log("Permisos ya con eliminacion de reports: ", permission);
                //**********************************************************//
                //AQUI AGREGAMOS EL PATH O RUTA DE CADA COMPONENETE//
                for (var i = 0; i < permission.length; i++) {
                    switch (permission[i].idCatSubMenu) {
                        case 3:
                            permission[i].nameSubmenu = "Operational Reports";
                            permission[i].ruta = "/reports";
                            break;
                        case 4:
                            permission[i].nameSubmenu = "Activity";
                            permission[i].ruta = "/activity";
                            break;
                        case 5:
                            permission[i].nameSubmenu = "Service Records";
                            permission[i].ruta = "/serviceRecord";
                            break;
                        case 6:
                            permission[i].nameSubmenu = "Pending Authorizations";
                            permission[i].ruta = "/PendingAuthorizations";
                            break;
                        case 7:
                            permission[i].nameSubmenu = "Service Calendar";
                            permission[i].ruta = "/serviceCalendar";
                            break;
                        case 8:
                            permission[i].nameSubmenu = "Experience Surveys";
                            permission[i].ruta = "/experienceSurveys";
                            break;
                        case 9:
                            permission[i].nameSubmenu = "Supplier Partners";
                            permission[i].ruta = "/supplierPartners";
                            break;
                        case 10:
                            permission[i].nameSubmenu = "Training";
                            permission[i].ruta = "/training";
                            break;
                        case 11:
                            permission[i].nameSubmenu = "Partners & Clients";
                            permission[i].ruta = "/partner";
                            break;
                        case 12:
                            permission[i].nameSubmenu = "Leads";
                            permission[i].ruta = "/leads";
                            break;
                        case 13:
                            permission[i].nameSubmenu = "Request Center";
                            permission[i].ruta = "/requestcenter";
                            break;
                        case 14:
                            permission[i].nameSubmenu = "Invoices Service";
                            permission[i].ruta = "/invoicesService";
                            break;
                        case 15:
                            permission[i].nameSubmenu = "Users";
                            permission[i].ruta = "/admin-center/users";
                            break;
                        case 16:
                            permission[i].nameSubmenu = "Catalogs";
                            permission[i].ruta = "/catalogs";
                            break;
                        case 17:
                            permission[i].nameSubmenu = "System Configuration";
                            permission[i].ruta = "/admin-center/system-configuration";
                            break;
                        case 18:
                            permission[i].nameSubmenu = "Training Courses";
                            permission[i].ruta = "/admin-trainig";
                            break;
                        case 20:
                            permission[i].nameSubmenu = "Invoices Supplier";
                            permission[i].ruta = "/invoicesSupplier";
                            break;
                        case 21:
                            permission[i].nameSubmenu = "Third Party Invoice";
                            permission[i].ruta = "/thirdPartyExpenses";
                            break;
                        case 22:
                            permission[i].nameSubmenu = "VIOLET App Configuration";
                            permission[i].ruta = "/countries";
                            break;
                        case 2:
                            permission[i].nameSubmenu = "Dashboard";
                            permission[i].ruta = "/dashboard";
                            break;
                    }
                }
                //**********************************************************//
                //SE ARMA EL JSON PARA ITERAR EL MENU//
                var json_menu = [];
                var contador_aux = 0;
                var posicion_json = 0;
                for (var i = 0; i < permission.length; i++) {
                    contador_aux = 0;
                    posicion_json = 0;
                    for (var j = 0; j < json_menu.length; j++) {
                        if (permission[i].idCatMenu == json_menu[j].id) {
                            contador_aux++;
                            posicion_json = j;
                        }
                    }
                    console.log("Existe: ", contador_aux);
                    console.log("DATA A INERTAR: ", permission[i]);
                    switch (permission[i].idCatMenu) {
                        case 2:
                            if (contador_aux == 0) {
                                json_menu.push({
                                    id: 2,
                                    name: "Operations",
                                    icon: './assets/operations-icon.png',
                                    subMenu: [{
                                            "id_subMenu": permission[i].idCatSubMenu,
                                            "nameSubMenu": permission[i].nameSubmenu,
                                            "ruta": permission[i].ruta,
                                            "reading": permission[i].reading
                                        }]
                                });
                                /*
                                json_menu[posicion_json].subMenu.push({
                                  "id_subMenu": permission[i].idCatSubMenu,
                                  "nameSubMenu": permission[i].nameSubmenu,
                                  "ruta" : permission[i].ruta,
                                  "reading": permission[i].reading
                                })
                                */
                            }
                            else {
                                json_menu[posicion_json].subMenu.push({
                                    "id_subMenu": permission[i].idCatSubMenu,
                                    "nameSubMenu": permission[i].nameSubmenu,
                                    "ruta": permission[i].ruta,
                                    "reading": permission[i].reading
                                });
                            }
                            break;
                        case 3:
                            if (contador_aux == 0) {
                                json_menu.push({
                                    id: 3,
                                    name: "Partner & Clients",
                                    icon: './assets/partner-client-icon.png',
                                    subMenu: [{
                                            "id_subMenu": permission[i].idCatSubMenu,
                                            "nameSubMenu": permission[i].nameSubmenu,
                                            "ruta": permission[i].ruta,
                                            "reading": permission[i].reading
                                        }]
                                });
                                /*
                                json_menu[posicion_json].subMenu.push({
                                  "id_subMenu": permission[i].idCatSubMenu,
                                  "nameSubMenu": permission[i].nameSubmenu,
                                  "ruta" : permission[i].ruta,
                                  "reading": permission[i].reading
                                })
                                */
                            }
                            else {
                                json_menu[posicion_json].subMenu.push({
                                    "id_subMenu": permission[i].idCatSubMenu,
                                    "nameSubMenu": permission[i].nameSubmenu,
                                    "ruta": permission[i].ruta,
                                    "reading": permission[i].reading
                                });
                            }
                            break;
                        case 4:
                            if (contador_aux == 0) {
                                json_menu.push({
                                    id: 4,
                                    name: "Finance",
                                    icon: './assets/finance-icon.png',
                                    subMenu: [{
                                            "id_subMenu": permission[i].idCatSubMenu,
                                            "nameSubMenu": permission[i].nameSubmenu,
                                            "ruta": permission[i].ruta,
                                            "reading": permission[i].reading
                                        }]
                                });
                                /*
                                json_menu[posicion_json].subMenu.push({
                                  "id_subMenu": permission[i].idCatSubMenu,
                                  "nameSubMenu": permission[i].nameSubmenu,
                                  "ruta" : permission[i].ruta,
                                  "reading": permission[i].reading
                                })
                                */
                            }
                            else {
                                json_menu[posicion_json].subMenu.push({
                                    "id_subMenu": permission[i].idCatSubMenu,
                                    "nameSubMenu": permission[i].nameSubmenu,
                                    "ruta": permission[i].ruta,
                                    "reading": permission[i].reading
                                });
                            }
                            break;
                        case 5:
                            if (contador_aux == 0) {
                                json_menu.push({
                                    id: 5,
                                    name: "Admin Center",
                                    icon: './assets/admin-center.png',
                                    subMenu: [{
                                            "id_subMenu": permission[i].idCatSubMenu,
                                            "nameSubMenu": permission[i].nameSubmenu,
                                            "ruta": permission[i].ruta,
                                            "reading": permission[i].reading
                                        }]
                                });
                                /*
                                json_menu[posicion_json].subMenu.push({
                                  "id_subMenu": permission[i].idCatSubMenu,
                                  "nameSubMenu": permission[i].nameSubmenu,
                                  "ruta" : permission[i].ruta,
                                  "reading": permission[i].reading
                                })
                                */
                            }
                            else {
                                json_menu[posicion_json].subMenu.push({
                                    "id_subMenu": permission[i].idCatSubMenu,
                                    "nameSubMenu": permission[i].nameSubmenu,
                                    "ruta": permission[i].ruta,
                                    "reading": permission[i].reading
                                });
                            }
                            break;
                    }
                }
                for (var i = 0; i < json_menu.length; i++) {
                    var submenu = json_menu[i].subMenu;
                    for (var j = 0; j < submenu.length; j++) {
                        if (submenu[j].reading) {
                            json_menu[i].show = true;
                            break;
                        }
                        else {
                            json_menu[i].show = false;
                        }
                    }
                }
                /*
                for(let i = 0; i < json_menu.length; i++){
                  if(json_menu[i].id == 2){
                    for(let j = 0; j < json_menu[i].subMenu.length; j++){
                      if(json_menu[i].subMenu[j].id_subMenu == 3){
                        json_menu[i].subMenu.push({
                          id_subMenu: 3,
                          ruta: '/full-sistem-contacts',
                          nameSubMenu: 'Full Sistem Contacts',
                          reading: json_menu[i].subMenu[j].reading
                       });
                       break
                      }
                    }
                  }
                }
                */
                console.log(json_menu);
                localStorage.setItem('Menu', JSON.stringify(json_menu));
                //**********************************************************//
                debugger;
                localStorage.setItem('userData', JSON.stringify(response.result));
                localStorage.setItem('user_expiration', JSON.stringify(user_in_info));
            }
            else {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Access denied',
                        body: 'User or password incorrect'
                    },
                    width: '350px'
                });
            }
            _this.loader.hideLoader();
            console.log('Response ===> ', response);
        }, function (error) {
            console.error('Error login WS ===> ', error);
        });
    };
    LoginComponent.prototype.changeType = function (type) {
        if (type == true) {
            this.type_input = 'text';
            this.eyed = true;
        }
        else {
            this.type_input = 'password';
            this.eyed = false;
        }
    };
    LoginComponent.prototype.recoverPassword = function (form_data) {
        var _this = this;
        this.loader.showLoader();
        this.service.service_general_put("User/Recovery_password?email=" + form_data.email_recover, form_data)
            .subscribe(function (response) {
            if (response.success) {
                _this.showSection('login');
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Password recovered',
                        body: 'A new password has been sent to your email.'
                    },
                    width: '350px'
                });
            }
            else {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'A System Error',
                        body: 'Please try later or use support contact #COD135'
                    },
                    width: '350px'
                });
            }
            _this.loader.hideLoader();
        }, function (error) {
            console.log('Erro ===> ', error);
            _this.loader.hideLoader();
        });
    };
    LoginComponent.prototype.getErrorEmail = function () {
        return this.loginFormGroup.get('email').hasError('required') ? 'Email is required' :
            this.loginFormGroup.get('email').hasError('pattern') ? 'Email format not valid' : '';
    };
    LoginComponent.prototype.getErrorEmailRecover = function () {
        return this.recoverFormPassword.get('email_recover').hasError('required') ? 'Email is required' :
            this.recoverFormPassword.get('email_recover').hasError('pattern') ? 'Email format not valid' : '';
    };
    LoginComponent.prototype.showSection = function (section) {
        this.section_active = section;
    };
    LoginComponent.prototype.resetNavigator = function () {
        localStorage.removeItem('last_section');
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
