import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-included-in-rent',
  templateUrl: './dialog-included-in-rent.component.html',
  styleUrls: ['./dialog-included-in-rent.component.css']
})
export class DialogIncludedInRentComponent implements OnInit {

  user:any;
  ca_currency:any;
  
  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  //********************************************************//
  async  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
  }
  //********************************************************//
  save(){
    this.dialogRef.close(this.data);
  }

}
