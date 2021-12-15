import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router } from '@angular/router';
import { DialogCalendarComponent } from '../dialog/dialog-calendar/dialog-calendar.component';
import { DialogFollowingComponent } from '../dialog/dialog-following/dialog-following.component';
import { DialogArrivalComponent } from '../dialog/dialog-arrival/dialog-arrival.component';
import { DialogCallsComponent } from '../dialog/dialog-calls/dialog-calls.component';
import { DialogDashboardRemindersComponent } from '../dialog/dialog-dashboard-reminders/dialog-dashboard-reminders.component';
import { DialogExportComponent } from '../dialog/dialog-export/dialog-export.component';
import { PdfMakeWrapper, Table, Cell, Columns, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DialogCoordinatorsComponent } from '../dialog/dialog-coordinators/Coordinators.component';
import { DialogAvailabilityCalendarComponent } from '../dialog/dialog-availability-calendar/dialog-availability-calendar.component';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { FullComponent } from 'app/layouts/full/full.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
	public full: FullComponent,
    public _services: ServiceGeneralService,
    public _router: Router,
    public _dialog: MatDialog,
    private _permissions: NgxPermissionsService,
    public fullC: FullComponent
  ) {}

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  userData: any;
  public filterStatus: any = {
    status: ''
  };
  public filterPartner: any = {
    coordinator: ''
  };
  public filterClient: any = {
    name: ''
  };
  public filterCountry: any = {
    name: ''
  };
  public filterCity: any = {
    city: ''
  };
  public filterCoordinator: any = {
    coordinator: ''
  };
  public filterSupplier: any = {
    comercialName: ''
  };
  counts;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild('paginatorElement', {
  //   read: ElementRef
  // }) paginatorHtmlElement: ElementRef;

  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort;
  maxall: number = 20;


  ngOnInit() {
    this.consultaPermisos();
    this.initPageSettings();
  }
  getPageSizeOptions() {
    if (this.service_records_table_data?.paginator.length > this.maxall) {
      return [10, 20, this.service_records_table_data?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }
  ca_notification = [];
  get_Notification() {
    //this.get_NotificationView();
    let notificaciones = [];
    this._services.service_general_get('Notification/GetNotificationCenter/' + this.userData.id).subscribe((data => { //this.area_orientation.workOrderServicesId
      if (data.success) {
        console.log('DATA CONSULTA NOTIFICACIONES:', data);
        notificaciones = data.result.value.sort(function (a, b) {
          return b.createdDate.localeCompare(a.createdDate);
        });

        let uux_notificaciones = []
        for (let i = 0; i < notificaciones.length; i++) {
          if ((notificaciones[i].archive == false && notificaciones[i].view == false)) {
            uux_notificaciones.push(notificaciones[i])
          }
        }

        this.ca_notification = uux_notificaciones;
        this.requestDashboarData();
        console.log("NOTIFICACIONES: ", this.ca_notification);
      }
    }));
  }



  public __todaydate__: Date = new Date();
  public __months__: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public __loader__: LoaderComponent = new LoaderComponent();
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));

   public async initPageSettings() {

    this.userData = JSON.parse(localStorage.getItem('userData'));

    const user_rol: string[] = [this.__userlog__.role.id];
    this._permissions.loadPermissions(user_rol);
	  await this.get_Notification();
    await this.initCataloguesRequest();

  }


  //ACEPTAMOS NOTIFICACION//
  async accept(data_) {
    console.log(status);
    this._services.service_general_putnoapi(data_.aceptar, '').subscribe((async resp => {
      if (resp.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Service Record was accepted."
          },
          width: "350px"
        });
	    	let event = true;
        await this.archivar(data_, event);
      }
    }))
  }
  //DECLINAMOS NOTIFICACION//
  async decline(data_) {
	console.log(status);
    this._services.service_general_putnoapi(data_.rechazar, '').subscribe((async data => {
      console.log(data);
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Service Record was declined."
          },
          width: "350px"
        });
	   	let event = true;
        await this.archivar(data_, event);
      }
    }))
  }

  archivar(data, event) {
    console.log(data);
      this._services.service_general_put('Notification/PutArchive/' + data.notificationId + '/' + true, '').subscribe((_data_ => {
        if (_data_.success) {
			    console.log("Archivada : ", _data_);
          this.marcarLeida(data)
        }
      }));
  }

  marcarLeida(data) {
    console.log(data);
      let viewt = true;
      this._services.service_general_put('Notification/PutViewed/' + data.notificationId + '/' + viewt, '').subscribe((data => {
        if (data.success) {
			    console.log("leida : ", data);
          this.fullC.get_Notification();
          this.initPageSettings();
        }
      }));
  }

  contador_sr_pendientes = 0;
  show_table:boolean = false;
  public requestDashboard(): void {
    console.log("ENTRA A CONSULTAR INFORMACION");
    this.contador_sr_pendientes = 0;
    let serv_line: string = this.filter_data.serviceLine,
      user_id: number = this.__userlog__.id;

    console.log(user_id);
    console.log(serv_line);
    this.__loader__.showLoader();

    this._services.service_general_get(`MyDashboard/GetDashboard/${user_id}/${serv_line}`)
      .subscribe((response: any) => {

        if (response.success) {

          console.log("DASHBOARD RESPONSE: ", response);
          this.dash_data = new DashDataModel;
          this.dash_data = response.map.value;
          this.counts = response.map.value.counts;
          console.log('this.dash_data ==> ', this.dash_data);

		  for (let i = 0; i < this.dash_data.board.length; i++) {
			this.dash_data.board[i].aceptar = null;
			this.dash_data.board[i].rechazar = null;
			this.dash_data.board[i].notificationId = null;
		  }

		  console.log(this.dash_data);
		  console.log(this.ca_notification);
      
		  for (let i = 0; i < this.dash_data.board.length; i++) {
			for (let j = 0; j < this.ca_notification.length; j++) {
			  if((this.ca_notification[j].notificationType == 2 || this.ca_notification[j].type == "New Service Record Assigned." || this.ca_notification[j].type == "Supplier Accepted Service.") &&  this.dash_data.board[i].numberServiceRecord === this.ca_notification[j].serviceRecord){
				console.log("ENTRA A CONDICIONAL");
				this.dash_data.board[i].aceptar = this.ca_notification[j].actionCall.accept;
				this.dash_data.board[i].rechazar = this.ca_notification[j].actionCall.rejected;
				this.dash_data.board[i].notificationId = this.ca_notification[j].id;
        this.contador_sr_pendientes++;
			  }
			}
		  }
      if(this.contador_sr_pendientes == 0){
        console.log("NO HAY SR POR ACEPTAR");
        this.show_table = true;
      }else{
        this.show_table = false;
        console.log("HAY SR POR ACEPTAR");
      }
		  console.log("DATA PARA TABLA: ", this.dash_data);

          this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(this.dash_data.board));
          this.service_records_table_data.paginator = this.paginator;
          this.service_records_table_data.sort = this.sort;
          this.View_All = this.service_records_table_data.filteredData.length;
        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error => ', error);

        this.__loader__.hideLoader();

      });

  }

  public service_records_table_data: any = undefined;
  public service_records_colums: string[] = ['col_0', 'col_1', 'col_2', 'col_3',  'col_5', 'col_6', 'col_7', 'col_8', 'col_9', 'col_10', 'col_11', 'col_12','col_13' ];
  public service_records_colums_: string[] = ['col_0', 'col_1', 'col_2', 'col_3', 'col_5', 'col_6', 'col_7', 'col_8', 'col_9', 'col_10', 'col_11' ];
  public service_records_colums_x: string[] = ['col_0', 'col_1', 'col_2', 'col_3', 'col_5', 'col_6', 'col_7', 'col_8', 'col_9', 'col_10', 'col_11', 'col_12'];
  public service_records_colums_x_: string[] = ['col_0', 'col_1', 'col_2', 'col_3', 'col_5', 'col_6', 'col_7', 'col_8', 'col_9', 'col_10'];
  public dash_data: DashDataModel = new DashDataModel();
  public View_All: number = 0;
  public requestDashboarData(url_params: string = ''): void {
    this.contador_sr_pendientes = 0;
    console.log("ENTRA A CONSULTAR INFORMACION");
    console.log("ENTRA A EJECUTAR DESDE FULL COMPONENET");
    let serv_line: string = this.filter_data.serviceLine,
      user_id: number = this.__userlog__.id;

    console.log(user_id);
    console.log(serv_line);
    console.log(url_params);
    this.__loader__.showLoader();

    this._services.service_general_get(`MyDashboard/GetDashboard/${user_id}/${serv_line}${url_params}`)
      .subscribe((response: any) => {

        if (response.success) {

          console.log("DASHBOARD RESPONSE: ", response);
          this.dash_data = new DashDataModel;
          this.dash_data = response.map.value;
          this.counts = response.map.value.counts;
          console.log('this.dash_data ==> ', this.dash_data);

		  for (let i = 0; i < this.dash_data.board.length; i++) {
			this.dash_data.board[i].aceptar = null;
			this.dash_data.board[i].rechazar = null;
			this.dash_data.board[i].notificationId = null;
		  }

		  console.log(this.dash_data);
		  console.log(this.ca_notification);
		  for (let i = 0; i < this.dash_data.board.length; i++) {
			for (let j = 0; j < this.ca_notification.length; j++) {
			  if((this.ca_notification[j].notificationType == 2 || this.ca_notification[j].type == "New Service Record Assigned." || this.ca_notification[j].type == "Supplier Accepted Service.") &&  this.dash_data.board[i].numberServiceRecord === this.ca_notification[j].serviceRecord){
				console.log("ENTRA A CONDICIONAL");
				this.dash_data.board[i].aceptar = this.ca_notification[j].actionCall.accept;
				this.dash_data.board[i].rechazar = this.ca_notification[j].actionCall.rejected;
				this.dash_data.board[i].notificationId = this.ca_notification[j].id;
        this.contador_sr_pendientes++;
			  }
			}
		  }

      if(this.contador_sr_pendientes == 0){
        console.log("NO HAY SR POR ACEPTAR");
        this.show_table = true;
      }else{
        this.show_table = false;
        console.log("HAY SR POR ACEPTAR");
      }

		  console.log("DATA PARA TABLA: ", this.dash_data);

          this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(this.dash_data.board));
          this.service_records_table_data.paginator = this.paginator;
          this.service_records_table_data.sort = this.sort;
          this.View_All = this.service_records_table_data.filteredData.length;
        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error => ', error);

        this.__loader__.hideLoader();

      });

  }

  public serchFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;

    this.service_records_table_data.filter = filterValue.trim().toLowerCase();

  }

  public getClient() {
    console.log("consulta Cliente");
    this._services.service_general_get('Catalogue/GetClient/' + this.filter_data.partner).subscribe((data => {
      if (data.success) {
        this.client_catalogue = data.result.value;
      }
    }))
  }

  getCoordinatorImmigration() {
    // if(this.filter_data.client== "" || this.filter_data.serviceLine == "" || this.filter_data.city == ""){
    if (this.filter_data.client == "") {
      return true;
    } else {
      if (this.filter_data.serviceLine == "" || this.filter_data.serviceLine == null) {
        this._services.service_general_get(`Catalogue/GetCoordinator/${this.filter_data.client}`).subscribe((data => {
          if (data.success) {
            console.log("select coordinator new SR Immigration: ", data.result);
            this.coordinator_catalogue = data.result.value;
          }
        }));
      } else {
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.filter_data.client + "?servileLine=" + this.filter_data.serviceLine).subscribe((data => {
          if (data.success) {
            console.log("select coordinator new SR Immigration: ", data.result);
            this.coordinator_catalogue = data.result.value;
          }
        }));
      }
    }


  }

  getSupplierPartner() {
    if (this.filter_data.serviceLine == "" || this.filter_data.country == "" || this.filter_data.city == "") {
      return true;
    }
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerConsultant?country=" + this.filter_data.country + "&city=" + this.filter_data.city + "&serviceLine=" + this.filter_data.serviceLine).subscribe((data => {
      if (data.success) {
        console.log("select supplier: ", data.result.value);
        this.supplier_catalogue = data.result.value;
      }
    }));
  }

  public dash_table_params: string = '';
  public updateDashboardData(): void {
    console.log("ENTRA A FILTRAR INFORMACION");
    this.dash_table_params = '';
    for (let field in this.filter_data) {
      if (field != 'serviceLine') {
        if (this.filter_data[field] != '') {
          this.dash_table_params += `&${field}=${this.filter_data[field]}`;
        }
      }
    }

    this.requestDashboarData(`?${this.dash_table_params.substring(1)}`);

  }

  public resetDashboardTableFilters(): void {
    this.filterStatus = {
      status: ''
    };
    this.filterPartner = {
      coordinator: ''
    };
    this.filterClient = {
      name: ''
    };
    this.filterCountry = {
      name: ''
    };
    this.filterCity = {
      city: ''
    };
    this.filterCoordinator = {
      coordinator: ''
    };
    this.filterSupplier = {
      comercialName: ''
    };
    this.client_catalogue = [];
    this.coordinator_catalogue = [];
    this.city_catalogue = [];

    this.range.reset();

    this.filter_data = new FilterDataModel();

    this.requestDashboarData();

  }

  public dataDashboardFilterByCards(table_rows: any): any[] {

    const rows_in: any[] = table_rows;

    let rows_selected: any[] = [];

    rows_in.forEach((row: any) => {

      if (this.filter_cards_selected.length != 0) {

        this.filter_cards_selected.forEach((filter_condition: string) => {

          if (filter_condition == 'vip') {

            if (row.vip) {

              rows_selected.push(row);

              console.log('rows_selected ===> ', rows_selected);

            }

          }

          if (filter_condition == 'act') {

            if (row.statusId == 2) {

              rows_selected.push(row);

            }

          }

          if (filter_condition == 'onh') {

            if (row.statusId == 4) {

              rows_selected.push(row);

            }

          }

          if (filter_condition == 'pen') {

            if (row.statusId == 1) {

              rows_selected.push(row);

            }

          }

        });

      } else {

        rows_selected.push(row);

      }

    });

    table_rows = [];

    return rows_selected;

  }

  public filter_cards_selected: string[] = [];
  public filterTableByCard(card_selector: string): void {

    const is_filter_active: boolean = (this.filter_cards_selected.indexOf(card_selector) > -1),
      card_container: any = document.getElementById(`${card_selector}_filter_card`),
      params_used: string = this.dash_table_params == '' ? '' : `?${this.dash_table_params.substring(1)}`;
    debugger
    if (is_filter_active) {

      card_container.classList.remove('filterCard__card--active');
      this.filter_cards_selected.splice(this.filter_cards_selected.indexOf(card_selector), 1);
      this.requestDashboarData(params_used);

    } else {

      card_container.classList.add('filterCard__card--active');
      this.filter_cards_selected.push(card_selector);
      this.requestDashboarData(params_used);

    }

  }

  public openDialogCoordinadors(): void {

    const dialogRef = this._dialog.open(DialogCoordinatorsComponent, {
      data: {},
      width: '95%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {});

  }

  public showExportDialog(current_table: string) {

    const dialogRef = this._dialog.open(DialogExportComponent, {
      data: this.service_records_table_data.filteredData,
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 1) {
        document.getElementById("excel").click();
      }

      if (result === 2) {
        console.log('current_table => ', current_table);
        let tabla = [];

        if (current_table == 'm') {

          tabla.push(['Service Record', 'VIP', 'Status', 'Autho Date', 'Country', 'City',
            'Partner', 'Client', 'Assignee Name', 'Services', 'Coordinator', 'Supplier Consultant'
          ]);

        } else if (current_table == 'c') {

          tabla.push(['Service Record', 'VIP', 'Status', 'Autho Date', 'Country', 'City',
            'Partner', 'Client', 'Assignee Name', 'Services', 'Supplier Consultant'
          ]);

        } else if (current_table == 's') {

          tabla.push(['Service Record', 'VIP', 'Status', 'Autho Date', 'Country', 'City',
            'Partner', 'Client', 'Assignee Name', 'Services', 'Coordinator'
          ]);

        }

        for (let i = 0; i < this.service_records_table_data.filteredData.length; i++) {

          const element = this.service_records_table_data.filteredData[i];

          if (current_table == 'm') {

            tabla.push([
              element.numberServiceRecord,
              element.vip,
              element.status,
              this.formatDate(element.initialAutho),
              element.hostCountry,
              element.homeCity,
              element.partner,
              element.client,
              element.assigneeName,
              element.bundled.length + element.standalone.length,
              element.coordinator,
              element.supplier
            ]);

          } else if (current_table == 'c') {

            tabla.push([
              element.numberServiceRecord,
              element.vip,
              element.status,
              this.formatDate(element.initialAutho),
              element.hostCountry,
              element.homeCity,
              element.partner,
              element.client,
              element.assigneeName,
              element.bundled.length + element.standalone.length,
              element.supplier
            ]);

          } else if (current_table == 's') {

            tabla.push([
              element.numberServiceRecord,
              element.vip,
              element.status,
              this.formatDate(element.initialAutho),
              element.hostCountry,
              element.homeCity,
              element.partner,
              element.client,
              element.assigneeName,
              element.bundled.length + element.standalone.length,
              element.coordinator
            ]);

          }

        }
        console.log(tabla);
        // Set the fonts to use
        PdfMakeWrapper.setFonts(pdfFonts);

        const pdf = new PdfMakeWrapper();

        pdf.pageMargins([30, 30, 30, 30]);
        pdf.pageOrientation('landscape');
        pdf.defaultStyle({
          fontSize: 9,
          alignment: 'center'
        });
        pdf.add(new Table(tabla).layout('lightHorizontalLines').end);

        pdf.create().download('Services.pdf');
      }
    });
  }

  public country_catalogue: any = [];
  public city_catalogue: any[] = [];
  public status_catalogue: any[] = [];
  public parther_catalogue: any[] = [];
  public client_catalogue: any[] = [];
  public coordinator_catalogue: any[] = [];
  public serviceline_catalogue: any[] = [];
  public supplier_catalogue: any[] = [];
  public async initCataloguesRequest(): Promise < void > {

    this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
    this.parther_catalogue = await this._services.getCatalogueFrom('GetPartner');
    //this.client_catalogue = await this._services.getCatalogueFrom('GetClient');
    //this.coordinator_catalogue = await this._services.getCatalogueFrom('GetCoordinator');
    //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');

  }

  public filter_data: FilterDataModel = new FilterDataModel();

  public able_city_filter: boolean = false;
  public ableCityField(): void {

    if (this.filter_data.country != '') {

      this.able_city_filter = true;

      this._services.service_general_get(`Catalogue/GetState?country=${this.filter_data.country}`)
        .subscribe((response: any) => {

          if (response.success) {

            this.city_catalogue = response.result;

          }

        }, (error: any) => {

          console.error('Error ==> ', error);

        });

    } else {

      this.able_city_filter = false;

    }

  }

  public goToPage(the_page: string): void {

    this._router.navigateByUrl(the_page);

  }


  public openCalendar(): void {
    this._router.navigate(['serviceCalendar']);
  }

  public openFollowers(): void {
    const dialogRef = this._dialog.open(DialogFollowingComponent, {
      data: "",
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => {})
  }


  public openEscalation(): void {
    this._router.navigate(['escalations']);
  }

  public openArraivals(): void {
    const dialogRef = this._dialog.open(DialogArrivalComponent, {
      data: "",
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => {})
  }

  public openCall(): void {
    const dialogRef = this._dialog.open(DialogCallsComponent, {
      data: "",
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => {})
  }

  openReminders(): void {
    const dialogRef = this._dialog.open(DialogDashboardRemindersComponent, {
      data: "",
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => {})
  }


  openAvailavility(): void {
    /*
	  const dialogRef = this._dialog.open(DialogAvailabilityCalendarComponent, {
		  data: "",
		  width: "100%"
		});
		dialogRef.afterClosed().subscribe(result => {})
		*/
    this._router.navigate(['/serviceCalendar']);
  }

  openNotification() {
    this._router.navigate(['notification']);
  }


  public formatDate(fecha) {

    let date = new Date(fecha),
      day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear(),
      montstring = "";

    switch (month) {
      case 1:
        montstring = "Ene";
        break;
      case 2:
        montstring = "Feb";
        break;
      case 3:
        montstring = "Mar";
        break;
      case 4:
        montstring = "Abr";
        break;
      case 5:
        montstring = "May";
        break;
      case 6:
        montstring = "Jun";
        break;
      case 7:
        montstring = "Jul";
        break;
      case 8:
        montstring = "Ago";
        break;
      case 9:
        montstring = "Sep";
        break;
      case 10:
        montstring = "Oct";
        break;
      case 11:
        montstring = "Nov";
        break;
      case 12:
        montstring = "Dic";
        break;
    }

    return day + " " + montstring + " " + year;

  }


  goToSR(data) {
    console.log(data);
    this._router.navigate(['editServiceRecord/' + data.id]);
  }
  //*****************************************************************//
  public permission_read: boolean = false;
  public permission_write: boolean = false;
  public permission_delete: boolean = false;
  public permission_edit: boolean = false;
  public idspermission = [];
  consultaPermisos() {
    console.log("CONSULTA PARA PERMISOS DE USUARIO");
    let url = localStorage.getItem('url_permisos');
    this._services.service_general_get('Role/' + url).subscribe(data => {
      if (data.success) {
        console.log("Permisos: ", data.result.value)
        this.permission_read = data.result.value[0].reading;
        this.permission_write = data.result.value[0].writing;
        this.permission_delete = data.result.value[0].editing;
        this.permission_edit = data.result.value[0].deleting;
      }
    })
    //TIPO USUARIO PARA NGXPERMISSION//
    this._services.service_general_get('Catalog/GetAllRole').subscribe(data => {
      if (data.success) {
        let id = data.result;
        let _element_;
        for (let i = 0; i < id.length; i++) {
          if (id.length - 1 == i) {
            _element_ += "]"
          } else if (i == 0) {
            _element_ = "['" + id[i].id + "'";
          } else {
            _element_ += ",'" + id[i].id + "'";
          }
        }
        console.log(_element_);
        this.idspermission = _element_;
      }
    })
  }

  public filteringServiceRecordTable(): void {

    let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.start != '' && this.range.value.start != null) this.filter_data.rangeDate1 = this.filterDate(this.range.value.start);
    if (this.range.value.end != '' && this.range.value.end != null) this.filter_data.rangeDate2 = this.filterDate(this.range.value.end);
    debugger
    for (let item in this.filter_data) {
      if (this.filter_data[item] != '') {
        service_record_params_selected += `${ item }=${ this.filter_data[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log(params);
    this.requestDashboarData(`?${params}`);

  }

  public filterDate(date_in: any): string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }


  SR_WO :any;
  consulta(element){
      let WO = [];
      this.SR_WO = [];
      this._services.service_general_get('ServiceRecord/GetServices/'+element.id+'?type='+element.serviceline).subscribe((response: any) => {
          response.map.value.home.forEach(E => {
              WO.push(E);
          });
          response.map.value.host.forEach(E => {
              WO.push(E);
          });
          this.SR_WO = WO;
          /*
          this._services.service_general_get('ServiceRecord/GetServices/'+element.id+'?type=2').subscribe((response: any) => {
              response.map.value.home.forEach(E => {
                  WO.push(E);
              });
              response.map.value.host.forEach(E => {
                  WO.push(E);
              });

              console.log("ESTAS SON LAS WO", WO)
              this.SR_WO = WO;
          })
          */
      })
  }

  public info_country: any = {};
    viewCity(data) {
        this.info_country.country = data.hostCountry;
        this.info_country.city = data.hostCity;
    }


  
}

class FilterDataModel {
  serviceLine: string = '1';
  status: string = '';
  country: string = '';
  city: string = '';
  partner: string = '';
  client: string = '';
  coordinator: string = '';
  supplier: string = '';
  rangeDate1: any;
  rangeDate2: any;
}

class DashDataModel {
  active: number = 0;
  inprogress: number = 0;
  onHold: number = 0;
  pendngAcceptance: number = 0;
  vip: number = 0;
  board: any[] = [];
}
