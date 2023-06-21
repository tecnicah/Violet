import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogAddpaymentComponent } from '../dialog-addpayment/dialog-addpayment.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog-coordinators',
    templateUrl: './Coordinators.component.html',
    styleUrls: ['./Coordinators.component.scss']
  })
  export class DialogCoordinatorsComponent implements OnInit {

    data_coordinador:any;

    constructor(
      public dialogRef: MatDialogRef<DialogCoordinatorsComponent>,
      public _services: ServiceGeneralService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public _dialog: MatDialog, public _route:Router
  ) { }

  @ViewChild('sortcoord') sortcoord: MatSort;
  // @ViewChild(MatSort, {static: true}) sortcoord: MatSort;
  // @ViewChild(MatPaginator, { static: true }) pagdcoord: MatPaginator;
  @ViewChild(MatPaginator, {static: true})pagdcoord: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;

  // variables
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	// @ViewChild(MatSort) sort: MatSort;
  public filter: any = { office: '' };
  public filter_: any = { serviceLine: '' };
  public __loader__:LoaderComponent = new LoaderComponent();
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  maxall: number = 20;


  ngOnInit() { this.initPageBehavior(); }
    public initPageBehavior():void {
    this.requestCataloguesData();
    this.requestCoordinatorsTableData();
  }
  getPageSizeOptions() {
    if (this.coordinators_table_data?.paginator.length > this.maxall) {
      return [10, 20, this.coordinators_table_data?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }


  public coordinators_table_colums:string[] = ['col_1','col_2','col_3','col_4','col_5','col_6','col_7'];
  public coordinators_table_data:any = undefined;
  public requestCoordinatorsTableData( url_params:string = '' ):void {
      this.__loader__.showLoader();
      this._services.service_general_get(`MyDashboard/GetCoordinators/${ this.__userlog__.id + url_params }`)
        .subscribe( (response:any) => {
          console.log('Res => ', response);
          if( response.success ) {
              this.coordinators_table_data = new MatTableDataSource( response.map.value );
              this.coordinators_table_data.paginator = this.pagdcoord;
              this.coordinators_table_data.sort = this.sortcoord;
          }
          this.__loader__.hideLoader();
        }, (error:any) => {
            console.error('Error (MyDashboard/GetCoordinators) => ', error);
            this.__loader__.hideLoader();
        });
  }
  //*******************************************//

    public filter_data:FilterDataModel = new FilterDataModel();
  public updateTableRequest():void {

      let filter_params:string = '';

      for( let field in this.filter_data ) {

          if( this.filter_data[field] != '' ) {

              filter_params += `&${ field }=${ this.filter_data[field] }`;

          }

      }

      this.requestCoordinatorsTableData( '?' + filter_params.substring(1) );

  }

  public resetCoordinatorsFiltersTable(): void {
    this.filter = { office: '' };
    this.filter_ = { serviceLine: '' };
    this.filter_data = new FilterDataModel();
    this.requestCoordinatorsTableData();
  }

    public tableSerchFilter( event:Event ) {

        const filterValue = (event.target as HTMLInputElement).value;
        this.coordinators_table_data.filter = filterValue.trim().toLowerCase();

    }

    /************************************************************************/
    /************************************************************************/
    /************************************************************************/
    /***************    General Functions     *******************************/
    /************************************************************************/
    /************************************************************************/
    /************************************************************************/
    public country_catalogue:any = [];
    public city_catalogue:any[] = [];
    public serviceline_catalogue:any[] = [];
    public office_catalogue:any[] = [];
    public async requestCataloguesData():Promise<void> {

        this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
        this.serviceline_catalogue = await this._services.getCatalogueFrom(`GetServiceLine`);
        this.office_catalogue = await this._services.getCatalogueFrom('GetOffice');

    }

    public able_city_filter:boolean = false;
	public ableCityField():void {

		if( this.filter_data.country != '' ) {

			this.able_city_filter = true;

			this._services.service_general_get(`Catalogue/GetState?country=${ this.filter_data.country }`)
				.subscribe( (response:any) => {

					if( response.success ) {

						this.city_catalogue = response.result;

					}

				}, (error:any) => {

					console.error('Error ==> ', error);

				});

		} else {

			this.able_city_filter = false;

		}

	}

    public hideModal(): void {

        this.dialogRef.close();

    }

    data_coord(data){
      this.data_coordinador = data;
    }


    gotoProfile(id){
      this._dialog.closeAll();
      this._route.navigateByUrl("profilecoordinator/"+id);
    }
}

class FilterDataModel {
    country:string = '';
    city:string = '';
    serviceLine:string = '';
    office:string = '';
}
