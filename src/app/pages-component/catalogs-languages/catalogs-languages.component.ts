import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCatalogLanguagesComponent } from '../dialog/dialog-catalog-languages/dialog-catalog-languages.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve } from '@angular/router';



@Component({
  selector: 'app-catalogs-languages',
  templateUrl: './catalogs-languages.component.html',
  styleUrls: ['./catalogs-languages.component.css']
})
export class CatalogsLanguagesComponent implements OnInit {

  // languaje
  @ViewChild('sortlang') sortlang: MatSort;
  @ViewChild('paglang') paglang: MatPaginator;

  dataLanguages: any;
  search;
  displayedColumnsLanguages: string[] = ['Language', 'Abbreviation', 'Action'];
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
    this._services.service_general_get('Catalog/GetAllLanguages').subscribe(rlenguage => {
      console.log('catalogo language', rlenguage);
      if (rlenguage.success) {
        // this.dataLanguages = rlenguage.result;
        this.dataLanguages = new  MatTableDataSource(rlenguage.result);
        this.dataLanguages.paginator = this.paglang;
        this.dataLanguages.sort = this.sortlang;
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataLanguages.filter = filterValue.trim().toLowerCase();
  }
  // add y update lenguage
  addLenguage(id) {
    console.log('abrir modal lenguage');
    const dialogRef = this._dialog.open(DialogCatalogLanguagesComponent, {
      data: {id: id},
      width: "30%",
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
  // delete lenguage
  deleteLenguage(id) {
    console.log('lenguaje', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Language?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteLanguage/${id}`).subscribe((data) =>{
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
              body: `The lenguage is in use by other records`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
}
