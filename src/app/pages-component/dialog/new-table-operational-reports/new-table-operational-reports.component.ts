import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-new-table-operational-reports',
  templateUrl: './new-table-operational-reports.component.html',
  styleUrls: ['./new-table-operational-reports.component.css']
})
export class NewTableOperationalReportsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewTableOperationalReportsComponent>) { }

  data: any = {};

  ngOnInit(): void {
  }

  save() {
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
