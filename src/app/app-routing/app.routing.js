"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
var full_component_1 = require("../layouts/full/full.component");
var login_component_1 = require("../pages-component/login/login.component");
var assignee_and_family_info_component_1 = require("../layouts/single-pages/assignee-and-family-info.component");
exports.AppRoutes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: '',
        component: login_component_1.LoginComponent
    },
    {
        path: 'assigneeAndFamilyInfo',
        component: assignee_and_family_info_component_1.SinglePageAssigneeFamilyInfo
    },
    {
        path: 'assigneeAndFamilyInfo/:id',
        component: assignee_and_family_info_component_1.SinglePageAssigneeFamilyInfo
    },
    {
        path: '',
        component: full_component_1.FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../material-component/material.module'); }).then(function (m) { return m.MaterialComponentsModule; }); }
            },
            {
                path: '',
                loadChildren: function () { return Promise.resolve().then(function () { return require('../pages-component/material.module'); }).then(function (m) { return m.MaterialComponentsModule; }); }
            }
        ]
    }
];
//# sourceMappingURL=app.routing.js.map