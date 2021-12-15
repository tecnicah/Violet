import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogAddTableFullSistemContactComponent } from './../dialog/dialog-add-table-full-sistem-contact/dialog-add-table-full-sistem-contact.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { DialogAddFilterFullSistemContactComponent } from './../dialog/dialog-add-filter-full-sistem-contact/dialog-add-filter-full-sistem-contact.component';
import { DialogAddColumnsFullSistemContactComponent } from './../dialog/dialog-add-columns-full-sistem-contact/dialog-add-columns-full-sistem-contact.component';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';



@Component({
  selector: 'app-reports-full-sistem-contacts',
  templateUrl: './reports-full-sistem-contacts.component.html',
  styleUrls: ['./reports-full-sistem-contacts.component.css']
})
export class ReportsFullSistemContactsComponent implements OnInit {

  public __loader__: LoaderComponent = new LoaderComponent();
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  @ViewChild('immisort') immisort: MatSort;
  @ViewChild('immipag') immipag: MatPaginator;

  userData = JSON.parse(localStorage.getItem('userData'));
  dataReport: any = {}; //contiene la informacion despues de que se crea una tabla
  taps;  //pestañas de la tabla
  columns: any[] = []; //columnas
  activeLink: number = 0;
  reportSelect;
  dateR : any = {};
  // columnas base
  baseColums: string[] = ["Contact Name",
    "Title",
    "Company",
    "Office",
    "Country",
    "City",
    "Phone",
    "E-mail",
    "Experience"];
  datasource: any = [];
  filters: any = [];
  data: any = [];


  ngOnInit(): void {
    this.__loader__.hideLoader();
    this.getTables();
    this.consultaPermisos();
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
  //*********************************************//
  getTables() {

    this.columns = [];
    this.__loader__.showLoader();
    this._services.service_general_get(`Report/GetTables/${this.userData.id}/${2}`).subscribe(r => {
      console.log('get report for user', r.result);
      if (r.success) {
        this.taps = r.result.value;
        if (this.taps.length > 0) {
          this.datasource = new MatTableDataSource(this.taps[0].contacts);
          setTimeout(() => {
            this.datasource.paginator = this.immipag;
            this.datasource.sort = this.immisort;
            this.__loader__.hideLoader();
          }, 10);
          if (this.taps[0].columns1.length > 0) {
            for (let i = 0; i < this.taps[0].columns1.length; i++) {
              this.columns.push(this.taps[0].columns1[i].columnsNavigation.name);
            }
            this.__loader__.hideLoader();
          }
          else {
            this.columns = this.baseColums;
          }
        }
        this.__loader__.hideLoader();
        console.log('columnas', this.columns);
      }
      this.__loader__.hideLoader();
    })
  }
  addTable() {
    const dialogRef = this._dialog.open(DialogAddTableFullSistemContactComponent, {
      data: {
        id: 0,
        report: this.dataReport.id
        // report: 12
      },
      width: '30%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('resp creacion tabla', result);
      if (result.success) {
        this.taps.push(result.result);
        this.columns = this.baseColums;
        // this.taps.sort = this.immisort;
        // this.taps.paginator = this.immipag;
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Table created"
          },
          width: "350px"
        });
        this.ngOnInit();
      }
    })
  }
  addFilter(id) {
    const dialogRef = this._dialog.open(DialogAddFilterFullSistemContactComponent, {
      data: {
        id: id,
        report: this.reportSelect.id,
        filter: this.reportSelect.filters1
        // report: 12
      },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Filter created"
          },
          width: "350px"
        });
        this.ngOnInit();
      }
    })
  }
  // agregar columnas
  addColumns(id) {
    const dialogRef = this._dialog.open(DialogAddColumnsFullSistemContactComponent, {
      data: {
        id: id,
        report: this.reportSelect.id,
        colums: this.reportSelect.columns1
        // report: 12
      },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('resp de add columns', result);
      if (result.success) {
        let columnas = [];
        for (let c = 0; c < result.result.length; c++) {
          const element = result.result[c];
          console.log();
          columnas.push(element.name)
        }
        this.columns = columnas;
        console.log('columnas', this.columns);

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Columns created"
          },
          width: "350px"
        });
        this.ngOnInit();
      }
    })
  }
  changeTab(item) {
    this.columns = [];
    this.dateR = {};
    this.reportSelect = item;
    if (item.columns1.length > 0) {
      for (let i = 0; i < item.columns1.length; i++) {
        this.columns.push(item.columns1[i].columnsNavigation.name);
      }
    }
    else {
      this.columns = this.baseColums;
    }
    this.datasource = new MatTableDataSource(item.contacts);
    setTimeout(() => {
      this.datasource.paginator = this.immipag;
      this.datasource.sort = this.immisort;
      this.__loader__.hideLoader();
    }, 10);
    console.log('valor de tab', item);
    console.log(this.taps[this.activeLink]);
  }
  deleteReport(id){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this report?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.__loader__.showLoader();
        this._services.service_general_delete_with_url('Report/RemoveReport/'+id).subscribe(r => {
          if(r.success){
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Report deleted successfull'
                },
                width: "350px"

              });
              this.__loader__.hideLoader();
              this.ngOnInit();

          }
        })
      }
    })

  }
  applyFilter(event: Event) {
    this.dateR.i = null;
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterdr(){
    let year = this.dateR.i.getFullYear();
    let mont = this.dateR.i.getMonth() + 1;
    let day = this.dateR.i.getDate();

    if(mont < 9){
      mont = '0'+mont;
    }

    if(day < 10){
      day = '0'+day;
    }

    this.datasource.filter = year+'-'+mont+'-'+day;
  }
  clearFilter(){
    this.dateR.i = null;
    this.dateR.f = null;
    this.datasource.filter = "";
  }


}
// /api/Report/RemoveReport/{report}
