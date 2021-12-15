"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppSidebarComponent = void 0;
var core_1 = require("@angular/core");
var AppSidebarComponent = /** @class */ (function () {
    function AppSidebarComponent(changeDetectorRef, media, menuItems, menuItemsSide, _router, menu, _permissions) {
        this.menuItems = menuItems;
        this.menuItemsSide = menuItemsSide;
        this._router = _router;
        this.menu = menu;
        this._permissions = _permissions;
        this.menu_structure = [];
        this.last_section_active = {
            tab: '',
            option: ''
        };
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    AppSidebarComponent.prototype.ngOnDestroy = function () {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    };
    AppSidebarComponent.prototype.ngOnInit = function () {
        this.menu.menu = true;
        this.isAnyTabActive();
        var user_data = JSON.parse(localStorage.getItem("userData"));
        this._permissions.loadPermissions([user_data.role.role]);
        this.menu_structure = JSON.parse(localStorage.getItem('Menu'));
        //debugger
    };
    AppSidebarComponent.prototype.showTabsSection = function (event, option_selected) {
        var get_section = event.target.parentElement.id, section_container = document.getElementById("section_" + get_section.split('_')[2]);
        section_container.classList.contains('display-none') ?
            section_container.classList.remove('display-none') :
            section_container.classList.add('display-none');
        console.log('Here ==> ', option_selected);
        this.last_section_active.tab = option_selected;
    };
    AppSidebarComponent.prototype.goToPage = function (the_page) {
        this._router.navigateByUrl(the_page);
    };
    AppSidebarComponent.prototype.activeLink = function (options, option_selected) {
        var _this = this;
        options.forEach(function (option) {
            if (option.action == option_selected) {
                option.active = true;
                _this.last_section_active.option = option.name;
            }
            else {
                option.active = false;
            }
        });
        localStorage.setItem('last_section', JSON.stringify(this.last_section_active));
    };
    AppSidebarComponent.prototype.isAnyTabActive = function () {
        var get_last_section = JSON.parse(localStorage.getItem('last_section'));
        if (get_last_section != undefined) {
            setTimeout(function () {
                var get_parent_tab = document.getElementById("tab_sec_" + get_last_section.tab);
                get_parent_tab.children[0].click();
                var get_children = document.getElementById("section_" + get_last_section.tab);
                for (var tab = 0; tab < get_children.children.length; tab += 1) {
                    var get_active_tab = get_children.children[tab];
                    if (get_active_tab.children[0].innerHTML == get_last_section.option) {
                        get_active_tab.click();
                    }
                }
            }, 177);
        }
    };
    //*******************************************************************//
    AppSidebarComponent.prototype.parametrosPermisos = function (id_menu, id_subMenu) {
        console.log("MENU: ", id_menu);
        console.log("SUBMENU: ", id_subMenu);
        var userData = JSON.parse(localStorage.getItem('userData'));
        var path = '1/1?menu=' + id_menu + '&submenu=' + id_subMenu + '&role=' + userData.role.id;
        console.log("ESTE ES EL PATH DE CONSULTA: ", path);
        localStorage.setItem('url_permisos', path);
    };
    AppSidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        })
    ], AppSidebarComponent);
    return AppSidebarComponent;
}());
exports.AppSidebarComponent = AppSidebarComponent;
