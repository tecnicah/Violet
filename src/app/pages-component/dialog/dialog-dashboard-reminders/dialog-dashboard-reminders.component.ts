import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogDashboardAddRemindersComponent } from '../dialog-dashboard-add-reminders/dialog-dashboard-add-reminders.component';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-dashboard-reminders',
  templateUrl: './dialog-dashboard-reminders.component.html',
  styleUrls: ['./dialog-dashboard-reminders.component.css']
})
export class DialogDashboardRemindersComponent implements OnInit {

  public __loader__: LoaderComponent = new LoaderComponent();
  displayedColumns: string[] = ['ServiceRecord_', 'ServiceLine_', 'ServiceName_', 'Date_', 'Assignee_', 'Partner_', 'Client_', 'City_', 'Accion'];
  //displayedColumns: string[] = ['ServiceRecord', 'ServiceLine', 'ServiceName', 'Date', 'Assignee', 'Partner', 'Client', 'City'];

  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('DataFollow') DataFollow: MatPaginator;
  // @ViewChild(MatPaginator, { static: true }) dataFollow: MatPaginator;
  @ViewChild(MatPaginator, {static: true})dataFollow: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;


  filteruno: boolean = false;
  data_table: any;
  public range = new FormGroup({
    rangeDate1: new FormControl(),
    rangeDate2: new FormControl()
  });
  user:any;
  data_search:any = {};
  city_select = [];
  ca_service_record:any[]=[];
  serviceLine:any[]=[]
  wo_ =[];

  constructor(public _dialog: MatDialog, public _services: ServiceGeneralService) { }
  public filterCity: any = { city: '' };
  public filterServiceRecord: any = { numberServiceRecord: '', assigneeName: '' };
  public filterWorkOrder: any = { numberWorkOrder: '' };
  maxall: number = 20;

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

  ngOnInit(): void {
    this.consultaPermisos();
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    this._services.service_general_get('MyDashboard/GetReminders/'+this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data.map.value);
        this.data_table =  new MatTableDataSource(data.map.value);
        this.data_table.paginator = this.dataFollow;
        this.data_table.sort = this.sort;

        this._services.service_general_get('Catalogue/GetServiceRecord/'+this.user.id).subscribe((data => {
          if (data.success) {
            console.log(data.result);
            this.ca_service_record = data.result;
            this.__loader__.hideLoader();
          }
        }));
      }
      }), (err)=>{
        console.log("Error al consultar reminder: ", err);
        this._services.service_general_get('Catalogue/GetServiceRecord/'+this.user.id).subscribe((data => {
          if (data.success) {
            console.log(data.result);
            this.ca_service_record = data.result;
            this.__loader__.hideLoader();
          }
        }));
        this.__loader__.hideLoader();
      });
      this.catalogos();
  }
  //********************************************************************************************************//
  async catalogos(){
    let city = [];
    let city_final = [];
    this.serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    let country = await this._services.getCatalogueFrom('GetCountry');
    for (let i = 0; i < country.length; i++) {
      this._services.service_general_get('Catalogue/GetState?country=' + country[i].id).subscribe((data => {
        if (data.success) {
            city = data.result;
            for (let j = 0; j < city.length; j++) {
              city_final.push(city[j]);
            }
        }
      }))
    }
    console.log("CIUDADES DINALES: ", city_final);
    this.city_select = city_final;

  }
  //********************************************************************************************************//
  //FILTRO FECHA//

  public filteringServiceRecordTable(): void {
    let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.rangeDate1 != null) this.data_search.rangeDate1 = this.filterDate(this.range.value.rangeDate1);
    if (this.range.value.rangeDate2 != null) this.data_search.rangeDate2 = this.filterDate(this.range.value.rangeDate2);
    for (let item in this.data_search) {
      if (this.data_search[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_search[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if(this.range.value.rangeDate1 != null && this.range.value.rangeDate2 != null){
      this.getServiceRecordTableData(params);
    }
  }
  //********************************************************************************************************//
  public filterDate(date_in: any): string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }
  //********************************************************************************************************//
  //CONSULTA INFORMACION POR FILTRO//
  public getServiceRecordTableData(params: string = ''): void {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    this._services.service_general_get('MyDashboard/GetReminders/' + this.user.id + params_in).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.map.value;
        console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
        this.data_table = new MatTableDataSource(data.map.value);
        this.data_table.paginator = this.dataFollow;
        this.data_table.sort = this.sort;
        this.__loader__.hideLoader();
      }
    });
  }
   // paginador
  getPageSizeOptions(): number[] {

    if (this.data_table?.paginator.length > this.maxall)
    return [10, 20,  this.data_table?.paginator.length];
    else
     return [10, 20];
  }
  //********************************************************************************************************//
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
  //********************************************************************************************************//
  getWO(){
    this.__loader__.showLoader();
    this._services.service_general_get('Catalogue/GetWorkOrderByServiceLine?sr=' + this.data_search.sr +  '&sl=' + this.data_search.sl).subscribe((data: any) => {
      if (data.success) {
        console.log("ESTOS SON LAS WO:  ", data.result);
        this.wo_ = data.result;
        this.__loader__.hideLoader();
      }
    });
  }
  //********************************************************************************************************//
  public cleanFilter(): void {
    this.filterCity = { city: '' };
    this.filterServiceRecord = { numberServiceRecord: '', assigneeName: '' };
    this.filterWorkOrder = { numberWorkOrder: '' };

    this.data_search = {
      sr: '',
      coordinator: ''
    };
    this.range.reset({rangeDate1: '', rangeDate2: ''});
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();

  }
  //********************************************************************************************************//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_table.filter = filterValue.trim().toLowerCase();
  }
  //********************************************************************************************************//
  addReminder():void{
		const dialogRef = this._dialog.open(DialogDashboardAddRemindersComponent, {
			data: "0",
			width: "100%"
		  });
		  dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
	  }
  //********************************************************************************************************//
  viewRegister(data){
    const dialogRef = this._dialog.open(DialogDashboardAddRemindersComponent, {
			data: data,
			width: "100%"
		  });
		  dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
  }
}
