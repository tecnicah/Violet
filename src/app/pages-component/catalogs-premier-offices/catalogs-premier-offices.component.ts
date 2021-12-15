import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCatalogOfficesComponent } from '../dialog/dialog-catalog-offices/dialog-catalog-offices.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve } from '@angular/router';


@Component({
  selector: 'app-catalogs-premier-offices',
  templateUrl: './catalogs-premier-offices.component.html',
  styleUrls: ['./catalogs-premier-offices.component.css']
})
export class CatalogsPremierOfficesComponent implements OnInit {

   // office
  @ViewChild('sortoffice') sortoffice: MatSort;
  @ViewChild('pagoffice') pagoffice: MatPaginator;
  dataOffices: any;
  search;
  displayedColumnsOffices: string[] = ['Office Name', 'Country', 'City', 'Phone Number', 'Action'];
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
      this._services.service_general_get('Catalog/GetAllOffice').subscribe(rOffice => {
        console.log('catalogo office', rOffice);
        if (rOffice.success) {
          this.dataOffices = new  MatTableDataSource(rOffice.result);
          this.dataOffices.paginator = this.pagoffice;
          this.dataOffices.sort = this.sortoffice;
          this.search = '';
        }
      });
      this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataOffices.filter = filterValue.trim().toLowerCase();
  }
  addOffice(id) {
    console.log('abrir modal office');
    const dialogRef = this._dialog.open(DialogCatalogOfficesComponent, {
      data: {id: id},
      width: "40%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteOffice(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Office?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteOffice/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted ${data.result.office}`
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
              body: `The office is in use by other records`
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
