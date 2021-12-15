import { Component, OnInit, ViewChild} from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCatalogRolesComponent } from '../dialog/dialog-catalog-roles/dialog-catalog-roles.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve } from '@angular/router';


@Component({
  selector: 'app-catalogs-roles',
  templateUrl: './catalogs-roles.component.html',
  styleUrls: ['./catalogs-roles.component.css']
})
export class CatalogsRolesComponent implements OnInit {

  // role
  @ViewChild('sortrole') sortrole: MatSort;
  @ViewChild('pagrole') pagrole: MatPaginator;
  dataRoles: any;
  search;
  displayedColumnsRoles: string[] = ['Role', 'Description', 'Creation Date', 'Action'];
  // loader
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public _router:Router) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.get_catalogos();
    this.__loader__.hideLoader();
  }
  get_catalogos() {
    this.__loader__.showLoader();
    this._services.service_general_get('Catalog/GetAllRole').subscribe(rRole => {
      console.log('catalogo role', rRole);
      if (rRole.success) {
        this.dataRoles = new  MatTableDataSource(rRole.result);
        this.dataRoles.paginator = this.pagrole;
        this.dataRoles.sort = this.sortrole;
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataRoles.filter = filterValue.trim().toLowerCase();
  }
  addRole(id) {
    console.log('abrir modal role');
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(DialogCatalogRolesComponent, {
      data: {id: id},
      width: "30%",
      // data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
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
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
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
  deleteRole(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Role?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteRole/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted ${data.result.role}`
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
              body: `The Role is in use by other records`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  public dateWorker(date: string): string {
    let result: string = '';
    if (date != null) {
      const date_to_work: string = date,
        date_remove_time: string = date_to_work.split('T')[0];
      result = date_remove_time;
    } else {
      result = 'No Date';
    }
    return result;
  }

}
