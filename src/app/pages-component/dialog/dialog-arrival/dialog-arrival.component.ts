import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import { DialogExportComponent } from '../dialog-export/dialog-export.component';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { OtherImmigrationComponent } from '../other-immigration/other-immigration.component';
import { DialogLocalDocumentationComponent } from '../dialog-local-documentation/dialog-local-documentation.component';
import { DialogDocumentManagementComponent } from '../dialog-document-management/dialog-document-management.component';
import { DialogResidencyPermitComponent } from '../dialog-residency-permit/dialog-residency-permit.component';
import { DialogVisaDeregistrationComponent } from '../dialog-visa-deregistration/dialog-visa-deregistration.component';
import { DialogWorkPermitComponent } from '../dialog-work-permit/dialog-work-permit.component';
import { EntryVisaComponent } from '../entry-visa/entry-visa.component';
import { DialogLegalReviewConsultation } from '../legal-review-consultation/legal-review-consultation.component';
import { NotificationDialog } from '../notification/notification.component';
import { DialogRenewal } from '../renewal/renewal.component';
import { DialogCortporateAssistance } from '../corporate-assistance/corporate-assistance.component';
import { DialogBundleComponent } from '../dialog-bundle/dialog-bundle.component';
import { PreDecisionOrientationComponent } from '../pre-decision-orientation/pre-decision-orientation.component';
import { AreaOrientationComponent } from '../area-orientation/area-orientation.component';
import { SettlingInComponent } from '../settling-in/settling-in.component';
import { SchoolSearchComponent } from '../school-search/school-search.component';
import { DialogDepartureComponent } from '../dialog-departure/dialog-departure.component';
import { DialogRentalFurnitureComponent } from '../dialog-rental-furniture/dialog-rental-furniture.component';
import { DialogTransportationComponent } from '../dialog-transportation/dialog-transportation.component';
import { DialogAirportTransportationComponent } from '../dialog-airport-transportation/dialog-airport-transportation.component';
import { LegalRenewalComponent } from '../legal-renewal/legal-renewal.component';
import { HomeSaleComponent } from '../home-sale/home-sale.component';
import { HomePurchaseComponent } from '../home-purchase/home-purchase.component';
import { PropertyManagementComponent } from '../property-management/property-management.component';
import { OtherComponent } from '../other/other.component';
import { TenancyManagementComponent } from '../tenancy-management/tenancy-management.component';
import { DialogTemporaryHousingComponent } from '../dialog-temporary-housing/dialog-temporary-housing.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-arrival',
  templateUrl: './dialog-arrival.component.html',
  styleUrls: ['./dialog-arrival.component.css']
})
export class DialogArrivalComponent implements OnInit {

  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public router:Router) {}
  range = new FormGroup({
    rangeDate1: new FormControl(),
    rangeDate2: new FormControl()
  });
  displayedColumns: string[] = ['ServiceRecord', 'VIP', 'ArrivalDate', 'AssigneeName', 'Partner', 'Client', 'Coordinator', 'Supplier', 'Location', 'Services'];
  // filtros select
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
  public filterSupplier: any = {
    comercialName: ''
  };


  @ViewChild('arrivalsort') arrivalsort: MatSort;

  // @ViewChild(MatPaginator, { static: true }) arrivalpag: MatPaginator;
  @ViewChild(MatPaginator, {
    static: true
  }) arrivalpag: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;


  filteruno: boolean = false;
  data_table: any;
  user: any;
  data_search: any = {};
  ca_cliente: any[] = [];
  ca_partner: any[] = [];
  supplier_catalogue: any[] = [];
  ca_coordinator: any[] = [];
  country_select: any[] = [];
  city_select: any[] = [];
  maxall: number = 20;
  country_catalogue: any[] = [];

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    this._services.service_general_get('MyDashboard/GetUpcomingArrivals/' + this.user.id).subscribe(data => {
      if (data.success) {
        console.log(data.map.value);
        this.data_table = new MatTableDataSource(data.map.value);
        this.data_table.paginator = this.arrivalpag;
        this.data_table.sort = this.arrivalsort;
      }
    })
    this.catalogos();
  }
  getPageSizeOptions() {
    if (this.data_table?.paginator.length > this.maxall) {
      return [10, 20, this.data_table?.paginator.length];
    } else {
      return [10, 20];
    }
  }

  //*******************************************//

  ableCityField() {
    this.city_select = [];
    this._services.service_general_get(`Catalogue/GetState?country=${this.data_search.country}`)
      .subscribe((response: any) => {
        if (response.success) {
          this.city_select = response.result;
        }
      }, (error: any) => {
        console.error('Error ==> ', error);
      });
  }
  async catalogos() {
    let city = [];
    let city_final = [];
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    //this.ca_coordinator = await this._services.getCatalogueFrom('GetCoordinator');
    this.ca_partner = await this._services.getCatalogueFrom('GetPartner');
    //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
    this.country_select = await this._services.getCatalogueFrom('GetCountry');
    // for (let i = 0; i < country.length; i++) {
    //   this._services.service_general_get('Catalogue/GetState?country=' + country[i].id).subscribe((data => {
    //     if (data.success) {
    //         city = data.result;
    //         for (let j = 0; j < city.length; j++) {
    //           city_final.push(city[j]);
    //         }
    //     }
    //   }))
    // }
    // console.log("CIUDADES DINALES: ", city_final);
    // this.city_select = city_final;
    this.__loader__.hideLoader();
  }
  //*******************************************//
  //CONSULTA DE CLIENTE//
  public getClient() {
    console.log("consulta Cliente");
    this._services.service_general_get('Catalogue/GetClient/' + this.data_search.partner).subscribe((data => {
      if (data.success) {
        this.ca_cliente = data.result.value;
      }
    }))
  }
  //CONSULTA PARA TRAER LOS COORDINATOR//
  getCoordinator() {
    this._services.service_general_get("Catalogue/GetCoordinator/" + this.data_search.client).subscribe((data => {
      if (data.success) {
        console.log("select coordinator: ", data.result);
        this.ca_coordinator = data.result.value;
      }
    }));
  }
  //CONSULTA DE SUPPLIER PARTNER//
  getSupplierPartner() {
    if (this.data_search.city == "") {
      return true;
    }
    this._services.service_general_get(`SupplierPartnerProfile/GetSupplierPartnerConsultant?country=${this.data_search.country}&city=${this.data_search.city}`).subscribe((data => {
      if (data.success) {
        console.log("select supplier: ", data.result.value);
        this.supplier_catalogue = data.result.value;
      }
    }));
  }
  //*******************************************//
  //FILTRO FECHA//
  public filteringServiceRecordTable(): void {
    let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.rangeDate1 != null && this.range.value.rangeDate1 != '') this.data_search.rangeDate1 = this.filterDate(this.range.value.rangeDate1);
    if (this.range.value.rangeDate2 != null && this.range.value.rangeDate2 != '') this.data_search.rangeDate2 = this.filterDate(this.range.value.rangeDate2);
    for (let item in this.data_search) {
      if (this.data_search[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_search[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if (this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null) {
      this.getServiceRecordTableData(params);
    }
  }
  //*******************************************//
  public filterDate(date_in: any): string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }
  //*******************************************//
  //CONSULTA INFORMACION POR FILTRO//
  public getServiceRecordTableData(params: string = ''): void {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    this._services.service_general_get('MyDashboard/GetUpcomingArrivals/' + this.user.id + params_in).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.map.value;
        console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
        this.data_table = new MatTableDataSource(data.map.value);
        this.data_table.paginator = this.arrivalpag;
        this.data_table.sort = this.arrivalsort;
        this.__loader__.hideLoader();
      }
    });
  }
  //********************************************//
  //FUNCION PARA BUSQUEDA DE EVENTOS//
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.data_search) {
      if (this.data_search[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_search[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getServiceRecordTableData(params);
  }
  //*********************************************//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_table.filter = filterValue.trim().toLowerCase();
  }
  //*********************************************//
  public cleanFilter(): void {

    this.data_search.filter = '';
    this.data_search.city = '';
    this.data_search.country = '';
    this.data_search.partner = '';
    this.data_search.client = '';
    this.data_search.coordinator = '';
    this.data_search.supplier = '';
    this.range.reset({
      rangeDate1: '',
      rangeDate2: ''
    });
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
    this.filterSupplier = {
      comercialName: ''
    };
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
  //*********************************************//
  showExportDialog() {
    const dialogRef = this._dialog.open(DialogExportComponent, {
      data: this.data_table.filteredData,
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 1) {
        document.getElementById("excel").click();
      }

      if (result === 2) {
        let tabla = [
          ['Service Record', 'VIP', 'Arrival Date', 'Assignee Name', 'Partner', 'Client', 'Coordinator', 'Supplier', 'Location', 'Services']
        ]
        for (let i = 0; i < this.data_table.filteredData.length; i++) {
          const element = this.data_table.filteredData[i];
          if (element.status) {
            element.status = 'Active';
          } else {
            element.status = 'Inactive';
          }
          tabla.push([
            element.numberServiceRecord,
            element.vip,
            element.initialArrival,
            element.assigneeName,
            element.partner,
            element.client,
            element.coordinator,
            element.supplier,
            element.location,
            element.services
          ])
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

        pdf.create().download('arrivals.pdf');
      }
    });
  }

  services_consult: any[] = [];

  async getServices(data_) {
    await this.initPageSettings(data_.id);
    this.services_consult = [];
    if (data_.serviceLine == "I") {
      this._services.service_general_get("ServiceRecord/GetServices/" + data_.id + "?type=1").subscribe((data => {
        console.log("Entra a consultar las WO immigration: ", data);
        if (data.success) {

          for (let i = 0; i < data.map.value.home.length; i++) {
            data.map.value.home[i].homehost = 1;
          }

          for (let i = 0; i < data.map.value.host.length; i++) {
            data.map.value.host[i].homehost = 2;
          }

          this.services_consult = data.map.value.home;
          for (let i = 0; i < data.map.value.host.length; i++) {
            this.services_consult.push(data.map.value.host[i]);
          }
          console.log(this.services_consult)
        }
      }))
    } else {
      this._services.service_general_get("ServiceRecord/GetServices/" + data_.id + "?type=2").subscribe((data => {
        console.log("Entra a consultar las WO relocation: ", data);
        if (data.success) {
          for (let i = 0; i < data.map.value.home.length; i++) {
            data.map.value.home[i].homehost = 1;
          }

          for (let i = 0; i < data.map.value.host.length; i++) {
            data.map.value.host[i].homehost = 2;
          }

          this.services_consult = data.map.value.home;
          for (let i = 0; i < data.map.value.host.length; i++) {
            this.services_consult.push(data.map.value.host[i]);
          }
          console.log(this.services_consult)
        }
      }))
    }
  }

  public SRDATA: any = undefined;
  public edit_sr_model: any;
  public Host_Home_country: any = {};
  public city_host_catalogue: any;
  public city_home_catalogue: any;


  public initPageSettings(id): void {
    this.__loader__.showLoader();
    this._services.service_general_get(`ServiceRecord/GetServiceRecordById?id=${id}&user=${this.user.id}`)
      .subscribe(async (response: any) => {
        if (response.success) {
          this.SRDATA = response.result;
          if (this.SRDATA.immigrationCoodinators.length > 0) {
            if (this.SRDATA.immigrationCoodinators[0].accepted == "1900-01-01T00:00:00") {
              this.SRDATA.immigrationCoodinators[0].accepted = null;
            }
          }

          if (this.SRDATA.relocationCoordinators.length > 0) {
            if (this.SRDATA.relocationCoordinators[0].accepted == "1900-01-01T00:00:00") {
              this.SRDATA.relocationCoordinators[0].accepted = null;
            }
          }
          this.edit_sr_model = this.SRDATA;

          const host_country: number = this.edit_sr_model.assigneeInformations[0].hostCountry,
            home_country: number = this.edit_sr_model.assigneeInformations[0].homeCountryId;


          this.Host_Home_country = {
            host_country: this.edit_sr_model.assigneeInformations[0].hostCountry,
            home_country: this.edit_sr_model.assigneeInformations[0].homeCountryId,
          }

          this.city_host_catalogue = await this._services.getCatalogueFrom('GetState', `?country=${host_country}`);
          this.city_home_catalogue = await this._services.getCatalogueFrom('GetState', `?country=${home_country}`);

          for (let i = 0; i < this.country_catalogue.length; i++) {
            const element = this.country_catalogue[i];
            if (element.id == this.Host_Home_country.host_country) {
              this.Host_Home_country.host_country_name = element.name;
            }

            if (element.id == this.Host_Home_country.home_country) {
              this.Host_Home_country.home_country_name = element.name;
            }
          }

          this.city_host_catalogue.forEach((city: any) => {

            if (city.id == this.edit_sr_model.assigneeInformations[0].hostCityId) {

              this.Host_Home_country.host_city_name = city.state;

            }

          });

          this.Host_Home_country.homeCity_Id = this.edit_sr_model.assigneeInformations[0].homeCityId;
          this.Host_Home_country.hostCity_Id = this.edit_sr_model.assigneeInformations[0].hostCityId;

          for (let i = 0; i < this.city_host_catalogue.length; i++) {
            const element = this.city_host_catalogue[i];
            if (element.id == this.Host_Home_country.hostCity_Id) {
              this.Host_Home_country.hostCity_name = element.city;
            }
          }

          for (let i = 0; i < this.city_home_catalogue.length; i++) {
            const element = this.city_home_catalogue[i];
            if (element.id == this.Host_Home_country.homeCity_Id) {
              this.Host_Home_country.homeCity_name = element.city;
            }
          }
          this.__loader__.hideLoader();
          console.log('[CP353] Data edit_sr_model  => ', this.edit_sr_model);
          localStorage.setItem('partnerID', JSON.stringify(this.edit_sr_model.partnerId));
        }
      }, (error: any) => {
        console.error('Error (GetServiceRecordById) => ', error);
        this.__loader__.hideLoader();
      });
  }

  public showDialogentryVisa(data): void {
    data.partnerId = this.edit_sr_model.partnerId;
    data.numberServiceRecord = this.edit_sr_model.numberServiceRecord;
    data.sr = this.edit_sr_model.numberServiceRecord;
    data.data = data;
    if (data.homehost == 2) {
      data.country_city = {
        home_contry_name: this.Host_Home_country.host_country_name,
        country_id: this.Host_Home_country.host_country,
        home_city_name: this.Host_Home_country.hostCity_name,
        city_id: this.Host_Home_country.hostCity_Id,
      }
    } else {
      data.country_city = {
        home_contry_name: this.Host_Home_country.home_country_name,
        country_id: this.Host_Home_country.home_country,
        home_city_name: this.Host_Home_country.homeCity_name,
        city_id: this.Host_Home_country.homeCity_Id,
      }
    }

    data.home_host = data.homehost;
    let dialog;

    switch (data.dialog_type) {
      case 1:
        dialog = EntryVisaComponent;
        break;
      case 2:
        dialog = DialogWorkPermitComponent;
        break;
      case 3:
        dialog = DialogVisaDeregistrationComponent;
        break;
      case 4:
        dialog = DialogResidencyPermitComponent;
        break;
      case 5:
        dialog = DialogDocumentManagementComponent
        break;
      case 6:
        dialog = DialogLocalDocumentationComponent
        break;

      case 7:
        this.showDialogById(data.dialog_type, data);
        break;

      case 8:
        this.showDialogById(data.dialog_type, data);
        break;

      case 9:
        this.showDialogById(data.dialog_type, data);
        break;

      case 10:
        this.showDialogById(data.dialog_type, data);
        break;

      case 28:
        dialog = OtherImmigrationComponent
        break;

      default:
        break;
    }

    if (data.dialog_type > 0 && data.dialog_type < 7) {
      if (data.service != 0) {
        const dialogRef = this._dialog.open(dialog, {
          data: data,
          width: "95%"
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.animateToTop();
          this.ngOnInit();
        });

      }
    }

    if (data.dialog_type == 28) {
      if (data.service != 0) {
        const dialogRef = this._dialog.open(dialog, {
          data: data,
          width: "95%"
        });

        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });

      }
    }
  }

  public showDialogById(dialog_id: number, obj_props: any = null): void {
    obj_props.partnerId = this.edit_sr_model.partnerId;
    console.log('Data Service sent ====> ', obj_props);
    console.log('Id Service ===> ', dialog_id);
    switch (dialog_id) {

      case 7:
        const corporate_dialog = this._dialog.open(DialogCortporateAssistance, {
          data: {
            //sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_id: obj_props.service[0].id,
            data: obj_props
          },
          width: "95%"
        });

        corporate_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

      case 8:
        const renewal_dialog = this._dialog.open(DialogRenewal, {
          data: {
            sr: this.edit_sr_model.numberServiceRecord,
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            //sr_hcity: this.Host_Home_country.host_city_name, hostCity_name,
            sr_hcity: this.Host_Home_country.hostCity_name,
            data: obj_props
          },
          width: "95%"
        });

        renewal_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

      case 9:
        const notificacion_dialog = this._dialog.open(NotificationDialog, {
          data: {
            sr: this.edit_sr_model.numberServiceRecord,
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            //sr_hcity: this.Host_Home_country.host_city_name,
            sr_hcity: this.Host_Home_country.hostCity_name,
            data: obj_props
          },
          width: "95%"
        });
        notificacion_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

      case 10:
        const legal_dialog = this._dialog.open(DialogLegalReviewConsultation, {
          data: {
            sr_id: obj_props.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name,
            data: obj_props
          },
          width: "95%"
        });

        legal_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;
    }
  }

  openmodal(data, country) {
    console.log("Entra a abrir modal de detalle del servicio");
    data.partnerId = this.edit_sr_model.partnerId;
    data.numberServiceRecord = this.edit_sr_model.numberServiceRecord;
    data.sr = this.edit_sr_model.numberServiceRecord;

    if (data.homehost == 2) {
      data.country_city = {
        home_contry_name: this.Host_Home_country.host_country_name,
        country_id: this.Host_Home_country.host_country,
        home_city_name: this.Host_Home_country.hostCity_name,
        city_id: this.Host_Home_country.hostCity_Id,
      }
    } else {
      data.country_city = {
        home_contry_name: this.Host_Home_country.home_country_name,
        country_id: this.Host_Home_country.home_country,
        home_city_name: this.Host_Home_country.homeCity_name,
        city_id: this.Host_Home_country.homeCity_Id,
      }
    }

    data.home_host = country;
    data.sr = this.edit_sr_model.numberServiceRecord;
    data.program = data.serviceType;
    data.wo = data.workOrderId
    const dialogRef = this._dialog.open(DialogBundleComponent, {
      width: "95%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  PreDecision(type) {
    type.partnerId = this.edit_sr_model.partnerId;
    let SR = type.numberServiceRecord.split("-");
    let number_sr = SR[1];
    type.sr = number_sr;
    console.log(type);
    let moda;

    switch (type.dialog_type) {
      case 10:
        moda = DialogLegalReviewConsultation;
        break;
      case 12:
        moda = PreDecisionOrientationComponent;
        break;
      case 13:
        moda = AreaOrientationComponent;
        break;
      //case 21:
       // moda = HomeFindingComponent;
       // break;
      case 14:
        moda = SettlingInComponent;
        break;
      case 15:
        moda = SchoolSearchComponent;
        break;
      case 16:
        moda = DialogDepartureComponent;
        //this.showDialogRelocation( type );
        break;
      case 18:
        moda = DialogRentalFurnitureComponent;
        break;
      case 19:
        moda = DialogTransportationComponent;
        break;
      case 17:
        this.showDialogRelocation(type, type.homehost);
        break;
      case 20:
        moda = DialogAirportTransportationComponent;
        break;
      case 22:
        moda = LegalRenewalComponent;
        break;
        // home sale
      case 23:
        moda = HomeSaleComponent;
        break;
        // home purchase
      case 24:
        moda = HomePurchaseComponent;
        break;
        // property managment
      case 25:
        moda = PropertyManagementComponent;
        break;
        // other
      case 26:
        moda = OtherComponent;
        break;
      case 27:
        moda = TenancyManagementComponent;
        break;
    }

    if (type.dialog_type != 17) {
      type.home_host = type.homehost;
      const dialogRef = this._dialog.open(moda, {
        data: {
          sr: number_sr,
          data: type
        },
        width: "95%"
      });

      dialogRef.afterClosed().subscribe((so_added: any) => {
        //this.animateToTop();
        this.ngOnInit();
      });
    }
  }

  public showDialogRelocation(service_in: any, id): void {
    service_in.home_host = id;
    service_in.partnerId = this.edit_sr_model.partnerId;

    console.log('Service selected in ESR ======> ', service_in);

    switch (service_in.categoryId) {

      case 16:
        const departure_dialog = this._dialog.open(DialogDepartureComponent, {
          data: {
            sr_id: service_in.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name
          },
          width: "95%"
        });

        departure_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;

      case 17:
        const legal_dialog = this._dialog.open(DialogTemporaryHousingComponent, {
          data: {
            sr: service_in.sr,
            sr_id: service_in.service[0].id,
            app_id: this.edit_sr_model.id,
            sr_hcountry: this.Host_Home_country.host_country_name,
            sr_hcity: this.Host_Home_country.host_city_name,
            data: service_in
          },
          width: "95%"
        });
        legal_dialog.afterClosed().subscribe((so_added: any) => {
          this.ngOnInit();
        });
        break;
    }
  }

  goToSR(data){
    this._dialog.closeAll();
    let SR = data.numberServiceRecord.split('-');
    this.router.navigateByUrl("editServiceRecord/"+Number(SR[1]));
  }
}
