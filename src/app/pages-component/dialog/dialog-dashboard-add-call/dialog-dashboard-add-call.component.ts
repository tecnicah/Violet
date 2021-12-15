import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FormControl } from '@angular/forms';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dashboard-add-call',
  templateUrl: './dialog-dashboard-add-call.component.html',
  styleUrls: ['./dialog-dashboard-add-call.component.css']
})
export class DialogDashboardAddCallComponent implements OnInit {
  toppings = new FormControl();
  public __loader__: LoaderComponent = new LoaderComponent();
  serviceline_catalogue: any[] = [];
  duration_catalogue: any[] = [];
  wo: any[] = [];
  service: any[] = [];
  data_call: any = {};
  userto_catalogue: any;
  ready: boolean = false;
  user: any;
  serviceRecord:any[]=[];

  constructor( public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef<DialogDashboardAddCallComponent>) { }

  //**********************************************************************************************//
  //**********************************************************************************************//
  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.serviceRecord = data.result;
      }
    }))
    this.catalogos();
  }
  //**********************************************************************************************//
  //**********************************************************************************************//
  //CONSULTA INFORMACION PARA LOS SELECTS//
  async catalogos(){
    this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
    this.duration_catalogue = await this._services.getCatalogueFrom('GetDuration');
    this.userto_catalogue = await this._services.getCatalogueFrom('GetUserTo');
    this.ready = true;
    this.__loader__.hideLoader();
  }
  //**********************************************************************************************//
  //**********************************************************************************************//
  //CONSULTA WORK ORDER//
  searchWorkOrder(){
    this._services.service_general_get('Catalogue/GetworkOrder/' + this.data_call.serviceRecordId).subscribe((data => {
      if (data.success) {
        this.wo = data.result.value;
      }
    }))
  }
  //**********************************************************************************************//
  //**********************************************************************************************//
  //CONSULTA LOS SERVICIOS DE LA WORK ORDER ELEGIDA//
  searchService(){
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data_call.workOrderId).subscribe((data => {
      if (data.success) {
        this.service = data.result.value;
      }
    }))
  }
  //**********************************************************************************************//
  //**********************************************************************************************//
  //SAVE NEW CALL//
  save(){
    this.data_call.id = 0;
    this.data_call.callAssistants = [];
    let data = this.userto_catalogue.value;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.data_call.assistance.length; j++) {
        if (data[i].id == this.data_call.assistance[j]) {
          this.data_call.callAssistants.push({
            "callId": this.data_call.id,
            "assistant": data[i].id
          });
        }
      }
    }
    console.log("INFORMACION A GUARDAR: ",this.data_call);

    this._services.service_general_post_with_url("Call/CreateCall", this.data_call).subscribe((data => {
      if (data.success) {
        this.__loader__.hideLoader();
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Save Data"
          },
          width: "350px"
        });
        this.dialogRef.close();
      }
    }))
  }
}
