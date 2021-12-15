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
import { DialogCatalogPetTypeComponent } from './../dialog/dialog-catalog-pet-type/dialog-catalog-pet-type.component'

@Component({
  selector: 'app-catalogs-pet-type',
  templateUrl: './catalogs-pet-type.component.html',
  styleUrls: ['./catalogs-pet-type.component.css']
})
export class CatalogsPetTypeComponent implements OnInit {

  // pet type
  @ViewChild('sortPetType') sortPetType: MatSort;
  @ViewChild('pagPetType') pagPetType: MatPaginator;
  // variables
  dataCatalogPetType: any;
  search;
  displayedColumnsPetType: string[] = ['petType', 'Action'];
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
    this._services.service_general_get('AdminCenter/GetPetType').subscribe(r => {
      if (r.success) {
        console.log('get pet', r);
        this.dataCatalogPetType = new MatTableDataSource(r.result);
        this.dataCatalogPetType.paginator = this.pagPetType;
        this.dataCatalogPetType.sort = this.sortPetType;
        this.search = '';
      }
    });
    this.__loader__.hideLoader();
  }
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCatalogPetType.filter = filterValue.trim().toLowerCase();
  }
  addPet(id : number) {
    const dialogRef = this._dialog.open(DialogCatalogPetTypeComponent, {
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
  deletePet( id : number) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this pet type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/PetType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted pet`
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
              body: `The pet type is in use`
            },
            width: "350px"
            });
            this.getCatalog();
        })
      }
    });
  }
}
