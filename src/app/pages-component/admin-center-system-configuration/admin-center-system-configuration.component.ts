import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve} from '@angular/router';
import { DialogCatalogOfficesComponent } from '../dialog/dialog-catalog-offices/dialog-catalog-offices.component';
import { DialogAdminCenterCountriesComponent } from '../dialog/dialog-admin-center-countries/dialog-admin-center-countries.component';
import { DialogAddCountrySeccionCountryComponent } from '../dialog/dialog-add-country-seccion-country/dialog-add-country-seccion-country.component';
import { DialogAddServiceAdminCenterComponent } from '../dialog/dialog-add-service-admin-center/dialog-add-service-admin-center.component';
import { DialogAddUpcomingComponent } from './../dialog/dialog-add-upcoming/dialog-add-upcoming.component';
import { DialogAddSlideHomeComponent } from './../dialog/dialog-add-slide-home/dialog-add-slide-home.component';
import { DialogSliderComponent } from '../dialog/dialog-slider/dialog-slider.component';

@Component({
  selector: 'app-admin-center-system-configuration',
  templateUrl: './admin-center-system-configuration.component.html',
  styleUrls: ['./admin-center-system-configuration.component.css']
})
export class AdminCenterSystemConfigurationComponent implements OnInit {

  // office
  @ViewChild('sortoffice') sortoffice: MatSort;
  @ViewChild(MatPaginator) pagoffice: MatPaginator;
  @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;
  // countries
  @ViewChild('sortcountry') sortcountry: MatSort;
  @ViewChild(MatPaginator) pagocountry: MatPaginator;
  @ViewChild('paginatorcountriesElement', {read: ElementRef}) paginatorcountriesHtmlElement: ElementRef;

  // services
  @ViewChild('immisort') immisort: MatSort;
  @ViewChild('relosort') relosort: MatSort;

  @ViewChild('immipag') immipag: MatPaginator;
  @ViewChild('paginatorserimmiElement', {read: ElementRef}) paginatorserimmiHtmlElement: ElementRef;
  @ViewChild('relopag') relopag: MatPaginator;
  @ViewChild('paginatorserreloElement', {read: ElementRef}) paginatorserreloHtmlElement: ElementRef;
  // upcoming
  @ViewChild('sortupcoming') sortupcoming: MatSort;
  @ViewChild(MatPaginator) pagupcoming: MatPaginator;
  @ViewChild('paginatorupcomingElement', {read: ElementRef}) paginatorupcomingHtmlElement: ElementRef;
  // slider
  @ViewChild('sortslider') sortslider: MatSort;
  @ViewChild(MatPaginator) pagslider: MatPaginator;
  @ViewChild('paginatorsliderElement', {read: ElementRef}) paginatorsliderHtmlElement: ElementRef;

  displayedColumnsOffices: string[] = ['Office Name', 'Country', 'City', 'Phone Number', 'Action'];
  displayedColumnsCountry: string[] = ['Country', 'Currency', 'Languages', 'Cities', 'Creation Date', 'Action'];
  // services
  cuatro: string[] = ['dos', 'tres', 'cuatro'];
  public displayedColumnUpcoming: string[] = ['EventDate', 'Title', 'Country', 'City', 'Creation Date', 'Action'];
  public displayedColumnSlider: string[] = ['Image', 'Phrase', 'Creation Date', 'Action'];

  // data catalogo
  dataOffices: any;
  dataCountries: any;
  serviceLocationsimmi: any;
  serviceLocationsrelo: any;
  dataUpcoming: any;
  dataSlider: any;
  country_catalogue: any;
  country_city: any;
  service_immi: any[] = [];
  service_relo: any[] = [];
  cities_Data_view: any[] = [];

  tableCatalog: string;
  classCard;
  search;
  selectCatalogs = [
    { value: 'countries', name: 'Countries' },
    // { value: 'emergency response', name: 'Emergency Response' },
    { value: 'offices', name: 'Offices' },
    { value: 'services', name: 'Services' },
    // { value: 'slider', name: 'Slider' },
    // { value: 'upcoming', name: 'Upcoming' },
  ];
  public filterCatalog: any = { name: '' };

  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public _router:Router) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.tableCatalog = 'offices';
    this.get_catalogos();
    this.consultaPermisos();
    this.catalog();
    this.__loader__.hideLoader();
  }
  async catalog() {
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.country_city = await this._services.getCatalogueFrom('GetState');

  }

  //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;
	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  public info_row : any = {};
  viewData(data) {
    console.log(data);
    this.info_row  =  data;
  }
  //*********************************************//

  get_catalogos() {
    this.__loader__.showLoader();
    console.log('se eligio el catalogo', this.tableCatalog);
    if (this.tableCatalog == 'offices') {
      this.__loader__.showLoader();
      this._services.service_general_get('Catalog/GetAllOffice').subscribe(rOffice => {
        console.log('catalogo office', rOffice);
        if (rOffice.success) {
          this.dataOffices = new  MatTableDataSource(rOffice.result);
          this.dataOffices.paginator = this.pagoffice;
          this.dataOffices.sort = this.sortoffice;

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'countries') {
      this._services.service_general_get('CountryAdminCenter/GetCountry').subscribe(rCountry => {
        console.log('catalogo country', rCountry);
        if (rCountry.success) {
          this.dataCountries = new  MatTableDataSource(rCountry.result.value);
          this.dataCountries.paginator = this.pagocountry;
          this.dataCountries.sort = this.sortcountry;
          console.log('dataTable', this.dataCountries);

          this.search = '';
          this.__loader__.hideLoader();
        }
      });
    }
    if (this.tableCatalog == 'services') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetAllServices/1').subscribe(rimi => {
        console.log('catalogo imigration', rimi);
        if (rimi.success) {
          this.service_immi = rimi.result;
          this.serviceLocationsimmi = new  MatTableDataSource(rimi.result);
          this.serviceLocationsimmi.paginator = this.immipag;
          this.serviceLocationsimmi.sort = this.immisort;
          console.log('dataTable', this.serviceLocationsimmi);
          // ++

          this.search = '';
        }
      });
      this._services.service_general_get('AdminCenter/GetAllServices/2').subscribe(r=>{
        if(r.success){
          this.service_relo = r.result;
          this.serviceLocationsrelo = new  MatTableDataSource(r.result);
          this.serviceLocationsrelo.paginator = this.relopag;
          this.serviceLocationsrelo.sort = this.relosort;
           // ++

           this.search = '';
        }
      })
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'emergency') {
      // ++

      this.search = '';
    }
    if (this.tableCatalog == 'upcoming') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetUpcomingEvents').subscribe(respeven => {
        console.log('catalogo upcoming event', respeven);
        if (respeven.success) {
          this.dataUpcoming = new  MatTableDataSource(respeven.result);
          this.dataUpcoming.paginator = this.pagupcoming;
          this.dataUpcoming.sort = this.sortupcoming;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'slider') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetSliderPhrase').subscribe(respslider => {
        console.log('catalogo slider', respslider);
        if (respslider.success) {
          this.dataSlider = new  MatTableDataSource(respslider.result);
          this.dataSlider.paginator = this.pagslider;
          this.dataSlider.sort = this.sortslider;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
  }

  getRelocationServices(event){
    console.log(event);
    this.__loader__.showLoader();
    this._services.service_general_get('AdminCenter/GetAllServices/2').subscribe(r=>{
      if(r.success){
        this.serviceLocationsrelo = new  MatTableDataSource(r.result);
        debugger;
        this.serviceLocationsrelo.paginator = this.relopag;
        this.serviceLocationsrelo.sort = this.relosort;
         // ++

         this.search = '';
         this.__loader__.hideLoader();
      }
    })
    this.__loader__.hideLoader();
  }

  //GET COUNTRY ORIGIN NAME//
  getCountryOriginName(id){
    for(let i = 0; i < this.country_catalogue.length; i++){
      if(this.country_catalogue[i].id == id){
         return this.country_catalogue[i].name;
      }
    }
  }
  getCity(id: number) {
    for (let i = 0; i < this.country_city.length; i++) {
      if (this.country_city[i].id == id) {
        return this.country_city[i].city;
      }
    }
  }

  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.tableCatalog == 'offices') {
      this.dataOffices.filter = filterValue.trim().toLowerCase();
    } else if (this.tableCatalog == 'countries') {
      this.dataCountries.filter = filterValue.trim().toLowerCase();
    } else if (this.tableCatalog == 'services') {
      this.serviceLocationsimmi.filter = filterValue.trim().toLowerCase();
      this.serviceLocationsrelo.filter = filterValue.trim().toLowerCase();
    } else if (this.tableCatalog == 'emergency response') {
    }else if (this.tableCatalog == 'upcoming events') {
      this.dataUpcoming.filter = filterValue.trim().toLowerCase();
    }else if (this.tableCatalog == 'slider phrase') {
      this.dataSlider.filter = filterValue.trim().toLowerCase();
    }
  }
  // office add and delete
  addOffice(id) {
    console.log('abrir modal office');
    const dialogRef = this._dialog.open(DialogCatalogOfficesComponent, {
      data: {id: id},
      width: "40%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteOffice(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Office?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteOffice/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted ${data.result.office}`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The office is in use by other records`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  deleteSlider(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Slider?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`AdminCenter/Remove/SliderPhrase/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `${data.message}`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The office is in use by other records`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // countries add and delete
  addCountry(){
  //  console.log("ABRE MODAL COUNTRY");
    const dialogRef = this._dialog.open(DialogAdminCenterCountriesComponent, {
      data: { id : 0, origin : 'systemConfiguration'},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
       this.get_catalogos();
    })
  }
  editRegistro(data_){
    data_.origin = 'systemConfiguration';
    console.log("ABRE MODAL PARA EDICION DE REGISTRO GENERAL: ", data_);
    const dialogRef = this._dialog.open(DialogAdminCenterCountriesComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
       this.get_catalogos();
    })
  }
  deleteCountry(data){

    console.log(data);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this country?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.__loader__.showLoader();
        this._services.service_general_delete("CountryAdminCenter/DeleteCountry?id=" + data.id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: 'Country deleted successfull'
              },
              width: "350px"

            });
            this.__loader__.hideLoader();
            this.get_catalogos();
          }
        }),(err)=>{
          console.log("err ", err);
          if(err.status == 409){
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Attention",
                body: 'This country can`t be deleted'
              },
              width: "350px"
            });
            this.__loader__.hideLoader();
            this.get_catalogos();
          }
        })
      }
    })
  }
  // countries
  AddCountryDialog(){
    const dialogRef = this._dialog.open(DialogAddCountrySeccionCountryComponent, {
      data: {data: 'no'},
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_catalogos();
    })
  }

  addService(id){
    const dialogRef = this._dialog.open(DialogAddServiceAdminCenterComponent, {
      data: {id: id, serviceImm: this.service_immi, serviceRelo: this.service_relo},
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result === 1){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }

      if(result === 2){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }

    })
  }
  // emergency response
  addEmergencyResponse(id) {

  }
  // upcoming
  addUpcoming(id) {
    console.log('abrir modal upcoming');
    const dialogRef = this._dialog.open(DialogAddUpcomingComponent, {
      data: {id: id},
      width: "40%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  addSlider(id) {
    console.log('abrir modal slider');
    const dialogRef = this._dialog.open(DialogAddSlideHomeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }

  getCities(obj){
    
    this.cities_Data_view = obj;
    console.log(this.cities_Data_view);
  }
}
