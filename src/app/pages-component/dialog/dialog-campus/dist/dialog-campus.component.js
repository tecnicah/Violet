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
exports.DialogCampusComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var DialogCampusComponent = /** @class */ (function () {
    function DialogCampusComponent(dialogRef, _services, _routerParams, map_data, _dialog, mapsAPILoader) {
        this.dialogRef = dialogRef;
        this._services = _services;
        this._routerParams = _routerParams;
        this.map_data = map_data;
        this._dialog = _dialog;
        this.mapsAPILoader = mapsAPILoader;
        this.mode = new forms_1.FormControl('side');
        this.zoom = 12;
        this.latitud = Number(localStorage.getItem('latitud'));
        this.longitud = Number(localStorage.getItem('longitud'));
        this.location_in = {};
        this.markers = [];
        this.options_found = [];
    }
    DialogCampusComponent.prototype.mapClicked = function ($event) {
        //this.markers.push({
        //  latitud: $event.coords.lat,
        //  longitud: $event.coords.lng,
        //  draggable: true
        //});
    };
    DialogCampusComponent.prototype.clickedMarker = function (label, index) {
        console.log("clicked the marker:" + label + " " + index);
        this.info = label;
    };
    DialogCampusComponent.prototype.markerDragEnd = function (m, $event, index) {
        console.log('dragEnd', m, $event);
        this.longitud = $event.coords.lng;
        this.latitud = $event.coords.lat;
        this.markers[index].latitude = $event.coords.lat;
        this.markers[index].longitude = $event.coords.lng;
    };
    DialogCampusComponent.prototype.ngOnInit = function () {
        console.log("DATA QUE RECIBE EL MODAL ", this.map_data);
        if (this.map_data != null || this.map_data != undefined) {
            this.location_in = this.map_data;
            this.markers.push({
                latitude: this.location_in.latitude,
                longitude: this.location_in.longitude,
                url: "assets/icons/flag.png",
                nombre: this.location_in.address,
                tipo: 0,
                type: 0,
                draggable: true
            });
        }
    };
    DialogCampusComponent.prototype.geocode = function (address) {
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
    DialogCampusComponent.prototype.handleAddressChange = function (address) {
        console.log("entra");
        console.log(address.geometry.location.lng());
        this.longitud = address.geometry.location.lng();
        this.latitud = address.geometry.location.lat();
        this.location_in.latitude = this.latitud;
        this.location_in.longitude = this.longitud;
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
    DialogCampusComponent.prototype.createAutoCompleteData = function (event_data) {
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
    DialogCampusComponent.prototype.onSubmit = function () {
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
    DialogCampusComponent.prototype.save = function () {
        console.log(this.location_in);
        this.location_in.success = true;
        this.dialogRef.close(this.location_in);
    };
    __decorate([
        core_1.ViewChild('places')
    ], DialogCampusComponent.prototype, "places");
    __decorate([
        core_1.ViewChild('search')
    ], DialogCampusComponent.prototype, "searchElement");
    __decorate([
        core_1.ViewChild("placesRef")
    ], DialogCampusComponent.prototype, "placesRef");
    DialogCampusComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-campus',
            templateUrl: './dialog-campus.component.html',
            styleUrls: ['./dialog-campus.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogCampusComponent);
    return DialogCampusComponent;
}());
exports.DialogCampusComponent = DialogCampusComponent;
