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
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var dialog_timeoffrequest_component_1 = require("../dialog/dialog-timeoffrequest/dialog-timeoffrequest.component");
var loader_1 = require("app/shared/loader");
var dialog_post_it_component_1 = require("./../dialog/dialog-post-it/dialog-post-it.component");
var general_message_component_1 = require("./../dialog/general-message/general-message.component");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_services, _dialog, http) {
        this._services = _services;
        this._dialog = _dialog;
        this.http = http;
        this.date = new Date();
        this.postString = "";
        this.homeLogo = {}; //datos del homeLogo
        // variables openweathermap
        this.apikey = '8440d47f0341f0d1dfa7177f61935122';
        this.URI = '';
        // public latitude: number;
        // public longitude: number;
        this.__loader__ = new loader_1.LoaderComponent();
        this.tarjetas_iterables = [
            {
                "avatar": "/Files/Pets/2d0a3d38-a34e-4b80-b018-683d4e24bce9.jpg",
                "name": "Lorem Ipsum",
                "title": "Coordinator"
            },
            {
                "avatar": "/Files/Pets/2d0a3d38-a34e-4b80-b018-683d4e24bce9.jpg",
                "name": "Lorem Ipsum",
                "title": "Coordinator"
            },
            {
                "avatar": "/Files/Pets/2d0a3d38-a34e-4b80-b018-683d4e24bce9.jpg",
                "name": "Lorem Ipsum",
                "title": "Coordinator"
            },
        ];
        this.famousPhrases = [];
        this.experienceTeam = [];
        this.upcomigEvent = [];
        this.imagesId = [];
        // this.URI = `http://api.openweathermap.org/data/2.5/weather?appid=${this.apikey}&q=`;
        // this.URI = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}`;
        // http://api.openweathermap.org/data/2.5/weather?lat=20.482669599999998&lon=-86.93235290000001&appid=8440d47f0341f0d1dfa7177f61935122
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getSlider();
        this.findMe();
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log('Datos del usuario', this.user);
        this.get_catalogos();
        // $('.owl-carousel').owlCarousel();
        this.getUpcoming();
        // this.coordenadas = this.localizacion;
        // this.getWeather(19.4978, -99.1269);
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        var cardCelebres = { "width": '100%', "height": '100%', "overflow": 'hidden' };
        var caroucelImg = { "width": '100%', "height": '18rem' };
        var frasesCelebres = { "width": '100%', "height": 'auto', "text-align": 'center', "position": 'absolute', "bottom": '5px', "background-color": 'rgba(255, 255, 255, 0.6)' };
        var textFrasesCelebres = { "margin": '8px 5px', "font-size": '15px', "font-weight": 'bold !important', "color": '#9d3292', "text-align": 'center' };
        $(".cardCelebres").addClass(cardCelebres);
        $(".caroucelImg").addClass(caroucelImg);
        $(".frasesCelebres").addClass(frasesCelebres);
        $(".textFrasesCelebres").addClass(textFrasesCelebres);
        $('.owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 10,
            mouseDrag: true,
            touchDrag: true,
            autoplayTimeout: 7000,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    };
    HomeComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.__loader__.showLoader();
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.country_catalogue = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetState')];
                    case 2:
                        _b.country_city = _c.sent();
                        this._services.service_general_get('Profile/GetDashboardInicio?userId=2').subscribe(function (r) {
                            if (r.success) {
                                _this.homeLogo = r.result;
                                console.log('Data home logo', _this.homeLogo);
                                // this.upcomigEvent = this.homeLogo.data.upcomig_event;
                                // this.tarjetas_iterables = r.result.value[0].incompany;
                                _this.experienceTeam = r.result.value[0].experience_team;
                            }
                        });
                        this.__loader__.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.dateDay = function (date) {
        var result = '';
        if (date != null) {
            var date_to_work = date, date_remove_time = date_to_work.split('-')[2];
            // const dateDia = date_remove_time.split('T')[0];
            // console.log('dia', dateDia);
            result = date_remove_time.split('T')[0];
        }
        else {
            result = 'No Date';
        }
        return result;
    };
    HomeComponent.prototype.dateMonth = function (date) {
        this.meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        // let resultM: string = '';
        if (date != null) {
            var dia = date;
            // console.log('dia', date);
            var dateDia = dia.split('T')[3];
            dateDia = new Date();
            // console.log('formatofecha', dateDia);
            // console.log(dia.getDate() + " de " + this.meses[dia.getMonth()] + " de " + dia.getFullYear());
            this.mesResp = this.meses[dateDia.getMonth()];
            // console.log(this.mesResp);
            // const date_to_work_month: string = date,
            // date_remove_month = date_to_work_month.split('-')[1];
            // resultM = date_remove_month;
            // this.mesResp = this.meses.indexOf(resultM);
            // console.log(this.mesResp)
        }
        else {
            this.mesResp = 'No Date';
        }
        return this.mesResp;
    };
    HomeComponent.prototype.getUpcoming = function () {
        var _this = this;
        this._services.service_general_get('AdminCenter/GetUpcomingEvents').subscribe(function (respeven) {
            console.log('catalogo upcoming event', respeven);
            if (respeven.success) {
                _this.upcomigEvent = respeven.result;
            }
        });
    };
    HomeComponent.prototype.getSlider = function () {
        var _this = this;
        this.imagesId = [];
        this._services.service_general_get('AdminCenter/GetSliderPhrase').subscribe(function (respeven) {
            console.log('slider', respeven);
            if (respeven.success) {
                _this.famousPhrases = respeven.result;
                for (var i = 0; i < _this.famousPhrases.length; i++) {
                    var element = _this.famousPhrases[i];
                    // const id = i + 1;
                    // const idd = id.toString();
                    _this.imagesId.push({
                        id: element.id.toString(),
                        image: _this._services.url_images + element.image,
                        phrase: element.phrase
                    });
                }
            }
        });
    };
    //GET COUNTRY ORIGIN NAME//
    HomeComponent.prototype.getCountryOriginName = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            if (this.country_catalogue[i].id == id) {
                return this.country_catalogue[i].name;
            }
        }
    };
    HomeComponent.prototype.getCity = function (id) {
        for (var i = 0; i < this.country_city.length; i++) {
            if (this.country_city[i].id == id) {
                return this.country_city[i].city;
            }
        }
    };
    // funcion que extrae las coordenadas
    HomeComponent.prototype.findMe = function () {
        console.log('entrando a findme');
        if (navigator.geolocation) {
            console.log('el navegador soporta geolocalizacion');
        }
        else {
            console.log('el navegador no soporta geolocalizacion');
        }
        var that = this;
        function localization(posicion) {
            var coorde = [];
            var latitude = posicion.coords.latitude;
            var longitude = posicion.coords.longitude;
            coorde.push({ latitude: latitude });
            coorde.push({ longitude: longitude });
            console.log('coordenadas', coorde);
            // this.coordenadas;
            // this.coordenadas = coorde;
            // getWeather
            console.log(latitude, longitude);
            localStorage.setItem('latitud', latitude);
            localStorage.setItem('longitud', longitude);
            that.getWeather(coorde[0].latitude, coorde[1].longitude);
            // this.getWeather(coorde[0].latitude, coorde[1].longitude);
            // return coorde;
        }
        // function error() {
        //   console.log('No se pudo obtener la ubicacion',);
        //   // this.getWeather(19.4978, -99.1269);
        // }
        navigator.geolocation.getCurrentPosition(localization, function (error) {
            if (error.code == 0) {
                console.log(error);
                that.getWeather(19.4978, -99.1269);
                // error desconocido.
            }
            else if (error.code == 1) {
                console.log(error);
                that.getWeather(19.4978, -99.1269);
                // El usuario denegó el permiso para la Geolocalización.
            }
            else if (error.code == 2) {
                // La ubicación no está disponible.
                console.log(error);
                that.getWeather(19.4978, -99.1269);
            }
            else if (error.code == 3) {
                // Se ha excedido el tiempo para obtener la ubicación.
                console.log(error);
                that.getWeather(19.4978, -99.1269);
            }
        });
    };
    // trae el pronostico del clima con respecto a coordenadas
    HomeComponent.prototype.getWeather = function (lat, lon) {
        var _this = this;
        if (lat == undefined && lon == undefined) {
            console.log('entrando a getweather');
            this.dataClima = this.http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + 19.4978 + "&lon=" + -99.1269 + "&appid=" + this.apikey)
                .subscribe(function (resp) {
                _this.weather = resp;
                _this.urlIcon = "http://openweathermap.org/img/wn/" + _this.weather.weather[0].icon + "@2x.png";
                _this.converFC = ((_this.weather.main.temp - 273.15)).toFixed(0);
                console.log(_this.weather);
                console.log('resp clima', resp);
            }, function (err) { return console.log('error clima', err); });
            console.log('weather', this.weather);
        }
        else {
            console.log('entrando a getweather');
            this.dataClima = this.http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + this.apikey)
                .subscribe(function (resp) {
                _this.weather = resp;
                _this.urlIcon = "http://openweathermap.org/img/wn/" + _this.weather.weather[0].icon + "@2x.png";
                _this.converFC = ((_this.weather.main.temp - 273.15)).toFixed(0);
                console.log(_this.weather);
                console.log('resp clima', resp);
            }, function (err) { return console.log('error clima', err); });
            console.log('weather', this.weather);
        }
    };
    HomeComponent.prototype.openReminders = function () {
        var dialogRef = this._dialog.open(dialog_timeoffrequest_component_1.DialogTimeoffrequestComponent, {
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    // stickynotes
    HomeComponent.prototype.addStickynote = function () {
        var _this = this;
        // comprovar si se inserto
        if (this.postString == '') {
            var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "warning",
                    body: "Write a note"
                },
                width: "350px"
            });
        }
        else {
            this.__loader__.showLoader();
            this._services.service_general_post_with_url("PostIt", {
                id: 0,
                post: this.postString,
                color: '',
                createdBy: this.user.id,
                createdDate: new Date(),
                updatedBy: this.user.id,
                updatedDate: new Date()
            }).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                        data: {
                            header: "Success",
                            body: "Insert sticky note"
                        },
                        width: "350px"
                    });
                }
                _this.postString = "";
                _this.ngOnInit();
                _this.__loader__.hideLoader();
            });
        }
    };
    HomeComponent.prototype.viewStickynote = function () {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_post_it_component_1.DialogPostItComponent, {
            data: { id: this.user.id },
            width: "55%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
            $(document).ready(function () {
                var cardCelebres = { "width": '100%', "height": '100%', "overflow": 'hidden' };
                var caroucelImg = { "width": '100%', "height": '18rem' };
                var frasesCelebres = { "width": '100%', "height": 'auto', "text-align": 'center', "position": 'absolute', "bottom": '5px', "background-color": 'rgba(255, 255, 255, 0.6)' };
                var textFrasesCelebres = { "margin": '8px 5px', "font-size": '15px', "font-weight": 'bold !important', "color": '#9d3292', "text-align": 'center' };
                $(".cardCelebres").addClass(cardCelebres);
                $(".caroucelImg").addClass(caroucelImg);
                $(".frasesCelebres").addClass(frasesCelebres);
                $(".textFrasesCelebres").addClass(textFrasesCelebres);
                $('.owl-carousel').owlCarousel({
                    loop: true,
                    autoplay: true,
                    margin: 10,
                    mouseDrag: true,
                    touchDrag: true,
                    autoplayTimeout: 7000,
                    nav: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 1
                        },
                        1000: {
                            items: 1
                        }
                    }
                });
            });
        });
        //this.ngOnInit();
    };
    HomeComponent.prototype.getData = function (data) {
        this.activeSlides = data;
        console.log(this.activeSlides);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
var SlidesOutputData = /** @class */ (function () {
    function SlidesOutputData() {
    }
    return SlidesOutputData;
}());
;
var SlideModel = /** @class */ (function () {
    function SlideModel() {
        this.id = '';
        this.image = '';
        this.phrase = '';
    }
    return SlideModel;
}());
