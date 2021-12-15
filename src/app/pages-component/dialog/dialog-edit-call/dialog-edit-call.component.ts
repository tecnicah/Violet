import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';


@Component({
  selector: 'app-dialog-edit-call',
  templateUrl: './dialog-edit-call.component.html',
  styleUrls: ['./dialog-edit-call.component.css']
})
export class DialogEditCallComponent implements OnInit {

  public __loader__: LoaderComponent = new LoaderComponent();
  toppings = new FormControl();
  serviceline_catalogue: any[] = [];
  duration_catalogue: any[] = [];
  wo: any[] = [];
  service: any[] = [];
  data_call: any = {};
  userto_catalogue: any;
  ready: boolean = false;

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef <DialogEditCallComponent> , @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.__loader__.showLoader();
    console.log("DATA RECIBIDA: ", this.data);
      this._services.service_general_get('Call/GetCallById?Id=' + this.data.id).subscribe((data => {
        if (data.success) {
          console.log(data.result);
          this.data_call = data.result;
          this.getWorkOrder(this.data_call.serviceRecordId);
          this.getService(this.data_call.workOrderId);

          this.data_call.assistance = [];
          if (this.data_call.callAssistants.length > 0) {
            for (let i = 0; i < this.data_call.callAssistants.length; i++) {
              this.data_call.assistance.push(this.data_call.callAssistants[i].assistant)
            }
          }

          console.log("data_call: ", this.data_call);
        }
      }))
    this.catalogos();
  }
  //***********************************************//
  async catalogos() {
    this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
    this.duration_catalogue = await this._services.getCatalogueFrom('GetDuration');
    this.userto_catalogue = await this._services.getCatalogueFrom('GetUserTo');
    this.ready = true;
    this.__loader__.hideLoader();
  }
  //***********************************************//
  getWorkOrder(id) {
    this._services.service_general_get('Catalogue/GetworkOrder/' + id).subscribe((data => {
      if (data.success) {
        this.wo = data.result.value;
      }
    }))
  }
  //***********************************************//
  getService(id) {
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + id).subscribe((data => {
      if (data.success) {
        this.service = data.result.value;
      }
    }))
  }
  //***********************************************//
  getName(id) {
    let data = this.userto_catalogue.value;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        return data[i].name;
      }
    }
  }
  //***********************************************//
  get_new_services(){
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data_call.workOrderId).subscribe((data => {
      if (data.success) {
        this.service = data.result.value;
      }
    }))
  }
  //***********************************************//
  save() {

    this.__loader__.showLoader();

    console.log(this.data_call);
    this.data_call.callAssistants = [];
    let data = this.userto_catalogue.value;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.data_call.assistance.length; j++) {
        if (data[i].id == this.data_call.assistance[j]) {
          this.data_call.callAssistants.push({
            "callId": 0,
            "assistant": data[i].id
          });
        }
      }
    }

    this._services.service_general_put("Call/UpdateCall", this.data_call).subscribe((data => {
      if (data.success) {
        this.__loader__.hideLoader();
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close();
      }
    }))

  }


}
