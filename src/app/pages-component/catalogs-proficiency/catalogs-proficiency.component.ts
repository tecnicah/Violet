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
import { DialogCatalogProficiencyComponent } from './../dialog/dialog-catalog-proficiency/dialog-catalog-proficiency.component';

@Component({
  selector: 'app-catalogs-proficiency',
  templateUrl: './catalogs-proficiency.component.html',
  styleUrls: ['./catalogs-proficiency.component.css']
})
export class CatalogsProficiencyComponent implements OnInit {

  // proficiency
  @ViewChild('sortProficiency') sortProficiency: MatSort;
  @ViewChild('pagProficiency') pagProficiency: MatPaginator;
  // variables
  dataCatalogProficiency: any;
  search;
  displayedColumnsProficiency: string[] = ['Proficiency', 'Action'];
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
    this._services.service_general_get('AdminCenter/GetProficiency').subscribe(r => {
      if (r.success) {
        console.log('get Proficiency', r);
        this.dataCatalogProficiency = new MatTableDataSource(r.result);
        this.dataCatalogProficiency.paginator = this.pagProficiency;
        this.dataCatalogProficiency.sort = this.sortProficiency;
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCatalogProficiency.filter = filterValue.trim().toLowerCase();
  }
  addProficiency(id : number) {
    console.log('abrir modal proficiency');
    const dialogRef = this._dialog.open(DialogCatalogProficiencyComponent, {
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
  deleteProficiency(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Proficiency?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Proficiency/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Proficiency`
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
              body: `The Proficiency is in use`
            },
            width: "350px"
            });
            this.getCatalog();
        })
      }
    });

  }

}
