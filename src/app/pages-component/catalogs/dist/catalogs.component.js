"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CatalogsComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var table_1 = require("@angular/material/table");
var dialog_catalog_currencies_component_1 = require("../dialog/dialog-catalog-currencies/dialog-catalog-currencies.component");
var dialog_catalog_languages_component_1 = require("../dialog/dialog-catalog-languages/dialog-catalog-languages.component");
var dialog_catalog_sex_component_1 = require("./../dialog/dialog-catalog-sex/dialog-catalog-sex.component");
var dialog_catalog_pet_type_component_1 = require("./../dialog/dialog-catalog-pet-type/dialog-catalog-pet-type.component");
var dialog_catalog_vehicle_type_component_1 = require("./../dialog/dialog-catalog-vehicle-type/dialog-catalog-vehicle-type.component");
var dialog_catalog_proficiency_component_1 = require("./../dialog/dialog-catalog-proficiency/dialog-catalog-proficiency.component");
var dialog_catalog_titles_component_1 = require("../dialog/dialog-catalog-titles/dialog-catalog-titles.component");
var dialog_catalog_education_level_component_1 = require("./../dialog/dialog-catalog-education-level/dialog-catalog-education-level.component");
var dialog_catalog_tax_percentage_component_1 = require("./../dialog/dialog-catalog-tax-percentage/dialog-catalog-tax-percentage.component");
var dialog_catalog_company_type_component_1 = require("./../dialog/dialog-catalog-company-type/dialog-catalog-company-type.component");
var dialog_catalog_relationship_component_1 = require("./../dialog/dialog-catalog-relationship/dialog-catalog-relationship.component");
var dialog_catalog_visa_category_component_1 = require("./../dialog/dialog-catalog-visa-category/dialog-catalog-visa-category.component");
var general_message_component_1 = require("./../dialog/general-message/general-message.component");
var general_confirmation_component_1 = require("./../dialog/general-confirmation/general-confirmation.component");
var dialog_catalog_privacy_component_1 = require("./../dialog/dialog-catalog-privacy/dialog-catalog-privacy.component");
var dialog_catalog_policy_component_1 = require("./../dialog/dialog-catalog-policy/dialog-catalog-policy.component");
var dialog_catalog_payment_responsibility_component_1 = require("./../dialog/dialog-catalog-payment-responsibility/dialog-catalog-payment-responsibility.component");
var dialog_catalog_partner_status_component_1 = require("./../dialog/dialog-catalog-partner-status/dialog-catalog-partner-status.component");
var dialog_catalog_coverage_type_component_1 = require("./../dialog/dialog-catalog-coverage-type/dialog-catalog-coverage-type.component");
var dialog_catalog_service_type_component_1 = require("./../dialog/dialog-catalog-service-type/dialog-catalog-service-type.component");
var dialog_catalog_transport_type_component_1 = require("./../dialog/dialog-catalog-transport-type/dialog-catalog-transport-type.component");
var dialog_catalog_coordinator_type_component_1 = require("./../dialog/dialog-catalog-coordinator-type/dialog-catalog-coordinator-type.component");
var dialog_catalog_notification_type_component_1 = require("./../dialog/dialog-catalog-notification-type/dialog-catalog-notification-type.component");
var dialog_catalog_document_type_component_1 = require("./../dialog/dialog-catalog-document-type/dialog-catalog-document-type.component");
var dialog_catalog_contact_type_component_1 = require("./../dialog/dialog-catalog-contact-type/dialog-catalog-contact-type.component");
var dialog_catalog_supplier_type_component_1 = require("./../dialog/dialog-catalog-supplier-type/dialog-catalog-supplier-type.component");
var dialog_catalog_clicles_component_1 = require("../dialog/dialog-catalog-clicles/dialog-catalog-clicles.component");
var dialog_catalog_breed_component_1 = require("./../dialog/dialog-catalog-breed/dialog-catalog-breed.component");
var CatalogsComponent = /** @class */ (function () {
    function CatalogsComponent(_services, _dialog, _router) {
        this._services = _services;
        this._dialog = _dialog;
        this._router = _router;
        // dataSourceUser: any = []
        this.displayedColumnsCurrencies = ['Currency', 'Abbreviation', 'Symbol', 'Action'];
        this.displayedColumnsLanguages = ['Language', 'Abbreviation', 'Action'];
        this.displayedColumnsSex = ['Sex', 'Action'];
        this.displayedColumnsTitles = ['Office', 'Section', 'Job Title', 'Action'];
        this.displayedColumnsCicles = ['Life Cicle', 'Action'];
        this.displayedColumnsPetType = ['petType', 'Action'];
        this.displayedColumnsVehicle = ['Type', 'Action'];
        this.displayedColumnsProficiency = ['Proficiency', 'Action'];
        this.displayedColumnsEducation = ['Education level', 'Action'];
        this.displayedColumnsTaxes = ['Taxe', 'Action'];
        this.displayedColumnsCompanyType = ['Company Type', 'Action'];
        this.displayedColumnsRelationship = ['Relationship', 'Action'];
        this.displayedColumnsVisa = ['Visa Category', 'Action'];
        this.displayedColumnsPrivacy = ['Privacy type', 'Action'];
        this.displayedColumnsPolicy = ['Policy type', 'Action'];
        this.displayedColumnsPayment = ['Responsible Payment', 'Action'];
        this.displayedColumnsPartner = ['Partner status', 'Action'];
        this.displayedColumnsCoverage = ['Coverage type', 'Action'];
        this.displayedColumnsServiceType = ['Service', 'Action'];
        this.displayedColumnsTransportType = ['Transport type', 'Action'];
        this.displayedColumnsCoordinator = ['Coordinator type', 'Action'];
        this.displayedColumnsNotification = ['Notification type', 'Action'];
        this.displayedColumnsDocument = ['Document type', 'Type', 'Action'];
        this.displayedColumnsContact = ['Contact type', 'Action'];
        this.displayedColumnsSupplier = ['Supplier type', 'Action'];
        this.displayedColumnsBreed = ['Breed', 'Pet type', 'Action'];
        // loader
        this.__loader__ = new loader_1.LoaderComponent();
        //*********************************************//
        this.permission_read = false;
        this.permission_write = false;
        this.permission_delete = false;
        this.permission_edit = false;
    }
    CatalogsComponent.prototype.ngOnInit = function () {
        this.__loader__.showLoader();
        this.selectCatalog('currencies');
        this.get_catalogos();
        this.consultaPermisos();
        this.__loader__.hideLoader();
    };
    CatalogsComponent.prototype.consultaPermisos = function () {
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
    // scroll
    CatalogsComponent.prototype.animateToTop = function (e) {
        e.preventDefault();
        var scrollToTop = window.setInterval(function () {
            var pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20);
            }
            else {
                window.clearInterval(scrollToTop);
            }
        }, 10);
    };
    CatalogsComponent.prototype.selectCatalog = function (catalog) {
        console.log('se eligio el catalogo', catalog);
        this.tableCatalog = catalog;
        this.get_catalogos();
    };
    CatalogsComponent.prototype.get_catalogos = function () {
        var _this = this;
        if (this.tableCatalog == 'currencies') {
            this.__loader__.showLoader();
            this._services.service_general_get('Catalog/GetAllCurrency').subscribe(function (r) {
                console.log('catalogo Currency', r);
                if (r.success) {
                    // this.dataCurrencies = r.result;
                    _this.dataCurrencies = new table_1.MatTableDataSource(r.result);
                    _this.dataCurrencies.paginator = _this.pagcurren;
                    _this.dataCurrencies.sort = _this.sortcurren;
                    // ++
                    document.getElementById('curr').className = "filterCard__card--active";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'languajes') {
            this.__loader__.showLoader();
            this._services.service_general_get('Catalog/GetAllLanguages').subscribe(function (rlenguage) {
                console.log('catalogo language', rlenguage);
                if (rlenguage.success) {
                    // this.dataLanguages = rlenguage.result;
                    _this.dataLanguages = new table_1.MatTableDataSource(rlenguage.result);
                    _this.dataLanguages.paginator = _this.paglang;
                    _this.dataLanguages.sort = _this.sortlang;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card--active";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'sex') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetSex').subscribe(function (rs) {
                console.log('catalogo sex', rs);
                if (rs.success) {
                    console.log('get sex', rs);
                    _this.dataCatalogSex = new table_1.MatTableDataSource(rs.result);
                    _this.dataCatalogSex.paginator = _this.pagSex;
                    _this.dataCatalogSex.sort = _this.sortSex;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card--active";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'jobTitles') {
            this.__loader__.showLoader();
            this._services.service_general_get('Catalog/GetAllTitle').subscribe(function (rTitle) {
                console.log('catalogo Title', rTitle);
                if (rTitle.success) {
                    // this.dataTitles = rTitle.result;
                    _this.dataTitles = new table_1.MatTableDataSource(rTitle.result);
                    _this.dataTitles.paginator = _this.pagtitle;
                    _this.dataTitles.sort = _this.sorttitle;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card--active";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'lifeCicles') {
            this.__loader__.showLoader();
            this._services.service_general_get('Catalog/GetAllLifeCricle').subscribe(function (rCircle) {
                console.log('catalogo circle', rCircle);
                if (rCircle.success) {
                    // this.dataCicles = rCircle.result;
                    _this.dataCicles = new table_1.MatTableDataSource(rCircle.result);
                    _this.dataCicles.paginator = _this.pagcicles;
                    _this.dataCicles.sort = _this.sortcicles;
                    // +++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card--active";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Pet type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetPetType').subscribe(function (rpet) {
                console.log('catalogo office', rpet);
                if (rpet.success) {
                    // this.dataOffices = rpet.result;
                    _this.dataCatalogPetType = new table_1.MatTableDataSource(rpet.result);
                    _this.dataCatalogPetType.paginator = _this.pagPetType;
                    _this.dataCatalogPetType.sort = _this.sortPetType;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card--active";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Breed') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetBreed').subscribe(function (rbreed) {
                if (rbreed.success) {
                    console.log('get supplier', rbreed);
                    _this.dataBreed = new table_1.MatTableDataSource(rbreed.result);
                    _this.dataBreed.paginator = _this.pagbreed;
                    _this.dataBreed.sort = _this.sortbreed;
                    // ++
                    document.getElementById('cardBreed').className = "filterCard__card--active";
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Vehicle type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetVehicleType').subscribe(function (rve) {
                console.log('catalogo vehicle', rve);
                if (rve.success) {
                    console.log('get vehicle', rve);
                    _this.dataCatalogVehicle = new table_1.MatTableDataSource(rve.result);
                    _this.dataCatalogVehicle.paginator = _this.pagVehicle;
                    _this.dataCatalogVehicle.sort = _this.sortVehicle;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card--active";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'proficiency') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetProficiency').subscribe(function (rprofi) {
                console.log('catalogo circle', rprofi);
                if (rprofi.success) {
                    console.log('get Proficiency', rprofi);
                    _this.dataCatalogProficiency = new table_1.MatTableDataSource(rprofi.result);
                    _this.dataCatalogProficiency.paginator = _this.pagProficiency;
                    _this.dataCatalogProficiency.sort = _this.sortProficiency;
                    // +++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card--active";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Education level') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetEducationLevel').subscribe(function (redu) {
                console.log('catalogo education', redu);
                if (redu.success) {
                    console.log('get Education', redu);
                    _this.dataCatalogEducation = new table_1.MatTableDataSource(redu.result);
                    _this.dataCatalogEducation.paginator = _this.pagEducation;
                    _this.dataCatalogEducation.sort = _this.sortEducation;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card--active";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Tax percentage') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetTaxesPercentage').subscribe(function (rtax) {
                console.log('catalogo education', rtax);
                if (rtax.success) {
                    console.log('get Education', rtax);
                    _this.dataCatalogTaxes = new table_1.MatTableDataSource(rtax.result);
                    _this.dataCatalogTaxes.paginator = _this.pagTaxes;
                    _this.dataCatalogTaxes.sort = _this.sortTaxes;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card--active";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Company type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetCompanyType').subscribe(function (rcompa) {
                console.log('catalogo company', rcompa);
                if (rcompa.success) {
                    console.log('get company', rcompa);
                    _this.dataCompanyType = new table_1.MatTableDataSource(rcompa.result);
                    _this.dataCompanyType.paginator = _this.pagCompanyType;
                    _this.dataCompanyType.sort = _this.sortCompanyType;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card--active";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'relationship') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetRelationship').subscribe(function (rrelation) {
                console.log('catalogo relation', rrelation);
                if (rrelation.success) {
                    console.log('get relation', rrelation);
                    _this.dataRelationship = new table_1.MatTableDataSource(rrelation.result);
                    _this.dataRelationship.paginator = _this.pagRelationship;
                    _this.dataRelationship.sort = _this.sortRelationship;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card--active";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        // if (this.tableCatalog == 'Visa category') {
        //   this.__loader__.showLoader();
        //   this._services.service_general_get('AdminCenter/GetVisaCategory').subscribe(rvisa => {
        //     console.log('catalogo visa', rvisa);
        //     if (rvisa.success) {
        //       console.log('get visa', rvisa);
        //       this.dataVisaCategory = new MatTableDataSource(rvisa.result);
        //       this.dataVisaCategory.paginator = this.pagvisacategory;
        //       this.dataVisaCategory.sort = this.sortvisacategory;
        //       // ++
        //       document.getElementById('curr').className = "filterCard__card";
        //       document.getElementById('lang').className = "filterCard__card";
        //       document.getElementById('sexx').className = "filterCard__card";
        //       document.getElementById('jobT').className = "filterCard__card";
        //       document.getElementById('life').className = "filterCard__card";
        //       document.getElementById('pet').className = "filterCard__card";
        //       document.getElementById('vehicle').className = "filterCard__card";
        //       document.getElementById('profici').className = "filterCard__card";
        //       document.getElementById('educat').className = "filterCard__card";
        //       document.getElementById('tax').className = "filterCard__card";
        //       document.getElementById('company').className = "filterCard__card";
        //       document.getElementById('cardRelationship').className = "filterCard__card";
        //       document.getElementById('cardVisa').className = "filterCard__card--active";
        //       document.getElementById('cardPrivacy').className = "filterCard__card";
        //       document.getElementById('cardPolicy').className = "filterCard__card";
        //       document.getElementById('cardPayment').className = "filterCard__card";
        //       document.getElementById('cardPartner').className = "filterCard__card";
        //       document.getElementById('cardCoverage').className = "filterCard__card";
        // document.getElementById('cardServiceType').className = "filterCard__card";
        //       document.getElementById('cardTransport').className = "filterCard__card";
        //       document.getElementById('cardCoordinator').className = "filterCard__card";
        //       document.getElementById('cardNotification').className = "filterCard__card";
        //       document.getElementById('cardDocument').className = "filterCard__card";
        //       document.getElementById('cardContact').className = "filterCard__card";
        //       document.getElementById('cardSupplier').className = "filterCard__card";
        //       document.getElementById('cardBreed').className = "filterCard__card";
        //       this.search = '';
        //     }
        //   });
        //   this.__loader__.hideLoader();
        // }
        if (this.tableCatalog == 'privacy') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetPrivacy').subscribe(function (rprivacy) {
                if (rprivacy.success) {
                    console.log('get privacy', rprivacy);
                    _this.dataPrivacy = new table_1.MatTableDataSource(rprivacy.result);
                    _this.dataPrivacy.paginator = _this.pagprivacy;
                    _this.dataPrivacy.sort = _this.sortprivacy;
                    // ++
                    document.getElementById('cardPrivacy').className = "filterCard__card--active";
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Policy type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetPolicyType').subscribe(function (rpolicy) {
                if (rpolicy.success) {
                    console.log('get policy', rpolicy);
                    _this.dataPolicy = new table_1.MatTableDataSource(rpolicy.result);
                    _this.dataPolicy.paginator = _this.pagpolicy;
                    _this.dataPolicy.sort = _this.sortpolicy;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card--active";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Payment Responsibility') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetPaymentResponsibility').subscribe(function (rpayment) {
                if (rpayment.success) {
                    console.log('get payment', rpayment);
                    _this.dataPayment = new table_1.MatTableDataSource(rpayment.result);
                    _this.dataPayment.paginator = _this.pagpayment;
                    _this.dataPayment.sort = _this.sortpayment;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card--active";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Partner status') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetPartnerStatus').subscribe(function (rpartner) {
                if (rpartner.success) {
                    console.log('get partner', rpartner);
                    _this.dataPartner = new table_1.MatTableDataSource(rpartner.result);
                    _this.dataPartner.paginator = _this.pagpartner;
                    _this.dataPartner.sort = _this.sortpartner;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card--active";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Coverage type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetCoverageType').subscribe(function (rcoverage) {
                if (rcoverage.success) {
                    console.log('get coverage', rcoverage);
                    _this.dataCoverage = new table_1.MatTableDataSource(rcoverage.result);
                    _this.dataCoverage.paginator = _this.pagcoverage;
                    _this.dataCoverage.sort = _this.sortcoverage;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card--active";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        // if (this.tableCatalog == 'Service type') {
        //   this.__loader__.showLoader();
        //   this._services.service_general_get('AdminCenter/GetServiceType').subscribe(rservice => {
        //     if (rservice.success) {
        //       console.log('get service', rservice);
        //       this.dataServiceType = new MatTableDataSource(rservice.result);
        //       this.dataServiceType.paginator = this.pagserviceType;
        //       this.dataServiceType.sort = this.sortserviceType;
        //       document.getElementById('curr').className = "filterCard__card";
        //       document.getElementById('lang').className = "filterCard__card";
        //       document.getElementById('sexx').className = "filterCard__card";
        //       document.getElementById('jobT').className = "filterCard__card";
        //       document.getElementById('life').className = "filterCard__card";
        //       document.getElementById('pet').className = "filterCard__card";
        //       document.getElementById('vehicle').className = "filterCard__card";
        //       document.getElementById('profici').className = "filterCard__card";
        //       document.getElementById('educat').className = "filterCard__card";
        //       document.getElementById('tax').className = "filterCard__card";
        //       document.getElementById('company').className = "filterCard__card";
        //       document.getElementById('cardRelationship').className = "filterCard__card";
        // document.getElementById('cardVisa').className = "filterCard__card";
        //       document.getElementById('cardPrivacy').className = "filterCard__card";
        //       document.getElementById('cardPolicy').className = "filterCard__card";
        //       document.getElementById('cardPayment').className = "filterCard__card";
        //       document.getElementById('cardPartner').className = "filterCard__card";
        //       document.getElementById('cardCoverage').className = "filterCard__card";
        //       document.getElementById('cardServiceType').className = "filterCard__card--active";
        //       document.getElementById('cardTransport').className = "filterCard__card";
        //       document.getElementById('cardCoordinator').className = "filterCard__card";
        //       document.getElementById('cardNotification').className = "filterCard__card";
        //       document.getElementById('cardDocument').className = "filterCard__card";
        //       document.getElementById('cardContact').className = "filterCard__card";
        //       document.getElementById('cardSupplier').className = "filterCard__card";
        //       document.getElementById('cardBreed').className = "filterCard__card";
        //       this.search = '';
        //     }
        //   });
        //   this.__loader__.hideLoader();
        // }
        if (this.tableCatalog == 'Transport Type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetTransportType').subscribe(function (rtransport) {
                if (rtransport.success) {
                    console.log('get transport', rtransport);
                    _this.dataTransportType = new table_1.MatTableDataSource(rtransport.result);
                    _this.dataTransportType.paginator = _this.pagtransporttype;
                    _this.dataTransportType.sort = _this.sorttransporttype;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card--active";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Coordinator Type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetCoordinatorType').subscribe(function (rcoordinator) {
                if (rcoordinator.success) {
                    console.log('get coordinator', rcoordinator);
                    _this.dataCoordinator = new table_1.MatTableDataSource(rcoordinator.result);
                    _this.dataCoordinator.paginator = _this.pagcoordinator;
                    _this.dataCoordinator.sort = _this.sortcoordinator;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card--active";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Notification Type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetNotificationType').subscribe(function (rnotification) {
                if (rnotification.success) {
                    console.log('get notification', rnotification);
                    _this.dataNotification = new table_1.MatTableDataSource(rnotification.result);
                    _this.dataNotification.paginator = _this.pagnotification;
                    _this.dataNotification.sort = _this.sortnotification;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card--active";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Document Type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetDocumentType').subscribe(function (rdocument) {
                if (rdocument.success) {
                    console.log('get document', rdocument);
                    _this.dataDocument = new table_1.MatTableDataSource(rdocument.result);
                    _this.dataDocument.paginator = _this.pagdocument;
                    _this.dataDocument.sort = _this.sortdocument;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card--active";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this._services.service_general_get('AdminCenter/GetTypeDocuments').subscribe(function (rtype) {
                if (rtype.success) {
                    _this.typeDoc = rtype.result;
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Contact Type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetContactType').subscribe(function (rcontact) {
                if (rcontact.success) {
                    console.log('get contact', rcontact);
                    _this.dataContact = new table_1.MatTableDataSource(rcontact.result);
                    _this.dataContact.paginator = _this.pagcontact;
                    _this.dataContact.sort = _this.sortcontact;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card--active";
                    document.getElementById('cardSupplier').className = "filterCard__card";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
        if (this.tableCatalog == 'Supplier Type') {
            this.__loader__.showLoader();
            this._services.service_general_get('AdminCenter/GetSupplierType').subscribe(function (rsupplier) {
                if (rsupplier.success) {
                    console.log('get supplier', rsupplier);
                    _this.dataSupplier = new table_1.MatTableDataSource(rsupplier.result);
                    _this.dataSupplier.paginator = _this.pagsupplier;
                    _this.dataSupplier.sort = _this.sortsupplier;
                    // ++
                    document.getElementById('curr').className = "filterCard__card";
                    document.getElementById('lang').className = "filterCard__card";
                    document.getElementById('sexx').className = "filterCard__card";
                    document.getElementById('jobT').className = "filterCard__card";
                    document.getElementById('life').className = "filterCard__card";
                    document.getElementById('pet').className = "filterCard__card";
                    document.getElementById('vehicle').className = "filterCard__card";
                    document.getElementById('profici').className = "filterCard__card";
                    document.getElementById('educat').className = "filterCard__card";
                    document.getElementById('tax').className = "filterCard__card";
                    document.getElementById('company').className = "filterCard__card";
                    document.getElementById('cardRelationship').className = "filterCard__card";
                    // document.getElementById('cardVisa').className = "filterCard__card";
                    document.getElementById('cardPrivacy').className = "filterCard__card";
                    document.getElementById('cardPolicy').className = "filterCard__card";
                    document.getElementById('cardPayment').className = "filterCard__card";
                    document.getElementById('cardPartner').className = "filterCard__card";
                    document.getElementById('cardCoverage').className = "filterCard__card";
                    // document.getElementById('cardServiceType').className = "filterCard__card";
                    document.getElementById('cardTransport').className = "filterCard__card";
                    document.getElementById('cardCoordinator').className = "filterCard__card";
                    document.getElementById('cardNotification').className = "filterCard__card";
                    document.getElementById('cardDocument').className = "filterCard__card";
                    document.getElementById('cardContact').className = "filterCard__card";
                    document.getElementById('cardSupplier').className = "filterCard__card--active";
                    document.getElementById('cardBreed').className = "filterCard__card";
                    _this.search = '';
                }
            });
            this.__loader__.hideLoader();
        }
    };
    CatalogsComponent.prototype.applyFilter = function (event) {
        console.log(event, 'estas buscando');
        var filterValue = event.target.value;
        if (this.tableCatalog == 'currencies') {
            this.dataCurrencies.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'languajes') {
            this.dataLanguages.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'sex') {
            this.dataCatalogSex.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'jobTitles') {
            this.dataTitles.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'lifeCicles') {
            this.dataCicles.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Pet type') {
            this.dataCatalogPetType.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Vehicle type') {
            this.dataCatalogVehicle.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'proficiency') {
            this.dataCatalogProficiency.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Education level') {
            this.dataCatalogEducation.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Tax percentage') {
            this.dataCatalogTaxes.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Company type') {
            this.dataCompanyType.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'relationship') {
            this.dataRelationship.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Visa category') {
            this.dataVisaCategory.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'privacy') {
            this.dataPrivacy.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Policy type') {
            this.dataPolicy.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Payment Responsibility') {
            this.dataPayment.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Partner status') {
            this.dataPartner.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Coverage type') {
            this.dataCoverage.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Service type') {
            this.dataServiceType.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Transport Type') {
            this.dataTransportType.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Coordinator Type') {
            this.dataCoordinator.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Notification Type') {
            this.dataNotification.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Document Type') {
            this.dataDocument.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Contact Type') {
            this.dataContact.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Supplier Type') {
            this.dataSupplier.filter = filterValue.trim().toLowerCase();
        }
        else if (this.tableCatalog == 'Breed') {
            this.dataBreed.filter = filterValue.trim().toLowerCase();
        }
    };
    // Add cataloge currencies
    CatalogsComponent.prototype.addCurrencies = function (id) {
        var _this = this;
        console.log('abrir modal currencies');
        var dialogRef = this._dialog.open(dialog_catalog_currencies_component_1.DialogCatalogCurrenciesComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Updated data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    // eliminar currency
    CatalogsComponent.prototype.deleteCurrency = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Currency?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("Catalog/DeleteCurrency/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: " Deleted " + data.result.currency
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The currency is in use by other records"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // add y update lenguage
    CatalogsComponent.prototype.addLenguage = function (id) {
        var _this = this;
        console.log('abrir modal lenguage');
        var dialogRef = this._dialog.open(dialog_catalog_languages_component_1.DialogCatalogLanguagesComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    // delete lenguage
    CatalogsComponent.prototype.deleteLenguage = function (id) {
        var _this = this;
        console.log('lenguaje', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Language?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("Catalog/DeleteLanguage/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted " + data.result.name
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The lenguage is in use by other records"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // sex
    CatalogsComponent.prototype.addSex = function (id) {
        var _this = this;
        console.log('abrir modal lenguage');
        var dialogRef = this._dialog.open(dialog_catalog_sex_component_1.DialogCatalogSexComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteSex = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this sex?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/Sex/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted sex"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The sex is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // add title
    CatalogsComponent.prototype.addTitle = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_catalog_titles_component_1.DialogCatalogTitlesComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Updated data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    // delete title
    CatalogsComponent.prototype.deleteTitle = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Title?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("Catalog/DeleteTitle/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted title"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Title is in use "
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    CatalogsComponent.prototype.addCicles = function (id) {
        var _this = this;
        console.log('abrir modal currencies');
        var dialogRef = this._dialog.open(dialog_catalog_clicles_component_1.DialogCatalogCliclesComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Updated data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteCicles = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Cicle?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("Catalog/DeleteLifeCircle/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted cicles"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The cicles is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // pet type
    CatalogsComponent.prototype.addPet = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_catalog_pet_type_component_1.DialogCatalogPetTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deletePet = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this pet type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/PetType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted pet"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The pet type is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // vehicle
    CatalogsComponent.prototype.addVehicle = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_catalog_vehicle_type_component_1.DialogCatalogVehicleTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteVehicle = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Vehicle type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/VehicleType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted Vehicle type"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The vehicle is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // proficiency
    CatalogsComponent.prototype.addProficiency = function (id) {
        var _this = this;
        console.log('abrir modal proficiency');
        var dialogRef = this._dialog.open(dialog_catalog_proficiency_component_1.DialogCatalogProficiencyComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteProficiency = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Proficiency?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/Proficiency/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted Proficiency"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Proficiency is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // education
    CatalogsComponent.prototype.addEducation = function (id) {
        var _this = this;
        console.log('abrir modal education');
        var dialogRef = this._dialog.open(dialog_catalog_education_level_component_1.DialogCatalogEducationLevelComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteEducation = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Education?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/EducationLevel/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted Education"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Education is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // taxes
    CatalogsComponent.prototype.addTaxPercentage = function (id) {
        var _this = this;
        console.log('abrir modal taxes');
        var dialogRef = this._dialog.open(dialog_catalog_tax_percentage_component_1.DialogCatalogTaxPercentageComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteTaxPercentage = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this taxes?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/TaxesPercentage/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted taxe percentage"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The taxe is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // company
    CatalogsComponent.prototype.addCompanyType = function (id) {
        var _this = this;
        console.log('abrir modal company');
        var dialogRef = this._dialog.open(dialog_catalog_company_type_component_1.DialogCatalogCompanyTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteCompanyType = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Company?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/CompanyType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted Company type"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Company Type is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // add relationship
    CatalogsComponent.prototype.addRelationship = function (id) {
        var _this = this;
        console.log('abrir modal relationship');
        var dialogRef = this._dialog.open(dialog_catalog_relationship_component_1.DialogCatalogRelationshipComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    // delete relationship
    CatalogsComponent.prototype.deleteRelationship = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Relationship?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/Relationship/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted Relationship"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Relationship is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // add visa category
    CatalogsComponent.prototype.addVisaCategory = function (id) {
        var _this = this;
        console.log('abrir modal visa');
        var dialogRef = this._dialog.open(dialog_catalog_visa_category_component_1.DialogCatalogVisaCategoryComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteVisaCAtegory = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this visa?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/VisaCategory/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted visa catagory"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Visa category is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // add privacy
    CatalogsComponent.prototype.addPrivacy = function (id) {
        var _this = this;
        console.log('abrir modal privacy');
        var dialogRef = this._dialog.open(dialog_catalog_privacy_component_1.DialogCatalogPrivacyComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deletePrivacy = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this privacy?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/Privacy/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted privacy"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Privacy is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // policy type
    CatalogsComponent.prototype.addPolicy = function (id) {
        var _this = this;
        console.log('abrir modal policy');
        var dialogRef = this._dialog.open(dialog_catalog_policy_component_1.DialogCatalogPolicyComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deletePolicy = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this policy?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/PolicyType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted privacy"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Privacy is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // payment responsibility
    CatalogsComponent.prototype.addPayment = function (id) {
        var _this = this;
        console.log('abrir modal payment');
        var dialogRef = this._dialog.open(dialog_catalog_payment_responsibility_component_1.DialogCatalogPaymentResponsibilityComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deletePayment = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this payment?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/PaymentResponsibility/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted payment"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The Payment is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // partner
    CatalogsComponent.prototype.addPartner = function (id) {
        var _this = this;
        console.log('abrir modal payment');
        var dialogRef = this._dialog.open(dialog_catalog_partner_status_component_1.DialogCatalogPartnerStatusComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deletePartner = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this partner?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/PartnerStatus/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted partner"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The partner is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // Coverage type
    CatalogsComponent.prototype.addCoverage = function (id) {
        var _this = this;
        console.log('abrir modal coverage');
        var dialogRef = this._dialog.open(dialog_catalog_coverage_type_component_1.DialogCatalogCoverageTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteCoverage = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this Coverage?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/CoverageType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted coverage"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The coverage is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // service type
    CatalogsComponent.prototype.addServiceType = function (id) {
        var _this = this;
        console.log('abrir modal service');
        var dialogRef = this._dialog.open(dialog_catalog_service_type_component_1.DialogCatalogServiceTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteServiceType = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this service type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/ServiceType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted service"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The service is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // transport
    CatalogsComponent.prototype.addTransport = function (id) {
        var _this = this;
        console.log('abrir modal transport');
        var dialogRef = this._dialog.open(dialog_catalog_transport_type_component_1.DialogCatalogTransportTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteTransport = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this transport type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/TransportType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted transport"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The transport is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // Coordinator
    CatalogsComponent.prototype.addCoordinator = function (id) {
        var _this = this;
        console.log('abrir modal coordinator');
        var dialogRef = this._dialog.open(dialog_catalog_coordinator_type_component_1.DialogCatalogCoordinatorTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteCoordinator = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this coordinator type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/CoordinatorType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted coordinator"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The coordinator is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // Notification
    CatalogsComponent.prototype.addNotification = function (id) {
        var _this = this;
        console.log('abrir modal notification');
        var dialogRef = this._dialog.open(dialog_catalog_notification_type_component_1.DialogCatalogNotificationTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteNotification = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this notification type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/NotificationType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted notification"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The notification is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // Document
    CatalogsComponent.prototype.addDocument = function (id) {
        var _this = this;
        console.log('abrir modal document');
        var dialogRef = this._dialog.open(dialog_catalog_document_type_component_1.DialogCatalogDocumentTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteDocument = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this document type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/DocumentType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted document"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The document is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    CatalogsComponent.prototype.nameType = function (id) {
        for (var i = 0; i < this.typeDoc.length; i++) {
            var element = this.typeDoc[i];
            if (element.id == id) {
                return element.name;
            }
        }
    };
    // Contact
    CatalogsComponent.prototype.addContact = function (id) {
        var _this = this;
        console.log('abrir modal contact');
        var dialogRef = this._dialog.open(dialog_catalog_contact_type_component_1.DialogCatalogContactTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteContact = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this contact type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/ContactType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted contact"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The contact is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // Supplier
    CatalogsComponent.prototype.addSupplier = function (id) {
        var _this = this;
        console.log('abrir modal supplier');
        var dialogRef = this._dialog.open(dialog_catalog_supplier_type_component_1.DialogCatalogSupplierTypeComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteSupplier = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this supplier type?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/SupplierType/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted supplier"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The supplier is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    // Breed
    CatalogsComponent.prototype.addBreed = function (id) {
        var _this = this;
        console.log('abrir modal breed');
        var dialogRef = this._dialog.open(dialog_catalog_breed_component_1.DialogCatalogBreedComponent, {
            data: { id: id },
            width: "30%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 1) {
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "success",
                        body: "Inserted data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
            if (result === 2) {
                var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update data"
                    },
                    width: "350px"
                });
                _this.get_catalogos();
            }
        });
    };
    CatalogsComponent.prototype.deleteBreed = function (id) {
        var _this = this;
        console.log('delete', id);
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this breed?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._services.service_general_delete("AdminCenter/Breed/" + id).subscribe(function (data) {
                    console.log('respuesta de eliminacion', data);
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: "Deleted breed"
                            },
                            width: "350px"
                        });
                        _this.get_catalogos();
                    }
                }, function (error) {
                    console.error('error con el delete', error);
                    var dialog2 = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Warning",
                            body: "The breed is in use"
                        },
                        width: "350px"
                    });
                    _this.get_catalogos();
                });
            }
        });
    };
    CatalogsComponent.prototype.dateWorker = function (date) {
        var result = '';
        if (date != null) {
            var date_to_work = date, date_remove_time = date_to_work.split('T')[0];
            result = date_remove_time;
        }
        else {
            result = 'No Date';
        }
        return result;
    };
    __decorate([
        core_1.ViewChild('sortcurren')
    ], CatalogsComponent.prototype, "sortcurren");
    __decorate([
        core_1.ViewChild('pagcurren')
    ], CatalogsComponent.prototype, "pagcurren");
    __decorate([
        core_1.ViewChild('sortlang')
    ], CatalogsComponent.prototype, "sortlang");
    __decorate([
        core_1.ViewChild('paglang')
    ], CatalogsComponent.prototype, "paglang");
    __decorate([
        core_1.ViewChild('sortSex')
    ], CatalogsComponent.prototype, "sortSex");
    __decorate([
        core_1.ViewChild('pagSex')
    ], CatalogsComponent.prototype, "pagSex");
    __decorate([
        core_1.ViewChild('sorttitle')
    ], CatalogsComponent.prototype, "sorttitle");
    __decorate([
        core_1.ViewChild('pagtitle')
    ], CatalogsComponent.prototype, "pagtitle");
    __decorate([
        core_1.ViewChild('sortcicles')
    ], CatalogsComponent.prototype, "sortcicles");
    __decorate([
        core_1.ViewChild('pagcicles')
    ], CatalogsComponent.prototype, "pagcicles");
    __decorate([
        core_1.ViewChild('sortPetType')
    ], CatalogsComponent.prototype, "sortPetType");
    __decorate([
        core_1.ViewChild('pagPetType')
    ], CatalogsComponent.prototype, "pagPetType");
    __decorate([
        core_1.ViewChild('sortVehicle')
    ], CatalogsComponent.prototype, "sortVehicle");
    __decorate([
        core_1.ViewChild('pagVehicle')
    ], CatalogsComponent.prototype, "pagVehicle");
    __decorate([
        core_1.ViewChild('sortProficiency')
    ], CatalogsComponent.prototype, "sortProficiency");
    __decorate([
        core_1.ViewChild('pagProficiency')
    ], CatalogsComponent.prototype, "pagProficiency");
    __decorate([
        core_1.ViewChild('sortEducation')
    ], CatalogsComponent.prototype, "sortEducation");
    __decorate([
        core_1.ViewChild('pagEducation')
    ], CatalogsComponent.prototype, "pagEducation");
    __decorate([
        core_1.ViewChild('sortTaxes')
    ], CatalogsComponent.prototype, "sortTaxes");
    __decorate([
        core_1.ViewChild('pagTaxes')
    ], CatalogsComponent.prototype, "pagTaxes");
    __decorate([
        core_1.ViewChild('sortCompanyType')
    ], CatalogsComponent.prototype, "sortCompanyType");
    __decorate([
        core_1.ViewChild('pagCompanyType')
    ], CatalogsComponent.prototype, "pagCompanyType");
    __decorate([
        core_1.ViewChild('sortRelationship')
    ], CatalogsComponent.prototype, "sortRelationship");
    __decorate([
        core_1.ViewChild('pagRelationship')
    ], CatalogsComponent.prototype, "pagRelationship");
    __decorate([
        core_1.ViewChild('sortvisacategory')
    ], CatalogsComponent.prototype, "sortvisacategory");
    __decorate([
        core_1.ViewChild('pagvisacategory')
    ], CatalogsComponent.prototype, "pagvisacategory");
    __decorate([
        core_1.ViewChild('sortprivacy')
    ], CatalogsComponent.prototype, "sortprivacy");
    __decorate([
        core_1.ViewChild('pagprivacy')
    ], CatalogsComponent.prototype, "pagprivacy");
    __decorate([
        core_1.ViewChild('sortpolicy')
    ], CatalogsComponent.prototype, "sortpolicy");
    __decorate([
        core_1.ViewChild('pagpolicy')
    ], CatalogsComponent.prototype, "pagpolicy");
    __decorate([
        core_1.ViewChild('sortpayment')
    ], CatalogsComponent.prototype, "sortpayment");
    __decorate([
        core_1.ViewChild('pagpayment')
    ], CatalogsComponent.prototype, "pagpayment");
    __decorate([
        core_1.ViewChild('sortpartner')
    ], CatalogsComponent.prototype, "sortpartner");
    __decorate([
        core_1.ViewChild('pagpartner')
    ], CatalogsComponent.prototype, "pagpartner");
    __decorate([
        core_1.ViewChild('sortcoverage')
    ], CatalogsComponent.prototype, "sortcoverage");
    __decorate([
        core_1.ViewChild('pagcoverage')
    ], CatalogsComponent.prototype, "pagcoverage");
    __decorate([
        core_1.ViewChild('sortserviceType')
    ], CatalogsComponent.prototype, "sortserviceType");
    __decorate([
        core_1.ViewChild('pagserviceType')
    ], CatalogsComponent.prototype, "pagserviceType");
    __decorate([
        core_1.ViewChild('sorttransporttype')
    ], CatalogsComponent.prototype, "sorttransporttype");
    __decorate([
        core_1.ViewChild('pagtransporttype')
    ], CatalogsComponent.prototype, "pagtransporttype");
    __decorate([
        core_1.ViewChild('sortcoordinator')
    ], CatalogsComponent.prototype, "sortcoordinator");
    __decorate([
        core_1.ViewChild('pagcoordinator')
    ], CatalogsComponent.prototype, "pagcoordinator");
    __decorate([
        core_1.ViewChild('sortnotification')
    ], CatalogsComponent.prototype, "sortnotification");
    __decorate([
        core_1.ViewChild('pagnotification')
    ], CatalogsComponent.prototype, "pagnotification");
    __decorate([
        core_1.ViewChild('sortdocument')
    ], CatalogsComponent.prototype, "sortdocument");
    __decorate([
        core_1.ViewChild('pagdocument')
    ], CatalogsComponent.prototype, "pagdocument");
    __decorate([
        core_1.ViewChild('sortcontact')
    ], CatalogsComponent.prototype, "sortcontact");
    __decorate([
        core_1.ViewChild('pagcontact')
    ], CatalogsComponent.prototype, "pagcontact");
    __decorate([
        core_1.ViewChild('sortsupplier')
    ], CatalogsComponent.prototype, "sortsupplier");
    __decorate([
        core_1.ViewChild('pagsupplier')
    ], CatalogsComponent.prototype, "pagsupplier");
    __decorate([
        core_1.ViewChild('sortbreed')
    ], CatalogsComponent.prototype, "sortbreed");
    __decorate([
        core_1.ViewChild('pagbreed')
    ], CatalogsComponent.prototype, "pagbreed");
    CatalogsComponent = __decorate([
        core_1.Component({
            selector: 'app-catalogs',
            templateUrl: './catalogs.component.html',
            styleUrls: ['./catalogs.component.css']
        })
    ], CatalogsComponent);
    return CatalogsComponent;
}());
exports.CatalogsComponent = CatalogsComponent;
