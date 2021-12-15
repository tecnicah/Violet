import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-tenancy',
  templateUrl: './dialog-tenancy.component.html',
  styleUrls: ['./dialog-tenancy.component.scss']
})
export class DialogTenancyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  dataSource:any[] = [];
  displayedColumns: string[] = ['Requested By', 'Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  ELEMENT_DATA:   any[] = [
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum', tres: '20 Sep 2020', cuatro: '20 Sep 2020', cinco: '10'},
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '10'}
  ];

  dataSourceBANK:any[] = [];
  displayedColumnsBANK: string[] = ['Beneficiarys Name', 'CLABE', 'Bank', 'Comments', 'Actions'];
  ELEMENT_DATABANK:   any[] = [
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020'},
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020'}
  ];

  dataSourcePROPERTY:any[] = [];
  displayedColumnsPROPERTY: string[] = ['Section', 'Comments', 'Actions'];
  ELEMENT_DATAPROPERTY:   any[] = [
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum Lorem Ipsum'},
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum Lorem Ipsum'}
  ];

  dataSourceREPORT:any[] = [];
  displayedColumnsREPORT: string[] = ['Severity', 'Description','Status', 'Photos', 'Quote Approval', 'Actions'];
  ELEMENT_DATAREPORT:   any[] = [
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum Lorem Ipsum', tres: 'lorem', cuatro: '10', cinco: 'lorem lorem'},
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum Lorem Ipsum', tres: 'lorem', cuatro: '10', cinco: 'lorem lorem'}
  ];

  dataSourcePayment:any[] = [];
  ELEMENT_DATA_PAYMENT:   any[] = [
    {uno: 0, dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '$1,234.00', seis: 'Request'},
    {uno: 0, dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '$1,234.00', seis: 'Paid'},
    {uno: 0, dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '$1,234.00', seis: 'Invoiced'},
    {uno: 0, dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '$1,234.00', seis: 'Request'},
  ];
  displayedColumnsPayment: string[] = ['Invoice No.', 'Description', 'Invoice Date', 'Due Date', 'Amount', 'Status', 'action'];


  ngOnInit(): void {
    this.dataSource = this.ELEMENT_DATA;
    this.dataSourceBANK = this.ELEMENT_DATABANK;
    this.dataSourcePROPERTY = this.ELEMENT_DATAPROPERTY;
    this.dataSourceREPORT = this.ELEMENT_DATAREPORT;
    this.dataSourcePayment = this.ELEMENT_DATA_PAYMENT;
  }

}
