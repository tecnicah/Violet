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
import { DialogCatalogEducationLevelComponent } from './../dialog/dialog-catalog-education-level/dialog-catalog-education-level.component';

@Component({
  selector: 'app-catalogs-education-level',
  templateUrl: './catalogs-education-level.component.html',
  styleUrls: ['./catalogs-education-level.component.css']
})
export class CatalogsEducationLevelComponent implements OnInit {
  // education
  @ViewChild('sortEducation') sortEducation: MatSort;
  @ViewChild('pagEducation') pagEducation: MatPaginator;
  // variables
  dataCatalogEducation: any;
  search;
  displayedColumnsEducation: string[] = ['Education level', 'Action'];
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
    this._services.service_general_get('AdminCenter/GetEducationLevel').subscribe(r => {
      if (r.success) {
        console.log('get Education', r);
        this.dataCatalogEducation = new MatTableDataSource(r.result);
        this.dataCatalogEducation.paginator = this.pagEducation;
        this.dataCatalogEducation.sort = this.sortEducation;
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCatalogEducation.filter = filterValue.trim().toLowerCase();
  }
  addEducation(id : number) {
    console.log('abrir modal education');
    const dialogRef = this._dialog.open(DialogCatalogEducationLevelComponent, {
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
  deleteEducation(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Education?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/EducationLevel/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Education`
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
              body: `The Education is in use`
            },
            width: "350px"
            });
            this.getCatalog();
        })
      }
    });

  }
}
