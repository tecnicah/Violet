import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-terms-of-the-deal',
  templateUrl: './dialog-terms-of-the-deal.component.html',
  styleUrls: ['./dialog-terms-of-the-deal.component.css']
})
export class DialogTermsOfTheDealComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogTermsOfTheDealComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }

    caCurrency: any[] = [];
    caPriceTerm: any[] = [];

  ngOnInit(): void {
    this.catalogos();
  }

  async catalogos(){
    this.caCurrency = await this._services.getCatalogueFrom('GetCurrency');
    this.caPriceTerm = await this._services.getCatalogueFrom('GetPriceTerm');
  }

  save(){
    this.data.success = true;
    this.dialogRef.close(this.data);
  }
}
