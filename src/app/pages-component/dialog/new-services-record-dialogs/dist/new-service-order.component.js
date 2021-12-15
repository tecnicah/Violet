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
exports.NewServiceOrderDialog = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var dialog_general_confirmation_component_1 = require("../dialog-general-confirmation/dialog-general-confirmation.component");
var NewServiceOrderDialog = /** @class */ (function () {
    function NewServiceOrderDialog(dialogRef, _services, _routerParams, data, _dialog, router) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.data = data;
        this._dialog = _dialog;
        this.router = router;
        this.disable = false;
        this.at = true;
        this.gt = false;
        this.standalone_table_columns = ['cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9', 'cam_10'];
        this.package_services = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5', 'campo_6', 'campo_7'];
        this.loader = new loader_1.LoaderComponent();
        this.standalone_table_content = [
            {
                deliver_to: 'Example',
                deliver_in: 'Example',
                service_nu: 'Example',
                location: 'Example',
                accept_date: 'Example',
                autho_time: 'Example',
                projected_fee: 'Example'
            }
        ];
        this.service_order_line = [];
        this.is_editing = false;
        this.main_fields_fill = false;
        this.yesterday_today = null;
        this.is_new_sr = false;
        this.user = {};
        this.service_bundle = new BundledServices();
        this.show_standalone = false;
        this.show_standalone2 = false;
        this.serviceline_catalogue = [];
        this.deliverto_catalogue = [];
        this.deliverin_catalogue = [];
        this.city_catalogue = [];
        this.deliverin = [];
        this.location_city = [];
        this.location_cityWork = [];
        this.category = [];
        this.category_ = [];
        this.category_catalogue = [];
        this.services_catalogue = [];
        this.services_catalogue_pack = [];
        this.service_order = new ServiceOrderModel();
        this.work_order = new WorkOrder();
        this.service_stanalone = new SOrderServicesModel();
        this.service_package = new SOrderServicesModel(2);
        this.package_global = new PackageGeneralData();
        this.standalone_work = new StandaloneServiceWorkOrders();
        this.tables_for_bundles = [];
        this.show_bform_errors = false;
        this.table_standalone = null;
        this.table_packages = null;
        this.table_standalone_content = null;
        this.table_package_content = null;
        this.wo_standalone_table = [];
        this.main_data_form = {
            no_date: false,
            no_line: false
        };
        this.show_bundle_error = false;
        this.salon_form_valdator = {
            no_deto: false,
            no_dein: false,
            no_cate: false,
            no_serv: false,
            no_prof: false,
            no_auto: false,
            no_loca: false
        };
        this.package_general_form = {
            no_time: false,
            no_fee: false,
            no_deto: false,
            no_dein: false,
            no_serv: false,
            no_cate: false,
            no_date: false,
            no_loca: false
        };
        this.set_my_self = false;
        this.summary_total = ['cam_0'];
        this.summary_fee = ['cam_0', 'cam_1', 'cam_2'];
        this.summary_table_data = undefined;
        this.atleast_one_service = false;
        dialogRef.disableClose = true;
    }
    NewServiceOrderDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem("userData"));
        this.getCatalogues();
        console.log(this.data);
        var today = new Date();
        this.yesterday_today = today;
        if (this.data.new_sr)
            this.is_new_sr = true;
        if (this.data.id_so != null) {
            this.loader.showLoader();
            this.is_editing = true;
            this.main_fields_fill = true;
            this._services.service_general_get("ServiceOrder/GetOrderById?so=" + this.data.id_so)
                .subscribe(function (response) {
                if (response.success) {
                    var root_res = response.result.value;
                    _this.work_order = root_res.workOrder;
                    _this.requestCatalogueCategory(_this.work_order.serviceLineId);
                    _this.initSummaryTable();
                    setTimeout(function () {
                        _this.setDeliverToFixed();
                        _this.createWOTableContent();
                        _this.createTablesForBundles();
                        _this.loader.hideLoader();
                    }, 777);
                }
            }, function (error) {
                console.error('Error (ServiceOrder/GetOrderById)', error);
            });
        }
    };
    NewServiceOrderDialog.prototype.validatingMainFields = function () {
        this.work_order.createdDate != '' && this.work_order.serviceLineId != '' ?
            this.main_fields_fill = true : this.main_fields_fill = false;
        //if( this.is_new_sr ) {
        this.work_order.createdBy = this.data.id_user;
        this.work_order.creationDate = new Date();
        //}
        this.work_order.serviceRecordId = this.data.id_sr;
        this.work_order.updateBy = this.data.id_user;
        this.work_order.updatedDate = new Date();
    };
    NewServiceOrderDialog.prototype.resetFieldSelected = function (field_in) {
        var find_field = document.getElementsByClassName(field_in);
        setTimeout(function () {
            for (var index = 0; index < find_field.length; index += 1) {
                find_field[index].value = '';
            }
        }, 222);
    };
    NewServiceOrderDialog.prototype.getDeliverIn = function (id) {
        // 3
        if (this.deliverin[0].idCountryHome == id) {
            return this.deliverin[0].countryHomeName;
        }
        else if (this.deliverin[0].idCountryHost == id) {
            return this.deliverin[0].countryHostName;
        }
    };
    NewServiceOrderDialog.prototype.showPackagesServices = function (index) {
        if (index === void 0) { index = null; }
        var bundle_container_b = document.getElementsByClassName('bundle_container_b'), bunble_container_p = document.getElementsByClassName('bunble_container_p');
        for (var bundles = bundle_container_b.length; bundles--;) {
            bundle_container_b[bundles].classList.remove('display-none');
            bunble_container_p[bundles].classList.add('display-none');
        }
        if (index != null) {
            var bundle_button = document.getElementById("bundle_button_" + index), bundle_container = document.getElementById("bundle_container_" + index);
            if (!bundle_button.classList.contains('display-none')) {
                bundle_button.classList.add('display-none');
                bundle_container.classList.remove('display-none');
            }
            else {
                bundle_button.classList.remove('display-none');
                bundle_container.classList.add('display-none');
            }
            this.show_bform_errors = false;
        }
    };
    NewServiceOrderDialog.prototype.showStandAlone = function () {
        !this.show_standalone ?
            this.show_standalone = true :
            this.show_standalone = false;
    };
    NewServiceOrderDialog.prototype.showStandAlone2 = function () {
        !this.show_standalone2 ?
            this.show_standalone2 = true :
            this.show_standalone2 = false;
    };
    NewServiceOrderDialog.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    NewServiceOrderDialog.prototype.cordination = function (e, element) {
        if (e.checked) {
            this.at = true;
            this.service_stanalone.authoTime = "0";
            element.authoTime = "0";
        }
        else {
            this.at = false;
            this.service_stanalone.authoTime = "";
        }
    };
    NewServiceOrderDialog.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b, _c, dependets_created;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        _a.serviceline_catalogue = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDelivired')];
                    case 2:
                        _b.deliverin_catalogue = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCity')];
                    case 3:
                        _c.city_catalogue = _d.sent();
                        if (!this.data.new_sr) {
                            this.work_order.createdDate = new Date();
                            this._services.service_general_get("ServiceRecord/GetCountryByServiceRecord/" + this.data.id_sr)
                                .subscribe(function (response) {
                                _this.deliverin = response.country.value;
                                console.log(_this.deliverin);
                            });
                            this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.id_sr)
                                .subscribe(function (response) {
                                if (response.success) {
                                    _this.deliverto_catalogue = response.applicant.value;
                                    if (_this.data.new_sr_data.immigrationCoodinators.length > 0 && _this.data.new_sr_data.relocationCoordinators.length == 0) {
                                        _this.work_order.serviceLineId = 1;
                                        _this.disable = true;
                                        _this.work_order.createdDate = new Date();
                                        _this.requestCatalogueCategory(1);
                                        _this.validatingMainFields();
                                        _this.setDeliverToFixed();
                                    }
                                    else if (_this.data.new_sr_data.relocationCoordinators.length > 0 && _this.data.new_sr_data.immigrationCoodinators.length == 0) {
                                        _this.work_order.serviceLineId = 2;
                                        _this.disable = true;
                                        _this.work_order.createdDate = new Date();
                                        _this.requestCatalogueCategory(2);
                                        _this.validatingMainFields();
                                        _this.setDeliverToFixed();
                                    }
                                }
                            }, function (error) {
                                console.error('Error (GetApplicant) => ', error);
                            });
                        }
                        else {
                            dependets_created = this.data.new_sr_data.assigneeInformations[0].dependentInformations;
                            dependets_created.forEach(function (dependent) {
                                var new_dependent = new DeliverToCatalogueModel();
                                new_dependent.name = dependent.name;
                                new_dependent.relationship = dependent.name;
                                _this.deliverto_catalogue.push(new_dependent);
                            });
                        }
                        this.handleItemsLoaderStageOne();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewServiceOrderDialog.prototype.getLocation = function () {
        var _this = this;
        this.location_city = [];
        this._services.service_general_get('Catalogue/GetState?country=' + this.service_bundle.deliveringIn)
            .subscribe(function (response) {
            _this.location_city = response.result;
            console.log(_this.location_city);
        });
    };
    NewServiceOrderDialog.prototype.getLocationWork = function () {
        var _this = this;
        this.location_cityWork = [];
        this._services.service_general_get('Catalogue/GetState?country=' + this.standalone_work.deliveringIn)
            .subscribe(function (response) {
            _this.location_cityWork = response.result;
            console.log(_this.location_cityWork);
        });
    };
    NewServiceOrderDialog.prototype.getCategory = function () {
        var _this = this;
        var partnerID = localStorage.getItem('partnerID');
        this._services.service_general_get('ServiceRecord/GetCategoryByCountry/' + this.standalone_work.deliveringIn + '/' + partnerID + '?IdserviceLine=' + this.work_order.serviceLineId)
            .subscribe(function (response) {
            console.log(response);
            _this.category = response.country.value;
        });
    };
    NewServiceOrderDialog.prototype.getCategory_ = function () {
        var _this = this;
        var partnerID = localStorage.getItem('partnerID');
        this._services.service_general_get('ServiceRecord/GetCategoryByCountry/' + this.service_bundle.deliveringIn + '/' + partnerID + '?IdserviceLine=' + this.work_order.serviceLineId)
            .subscribe(function (response) {
            console.log(response);
            _this.category_ = response.country.value;
        });
    };
    NewServiceOrderDialog.prototype.handleItemsLoaderStageOne = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.serviceline_catalogue.length == 0 &&
                _this.deliverin_catalogue.length == 0 &&
                _this.deliverto_catalogue == 0) {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Error Conection',
                        body: 'Some elements can not be loaded, solution working on the problem or you can try later'
                    }, width: '420px'
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    _this.getCatalogues();
                });
            }
        }, 777);
    };
    NewServiceOrderDialog.prototype.requestCatalogueCategory = function (id_selected) {
        return __awaiter(this, void 0, Promise, function () {
            var params, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = "?serviceLineId=" + id_selected;
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCataegoryByServiceLineId', params)];
                    case 1:
                        _a.category_catalogue = _b.sent();
                        if (id_selected == 1) {
                            this.gt = true;
                            this.package_global.global_time = "0";
                        }
                        else {
                            this.gt = false;
                            this.package_global.global_time = "";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NewServiceOrderDialog.prototype.requestServicesCatalogue = function (id_selected, form_selected) {
        return __awaiter(this, void 0, Promise, function () {
            var params, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        params = "?serviceCategoryId=" + id_selected;
                        _a = form_selected;
                        switch (_a) {
                            case 'stand': return [3 /*break*/, 1];
                            case 'pack': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceByCategoryId', params)];
                    case 2:
                        _b.services_catalogue = _d.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceByCategoryId', params)];
                    case 4:
                        _c.services_catalogue_pack = _d.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NewServiceOrderDialog.prototype.sendServiceRecordData = function () {
        var _this = this;
        var validations = {
            main: this.mainDataValidation(),
            bundles: this.bundlesMainValidation(),
            one_service: this.atleast_one_service
        };
        if (validations.main && validations.bundles && validations.one_service) {
            console.log(this.work_order);
            this._services.service_general_post_with_url('ServiceOrder/CreateOrder', this.work_order)
                .subscribe(function (response) {
                if (response.success) {
                    _this.hideModal();
                    _this.showGeneralMessageDialog('Work Order created', 'Work Order has been created successfully');
                    console.log(response);
                    _this.router.navigateByUrl('editServiceRecord/' + response.result.serviceRecordId);
                }
            }, function (error) {
                console.error('Error (ServiceOrder/CreateOrder) => ', error);
            });
        }
    };
    NewServiceOrderDialog.prototype.editServiceRecordData = function () {
        var _this = this;
        var validations = {
            main: this.mainDataValidation(),
            bundles: this.bundlesMainValidation(),
            one_service: this.atleast_one_service
        };
        console.log('Data Work order sent ====> ', this.work_order);
        if (validations.main && validations.bundles && validations.one_service) {
            this._services.service_general_put('ServiceOrder/UpdateOrder', this.work_order)
                .subscribe(function (response) {
                if (response.success) {
                    _this.hideModal();
                    _this.showGeneralMessageDialog('Work Order edited', 'Work Order has been edited successfully');
                }
            }, function (error) {
                console.error('Error (UpdateOrder)', error);
            });
        }
    };
    NewServiceOrderDialog.prototype.servicesSelectedNSR = function () {
        if (this.mainDataValidation()) {
            if (this.service_order.serviceOrderServices.length != 0) {
                this.dialogRef.close(this.service_order);
            }
            else {
                this.showGeneralMessageDialog('Work Orders', 'You must create one Work Order to continue');
            }
        }
    };
    NewServiceOrderDialog.prototype.addServiceToOrder = function (kind) {
        switch (kind) {
            case 'alone':
                if (this.standAloneFormValidator()) {
                    this.standalone_work.serviceTypeId = 1;
                    //if( this.is_new_sr ) {
                    this.standalone_work.createdBy = this.data.id_user;
                    this.standalone_work.createdDate = new Date();
                    //}
                    this.standalone_work.updateBy = this.data.id_user;
                    this.work_order.standaloneServiceWorkOrders.push(this.standalone_work);
                    this.standalone_work = new StandaloneServiceWorkOrders();
                    this.showStandAlone();
                    this.setDeliverToFixed();
                    this.createWOTableContent();
                    this.initSummaryTable();
                    this.workingTableData();
                    /*
                    this.service_order.serviceOrderServices.push( this.service_stanalone );
                    this.service_stanalone = new SOrderServicesModel();
                    */
                }
                break;
            case 'pack':
                if (this.packageFormValidator()) {
                    this.service_package.projectedFee = this.package_global.fee;
                    this.service_package.globalTime = Number(this.package_global.global_time);
                    this.service_order.serviceOrderServices.push(this.service_package);
                    this.service_package = new SOrderServicesModel(2);
                    this.setDeliverToFixed();
                }
                break;
        }
        this.createSOTableContent();
    };
    NewServiceOrderDialog.prototype.addNewBundle = function () {
        var new_bundle = new BundledServicesWorkOrders();
        this.work_order.bundledServicesWorkOrders.push(new_bundle);
    };
    NewServiceOrderDialog.prototype.addServiceToBundle = function (bundle_in) {
        if (this.bundleServiceComplete()) {
            //if( this.is_new_sr ) {
            this.service_bundle.createdBy = this.data.id_user;
            //}
            console.log("SERVICE BUNDLE");
            this.service_bundle.updateBy = this.data.id_user;
            this.service_bundle.serviceTypeId = this.work_order.serviceLineId;
            this.service_bundle.updatedDate = new Date();
            this.service_bundle.bundledServiceOrderId = bundle_in.id;
            console.log('data bundle', this.service_bundle);
            bundle_in.bundledServices.push(this.service_bundle);
            this.service_bundle = new BundledServices();
            this.showPackagesServices();
            this.createTablesForBundles();
            this.initSummaryTable();
        }
    };
    NewServiceOrderDialog.prototype.createTablesForBundles = function () {
        var _this = this;
        this.tables_for_bundles = [];
        this.work_order.bundledServicesWorkOrders.forEach(function (bundle) {
            //if( this.is_new_sr ) {
            bundle.createdBy = _this.data.id_user;
            bundle.createdDate = new Date();
            //}
            bundle.updateBy = _this.data.id_user;
            bundle.updatedDate = new Date();
            bundle.bundledServices.forEach(function (bundle) {
                bundle.deliverToText = _this.getValueFromCatalogue(_this.deliverto_catalogue, bundle.deliveredTo, 'name');
                bundle.deliverInText = _this.getValueFromCatalogue(_this.deliverin_catalogue, bundle.deliveringIn, 'serviceType');
                bundle.ser = _this.getValueFromCatalogue(_this.category_catalogue, bundle.categoryId, 'category');
            });
            _this.tables_for_bundles.push(new table_1.MatTableDataSource(bundle.bundledServices));
        });
    };
    NewServiceOrderDialog.prototype.bundleServiceComplete = function () {
        var result = true;
        this.show_bform_errors = true;
        if (this.service_bundle.deliveredTo == '')
            result = false;
        if (this.service_bundle.deliveringIn == '')
            result = false;
        if (this.service_bundle.categoryId == '')
            result = false;
        if (this.service_bundle.serviceId == '')
            result = false;
        if (this.service_bundle.autho == '')
            result = false;
        if (this.service_bundle.location == '')
            result = false;
        return result;
    };
    NewServiceOrderDialog.prototype.createSOTableContent = function () {
        var _this = this;
        this.table_standalone = this.service_order.serviceOrderServices.filter(function (service) {
            if (service.serviceTypeId == 1) {
                service.deliverToText = _this.getValueFromCatalogue(_this.deliverto_catalogue, service.deliveredTo, 'name');
                service.deliverInText = _this.getValueFromCatalogue(_this.deliverin_catalogue, service.deliveringIn, 'serviceType');
                service.ser = _this.getValueFromCatalogue(_this.category_catalogue, service.categoryId, 'category');
                /*service.serviceIdText = await this.getValueFromCatalogueAfter({
                    url: 'Catalogue/GetCataegoryByServiceLineId?id=' + this.service_order.serviceLineId,
                    match: service.serviceId,
                    field_to_find: 'supplierCompany',
                    id_index: 'id'
                });*/
                return service;
            }
        });
        this.table_packages = this.service_order.serviceOrderServices.filter(function (service) {
            if (service.serviceTypeId == 2) {
                service.deliverToText = _this.getValueFromCatalogue(_this.deliverto_catalogue, service.deliveredTo, 'name');
                service.deliverInText = _this.getValueFromCatalogue(_this.deliverin_catalogue, service.deliveringIn, 'serviceType');
                service.ser = _this.getValueFromCatalogue(_this.category_catalogue, service.categoryId, 'category');
                return service;
            }
        });
        this.table_standalone_content = new table_1.MatTableDataSource(this.table_standalone);
        this.table_package_content = new table_1.MatTableDataSource(this.table_packages);
        this.table_standalone_content.paginator = this.paginator;
        this.table_package_content.paginator = this.paginator;
    };
    NewServiceOrderDialog.prototype.createWOTableContent = function () {
        var _this = this;
        this.work_order.standaloneServiceWorkOrders.forEach(function (work) {
            work.deliverToText = _this.getValueFromCatalogue(_this.deliverto_catalogue, work.deliveredTo, 'name');
            work.deliverInText = _this.getValueFromCatalogue(_this.deliverin_catalogue, work.deliveringIn, 'serviceType');
            work.ser = _this.getValueFromCatalogue(_this.category_catalogue, work.categoryId, 'category');
        });
        this.workingTableData();
        console.log('this.work_order.standaloneServiceWorkOrders ===> ', this.work_order.standaloneServiceWorkOrders);
        this.wo_standalone_table = new table_1.MatTableDataSource(this.work_order.standaloneServiceWorkOrders);
        this.wo_standalone_table.paginator = this.paginator;
    };
    NewServiceOrderDialog.prototype.deleteThisService = function (id_temp, service) {
        var _this = this;
        if (this.is_editing) {
            if (service.local) {
                this.work_order.standaloneServiceWorkOrders.splice(id_temp, 1);
                this.createWOTableContent();
            }
            else {
                var params = "?id=" + service.id;
                this.loader.showLoader();
                this._services.service_general_delete("ServiceOrder/DeleteStandaloneServiceWorkOrder" + params)
                    .subscribe(function (response) {
                    if (!response.success) {
                        var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: 'Can not delete',
                                body: 'Service can not be deleted, please try again.'
                            }
                        });
                        dialogRef.afterClosed().subscribe(function (result) {
                        });
                    }
                    else {
                        _this.work_order.standaloneServiceWorkOrders.splice(id_temp, 1);
                        _this.createWOTableContent();
                    }
                    _this.loader.hideLoader();
                }, function (error) {
                    console.error('Error (DeleteStandaloneServiceWorkOrder) => ', error);
                    _this.loader.hideLoader();
                });
            }
        }
        else {
            this.work_order.standaloneServiceWorkOrders.splice(id_temp, 1);
            this.createWOTableContent();
        }
        this.initSummaryTable();
    };
    NewServiceOrderDialog.prototype.deleteThisServiceConfirmation = function (id_temp, service) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_general_confirmation_component_1.DialogGeneralConfirmation, {
            data: {
                header: 'Delete Standalone',
                body: 'Are you sure to delete this standalone?'
            },
            width: '420px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.can_delete) {
                _this.deleteThisService(id_temp, service);
            }
        });
    };
    NewServiceOrderDialog.prototype.workingTableData = function () {
        var temp_id = 0;
        this.work_order.standaloneServiceWorkOrders.forEach(function (service) {
            service.temp_id = temp_id;
            temp_id += 1;
        });
    };
    NewServiceOrderDialog.prototype.deleteThisBundle = function (bundle, service, index) {
        var _this = this;
        if (service.local) {
            bundle.bundledServices.splice(index, 1);
            this.createTablesForBundles();
        }
        else {
            var params = "?id=" + service.id;
            this.loader.showLoader();
            this._services.service_general_delete("ServiceOrder/DeleteBundledService" + params)
                .subscribe(function (response) {
                if (!response.success) {
                    var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: 'Can not delete',
                            body: 'Service can not be deleted, please try again.'
                        }
                    });
                    dialogRef.afterClosed().subscribe(function (result) {
                    });
                }
                else {
                    bundle.bundledServices.splice(index, 1);
                    _this.createTablesForBundles();
                }
                _this.loader.hideLoader();
            }, function (error) {
                console.error('Error (DeleteBundledService) => ', error);
            });
        }
        this.initSummaryTable();
    };
    NewServiceOrderDialog.prototype.deleteThisBundleConfirmation = function (bundle, service, index) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_general_confirmation_component_1.DialogGeneralConfirmation, {
            data: {
                header: 'Delete Bundle',
                body: 'Are you sure to delete this bundle?'
            }, width: '420px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.can_delete) {
                _this.deleteThisBundle(bundle, service, index);
            }
        });
    };
    NewServiceOrderDialog.prototype.mainDataValidation = function () {
        var result = true;
        this.work_order.createdDate == '' ?
            this.main_data_form.no_date = true : this.main_data_form.no_date = false;
        this.work_order.serviceLineId == '' ?
            this.main_data_form.no_line = true : this.main_data_form.no_line = false;
        for (var item in this.main_data_form) {
            if (this.main_data_form[item])
                result = false;
        }
        return result;
    };
    NewServiceOrderDialog.prototype.bundlesMainValidation = function () {
        var result = true;
        this.show_bundle_error = true;
        this.work_order.bundledServicesWorkOrders.forEach(function (bundle) {
            if (bundle.totalTime == '')
                result = false;
            if (bundle.projectedFee == '')
                result = false;
        });
        return result;
    };
    NewServiceOrderDialog.prototype.standAloneFormValidator = function () {
        var result = true;
        this.standalone_work.deliveredTo == '' ?
            this.salon_form_valdator.no_deto = true : this.salon_form_valdator.no_deto = false;
        this.standalone_work.deliveringIn == '' ?
            this.salon_form_valdator.no_dein = true : this.salon_form_valdator.no_dein = false;
        this.standalone_work.categoryId == '' ?
            this.salon_form_valdator.no_cate = true : this.salon_form_valdator.no_cate = false;
        this.standalone_work.serviceId == '' ?
            this.salon_form_valdator.no_serv = true : this.salon_form_valdator.no_serv = false;
        this.standalone_work.projectedFee == '' ?
            this.salon_form_valdator.no_prof = true : this.salon_form_valdator.no_prof = false;
        this.standalone_work.autho == '' ?
            this.salon_form_valdator.no_auto = true : this.salon_form_valdator.no_auto = false;
        this.standalone_work.location == '' ?
            this.salon_form_valdator.no_loca = true : this.salon_form_valdator.no_loca = false;
        for (var field in this.salon_form_valdator) {
            if (this.salon_form_valdator[field])
                result = false;
        }
        return result;
    };
    NewServiceOrderDialog.prototype.packageFormValidator = function () {
        var result = true;
        this.package_global.global_time == '' ?
            this.package_general_form.no_time = true : this.package_general_form.no_time = false;
        this.package_global.fee == null ?
            this.package_general_form.no_fee = true : this.package_general_form.no_fee = false;
        this.service_package.deliveredTo == '' ?
            this.package_general_form.no_deto = true : this.package_general_form.no_deto = false;
        this.service_package.deliveringIn == '' ?
            this.package_general_form.no_dein = true : this.package_general_form.no_dein = false;
        this.service_package.categoryId == '' ?
            this.package_general_form.no_cate = true : this.package_general_form.no_cate = false;
        this.service_package.serviceId == '' ?
            this.package_general_form.no_serv = true : this.package_general_form.no_serv = false;
        this.service_package.authoTime == '' ?
            this.package_general_form.no_date = true : this.package_general_form.no_date = false;
        this.service_package.location == '' ?
            this.package_general_form.no_loca = true : this.package_general_form.no_loca = false;
        for (var item in this.package_general_form) {
            if (this.package_general_form[item])
                result = false;
        }
        return result;
    };
    NewServiceOrderDialog.prototype.removeErrorLabel = function (input_value, object_data) {
        if (input_value == "" || input_value == null) {
            object_data.handler[object_data.field] = true;
        }
        else {
            object_data.handler[object_data.field] = false;
        }
    };
    NewServiceOrderDialog.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    NewServiceOrderDialog.prototype.getValueFromCatalogue = function (catalogue, id_to_find, field_to_find) {
        var result = '';
        catalogue.forEach(function (item) {
            if (item.id == id_to_find || item.dependentId == id_to_find) {
                result = item[field_to_find];
            }
        });
        return result;
    };
    NewServiceOrderDialog.prototype.getValueFromCatalogueAfter = function (settings) {
        var _this = this;
        var result = '';
        var get_result = new Promise(function (resolve) {
            _this._services.service_general_get(settings.url)
                .subscribe(function (response) {
                if (response.success) {
                    response.result.forEach(function (item) {
                        if (item[settings.id_index] == settings.match) {
                            result = item[settings.field_to_find];
                            resolve(result);
                        }
                    });
                }
            }, function (error) {
                console.error('Error (getValueFromCatalogueAfter)', error);
            });
        });
        return get_result.then(function (result) {
            return result;
        });
    };
    NewServiceOrderDialog.prototype.updateSOCoordination = function (element) {
        if (this.is_editing) {
            if (element.coordination) {
                element.coordination = false;
            }
            else {
                element.coordination = true;
                element.authoTime = 0;
            }
        }
    };
    NewServiceOrderDialog.prototype.showGeneralMessageDialog = function (title, body) {
        if (title === void 0) { title = ''; }
        if (body === void 0) { body = ''; }
        var dialogRef = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
            data: {
                header: title,
                body: body
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    NewServiceOrderDialog.prototype.getTodayDay = function () {
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
    NewServiceOrderDialog.prototype.setDeliverToFixed = function () {
        var _this = this;
        console.log('this.work_order.serviceLineId => ', this.work_order.serviceLineId);
        debugger;
        if (this.work_order.serviceLineId == '2') {
            this.set_my_self = true;
            this.deliverto_catalogue.forEach(function (dependent) {
                if (dependent.relationship) {
                    _this.standalone_work.deliveredTo = dependent.dependentId;
                    _this.service_bundle.deliveredTo = dependent.dependentId;
                }
            });
        }
        else {
            this.set_my_self = false;
            this.standalone_work.coordination = true;
            this.standalone_work.deliveredTo = '';
            this.service_bundle.deliveredTo = '';
        }
    };
    NewServiceOrderDialog.prototype.initSummaryTable = function () {
        var stand_alone_ser = this.work_order.standaloneServiceWorkOrders, bundles_ser = this.work_order.bundledServicesWorkOrders;
        var stand_alone_total = 0, bundles_total = 0, bundle_ser_count = 0;
        stand_alone_ser.forEach(function (service) {
            var cast_number = Number(service.projectedFee);
            stand_alone_total += cast_number;
        });
        bundles_ser.forEach(function (bundle) {
            var cast_number = Number(bundle.projectedFee);
            bundles_total += cast_number;
            bundle_ser_count += bundle.bundledServices.length;
        });
        var summary_data = [{
                total_services: stand_alone_ser.length + bundle_ser_count,
                standalone: stand_alone_total,
                bundled: bundles_total,
                global_fee: stand_alone_total + bundles_total
            }];
        if (summary_data[0].total_services == 0 || summary_data[0].total_services == undefined || summary_data[0].total_services == null) {
            this.atleast_one_service = false;
        }
        else if (summary_data[0].total_services > 0) {
            this.atleast_one_service = true;
        }
        this.summary_table_data = new table_1.MatTableDataSource(summary_data);
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], NewServiceOrderDialog.prototype, "paginator");
    NewServiceOrderDialog = __decorate([
        core_1.Component({
            selector: 'app-dialog-base-prueba',
            templateUrl: './new-service-order.component.html',
            styleUrls: []
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], NewServiceOrderDialog);
    return NewServiceOrderDialog;
}());
exports.NewServiceOrderDialog = NewServiceOrderDialog;
var ServiceOrderModel = /** @class */ (function () {
    function ServiceOrderModel() {
        this.id = 0;
        this.numberServerOrder = '';
        this.autho = '';
        this.serviceLineId = '';
        this.serviceRecordId = '';
        this.serviceOrderServices = [];
    }
    return ServiceOrderModel;
}());
var SOrderServicesModel = /** @class */ (function () {
    function SOrderServicesModel(service_type) {
        if (service_type === void 0) { service_type = 1; }
        this.id = 0;
        this.deliveredTo = '';
        this.deliveringIn = '';
        this.serviceId = '';
        this.serviceTypeId = 0;
        this.categoryId = '';
        this.location = '';
        this.acceptance = '01/01/1900';
        this.coordination = false;
        this.authoTime = '';
        this.globalTime = 0;
        this.projectedFee = null;
        this.serviceOrderId = 0;
        this.statusId = 2;
        this.createdBy = 0;
        this.createdDate = '';
        this.updateBy = 0;
        this.updatedDate = '';
        this.serviceTypeId = service_type;
    }
    return SOrderServicesModel;
}());
var PackageGeneralData = /** @class */ (function () {
    function PackageGeneralData() {
        this.global_time = '';
        this.fee = null;
    }
    return PackageGeneralData;
}());
var DeliverToCatalogueModel = /** @class */ (function () {
    function DeliverToCatalogueModel() {
        this.dependentId = 0;
        this.name = '';
        this.relationship = '';
        this.relationshipId = 0;
    }
    return DeliverToCatalogueModel;
}());
var WorkOrder = /** @class */ (function () {
    function WorkOrder() {
        this.id = 0;
        this.numberWorkOrder = '';
        this.creationDate = null;
        this.serviceLineId = '';
        this.serviceRecordId = 0;
        this.createdBy = 0;
        this.createdDate = '';
        this.updateBy = 0;
        this.updatedDate = new Date();
        this.standaloneServiceWorkOrders = [];
        this.bundledServicesWorkOrders = [];
    }
    return WorkOrder;
}());
var StandaloneServiceWorkOrders = /** @class */ (function () {
    function StandaloneServiceWorkOrders() {
        this.id = 0;
        this.serviceNumber = '';
        this.workOrderId = 0;
        this.deliveredTo = '';
        this.deliveringIn = '';
        this.serviceId = '';
        this.serviceTypeId = 0;
        this.location = '';
        this.categoryId = '';
        this.acceptance = null;
        this.coordination = false;
        this.authoTime = '0';
        this.autho = '';
        this.projectedFee = '';
        this.statusId = 2;
        this.createdBy = 0;
        this.createdDate = null;
        this.updateBy = '';
        this.updatedDate = new Date();
        this.workOrderServiceId = 0;
        this.workOrderService = { id: 0 };
        this.local = true;
    }
    return StandaloneServiceWorkOrders;
}());
var BundledServicesWorkOrders = /** @class */ (function () {
    function BundledServicesWorkOrders() {
        this.id = 0;
        this.workOrderId = 0;
        this.totalTime = '';
        this.projectedFee = '';
        this.package = false;
        this.createdBy = 0;
        this.createdDate = null;
        this.updateBy = 0;
        this.updatedDate = null;
        this.bundledServices = [];
    }
    return BundledServicesWorkOrders;
}());
var BundledServices = /** @class */ (function () {
    function BundledServices() {
        this.id = 0;
        this.serviceNumber = '';
        this.bundledServiceOrderId = 0;
        this.deliveredTo = '';
        this.deliveringIn = '';
        this.serviceId = '';
        this.serviceTypeId = '';
        this.categoryId = '';
        this.location = '';
        this.autho = '';
        this.acceptance = null;
        this.statusId = 2;
        this.createdBy = 0;
        this.createdDate = '';
        this.updateBy = 0;
        this.updatedDate = null;
        this.workServicesId = 0;
        this.workServices = { id: 0 };
        this.local = true;
    }
    return BundledServices;
}());
