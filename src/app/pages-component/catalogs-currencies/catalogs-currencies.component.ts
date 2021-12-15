import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCatalogCurrenciesComponent } from '../dialog/dialog-catalog-currencies/dialog-catalog-currencies.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve } from '@angular/router';


@Component({
  selector: 'app-catalogs-currencies',
  templateUrl: './catalogs-currencies.component.html',
  styleUrls: ['./catalogs-currencies.component.css']
})
export class CatalogsCurrenciesComponent implements OnInit {

  // currencies
  @ViewChild('sortcurren') sortcurren: MatSort;
  @ViewChild('pagcurren') pagcurren: MatPaginator;
  dataCurrencies: any;
  search;
  displayedColumnsCurrencies: string[] = ['Currency', 'Abbreviation', 'Symbol', 'Action'];

  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public _router:Router) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.get_catalogos();

  }
  get_catalogos() {
    this.__loader__.showLoader();
    this._services.service_general_get('Catalog/GetAllCurrency').subscribe(r => {
      console.log('catalogo Currency', r);
      if (r.success) {
        this.dataCurrencies = new  MatTableDataSource(r.result);
        this.dataCurrencies.paginator = this.pagcurren;
        this.dataCurrencies.sort = this.sortcurren;
        this.search = '';
        }
      });
      this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCurrencies.filter = filterValue.trim().toLowerCase();
  }
  // Add cataloge currencies
  addCurrencies(id) {
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(DialogCatalogCurrenciesComponent, {
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
  deleteCurrency(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Currency?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteCurrency/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: ` Deleted ${ data.result.currency }`
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
              body: `The currency is in use by other records`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }

}
