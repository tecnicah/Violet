"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.NewPartnerClientComponent = void 0;
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var dialog_contract_pricing_info_component_1 = require("../dialog/dialog-contract-pricing-info/dialog-contract-pricing-info.component");
var dialog_activity_log_component_1 = require("../dialog/dialog-activity-log/dialog-activity-log.component");
var dialog_terms_of_the_deal_component_1 = require("../dialog/dialog-terms-of-the-deal/dialog-terms-of-the-deal.component");
var dialog_office_information_component_1 = require("../dialog/dialog-office-information/dialog-office-information.component");
var dialog_add_client_component_1 = require("../dialog/dialog-add-client/dialog-add-client.component");
var loader_1 = require("app/shared/loader");
var dialog_add_service_component_1 = require("../dialog/dialog-add-service/dialog-add-service.component");
var dialog_documents_lead_client_component_1 = require("../dialog/dialog-documents-lead-client/dialog-documents-lead-client.component");
var dialog_score_awads_component_1 = require("../dialog/dialog-score-awads/dialog-score-awads.component");
var dialog_experiens_team_component_1 = require("../dialog/dialog-experiens-team/dialog-experiens-team.component");
var general_confirmation_component_1 = require("../dialog/general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../dialog/general-message/general-message.component");
var dialog_contacts_component_1 = require("../dialog/dialog-contacts/dialog-contacts.component");
var NewPartnerClientComponent = /** @class */ (function () {
    function NewPartnerClientComponent(rutaActiva, _services, dialog, router) {
        this.rutaActiva = rutaActiva;
        this._services = _services;
        this.dialog = dialog;
        this.router = router;
        this.partnert = false;
        this.lead = false;
        this.caCompanyType = [];
        this.caResponsiblePremierOffice = [];
        this.caLifeCircle = [];
        this.caSuccessProbability = [];
        this.caReferrelFee = [];
        this.caTypeOffice = [];
        this.caCountry = [];
        this.caExperienceTeamCatalog = [];
        this.caDuration = [];
        this.caCurrency = [];
        this.relo = [];
        this.immi = [];
        this.reloTemp = [];
        this.immiTemp = [];
        this.caCliente = [];
        this.lead_client = {};
        this.filterC = { name: "" };
        this.loader = new loader_1.LoaderComponent();
        this.ELEMENT_DATA = [{
                position: 1,
                name: 'Hydrogen',
                weight: 1.0079,
                symbol: 'H'
            },
            {
                position: 2,
                name: 'Helium',
                weight: 4.0026,
                symbol: 'He'
            },
            {
                position: 3,
                name: 'Lithium',
                weight: 6.941,
                symbol: 'Li'
            },
            {
                position: 4,
                name: 'Beryllium',
                weight: 9.0122,
                symbol: 'Be'
            },
            {
                position: 5,
                name: 'Boron',
                weight: 10.811,
                symbol: 'B'
            }
        ];
        this.cuatro = ['uno', 'dos', 'tres', 'cuatro'];
        this.cinco = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];
        this.seis = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'];
        this.siete = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete'];
        this.ocho = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho'];
        this.dataSource = new table_1.MatTableDataSource(this.ELEMENT_DATA);
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
        this.ca_industry = [];
        this.assignedTo = [];
        this.service_type_ = 1;
        //////////////////////////////////////////////////////////////////////////////////////
        //Save
        this.type = false;
        this.office = false;
        this.name = false;
        this.comType = false;
    }
    NewPartnerClientComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
    };
    NewPartnerClientComponent.prototype.consultaPermisos = function () {
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
    NewPartnerClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaPermisos();
        // this.ServiceLine(1);
        console.log(this.rutaActiva.snapshot.routeConfig.path);
        this.catalogos();
        this.partnert = (this.rutaActiva.snapshot.routeConfig.path == "partner_client/:id") ? true : false;
        this.lead = (this.rutaActiva.snapshot.routeConfig.path == "lead/:id") ? true : false;
        this._services.service_general_get_noapi('GetClientPartnerProfileCatalog').subscribe(function (r) {
            if (r.success) {
                _this.caCliente = r.result.value;
            }
        });
        if (this.rutaActiva.snapshot.params.id == 'new') {
            if (localStorage.getItem('user') == 'userClient') {
                this.lead_client.idTypePartnerClientProfile = 2;
                this.lead_client.name = (localStorage.getItem('name'));
                localStorage.removeItem('user');
                localStorage.removeItem('name');
            }
            this.lead_client.partnerClientSince = new Date();
            this.lead_client.id = 0;
            this.lead_client.generalContractPricingInfos = [];
            this.lead_client.activityLogs = [];
            this.lead_client.termsDeals = [];
            this.lead_client.officeInformations = [];
            this.lead_client.clientPartnerProfileClientIdClientFromNavigations = [];
            this.lead_client.documentClientPartnerProfiles = [];
            this.lead_client.serviceLocations = [];
            this.lead_client.serviceScoreAwards = [];
            this.lead_client.clientPartnerProfileExperienceTeams = [];
        }
        else {
            this.loader.showLoader();
            this._services.service_general_get_noapi('GetClientPartnerProfileById?id=' + this.rutaActiva.snapshot.params.id).subscribe(function (r) {
                if (r.success) {
                    for (var i = 0; i < r.result.value.length; i++) {
                        var element = r.result.value[i];
                        if (element.id == _this.rutaActiva.snapshot.params.id) {
                            _this.lead_client = element;
                        }
                    }
                    _this.lead_client.clientPartnerProfileExperienceTeams = [];
                    _this.lead_client.documentClientPartnerProfiles = [];
                    _this.lead_client.serviceLocations = [];
                    _this.generalContractPricingInfos = new table_1.MatTableDataSource(_this.lead_client.generalContractPricingInfos);
                    _this.activityLogs = new table_1.MatTableDataSource(_this.lead_client.activityLogs);
                    _this.termsDeals = new table_1.MatTableDataSource(_this.lead_client.termsDeals);
                    _this.officeInformations = new table_1.MatTableDataSource(_this.lead_client.officeInformations);
                    _this.client = new table_1.MatTableDataSource(_this.lead_client.client);
                    if (_this.partnert) {
                        if (_this.lead_client.service_location.length > 0) {
                            _this.serviceLocationsimmi = new table_1.MatTableDataSource(_this.lead_client.service_location[0].immi);
                            _this.serviceLocationsrelo = new table_1.MatTableDataSource(_this.lead_client.service_location[0].relo);
                        }
                    }
                    _this.serviceScoreAwards = new table_1.MatTableDataSource(_this.lead_client.service_score_awards);
                    _this.contacts = new table_1.MatTableDataSource(_this.lead_client.contacts);
                    _this.contacts.sort = _this.sort;
                    if (_this.lead_client.experience_team.length > 0) {
                        _this.relo = _this.lead_client.experience_team[0].relo;
                        _this.immi = _this.lead_client.experience_team[0].immi;
                    }
                    if (_this.lead_client.photo != "" && _this.lead_client.photo != null) {
                        document.getElementById('lead_client_avatar').setAttribute('src', _this._services.url_images + _this.lead_client.photo);
                    }
                    console.log(_this.lead_client);
                    _this.loader.hideLoader();
                }
            });
        }
    };
    NewPartnerClientComponent.prototype.goBack = function () {
        window.history.back();
    };
    NewPartnerClientComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.contacts.filter = filterValue.trim().toLowerCase();
    };
    NewPartnerClientComponent.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            var _this = this;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCompanyType')];
                    case 1:
                        _a.caCompanyType = _m.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetResponsiblePremierOffice')];
                    case 2:
                        _b.caResponsiblePremierOffice = _m.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLifeCircle')];
                    case 3:
                        _c.caLifeCircle = _m.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSuccessProbabilityRepository')];
                    case 4:
                        _d.caSuccessProbability = _m.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetReferrelFee')];
                    case 5:
                        _e.caReferrelFee = _m.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTypeOffice')];
                    case 6:
                        _f.caTypeOffice = _m.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 7:
                        _g.caCountry = _m.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentRecurrence')];
                    case 8:
                        _h.caDuration = _m.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 9:
                        _j.caCurrency = _m.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetCataegoryByServiceLineId?serviceLineId=1")];
                    case 10:
                        _k.catalogService = _m.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 11:
                        _l.caserviceline = _m.sent();
                        // this.caExperienceTeamCatalog = await this._services.getCatalogueFrom('GetExperienceTeamCatalog/1');
                        //this.ca_industry = await this._services.getCatalogueFrom('GetIndustries');
                        this._services.service_general_get_noapi('GetExperienceTeamCatalog/1').subscribe(function (r) {
                            if (r.success) {
                                _this.caExperienceTeamCatalog = r.result.value;
                            }
                        });
                        this._services.service_general_get('Catalogue/GetIndustry').subscribe(function (r) {
                            if (r.success) {
                                _this.ca_industry = r.result;
                            }
                        });
                        this._services.service_general_get('Catalog/GetAllUsers?role=1').subscribe(function (r) {
                            if (r.success) {
                                _this.assignedTo = r.result.value;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // cataState(id: number) {
    //   console.log('id state', id );
    //   this.ccity = this._services.service_general_get(`Catalogue/GetState?country=${id}`);
    //   console.log('catalogo state', this.ccity)
    // }
    // getcity(idc: number) {
    //   // console.log('id city', idc);
    //   for (let i = 0; i < this.ccity.length; i++) {
    //     if (this.ccity[i].id == idc) {
    //       return this.ccity[i].GetCountry;
    //     }
    //   }
    // }
    NewPartnerClientComponent.prototype.getCountry = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].referralFee1;
            }
        }
    };
    NewPartnerClientComponent.prototype.ReferrelFee = function (id) {
        for (var i = 0; i < this.caReferrelFee.length; i++) {
            if (this.caReferrelFee[i].id == id) {
                return this.caReferrelFee[i].referralFee1;
            }
        }
    };
    NewPartnerClientComponent.prototype.ServiceLine = function (id) {
        for (var i = 0; i < this.catalogService.length; i++) {
            if (this.catalogService[i].id == id) {
                return this.catalogService[i].category;
            }
        }
    };
    NewPartnerClientComponent.prototype.serScoreType = function (id) {
        for (var i = 0; i < this.caserviceline.length; i++) {
            if (this.caserviceline[i].id == id) {
                return this.caserviceline[i].serviceLine;
            }
        }
    };
    NewPartnerClientComponent.prototype.officeType = function (id) {
        for (var i = 0; i < this.caTypeOffice.length; i++) {
            if (this.caTypeOffice[i].id == id) {
                return this.caTypeOffice[i].type;
            }
        }
    };
    NewPartnerClientComponent.prototype.getName = function (id) {
        for (var i = 0; i < this.caExperienceTeamCatalog.length; i++) {
            // const element = this.caExperienceTeamCatalog[i];
            if (this.caExperienceTeamCatalog[i].id == id) {
                return this.caExperienceTeamCatalog[i].name;
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //Activitie log
    NewPartnerClientComponent.prototype.activityLogDialog = function (data, i) {
        var _this = this;
        console.log(data, i);
        if (data == null) {
            data = {
                id: 0,
                action: "new"
            };
        }
        else {
            data.action = i;
        }
        var dialogRef = this.dialog.open(dialog_activity_log_component_1.DialogActivityLogComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                if (result.action == "new") {
                    result.idClientPartnerProfile = _this.lead_client.id;
                    _this.lead_client.activityLogs.push(result);
                }
                else {
                    _this.lead_client.activityLogs[result.action] = result;
                }
                console.log(_this.lead_client.activityLogs);
                _this.activityLogs = new table_1.MatTableDataSource(_this.lead_client.activityLogs);
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //contracts
    NewPartnerClientComponent.prototype.contractDialog = function (data, i) {
        var _this = this;
        console.log(data, i);
        if (data == null) {
            data = {
                id: 0,
                action: "new"
            };
        }
        else {
            data.action = i;
        }
        var dialogRef = this.dialog.open(dialog_contract_pricing_info_component_1.DialogContractPricingInfoComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.idClientPartnerProfile = _this.lead_client.id;
                if (result.action == "new") {
                    if (_this.lead_client.id == 0) {
                        _this.lead_client.generalContractPricingInfos.push(result);
                    }
                    else {
                        console.log(JSON.stringify(result));
                        _this.loader.showLoader();
                        _this._services.service_general_putnoapi('AddGeneralContractPricingInfo', result).subscribe(function (r) {
                            if (r.success) {
                                _this.loader.hideLoader();
                                var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Inserted data"
                                    },
                                    width: "350px"
                                });
                                _this.ngOnInit();
                            }
                        });
                    }
                }
                else {
                    if (_this.lead_client == 0) {
                        _this.lead_client.generalContractPricingInfos[result.action] = result;
                    }
                    else {
                        _this.loader.showLoader();
                        _this._services.service_general_putnoapi('UpdateGeneralContractPricingInfo', result).subscribe(function (r) {
                            if (r.success) {
                                _this.loader.hideLoader();
                                var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Updated data"
                                    },
                                    width: "350px"
                                });
                                _this.ngOnInit();
                            }
                        });
                    }
                }
                console.log(_this.lead_client.generalContractPricingInfos);
                _this.generalContractPricingInfos = new table_1.MatTableDataSource(_this.lead_client.generalContractPricingInfos);
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //terms of the deal
    NewPartnerClientComponent.prototype.dealogTermsoftheDeal = function (data, i) {
        var _this = this;
        console.log(data, i);
        if (data == null) {
            data = {
                id: 0,
                action: "new"
            };
        }
        else {
            data.action = i;
        }
        var dialogRef = this.dialog.open(dialog_terms_of_the_deal_component_1.DialogTermsOfTheDealComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                if (result.action == "new") {
                    result.idClientPartnerProfile = _this.lead_client.id;
                    _this.lead_client.termsDeals.push(result);
                }
                else {
                    _this.lead_client.termsDeals[result.action] = result;
                }
                console.log(_this.lead_client.termsDeals);
                _this.termsDeals = new table_1.MatTableDataSource(_this.lead_client.termsDeals);
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //edit contacts
    NewPartnerClientComponent.prototype.editcontact = function (data) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_contacts_component_1.DialogContactsComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this.loader.showLoader();
                _this._services.service_general_putnoapi('UpdateOfficeContact', result).subscribe(function (r) {
                    console.log(r);
                    if (r.success) {
                        _this.loader.hideLoader();
                        var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Update data"
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                });
            }
        });
    };
    NewPartnerClientComponent.prototype.getstate = function (id) {
        var _this = this;
        this.ccity = [];
        this._services.service_general_get("Catalogue/GetState?country=" + id).subscribe(function (data) {
            if (data.success) {
                _this.ccity = data.result;
                console.log("catalogo de city " + _this.ccity);
                for (var i = 0; i < _this.ccity.length; i++) {
                    if (_this.ccity[i].id == id) {
                        var city = _this.ccity[i].city;
                        _this.lead_client.officeInformations[0]["city"] = city;
                        // this.lead_client.officeInformations.push(city);
                        console.log('push city', _this.lead_client.officeInformations);
                    }
                }
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //office information
    NewPartnerClientComponent.prototype.dialogOfficeInformation = function (data, i) {
        var _this = this;
        console.log(data, i);
        if (data == null) {
            data = {
                id: 0,
                action: "new"
            };
        }
        else {
            data.action = i;
        }
        var dialogRef = this.dialog.open(dialog_office_information_component_1.DialogOfficeInformationComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                // console.log('resp office', result);
                result.idClientPartnerProfile = _this.lead_client.id;
                if (result.action == "new") {
                    if (_this.lead_client.id == 0) {
                        _this.lead_client.officeInformations.push(result);
                        _this.getstate(_this.lead_client.officeInformations[0].idCity);
                        console.log('inf oficina', _this.lead_client.officeInformations);
                    }
                    else {
                        console.log(JSON.stringify(result));
                        _this.loader.showLoader();
                        _this._services.service_general_putnoapi('AddOfficeInformation', result).subscribe(function (r) {
                            if (r.success) {
                                console.log("REGISTRO GUARDADO: ", r);
                                _this.loader.hideLoader();
                                var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Inserted data"
                                    },
                                    width: "350px"
                                });
                                _this.ngOnInit();
                            }
                        });
                    }
                }
                else {
                    if (_this.lead_client.id == 0) {
                        _this.lead_client.officeInformations[i] = result;
                    }
                    else {
                        _this.loader.showLoader();
                        _this._services.service_general_putnoapi('UpdateOfficeInformation', result).subscribe(function (r) {
                            if (r.success) {
                                console.log("REGISTRO ACTUALIZADO OFFICE: ", r);
                                _this.loader.hideLoader();
                                var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Update data"
                                    },
                                    width: "350px"
                                });
                                _this.ngOnInit();
                            }
                        });
                    }
                }
                // console.log(this.lead_client.officeInformations);
                _this.officeInformations = new table_1.MatTableDataSource(_this.lead_client.officeInformations);
                // this.cataState(this.officeInformations.data[0].idCountry);
                console.log(_this.officeInformations);
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //Documents
    NewPartnerClientComponent.prototype.DialogDocumentsLeadClientComponent = function (data) {
        var _this = this;
        if (data == null) {
            data = {
                id: 0
            };
        }
        // data.status = true;
        var dialogRef = this.dialog.open(dialog_documents_lead_client_component_1.DialogDocumentsLeadClientComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.comments = "";
                result.description = result.description;
                result.id = 0;
                result.uploadDate = result.updateDate;
                result.idClientPartnerProfile = _this.lead_client.id;
                if (_this.rutaActiva.snapshot.params.id == "new") {
                    result.updateDate = new Date();
                    console.log(result);
                    _this.lead_client.documentClientPartnerProfiles.push(result);
                }
                else {
                    _this.loader.showLoader();
                    _this._services.service_general_putnoapi('AddDocumentClientPartnerProfile', result).subscribe(function (r) {
                        if (r.success) {
                            _this.loader.hideLoader();
                            var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Inserted data"
                                },
                                width: "350px"
                            });
                            _this.ngOnInit();
                        }
                    });
                }
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //delete client
    NewPartnerClientComponent.prototype.deleteDocument = function (id, i) {
        var _this = this;
        var dialogRef = this.dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete document?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                if (id == 0) {
                    _this.lead_client.documentClientPartnerProfiles.splice(i, 1);
                }
                else {
                    _this.loader.showLoader();
                    _this._services.service_general_deleteno_api("DeleteDocumentClientPartnerProfile?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            _this.loader.hideLoader();
                            var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Client document"
                                },
                                width: "350px"
                            });
                            _this.ngOnInit();
                        }
                    }));
                }
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //score awards
    NewPartnerClientComponent.prototype.DialogScoreAwards = function (data, i) {
        var _this = this;
        console.log(data, i);
        if (data == null) {
            data = {
                id: 0,
                action: "new"
            };
        }
        else {
            data.action = i;
        }
        var dialogRef = this.dialog.open(dialog_score_awads_component_1.DialogScoreAwadsComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.idClientPartnerProfile = _this.lead_client.id;
                if (result.action == "new") {
                    if (_this.lead_client.id == 0) {
                        _this.lead_client.serviceScoreAwards.push(result);
                    }
                    else {
                        _this.loader.showLoader();
                        _this._services.service_general_putnoapi('AddServiceScoreAward', result).subscribe(function (r) {
                            if (r.success) {
                                var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Inserted data"
                                    },
                                    width: "350px"
                                });
                                _this.loader.hideLoader();
                                _this.ngOnInit();
                            }
                        });
                    }
                }
                else {
                    if (_this.lead_client.id == 0) {
                        _this.lead_client.serviceScoreAwards[result.action] = result;
                    }
                    else {
                        _this.loader.showLoader();
                        _this._services.service_general_putnoapi('UpdateServiceScoreAward', result).subscribe(function (r) {
                            if (r.success) {
                                var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Update data"
                                    },
                                    width: "350px"
                                });
                                _this.loader.hideLoader();
                                _this.ngOnInit();
                            }
                        });
                    }
                }
                console.log(_this.lead_client.serviceScoreAwards);
                _this.serviceScoreAwards = new table_1.MatTableDataSource(_this.lead_client.serviceScoreAwards);
            }
        });
    };
    NewPartnerClientComponent.prototype.Line = function (param) {
        console.log(param);
        if (param.index == 0) {
            this.service_type_ = 1;
        }
        else {
            this.service_type_ = 2;
        }
        //this.service_type_ = param;
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //office information
    NewPartnerClientComponent.prototype.dialogService = function (data, i) {
        var _this = this;
        console.log(data, i);
        if (data == null) {
            data = {
                id: 0,
                sl: this.service_type_,
                action: "new"
            };
        }
        else {
            data.sl = this.service_type_,
                data.action = i;
        }
        var dialogRef = this.dialog.open(dialog_add_service_component_1.DialogAddServiceComponent, {
            data: data,
            width: '90%'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                debugger;
                result.idClientPartnerProfile = _this.lead_client.id;
                if (result.action == "new") {
                    if (_this.lead_client.id == 0) {
                        _this.lead_client.serviceLocations.push(result);
                    }
                    else {
                        _this.loader.showLoader();
                        console.log(JSON.stringify(result));
                        _this._services.service_general_putnoapi('AddServiceLocation', result).subscribe(function (r) {
                            if (r.success) {
                                console.log(r);
                                var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Inserted data"
                                    },
                                    width: "350px"
                                });
                                _this.loader.hideLoader();
                                _this.ngOnInit();
                            }
                        });
                    }
                }
                else {
                    if (_this.lead_client.id == 0) {
                        _this.lead_client.serviceLocations[result.action] = result;
                    }
                    else {
                        console.log("DATA A ACTUALIZAR: ", result);
                        console.log(JSON.stringify(result));
                        _this._services.service_general_putnoapi('UpdateServiceLocation', result).subscribe(function (r) {
                            if (r.success) {
                                var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                    data: {
                                        header: "Success",
                                        body: "Update data"
                                    },
                                    width: "350px"
                                });
                                _this.loader.hideLoader();
                                _this.ngOnInit();
                            }
                        });
                    }
                }
                console.log(_this.lead_client.serviceLocations);
                var immi = [];
                var relo = [];
                for (var i_1 = 0; i_1 < _this.lead_client.serviceLocations.length; i_1++) {
                    var element = _this.lead_client.serviceLocations[i_1];
                    if (element.idServiceLine == 1) {
                        immi.push(element);
                    }
                    else {
                        relo.push(element);
                    }
                }
                _this.serviceLocationsimmi = new table_1.MatTableDataSource(immi);
                _this.serviceLocationsrelo = new table_1.MatTableDataSource(relo);
                _this.serviceLocations = new table_1.MatTableDataSource(_this.lead_client.serviceLocations);
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //client
    NewPartnerClientComponent.prototype.dialogExperienceTeam = function (serviceLine) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_experiens_team_component_1.DialogExperiensTeamComponent, {
            data: {
                id: 0,
                idServiceLine: serviceLine,
                idClientPartnerProfile: this.lead_client.id,
                ruta: this.rutaActiva.snapshot.params.id
            },
            width: '350px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.idClientPartnerProfile = _this.lead_client.id;
                //this.lead_client.clientPartnerProfileExperienceTeams.push(result);
                if (result.idServiceLine == 1) {
                    _this.immiTemp.push(result);
                }
                else {
                    _this.reloTemp.push(result);
                }
                console.log(_this.reloTemp);
                console.log(_this.immiTemp);
            }
            if (result.listo) {
                _this.ngOnInit();
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //client
    NewPartnerClientComponent.prototype.dialogaddClient = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_add_client_component_1.DialogAddClientComponent, {
            width: '350px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.success) {
                result.id = 0;
                result.idClientFrom = _this.lead_client.id;
                if (_this.rutaActiva.snapshot.params.id == "new") {
                    _this.lead_client.clientPartnerProfileClientIdClientFromNavigations.push(result);
                    console.log(_this.lead_client.clientPartnerProfileClientIdClientFromNavigations);
                }
                else {
                    _this.loader.showLoader();
                    _this._services.service_general_putnoapi('AddClientPartnerProfileClient', result).subscribe(function (r) {
                        if (r.success) {
                            _this.loader.hideLoader();
                            var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Inserted data"
                                },
                                width: "350px"
                            });
                            _this.ngOnInit();
                        }
                    });
                }
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //delete client
    NewPartnerClientComponent.prototype.deletecliente = function (id, i) {
        var _this = this;
        var dialogRef = this.dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete client?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                if (id == 0) {
                    _this.lead_client.clientPartnerProfileClientIdClientFromNavigations.splice(i, 1);
                }
                else {
                    _this._services.service_general_deleteno_api("DeleteClientPartnerProfileClient?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Client deleted"
                                },
                                width: "350px"
                            });
                            _this.ngOnInit();
                        }
                    }));
                }
            }
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //image
    NewPartnerClientComponent.prototype.img = function (event) {
        var _this = this;
        console.log(event);
        var file = event.target.files[0];
        var ext = event.target.files[0].type.split('/');
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader);
            var encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            _this.lead_client.photo = encoded;
            _this.lead_client.photoExtension = ext[1];
            document.getElementById('lead_client_avatar').setAttribute('src', '' + reader.result);
        };
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //Delete experience team
    NewPartnerClientComponent.prototype.deletExperienceTeam = function (id, i, sl) {
        var _this = this;
        var dialogRef = this.dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete user experience team?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                if (id == 0) {
                    if (sl == 1) {
                        _this.immiTemp.splice(i, 1);
                    }
                    else {
                        _this.reloTemp.splice(i, 1);
                    }
                }
                else {
                    _this._services.service_general_deleteno_api("DeleteClientPartnerProfile?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "User experience team deleted"
                                },
                                width: "350px"
                            });
                            _this.ngOnInit();
                        }
                    }));
                }
            }
        });
    };
    NewPartnerClientComponent.prototype.save = function () {
        var _this = this;
        if (this.lead_client.idTypePartnerClientProfile == undefined ||
            this.lead_client.idTypePartnerClientProfile == '' ||
            this.lead_client.idTypePartnerClientProfile == null) {
            this.type = true;
        }
        if (this.lead_client.name == undefined ||
            this.lead_client.name == '' ||
            this.lead_client.name == null) {
            this.name = true;
        }
        if (this.lead_client.idCompanyType == undefined ||
            this.lead_client.idCompanyType == '' ||
            this.lead_client.idCompanyType == null) {
            this.comType = true;
        }
        if (this.comType || this.name || this.type) {
            console.log(this.type, this.name, this.comType, this.office);
            window.scrollTo(0, 0);
            return false;
        }
        if (this.lead_client.officeInformations.length == 0) {
            window.scrollTo(0, 350);
            this.office = true;
            var dialog = this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Office",
                    body: "Required a office"
                },
                width: "350px"
            });
            return false;
        }
        else {
            this.office = false;
        }
        if (this.partnert && this.rutaActiva.snapshot.params.id == "new") {
            console.log('nuevo partner');
            for (var i = 0; i < this.immiTemp.length; i++) {
                var element = this.immiTemp[i];
                this.lead_client.clientPartnerProfileExperienceTeams.push(element);
            }
            for (var i = 0; i < this.reloTemp.length; i++) {
                var element = this.reloTemp[i];
                this.lead_client.clientPartnerProfileExperienceTeams.push(element);
            }
            this.loader.showLoader();
            this.lead_client.idLifeCircle = 4;
            console.log(JSON.stringify(this.lead_client));
            this._services.service_general_post_with_urlnoapi('AddClientPartnerProfile', this.lead_client).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    console.log("REGISTRO GUARDADO PARTNER PROFILE: ", r);
                    _this.loader.hideLoader();
                    //this.router.navigateByUrl('/partner_client/' + r.result.id);
                    _this.router.navigateByUrl('/partner');
                    var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Inserted data"
                        },
                        width: "350px"
                    });
                    //this.ngOnInit();
                }
            });
        }
        else if (this.partnert && this.rutaActiva.snapshot.params.id != "new") {
            console.log('edit partner');
            this.lead_client.idLifeCircle = 4;
            this._services.service_general_putnoapi('UpdateClientPartnerProfile', this.lead_client).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    console.log("REGISTRO ACTUALIZADO PARTNER PROFILE: ", r);
                    var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Updated data"
                        },
                        width: "350px"
                    });
                    _this.ngOnInit();
                    _this.loader.hideLoader();
                }
            });
        }
        else if (this.lead && this.rutaActiva.snapshot.params.id == 'new') {
            this._services.service_general_post_with_urlnoapi('AddClientPartnerProfile', this.lead_client).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    console.log("REGISTRO GUARDADO PARTNER PROFILE: ", r);
                    _this.loader.hideLoader();
                    var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Inserted data"
                        },
                        width: "350px"
                    });
                    _this.router.navigateByUrl('/leads');
                }
            });
        }
        else if (this.lead && this.rutaActiva.snapshot.params.id != 'new') {
            console.log('edit lead');
            this._services.service_general_putnoapi('UpdateClientPartnerProfile', this.lead_client).subscribe(function (r) {
                console.log("REGISTRO ACTUALIZADO PARTNER PROFILE: ", r);
                if (r.success) {
                    var dialog = _this.dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Update data"
                        },
                        width: "350px"
                    });
                    _this.loader.hideLoader();
                }
            });
        }
        console.log(JSON.stringify(this.lead_client));
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], NewPartnerClientComponent.prototype, "sort");
    NewPartnerClientComponent = __decorate([
        core_1.Component({
            selector: 'app-new-partner-client',
            templateUrl: './new-partner-client.component.html',
            styleUrls: ['./new-partner-client.component.scss']
        })
    ], NewPartnerClientComponent);
    return NewPartnerClientComponent;
}());
exports.NewPartnerClientComponent = NewPartnerClientComponent;
