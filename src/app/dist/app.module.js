"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var common_1 = require("@angular/common");
var app_routing_1 = require("./app-routing/app.routing");
var app_component_1 = require("./app.component");
var flex_layout_1 = require("@angular/flex-layout");
var full_component_1 = require("./layouts/full/full.component");
var header_component_1 = require("./layouts/full/header/header.component");
var sidebar_component_1 = require("./layouts/full/sidebar/sidebar.component");
var assignee_and_family_info_component_1 = require("./layouts/single-pages/assignee-and-family-info.component");
var animations_1 = require("@angular/platform-browser/animations");
var demo_material_module_1 = require("./demo-material-module");
var menu_1 = require("@angular/material/menu");
var shared_module_1 = require("./shared/shared.module");
var spinner_component_1 = require("./shared/spinner.component");
var assignee_and_family_info_directive_1 = require("./layouts/single-pages/assignee-and-family-info.directive");
var core_2 = require("@agm/core");
var ngx_google_places_autocomplete_1 = require("ngx-google-places-autocomplete");
var ngx_icon_calendar_1 = require("ngx-icon-calendar");
var core_3 = require("@ngx-translate/core");
var ngx_permissions_1 = require("ngx-permissions");
var badge_1 = require("@angular/material/badge");
var ngx_owl_carousel_1 = require("ngx-owl-carousel");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var mat_table_exporter_1 = require("mat-table-exporter");
var ngx_pagination_1 = require("ngx-pagination");
var ngx_order_pipe_1 = require("ngx-order-pipe");
var kendo_angular_editor_1 = require("@progress/kendo-angular-editor");
var ngx_mask_1 = require("ngx-mask");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                full_component_1.FullComponent,
                assignee_and_family_info_component_1.SinglePageAssigneeFamilyInfo,
                header_component_1.AppHeaderComponent,
                spinner_component_1.SpinnerComponent,
                sidebar_component_1.AppSidebarComponent,
                assignee_and_family_info_directive_1.AssigneeAndFamilyInfoDirective
            ],
            imports: [
                ngx_order_pipe_1.OrderModule,
                ngx_icon_calendar_1.NgxIconCalendarModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                demo_material_module_1.DemoMaterialModule,
                forms_1.FormsModule,
                badge_1.MatBadgeModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                ngx_pagination_1.NgxPaginationModule,
                ngx_owl_carousel_o_1.CarouselModule,
                ngx_owl_carousel_1.OwlModule,
                http_1.HttpClientModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forRoot(app_routing_1.AppRoutes, { useHash: true, relativeLinkResolution: 'legacy' }),
                ngx_mask_1.NgxMaskModule.forRoot({
                    validation: true
                }),
                core_3.TranslateModule.forRoot(),
                menu_1.MatMenuModule,
                core_2.AgmCoreModule.forRoot({
                    // please get your own API key here:
                    // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
                    apiKey: 'AIzaSyBF-AEeoIsOV8elnHA3zQ5h5lgFMp5TaF4',
                    libraries: ["places"]
                }),
                ngx_google_places_autocomplete_1.GooglePlaceModule,
                ngx_permissions_1.NgxPermissionsModule.forRoot(),
                mat_table_exporter_1.MatTableExporterModule,
                kendo_angular_editor_1.EditorModule
            ],
            providers: [
                {
                    provide: common_1.LocationStrategy,
                    useClass: common_1.PathLocationStrategy
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
