import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEditCallComponent } from '../dialog-edit-call/dialog-edit-call.component';
import { LoaderComponent } from 'app/shared/loader';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddCall } from '../dialog-add-call/addCall.component';
import { DialogDashboardAddCallComponent } from '../dialog-dashboard-add-call/dialog-dashboard-add-call.component';

@Component({
  selector: 'app-dialog-calls',
  templateUrl: './dialog-calls.component.html',
  styleUrls: ['./dialog-calls.component.css']
})
export class DialogCallsComponent implements OnInit {

  public __loader__: LoaderComponent = new LoaderComponent();
  displayedColumns: string[] = ['ServiceRecord', 'WorkOrder', 'Service', 'Caller', 'Callee', 'Date', 'Time', 'Duration', 'Escalate', 'edit'];

  @ViewChild('sortcall') sortcall: MatSort;

  @ViewChild(MatPaginator , {static: true})pagcall: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;


  filter_:any = { numberServiceRecord: '' };
  filter:any = { numberWorkOrder: '' };
  filters:any = { serviceNumber: '' };
  filteruno: boolean = false;
  data_table: any;
  user: any;
  ca_service_record:any[]=[];
  data_model:any =  {};
  workOrder:any[]=[];
  services: any[] = [];


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any) {}

  //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
  public permission_edit: boolean = false;
  maxall: number = 20;

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

    this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe((data => {
      if (data.success) {
        this.ca_service_record = data.result;
      }
    }))

    this._services.service_general_get('MyDashboard/GetCalls/' + this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data.map.value);
        this.data_table = new MatTableDataSource(data.map.value);
        this.data_table.paginator = this.pagcall;
        this.data_table.sort = this.sortcall;
        this.__loader__.hideLoader();
      }
    }))

  }
  getPageSizeOptions() {
    if (this.data_table?.paginator.length > this.maxall) {
      return [10, 20, this.data_table?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }

  //********************************************************************//
  consultaWorkOrder() {
    this.workOrder = [];
    this.services = [];
    this._services.service_general_get('Catalogue/GetworkOrder/' + this.data_model.sr).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.workOrder = data.result.value;
      }
    }))
  }
  //********************************************************************//
  consultaService() {
    console.log("Entra a consultar servicios");
    this.services = [];
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data_model.wo).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.services = data.result.value;
      }
    }), (err)=>{
       console.log("err: ", err);
    })
  }
  //********************************************************************//
  editCall(element) {
    const dialogRef = this._dialog.open(DialogEditCallComponent, {
      data: element,
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      //this.cleanFilter();
    })

  }
  //********************************************************************//
  public AddCall(): void {
    const add_call_dialog = this._dialog.open(DialogDashboardAddCallComponent, {
      width: "95%"
    });

    add_call_dialog.afterClosed().subscribe(result => {
       this.ngOnInit();
       //this.cleanFilter();
    });
  }
  //********************************************************************//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_table.filter = filterValue.trim().toLowerCase();
  }
  //********************************************************************//
  //FUNCION PARA BUSQUEDA DE EVENTOS//
  searchData() {
    let service_record_params_selected: string = '';
    let params = '';
    for (let item in this.data_model) {
      if (this.data_model[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_model[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getServiceRecordTableData(params);
  }
  //********************************************************************//
  //CONSULTA INFORMACION POR FILTRO//
  public getServiceRecordTableData(params: string = ''): void {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    this._services.service_general_get('MyDashboard/GetCalls/' + this.user.id + params_in).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.map.value;
        console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
        this.data_table = new MatTableDataSource(data.map.value);
        this.data_table.paginator = this.pagcall;
        this.data_table.sort = this.sortcall;
        this.__loader__.hideLoader();
      }
    });
  }
  //**********************************************************************//
  public cleanFilter(): void {
    this.filter_ = { numberServiceRecord: '' };
    this.filter = { numberWorkOrder: '' };
    this.filters = { serviceNumber: '' };
    this.workOrder = [];
    this.services = [];
    this.data_model = {};
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
}
