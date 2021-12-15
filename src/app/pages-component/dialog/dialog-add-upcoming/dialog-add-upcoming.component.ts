import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-add-upcoming',
  templateUrl: './dialog-add-upcoming.component.html',
  styleUrls: ['./dialog-add-upcoming.component.css']
})
export class DialogAddUpcomingComponent implements OnInit {

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddUpcomingComponent>) { }
  public __loader__: LoaderComponent = new LoaderComponent();
  public catalog_country: any[] = [];
  dataCity: any[] = [];

  ngOnInit(): void {
    this.__loader__.showLoader();
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
      this._services.service_general_get(`AdminCenter/GetUpcomingEventsById?key=${this.data.id}`).subscribe(resp => {
        this.data = resp.result;
        console.log('data upcoming', this.data);
      });
    }
    this.getCatalog();
    this.selectCity();
  }
  async getCatalog() {
    this.catalog_country = await this._services.getCatalogueFrom('GetCountry');
    this.__loader__.hideLoader();
  }

  selectCity() {
    this.dataCity = [];
    this._services.service_general_get(`Catalogue/GetState?country=${this.data.country}`).subscribe(resp => {
      console.log('catalogo city', resp);
      if (resp.success) {
        for (let i = 0; i < resp.result.length; i++) {
          const eCity = resp.result[i];
          this.dataCity.push(eCity)
        }
      }
    });
  }
  active_title: boolean = false;
  active_country: boolean = false;
  active_city: boolean = false;
  active_description: boolean = false;

  valid_form() {
    if(this.data.title == undefined){
      this.active_title = true;
    }if(this.data.country == undefined){
      this.active_country = true;
    }if(this.data.city == undefined){
      this.active_city = true;
    }if(this.data.description == undefined){
      this.active_description = true;
    }
    if((this.data.title != undefined || this.data.title == '' ) && this.data.country != undefined && this.data.city != undefined && (this.data.description != undefined || this.data.description== '')){
      this.save();
    }
  }
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy= userData.id;
    this.data.updatedDate = new Date();

    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      console.log(JSON.stringify(this.data), this.data);
      this._services.service_general_post_with_url("AdminCenter/AddUpcomingEvent", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    } else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdateUpcomingEvent', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })
    }
  }
}
