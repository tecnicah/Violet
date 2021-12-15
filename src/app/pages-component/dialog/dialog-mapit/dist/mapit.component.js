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
exports.DialogMapit = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var table_1 = require("@angular/material/table");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("../../../../app/shared/loader");
var forms_1 = require("@angular/forms");
var DialogMapit = /** @class */ (function () {
    function DialogMapit(dialogRef, _services, _routerParams, map_data, _dialog, mapsAPILoader) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.map_data = map_data;
        this._dialog = _dialog;
        this.mapsAPILoader = mapsAPILoader;
        this.mode = new forms_1.FormControl('side');
        this.zoom = 12;
        // initial center position for the map19.431404, -99.095741
        this.latitud = Number(localStorage.getItem('latitud'));
        this.longitud = Number(localStorage.getItem('longitud'));
        this.markers = [];
        this.__loader__ = new loader_1.LoaderComponent();
        this.is_new_mapit = false;
        this.formGroup = new forms_1.FormGroup({
            place: new forms_1.FormControl(''),
            search: new forms_1.FormControl('')
        });
        this.options_found = [];
        this.table_location_data = undefined;
        this.mapit_model = new MapitModel();
        this.show_location_form = false;
        this.location_colums = ['cam_0', 'cam_1', 'cam_2', 'cam_3'];
        this.location_in = new LocationsModel();
        /* Utilities */
        this.serviceline_catalogue = [];
        this.supplier_catalogue = [];
        this.locationtype_catalogue = [];
        this.service_catalogue = [];
        this.able_select_sup = false;
        //======================> Miserable
        this.formattedaddress = "";
        this.options = {
            componentRestrictions: {
                country: []
            }
        };
        console.log(this.latitud);
        console.log(this.longitud);
    }
    DialogMapit.prototype.mapClicked = function ($event) {
        //this.markers.push({
        //  latitud: $event.coords.lat,
        //  longitud: $event.coords.lng,
        //  draggable: true
        //});
    };
    DialogMapit.prototype.clickedMarker = function (label, index) {
        console.log("clicked the marker:" + label + " " + index);
        this.info = label;
    };
    DialogMapit.prototype.markerDragEnd = function (m, $event, index) {
        console.log('dragEnd', m, $event);
        this.longitud = $event.coords.lng;
        this.latitud = $event.coords.lat;
        this.markers[index].latitude = $event.coords.lat;
        this.markers[index].longitude = $event.coords.lng;
    };
    DialogMapit.prototype.ngOnInit = function () {
        this.getCatalogues();
        if (this.map_data.map_data != null) {
            this.getMapitData();
        }
        else {
            this.is_new_mapit = true;
            //this.initMapSettings();
        }
    };
    DialogMapit.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var place;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.location_in.address);
                        return [4 /*yield*/, this.geocode(this.location_in.address)];
                    case 1:
                        place = _a.sent();
                        console.log(place);
                        this.handleAddressChange(place);
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogMapit.prototype.geocode = function (address) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        new google.maps.Geocoder().geocode({ address: address }, function (results, status) {
                            status === google.maps.GeocoderStatus.OK ? resolve(results[0]) : reject();
                        });
                    })];
            });
        });
    };
    DialogMapit.prototype.handleAddressChange = function (address) {
        console.log("entra");
        console.log(address.geometry.location.lng());
        this.longitud = address.geometry.location.lng();
        this.latitud = address.geometry.location.lat();
        this.zoom = 15;
        this.markers.push({
            latitude: address.geometry.location.lat(),
            longitude: address.geometry.location.lng(),
            url: "assets/icons/flag.png",
            nombre: address.formatted_address,
            tipo: 0,
            type: 0,
            draggable: true
        });
        console.log(this.markers);
    };
    DialogMapit.prototype.createAutoCompleteData = function (event_data) {
        var _this = this;
        console.log('Aqui cainal ===> ', event_data);
        var options_container = document.getElementsByClassName('pac-container')[0], options_in = options_container.querySelectorAll('.pac-item');
        this.options_found = [];
        options_in.forEach(function (option) {
            var option_created = {
                option: option.innerText,
                selected: false
            };
            setTimeout(function () {
                if (option.classList.contains('pac-item-selected'))
                    option_created.selected = true;
            }, 70);
            _this.options_found.push(option_created);
        });
        if (event_data.keyCode == 13)
            this.options_found = [];
        console.log(this.options_found);
    };
    DialogMapit.prototype.getMapitData = function () {
        var _this = this;
        console.log("getMapitData");
        this._services.service_general_get("MapIt/GetMapItById?id=" + this.map_data.map_data.id)
            .subscribe(function (response) {
            if (response.success) {
                _this.mapit_model = response.result.value[0];
                console.log('this.mapit_model  ====> ', _this.mapit_model);
                for (var i = 0; i < _this.mapit_model.locations.length; i++) {
                    var element = _this.mapit_model.locations[i];
                    _this.markers.push({
                        latitude: element.latitude,
                        longitude: element.longitude,
                        url: "assets/icons/flag.png",
                        nombre: element.address,
                        tipo: 0,
                        type: 0,
                        draggable: true
                    });
                }
                _this.table_location_data = new table_1.MatTableDataSource(_this.mapit_model.locations);
                _this.getSupplier();
                //this.locations = [
                //  ['Bondi Beach', -33.890542, 151.274856, 4],
                //  ['Coogee Beach', -33.923036, 151.259052, 5],
                //  ['Cronulla Beach', -34.028249, 151.157507, 3],
                //  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
                //  ['Maroubra Beach', -33.950198, 151.259302, 1]
                //];
                //this.initMapSettings(this.locations)
            }
        }, function (error) {
            console.error('Error (GetMapItById) => ', error);
        });
    };
    DialogMapit.prototype.createMapit = function () {
        var _this = this;
        console.log("createmap");
        this.mapit_model.serviceRecord = this.map_data.id_so;
        for (var i = 0; i < this.mapit_model.locations.length; i++) {
            var element = this.mapit_model.locations[i];
            for (var j = 0; j < this.markers.length; j++) {
                var element_1 = this.markers[j];
                this.mapit_model.locations[i].latitude = this.markers[j].latitude;
                this.mapit_model.locations[i].longitude = this.markers[j].longitude;
            }
        }
        this.__loader__.showLoader();
        this._services.service_general_post_with_url('MapIt/PostMapIt', this.mapit_model)
            .subscribe(function (response) {
            if (response.success) {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Success',
                        body: 'Map it has been created successfully.'
                    }
                });
                _this.hideModal();
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (PostMapIt) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogMapit.prototype.updateMapit = function () {
        var _this = this;
        console.log("update map");
        this.__loader__.showLoader();
        for (var i = 0; i < this.mapit_model.locations.length; i++) {
            var element = this.mapit_model.locations[i];
            for (var j = 0; j < this.markers.length; j++) {
                var element_2 = this.markers[j];
                this.mapit_model.locations[i].latitude = this.markers[j].latitude;
                this.mapit_model.locations[i].longitude = this.markers[j].longitude;
            }
        }
        this._services.service_general_put('MapIt/PutMapIt', this.mapit_model)
            .subscribe(function (response) {
            if (response.success) {
                var dialogRef = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: 'Success',
                        body: 'Map it has been updated successfully.'
                    }
                });
                _this.hideModal();
            }
            _this.__loader__.hideLoader();
        }, function (error) {
            console.error('Error (PutMapIt) => ', error);
            _this.__loader__.hideLoader();
        });
    };
    DialogMapit.prototype.showLocationForm = function () {
        !this.show_location_form ?
            this.show_location_form = true :
            this.show_location_form = false;
    };
    DialogMapit.prototype.hideModal = function () {
        this.dialogRef.close();
    };
    DialogMapit.prototype.addNewLocation = function () {
        this.mapit_model.locations.push(this.location_in);
        this.location_in = new LocationsModel();
        this.table_location_data = new table_1.MatTableDataSource(this.mapit_model.locations);
        this.show_location_form = false;
    };
    DialogMapit.prototype.getCatalogues = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        _a.serviceline_catalogue = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLocationType')];
                    case 2:
                        _b.locationtype_catalogue = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogMapit.prototype.getSupplier = function () {
        return __awaiter(this, void 0, Promise, function () {
            var params, params_two, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.able_select_sup = true;
                        params = "?ServiceLineId=" + this.mapit_model.serviceLine + "&SR=" + this.map_data.id_so, params_two = "?service_record_Id=" + this.map_data.id_so + "&service_line_id=" + this.mapit_model.serviceLine;
                        //this.supplier_catalogue = await this._services.getCatalogueFrom(`GetSupplierByRecordId${params}`);
                        this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnersBySR/' + this.map_data.id_so).subscribe(function (r) {
                            if (r.success) {
                                _this.supplier_catalogue = r.result.value;
                            }
                        });
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetServiceBySOId" + params_two)];
                    case 1:
                        _a.service_catalogue = _b.sent();
                        console.log(params, this.supplier_catalogue);
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogMapit.prototype.getDataFromLocationType = function (id_in) {
        var result = '';
        if (this.locationtype_catalogue.value != undefined) {
            this.locationtype_catalogue.value.forEach(function (item) {
                if (item.id == id_in) {
                    result = item.locationType;
                }
            });
        }
        return result;
    };
    DialogMapit.prototype.getDataFromService = function (id_in) {
        var result = '';
        if (this.service_catalogue.value != undefined) {
            this.service_catalogue.value.forEach(function (item) {
                if (item.id == id_in) {
                    result = item.category;
                }
            }, function (error) {
                console.error('Error (getDataFromService) => ', error);
            });
        }
        return result;
    };
    DialogMapit.prototype.AddressChange = function (address) {
        this.formattedaddress = address.formatted_address;
        console.log('Ve tu ========> ', this.formattedaddress);
    };
    __decorate([
        core_1.ViewChild('places')
    ], DialogMapit.prototype, "places");
    __decorate([
        core_1.ViewChild('search')
    ], DialogMapit.prototype, "searchElement");
    __decorate([
        core_1.ViewChild("placesRef")
    ], DialogMapit.prototype, "placesRef");
    DialogMapit = __decorate([
        core_1.Component({
            selector: 'mapit-dialog',
            templateUrl: './mapit.component.html',
            styleUrls: []
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogMapit);
    return DialogMapit;
}());
exports.DialogMapit = DialogMapit;
var MapitModel = /** @class */ (function () {
    function MapitModel() {
        this.id = 0;
        this.serviceRecord = 0;
        this.supplierPartner = '';
        this.serviceLine = '';
        this.startDate = '';
        this.driverName = '';
        this.driverContact = '';
        this.vehicle = '';
        this.plateNumber = '';
        this.comments = '';
        this.createdBy = 0;
        this.createdDate = undefined;
        this.updatedBy = 0;
        this.updatedDate = undefined;
        this.locations = [];
    }
    return MapitModel;
}());
var LocationsModel = /** @class */ (function () {
    function LocationsModel() {
        this.id = 0;
        this.mapItId = 0;
        this.locationType = 0;
        this.service = 0;
        this.locationName = '';
        this.address = '';
        this.longitude = '';
        this.latitude = '';
    }
    return LocationsModel;
}());
