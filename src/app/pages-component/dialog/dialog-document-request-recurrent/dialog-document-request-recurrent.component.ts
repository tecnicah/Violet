import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-document-request-recurrent',
  templateUrl: './dialog-document-request-recurrent.component.html',
  styleUrls: ['./dialog-document-request-recurrent.component.css']
})
export class DialogDocumentRequestRecurrentComponent implements OnInit {

  user:any;
  date = new Date();
  repeat = [];
  data_model: any = {};
  val_month:any = 0;
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.val_month = localStorage.getItem('month');
    console.log("Data que recibe el modal: ", this.data);
    if(this.data != undefined){
      this.data_model = this.data;
    }
    if(this.val_month != undefined && this.val_month != null && this.val_month != ''){
      this.data_model.period = 5;
    }
    
    this.user = JSON.parse(localStorage.getItem('userData'));
    for(let i = 1; i < 12; i++){
       this.repeat.push(i);
    }
    this.catalogos();
  }

  ca_duration = [];
  ca_day = [];
  async catalogos(){
    let ca_duration = await this._services.getCatalogueFrom('GetDuration');
        this.ca_duration = ca_duration.filter(function (E){
          if(E.recurrence != null && E.id != 7 && E.id != 6){
          return true;
          }
        })

    this.ca_day = await this._services.getCatalogueFrom('GetDay');
  }


  putPeriodo(){
    for (let i = 0; i < this.ca_duration.length; i++) {
      if(this.ca_duration[i].id == this.data_model.period){
        this.data_model.periodName = this.ca_duration[i].duration;
      }
    }
  }


  repeat_day(data){
    console.log(data);
    this.data_model.day = data.id;
    this.data_model.repeatThe = data.day;
  }

  save(){
    this.data_model.success = true;
    this.data_model.createdBy = this.user.id;
    this.data_model.createdDate = new Date();
    this.data_model.updatedBy = this.user.id;
    this.data_model.updatedDate = new Date();
    console.log(this.data_model);
    this.dialogRef.close(this.data_model);
  }

  ngOnDestroy(){
    localStorage.removeItem('month');
  }
}
