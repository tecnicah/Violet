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
import { DialogCatalogVehicleTypeComponent } from './../dialog/dialog-catalog-vehicle-type/dialog-catalog-vehicle-type.component';

@Component({
  selector: 'app-catalogs-vehicle-type',
  templateUrl: './catalogs-vehicle-type.component.html',
  styleUrls: ['./catalogs-vehicle-type.component.css']
})
export class CatalogsVehicleTypeComponent implements OnInit {

  // vehicle
  @ViewChild('sortVehicle') sortVehicle: MatSort;
  @ViewChild('pagVehicle') pagVehicle: MatPaginator;
  // variables
  dataCatalogVehicle: any;
  search;
  displayedColumnsVehicle: string[] = ['Type', 'Action'];
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
    this._services.service_general_get('AdminCenter/GetVehicleType').subscribe(r => {
      if (r.success) {
        console.log('get vehicle', r);
        this.dataCatalogVehicle = new MatTableDataSource(r.result);
        this.dataCatalogVehicle.paginator = this.pagVehicle;
        this.dataCatalogVehicle.sort = this.sortVehicle;
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCatalogVehicle.filter = filterValue.trim().toLowerCase();
  }
  addVehicle(id : number) {
    const dialogRef = this._dialog.open(DialogCatalogVehicleTypeComponent, {
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
  deleteVehicle(id : number) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Vehicle type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/VehicleType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Vehicle type`
              },
              width: "350px"
            });
            this.getCatalog();
          }
        }, (error) => {
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The vehicle is in use`
            },
            width: "350px"
            });
            this.getCatalog();
        })
      }
    });

  }

}
