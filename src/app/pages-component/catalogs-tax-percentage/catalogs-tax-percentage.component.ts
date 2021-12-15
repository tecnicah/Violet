import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve } from '@angular/router';
import { DialogCatalogTaxPercentageComponent } from './../dialog/dialog-catalog-tax-percentage/dialog-catalog-tax-percentage.component';

@Component({
  selector: 'app-catalogs-tax-percentage',
  templateUrl: './catalogs-tax-percentage.component.html',
  styleUrls: ['./catalogs-tax-percentage.component.css']
})

export class CatalogsTaxPercentageComponent implements OnInit {

  // taxes
  @ViewChild('sortTaxes') sortTaxes: MatSort;
  @ViewChild('pagTaxes') pagTaxes: MatPaginator;
  // variables
  dataCatalogTaxes: any;
  search;
  displayedColumnsTaxes: string[] = ['Taxe', 'Action'];
  // loader
  public __loader__: LoaderComponent = new LoaderComponent();
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public _router:Router) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.getCatalog();
    this.__loader__.hideLoader();
  }
  getCatalog() {
    this.__loader__.showLoader();
    this._services.service_general_get('AdminCenter/GetTaxesPercentage').subscribe(r => {
      if (r.success) {
        console.log('get taxes', r);
        this.dataCatalogTaxes = new MatTableDataSource(r.result);
        this.dataCatalogTaxes.paginator = this.pagTaxes;
        this.dataCatalogTaxes.sort = this.sortTaxes;
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCatalogTaxes.filter = filterValue.trim().toLowerCase();
  }
  addTaxPercentage(id : number) {
    console.log('abrir modal taxes');
    const dialogRef = this._dialog.open(DialogCatalogTaxPercentageComponent, {
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
        this.getCatalog();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.getCatalog();
      }
    });
  }
  deleteTaxPercentage(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this taxes?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/TaxesPercentage/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted taxe percentage`
              },
              width: "350px"
            });
            this.getCatalog();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The taxe is in use`
            },
            width: "350px"
            });
            this.getCatalog();
        })
      }
    });

  }
}
