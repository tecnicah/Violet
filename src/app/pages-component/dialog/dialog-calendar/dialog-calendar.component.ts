//import { Component, OnInit, Inject } from '@angular/core';
import {Inject, OnInit, Component, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { Subject } from 'rxjs';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { startOfDay, endOfDay, isSameDay, isSameMonth,addHours, parseISO } from 'date-fns';
import { FormGroup, FormControl } from '@angular/forms';

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
};

@Component({
  selector: 'app-dialog-calendar',
  templateUrl: './dialog-calendar.component.html',
  styleUrls: ['./dialog-calendar.component.css']
})
export class DialogCalendarComponent implements OnInit {

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
  supplier_catalogue: any[] = []
  user: any;
  public range = new FormGroup({
    rangeDate1: new FormControl(),
    rangeDate2: new FormControl()
  });
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [{
      label: '<span class="material-icons">account_box</span>',
      a11yLabel: 'Edit',
      onClick: ({
        event
      }: {
        event: CalendarEvent
      }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({
        event
      }: {
        event: CalendarEvent
      }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  refresh: Subject < any > = new Subject();
  events: CalendarEvent[] = [
    
  ];
  activeDayIsOpen: boolean = true;
  filteruno: boolean = false;

  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.__loader__.showLoader();
    this._services.service_general_get('MyDashboard/GetCalendar/' + this.user.id).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.map.value;
        this.data_calendario(eventos);
        this.__loader__.hideLoader();
      }
    });
    this.get_catalogos();
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

    console.log("ESTOS SON LOS EVENTOS: ", eventos);
    for (let i = 0; i < eventos.length; i++) {
      let data_evento_prueba = {
        start: addHours(startOfDay(parseISO(eventos[i].date)), 2),
        end: addHours(parseISO(eventos[i].date), 2),
        title: '',
        color: null,
        //actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        }
      }
      let a1 = '0800';
      let a2 = '1200';
      let b = '1600';
      let c = '2000';
      if (Number(eventos[i].inicio) >= Number(a1) && Number(eventos[i].inicio) <= Number(a2)) {
        data_evento_prueba.color = colors.uno;
      }
      if (Number(eventos[i].inicio) >= Number(a2) && Number(eventos[i].inicio) <= Number(b)) {
        data_evento_prueba.color = colors.dos;
      }
      if (Number(eventos[i].inicio) >= Number(b) && Number(eventos[i].inicio) <= Number(c)) {
        data_evento_prueba.color = colors.tres;
      }
      for (let j = 0; j < eventos[i].services.length; j++) {
        data_evento_prueba.title = 'Assigne: ' + eventos[i].assignee + ' / Partner: ' + eventos[i].partner + ' / Client: ' + eventos[i].client + ' / City: ' + eventos[i].state + ' / ' + eventos[i].services[j].category + ' / ' + eventos[i].services[j].serviceNumber + ' / Time:' + eventos[i].startTime + ' - ' + eventos[i].endTime
        this.events.push(data_evento_prueba);
      }
    };
    console.log(this.events);
    
    setTimeout(() => {
      console.log(document.getElementsByClassName('cal-event'));
      let elementos = document.getElementsByClassName('cal-event');
      for (let i = 0; i < elementos.length; i++) {
        let element : any = elementos[i];
        if(element.style.backgroundColor == 'rgb(255, 211, 0)'){
           console.log('entra');
           element.className += " midday";
        }

        if(element.style.backgroundColor == 'rgb(68, 53, 166)'){
          console.log('entra');
          element.className += " afternoon";
       }

       if(element.style.backgroundColor == 'rgb(255, 149, 0)'){
        console.log('entra');
        element.className += " morning";
       }
      }
    }, 1000);
    
  }
  //******************************************//
  //CONSULTA INFORMACION DE LOS CATALOGOS//
  async get_catalogos() {
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_coordinator = await this._services.getCatalogueFrom('GetCoordinator');
    this.ca_cliente = await this._services.getCatalogueFrom('GetClient');
    this.ca_partner = await this._services.getCatalogueFrom('GetPartner');
    this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
  }
  //******************************************//
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
        service_record_params_selected += `${ item }=${ this.data_calendar[item] }&`;
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
    const params_in: string = params == '' ? '' : `?${ params }`;
    this._services.service_general_get('MyDashboard/GetCalendar/' + this.user.id + params_in).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.map.value;
        console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
        this.data_calendario(eventos);
        this.__loader__.hideLoader();
      }
    });
  }
  //******************************************//
  //FILTRO DE INFORMACION POR CAMPO ABIERTO//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.supplier.filter = filterValue.trim().toLowerCase();
  }
  //******************************************//
  //FUNCIONES DEL CALENDARIO//
  dayClicked({
    date,
    events
  }: {
    date: Date;events: CalendarEvent[]
  }): void {
    console.log('i');
    setTimeout(() => {
    let elementos = document.getElementsByClassName('cal-event');
      for (let i = 0; i < elementos.length; i++) {
        let element : any = elementos[i];
        if(element.style.backgroundColor == 'rgb(255, 211, 0)'){
           console.log('entra');
           element.className += " midday";
        }

        if(element.style.backgroundColor == 'rgb(68, 53, 166)'){
          console.log('entra');
          element.className += " afternoon";
       }

       if(element.style.backgroundColor == 'rgb(255, 149, 0)'){
        console.log('entra');
        element.className += " morning";
       }
      }
    }, 1000);
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
    }
  }
  //******************************************//
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log('ii')
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  //******************************************//
  handleEvent(action: string, event: CalendarEvent): void {
    console.log("4");
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }
  //******************************************//
  addEvent(): void {
    console.log("ppp");
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        //color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  //******************************************//
  deleteEvent(eventToDelete: CalendarEvent) {
    console.log("3");
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
  //******************************************//
  setView(view: CalendarView) {
    console.log("2");
    this.view = view;
  }
  //******************************************//
  closeOpenMonthViewDay() {
    console.log("1");
    this.activeDayIsOpen = false;
  }
  //******************************************//
  //FILTRO FECHA//
  public filteringServiceRecordTable(): void {
    //public filter_data:FilterData = new FilterData();
    //public service_record_params_selected:string = '';
    let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.rangeDate1 != null) this.data_calendar.rangeDate1 = this.filterDate(this.range.value.rangeDate1);
    if (this.range.value.rangeDate2 != null) this.data_calendar.rangeDate2 = this.filterDate(this.range.value.rangeDate2);

    for (let item in this.data_calendar) {
      if (this.data_calendar[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_calendar[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }

    if(this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null){  
      this.getServiceRecordTableData(params);
    }
  }
  //******************************************//
  public filterDate(date_in: any): string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }
  //******************************************//
  public cleanFilter():void {
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
}
