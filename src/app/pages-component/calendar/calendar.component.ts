import { OnInit, Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { Subject } from 'rxjs';
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarViewPeriod,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import { startOfDay, endOfDay, isSameDay, isSameMonth, isSameMinute } from 'date-fns';
import { ExportAsConfig } from 'ngx-export-as';
import { CalendarDaysComponent } from '../dialog/calendar-days/calendar-days.component';
import { ConfirmationCalendarComponent } from '../dialog/confirmation-calendar/confirmation-calendar.component';
import { Router } from '@angular/router';
import * as moment from 'moment';
import RRule from 'rrule';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { data } from 'jquery';

interface EventGroupMeta {
  type: string;
}

const colors: any = {
  uno: {
    primary: '#ff9500',
    //secondary: '#ff9500',
  },
  dos: {
    primary: '#ffd300',
    //secondary: '#ffd300',
  },
  tres: {
    primary: '#4435a6',
    //secondary: '#4435a6',
  },
  green: {
    primary: '#c7fff6',
    //secondary: '#4435a6',
  },
  red: {
    primary: '#ffe0e0',
    //secondary: '#4435a6',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {


  public filter: any = {
    coordinator: ''
  };
  public filter_c: any = {
    name: ''
  };
  public filter_coor: any = {
    coordinator: ''
  };
  public filter_supplier: any = {
    comercialName: ''
  };
  public __loader__: LoaderComponent = new LoaderComponent();
  ca_country: any[] = [];
  ca_city: any[] = [];
  ca_serviceLine: any[] = [];
  ca_coordinator: any[] = [];
  data_calendar: any = {
    country: "",
    city: "",
    partner: "",
    client: "",
    coordinator: "",
    supplier: "",
    serviceLine: ""
  };
  ca_cliente: any[] = [];
  ca_partner: any[] = [];
  supplier_catalogue: any[] = [];
  user: any;
  public filterCountry: any = {
    name: ''
  };
  public filterCity: any = {
    city: ''
  };
  public filterPartner: any = {
    coordinator: ''
  };
  public filterClient: any = {
    name: ''
  };
  public filterCoordinator: any = {
    coordinator: ''
  };
  public filterSP: any = {
    comercialName: ''
  };
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject < any > = new Subject();
  events: any;
  activeDayIsOpen: boolean = false;
  filteruno: boolean = false;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'export',
    options: { // html-docx-js document options
      jsPDF: {
        orientation: 'landscape'
      },
    }
  }

  constructor(private cdr: ChangeDetectorRef, public _services: ServiceGeneralService, public _dialog: MatDialog, public _router: Router, ) {}


  public recurrencia = [];
  public dataGet: any[] = [];
  public eventos_changeMounth = [];
  //******************************************//
  ionViewWillEnter() {
    let eventos: any;
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.__loader__.showLoader();
    this.get_catalogos();
  }
  //******************************************//
  ngOnInit(): void {
    let eventos: any;
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.__loader__.showLoader();

    this._services.service_general_get('MyDashboard/GetCalendar/' + this.user.id).subscribe((data: any) => {
      if (data.success) {
        eventos = data.map.value;
        console.log("Estos son los eventos: ", eventos);
        this.objectEvents(eventos);
      }
    });
    this.colorBtn('month');
    this.get_catalogos();
  }
  //******************************************//
  //OBJET//
  objectEvents(eventos) {
    let new_format = [];
    let days_available = [];

    days_available = eventos.scheduleUser.filter(E => {
      if (E.title == "Available") {
        return true;
      }
    });

    for (let i = 0; i < days_available.length; i++) {
      if (days_available[i].rrule.byweekday == "[RRule.MO]") {
        days_available[i].day = 1;
      }
      if (days_available[i].rrule.byweekday == "[RRule.TU]") {
        days_available[i].day = 2;
      }
      if (days_available[i].rrule.byweekday == "[RRule.WE]") {
        days_available[i].day = 3;
      }
      if (days_available[i].rrule.byweekday == "[RRule.TH]") {
        days_available[i].day = 4;
      }
      if (days_available[i].rrule.byweekday == "[RRule.FR]") {
        days_available[i].day = 5;
      }
      if (days_available[i].rrule.byweekday == "[RRule.SA]") {
        days_available[i].day = 6;
      }
      if (days_available[i].rrule.byweekday == "[RRule.SU]") {
        days_available[i].day = 7;
      }
    }

    if (days_available.length != 0) {
      days_available.forEach(E => {
        let hora_inicio = E.startTime.split(':');
        let hora_final = E.endTime.split(':');
        let inicio = new Date(E.date);
        inicio.setHours(Number(hora_inicio[0]), Number(hora_inicio[1]));
        let final = new Date(E.date);
        final.setHours(Number(hora_final[0]), Number(hora_final[1]))

        new_format.push({
          id: E.id,
          title: E.title,
          color: colors.green,
          type: 'Available',
          //start: new Date(),
          start: inicio,
          end: final,
          hourStart: E.startTime,
          hourEnd: E.endTime,
          dateStart: inicio,
          dateEnd: final,
          available: true,
          day: E.day,
          dayEdit: [E.day],
          rrule: E.rrule,
          date: E.date,
          date_group: E.date,
          meta: {
            type: 'cuatro'
          }
        })
      });
    }
    let days_not_available = [];
    days_not_available = eventos.scheduleUser.filter(E => {
      if (E.title == "No Available") {
        return true;
      }
    });

    for (let i = 0; i < days_not_available.length; i++) {
      if (days_not_available[i].rrule.byweekday == "[RRule.MO]") {
        days_not_available[i].day = 1;
      }
      if (days_not_available[i].rrule.byweekday == "[RRule.TU]") {
        days_not_available[i].day = 2;
      }
      if (days_not_available[i].rrule.byweekday == "[RRule.WE]") {
        days_not_available[i].day = 3;
      }
      if (days_not_available[i].rrule.byweekday == "[RRule.TH]") {
        days_not_available[i].day = 4;
      }
      if (days_not_available[i].rrule.byweekday == "[RRule.FR]") {
        days_not_available[i].day = 5;
      }
      if (days_not_available[i].rrule.byweekday == "[RRule.SA]") {
        days_not_available[i].day = 6;
      }
      if (days_not_available[i].rrule.byweekday == "[RRule.SU]") {
        days_not_available[i].day = 7;
      }
    }

    if (days_not_available.length != 0) {
      days_not_available.forEach(E => {
        let hora_inicio = E.startTime.split(':');
        let hora_final = E.endTime.split(':');
        let inicio = new Date(E.date);
        inicio.setHours(Number(hora_inicio[0]), Number(hora_inicio[1]));
        let final = new Date(E.date);
        final.setHours(Number(hora_final[0]), Number(hora_final[1]))

        new_format.push({
          id: E.id,
          title: E.title,
          color: colors.red,
          type: 'Available',
          //start: new Date(),
          start: inicio,
          end: final,
          hourStart: E.startTime,
          hourEnd: E.endTime,
          dateStart: inicio,
          dateEnd: final,
          available: false,
          day: E.day,
          dayEdit: [E.day],
          rrule: E.rrule,
          date: E.date,
          date_group: E.date,
          meta: {
            type: 'cinco'
          }
        })
      });
    }

    let titulo;
    for (let i = 0; i < new_format.length; i++) {
      titulo = new_format[i].title;
      new_format[i].title = titulo + ' ' + new_format[i].hourStart + ' - ' + new_format[i].hourEnd
    }
    let hora_inicio;
    let hora_final;
    new_format.forEach(E => {
      hora_inicio = E.hourStart.split(':');
      hora_final = E.hourEnd.split(':');
      E.hora_inicio = hora_inicio[0];
      E.minitos_inicio = hora_inicio[1];
      E.hora_final = hora_final[0];
      E.minitos_final = hora_final[1];
    });

    this.dataGet = new_format;
    console.log(this.dataGet);


    this.eventos_changeMounth = eventos;
    this.filtrar_eventos(eventos);
    this.__loader__.hideLoader();
  }
  //******************************************//
  filtrar_eventos(eventos) {
    //console.log(eventos)
    let data_eventos = eventos.calendar.filter(function (E) {
      if (E.startTime != null && E.startTime != 'string' && E.endTime != null && E.endTime != 'string') {
        return true;
      }
    });
    let a1 = '0800';
    let a2 = '1200';
    let b3 = '1600';
    let c4 = '2000';

    for (let i = 0; i < data_eventos.length; i++) {
      var str = data_eventos[i].startTime;
      if (str != null) {
        data_eventos[i].inicio = str.replace(":", "");
      }
    }
    for (let i = 0; i < data_eventos.length; i++) {
      var str = data_eventos[i].inicio;
      if (str != null) {
        data_eventos[i].inicio = str.replace(":", "");
      }
    }

    let eventos_finales = [];
    for (let i = 0; i < data_eventos.length; i++) {
      if (Number(data_eventos[i].inicio) >= Number(a1)) {
        eventos_finales.push(data_eventos[i]);
      }
    }

    //console.log("Eventos filtrados: ", eventos_finales);
    this.data_calendario(eventos_finales);
  }
  //******************************************//
  //DATA DEL CALENDARIO//
  data_calendario(eventos) {
    this.events = [];
    for (let i = 0; i < eventos.length; i++) {
      var str = eventos[i].startTime;
      if (str != null) {
        eventos[i].inicio = str.replace(":", "");
      }
    }
    for (let i = 0; i < eventos.length; i++) {
      var str = eventos[i].inicio;
      if (str != null) {
        eventos[i].inicio = str.replace(":", "");
      }
    }
    for (let i = 0; i < eventos.length; i++) {
      let hora_inicio = eventos[i].startTime.split(':');
      let hora_final = eventos[i].endTime.split(':');
      let inicio = new Date(eventos[i].date);
      inicio.setHours(Number(hora_inicio[0]), Number(hora_inicio[1]));
      let final = new Date(eventos[i].date);
      final.setHours(Number(hora_final[0]), Number(hora_final[1]))
      let data_evento_prueba = {
        horaInicio: hora_inicio[0],
        horaFinal: hora_final[0],
        start: inicio,
        end: final,
        title: '',
        color: null,
        sr: '',
        date: eventos[i].date,
        id: eventos[i].id,
        time_start: eventos[i].startTime,
        time_end: eventos[i].endTime,
        meta: {
          type: ''
        },
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      }
      let a1 = '0800';
      let a2 = '1200';
      let b = '1600';
      let c = '2000';
      if (Number(eventos[i].inicio) >= Number(a1) && Number(eventos[i].inicio) <= Number(a2)) {
        data_evento_prueba.color = colors.uno;
        data_evento_prueba.meta.type = 'uno';
      }
      if (Number(eventos[i].inicio) >= Number(a2) && Number(eventos[i].inicio) <= Number(b)) {
        data_evento_prueba.color = colors.dos;
        data_evento_prueba.meta.type = 'dos';
      }
      if (Number(eventos[i].inicio) >= Number(b) && Number(eventos[i].inicio) <= Number(c)) {
        data_evento_prueba.color = colors.tres;
        data_evento_prueba.meta.type = 'tres';
      }


      if (eventos[i].services.length > 0) {
        data_evento_prueba.sr = eventos[i].serviceRecordId;
        data_evento_prueba.title = 'SR: ' + eventos[i].serviceRecordId + ' /Supplier: ' + eventos[i].suppliername + ' Assignee: ' + eventos[i].assignee + ' / Partner: ' + eventos[i].name + ' / Client: ' + eventos[i].client + ' / City: ' + eventos[i].city + ' / ' + eventos[i].services[0].category + ' / ' + eventos[i].services[0].serviceNumber;
        this.events.push(data_evento_prueba);
      }
    };

    console.log(this.events);


    for (let i = 0; i < this.dataGet.length; i++) {
      const element = this.dataGet[i];
      this.events.push(element);
    }
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].title && this.events[i].title == "Available") {
        this.events[i].color = colors.green;
      }
      if (this.events[i].title && this.events[i].title == "No Available") {
        this.events[i].color = colors.red;
      }
    }



    let aux = [];
    let c = 0;
    this.groupedSimilarEvents = [];
    const processedEvents = new Set();
    let a1 = '08';
    let a2 = '12';
    let a3 = '16';
    let a4 = '20';
    this.events.forEach((event) => {
      if (processedEvents.has(event)) {
        return;
      }
      const similarEvents = this.events.filter((otherEvent) => {
      
        
          

        if (otherEvent !== event &&
            !processedEvents.has(otherEvent) &&
            isSameMinute(otherEvent.start, event.start) &&
            (isSameMinute(otherEvent.end, event.end) ||
            (!otherEvent.end && !event.end)) &&
            otherEvent.date == event.date && otherEvent.sr == event.sr &&
            otherEvent.color.primary === event.color.primary &&
            otherEvent.color.sr === event.sr){

              console.log("ENTRA A PRIMER IF MAÑANA");
              console.log(event.sr,  otherEvent.sr);
              return true;
        }


        if (otherEvent.rrule == event.rrule && otherEvent.rrule != undefined && event.rrule != undefined && !processedEvents.has(otherEvent) && event.date == otherEvent.date) {
          console.log("ENTRA A SEGUNDO IF AVAILABLE");
          return true;
        }

      });

      processedEvents.add(event);
      similarEvents.forEach((otherEvent) => {
        processedEvents.add(otherEvent);
      });
      if (similarEvents.length > 0) {
        this.groupedSimilarEvents.push({
          title: `${similarEvents.length + 1} events`,
          color: event.color,
          start: event.start,
          end: event.end,
          meta: {
            groupedEvents: [event, ...similarEvents],
          },
        });
      } else {
        this.groupedSimilarEvents.push(event);
      }
    });
    //******************************************************************//


    console.log(this.groupedSimilarEvents);
    console.log(this.events);

    this.setIcon();

  }
  //******************************************//
  public groupedSimilarEvents: CalendarEvent[] = [];
  //******************************************//
  //CONSULTA INFORMACION DE LOS CATALOGOS//
  async get_catalogos() {
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_partner = await this._services.getCatalogueFrom('GetPartner');
  }
  //******************************************//
  //consulta client
  getClient() {
    console.log("consulta Cliente");
    this._services.service_general_get('Catalogue/GetClient/' + this.data_calendar.partner).subscribe((data => {
      if (data.success) {
        this.ca_cliente = data.result.value;
      }
    }))
  }
  //******************************************//
  //consulta coordinator
  getCoordinatorImmigration() {
    this._services.service_general_get("Catalogue/GetCoordinator/" + this.data_calendar.client + "?servileLine=" + this.data_calendar.serviceLine).subscribe((data => {
      if (data.success) {
        console.log("select coordinator new SR Immigration: ", data.result);
        this.ca_coordinator = data.result.value;
      }
    }));
  }
  //******************************************//
  //consulta supplier partner
  getSupplierPartner() {
    if (this.data_calendar.serviceLine == "" || this.data_calendar.country == "" || this.data_calendar.city == "") {
      return true;
    }
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerConsultant?country=" + this.data_calendar.country + "&city=" + this.data_calendar.city + "&serviceLine=" + this.data_calendar.serviceLine).subscribe((data => {
      if (data.success) {
        console.log("select supplier: ", data.result.value);
        this.supplier_catalogue = data.result.value;
      }
    }));
  }
  //CONSULTA DE CIUDAD//
  getCity() {
    console.log("consulta ciudad");
    this._services.service_general_get('Catalogue/GetState?country=' + this.data_calendar.country).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    }))
  }
  //******************************************//
  //FUNCION PARA BUSQUEDA DE EVENTOS//
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.data_calendar) {
      if (this.data_calendar[item] != '') {
        service_record_params_selected += `${item}=${this.data_calendar[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getServiceRecordTableData(params);

  }
  //******************************************//
  //CONSULTA INFORMACION POR FILTRO//
  public getServiceRecordTableData(params: string = ''): void {
    this.__loader__.showLoader();
    this.events = [];
    const params_in: string = params == '' ? '' : `?${params}`;
    this._services.service_general_get('MyDashboard/GetCalendar/' + this.user.id + params_in).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.map.value;
        console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
        this.objectEvents(eventos);
      }
    });
  }
  //******************************************//
  //FILTRO DE INFORMACION POR CAMPO ABIERTO//
  public respaldo: any;
  applyFilter(event: Event) {
    this.events = this.respaldo;
    let input_model = this.data_calendar.filter;
    this.events = this.events.filter(E => {
      return E.title.toLowerCase().indexOf(input_model.toLowerCase()) > -1;
    })
    console.log("Eventos filtrados search", this.events);
  }
  //******************************************//
  //SET ICON//
  public setIcon() {
    setTimeout(() => {
      let elementos = document.getElementsByClassName('cal-event');
      for (let i = 0; i < elementos.length; i++) {
        let element: any = elementos[i];
        if (element.style.backgroundColor == 'rgb(255, 211, 0)') {}

        if (element.style.backgroundColor == 'rgb(68, 53, 166)') {}

        if (element.style.backgroundColor == 'rgb(255, 149, 0)') {}
      }
    }, 10);
  }
  //COLOR BTN//
  colorBtn(btn: string) {
    document.getElementById('month').className = "color_button";
    document.getElementById('week').className = "color_button";
    document.getElementById('day').className = "color_button";
    document.getElementById(btn).className = "color_button_active";
  }
  //CLEAN FILTER//
  public cleanFilter(): void {
    this.filterCountry = {
      name: ''
    };
    this.filterCity = {
      city: ''
    };
    this.filterPartner = {
      coordinator: ''
    };
    this.filterClient = {
      name: ''
    };
    this.filterCoordinator = {
      coordinator: ''
    };
    this.filterSP = {
      comercialName: ''
    };

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
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
  //***********************************************************************************************//
  //FUNCIONES DEL CALENDARIO Y RECURRENCIA//
  setView(view: CalendarView) {
    this.view = view;
  }
  //******************************************//
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  //******************************************//
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDayViewDate: Date;
  hourColumns: WeekViewHourColumn[];
  selectedDays: any = [];
  public hora_no_disponibles = [];
  public contador_click = 0;
  public mostrar_boton_available:boolean = false;
  dayClicked(day: CalendarMonthViewDay, {
    date,
    events
  }: {
    date: Date;events: CalendarEvent[]
  }): void {
    console.log("5");
    this.mostrar_boton_available = false;
    let eventos_del_filtro = [];
    console.log("ESTOS SON LOS EVENTOS DEL DIA: ", events);
    events.forEach((E:any) => {
      if(E.type == "Available"){
        eventos_del_filtro.push(E);
      }
      if(E.type == "No Available"){
        eventos_del_filtro.push(E);
      }
    });
    
    console.log("EVENTOS FILTRADOS: ", eventos_del_filtro);
    
    this.hora_no_disponibles = [];
    eventos_del_filtro.forEach(E => {
        this.hora_no_disponibles.push({
        hora_inicio: E.hora_inicio,
        hora_final:E.hora_final,
        id:E.id
      })
    });

    let disponibilidad = [
      { hora: 9,  disponible: 1},
      { hora: 10, disponible: 1},
      { hora: 11, disponible: 1},
      { hora: 12, disponible: 1},
      { hora: 13, disponible: 1},
      { hora: 14, disponible: 1},
      { hora: 15, disponible: 1},
      { hora: 16, disponible: 1},
      { hora: 17, disponible: 1},
      { hora: 18, disponible: 1},
      { hora: 19, disponible: 1},
      { hora: 20, disponible: 1},
    ];

    for (let i = 0; i < eventos_del_filtro.length; i++) {
      for (let j = 0; j < disponibilidad.length; j++) {
        if (disponibilidad[j].hora >= Number(eventos_del_filtro[i].hora_inicio) && disponibilidad[j].hora < Number(eventos_del_filtro[i].hora_final)) {
          disponibilidad[j].disponible = 0;
        }
        if (disponibilidad[j].hora > Number(eventos_del_filtro[i].hora_inicio) && disponibilidad[j].hora <= Number(eventos_del_filtro[i].hora_final)) {
          disponibilidad[j].disponible = 0;
        }
      }
    }    

    console.log("DISPONIBILIDAD: ", disponibilidad);
    let aux = 0;
    disponibilidad.forEach(E => {
      if(E.disponible == 0){
        aux++;
      }
    });

    if(aux == 12){
      this.mostrar_boton_available = true;
    }
    
    this.contador_click++;
    setTimeout(() => {
      if (this.contador_click >= 2 && this.user.role.id == 3) {
        this.selectedMonthViewDay = day;
        const selectedDateTime = this.selectedMonthViewDay.date.getTime();
        const dateIndex = this.selectedDays.findIndex(
          (selectedDay) => selectedDay.date.getTime() === selectedDateTime
        );
        if (dateIndex > -1) {
          delete this.selectedMonthViewDay.cssClass;
          this.selectedDays.splice(dateIndex, 1);
        } else {
          this.selectedDays.push(this.selectedMonthViewDay);
          day.cssClass = 'cal-day-selected';
          this.selectedMonthViewDay = day;
          console.log("Entra a hacer push a los dias que se agregaran availability");
          console.log(this.selectedDays);
          console.log(this.selectedMonthViewDay);
        }
      } else if (this.contador_click == 1) {
        this.selectedDays = [];
        //AQUI SE DESPLIEGA EL DETALLE DEL APPOINTMENT//
        if (isSameMonth(date, this.viewDate)) {
          if (
            (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
            events.length === 0
          ) {
            this.activeDayIsOpen = false;

          } else {
            this.activeDayIsOpen = true;
          }
          this.viewDate = date;
        };
      }
      this.contador_click = 0;
    }, 500);
  }
  //******************************************//
  dialogConfirmAvailability() {
    //ABRE MODAL PARA AGREGAR HORAS//
    const dialogRef = this._dialog.open(ConfirmationCalendarComponent, {
      data: {
        header: "Availability Calendar",
        body: "Do you want to modify the availability in the calendar?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let information = {
          id: 0,
          day: [],
          daysSelected: this.selectedDays,
          horaNoDisponible: this.hora_no_disponibles,
          operacion: 'inserccion'
        }
        this.selectedDays.forEach((E: any) => {
          if (E.date.getDay() == 0) {
            information.day.push(7);
          }
          if (E.date.getDay() == 1) {
            information.day.push(1);
          }
          if (E.date.getDay() == 2) {
            information.day.push(2);
          }
          if (E.date.getDay() == 3) {
            information.day.push(3);
          }
          if (E.date.getDay() == 4) {
            information.day.push(4);
          }
          if (E.date.getDay() == 5) {
            information.day.push(5);
          }
          if (E.date.getDay() == 6) {
            information.day.push(6);
          }
        });

        this.selectDay(information);
      }
    })
  }
  //******************************************//
  selectDay(information) {
    console.log("ENTRA A FUNCION SELECTED DAY: ", information);
    const dialogRef = this._dialog.open(CalendarDaysComponent, {
      data: information,
      width: "70%"
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.selectedDays = [];
      await this.ngOnInit();
    });
  }
  //******************************************//
  beforeMonthViewRender({body,}: { body: CalendarMonthViewDay < EventGroupMeta > [];}, renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    console.log("4");
    console.log("before: ", body);
    let eventos_calendario = [];
    // month view has a different UX from the week and day view so we only really need to group by the type
    body.forEach((cell) => {
      const groups = {};
      cell.events.forEach((event: CalendarEvent < EventGroupMeta > ) => {
        //console.log('evenyos before: ', event);
        eventos_calendario.push(event);
        groups[event.meta.type] = groups[event.meta.type] || [];
        groups[event.meta.type].push(event);
      });
      cell['eventGroups'] = Object.entries(groups);
    });

    console.log("EVENTOS CALENDARIO: ",  eventos_calendario);
    let contador = 0;
    let aux = [];
    eventos_calendario.forEach(E => {
      if(E.type == "Available"){
         aux.push(E);
      }
    });

    renderEvent.body.forEach((day) => {
      let evento:any = day.events;
      let contador_horas = 0;
      for (let i = 0; i < evento.length; i++) {
        if(evento[i].type == "Available"){
          contador_horas = Number(evento[i].hora_final) - Number(evento[i].hora_inicio);
          if(contador_horas == 11 ){
            day.cssClass = 'bg-noavailable';
          }

          if(contador_horas < 11){
            day.cssClass = 'bg-available';
          }
        }
      }
    });

    /*
    
    
   

    aux.forEach(E => {
      for (let i = 0; i < aux.length; i++) {

        if(new Date(E.date) == new Date(aux[i].date) && E.type == aux[i].type){
          contador = contador + Number(aux[i].hora_final) - Number(aux[i].hora_inicio);
        }

        if(contador == 11){
          E.cssClass = 'bg-noavailable';
        }else{
          E.cssClass = 'bg-available';
        }

      }
    });
    */
    
  }

  hourSegmentClicked(date: Date) {
    console.log("3");
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
    console.log("2");
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    console.log("1");
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          if (
            this.selectedDayViewDate &&
            segment.date.getTime() === this.selectedDayViewDate.getTime()
          ) {
            segment.cssClass = 'cal-day-selected';
          }
        });
      });
    });
  }

  handleEvent(action: string, event): void {
    console.log("handle event", event);
    event.horaNoDisponible = this.hora_no_disponibles;
    event.operacion = 'edicion';
    let evento_data: any;
    evento_data = event;
    if (evento_data.type && evento_data.type == 'Available') {
      const dialogRef = this._dialog.open(ConfirmationCalendarComponent, {
        data: {
          header: "Availability Calendar",
          body: "Do you want to modify the availability in the calendar?"
        },
        width: "350px"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectDay(event);
        }
      })
    } else {
      this._router.navigateByUrl('editServiceRecord/' + event.sr);
    }
  }
}
