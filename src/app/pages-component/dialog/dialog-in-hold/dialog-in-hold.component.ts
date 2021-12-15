import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-in-hold',
  templateUrl: './dialog-in-hold.component.html',
  styleUrls: ['./dialog-in-hold.component.css']
})
export class DialogInHoldComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCatalogo();
  }

  public serviceLine = [];
  async getCatalogo(){
    this.serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
  }
  public data_hold : any = { serviceLineID: '' };
  save(){
    this.data_hold.success = true;
    this.dialogRef.close(this.data_hold);
  }
}
