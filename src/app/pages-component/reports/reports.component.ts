import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogEditColumsOperationalReportsComponent } from '../dialog/dialog-edit-colums-operational-reports/dialog-edit-colums-operational-reports.component';
import { DialogEditFiltersOperationalReportsComponent } from '../dialog/dialog-edit-filters-operational-reports/dialog-edit-filters-operational-reports.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { NewTableOperationalReportsComponent } from '../dialog/new-table-operational-reports/new-table-operational-reports.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
              public dialog: MatDialog,) { }

  @ViewChild('immisort') immisort: MatSort;
  @ViewChild('immipag') immipag: MatPaginator;

  
  taps: any[] = [];
  columns: any[] = [];
  userData: any = {};

  public __loader__:LoaderComponent = new LoaderComponent();
  
  baseColums: string[] = ["Service Record No",
                          "Vip", 
                          "Status", 
                          "Autho Date", 
                          "Country", 
                          "City", 
                          "Partner", 
                          "Client", 
                          "Assignee Name", 
                          "Services", 
                          "Supplier Partner", 
                          "Invoice", 
                          "Invoice Date", 
                          "Invoice Type", 
                          "Description", 
                          "Amount", 
                          "Status Invoice", 
                          "Ammount Sub Total", 
                          "Management Fee Sub Total", 
                          "Wire Fee Sub Total", 
                          "Advance Fee Sub Total", 
                          "Funding Requested Date", 
                          "Recurrent", 
                          "Status Third Party"];

  datasource: any = [];

  dateR : any = {};

  activeLink: any = 0;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getData();
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

  getData(){
    this.columns = [];
    this.__loader__.showLoader();
    this._services.service_general_get('Report/GetTables/'+this.userData.id+'/1').subscribe(r=>{
      console.log(r);
      if(r.success && r.result.value.length > 0){
        this.taps = r.result.value;
        if(this.taps[this.activeLink].columns1.length > 0){
          for (let i = 0; i < this.taps[this.activeLink].columns1.length; i++) {
            const element =  this.taps[this.activeLink].columns1[i];
            this.columns.push(this.taps[this.activeLink].columns1[i].columnsNavigation.name);
          }
        }else{
          this.columns = this.baseColums;
        }
        this.datasource = new MatTableDataSource(this.taps[0].operationals);
        setTimeout(() => {
          this.datasource.paginator = this.immipag;
          this.datasource.sort = this.immisort;
          this.__loader__.hideLoader();
        }, 10);
      }else{
        this.__loader__.hideLoader();
      }
    })
  }

  changeTable(item){
    this.columns = [];
    this.dateR = {};
    if(item.columns1.length > 0){
      for (let i = 0; i < item.columns1.length; i++) {
        const element = item.columns1[i];
        this.columns.push(item.columns1[i].columnsNavigation.name)
      }
    }else{
      this.columns = this.baseColums;
    }
    this.datasource = new MatTableDataSource(item.operationals);
    setTimeout(() => {
      this.datasource.paginator = this.immipag;
      this.datasource.sort = this.immisort;
    }, 10);
    console.log(this.datasource);
    console.log(this.columns);
    console.log(this.taps[this.activeLink]);
  }

  newTable(){
    const dialogRef = this.dialog.open(NewTableOperationalReportsComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe( (so_added:any) => {
        console.log(so_added);
        if(so_added.success){
          this.__loader__.showLoader();
          let data = {
            id: 0,
            name: so_added.tableName,
            reportType: 6,
            createdBy: this.userData.id,
            createdDate: new Date(),
            updatedBy: this.userData.id,
            updatedDate: new Date()
          };
          this._services.service_general_post_with_url('Report/AddTable',data).subscribe(r=>{
            console.log(r);
            this.getData();
          })
        }
    });
  }

  editColums(){
    const dialogRef = this.dialog.open(DialogEditColumsOperationalReportsComponent, {
      width: "500px",
      data: {colums: this.taps[this.activeLink].columns1}
    });

    dialogRef.afterClosed().subscribe( (so_added:any) => {
        console.log(so_added);
        if(so_added.success){
          this.__loader__.showLoader();
          let columnas = [];
          let toBack = [];
          for (let o = 0; o < so_added.data.length; o++) {
            const element = so_added.data[o];
            columnas.push(element.name);
            toBack.push({
                "id": 0,
                "report": this.taps[this.activeLink].id,
                "columns": element.id,
                "orden": o,
                "createdBy": this.userData.id,
                "createdDate": new Date(),
                "updatedBy": this.userData.id,
                "updatedDate": new Date()
              })
          }

          this._services.service_general_post_with_url('Report/EditColumns/'+this.taps[this.activeLink].id,toBack).subscribe(r=>{
              console.log(r);
              if(r.success){
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: 'Edited columns'
                  },
                  width: "350px"
                
                });
                this.__loader__.hideLoader();
                this.ngOnInit();
              
            }
          })
          
          this.columns = columnas;
          
          console.log(this.columns);
        }
    });
  }

  editFilters(){
    const dialogRef = this.dialog.open(DialogEditFiltersOperationalReportsComponent, {
      width: "500px",
      data: {filter: this.taps[this.activeLink].filters1 }
    });

    dialogRef.afterClosed().subscribe( (so_added:any) => {
        console.log(so_added);
        if(so_added.length > 0){
          for (let i = 0; i < so_added.length; i++) {
            const element = so_added[i];
            so_added[i].report = this.taps[this.activeLink].id;
          }
          console.log(so_added);
          this._services.service_general_post_with_url('Report/AddFiltersOpertionals/'+this.taps[this.activeLink].id+'/1',so_added).subscribe(r=>{
            console.log(r);
            if(r.success){
              const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Edited Filters'
                },
                width: "350px"
              
              });
              this.__loader__.hideLoader();
              this.ngOnInit();
            
          }
          })
        }
    });
  }

  deleteTable(id){
    const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
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
              const dialog = this.dialog.open(DialogGeneralMessageComponent, {
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
