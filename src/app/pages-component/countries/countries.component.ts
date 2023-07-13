import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { DialogAdminCenterCountriesComponent } from '../dialog/dialog-admin-center-countries/dialog-admin-center-countries.component';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  @ViewChild('sortcountry') sortcountry: MatSort;
  // @ViewChild(MatSort, {static: true}) sortcountry: MatSort;

  // @ViewChild(MatPaginator, { static: true }) pagcountry: MatPaginator;
  @ViewChild(MatPaginator, {static: true})pagcountry: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;


  // @ViewChild('pagcountry') pagcountry: MatPaginator;

  dataSource:any;
  displayedColumns: string[] = ['Country', 'Currency', 'Languages', 'Cities', 'Creation Date','Actions'];
  filteruno:boolean = false;
  loader:LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog) { }
  maxall: number = 20;


  ngOnInit(): void {
    //this.dataSource = this.ELEMENT_DATA;
    this.loader.showLoader();
    this.consultaPermisos();
    this._services.service_general_get('CountryAdminCenter/GetCountry').subscribe((data => {
      if (data.success) {
        console.log(data.result.value);
        this.dataSource = new MatTableDataSource(data.result.value);
        this.dataSource.paginator = this.pagcountry;
        this.dataSource.sort = this.sortcountry
        this.loader.hideLoader();
      }
    }));
  }
  getPageSizeOptions() {
    if (this.dataSource?.paginator.length > this.maxall) {
      return [10, 20, this.dataSource?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }
   //***************************************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
  public permission_edit: boolean = false;

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

  //*****************************************************************//
  //ABRE MODAL PARA AGREGAR NUEVA COUNTRY//
  addCountry(){
    console.log("ABRE MODAL COUNTRY");
    // data_.origin = 'violetApp';  origin: 'systemConfiguration'
    const dialogRef = this._dialog.open(DialogAdminCenterCountriesComponent, {
      data: { id : 0, origin: 'violetApp'},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
       this.ngOnInit();
    })
  }
  //*****************************************************************//
  //BUSQUEDA POR FILTRO//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //*****************************************************************//
  //EDICION DE REGISTRO//
  editRegistro(data_){
    console.log("ABRE MODAL PARA EDICION DE REGISTRO GENERAL: ", data_);
    data_.origin = 'violetApp';
    const dialogRef = this._dialog.open(DialogAdminCenterCountriesComponent, {
      data: data_,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
       this.ngOnInit();
    })
  }
  //*****************************************************************//
  //FUNCION PARA ELIMINAR DE BASE DE DATOS DOCUMENT COUNTRY//
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
        this.loader.showLoader();
        this._services.service_general_delete("CountryAdminCenter/DeleteCountry?id=" + data.id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: 'Country deleted successfull'
              },
              width: "350px"

            });
            this.loader.hideLoader();
            this.ngOnInit();
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
            this.loader.hideLoader();
          }
        })
      }
    })
  }
}
