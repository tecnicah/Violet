import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-modal-banking-details',
  templateUrl: './modal-banking-details.component.html',
  styleUrls: ['./modal-banking-details.component.css']
})
export class ModalBankingDetailsComponent implements OnInit {

  constructor(
    public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalBankingDetailsComponent>
  ) { }

  ngOnInit(): void {
    this.getSelectOption()
  }
  ca_accountType = [];

  async getSelectOption() {
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
  }
}
