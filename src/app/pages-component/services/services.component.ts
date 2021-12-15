import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogAddCountrySeccionCountryComponent } from '../dialog/dialog-add-country-seccion-country/dialog-add-country-seccion-country.component';
import { DialogAddServiceAdminCenterComponent } from '../dialog/dialog-add-service-admin-center/dialog-add-service-admin-center.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,
    private _services: ServiceGeneralService,
    public dialog: MatDialog,
    public router: Router) { }

  @ViewChild('immisort') immisort: MatSort;
  @ViewChild('relosort') relosort: MatSort;

  @ViewChild('immipag') immipag: MatPaginator;
  @ViewChild('relopag') relopag: MatPaginator;

  cuatro: string[] = ['dos', 'tres', 'cuatro'];
  serviceLocationsimmi: any;
  serviceLocationsrelo: any;

  public loader: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.loader.showLoader();
    this._services.service_general_get('AdminCenter/GetAllServices/1').subscribe(r=>{
      if(r.success){
        this.serviceLocationsimmi = new  MatTableDataSource(r.result);
        this.serviceLocationsimmi.paginator = this.immipag;
        this.serviceLocationsimmi.sort = this.immisort;
        this.loader.hideLoader();
      }
    })

    this._services.service_general_get('AdminCenter/GetAllServices/2').subscribe(r=>{
      if(r.success){
        this.serviceLocationsrelo = new  MatTableDataSource(r.result);
        this.serviceLocationsrelo.paginator = this.relopag;
        this.serviceLocationsrelo.sort = this.relosort;
        this.loader.hideLoader();
      }
    })


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.serviceLocationsimmi.filter = filterValue.trim().toLowerCase();
    this.serviceLocationsrelo.filter = filterValue.trim().toLowerCase();
  }

  AddCountryDialog(){
  
    const dialogRef = this.dialog.open(DialogAddCountrySeccionCountryComponent, {
      data: {data: 'no'}, 
      width: '90%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  addService(id){
    const dialogRef = this.dialog.open(DialogAddServiceAdminCenterComponent, {
      data: {id: id}, 
      width: '90%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result === 1){
        const dialog = this.dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Inserted data"
          },
          width: "350px"
        });
      }

      if(result === 2){
        const dialog = this.dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated data"
          },
          width: "350px"
        });
      }
      this.ngOnInit();
    })
  }


}
