import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
import { environment } from 'environments/environment';
import { DialogAcceptedComponent } from '../dialog/dialog-accepted/dialog-accepted.component';
import { DialogDasboardServiceComponent } from '../dialog/dialog-dasboard-service/dialog-dasboard-service.component';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  services: any = {
    service_name: '',
    numberWorkOrder: '',
    number_server: ''
  };
  public __loader__: LoaderComponent = new LoaderComponent();
  services_consult: any = {
    country: '',
    service: this.services = []
  };
  filteruno: boolean = false;
  url_image: string;
  card_selector: string = "";
  public _user_rol: number = 0;
  public _viewCoordinadorImm: string[] = [];
  public _viewCoordinadorRelo: string[] = [];
  public _viewSupplierImm: string[] = [];
  public _viewSupplierRelo: string[] = [];
  public hostImm = [];
  public hostRelo = [];
  public homeImm = [];
  public homeRelo = [];
  public _statusSupplier: any;
  constructor(
    public full: FullComponent,
    public _services: ServiceGeneralService,
    public _router: Router,
    public _dialog: MatDialog,
    private _permissions: NgxPermissionsService,
    public fullC: FullComponent,
    private change: ChangeDetectorRef
  ) { }

  public __todaydate__: Date = new Date();
  public __months__: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));

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
    name: ''
  };
  counts;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild('paginatorElement', {
  //   read: ElementRef
  // }) paginatorHtmlElement: ElementRef;

  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort;
  maxall: number = 20;


  ngOnInit() {
    this.__loader__.showLoader();
    this.url_image = environment.images_path;
    setTimeout(() => {
      this.consultaPermisos();
      this.initPageSettings();
      this.requestDashboarData();
      this.removeColumn();
    }, 500);

  }


  removeColumn() {
    //
    console.log(this._user_rol);

    switch (this._user_rol) {
      case 2:
        if (this.service_records_colums.length) {
          //this.service_records_colums.splice(0,1);
          this.service_records_colums.splice(9, 1);
          console.log(this.service_records_colums);

        }
        break;
      case 3:
        if (this.service_records_colums.length) {
          //this.service_records_colums.splice(0,1);
          this.service_records_colums.splice(10, 1);
          console.log(this.service_records_colums);
        }
        break;
      default:
      // code block
    }
  }


  getPageSizeOptions() {
    if (this.service_records_table_data?.paginator?.length > this.maxall) {
      return [10, 20, this.service_records_table_data?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }

  public async initPageSettings() {

    this.userData = JSON.parse(localStorage.getItem('userData'));

    const user_rol: string[] = [this.__userlog__.role.id];
    this._user_rol = this.__userlog__.role.id;
    this._permissions.loadPermissions(user_rol);
    //await this.get_Notification();
    await this.initCataloguesRequest();

  }

  openAcceptantConsultorConsultor(element, tipo) {
    console.log(element);

    if (element.total_services == 0) {
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To be able to accept services you must first have assigned services."
        },
        width: "350px"
      });
    }
    else {
      this._services.service_general_get('MyDashboard/GetDashboardAdminSupplier/' + element.id + '/' + this.userData.id).subscribe(data => {
        if (data.success) {

          console.log('GetDashboardAdminSupplier', data);
          const dialogRef = this._dialog.open(DialogAcceptedComponent, {
            width: '400px',
            data: { datos: data.map.value[0], tipo: tipo },
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result == undefined) return;
            console.log('hola');
            this.service_records_table_data = []

            this.requestDashboarData();
            console.log("333", this.service_records_table_data);
            this.change.detectChanges()
            this.change.markForCheck()
            //this.animal = result;
            /*             if (result != undefined) {
                          this.service_records_table_data = [];

                        } */
          });
        }
      });
    }
  }

  contador_sr_pendientes = 0;
  show_table: boolean = false;

  public service_records_table_data: any = undefined;
  public service_records_colums: string[] = ['sr', 'service_line', 'vip', 'status', 'date', 'city', 'partner', 'assignee', 'service', 'cordinador', 'supplier'];
  //public service_records_colums_new: string[] = ['sr', 'service_line', 'vip', 'status', 'date', 'city', 'partner', 'assignee', 'service', 'cordinador', 'supplier'];
  public dash_data: DashDataModel = new DashDataModel();
  public View_All: number = 0;

  viewCoordinador(elementImm, elementRelo) {
    console.log(elementImm, elementRelo)
    this._viewCoordinadorImm = [];
    this._viewCoordinadorRelo = [];
    if (elementImm.length > 0) {
      elementImm.forEach(element => {
        this._viewCoordinadorImm.push(element);
      });
    }
    if (elementRelo.length > 0) {
      elementRelo.forEach(element => {
        this._viewCoordinadorRelo.push(element);
      });
    }
  }

  viewConsultant(elementImm, elementRelo) {

    console.log("Imm", elementImm, "Relo", elementRelo)
    this._viewSupplierImm = [];
    this._viewSupplierRelo = [];
    if (elementImm.length > 0) {
      elementImm.forEach(element => {
        this._viewSupplierImm.push(element);
      });
    }
    if (elementRelo.length > 0) {
      elementRelo.forEach(element => {
        this._viewSupplierRelo.push(element);
      });
    }
  }

  public requestDashboarData(url_params: string = ''): void {
    this.contador_sr_pendientes = 0;
    //console.log("ENTRA A CONSULTAR INFORMACION");
    //console.log("ENTRA A EJECUTAR DESDE FULL COMPONENET");
    let serv_line: string = this.filter_data.serviceLine,
      user_id: number = this.__userlog__.id;

    //console.log(user_id);
    //console.log(serv_line);
    //console.log(url_params);
    this.__loader__.showLoader();
    /*
        const urlDash = `MyDashboard/GetDashboard/${user_id}` + url_params

        this._services.service_general_get(urlDash).pipe(switchMap((response: any) => {
          if (response.success) {
            console.log("DASHBOARD RESPONSE: ", response);

            this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(response.map.value.board));
            this.service_records_table_data.paginator = this.paginator;
            this.service_records_table_data.sort = this.sort;

            const urlGetReminders = `MyDashboard/GetReminders/${user_id}`
            const urlGetCoordinators = `MyDashboard/GetCoordinators/${this.__userlog__.id + ''}`
            this.change.detectChanges()
            this.change.markForCheck()
            // this.__loader__.hideLoader();


            return forkJoin([this._services.service_general_get(urlGetReminders),
            this._services.service_general_get(urlGetCoordinators)])
          }
        })
        ).subscribe(([urlGetReminders, urlGetCoordinators]) => {
          this.__loader__.hideLoader();
          console.log(urlGetReminders);
          if (urlGetReminders.success) {
            this.counts.reminders = urlGetReminders.map.value.length;
          }
          console.log('Res => ', urlGetCoordinators);
          if (urlGetCoordinators.success) {
            this.counts.coordinators = urlGetCoordinators.map.value.length;
          }
        }, (error: any) => {
          console.log('hi');

          console.error('Error => ', error);

          this.__loader__.hideLoader();

        }); */

    this._services.service_general_get(`MyDashboard/GetDashboard/${user_id}` + url_params)
      .subscribe((response: any) => {

        if (response.success) {
          console.log("111111", this.service_records_table_data);

          console.log("DASHBOARD RESPONSE: ", response);
          // this.dash_data = new DashDataModel;

          // this.dash_data = response.map.value;
          // this.dash_data.pendngAcceptance = this.dash_data.board.filter(x => x.status == "Pending Acceptance").length;
          this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(response.map.value.board));
          this.service_records_table_data.paginator = this.paginator;
          this.service_records_table_data.sort = this.sort;
          // this.View_All = this.service_records_table_data.filteredData.length;
          //this.counts = response.map.value.counts;
          console.log("22222", this.service_records_table_data);

          this.change.detectChanges()
          this.change.markForCheck()
          this.__loader__.hideLoader();


          // this.dash_data.active = 0;
          // this.dash_data.active = this.dash_data.board.filter(x => x.status == "Active");
          //this.dash_data.active = 111;
          this.counts = response.map.value.counts;

          this._services.service_general_get(`MyDashboard/GetReminders/${user_id}`)
            .subscribe(res => {
              console.log(res);
              if (res.success) {
                this.counts.reminders = res.map.value.length;
              }
            });

          this._services.service_general_get(`MyDashboard/GetCoordinators/${this.__userlog__.id + ''}`)
            .subscribe((response: any) => {
              console.log('Res => ', response);
              if (response.success) {
                this.counts.coordinators = response.map.value.length;
              }

            }, (error: any) => {

            });
          //console.log('this.dash_data ==> ', this.dash_data);

          //console.log("DATA PARA TABLA: ", this.dash_data);


        }



      }, (error: any) => {

        console.error('Error => ', error);

        this.__loader__.hideLoader();

      });

  }

  checkCheckBoxvalue(event) {
    let _service_records_table_data = this.service_records_table_data.filteredData;
    if (event.checked) {
      console.log(this.service_records_table_data);
      this.service_records_table_data = new MatTableDataSource(_service_records_table_data.filter(x => x.vip));
      this.service_records_table_data.paginator = this.paginator;
      this.service_records_table_data.sort = this.sort;
    }
    else {
      this.requestDashboarData('')
    }
  }


  profilePage(id) {
    let role;
    console.log(id);
    if (id != 0) {
      this._services.service_general_get(`Catalog/GetUser/${id}`).subscribe(r => {
        if (r.success) {
          role = r.result.value.role;
          // role id 19 es igual a "Super Admin"
          // if (role == 1 || role == 4  || role == 11 || role == 13 || role == 14 ||  role == 19  || role == 20 || role == 21 || role == 22 ) {
          if (role != 2 && role != 3) {
            if (role != 4)
              this._router.navigateByUrl(`profilemanager/${id}`);
          } else if (role == 2) {
            this._router.navigateByUrl(`profilecoordinator/${id}`);
          } else if (role == 3) {
            this._router.navigateByUrl(`profileconsultant/${id}`);
          }
        }
      });
    }
  }

  public serchFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;

    this.service_records_table_data.filter = filterValue.trim().toLowerCase();

  }

  public getClient() {
    //console.log("consulta Cliente");
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
            //console.log("select coordinator new SR Immigration: ", data.result);
            this.coordinator_catalogue = data.result.value;
          }
        }));
      } else {
        this._services.service_general_get("Catalogue/GetCoordinator/" + this.filter_data.client + "?servileLine=" + this.filter_data.serviceLine).subscribe((data => {
          if (data.success) {
            //console.log("select coordinator new SR Immigration: ", data.result);
            this.coordinator_catalogue = data.result.value;
          }
        }));
      }
    }


  }

  public dash_table_params: string = '';
  public updateDashboardData(): void {
    //console.log("ENTRA A FILTRAR INFORMACION");

    this.dash_table_params = '';
    for (let field in this.filter_data) {
      // if (field != 'serviceLine') {

      // }
      if (this.filter_data[field] != '') {
        this.dash_table_params += `&${field}=${this.filter_data[field]}`;
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
      name: ''
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

              //console.log('rows_selected ===> ', rows_selected);

            }

          }

          if (filter_condition == 'act') {

            if (row.statusId == 2) {

              rows_selected.push(row);

            }

          }

          if (filter_condition == 'onh') {

            if (row.statusId == 1) {

              rows_selected.push(row);

            }

          }

          if (filter_condition == 'pen') {

            if (row.statusId == 18) {

              rows_selected.push(row);

            }

          }

          if (filter_condition == 'inp') {

            if (row.statusId == 3) {

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

    //this.dash_table_params = '';
    const is_filter_active: boolean = (this.filter_cards_selected.indexOf(card_selector) > -1),
      card_container: any = document.getElementById(`${card_selector}_filter_card`),
      params_used: string = this.dash_table_params == '' ? '' : `?${this.dash_table_params.substring(1)}`;
    debugger
    // console.log(card_container);
    // let cards: any[] = ['inp_filter_card','pen_filter_card'];
    // switch(card_selector) {
    //   case 'act':
    //     card_container.classList.add('filterCard__card--active');
    //     cards.forEach(element => {
    //       element.classList.remove('filterCard__card--active');
    //     });
    //     //this.filter_cards_selected.push(card_selector);
    //     //console.log(this.filter_cards_selected.indexOf(card_selector));

    //     break;
    //   case 'inp':
    //     card_container.classList.add('filterCard__card--active');
    //     this.filter_cards_selected.push(card_selector);
    //     console.log(this.filter_cards_selected.indexOf(card_selector));
    //     cards.forEach(element => {
    //       if(element != this.filter_cards_selected.indexOf(card_selector))
    //       {
    //         card_container.classList.remove('filterCard__card--active');
    //         this.filter_cards_selected.splice(this.filter_cards_selected.indexOf(card_selector), 1);
    //       }
    //     });
    //     break;
    //   case 'onh':
    //     card_container.classList.add('filterCard__card--active');
    //     this.filter_cards_selected.push(card_selector);
    //     console.log(this.filter_cards_selected.indexOf(card_selector));
    //     cards.forEach(element => {
    //       if(element != this.filter_cards_selected.indexOf(card_selector))
    //       {
    //         card_container.classList.remove('filterCard__card--active');
    //         this.filter_cards_selected.splice(this.filter_cards_selected.indexOf(card_selector), 1);
    //       }
    //     });
    //     break;
    //   case 'vip':
    //     card_container.classList.add('filterCard__card--active');
    //     this.filter_cards_selected.push(card_selector);
    //     console.log(this.filter_cards_selected.indexOf(card_selector));
    //     cards.forEach(element => {
    //       if(element != this.filter_cards_selected.indexOf(card_selector))
    //       {
    //         card_container.classList.remove('filterCard__card--active');
    //         this.filter_cards_selected.splice(this.filter_cards_selected.indexOf(card_selector), 1);
    //       }
    //     });
    //     break;
    //   case 'pen':
    //     card_container.classList.add('filterCard__card--active');
    //     this.filter_cards_selected.push(card_selector);
    //     console.log(this.filter_cards_selected.indexOf(card_selector));
    //     // cards.forEach(element => {
    //     //   if(element != this.filter_cards_selected.indexOf(card_selector))
    //     //   {
    //     //     card_container.classList.remove('filterCard__card--active');
    //     //     this.filter_cards_selected.splice(this.filter_cards_selected.indexOf(card_selector), 1);
    //     //   }
    //     // });
    //     break;
    //   default:
    //     // code block
    // }
    //card_container.classList.remove('filterCard__card--active');
    //card_container.classList.add('filterCard__card--active');
    if (is_filter_active) {
      this.card_selector = "";
      card_container.classList.remove('filterCard__card--active');
      //this.filter_cards_selected.splice(this.filter_cards_selected.indexOf(card_selector), 1);
      //this.dataDashboardFilterByCards(card_selector);
      //this.requestDashboarData(params_used);
      // if(card_selector != 'pen'){
      //   this.removeColumn();
      // }
      // else{
      //   this.service_records_colums.push(this.service_records_colums[9]);
      // }
    } else {
      this.card_selector = card_selector;
      card_container.classList.add('filterCard__card--active');
      this.filter_cards_selected.push(card_selector);
      //this.dataDashboardFilterByCards(card_selector);
      //this.requestDashboarData(params_used);
      // if(card_selector != 'pen'){
      //   this.removeColumn();
      // }
      // else{
      //   this.resetDashboardTableFilters();
      // }
    }

  }

  public filterTableByCardSelect(card_selector: string): void {

    //this.dash_table_params = '';

    const is_filter_active: boolean = (this.filter_cards_selected.indexOf(card_selector) > -1),
      card_container: any = document.getElementById(`${card_selector}_filter_card`),
      params_used: string = this.dash_table_params == '' ? '' : `?${this.dash_table_params.substring(1)}`;
    debugger
    //card_container.classList.remove('filterCard__card--active');
    //card_container.classList.add('filterCard__card--active');
    // this.card_selector = card_selector;
    // card_container.classList.add('filterCard__card--active');
    //this.filterTableByCard(card_selector);
    let cards: any[] = ['act_filter_card', 'inp_filter_card', 'vip_filter_card', 'onh_filter_card', 'pen_filter_card'];
    switch (card_selector) {
      case 'act':
        card_container.classList.add('filterCard__card--active');
        cards.forEach(element => {
          if (element != 'act_filter_card') {
            let _card_container: any = document.getElementById(element)
            _card_container.classList.remove('filterCard__card--active');
            this.filter_cards_selected = [];
            this.filter_cards_selected.push('act');
          }
        });
        this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(this.dash_data.board.filter(x => x.status == "Active")));
        this.service_records_table_data.paginator = this.paginator;
        this.service_records_table_data.sort = this.sort;
        this.View_All = this.service_records_table_data.filteredData.length;
        break;
      case 'inp':
        card_container.classList.add('filterCard__card--active');
        cards.forEach(element => {
          if (element != 'inp_filter_card') {
            let _card_container: any = document.getElementById(element)
            _card_container.classList.remove('filterCard__card--active');
            this.filter_cards_selected = [];
            this.filter_cards_selected.push('inp');
          }
        });
        this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(this.dash_data.board.filter(x => x.status == "In Progress")));
        this.service_records_table_data.paginator = this.paginator;
        this.service_records_table_data.sort = this.sort;
        this.View_All = this.service_records_table_data.filteredData.length;
        break;
      case 'vip':
        card_container.classList.add('filterCard__card--active');
        cards.forEach(element => {
          if (element != 'vip_filter_card') {
            let _card_container: any = document.getElementById(element)
            _card_container.classList.remove('filterCard__card--active');
            this.filter_cards_selected = [];
            this.filter_cards_selected.push('vip');
          }
        });
        this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(this.dash_data.board.filter(x => x.vip == true)));
        this.service_records_table_data.paginator = this.paginator;
        this.service_records_table_data.sort = this.sort;
        this.View_All = this.service_records_table_data.filteredData.lengt
        // code block
        break;
      case 'onh':
        card_container.classList.add('filterCard__card--active');
        cards.forEach(element => {
          if (element != 'onh_filter_card') {
            let _card_container: any = document.getElementById(element)
            _card_container.classList.remove('filterCard__card--active');
            this.filter_cards_selected = [];
            this.filter_cards_selected.push('onh');
          }
        });
        this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(this.dash_data.board.filter(x => x.status == "Pending Assignment")));
        this.service_records_table_data.paginator = this.paginator;
        this.service_records_table_data.sort = this.sort;
        this.View_All = this.service_records_table_data.filteredData.lengt
        break;
      case 'pen':
        card_container.classList.add('filterCard__card--active');
        cards.forEach(element => {
          if (element != 'pen_filter_card') {
            let _card_container: any = document.getElementById(element)
            _card_container.classList.remove('filterCard__card--active');
            this.filter_cards_selected = [];
            this.filter_cards_selected.push('pen');
          }
        });
        this.service_records_table_data = new MatTableDataSource(this.dataDashboardFilterByCards(this.dash_data.board.filter(x => x.status == "Pending Acceptance")));
        this.service_records_table_data.paginator = this.paginator;
        this.service_records_table_data.sort = this.sort;
        this.View_All = this.service_records_table_data.filteredData.lengt
        break;
      default:
      // code block
    }

  }

  public openDialogCoordinadors(): void {

    const dialogRef = this._dialog.open(DialogCoordinatorsComponent, {
      data: {},
      width: '95%'
    });

    dialogRef.afterClosed().subscribe((result: any) => { });

  }

  public showExportDialog(current_table: string) {

    const dialogRef = this._dialog.open(DialogExportComponent, {
      data: this.service_records_table_data.filteredData,
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result === 1) {
        document.getElementById("excel").click();
      }

      if (result === 2) {
        //console.log('current_table => ', current_table);
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
        //console.log(tabla);
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
  public async initCataloguesRequest(): Promise<void> {

    this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.status_catalogue = await this._services.getCatalogueFrom('GetStatus');
    this.parther_catalogue = await this._services.getCatalogueFrom('GetPartner');
    //this.client_catalogue = await this._services.getCatalogueFrom('GetClient');
    //this.coordinator_catalogue = await this._services.getCatalogueFrom('GetCoordinator');
    //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
    this._services.service_general_get("Catalog/GetAllUsersNew?role=3").subscribe((data => {
      if (data.success) {
        console.log("select supplier: ", data.result.value);
        this.supplier_catalogue = data.result.value;
      }
    }));

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
    dialogRef.afterClosed().subscribe(result => { })
  }


  public openEscalation(): void {
    this._router.navigate(['escalations']);
  }

  public openArraivals(): void {
    const dialogRef = this._dialog.open(DialogArrivalComponent, {
      data: "",
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => { })
  }

  public openCall(): void {
    const dialogRef = this._dialog.open(DialogCallsComponent, {
      data: "",
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => { })
  }

  openReminders(): void {
    const dialogRef = this._dialog.open(DialogDashboardRemindersComponent, {
      data: "",
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => { })
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
    //console.log(data);
    this._router.navigate(['editServiceRecord/' + data.id]);
  }
  //*****************************************************************//
  public permission_read: boolean = false;
  public permission_write: boolean = false;
  public permission_delete: boolean = false;
  public permission_edit: boolean = false;
  public idspermission = [];
  consultaPermisos() {
    //console.log("CONSULTA PARA PERMISOS DE USUARIO");
    let url = localStorage.getItem('url_permisos');
    //console.log("URL: ", url);
    this._services.service_general_get('Role/' + url).subscribe(data => {
      if (data.success) {
        //console.log("Permisos: ", data.result.value)
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
        //console.log(_element_);
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
        service_record_params_selected += `${item}=${this.filter_data[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    //console.log(params);
    this.requestDashboarData(`?${params}`);

  }

  public filterDate(date_in: any): string {
    return `${date_in.getFullYear()}/${date_in.getMonth() + 1}/${date_in.getDate()}`;
  }

  public info_partner: any = {};
  viewPartner(data) {

    this.info_partner.partner = data.name;
    this.info_partner.client = data.client;
    this.info_partner.clientAvatar = data.clientAvatar;
    this.info_partner.clientId = data.clientId;
  }


  getServicesConsultor(element) {
    //debugger
    console.log(element);
    this.hostImm = [];
    this.hostRelo = [];
    this.homeImm = [];
    this.homeRelo = [];

    this._services.service_general_get('MyDashboard/GetDashboardAdminSupplier/' + element.id + '/' + this.userData.id).subscribe(data => {
      if (data.success) {

        console.log(data);
        data.map.value[0].supplierImm[0]?.standalone.forEach(item => {
          this.homeImm.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: element.supplierImm[0].country
          });
        });
        data.map.value[0].supplierImm[0]?.bundled.forEach(item => {
          this.homeImm.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: element.supplierImm[0].country
          });
        });
        data.map.value[0].supplierRelo[0]?.standalone.forEach(item => {
          this.homeImm.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: element.supplierRelo[0].country
          });
        });
        data.map.value[0].supplierRelo[0]?.bundled.forEach(item => {
          this.homeImm.push({
            service_name: item.nickName,
            numberWorkOrder: item.numberWorkOrder,
            number_server: item.serviceNumber,
            country: element.supplierRelo[0].country
          });
        });
        console.log("hostImm:", this.hostImm, "hostRelo:", this.hostRelo, "homeImm:", this.homeImm, "homeRelo:", this.homeRelo);
        console.log("Entra a consultar las WO immigration: ", this.services_consult);

        const dialogRef = this._dialog.open(DialogDasboardServiceComponent, {
          data: "",
          width: "100%"
        });
        dialogRef.afterClosed().subscribe(result => { })
      }
    });

  }

  async getServices(element) {
    console.log(element);
    this.hostImm = [];
    this.hostRelo = [];
    this.homeImm = [];
    this.homeRelo = [];

    this._services.service_general_get('MyDashboard/GetDashboardAdmin/' + element.id + '?userId=' + this.userData.id).subscribe(data => {
      if (data.success) {

        console.log("GetDashboardAdmin", data);
        data.map.value[0].standalone.forEach(item => {
          if (item.country.toLowerCase() == element.homeCountry.toLowerCase()) {
            if (item.serviceLine == 1) {
              this.homeImm.push({
                service_name: item?.nickName,
                numberWorkOrder: item?.numberWorkOrder,
                number_server: item?.serviceNumber,
                country: item?.country,
                assigned: item?.assigned,
                status: item?.status,
                serviceRecordId: item?.serviceRecordId
              });
            }
            else {
              this.homeRelo.push({
                service_name: item?.nickName,
                numberWorkOrder: item?.numberWorkOrder,
                number_server: item?.serviceNumber,
                country: item?.country,
                assigned: item?.assigned,
                status: item?.status,
                serviceRecordId: item?.serviceRecordId
              });
            }
          }
          if (item.country.toLowerCase() == element.hostCountry.toLowerCase()) {
            if (item.serviceLine == 1) {
              this.hostImm.push({
                service_name: item?.nickName,
                numberWorkOrder: item?.numberWorkOrder,
                number_server: item?.serviceNumber,
                country: item?.country,
                assigned: item?.assigned,
                status: item?.status,
                serviceRecordId: item?.serviceRecordId
              });
            }
            else {
              this.hostRelo.push({
                service_name: item?.nickName,
                numberWorkOrder: item?.numberWorkOrder,
                number_server: item?.serviceNumber,
                country: item?.country,
                assigned: item?.assigned,
                status: item?.status,
                serviceRecordId: item?.serviceRecordId
              });
            }
          }
        });
        data.map.value[0].bundled.forEach(item => {
          if (item.country.toLowerCase() == element.homeCountry.toLowerCase()) {
            if (item.serviceLine == 1) {
              this.homeImm.push({
                service_name: item?.nickName,
                numberWorkOrder: item?.numberWorkOrder,
                number_server: item?.serviceNumber,
                country: item?.country,
                assigned: item?.assigned,
                status: item?.status,
                serviceRecordId: item?.serviceRecordId
              });
            }
            else {
              this.homeRelo.push({
                service_name: item?.nickName,
                numberWorkOrder: item?.numberWorkOrder,
                number_server: item?.serviceNumber,
                country: item?.country,
                assigned: item?.assigned,
                status: item?.status,
                serviceRecordId: item?.serviceRecordId
              });
            }
          }
          if (item.country.toLowerCase() == element.hostCountry.toLowerCase()) {
            if (item.serviceLine == 1) {
              this.hostImm.push({
                service_name: item?.nickName,
                numberWorkOrder: item?.numberWorkOrder,
                number_server: item?.serviceNumber,
                country: item?.country,
                assigned: item?.assigned,
                status: item?.status,
                serviceRecordId: item?.serviceRecordId
              });
            }
            else {
              this.hostRelo.push({
                service_name: item?.nickName,
                numberWorkOrder: item?.numberWorkOrder,
                number_server: item?.serviceNumber,
                country: item?.country,
                assigned: item?.assigned,
                status: item?.status,
                serviceRecordId: item?.serviceRecordId
              });
            }
          }
        });

        setTimeout(() => {
          const dialogRef = this._dialog.open(DialogAcceptedComponent, {
            data: {
              hostImm: this.hostImm,
              hostRelo: this.hostRelo,
              homeImm: this.homeImm,
              homeRelo: this.homeRelo,
              tipo: this._user_rol,
              serviceRecordId: element.id,
              statusCoordinator: data.map.value[0].statusCoordinator

            },
            width: "400px"
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(result);

          })
        }, 300);
      }
    })

    console.log("hostImm:", this.hostImm, "hostRelo:", this.hostRelo, "homeImm:", this.homeImm, "homeRelo:", this.homeRelo);
    // this.services_consult.push({
    //   hostImm: hostImm,
    //   hostRelo: hostRelo,
    //   homeImm: homeImm,
    //   homeRelo: homeRelo
    // });
    // this.services_consult?.filter()
    console.log("Entra a consultar las WO immigration: ", this.services_consult);

    //await this.initPageSettings(data_.id);
    // this.services_consult = [];
    // this._services.service_general_get("ServiceRecord/GetServices/" + data_.id + "?type=" + data_.serviceline).subscribe((data => {
    //   console.log("Entra a consultar las WO immigration: ", data.map.value);

    //   var host    = []
    //   var hostTemp = []
    //   var home    = []
    //   var homeTemp = []
    //   for(var i=0; i<data.map.value.host.length; i++){
    //     hostTemp = host.filter(resp => resp["country"] == data.map.value.host[i]["country"])
    //       if(hostTemp.length>0){
    //         host[host.indexOf(hostTemp[0])]["service"].push({
    //             service_name: data.map.value.host[i]["service_name"],
    //             numberWorkOrder: data.map.value.host[i]["numberWorkOrder"],
    //             number_server: data.map.value.host[i]["number_server"]
    //           })
    //       }else{
    //         host.push(
    //             {
    //               "country" : data.map.value.host[i]["country"] ,
    //               "service" : [{
    //                 service_name: data.map.value.host[i]["service_name"],
    //                 numberWorkOrder: data.map.value.host[i]["numberWorkOrder"],
    //                 number_server: data.map.value.host[i]["number_server"]
    //               }]
    //             })
    //       }
    //   }
    //   for(var i=0; i<data.map.value.home.length; i++){
    //     homeTemp = home.filter(resp => resp["country"] == data.map.value.home[i]["country"])
    //     if(homeTemp.length>0){
    //       home[home.indexOf(homeTemp[0])]["service"].push({
    //           service_name: data.map.value.home[i]["service_name"],
    //           numberWorkOrder: data.map.value.home[i]["numberWorkOrder"],
    //           number_server: data.map.value.home[i]["number_server"]
    //         })
    //     }else{
    //       home.push(
    //           {
    //             "country" : data.map.value.home[i]["country"] ,
    //             "service" : [{
    //               service_name: data.map.value.home[i]["service_name"],
    //               numberWorkOrder: data.map.value.home[i]["numberWorkOrder"],
    //               number_server: data.map.value.home[i]["number_server"]
    //             }]
    //           })
    //     }
    // }

    //   console.log({
    //     home: home,
    //     host: host
    //   })

    //   this.services_consult.push({
    //     home: home,
    //     host: host
    //   });
    //   //this.services_consult.filter()
    //   //console.log("Entra a consultar las WO immigration: ", this.services_consult);
    // }));
  }

  cleanFilter() {
    this.filter_data = new FilterDataModel();
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.requestDashboarData('');
  }

  public info_country: any = {};
  viewCity(data) {
    this.info_country.hostCountry = data.hostCountry;
    this.info_country.hostCity = data.hostCity;
    this.info_country.homeCountry = data.homeCountry;
    this.info_country.homeCity = data.homeCity;
  }



}

class FilterDataModel {
  search: string = '';
  serviceLine: string = '';
  status: string = '';
  country: string = '';
  city: string = '';
  partner: string = '';
  client: string = '';
  coordinator: string = '';
  supplier: string = '';
  rangeDate1: any;
  rangeDate2: any;
  vip: boolean;
}

class DashDataModel {
  active: number = 0;
  inprogress: number = 0;
  onHold: number = 0;
  pendngAcceptance: number = 0;
  pendingAssigned: number = 0;
  vip: number = 0;
  board: any[] = [];
}
