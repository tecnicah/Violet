import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-dialog-add-office',
  templateUrl: './dialog-add-office.component.html',
  styleUrls: ['./dialog-add-office.component.css']
})
export class DialogAddOfficeComponent implements OnInit {

  data:any = {}

  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.catalogos();
  }
  //******************************************************************//
  ca_office = [];
  async catalogos(){
    this.ca_office = await this._services.getCatalogueFrom('GetOffice');
  }
  //******************************************************************//
  save_office(){
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
