import { Component, OnInit, ViewChild, ElementRef, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { Router } from '@angular/router';
import { EntryVisaComponent } from '../entry-visa/entry-visa.component';
import { DialogWorkPermitComponent } from '../dialog-work-permit/dialog-work-permit.component';
import { DialogVisaDeregistrationComponent } from '../dialog-visa-deregistration/dialog-visa-deregistration.component';
import { DialogResidencyPermitComponent } from '../dialog-residency-permit/dialog-residency-permit.component';
import { DialogDocumentManagementComponent } from '../dialog-document-management/dialog-document-management.component';
import { DialogLocalDocumentationComponent } from '../dialog-local-documentation/dialog-local-documentation.component';
import { OtherImmigrationComponent } from '../other-immigration/other-immigration.component';
import { DialogCortporateAssistance } from '../corporate-assistance/corporate-assistance.component';
import { DialogRenewal } from '../renewal/renewal.component';
import { NotificationDialog } from '../notification/notification.component';
import { DialogLegalReviewConsultation } from '../legal-review-consultation/legal-review-consultation.component';
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

@Component({
  selector: 'app-dialog-following',
  templateUrl: './dialog-following.component.html',
  styleUrls: ['./dialog-following.component.css']
})
export class DialogFollowingComponent implements OnInit {

  loader:LoaderComponent = new LoaderComponent();
  ca_coordinator:any[]=[];
  ca_service_record:any[]=[];
  user: any;
  data_table: any;
  data_filter:any={
    sr:"",
    coordinator:""
  }

  @ViewChild('sortFollowing') sortFollowing: MatSort;
  // @ViewChild(MatSort, {static: true}) sortFollowing: MatSort;
  // @ViewChild('pagFollowing') pagFollowing: MatPaginator;
  // @ViewChild(MatPaginator, {static: true}) pagFollowing: MatPaginator;
  @ViewChild(MatPaginator, {static: true})pagFollowing: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;


  filteruno: boolean = false;

  displayedColumns: string[] = ['ServiceRecord', 'VIP', 'status', 'AuthoDate', 'Partner', 'Client', 'Coordinator', 'AssigneeName', 'Services', 'Unfollow'];

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public _router:Router) { }

  public filterServiceRecord: any = { numberServiceRecord: '' };
  public filterCoordinator: any = { coordinator: '' };
  maxall: number = 20;



  ngOnInit(): void {
    this.consultaPermisos();
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    this._services.service_general_get('MyDashboard/GetFollowing/'+this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        console.log(data.map.value);

        for(let i = 0; i < data.map.value.length; i++){
          data.map.value[i].services_SR = [];
          for (let j = 0; j < data.map.value[i].immigration.length; j++) {
            data.map.value[i].services_SR.push(data.map.value[i].immigration[j])
          }
          for (let j = 0; j < data.map.value[i].relocation.length; j++) {
            data.map.value[i].services_SR.push(data.map.value[i].relocation[j])
          }
        }
        console.log("Objeto final: ", data.map.value);
        this.data_table = new MatTableDataSource(data.map.value);
        this.data_table.paginator = this.pagFollowing;
        this.data_table.sort = this.sortFollowing;
      }
      }));

    this._services.service_general_get('Catalogue/GetServiceRecord/'+this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.ca_service_record = data.result;
      }
    }));
    this.catalogos();
  }
  // paginator
  getPageSizeOptions(): number[] {
    if (this.data_table?.paginator.length > this.maxall)
    return [10, 20, this.data_table?.paginator.length ];
    else
     return [10, 20];
  }
  //*****************************************************************//
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
  //*********************************************//
  country_catalogue = [];
  async catalogos() {
    //this.ca_coordinator = await this._services.getCatalogueFrom('GetCoordinator');
      this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
      this._services.service_general_get("Catalogue/GetCoordinator/0").subscribe((data =>{
        if(data.success){
          console.log("select coordinator: ", data.result);
          this.ca_coordinator = data.result.value;
        }
      }));

    this.loader.hideLoader();
  }
  //*********************************************//
  searchData() {
    let service_record_params_selected:string = '';;
    let params = '';
    for( let item in this.data_filter ) {
     if( this.data_filter[item] != '' ) {
         service_record_params_selected += `${ item }=${ this.data_filter[item] }&`;
         params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
     }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getServiceRecordTableData(params);
   }
   //********************************************//
   public getServiceRecordTableData(params: string = ''): void {
    this.loader.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    this._services.service_general_get('MyDashboard/GetFollowing/'+this.user.id + params_in).subscribe((data: any) => {
        if (data.success) {
          for(let i = 0; i < data.map.value.length; i++){
            data.map.value[i].services_SR = [];
            for (let j = 0; j < data.map.value[i].immigration.length; j++) {
              data.map.value[i].services_SR.push(data.map.value[i].immigration[j])
            }
            for (let j = 0; j < data.map.value[i].relocation.length; j++) {
              data.map.value[i].services_SR.push(data.map.value[i].relocation[j])
            }
          }
          this.data_table = new MatTableDataSource(data.map.value);
          this.data_table.paginator = this.pagFollowing;
          this.data_table.sort = this.sortFollowing;
          this.loader.hideLoader();
        }
      });
  }
  //********************************************//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_table.filter = filterValue.trim().toLowerCase();
  }
  //********************************************//
  public cleanFilter(): void {
    this.filterServiceRecord = { numberServiceRecord: '' };
    this.filterCoordinator = { coordinator: '' };

    this.data_filter = {
      sr: '',
      coordinator: ''
    };
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
  //*********************************************//
  delete_follow(data){
    console.log(data);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this following?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
          this._services.service_general_delete("Follow/DeleteFollow?id=" + data.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Following deleted"
                },
                width: "350px"
              });
            }
            this.ngOnInit();
          }))
        }
    })
  }

  public services_List:any;
  viewList(element){
    console.log("lista de servicios: ", element);
    this.services_List = element.services_SR;
  }

  goToSR(data){
    this._dialog.closeAll();
    this._router.navigateByUrl("editServiceRecord/"+data.serviceRecordId);
  }


  services_consult: any[] = [];

  async getServices(data_) {
    await this.initPageSettings(data_.serviceRecordId);
    this.services_consult = [];
    //if (data_.serviceLine == "I") {
      this._services.service_general_get("ServiceRecord/GetServices/" + data_.serviceRecordId + "?type=1").subscribe((data => {
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

          this._services.service_general_get("ServiceRecord/GetServices/" + data_.serviceRecordId + "?type=2").subscribe((data => {
            console.log("Entra a consultar las WO relocation: ", data);
            if (data.success) {
              for (let i = 0; i < data.map.value.home.length; i++) {
                data.map.value.home[i].homehost = 1;
              }
    
              for (let i = 0; i < data.map.value.host.length; i++) {
                data.map.value.host[i].homehost = 2;
              }
    
              for (let i = 0; i < data.map.value.home.length; i++) {
                this.services_consult.push(data.map.value.home[i]);
              }

              for (let i = 0; i < data.map.value.host.length; i++) {
                this.services_consult.push(data.map.value.host[i]);
              }
              console.log(this.services_consult)
            }
          }))
        }
      }))
    //} else {
      /*
      this._services.service_general_get("ServiceRecord/GetServices/" + data_.serviceRecordId + "?type=2").subscribe((data => {
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
      */
    //}
  }

  public SRDATA: any = undefined;
  public edit_sr_model: any;
  public Host_Home_country: any = {};
  public city_host_catalogue: any;
  public city_home_catalogue: any;

  public initPageSettings(id): void {
    this.loader.showLoader();
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
          this.loader.hideLoader();
          console.log('[CP353] Data edit_sr_model  => ', this.edit_sr_model);
          localStorage.setItem('partnerID', JSON.stringify(this.edit_sr_model.partnerId));
        }
      }, (error: any) => {
        console.error('Error (GetServiceRecordById) => ', error);
        this.loader.hideLoader();
      });
  }


  determinaModal(data){
     console.log("data: ",data);

     if(data.serviceType == 'Standalone'){
      switch(data.dialog_type){
         case 1:
             this.showDialogentryVisa(data);
           break;
         case 2:
             this.showDialogentryVisa(data);
           break;
         case 3:
             this.showDialogentryVisa(data);
           break;
         case 4:
          this.showDialogentryVisa(data);
           break;
         case 5:
          this.showDialogentryVisa(data);
           break;
         case 6:
          this.showDialogentryVisa(data);
           break;
         case 7:
          this.showDialogentryVisa(data);
           break;
         case 8:
          this.showDialogentryVisa(data);
           break;
         case 9:
          this.showDialogentryVisa(data);
           break;
         case 10:
          this.showDialogentryVisa(data);
           break;
           case 12:
            this.PreDecision(data);
            break;
         case 13:
            this.PreDecision(data);
            break;
         case 14:
            this.PreDecision(data);
          break;
         case 15:
            this.PreDecision(data);
          break;
         case 16:
            this.PreDecision(data);
          break;
         case 17:
            this.PreDecision(data);
          break;
         case 18:
            this.PreDecision(data);
          break;
         case 19:
            this.PreDecision(data);
          break;
         case 20:
            this.PreDecision(data);
          break;
         case 21:
            this.PreDecision(data);
          break;
         case 22:
            this.PreDecision(data);
          break;
         case 23:
            this.PreDecision(data);
          break;
         case 24:
            this.PreDecision(data);
          break;
         case 25:
            this.PreDecision(data);
          break;
         case 26:
            this.PreDecision(data);
          break;
         case 27:
            this.PreDecision(data);
          break;
         case 28:
          this.showDialogentryVisa(data);
           break;
      }
     }else if(data.serviceType != "Standalone"){
      switch(data.dialog_type){
        case 1:
            this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 2:
            this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 3:
            this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 4:
         this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 5:
         this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 6:
         this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 7:
         this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 8:
         this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 9:
         this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 10:
         this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 12:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 13:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
          break;
        case 14:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 15:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 16:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 17:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 18:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 19:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 20:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 21:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 22:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 23:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 24:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 25:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 26:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 27:
          this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
        case 28:
         this.openmodal(data,this.edit_sr_model.assigneeInformations[0].homeCountryId);
        break;
      }
     }
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
    let SR = this.edit_sr_model.numberServiceRecord.split("-");
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
 /*      case 21:
        moda = HomeFindingComponent;
        break; */
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

}
