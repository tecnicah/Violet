import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCatalogCliclesComponent } from '../dialog/dialog-catalog-clicles/dialog-catalog-clicles.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve } from '@angular/router';


@Component({
  selector: 'app-catalogs-life-cicles',
  templateUrl: './catalogs-life-cicles.component.html',
  styleUrls: ['./catalogs-life-cicles.component.css']
})
export class CatalogsLifeCiclesComponent implements OnInit {

  // cicles
  @ViewChild('sortcicles') sortcicles: MatSort;
  @ViewChild('pagcicles') pagcicles: MatPaginator;
  dataCicles: any;
  search;
  displayedColumnsCicles: string[] = ['Life Cicle', 'Action'];
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
      this._services.service_general_get('Catalog/GetAllLifeCricle').subscribe(rCircle => {
        console.log('catalogo circle', rCircle);
        if (rCircle.success) {
          this.dataCicles = new  MatTableDataSource(rCircle.result);
          this.dataCicles.paginator = this.pagcicles;
          this.dataCicles.sort = this.sortcicles;
          this.search = '';
        }
      });
      this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCicles.filter = filterValue.trim().toLowerCase();
  }
  addCicles(id) {
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(DialogCatalogCliclesComponent, {
      data: {id: id},
      width: "30%",
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
  deleteCicles(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Cicle?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteLifeCircle/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted ${data.result.lifeCircle1}`
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
              body: `The cicles is in use by other records`
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
