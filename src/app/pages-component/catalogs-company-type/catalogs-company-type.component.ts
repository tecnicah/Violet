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
import { DialogCatalogCompanyTypeComponent } from './../dialog/dialog-catalog-company-type/dialog-catalog-company-type.component';

@Component({
  selector: 'app-catalogs-company-type',
  templateUrl: './catalogs-company-type.component.html',
  styleUrls: ['./catalogs-company-type.component.css']
})
export class CatalogsCompanyTypeComponent implements OnInit {

  // company
  @ViewChild('sortCompanyType') sortCompanyType: MatSort;
  @ViewChild('pagCompanyType') pagCompanyType: MatPaginator;
  // variables
  dataCompanyType: any;
  search;
  displayedColumnsCompanyType: string[] = ['Company Type', 'Action'];
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
    this._services.service_general_get('AdminCenter/GetCompanyType').subscribe(r => {
      if (r.success) {
        console.log('get company', r);
        this.dataCompanyType = new MatTableDataSource(r.result);
        this.dataCompanyType.paginator = this.pagCompanyType;
        this.dataCompanyType.sort = this.sortCompanyType;
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCompanyType.filter = filterValue.trim().toLowerCase();
  }
  addCompanyType(id : number) {
    console.log('abrir modal company');
    const dialogRef = this._dialog.open(DialogCatalogCompanyTypeComponent, {
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
  deleteCompanyType(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Company?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/CompanyType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Company type`
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
              body: `The Company Type is in use`
            },
            width: "350px"
            });
            this.getCatalog();
        })
      }
    });

  }

}
