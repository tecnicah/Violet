"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CalendarComponent = void 0;
var core_1 = require("@angular/core");
var loader_1 = require("app/shared/loader");
var rxjs_1 = require("rxjs");
var angular_calendar_1 = require("angular-calendar");
var date_fns_1 = require("date-fns");
var colors = {
    uno: {
        primary: '#ff9500'
    },
    dos: {
        primary: '#ffd300'
    },
    tres: {
        primary: '#4435a6'
    }
};
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(_services, _dialog) {
        this._services = _services;
        this._dialog = _dialog;
        this.filter = { coordinator: '' };
        this.filter_c = { name: '' };
        this.filter_coor = { coordinator: '' };
        this.filter_supplier = { comercialName: '' };
        this.__loader__ = new loader_1.LoaderComponent();
        this.ca_country = [];
        this.ca_city = [];
        this.ca_serviceLine = [];
        this.ca_coordinator = [];
        this.data_calendar = {
            country: "",
            city: "",
            partner: "",
            client: "",
            coordinator: "",
            supplier: "",
            serviceLine: ""
        };
        this.ca_cliente = [];
        this.ca_partner = [];
        this.supplier_catalogue = [];
        // public range = new FormGroup({
        //   rangeDate1: new FormControl(),
        //   rangeDate2: new FormControl()
        // });
        this.view = angular_calendar_1.CalendarView.Month;
        this.CalendarView = angular_calendar_1.CalendarView;
        this.viewDate = new Date();
        this.refresh = new rxjs_1.Subject();
        this.events = [];
        this.activeDayIsOpen = false;
        this.filteruno = false;
        this.exportAsConfig = {
            type: 'pdf',
            elementIdOrContent: 'export',
            options: {
                jsPDF: {
                    orientation: 'landscape'
                }
            }
        };
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.__loader__.showLoader();
        this._services.service_general_get('MyDashboard/GetCalendar/' + this.user.id).subscribe(function (data) {
            if (data.success) {
                var eventos = data.map.value;
                _this.filtrar_eventos(eventos);
                //this.data_calendario(eventos);
                _this.__loader__.hideLoader();
            }
        });
        this.colorBtn('month');
        this.get_catalogos();
    };
    //******************************************//
    CalendarComponent.prototype.filtrar_eventos = function (eventos) {
        console.log(eventos);
        var data_eventos = eventos.filter(function (E) {
            if (E.startTime != null && E.startTime != 'string' && E.endTime != null && E.endTime != 'string') {
                return true;
            }
        });
        var a1 = '0800';
        var a2 = '1200';
        var b3 = '1600';
        var c4 = '2000';
        for (var i = 0; i < data_eventos.length; i++) {
            var str = data_eventos[i].startTime;
            if (str != null) {
                data_eventos[i].inicio = str.replace(":", "");
            }
        }
        for (var i = 0; i < data_eventos.length; i++) {
            var str = data_eventos[i].inicio;
            if (str != null) {
                data_eventos[i].inicio = str.replace(":", "");
            }
        }
        var eventos_finales = [];
        for (var i = 0; i < data_eventos.length; i++) {
            if (Number(data_eventos[i].inicio) >= Number(a1)) {
                eventos_finales.push(data_eventos[i]);
            }
        }
        console.log("Eventos filtrados: ", eventos_finales);
        this.data_calendario(eventos_finales);
    };
    //******************************************//
    //DATA DEL CALENDARIO//
    CalendarComponent.prototype.data_calendario = function (eventos) {
        this.events = [];
        for (var i = 0; i < eventos.length; i++) {
            var str = eventos[i].startTime;
            if (str != null) {
                eventos[i].inicio = str.replace(":", "");
            }
        }
        for (var i = 0; i < eventos.length; i++) {
            var str = eventos[i].inicio;
            if (str != null) {
                eventos[i].inicio = str.replace(":", "");
            }
        }
        console.log("ESTOS SON LOS EVENTOS: ", eventos);
        for (var i = 0; i < eventos.length; i++) {
            var data_evento_prueba = {
                start: date_fns_1.addHours(date_fns_1.startOfDay(date_fns_1.parseISO(eventos[i].date)), 2),
                end: date_fns_1.addHours(date_fns_1.parseISO(eventos[i].date), 2),
                title: '',
                color: null,
                //actions: this.actions,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            };
            var a1 = '0800';
            var a2 = '1200';
            var b = '1600';
            var c = '2000';
            if (Number(eventos[i].inicio) >= Number(a1) && Number(eventos[i].inicio) <= Number(a2)) {
                data_evento_prueba.color = colors.uno;
            }
            if (Number(eventos[i].inicio) >= Number(a2) && Number(eventos[i].inicio) <= Number(b)) {
                data_evento_prueba.color = colors.dos;
            }
            if (Number(eventos[i].inicio) >= Number(b) && Number(eventos[i].inicio) <= Number(c)) {
                data_evento_prueba.color = colors.tres;
            }
            for (var j = 0; j < eventos[i].services.length; j++) {
                data_evento_prueba.title = 'Assigne: ' + eventos[i].assignee + ' / Partner: ' + eventos[i].name + ' / Client: ' + eventos[i].client + ' / City: ' + eventos[i].city + ' / ' + eventos[i].services[j].category + ' / ' + eventos[i].services[j].serviceNumber + ' / Time:' + eventos[i].startTime + ' - ' + eventos[i].endTime;
                this.events.push(data_evento_prueba);
            }
        }
        ;
        console.log(this.events);
        this.setIcon();
    };
    //******************************************//
    //CONSULTA INFORMACION DE LOS CATALOGOS//
    CalendarComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.ca_country = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 2:
                        _b.ca_serviceLine = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPartner')];
                    case 3:
                        _c.ca_partner = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //******************************************//
    //consulta client
    CalendarComponent.prototype.getClient = function () {
        var _this = this;
        console.log("consulta Cliente");
        this._services.service_general_get('Catalogue/GetClient/' + this.data_calendar.partner).subscribe((function (data) {
            if (data.success) {
                _this.ca_cliente = data.result.value;
            }
        }));
    };
    CalendarComponent.prototype.getCoordinatorImmigration = function () {
        var _this = this;
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.data_calendar.client + "?servileLine=" + this.data_calendar.serviceLine).subscribe((function (data) {
            if (data.success) {
                console.log("select coordinator new SR Immigration: ", data.result);
                _this.ca_coordinator = data.result.value;
            }
        }));
    };
    CalendarComponent.prototype.getSupplierPartner = function () {
        var _this = this;
        if (this.data_calendar.serviceLine == "" || this.data_calendar.country == "" || this.data_calendar.city == "") {
            return true;
        }
        this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerConsultant?country=" + this.data_calendar.country + "&city=" + this.data_calendar.city + "&serviceLine=" + this.data_calendar.serviceLine).subscribe((function (data) {
            if (data.success) {
                console.log("select supplier: ", data.result.value);
                _this.supplier_catalogue = data.result.value;
            }
        }));
    };
    //CONSULTA DE CIUDAD//
    CalendarComponent.prototype.getCity = function () {
        var _this = this;
        console.log("consulta ciudad");
        this._services.service_general_get('Catalogue/GetState?country=' + this.data_calendar.country).subscribe((function (data) {
            if (data.success) {
                _this.ca_city = data.result;
            }
        }));
    };
    //******************************************//
    //FUNCION PARA BUSQUEDA DE EVENTOS//
    CalendarComponent.prototype.searchData = function () {
        var service_record_params_selected = '';
        ;
        var params = '';
        for (var item in this.data_calendar) {
            if (this.data_calendar[item] != '') {
                service_record_params_selected += item + "=" + this.data_calendar[item] + "&";
                params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
            }
        }
        console.log("PARAMETROS DE BUSQUEDA: ", params);
        this.getServiceRecordTableData(params);
    };
    //******************************************//
    //CONSULTA INFORMACION POR FILTRO//
    CalendarComponent.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.__loader__.showLoader();
        this.events = [];
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('MyDashboard/GetCalendar/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                var eventos = data.map.value;
                console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
                _this.data_calendario(eventos);
                _this.__loader__.hideLoader();
            }
        });
    };
    //******************************************//
    //FILTRO DE INFORMACION POR CAMPO ABIERTO//
    CalendarComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        //this.events = filterValue.trim().toLowerCase();
    };
    //******************************************//
    //FUNCIONES DEL CALENDARIO//
    CalendarComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        console.log('i');
        this.setIcon();
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    };
    //******************************************//
    CalendarComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        console.log('ii');
        this.events = this.events.map(function (iEvent) {
            if (iEvent === event) {
                return __assign(__assign({}, event), { start: newStart, end: newEnd });
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    };
    //******************************************//
    CalendarComponent.prototype.handleEvent = function (action, event) {
        console.log("4");
        //this.modalData = { event, action };
        //this.modal.open(this.modalContent, { size: 'lg' });
    };
    //******************************************//
    CalendarComponent.prototype.addEvent = function () {
        this.events = __spreadArrays(this.events, [
            {
                title: 'New event',
                start: date_fns_1.startOfDay(new Date()),
                end: date_fns_1.endOfDay(new Date()),
                //color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
        ]);
    };
    //******************************************//
    CalendarComponent.prototype.deleteEvent = function (eventToDelete) {
        console.log("3");
        this.events = this.events.filter(function (event) { return event !== eventToDelete; });
    };
    //******************************************//
    CalendarComponent.prototype.setView = function (view) {
        console.log("2");
        this.view = view;
        this.setIcon();
    };
    CalendarComponent.prototype.colorBtn = function (btn) {
        document.getElementById('month').className = "color_button";
        document.getElementById('week').className = "color_button";
        document.getElementById('day').className = "color_button";
        document.getElementById(btn).className = "color_button_active";
    };
    //******************************************//
    CalendarComponent.prototype.closeOpenMonthViewDay = function () {
        console.log("1");
        this.setIcon();
        this.activeDayIsOpen = false;
    };
    //******************************************//
    //FILTRO FECHA//
    // public filteringServiceRecordTable(): void {
    //   let service_record_params_selected = '';
    //   let params: string = '';
    //   if (this.range.value.rangeDate1 != null) this.data_calendar.rangeDate1 = this.filterDate(this.range.value.rangeDate1);
    //   if (this.range.value.rangeDate2 != null) this.data_calendar.rangeDate2 = this.filterDate(this.range.value.rangeDate2);
    //   for (let item in this.data_calendar) {
    //     if (this.data_calendar[item] != '') {
    //       service_record_params_selected += `${ item }=${ this.data_calendar[item] }&`;
    //       params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
    //     }
    //   }
    //   if(this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null){
    //     this.getServiceRecordTableData(params);
    //   }
    // }
    //******************************************//
    CalendarComponent.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //******************************************//
    CalendarComponent.prototype.cleanFilter = function () {
        var _this = this;
        this.data_calendar = {
            country: "",
            city: "",
            partner: "",
            client: "",
            coordinator: "",
            supplier: "",
            serviceLine: ""
        };
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ngOnInit();
    };
    //******************************************//
    CalendarComponent.prototype.setIcon = function () {
        setTimeout(function () {
            var elementos = document.getElementsByClassName('cal-event');
            for (var i = 0; i < elementos.length; i++) {
                var element = elementos[i];
                if (element.style.backgroundColor == 'rgb(255, 211, 0)') {
                    console.log('entra');
                    //  element.className += " midday";
                }
                if (element.style.backgroundColor == 'rgb(68, 53, 166)') {
                    console.log('entra');
                    // element.className += " afternoon";
                }
                if (element.style.backgroundColor == 'rgb(255, 149, 0)') {
                    console.log('entra');
                    // element.className += " morning";
                }
            }
        }, 10);
    };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'app-calendar',
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.css']
        })
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
