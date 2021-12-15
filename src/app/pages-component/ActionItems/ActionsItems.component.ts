import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router } from '@angular/router';
import { DialogAssignTask } from '../dialog/dialog-assign-task/assignTask.component';
import { DialogEditTask } from '../dialog/dialog-edit-task/editTask.component';

@Component({
    selector: 'action-items-component',
    templateUrl: './ActionsItems.component.html',
    styleUrls: ['./ActionsItems.component.scss']
})
export class ActionItemsComponent implements OnInit {

  constructor(
    public _router: Router,
    public _dialog: MatDialog,
    public _services: ServiceGeneralService
  ) {}

  @ViewChild('sortAction') sortAction: MatSort;
  @ViewChild('pagAction') pagAction: MatPaginator;

  filteruno: boolean = false;
  filter_list: any = {};
  public __imagesPath__:string = this._services.url_images;
	public __loader__:LoaderComponent = new LoaderComponent();
	public __userlog__:any = JSON.parse( localStorage.getItem('userData') );
  public catalogServiceLine: any =[];
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
  //*********************************************//
  ngOnInit() {
    this.consultaPermisos();
    this.initPageBehavior();
  }

  public initPageBehavior():void {
      this.requestCatalogues();
      this.requestDataListActionItems();
  }

  /***********************************************************************/
  /***********************************************************************/
  /************ Funciones Lista Action Items *****************/
  /***********************************************************************/
  public pending_cards_list:any[] = [];
  public progress_cards_list:any[] = [];
  public done_cards_list:any[] = [];
  public requestDataListActionItems( url_params:string = '' ):void {
    this.__loader__.showLoader();
    console.log('URL => ', `Task/GetActionItems/${ this.__userlog__.id + url_params }`);
    this._services.service_general_get(`Task/GetActionItems/${ this.__userlog__.id + url_params }`)
    .subscribe( (response:any) => {
        console.log('Aqui cainal ====> ', response);
      if (response.success) {
        this.pending_cards_list = response.result.value.pending;
        this.progress_cards_list = response.result.value.inProgress;
        this.done_cards_list = response.result.value.done;
        this.configureCardsDataToView();
        }
        this.__loader__.hideLoader();
    }, (error:any) => {
        console.error('Error (Task/GetActionItems) => ', error);
        this.__loader__.hideLoader();
    });
  }

  public configureCardsDataToView():void {

      this.pending_cards_list.forEach( (card:any) => { card.active = true });
      this.progress_cards_list.forEach( (card:any) => { card.active = true });
      this.done_cards_list.forEach( (card:any) => { card.active = true });

  }


  // public filter_list:ListFilter = new ListFilter();
  public filterListRequest():void {
    let url_params:string = '',
    range_params:string = '';
    for( let field in this.filter_list ) {
      if( this.filter_list[field] != undefined && this.filter_list[field] != '' && this.filter_list[field] != null &&
          field != 'rangeDate1' && field != 'rangeDate2' ) {

          url_params += `&${ field }=${ this.filter_list[field] }`;

      }
      if( field == 'rangeDate1' || field == 'rangeDate2' ) {
        const date_1:string = this.getDateFormatToUrl( this.filter_list['rangeDate1'] ),
            date_2:string = this.getDateFormatToUrl( this.filter_list['rangeDate2'] );
        if( date_1 != '' && date_2 != '' ) {
            range_params = `&rangeDate1=${ date_1 }&rangeDate2=${ date_2 }`;
        }
      }
    }
    if( url_params != '' || range_params != '' ) {
      this.requestDataListActionItems( '?' + url_params.substring(1) + range_params );
    }
  }

  public resetActionItemsFiltersList():void {
    this.list_filter = new ListFilterText();
    this.filter_list = new ListFilter();
    this.filter_list = {};
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
      this.requestDataListActionItems();
  }

    public list_filter:ListFilterText = new ListFilterText();
    public filterListCardsBy():void {

        this.pending_cards_list.forEach( (card:any) => {

            let from_data:string = card.from == null ? '' : card.from,
                to_data:string = card.to == null ? '' : card.to,
                sr_data:string = card.numberServiceRecord == null ? '' : card.numberServiceRecord,
                task_data:string = card.taskDescription == null ? '' : card.taskDescription;

            if(
                from_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                to_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                sr_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                task_data.toLowerCase().includes( this.list_filter.text.toLowerCase() )
             ) card.active = true;
             else card.active = false;

        });

        this.progress_cards_list.forEach( (card:any) => {

            let from_data:string = card.from == null ? '' : card.from,
                to_data:string = card.to == null ? '' : card.to,
                sr_data:string = card.numberServiceRecord == null ? '' : card.numberServiceRecord,
                task_data:string = card.taskDescription == null ? '' : card.taskDescription;

            if(
                from_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                to_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                sr_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                task_data.toLowerCase().includes( this.list_filter.text.toLowerCase() )
             ) card.active = true;
             else card.active = false;

        });

        this.done_cards_list.forEach( (card:any) => {

            let from_data:string = card.from == null ? '' : card.from,
                to_data:string = card.to == null ? '' : card.to,
                sr_data:string = card.numberServiceRecord == null ? '' : card.numberServiceRecord,
                task_data:string = card.taskDescription == null ? '' : card.taskDescription;

            if(
                from_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                to_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                sr_data.toLowerCase().includes( this.list_filter.text.toLowerCase() ) ||
                task_data.toLowerCase().includes( this.list_filter.text.toLowerCase() )
             ) card.active = true;
             else card.active = false;

        });

    }

    /***********************************************************************/
    /***********************************************************************/
    /************ Funciones Tabla Action Items *****************/
    /***********************************************************************/
    public actions_items_table_data:any = undefined;
    public actions_items_table_cols:string[] = ['col_1','col_2','col_3','col_4','col_5','col_6','col_7','col_8'];
    public requestDataTableActionItems( url_params:string = '' ):void {
      this.__loader__.showLoader();

      this._services.service_general_get(`Task/GetAllActions/${ this.__userlog__.id + url_params }`)
      .subscribe( (response:any) => {

      if( response.success ) {
        this.actions_items_table_data = new MatTableDataSource( response.result.value );
        this.actions_items_table_data.paginator = this.pagAction;
        this.actions_items_table_data.sort = this.sortAction;
      }
          this.__loader__.hideLoader();
      }, (error:any) => {
          console.error('Error (GetAllActions) => ', error);
          this.__loader__.hideLoader();
      });

    }

    public table_filters:TableFilterModel = new TableFilterModel();
    public filterTableRequest():void {

        let filter_params:string = '',
            range_params:string = '';

        for( let field in this.table_filters ) {

            if(
                this.table_filters[field] != '' && this.table_filters[field] != null
                && this.table_filters[field] != undefined && field != 'rangeDate1'
                && field != 'rangeDate2'  ) {

                filter_params += `&${ field }=${ this.table_filters[field] }`;

            }

            if( field == 'rangeDate1' || field == 'rangeDate2' ) {

                const date_1:string = this.getDateFormatToUrl( this.table_filters['rangeDate1'] ),
                    date_2:string = this.getDateFormatToUrl( this.table_filters['rangeDate2'] );

                if( date_1 != '' && date_2 != '' ) {

                    range_params = `&rangeDate1=${ date_1 }&rangeDate2=${ date_2 }`;

                }

            }

        }

        if( filter_params != '' || range_params != '' ) {

            this.requestDataTableActionItems( '?' + filter_params.substring(1) + range_params );

        }

    }

    public resetActionItemsFiltersTable():void {

        const filter_text_container:any = document.getElementById('table_text_filter');

        filter_text_container.value = '';

        this.table_filters = new TableFilterModel();

        this.requestDataTableActionItems();

    }

    public serchFilterTable( event:Event ):void {

        const filterValue = (event.target as HTMLInputElement).value;

		this.actions_items_table_data.filter = filterValue.trim().toLowerCase();

    }

    /***********************************************************************/
    /***********************************************************************/
    /************ Funciones generales *****************/
    /***********************************************************************/
    public show_cards_content:boolean = true;
    public toggleActionsItemsView():void {

        this.show_cards_content ?
            this.show_cards_content = false :
            this.show_cards_content = true;

  }
  public back():void {

    // this.show_cards_content ? this.show_cards_content = false :
    this.show_cards_content = false;

}

    public statusTask_catalogue:any = [];
    public tablesr_catalogue:any = [];
    public async requestCatalogues():Promise<void> {
      this.statusTask_catalogue = await this._services.getCatalogueFrom('GetEstatusTask');
      this.tablesr_catalogue = await this._services.getCatalogueFrom(`GetServiceRecord/${ this.__userlog__.id }`);
      this._services.service_general_get(`Catalogue/GetServiceLine`).subscribe((data => {
        if (data.success) {
          this.catalogServiceLine = data.result;
        }
      }));
    }

    public getDateFormatToUrl( date_in:any ):string {

        let result:string = '';

        if( date_in != '' && date_in != null && date_in != undefined ) {

            result = `${ date_in.getFullYear() }-${ date_in.getMonth() + 1 }-${ date_in.getDate() }`;

        }

        return result;

    }
  // crear
  public openDialogAddItemAction(): void {
    const dialog = this._dialog.open(DialogAssignTask, {
      data: {
        id_so: undefined
      },
      width: "95%"
    });
    dialog.afterClosed().subscribe(result => {
      // this.initPageBehavior();
      this.ngOnInit();
      this.requestDataTableActionItems();
    });
  }
  // editar
  public openDialogActionItemDetail( card:any ):void {
    const assing_task_dialog = this._dialog.open(DialogEditTask, {
      data: card,
      width: '95%'
    });
    assing_task_dialog.afterClosed().subscribe(result => {
      // this.initPageBehavior();
      this.ngOnInit();
      this.requestDataTableActionItems();

    });

}

  goBack() {
    window.history.back();
  }

}

class ListFilter {
    rangeDate1:string = '';
    rangeDate2:string = '';
    asignedToMeOrByMe:string = '';
    serviceLine: number = 0;
}

class ListFilterText {
    text:string = '';
}

class TableFilterModel {
    rangeDate1:string = '';
    rangeDate2:string = '';
    sr:string = '';
    status:string = '';
}
