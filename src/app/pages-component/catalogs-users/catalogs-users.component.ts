import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCatalogUserComponent } from '../dialog/dialog-catalog-user/dialog-catalog-user.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve } from '@angular/router';

@Component({
  selector: 'app-catalogs-users',
  templateUrl: './catalogs-users.component.html',
  styleUrls: ['./catalogs-users.component.css']
})
export class CatalogsUsersComponent implements OnInit {
  // user
  @ViewChild('sortuser') sortuser: MatSort;
  @ViewChild('paguser') paguser: MatPaginator;
  dataUser: any;
  search;
  displayedColumnsUser: string[] = ['Name', 'Office', 'Country', 'Job Title', 'Role', 'Creation Date', 'Action'];
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
    this._services.service_general_get('Catalog/GetAllUsers').subscribe(rUser => {
      console.log('catalogo user', rUser);
      if (rUser.success) {
        this.dataUser = new  MatTableDataSource(rUser.result.value);
        this.dataUser.paginator = this.paguser;
        this.dataUser.sort = this.sortuser;
        console.log('dataTable', this.dataUser);
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataUser.filter = filterValue.trim().toLowerCase();
  }
  addUser(id) {
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(DialogCatalogUserComponent, {
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
      if (result === 3) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "error mail"
          },
          width: "350px"
        });
        this.get_catalogos();

      }
    })

  }
  profilePage(id) {
    let role;
    console.log(id);
    if (id != 0) {
      this._services.service_general_get(`Catalog/GetUser/${id}`).subscribe( r => {
        if (r.success) {
          role = r.result.value.role;
          // if (role == 1) {
          if(role != 2 && role != 3){
            this._router.navigateByUrl(`profilemanager/${id}`);
          }else if(role == 2){
            this._router.navigateByUrl(`profilecoordinator/${id}`);
          }else if(role == 3){
            this._router.navigateByUrl(`profileconsultant/${id}`);
          }
        }
      });
    }
  }
  deleteUser(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this User?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteUser/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted ${data.result.name}`
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
              body: `The user is in use by other records`
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
