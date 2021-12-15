import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-score-awads',
  templateUrl: './dialog-score-awads.component.html',
  styleUrls: ['./dialog-score-awads.component.css']
})
export class DialogScoreAwadsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogScoreAwadsComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }

    caserviceline: any[] = [];

  ngOnInit(): void {
    console.log('data que recibe', this.data);
    this.catalogos();
  }

  async catalogos(){
    this.caserviceline = await this._services.getCatalogueFrom('GetServiceLine');
  }

  save() {
    this.data.serviceLine = '';
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
