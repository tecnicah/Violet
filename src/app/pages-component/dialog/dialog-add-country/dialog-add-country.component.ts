import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-add-country',
  templateUrl: './dialog-add-country.component.html',
  styleUrls: ['./dialog-add-country.component.css']
})
export class DialogAddCountryComponent implements OnInit {

  data:any = {}

  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.catalogos();
  }
  //******************************************************************//
  ca_country = [];
  async catalogos(){
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
  }
  //******************************************************************//
  save_office(){
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
