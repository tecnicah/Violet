import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-dialog-property-expenses',
  templateUrl: './dialog-property-expenses.component.html',
  styleUrls: ['./dialog-property-expenses.component.css']
})
export class DialogPropertyExpensesComponent implements OnInit {

  user:any;
  data:any = {};

  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef < any >,  @Inject(MAT_DIALOG_DATA) public data_: any) { }

  ngOnInit(): void {
    if(this.data_ != null && this.data_ != undefined){
       this.data = this.data_;
    }
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
  }
  //****************************************************************************//
  ca_recurrence= [];
  ca_currency = [];
  async catalogos(){
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_recurrence = duration.filter(function(E){
      if(E.recurrence != null){
         return true;
      }
    });
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
  }
   //****************************************************************************//
   save(){
     this.data.success = true;
     this.data.createdBy = this.user.id;
     this.data.createdDate = new Date();
     this.data.updateBy = this.user.id;
     this.data.updatedDate = new Date();
     console.log(this.data);
     this.dialogRef.close(this.data);
   }
}
