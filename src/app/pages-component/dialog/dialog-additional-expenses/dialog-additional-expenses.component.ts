import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-additional-expenses',
  templateUrl: './dialog-additional-expenses.component.html',
  styleUrls: ['./dialog-additional-expenses.component.css']
})
export class DialogAdditionalExpensesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAdditionalExpensesComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.catalogos();
  }

  ca_currency = [];
  async catalogos(){
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
  }

  save(){
    this.data.success = true;
    this.dialogRef.close(this.data)
  }

}
