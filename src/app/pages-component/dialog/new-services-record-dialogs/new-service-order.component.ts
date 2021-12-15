import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralConfirmation } from '../dialog-general-confirmation/dialog-general-confirmation.component';
import { DialogConfirmServiceComponent } from '../dialog-confirm-service/dialog-confirm-service.component'
import { userInfo } from 'os';

@Component({
  selector: 'app-dialog-base-prueba',
  templateUrl: './new-service-order.component.html',
  styleUrls: []
})
export class NewServiceOrderDialog implements OnInit {

  disable: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<NewServiceOrderDialog>,
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog,
    public router: Router
  ) {
    dialogRef.disableClose = true;
  }
  public at: boolean = true;
  public gt: boolean = false;
  public standalone_table_columns: string[] = ['cam_1', 'cam_2', 'cam_3', 'cam_4', 'cam_5', 'cam_6', 'cam_7', 'cam_8', 'cam_9', 'cam_10'];
  public package_services: string[] = ['campo_0', 'campo_1', 'campo_2', 'campo_3', 'campo_4', 'campo_5', 'campo_6', 'campo_7'];
  public loader: LoaderComponent = new LoaderComponent();

  public standalone_table_content: any = [
    {
      deliver_to: 'Example',
      deliver_in: 'Example',
      service_nu: 'Example',
      location: 'Example',
      accept_date: 'Example',
      autho_time: 'Example',
      projected_fee: 'Example'
    }
  ];

  public dataSource;
  public service_order_line: any[] = [];
  public is_editing: boolean = false;
  public main_fields_fill: boolean = false;
  public yesterday_today: Date = null;
  public is_new_sr: boolean = false;
  public user: any = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    console.log(this.data);
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.getCatalogues();
    console.log(this.data);
    this.validatingMainFields();
    const today: Date = new Date();
    this.yesterday_today = today;
    if (this.data.new_sr) this.is_new_sr = true;
    if (this.data.id_so != null) {
      this.loader.showLoader();
      this.is_editing = true;
      this.main_fields_fill = true;
      this._services.service_general_get(`ServiceOrder/GetOrderById?so=${this.data.id_so}`)
        .subscribe((response: any) => {
          if (response.success) {
            const root_res: any = response.result.value;
            this.work_order = root_res.workOrder[0];
            console.log('work_order', this.work_order);
            this.requestCatalogueCategory(this.work_order.serviceLineId);
            this.initSummaryTable();
            setTimeout(() => {
              this.setDeliverToFixed();
              this.createWOTableContent();
              this.createTablesForBundles();
              this.loader.hideLoader();
            }, 777);
          }
        },
          (error: any) => {
            console.error('Error (ServiceOrder/GetOrderById)', error);
          });
    }
  }
  public validatingMainFields(): void {

    this.work_order.createdDate != '' && this.work_order.serviceLineId != '' ?
      this.main_fields_fill = true : this.main_fields_fill = false;

    //if( this.is_new_sr ) {

    this.work_order.createdBy = this.data.id_user;
    this.work_order.creationDate = new Date();

    //}

    this.work_order.serviceRecordId = this.data.id_sr;
    this.work_order.updateBy = this.data.id_user;
    this.work_order.updatedDate = new Date();

  }

  public resetFieldSelected(field_in: string): void {

    const find_field: any = document.getElementsByClassName(field_in);

    setTimeout(() => {

      for (let index = 0; index < find_field.length; index += 1) {

        find_field[index].value = '';

      }

    }, 222);

  }
  getDeliverIn(id) {
    // 3
    if (this.deliverin[0].idCountryHome == id) {
      return this.deliverin[0].countryHomeName;
    }
    else if (this.deliverin[0].idCountryHost == id) {
      return this.deliverin[0].countryHostName;
    }
  }

  // valida que no se agregue otro servicio igual para el deliver to
  validDeliverTo() {
    // this.catalogService = [];
    for (let i = 0; i < this.wo_standalone_table.data.length; i++) {
      const element = this.wo_standalone_table.data[i];
      for (let c = 0; c < this.catalogService.length; c++) {
        const category = this.catalogService[c];

        if (element.serviceId === category.id) {
          this.catalogService.splice(c, 1);
        }
      }
    }

  }
  // valida que no se agregue otro servicio igual para el deliver to
  validDeliverToBundle() {
    // this.catalogService = [];
    for (let i = 0; i < this.tables_for_bundles.data.length; i++) {
      const element = this.tables_for_bundles.data[i];
      for (let c = 0; c < this.catalogServiceBundle.length; c++) {
        const category = this.catalogServiceBundle[c];

        if (element.serviceId === category.id) {
          this.catalogServiceBundle.splice(c, 1);
        }
      }
    }

  }
  public service_bundle: BundledServices = new BundledServices();
  public showPackagesServices(index: number = null): void {

    const bundle_container_b: any = document.getElementsByClassName('bundle_container_b'),
      bunble_container_p: any = document.getElementsByClassName('bunble_container_p');

    for (let bundles = bundle_container_b.length; bundles--;) {

      bundle_container_b[bundles].classList.remove('display-none');
      bunble_container_p[bundles].classList.add('display-none');

    }

    if (index != null) {

      const bundle_button: any = document.getElementById(`bundle_button_${index}`),
        bundle_container: any = document.getElementById(`bundle_container_${index}`);

      if (!bundle_button.classList.contains('display-none')) {

        bundle_button.classList.add('display-none');
        bundle_container.classList.remove('display-none');

      } else {

        bundle_button.classList.remove('display-none');
        bundle_container.classList.add('display-none');

      }

      this.show_bform_errors = false;

    }

  }

  disblableFuntion(){
    if (this.show_standalone ||
        this.work_order.standaloneServiceWorkOrders.length > 0 || 
        this.work_order.bundledServicesWorkOrders.length > 0) {
      this.disable = true;
      return true;
    }else{
      this.disable = false
      return false;
    }
  }

  public show_standalone: boolean = false;
  public showStandAlone(): void {
    !this.show_standalone ?
      this.show_standalone = true :
      this.show_standalone = false;
  }
  public show_standalone2: boolean = false;
  public showStandAlone2(): void {
    !this.show_standalone2 ?
      this.show_standalone2 = true :
      this.show_standalone2 = false;
  }

  public hideModal(): void {
    console.log(this.data.new_sr);
    if(this.data.isnew){

      const dialogRef = this._dialog.open(DialogConfirmServiceComponent, {
        data: { 
          id_sr: this.data.id_sr,
          new_sr: this.data.new_sr
         },
        width: '420px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
  
        console.log(result);
        if(result){
          this.dialogRef.close();
        }
        
      });
    }
    else
    {
      this.dialogRef.close();
    }
    
  }

  cordination(e, element) {
    console.log('evento', e);
    if (e.checked) {
      this.at = true;
      this.service_stanalone.authoTime = "0";
      element.authoTime = "0";
    } else {
      this.at = false;
      this.service_stanalone.authoTime = "";
    }
  }

  public serviceline_catalogue: any = [];
  public deliverto_catalogue: any = [];
  public deliverin_catalogue: any = [];
  public city_catalogue: any = [];
  public deliverin = [];
  public async getCatalogues(): Promise<void> {

    this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
    this.deliverin_catalogue = await this._services.getCatalogueFrom('GetDelivired');
    this.city_catalogue = await this._services.getCatalogueFrom('GetCity');

    if (!this.data.new_sr) {
      this.work_order.createdDate = new Date();

      this._services.service_general_get(`ServiceRecord/GetCountryByServiceRecord/${this.data.id_sr}`)
        .subscribe((response: any) => {
          this.deliverin = response.country.value;
          console.log(this.deliverin);
        })

      this._services.service_general_get(`ServiceRecord/GetApplicant/${this.data.id_sr}`)
        .subscribe((response: any) => {

          if (response.success) {

            this.deliverto_catalogue = response.applicant.value;
            if (this.data.new_sr_data.immigrationCoodinators.length > 0 && this.data.new_sr_data.relocationCoordinators.length == 0) {
              this.work_order.serviceLineId = 1;
              this.disable = true;
              this.work_order.createdDate = new Date();
              this.requestCatalogueCategory(1);
              this.validatingMainFields();
              this.setDeliverToFixed();
            } else if (this.data.new_sr_data.relocationCoordinators.length > 0 && this.data.new_sr_data.immigrationCoodinators.length == 0) {
              this.work_order.serviceLineId = 2;
              this.disable = true;
              this.work_order.createdDate = new Date();
              this.requestCatalogueCategory(2);
              this.validatingMainFields();
              this.setDeliverToFixed();
            }

          }

        }, (error: any) => {

          console.error('Error (GetApplicant) => ', error);

        });


    } else {

      const dependets_created: any[] = this.data.new_sr_data.assigneeInformations[0].dependentInformations;

      dependets_created.forEach((dependent: any) => {

        const new_dependent: DeliverToCatalogueModel = new DeliverToCatalogueModel();

        new_dependent.name = dependent.name;
        new_dependent.relationship = dependent.name;

        this.deliverto_catalogue.push(new_dependent);

      });

    }

    this.handleItemsLoaderStageOne();

  }

  public location_city = [];
  public location_cityWork = [];

  public getLocation() {
    this.location_city = [];
    let selected = 0;
    if(this.service_bundle.deliveringIn == this.data.home_country){
      selected = this.data.home_city;
    }else if(this.service_bundle.deliveringIn == this.data.host_country){
      selected = this.data.host_city;
    }
    this._services.service_general_get('Catalogue/GetState?country=' + this.service_bundle.deliveringIn)
      .subscribe((response: any) => {
        this.location_city = response.result;
        for (let i = 0; i < this.location_city.length; i++) {
          const element = this.location_city[i];
          if(element.id == selected){
            this.service_bundle.location = element.city;
            return;
          }
        }
        console.log(this.location_city);
      })
  }
  public getLocationWork() {
    this.location_cityWork = [];
    let selected = 0;
    if(this.standalone_work.deliveringIn == this.data.home_country){
      selected = this.data.home_city;
    }else if(this.standalone_work.deliveringIn == this.data.host_country){
      selected = this.data.host_city;
    }
    this._services.service_general_get('Catalogue/GetState?country=' + this.standalone_work.deliveringIn)
      .subscribe((response: any) => {
        this.location_cityWork = response.result;
        for (let i = 0; i < this.location_cityWork.length; i++) {
          const element = this.location_cityWork[i];
          if(element.id == selected){
            this.standalone_work.location = element.city;
            this.salon_form_valdator.no_loca = false;
            return;
          }
        }
        console.log(this.location_cityWork, this.standalone_work.location);
      })
  }

  public catalogService = [];

  public getServiceStandAlone() {
    // limpiar catalogo e input
    console.log('deliver in ', this.standalone_work.deliveringIn);
    this.catalogService = [];
    this.standalone_work.serviceId = '';
    // let partnerID = localStorage.getItem('partnerID');
    this._services.service_general_get(`Catalogue/GetService?country=${this.standalone_work.deliveringIn}&client=${this.data.partnerID}&serviceLine=${this.work_order.serviceLineId}`)
      .subscribe((response: any) => {
        console.log(response);
        this.catalogService = response.result.value;
        this.validDeliverTo();
      })
  }
  public catalogServiceBundle = [];

  public getServiceBundle() {
    // limpiar catalogo e input
    console.log('deliver in ', this.service_bundle.deliveringIn);
    this.catalogServiceBundle = [];
    this.service_bundle.serviceId = '';
    // let partnerID = localStorage.getItem('partnerID');
    this._services.service_general_get(`Catalogue/GetService?country=${this.service_bundle.deliveringIn}&client=${this.data.partnerID}&serviceLine=${this.work_order.serviceLineId}`)
      .subscribe((response: any) => {
        console.log(response);
        this.catalogServiceBundle = response.result.value;
        this.validDeliverToBundle();
      })
  }
  // Catalogue/GetService?country=1&client=98&serviceLine=1
  //FUNCIONES PARA CONSULTA DE NOMBRES//
  getNameServiceLine(id) {
    for (let i = 0; i < this.serviceline_catalogue.length; i++) {
      if (this.serviceline_catalogue[i].id == id) {
        return this.serviceline_catalogue[i].serviceLine;
      }
    }
  }
  public category = [];
  // ServiceRecord/GetCategoryByCountry/1/98?IdserviceLine=1
  public getCategory() {
    // let partnerID = localStorage.getItem('partnerID');
    this._services.service_general_get(`ServiceRecord/GetCategoryByCountry/${this.standalone_work.deliveringIn}/${this.data.partnerID}?IdserviceLine=${this.work_order.serviceLineId}`)
      .subscribe((response: any) => {
        console.log(response);
        this.category = response.country.value;
        this.validDeliverTo();
      })
  }

  public category_ = [];
  public getCategory_() {
    // let partnerID = localStorage.getItem('partnerID');
    this._services.service_general_get('ServiceRecord/GetCategoryByCountry/' + this.service_bundle.deliveringIn + '/' + this.data.partnerID + '?IdserviceLine=' + this.work_order.serviceLineId)
      .subscribe((response: any) => {
        console.log(response);
        this.category_ = response.country.value;
        this.validDeliverTo();

      })
  }


  public handleItemsLoaderStageOne(): void {

    setTimeout(() => {

      if (
        this.serviceline_catalogue.length == 0 &&
        this.deliverin_catalogue.length == 0 &&
        this.deliverto_catalogue == 0
      ) {

        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: 'Error Conection',
            body: 'Some elements can not be loaded, solution working on the problem or you can try later'
          }, width: '420px'
        });

        dialogRef.afterClosed().subscribe(result => {

          this.getCatalogues();

        });

      }

    }, 777);

  }

  public category_catalogue: any = [];
  public async requestCatalogueCategory(id_selected: any): Promise<any> {

    const params: string = `?serviceLineId=${id_selected}`;

    this.category_catalogue = await this._services.getCatalogueFrom('GetCataegoryByServiceLineId', params);

    if (id_selected == 1) {
      this.gt = true;
      this.package_global.global_time = "0";
    } else {
      this.gt = false;
      this.package_global.global_time = "";
    }

  }

  public services_catalogue: any = [];
  public services_catalogue_pack: any = [];
  public async requestServicesCatalogue(id_selected: string, form_selected: string): Promise<any> {

    const params: string = `?serviceCategoryId=${id_selected}`;

    switch (form_selected) {

      case 'stand':
        this.services_catalogue = await this._services.getCatalogueFrom('GetServiceByCategoryId', params);
        break;

      case 'pack':
        this.services_catalogue_pack = await this._services.getCatalogueFrom('GetServiceByCategoryId', params);
        break;

    }

  }
  public disabledNewService = false;
  public service_order: ServiceOrderModel = new ServiceOrderModel();
  public work_order: WorkOrder = new WorkOrder();
  public sendServiceRecordData(): void {
    this.loader.showLoader();
    this.disabledNewService = true;
    const validations: any = {
      main: this.mainDataValidation(),
      bundles: this.bundlesMainValidation(),
      one_service: this.atleast_one_service
    }

    this.work_order.createdBy = this.user.id;
    if(this.show_standalone){
      if(this.standAloneFormValidator()){}else{
        this.disabledEditService = false;
        this.loader.hideLoader();
        return
      }
    }
    if (validations.main && validations.bundles && validations.one_service && this.show_bform_errors) {
      console.log(this.work_order);
      this._services.service_general_post_with_url('ServiceOrder/CreateOrder', this.work_order)
        .subscribe((response: any) => {
          if (response.success) {
            this.loader.hideLoader();
            //this.hideModal();
            this.showGeneralMessageDialog('Work Order created', 'Work Order has been created successfully');
            this.dialogRef.close();
            this.router.navigateByUrl('editServiceRecord/' + response.result.serviceRecordId);
            this.disabledNewService = false;
          }
        }, (error: any) => {
          console.error('Error (ServiceOrder/CreateOrder) => ', error);
          this.loader.hideLoader();
        });

    }else{
      this.disabledNewService = false;
      this.loader.hideLoader();
    }

  }
  public disabledEditService = false;

  public editServiceRecordData(): void {
    this.loader.showLoader();
    this.disabledEditService = true;
    const validations: any = {
      main: this.mainDataValidation(),
      bundles: this.bundlesMainValidation(),
      one_service: this.atleast_one_service
    }

    this.work_order.standaloneServiceWorkOrders.forEach(E => {
      E.projectedFee = E.projectedFee.toString();
    });

    let currency;
    this.work_order.standaloneServiceWorkOrders.forEach(E => {
      currency = E.projectedFee.split('$');
      if (currency.length == 1) {
        E.projectedFee = currency[0];
      } else if (currency.length == 2) {
        E.projectedFee = currency[1];
      }
      E.projectedFee = E.projectedFee.toString();
      debugger
    });
    this.work_order.bundledServicesWorkOrders.forEach(E => {
      currency = E.projectedFee.split('$');
      if (currency.length == 1) {
        E.projectedFee = currency[0];
      } else if (currency.length == 2) {
        E.projectedFee = currency[1];
      }
      E.projectedFee = E.projectedFee.toString();
    });

    console.log('Data Work order sent ====> ', this.work_order);
    debugger
    if(this.show_standalone){
      if(this.standAloneFormValidator()){}else{
        this.disabledEditService = false;
        this.loader.hideLoader();
        return
      }
    }
    if (validations.main && validations.bundles && validations.one_service && this.show_bform_errors) {
      this._services.service_general_put('ServiceOrder/UpdateOrder', this.work_order)
        .subscribe((response: any) => {
          if (response.success) {
            this.loader.hideLoader();
            //this.hideModal();
            this.showGeneralMessageDialog('Work Order edited', 'Work Order has been edited successfully');
            this.dialogRef.close();
            this.disabledEditService = false;
          }
        }, (error: any) => {

          console.error('Error (UpdateOrder)', error);
          this.loader.hideLoader();

        });

    }else{
      this.disabledEditService = false;
      this.loader.hideLoader();
    }

  }

  public servicesSelectedNSR(): void {

    if (this.mainDataValidation()) {

      if (this.service_order.serviceOrderServices.length != 0) {

        this.dialogRef.close(this.service_order);

      } else {

        this.showGeneralMessageDialog(
          'Work Orders',
          'You must create one Work Order to continue'
        );

      }

    }

  }

  public service_stanalone: SOrderServicesModel = new SOrderServicesModel();
  public service_package: SOrderServicesModel = new SOrderServicesModel(2);
  public package_global: PackageGeneralData = new PackageGeneralData();

  public standalone_work: StandaloneServiceWorkOrders = new StandaloneServiceWorkOrders();

  public addServiceToOrder(kind: string): void {
    switch (kind) {
      case 'alone':
        // validacion de campos standalone
        if (this.standAloneFormValidator()) {
          this.standalone_work.serviceTypeId = 1;
          // asignar el statusId como pending to accept
          this.standalone_work.statusId = 1;
          // standalone
          for (let i = 0; i < this.catalogService.length; i++) {
            const element = this.catalogService[i];
            if (element.id == this.standalone_work.serviceId) {
              this.standalone_work.categoryId = element.categoryId
            }
          }
          //if( this.is_new_sr ) {
          this.standalone_work.createdBy = this.data.id_user;
          this.standalone_work.createdDate = new Date();
          //}
          this.standalone_work.updateBy = this.data.id_user;

          this.work_order.standaloneServiceWorkOrders.push(this.standalone_work);

          this.standalone_work = new StandaloneServiceWorkOrders();
          this.showStandAlone();
          this.setDeliverToFixed();
          this.createWOTableContent();
          this.initSummaryTable();
          this.workingTableData();
          /*
          this.service_order.serviceOrderServices.push( this.service_stanalone );
          this.service_stanalone = new SOrderServicesModel();
          */
         this.disable = true;
        }
        break;
      case 'pack':
        if (this.packageFormValidator()) {
          // bundle
          for (let i = 0; i < this.catalogService.length; i++) {
            const element = this.catalogService[i];
            if (element.id == this.service_bundle.serviceId) {
              this.standalone_work.categoryId = element.categoryId
            }
          }
          this.service_package.projectedFee = this.package_global.fee;
          this.service_package.globalTime = Number(this.package_global.global_time);
          this.service_order.serviceOrderServices.push(this.service_package);
          this.service_package = new SOrderServicesModel(2);
          this.setDeliverToFixed();
        }
        break;
    }
    this.createSOTableContent();
  }

  public addNewBundle(): void {

    const new_bundle: BundledServicesWorkOrders = new BundledServicesWorkOrders();

    this.work_order.bundledServicesWorkOrders.push(new_bundle);

  }

  deleteBundle(i){
    this.work_order.bundledServicesWorkOrders.splice(i,1);
    this.show_bform_errors = true;
    this.createTablesForBundles();
  }

  public id_category: string;
  public addServiceToBundle(bundle_in: BundledServicesWorkOrders): void {

    if (this.bundleServiceComplete()) {

      //if( this.is_new_sr ) {

      this.service_bundle.createdBy = this.data.id_user;

      //}
      console.log("SERVICE BUNDLE");

      this.catalogServiceBundle.forEach(element => {
        if (element.id == this.service_bundle.serviceId) {
          this.service_bundle.categoryId = element.categoryId;
        }
      });

      this.service_bundle.updateBy = this.data.id_user;
      this.service_bundle.serviceTypeId = this.work_order.serviceLineId;
      this.service_bundle.updatedDate = new Date();
      this.service_bundle.bundledServiceOrderId = bundle_in.id;
      console.log('data bundle', this.service_bundle);
      bundle_in.bundledServices.push(this.service_bundle);

      this.service_bundle = new BundledServices();

      this.showPackagesServices();

      this.createTablesForBundles();

      this.initSummaryTable();

    }

  }

  public tables_for_bundles: any = [];
  public createTablesForBundles(): void {

    this.tables_for_bundles = [];

    this.work_order.bundledServicesWorkOrders.forEach((bundle: BundledServicesWorkOrders) => {

      //if( this.is_new_sr ) {

      bundle.createdBy = this.data.id_user;
      bundle.createdDate = new Date();

      //}

      bundle.updateBy = this.data.id_user;
      bundle.updatedDate = new Date();

      bundle.bundledServices.forEach((bundle: any) => {

        bundle.deliverToText = this.getValueFromCatalogue(this.deliverto_catalogue, bundle.deliveredTo, 'name');
        bundle.deliverInText = this.getValueFromCatalogue(this.deliverin_catalogue, bundle.deliveringIn, 'serviceType');
        //bundle.ser = this.getValueFromCatalogue(this.category_catalogue, bundle.categoryId, 'category');

      });

      this.tables_for_bundles.push(new MatTableDataSource(bundle.bundledServices));
      console.log('table bundle', this.tables_for_bundles);

    });

  }

  public show_bform_errors: boolean = true;
  public bundleServiceComplete(): boolean {

    let result: boolean = true;

    this.show_bform_errors = true;
    if (this.service_bundle.deliveredTo == '') result = false;
    if (this.service_bundle.deliveringIn == '') result = false;
    debugger
    // if( this.service_bundle.categoryId == '' ) result = false;
    if (this.service_bundle.serviceId == '') result = false;
    if (this.service_bundle.autho == '') result = false;
    if (this.service_bundle.location == '') result = false;

    return result;

  }

  public table_standalone: any = null;
  public table_packages: any = null;
  public table_standalone_content: any = null;
  public table_package_content: any = null;
  public createSOTableContent(): void {

    this.table_standalone = this.service_order.serviceOrderServices.filter((service: any) => {

      if (service.serviceTypeId == 1) {

        service.deliverToText = this.getValueFromCatalogue(this.deliverto_catalogue, service.deliveredTo, 'name');
        service.deliverInText = this.getValueFromCatalogue(this.deliverin_catalogue, service.deliveringIn, 'serviceType');
        //service.ser = this.getValueFromCatalogue(this.category_catalogue, service.categoryId, 'category');
        /*service.serviceIdText = await this.getValueFromCatalogueAfter({
            url: 'Catalogue/GetCataegoryByServiceLineId?id=' + this.service_order.serviceLineId,
            match: service.serviceId,
            field_to_find: 'supplierCompany',
            id_index: 'id'
        });*/

        return service;

      }

    });

    this.table_packages = this.service_order.serviceOrderServices.filter((service: any) => {

      if (service.serviceTypeId == 2) {

        service.deliverToText = this.getValueFromCatalogue(this.deliverto_catalogue, service.deliveredTo, 'name');
        service.deliverInText = this.getValueFromCatalogue(this.deliverin_catalogue, service.deliveringIn, 'serviceType');
        service.ser = this.getValueFromCatalogue(this.category_catalogue, service.categoryId, 'category');

        return service;

      }

    });

    this.table_standalone_content = new MatTableDataSource(this.table_standalone);
    this.table_package_content = new MatTableDataSource(this.table_packages);

    this.table_standalone_content.paginator = this.paginator;
    this.table_package_content.paginator = this.paginator;

  }

  public wo_standalone_table: any = [];
  public createWOTableContent(): void {
    this.work_order.standaloneServiceWorkOrders.forEach((work: any) => {
      work.deliverToText = this.getValueFromCatalogue(this.deliverto_catalogue, work.deliveredTo, 'name');
      work.deliverInText = this.getValueFromCatalogue(this.deliverin_catalogue, work.deliveringIn, 'serviceType');
      work.ser = this.getValueFromCatalogue(this.category_catalogue, work.categoryId, 'category');
    });
    this.workingTableData();
    console.log('this.work_order.standaloneServiceWorkOrders ===> ', this.work_order.standaloneServiceWorkOrders);
    this.wo_standalone_table = new MatTableDataSource(this.work_order.standaloneServiceWorkOrders);
    this.wo_standalone_table.paginator = this.paginator;
  }

  public deleteThisService(id_temp: number, service: any): void {
    if (this.is_editing) {
      if (service.local) {
        this.work_order.standaloneServiceWorkOrders.splice(id_temp, 1);
        this.createWOTableContent();
      }
      else {
        const params: string = `?id=${service.id}`;
        this.loader.showLoader();
        this._services.service_general_delete(`ServiceOrder/DeleteStandaloneServiceWorkOrder${params}`)
          .subscribe((response: any) => {
            if (!response.success) {
              const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: 'Can not delete',
                  body: 'Service can not be deleted, please try again.'
                }
              });
              dialogRef.afterClosed().subscribe(result => {
              });
            } else {
              this.work_order.standaloneServiceWorkOrders.splice(id_temp, 1);
              this.createWOTableContent();
              // al eliminar standalone se debe comprobar si no tiene standalone y bundle para que se elimine el wo
              if (response.success) {
                // this.deleteWo();
              }
            }
            this.loader.hideLoader();

          }, (error: any) => {

            console.error('Error (DeleteStandaloneServiceWorkOrder) => ', error);
            this.loader.hideLoader();

          });

      }
    }
    else {
      this.work_order.standaloneServiceWorkOrders.splice(id_temp, 1);
      this.createWOTableContent();
    }
    this.initSummaryTable();
  }

  // metodo que elimina wo si no service standalone y services  bundle
  deleteWo() {
    let bundleEmpty = [];
    if (this.work_order.standaloneServiceWorkOrders.length == 0) {
      for (let i = 0; i < this.work_order.bundledServicesWorkOrders.length; i++) {
        const element = this.work_order.bundledServicesWorkOrders[i];
        if (element.bundledServices.length == 0) {
          // por cada bundleservices vacio se hace un push
          bundleEmpty.push({ data: 0 });
        }
      }
      console.log('bundleEmpty', bundleEmpty);
      console.log('bundledServicesWorkOrders.length', this.work_order.bundledServicesWorkOrders.length);
      // si el numero de bundles es igual a el numero de los push que estan vacios entonces se hace la eliminacion de wo
      if (bundleEmpty != undefined) {
        if (this.work_order.bundledServicesWorkOrders.length == bundleEmpty.length) {
          this._services.service_general_delete(`ServiceOrder/DeleteOrder?id=${this.work_order.id}`).subscribe((data) => {
            console.log('respuesta de eliminacion', data);
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: `Deleted Work Order`
                },
                width: "350px"
              });
              this.hideModal();
            }
          }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Warning",
                body: `The work order is in use.`
              },
              width: "350px"
            });
            this.hideModal();
          })
        }
      }
    }
    else {
      console.log('hay standalone', this.work_order.standaloneServiceWorkOrders.length);
    }
  }


  public deleteThisServiceConfirmation(id_temp: number, service: any): void {

    const dialogRef = this._dialog.open(DialogGeneralConfirmation, {
      data: {
        header: 'Delete Standalone',
        body: 'Are you sure to delete this standalone?'
      },
      width: '420px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.can_delete) {

        this.deleteThisService(id_temp, service);

      }

    });

  }

  public workingTableData(): void {
    let temp_id: number = 0;
    this.work_order.standaloneServiceWorkOrders.forEach((service: any) => {
      service.temp_id = temp_id;
      temp_id += 1;
    });
  }

  public deleteThisBundle(bundle: any, service: any, index: number): void {
    if (service.local) {
      bundle.bundledServices.splice(index, 1);
      this.createTablesForBundles();
    }
    else {
      const params: string = `?id=${service.id}`;
      this.loader.showLoader();
      this._services.service_general_delete(`ServiceOrder/DeleteBundledService${params}`)
        .subscribe((response: any) => {
          if (!response.success) {
            const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: 'Can not delete',
                body: 'Service can not be deleted, please try again.'
              }
            });
            dialogRef.afterClosed().subscribe(result => {
            });
          } else {
            bundle.bundledServices.splice(index, 1);
            this.createTablesForBundles();
            // al eliminar standalone se debe comprobar si no tiene standalone y bundle para que se elimine el wo
            if (response.success) {
              // this.deleteWo();
            }
          }
          this.loader.hideLoader();
        }, (error: any) => {
          console.error('Error (DeleteBundledService) => ', error);
        });
    }
    this.initSummaryTable();
  }

  // se desabilito la funcion de borrar wo

  public deleteThisBundleConfirmation(bundle: any, service: any, index: number): void {
    const dialogRef = this._dialog.open(DialogGeneralConfirmation, {
      data: {
        header: 'Delete Bundle',
        body: 'Are you sure to delete this bundle?'
      }, width: '420px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.can_delete) {
        this.deleteThisBundle(bundle, service, index);
      }
    });
  }

  public main_data_form: any = {
    no_date: false,
    no_line: false
  }
  public mainDataValidation(): boolean {

    let result: boolean = true;

    this.work_order.createdDate == '' ?
      this.main_data_form.no_date = true : this.main_data_form.no_date = false;

    this.work_order.serviceLineId == '' ?
      this.main_data_form.no_line = true : this.main_data_form.no_line = false;

    for (let item in this.main_data_form) {

      if (this.main_data_form[item]) result = false;

    }

    return result;

  }

  public show_bundle_error: boolean = false;
  public bundlesMainValidation(): boolean {

    let result: boolean = true;

    this.show_bundle_error = true;

    this.work_order.bundledServicesWorkOrders.forEach((bundle: BundledServicesWorkOrders) => {

      if (bundle.totalTime == '') result = false;
      if (bundle.projectedFee == '') result = false;
debugger;
    });

    return result;

  }

  public salon_form_valdator: any = {
    no_deto: false,
    no_dein: false,
    no_cate: false,
    no_serv: false,
    no_prof: false,
    no_auto: false,
    no_loca: false
  }
  public standAloneFormValidator(): boolean {
    let result: boolean = true;
    this.standalone_work.deliveredTo == '' ?
      this.salon_form_valdator.no_deto = true : this.salon_form_valdator.no_deto = false;
    this.standalone_work.deliveringIn == '' ?
      this.salon_form_valdator.no_dein = true : this.salon_form_valdator.no_dein = false;
    this.standalone_work.serviceId == '' ?
      this.salon_form_valdator.no_serv = true : this.salon_form_valdator.no_serv = false;

    this.standalone_work.projectedFee == '' ?
      this.salon_form_valdator.no_prof = true : this.salon_form_valdator.no_prof = false;

    this.standalone_work.autho == '' ?
      this.salon_form_valdator.no_auto = true : this.salon_form_valdator.no_auto = false;

    this.standalone_work.location == '' ?
      this.salon_form_valdator.no_loca = true : this.salon_form_valdator.no_loca = false;

    for (let field in this.salon_form_valdator) {
      if (this.salon_form_valdator[field]) result = false;
    }
    return result;
  }

  public package_general_form: any = {
    no_time: false,
    no_fee: false,
    no_deto: false,
    no_dein: false,
    no_serv: false,
    no_cate: false,
    no_date: false,
    no_loca: false
  }
  public packageFormValidator(): boolean {

    let result: boolean = true;

    this.package_global.global_time == '' ?
      this.package_general_form.no_time = true : this.package_general_form.no_time = false;

    this.package_global.fee == null ?
      this.package_general_form.no_fee = true : this.package_general_form.no_fee = false;

    this.service_package.deliveredTo == '' ?
      this.package_general_form.no_deto = true : this.package_general_form.no_deto = false;

    this.service_package.deliveringIn == '' ?
      this.package_general_form.no_dein = true : this.package_general_form.no_dein = false;

    this.service_package.categoryId == '' ?
      this.package_general_form.no_cate = true : this.package_general_form.no_cate = false;

    this.service_package.serviceId == '' ?
      this.package_general_form.no_serv = true : this.package_general_form.no_serv = false;

    this.service_package.authoTime == '' ?
      this.package_general_form.no_date = true : this.package_general_form.no_date = false;

    this.service_package.location == '' ?
      this.package_general_form.no_loca = true : this.package_general_form.no_loca = false;

    for (let item in this.package_general_form) {

      if (this.package_general_form[item]) result = false;

    }

    return result;

  }

  public removeErrorLabel(input_value: any, object_data: any): void {
    if (input_value == "" || input_value == null) {
      object_data.handler[object_data.field] = true;
    } else {
      object_data.handler[object_data.field] = false;
    }
  }

  public filterDate(date_in: any): string {
    return `${date_in.getFullYear()}/${date_in.getMonth() + 1}/${date_in.getDate()}`;
  }

  public getValueFromCatalogue(catalogue: any, id_to_find: any, field_to_find: string): string {

    let result: string = '';

    catalogue.forEach((item: any) => {

      if (item.id == id_to_find || item.dependentId == id_to_find) {

        result = item[field_to_find];

      }

    });

    return result;

  }

  public getValueFromCatalogueAfter(settings: any): string {

    let result: string = '';

    const get_result: any = new Promise((resolve: any) => {

      this._services.service_general_get(settings.url)
        .subscribe((response: any) => {

          if (response.success) {

            response.result.forEach((item: any) => {

              if (item[settings.id_index] == settings.match) {

                result = item[settings.field_to_find];

                resolve(result);

              }

            });

          }

        }, (error: any) => {

          console.error('Error (getValueFromCatalogueAfter)', error);

        });

    })

    return get_result.then((result: string) => {

      return result;

    });

  }

  public updateSOCoordination(element: any): void {
    if (this.is_editing) {
      if (element.coordination) {
        element.coordination = false;
      } else {
        element.coordination = true;
        element.authoTime = 0;
      }
    }
  }

  public showGeneralMessageDialog(title: string = '', body: string = ''): void {

    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: title,
        body: body
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  public getTodayDay(): string {

    const date = {
      date: function () { return new Date() },
      day: function () { return this.date().getDate() },
      month: function () { return this.date().getMonth() + 1 },
      year: function () { return this.date().getFullYear() },
      today: function () {
        return `${this.month()}/${this.day()}/${this.year()}`
      }
    }

    return date.today();

  }

  public set_my_self: boolean = false;
  public setDeliverToFixed(): void {
    console.log('this.work_order.serviceLineId => ', this.work_order.serviceLineId);
    debugger;
    if (this.work_order.serviceLineId == '2') {
      this.set_my_self = true;
      this.deliverto_catalogue.forEach((dependent: any) => {
        if (dependent.relationship) {
          this.standalone_work.deliveredTo = dependent.dependentId;
          this.service_bundle.deliveredTo = dependent.dependentId;
        }
      });
    } else {
      this.set_my_self = false;
      this.standalone_work.coordination = true;
      this.standalone_work.deliveredTo = '';
      this.service_bundle.deliveredTo = '';
    }
  }

  public summary_total: string[] = ['cam_0'];
  public summary_fee: string[] = ['cam_0', 'cam_1', 'cam_2'];
  public summary_table_data: any = undefined;
  public atleast_one_service: boolean = false;
  public initSummaryTable(): void {

    const stand_alone_ser: any = this.work_order.standaloneServiceWorkOrders,
      bundles_ser: any = this.work_order.bundledServicesWorkOrders;

    let stand_alone_total: number = 0,
      bundles_total: number = 0,
      bundle_ser_count: number = 0;

    stand_alone_ser.forEach((service: any) => {

      let cast_number: number = Number(service.projectedFee);

      stand_alone_total += cast_number;

    });

    bundles_ser.forEach((bundle: any) => {

      let cast_number: number = Number(bundle.projectedFee);

      bundles_total += cast_number;

      bundle_ser_count += bundle.bundledServices.length;

    });

    const summary_data: any = [{
      total_services: stand_alone_ser.length + bundle_ser_count,
      standalone: stand_alone_total,
      bundled: bundles_total,
      global_fee: stand_alone_total + bundles_total
    }];

    if (summary_data[0].total_services == 0 || summary_data[0].total_services == undefined || summary_data[0].total_services == null) {

      this.atleast_one_service = false;

    } else if (summary_data[0].total_services > 0) {

      this.atleast_one_service = true;

    }

    this.summary_table_data = new MatTableDataSource(summary_data);

  }

}

class ServiceOrderModel {
  id: number = 0;
  numberServerOrder: string = '';
  autho: string = '';
  serviceLineId: string = '';
  serviceRecordId: string = '';
  serviceOrderServices: any = [];
}

class SOrderServicesModel {
  id: number = 0;
  deliveredTo: string = '';
  deliveringIn: string = '';
  serviceId: string = '';
  serviceTypeId: number = 0;
  categoryId: string = '';
  location: string = '';
  acceptance: Date;
  coordination: boolean = false;
  authoTime: string = '';
  globalTime: number = 0;
  projectedFee: number = null;
  serviceOrderId: number = 0;
  statusId: number;
  createdBy: number = 0;
  createdDate: string = '';
  updateBy: number = 0;
  updatedDate: string = '';
  constructor(service_type: number = 1) {
    this.serviceTypeId = service_type;
  }
}

class PackageGeneralData {
  global_time: string = '';
  fee: number = null;
}

class DeliverToCatalogueModel {
  dependentId: number = 0;
  name: string = '';
  relationship: string = '';
  relationshipId: number = 0;
}

class WorkOrder {
  id: number = 0;
  numberWorkOrder: string = '';
  creationDate: Date = null;
  serviceLineId: any = '';
  serviceRecordId: number = 0;
  createdBy: number = 0;
  createdDate: any = '';
  updateBy: number = 0;
  updatedDate: Date = new Date();
  standaloneServiceWorkOrders: StandaloneServiceWorkOrders[] = [];
  bundledServicesWorkOrders: BundledServicesWorkOrders[] = [];
}

class StandaloneServiceWorkOrders {
  id: number = 0;
  serviceNumber: string = '';
  workOrderId: number = 0;
  deliveredTo: string = '';
  deliveringIn: string = '';
  serviceId: string = '';
  serviceTypeId: number = 0;
  location: string = '';
  categoryId: string = '';
  acceptance: Date;
  coordination: boolean = false;
  authoTime: string = '0';
  autho: any = new Date();
  projectedFee: string = '';
  statusId: number;
  createdBy: number = 0;
  createdDate: Date = null;
  updateBy: string = '';
  updatedDate: Date = new Date();
  workOrderServiceId: number = 0;
  workOrderService: any = { id: 0 }
  local: boolean = true;
}

class BundledServicesWorkOrders {
  id: number = 0;
  workOrderId: number = 0;
  totalTime: string = '';
  projectedFee: string = '';
  package: boolean = false;
  createdBy: number = 0;
  createdDate: Date = null;
  updateBy: number = 0;
  updatedDate: Date = null;
  bundledServices: BundledServices[] = [];
}

class BundledServices {
  id: number = 0;
  serviceNumber: string = '';
  bundledServiceOrderId: number = 0;
  deliveredTo: string = '';
  deliveringIn: string = '';
  serviceId: string = '';
  serviceTypeId: string = '';
  categoryId: string = '';
  location: string = '';
  autho: any = new Date();
  acceptance: Date;
  statusId: number;
  createdBy: number = 0;
  createdDate: string = '';
  updateBy: number = 0;
  updatedDate: Date = null;
  workServicesId: number = 0;
  workServices: any = { id: 0 }
  local: boolean = true;
}
