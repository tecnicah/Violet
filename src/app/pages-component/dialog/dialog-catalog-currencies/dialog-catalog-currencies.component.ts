import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-currencies',
  templateUrl: './dialog-catalog-currencies.component.html',
  styleUrls: ['./dialog-catalog-currencies.component.css']
})
export class DialogCatalogCurrenciesComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor( public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogCurrenciesComponent>) { }

  // variables
  // currencies: any = {};
  // user: any = {};

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    // comprobar si es creacion o actualizacion de currencies
    if (this.data.id != 0) {
      this._services.service_general_get(`Catalog/GetCurrency/${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          console.log('respuesta de actualizacion', r);
          this.__loader__.hideLoader();
        }
      });
    }

  }
  // validar formulario
  active_currency: boolean = false;
  active_abbreviation: boolean = false;
  active_symbol: boolean = false;
  validarForm() {
    if(this.data.currency == undefined){
      this.active_currency = true;
    }if(this.data.abbreviation == undefined){
      this.active_abbreviation = true;
    }if(this.data.symbol == undefined){
      this.active_symbol = true;
    }
    if((this.data.currency != undefined || this.data.currency.length == 0 ) && (this.data.abbreviation != undefined || this.data.abbreviation.length == 0) && (this.data.symbol != undefined || this.data.symbol.length == 0 )){
      this.save();
    }

  }

  // guardar currency
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy= userData.id;
    this.data.updatedDate = new Date();

    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      console.log(JSON.stringify(this.data), this.data);
      this._services.service_general_post_with_url("Catalog/AddCurrency", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    } else {
      this.__loader__.showLoader();
      this._services.service_general_put('Catalog/UpdateCurrency', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })
    }
  }


}
